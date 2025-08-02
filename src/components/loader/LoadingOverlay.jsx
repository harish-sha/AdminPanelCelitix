import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";

// Built-in variants || loaders
import cosmosloader from "@/assets/animation/Cosmos.json";
import loadernew from "@/assets/animation/loadernew.json";
import welcome from "@/assets/animation/welcome.json";

/**
 * LoadingOverlay
 * Props:
 * - isOpen: boolean (show/hide)
 * - animationData: object (Lottie JSON)
 * - text: string (status message)
 * - loop: boolean (default true)
 * - backdropClass: string (override backdrop styles)
 * - containerClass: string (override card/container styles)
 * - textClass: string (override text styles)
 */

const VARIANTS = {
    cosmos: cosmosloader,
    spinner: loadernew,
    welcome: welcome,
};

export default function LoadingOverlay({
    isOpen = false,
    animationData,
    variant = "cosmos",      // "cosmos" | "spinner" | "welcome"
    text = "Loading...",
    loop = true,
    size = 150,               // px width for the Lottie box
    backdropClass = "fixed inset-0 z-[1000] flex items-center justify-center bg-white/90",
    containerClass = "flex flex-col items-center",
    textClass = "playf text-4xl bluetxt font-semibold text-gray-900 tracking-wide overflow-hidden whitespace-nowrap border-r-2 border-indigo-500",
}) {
    const selectedAnimation = animationData ?? VARIANTS[variant];

    // Build a typing keyframe based on text length (in ch units)
    const typingVariants = useMemo(() => {
        const len = Math.max(1, text.length);
        // A few waypoints so it feels like typing
        const steps = [0, Math.ceil(len * 0.35), Math.ceil(len * 0.6), Math.ceil(len * 0.9), len];
        const widthKeyframes = steps.map((n) => `${n}ch`);
        return {
            initial: { width: "0ch" },
            animate: {
                width: widthKeyframes,
                transition: {
                    delay: 0.4,
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.85, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                },
            },
        };
    }, [text]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={backdropClass}
                    role="dialog"
                    aria-modal="true"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={containerClass}
                    >
                        {/* {animationData && (
                            <div className="w-150 h-auto mb-2">
                                <Lottie animationData={animationData} loop={loop} />
                            </div>
                        )} */}
                        {selectedAnimation && (
                            <div className="h-auto mb-2" style={{ width: `${size}px` }}>
                                <Lottie animationData={selectedAnimation} loop={loop} />
                            </div>
                        )}

                        <motion.p
                            className={textClass}
                            variants={typingVariants}
                            initial="initial"
                            animate="animate"
                        >
                            {text}
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
