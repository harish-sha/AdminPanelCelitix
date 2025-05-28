import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import { SpeedDial } from "primereact/speeddial";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export const ChatInput = ({
  inputRef,
  input,
  setInput,
  sendMessage,
  selectedImage,
  items,
  insertEmoji,
}) => {
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

  function addBtn(formatType) {
    if (!inputRef.current) return;

    const inputEl = inputRef.current;
    const { selectionStart, selectionEnd } = inputEl;
    const selectedText = input.substring(selectionStart, selectionEnd);

    const data = {
      bold: {
        start: "*",
        end: "*",
      },
      italic: {
        start: "_",
        end: "_",
      },
      strike: {
        start: "~",
        end: "~",
      },
    };

    const { start, end } = data[formatType];

    const newValue =
      input.substring(0, selectionStart) +
      start +
      selectedText +
      end +
      input.substring(selectionEnd);

    setInput(newValue);

    requestAnimationFrame(() => {
      const pos = selectionEnd + start.length + end.length;
      inputEl.setSelectionRange(pos, pos);
      inputEl.focus();
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-center w-full py-2 px-2 bg-white border-t mb-17 md:mb-0"
    >
      <div className="mr-2">
        <CustomEmojiPicker position="top" onSelect={insertEmoji} />
      </div>
      <div className="relative flex items-center justify-center w-full gap-2 border rounded-3xl">
        <textarea
          type="text"
          className="max-h-50 w-full p-2 focus:outline-none resize-none"
          placeholder="Type a message..."
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!selectedImage && !input}
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
      <div className="items-center justify-center hidden gap-1 md:flex">
        <button
          onClick={() => {
            addBtn("bold");
          }}
          className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
        >
          <FormatBoldOutlined />
        </button>
        <button
          onClick={() => {
            addBtn("italic");
          }}
          className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
        >
          <FormatItalicOutlined />
        </button>
        <button
          onClick={() => {
            addBtn("strike");
          }}
          className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
        >
          <FormatStrikethroughOutlined />
        </button>
      </div>

      {/* Custom SpeedDial */}
      <div className="relative ml-4">
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
      </div>
    </motion.div>
  );
};
