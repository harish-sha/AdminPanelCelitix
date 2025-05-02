import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = sessionStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;


// import React, { useEffect } from "react";
// import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import { useUser } from "@/context/auth";

// const PrivateRoute = () => {
//   const token = sessionStorage.getItem("token");
//   const { user } = useUser();
//   const { ttl } = user;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = Date.now() + 3600 * 1000;
//       if (ttl && now > parseInt(ttl)) {
//         clearInterval(interval);
//         sessionStorage.removeItem("token");
//         localStorage.removeItem("ttl");
//         navigate("/login", { replace: true });
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [ttl, navigate]);

//   return token ? <Outlet /> : <Navigate to="/login" replace />;
// };