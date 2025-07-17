import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function MessengerChats({ onClose = () => {} }) {
  return (
    <div className="flex justify-center bg-gradient-to-br from-[#e8f0ff] via-white to-[#e3ecff] p-15">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-blue-100 animate-fadeIn">
        {/* Close Button */}
       

        {/* Messenger Icon Bubble */}
        <div className="mb-5">
          <div className="w-16 h-16 mx-auto bg-[#0084FF] rounded-full flex items-center justify-center shadow-md">
            <ChatBubbleOutlineIcon sx={{ fontSize: 32, color: "#fff" }} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#0084FF] mb-2">
          Login or Sign up
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Use your Messenger account to connect with Privess and start chatting securely.
        </p>

        {/* Info Box */}
        <div className="bg-[#f0f6ff] border border-blue-200 text-sm text-blue-900 rounded-lg px-4 py-3 mb-6 text-left flex items-start gap-2">
          <span className="text-[#0084FF] text-base">✔</span>
          Privess supports <span className="font-medium">Messenger-powered secure messaging</span> with real-time sync.
        </div>

        {/* Messenger Login Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-[#0084FF] text-white font-semibold py-2.5 rounded-lg hover:bg-[#006ddf] transition-all shadow-sm hover:shadow-lg">
          <ChatBubbleOutlineIcon />
          Continue with Messenger
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4">
          By continuing, you agree to our{" "}
          <a href="#" className="text-[#0084FF] hover:underline">Privacy Policy</a> and{" "}
          <a href="#" className="text-[#0084FF] hover:underline">T&Cs</a>.
        </p>
      </div>
    </div>
  );
}
