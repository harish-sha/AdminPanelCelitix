import { IoArrowBack } from "react-icons/io5";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FaReply } from "react-icons/fa";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
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
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { TemplateMessagePreview } from "./Template";
import {
  getWabaList,
  getWabaTemplateDetails,
  blockUser,
} from "@/apis/whatsapp/whatsapp";
import CircularProgress from "@mui/material/CircularProgress";
import { LuHistory } from "react-icons/lu";

import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { Dialog } from "primereact/dialog";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { PiFilePdf } from "react-icons/pi";
import { FaFileWord } from "react-icons/fa6";
import { HiOutlineCheck } from "react-icons/hi";
import { VscCheckAll } from "react-icons/vsc";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";

import { getBaseUrl } from "@/apis/common/common";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import CustomTooltip from "@/components/common/CustomTooltip";
import BotPreview from "../BotPreview";
import { useUser } from "@/context/auth";
import WhatsAppVoiceMessage from "./AudioPreview";

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
  handleFetchSpecificConversation,
  setChatIndex,
  chatIndex,
  chatLoading,
}) => {
  const messageRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);

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

  const mediaRender = (isSent) => {
    return (
      <div
        className={`flex items-center gap-2 w-full ${
          isSent ? "flex-row-reverse" : ""
        }`}
      >
        <div className={`p-2 ${msg?.caption ? " rounded-md" : ""}`}></div>
      </div>
    );
  };

  // const [BASE_MEDIA_URL, setBaseMediaUrl] = useState("");

  // useEffect(() => {
  //   const fetchBaseUrl = async () => {
  //     try {
  //       const url = await getBaseUrl("WhatsappChatBoxApi");
  //       setBaseMediaUrl(url?.url);
  //     } catch (err) {
  //       console.error("Failed to fetch base URL", err);
  //     }
  //   };
  //   fetchBaseUrl();
  // }, []);

  const BASE_MEDIA_URL = "https://cb.celitix.com";

  // const BASE_MEDIA_URL = "/image";

  // const BASE_MEDIA_URL = import.meta.env.VITE_IMAGE_URL;

  const handleDownload = async (url, filename) => {
    try {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename || "file");
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Download started!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download the file.");
    }
  };

  // const handleDownload = async (url, filename = "file") => {
  //   try {
  //     const proxy = "https://cors-anywhere.herokuapp.com/";
  //     const finalUrl = `${proxy}${url}`;

  //     const response = await fetch(finalUrl);
  //     if (!response.ok) throw new Error("Network error");

  //     const blob = await response.blob();
  //     const blobUrl = URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = blobUrl;
  //     link.setAttribute("download", filename);
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();

  //     URL.revokeObjectURL(blobUrl);
  //     toast.success("Download started!");
  //   } catch (error) {
  //     console.error("Download failed:", error);
  //     toast.error("CORS Blocked: Cannot download file directly.");
  //   }
  // };

  // const handleDownload = async (relativePathOrUrl, filename = "file") => {
  //   try {
  //     // Check if it's already a full URL (starts with http/https)
  //     const isFullUrl = /^https?:\/\//.test(relativePathOrUrl);
  //     const url = isFullUrl
  //       ? relativePathOrUrl
  //       : `${BASE_MEDIA_URL.replace(/\/$/, "")}/${relativePathOrUrl.replace(/^\/+/, "")}`;

  //     const response = await fetch(url, { mode: 'cors' });

  //     if (!response.ok) throw new Error("Network response was not ok");

  //     const blob = await response.blob();
  //     const blobUrl = window.URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = blobUrl;
  //     link.setAttribute("download", filename);
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();

  //     window.URL.revokeObjectURL(blobUrl);
  //     toast.success("Download started!");
  //   } catch (error) {
  //     console.error("Download error:", error);
  //     toast.error("Failed to download the file.");
  //   }
  // };

  // const handleDownload = async (url, filename) => {
  //   try {
  //     const res = await axios.get(url, { responseType: "blob" });
  //     const blobUrl = window.URL.createObjectURL(res?.data);
  //     window.open(blobUrl);
  //     const link = document.createElement("a");
  //     link.href = blobUrl;
  //     link.download = filename;
  //     link.click();
  //     toast.success("Download started!");
  //   } catch (error) {
  //     console.error("Download error:", error);
  //     toast.error("Failed to download the file.");
  //   }
  // };

  // const handleDownload = (url, filename = "file") => {
  //   try {
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = filename;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     toast.success("Download started!");
  //   } catch (error) {
  //     console.error("Download error:", error);
  //     toast.error("Failed to download the file.");
  //   }
  // };

  // ===========================================================================
  const { user } = useUser();
  const [replyingMessageId, setReplyingMessageId] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [previewDialog, setPreviewDialog] = useState({
    open: false,
    type: "", // "image" | "video" | "document"
    url: "",
    caption: "",
  });

  const handleReplyClick = (msg) => {
    setReplyingMessageId(msg.id);
    setTimeout(() => {
      setReplyingMessageId(null);
    }, 500);

    setChatState((prev) => ({
      ...prev,
      replyData: msg,
      isReply: true,
    }));
  };

  const handleDownloadWithPreview = async (msg) => {
    try {
      setIsDownloading(true);
      const downloadedImage = await handleAttachmentDownload(msg);
      setPreviewImage(downloadedImage);
    } catch (error) {
      console.error("Error during download:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const replyPreviewVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  function getFileType(extension) {
    switch (extension) {
      case "xlsx":
        return <PiMicrosoftExcelLogo size={25} />;
      case "csv":
        return <PiMicrosoftExcelLogo size={25} />;
      case "docx":
        return <FaFileWord size={25} />;
      case "pdf":
        return <PiFilePdf size={25} />;
      default:
        return <InsertDriveFileIcon size={25} />;
    }
  }

  async function handleBlockUser(waba, phone) {
    try {
      setIsBlocking(true);
      const payload = {
        messaging_product: "whatsapp",
        block_users: [{ user: phone }],
      };
      const res = await blockUser(waba, payload);
      if (res?.block_users?.added_users?.length == 0) {
        toast.error("Unable to block user");
      } else {
        toast.success("User blocked successfully");
        setShowBlockConfirm(false);
      }
    } catch (e) {
      toast.error("Error blocking user");
    } finally {
      setIsBlocking(false);
    }
  }

  return (
    <div className="relative flex flex-col flex-1 h-screen md:h-full">
      <div className="mt-0 md:mt-0 z-1 flex items-center justify-between w-full h-15 bg-gray-100 px-2 border rounded-tr-lg">
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
          {chatState?.active.image ? (
            <img
              src={chatState.active.image || "/default-avatar.jpg"}
              alt={chatState.active.contectName}
              className="w-8 h-8 rounded-full border-2 border-gray-900"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-[#22577E] border-2 border-[#22577E] font-semibold text-sm">
              {chatState.active.contectName?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}

          <h3 className="text-md font-semibold text-[#22577E]">
            {chatState.active.contectName || chatState.active.mobileNo}
          </h3>
          <InfoOutlinedIcon
            onClick={() => setVisibleRight(true)}
            sx={{ fontSize: "1.2rem", color: "green" }}
          />
        </div>
        <div className="flex items-center gap-2 justify-between">
          <CustomTooltip title="Block User" placement="top" arrow>
            <button
              // onClick={() => {
              //   handleBlockUser(
              //     chatState.active.wabaNumber,
              //     chatState.active.mobileNo
              //   );
              // }}
              onClick={() => setShowBlockConfirm(!showBlockConfirm)}
              className="hover:bg-gray-200 transition-all duration-200 rounded-full p-1 cursor-pointer"
            >
              <MdBlock className="text-red-500 size-5" />
            </button>
          </CustomTooltip>
          {showBlockConfirm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-13 right-4 bg-white border border-gray-300 rounded-md shadow-md p-2 text-sm z-50 w-48"
            >
              <p className="text-gray-700 mb-2">
                Are you sure you want to block this user?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    handleBlockUser(
                      chatState.active.wabaNumber,
                      chatState.active.mobileNo
                    );
                  }}
                  disabled={isBlocking}
                  className={`px-3 py-1 rounded-md text-xs transition cursor-pointer ${
                    isBlocking
                      ? "bg-red-300 text-white"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {isBlocking ? "Blocking..." : "Block"}
                </button>
                {!isBlocking && (
                  <button
                    onClick={() => setShowBlockConfirm(false)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs hover:bg-gray-400 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </motion.div>
          )}
          {user.role !== "AGENT" && (
            <CustomTooltip title="Assign Agent" placement="top" arrow>
              <SupportAgentOutlinedIcon
                onClick={() => setDialogVisible(true)}
                className="mr-2 cursor-pointer text-[#22577E]"
              />
            </CustomTooltip>
          )}
        </div>
      </div>

      <div
        ref={messageRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col mb-35 md:mb-18 md:-mt-5 bg-[url(/WB.png)]"
      >
        <div className="flex items-center justify-center mt-2">
          <button
            className="bg-[#22577E] text-white px-4 py-2 rounded-md flex gap-2 items-center"
            onClick={() => {
              setChatIndex((prev) => prev + 1);
              // handleFetchSpecificConversation(true);
            }}
          >
            <LuHistory />
            Load Older
          </button>
        </div>
        {chatState.specificConversation?.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="my-4 text-xs text-center text-black font-semibold">
              {group?.date}
            </div>
            <div className="flex flex-col items-start space-y-2">
              {group.messages.map((msg, index) => {
                const isSent = !msg.isReceived;
                const isImage = msg.replyType === "image";
                const isAudio = msg.replyType === "audio";
                const isVideo = msg.replyType === "video";
                const isDocument = msg.replyType === "document";
                const templateType = msg?.templateType;
                // const isText = ["text", "button", "interactive"].includes(
                //   msg.replyType
                // );
                const isBot = msg?.replyType === "interactive";
                const isText = ["text", "button"].includes(msg.replyType);
                const isReply = msg?.isReply;
                const commonMediaClass = "object-contain mb-2 select-none";
                const mediaUrl = isSent
                  ? msg?.mediaPath
                  : `${BASE_MEDIA_URL}${msg?.mediaPath}`;

                let fileType = "";
                // const extension = url.split('.').pop().split(/\#|\?/)[0];
                isDocument &&
                  (fileType = msg?.mediaPath
                    ?.split(".")
                    .pop()
                    .split(/\#|\?/)[0]);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: replyingMessageId === msg.id ? (isSent ? -20 : 20) : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className={`p-2 rounded-lg max-w-[90%] my-1 ${
                      isSent ? "self-end" : "self-start"
                    }`}
                  >
                    {isReply && (
                      <div className="bg-gray-100 border-l-4 border-green-500 p-2 rounded-sm mb-0">
                        <p className="text-xs text-gray-500 mb-1">you</p>
                        <p className="text-sm text-gray-800 break-words">
                          {msg?.replyMessage}
                        </p>
                      </div>
                    )}
                    {/* {isReply && <div className="text-sm border-b-2 bg-blue-300 px-3 py-2 rounded-t-md border-gray-700">{msg?.replyMessage}</div>} */}
                    {(isImage || isVideo || isDocument || isAudio) && (
                      <div
                        className={`flex items-center gap-2 w-full ${
                          isSent ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`${msg?.caption ? "p-2 rounded-md" : ""}`}
                        >
                          {msg?.mediaPath ? (
                            <>
                              {isImage && (
                                <div
                                  className={`relative group w-full h-full ${
                                    msg?.caption
                                      ? "border border-gray-200 p-1 rounded-md max-w-[200px] bg-[#22577E]"
                                      : ""
                                  }`}
                                >
                                  <img
                                    src={mediaUrl}
                                    alt="Image"
                                    className={`mb-1 h-auto max-h-50 w-auto object-contain select-none pointer-events-none border border-gray-200 ${
                                      msg?.caption
                                        ? "rounded-t-lg"
                                        : "rounded-md"
                                    }`}
                                  />
                                  {msg?.caption && (
                                    <div className="text-sm text-white mb-1 ml-2 whitespace-pre-wrap break-words">
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
                                  className={`${
                                    msg?.caption
                                      ? "border border-gray-200 p-1 rounded-md max-w-[200px] bg-[#22577E] relative group"
                                      : "relative group"
                                  }`}
                                >
                                  <video
                                    src={mediaUrl}
                                    controls
                                    autoPlay={false}
                                    className={`mb-1 h-50 border border-gray-200 rounded-md bg-center bg-no-repeat w-[300px] object-cover`}
                                  />
                                  {msg?.caption && (
                                    <div className="text-sm text-white mb-1 ml-2 whitespace-pre-wrap break-words">
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
                              {isAudio && (
                                <div
                                  className={`${
                                    msg?.caption
                                      ? "border border-gray-200 p-1 rounded-md max-w-[200px] bg-[#22577E] relative group"
                                      : "relative group"
                                  }`}
                                >
                                  <WhatsAppVoiceMessage
                                    src={mediaUrl}
                                    controls
                                    autoPlay={false}
                                    className={`mb-1 rounded-md bg-center bg-no-repeat w-[300px] object-cover`}
                                  />
                                  {msg?.caption && (
                                    <div className="text-sm text-white mb-1 ml-2 whitespace-pre-wrap break-words">
                                      {msg?.caption}
                                    </div>
                                  )}
                                  {/* <div className="flex items-center justify-center">
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
                                  </div> */}
                                </div>
                              )}
                              {isDocument && (
                                <div
                                  className={`${
                                    msg?.caption
                                      ? "border border-gray-200 mb-1 rounded-md max-w-[200px] bg-[#22577E] p-1 relative group"
                                      : "relative group"
                                  }`}
                                >
                                  {/* <iframe
                                    src={mediaUrl}
                                    className={`h-48 border border-gray-200 rounded-md bg-center bg-no-repeat`}
                                    allow="encrypted-media;"
                                    allowFullScreen
                                  /> */}
                                  <div className="bg-[#e1f3fb] text-black p-4 rounded-sm shadow-md max-w-xs flex items-center gap-3 mb-1">
                                    <div className="bg-white p-1 rounded-full shadow-inner text-blue-500">
                                      {/* <InsertDriveFileIcon
                                        sx={{ fontSize: 25 }}
                                      /> */}
                                      {getFileType(fileType)}
                                    </div>
                                    <div className="flex flex-col">
                                      <div
                                        className="font-medium text-sm truncate w-[10rem]"
                                        title={msg.fileName}
                                      >
                                        {msg.fileName || "Untitled Document"}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        .{fileType}
                                      </div>
                                    </div>
                                  </div>
                                  {msg?.caption && (
                                    <div className="text-sm text-white mb-1 ml-2 whitespace-pre-wrap break-words">
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
                            // <button
                            //   className="mb-2 h-48 w-72 flex justify-center items-center object-contain rounded-md border border-gray-200
                            //     bg-[url(/blurImage.jpg)]"
                            //   onClick={() => handleAttachmentDownload(msg)}
                            // >
                            //   <FileDownloadOutlinedIcon />
                            // </button>
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
                                setChatState((prev) => ({
                                  ...prev,
                                  // replyData: msg,
                                  replyData: {
                                    ...msg,
                                    fileType,
                                  },
                                  isReply: true,
                                }));
                              }}
                            >
                              <FaReply className=" size-3" />
                            </button>
                            {/* <a
                              onClick={() => {
                                toast.success("Downloading Start");
                              }}
                              href={
                                isSent
                                  ? msg.mediaPath
                                  : `${BASE_MEDIA_URL}${msg.mediaPath}`
                              }
                              download={msg?.mediaId}
                            >
                              <FileDownloadOutlinedIcon className="size-2" />
                            </a> */}
                            <button
                              className="hover:bg-gray-300 transition-all duration-200 rounded-full p-0.5 cursor-pointer"
                              // onClick={() => {
                              //   // toast.success("Download started");
                              //   const url = isSent
                              //     ? msg.mediaPath
                              //     : `${BASE_MEDIA_URL}${msg.mediaPath}`;
                              //   handleDownload(url, msg?.mediaId || "file");
                              // }}
                              onClick={() => {
                                const url = isSent
                                  ? msg.mediaPath
                                  : `${BASE_MEDIA_URL}${msg.mediaPath}`;
                                const filename = msg.mediaId || "file";
                                handleDownload(url, filename);
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
                        className={`flex items-center gap-2 max-w-[200px]  ${
                          isSent ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div className="max-w-[250px]">
                          <p
                            className={`whitespace-pre-wrap break-words p-3 rounded-2xl text-sm shadow-sm ${
                              isSent
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
                              setChatState((prev) => ({
                                ...prev,
                                replyData: msg,
                                isReply: true,
                              }));
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
                      className={`mt-1 text-[0.7rem] ${
                        isSent ? "text-end" : "text-start"
                      }`}
                    >
                      <div
                        className={`flex gap-2 items-center ${
                          isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        {!isSent && (
                          <>
                            {/* For received messages, show time first */}
                            <p>{formatTime(msg?.insertTime)}</p>
                          </>
                        )}

                        {isSent && !msg?.isView && (
                          <HiOutlineCheck className="size-4" />
                        )}
                        {isSent && msg?.isView && (
                          <VscCheckAll className="size-4 text-blue-500" />
                        )}

                        {isSent && (
                          <>
                            {/* For sent messages, show time after ticks */}
                            <p>{formatTime(msg?.insertTime)}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {chatIndex > 1 && (
          <button
            className="bg-[#22577E] text-white px-4 py-2 rounded-md flex gap-2 items-center ml-auto mr-auto"
            onClick={() => {
              setChatIndex((prev) => prev - 1);
              // handleFetchSpecificConversation(true);
            }}
          >
            <LuHistory />
            Load more
          </button>
        )}

        <div ref={endOfMessagesRef} />
      </div>

      {/* media full screen preview */}
      <Dialog
        header=""
        visible={previewDialog.open}
        onHide={() => setPreviewDialog({ ...previewDialog, open: false })}
        className="w-[50rem]"
        draggable={false}
      >
        <div className="flex flex-col items-center justify-center bg-gray-400 rounded-md p-1">
          {previewDialog.type === "image" && (
            <img
              src={previewDialog.url}
              alt="Preview"
              className="max-h-[80vh] max-w-full rounded-lg"
            />
          )}
          {previewDialog.type === "video" && (
            <video
              src={previewDialog.url}
              controls
              className="h-100 max-w-full rounded-lg"
            />
          )}
          {previewDialog.type === "document" && (
            <iframe
              src={
                previewDialog.fileType === "xlsx"
                  ? `https://view.officeapps.live.com/op/embed.aspx?src=${previewDialog.url}`
                  : previewDialog.url
              }
              className="h-100 w-full border border-gray-200 rounded-md bg-center bg-no-repeat"
            />
          )}
          {previewDialog.caption && (
            <div className="text-white mt-2">{previewDialog.caption}</div>
          )}
        </div>
      </Dialog>

      {/* media full screen preview */}

      {/* Image Preview */}
      {selectedImage && (
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="relative">
            {/* <button className="flex items-center gap-1">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt=""
                className="object-cover w-20 h-20"
              />
            </button> */}
            {selectedImage.type === "image" && (
              <button className="flex items-center gap-1">
                <img
                  src={URL.createObjectURL(selectedImage?.files)}
                  alt=""
                  className="object-cover w-20 h-20"
                />
              </button>
            )}
            {selectedImage.type === "video" && (
              <button className="flex items-center gap-1">
                <video
                  src={URL.createObjectURL(selectedImage.files)}
                  alt=""
                  className="object-cover w-50 h-20"
                />
              </button>
            )}
            {selectedImage.type === "application" && (
              <button className="flex items-center gap-1">
                <div className="bg-[#e1f3fb] text-black p-4 rounded-2xl shadow-md flex items-center gap-3">
                  <div className="bg-white p-3 rounded-full shadow-inner text-blue-500">
                    {getFileType(selectedImage.fileType)}
                  </div>
                  <div className="flex flex-col">
                    <div
                      className="font-medium truncate break-words max-w-[10rem]"
                      title={selectedImage.fileName}
                    >
                      {selectedImage.fileName || "Untitled Document"}
                    </div>
                  </div>
                </div>
              </button>
            )}
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
      <div className="absolute bottom-16 md:bottom-0 w-full">
        {/* Reply Preview */}
        {chatState.isReply && btnOption === "active" && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={replyPreviewVariants}
            className="relative border border-gray-300 rounded-md bg-[#F9FAFB]"
          >
            <div className="ml-2 mr-2 p-2">
              {chatState.replyData?.replyType === "image" && (
                <img
                  src={
                    chatState.replyData?.isReceived
                      ? `${BASE_MEDIA_URL}${chatState.replyData?.mediaPath}`
                      : chatState.replyData?.mediaPath
                  }
                  alt={chatState.replyData?.mediaPath}
                  className="mb-2 pointer-events-none select-none h-20 w-40"
                />
              )}
              {chatState.replyData?.replyType === "video" && (
                <video
                  src={
                    chatState.replyData?.isReceived
                      ? `${BASE_MEDIA_URL}${chatState.replyData?.mediaPath}`
                      : chatState.replyData?.mediaPath
                  }
                  controls={false}
                  autoPlay={false}
                  className="mb-2 h-20 w-40 object-cover pointer-events-none "
                />
              )}
              {chatState.replyData?.replyType === "audio" && (
                <>
                  {/* <audio
                    src={
                      chatState.replyData?.isReceived
                        ? `${BASE_MEDIA_URL}${chatState.replyData?.mediaPath}`
                        : chatState.replyData?.mediaPath
                    }
                    controls
                    autoPlay={false}
                    className="mb-2 h-20 w-100 pointer-events-none"
                  /> */}

                  <WhatsAppVoiceMessage
                    src={
                      chatState.replyData?.isReceived
                        ? `${BASE_MEDIA_URL}${chatState.replyData?.mediaPath}`
                        : chatState.replyData?.mediaPath
                    }
                    name="H"
                    time="5:27 pm"
                    isOutgoing // set false for white bubble
                    isRead
                  />
                </>
              )}
              {chatState.replyData?.replyType === "document" && (
                // <iframe
                //   src={
                //     chatState.replyData?.isReceived
                //       ? `${BASE_MEDIA_URL}${chatState.replyData?.mediaPath}`
                //       : chatState.replyData?.mediaPath
                //   }
                //   controls={false}
                //   autoPlay={false}
                //   allow=" encrypted-media"
                //   className="object-contain mb-2 h-48 w-48 pointer-events-none"
                // ></iframe>
                <div className="bg-[#e1f3fb] text-black p-4 rounded-2xl shadow-md max-w-xs flex items-center gap-3">
                  <div className="bg-white p-3 rounded-full shadow-inner text-blue-500 ">
                    {getFileType(chatState.replyData.fileType)}
                  </div>
                  <div className="flex flex-col">
                    <div
                      className="font-medium truncate max-w-[10rem]"
                      title={chatState.replyData.fileName}
                    >
                      {chatState.replyData.fileName || "Untitled Document"}
                    </div>
                    <div className="text-xs text-gray-500">
                      .{chatState.replyData.fileType}
                    </div>
                  </div>
                </div>
              )}
              {chatState.replyData?.messageBody && (
                <p>{chatState.replyData?.messageBody}</p>
              )}
            </div>
            <div
              onClick={() => {
                // setIsReply(false);
                // setReplyData(null);
                setChatState({ ...chatState, isReply: false, replyData: null });
              }}
              className="absolute top-1 right-1 cursor-pointer bg-gray-300 rounded-full px-1 hover:bg-gray-400 hover:text-white"
            >
              <CloseOutlinedIcon
                sx={{
                  fontSize: "18px",
                  color: "gray",
                }}
              />
            </div>
          </motion.div>
        )}

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
          <ClosedChat
            setSendMessageDialogVisible={setSendMessageDialogVisible}
          />
        )}
      </div>

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
        <div className="space-x-1 text-[0.8rem] mt-3 border-1 rounded-md space-y-2">
          {[
            ["Agent", chatState?.agentName?.agentName || "-"],
            ["Group", chatState?.agentName?.groupName || "-"],
            // ["Status", "-"],
            // ["Last Active", "-"],
            // ["Template Messages", "-"],
            // ["Session Messages", "-"],
            // ["Unresolved Queries", "-"],
            // ["Source", "-"],
            // ["First Message", "-"],
            // ["WA Conversation", "-"],
            // ["MAU Status", "-"],
            // ["Incoming", "-"],
            // ["Circle", "-"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-2 gap-2 p-2 border-gray-300 border-t mb-2"
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
