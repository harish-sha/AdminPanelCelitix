import React, { useState, useRef } from "react";
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/admin/components/UniversalButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CustomEmojiPicker from "@/admin/components/CustomEmojiPicker";
import WifiIcon from "@mui/icons-material/Wifi";
import Battery90Icon from "@mui/icons-material/Battery90";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import toast from "react-hot-toast";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { FaVideo } from "react-icons/fa";
import { Chip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


export default function IceBreaker() {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [inputText, setInputText] = useState("");
  const [qaList, setQaList] = useState([]);

  const messagesTextRef = useRef(null);
  const inputTextRef = useRef(null);

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

  const handleAdd = () => {
    const payload = {
      question: messageText,
      payload: textAnswer,
    };
    if (qaList.length >= 4) {
      toast.error("You reached the maximum limit.");
      return;
    }
    if (messageText.trim()) {
      setQaList((prev) => [
        ...prev,
        { question: messageText, answer: textAnswer },
      ]);
      setMessageText("");
      setTextAnswer("");
    }
  };

  // const handleChipClick = (msg) => {
  //   setMessages((prev) => [...prev, { from: "user", text: msg.question }]);

  //   if (textAnswer.trim()) {
  //     setMessages((prev) => [...prev, { from: "bot", text: textAnswer }]);
  //   }
  //  console.log( "textAnswer:",messages)
  //   setTextAnswer("");

  //  setMessages((prev) => [...prev, { from: "user", text: msg.question }]);

  // };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Left side content */}
      <div className="md:w-2/3 card space-y-4 bg-white shadow-md p-4 rounded-lg">
        <div className="mb-2 flex flex-col gap-2 items-center justify-center bg-white rounded-lg shadow p-2">
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <InputField
              label="Ice Breaker Question"
              placeholder="Type your question here..."
              ref={messagesTextRef}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <InputField
              label="Ice Breaker Answer"
              placeholder="Type your answer here..."
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
            />
          </div>
          <div className="w-max-content">
            <UniversalButton label="Add" onClick={handleAdd} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {qaList.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-md p-4 rounded-lg break-words relative"
            >
              <button
                className="hover:bg-gray-300 transition-all rounded-full p-0.5 cursor-pointer absolute right-2 top-2"
                onClick={() =>
                  setQaList((prev) => prev.filter((_, i) => i !== index))
                }
              >
                <DeleteForeverIcon
                  sx={{
                    fontSize: "1.2rem",
                    color: "#e31a1a",
                  }}
                />
              </button>
              <p className="text-sm font-semibold text-gray-800 break-words">
                {index + 1}Q. {item.question}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                {index + 1}A. {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*Mobile preview */}
      <div className="relative bg-white border-4 border-black h-[667px] w-[375px] rounded-[2rem] shadow-lg flex flex-col overflow-hidden">
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-26 bg-gray-100 flex items-center justify-between px-3 text-xs text-gray-600">
          <p className="absolute top-3 left-2">7:00 AM</p>
          <div className="flex items-center space-x-1 absolute top-2 right-2">
            <AccessAlarmIcon fontSize="small" className="text-gray-500" />
            <WifiIcon fontSize="small" className="text-gray-500" />
            <Battery90Icon fontSize="small" className="text-gray-500" />
          </div>
          <div className="absolute top-13 left-5 flex flex-row gap-2">
            <img
              src="https://images.pexels.com/photos/2293372/pexels-photo-2293372.jpeg"
              alt="Avtar"
              className="w-8 h-8 rounded-full border--2 border-black"
            />
            <div className="flex flex-col ">
              <h1 className="text-lg font-semibold">Jaun</h1>
              <p className="text-md mt-0 ">Online </p>
            </div>
          </div>
          <div className="flex space-x-1 absolute top-13 right-3 gap-2">
            <PhoneOutlinedIcon
              size={22}
              className="text-gray-500 hover:text-green-500 cursor-pointer"
            />
            <FaVideo
              size={22}
              className="text-gray-500 hover:text-blue-500 cursor-pointer"
            />
          </div>
        </div>

        {/* chat area */}
        <div className="flex flex-col mt-10 px-4 py-2 overflow-y-auto space-y-2 absolute bottom-18 right-2">
          {qaList?.map((msg, index) => (
            // <Chip
            //   key={index}
            //   label={msg.question}
            //   // onClick={() => handleChipClick(msg.question)}
            //   sx={{
            //     padding: 1,
            //     marginBottom: 1,
            //     backgroundColor: "#f3f4f6",
            //     border: 1,
            //   }}
            // />
            <button
              key={index}
              className="w-auto max-w-xs text-right text-blue-400 text-sm bg-gray-100 font-semibold px-4 py-1.5 rounded-full break-words"
            >
              {msg.question}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="absolute bottom-6 inset-x-4 flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
          <PhotoCameraIcon
            sx={{ fontSize: 20, color: "#4588E7" }}
            className="text-gray-400 mr-2"
          />

          <input
            type="text"
            placeholder="Message..."
            ref={inputTextRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
          />

          {/* Emoji picker */}
          <CustomEmojiPicker
            onSelect={(emoji) => handleEmojiSelect(setText, emoji)}
            position="bottom"
            className="text-gray-400 text-md ml-2"
          />
        </div>

        {/* Bottom bar drag indicator */}
        <div className="w-24 h-1.5 bg-gray-800 rounded-full mx-auto absolute bottom-2 left-0 right-0" />
      </div>
    </div>
  );
}
