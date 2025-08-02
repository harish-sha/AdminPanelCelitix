import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
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
import AddTemplate from "./AddTemplate";
// import Stickers from "./sticker/Stickers";

const InstaChatScreen = ({
  chatState,
  setChatState,
  messages,
  setMessages,
  quickDrop,
  editIndex,
  selectedIndex,
  onAddTemplate
}) => {
  const [open, setOpen] = useState(false);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [showQuickDrop, setShowQuickDrop] = useState(false);
  const [addTemplate, setAddTemplate] = useState(false);
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
  console.log("showStickerPicker", showStickerPicker);

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

    setMessages((prev) => [...prev, { text: trimmed, fromMe: true }]);
    setText("");
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.fromMe) {
      const reply = {
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
    console.log("sticker", sticker);
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
      icon: <FiUpload />,
      command: () => handleImageUpload(),
    },
    {
      label: "Gifs",
      icon: <GifBoxIcon />,
      // command: () => handleImageUpload(),
    },
    {
      label: "Stickers",
      icon: <PiSticker />,
      command: () => setShowStickerPicker(true),
    },
    {
      label: "Audio Files",
      icon: <PiSticker />,
      command: () => handleSendAudioFile(),
    },
    {
      label: "Add Template",
      icon: <FiLayers />,
      command: () => setAddTemplate(true),
    },
    {
      label: "Add Quick Reply",
      icon: <FiMessageSquare />,
      command: () => setOpen(true),
    },
  ];

  const stickerPack = [
    { id: 1, src: "../Stickers/chat-balloon.png", alt: "Chat Balloon" },
    { id: 2, src: "../Stickers/cute.png", alt: "Cute" },
    { id: 3, src: "../Stickers/good-luck.png", alt: "Good Luck" },
    { id: 4, src: "../Stickers/xoxo.png", alt: "Xoxo" },
    { id: 5, src: "../Stickers/cassette-tape.png", alt: "cassette-tape" },
    { id: 6, src: "../Stickers/got-you.png", alt: "got-you" },
    { id: 7, src: "../Stickers/help.png", alt: "help" },
    { id: 8, src: "../Stickers/love-message.png", alt: "love-message" },
    { id: 9, src: "../Stickers/valentines-day.png", alt: "valentines-day" },
    { id: 10, src: "../Stickers/wtf.png", alt: "wtf" },
    { id: 11, src: "../Stickers/wow.png", alt: "wow" },
    { id: 12, src: "../Stickers/why.png", alt: "why" },
    { id: 13, src: "../Stickers/stop.png", alt: "stop" },
    { id: 15, src: "../Stickers/stamp.png", alt: "stamp" },
    { id: 16, src: "../Stickers/see-you.png", alt: "see-you" },
    { id: 17, src: "../Stickers/no-chat.png", alt: "no-chat" },
    { id: 18, src: "../Stickers/message.png", alt: "message" },
    { id: 19, src: "../Stickers/medical-app.png", alt: "medical-app" },
    { id: 20, src: "../Stickers/love-message.png", alt: "love-message" },
    { id: 21, src: "../Stickers/lol.png", alt: "lol" },
    { id: 22, src: "../Stickers/laugh.png", alt: "laugh" },
    { id: 23, src: "../Stickers/internet.png", alt: "internet" },
    { id: 24, src: "../Stickers/humorous.png", alt: "humorous" },
    { id: 25, src: "../Stickers/how-are-you.png", alt: "how-are-you" },
    { id: 26, src: "../Stickers/hiring.png", alt: "hiring" },
  ];

  const [stickOpen, setStickOpen] = useState(false);

  return (
    <>
      <div className="h-full flex bg-white w-full">
        <div className="flex flex-col w-full">
          <div className="bg-gradient-to-r from-[#F1D3CE] to-[#EECAD5] z-10 rounded-2xl">
            <div className="p-4 border-b font-semibold text-gray-700 text-lg capitalize w-full flex items-center gap-2">
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

          <div className="h-full overflow-hidden relative">
            <div
              className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
              style={{
                backgroundImage: `url('https://thumbs.dreamstime.com/b/social-media-banners-hand-draw-doodle-background-vector-illustration-social-media-banners-hand-draw-doodle-background-117495847.jpg')`,
                opacity: 0.1,
                zIndex: 0,
              }}
            />
            <div className="p-4 space-y-2 overflow-y-auto h-full relative">
              {/* <div
                className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url('https://thumbs.dreamstime.com/b/social-media-banners-hand-draw-doodle-background-vector-illustration-social-media-banners-hand-draw-doodle-background-117495847.jpg')`,
                  opacity: 0.1,
                  zIndex: 0,
                }}
              /> */}
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400 text-xl flex items-center">
                    👋 No messages yet. Say hello to get things started!
                  </p>
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const fromMe = msg.fromMe;
                  console.log("msg", msg);
                  return (
                    <div
                      key={idx}
                      ref={scrollContainerRef}
                      className="relative mb-4 z-40"
                    >
                      {/* Message bubble */}
                      <div
                        className={`max-w-xs relative px-4 py-2 rounded-lg cursor-pointer z-10 break-words whitespace-pre-line ${fromMe
                          ? "ml-auto bg-[#9AA6B2] text-white"
                          : "bg-gray-200 text-black"
                          }`}
                        onMouseEnter={() =>
                          setActiveEmojiPickerIdx(
                            activeEmojiPickerIdx === idx ? null : idx
                          )
                        }
                      >
                        {msg.type === "sticker" ? (
                          <img
                            src={msg.src}
                            alt="Sticker"
                            className="w-32 h-auto rounded-lg"
                          />
                        ) : msg.type === "audio" ||
                          msg.text?.endsWith(".mp3") ? (
                          <audio controls className="w-full">
                            <source src={msg.audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        ) : (
                          <p>{msg.text}</p>
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
                      </div>

                      {/* Reactions display */}
                      {msg.reactions && msg.reactions.length > 0 && (
                        <div
                          className={`mt-1 flex space-x-1 text-sm ${fromMe ? "justify-end" : "justify-start"
                            }`}
                        >
                          {msg.reactions.map((reaction, rIdx) => (
                            <span key={rIdx}>{reaction}</span>
                          ))}
                        </div>
                      )}

                      {/* Custom Emoji Picker (conditionally rendered) */}
                      {activeEmojiPickerIdx === idx && (
                        <div
                          className={`p-1 rounded-full flex items-center justify-center absolute mb-2 z-50 top-0 ${fromMe ? "right-85" : "left-85"
                            }`}
                        >
                          <CustomEmojiPicker
                            onSelect={(emoji) => handleReaction(idx, emoji)}
                            className="z-[1000] absolute"
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* media full screen preview */}
          {previewDialog.open && (
            <div className="fixed bottom-28 left-[40%] z-50 bg-white shadow-lg border border-gray-300 rounded-xl  w-50 h-45 flex flex-col items-center justify-center">
              {/* Close Button */}
              <button
                className="self-end text-gray-500 hover:text-black text-lg font-bold mr-2"
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
                  className=" w-38 h-40 rounded-md mt-0"
                />
              )}
              {previewDialog.type === "video" && (
                <video
                  src={previewDialog.url}
                  controls
                  className="max-h-[60vh] w-auto rounded-md"
                />
              )}

              {/* Optional Caption */}
              {previewDialog.caption && (
                <div className="mt-2 text-center text-xs text-gray-700 mb-1 ">
                  {previewDialog.caption}
                </div>
              )}
            </div>
          )}

          {/* Input Section */}
          <div className="p-2 border-t bg-white w-full flex items-center gap-2 sm:gap-3 z-10 shadow rounded-br-md bottom-0 h-22">
            <div className="absolute bottom-7 left-4 flex space-x-2">
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
                  handleSend();
                }
              }}
              className="flex-1 border rounded-full pl-9 px-4 py-2 outline-none text-xs sm:text-sm"
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
            <button className="text-black font-semibold flex items-center cursor-pointer">
              <FiSend size={20} onClick={handleSend} />
            </button>
            <button className="text-black font-semibold flex items-center cursor-pointer">
              <MicIcon size={20} onClick={() => setIsRecording(true)} />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
                className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 cursor-pointer bg-black text-white rounded-full shadow-md transition-transform ${isSpeedDialOpen ? "rotate-45" : ""
                  }`}
              >
                <FaPlus size={12} />
              </button>

              {isSpeedDialOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 bottom-12 sm:bottom-14 bg-white shadow-lg rounded-lg p-2 w-56 z-20"
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

              {isRecording === true && (
                <Dialog
                  visible={isRecording}
                  onHide={() => setIsRecording(false)}
                >
                  <div className="p-4 space-y-4 z-10">
                    <h2 className="text-lg font-semibold">
                      Preview Voice Message
                    </h2>
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
            </div>
          </div>
          <QuickReply open={open} setOpen={setOpen} />

          {addTemplate && (
            <Dialog
              visible={addTemplate}
              onHide={() => setAddTemplate(false)}
              className="w-[90vw] max-w-xl"
              draggable={false}
            >
              <AddTemplate
                onAddTemplate={onAddTemplate}
                setAddTemplate={setAddTemplate}
              />
            </Dialog>
          )}
          {showStickerPicker && (
            <Dialog
              header="Choose a Sticker"
              visible={showStickerPicker}
              onHide={() => setShowStickerPicker(false)}
              modal
              className="w-[90vw] max-w-md"
              contentStyle={{ padding: "1.5rem" }}
            >
              <div className="grid grid-cols-4 gap-4 max-h-80 overflow-y-auto">
                {stickerPack.map((sticker) => (
                  <img
                    key={sticker.id}
                    src={sticker.src}
                    alt={sticker.alt}
                    className="w-20 h-20 object-contain cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110"
                    onClick={() => handleStickerSend(sticker)}
                  />
                ))}
              </div>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default InstaChatScreen;
