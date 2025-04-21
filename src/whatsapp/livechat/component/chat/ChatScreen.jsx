// import { IoArrowBack } from "react-icons/io5";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// import { FaReply } from "react-icons/fa";
// import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
// import { FiSend } from "react-icons/fi";
// import { SpeedDial } from "primereact/speeddial";
// import {
//   BoltRounded,
//   FormatBoldOutlined,
//   FormatItalicOutlined,
//   FormatStrikethroughOutlined,
//   LocalPhoneOutlined,
//   SearchOutlined,
// } from "@mui/icons-material";
// import { Sidebar } from "primereact/sidebar";
// import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
// import { ClosedChat } from "./CloseChat";
// import { ChatInput } from "./Input";
// import { useEffect, useRef } from "react";

// export const ChatScreen = ({
//   setVisibleRight,
//   setDialogVisible,
//   // messageRef,
//   formatTime,
//   btnOption,
//   selectedImage,
//   deleteImages,
//   handleAttachmentDownload,
//   insertEmoji,
//   inputRef,
//   sendMessage,
//   items,
//   visibleRight,
//   input,
//   setInput,
//   setSendMessageDialogVisible,
//   specificConversation,
//   chatState,
//   setChatState,
// }) => {
//   const messageRef = useRef(null);

//   useEffect(() => {
//     if (messageRef.current) {
//       messageRef.current.scrollTop = messageRef.current.scrollHeight;
//     }
//   }, [chatState?.specificConversation]);

//   return (
//     <div className="relative flex flex-col flex-1 h-screen md:h-full">
//       <div className="z-0 flex items-center justify-between w-full bg-white shadow-md h-15 px-2">
//         <div className="flex items-center gap-2">
//           <IoArrowBack
//             className="text-xl cursor-pointer md:hidden"
//             onClick={() => {
//               // setActiveChat(null);
//               // setSpecificConversation([]);
//               setChatState({
//                 active: null,
//                 input: "",
//                 allConversations: [],
//                 specificConversation: [],
//                 latestMessage: {
//                   srno: "",
//                   replayTime: "",
//                 },
//                 replyData: "",
//                 isReply: false,
//               });
//             }}
//           />
//           <img
//             src={chatState.active.image || "/default-avatar.jpg"}
//             alt={chatState.active.contectName}
//             className="w-10 h-10 rounded-full"
//           />
//           <h3 className="text-lg font-semibold">
//             {chatState.active.contectName || chatState.active.mobileNo}
//           </h3>
//           <InfoOutlinedIcon
//             onClick={() => setVisibleRight(true)}
//             sx={{ fontSize: "1.2rem", color: "green" }}
//           />
//         </div>
//         <SupportAgentOutlinedIcon
//           onClick={() => setDialogVisible(true)}
//           className="mr-2 cursor-pointer"
//         />
//       </div>

//       <div
//         ref={messageRef}
//         className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col md:max-h-[calc(100vh-8rem)] md:-mt-5"
//       >
//         {chatState.specificConversation?.map((group, groupIndex) => (
//           <div key={groupIndex}>
//             <div className="my-4 text-xs text-center text-gray-500">
//               {group?.date}
//             </div>
//             <div className="flex flex-col items-start space-y-2">
//               {group.messages.map((msg, index) => {
//                 const isSent = !msg.isReceived;
//                 const isImage = msg.replyType === "image";
//                 const isVideo = msg.replyType === "video";
//                 const isText = ["text", "button"].includes(msg.replyType);
//                 const commonMediaClass =
//                   "object-contain mb-2  pointer-events-none select-none h-48 w-48";

