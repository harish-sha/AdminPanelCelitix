// // import { getAgentList } from "@/apis/Agent/Agent";
// // import { getUserAgent } from "@/apis/whatsapp/whatsapp";

// // export const ChatSidebar = ({ formatDate, chatState, setChatState, setSelectedAgentList }) => {
// //   async function fetchAgentDetails(srno) {
// //     try {
// //       const res = await getAgentList();
// //       return res?.data?.find((agent) => agent.sr_no === srno)?.name;
// //     } catch (e) {
// //       console.log(e);
// //     }
// //   }
// //   return (
// //     <div className="mt-4 h-[70vh] overflow-y-scroll">
// //       {chatState?.allConversations
// //         ?.slice()
// //         ?.sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
// //         ?.map((chat, index) => (
// //           <div
// //             key={chat.srno || index}
// //             className={`p-3 border-b cursor-pointer rounded-md  select-none ${chatState?.active?.srno === chat.srno ? "bg-gray-300 " : ""
// //               }`}
// //             onClick={async () => {
// //               const agentName = await getUserAgent(chat?.mobileNo);
// //               // setActiveChat(chat);
// //               setChatState((prev) => ({
// //                 ...prev,
// //                 active: chat,
// //                 replyData: "",
// //                 isReply: false,
// //                 agentName: agentName,
// //               }));
// //               setSelectedAgentList(chat?.agentSrno);
// //             }}
// //           >
// //             <div className="flex items-center justify-between ">
// //               <div className="flex items-center gap-2">
// //                 <div className="relative">
// //                   {chat.image ? (
// //                     <img
// //                       src={chat.image}
// //                       alt=""
// //                       className="w-10 h-10 rounded-full object-cover"
// //                     />
// //                   ) : (
// //                     <div
// //                       className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${chatState?.active?.srno === chat.srno
// //                         ? "bg-gray-500"
// //                         : "bg-gray-300"
// //                         }`}
// //                     >
// //                       {chat.contectName?.charAt(0)?.toUpperCase() || "?"}
// //                     </div>
// //                   )}

// //                   <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-lg"></div>
// //                 </div>
// //                 <div className="ml-2">
// //                   {chat.contectName || chat.mobileNo}
// //                   <p className="text-xs truncate w-[200px]">
// //                     {chat?.messageBody}
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="flex flex-col items-end justify-end">
// //                 <p className="text-xs">{formatDate(chat.insertTime)}</p>
// //                 {chat.unreadCount > 0 && (
// //                   <div className="flex items-center justify-center w-5 h-5 text-sm text-white bg-green-500 rounded-full">
// //                     {chat.unreadCount}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //     </div>
// //   );
// // };

// import { useState, useEffect, useRef } from "react";
// import { getAgentList } from "@/apis/Agent/Agent";
// import { getUserAgent } from "@/apis/whatsapp/whatsapp";
// import { motion } from "framer-motion";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import Lottie from "lottie-react";
// import pointingAnimation from "@/assets/animation/pointing.json";
// import Datanotfound from "@/assets/animation/Datanotfound.json";
// import { getAllGroups } from "@/apis/common/common";
// import toast from "react-hot-toast";
// import { useWabaAgentContext } from "@/context/WabaAndAgent.jsx";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import DoneAllIcon from "@mui/icons-material/DoneAll";

// export const ChatSidebar = ({
//   formatDate,
//   chatState,
//   setChatState,
//   setSelectedAgentList,
//   selectedWaba,
//   setSelectedGroupList,
//   setChatIndex,
//   handleUnread,
//   handleFetchSpecificConversation,
//   isLoading,
// }) => {
//   // const isLoading =
//   //   Boolean(selectedWaba) &&
//   //   (!chatState?.allConversations);

//   // const [isLoading, setIsLoading] = useState(false)


