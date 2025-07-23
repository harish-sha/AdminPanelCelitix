import React, { useState } from "react";
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/admin/components/UniversalButton";
import { Dialog } from "primereact/dialog";
import { Chip } from "@mui/material";
import toast from "react-hot-toast";
import { MdOutlineCancel } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import GenieModal from "@/components/Dialogs/GenieModal";
import AnimateModal from "@/components/Dialogs/AnimateModal";
import { MdOutlineQuickreply } from "react-icons/md";
import { SiHotwire } from "react-icons/si";


const QuickReply = ({ open, setOpen, }) => {
  const [inputText, setInputText] = useState("");
  const [textMessage, setTextMessage] = useState([]);
  const [showQuickReply, setShowQuickReply] = useState(false);

  const Max_Chip = 13;
  const handleSave = () => {
    if (textMessage.length >= Max_Chip) {
      toast.error("You reached the maximum limit.");
      return;
    }
    if (inputText.trim()) {
      setTextMessage((prev) => [...prev, inputText]);
      setInputText("");
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 300,
      scaleX: 0.5,
      scaleY: 0.2,
      width: "100px",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      width: "384px",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: 300,
      scaleX: 0.5,
      scaleY: 0.2,
      width: "100px",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };


  return (
    <>
      {/* <Dialog
        header="Add Quick Replies"
        visible={open}
        style={{ width: "35rem" }}
        onHide={() => {
          setOpen(false);
        }}
        draggable={false}
      >
        <div className="w-full mb-4 flex items-end gap-2 relative">
          <InputField
            label="Message"
            placeholder="Message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={20}
          />
          <UniversalButton
            label="Add"
            onClick={handleSave}
            disabled={textMessage >= Max_Chip}
          />
          <div
            onClick={() => setInputText("")}
            className="absolute rounded-full bg-gray-100 right-19 top-9 cursor-pointer hover:bg-gray-100 p-0.5"
          >
            <MdOutlineCancel />
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold">
            Total Chars: {inputText.length}/20
          </div>
          <div
            className={`text-xs font-semibold ${textMessage.length >= Max_Chip ? "text-red-500" : ""
              }`}
          >
            Quick Reply: {textMessage.length}/{Max_Chip}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {textMessage.map((text, index) => (
            <Chip
              sx={{ padding: 1 }}
              key={index}
              label={text}
              onDelete={() =>
                setTextMessage((prev) => prev.filter((_, i) => i !== index))
              }
            />
          ))}
        </div>
      </Dialog> */}

      {/* 
      <GenieModal
        genieIsOpen={open}
        genieOnClose={() => setOpen(false)}
        className="w-20"
        width="480px"
      >
        <div className="w-full mb-4 flex items-end gap-2 relative">
          <InputField
            label="Message"
            placeholder="Message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={20}
          />
          <UniversalButton
            label="Add"
            onClick={handleSave}
            disabled={textMessage >= Max_Chip}
          />
          <div
            onClick={() => setInputText("")}
            className="absolute rounded-full bg-gray-100 right-19 top-9 cursor-pointer hover:bg-gray-100 p-0.5"
          >
            <MdOutlineCancel />
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold">
            Total Chars: {inputText.length}/20
          </div>
          <div
            className={`text-xs font-semibold ${textMessage.length >= Max_Chip ? "text-red-500" : ""
              }`}
          >
            Quick Reply: {textMessage.length}/{Max_Chip}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {textMessage.map((text, index) => (
            <Chip
              sx={{ padding: 1 }}
              key={index}
              label={text}
              onDelete={() =>
                setTextMessage((prev) => prev.filter((_, i) => i !== index))
              }
            />
          ))}
        </div>
      </GenieModal> */}

      <AnimateModal
        animateIsOpen={open}
        animateOnClose={() => setOpen(false)}
        className="bg-gradient-to-br from-violet-100 to-indigo-100"
        width="480px"
        flotIcon={<SiHotwire />}
        flotIconClass="text-white/60 -left-10 -top-10"
      >
        <div className="w-full mb-4 flex items-end gap-2 relative">
          <InputField
            label="Message"
            placeholder="Quick reply message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={20}
          />
          <UniversalButton
            label="Add"
            onClick={handleSave}
            disabled={textMessage >= Max_Chip}
          />
          <div
            onClick={() => setInputText("")}
            className="absolute rounded-full bg-gray-100 right-19 top-9 cursor-pointer hover:bg-gray-100 p-0.5"
          >
            <MdOutlineCancel />
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold">
            Total Chars: {inputText.length}/20
          </div>
          <div
            className={`text-xs font-semibold ${textMessage.length >= Max_Chip ? "text-red-500" : ""
              }`}
          >
            Quick Reply: {textMessage.length}/{Max_Chip}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {textMessage.map((text, index) => (
            <Chip
              sx={{ padding: 1 }}
              key={index}
              label={text}
              onDelete={() =>
                setTextMessage((prev) => prev.filter((_, i) => i !== index))
              }
            />
          ))}
        </div>
      </AnimateModal>
    </>
  );
};

export default QuickReply;


export const ShowQuickReply = () => {
  const [textMessage, setTextMessage] = useState([
    "Hello!",
    "How are you?",
    "Thank you!",
    "Please wait",
    "On my way",
    "Okay",
    "Sure!",
    "Will do",
    "Let me check",
    "Great!",
    "Good morning",
    "See you soon",
    "Take care"
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-20 left-0 rounded-md z-50 p-2 flex"
    >
      {textMessage.map((text, index) => (
        <pre key={index} className="p-1 px-2 text-[0.8rem] text-gray-900 rounded-full bg-blue-200 m-1 flex flex-row w-max-content cursor-pointer text-nowrap hover:scale-105 hover:shadow-md transition-all">
          {text}
        </pre>
      ))}
    </motion.div>
  );
};
