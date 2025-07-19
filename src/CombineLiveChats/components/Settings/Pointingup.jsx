import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import pointingup from "@/assets/animation/pointingup.json";

const Pointingup = () => {
  return (
    <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 flex items-center justify-center h-[85vh]">

    <div className="relative  w-full   overflow-hidden p-0 md:p-15">
      {/* Main Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key="liveChatSettings"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative z-10 w-full  bg-white/80 backdrop-blur-lg rounded-3xl  p-5 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          {/* Lottie Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Lottie animationData={pointingup} loop autoplay className="w-72 sm:w-80 md:w-110" />
          </motion.div>

          {/* Content Section */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-5 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
              Live Chat Settings
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl mb-6 leading-relaxed max-w-md mx-auto md:mx-0">
              We’re working on something **big and exciting!** Soon, you’ll enjoy complete control, faster interactions, and next-level customization.
            </p>
            {/* <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:brightness-110 transition-transform duration-300"
            >
              Coming Soon
            </motion.button> */}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
    </div>
  );
};

export default Pointingup;