//   // useEffect(() => {
//   //   if (Boolean(selectedWaba) &&
//   //     (!chatState?.allConversations) || (chatState.allConversations.length === 0)) {
//   //     setIsLoading(true)
//   //   } else if(Boolean(selectedWaba) &&
//   //     (chatState.allConversations === [])){
//   //       setIsLoading(false)
//   //     }else {
//   //     setIsLoading(false)
//   //   }

//   // }, [chatState?.allConversations])


//   const { convoDetails, activeConvo, inactiveConvo, switchChat } =
//     useWabaAgentContext();

//   const [openChatOption, setOpenChatOption] = useState({
//     sttus: false,
//     srno: "",
//   });

//   const menuRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setOpenChatOption({ status: false, srno: "" });
//       }
//     }

//     if (openChatOption.status) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [openChatOption]);



//   const filteredConvos =
//     chatState?.allConversations?.filter(
//       (convo) =>
//         Array.isArray(switchChat) &&
//         switchChat.some(
//           (sw) => sw.mobile === convo.mobileNo || sw.mobileNo === convo.mobileNo
//         )
//     ) || [];

//   async function fetchAgentDetails(srno) {
//     try {
//       const res = await getAgentList();
//       return res?.data?.find((agent) => agent.sr_no === srno)?.name;
//     } catch (e) {
//       toast.error("Error fetching agent details");
//     }
//   }

//   async function fetchGrpList(name) {
//     try {
//       const allGrps = await getAllGroups();
//       const grpSrno = allGrps?.find((grp) => grp.groupName === name)?.groupCode;
//       return grpSrno;
//     } catch (e) {
//       toast.error("Error fetching Group details");
//     }
//   }

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: pointingAnimation,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

//   return (
//     <div className="mt-2 pb-50 h-[100vh] max-h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
//       {!selectedWaba && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-col items-center justify-center h-full text-center text-gray-500"
//         >
//           <motion.div
//             initial={{ y: -10 }}
//             animate={{ y: 10 }}
//             transition={{
//               duration: 1,
//               repeat: Infinity,
//               repeatType: "reverse",
//             }}
//             className="mb-4"
//           >
//             {/* Lottie Animation */}
//             <Lottie
//               animationData={pointingAnimation}
//               loop
//               autoplay
//               className="w-60 h-45"
//             // style={{ width: "full", height: "48px" }}
//             />
//           </motion.div>
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-xl font-semibold text-green-900 mb-2"
//           >
//             Select a WABA to view chats
//           </motion.p>
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-sm font-normal text-green-900 mb-2"
//           >
//             Use the dropdown above to select your WhatsApp Business Account.
//           </motion.p>
//         </motion.div>
//       )}
//       {/* Skeleton Loader */}
//       {isLoading &&
//         selectedWaba &&
//         Array.from({ length: 8 }).map((_, index) => (
//           <div key={index} className="p-3 border-b rounded-md shadow-sm mb-2">
//             <div className="flex items-center gap-3">
//               <Skeleton circle={true} height={40} width={40} />
//               <div className="flex flex-col gap-1">
//                 <Skeleton width={120} height={10} />
//                 <Skeleton width={200} height={10} />
//               </div>
//             </div>
//           </div>
//         ))}

//       {!isLoading && (
//         <>
//           {filteredConvos && filteredConvos.length > 0
//             ? filteredConvos
//               .slice()
//               .sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
//               .map((chat, index) => {
//                 return (
//                   <motion.div
//                     // key={chat.srno || index}
//                     key={chat.mobileNo}
//                     initial={{ opacity: 0, y: 3 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.1, delay: index * 0.03 }}
//                     className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 mb-2 shadow-sm ${chatState?.active?.mobileNo === chat.mobileNo
//                       ? "bg-gradient-to-br from-[#5584AC] to-[#5584AC] border-l-6 border-[#22577E] text-white"
//                       : "bg-gradient-to-br from-gray-100 to-blue-100 hover:from-gray-200 hover:to-blue-200 text-gray-800"
//                       }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div
//                         className="flex items-center gap-2"
//                         onClick={async () => {
//                           const agentName = await getUserAgent(
//                             chat?.mobileNo
//                           );
//                           const grpSrno = await fetchGrpList(
//                             agentName?.groupName
//                           );