//                 return (
//                   <div
//                     key={index}
//                     className={`p-2 rounded-lg max-w-[70%] my-1 w-50 ${isSent ? "self-end" : "self-start"
//                       }`}
//                   >
//                     {(isImage || isVideo) && (
//                       <div
//                         className={`flex items-center gap-2 w-full ${isSent ? "flex-row-reverse" : ""
//                           }`}
//                       >
//                         <div
//                           className={`p-2 ${msg?.caption ? " rounded-md" : ""}`}
//                         >
//                           {msg?.mediaPath ? (
//                             <>
//                               {isImage ? (
//                                 <img
//                                   src={
//                                     isSent
//                                       ? msg.mediaPath
//                                       : `https://cb.celitix.com${msg.mediaPath}`
//                                   }
//                                   alt="Image"
//                                   className={commonMediaClass}
//                                 />
//                               ) : (
//                                 <video
//                                   src={
//                                     isSent
//                                       ? msg.mediaPath
//                                       : `https://cb.celitix.com${msg.mediaPath}`
//                                   }
//                                   className={commonMediaClass}
//                                   controls={true}
//                                 // autoPlay
//                                 />
//                               )}
//                               {msg?.caption && <p>{msg.caption}</p>}
//                             </>
//                           ) : (
//                             <button
//                               className="mb-2  h-48 w-48 flex justify-center items-center"
//                               onClick={() => handleAttachmentDownload(msg)}
//                             >
//                               <FileDownloadOutlinedIcon />
//                             </button>
//                           )}
//                         </div>
//                         {btnOption === "active" && (
//                           <button
//                             onClick={() => {
//                               console.log(msg);
//                               setChatState((prev) => ({
//                                 ...prev,
//                                 replyData: msg,
//                                 isReply: true,
//                               }));
//                             }}
//                           >
//                             <FaReply className="text-gray-500 size-3" />
//                           </button>
//                         )}
//                       </div>
//                     )}

//                     {isText && (
//                       <div
//                         className={`flex items-center gap-2 w-full ${isSent ? "flex-row-reverse" : ""
//                           }`}
//                       >
//                         <div
//                           className={`w-full  p-2 rounded-md ${isSent
//                             ? "bg-blue-500 text-white"
//                             : "bg-gray-200 text-black"
//                             }`}
//                         >
//                           {msg.messageBody}
//                         </div>
//                         {btnOption === "active" && (
//                           <button
//                             onClick={() => {
//                               setChatState((prev) => ({
//                                 ...prev,
//                                 replyData: msg,
//                                 isReply: true,
//                               }));
//                             }}
//                           >
//                             <FaReply className="text-gray-500 size-3" />
//                           </button>
//                         )}
//                       </div>
//                     )}

//                     <p
//                       className={`mt-1 text-[0.7rem] ${isSent ? "text-end" : "text-start"
//                         }`}
//                     >
//                       {formatTime(msg?.insertTime)}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Reply Preview */}
//       {chatState.isReply && btnOption === "active" && (
//         <div className="relative">
//           <div className="ml-2 mr-2  p-2">
//             {chatState.replyData?.replyType === "image" && (
//               <img
//                 src={
//                   chatState.replyData?.isReceived
//                     ? `https://cb.celitix.com${chatState.replyData?.mediaPath.path}`
//                     : chatState.replyData?.mediaPath
//                 }
//                 alt={chatState.replyData?.mediaPath.path}
//                 className="object-contain mb-2  pointer-events-none select-none h-48 w-48"
//               />
//             )}
//             {chatState.replyData?.replyType === "video" && (
//               <video
//                 src={
//                   chatState.replyData?.isReceived
//                     ? `https://cb.celitix.com${chatState.replyData?.mediaPath.path}`
//                     : chatState.replyData?.mediaPath
//                 }
//                 className="object-contain mb-2  pointer-events-none select-none h-48 w-48"
//               ></video>
//             )}
//             <p>{chatState.replyData?.messageBody}</p>
//           </div>
//           <div
//             onClick={() => {
//               // setIsReply(false);
//               // setReplyData(null);
//               setChatState({ ...chatState, isReply: false, replyData: null });
//             }}
//             className="absolute -top-1 left-50 cursor-pointer"
//           >
//             ❌
//           </div>
//         </div>
//       )}

