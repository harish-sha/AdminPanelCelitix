import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { themeColors } from "../themeColors";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
    // const [isDarkMode, setIsDarkMode] = useState(false);
    // const toggleDarkMode = () => {
    //     setIsDarkMode((v) => !v);
    //     document.documentElement.classList.toggle("dark");
    // };

    const { isDarkMode, toggleDarkMode } = useTheme();
    const colors = themeColors(isDarkMode);


    return (
        <motion.button
            type="button"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            whileTap={{ scale: 0.9 }}
            className={clsx(
                "inline-flex items-center justify-center rounded-xl p-2",
                "transition-colors duration-200",
                "hover:bg-black/5 dark:hover:bg-white/5"
            )}
        >
            <div className="h-6 w-6 text-gray-900 dark:text-gray-100">
                <AnimatePresence initial={false} mode="wait">
                    {isDarkMode ? (
                        // Moon
                        <motion.svg
                            key="moon"
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        >
                            <defs>
                                <mask id="moon-mask">
                                    <rect x="0" y="0" width="24" height="24" fill="white" />
                                    <motion.circle
                                        cx="14"
                                        cy="10"
                                        r="8"
                                        fill="black"
                                        initial={{ cx: 14 }}
                                        animate={{ cx: 12.5 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                                    />
                                </mask>
                            </defs>
                            <motion.circle
                                cx="12"
                                cy="12"
                                r="8"
                                fill="currentColor"
                                mask="url(#moon-mask)"
                            />
                            <motion.circle
                                cx="5"
                                cy="7"
                                r="1"
                                fill="currentColor"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.7 }}
                                transition={{ delay: 0.05 }}
                            />
                            <motion.circle
                                cx="18.5"
                                cy="16.5"
                                r="0.8"
                                fill="currentColor"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.7 }}
                                transition={{ delay: 0.1 }}
                            />
                        </motion.svg>
                    ) : (
                        // Sun
                        <motion.svg
                            key="sun"
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        >
                            <motion.circle
                                cx="12"
                                cy="12"
                                r="5"
                                fill="currentColor"
                                initial={{ scale: 0.6 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                            />
                            {Array.from({ length: 8 }).map((_, i) => {
                                const angle = (i * Math.PI) / 4;
                                const x1 = 12 + Math.cos(angle) * 8;
                                const y1 = 12 + Math.sin(angle) * 8;
                                const x2 = 12 + Math.cos(angle) * 10.5;
                                const y2 = 12 + Math.sin(angle) * 10.5;
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
                                            stiffness: 250,
                                            damping: 20,
                                        }}
                                    />
                                );
                            })}
                        </motion.svg>
                    )}
                </AnimatePresence>
            </div>
        </motion.button>
    );
}
