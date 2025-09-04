import { motion } from "framer-motion";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import Lottie from "lottie-react";
import Stopwatch from "@/assets/animation/Stopwatch.json";



export const ClosedChat = ({ setSendMessageDialogVisible }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      // initial="hidden"
      // animate="visible"
      // exit="exit"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center w-full p-3 gap-2 bg-white shadow-md rounded-t-lg md:mb-0 md:flex-col min-h-80 border-2 border-dashed border-[#7ba8cf]"
    >

      <Lottie
        animationData={Stopwatch}
        loop
        autoplay
        className="w-60 h-45"
      // style={{ width: "full", height: "48px" }}
      />
      <div className="flex items-center gap-2 text-gray-700">
        <AccessAlarmOutlinedIcon className="text-red-500" />
        <p className="font-semibold">24 Hour Window Elapsed</p>
      </div>
      <p className="text-sm text-gray-600 text-center max-w-md leading-relaxed">
        The <span className="font-semibold">24-hour conversation window has elapsed </span>
        for this conversation.
        To reconnect, Please wait for the user to initiate a chat or send a{" "}
        <span className="font-semibold text-green-700">WhatsApp-approved template message</span>&nbsp;
        to continue the chat.
      </p>
      {/* Right Section */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSendMessageDialogVisible(true)}
        className="flex items-center justify-center px-6 py-2 mt-2 text-white font-medium bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-all duration-200 rounded-full shadow-lg cursor-pointer text-sm tracking-wider"
      >
        Send Template to Start Chat
        <ArrowRightAltOutlinedIcon className="ml-2" />
      </motion.button>
    </motion.div>
  );
};