//       {/* Image Preview */}
//       {selectedImage && (
//         <div className="flex flex-wrap gap-2 mt-2">
//           <div className="relative">
//             <button className="flex items-center gap-1">
//               <img
//                 src={URL.createObjectURL(selectedImage)}
//                 alt=""
//                 className="object-cover w-20 h-20"
//               />
//             </button>
//             <span
//               className="absolute text-red-500 cursor-pointer top-1 right-1"
//               onClick={() => deleteImages("4")}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-4 h-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Input Area */}
//       {btnOption === "active" ? (
//         // <div className="flex items-center w-full p-4 bg-white border-t mb-17 md:mb-0">
//         //   <div className="mr-2">
//         //     <CustomEmojiPicker position="top" onSelect={insertEmoji} />
//         //   </div>
//         //   <div className="relative flex items-center justify-center w-full gap-2 border rounded-lg">
//         //     <input
//         //       type="text"
//         //       className="flex-1 w-full p-2 focus:outline-none"
//         //       placeholder="Type a message..."
//         //       ref={inputRef}
//         //       value={input}
//         //       onChange={(e) => setInput(e.target.value)}
//         //       onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         //     />
//         //     <button
//         //       onClick={sendMessage}
//         //       disabled={!selectedImage && !input}
//         //       className="flex items-center justify-center w-8 h-8 text-white transition-all bg-blue-600 rounded-full shadow-md hover:bg-blue-700 active:scale-95 md:mr-6"
//         //     >
//         //       <FiSend className="w-4 h-4 mt-1 mr-1" />
//         //     </button>
//         //     <SpeedDial
//         //       model={items}
//         //       direction="up"
//         //       buttonStyle={{ width: "2rem", height: "2rem" }}
//         //       className="right-19 bottom-1 speeddial-bottom-right"
//         //     />
//         //     <div className="items-center justify-center hidden gap-1 mr-2 md:flex">
//         //       <FormatBoldOutlined />
//         //       <FormatItalicOutlined />
//         //       <FormatStrikethroughOutlined />
//         //     </div>
//         //   </div>
//         // </div>
//         <ChatInput
//           inputRef={inputRef}
//           input={input}
//           setInput={setInput}
//           sendMessage={sendMessage}
//           selectedImage={selectedImage}
//           items={items}
//           insertEmoji={insertEmoji}
//           setChatState={setChatState}
//           chatState={chatState}
//         />
//       ) : (
//         <ClosedChat setSendMessageDialogVisible={setSendMessageDialogVisible} />
//       )}

//       {/* Sidebar */}
//       <Sidebar
//         visible={visibleRight}
//         position="right"
//         onHide={() => setVisibleRight(false)}
//       >
//         <div className="flex flex-col justify-center gap-2">
//           <div className="flex items-center gap-2">
//             <img
//               src={chatState?.active.image || "/default-avatar.jpg"}
//               alt=""
//               className="w-10 h-10 rounded-full"
//             />
//             <h1>
//               {chatState?.active.contectName || chatState?.active.mobileNo}
//             </h1>
//           </div>
//           <div className="flex items-center gap-2">
//             <LocalPhoneOutlinedIcon />
//             <p>{chatState?.active.mobileNo}</p>
//           </div>
//         </div>
//         <div className="space-x-2 text-[0.9rem]">
//           {[
//             ["Status", "Requesting"],
//             ["Last Active", "12/03/2025 10:35:35"],
//             ["Template Messages", "2"],
//             ["Session Messages", "2"],
//             ["Unresolved Queries", "0"],
//             ["Source", "IMPORTED"],
//             ["First Message", "-"],
//             ["WA Conversation", "Active"],
//             ["MAU Status", "Active"],
//             ["Incoming", "Allowed"],
//             ["Circle", "Rajasthan"],
//           ].map(([label, value]) => (
//             <div
//               key={label}
//               className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1"
//             >
//               <p>{label}</p>
//               <p className="text-right">{value}</p>
//             </div>
//           ))}
//         </div>
//       </Sidebar>
//     </div>
//   );
// };


