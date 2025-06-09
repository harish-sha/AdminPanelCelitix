import axios from "axios";
import { UAParser } from "ua-parser-js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Header from "../Header";
import Footer from "../Footer";
import "../../login.css";

import InputField from "@/components/layout/InputField";
import celitixLogo from "@/assets/images/celitix-logo-white.svg";
import { useUser } from "@/context/auth";
import UniversalButton from "@/components/common/UniversalButton";
import celitix_logo from "@/assets/images/celitix-logo-white.svg";
import { forgotPassword, login, verifyOtp } from "@/apis/auth/auth";
import { getAllowedServices } from "@/apis/admin/admin";

const Userlogin = () => {
  const parser = new UAParser();
  const uaResult = parser.getResult();

  const navigate = useNavigate();
  const { authLogin } = useUser();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [isBtnVisible, setIsBtnVisible] = useState(true);
  const [loading, setLoading] = useState(false);


  const [inputDetails, setInputDetails] = useState({
    userId: "",
    password: "",
    rememberMe: false,
  });

  const [forgotPassState, setForgotPassState] = useState({
    userId: inputDetails.userId,
    mobileNo: "",
  });

  const [otp, setOtp] = useState({
    email: "",
    mobileNo: "",
  });

  const [passwordState, setPasswordState] = useState({
    password: "",
    confirmPassword: "",
  });

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
          // console.log(res);

          if (!res?.data.status) {
            return toast.error(res?.data?.msg || "Unable to send OTP");
          }
          toast.success(res?.data?.msg);
        } catch (e) {
          // console.log(e);
          toast.error("Unable to send OTP");
        }
      };

      handleResendOtp();
    }

    return () => clearInterval(timer);
  }, [countdown]);

  async function handleLogin() {
    if (!inputDetails.userId || !inputDetails.password) {
      return toast.error("Enter email and password");
    }

    setLoading(true);
    try {
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


      const payloadd = {
        ...inputDetails,
        // domain: "127.0.0.4"
      }

      delete payloadd.rememberMe;
      const res = await login(payloadd);

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
      // console.log(e);
      return toast.error("Unable to send OTP");
    }
  }

  async function handleVerifyOtp() {
    // console.log(otp);
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
      // console.log(e);
      return toast.error("Unable to verify OTP");
    }
  }

  async function handleResendOTP() {
    setCountdown(15);
    setIsBtnVisible(false);
  }


  return (
    <div className="flex flex-col h-screen overflow-y-auto scroll-smooth">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed w-full top-0"
      >
        <Header />
      </motion.div>
      <div className="flex-1 flex items-center justify-center min-h-screen  bg-[#edf5ff]">
        <div className="bg-[#ffffff] rounded-xl shadow-lg w-[830px] h-120">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="h-full flex flex-col md:p-6 mt-12 space-y-4 p-2"
            >
              <h1 className="text-[2.8rem] text-center font-semibold bluetxt pb-2">
                Sign In
              </h1>
              <label className="text-[0.95rem] font-medium text-gray-700 mb-2">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                label="User ID"
                // value={userId}
                // onChange={(e) => setUserId(e.target.value)}
                value={inputDetails.userId}
                onChange={(e) => {
                  setInputDetails({
                    ...inputDetails,
                    userId: e.target.value,
                  });
                }}
                placeholder="Enter User ID"
                className={`block w-full p-2 py-2.5 border rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm`}
                required
              />
              <div className="relative">
                <div className="text-[0.95rem] font-medium text-gray-700 mb-2">
                  Password
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  value={inputDetails.password}
                  onChange={(e) => {
                    setInputDetails({
                      ...inputDetails,
                      password: e.target.value,
                    });
                  }}
                  required
                  id="password"
                  name="password"
                  className={`block w-full p-2 py-2.5 border rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm`}
                />
                <div
                  className="absolute right-3 top-10 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className={`custom-signin-btn ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  <div className="back"></div>
                  {!loading ? (
                    <span className="text">Sign In</span>
                  ) : (
                    <div className="circle-spinner" />
                  )}
                </button>
              </div>
            </form>
            <div
              className="hidden md:flex flex-col items-center justify-center bg-gradient-to-r from-[#2b40b0] to-[#8447c6] text-white p-6"
              style={{
                borderRadius: "150px 10px 10px 100px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-5"
              >
                <Link to="https://celitix.com">
                  <img
                    src={celitixLogo}
                    alt="Celitix"
                    style={{ width: "220px" }}
                  />
                </Link>
              </motion.div>
              <p className="text-center text-md">
                Welcome to the Future of Customer Communication - Your
                Engagement Journey Begins Here.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  // return (
  //   <div className="min-h-screen w-full flex items-center justify-center ">
  //     <div className="flex items-center justify-center h-[95vh] w-fit  bg-[#f5f7fa] px-15 ">
  //       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 min-h-120">
  //         <div className="p-8 flex flex-col space-y-3  justify-center">
  //           <h2 className="text-4xl font-bold text-[#6952d1]  text-center font-poppins">
  //             {step === 1 && "Login"}
  //             {step === 2 && "Forgot Password"}
  //             {step === 3 && "Verify OTP"}
  //             {step === 4 && "Reset Password"}
  //           </h2>

  //           {step === 1 && (
  //             <>
  //               <div className="flex flex-col space-y-3  justify-center">
  //                 <label className="text-md font-medium text-gray-500">
  //                   Enter Username
  //                 </label>
  //                 <input
  //                   type="email"
  //                   placeholder="Enter Email Address"
  //                   className="w-full text-md p-2  rounded-lg  bg-gray-100"
  //                   value={inputDetails.userId}
  //                   onChange={(e) => {
  //                     setInputDetails({
  //                       ...inputDetails,
  //                       userId: e.target.value,
  //                     });
  //                   }}
  //                 />
  //                 <label className="text-md font-medium mb-4 text-gray-500">
  //                   Enter Password
  //                 </label>
  //                 <div className="relative mb-4 ">
  //                   <input
  //                     type={showPassword ? "text" : "password"}
  //                     maxLength="8"
  //                     placeholder="Enter Password"
  //                     className="w-full text-md p-2  rounded-lg bg-gray-100 pr-10"
  //                     value={inputDetails.password}
  //                     onChange={(e) => {
  //                       setInputDetails({
  //                         ...inputDetails,
  //                         password: e.target.value,
  //                       });
  //                     }}
  //                   />
  //                   <span
  //                     className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
  //                     onClick={() => setShowPassword(!showPassword)}
  //                   >
  //                     {showPassword ? (
  //                       <VisibilityOutlinedIcon />
  //                     ) : (
  //                       <VisibilityOffOutlinedIcon />
  //                     )}
  //                   </span>
  //                 </div>
  //                 <div className="flex items-center justify-between text-sm text-gray-900 ">
  //                   <label className="flex items-center gap-2">
  //                     <input
  //                       type="checkbox"
  //                       className="accent-blue-500"
  //                       checked={inputDetails.rememberMe}
  //                       onChange={(e) =>
  //                         setInputDetails({
  //                           ...inputDetails,
  //                           rememberMe: e.target.checked,
  //                         })
  //                       }
  //                     />
  //                     Remember Me?
  //                   </label>
  //                   <button
  //                     onClick={() => setStep(2)}
  //                     className="hover:underline"
  //                   >
  //                     Forgot Password?
  //                   </button>
  //                 </div>

  //                 <div className="flex justify-center">
  //                   <button
  //                     className=" w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2]  text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
  //                     onClick={handleLogin}
  //                   >
  //                     Log In
  //                   </button>
  //                 </div>
  //               </div>
  //             </>
  //           )}

  //           {step === 2 && (
  //             <>
  //               <div className="flex flex-col space-y-3  justify-center">
  //                 <label className="text-md font-medium text-gray-500">
  //                   userId
  //                 </label>
  //                 <input
  //                   type="text"
  //                   placeholder="Enter userId"
  //                   className="w-full p-2 mb-4 rounded-lg  bg-gray-100  text-md"
  //                   value={forgotPassState.userId}
  //                   onChange={(e) => {
  //                     setForgotPassState({
  //                       ...forgotPassState,
  //                       userId: e.target.value,
  //                     });
  //                   }}
  //                 />

  //                 <label className="text-md font-medium text-gray-500 ">
  //                   Enter MobileNo
  //                 </label>
  //                 <input
  //                   maxLength={13}
  //                   placeholder="Enter Verified Phone Number"
  //                   className="w-full p-2 mb-4 rounded-lg  bg-gray-100 text-md "
  //                   value={forgotPassState.mobileNo}
  //                   onChange={(e) => {
  //                     setForgotPassState({
  //                       ...forgotPassState,
  //                       mobileNo: e.target.value,
  //                     });
  //                   }}
  //                 />
  //                 <div className="flex justify-center">
  //                   <button
  //                     className=" w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2]  text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
  //                     onClick={handleSendOtp}
  //                   >
  //                     Send OTP
  //                   </button>
  //                 </div>
  //               </div>
  //             </>
  //           )}

  //           {step === 3 && (
  //             <>
  //               <div className="flex flex-col space-y-3  justify-center">
  //                 {/* <label className="text-md font-medium text-gray-500">
  //                   Enter Email Otp
  //                 </label>
  //                 <input
  //                   placeholder="Enter Email OTP"
  //                   className="w-full p-2  rounded-lg mb-3 bg-gray-100 text-center tracking-wide text-md "
  //                   value={otp.email}
  //                   otpEmail={123456}
  //                   maxLength={6}
  //                   onChange={(e) => {
  //                     setOtp((prevOtp) => ({
  //                       ...prevOtp,
  //                       email: e.target.value,
  //                     }));
  //                   }}
  //                 /> */}

  //                 <label className="text-md font-medium text-gray-500">
  //                   Enter Otp
  //                 </label>
  //                 <input
  //                   placeholder="Enter OTP"
  //                   className="w-full p-2  rounded-lg  bg-gray-100 text-center tracking-wide text-md "
  //                   value={otp.mobileNo}
  //                   // otpPhone={987654}
  //                   maxLength={6}
  //                   onChange={(e) => {
  //                     setOtp((prevOtp) => ({
  //                       ...prevOtp,
  //                       mobileNo: e.target.value,
  //                     }));
  //                   }}
  //                 />

  //                 {error && (
  //                   <p className="text-red-500 text-sm mb-2">{error}</p>
  //                 )}

  //                 <div className="flex justify-center">
  //                   <button
  //                     className=" w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2]  text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
  //                     onClick={handleVerifyOtp}
  //                   >
  //                     Verify OTP
  //                   </button>
  //                 </div>

  //                 {countdown > 0 && (
  //                   <p className="text-md text-gray-800 mt-2 flex justify-center">
  //                     Resend OTP in {countdown}s
  //                   </p>
  //                 )}
  //                 {isBtnVisible && (
  //                   // <div className="mt-4">
  //                   <div className="flex justify-center">
  //                     <button
  //                       className=" w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2]  text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
  //                       onClick={handleResendOTP}
  //                     >
  //                       Resend OTP
  //                     </button>
  //                   </div>
  //                 )}
  //               </div>
  //             </>
  //           )}

  //           {/* {step === 4 && (
  //             <>
  //               <div className="flex flex-col space-y-3  justify-center">
  //                 <label className="text-md font-medium text-gray-500 mb-4">
  //                   Enter New Password
  //                 </label>
  //                 <div className="relative mb-4">
  //                   <input
  //                     maxLength="8"
  //                     placeholder="Enter New Password"
  //                     className="w-full p-3 rounded-md bg-gray-100 text-md"
  //                     value={newPassword}
  //                     onChange={(e) => setNewPassword(e.target.value)}
  //                   />
  //                   <span
  //                     className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
  //                     onClick={() => setShowPassword(!showPassword)}
  //                   >
  //                     {showPassword ? (
  //                       <VisibilityOutlinedIcon />
  //                     ) : (
  //                       <VisibilityOffOutlinedIcon />
  //                     )}
  //                   </span>
  //                 </div>

  //                 <label className="text-md font-medium text-gray-500 mb-4">
  //                   Enter Confirm Password
  //                 </label>
  //                 <div className="relative mb-4">
  //                   <input
  //                     maxLength="8"
  //                     placeholder="Confirm New Password"
  //                     className="w-full p-3 rounded-md bg-gray-100 text-md"
  //                     value={confirmPassword}
  //                     onChange={(e) => setConfirmPassword(e.target.value)}
  //                   />
  //                   <span
  //                     className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
  //                     onClick={() => setShowPassword(!showPassword)}
  //                   >
  //                     {showPassword ? (
  //                       <VisibilityOutlinedIcon />
  //                     ) : (
  //                       <VisibilityOffOutlinedIcon />
  //                     )}
  //                   </span>
  //                 </div>
  //                 <div className="flex justify-center">
  //                   <button
  //                     className=" w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2]  text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
  //                     onClick={handleResetPassword}
  //                   >
  //                     Reset Password
  //                   </button>
  //                 </div>
  //               </div>
  //             </>
  //           )} */}
  //         </div>

  //         <div className="bg-gradient-to-tr from-[#4f3ca2] to-[#8a63d2] text-white flex flex-col items-center justify-center p-8 font-poppins">
  //           <img src={celitix_logo} alt="logo" className="w-60 mb-6" />
  //           <p className="text-xl text-center font-medium">
  //             Welcome to the Future of Customer Communication —
  //             <br />
  //             Your Engagement Journey Begins Here.
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};
export default Userlogin;
