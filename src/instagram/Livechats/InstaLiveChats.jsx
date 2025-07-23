import React, { useState, useRef, useEffect } from "react";
import CustomEmojiPicker from "@/admin/components/CustomEmojiPicker";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { LuUndo2 } from "react-icons/lu";
import QuickReply, { ShowQuickReply } from "./Components/QuickReply";
import { Dialog } from "primereact/dialog";
import { AnimatePresence, motion } from "framer-motion";

const InstaLiveChats = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const textRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [showQuickDrop, setShowQuickDrop] = useState(false);
  const [filteredReplies, setFilteredReplies] = useState([]);
  const [cursorPos, setCursorPos] = useState(0);

  const handleEmojiSelect = (setState, emoji, maxLength = 1000) => {
    if (!textRef.current) return;
    const start = textRef.current.selectionStart;
    const end = textRef.current.selectionEnd;
    const current = textRef.current.value;

    const newText = current.slice(0, start) + emoji + current.slice(end);

    if (newText.length <= maxLength) {
      setState(newText);
      setTimeout(() => {
        const newCaret = start + emoji.length;
        textRef.current.focus();
        textRef.current.setSelectionRange(newCaret, newCaret);
      }, 0);
    }
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (editIndex !== null) {
      const updated = [...messages];
      updated[editIndex].text = trimmed;
      setMessages(updated);
      setEditIndex(null);
    } else {
      setMessages([...messages, { text: trimmed, fromMe: true }]);
    }

    setText("");
    setSelectedIndex(null);
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

  return (
    <div className="h-full flex bg-white">
      <div className="flex flex-col w-full md:w-2/3">
        <div className="p-4 border-b font-semibold">username</div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className="relative">
              <div
                className={`message-bubble max-w-xs px-4 py-2 rounded-lg cursor-pointer transition-all ${msg.fromMe
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-black"
                  }`}
                onClick={() => handleMessageClick(idx)}
              >
                {msg.text}
              </div>

              {selectedIndex === idx && !msg.unsent && (
                <div className="absolute flex flex-col  gap-2 right-0 top-full mt-1 bg-black border shadow px-2 py-1 rounded z-10 text-sm ">
                  <button
                    onClick={() => handleEdit(idx)}
                    className="text-white flex items-center gap-2 "
                  >
                    <EditOutlinedIcon sx={{ fontSize: 17 }} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-600 flex items-center gap-1"
                  >
                    <DeleteOutlineOutlinedIcon sx={{ fontSize: 17 }} /> Delete
                  </button>
                  <button
                    onClick={() => handleUnsend(idx)}
                    className="text-red-600 flex items-center gap-1 "
                  >
                    <LuUndo2 sx={{ fontSize: 17 }} /> Unsend
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t flex items-center gap-2 relative">

          <input
            type="text"
            placeholder="Type / for quick reply or Message..."
            ref={textRef}
            value={text}
            // onChange={(e) => setText(e.target.value)}
            onChange={(e) => {
              const value = e.target.value;
              setText(value);
              const lastChar = value[e.target.selectionStart - 1];
              setShowQuickDrop(lastChar === "/");
            }}
            className="flex-1 border rounded-full px-4 py-2 outline-none text-sm"
          />
          <AnimatePresence>
            {showQuickDrop && (
              <ShowQuickReply />
            )}
          </AnimatePresence>

          <div className="absolute bottom-5 right-23">
            <CustomEmojiPicker
              onSelect={(emoji) => handleEmojiSelect(setText, emoji)}
              position="top"
            />
          </div>

          <button onClick={handleSend} className="text-blue-500 font-semibold">
            {editIndex !== null ? "Update" : "Send"}
          </button>

          <button
            className="font-semibold text-gray-600 text-lg"
            onClick={() => setOpen(true)}
          >
            +
          </button>
        </div>
        {/* {open && (
          <QuickReply
            open={open}
            setOpen={setOpen}
          />
        )} */}
        <QuickReply open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default InstaLiveChats;