//                           setChatState((prev) => ({
//                             ...prev,
//                             active: chat,
//                             replyData: "",
//                             isReply: false,
//                             agentName: agentName,
//                           }));
//                           setChatIndex(1);
//                           setSelectedAgentList(chat?.agentSrno);
//                           setSelectedGroupList(grpSrno);
//                         }}
//                       >
//                         <div className="relative">
//                           {chat.image ? (
//                             <img
//                               src={chat.image}
//                               alt=""
//                               className="w-10 h-10 rounded-full object-cover"
//                             />
//                           ) : (
//                             <div
//                               className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${chatState?.active?.srno === chat.srno
//                                 ? "bg-white text-blue-600"
//                                 : "bg-gray-300 text-gray-900"
//                                 }`}
//                             >
//                               {chat.contectName?.charAt(0)?.toUpperCase() ||
//                                 "?"}
//                             </div>
//                           )}
//                           <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white rounded-full"></div>
//                         </div>
//                         <div className="ml-2">
//                           {chat.contectName || chat.mobileNo}
//                           <p className="text-xs truncate w-[200px]">
//                             {chat?.messageBody}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-end justify-end">
//                         <p className="text-xs transition-all">
//                           {formatDate(chat.insertTime)}
//                         </p>
//                         {chat.unreadCount > 0 && (
//                           <motion.div
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.1 }}
//                             className="flex items-center justify-center w-5 h-5 text-xs mt-1 text-gray-900 border-1 border-green-900 bg-green-400 rounded-full font-medium"
//                           >
//                             {chat.unreadCount}
//                           </motion.div>
//                         )}
//                       </div>
//                       <div className="relative">
//                         <button
//                           className="hover:bg-gray-100 p-1 rounded-full transition-all cursor-pointer hover:text-[#22577E]"
//                           onClick={() =>
//                             // setOpenChatOption(
//                             //   openChatOption === chat?.srno ? null : chat?.srno
//                             // )
//                             setOpenChatOption((prev) =>
//                               prev.status && prev.srno === chat?.srno
//                                 ? { status: false, srno: "" }
//                                 : { status: true, srno: chat?.srno }
//                             )
//                           }
//                         >
//                           <BsThreeDotsVertical />
//                         </button>

//                         {openChatOption.srno === chat.srno &&
//                           openChatOption.status === true && (
//                             <motion.div
//                               initial={{ opacity: 0, x: 20 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ duration: 0.1 }}
//                               className="absolute right-5 -bottom-1 w-36 bg-white text-black border  rounded-md shadow-2xl z-50 cursor-pointer text-xs py-2 px-2 border-gray-200 hover:bg-gray-100 transition-all duration-200"
//                             >
//                               <button
//                                 onClick={() => {
//                                   handleUnread(chat);
//                                   setOpenChatOption({
//                                     status: false,
//                                     srno: "",
//                                   });
//                                 }}
//                                 ref={menuRef}
//                                 className="block cursor-pointer"
//                               >
//                                 <DoneAllIcon
//                                   className="text-gray-400 text-xs mr-2"
//                                   sx={{ fontSize: "18px" }}
//                                 />
//                                 mark as unread
//                               </button>
//                             </motion.div>
//                           )}
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })
//             : selectedWaba && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-md font-normal text-gray-900 mb-2 flex flex-col items-center justify-center h-[90%]"
//               >
//                 {/* No conversation found */}
//                 {/* Lottie or animated illustration */}
//                 <motion.div
//                   initial={{ scale: 0.9 }}
//                   animate={{ scale: 1 }}
//                   transition={{
//                     duration: 1,
//                     repeat: Infinity,
//                     repeatType: "reverse",
//                   }}
//                   className="mb-6"
//                 >
//                   <Lottie
//                     animationData={Datanotfound}
//                     loop
//                     autoplay
//                     className="w-70 h-45"
//                   />
//                 </motion.div>

