import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = sessionStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;


// Route code with user role check - later update for all users

// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useUser } from "@/context/auth";

// const PrivateRoute = () => {
//   const token = sessionStorage.getItem("token");
//   const { user, authLogout } = useUser();
//   const { ttl } = user || {};
//   const [isValid, setIsValid] = useState(true);


//   useEffect(() => {
//     if (token && ttl) {
//       const now = Date.now();
//       if (now > parseInt(ttl)) {
//         // sessionStorage.removeItem("token");
//         // authLogout?.();
//         // setIsValid(false);
//         console.log("hello")
//       }
//     }
//   }, [ttl, token, authLogout]);

//   if (!token || !isValid) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default PrivateRoute;