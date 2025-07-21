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



export default function InstagramChats() {

  const integrationUrl = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=1321010562294068&redirect_uri=https://app.celitix.com/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;

  const CLIENT_ID = "1321010562294068";
  const REDIRECT_URI = "https://localhost:5173"; // must match what you set in your Instagram App
  const SCOPES = "user_profile,user_media"; // set scopes based on your needs
  // const AUTH_URL = `https://www.instagram.com/oauth/authorize?force_reauth=true&?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
  //   REDIRECT_URI
  // )}&scope=${SCOPES}&response_type=code`;
  const AUTH_URL = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;

  const [authCode, setAuthCode] = useState(null);
  console.log("authCode", authCode)
  const [error, setError] = useState(null);
  console.log("error", error)

  const handleConnect = () => {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // Open popup for Instagram login
    const authWindow = window.open(
      AUTH_URL,
      "InstagramLogin",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    // Listen for messages from the popup
    const checkPopup = setInterval(() => {
      try {
        // If the popup was closed
        if (!authWindow || authWindow.closed) {
          clearInterval(checkPopup);
          return;
        }

        // Check if the popup has redirected back to our redirect_uri
        if (authWindow.location.href.indexOf(REDIRECT_URI) !== -1) {
          const urlParams = new URL(authWindow.location.href).searchParams;
          console.log("urlparams", urlParams)
          const code = urlParams.get("code");
          console.log("insta code", code)
          const errorParam = urlParams.get("error");
          console.log("insta error", errorParam)

          if (code) {
            setAuthCode(code);
          } else if (errorParam) {
            setError(errorParam);
          }

          // Close the popup and stop the check
          authWindow.close();
          clearInterval(checkPopup);
        }
      } catch (err) {
        // Ignore cross-origin errors until the redirect happens
      }
    }, 500);
  };

  return (
    <div className="bg-gradient-to-tr from-purple-100 to-blue-100 h-[85vh] flex items-center justify-center rounded-3xl">
      <div
        className=" flex justify-center p-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}

          className="w-120 max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-3xl shadow-2xl p-3 sm:p-4 animate-fadeIn text-center">


          {/* Instagram Badge */}
          <div className="flex justify-center mb-4">
            {/* <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
            <InstagramIcon sx={{ fontSize: 32, color: "white" }} />
          </div> */}
            <Lottie
              animationData={Instagram}
              loop
              autoplay
              // style={{ width: "48px", height: "48px" }}
              className="w-60"
            />
          </div>

          {/* <p className="text-green-600 text-sm mt-4">
            Successfully received code: {authCode}
          </p>
          <p className="text-red-600 text-sm mt-4">
            Authentication failed: {error}
          </p> */}

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-3">
            Connect to Instagram to get more features
          </h2>

          {/* Subtext */}
          <p className="text-xs  text-gray-600 leading-relaxed text-center mb-3 px-2 sm:px-4">
            To reach more of your community, connect your Facebook Page to a
            professional Instagram account. {" "}
            <a
              href="#"
              className="text-blue-600 underline hover:text-blue-800 transition"
            >
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
          <button className="group w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            onClick={handleConnect}
          >
            <InstagramIcon sx={{ fontSize: 20 }} />
            <span className="group-hover:scale-105 transition-transform">
              Connect with instagram
            </span>
          </button>
          {/* <button className="group w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <InstagramIcon sx={{ fontSize: 20 }} />
            <span className="group-hover:scale-105 transition-transform">
              Comming Soon
            </span>
          </button> */}

          {authCode && (
            <p className="text-green-600 text-sm mt-4">
              Successfully received code: {authCode}
            </p>
          )}
          {error && (
            <p className="text-red-600 text-sm mt-4">
              Authentication failed: {error}
            </p>
          )}
        </motion.div>
      </div>

    </div>
  );
}

// Reusable Feature component
const Feature = ({ icon, text }) => (
  <div className="flex items-start gap-3 hover:bg-blue-50 p-2 rounded-lg transition">
    <div className="text-blue-600">{icon}</div>
    <p className="text-xs text-gray-700">{text}</p>
  </div>
);


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
