import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";

import { useUser } from "@/context/auth";
import { UAParser } from "ua-parser-js";

import UniversalButton from "@/components/common/UniversalButton";
import celitixLogo from "@/assets/images/celitix-logo-white.svg";
import InputField from "@/components/layout/InputField";
import loginBanner from "@/assets/images/loginBanner.jpg";

import "../../login.css";
import { getIpAddress, login, requestOtp, verifyOtp } from "@/apis/auth/auth";
import { getAllowedServices } from "@/apis/admin/admin";
import axios from "axios";
import { InputOtp } from "primereact/inputotp";

const ResellerLogin = () => {
  const { authLogin } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [mobileotp, setMobileOtp] = useState("");
  const [emailotp, setEmailOtp] = useState("");
  const [timer, setTimer] = useState(20);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifyNumber, setVerifyNumber] = useState("");
  const [numberOtp, setNumberOtp] = useState("");

  const [captchaProblem, setCaptchaProblem] = useState("");
  const [captchaSolution, setCaptchaSolution] = useState(null);

  const [basicDetails, setBasicDetails] = useState({});

  const parser = new UAParser();
  const uaResult = parser.getResult();

  // Password validation state for border color
  const [passwordsMatch, setPasswordsMatch] = useState(null);

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Check if passwords match and update border color state
  useEffect(() => {
    if (newPassword === "" && confirmPassword === "") {
      setPasswordsMatch(null);
    } else if (newPassword === confirmPassword && newPassword !== "") {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    let countdown;
    if (
      isResendDisabled &&
      (step === "verifyOTP" || step === "verifynumberotp")
    ) {
      setTimer(20); // Reset timer to 20
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsResendDisabled(false); // Enable Resend OTP button
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [isResendDisabled, step]);

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * (num1 + 1));
    const operator = ["+", "-"][Math.floor(Math.random() * 2)];
    const solution = operator === "+" ? num1 + num2 : num1 - num2;

    setCaptchaProblem(`${num1} ${operator} ${num2} = ?`);
    setCaptchaSolution(solution);
  }

  async function handleLogin() {
    // Basic validation
    if (!username || !password) {
      return toast.error("All fields are required. Please fill them out.");
    }

    if (!captcha) {
      return toast.error("CAPTCHA is required. Please fill it out.");
    }

    if (parseInt(captcha) !== captchaSolution) {
      return toast.error("Invalid CAPTCHA");
    }

    try {
      // const ipResponse = await axios.get("https://ipapi.co/json/");
      const ipResponse = await getIpAddress();
      // const domain = window.location.hostname;
      const domain = "reseller.alertsnow.in";

      setBasicDetails({
        systemInfo: uaResult.browser.name,
        ip: ipResponse?.data?.clientIp,
        domain,
      });
      const payload = {
        userId: username,
        password,
        systemInfo: uaResult.browser.name || "Unknown",
        ip: "0.0.0.0",
        domain,
      };

      const res = await login(payload);

      if (res?.data?.validateOtp) {
        // return toast.error(res?.data?.message);
        setStep("verifyNumber");
        return;
      }

      if (!res?.data?.token) {
        return toast.error("Invalid credentials");
      }

      const { token, role, ttl } = res.data;

      // Set token (consider using localStorage if rememberMe is implemented)
      sessionStorage.setItem("token", token);

      let allowedServices = null;
      if (role !== "AGENT") {
        allowedServices = await getAllowedServices();
      }

      toast.success("Login Successful!");
      authLogin(role, allowedServices, ttl);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error while logging in");
    }
  }

  function handleRequestOTP() {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    // Check if both fields are empty
    if (!mobile || !email) {
      toast.error("Both mobile number and email are required.");
      return;
    }

    // Validate Mobile Number
    if (!phoneRegex.test(mobile)) {
      toast.error("Invalid mobile number. Please enter a 10-digit number.");
      return;
    }

    // Validate Email
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format. Please enter a valid email.");
      return;
    }

    // If both fields are valid, proceed
    toast.success("OTP Sent to your mobile number and email");
    setStep("verifyOTP");
  }

  async function handleVerifyNumberRequest() {
    // const phoneRegex = /^\d{10}$/;

    if (!verifyNumber) {
      toast.error("Mobile number is required.");
      return;
    }

    // if (!phoneRegex.test(verifyNumber)) {
    //   toast.error("Invalid mobile number. Please enter a 10-digit number.");
    //   return;
    // }

    const payload = {
      userId: username,
      password: password,
      mobileNo: verifyNumber,

      domain: "reseller.alertsnow.in",
    };

    const res = await requestOtp(payload);

    if (!res?.data?.status) {
      return toast.error(res?.data?.msg || "Unable to send OTP");
    }

    toast.success("OTP Sent to your mobile number");
    setStep("verifynumberotp");
  }

  async function handleVerifyNumberOTP() {
    try {
      const payload = {
        userId: username,
        password: password,

        mobileNo: verifyNumber,
        otp: numberOtp,
        ...basicDetails,
      };
      const res = await verifyOtp(payload);
     
      if (!res?.data?.token) {
        return toast.error("Invalid otp");
      }

      const { token, role, ttl } = res.data;

      // Set token (consider using localStorage if rememberMe is implemented)
      sessionStorage.setItem("token", token);

      let allowedServices = null;
      if (role !== "AGENT") {
        allowedServices = await getAllowedServices();
      }

      toast.success("Login Successful!");
      authLogin(role, allowedServices, ttl);
      navigate("/");
    } catch (e) {
      toast.error("Unable to Verify OTP");
    }
  }

  function handleVerifyOTP() {
    if (mobileotp === "123456" && emailotp === "456789") {
      toast.success("OTP Verified successfully");
      setStep("resetPassword");
    } else {
      toast.error("Incorrect OTPs");
    }
  }

  function handleResendOTP() {
    toast.success("New OTP Sent to your mobile and email");
    setIsResendDisabled(true); // Disable the Resend button
  }

  function handleResetPassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8}$/;

    if (!passwordRegex.test(newPassword) || newPassword !== confirmPassword) {
      toast.error(
        "Password must be exactly 8 characters, with at least one uppercase and one lowercase letter, and both fields must match."
      );
      return;
    }

    toast.success("Password Reset Successful");
    setStep("login");
  }

  function generatePassword() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const allCharacters = uppercase + lowercase + numbers;

    let password = "";
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];

    // Fill the rest of the password with random characters from all options
    for (let i = 3; i < 8; i++) {
      password +=
        allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    // Shuffle the password to make it less predictable
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setNewPassword(password);
    setConfirmPassword(password);
  }

  // back to login step button
  const handleBackToLogin = () => {
    setStep("login");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-red-200 via-slate-50 to-slate-50">
      <div className="bg-white flex rounded-2xl shadow-2xl h-[90%] w-[95%]">
        <div className="relative w-1/2 p-6 hidden lg:block rounded-2xl">
          <img
            className="rounded-xl w-[100%] h-[100%] "
            src={loginBanner}
            alt="Login"
          />

          {step === "login" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-5xl font-medium">
                Simplified{" "}
              </h1>
              <h1 className="text-cyan-600 text-5xl font-medium">
                Communication,
              </h1>
              <h1 className="text-cyan-600 text-5xl font-medium">
                Empowered results
              </h1>
              <p className="text-cyan-800 font- normal mt-6">
                Welcome to the Future of Customer Communication
              </p>
              <p className="text-cyan-800 font-normal">
                "Your Engagement Journey Begins Here"
              </p>
            </div>
          )}
          {step === "verifyNumber" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-5xl font-medium">
                Simplified{" "}
              </h1>
              <h1 className="text-cyan-600 text-5xl font-medium">
                Communication,
              </h1>
              <h1 className="text-cyan-600 text-5xl font-medium">
                Empowered results
              </h1>
              <p className="text-cyan-800 font- normal mt-6">
                Welcome to the Future of Customer Communication
              </p>
              <p className="text-cyan-800 font-normal">
                "Your Engagement Journey Begins Here"
              </p>
            </div>
          )}
          {step === "verifynumberotp" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-5xl font-medium">
                Simplified{" "}
              </h1>
              <h1 className="text-cyan-600 text-5xl font-medium">
                Communication,
              </h1>
              <h1 className="text-cyan-600 text-5xl font-medium">
                Empowered results
              </h1>
              <p className="text-cyan-800 font- normal mt-6">
                Welcome to the Future of Customer Communication
              </p>
              <p className="text-cyan-800 font-normal">
                "Your Engagement Journey Begins Here"
              </p>
            </div>
          )}
          {step === "forgotPassword" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-5xl font-medium">
                Reset Password!
              </h1>
              <p className="text-cyan-600 font-medium mt-2">
                Follow the prompts to reset your password & regain access{" "}
              </p>
            </div>
          )}
          {step === "verifyOTP" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-5xl font-medium">
                Reset Password!
              </h1>
              <p className="text-cyan-600 font-medium mt-2">
                Follow the prompts to reset your password & regain access{" "}
              </p>
            </div>
          )}
          {step === "resetPassword" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-5xl font-medium">
                Reset Password!
              </h1>
              <p className="text-cyan-600 font-medium mt-2">
                Follow the prompts to reset your password & regain access{" "}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center rounded-2xl p-6 w-full lg:w-1/2 lg:p-12">
          <div>
            {step === "login" && (
              <>
                <div className="flex flex-col items-center justify-center my-2 ">
                  <h3 className="text-5xl font-medium my-2 playf">
                    Welcome Back
                  </h3>
                  <p className="text-base sm:text-sm my-2 text-center ">
                    Enter your username and password to access your account{" "}
                  </p>
                </div>

                <div className="w-full">
                  <div htmlFor="username" className="text-base mb-2">
                    Username
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter Username"
                    className="w-full p-2 mb-2 border border-gray-200 rounded-md"
                    onChange={(e) => setUsername(e.target.value)}
                    // maxLength={8}
                  />
                </div>

                <div className="relative w-full ">
                  <div htmlFor="password" className="text-base mb-2">
                    Password
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full p-2 mb-2 border border-gray-200 rounded-md"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    maxLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 top-6 flex items-center"
                  >
                    {showPassword ? (
                      // Eye Slash (Hide password)
                      <svg
                        className="w-5 h-5 text-black hover:text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      // Eye Open (Show password)
                      <svg
                        className="w-5 h-5 text-black hover:text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-6-10-6a16.57 16.57 0 014.609-4.845m2.608-1.45A9.988 9.988 0 0112 5c5.523 0 10 6 10 6a16.536 16.536 0 01-1.986 2.12M3 3l18 18"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* <div className="flex items-center justify-end">
                  <button
                    className="text-black mt-2 cursor-pointer text-right "
                    onClick={() => setStep("forgotPassword")}
                  >
                    Forgot Password?
                  </button>
                </div> */}

                <h2 className="my-3 text-l">Solve Captcha</h2>
                <div className="flex justify-between items-center mt-2">
                  <span className="p-2 ">{captchaProblem}</span>
                  <input
                    type="number"
                    maxLength={2}
                    placeholder="Enter Captcha"
                    className="w-2/3 p-2 border border-gray-200 rounded-md"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      // Allow only numeric characters
                      if (/^\d*$/.test(inputValue)) {
                        setCaptcha(inputValue);
                      }
                    }}
                  />
                </div>

                <button
                  className="w-full bg-black text-white p-2 rounded-lg mt-6"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
                {/* <ToastContainer /> */}
              </>
            )}

            {step === "verifyNumber" && (
              <div className="p-1 ">
                <h1 className="text-4xl font-semibold text-center my-2 playf">
                  Verify Number
                </h1>
                <p className="text-centre font-medium sm:text-lg playf">
                  Provide your mobile number for secure access.{" "}
                </p>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full p-2 my-4 border border-gray-200 rounded"
                  onChange={(e) => setVerifyNumber(e.target.value)}
                  maxLength={13}
                />
                <button
                  className="w-full text-white bg-black p-2 rounded-lg mt-2"
                  onClick={handleVerifyNumberRequest}
                >
                  Request OTP
                </button>
                {/* <ToastContainer /> */}
              </div>
            )}

            {step === "verifynumberotp" && (
              <>
                <h2 className="text-4xl font-bold mb-4 text-center playf">
                  Enter OTP
                </h2>
                <p className="text-center mb-4">
                  We've sent a 6-digit code to your mobile. Enter it below
                </p>

                <div className="flex items-center justify-center">
                  <InputOtp
                    length={6}
                    value={numberOtp}
                    onChange={(e) => setNumberOtp(e.value)}
                    variant={"outlined"}
                    className="p-2"
                  />
                </div>

                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    className="w-full bg-black text-white p-2 rounded-lg"
                    onClick={handleVerifyNumberOTP}
                  >
                    Verify OTP
                  </button>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    className=" text-black underline p-2 rounded-lg mt-4 text-centre"
                    onClick={handleBackToLogin}
                  >
                    ← Back to Login
                  </button>
                </div>
                {/* <ToastContainer /> */}
              </>
            )}

            {step === "forgotPassword" && (
              <div className="flex flex-col ">
                <h1 className="lg:text-3xl text-2xl font-medium text-center playf">
                  Enter Your Registered{" "}
                </h1>
                <h1 className="lg:text-2xl text-xl font-medium text-center my-1 playf">
                  Mobile Number & Email Address
                </h1>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className=" p-2 my-4 border border-gray-200 rounded-md"
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength={10}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className=" p-2 my-4 border border-gray-200 rounded"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className=" text-white bg-black p-2 rounded-lg mt-2"
                  onClick={handleRequestOTP}
                >
                  Request OTP
                </button>
                {/* <ToastContainer /> */}
              </div>
            )}

            {step === "verifyOTP" && (
              <>
                <h2 className="text-xl font-medium mb-4 text-center playf">
                  Enter the mobile OTP
                </h2>
                <InputOtp
                  length={6}
                  value={mobileotp}
                  onChange={(e) => setMobileOtp(e.value)}
                  variant={"outlined"}
                />

                <h2 className="text-xl font-medium mb-4 text-center mt-4 playf">
                  Enter the email OTP
                </h2>
                <InputOtp
                  length={6}
                  value={emailotp}
                  onChange={(e) => setEmailOtp(e.value)}
                  variant={"outlined"}
                />

                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    className="w-full bg-black text-white p-2 rounded-lg"
                    onClick={handleVerifyOTP}
                  >
                    Verify OTP
                  </button>

                  {!isResendDisabled && (
                    <button
                      className="w-full bg-black text-white p-2 rounded-lg"
                      onClick={handleResendOTP}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <p className="text-center mt-3 text-gray-500">
                  {isResendDisabled ? `Resend OTP in ${timer} seconds` : ""}
                </p>

                {/* <ToastContainer /> */}
              </>
            )}

            {step === "resetPassword" && (
              <div className="w-xl flex flex-col items-center justify-center sm:p-4">
                <h2 className="text-4xl font-medium mb-2 text-center playf">
                  Reset Password
                </h2>

                {/* New Password - with dynamic border color */}
                <div className="relative flex flex-col items-center my-4">
                  <p className="text-base">New Password</p>

                  <div className="relative w-full max-w-xs">
                    <input
                      id="new-password"
                      placeholder="New Password"
                      className={`p-2 my-1 border rounded-lg w-full pr-10 ${
                        newPassword === ""
                          ? "border-gray-400"
                          : passwordsMatch === true
                          ? "border-green-500"
                          : "border-red-500"
                      }`}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type={showNewPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showNewPassword ? (
                        // Eye Slash (Hide password)
                        <svg
                          className="w-5 h-5 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-6-10-6a16.57 16.57 0 014.609-4.845m2.608-1.45A9.988 9.988 0 0112 5c5.523 0 10 6 10 6a16.536 16.536 0 01-1.986 2.12M3 3l18 18"
                          />
                        </svg>
                      ) : (
                        // Eye Open (Show password)
                        <svg
                          className="w-5 h-5 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password - with dynamic border color */}
                <div className="relative flex flex-col items-center my-1">
                  <p className="text-base">Confirm New Password</p>
                  <div className="relative w-full max-w-xs">
                    <input
                      placeholder="Confirm New Password"
                      className={`p-2 my-2 border rounded-lg w-full pr-10 ${
                        confirmPassword === ""
                          ? "border-gray-400"
                          : passwordsMatch === true
                          ? "border-green-500"
                          : "border-red-500"
                      }`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        // Eye Slash (Hide password)
                        <svg
                          className="w-5 h-5 text-black hover:text-gray-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-6-10-6a16.57 16.57 0 014.609-4.845m2.608-1.45A9.988 9.988 0 0112 5c5.523 0 10 6 10 6a16.536 16.536 0 01-1.986 2.12M3 3l18 18"
                          />
                        </svg>
                      ) : (
                        // Eye Open (Show password)
                        <svg
                          className="w-5 h-5 text-black hover:text-gray-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="w-1/2 flex items-center justify-center gap-2 p-1 mt-2">
                  <button
                    className="w-3xs bg-black text-white p-2 rounded-lg"
                    onClick={generatePassword}
                  >
                    Generate
                  </button>
                  <button
                    className="w-3xs bg-black text-white p-2 rounded-lg"
                    onClick={handleResetPassword}
                  >
                    Submit
                  </button>
                </div>
                {/* <ToastContainer /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResellerLogin;
