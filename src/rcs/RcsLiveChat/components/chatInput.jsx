import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { flushSync } from "react-dom";
import { FiSend } from "react-icons/fi";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import { BsJournalArrowDown } from "react-icons/bs";
import { FaReply } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import CannedMessageDropdown from "@/cannedmessage/components/CannedMessageDropdown";

export const ChatInput = ({
  input,
  setInput,
  sendMessage,
  inputRef,
  fileInputRef,
  isSpeedDialOpen,
  setIsSpeedDialOpen,
  isTemplateMessage,
  setIsTemplateMessage,
}) => {
  // const [isSpeedDialOpen, setIsSpeedDialOpen] = React.useState(false);
  const [showCannedDropdown, setShowCannedDropdown] = React.useState(false);

  const items = [
    {
      label: "Attachment",
      icon: <AttachmentOutlinedIcon style={{ color: "#4CAF50" }} />,
      command: () => {
        fileInputRef.current.click();
      },
    },
    {
      label: "Document",
      icon: <FilePresentOutlinedIcon />,
      command: () => {
        fileInputRef.current.click();
      },
    },
    {
      label: "Photos & Videos",
      icon: <ImageOutlinedIcon style={{ color: "#FF9800" }} />, // Orange
      command: () => {
        fileInputRef.current.click();
      },
    },
    {
      label: "Template",
      icon: <BsJournalArrowDown style={{ color: "#3F51B5" }} />,
      command: () => {
        setIsTemplateMessage(true);
      },
    },
    {
      label: "Excel",
      icon: <TableChartOutlinedIcon style={{ color: "#009688" }} />, // Teal
      command: () => {
        fileInputRef.current.click();
      },
    },
  ];

  // function sendMessage() {}

  function insertEmoji(emoji) {
    const el = inputRef.current;
    if (!el) return;

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const before = input.slice(0, start);
    const after = input.slice(end);

    const newText = before + emoji + after;
    const newPos = start + emoji.length;
    setInput(newText);

    requestAnimationFrame(() => {
      // ...then slam the caret into place
      el.setSelectionRange(newPos, newPos);
      el.focus();
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-center w-full py-2 px-2 bg-white border-t mb-25 md:mb-0"
    >
      <div className="mr-2">
        <CustomEmojiPicker position="top" onSelect={insertEmoji} />
      </div>
      <div className="relative flex items-center justify-center w-full gap-2 border rounded-3xl">
        <textarea
          type="text"
          className="max-h-50 p-3 w-full focus:outline-none resize-none"
          placeholder="Type / for canned messages"
          ref={inputRef}
          value={input}
          // onChange={(e) => setInput(e.target.value)}
          onChange={(e) => {
            const value = e.target.value;
            setInput(value);
            const lastChar = value[e.target.selectionStart - 1];
            setShowCannedDropdown(lastChar === "/");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <AnimatePresence>
          {showCannedDropdown && (
            <CannedMessageDropdown
              onSelect={(msg) => {
                const inputEl = inputRef.current;
                if (!inputEl) return;

                const start = inputEl.selectionStart;
                const end = inputEl.selectionEnd;

                const newText =
                  input.substring(0, start - 1) + msg + input.substring(end);

                setInput(newText);
                setShowCannedDropdown(false);

                requestAnimationFrame(() => {
                  const pos = start - 1 + msg.length;
                  inputEl.setSelectionRange(pos, pos);
                  inputEl.focus();
                });
              }}
            />
          )}
        </AnimatePresence>
        <button
          onClick={sendMessage}
          //   disabled={!selectedImage && !input}
          className="flex items-center justify-center w-9 h-9 text-black transition-all  rounded-full hover:text-gray-500 hover:bg-gray-200 cursor-pointer active:scale-105 md:mr-2"
        >
          <FiSend className="text-xl" />
        </button>
        {/* <SpeedDial
                  model={items}
                  direction="up"
                  buttonStyle={{ width: "2rem", height: "2rem" }}
                  className="right-19 bottom-1 speeddial-bottom-right"
                /> */}
      </div>

      {/* <div className="relative ml-4">
        <button
          onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
          className={`flex items-center justify-center w-8 h-8 cursor-pointer bg-[#22577E] text-white rounded-full shadow-md transition-transform ${
            isSpeedDialOpen ? "rotate-45" : ""
          }`}
        >
          <FaPlus />
        </button>
        {isSpeedDialOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-15 right-0 mt-2 bg-white shadow-lg rounded-lg p-3 w-56"
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
          </motion.div>
        )}
      </div> */}
    </motion.div>
  );
};
