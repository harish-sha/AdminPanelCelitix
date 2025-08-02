import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SpeedDial } from "primereact/speeddial";
import { FaPlus } from "react-icons/fa";
import QuickReply, { ShowQuickReply } from "./QuickReply";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { FiUpload, FiMessageSquare, FiLayers } from "react-icons/fi";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Dialog } from "primereact/dialog";
import CustomEmojiPicker from "@/admin/components/CustomEmojiPicker";
import MicIcon from "@mui/icons-material/Mic";
import GifBoxIcon from "@mui/icons-material/GifBox";
import { PiSticker } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FaRegFileAudio } from "react-icons/fa6";
import { FiEdit2, FiSend } from "react-icons/fi";
import { FiMessageCircle, FiShield, FiClock } from "react-icons/fi";


import AddTemplate from "./Template/AddTemplate";
import ChatBalloon from "../../StickersNew/chat_balloon.png";
import Bye from "../../StickersNew/bye.png";
import CassetteTape from "../../StickersNew/cassette-tape.png";
import Chat from "../../StickersNew/chat.png";
import Flirt from "../../StickersNew/flirt.png";
import XoXo from "../../StickersNew/xoxo.png";
import Wtf from "../../StickersNew/wtf.png";
import Cute from "../../StickersNew/cute.png";
import Wow from "../../StickersNew/wow.png";
import Why from "../../StickersNew/why.png";
import CustomTabsMaterial from "@/instagram/components/CustomTabsMaterial";
import InstaTemplateLibrary from "./Template/InstaTemplateLibrary";
import WebChat from "../../StickersNew/web-chat.png";
import ValentinesDay from "../../StickersNew/valentines-day.png";
import Stop from "../../StickersNew/stop.png";
import Stamp from "../../StickersNew/stamp.png";
import SpeechBubble from "../../StickersNew/speech-bubble.png";
import SeeYou from "../../StickersNew/see-you.png";
import NoChat from "../../StickersNew/no-chat.png";
import Message from "../../StickersNew/message.png";
import MedicalApp from "../../StickersNew/medical-app.png";
import Love from "../../StickersNew/love.png";
import LoveMessage from "../../StickersNew/love-message.png";
import Lol from "../../StickersNew/lol.png";
import Internet from "../../StickersNew/internet.png";
import Humorous from "../../StickersNew/humorous.png";
import HowAreYou from "../../StickersNew/how-are-you.png";
import Hiring from "../../StickersNew/hiring.png";
import GotYou from "../../StickersNew/got-you.png";
import GoodNight from "../../StickersNew/good-night.png";
import GoodMorning from "../../StickersNew/good-morning.png";
import EmailMarketing from "../../StickersNew/email-marketing.png";
import DontWorry from "../../StickersNew/dont-worry.png";
import Laugh from "../../StickersNew/laugh.png";
import { TbZoomScan } from "react-icons/tb";
import stickerimg from "@/assets/images/stickernew.jpg";
import { FiDownload } from "react-icons/fi";
import { MdOutlineReply } from "react-icons/md";
import { Paperclip } from "../icon/Paperclip";
import { RxCross2 } from "react-icons/rx";
import Lottie from "lottie-react";
import handwave from "../../../assets/animation/handwave.json";


