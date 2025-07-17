import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function InstagramChats() {
  return (
    <div className=" flex justify-center bg-gradient-to-tr from-purple-100 to-blue-100 p-10">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-3xl shadow-2xl p-3 sm:p-4 animate-fadeIn">
        {/* Instagram Badge */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
            <InstagramIcon sx={{ fontSize: 32, color: "white" }} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
          Connect to Instagram
        </h2>

        {/* Subtext */}
        <p className="text-sm  text-gray-600 leading-relaxed text-center mb-3 px-2 sm:px-4">
          To reach more of your community, connect your Facebook Page to a professional Instagram account.
          If you connect a personal Instagram account, it will be switched to professional.{" "}
          <a href="#" className="text-blue-600 underline hover:text-blue-800 transition">
            Learn more
          </a>
        </p>

        {/* Features */}
        <div className="space-y-4 mb-2">
          <Feature
            icon={<ShareIcon />}
            text="Share stories, posts and ads across Facebook and Instagram"
          />
          <Feature
            icon={<ChatBubbleOutlineIcon />}
            text="Manage comments and messages in one place"
          />
          <Feature
            icon={<AccountCircleIcon />}
            text="Sync profile info like name and website"
          />
        </div>

        {/* CTA Button */}
        <button className="group w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
          <InstagramIcon sx={{ fontSize: 20 }} />
          <span className="group-hover:scale-105 transition-transform">Connect Instagram</span>
        </button>
      </div>
    </div>
  );
}

// Reusable Feature component
const Feature = ({ icon, text }) => (
  <div className="flex items-start gap-3 hover:bg-blue-50 p-2 rounded-lg transition">
    <div className="text-blue-600 mt-0.5">{icon}</div>
    <p className="text-sm text-gray-700">{text}</p>
  </div>
);
