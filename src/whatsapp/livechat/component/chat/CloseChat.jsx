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
      className=" flex flex-col items-center justify-between w-full bg-[#faf7f4] shadow-md rounded-t-lg md:mb-0 md:flex-row  h-full border-1 border-dashed border-[#128c7e] py-2 px-2"
    >
      <div className="flex md:flex-row items-center justify-center">
        <div className="flex items-center text-gray-700 text-sm">
          <Lottie
            animationData={Stopwatch}
            loop
            autoplay
            className="w-10 h-10 md:w-12 md:h-12"
          />
          {/* <AccessAlarmOutlinedIcon className="text-red-500" /> */}
          <p className="font-semibold">24 Hour Window Elapsed</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 text-center max-w-md leading-relaxed">
        The <span className="font-semibold">24-hour conversation window has elapsed </span>
        for this conversation.
        To reconnect, Please wait for the user to initiate a chat or send a{" "}
        <span className="font-semibold text-green-700">WhatsApp-approved template message</span>&nbsp;
        to continue the chat.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSendMessageDialogVisible(true)}
        className="flex items-center justify-center px-4 py-2  text-white font-medium bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-all duration-200 rounded-full shadow-lg cursor-pointer tracking-wider text-xs text-nowrap"
      >
        Send Template
        <ArrowRightAltOutlinedIcon />
      </motion.button>
    </motion.div>
    // <motion.div
    //   variants={containerVariants}
    //   initial="hidden"
    //   animate="visible"
    //   exit="exit"
    //   className="flex flex-col items-center  w-full p-3 gap-2 bg-white shadow-lg rounded-t-lg md:mb-0 md:flex-row"
    // >
    //   <div className="flex items-center gap-2 text-gray-700">
    //     <AccessAlarmOutlinedIcon className="text-red-500" />
    //     <p className="font-semibold">24 Hour Window Elapsed</p>
    //   </div>
    //   <p className="text-xs text-gray-500 text-center md:text-left mt-2 md:mt-0">
    //     The 24-hour conversation window has elapsed. Please wait for the user to
    //     initiate a chat or start a new conversation using a template message.
    //   </p>
    //   {/* Right Section */}
    //   <motion.button
    //     whileHover={{ scale: 1.05 }}
    //     whileTap={{ scale: 0.95 }}
    //     onClick={() => setSendMessageDialogVisible(true)}
    //     className="flex items-center justify-center px-1 py-1  text-white bg-[#128c7e] hover:bg-[#128c7e] transition-all duration-200 rounded-md shadow-md"
    //   >
    //     Start Chat
    //     <ArrowRightAltOutlinedIcon className="ml-2" />
    //   </motion.button>
    // </motion.div>
  );
};
