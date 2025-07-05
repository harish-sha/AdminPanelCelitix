// import React, { useEffect, useState } from "react";
// import {
//   getAllCannedMessages,
//   saveCannedMessage,
//   deleteCannedMessageBySrNo,
// } from "@/apis/whatsapp/whatsapp.js";
// import InputField from "@/whatsapp/components/InputField";
// import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
// import UniversalButton from "@/components/common/UniversalButton";
// import toast from "react-hot-toast";
// import { FaTrashAlt } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { AiOutlineClose } from "react-icons/ai";
// import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
// import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
// import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
// import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

// import axios from "axios";
// import LoopIcon from "@mui/icons-material/Loop";

// import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
// import CustomTooltip from "@/components/common/CustomTooltip";
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// import { IconButton } from "@mui/material";

// // import metaAiAnimation from "../../../assets/animation/metaai.json";
// import metaAiAnimation from "../../assets/animation/metaai.json";

// import Lottie from "lottie-react";

// export default function CannedMessageManager() {

//   const [isOpen, setIsOpen] = useState(false);
//   const [aiPrompt, setAiPrompt] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [aiSuggestion, setAiSuggestion] = useState("");
//   const [isTypingDone, setIsTypingDone] = useState(true);
//   const [hasInserted, setHasInserted] = useState(false);
//   const [typingKey, setTypingKey] = useState(0);
//   const [generationCount, setGenerationCount] = useState(0);
//   const [search, setSearch] = useState("");

//   const TypingText = ({ text, onDone }) => {
//     const [displayed, setDisplayed] = useState("");

//     useEffect(() => {
//       let index = 0;
//       const interval = setInterval(() => {
//         setDisplayed((prev) => prev + text[index]);
//         index++;
//         if (index >= text.length) {
//           clearInterval(interval);
//           onDone?.();
//         }
//       }, 20);
//       return () => clearInterval(interval);
//     }, [text]);

//     return (
//       <pre className="whitespace-pre-wrap text-sm text-gray-800">
//         {displayed}
//       </pre>
//     );
//   };

//   const handleGenerate = async () => {
//     if (!aiPrompt.trim()) return;

//     setIsGenerating(true);
//     setAiSuggestion("");
//     setIsTypingDone(false);
//     setHasInserted(false);
//     setGenerationCount((prev) => prev + 1);

//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-3.5-turbo",
//           messages: [
//             { role: "system", content: "You are a helpful assistant." },
//             { role: "user", content: aiPrompt },
//           ],
//           max_tokens: 1024,
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_OPENAI_API_KEY
//               }`,
//           },
//         }
//       );

//       const text = response.data.choices?.[0]?.message?.content || "";

//       // setForm((prev) => ({
//       //   ...prev,
//       //   textBody: text,
//       // }));

