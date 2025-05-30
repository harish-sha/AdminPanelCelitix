import React from "react";
import { motion } from "framer-motion";

export const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-xl font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// export { Button };
