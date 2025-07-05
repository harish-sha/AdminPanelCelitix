import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

