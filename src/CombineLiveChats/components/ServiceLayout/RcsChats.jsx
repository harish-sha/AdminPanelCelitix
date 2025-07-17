import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import SmsIcon from "@mui/icons-material/Sms"; // RCS-style chat icon

export default function PrivessLogin({ onClose = () => {} }) {
  return (
    <div className=" flex  justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 p-10">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-blue-100 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition"
        >
          <CloseIcon />
        </button>

        {/* RCS Icon Bubble */}
        <div className="mb-5">
          <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center shadow-md">
            <SmsIcon sx={{ fontSize: 32, color: "#fff" }} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          Login or Sign up
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Use your RCS-enabled number or Google account to get started with Privess.
        </p>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 text-sm text-blue-800 rounded-lg px-4 py-3 mb-6 text-left flex items-start gap-2">
          <span className="text-blue-600 text-base">✔</span>
          Privess uses <span className="font-medium">Rich Communication Services (RCS)</span> to deliver interactive and secure messaging experiences.
        </div>

        {/* Google Login Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-lg mb-3">
           <SmsIcon />
          Continue with RCS Number
        </button>

        

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{" "}
          <a href="#" className="text-blue-600 hover:underline">T&Cs</a>.
        </p>
      </div>
    </div>
  );
}
