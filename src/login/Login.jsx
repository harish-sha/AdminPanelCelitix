import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputField from "../components/layout/InputField";
import UniversalButton from "../components/common/UniversalButton";

const Login = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const apiUrl = "/api";
        console.log("API URL: ", apiUrl);

        try {
            const response = await fetch(`${apiUrl}/proCpaasRest/auth/login`, {
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
            console.log("Token saved in localStorage:", localStorage.getItem("token"));

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
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <InputField
                        id="userId"
                        name="userId"
                        label="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter your User ID"
                    />
                    <InputField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                    <div className="flex items-center justify-center" >

                        <UniversalButton
                            label={loading ? "Logging in..." : "Login"}
                            variant="primary"
                            type="submit"
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;


// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// // import Header from './Header';
// // import Footer from './Footer';
// import './login.css'
// import InputField from '../components/layout/InputField';
// import { useNavigate } from 'react-router-dom';
// import UniversalButton from "../components/common/UniversalButton";
// import Header from './components/Header';
// import Footer from './components/Footer';


// const Login = () => {
//     const [userId, setUserId] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     // const handleLogin = async (e) => {
//     //     e.preventDefault();
//     //     const usrNameRegex = /^(?!^[0-9]+[a-z])[a-z0-9]{6,8}$/;
//     //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,8}$/;

//     //     if (!usrNameRegex.test(email)) {
//     //         toast.error('Please enter a valid User Id');
//     //         return;
//     //     }

//     //     if (!passwordRegex.test(password)) {
//     //         toast.error('Please enter a valid Password');
//     //         return;
//     //     }

//     //     try {
//     //         // Perform your login API request here
//     //         // Example: const response = await fetch('/api/login', { method: 'POST', body: { email, password } });
//     //         toast.success('Login Successful');
//     //         // history.push('/dashboard'); // Redirect to a dashboard or home page after successful login
//     //     } catch (error) {
//     //         toast.error('Login failed. Please try again.');
//     //     }
//     // };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         // const usrNameRegex = /^(?!^[0-9]+[a-z])[a-z0-9]{6,8}$/;
//         // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,8}$/;

//         // if (!usrNameRegex.test(userId)) {
//         //     toast.error('Please enter a valid User Id');
//         //     return;
//         // }

//         // if (!passwordRegex.test(password)) {
//         //     toast.error('Please enter a valid Password');
//         //     return;
//         // }
//         setLoading(true);
//         try {

//             const response = await fetch("/api/proCpaasRest/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ userId, password }),
//             });

//             const data = await response.json();
//             console.log("Login API Response:", data); // ✅ Debug response

//             if (!response.ok || !data.token) {
//                 throw new Error("Authentication failed! No valid token received.");
//             }

//             console.log("Received Token:", data.token); // ✅ Debug token

//             localStorage.setItem("token", data.token);
//             console.log("Token saved in localStorage:", localStorage.getItem("token"));

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
//         <>
//             <Header />
//             <div className="login-container">
//                 <div className="container">
//                     <div className="row flex">
//                         <div className="col-md-6">
//                             <form onSubmit={handleLogin} className="form-signin">
//                                 <h1>Sign In</h1>
//                                 <InputField
//                                     id="userId"
//                                     name="userId"
//                                     label="User ID"
//                                     value={userId}
//                                     onChange={(e) => setUserId(e.target.value)}
//                                     placeholder="Enter your User ID"
//                                     type="text"
//                                     className="form-control"
//                                     required
//                                 />
//                                 <div className="input-group">
//                                     <InputField
//                                         type="password"
//                                         className="form-control"
//                                         placeholder="Enter password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                         id="password"
//                                         name="password"
//                                         label="Password"
//                                     />
//                                 </div>
//                                 <UniversalButton
//                                     label={loading ? "Logging in..." : "Login"}
//                                     variant="primary"
//                                     type="submit"
//                                     disabled={loading}
//                                 />
//                                 {/* <button type="submit" className="btn">Sign In</button> */}
//                             </form>
//                         </div>
//                         <div className="col-md-6">
//                             <div className="right-container">
//                                 <p>Welcome to the Future of Customer Communication - Your Engagement Journey Begins Here.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>

//     );
// };

// export default Login;

