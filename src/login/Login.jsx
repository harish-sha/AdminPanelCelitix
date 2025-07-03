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
import {
  forgotPassword,
  getIpAddress,
  login,
  requestOtp,
  verifyForgotPasswordOtp,
  verifyOtp,
} from "@/apis/auth/auth";
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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsBtnVisible(true);

      const handleResendOtp = async () => {
        if (!inputDetails.userId || !inputDetails.mobileNo) return;
        try {
          const res = await forgotPassword({
            userId: inputDetails.userId,
            mobileNo: inputDetails.mobileNo,
          });

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
      setLoading(true);

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
      const ipResponse = "183.83.53.47";

      setInputDetails((prev) => ({
        ...prev,
        systemInfo: "Chrome",
        ip: ipResponse?.data?.clientIp || "183.83.53.47",
      }));

      const payloadd = {
        ...inputDetails,
        // systemInfo: uaResult.browser.name || "Unknown",
        systemInfo: "Chrome",
        // ip: ipResponse?.data?.clientIp || "0.0.0.0",
        ip: "183.83.53.47",
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
      setLoading(false);
    }
  }

  async function handleSendOtp() {
    delete inputDetails.rememberMe;
    let payload = {};
    if (isForgotPassword) {
      payload = {
        userId: inputDetails.userId,
        mobileNo: inputDetails.mobileNo,
      };
    } else {
      payload = { ...inputDetails };
    }
    try {
      const res = isForgotPassword
        ? await forgotPassword(payload)
        : await requestOtp(payload);
      if (!res?.data?.status) {
        toast.error(res?.data?.msg || "Unable to send OTP");
        return;
      }
      toast.success(res?.data?.msg);
      setStep(3);
    } catch (e) {
      console.log(e);
      return toast.error("Unable to send OTP");
    }
  }

  async function handleVerifyOtp() {
    if (!inputDetails.otp) {
      return toast.error("Enter OTP");
    }
    delete inputDetails.rememberMe;
    try {
      let payload = {};
      if (isForgotPassword) {
        payload = {
          userId: inputDetails.userId,
          mobileNo: inputDetails.mobileNo,
          otp: inputDetails.otp,
        };
      } else {
        payload = { ...inputDetails };
      }

      const res = isForgotPassword
        ? await verifyForgotPasswordOtp(payload)
        : await verifyOtp(payload);

      // if (!res?.data?.status) {
      //   return toast.error(res?.data?.msg || "Unable to verify OTP");
      // }
      toast.success("OTP verified successfully");
      if (isForgotPassword) {
        setStep(1);
        return;
      }
      sessionStorage.setItem("token", res?.data?.token);
      let allowedServices = null;
      if (res?.data?.role !== "AGENT") {
        allowedServices = await getAllowedServices();
      }

      // toast.success("Login Successful!");
      authLogin(res?.data?.role, allowedServices, res?.data?.ttl);
      navigate("/");
    } catch (e) {
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
              {step === 2 &&
                (isForgotPassword ? "Forgot Password" : "Verify Number")}

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
                    <button
                      onClick={() => {
                        setStep(2);
                        setIsForgotPassword(true);
                      }}
                      className="hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2] text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                      onClick={handleLogin}
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
                  {isForgotPassword && (
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
                  )}

                  <InputField
                    id="mobileNo"
                    name={"mobileNo"}
                    label="Enter MobileNo"
                    type="tel"
                    placeholder="Enter Verified MobileNo"
                    value={inputDetails.mobileNo}
                    onChange={(e) => {
                      setInputDetails({
                        ...inputDetails,
                        mobileNo: e.target.value,
                      });
                    }}
                    maxLength={13}
                    className="w-full p-2 mb-4 rounded-lg bg-gray-100 text-md"
                  />

                  <div className="flex justify-center">
                    <button
                      className="w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2] text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                      onClick={() => {
                        handleSendOtp();
                      }}
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
                  {/* {isForgotPassword && (
                    <InputField
                      id="emailOtp"
                      name={"emailOtp"}
                      label=" Enter Email Otp"
                      type="text"
                      placeholder="Enter Email Otp"
                      value={inputDetails.emailOtp}
                      onChange={(e) => {
                        setInputDetails({
                          ...inputDetails,
                          emailOtp: e.target.value,
                        });
                      }}
                      className="w-full p-2 mb-4 rounded-lg bg-gray-100 text-md"
                    />
                  )} */}

                  <InputField
                    id="otp"
                    name={"otp"}
                    label="Enter Otp"
                    type="text"
                    placeholder="Enter Otp"
                    value={inputDetails.otp}
                    onChange={(e) => {
                      setInputDetails({
                        ...inputDetails,
                        otp: e.target.value,
                      });
                    }}
                    className="w-full p-2 mb-4 rounded-lg bg-gray-100 text-md"
                  />

                  <div className="flex justify-center">
                    <button
                      className="w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2] text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                      onClick={() => {
                        handleVerifyOtp();
                      }}
                    >
                      Verify OTP
                    </button>
                  </div>

                  {countdown != 0 && (
                    <p className="text-md text-gray-800 mt-2 flex justify-center">
                      Resend OTP in {countdown}s
                    </p>
                  )}

                  {isBtnVisible && (
                    // <div className="mt-4">
                    <div className="flex justify-center">
                      <button
                        className=" w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2]  text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                        onClick={handleResendOTP}
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}
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
