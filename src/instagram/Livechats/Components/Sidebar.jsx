import { getAgentList } from "@/apis/Agent/Agent";
import { getUserAgent } from "@/apis/whatsapp/whatsapp";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Lottie from "lottie-react";
import instagram_Icon from "@/assets/animation/Instagram_icon.json";
import Instagram from "@/assets/animation/Instagram.json";


export const ChatSidebar = ({ formatDate, chatState, setChatState }) => {
  const isLoading =
    chatState &&
    (!chatState?.allConversations || chatState?.allConversations?.length === 0);

  async function fetchAgentDetails(srno) {
    try {
      const res = await getAgentList();
      return res?.data?.find((agent) => agent.sr_no === srno)?.name;
    } catch (e) {
      console.log(e);
    }
  }

  const transformedChats = chatState?.allConversations?.map((chat, idx) => {
    const lastMsg = chat.messages?.[chat.messages.length - 1] || {};
    return {
      srno: idx.toString(),
      contectName: chat.name,
      insertTime: lastMsg?.date || new Date().toISOString(),
      unreadCount: 0,
      mobileNo: chat.name,
      messageBody: lastMsg?.msg || "",
      image: chat.profile || "",
      original: chat,
    };
  });

  return (
    <div className="h-[78vh] mt-2 max-h-full bg-[#fafafa] rounded-2xl border-r-3 border-b-3 border-[#F1D3CE]">
      {!chatState?.allConversations?.length && (
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
            <Lottie
              animationData={Instagram}
              loop
              autoplay
              className="w-60 h-45"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] bg-clip-text text-transparent"
          >
            Select an Instagram account to view chats
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center text-sm text-gray-700"
          >
            Use the dropdown above to select your Instagram Business Account.
          </motion.p>
        </motion.div>
      )}

      {/* skeleton loader */}
      {/* {isLoading &&
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="p-3 border-b rounded-md shadow-sm mb-2">
            <div className="flex items-center gap-3">
              <Skeleton circle={true} height={40} width={40} />
              <div className="flex flex-col gap-1">
                <Skeleton width={120} height={10} />
                <Skeleton width={200} height={10} />
              </div>
            </div>
          </div>
        ))} */}

      {!isLoading &&
        transformedChats
          ?.slice()
          ?.sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
          ?.map((chat, index) => {
            const lastMessage = chat.messages?.[chat.messages.length - 1];

            return (
              <motion.div
                key={chat.srno || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 mb-2 shadow-sm  ${chatState?.active === chat.original.name
                  ? "bg-gradient-to-r from-[#F1D3CE] to-[#EECAD5] text-white"
                  : "bg-gradient-to-br from-[#BCCCDC] to-[#9AA6B2] hover:from-pink-200 hover:to-[#F1D3CE] text-gray-800"
                  }`}
                onClick={() => {
                  setChatState((prev) => ({
                    ...prev,
                    specificConversation: chat.messages || [],
                    active: chat.original.name,
                  }));
                }}
              >
                <div className="flex items-center justify-between">
                  {/* Avatar + Name + Last Message */}
                  <div className="flex items-center gap-3 ">
                    {lastMessage?.profile ? (
                      <img
                        src={lastMessage.profile}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm bg-white text-[#a667d3]  shadow">
                        {chat.original.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}

                    {/* Name + Message */}
                    <div className="ml-2 w-[180px]">
                      <div className="flex justify-between items-center w-full">
                        <div className="text-base font-medium truncate text-black">
                          {chat.original.name}
                        </div>
                        <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">
                          {lastMessage?.date || ""}
                        </span>
                      </div>
                      <p className="text-sm truncate w-full text-black">
                        {lastMessage?.msg || "Start Chat"}
                      </p>
                    </div>
                  </div>

                  {/* Unread Count */}
                  <div className="flex flex-col items-end justify-end">
                    {chat.unreadCount > 0 && (
                      <div className="flex items-center justify-center w-5 h-5 text-xs mt-1 text-white bg-green-500 rounded-full">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
    </div>
  );
};
