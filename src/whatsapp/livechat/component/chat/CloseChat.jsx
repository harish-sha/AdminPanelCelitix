import { motion } from "framer-motion";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

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
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center  w-full p-3 gap-2 bg-white shadow-lg rounded-t-lg md:mb-0 md:flex-row"
    >
      <div className="flex items-center gap-2 text-gray-700">
        <AccessAlarmOutlinedIcon className="text-red-500" />
        <p className="font-semibold">24 Hour Window Elapsed</p>
      </div>
      <p className="text-xs text-gray-500 text-center md:text-left mt-2 md:mt-0">
        The 24-hour conversation window has elapsed. Please wait for the user to
        initiate a chat or start a new conversation using a template message.
      </p>
      {/* Right Section */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSendMessageDialogVisible(true)}
        className="flex items-center justify-center px-1 py-1  text-white bg-[#5584AC] hover:bg-[#22577E] transition-all duration-200 rounded-md shadow-md"
      >
        Start Chat
        <ArrowRightAltOutlinedIcon className="ml-2" />
      </motion.button>
    </motion.div>
  );
};
