//export const ChatDateSeparator = ({ date }) => {
//   return (
//     <>
//       {getChatDateLabel(date)}
//     </>
//   );
// };

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


function getChatDateLabel(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    if (isSameDay(date, today)) return "Today";
    if (isSameDay(date, yesterday)) return "Yesterday";

    // Example: Mon, Sep 02
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
}

export const ChatDateSeparator = ({ date }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const formattedDateTime = new Date(date).toLocaleString("en-US", {
        weekday: "long",   // e.g., Monday
        year: "numeric",
        month: "long",     // e.g., September
        day: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
    });

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {/* Displayed chip text */}
            <span>{getChatDateLabel(date)}</span>

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2
                       px-3 py-1 text-xs font-medium
                       bg-gray-900 text-white rounded-lg shadow-lg z-50
                       whitespace-nowrap"
                    >
                        {formattedDateTime}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};