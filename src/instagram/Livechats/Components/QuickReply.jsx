import React, { useState } from "react";
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/admin/components/UniversalButton";
import { Dialog } from "primereact/dialog";
import { Tooltip, Chip, Badge } from "@mui/material";
import toast from "react-hot-toast";
import { MdOutlineCancel } from "react-icons/md";

const QuickReply = ({ open, setOpen }) => {
  const [inputText, setInputText] = useState("");
  const [textMessage, setTextMessage] = useState([]);
  const [showQuickReply, setShowQuickReply] = useState(false);


  const Max_Chip = 13;
  const handleSave = () => {
    if (textMessage.length >= Max_Chip) {
      toast.error("You reached the maximum limit.");
      return; // Stop adding chips
    }
    if (inputText.trim()) {
      setTextMessage((prev) => [...prev, inputText]);
      setInputText("");
    }
  };

  return (
    <>
      <Dialog
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
            onChange={(e) => {
              const value = e.target.value;
              setInputText(value);
              const lastChar = value[e.target.selectionStart - 1];
              setShowQuickReply(lastChar === "/");
            }}
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
      </Dialog>
    </>
  );
};

export default QuickReply;

export const ShowQuickReply = () => {

  return (
    <div>
      {textMessage.map((text, index) => {
        <div className="p-2 border-1 border-black rounded-full" />;
      })}
    </div>
  );
};
