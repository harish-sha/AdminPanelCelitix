import React, { useState, useRef } from "react";
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/admin/components/UniversalButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import WifiIcon from "@mui/icons-material/Wifi";
import Battery90Icon from "@mui/icons-material/Battery90";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import toast from "react-hot-toast";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { FaVideo } from "react-icons/fa";
import { Chip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FaRegFaceSmile } from "react-icons/fa6";

export default function IceBreaker() {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  // const [inputText, setInputText] = useState("");
  const [qaList, setQaList] = useState([]);

  const messagesTextRef = useRef(null);
  // const inputTextRef = useRef(null);

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
      <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-4 space-y-6 flex flex-col items-start justify-start ">
        <div className="flex flex-col items-center gap-4 w-full p-3 bg-white rounded-lg shadow">
          <div className="flex flex-col items-center justify-center gap-4 w-full ">
            <InputField
              label="Ice Breaker Question"
              placeholder="Type your question here..."
              ref={messagesTextRef}
              value={messageText}
              tooltipContent="This question will be used to start a conversation with your users."
              tooltipPlacement="right"
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full text-sm"
            />
            
            <InputField
              label="Ice Breaker Answer"
              placeholder="Type your answer here..."
              value={textAnswer}
              tooltipContent="This answer will be used to respond to the user's question."
              tooltipPlacement="right"
              onChange={(e) => setTextAnswer(e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="w-max-content flex flex-col items-center">
            <UniversalButton label="Add" onClick={handleAdd} />
            <div className="text-xs font-semibold mt-1">
            Total IceBreaker: {qaList.length}/4
          </div>
           
          </div>
        </div>

        <div className="w-full ">
          <div className="flex h-100 rounded-2xl  border">
            <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4 w-full  rounded-2xl p-2 overflow-y-scroll ">
              {qaList.length === 0 ? (
                <>
                  <div className="flex md:flex-col items-center justify-center">
                    <div className="text-xl font-medium">
                      No menu items added yet.
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 justify-center w-full ">
                    <div className="w-full">
                      <span className="font-semibold">URL Button</span> <br />
                      <p className="text-gray-400 text-sm  break-words whitespace-pre-line w-full">
                        Ice Breakers provide a way for your app users to start a
                        conversation with a business with a list of frequently
                        asked questions. A maximum of 4 questions can be set via
                        the Ice Breaker API.
                      </p>
                    </div>
                    
                  </div>
                </>
              ) : (
                <>
                  {qaList.map((item, index) => (
                    <div
                      key={index}
                      className="p-5 border rounded-lg bg-gray-50 shadow-sm space-y-1 relative flex flex-col items-start"
                    >
                      <button
                        className="hover:bg-gray-300 transition-all rounded-full p-0.5 cursor-pointer absolute right-2 top-2"
                        onClick={() =>
                          setQaList((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                      >
                        <DeleteForeverIcon
                          sx={{
                            fontSize: "1.2rem",
                            color: "#e31a1a",
                          }}
                        />
                      </button>
                      <p className="text-sm font-semibold text-gray-800 break-words whitespace-pre-line w-full">
                        Que.{index + 1} {item.question}
                      </p>
                      <p className="text-sm text-gray-700 mt-2 break-words whitespace-pre-line w-full">
                        Ans.{index + 1} {item.answer}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*Mobile preview */}
      <div className="md:w-[375px] h-[667px] rounded-[2rem] border-4 border-black shadow-lg flex flex-col overflow-hidden relative bg-white">
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-26 bg-gray-100 flex items-center justify-between px-3 text-xs text-gray-600">
          <p className="absolute top-3 left-2">7:00 AM</p>
          <div className="flex items-center space-x-1 absolute top-2 right-2">
            <AccessAlarmIcon sx={{ fontSize: 20 }} className="text-gray-500" />
            <WifiIcon sx={{ fontSize: 20 }} className="text-gray-500" />
            <Battery90Icon sx={{ fontSize: 20 }} className="text-gray-500" />
          </div>
          <div className="absolute top-13 left-5 flex flex-row gap-2">
            <img
              src="https://images.pexels.com/photos/2293372/pexels-photo-2293372.jpeg"
              alt="Avtar"
              className="w-8 h-8 rounded-full border--2 border-black"
            />
            <div className="flex flex-col ">
              <h1 className="md:text-lg font-semibold">Jaun</h1>
              <p className="md:text-md mt-0 ">Online </p>
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
        <div className="flex flex-col mt-10 px-4 py-2 overflow-y-auto space-y-2 absolute bottom-18 right-0 left-1">
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
              className="w-auto max-w-xs text-right text-blue-400 text-sm bg-gray-100 font-semibold px-4 py-1.5 rounded-full break-words whitespace-pre-line "
            >
              {msg.question}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="absolute bottom-4 left-0 right-0 mx-auto mb-3 w-[95%] sm:w-[90%] md:w-auto flex items-center justify-between bg-gray-100 rounded-full px-3 py-2 shadow-sm">
          <div className="flex items-center w-full space-x-2">
            <PhotoCameraIcon
              sx={{ fontSize: 20, color: "#4588E7" }}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Message..."
              className="flex-grow bg-transparent outline-none text-sm placeholder-gray-500"
            />

            <FaRegFaceSmile className="text-gray-400" />
          </div>
        </div>

        {/* Bottom bar drag indicator */}
        <div className="w-24 h-1.5 bg-gray-800 rounded-full mx-auto absolute bottom-2 left-0 right-0" />
      </div>
    </div>
  );
}
