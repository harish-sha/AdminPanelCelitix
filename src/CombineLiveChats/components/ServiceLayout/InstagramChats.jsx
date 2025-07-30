import React, { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InstagramIcon from "@mui/icons-material/Instagram";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import Instagram from "@/assets/animation/Instagram.json";
import Messengeranimation from "@/assets/animation/Messengeranimation.json";
import { Dialog } from "primereact/dialog";
import { FaRegShareSquare } from "react-icons/fa";
import { BiChat } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";


export default function InstagramChats() {

  // Reusable Feature component
  const Feature = ({ icon, text }) => (
    <div className="flex items-center gap-3 hover:bg-blue-50 p-2 py-2.5 rounded-lg transition border border-dashed">
      <div className="text-blue-600">{icon}</div>
      <p className="text-[0.78rem] text-gray-700">{text}</p>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-[#fdeba2] via-[#f6a4c3] to-[#a693f5] h-[91vh] flex items-center justify-center rounded-3xl overflow-scroll shadow-2xl">
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-120 max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-3xl shadow-2xl p-3 sm:p-4 animate-fadeIn text-center"
        >
          {/* Instagram Badge */}
          <div className="flex justify-center mb-2">
            <Lottie animationData={Instagram} loop autoplay className="w-60" />
          </div>

          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-3 bluetxt playf">
            Connect to Instagram to get more features
          </h2>

          {/* Subtext */}
          <p className="text-xs  text-gray-600 leading-relaxed text-center mb-3 px-2 sm:px-4">
            To reach more of your community, connect your Facebook Page to a
            professional Instagram account.{" "}
            <a
              href="#"
              className="text-blue-600 underline hover:text-blue-800 transition"
            >
              Learn more
            </a>
          </p>

          <div className="space-y-4 mb-2">
            <Feature
              icon={<FaRegShareSquare fontSize="20px" color="#f9ce34" />}
              text="Share stories, posts and ads across Facebook and Instagram"
            />
            <Feature
              icon={<BiChat fontSize="20px" color="#ee2a7b" />}
              text="Manage comments and messages in one place"
            />
            <Feature
              icon={<FaRegUserCircle fontSize="20px" color="#6228d7" />}
              text="Sync profile info like name and website"
            />
          </div>

          <button
            className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white text-md font-semibold py-3 rounded-lg shadow-md cursor-pointer overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/60 to-white/30   animate-shine" />

            <InstagramIcon sx={{ fontSize: 25 }} />
            <span className="relative z-10">Connect with Instagram</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}


// instagram setting ui
export function InstagramChatsSettings() {
  return (
    <div className="bg-gradient-to-tr from-purple-100 to-blue-100 min-h-[85vh] flex items-center justify-center p-4 rounded-3xl overflow-scroll">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-3xl shadow-2xl p-4 sm:p-6 text-center md:h-auto pb-10 md:pb-6"
      >
        {/* Instagram Badge */}
        <div className="flex justify-center mb-4">
          <Lottie
            animationData={Instagram}
            loop
            autoplay
            className="w-full max-w-[150px] sm:max-w-[200px]"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
          Instagram Settings
        </h2>

        {/* Subtext */}
        <p className="text-sm text-gray-600 leading-relaxed mb-3 px-2 sm:px-4">
          Stay tuned! Live chat settings are coming soon to help you manage conversations in real-time.
        </p>

        {/* Features */}
        <div className="space-y-3 sm:space-y-4 mb-4">
          <FeatureSettings
            icon={<ShareIcon />}
            text="Chat instantly with followers and customers."
          />
          <FeatureSettings
            icon={<ChatBubbleOutlineIcon />}
            text="Manage messages and replies in one place."
          />
          <FeatureSettings
            icon={<AccountCircleIcon />}
            text="Get quick access to chat history and settings."
          />
        </div>

        {/* CTA Button */}
        <button className="group w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-sm sm:text-base font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"


        >
          <InstagramIcon sx={{ fontSize: 20 }} />
          <span className="group-hover:scale-105 transition-transform">
            Coming soon
          </span>
        </button>



      </motion.div>
    </div>
  );
}

// Reusable Feature component
const FeatureSettings = ({ icon, text }) => (
  <div className="flex items-start gap-3 hover:bg-blue-50 p-2 rounded-lg transition">
    <div className="text-blue-600">{icon}</div>
    <p className="text-xs text-gray-700">{text}</p>
  </div>
);
