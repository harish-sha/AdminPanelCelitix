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

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     const token = localStorage.getItem("token");

    //     console.log("Token saved:", localStorage.getItem("token")); // ✅ Check if token is saved properly


    //     try {
    //         const response = await fetch("/api/proCpaasRest/auth/login", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`,
    //             },
    //             body: JSON.stringify({ userId, password }),
    //         });

    //         const data = await response.json();
    //         // console.log("Login Response:", data);

    //         if (!response.ok) {
    //             throw new Error(data.message || "Invalid credentials!");
    //         }

    //         if (!data.token) {
    //             throw new Error("Authentication failed! Please check your credentials.");
    //         }
    //         localStorage.setItem("token", data.token);
    //         toast.success("Login Successful!");
    //         navigate("/");
    //     } catch (error) {
    //         console.error("Login Error:", error);
    //         toast.error(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/proCpaasRest/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, password }),
            });

            const data = await response.json();
            console.log("Login API Response:", data); // ✅ Debug response

            if (!response.ok || !data.token) {
                throw new Error("Authentication failed! No valid token received.");
            }

            console.log("Received Token:", data.token); // ✅ Debug token

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
                    <UniversalButton
                        label={loading ? "Logging in..." : "Login"}
                        variant="primary"
                        type="submit"
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
