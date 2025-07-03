import {
  fetchAllBotsList,
  fetchAllConvo,
  fetchSpecificConvo,
} from "@/apis/rcs/rcs";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { InputData } from "./components/input";
import { Sidebar } from "./components/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { ChatScreen } from "./components/chatScreen";

const RcsLiveChat = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [agentState, setAgentState] = React.useState({
    all: [],
    id: "",
  });

  const [mobileNo, setMobileNo] = React.useState("");
  const [btnOption, setBtnOption] = React.useState("active");
  const [chatState, setChatState] = React.useState({
    selected: null,
    input: "",
    allConversations: [],
    specificConversation: [],
    latestMessage: {
      srno: "",
      replayTime: "",
    },
    // replyData: "",
    // isReply: false,
  });
  const [input, setInput] = React.useState("");

  async function handleFetchAgents() {
    try {
      const res = await fetchAllBotsList();
      setAgentState({
        all: res,
        id: "",
      });
    } catch (e) {
      toast.error("Error fetching conversations");
    }
  }

  async function handleFetchAllConvo() {
    if (!agentState?.id) return;
    try {
      const userActive = btnOption == "active" ? 1 : 0;
      const payload = {
        agentId: agentState?.id,
        search: mobileNo,
        active: userActive,
      };
      const res = await fetchAllConvo(payload);

      if (!res.conversationEntityList[0]) {
        setChatState((prev) => ({
          ...prev,
          active: null,
          allConversations: [],
        }));
        return;
      }

      // if (res?.unreadCounts?.length > 0) {
      //   const audio = new Audio("./receive-message.mp3");
      //   audio.play().catch((e) => {
      //     // console.log("Audio play error:", e);
      //   });
      // }

      const mappedConversations = res.conversationEntityList?.map((chat) => {
        const unread = res.unreadCounts.find(
          (unreadChat) => unreadChat.mobile === chat.mobileNo
        );
        return {
          ...chat,
          unreadCount: unread ? unread.unreadCount : 0,
        };
      });

      setChatState((prev) => ({
        ...prev,
        allConversations: mappedConversations,
      }));

      console.log(mappedConversations);
    } catch (e) {
      toast.error("Error fetching conversations");
    }
  }

  async function handleFetchSpecificConvo() {
    if (!chatState.active) return;
    try {
      const payload = {
        agentId: chatState.active.agentId,
        mobileNo: chatState.active.mobileNo,
        chatNo: chatState.active.srno,
      };

      const res = await fetchSpecificConvo(payload);
      const messages = [...(res?.conversationEntityList || [])].reverse();
    } catch (e) {
      toast.error("Error fetching conversation");
    }
  }

  const chatScreenVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  //useEffect

  useEffect(() => {
    handleFetchAgents();
  }, []);

  useEffect(() => {
    handleFetchAllConvo();
  }, [btnOption, agentState]);

  useEffect(() => {
    handleFetchSpecificConvo();
  }, [chatState]);

  return (
    <div className="flex h-[100%] bg-gray-50 rounded-2xl overflow-hidden border ">
      <div
        className={`w-full md:w-100 p-1 border rounded-tl-2xl overflow-hidden border-tl-lg  ${
          chatState?.selected ? "hidden md:block" : "block"
        }`}
      >
        <InputData
          agentState={agentState}
          setAgentState={setAgentState}
          chatState={chatState}
          setChatState={setChatState}
          search={mobileNo}
          setSearch={setMobileNo}
          handleSearch={handleFetchAllConvo}
          btnOption={btnOption}
          setBtnOption={setBtnOption}
        />

        <Sidebar
          chatState={chatState}
          setChatState={setChatState}
          isLoading={isLoading}
          agentState={agentState}
        />
      </div>

      {!chatState.active && (
        <AnimatePresence>
          <motion.div
            key="empty-chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 border flex-1 border-tr-lg"
          >
            {/* Background Animation - Floating Bubbles */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
              <motion.div
                initial={{ y: 200 }}
                animate={{ y: -100 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="absolute left-10 top-10 w-64 h-64 bg-green-200 opacity-30 rounded-full"
              />
              <motion.div
                initial={{ x: -100 }}
                animate={{ x: 100 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="absolute bottom-10 right-10 w-48 h-48 bg-green-300 opacity-30 rounded-full"
              />
            </div>

            {/* main card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 px-6 py-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg text-center max-w-xl"
            >
              <div className="w-50 h-50 mx-auto mb-3">
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src="/animation/wabalivechatanimation.json"
                  s
                  style={{ width: "100%", height: "100%" }}
                ></lottie-player>
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-semibold text-green-900 mb-2"
              >
                Welcome to LiveChat!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600"
              >
                Engage your customers instantly with real-time RCS messaging.
                Choose an RCS agent to get started.
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      <AnimatePresence>
        {chatState.active && (
          <motion.div
            key="chat-screen"
            variants={chatScreenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex flex-col flex-1 h-screen md:h-full"
          >
            <ChatScreen
              // setVisibleRight={setVisibleRight}
              // setDialogVisible={setDialogVisible}
              // messageRef={messageRef}
              // formatTime={formatTime}
              btnOption={btnOption}
              // selectedImage={selectedImage}
              // deleteImages={deleteImages}
              // handleAttachmentDownload={handleAttachmentDownload}
              // insertEmoji={insertEmoji}
              // inputRef={inputRef}
              // sendMessage={sendMessage}
              // items={items}
              // visibleRight={visibleRight}
              input={input}
              setInput={setInput}
              // setSendMessageDialogVisible={setSendMessageDialogVisible}
              setChatState={setChatState}
              chatState={chatState}
              // specificConversation={specificConversation}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RcsLiveChat;
