// src/components/NetworkStatusProvider.jsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiWifiOff, FiRefreshCw, FiCheckCircle } from "react-icons/fi";

const NetworkStatusProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [checking, setChecking] = useState(false);
    const [justReconnected, setJustReconnected] = useState(false);

    const checkNetwork = () => {
        setChecking(true);
        setTimeout(() => {
            const online = navigator.onLine;
            setIsOnline(online);
            setChecking(false);
            if (online) {
                setJustReconnected(true);
                setTimeout(() => setJustReconnected(false), 3000);
            }
        }, 500);
    };

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setJustReconnected(true);
            setTimeout(() => setJustReconnected(false), 3000);
        };
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
            {/* Main App Content */}
            <div
                className={`transition duration-300 ${!isOnline ? "blur-sm pointer-events-none select-none" : ""
                    }`}
            >
                {children}
            </div>

            {/* Reconnect success banner */}
            <AnimatePresence>
                {justReconnected && (
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md shadow z-50 flex items-center gap-2"
                    >
                        <FiCheckCircle className="text-green-600 text-lg" />
                        <span>You're back online.</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Offline Modal */}
            <AnimatePresence>
                {!isOnline && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center"
                    >
                        <div className="bg-white border border-gray-200 p-6 rounded-xl max-w-md text-center shadow-xl w-full mx-4">
                            <div className="text-red-600 text-5xl flex justify-center mb-4">
                                <FiWifiOff />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Network Disconnected
                            </h2>
                            <p className="text-gray-600 mb-4">
                                You’re currently offline. Please check your internet connection and try again.
                            </p>
                            <button
                                onClick={checkNetwork}
                                disabled={checking}
                                className="bg-blue-600 text-white px-5 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                            >
                                {checking ? (
                                    <>
                                        <FiRefreshCw className="animate-spin" />
                                        Checking...
                                    </>
                                ) : (
                                    <>
                                        <FiRefreshCw />
                                        Retry Connection
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NetworkStatusProvider;
