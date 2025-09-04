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
import { getIpAddress, login, requestOtp, verifyOtp, verifyForgotPasswordOtp, forgotPassword } from "@/apis/auth/auth";
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
  const [loading, setLoading] = useState(false);


  // const [basicDetails, setBasicDetails] = useState({});

  const parser = new UAParser();
  const uaResult = parser.getResult();

  // Password validation state for border color
  const [passwordsMatch, setPasswordsMatch] = useState(null);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // const [isForgotPassword, setIsForgotPassword] = useState(false);

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
    if (!username) {
      return toast.error("Please enter username");
    }
    if (!password) {
      return toast.error("Please enter password");
    }

    if (!captcha) {
      return toast.error("CAPTCHA is required. Please fill it out.");
    }

    if (parseInt(captcha) !== captchaSolution) {
      return toast.error("Invalid CAPTCHA");
    }
    setLoading(true);
    try {
      // const ipResponse = await axios.get("https://ipapi.co/json/");
      const ipResponse = await getIpAddress();
      const domain = window.location.hostname.replace(/^www\./, '');
      // const domain = "reseller.alertsnow.in";

      setBasicDetails({
        systemInfo: uaResult.browser.name,
        ip: ipResponse?.data?.clientIp || "0.0.0.0",
        // ip: "43.224.1.236",
        domain,
      });

      const payload = {
        userId: username,
        password,
        systemInfo: uaResult.browser.name || "Unknown",
        ip: ipResponse?.data?.clientIp || "0.0.0.0",
        // ip: "43.224.1.236",
        domain: domain
      };

      const res = await login(payload);

      if (res?.data?.validateOtp) {
        // return toast.error(res?.data?.message);
        setStep("verifyNumber");
        return;
      }

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
    } finally {
      setLoading(false);
    }
  }

  function handleRequestOTP() {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!mobile || !email) {
      toast.error("Both mobile number and email are required.");
      return;
    }

    if (!phoneRegex.test(mobile)) {
      toast.error("Invalid mobile number. Please enter a 10-digit number.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format. Please enter a valid email.");
      return;
    }

    toast.success("OTP Sent to your mobile number and email");
    setStep("verifyOTP");
  }

  async function handleVerifyNumberRequest() {
    setLoading(true);
    try {
      const phoneRegex = /^\d{10}$/;
      if (!verifyNumber) {
        toast.error("Mobile number is required.");
        return;
      }

      // if (!phoneRegex.test(verifyNumber)) {
      //   toast.error("Invalid mobile number. Please enter a 10-digit number.");
      //   return;
      // }

      let payload = {
        userId: username,
        // password: password,
        mobileNo: verifyNumber,
        // domain: window.location.hostname,
        domain: basicDetails.domain,
      };

      // const res = await requestOtp(payload);

      if (!isForgotPassword) {
        payload = {
          ...payload,
          password: password,
        };
      }

      const res = isForgotPassword
        ? await forgotPassword(payload)
        : await requestOtp(payload);

      if (!res?.data?.status) {
        console.log(res?.data?.msg)
        return toast.error(res?.data?.msg || "Unable to send OTP");
      }
      toast.success("OTP Sent to your mobile number");
      setStep("verifynumberotp");
    } catch (error) {
      console.error("Error in handleVerifyNumberRequest:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  async function handleVerifyNumberOTP() {
    setLoading(true);
    try {
      const payload = {
        userId: username,
        password: password,

        mobileNo: verifyNumber,
        otp: numberOtp,
        ...basicDetails,
      };
      // const res = await verifyOtp(payload);
      const res = isForgotPassword
        ? await verifyForgotPasswordOtp({
          userId: username,
          mobileNo: verifyNumber,
          otp: numberOtp,
        })
        : await verifyOtp(payload);
      if (!res?.data?.token) {
        return toast.error("Invalid otp");
      }

      if (isForgotPassword) {
        setStep("login");
        return;
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
    } finally {
      setLoading(false);
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
    setIsForgotPassword(false)
    setIsForgotPassword(false)
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#EAF7FF] via-slate-50 to-slate-50">
      <div className="bg-white flex rounded-2xl shadow-2xl h-[90%] w-[95%]">
        <div className="relative w-1/2 p-6 hidden lg:block rounded-2xl">
          <img
            className="rounded-xl w-[100%] h-[100%]"
            src={loginBanner}
            alt="Login"
          />

          {step === "login" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-5xl font-medium">
                Simplified Communication, <br /> Empowered results
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
            <>
              {isForgotPassword ?
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <h1 className="text-cyan-600 text-5xl font-medium">
                    Reset Password!
                  </h1>
                  <p className="text-cyan-600 font-medium mt-2">
                    Follow the prompts to reset your password & regain access
                  </p>
                </div>
                :
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <h1 className="text-cyan-600 text-4xl font-medium">
                    Provide your registered <br /> mobile number
                  </h1>
                  <p className="text-cyan-800 font- normal mt-4">
                    Enter your registered mobile number
                    and <br /> verify number for secure access
                  </p>
                </div>
              }
            </>
          )}
          {/* {step === "verifyNumber" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-4xl font-medium">
                Provide your mobile number <br /> for secure access.
              </h1>
              <p className="text-cyan-800 font- normal mt-4">
                Welcome to the Future of Customer Communication <br /> "Your Engagement Journey Begins Here"
              </p>
            </div>
          )} */}
          {step === "verifynumberotp" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-5xl font-medium">Simplified</h1>
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
          {/* {step === "forgotPassword" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-5xl font-medium">
                Reset Password!
              </h1>
              <p className="text-cyan-600 font-medium mt-2">
                Follow the prompts to reset your password & regain access
              </p>
            </div>
          )} */}
          {step === "verifyOTP" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-5xl font-medium">
                Reset Password!
              </h1>
              <p className="text-cyan-600 font-medium mt-2">
                Follow the prompts to reset your password & regain access
              </p>
            </div>
          )}
          {step === "resetPassword" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-cyan-600 text-5xl font-medium">
                Reset Password!
              </h1>
              <p className="text-cyan-600 font-medium mt-2">
                Follow the prompts to reset your password & regain access
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center rounded-2xl p-6 w-full lg:w-1/2 lg:p-12 border-2 border-cyan-600 m-4 bg-gray-50 shadow-2xl">
          <div className="">
            {step === "login" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col items-center justify-center my-2">
                    <h3 className="text-5xl font-medium my-2 playf">
                      Welcome Back
                    </h3>
                    <p className="text-base sm:text-sm my-2 text-center">
                      Enter your username and password to access your account
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
                      className="w-full p-2 mb-2 border border-gray-300 rounded-xl"
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
                      className="w-full p-2 mb-2 border border-gray-300 rounded-xl"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    // maxLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-2 top-6 flex items-center"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </button>
                  </div>
                  <div className="flex justify-between my-3">
                    <h2 className="text-md">Solve Captcha</h2>
                    <button
                      onClick={() => {
                        setStep("verifyNumber");
                        setIsForgotPassword(true);
                      }}
                      className="hover:underline cursor-pointer"
                    >
                      Forgot Password
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="p-2 ">{captchaProblem}</span>
                    <input
                      type="number"
                      maxLength={2}
                      placeholder="Enter Captcha"
                      className="w-2/3 p-2 border border-gray-300 rounded-xl"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (/^\d*$/.test(inputValue)) {
                          setCaptcha(inputValue);
                        }
                      }}
                    />
                  </div>

                  {/* <button
                    className="w-full bg-black text-white p-2 rounded-lg mt-6"
                    onClick={handleLogin}
                  >
                    Sign In
                  </button> */}
                  <div className="flex items-center justify-center mt-6">
                    <button
                      className={`custom-signin-btn w-full ${loading ? "loading" : ""
                        }`}
                      disabled={loading}
                      onClick={handleLogin}
                    >
                      <div className="back"></div>
                      {!loading ? (
                        <span className="text">Sign In</span>
                      ) : (
                        <div className="circle-spinner" />
                      )}
                    </button>
                  </div>
                </motion.div>
              </>
            )}

            {step === "verifyNumber" && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-1 "
              >
                <h1 className="text-4xl font-semibold text-center my-2 playf">
                  {/* Verify Number */}
                  {isForgotPassword ? "Forgot Password" : "Verify Number"}
                </h1>
                <div className="my-2" >
                  {!isForgotPassword ?
                    <p className="text-center font-medium sm:text-lg playf">
                      Provide your mobile number <span className="text-sm font-bold">(with country code)</span> <br /> for secure access.{" "}
                    </p>
                    :
                    <p className="text-center font-medium sm:text-lg playf">
                      Provide your mobile number & userId for <br /> secure access.
                    </p>
                  }
                </div>
                <div lassName="space-y-2">
                  {isForgotPassword && (
                    // <InputField
                    //   id="userId"
                    //   label={"Enter userId Number"}
                    //   name="userId"
                    //   onChange={(e) => setUsername(e.target.value)}
                    //   value={username}
                    //   placeholder="Enter userId"
                    // />
                    <input
                      type="text"
                      placeholder="Enter UserId"
                      className="w-full p-2 my-4 border border-gray-300 rounded-xl"
                      onChange={(e) => setUsername(e.target.value)}
                    // maxLength={13}
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    className={`w-full p-2 border border-gray-300 rounded-xl ${loading ? "bg-gray-300" : ""} `}
                    onChange={(e) => setVerifyNumber(e.target.value)}
                    maxLength={15}
                    disabled={loading}
                  />
                </div>

                {/* <button
                  className="w-full text-white bg-black p-2 rounded-lg mt-3 cursor-pointer"
                  onClick={handleVerifyNumberRequest}
                >
                  Request OTP
                </button> */}
                <div className="flex items-center justify-center mt-6">
                  <button
                    className={`custom-signin-btn w-full ${loading ? "loading" : ""
                      }`}
                    disabled={loading}
                    onClick={handleVerifyNumberRequest}
                  >
                    <div className="back"></div>
                    {!loading ? (
                      <span className="text">Request OTP</span>
                    ) : (
                      <div className="circle-spinner" />
                    )}
                  </button>
                </div>

                {!loading && (
                  <div className="flex items-center justify-center">
                    <button
                      className=" text-black hover:underline p-2 rounded-lg mt-4 text-centre cursor-pointer"
                      onClick={handleBackToLogin}
                    >
                      ← Back to Login
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {step === "verifynumberotp" && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl font-semibold text-center my-2 playf">
                    Enter OTP
                  </h2>
                  <p className="text-center font-medium sm:text-lg playf mb-4">
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
                    {/* <button
                      className="w-full bg-black text-white p-2 rounded-lg"
                      onClick={handleVerifyNumberOTP}
                    >
                      Verify OTP
                    </button> */}
                    <button
                      className={`custom-signin-btn w-full ${loading ? "loading" : ""
                        }`}
                      disabled={loading}
                      onClick={handleVerifyNumberOTP}
                    >
                      <div className="back"></div>
                      {!loading ? (
                        <span className="text">Verify OTP</span>
                      ) : (
                        <div className="circle-spinner" />
                      )}
                    </button>
                    {!isResendDisabled && (
                      // <button
                      //   className="w-full bg-black text-white p-2 rounded-lg"
                      //   onClick={handleVerifyNumberRequest}
                      // >
                      //   Resend OTP
                      // </button>
                      <button
                        className={`custom-signin-btn w-full ${loading ? "loading" : ""
                          }`}
                        disabled={loading}
                        onClick={handleVerifyNumberRequest}
                      >
                        <div className="back"></div>
                        {!loading ? (
                          <span className="text">Resend OTP</span>
                        ) : (
                          <div className="circle-spinner" />
                        )}
                      </button>
                    )}
                    {/* {!isResendDisabled && (
                      <button
                        className="w-full bg-black text-white p-2 rounded-lg"
                        onClick={handleVerifyNumberRequest}
                      >
                        Resend OTP
                      </button>
                    )} */}
                  </div>
                  <p className="text-center mt-3 text-gray-500">
                    {isResendDisabled ? `Resend OTP in ${timer} seconds` : ""}
                  </p>
                  {/* <p className="text-center mt-3 text-gray-500">
                    {isResendDisabled ? `Resend OTP in ${timer} seconds` : ""}
                  </p> */}

                  {!loading && (
                    <div className="flex items-center justify-center">
                      <button
                        className=" text-black underline p-2 rounded-lg mt-4 text-centre cursor-pointer"
                        onClick={handleBackToLogin}
                      >
                        ← Back to Login
                      </button>
                    </div>
                  )}
                </motion.div>
              </>
            )}

            {step === "forgotPassword" && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
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
                  <div className="flex items-center justify-center">
                    <button
                      className=" text-black underline p-2 rounded-lg mt-4 text-centre cursor-pointer"
                      onClick={handleBackToLogin}
                    >
                      ← Back to Login
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "verifyOTP" && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
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
                  <div className="flex items-center justify-center">
                    <button
                      className=" text-black underline p-2 rounded-lg mt-4 text-centre cursor-pointer"
                      onClick={handleBackToLogin}
                    >
                      ← Back to Login
                    </button>
                  </div>
                </motion.div>
              </>
            )}

            {step === "resetPassword" && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-xl flex flex-col items-center justify-center sm:p-4">
                  <h2 className="text-4xl font-medium mb-2 text-center playf">
                    Reset Password
                  </h2>
                  <div className="relative flex flex-col items-center my-4">
                    <p className="text-base">New Password</p>
                    <div className="relative w-full max-w-xs">
                      <input
                        id="new-password"
                        placeholder="New Password"
                        className={`p-2 my-1 border rounded-lg w-full pr-10 ${newPassword === ""
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
                          <AiOutlineEyeInvisible size={20} />
                        ) : (
                          <AiOutlineEye size={20} />
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
                        className={`p-2 my-2 border rounded-lg w-full pr-10 ${confirmPassword === ""
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
                          <AiOutlineEyeInvisible size={20} />
                        ) : (
                          <AiOutlineEye size={20} />
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
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default ResellerLogin;