import { IoArrowBack } from "react-icons/io5";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FaReply } from "react-icons/fa";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import { FiSend } from "react-icons/fi";
import { SpeedDial } from "primereact/speeddial";
import {
  BoltRounded,
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
  LocalPhoneOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { Sidebar } from "primereact/sidebar";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { ClosedChat } from "./CloseChat";
import { ChatInput } from "./Input";
import { useEffect, useRef } from "react";

export const ChatScreen = ({
  setVisibleRight,
  setDialogVisible,
  // messageRef,
  formatTime,
  btnOption,
  selectedImage,
  deleteImages,
  handleAttachmentDownload,
  insertEmoji,
  inputRef,
  sendMessage,
  items,
  visibleRight,
  input,
  setInput,
  setSendMessageDialogVisible,
  specificConversation,
  chatState,
  setChatState,
}) => {
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [chatState?.specificConversation]);

  return (
    <div className="relative flex flex-col flex-1 h-screen md:h-full">
      <div className="z-0 flex items-center justify-between w-full bg-white shadow-md h-15 px-2">
        <div className="flex items-center gap-2">
          <IoArrowBack
            className="text-xl cursor-pointer md:hidden"
            onClick={() => {
              // setActiveChat(null);
              // setSpecificConversation([]);
              setChatState({
                active: null,
                input: "",
                allConversations: [],
                specificConversation: [],
                latestMessage: {
                  srno: "",
                  replayTime: "",
                },
                replyData: "",
                isReply: false,
              });
            }}
          />
          <img
            src={chatState.active.image || "/default-avatar.jpg"}
            alt={chatState.active.contectName}
            className="w-10 h-10 rounded-full"
          />
          <h3 className="text-lg font-semibold">
            {chatState.active.contectName || chatState.active.mobileNo}
          </h3>
          <InfoOutlinedIcon
            onClick={() => setVisibleRight(true)}
            sx={{ fontSize: "1.2rem", color: "green" }}
          />
        </div>
        <SupportAgentOutlinedIcon
          onClick={() => setDialogVisible(true)}
          className="mr-2 cursor-pointer"
        />
      </div>

      <div
        ref={messageRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col md:max-h-[calc(100vh-8rem)] md:-mt-5"
      >
        {chatState.specificConversation?.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="my-4 text-xs text-center text-gray-500">
              {group?.date}
            </div>
            <div className="flex flex-col items-start space-y-2">
              {group.messages.map((msg, index) => {
                const isSent = !msg.isReceived;
                const isImage = msg.replyType === "image";
                const isVideo = msg.replyType === "video";
                const isText = ["text", "button"].includes(msg.replyType);
                const commonMediaClass =
                  "object-contain mb-2  pointer-events-none select-none h-48 w-48";

                return (
                  <div
                    key={index}
                    className={`p-2 rounded-lg max-w-[70%] my-1 w-50 ${isSent ? "self-end" : "self-start"
                      }`}
                  >
                    {(isImage || isVideo) && (
                      <div
                        className={`flex items-center gap-2 w-full ${isSent ? "flex-row-reverse" : ""
                          }`}
                      >
                        <div
                          className={`p-2 ${msg?.caption ? " rounded-md" : ""}`}
                        >
                          {msg?.mediaPath ? (
                            <>
                              {isImage ? (
                                <img
                                  src={
                                    isSent
                                      ? msg.mediaPath
                                      : `http://95.216.43.170:8080/whatsappCallbackPro${msg.mediaPath}`
                                  }
                                  alt="Image"
                                  className={commonMediaClass}
                                />
                              ) : (
                                <video
                                  src={
                                    isSent
                                      ? msg.mediaPath
                                      : `http://95.216.43.170:8080/whatsappCallbackPro${msg.mediaPath}`
                                  }
                                  className={commonMediaClass}
                                  controls={true}
                                // autoPlay
                                />
                              )}
                              {msg?.caption && <p>{msg.caption}</p>}
                            </>
                          ) : (
                            <button
                              className="mb-2  h-48 w-48 flex justify-center items-center"
                              onClick={() => handleAttachmentDownload(msg)}
                            >
                              <FileDownloadOutlinedIcon />
                            </button>
                          )}
                        </div>
                        {btnOption === "active" && (
                          <button
                            onClick={() => {
                              setChatState((prev) => ({
                                ...prev,
                                replyData: msg,
                                isReply: true,
                              }));
                            }}
                          >
                            <FaReply className="text-gray-500 size-3" />
                          </button>
                        )}
                      </div>
                    )}

                    {isText && (
                      <div
                        className={`flex items-center gap-2 w-full ${isSent ? "flex-row-reverse" : ""
                          }`}
                      >
                        <div
                          className={`w-full  p-2 rounded-md ${isSent
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        >
                          {msg.messageBody}
                        </div>
                        {btnOption === "active" && (
                          <button
                            onClick={() => {
                              setChatState((prev) => ({
                                ...prev,
                                replyData: msg,
                                isReply: true,
                              }));
                            }}
                          >
                            <FaReply className="text-gray-500 size-3" />
                          </button>
                        )}
                      </div>
                    )}

                    <p
                      className={`mt-1 text-[0.7rem] ${isSent ? "text-end" : "text-start"
                        }`}
                    >
                      {formatTime(msg?.insertTime)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Reply Preview */}
      {chatState.isReply && btnOption === "active" && (
        <div className="relative">
          <div className="ml-2 mr-2  p-2">
            {chatState.replyData?.replyType === "image" && (
              <img
                src={
                  chatState.replyData?.isReceived
                    ? `http://95.216.43.170:8080/whatsappCallbackPro${chatState.replyData?.mediaPath}`
                    : chatState.replyData?.mediaPath
                }
                alt={chatState.replyData?.mediaPath}
                className="object-contain mb-2  pointer-events-none select-none h-48 w-48"
              />
            )}
            {chatState.replyData?.replyType === "video" && (
              <video
                src={
                  chatState.replyData?.isReceived
                    ? `http://95.216.43.170:8080/whatsappCallbackPro${chatState.replyData?.mediaPath}`
                    : chatState.replyData?.mediaPath
                }
                controls
                className="object-contain mb-2 h-48 w-48"
              ></video>
            )}
            <p>{chatState.replyData?.messageBody}</p>
          </div>
          <div
            onClick={() => {
              // setIsReply(false);
              // setReplyData(null);
              setChatState({ ...chatState, isReply: false, replyData: null });
            }}
            className="absolute -top-1 left-50 cursor-pointer"
          >
            ❌
          </div>
        </div>
      )}

      {/* Image Preview */}
      {selectedImage && (
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="relative">
            <button className="flex items-center gap-1">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt=""
                className="object-cover w-20 h-20"
              />
            </button>
            <span
              className="absolute text-red-500 cursor-pointer top-1 right-1"
              onClick={() => deleteImages("4")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
        </div>
      )}

      {/* Input Area */}
      {btnOption === "active" ? (
        // <div className="flex items-center w-full p-4 bg-white border-t mb-17 md:mb-0">
        //   <div className="mr-2">
        //     <CustomEmojiPicker position="top" onSelect={insertEmoji} />
        //   </div>
        //   <div className="relative flex items-center justify-center w-full gap-2 border rounded-lg">
        //     <input
        //       type="text"
        //       className="flex-1 w-full p-2 focus:outline-none"
        //       placeholder="Type a message..."
        //       ref={inputRef}
        //       value={input}
        //       onChange={(e) => setInput(e.target.value)}
        //       onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        //     />
        //     <button
        //       onClick={sendMessage}
        //       disabled={!selectedImage && !input}
        //       className="flex items-center justify-center w-8 h-8 text-white transition-all bg-blue-600 rounded-full shadow-md hover:bg-blue-700 active:scale-95 md:mr-6"
        //     >
        //       <FiSend className="w-4 h-4 mt-1 mr-1" />
        //     </button>
        //     <SpeedDial
        //       model={items}
        //       direction="up"
        //       buttonStyle={{ width: "2rem", height: "2rem" }}
        //       className="right-19 bottom-1 speeddial-bottom-right"
        //     />
        //     <div className="items-center justify-center hidden gap-1 mr-2 md:flex">
        //       <FormatBoldOutlined />
        //       <FormatItalicOutlined />
        //       <FormatStrikethroughOutlined />
        //     </div>
        //   </div>
        // </div>
        <ChatInput
          inputRef={inputRef}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          selectedImage={selectedImage}
          items={items}
          insertEmoji={insertEmoji}
          setChatState={setChatState}
          chatState={chatState}
        />
      ) : (
        <ClosedChat setSendMessageDialogVisible={setSendMessageDialogVisible} />
      )}

      {/* Sidebar */}
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <img
              src={chatState?.active.image || "/default-avatar.jpg"}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <h1>
              {chatState?.active.contectName || chatState?.active.mobileNo}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <LocalPhoneOutlinedIcon />
            <p>{chatState?.active.mobileNo}</p>
          </div>
        </div>
        <div className="space-x-2 text-[0.9rem]">
          {[
            ["Status", "Requesting"],
            ["Last Active", "12/03/2025 10:35:35"],
            ["Template Messages", "2"],
            ["Session Messages", "2"],
            ["Unresolved Queries", "0"],
            ["Source", "IMPORTED"],
            ["First Message", "-"],
            ["WA Conversation", "Active"],
            ["MAU Status", "Active"],
            ["Incoming", "Allowed"],
            ["Circle", "Rajasthan"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1"
            >
              <p>{label}</p>
              <p className="text-right">{value}</p>
            </div>
          ))}
        </div>
      </Sidebar>
    </div>
  );
};
