// import { getAgentList } from "@/apis/Agent/Agent";
// import { getUserAgent } from "@/apis/whatsapp/whatsapp";

// export const ChatSidebar = ({ formatDate, chatState, setChatState, setSelectedAgentList }) => {
//   async function fetchAgentDetails(srno) {
//     try {
//       const res = await getAgentList();
//       return res?.data?.find((agent) => agent.sr_no === srno)?.name;
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   return (
//     <div className="mt-4 h-[70vh] overflow-y-scroll">
//       {chatState?.allConversations
//         ?.slice()
//         ?.sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
//         ?.map((chat, index) => (
//           <div
//             key={chat.srno || index}
//             className={`p-3 border-b cursor-pointer rounded-md  select-none ${chatState?.active?.srno === chat.srno ? "bg-gray-300 " : ""
//               }`}
//             onClick={async () => {
//               const agentName = await getUserAgent(chat?.mobileNo);
//               // setActiveChat(chat);
//               setChatState((prev) => ({
//                 ...prev,
//                 active: chat,
//                 replyData: "",
//                 isReply: false,
//                 agentName: agentName,
//               }));
//               setSelectedAgentList(chat?.agentSrno);
//             }}
//           >
//             <div className="flex items-center justify-between ">
//               <div className="flex items-center gap-2">
//                 <div className="relative">
//                   {chat.image ? (
//                     <img
//                       src={chat.image}
//                       alt=""
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div
//                       className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${chatState?.active?.srno === chat.srno
//                         ? "bg-gray-500"
//                         : "bg-gray-300"
//                         }`}
//                     >
//                       {chat.contectName?.charAt(0)?.toUpperCase() || "?"}
//                     </div>
//                   )}

//                   <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-lg"></div>
//                 </div>
//                 <div className="ml-2">
//                   {chat.contectName || chat.mobileNo}
//                   <p className="text-xs truncate w-[200px]">
//                     {chat?.messageBody}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex flex-col items-end justify-end">
//                 <p className="text-xs">{formatDate(chat.insertTime)}</p>
//                 {chat.unreadCount > 0 && (
//                   <div className="flex items-center justify-center w-5 h-5 text-sm text-white bg-green-500 rounded-full">
//                     {chat.unreadCount}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

import { getAgentList } from "@/apis/Agent/Agent";
import { getUserAgent } from "@/apis/whatsapp/whatsapp";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Lottie from "lottie-react";
import pointingAnimation from "@/assets/animation/pointing.json";
import { getAllGroups } from "@/apis/common/common";
import toast from "react-hot-toast";

export const ChatSidebar = ({
  formatDate,
  chatState,
  setChatState,
  setSelectedAgentList,
  selectedWaba,
  setSelectedGroupList
}) => {
  const isLoading =
    selectedWaba &&
    (!chatState?.allConversations || chatState.allConversations.length === 0);

  // async function fetchAgentDetails(srno) {
  //   try {
  //     const res = await getAgentList();
  //     return res?.data?.find((agent) => agent.sr_no === srno)?.name;
  //   } catch (e) {
  //     console.log(e);
  //     toast.error("Error fetching agent details");
  //   }
  // }

  async function fetchAgentDetails(srno) {
    try {
      const res = await getAgentList();
      return res?.data?.find((agent) => agent.sr_no === srno)?.name;
    } catch (e) {
      toast.error("Error fetching agent details");
    }
  }

  async function fetchGrpList(name) {
    try {
      const allGrps = await getAllGroups();
      const grpSrno = allGrps?.find((grp) => grp.groupName === name)?.groupCode;
      return grpSrno;
    } catch (e) {
      toast.error("Error fetching Group details");
    }
  }



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pointingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="mt-2 h-[66vh] max-h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {!selectedWaba && (
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
            className="text-xl font-semibold text-green-900 mb-2"
          >
            Select a WABA to view chats
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-normal text-green-900 mb-2"
          >
            Use the dropdown above to select your WhatsApp Business Account.
          </motion.p>
        </motion.div>
      )}
      {/* Skeleton Loader */}
      {isLoading &&
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
        ))}

      {!isLoading &&
        chatState?.allConversations
          ?.slice()
          ?.sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
          ?.map((chat, index) => (
            <motion.div
              key={chat.srno || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 mb-2 shadow-sm ${chatState?.active?.srno === chat.srno
                ? // ? "bg-gradient-to-br from-blue-600 to-indigo-400 border-l-6 border-[#22577E] text-white "
                "bg-gradient-to-br from-[#5584AC] to-[#5584AC] border-l-6 border-[#22577E] text-white "
                : "bg-gradient-to-br from-gray-100 to-blue-100 hover:from-gray-200 hover:to-blue-200 text-gray-800"
                }`}
              onClick={async () => {
                const agentName = await getUserAgent(chat?.mobileNo);
                const grpSrno = await fetchGrpList(agentName?.groupName);
                // setActiveChat(chat);
                setChatState((prev) => ({
                  ...prev,
                  active: chat,
                  replyData: "",
                  isReply: false,
                  agentName: agentName,
                }));
                setSelectedAgentList(chat?.agentSrno);
                setSelectedGroupList(grpSrno);
              }}
            >
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    {chat.image ? (
                      <img
                        src={chat.image}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center  font-semibold text-sm ${chatState?.active?.srno === chat.srno
                          ? "bg-white text-blue-600"
                          : "bg-gray-300 text-gray-900"
                          }`}
                      >
                        {chat.contectName?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}

                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white  rounded-full"></div>
                  </div>
                  <div className="ml-2">
                    {chat.contectName || chat.mobileNo}
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
    </div>
  );
};
