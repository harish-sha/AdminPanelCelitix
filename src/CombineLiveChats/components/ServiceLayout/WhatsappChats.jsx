import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
export default function PrivessLogin() {
  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-green-50 flex  justify-center p-15">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-green-100">
        {/* Close Icon */}
        

        {/* WhatsApp Logo or Mascot */}
        <div className="mb-5">
          <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center shadow-md">
  <WhatsAppIcon sx={{ fontSize: 32, color: "#fff" }} />
</div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-green-800 mb-2">Login or Sign up</h2>
        <p className="text-sm text-gray-600 mb-6">
          Access secure features by logging in or signing up to Privess.
        </p>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 text-sm text-green-800 rounded-lg px-4 py-3 mb-6 text-left flex items-start gap-2">
          <span className="text-green-600 text-base">✔</span>
          Privess uses <span className="font-medium">end-to-end encryption</span> for privacy and protection.
        </div>

        {/* Google Login Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 transition-all shadow-sm hover:shadow-lg">
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 mt-4">
          By continuing, you agree to our{" "}
          <a href="#" className="text-green-600 hover:underline">Privacy Policy</a> and{" "}
          <a href="#" className="text-green-600 hover:underline">T&Cs</a>.
        </p>
      </div>
    </div>
  );
}
