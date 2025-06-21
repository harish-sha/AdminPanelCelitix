import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./login.css";
import InputField from "../components/layout/InputField";
import { Link, useNavigate } from "react-router-dom";
import UniversalButton from "../components/common/UniversalButton";
import celitix_logo from "../assets/images/celitix-logo-white.svg";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";
import { forgotPassword, login, requestOtp, verifyOtp } from "@/apis/auth/auth";
import { useUser } from "@/context/auth";
import { getAllowedServices } from "@/apis/admin/admin";
import { UAParser } from "ua-parser-js";

const Login = () => {
  const navigate = useNavigate();
  const { authLogin } = useUser();

  const parser = new UAParser();
  const uaResult = parser.getResult();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [isBtnVisible, setIsBtnVisible] = useState(true);

  const [inputDetails, setInputDetails] = useState({
    userId: "",
    password: "",
    rememberMe: false,
    ip: "",
    systemInfo: "",
  });

  const [otpDetails, setOtpDetails] = useState({
    email: "",
    mobileNo: "",
    otp: "",
  });

  const [passwordState, setPasswordState] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      // Countdown reached zero, show button and trigger OTP resend
      setIsBtnVisible(true);

      const handleResendOtp = async () => {
        if (!forgotPassState.userId || !forgotPassState.mobileNo) return;
        try {
          const res = await forgotPassword(forgotPassState);
          console.log(res);

          if (!res?.data.status) {
            return toast.error(res?.data?.msg || "Unable to send OTP");
          }
          toast.success(res?.data?.msg);
        } catch (e) {
          console.log(e);
          toast.error("Unable to send OTP");
        }
      };

      handleResendOtp();
    }

    return () => clearInterval(timer);
  }, [countdown]);

  async function handleLogin() {
    if (!inputDetails.userId || !inputDetails.password)
      return toast.error("Enter email and password");

    try {
      // setLoading(true);

      const systemData = {
        browser: {
          name: uaResult.browser.name || "Unknown",
          version: uaResult.browser.version || "Unknown",
        },
        os: {
          name: uaResult.os.name || "Unknown",
          version: uaResult.os.version || "Unknown",
        },
      };

      // const ipResponse = await getIpAddress();
      const ipResponse = "0.0.0.0";

      setInputDetails((prev) => ({
        ...prev,
        systemInfo: uaResult.browser.name || "Unknown",
        ip: ipResponse?.data?.clientIp || "0.0.0.0",
      }));

      const payloadd = {
        ...inputDetails,
        systemInfo: uaResult.browser.name || "Unknown",
        ip: ipResponse?.data?.clientIp || "0.0.0.0",
        // domain: "127.0.0.4"
      };
      delete payloadd.rememberMe;
      const res = await login(payloadd);

      if (res?.data?.validateOtp) {
        setStep(2);
        return;
      }

      if (!res?.data?.token) {
        return toast.error("Invalid credentials");
      }

      if (inputDetails?.rememberMe) {
        localStorage.setItem("token", res?.data?.token);
      } else {
        sessionStorage.setItem("token", res?.data?.token);
      }

      let allowedServices = null;
      if (res?.data?.role !== "AGENT") {
        allowedServices = await getAllowedServices();
      }

      toast.success("Login Successful!");
      authLogin(res?.data?.role, allowedServices, res?.data?.ttl);
      navigate("/");
    } catch (e) {
      return toast.error("Login failed");
    } finally {
      // setLoading(false);
    }
  }

  async function handleSentForgotPasswordOtp() {
    if (!forgotPassState.userId || !forgotPassState.mobileNo)
      return toast.error("Enter email and phone number");

    try {
      const res = await forgotPassword(forgotPassState);

      if (!res?.data.status) {
        return toast.error("Either user id or mobile number is incorrect");
      }
      toast.success(res?.data?.msg);
      setStep(3);
    } catch (e) {
      console.log(e);
      return toast.error("Unable to send OTP");
    }
  }
  async function handleSendOtp() {
    delete inputDetails.rememberMe;
    try {
      if (!res?.data?.status) {
        toast.error(res?.data?.msg);
        return;
      }
      const res = await requestOtp(inputDetails);
      toast.success(res?.data?.msg);
      setStep(3);
    } catch (e) {
      console.log(e);
      return toast.error("Unable to send OTP");
    }
  }

  async function handleVerifyForgotPasswordOtp() {
    console.log(otp);
    if (!otp?.mobileNo) {
      return toast.error("Enter OTP");
    }

    const data = {
      userId: forgotPassState.userId,
      mobileNo: forgotPassState.mobileNo,
      otp: otp?.mobileNo,
    };
    try {
      const res = await verifyOtp(data);
      if (!res?.data?.status) {
        return toast.error(res?.data?.msg);
      }
      toast.success("OTP verified successfully");
      setStep(1);
    } catch (e) {
      console.log(e);
      return toast.error("Unable to verify OTP");
    }
  }
  async function handleVerifyOtp() {
    if (!otp?.mobileNo) {
      return toast.error("Enter OTP");
    }
    delete inputDetails.rememberMe;

    try {
      const res = await verifyOtp(inputDetails);
      if (!res?.data?.status) {
        return toast.error(res?.data?.msg);
      }
      toast.success("OTP verified successfully");
      // setStep(2);
      let allowedServices = null;
      if (res?.data?.role !== "AGENT") {
        allowedServices = await getAllowedServices();
      }

      // toast.success("Login Successful!");
      authLogin(res?.data?.role, allowedServices, res?.data?.ttl);
      navigate("/");
    } catch (e) {
      console.log(e);
      return toast.error("Unable to verify OTP");
    }
  }

  async function handleResendOTP() {
    setCountdown(15);
    setIsBtnVisible(false);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <div className="flex items-center justify-center h-[95vh] w-fit bg-[#f5f7fa] px-15 ">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 min-h-120">
          <div className="p-8 flex flex-col space-y-3 justify-center">
            <h2 className="text-4xl font-bold text-[#6952d1] text-center font-poppins">
              {step === 1 && "Login"}
              {step === 2 && "Forgot Password"}
              {step === 3 && "Verify OTP"}
              {step === 4 && "Reset Password"}
            </h2>

            {step === 1 && (
              <>
                <div className="flex flex-col space-y-3 justify-center">
                  <InputField
                    id="userId"
                    name={"userId"}
                    label="Enter User Id"
                    type="text"
                    placeholder="Enter userId"
                    value={inputDetails.userId}
                    onChange={(e) => {
                      setInputDetails({
                        ...inputDetails,
                        userId: e.target.value,
                      });
                    }}
                    className="w-full p-2 mb-4 rounded-lg bg-gray-100 text-md"
                  />

                  <div className="relative mb-4 ">
                    <InputField
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name={"password"}
                      label="Enter Password"
                      placeholder="Enter Password"
                      value={inputDetails.password}
                      onChange={(e) => {
                        setInputDetails({
                          ...inputDetails,
                          password: e.target.value,
                        });
                      }}
                      className="w-full p-2 mb-4 rounded-lg bg-gray-100 text-md"
                    />
                    <span
                      className="absolute top-9 right-3 flex items-center text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </span>
                  </div>
                  <div className="flex justify-end text-sm text-gray-900 ">
                    {/* <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="accent-blue-500"
                        checked={false}
                        onChange={() => {}}
                      />
                      Remember Me?
                    </label> */}
                    <button onClick={() => {}} className="hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2] text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                      onClick={() => {}}
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex flex-col space-y-3 justify-center">
                  <div>
                    <label className="text-md font-medium text-gray-500">
                      userId
                    </label>
                    <input
                      type="text"
                      placeholder="Enter userId"
                      className="w-full p-2 mb-4 rounded-lg bg-gray-100 text-md"
                      value=""
                      onChange={() => {}}
                    />
                  </div>

                  <label className="text-md font-medium text-gray-500">
                    Enter MobileNo
                  </label>
                  <input
                    maxLength={13}
                    placeholder="Enter Verified Phone Number"
                    className="w-full p-2 mb-4 rounded-lg bg-gray-100 text-md"
                    value=""
                    onChange={() => {}}
                  />
                  <div className="flex justify-center">
                    <button
                      className="w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2] text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                      onClick={() => {}}
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex flex-col space-y-3 justify-center">
                  <div>
                    <label className="text-md font-medium text-gray-500">
                      Enter Email Otp
                    </label>
                    <input
                      placeholder="Enter Email OTP"
                      className="w-full p-2 rounded-lg mb-3 bg-gray-100 text-center tracking-wide text-md"
                      value=""
                      maxLength={6}
                      onChange={() => {}}
                    />
                  </div>

                  <label className="text-md font-medium text-gray-500">
                    Enter Otp
                  </label>
                  <input
                    placeholder="Enter OTP"
                    className="w-full p-2 rounded-lg bg-gray-100 text-center tracking-wide text-md"
                    value=""
                    maxLength={6}
                    onChange={() => {}}
                  />

                  <div className="flex justify-center">
                    <button
                      className="w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2] text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                      onClick={() => {}}
                    >
                      Verify OTP
                    </button>
                  </div>

                  <p className="text-md text-gray-800 mt-2 flex justify-center">
                    Resend OTP in 0s
                  </p>

                  <div className="flex justify-center">
                    <button
                      className="w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2] text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                      onClick={() => {}}
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-gradient-to-tr from-[#4f3ca2] to-[#8a63d2] text-white flex flex-col items-center justify-center p-8 font-poppins">
            <img src={celitix_logo} alt="logo" className="w-60 mb-6" />
            <p className="text-xl text-center font-medium">
              Welcome to the Future of Customer Communication —
              <br />
              Your Engagement Journey Begins Here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
