import React, { useState, useRef, useEffect } from "react";
import CustomEmojiPicker from "@/admin/components/CustomEmojiPicker";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { LuUndo2 } from "react-icons/lu";
import QuickReply, { ShowQuickReply } from "./Components/QuickReply";
import { Dialog } from "primereact/dialog";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { AnimatePresence, motion } from "framer-motion";
import { InputData } from "./Components/InputData";
import Lottie from "lottie-react";
import liveChatAnimation from "@/assets/animation/InstaChatscreen";
import { ChatSidebar } from "./Components/Sidebar";
import InstaChatScreen from "./Components/InstaChatScreen";
import { FiSend } from "react-icons/fi";
import { SpeedDial } from "primereact/speeddial";
import { FaPlus } from "react-icons/fa";

const InstaLiveChats = ({
  inputRef,
  input,
  setInput,
  sendMessage,
  selectedImage,
  handleSend,
  insertEmoji,
  setAddTemplate,
}) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const textRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [showQuickDrop, setShowQuickDrop] = useState(false);
  const [filteredReplies, setFilteredReplies] = useState([]);
  const [cursorPos, setCursorPos] = useState(0);
  const [accountSelection, setAccountSelection] = useState([]);
  const [chatState, setChatState] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [search, setSearch] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleDelete = (index) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
    setSelectedIndex(null);
  };

  const handleEdit = (index) => {
    setText(messages[index].text);
    setEditIndex(index);
    textRef.current.focus();
    setSelectedIndex(null);
  };

  const handleUnsend = (index) => {
    const updated = [...messages];
    updated[index].text = "You unsent a message";
    updated[index].unsent = true;
    setMessages(updated);
    setSelectedIndex(null);
  };

  const handleMessageClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".message-bubble")) {
        setSelectedIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function handleSearch() {
    handleFetchAllConvo();
    // setActiveChat(null);
    setChatState((prev) => ({ ...prev, active: null }));
  }

  const chatScreenVariants = {
    hidden: {
      opacity: 0,
      y: 50, // slide up from below
      filter: "blur(12px)",
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: "blur(8px)",
      scale: 0.97,
      transition: {
        duration: 0.4,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-[100%] bg-gray-50 rounded-2xl border overflow-hidden">
        {/* SIDEBAR */}
        <div
          className={`w-full md:w-95 border-r-3 border-[#F1D3CE] ${chatState?.active ? "hidden md:flex" : "flex"
            }`}
        >
          {/* Search */}
          <div className="flex flex-col w-full">
            <InputData
              setSearch={setSearch}
              search={search}
              handleSearch={handleSearch}
              setChatState={setChatState}
              chatState={chatState}
            />

            <ChatSidebar
              setChatState={setChatState}
              chatState={chatState}
              formatDate={formatDate}
            />
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 relative  h-full">
          {!chatState.active && (
            <AnimatePresence>
              <motion.div
                key="empty-chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-green-50 via-white to-green-100"
              >
                {/* FLOATING BLOBS */}
                <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                  <motion.div
                    initial={{ y: 150, x: -100 }}
                    animate={{ y: -100, x: 0 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                    className="absolute w-72 h-72 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 opacity-30 rounded-full filter blur-2xl top-20 left-10"
                  />
                  <motion.div
                    initial={{ y: -50, x: 100 }}
                    animate={{ y: 100, x: -50 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                    className="absolute w-60 h-60 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-25 rounded-full filter blur-2xl bottom-16 right-8"
                  />
                  <motion.div
                    initial={{ y: 100, x: 50 }}
                    animate={{ y: -50, x: -80 }}
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                    className="absolute w-64 h-64 bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-500 opacity-20 rounded-full filter blur-3xl bottom-0 left-1/2 transform -translate-x-1/2"
                  />
                </div>

                {/* CENTER CARD */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative z-10 px-6 py-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg text-center w-full max-w-md mx-auto"
                >
                  <div className="w-48 h-48 mx-auto mb-3">
                    <Lottie
                      animationData={liveChatAnimation}
                      loop
                      autoplay
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-semibold mb-2 bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] bg-clip-text text-transparent"
                  >
                    Welcome to LiveChat!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-gray-600"
                  >
                    Chat with your followers in real-time — instantly and
                    effortlessly. <br /> Pick your Instagram account to begin.
                  </motion.p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}

          {chatState.active && (
            <InstaChatScreen
              chatState={chatState}
              setChatState={setChatState}
              messages={messages}
              setMessages={setMessages}
              textRef={textRef}
              text={text}
              setText={setText}
              showQuickDrop={showQuickDrop}
              handleSend={handleSend}
              editIndex={editIndex}
              isSpeedDialOpen={isSpeedDialOpen}
              setOpen={setOpen}
              selectedIndex={selectedIndex}
              setAddTemplate={setAddTemplate}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default InstaLiveChats;
