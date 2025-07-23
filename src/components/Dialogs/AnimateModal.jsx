import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FiAlertCircle } from "react-icons/fi";
import Lenis from 'lenis'

const AnimateModal = ({ animateIsOpen, animateOnClose, children, className = "", width = "384px", flotIcon, flotIconClass }) => {

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
    return (
        <AnimatePresence>
            {animateIsOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className={`p-4 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden ${className}`}
                    >
                        <span className={`text-white/40 rotate-12 text-[250px] absolute z-0 ${flotIconClass}`}>
                            {flotIcon}
                        </span>
                        {/* <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" /> */}
                        <div className="relative z-10">
                            <motion.button
                                onClick={animateOnClose}
                                className="absolute -top-2 -right-2 text-gray-900 rounded-full overflow-hidden group z-100 cursor-pointer"
                            >
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    whileHover={{ y: 0, rotate: 360, opacity: 1 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="inline-block"
                                >
                                    <IoCloseCircleOutline
                                        size={22}
                                        className="transition-transform duration-500 p-0"
                                    />
                                </motion.span>
                            </motion.button>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AnimateModal