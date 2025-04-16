// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import InputField from "../components/layout/InputField";
// import UniversalButton from "../components/common/UniversalButton";

// const Login = () => {
//     const [userId, setUserId] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         // const apiUrl = import.meta.env.VITE_API_BASE_URL;
//         const apiUrl = "/api";

//         try {
//             const response = await fetch(`${apiUrl}/proCpaasRest/auth/login`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ userId, password }),
//             });

//             const data = await response.json();

//             if (!response.ok || !data.token) {
//                 throw new Error("Authentication failed! No valid token received.");
//             }

//             localStorage.setItem("token", data.token);

//             toast.success("Login Successful!");
//             navigate("/");
//         } catch (error) {
//             console.error("Login Error:", error);
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="p-6 bg-white rounded-lg shadow-lg w-96">
//                 <h2 className="mb-4 text-2xl font-semibold text-center">Login</h2>
//                 <form onSubmit={handleLogin} className="space-y-4">
//                     <InputField
//                         id="userId"
//                         name="userId"
//                         label="User ID"
//                         value={userId}
//                         onChange={(e) => setUserId(e.target.value)}
//                         placeholder="Enter your User ID"
//                     />
//                     <InputField
//                         id="password"
//                         name="password"
//                         label="Password"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter your password"
//                     />
//                     <div className="flex items-center justify-center" >

//                         <UniversalButton
//                             label={loading ? "Logging in..." : "Login"}
//                             variant="primary"
//                             type="submit"
//                             disabled={loading}
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from "react";
import toast from "react-hot-toast";
import "./login.css";
import InputField from "../components/layout/InputField";
import { Link, useNavigate } from "react-router-dom";
import UniversalButton from "../components/common/UniversalButton";
import celitixLogo from "../assets/images/celitix-logo-white.svg";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // const usrNameRegex = /^(?!^[0-9]+[a-z])[a-z0-9]{6,8}$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,8}$/;

    // if (!usrNameRegex.test(userId)) {
    //     toast.error('Please enter a valid User Id');
    //     return;
    // }

    // if (!passwordRegex.test(password)) {
    //     toast.error('Please enter a valid Password');
    //     return;
    // }

    setLoading(true);
    try {
      const response = await fetch("/api/proCpaasRest/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();
      console.log("Login API Response:", data);

      if (!response.ok || !data.token) {
        throw new Error("Authentication failed! No valid token received.");
      }

      console.log("Received Token:", data.token);

      localStorage.setItem("token", data.token);
      console.log(
        "Token saved in localStorage:",
        localStorage.getItem("token")
      );

      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-[#edf5ff]">
        <div className="bg-[#ffffff] rounded-xl shadow-lg w-[830px] h-120">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            <form
              onSubmit={handleLogin}
              className="h-full flex flex-col md:p-6 mt-12 space-y-4 p-2"
            >
              <h1 className="text-[2.8rem] text-center font-semibold bluetxt pb-2">
                Sign In
              </h1>
              {/* <InputField
                id="userId"
                name="userId"
                label="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                type="text"
                className="form-control"
                required
              /> */}
              <div className="text-[0.95rem] font-medium text-gray-700 mb-2">User ID</div>
              <input
                type="text"
                id="userId"
                name="userId"
                label="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                className={`block w-full p-2 py-2.5 border rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm`}
                required
              />
              <div className="relative">
                {/* <InputField
                  type={showPassword ? "text" : "password"}
                  className="relative"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  id="password"
                  name="password"
                  label="Password"
                  maxLength={8}
                /> */}
                <div className="text-[0.95rem] font-medium text-gray-700 mb-2">Password</div>
                <input
                  type={showPassword ? "text" : "password"}
                  // className="relative"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {/* <UniversalButton
                  label={loading ? "Logging in..." : "Login"}
                  variant="primary"
                  type="submit"
                  disabled={loading}
                /> */}
                {/* <button class="custom-signin-btn" type="submit">
                  <div class="back"></div>
                  <span class="text">Login</span>
                </button> */}
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
              <Link className="mb-5" to="https://celitix.com">
                <img
                  src={celitixLogo}
                  alt="Celitix"
                  style={{ width: "220px" }}
                />
              </Link>
              <p className="text-center text-md">
                Welcome to the Future of Customer Communication - Your
                Engagement Journey Begins Here.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
