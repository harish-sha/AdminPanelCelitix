import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Lottie from "lottie-react";
import pointingAnimation from "@/assets/animation/pointing.json";
import moment from "moment";

export const Sidebar = ({ chatState, setChatState, isLoading, agentState }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pointingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  function formatDate(data) {
    return moment(data).format("DD/MM/YYYY");
  }
  return (
    <div className="mt-2 pb-50 h-[100vh] max-h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {!agentState.id && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-full text-center text-gray-500"
        >
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="mb-4"
          >
            {/* Lottie Animation */}
            <Lottie
              animationData={pointingAnimation}
              loop
              autoplay
              className="w-60 h-45"
              // style={{ width: "full", height: "48px" }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-semibold text-blue-900 mb-2"
          >
            Select an Agents to view chats.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-normal text-green-900 mb-2"
          >
            Use the dropdown above to select your RCS Agent and start chatting.
          </motion.p>
        </motion.div>
      )}

      {!isLoading &&
        chatState.allConversations.length > 0 &&
        chatState.allConversations
          ?.slice()
          ?.sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
          ?.map((chat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 mb-2 shadow-sm ${
                chatState?.active?.srno === chat.srno
                  ? // ? "bg-gradient-to-br from-blue-600 to-indigo-400 border-l-6 border-[#22577E] text-white "
                    "bg-gradient-to-br from-[#5584AC] to-[#5584AC] border-l-6 border-[#22577E] text-white "
                  : "bg-gradient-to-br from-gray-100 to-blue-100 hover:from-gray-200 hover:to-blue-200 text-gray-800"
              }`}
              onClick={() => setChatState({ ...chatState, active: chat })}
            >
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  {/* Image */}
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center  font-semibold text-sm ${
                        chatState?.active?.srno === chat.srno
                          ? "bg-white text-blue-600"
                          : "bg-gray-300 text-gray-900"
                      }`}
                    >
                      {"A"}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white  rounded-full"></div>
                  </div>

                  <div className="ml-2">
                    {chat.mobileNo}
                    <p className="text-xs truncate w-[200px]">
                      {chat?.messageBody}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-end">
                  <p className="text-xs">{formatDate(chat.insertTime)}</p>
                  {chat.unreadCount > 0 && (
                    <div className="flex items-center justify-center w-5 h-5 text-xs mt-1 text-white bg-green-500 rounded-full">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

      {agentState.id && !isLoading && chatState?.allConversations.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-md font-normal text-gray-900 mb-2  flex items-center justify-center h-[90%]"
        >
          No conversation found
        </motion.div>
      )}
    </div>
  );
};