//       setAiSuggestion(text);
//       setTypingKey((prev) => prev + 1);
//       setIsTypingDone(true);
//       // setHasInserted(true);
//     } catch (err) {
//       console.error(
//         "Error generating content:",
//         err.response?.data || err.message
//       );
//       toast.error(
//         "Failed to generate AI response. Please check your API key and usage."
//       );
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const closePanel = () => {
//     setIsOpen(false);
//     setAiPrompt("");
//     setAiSuggestion("");
//     setIsTypingDone(true);
//     setIsGenerating(false);
//     setHasInserted(false);
//     setTypingKey(0);
//     setGenerationCount(0);
//   };


//   const [messages, setMessages] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [form, setForm] = useState({
//     cannedMessageName: "",
//     textBody: "",
//   });

//   const [deleteDropdown, setDeleteDropdown] = useState(null);

//   const fetchMessages = async () => {
//     try {
//       const res = await getAllCannedMessages();
//       // setMessages(res || []);
//       setMessages(Array.isArray(res.data) ? res.data : []);
//     } catch (error) {
//       toast.error("Failed to fetch canned messages. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const [editSrNo, setEditSrNo] = useState(null);

//   const handleEdit = (msg) => {
//     setForm({
//       cannedMessageName: msg.cannedMessageName,
//       textBody: msg.textBody,
//     });
//     setEditSrNo(msg.srNo);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.cannedMessageName.trim()) {
//       toast.error("Canned Message Name is required.");
//       return;
//     }

//     if (!form.textBody.trim()) {
//       toast.error("Message Content is required.");
//       return;
//     }

//     setIsFetching(true);
//     try {
//       const payload = {
//         ...form,
//         ...(editSrNo ? { srNo: editSrNo } : {}),
//       };
//       const response = await saveCannedMessage(payload);
//       if (response.status === false) {
//         toast.error(
//           response.message || "Failed to add canned message. Please try again."
//         );
//         return;
//       }
//       if (response.status) {
//         toast.success(editSrNo ? "Message updated!" : "Message added!");
//         setForm({ cannedMessageName: "", textBody: "" });
//         setEditSrNo(null);
//         fetchMessages();
//       } else {
//         toast.error(response.message || "Failed to save message.");
//       }
//     } catch (error) {
//       toast.error("Failed to add canned message. Please try again.");
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const handleDelete = async (srNo) => {
//     try {
//       const response = await deleteCannedMessageBySrNo(srNo);
//       if (response.status === false) {
//         toast.error(
//           response.message ||
//           "Failed to delete canned message. Please try again."
//         );
//         return;
//       }
//       toast.success("Canned message deleted successfully!");
//       fetchMessages();
//     } catch (error) {
//       toast.error("Failed to delete canned message. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-[90vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 rounded-2xl">
//       <div className="max-w-full mx-12 space-y-8">

//         <div className="flex flex-col items-center justify-center w-full">
//           <h2 className="text-2xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
//             <span>Manage Canned Messages</span>
//           </h2>
//           <p className="text-sm text-gray-600 text-center mt-2 text-wrap ">
//             Easily create, manage, and organize pre-saved messages to enhance your
//             live chat experience. <br /> Use canned messages to respond quickly
//             and professionally, ensuring customer satisfaction and efficient
//             communication.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8 border-2 border-gray-200 bg-white/80 p-4 rounded-2xl shadow-xl">
//           {/* Form to Add Canned Message */}
//           <div
//             className="space-y-4 p-4 border-r-2 border-gray-100 lg:w-1/2 bg-white/90 rounded-xl shadow-sm"
//           >
//             {/* <div className="space-y-2"> */}
//             <div className="flex items-center gap-2 mb-2 justify-center">
//               <EditNoteOutlinedIcon className="text-indigo-400" />
//               <span className="text-lg font-semibold text-gray-700">Add / Edit Canned Message</span>
//             </div>
//             <InputField
//               label="Canned Message Name"
//               tooltipContent="Enter a label for the canned message"
//               placeholder="Message Label"
//               value={form.cannedMessageName}
//               onChange={(e) =>
//                 setForm({ ...form, cannedMessageName: e.target.value })
//               }
//               className="border p-2 w-full"
//             />

//             <div className="relative">
//               <UniversalTextArea
//                 label="Message Content"
//                 tooltipContent="Enter the content of the canned message"
//                 placeholder="Message Content"
//                 value={form.textBody}
//                 onChange={(e) => setForm({ ...form, textBody: e.target.value })}
//                 className="border p-2 w-full h-70"
//               />
//               <div className="absolute top-9 right-3 cursor-pointer">
//                 <CustomEmojiPicker
//                   onSelect={(emoji) =>
//                     setForm({ ...form, textBody: form.textBody + emoji })
//                   }
//                   position="bottom"
//                 />
//               </div>
//               <CustomTooltip title="Generate With AI" arrow placement="top">
//                 <button
//                   onClick={() => setIsOpen(true)}
//                   className="absolute right-3 bottom-3 w-8 h-8 rounded-full flex items-center justify-center z-0 cursor-pointer"
//                 >
//                   <Lottie
//                     animationData={metaAiAnimation}
//                     loop
//                     autoplay
//                     style={{ width: "48px", height: "48px" }}
//                   />
//                 </button>
//               </CustomTooltip>
//             </div>
//             <div className="w-full mb-4 relative">
//               <AnimatePresence>
//                 {isOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 30 }}
//                     className="absolute top-full left-0 w-full mt-4 p-4 bg-white border rounded-xl shadow-lg z-50 space-y-4"
//                   >
//                     <div className="flex justify-between items-center">
//                       <p className=" text-violet-700 font-medium">
//                         Ask AI to Generate Template <AutoAwesomeIcon />
//                       </p>
//                       <IconButton
//                         onClick={closePanel}
//                         sx={{ padding: "3px", fontSize: "18px" }}
//                       >
//                         <AiOutlineClose className="text-gray-500 hover:text-red-500 cursor-pointer" />
//                       </IconButton>
//                     </div>

//                     <div className="flex items-center justify-center relative">
//                       <input
//                         type="text"
//                         className="w-full p-2 border rounded-md text-sm pr-11"
//                         placeholder="e.g. Generate a welcome message for a food bot"
//                         value={aiPrompt}
//                         onChange={(e) => setAiPrompt(e.target.value)}
//                       />

//                       <button
//                         onClick={handleGenerate}
//                         disabled={isGenerating}
//                         className=" cursor-pointer absolute right-0 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
//                       >
//                         {isGenerating ? (
//                           <LoopIcon className="animate-spin text-indigo-800" />
//                         ) : (
//                           <AutoFixHighOutlinedIcon className=" text-indigo-800" />
//                         )}
//                       </button>
//                     </div>

//                     <div className="min-h-[60px] bg-gray-100 p-3 rounded-md border">
//                       {isGenerating ? (
//                         <div className="flex flex-col gap-2">
//                           <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
//                           <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
//                           <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
//                           <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
//                         </div>
//                       ) : aiSuggestion && !hasInserted ? (
//                         <TypingText
//                           key={aiSuggestion}
//                           text={aiSuggestion}
//                           onDone={() => setIsTypingDone(true)}
//                         />
//                       ) : aiSuggestion ? (
//                         <pre className="whitespace-pre-wrap text-sm text-gray-800">
//                           {aiSuggestion}
//                         </pre>
//                       ) : (
//                         <p className="text-sm text-gray-400">
//                           AI response will appear here.
//                         </p>
//                       )}
//                     </div>

//                     {isTypingDone && aiSuggestion && !hasInserted && (
//                       <div className="flex items-center justify-center">
//                         <button
//                           className="text-sm text-indigo-600 hover:underline cursor-pointer"
//                           onClick={() => {
//                             setForm((prev) => ({
//                               ...prev,
//                               textBody: aiSuggestion,
//                             }));
//                             setHasInserted(true);
//                           }}
//                         >
//                           <FileUploadOutlinedIcon /> Insert into Message Content
//                         </button>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//             <div className="flex items-center justify-center">
//               <UniversalButton
//                 id="cannedMessageSubmitBtn"
//                 name="cannedMessageSubmitBtn"
//                 label={isFetching ? (editSrNo ? "Updating..." : "Adding...") : (editSrNo ? "Update Message" : "Add Message")}
//                 variant="primary"
//                 disabled={isFetching}
//                 type="submit"
//                 onClick={handleSubmit}
//               />
//               {editSrNo && (
//                 <button
//                   className="ml-4 text-xs text-gray-500 underline cursor-pointer"
//                   onClick={() => {
//                     setEditSrNo(null);
//                     setForm({ cannedMessageName: "", textBody: "" });
//                   }}
//                 >
//                   Cancel Edit
//                 </button>
//               )}
//             </div>
//             {/* </div> */}
//           </div>

//           {/* Divider */}
//           <div className="hidden lg:flex flex-col items-center justify-center px-2">
//             <div className="h-full w-1 bg-gradient-to-b from-indigo-100 via-indigo-300 to-indigo-100 rounded-full" />
//           </div>

//           {/* List of Canned Messages */}
//           <div className="lg:w-1/2 flex flex-col space-y-4 p-4 border-r-2 border-gray-100 bg-white/90 rounded-xl shadow-sm">
//             <div className="flex items-center gap-2 mb-4 justify-center">
//               <ChatOutlinedIcon className="text-indigo-400" />
//               <span className="text-lg font-semibold text-gray-700">Your Canned Messages</span>
//             </div>
//             {/* Search Bar */}
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Search canned messages..."
//                 className="border border-gray-300 rounded-lg px-2 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-120 overflow-y-auto p-1">
//               {messages.length === 0 ? (
//                 <div className="col-span-2 flex flex-col items-center justify-center h-full w-full py-12">
//                   <DriveFileRenameOutlineOutlinedIcon
//                     className="animate-bounce text-indigo-500"
//                     style={{ fontSize: 80 }}
//                   />
//                   <h3 className="text-lg font-semibold text-gray-700 mt-4">No Canned Messages Yet</h3>
//                   <p className="text-gray-500 text-center mt-2 max-w-xs text-sm">
//                     You haven&apos;t added any canned messages. Use the form on the left to create your first quick reply and boost your chat productivity!
//                   </p>
//                 </div>
//               ) : (
//                 messages
//                   .filter(
//                     msg =>
//                       msg.cannedMessageName.toLowerCase().includes(search?.toLowerCase() || "") ||
//                       msg.textBody.toLowerCase().includes(search?.toLowerCase() || "")
//                   )
//                   .map((msg) => (
//                     <motion.div
//                       key={msg.srNo}
//                       className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-gray-200 rounded-xl shadow-md p-4 h-56  overflow-scroll"
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {/* Message Content */}
//                       <div>
//                         <h3 className="text-sm font-semibold text-gray-800">
//                           {msg.cannedMessageName}
//                         </h3>
//                         <pre className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
//                           {msg.textBody}
//                         </pre>
//                       </div>

//                       <div className="flex items-center justify-center absolute top-1 right-2">
//                         <button
//                           onClick={() => handleEdit(msg)}
//                           className="text-blue-500 hover:text-blue-600 transition cursor-pointer text-sm p-1 hover:bg-gray-100 rounded-md"
//                         >
//                           <EditNoteOutlinedIcon sx={{ fontSize: "18px" }} />
//                         </button>
//                         {/* Delete Icon */}
//                         <div className="">
//                           <button
//                             onClick={() => setDeleteDropdown(msg.srNo)}
//                             className="text-red-500 hover:text-red-600 transition cursor-pointer text-sm p-1 hover:bg-gray-100 rounded-md"
//                           >
//                             <FaTrashAlt className="text-xs" />
//                           </button>
//                           {deleteDropdown === msg.srNo && (
//                             <div className="absolute top-6 right-0 bg-white border border-gray-300 rounded-md shadow-md p-2 text-sm z-50">
//                               <p className="text-gray-700 mb-2">Are you sure?</p>
//                               <div className="flex gap-2">
//                                 <button
//                                   onClick={() => {
//                                     handleDelete(msg.srNo);
//                                     setDeleteDropdown(null);
//                                   }}
//                                   className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition cursor-pointer"
//                                 >
//                                   Delete
//                                 </button>
//                                 <button
//                                   onClick={() => setDeleteDropdown(null)}
//                                   className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs hover:bg-gray-400 transition cursor-pointer"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// =================================

import React, { useEffect, useState } from "react";
import {
  getAllCannedMessages,
  saveCannedMessage,
  deleteCannedMessageBySrNo,
} from "@/apis/whatsapp/whatsapp.js";
import InputField from "@/whatsapp/components/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import UniversalButton from "@/components/common/UniversalButton";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

import axios from "axios";
import LoopIcon from "@mui/icons-material/Loop";

import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import CustomTooltip from "@/components/common/CustomTooltip";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { IconButton } from "@mui/material";

// import metaAiAnimation from "../../../assets/animation/metaai.json";
import metaAiAnimation from "../../assets/animation/metaai.json";

import Lottie from "lottie-react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";

export default function CannedMessageManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(true);
  const [hasInserted, setHasInserted] = useState(false);
  const [typingKey, setTypingKey] = useState(0);
  const [generationCount, setGenerationCount] = useState(0);
  const [search, setSearch] = useState("");
  const [style, setStyle] = useState("Normal");
  const [optimizeFor, setOptimizeFor] = useState("Click Rate");
  const [language, setLanguage] = useState("English");


  const TypingText = ({ text, onDone }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayed((prev) => prev + text[index]);
        index++;
        if (index >= text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, 20);
      return () => clearInterval(interval);
    }, [text]);

    return (
      <pre className="whitespace-pre-wrap text-sm text-gray-800">
        {displayed}
      </pre>
    );
  };

  const buildPrompt = (userPrompt, style, optimizeFor, language) => {
    return `
  You are an expert marketing AI that writes engaging marketing and promotional message templates.
  
  Style: ${style}
  Optimization Goal: ${optimizeFor}
  Language: ${language}
  
  Task: ${userPrompt}
  
  Write the message as a short marketing template message in ${language}, with a clear CTA if applicable.
   Make it mobile friendly. Make sure it is grammatically correct and clear.
  `.trim();
  };
  // Write the message as a short marketing template message with a clear CTA if applicable.

  const prompt = buildPrompt(aiPrompt, style, optimizeFor, language);

  const validatePrompt = (text) => {
    const invalidKeywords = [
      "weather",
      "news",
      "who is",
      "tell me about",
      "code",
      "python",
    ];
    return !invalidKeywords.some((word) => text.toLowerCase().includes(word));
  };

  const handleGenerate = async () => {
    if (!validatePrompt(aiPrompt)) {
      toast.error("This AI is only for generating marketing messages.");
      return;
    }

    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    setAiSuggestion("");
    setIsTypingDone(false);
    setHasInserted(false);
    setGenerationCount((prev) => prev + 1);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            // { role: "system", content: "You are a helpful assistant." },
            {
              role: "system",
              content: `
          You are an AI assistant for marketing and promotional messages.
          Your only job is to help users write short, engaging marketing and promotional messages for campaigns.
          
          If the user asks anything unrelated (like news, jokes, coding, poems), reply:
          "I'm designed only to help you write marketing and promotional messages. Please input a product or offer."
              `.trim(),
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 1024,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_OPENAI_API_KEY
              }`,
          },
        }
      );

      const text = response.data.choices?.[0]?.message?.content || "";

      // setForm((prev) => ({
      //   ...prev,
      //   textBody: text,
      // }));

      setAiSuggestion(text);
      setTypingKey((prev) => prev + 1);
      setIsTypingDone(true);
      // setHasInserted(true);
    } catch (err) {
      console.error(
        "Error generating content:",
        err.response?.data || err.message
      );
      toast.error(
        "Failed to generate AI response. Please check your API key and usage."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const closePanel = () => {
    setIsOpen(false);
    setAiPrompt("");
    setAiSuggestion("");
    setIsTypingDone(true);
    setIsGenerating(false);
    setHasInserted(false);
    setTypingKey(0);
    setGenerationCount(0);
  };

  // const [messages, setMessages] = useState([
  //   {
  //     srNo: 1,
  //     cannedMessageName: "Welcome",
  //     textBody:
  //       "Hello! Welcome to our service. We are delighted to have you on board. If you have any questions or need assistance, feel free to reach out. Our team is here to ensure your experience is smooth and enjoyable. Thank you for choosing us!",
  //   },
  //   {
  //     srNo: 2,
  //     cannedMessageName: "Assistance Offer",
  //     textBody:
  //       "Let us know how we can assist you today. Whether you need guidance, support, or have specific questions, we are here to help. Your satisfaction is our priority, and we aim to provide solutions tailored to your needs. Reach out anytime for assistance.",
  //   },
  //   {
  //     srNo: 3,
  //     cannedMessageName: "Product Info",
  //     textBody:
  //       "This product is one of our bestsellers and has received outstanding reviews from customers worldwide. It is designed with durability, reliability, and user satisfaction in mind. If you need more details or specifications, feel free to ask. We’re happy to help!",
  //   },
  //   {
  //     srNo: 4,
  //     cannedMessageName: "Issue Acknowledgement",
  //     textBody:
  //       "We’ve received your concern and want you to know that we’re actively looking into it. Our team is dedicated to resolving issues promptly and ensuring your satisfaction. You’ll hear back from us shortly with updates or solutions. Thank you for your patience.",
  //   },
  //   {
  //     srNo: 5,
  //     cannedMessageName: "Apology",
  //     textBody:
  //       "We sincerely apologize for the inconvenience caused. Our goal is to provide the best possible service, and we regret falling short. Rest assured, we are working diligently to resolve the issue and ensure it doesn’t happen again. Thank you for your understanding.",
  //   },
  //   {
  //     srNo: 6,
  //     cannedMessageName: "Follow-up",
  //     textBody:
  //       "Is everything working fine now? We wanted to follow up to ensure your issue has been resolved. If there’s anything else we can assist you with, please don’t hesitate to let us know. Your satisfaction is important to us, and we’re here to help.",
  //   },
  //   {
  //     srNo: 7,
  //     cannedMessageName: "Closing Message",
  //     textBody:
  //       "Thanks for choosing us! We truly appreciate your trust and support. We hope to serve you again in the near future. If you have any feedback or suggestions, feel free to share them with us. Your input helps us improve and grow.",
  //   },
  //   {
  //     srNo: 8,
  //     cannedMessageName: "Thank You",
  //     textBody:
  //       "Thank you for your patience and understanding during this process. We value your trust and are committed to providing the best service possible. If there’s anything else we can do for you, please let us know. Your satisfaction is our priority.",
  //   },
  //   {
  //     srNo: 9,
  //     cannedMessageName: "Help Prompt",
  //     textBody:
  //       "Let us know if you need help navigating the app or finding the features you’re looking for. We’re here to guide you step-by-step and ensure you make the most of our platform. Your convenience and satisfaction are important to us.",
  //   },
  //   {
  //     srNo: 10,
  //     cannedMessageName: "Account Info",
  //     textBody:
  //       "Please verify your email address to ensure quicker support and a more secure experience. This helps us locate your account details and provide personalized assistance. Your security and satisfaction are our top priorities. Thank you for your cooperation.",
  //   },
  //   {
  //     srNo: 11,
  //     cannedMessageName: "Account Info",
  //     textBody:
  //       "Please verify your email address to ensure quicker support and a more secure experience. This helps us locate your account details and provide personalized assistance. Your security and satisfaction are our top priorities. Thank you for your cooperation.",
  //   },
  //   {
  //     srNo: 12,
  //     cannedMessageName: "Account Info",
  //     textBody:
  //       "Please verify your email address to ensure quicker support and a more secure experience. This helps us locate your account details and provide personalized assistance. Your security and satisfaction are our top priorities. Thank you for your cooperation.",
  //   },
  //   {
  //     srNo: 13,
  //     cannedMessageName: "Account Info",
  //     textBody:
  //       "Please verify your email address to ensure quicker support and a more secure experience. This helps us locate your account details and provide personalized assistance. Your security and satisfaction are our top priorities. Thank you for your cooperation.",
  //   },
  //   {
  //     srNo: 14,
  //     cannedMessageName: "Account Info",
  //     textBody:
  //       "Please verify your email address to ensure quicker support and a more secure experience. This helps us locate your account details and provide personalized assistance. Your security and satisfaction are our top priorities. Thank you for your cooperation.",
  //   },
  // ]);

  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [form, setForm] = useState({
    cannedMessageName: "",
    textBody: "",
  });

  const [deleteDropdown, setDeleteDropdown] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await getAllCannedMessages();
      // setMessages(res || []);
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error("Failed to fetch canned messages. Please try again.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const [editSrNo, setEditSrNo] = useState(null);

  const handleEdit = (msg) => {
    setForm({
      cannedMessageName: msg.cannedMessageName,
      textBody: msg.textBody,
    });
    setEditSrNo(msg.srNo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.cannedMessageName.trim()) {
      toast.error("Canned Message Name is required.");
      return;
    }

    if (!form.textBody.trim()) {
      toast.error("Message Content is required.");
      return;
    }

    setIsFetching(true);
    try {
      const payload = {
        ...form,
        ...(editSrNo ? { srNo: editSrNo } : {}),
      };
      const response = await saveCannedMessage(payload);
      if (response.status === false) {
        toast.error(
          response.message || "Failed to add canned message. Please try again."
        );
        return;
      }
      if (response.status) {
        toast.success(editSrNo ? "Message updated!" : "Message added!");
        setForm({ cannedMessageName: "", textBody: "" });
        setEditSrNo(null);
        fetchMessages();
      } else {
        toast.error(response.message || "Failed to save message.");
      }
    } catch (error) {
      toast.error("Failed to add canned message. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleDelete = async (srNo) => {
    try {
      const response = await deleteCannedMessageBySrNo(srNo);
      if (response.status === false) {
        toast.error(
          response.message ||
          "Failed to delete canned message. Please try again."
        );
        return;
      }
      toast.success("Canned message deleted successfully!");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to delete canned message. Please try again.");
    }
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 rounded-2xl">
      <div className="max-w-full mx-12 space-y-8">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
            <span>Manage Canned Messages</span>
          </h2>
          <p className="text-sm text-gray-600 text-center mt-2 text-wrap ">
            Easily create, manage, and organize pre-saved messages to enhance
            your live chat experience. <br /> Use canned messages to respond
            quickly and professionally, ensuring customer satisfaction and
            efficient communication.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 border-2 border-gray-200 bg-white/80 p-4 rounded-2xl shadow-xl">
          {/* Form to Add Canned Message */}
          <div className="space-y-4 p-4 border-r-2 border-gray-100 lg:w-1/2 bg-white/90 rounded-xl shadow-sm">
            {/* <div className="space-y-2"> */}
            <div className="flex items-center gap-2 mb-2 justify-center">
              <EditNoteOutlinedIcon className="text-indigo-400" />
              <span className="text-lg font-semibold text-gray-700">
                Add / Edit Canned Message
              </span>
            </div>
            <InputField
              label="Canned Message Name"
              tooltipContent="Enter a label for the canned message"
              placeholder="Message Label"
              value={form.cannedMessageName}
              onChange={(e) =>
                setForm({ ...form, cannedMessageName: e.target.value })
              }
              className="border p-2 w-full"
            />

            <div className="relative">
              <UniversalTextArea
                label="Message Content"
                tooltipContent="Enter the content of the canned message"
                placeholder="Message Content"
                value={form.textBody}
                onChange={(e) => setForm({ ...form, textBody: e.target.value })}
                className="border p-2 w-full h-70"
              />
              <div className="absolute top-9 right-3 cursor-pointer">
                <CustomEmojiPicker
                  onSelect={(emoji) =>
                    setForm({ ...form, textBody: form.textBody + emoji })
                  }
                  position="bottom"
                />
              </div>
              <CustomTooltip title="Generate With AI" arrow placement="top">
                <button
                  onClick={() => setIsOpen(true)}
                  className="absolute right-3 bottom-3 w-8 h-8 rounded-full flex items-center justify-center z-0 cursor-pointer"
                >
                  <Lottie
                    animationData={metaAiAnimation}
                    loop
                    autoplay
                    style={{ width: "48px", height: "48px" }}
                  />
                </button>
              </CustomTooltip>
            </div>
            <div className="w-full mb-4 relative">
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    className="absolute -top-7 left-0 w-full mt-4 p-4 bg-white border rounded-3xl shadow-lg z-50"
                  >
                    <div className="space-y-4 border-2 p-2 border-dashed rounded-2xl border-[#36bae2]">
                      <div className="flex justify-between items-center">
                        <div></div>
                        <div className="flex items-center gap-2" >
                          <p className="font-semibold my-1 text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#2b40b0] to-[#36bae2]">
                            Ask AI to Generate Content
                          </p>
                          <AutoAwesomeIcon className="text-[#2b3fb0ca]" />
                        </div>
                        <IconButton
                          onClick={closePanel}
                          sx={{ padding: "3px", fontSize: "18px" }}
                        >
                          <AiOutlineClose className="text-gray-500 hover:text-gray-500 cursor-pointer" />
                        </IconButton>
                      </div>

                      <div className="flex items-center justify-center relative">
                        <textarea
                          type="text"
                          className="w-full p-2 py-3 border border-gray-200 focus:outline-none resize-none rounded-md text-sm pr-11 h-15 shadow-md"
                          placeholder="e.g. Generate a welcome message..."
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          maxLength="1000"
                        />
                        <button
                          onClick={handleGenerate}
                          disabled={isGenerating}
                          className=" cursor-pointer absolute right-0 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
                        >
                          {isGenerating ? (
                            <LoopIcon className="animate-spin text-indigo-800" />
                          ) : (
                            <AutoFixHighOutlinedIcon className=" text-indigo-800" />
                          )}
                        </button>
                      </div>
                      <div className="text-[#2b40b0] text-[0.8rem]">
                        Chars: {aiPrompt.length}/1000
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <p className="w-full font-medium text-[#2b40b0]">
                            Choose your message style :
                          </p>
                          {["Normal", "Poetic", "Exciting", "Funny", "Grammatical"].map(
                            (item) => (
                              <div
                                key={item}
                                onClick={() => setStyle(item)}
                                className={`relative px-3 py-1 rounded-full border overflow-hidden transition-colors duration-300 cursor-pointer ${style === item
                                  ? "text-white scale-105"
                                  : "bg-white text-gray-700"
                                  }`}
                              >
                                <span className="relative z-10">{item}</span>
                                <span
                                  className={`absolute inset-0 rounded-full transition-transform duration-300 ease-in-out bg-gradient-to-r from-[#2b40b0] to-[#36bae2] z-0
                                            ${style === item ? "translate-y-0" : "translate-y-full"}
                                           `}
                                  style={{
                                    transformOrigin: "bottom",
                                  }}
                                ></span>
                              </div>
                            )
                          )}
                          {/* <div className="mt-4">
                            <label className="block text-sm font-medium text-[#2b40b0] mb-1">
                              Generate in Language:
                            </label>
                            <select
                              value={language}
                              onChange={(e) => setLanguage(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option>English</option>
                              <option>Hindi</option>
                              <option>Spanish</option>
                              <option>French</option>
                              <option>German</option>
                              <option>Arabic</option>
                              <option>Gujarati</option>
                              <option>Marathi</option>
                              <option>Tamil</option>
                              <option>Telugu</option>
                            </select>
                          </div> */}
                          {/* <p className="w-full font-medium text-[#2b40b0]">
                            Choose message language :
                          </p>
                          <AnimatedDropdown
                            id="aiLanguageGenerate"
                            name="aiLanguageGenerate"
                            // label="AI Language"
                            tooltipContent="Select Language in which ai response"
                            tooltipPlacement="right"
                            placeholder="Select response language"
                            options={[
                              { value: "English", label: "English" },
                              { value: "Hindi", label: "Hindi" },
                              { value: "Spanish", label: "Spanish" },
                              { value: "French", label: "French" },
                              { value: "German", label: "German" },
                              { value: "Arabic", label: "Arabic" },
                              { value: "Gujarati", label: "Gujarati" },
                              { value: "Marathi", label: "Marathi" },
                              { value: "Tamil", label: "Tamil" },
                              { value: "Telugu", label: "Telugu" },
                            ]}
                            value={language}
                            onChange={setLanguage}
                          /> */}
                        </div>

                        {/* <div className="flex flex-wrap gap-2 text-sm mt-4">
                          <p className="w-full font-medium text-gray-600">
                            Optimize for:
                          </p>
                          {["Click Rate", "Reply Rate"].map((item) => (
                            <button
                              key={item}
                              onClick={() => setOptimizeFor(item)}
                              className={`px-3 py-1 rounded-full border ${optimizeFor === item
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-700"
                                }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div> */}
                      </div>

                      <div className="min-h-[60px] bg-gray-100 p-3 rounded-md border shadow-md border-gray-200">
                        {isGenerating ? (
                          <div className="flex flex-col gap-2">
                            <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                            <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                            <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                            {/* <div className="animate-pulse h-4 w-full bg-gray-300 rounded" /> */}
                          </div>
                        ) : aiSuggestion && !hasInserted ? (
                          <TypingText
                            key={aiSuggestion}
                            text={aiSuggestion}
                            onDone={() => setIsTypingDone(true)}
                          />
                        ) : aiSuggestion ? (
                          <pre className="whitespace-pre-wrap text-sm text-gray-800">
                            {aiSuggestion}
                          </pre>
                        ) : (
                          <p className="text-sm text-gray-400">
                            AI response will appear here.
                          </p>
                        )}
                      </div>

                      {isTypingDone && aiSuggestion && !hasInserted && (
                        <div className="flex items-center justify-center">
                          <button
                            className="text-sm text-indigo-600 hover:underline cursor-pointer"
                            onClick={() => {
                              setForm((prev) => ({
                                ...prev,
                                textBody: aiSuggestion,
                              }));
                              setHasInserted(true);
                            }}
                          >
                            <FileUploadOutlinedIcon /> Insert into Message Content
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-center">
              <UniversalButton
                id="cannedMessageSubmitBtn"
                name="cannedMessageSubmitBtn"
                label={
                  isFetching
                    ? editSrNo
                      ? "Updating..."
                      : "Adding..."
                    : editSrNo
                      ? "Update Message"
                      : "Add Message"
                }
                variant="primary"
                disabled={isFetching}
                type="submit"
                onClick={handleSubmit}
              />
              {editSrNo && (
                <button
                  className="ml-4 text-xs text-gray-500 underline cursor-pointer"
                  onClick={() => {
                    setEditSrNo(null);
                    setForm({ cannedMessageName: "", textBody: "" });
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
            {/* </div> */}
          </div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center justify-center px-2">
            <div className="h-full w-1 bg-gradient-to-b from-indigo-100 via-indigo-300 to-indigo-100 rounded-full" />
          </div>

          {/* List of Canned Messages */}
          <div className="lg:w-1/2 flex flex-col space-y-4 p-4 border-r-2 border-gray-100 bg-white/90 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <ChatOutlinedIcon className="text-indigo-400" />
              <span className="text-lg font-semibold text-gray-700">
                Your Canned Messages
              </span>
            </div>
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search canned messages..."
                className="border border-gray-300 rounded-lg px-2 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-120 overflow-y-auto p-1">
              {messages.length === 0 ? (
                <div className="col-span-2 flex flex-col items-center justify-center h-full w-full py-12">
                  <DriveFileRenameOutlineOutlinedIcon
                    className="animate-bounce text-indigo-500"
                    style={{ fontSize: 80 }}
                  />
                  <h3 className="text-lg font-semibold text-gray-700 mt-4">
                    No Canned Messages Yet
                  </h3>
                  <p className="text-gray-500 text-center mt-2 max-w-xs text-sm">
                    You haven&apos;t added any canned messages. Use the form on
                    the left to create your first quick reply and boost your
                    chat productivity!
                  </p>
                </div>
              ) : (
                messages
                  .filter(
                    (msg) =>
                      msg.cannedMessageName
                        .toLowerCase()
                        .includes(search?.toLowerCase() || "") ||
                      msg.textBody
                        .toLowerCase()
                        .includes(search?.toLowerCase() || "")
                  )
                  .map((msg) => (
                    <motion.div
                      key={msg.srNo}
                      className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-gray-200 rounded-xl shadow-md p-4 h-56  overflow-scroll"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Message Content */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                          {msg.cannedMessageName}
                        </h3>
                        <pre className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
                          {msg.textBody}
                        </pre>
                      </div>

                      <div className="flex items-center justify-center absolute top-1 right-2">
                        <button
                          onClick={() => handleEdit(msg)}
                          className="text-blue-500 hover:text-blue-600 transition cursor-pointer text-sm p-1 hover:bg-gray-100 rounded-md"
                        >
                          <EditNoteOutlinedIcon sx={{ fontSize: "18px" }} />
                        </button>
                        {/* Delete Icon */}
                        <div className="">
                          <button
                            onClick={() => setDeleteDropdown(msg.srNo)}
                            className="text-red-500 hover:text-red-600 transition cursor-pointer text-sm p-1 hover:bg-gray-100 rounded-md"
                          >
                            <FaTrashAlt className="text-xs" />
                          </button>
                          {deleteDropdown === msg.srNo && (
                            <div className="absolute top-6 right-0 bg-white border border-gray-300 rounded-md shadow-md p-2 text-sm z-50">
                              <p className="text-gray-700 mb-2">
                                Are you sure?
                              </p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    handleDelete(msg.srNo);
                                    setDeleteDropdown(null);
                                  }}
                                  className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition cursor-pointer"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => setDeleteDropdown(null)}
                                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs hover:bg-gray-400 transition cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
