import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NetworkStatusProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [checking, setChecking] = useState(false);

    const checkNetwork = async () => {
        setChecking(true);
        try {
            const online = await fetch("https://app.celitix.com", { mode: "no-cors" });
            setIsOnline(true);
        } catch (err) {
            setIsOnline(false);
        } finally {
            setChecking(false);
        }
    };

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <div className="relative">
            {/* App Content */}
            <div className={isOnline ? "" : "blur-sm pointer-events-none select-none"}>
                {children}
            </div>

            {/* Offline Popup */}
            <AnimatePresence>
                {!isOnline && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="text-red-600 text-4xl font-bold mb-2">No Internet</div>
                        <div className="text-gray-700 mb-4 max-w-md">
                            You’re currently offline. Please check your internet connection and try again.
                        </div>
                        <button
                            onClick={checkNetwork}
                            disabled={checking}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            {checking ? "Checking..." : "Retry Connection"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NetworkStatusProvider;
