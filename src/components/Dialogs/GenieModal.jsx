import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import Lenis from 'lenis'

const GenieModal = ({ genieIsOpen, genieOnClose, children, className = "", width = "384px" }) => {

    useEffect(() => {
        // Initialize Lenis for smooth RAF loop
        const lenis = new Lenis({
            lerp: 0.1,
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }, []);

    // Animation variants for genie effect
    const modalVariants = {
        hidden: {
            opacity: 0,
            y: 300,          // Start from bottom
            scaleX: 0.5,
            scaleY: 0.2,
            width: "100px",
            transition: { duration: 0.4, ease: "easeInOut" },
        },
        visible: {
            opacity: 1,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            width: width,  // w-96 default
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
        exit: {
            opacity: 0,
            y: 300,          // Back to bottom
            scaleX: 0.5,
            scaleY: 0.2,
            width: "100px",
            transition: { duration: 0.4, ease: "easeInOut" },
        },
    };

    return (
        <AnimatePresence>
            {genieIsOpen && (
                <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                    style={{ willChange: "transform, opacity" }}
                >
                    <motion.div
                        key="modal"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`bg-white rounded-xl shadow-xl p-6 text-end ${className}`}
                        style={{
                            willChange: "transform, width, opacity",
                            originY: 1,
                            originX: 0.5,
                        }}
                    >
                        <button
                            onClick={genieOnClose}
                            className="p-1 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-400 transition cursor-pointer text-md"
                        >
                            <IoCloseCircleOutline />
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GenieModal;
