import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import Messengeranimation from "@/assets/animation/Messengeranimation.json";
import Slackloader from "@/assets/animation/Slackloader.json";
import ShareIcon from "@mui/icons-material/Share";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function MessengerChats() {
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
    <div className="bg-gradient-to-br from-[#e8f0ff] via-white to-[#e3ecff] h-[85vh] flex items-center justify-center rounded-3xl">
      <div
        className="flex justify-center rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}

          className="w-120 max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-3xl shadow-2xl p-3 sm:p-4 animate-fadeIn text-center">
          {/* Close Button */}

          {/* Messenger Icon Bubble */}
          <div className="mb-5 flex items-center justify-center">
            {/* <div className="w-16 h-16 mx-auto bg-[#0084FF] rounded-full flex items-center justify-center shadow-md">
            <ChatBubbleOutlineIcon sx={{ fontSize: 32, color: "#fff" }} />
          </div> */}
            <Lottie
              animationData={Messengeranimation}
              loop
              autoplay
              // style={{ width: "48px", height: "48px" }}
              className="w-30"
            />
          </div>

          {/* <p className="text-green-600 text-sm mt-4">
            Successfully received code: {authCode}
          </p>
          <p className="text-red-600 text-sm mt-4">
            Authentication failed: {error}
          </p> */}

          {/* Title */}
          <h2 className="text-2xl font-bold text-[#0084FF] mb-2">
            Login or Sign up
          </h2>
          <p className="text-xs text-gray-600 mb-6">
            Use your Messenger account to connect with Privess and start chatting
            securely.
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

          {/* Messenger Login Button */}
          {/* <button className="w-full flex items-center justify-center gap-3 bg-[#0084FF] text-white font-semibold py-2.5 rounded-lg hover:bg-[#006ddf] transition-all shadow-sm hover:shadow-lg"
            onClick={handleConnect}
          >
            <ChatBubbleOutlineIcon />
            Connect with messenger
          </button> */}
          <button className="w-full flex items-center justify-center gap-3 bg-[#0084FF] text-white font-semibold py-2.5 rounded-lg hover:bg-[#006ddf] transition-all shadow-sm hover:shadow-lg"
          >
            <ChatBubbleOutlineIcon />
            Comming Soon
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-4">
            By continuing, you agree to our
            <a href="#" className="text-[#0084FF] hover:underline">
              Privacy Policy
            </a>
            and
            <a href="#" className="text-[#0084FF] hover:underline">
              T&Cs
            </a>
            .
          </p>
        </motion.div>
      </div>

    </div>
    // <motion.div
    //   initial={{ opacity: 0, y: 30 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.4 }}
    //   className="flex justify-center bg-gradient-to-br from-[#e8f0ff] via-white to-[#e3ecff] p-15"
    // >
    //   <Lottie
    //     animationData={Slackloader}
    //     loop
    //     autoplay
    //     className="w-100"
    //   />
    // </motion.div>
  );
}

const Feature = ({ icon, text }) => (
  <div className="flex items-start gap-3 hover:bg-blue-50 p-2 rounded-lg transition">
    <div className="text-blue-600 ">{icon}</div>
    <p className="text-xs text-gray-700">{text}</p>
  </div>
);



export function MessengerChatsSetting({ onClose = () => { } }) {
  return (
    <div className="bg-gradient-to-br from-[#e8f0ff] via-white to-[#e3ecff] min-h-[85vh] flex items-center justify-center p-4 rounded-3xl h-full overflow-scroll">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-3xl shadow-2xl p-4 sm:p-6 text-center md:h-auto pb-10 md:pb-6"
      >
        {/* Messenger Icon */}
        <div className="mb-5 flex items-center justify-center">
          <Lottie
            animationData={Messengeranimation}
            loop
            autoplay
            className="w-full max-w-[80px] sm:max-w-[100px]"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#0084FF] mb-2">
          Settings
        </h2>
        <p className="text-xs text-gray-600 mb-6">
          Exciting news! Live chat settings will be live soon for smoother, smarter conversations.
        </p>

        {/* Info Box */}
        <div className="space-y-3 sm:space-y-4 mb-4">
          <FeatureSettings
            icon={<ShareIcon />}
            text="Share stories, posts and ads across Facebook and Instagram"
          />
          <FeatureSettings
            icon={<ChatBubbleOutlineIcon />}
            text="Manage comments and messages in one place"
          />
          <FeatureSettings
            icon={<AccountCircleIcon />}
            text="Sync profile info like name and website"
          />
        </div>

        {/* Messenger Login Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-[#0084FF] text-white text-sm sm:text-base font-semibold py-3 rounded-lg hover:bg-[#006ddf] transition-all shadow-md hover:shadow-lg">
          <ChatBubbleOutlineIcon />
          Coming soon
        </button>

        {/* Footer */}
        <p className="text-xs sm:text-sm text-gray-500 mt-4">
          By continuing, you agree to our{" "}
          <a href="#" className="text-[#0084FF] hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#0084FF] hover:underline">
            T&Cs
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}

const FeatureSettings = ({ icon, text }) => (
  <div className="flex items-start gap-3 hover:bg-blue-50 p-2 rounded-lg transition">
    <div className="text-blue-600">{icon}</div>
    <p className="text-xs text-gray-700">{text}</p>
  </div>
);
