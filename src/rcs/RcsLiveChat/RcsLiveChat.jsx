import {
  fetchAllBotsList,
  fetchAllConvo,
  fetchAllTemplates,
  fetchSpecificConvo,
  fetchTemplateDetails,
  sendRCSMessage,
  sendRCSTemplateMessage,
} from "@/apis/rcs/rcs";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { InputData } from "./components/input";
import { Sidebar } from "./components/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { ChatScreen } from "./components/chatScreen";
import moment from "moment";
import { TemplateDialog } from "./components/templateDialog";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";

const RcsLiveChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [agentState, setAgentState] = useState({
    all: [],
    id: "",
  });

  const [mobileNo, setMobileNo] = useState("");
  const [btnOption, setBtnOption] = useState("active");
  const [chatState, setChatState] = useState({
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
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

  const [isTemplateMessage, setIsTemplateMessage] = useState(false);
  const [templateState, setTemplateState] = useState({
    all: [],
    selected: "",
  });
  const [templateDetails, setTemplateDetails] = useState({});
  const [templateSendData, setTemplateSendData] = useState({});

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [varLength, setVarLength] = useState(0);
  const [varList, setVarList] = useState([]);
  const [inputVariables, setInputVariables] = useState([]);

  //btnVar
  const [btnvarLength, setBtnVarLength] = useState(0);
  const [btnvarList, setBtnVarList] = useState([]);
  const [btninputVariables, setBtnInputVariables] = useState([]);

  const [carVar, setCarVar] = useState({
    length: 0,
    data: {},
  });
  const [carVarInput, setCarVarInput] = useState([]);

  const [finalVarList, setFinalVarList] = useState([]);

  const [selectedMedia, setSelectedMedia] = useState({
    name: "",
    size: "0MB",
    mimeType: "text",
    file: null,
    fileUrl: null,
  });

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
      setIsLoading(true);
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
    } catch (e) {
      toast.error("Error fetching conversations");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFetchSpecificConvo() {
    if (!chatState.active) return;
    try {
      const payload = {
        agentId: chatState.active.agentId,
        mobileNo: chatState.active.mobileNo,
        chatNo: 1,
      };

      const res = await fetchSpecificConvo(payload);
      const messages = [...(res?.conversationEntityList || [])].reverse();

      const enrichedMessages = await Promise.all(
        messages.map(async (msg) => {
          let mediaPath = null;
          let replyMessage = null;
          let isReply = false;
          let mediaSize = null;

          if (msg?.contextReceiptNo) {
            const data = {
              wabaNumber: msg?.wabaNumber,
              receiptNo: msg?.contextReceiptNo,
            };
            const res = await fetchReplyData(data);
            replyMessage = res?.messageBody;
            isReply = true;
          }

          // if (msg.isReceived && msg?.replyType === "image") {
          //   try {
          //     mediaPath = await downloadAttachment({
          //       waba: wabaState.selectedWaba,
          //       id: msg.mediaId,
          //       conversionSrno: msg.srno,
          //     });
          //   } catch (err) {
          //     console.error(`Failed to fetch media for srno ${msg.srno}`, err);
          //   }
          // } else {
          // }

          mediaPath = msg.mediaPath;
          return {
            ...msg,
            date: moment(msg.replyTime).format("YYYY-MM-DD"),
            mediaPath,
            replyMessage,
            isReply,
            // mediaPath: mediaPath?.msg || "/default-avatar.jpg",
          };
        })
      );

      const grouped = enrichedMessages.reduce((acc, msg) => {
        if (!acc[msg.date]) {
          acc[msg.date] = [];
        }
        acc[msg.date].push(msg);
        return acc;
      }, {});

      const groupedArray = Object.entries(grouped).map(([date, messages]) => ({
        date,
        messages,
      }));

      setChatState((prev) => ({
        ...prev,
        specificConversation: groupedArray,
      }));
    } catch (e) {
      toast.error("Error fetching conversation");
    }
  }

  async function handleFetchTemplates() {
    try {
      if (!agentState?.id) return;
      const res = await fetchAllTemplates(agentState?.id);
      setTemplateState({
        all: res?.Data,
        selected: "",
      });
    } catch (e) {
      toast.error("Error fetching templates");
    }
  }

  async function handleFetchTemplateDetails() {
    if (!templateState.selected) return;
    try {
      const res = await fetchTemplateDetails(templateState.selected);
      extractVariable(res);
      setTemplateDetails(res);
    } catch (e) {
      toast.error("Error fetching templates");
    }
  }

  async function handleFileInput(e) {
    const files = e.target.files[0];
    const name = files.name;
    const size = files.size / 1024 / 1024;
    const mimeType = files.type.split("/")[0];
    let fileType = files.type.split("/")[1];

    if (fileType.includes("sheet")) {
      fileType = "xlsx";
    }

    const fileurl = await uploadImageFile(files);

    if (!fileurl?.fileUrl)
      return toast.error(fileurl?.msg || "Failed to upload file");

    setSelectedMedia({
      name,
      size: `${Number(size).toFixed(2)}MB`,
      mimeType,
      file: files,
      fileUrl: fileurl?.fileUrl,
      fileType,
    });
    setIsSpeedDialOpen(false);
  }
  async function sendMessage() {
    if (!chatState.active) return;
    if (!selectedMedia.fileUrl && !input.trim()) return;

    try {
      const payload = {
        agentId: chatState.active.agentId,
        mobileNo: chatState.active.mobileNo,
        replyType:
          selectedMedia.mimeType === "application"
            ? "document"
            : selectedMedia.mimeType,
        ...(selectedMedia?.fileUrl ? {} : { message: input.trim() }),
        // chatNo: chatState.active.srno,
      };

      let body = {};

      if (selectedMedia.fileUrl) {
        body = {
          contentMessage: {
            contentInfo: {
              fileUrl: selectedMedia.fileUrl,
            },
          },
          mobileno: chatState.active.mobileNo,
          botId: chatState.active.agentId,
        };
      }

      const res = await sendRCSMessage(payload, body);
      if (res?.status === "error") {
        toast.error(res?.msg);
        return;
      }
      setInput("");
      setSelectedMedia({
        name: "",
        size: "0MB",
        mimeType: "text",
        file: null,
        fileUrl: null,
      });
      await handleFetchSpecificConvo();
    } catch (e) {
      toast.error("Error sending message");
    }
  }

  async function handleSendTemplateMessage() {
    if (!agentState.id || !chatState.active || !templateState.templateName)
      return;
    try {
      const payload = {
        agentId: chatState.active.agentId,
        mobileNo: chatState.active.mobileNo,
        replyType: "template",
        // chatNo: chatState.active.srno,
      };
      const body = {
        contentMessage: {
          templateMessage: {
            templateCode: templateState.templateName,
          },
        },
        mobileno: chatState.active.mobileNo,
        botId: agentState.id,
      };

      // const payload = {
      //   agentId: chatState.active.agentId,
      //   mobileNo: chatState.active.mobileNo,
      //   message: input.trim(),
      //   replyType: "text",
      //   // chatNo: chatState.active.srno,
      // };

      // const res = await sendRCSMessage(payload);

      const res = await sendRCSMessage(payload, body);
      if (res?.status !== "success") {
        toast.error(res?.message);
        return;
      }

      toast.success("Template message sent successfully");
      setIsTemplateMessage(false);
      setIsSpeedDialOpen(false);
      setTemplateState((prev) => ({ ...prev, selected: "" }));
      setTemplateDetails({});
      setVarLength(0);
      setVarList(0);
      setInputVariables([]);
      setBtnVarLength(0);
      setBtnVarList(0);
      setBtnInputVariables([]);

      setSelectedIndex(0);
      setCarVar({
        length: 0,
        data: {},
      });
      setCarVarInput([]);
      setFinalVarList([]);
    } catch (e) {
      toast.error("Error sending Template message");
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

  function extractVariable(data) {
    if (!data || !Array.isArray(data)) return;

    if (data.length === 1) {
      let matchLength = 0;
      let matchBtnList = [];
      const content = data[0]?.content || "";
      const suggestionVar = data[0]?.suggestions?.map((item) => {
        if (item?.type === "website") {
          const match = item?.suggestionValue.match(/{#(.+?)#}/g) || [];
          matchLength += match.length;
          matchBtnList = [...matchBtnList, ...match];
        }
      });

      setBtnVarLength(matchLength);
      setBtnVarList(matchBtnList);
      const matches = content.match(/{#(.+?)#}/g) || [];

      setVarLength(matches.length);
      setVarList(matches);
    }

    if (data.length > 1) {
      const result = data.reduce(
        (acc, item, index) => {
          const content = item?.content || "";
          const matches = content.match(/{#(.+?)#}/g) || [];

          acc.totalLength += matches.length;
          acc.data[index] = matches;

          return acc;
        },
        { totalLength: 0, data: {} }
      );

      setCarVar({ length: result.totalLength, data: result.data });
    }
  }

  //useEffect

  useEffect(() => {
    handleFetchAgents();
  }, []);

  useEffect(() => {
    handleFetchAllConvo();
  }, [btnOption, agentState]);

  useEffect(() => {
    handleFetchSpecificConvo();
  }, [chatState?.active]);

  useEffect(() => {
    let interval = null;
    handleFetchAllConvo();
    // interval = setInterval(() => {
    // }, 5000);
    return () => clearInterval(interval);
  }, [btnOption, agentState]);

  useEffect(() => {
    handleFetchTemplates();
  }, [isTemplateMessage]);

  useEffect(() => {
    handleFetchTemplateDetails();
  }, [templateState?.selected]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = (e) => {
      setIsSmallScreen(e.matches);
    };

    // Set initial state
    setIsSmallScreen(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="flex h-[100%] bg-gray-50 rounded-2xl overflow-hidden border ">
      <div
        className={`w-full md:w-100 p-1 border rounded-tl-2xl overflow-hidden border-tl-lg  ${
          chatState?.active ? "hidden md:block" : "block"
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
          handleFetchSpecificConvo={handleFetchSpecificConvo}
        />
      </div>

      <AnimatePresence>
        {!chatState.active && !isSmallScreen && (
          <motion.div
            key="empty-chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 border flex-1 border-tr-lg "
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
                className="absolute left-10 top-10 w-64 h-64 bg-blue-200 opacity-30 rounded-full"
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
                className="absolute bottom-10 right-10 w-48 h-48 bg-blue-300 opacity-30 rounded-full"
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
                className="text-3xl font-semibold text-blue-900 mb-2"
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
        )}

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
              inputRef={inputRef}
              fileInputRef={fileInputRef}
              documentInputRef={documentInputRef}
              sendMessage={sendMessage}
              // items={items}
              // visibleRight={visibleRight}
              input={input}
              setInput={setInput}
              // setSendMessageDialogVisible={setSendMessageDialogVisible}
              setChatState={setChatState}
              chatState={chatState}
              setIsSpeedDialOpen={setIsSpeedDialOpen}
              isSpeedDialOpen={isSpeedDialOpen}
              isTemplateMessage={isTemplateMessage}
              setIsTemplateMessage={setIsTemplateMessage}
              selectedMedia={selectedMedia}
              setSelectedMedia={setSelectedMedia}
              // specificConversation={specificConversation}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isTemplateMessage && (
        <TemplateDialog
          isTemplateMessage={isTemplateMessage}
          setIsTemplateMessage={setIsTemplateMessage}
          templateState={templateState}
          setTemplateState={setTemplateState}
          templateDetails={templateDetails}
          setTemplateDetails={setTemplateDetails}
          handleSendTemplateMessage={handleSendTemplateMessage}
          varLength={varLength}
          setVarList={setVarList}
          varList={varList}
          setInputVariables={setInputVariables}
          inputVariables={inputVariables}
          carVar={carVar}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          carVarInput={carVarInput}
          setCarVarInput={setCarVarInput}
          btnvarLength={btnvarLength}
          setBtnVarList={setBtnVarList}
          btnvarList={btnvarList}
          setBtnInputVariables={setBtnInputVariables}
          btninputVariables={btninputVariables}
        />
      )}

      {/* <image className="hidden" ref={fileInputRef} onChange={handleFileInput} /> */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInput}
        accept="image/* video/*"
        // multiple
      />
      <input
        type="file"
        ref={documentInputRef}
        style={{ display: "none" }}
        onChange={handleFileInput}
        accept="application/*"
        // multiple
      />
    </div>
  );
};

export default RcsLiveChat;
