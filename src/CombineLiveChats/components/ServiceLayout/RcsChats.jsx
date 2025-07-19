import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import SmsIcon from "@mui/icons-material/Sms"; // RCS-style chat icon
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import rcschatanimation from "@/assets/animation/rcschatanimation.json";
import rcschatanimation2 from "@/assets/animation/rcschatanimation2.json";
import ShareIcon from "@mui/icons-material/Share";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function PrivessLogin() {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 h-[85vh] flex items-center justify-center rounded-3xl">
      <div className="flex justify-center p-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-120 max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-3xl shadow-2xl p-3 sm:p-4 animate-fadeIn text-center">
          {/* Close Button */}


          {/* RCS Icon Bubble */}
          <div className="mb-5 flex items-center justify-center">
            {/* <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center shadow-md">
            <SmsIcon sx={{ fontSize: 32, color: "#fff" }} />
          </div> */}
            <Lottie
              animationData={rcschatanimation2}
              loop
              autoplay
              // style={{ width: "48px", height: "48px" }}
              className="w-30"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            Subscribe to RCS Messaging
          </h2>
          <p className="text-xs text-gray-600 mb-6">
            Use your RCS-enabled number or Google account to get started with Privess.
          </p>

          {/* Info Box */}
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

          {/* Google Login Button */}
          <button className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-lg mb-3 cursor-pointer">
            <SmsIcon />
            Continue with RCS Number
          </button>



          {/* Footer */}
          <p className="text-xs text-gray-500 mt-4">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{" "}
            <a href="#" className="text-blue-600 hover:underline">T&Cs</a>.
          </p>
        </motion.div>
      </div>

    </div>
  );
}

const Feature = ({ icon, text }) => (
  <div className="flex items-start gap-3 hover:bg-blue-50 p-2 rounded-lg transition">
    <div className="text-blue-600">{icon}</div>
    <p className="text-xs text-gray-700">{text}</p>
  </div>
);



export function RcsSettings() {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 min-h-[85vh] flex items-center justify-center p-4 rounded-3xl overflow-scroll h-full">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-3xl shadow-2xl p-4 sm:p-6 text-center overflow-auto h-full md:h-auto pb-10 md:pb-6"
      >
        {/* RCS Icon Bubble */}
        <div className="mb-5 flex items-center justify-center">
          <Lottie
            animationData={rcschatanimation2}
            loop
            autoplay
            className="w-full max-w-[80px] sm:max-w-[100px]"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2">
          RCS Settings
        </h2>
        <p className="text-xs sm:text-base text-gray-600 mb-6">
          Use your RCS number or Google account to get started with Privess.
        </p>

        {/* Info Box */}
        <div className="space-y-3 sm:space-y-4 mb-4">
          <FeatureSetting
            icon={<ShareIcon />}
            text="Share stories, posts and ads across Facebook and Instagram"
          />
          <FeatureSetting
            icon={<ChatBubbleOutlineIcon />}
            text="Manage comments and messages in one place"
          />
          <FeatureSetting
            icon={<AccountCircleIcon />}
            text="Sync profile info like name and website"
          />
        </div>

        {/* Google Login Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white text-sm sm:text-base font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg mb-3">
          <SmsIcon />
          Continue with RCS Number
        </button>

        
      </motion.div>
    </div>
  );
}

const FeatureSetting = ({ icon, text }) => (
  <div className="flex items-start gap-3 hover:bg-blue-50 p-2 rounded-lg transition">
    <div className="text-blue-600">{icon}</div>
    <p className="text-xs text-gray-700">{text}</p>
  </div>
);
