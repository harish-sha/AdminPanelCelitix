import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import { motion } from "framer-motion";
import React from "react";
import { flushSync } from "react-dom";
import { FiSend } from "react-icons/fi";

export const ChatInput = ({ input, setInput }) => {
  const inputRef = React.useRef(null);

  function sendMessage() {}

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
      className="flex items-center w-full py-2 px-2 bg-white border-t mb-17 md:mb-0"
    >
      <div className="mr-2">
        <CustomEmojiPicker position="top" onSelect={insertEmoji} />
      </div>
      <div className="relative flex items-center justify-center w-full gap-2 border rounded-3xl">
        <textarea
          type="text"
          className="max-h-50 p-3 w-full focus:outline-none resize-none"
          placeholder="Type a message..."
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
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
    </motion.div>
  );
};