//                 {/* Title */}
//                 <motion.p
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="text-xl font-semibold text-[#22577E] mb-2"
//                 >
//                   No Conversations Found
//                 </motion.p>

//                 {/* Subtitle */}
//                 <motion.p
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="text-sm font-normal text-gray-600 max-w-md text-center"
//                 >
//                   There are currently no chats to display. They’ll appear here
//                   when available.
//                 </motion.p>
//               </motion.div>
//             )}
//         </>
//       )}
//     </div>
//   );
// };
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

import { useState, useEffect, useRef } from "react";
import { getAgentList } from "@/apis/Agent/Agent";
import { getUserAgent } from "@/apis/whatsapp/whatsapp";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Lottie from "lottie-react";
import pointingAnimation from "@/assets/animation/pointing.json";
import Datanotfound from "@/assets/animation/Datanotfound.json";
import { getAllGroups } from "@/apis/common/common";
import toast from "react-hot-toast";
import { useWabaAgentContext } from "@/context/WabaAndAgent.jsx";
import { BsThreeDotsVertical } from "react-icons/bs";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import moment from "moment";
import CustomTooltip from "@/components/common/CustomTooltip";

export const ChatSidebar = ({
  formatDate,
  chatState,
  setChatState,
  setSelectedAgentList,
  selectedWaba,
  setSelectedGroupList,
  setChatIndex,
  handleUnread,
  handleFetchSpecificConversation,
  isLoading,
}) => {
  // const isLoading =
  //   Boolean(selectedWaba) &&
  //   (!chatState?.allConversations);

  // const [isLoading, setIsLoading] = useState(false)


  // useEffect(() => {
  //   if (Boolean(selectedWaba) &&
  //     (!chatState?.allConversations) || (chatState.allConversations.length === 0)) {
  //     setIsLoading(true)
  //   } else if(Boolean(selectedWaba) &&
  //     (chatState.allConversations === [])){
  //       setIsLoading(false)
  //     }else {
  //     setIsLoading(false)
  //   }

  // }, [chatState?.allConversations])


  const { convoDetails, activeConvo, inactiveConvo, switchChat } =
    useWabaAgentContext();

  const [openChatOption, setOpenChatOption] = useState({
    sttus: false,
    srno: "",
  });

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenChatOption({ status: false, srno: "" });
      }
    }

    if (openChatOption.status) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openChatOption]);



  const filteredConvos =
    chatState?.allConversations?.filter(
      (convo) =>
        Array.isArray(switchChat) &&
        switchChat.some(
          (sw) => sw.mobile === convo.mobileNo || sw.mobileNo === convo.mobileNo
        )
    ) || [];

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
    <div className="mt-2 pb-50 h-[100vh] max-h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ">
      {!selectedWaba && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-full text-center"
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
            className="text-xl font-semibold text-[#075e54] mb-2"
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
        selectedWaba &&
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

      {!isLoading && (
        <>
          {filteredConvos && filteredConvos.length > 0
            ? filteredConvos
              .slice()
              .sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
              .map((chat, index) => {
                return (
                  <motion.div
                    // key={chat.srno || index}
                    key={chat.mobileNo}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1, delay: index * 0.03 }}
                    className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 mb-2 shadow-sm ${chatState?.active?.mobileNo === chat.mobileNo
                      ? "bg-gradient-to-br from-[#128c7e] to-[#128c7e] border-l-6 border-[#075e54] text-white"
                      : "bg-gradient-to-br from-[#ece5dd] to-[#ece5dd] hover:from-[#faf7f4] hover:to-[#f1e6d6] transition-colors duration-300 text-gray-800"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2"
                        onClick={async () => {
                          const agentName = await getUserAgent(
                            chat?.mobileNo
                          );
                          const grpSrno = await fetchGrpList(
                            agentName?.groupName
                          );

                          setChatState((prev) => ({
                            ...prev,
                            active: chat,
                            replyData: "",
                            isReply: false,
                            agentName: agentName,
                          }));
                          setChatIndex(1);
                          setSelectedAgentList(chat?.agentSrno);
                          setSelectedGroupList(grpSrno);
                        }}
                      >
                        <div className="relative">
                          {chat.image ? (
                            <img
                              src={chat.image}
                              alt=""
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${chatState?.active?.srno === chat.srno
                                ? "bg-white text-[#075e54]"
                                : "bg-gray-300 text-[#075e54] border border-[#075e54]"
                                }`}
                            >
                              {chat.contectName?.charAt(0)?.toUpperCase() ||
                                "?"}
                            </div>
                          )}
                          <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#075e54] border border-white rounded-full"></div>
                        </div>
                        <div className="ml-2">
                          {chat.contectName || chat.mobileNo}
                          <p className="text-xs truncate w-[200px]">
                            {chat?.messageBody}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-end">
                        {/* <p className="text-xs transition-all text-nowrap">
                          {formatDate(chat.insertTime)}
                        </p> */}

                        <p className="text-xs transition-all text-nowrap"
                          title={moment(chat.insertTime).format("dddd, DD MMM YYYY • hh:mm A")}
                        >
                          {moment(chat.insertTime).format("DD-MM-YYYY")}
                        </p>

                        {/* <CustomTooltip
                          title={moment(chat.insertTime).format("dddd, DD MMM YYYY • hh:mm A")}
                          placement="top"
                          arrow
                        >
                          <p className="text-xs transition-all text-nowrap">
                            {moment(chat.insertTime).format("DD-MM-YYYY")}
                          </p>
                        </CustomTooltip> */}
                        {chat.unreadCount > 0 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.1 }}
                            className="flex items-center justify-center w-5 h-5 text-xs mt-1 text-[#22577E] border-1 border-green-900 bg-[#25d366] rounded-full font-medium"
                          >
                            {chat.unreadCount}
                          </motion.div>
                        )}
                      </div>
                      <div className="relative">
                        <button
                          className="hover:bg-gray-100 p-1 rounded-full transition-all cursor-pointer hover:text-[#22577E]"
                          onClick={() =>
                            // setOpenChatOption(
                            //   openChatOption === chat?.srno ? null : chat?.srno
                            // )
                            setOpenChatOption((prev) =>
                              prev.status && prev.srno === chat?.srno
                                ? { status: false, srno: "" }
                                : { status: true, srno: chat?.srno }
                            )
                          }
                        >
                          <BsThreeDotsVertical />
                        </button>

                        {openChatOption.srno === chat.srno &&
                          openChatOption.status === true && (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.1 }}
                              className="absolute right-5 -bottom-1 w-36 bg-white text-black border  rounded-md shadow-2xl z-50 cursor-pointer text-xs py-2 px-2 border-gray-200 hover:bg-gray-100 transition-all duration-200"
                            >
                              <button
                                onClick={() => {
                                  handleUnread(chat);
                                  setOpenChatOption({
                                    status: false,
                                    srno: "",
                                  });
                                }}
                                ref={menuRef}
                                className="block cursor-pointer"
                              >
                                <DoneAllIcon
                                  className="text-gray-400 text-xs mr-2"
                                  sx={{ fontSize: "18px" }}
                                />
                                mark as unread
                              </button>
                            </motion.div>
                          )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            : selectedWaba && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-md font-normal text-gray-900 mb-2 flex flex-col items-center justify-center h-[90%]"
              >
                {/* No conversation found */}
                {/* Lottie or animated illustration */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="mb-6"
                >
                  <Lottie
                    animationData={Datanotfound}
                    loop
                    autoplay
                    className="w-70 h-45"
                  />
                </motion.div>

                {/* Title */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-semibold text-[#075e54] mb-2"
                >
                  No Conversations Found
                </motion.p>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm font-normal text-gray-600 max-w-md text-center"
                >
                  There are currently no chats to display. They’ll appear here
                  when available.
                </motion.p>
              </motion.div>
            )}
        </>
      )}
    </div>
  );
};
