import { useState, useRef, useEffect } from "react";
import { IoArrowBack, IoVideocamOutline } from "react-icons/io5";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ChatInput } from "./chatInput";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileWord, FaReply } from "react-icons/fa";
import moment from "moment";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FullscreenIcon } from "lucide-react";
import { PiFilePdf, PiMicrosoftExcelLogo } from "react-icons/pi";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { HiOutlineCheck } from "react-icons/hi";
import { VscCheckAll } from "react-icons/vsc";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
// import { rcschatbg } from "@/assets/images/rcsbg.avif";

export const ChatScreen = ({
  chatState,
  btnOption,
  sendMessage,
  input,
  setInput,
  inputRef,
  fileInputRef,
  isSpeedDialOpen,
  setIsSpeedDialOpen,
  documentInputRef,
  isTemplateMessage,
  setIsTemplateMessage,
  handleSendTemplateMessage,
  setChatState,
  selectedMedia,
  setSelectedMedia,
}) => {
  const [replyingMessageId, setReplyingMessageId] = useState(null);
  const messageRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  function formatTime(time) {
    return moment(time).format("HH:mm");
  }

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }

    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }

    const timeout = setTimeout(() => {
      if (messageRef.current) {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }
      if (endOfMessagesRef.current) {
        endOfMessagesRef.current.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [chatState?.specificConversation]);

  function mediaType(mime) {
    const type = mime.split("/")[0];
    if (type === "image") {
      return "Image";
    } else if (type === "video") {
      return "Video";
    } else {
      return "Document";
    }
  }

  function getFileType(extension) {
    const type = extension.split("/")[1];
    switch (type) {
      case "xlsx":
        return "xlsx";
      case "csv":
        return "csv";
      case "docx":
        return "docx";
      case "pdf":
        return "pdf";
      default:
        return "";
    }
  }
  function getFileTypeIcon(extension) {
    const type = extension.split("/")[1];
    switch (type) {
      case "xlsx":
        return <PiMicrosoftExcelLogo size={25} />;
      case "csv":
        return <PiMicrosoftExcelLogo size={25} />;
      case "docx":
        return <FaFileWord size={25} />;
      case "pdf":
        return <PiFilePdf size={25} />;
      case "mp4":
        return <IoVideocamOutline size={25} />;
      default:
        return <InsertDriveFileIcon size={25} />;
    }
  }

  const BASE_MEDIA_URL = "https://cb.celitix.com/";

  const closeChatVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="relative flex flex-col flex-1 h-screen md:h-full">
      <div className=" z-1 flex items-center justify-between w-full h-15 bg-gray-100 px-2 border rounded-tr-lg">
        <div className="flex items-center gap-2 h-auto">
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
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-[#22577E] border-2 border-[#22577E] font-semibold text-sm">
            {"A"}
          </div>

          <h3 className="text-md font-semibold text-[#22577E]">
            {chatState.active.mobileNo}
          </h3>
          {/* <InfoOutlinedIcon
            onClick={() => {}}
            sx={{ fontSize: "1.2rem", color: "green" }}
          /> */}
        </div>
      </div>

      {/* Message Render here */}
      <div className="relative flex-1 overflow-y-auto md:-mt-5">
        <div className="fixed inset-0 bg-[url(/rcsbg4.avif)] bg-cover bg-center  -z-10"></div>
        <div
          ref={messageRef}
          className="p-4 space-y-2 flex flex-col relative"
        // bg-[url(https://static1.srcdn.com/wordpress/wp-content/uploads/2023/04/google.jpg?q=50&fit=crop&w=825&dpr=1.5)]
        >
          {chatState.specificConversation?.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="my-4 text-xs text-center text-black font-semibold">
                {group?.date}
              </div>
              <div className="flex flex-col items-start space-y-2">
                {group.messages.map((msg, index) => {
                  const isSent = !msg.isReceived;
                  const isImage =
                    msg.replyType === "Other" &&
                    mediaType(msg?.mineType) === "Image";

                  const isVideo =
                    msg.replyType === "Other" &&
                    mediaType(msg?.mineType) === "Video";

                  const isDocument =
                    msg.replyType === "Other" &&
                    mediaType(msg?.mineType) === "Document";

                  const templateType = msg?.templateType;
                  const isBot = msg?.replyType === "interactive";
                  const isText = ["text", "button"].includes(msg.replyType);
                  const isReply = msg?.isReply;
                  const commonMediaClass = "object-contain mb-2 select-none";
                  const mediaUrl = msg?.mediaPath;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{
                        opacity: 1,
                        x:
                          replyingMessageId === msg.id
                            ? isSent
                              ? -20
                              : 20
                            : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={`p-2 rounded-lg max-w-[90%] my-1 ${isSent ? "self-end" : "self-start"
                        }`}
                    >
                      {isReply && (
                        <div className="text-sm border-b-2 border-black">
                          {msg?.replyMessage}
                        </div>
                      )}

                      {(isImage || isVideo || isDocument) && (
                        <div
                          className={`flex items-center gap-2 w-full ${isSent ? "flex-row-reverse" : ""
                            }`}
                        >
                          <div
                            className={`${msg?.caption ? "p-2 rounded-md" : ""}`}
                          >
                            {msg?.mediaPath ? (
                              <>
                                {isImage && (
                                  <div
                                    className={`relative group w-full h-full ${msg?.caption
                                      ? "border border-gray-200 rounded-md max-w-[200px] bg-white"
                                      : ""
                                      }`}
                                  >
                                    <img
                                      src={mediaUrl}
                                      alt="Image"
                                      className={`mb-2 h-auto max-h-50 w-auto object-contain select-none pointer-events-none border border-gray-200 ${msg?.caption
                                        ? "rounded-t-lg"
                                        : "rounded-md"
                                        }`}
                                    />
                                    {msg?.caption && (
                                      <div className="text-sm text-gray-500 mt-2 ml-2 whitespace-pre-wrap break-words">
                                        {msg?.caption}
                                      </div>
                                    )}
                                    <div className="flex items-center justify-center">
                                      <button
                                        className="absolute top-20 cursor-pointer bg-gray-300 rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => {
                                          event.stopPropagation();
                                          setPreviewDialog({
                                            open: true,
                                            type: "image",
                                            url: mediaUrl,
                                            caption: msg?.caption,
                                          });
                                        }}
                                      >
                                        <FullscreenIcon fontSize="small" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                                {isVideo && (
                                  <div
                                    className={`${msg?.caption
                                      ? "border border-gray-200 rounded-md max-w-[200px] bg-white relative group"
                                      : "relative group"
                                      }`}
                                  >
                                    <video
                                      src={mediaUrl}
                                      controls
                                      autoPlay={false}
                                      className={`h-65 w-auto border border-gray-200 rounded-md bg-center bg-no-repeat`}
                                    />
                                    {msg?.caption && (
                                      <div className="text-sm text-gray-500 mt-2 ml-2 whitespace-pre-wrap break-words">
                                        {msg?.caption}
                                      </div>
                                    )}
                                    <div className="flex items-center justify-center">
                                      <button
                                        className="absolute top-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow cursor-pointer"
                                        onClick={() => {
                                          event.stopPropagation();
                                          setPreviewDialog({
                                            open: true,
                                            type: "video",
                                            url: mediaUrl,
                                            caption: msg?.caption,
                                          });
                                        }}
                                      >
                                        <FullscreenIcon fontSize="small" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                                {isDocument && (
                                  <div
                                    className={`${msg?.caption
                                      ? "border border-gray-200 rounded-md max-w-[200px]bg-white relative group"
                                      : "relative group"
                                      }`}
                                  >
                                    <div className="bg-[#e1f3fb] text-black p-4 rounded-2xl shadow-md max-w-xs flex items-center gap-3">
                                      <div className="bg-white p-3 rounded-full shadow-inner text-blue-500">
                                        {getFileTypeIcon(msg?.mineType)}
                                      </div>
                                      <div className="flex flex-col">
                                        <div className="font-medium truncate max-w-[10rem">
                                          {msg.fileName || "Untitled Document"}
                                        </div>
                                        <div className="text-xs text-gray-500 uppercase">
                                          .{getFileType(msg?.mineType)}
                                        </div>
                                      </div>
                                    </div>
                                    {msg?.caption && (
                                      <div className="text-sm text-gray-500 mt-2 ml-2 whitespace-pre-wrap break-words">
                                        {msg?.caption}
                                      </div>
                                    )}
                                    <div className="flex items-center justify-center">
                                      <button
                                        className="absolute top-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow"
                                        onClick={() => {
                                          event.stopPropagation();
                                          setPreviewDialog({
                                            open: true,
                                            type: "document",
                                            url: mediaUrl,
                                            fileType,
                                            caption: msg?.caption,
                                          });
                                        }}
                                      >
                                        <FullscreenIcon fontSize="small" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <motion.div
                                className="mb-2 h-48 w-72 flex justify-center items-center object-contain rounded-md border border-gray-200 bg-gray-200 relative overflow-hidden"
                                style={{ backdropFilter: "blur(8px)" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                id="download-button"
                                onClick={() => handleDownloadWithPreview(msg)}
                              >
                                {isDownloading ? (
                                  <CircularProgress
                                    size={24}
                                    className="text-[#22577E]"
                                  />
                                ) : (
                                  <>
                                    <motion.div
                                      className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50"
                                      initial={{ opacity: 0.5 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <FileDownloadOutlinedIcon className="text-gray-600 cursor-pointer" />
                                    </motion.div>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </div>
                          {btnOption === "active" && (
                            <div className="flex gap-2">
                              <button
                                className="hover:bg-gray-300 transition-all duration-200 rounded-full p-1 px-2 cursor-pointer"
                                onClick={() => {
                                  // setChatState((prev) => ({
                                  //   ...prev,
                                  //   // replyData: msg,
                                  //   replyData: {
                                  //     ...msg,
                                  //     fileType,
                                  //   },
                                  //   isReply: true,
                                  // }));
                                }}
                              >
                                <FaReply className=" size-3" />
                              </button>

                              <button
                                className="hover:bg-gray-300 transition-all duration-200 rounded-full p-0.5 cursor-pointer"
                                onClick={() => {
                                  // const url = isSent
                                  //   ? msg.mediaPath
                                  //   : `${BASE_MEDIA_URL}${msg.mediaPath}`;
                                  const filename = msg.fileName || "file";
                                  handleDownload(mediaUrl, filename);
                                }}
                              >
                                <FileDownloadOutlinedIcon className="size-2" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {isText && (
                        <div
                          className={`flex items-center gap-2 max-w-[200px] ${isSent ? "flex-row-reverse" : ""
                            }`}
                        >
                          <div>
                            <p
                              className={`whitespace-pre-wrap break-words p-3 rounded-2xl text-sm shadow-sm ${isSent
                                ? "bg-[#22577E] text-white rounded-br-none"
                                : "bg-[#5584AC] text-white rounded-bl-none"
                                }`}
                            >
                              {msg.messageBody}
                            </p>
                          </div>
                          {btnOption === "active" && (
                            <button
                              className="hover:bg-gray-300 transition-all duration-200 rounded-full py-2 px-2 cursor-pointer"
                              onClick={() => {
                                // setChatState((prev) => ({
                                //   ...prev,
                                //   replyData: msg,
                                //   isReply: true,
                                // }));
                              }}
                            >
                              <FaReply className=" size-3" />
                            </button>
                          )}
                        </div>
                      )}

                      {templateType && <TemplateMessagePreview template={msg} />}
                      {isBot && <BotPreview template={msg} />}

                      <div
                        className={`mt-1 text-[0.7rem] ${isSent ? "text-end" : "text-start"
                          }`}
                      >
                        <div className="flex justify-end gap-2 items-center">
                          <p>{formatTime(msg?.insertTime)}</p>
                          {isSent && !msg?.isView && (
                            <HiOutlineCheck className="size-4" />
                          )}
                          {isSent && msg?.isView && (
                            <VscCheckAll className="size-4 text-blue-500" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </div>


      {btnOption === "active" ? (
        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          inputRef={inputRef}
          fileInputRef={fileInputRef}
          documentInputRef={documentInputRef}
          setIsSpeedDialOpen={setIsSpeedDialOpen}
          isSpeedDialOpen={isSpeedDialOpen}
          isTemplateMessage={isTemplateMessage}
          setIsTemplateMessage={setIsTemplateMessage}
          selectedMedia={selectedMedia}
          setSelectedMedia={setSelectedMedia}
        />
      ) : (
        <motion.div
          variants={closeChatVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center  w-full p-3 gap-2 bg-white shadow-lg rounded-t-lg mb-24 md:mb-0 md:flex-row"
        >
          <div className="flex items-center gap-2 text-gray-700">
            <AccessAlarmOutlinedIcon className="text-red-500" />
            <p className="font-semibold">24 Hour Window Elapsed</p>
          </div>
          <p className="text-xs text-gray-500 text-center md:text-left mt-2 md:mt-0">
            The 24-hour conversation window has elapsed. Please wait for the
            user to initiate a chat or start a new conversation using a template
            message.
          </p>
          {/* Right Section */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTemplateMessage(true)}
            className="flex items-center justify-center px-1 py-1  text-white bg-[#5584AC] hover:bg-[#22577E] transition-all duration-200 rounded-md shadow-md"
          >
            Start Chat
            <ArrowRightAltOutlinedIcon className="ml-2" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
