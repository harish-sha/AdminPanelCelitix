import React, { useState, useEffect } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InstagramIcon from "@mui/icons-material/Instagram";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import Instagram from "@/assets/animation/Instagram.json";
import { FaRegShareSquare } from "react-icons/fa";
import { BiChat } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
// import Messengeranimation from "@/assets/animation/Messengeranimation.json";
import { Dialog } from "primereact/dialog";
import {
  exchangeCodeForToken,
  getLongLivedToken,
  getInstagramProfile,
} from "@/apis/instagram/instagram";

export default function EmbeddedInstagram({ setStep, userAceessToken, setUserAccessToken }) {
  const integrationUrl = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=1321010562294068&redirect_uri=https://app.celitix.com/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;

  const CLIENT_ID = "1321010562294068";
  const REDIRECT_URI = "https://localhost:5173"; // must match what you set in your Instagram App
  const SCOPES = "user_profile,user_media"; // set scopes based on your needs
  // const AUTH_URL = `https://www.instagram.com/oauth/authorize?force_reauth=true&?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
  //   REDIRECT_URI
  // )}&scope=${SCOPES}&response_type=code`;
  const AUTH_URL = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;

  const [authCode, setAuthCode] = useState(null);
  console.log("authCode", authCode);
  const [error, setError] = useState(null);
  console.log("error", error);

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

    const exchangeCode =
      "AQCYZKB2g95Z7AyAWiXviAkRvQssJhqnru4I6x4eHvV6htBZZPX6ktHlbKLOha6JttWYfwUhPhQQfH-_6_wVoB1_Q-c5Cwo_6cHJTokOD6bduOiJTgtdgpm8qCMpxZyO9-GvhhOLMhqzGZwRNKRfzNQ03dGMOuesusg86C_iPzWYxN823qzlCfAGnbzPvhscTtInWlwBz4CgSgnInaCI4LtGgcTW31oydDMgV5B1nOJTqA";
    const accessToken =
      "IGAASxc71PYTRBZAE1ic3lnSTdmZAmh5YUx2ZAGhaMk52U2hIQ1ZAuSEJiWXNGYlFPa3JOUEI4bnM5WW9FcTN3RnVSWHNIVEViS2FMVUVKM0w5alQ3Nm9ZAOS1jZAktsWHZA2VG5YY0Ywa1A5Tlp3WWlMaGxkY2F3";

    // fetchLongLivedToken()
    // getUserInstagramProfile(accessToken)
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
          console.log("urlparams", urlParams);
          const code = urlParams.get("code");
          console.log("insta code", code);
          const errorParam = urlParams.get("error");
          console.log("insta error", errorParam);
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
    // setStep(2);
  };

  // const getExchangeToken = async (code) => {
  //   try {
  //     const tokenData = await exchangeCodeForToken({
  //       client_id: "1321010562294068",
  //       client_secret: "eec1c264a3ae337782fe1cdf103b8b52",
  //       grant_type: "authorization_code",
  //       redirect_uri: "https://localhost:5173/",
  //       code: code,
  //     });

  //     console.log("Access Token:", tokenData);
  //   } catch (err) {
  //     console.error("Token exchange failed:", err);
  //     setError("Token exchange failed");
  //   }
  // };

  const getExchangeToken = async (code) => {
    try {
      const tokenResponse = await exchangeCodeForToken({
        client_id: "1321010562294068",
        client_secret: "eec1c264a3ae337782fe1cdf103b8b52",
        grant_type: "authorization_code",
        redirect_uri: "https://localhost:5173/",
        code: code,
      });

      const tokenData = await tokenResponse.json(); // Parse the JSON response
      console.log("Access Token Data:", tokenData);

      // Access token is in tokenData.access_token
    } catch (err) {
      console.error("Token exchange failed:", err);
      setError("Token exchange failed");
    }
  };

  const fetchLongLivedToken = async () => {
    try {
      const longLivedToken = await getLongLivedToken({
        grant_type: "ig_exchange_token",
        client_secret: "eec1c264a3ae337782fe1cdf103b8b52",
        access_token:
          "IGAASxc71PYTRBZAE55TmJBX1pPZA1J0SWpVUUdBVVNTNVBYbWQ4YjBoT0RUZAmJBZA3U4RVhGRW12ZAmY0cDF3dlppdDhsaGdJSzVYZAzJURjJDWDJ3Q3ZAFdlYzMjdJUkpBbzNyLWN1ZA0lkcGF2SDAxWEYyQWJXdlJBUHAxdjltS2NrZAmZAEaHlRbmZAueDJwVUlFTTFpOUo5NgZDZD",
      });

      setUserAccessToken(longLivedToken);

      console.log("Access Token:", longLivedToken);
    } catch (err) {
      console.error("Token exchange failed:", err);
      setError("Token exchange failed");
    }
  };


  useEffect(() => {
    if (authCode) {
      console.log("Exchanging code for token:", authCode);
      getExchangeToken(authCode);
    }
  }, [authCode]);

  // Reusable Feature component
  const Feature = ({ icon, text }) => (
    <div className="flex items-center gap-3 hover:bg-blue-50 p-2 py-2.5 rounded-lg transition border border-dashed">
      <div className="text-blue-600">{icon}</div>
      <p className="text-[0.78rem] text-gray-700">{text}</p>
    </div>
  );

  return (
    <motion.div
      style={{
        background: "linear-gradient(270deg, #fdeba2, #f6a4c3, #a693f5)",
        backgroundSize: "400% 400%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 20,
        ease: "easeInOut",
        repeat: Infinity,
      }}

      className="bg-gradient-to-br from-[#fdeba2] via-[#f6a4c3] to-[#a693f5] h-[91vh] flex items-center justify-center rounded-3xl overflow-scroll shadow-2xl">
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

          {/* <p className="text-green-600 text-sm mt-4 text-wrap w-full break-words">
            Successfully received code: {authCode}
          </p>
          <p className="text-red-600 text-sm mt-4 text-wrap w-full break-words">
            Authentication failed: {error}
          </p> */}

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

          {/* CTA Button */}
          {/* <button className="group w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white text-md font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg cursor-pointer hover:scale-104"
            onClick={handleConnect}
          >
            <InstagramIcon sx={{ fontSize: 25 }} />
            Connect with instagram
          </button> */}
          <button
            className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white text-md font-semibold py-3 rounded-lg shadow-md cursor-pointer overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
            onClick={handleConnect}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/60 to-white/30   animate-shine" />

            <InstagramIcon sx={{ fontSize: 25 }} />
            <span className="relative z-10">Connect with Instagram</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
