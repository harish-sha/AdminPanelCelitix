import { motion, AnimatePresence } from "framer-motion";

const statusMessages = {
    CONNECTED: {
        title: "Connected",
        description:
            "A phone number is associated with this account and is working properly.",
    },
    RESTRICTED: {
        title: "Restricted",
        description:
            "This phone number has reached its 24-hour messaging limit and can no longer send messages to customers. please wait untill the messaging limit is reset to send messages.",
    },
    FLAGGED: {
        title: "Flagged",
        description:
            "This number has been flagged. Review the quality rating or check the account health.",
    },
    BANNED: {
        title: "Banned",
        description: "This number has been banned. Contact support for resolution.",
    },
    UNKNOWN: {
        title: "Unknown",
        description: "The status of this number is unknown or not reported.",
    },
};

export const StatusHoverCard = ({ status }) => {
    const content = statusMessages[status] || statusMessages.UNKNOWN;

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute z-50 bg-white shadow-xl border rounded-lg w-78 p-4 text-sm text-gray-700"
        >
            <p className="font-bold text-sm text-gray-900 mb-1">{content.title}</p>
            <p className="text-gray-600 text-wrap">{content.description}</p>
        </motion.div>
    );
};
