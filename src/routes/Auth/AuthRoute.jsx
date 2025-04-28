import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  return token ? <Navigate to="/" replace /> : children;
};

export default AuthRoute;