const InstaChatScreen = ({
  chatState,
  setChatState,
  messages,
  setMessages,
  quickDrop,
  editIndex,
  selectedIndex,
  onAddTemplate,
  handleTemplateAdd,
  template,
  setButtonTempList,
  setTemplateList,
  onClose
}) => {
  const [open, setOpen] = useState(false);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [showQuickDrop, setShowQuickDrop] = useState(false);
  const [addTemplate, setAddTemplate] = useState(false);
  console.log("addTemplate", addTemplate)

  const endOfMessagesRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [previewDialog, setPreviewDialog] = useState({
    open: false,
    type: "", // "image" | "video" | "document"
    url: "",
    caption: "",
  });
  const [activeEmojiPickerIdx, setActiveEmojiPickerIdx] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [text, setText] = useState("");
  const textRef = useRef(null);

  const audioInputRef = useRef(null);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [showGif, setShowGif] = useState(false);

  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);

  const [previewUrl, setPreviewUrl] = useState();

  const [openReply, setOpenReply] = useState(false);
  const [msgDetails, setMsgDetails] = useState();

  const handleOpenPreview = (url) => {
    setOpenPreviewDialog(true);
    setPreviewUrl(url);
  };

  const handleReply = (msg) => {
    setOpenReply(true);
    setMsgDetails(msg);
  };

  // const handleSend = () => {
  //   const trimmed = text.trim();
  //   if (!trimmed) return;

  //   if (editIndex !== null) {
  //     const updated = [...messages];
  //     updated[editIndex].text = trimmed;
  //     setMessages(updated);
  //     setEditIndex(null);
  //   } else {
  //     setMessages([...messages, { text: trimmed, fromMe: true }]);
  //   }

  //   setText("");
  //   setSelectedIndex(null);
  // };

  const professionalReplies = [
    "Thank you for reaching out. I'll get back to you shortly.",
    "I've noted your message and will follow up soon.",
    "Understood. Let me review and respond in detail.",
    "Thanks for the update — I'll take it from here.",
    "Got it. Please allow me a few minutes to respond.",
    "I'll circle back with the requested information.",
    "That makes sense. I'll prepare a summary for you.",
    "Appreciate the clarification. Working on it now.",
    "Message received. I'm on it!",
    "Thanks for the input — I'll share feedback soon.",
  ];

  const getRandomReply = () =>
    professionalReplies[Math.floor(Math.random() * professionalReplies.length)];

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { type: "text", text: trimmed, fromMe: true },
    ]);
    setText("");
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.fromMe) {
      const reply = {
        type: "text",
        text: getRandomReply(),
        fromMe: false,
      };

      const timeout = setTimeout(() => {
        setMessages((prev) => [...prev, reply]);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [messages]);

  const handleReaction = (messageIndex, emoji) => {
    const selectedEmoji = emoji.native || emoji.emoji || emoji;
    setMessages((prevMessages) =>
      prevMessages.map((msg, idx) => {
        if (idx === messageIndex) {
          return {
            ...msg,
            reactions: [selectedEmoji],
          };
        }
        return msg;
      })
    );
    setActiveEmojiPickerIdx(null); // hide picker after choosing
  };

  const handleEmojiSelect = (setState, emoji, maxLength = 1000) => {
    if (!textRef.current) return;

    const emojiChar = emoji.native || emoji.emoji || emoji;

    const start = textRef.current.selectionStart;
    const end = textRef.current.selectionEnd;
    const current = textRef.current.value;

    const newText = current.slice(0, start) + emojiChar + current.slice(end);

    if (newText.length <= maxLength) {
      setState(newText);
      setTimeout(() => {
        const newCaret = start + emojiChar.length;
        textRef.current.focus();
        textRef.current.setSelectionRange(newCaret, newCaret);
      }, 0);
    }
  };

  const handleImageUpload = () => {
    const fileInput = document.getElementById("fileInput");

    if (fileInput) {
      fileInput.value = "";
      fileInput.click();

      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const url = e.target.result;
            const fileType = file.type.toLowerCase();

            const type = fileType.startsWith("image/")
              ? "image"
              : fileType.startsWith("video/")
                ? "video"
                : null;

            if (type) {
              setPreviewDialog({
                open: true,
                type,
                url,
                caption: file.name,
              });
            }
          };
          reader.readAsDataURL(file);
        }
      };
    }
  };

  const handleImageVideoSend = () => {
    const { type, url } = previewDialog;

    if (!type || !url) return;

    const newMessage = {
      type,
      src: url, // note: 'src' is used in message rendering
      fromMe: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Reset preview dialog
    setPreviewDialog({
      open: false,
      type: null,
      url: "",
      caption: "",
    });
  };

  const handleSendClick = () => {
    const trimmed = text.trim();

    // If a preview (image or video) is open, send that instead
    if (previewDialog.open && previewDialog.url && previewDialog.type) {
      handleImageVideoSend();
    }
    // Else, send the text message
    else if (trimmed) {
      handleSend();
    }
    setOpenReply(false);
    setMsgDetails();
    setAddTemplate(false)


  };

  function getaudioFileType(extension) {
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

  const handleSendAudioFile = () => {
    if (audioInputRef.current) {
      audioInputRef.current.value = ""; // reset
      audioInputRef.current.click(); // open file dialog
    }
  };

  const handleStickerSend = (sticker) => {
    const newMessage = {
      type: "sticker",
      src: sticker.src,
      fromMe: true,
      timestamp: new Date().toISOString(),
    };

    // Replace this with your actual message sending logic
    setMessages((prev) => [...prev, newMessage]);

    setShowStickerPicker(false);
  };

  const handleGifSend = (gify) => {
    const newMessage = {
      type: "gify",
      src: gify.src,
      fromMe: true,
      timestamp: new Date().toISOString(),
    };

    // Replace this with your actual message sending logic
    setMessages((prev) => [...prev, newMessage]);

    setShowGif(false);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <=
      50;

    if (isNearBottom && endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const items = [
    {
      label: "Upload Photo/Videos",
      icon: <FiUpload className="text-blue-400" />,
      command: () => handleImageUpload(),
    },
    {
      label: "Gifs",
      icon: <GifBoxIcon className="text-blue-400" />,
      command: () => openGify(),
    },
    // {
    //   label: "Stickers",
    //   icon: <PiSticker />,
    //   command: () => openSticker(),
    // },
    {
      label: "Audio Files",
      icon: <FaRegFileAudio className="text-blue-400" />,
      command: () => handleSendAudioFile(),
    },
    {
      label: "Add Template",
      icon: <FiLayers className="text-blue-400" />,
      command: () => setAddTemplate(true),
    },
    {
      label: "Add Quick Reply",
      icon: <FiMessageSquare className="text-blue-400" />,
      command: () => setOpen(true),
    },
  ];

  const openSticker = () => {
    setShowStickerPicker(true);
    setIsSpeedDialOpen(false);
  };

  const openGify = () => {
    setShowGif(true);
    setIsSpeedDialOpen(false);
  };

  const stickerPack = [
    { id: 1, src: ChatBalloon, alt: "Chat Balloon" },
    { id: 1, src: Bye, alt: "Bye" },
    { id: 2, src: CassetteTape, alt: "CassetteTape" },
    { id: 3, src: Wow, alt: "Wow" },
    { id: 4, src: Why, alt: "Why" },
    { id: 5, src: Wtf, alt: "Wtf" },
    { id: 6, src: XoXo, alt: "XoXo" },
    { id: 7, src: Flirt, alt: "Flirt" },
    { id: 8, src: Chat, alt: "Chat" },
    { id: 8, src: Cute, alt: "Cute" },
    { id: 9, src: WebChat, alt: "webChat" },
    { id: 10, src: ValentinesDay, alt: "ValentinesDay" },
    { id: 11, src: Stop, alt: "Stop" },
    { id: 12, src: Stamp, alt: "Stamp" },
    { id: 13, src: SpeechBubble, alt: "SpeechBubble" },
    { id: 15, src: SeeYou, alt: "SeeYou" },
    { id: 16, src: NoChat, alt: "NoChat" },
    { id: 17, src: Message, alt: "Message" },
    { id: 18, src: MedicalApp, alt: "MedicalApp" },
    { id: 19, src: Love, alt: "Love" },
    { id: 20, src: LoveMessage, alt: "LoveMessage" },
    { id: 21, src: Lol, alt: "Lol" },
    { id: 22, src: Laugh, alt: "Laugh" },
    { id: 23, src: Internet, alt: "Internet" },
    { id: 24, src: Humorous, alt: "Humorous" },
    { id: 25, src: HowAreYou, alt: "HowAreYou" },
    { id: 26, src: Hiring, alt: "Hiring" },
    { id: 26, src: GotYou, alt: "GotYou" },
    { id: 26, src: GoodNight, alt: "GoodNight" },
    { id: 26, src: GoodMorning, alt: "GoodMorning" },
    { id: 26, src: EmailMarketing, alt: "EmailMarketing" },
    { id: 26, src: DontWorry, alt: "DontWorry" },
  ];

  const gifPack = [
    {
      id: 1,
      src: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExejF3ZjV4ZTBwdmw3NmdodncyYWZ0dXA2ZWpnd3d0b3luajAwenM1eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WirhZMBF1AZVK/giphy.gif",
      alt: "Excited",
    },
    {
      id: 2,
      src: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExanphajh2dmJ1cms0dnpya3I1Z3pyZGFmeTFzMDB2NjRmZ2k5ZWc1OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3E6BG56dhjuawAX6/giphy.gif",
      alt: "Thumbs Up",
    },
    {
      id: 4,
      src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdms5d3EybjJucHcxYXh1bGpzYTVidjJoeTRyMW5pbHQ2cXc2NXRsNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gw3MYmhxEv8T52ow/giphy.gif",
      alt: "Frog",
    },
    {
      id: 5,
      src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzJ2dmZvMGwwM3ZzeXZyZzVxNDNlcTJ0dXQ3cDB2MnFpeHJ6MW45bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A6aHBCFqlE0Rq/giphy.gif",
      alt: "Man",
    },
    {
      id: 6,
      src: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG94Y3Nid3Rtcng2Z3I2amx4Mmt4ejRjb3VxeTlvMDBzb2U5aHljcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3og0IMVPaqrnGfBnZm/giphy.gif",
      alt: "woman",
    },
    {
      id: 7,
      src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjZqc2d5Z2F3bXBxd3c5MHlxaTQyNTI1MW1ydWpudHU3NGgxZG80ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FFb9yZK6t0oDu/giphy.gif",
      alt: "Dog",
    },
    {
      id: 8,
      src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXFsazdzeTNuZGxqeGNrazJ0bTE2MzlpdTQ0c3E4bXkzenRiazhzciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/102A2WXxOWQy40/giphy.gif",
      alt: "Baby",
    },
  ];

  const [stickOpen, setStickOpen] = useState(false);

  const tabsData = [
    {
      label: "Add Template",
      value: "addTemplate",
      icon: FiLayers,
      content: (
        <AddTemplate
          onAddTemplate={handleTemplateAdd}
          setAddTemplate={setAddTemplate}
        />
      ),
    },
    {
      label: "Template Library",
      value: "tempLibrary",
      icon: RiQuestionAnswerLine,
      content: (
        <InstaTemplateLibrary
          handleSendClick={(template, temp) => {
            const messagePayload = {
              type: template ? "template" : "temp",
              text: "template",
              fromMe: true,
            };

            if (template) {
              messagePayload.template = template;
            } else if (temp) {
              messagePayload.temp = temp;
            }

            setMessages((prev) => [...prev, messagePayload]);
            setAddTemplate(false);
          }}
        />
      ),
    },
  ];


  const TemplateCard = ({ template, onSend, onEdit }) => {
    return (
      <div className="w-full max-w-[320px] mx-auto max-h-[480px] overflow-y-auto bg-white rounded-2xl shadow-lg border border-blue-100 relative group">
        <h3 className="text-base font-bold mb-6 text-blue-800 flex items-center justify-center tracking-wide sticky top-0 bg-white z-10 p-4 rounded-t-2xl">
          Template Preview
        </h3>
        <div className="flex flex-col gap-6">
          <div className="w-full">
            <img
              src={template.imageUrl}
              alt="Image Card"
              className="w-full h-[180px] object-cover border-b border-blue-100"
            />
            <div className="p-5">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {template.title || ""}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {template.subtitle || ""}
              </p>
              <div className="space-y-2">
                <div className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1">
                  {template.defaultAction?.payload || ""}
                </div>
                <div className="flex flex-col gap-1">
                  {(template.buttons || []).map((btn, bidx) => (
                    <div
                      key={bidx}
                      className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1"
                    >
                      <span className="font-semibold">{btn.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ButtonCard = ({ temp, onSend, onEdit }) => {
    return (
      <div className="w-full bg-white max-w-[320px] mx-auto max-h-[250px] overflow-y-auto  rounded-2xl shadow-lg border border-blue-100 relative group">

        <h3 className="text-base font-bold text-blue-800 flex items-center justify-center tracking-wide sticky top-0 bg-white z-10 p-3 rounded-t-2xl">
          Template Preview
        </h3>

        <div className="flex flex-col gap-4">
          <div className="p-4">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {temp.title || ""}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {temp.subtitle || ""}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1">
                {temp.defaultAction?.payload || ""}
              </div>

              <div className="flex flex-col gap-1">
                {(temp.buttons || []).map((btn, bidx) => (
                  <div
                    key={bidx}
                    className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1"
                  >
                    <span className="font-semibold">{btn.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleTempSend = (payload) => {
    console.log("Sending template:", payload);

  };

  const handleTempEdit = (payload) => {
    console.log("Editing template:", payload);
    // Open edit modal or set form state
  };

  return (
    <>
      <div className="h-full flex bg-white w-full">
        <div className="flex flex-col w-full">
          <div className="bg-gradient-to-r from-[#F1D3CE] to-[#EECAD5] z-10">
            <div className="p-4 border-b font-semibold text-gray-700 text-lg capitalize w-full flex items-center gap-2 rounded-t-2xl ">
              <button
                className="md:hidden block z-10"
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
              >
                <ArrowBackIosIcon />
              </button>
              {chatState.activeImage ? (
                <img
                  src={chatState.activeImage}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white text-[#a667d3] font-bold shadow  flex items-center justify-center uppercase">
                  {chatState.active?.[0] || "?"}
                </div>
              )}
              {chatState.active || "No User Selected"}
            </div>
          </div>

          <div className="h-[100vh] overflow-hidden relative">
            <div
              className="absolute inset-0 bg-no-repeat z-0 bg-cover w-full h-full opacity-10 bg-center bg-[url(/instachatbg.webp)]"
            />
            <div
              className="p-4 space-y-2 overflow-y-auto h-full relative"
            >
              {messages.length === 0 ? (
                // <div className="flex items-center justify-center h-full">
                //   <div className="flex flex-col items-center border-2 p-3 rounded-2xl shadow-2xl bg-white/70">
                //     <div className="">
                //       <Lottie
                //         animationData={handwave}
                //         loop
                //         autoplay
                //         className="w-22 h-auto "
                //       />
                //     </div>
                //     <p className="text-gray-400 text-md">
                //       No messages yet. Say hello to get things started!
                //     </p>
                //   </div>
                // </div>
                <>
                  <div className="flex h-full items-center justify-center px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="w-full max-w-lg"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-xl backdrop-blur">
                        {/* Top accent */}
                        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500" />

                        <div className="flex flex-col items-center gap-4 px-6 py-8 text-center">
                          {/* Lottie */}
                          <div className="w-[120px] h-auto -mt-2">
                            <Lottie animationData={handwave} loop autoplay />
                          </div>

                          {/* Headline */}
                          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <FiMessageCircle className="text-indigo-500" />
                            No messages yet
                          </h2>

                          {/* Subtext */}
                          <p className="text-sm text-gray-600 max-w-md">
                            Start the conversation to see messages here. Your chats will appear
                            in real time as soon as a reply comes in.
                          </p>

                          {/* Info strip */}
                          <div className="mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                            <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                              <FiClock className="mt-0.5 text-gray-500" />
                              <div className="text-left">
                                <p className="text-xs font-medium text-gray-800">Live updates</p>
                                <p className="text-[11px] text-gray-500">Instant delivery</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                              <FiShield className="mt-0.5 text-gray-500" />
                              <div className="text-left">
                                <p className="text-xs font-medium text-gray-800">Secure</p>
                                <p className="text-[11px] text-gray-500">Encrypted transport</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                              <FiMessageCircle className="mt-0.5 text-gray-500" />
                              <div className="text-left">
                                <p className="text-xs font-medium text-gray-800">Multi-format</p>
                                <p className="text-[11px] text-gray-500">Text • Media • Stickers • GIFs • Templates • Posts and much more</p>
                              </div>
                            </div>
                          </div>

                          {/* Gentle tip line (no buttons) */}
                          <div className="mt-3 w-full">
                            <div className="rounded-xl border border-dashed border-gray-300 bg-white/60 px-3 py-2">
                              <p className="text-[12px] text-gray-500">
                                Tip: You can paste images or drop files here to share with your contact.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </>

              ) : (
                messages.map((msg, idx) => {
                  const fromMe = msg.fromMe;
                  return (
                    <div
                      key={idx}
                      ref={scrollContainerRef}
                      className="relative mb-4"
                    >
                      {/* Message bubble */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className={`max-w-xs relative px-4 py-2 cursor-pointer z-2 break-words whitespace-pre-line ${msg.type === "text"
                          ? fromMe
                            ? "ml-auto bg-[#9AA6B2] text-white rounded-t-2xl rounded-bl-2xl"
                            : "bg-gray-500 text-white rounded-t-2xl rounded-br-2xl"
                          : fromMe
                            ? "ml-auto"
                            : ""
                          }`}
                        onMouseEnter={() =>
                          setActiveEmojiPickerIdx(
                            activeEmojiPickerIdx === idx ? null : idx
                          )
                        }
                      >
                        {msg.type === "sticker" ? (
                          <div className="relative inline-block cursor-pointer group">
                            <img
                              src={msg.src}
                              alt="Media"
                              className="w-auto h-auto rounded-lg max-w-full max-h-[200px] object-fit"
                            />

                            {/* Centered Icon */}
                            <div
                              className="absolute inset-0 flex z-50 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 rounded-lg"
                              onClick={() => handleOpenPreview(msg.src)}
                            >
                              <TbZoomScan className="text-gray-400 w-8 h-8" />
                            </div>
                          </div>
                        ) : msg.type === "gify" ? (
                          <div className="relative inline-block cursor-pointer group">
                            <img
                              src={msg.src}
                              alt="Media"
                              className="w-auto h-auto rounded-lg max-w-full max-h-[200px] object-cover"
                            />

                            {/* Centered Icon */}
                            <div
                              className="absolute inset-0 flex z-50 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 rounded-lg"
                              onClick={() => handleOpenPreview(msg.src)}
                            >
                              <TbZoomScan className="text-gray-400 w-8 h-8" />
                            </div>
                          </div>
                        ) : msg.type === "image" ? (
                          <div className="relative inline-block cursor-pointer group border-2">
                            <img
                              src={msg.src}
                              alt="Image"
                              className="w-full h-50 rounded-lg object-fit border max-w-full max-h-[200px]"
                            />

                            {/* Centered Icon on Hover */}
                            <div
                              className="absolute inset-0 flex z-50 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 rounded-lg"
                              onClick={() => handleOpenPreview(msg.src)}
                            >
                              <TbZoomScan className="text-gray-300 w-8 h-8" />
                            </div>
                          </div>
                        ) : msg.type === "video" ? (
                          <div className="relative inline-block cursor-pointer group">
                            <video
                              className="w-full h-50 rounded-lg object-cover border max-w-full max-h-[200px]"
                              muted
                              playsInline
                            >
                              <source src={msg.src} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>

                            {/* Centered Icon on Hover */}
                            <div
                              className="absolute inset-0 flex z-50 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 rounded-lg"
                              onClick={() => handleOpenPreview(msg.src)}
                            >
                              <TbZoomScan className="text-gray-300 w-8 h-8" />
                            </div>
                          </div>
                        ) : msg.type === "audio" ||
                          msg.text?.endsWith(".mp3") ? (
                          <audio controls className="w-full">
                            <source src={msg.audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        ) : msg.type === "template" && msg.template ? (
                          <div className="w-full">
                            <TemplateCard
                              template={msg.template}
                              onSend={() => handleTempSend(msg.template)}
                              onEdit={() => handleTempEdit(msg.template)}
                            />
                          </div>
                        ) : msg.type === "temp" && msg.temp ? (
                          <div className="w-full">
                            <ButtonCard
                              temp={msg.temp}
                              onSend={(t) => handleTempSend(null, t)}
                              onEdit={() => handleTempEdit(msg.temp)}
                            />
                          </div>
                        ) : (
                          <p className="text-sm font-normal tracking-wide" >{msg.text}</p>
                        )}

                        <div ref={endOfMessagesRef} />
                        {/* Custom Emoji Picker (conditionally rendered) */}
                        {/* {activeEmojiPickerIdx === idx && (
                          <div className="bg-gray-900 p-4 rounded-full flex items-center justify-center absolute top-1 -left-15 bottom-full mb-2 z-50">
                            <CustomEmojiPicker
                              onEmojiSelect={(emoji) =>
                                (idx, emoji)
                              }
                              className="z-50"
                            />
                          </div>
                        )} */}
                      </motion.div>

                      {/* Reactions display */}
                      {
                        msg.reactions && msg.reactions.length > 0 && (
                          <div
                            className={`mt-1 flex space-x-1 text-sm ${fromMe ? "justify-end" : "justify-start"
                              }`}
                          >
                            {msg.reactions.map((reaction, rIdx) => (
                              <span key={rIdx}>{reaction}</span>
                            ))}
                          </div>
                        )
                      }

                      {/* Custom Emoji Picker (conditionally rendered) */}
                      {
                        activeEmojiPickerIdx === idx && (
                          <div
                            className={`p-1 rounded-full flex items-center justify-center absolute mb-2 z-[9999] top-0 ${fromMe ? "right-80" : "left-80"
                              }`}
                          >
                            <CustomEmojiPicker
                              onSelect={(emoji) => handleReaction(idx, emoji)}
                              className="z-[1000] absolute"
                            />
                          </div>
                        )
                      }

                      <div
                        className={`p-1 rounded-full flex gap-2 items-center justify-center absolute mx-2 z-50 top-0 ${fromMe ? "right-85" : "left-85"
                          }`}
                      >
                        {/* Download Icon */}
                        {msg.type !== "text" && (
                          <a
                            href={msg.src}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiDownload className="cursor-pointer text-gray-700 hover:text-black" />
                          </a>
                        )}

                        {/* Reply Icon */}
                        <MdOutlineReply
                          className="cursor-pointer text-gray-700 hover:text-black"
                          onClick={() => handleReply(msg)}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* media full screen preview */}
          {previewDialog.open && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-22 left-4 z-50 bg-white shadow-lg border border-gray-300 rounded-xl w-50 h-45 flex flex-col items-center justify-center p-1"
            >
              {/* Close Button */}
              <button
                className="self-end text-gray-500 hover:text-black text-lg font-bold mr-2 cursor-pointer"
                onClick={() =>
                  setPreviewDialog({ ...previewDialog, open: false })
                }
              >
                &times;
              </button>

              {/* Image or Video */}
              {previewDialog.type === "image" && (
                <img
                  src={previewDialog.url}
                  alt="Preview"
                  className="w-full h-full rounded-md object-fit-contain object-center"
                />
              )}
              {previewDialog.type === "video" && (
                <video
                  src={previewDialog.url}
                  controls
                  className="w-full h-full rounded-md"
                />
              )}

              {/* Optional Caption */}
              {previewDialog.caption && (
                <div className="text-center text-xs text-gray-700 my-1">
                  {previewDialog.caption}
                </div>
              )}
            </motion.div>
          )}

          {/* Sticker container */}
          {showStickerPicker && (
            <motion.div
              initial={{ opacity: 0, y: 20, width: "13rem" }}
              animate={{ opacity: 1, y: 0, width: "55rem" }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 left-5 z-40 rounded-xl shadow-2xl w-full bg-white border-1 border-gray-400 border-dashed"
            >
              {/* Header */}
              <div className="w-full flex items-center justify-between py-1 px-2 border-b-1 border-dashed  border-gray-400">
                <h2 className="text-md font-semibold text-gray-500">
                  Choose a Sticker
                </h2>
                <button
                  onClick={() => setShowStickerPicker(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {/* Sticker Grid */}
              <div className="overflow-x-auto p-4 border-b scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                <div className="grid grid-rows-2 auto-cols-max gap-2 grid-flow-col">
                  {stickerPack.map((sticker) => (
                    <img
                      key={sticker.id}
                      src={sticker.src}
                      alt={sticker.alt}
                      className="w-12 h-12 object-contain cursor-pointer rounded-md border border-transparent hover:border-blue-400 hover:scale-110 transition-transform"
                      onClick={() => handleStickerSend(sticker)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Gif container */}
          {showGif && (
            <motion.div
              initial={{ opacity: 0, y: 20, width: "13rem" }}
              animate={{ opacity: 1, y: 0, width: "55rem" }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 left-5 z-40 rounded-xl shadow-2xl w-full bg-white border-1 border-gray-400 border-dashed"
            >
              <div className="bg-white rounded-xl shadow-xl">
                {/* Header */}
                <div className="w-full flex items-center justify-between py-1 px-2 border-b-1 border-dashed  border-gray-400">
                  <h2 className="text-md font-semibold text-gray-500">
                    Choose a Gif
                  </h2>
                  <button
                    onClick={() => setShowGif(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    &times;
                  </button>
                </div>

                <div className="overflow-x-auto p-4 border-b scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                  <div className="grid grid-rows-2 auto-cols-max gap-2 grid-flow-col">
                    {gifPack.map((gify) => (
                      <img
                        key={gify.id}
                        src={gify.src}
                        alt={gify.alt}
                        className="w-28 h-16 object-contain cursor-pointer rounded-md border border-transparent hover:border-blue-400 hover:scale-110 transition-transform"
                        onClick={() => handleGifSend(gify)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {openReply && (
            <motion.div
              initial={{ opacity: 0, y: 100, width: "55rem" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="absolute bottom-20 left-5 h-auto rounded-lg bg-white border border-gray-400 p-4 z-50"
            >
              <div className="w-full flex justify-between items-start mb-2">
                <span className="text-sm text-gray-600 capitalize">
                  Replying to {msgDetails.type}
                </span>
                <RxCross2
                  className="text-xl cursor-pointer"
                  onClick={() => setOpenReply(false)}
                />
              </div>

              {/* Dynamic Content Rendering */}
              <div className="w-full">
                {msgDetails.type === "text" && (
                  <p className="text-base font-medium">{msgDetails.text}</p>
                )}

                {(msgDetails.type === "image" ||
                  msgDetails.type === "gify" ||
                  msgDetails.type === "sticker") && (
                    <img
                      src={msgDetails.src}
                      alt="replied image"
                      className="max-w-[60px] max-h-[45px] rounded-md object-cover"
                    />
                  )}

                {msgDetails.type === "video" && (
                  <video
                    src={msgDetails.src}
                    controls
                    className="max-w-[80px] max-h-[60px] rounded-md"
                  />
                )}

                {msgDetails.type === "audio" && (
                  <audio controls className="max-w-[60px] max-h-[45px]">
                    <source src={msgDetails.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </motion.div>
          )}

          {/* Input Section */}
          <div className="p-2 border-t bg-white w-full flex items-center gap-2 sm:gap-3 z-10 shadow rounded-br-md bottom-0 h-22">
            <div
              className="relative flex items-center justify-center group border-2 border-purple-400 rounded-full cursor-pointer"
              onClick={() => openSticker()}
            >
              <div
                className="absolute inset-0 rounded-full 
                 bg-[conic-gradient(at_top_right,_#feda75,_#fa7e1e,_#d62976,_#962fbf,_#4f5bd5)] 
                  spin-slow opacity-0 scale-125 
                  group-hover:opacity-100 transition duration-500"
              />
              <div
                className="relative w-10 h-10 rounded-full border-2 border-white 
                  shadow-2xl overflow-hidden group-hover:scale-110 
                  transition-transform duration-300"
              >
                <img
                  src={stickerimg}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div className="absolute bottom-7 left-18 flex space-x-2">
              <CustomEmojiPicker
                onSelect={(emoji) => handleEmojiSelect(setText, emoji, 80)}
                position="top"
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              />
            </div>

            <textarea
              type="file/text"
              accept="image/*,video/*"
              placeholder="Type / for quick reply or message..."
              ref={textRef}
              value={text}
              onChange={(e) => {
                const value = e.target.value;
                setText(value);
                const lastChar = value[e.target.selectionStart - 1];
                setShowQuickDrop(lastChar === "/");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendClick();
                }
              }}
              className="flex-1 border rounded-full pl-9 px-4 py-2 outline-none text-xs sm:text-sm "
            />

            <AnimatePresence>
              {showQuickDrop && <ShowQuickReply />}
            </AnimatePresence>

            {/* {editIndex !== null ? "Update" : <FiSend size={20} />} */}
            {/* {text === "" ? (
                // <MicIcon size={20} onClick={handleRecordAudio} />
                <MicIcon size={20} onClick={() => setIsRecording(true)} />
              ) : (
                <FiSend size={20} onClick={handleSend} />
              )} */}

            <div className="relative flex gap-1.5">
              <button className="text-black font-semibold flex items-center cursor-pointer hover:scale-105 transition-all hover:bg-gray-200 p-1.5 rounded-full hover:text-gray-700">
                <FiSend size={20} onClick={handleSendClick} />
              </button>
              <button className="text-black font-semibold flex items-center cursor-pointer hover:scale-105 transition-all hover:bg-gray-200 p-1 rounded-full hover:text-gray-700">
                <MicIcon size={20} onClick={() => setIsRecording(true)} />
              </button>
              <button
                onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
                className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 cursor-pointer bg-black text-white rounded-full shadow-md transition-transform ${isSpeedDialOpen ? "rotate-45" : ""
                  }`}
              >
                <FaPlus size={12} />
                {/* <Paperclip /> */}
              </button>

              {isSpeedDialOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="fixed bg-white right-4 bottom-20 shadow-lg rounded-lg p-2 w-56 z-[999999]"
                >
                  {items.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.command}
                      className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      console.log("Selected file:", file);
                    }}
                  />

                  <input
                    type="file"
                    accept="audio/*"
                    ref={audioInputRef}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        console.log("Selected audio file:", file);

                        // Example: show preview or push to messages
                        const audioUrl = URL.createObjectURL(file);
                        setMessages((prev) => [
                          ...prev,
                          {
                            fromMe: true,
                            type: "audio",
                            audioUrl,
                            reactions: [],
                          },
                        ]);
                      }
                    }}
                  />
                </motion.div>
              )}
            </div>
          </div>

          {/* Quick reply */}
          <QuickReply open={open} setOpen={setOpen} />

          {/* Recording Dialog */}
          {isRecording && (
            <Dialog visible={isRecording} onHide={() => setIsRecording(false)}>
              <div className="p-4 space-y-4 z-10">
                <h2 className="text-lg font-semibold">Preview Voice Message</h2>
                {/* <audio controls src={audioFile.url} className="w-full" /> */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setMessages([
                        ...messages,
                        { audio: audioFile.url, fromMe: true },
                      ]);
                      setAudioFile(null);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Send
                  </button>
                  <button
                    onClick={() => setIsRecording(false)}
                    className="text-gray-600 px-4 py-2 rounded-md border"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Dialog>
          )}

          {/* Add template dialog */}
          {addTemplate && (
            <Dialog
              visible={addTemplate}
              onHide={() => setAddTemplate(false)}
              className="w-[90vw] max-w-4xl"
              draggable={false}
              onClose={() => setAddTemplate(false)}
            >
              {/* <AddTemplate
                onAddTemplate={onAddTemplate}
                setAddTemplate={setAddTemplate}
              /> */}
              <CustomTabsMaterial
                tabsData={tabsData}
                defaultValue="addTemplate"
                onClose={() => setAddTemplate(false)}
              />
            </Dialog>
          )}

          {openPreviewDialog && (
            <Dialog
              visible={openPreviewDialog}
              onHide={() => setOpenPreviewDialog(false)}
              header="Media Preview"
              className="w-full max-w-md"
              dismissableMask
              closable
            >
              {previewUrl?.toLowerCase().endsWith(".mp4") ||
                previewUrl?.toLowerCase().includes("video") ? (
                <video
                  src={previewUrl}
                  controls
                  className="w-full h-auto rounded-lg object-contain"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-auto rounded-lg object-contain"
                />
              )}
            </Dialog>
          )}
        </div>
      </div >
    </>
  );
};

export default InstaChatScreen;
