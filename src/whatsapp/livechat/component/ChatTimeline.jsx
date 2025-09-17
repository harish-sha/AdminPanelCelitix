import { motion } from "framer-motion";
import { FaRegClock } from "react-icons/fa";

const container = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
};

const ChatTimeline = ({ timelineData }) => {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative border-l-2 border-green-500 pl-6 space-y-6"
        >
            {timelineData.map((event, idx) => (
                <motion.div key={idx} variants={item} className="relative">
                    {/* Dot */}
                    <span className="absolute -left-[35px] flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full shadow-md">
                        {event.icon}
                    </span>

                    {/* Content */}
                    <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
                        <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.description}</p>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
                            <FaRegClock className="text-[12px]" />
                            {event.time}
                        </span>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ChatTimeline;
