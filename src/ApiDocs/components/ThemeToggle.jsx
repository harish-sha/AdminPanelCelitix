import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { themeColors } from "../themeColors";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const colors = themeColors(isDarkMode);

    // Unique mask id per mount to avoid collisions across re-renders / multiple instances
    const maskId = useMemo(
        () => `moonMask-${Math.random().toString(36).slice(2)}`,
        []
    );

    return (
        <motion.button
            type="button"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDarkMode}
            whileTap={{ scale: 0.92 }}
            className={clsx(
                "inline-flex items-center justify-center rounded-xl p-2 cursor-pointer",
                "transition-colors duration-200",
                "hover:bg-black/5 dark:hover:bg-white/5"
            )}
        >
            {/* Inherit color from text-* utilities */}
            <div className={clsx("h-6 w-6", colors?.textPrimary || "text-gray-900 dark:text-gray-100")}>
                <AnimatePresence initial={false} mode="wait">
                    {isDarkMode ? (
                        // MOON
                        <motion.svg
                            key="moon"
                            role="img"
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                            fill="none"
                            initial={{ rotate: -90, opacity: 0, scale: 0.85 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0.85 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        >
                            <defs>
                                {/* Use userSpaceOnUse so cx/cy/r are in the same coords as the icon */}
                                <mask id={maskId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                                    {/* Base: white = visible */}
                                    <rect x="0" y="0" width="24" height="24" fill="white" />
                                    {/* Cut-out: black = hidden (shifted right for a clean crescent) */}
                                    <motion.circle
                                        cx="16"   // push right to carve a neat crescent
                                        cy="12"
                                        r="9"
                                        fill="black"
                                        initial={{ cx: 13.5 }}
                                        animate={{ cx: 16 }}
                                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                                    />
                                </mask>
                            </defs>

                            {/* Main moon disc */}
                            <motion.circle
                                cx="12"
                                cy="12"
                                r="9"
                                fill="currentColor"
                                mask={`url(#${maskId})`}
                            />

                            {/* subtle stars */}
                            <motion.circle
                                cx="5.2"
                                cy="7.3"
                                r="1"
                                fill="currentColor"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.7 }}
                                transition={{ delay: 0.06 }}
                            />
                            <motion.circle
                                cx="18.7"
                                cy="16.4"
                                r="0.85"
                                fill="currentColor"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.7 }}
                                transition={{ delay: 0.12 }}
                            />
                        </motion.svg>
                    ) : (
                        // SUN
                        <motion.svg
                            key="sun"
                            role="img"
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                            fill="none"
                            initial={{ rotate: 90, opacity: 0, scale: 0.85 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: -90, opacity: 0, scale: 0.85 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        >
                            {/* core */}
                            <motion.circle
                                cx="12"
                                cy="12"
                                r="5"
                                fill="currentColor"
                                initial={{ scale: 0.6 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                            />
                            {/* rays (with a tiny welcoming spin) */}
                            <motion.g
                                initial={{ rotate: -10 }}
                                animate={{ rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                            >
                                {Array.from({ length: 8 }).map((_, i) => {
                                    const angle = (i * Math.PI) / 4;
                                    const x1 = 12 + Math.cos(angle) * 8;
                                    const y1 = 12 + Math.sin(angle) * 8;
                                    const x2 = 12 + Math.cos(angle) * 10.6;
                                    const y2 = 12 + Math.sin(angle) * 10.6;
                                    return (
                                        <motion.line
                                            key={i}
                                            x1={x1}
                                            y1={y1}
                                            x2={x2}
                                            y2={y2}
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            initial={{ opacity: 0, scale: 0.6 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: 0.03 * i,
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                            }}
                                        />
                                    );
                                })}
                            </motion.g>
                        </motion.svg>
                    )}
                </AnimatePresence>
            </div>
        </motion.button>
    );
}
