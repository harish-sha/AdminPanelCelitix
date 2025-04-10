// Harish Changes Start
// import { useEffect, useState, useRef } from "react";
// import { FiSend } from "react-icons/fi";
// import { BsJournalArrowDown, BsStars, BsThreeDotsVertical } from "react-icons/bs";
// import { MdOutlineForum } from "react-icons/md";
// import { IoArrowBack } from "react-icons/io5";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { motion, AnimatePresence } from "framer-motion";
// import AnimatedDropdown from "../components/AnimatedDropdown";
// import { getWabaList } from "../../apis/whatsapp/whatsapp";
// import {
//   BoltRounded,
//   FormatBoldOutlined,
//   FormatItalicOutlined,
//   FormatStrikethroughOutlined,
//   LocalPhoneOutlined,
//   SearchOutlined,
// } from "@mui/icons-material";
// import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
// import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
// import { SpeedDial } from "primereact/speeddial";
// import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
// import CustomEmojiPicker from "../components/CustomEmojiPicker";
// import { Sidebar } from "primereact/sidebar";
// import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
// import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
// import { Dialog } from "primereact/dialog";
// import InputField from "../components/InputField";
// import { Badge } from 'primereact/badge';
// import toast from "react-hot-toast";
// import ImagePreview from "./ImagePreview";
// import { MessageSquare } from "lucide-react";

// export default function WhatsappLiveChat() {
//   const fileInputRef = useRef(null);
//   const [visibleRight, setVisibleRight] = useState(false);
//   const [dialogVisible, setDialogVisible] = useState(false);
//   const [imagePreviewVisible, setImagePreviewVisible] = useState(false);

//   const [agentList, setAgentList] = useState([]);
//   const [agentName, setAgentname] = useState("");
//   const [groupList, setGroupList] = useState([]);
//   const [selectedAgentList, setSelectedAgentList] = useState(null);
//   const [selectedGroupList, setSelectedGroupList] = useState(null);
//   const [selectedImage, setSelectedImage] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const [chats, setChats] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       phone: "+919672670732",
//       image:
//         "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
//       messages: [
//         { text: "Hello!", sender: "John Doe" },
//         { text: "Hi there!", sender: "You" },
//       ],
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       phone: "+919672670733",
//       image:
//         "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
//       messages: [
//         { text: "Hey!", sender: "Jane Smith" },
//         { text: "What's up?", sender: "You" },
//       ],
//     },
//   ]);
//   const [activeChat, setActiveChat] = useState(null);
//   const [input, setInput] = useState("");
//   const [waba, setWaba] = useState([]);
//   const [selectedWaba, setSelectedWaba] = useState("");
//   const [btnOption, setBtnOption] = useState("active");
//   const [search, setSearch] = useState("");

//   const inputRef = useRef(null);

//   const insertEmoji = (emoji) => {
//     if (inputRef.current) {
//       const inputref = inputRef.current;
//       const start = inputref.selectionStart;
//       const end = inputref.selectionEnd;

//       const newText = input.substring(0, start) + emoji + input.substring(end);

//       setInput(newText);

//       setTimeout(() => {
//         inputref.setSelectionRange(start + emoji.length, start + emoji.length);
//         inputref.focus();
//       }, 0);
//     }
//   };

//   useEffect(() => {
//     async function fetchWaba() {
//       const res = await getWabaList();
//       setWaba(res);
//     }

//     fetchWaba();
//   }, []);

//   function deleteImages(index) {
//     setSelectedImage((prev) => {
//       const newSelectedImage = [...prev];
//       newSelectedImage.splice(index, 1);
//       return newSelectedImage;
//     });
//   }

//   const sendMessage = () => {
//     if (input.trim() || selectedImage) {
//       const updatedChats = chats.map((chat) =>
//         chat.id === activeChat.id
//           ? {
//             ...chat,
//             messages: [
//               ...chat.messages,
//               { text: selectedImage[0], sender: "You" },
//               { text: "Auto-reply: Got it!", sender: activeChat.name },
//             ],
//           }
//           : chat
//       );
//       setChats(updatedChats);
//       setActiveChat(updatedChats.find((chat) => chat.id === activeChat.id));
//       setInput("");
//       setSelectedImage("");
//     }
//   };

//   const items = [
//     {
//       label: "Attachment",
//       icon: <AttachmentOutlinedIcon />,
//       command: () => {
//         fileInputRef.current.click();
//       },
//     },
//     {
//       label: "Document",
//       icon: <FilePresentOutlinedIcon />,
//       command: () => {
//         console.log("Document Btn");
//       },
//     },
//     {
//       label: "Template",
//       icon: <BsJournalArrowDown />,
//       command: () => {
//         console.log("Template Btn");
//       },
//     },
//   ];

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + selectedImage.length > 10) {
//       toast.error("You can only upload up to 10 files.");
//       return;
//     }
//     setSelectedImage((prev) => [...prev, ...files]);
//   };

//   return (
//     <div className="flex h-[90vh] bg-gradient-to-br from-green-400 via-white to-blue-400 rounded-xl overflow-hidden shadow-lg">
//       <AnimatePresence>
//         {!selectedWaba && (
//           <motion.div
//             key="waba-selector"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.5 }}
//             className="flex flex-col items-center justify-center w-full h-[90vh] bg-gradient-to-br from-green-100 via-white to-blue-100 px-4"
//           >
//             <div className="text-center max-w-md w-full space-y-8 mb-35">
//               <div className="w-40 h-40 mx-auto">
//                 <lottie-player
//                   autoplay
//                   loop
//                   mode="normal"
//                   src='/animation/wabalivechatanimation.json'
//                   style={{ width: "100%", height: "100%" }}
//                 ></lottie-player>
//               </div>
//               <motion.h2
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-3xl font-semibold text-green-900"
//               >
//                 Ready to Manage Your Conversations?
//               </motion.h2>
//               <motion.p
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="text-gray-600 text-sm"
//               >
//                 Choose your WhatsApp Business Account to access live chats, track activity, and delight your customers.
//               </motion.p>
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="w-full max-w-sm mx-auto"
//               >
//                 <div className="relative">
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="w-full flex justify-between items-center bg-green-100 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-green-100 transition-all"
//                   >
//                     <span className="text-gray-500">
//                       {selectedWaba || "Select WABA to continue"}
//                     </span>
//                     <svg
//                       className="w-5 h-5 text-gray-500"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </button>

//                   {dropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       transition={{ duration: 0.3 }}
//                       className="absolute top-full left-0 w-full bg-white  rounded-lg shadow-lg mt-2 z-10"
//                     >
//                       <div className="max-h-40 overflow-auto">
//                         {waba.map((w, idx) => (
//                           <div
//                             key={idx}
//                             onClick={() => setSelectedWaba(w.name)}
//                             className="cursor-pointer p-2.5 border-b hover:bg-gray-100"
//                           >
//                             {w.name}
//                           </div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {selectedWaba && (
//           <motion.div
//             key="chat-list"
//             initial={{ x: "-100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "-100%" }}
//             transition={{ type: "spring", stiffness: 100 }}
//             className="w-full md:w-1/3 bg-white p-4 overflow-y-auto border-r"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">Active Users</h3>
//               <button className="text-sm text-red-500 underline" onClick={() => setSelectedWaba("")}>Change WABA</button>
//             </div>
//             {chats.length === 0 ? (
//               <div className="text-center text-gray-500 mt-20">
//                 <p>No active users found for this WABA.</p>
//               </div>
//             ) : (
//               chats.map((chat) => (
//                 <div
//                   key={chat.id}
//                   className="p-3 mb-2 rounded-lg bg-gray-100 hover:bg-blue-100 cursor-pointer transition"
//                   onClick={() => setActiveChat(chat)}
//                 >
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={chat.image}
//                       alt="avatar"
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div>
//                       <h4 className="font-semibold">{chat.name}</h4>
//                       <p className="text-sm text-gray-500 truncate">
//                         {chat.messages[chat.messages.length - 1].text}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {selectedWaba && !activeChat && (
//           <motion.div
//             key="empty-chat"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="flex-1 flex items-center justify-center bg-gray-100 rounded-r-xl"
//           >
//             <div className="text-center space-y-6">
//               <div className="flex justify-center mb-4">
//                 <div className="w-24 h-24 rounded-full bg-green-100 shadow-xl flex items-center justify-center animate-bounce">
//                   <QuestionAnswerOutlinedIcon sx={{ fontSize: "3rem" }} className="text-green-700" />
//                 </div>
//               </div>
//               <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">Welcome to Celitix LiveChat!</h2>
//               <p className="text-gray-500">Select a conversation from the left panel to start chatting.</p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {activeChat && (
//           <motion.div
//             key="chat-window"
//             initial={{ x: "100%", opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: "100%", opacity: 0 }}
//             transition={{ type: "spring", stiffness: 100 }}
//             className="flex flex-col flex-1 bg-white shadow-md"
//           >
//             <div className="flex items-center justify-between p-4 border-b">
//               <div className="flex items-center gap-3">
//                 <IoArrowBack
//                   className="md:hidden text-xl cursor-pointer"
//                   onClick={() => setActiveChat(null)}
//                 />
//                 <img
//                   src={activeChat.image}
//                   alt="avatar"
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <h4 className="font-semibold text-gray-700">
//                   {activeChat.name}
//                 </h4>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-2">
//               {activeChat.messages.map((msg, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   className={`p-2 rounded-lg max-w-xs ${msg.sender === "You"
//                     ? "bg-blue-500 text-white self-end"
//                     : "bg-gray-200 text-black self-start"}`}
//                 >
//                   {msg.text}
//                 </motion.div>
//               ))}
//             </div>

//             <div className="p-4 border-t flex items-center gap-2">
//               <CustomEmojiPicker position="top" onSelect={insertEmoji} />
//               <input
//                 ref={inputRef}
//                 type="text"
//                 placeholder="Type a message..."
//                 className="flex-1 p-2 border rounded-lg focus:outline-none"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               />
//               <button
//                 onClick={sendMessage}
//                 className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 <FiSend />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// Harish Changes End

import { useEffect, useState, useRef, useCallback } from "react";
import { FiSend } from "react-icons/fi";
import { BsJournalArrowDown, BsThreeDotsVertical } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AnimatedDropdown from "../components/AnimatedDropdown";
import { FaReply } from "react-icons/fa6";
import {
  assignUserToAgent,
  downloadAttachment,
  fetchAllConversations,
  fetchSpecificConversations,
  getWabaList,
  getWabaShowGroupsList,
  getWabaTemplate,
  getWabaTemplateDetails,
  loadNewChat,
  readMessage,
  sendInputMessageToUser,
  sendMessageToUser,
  sendTemplateMessageToUser,
  uploadImageFile,
} from "../../apis/whatsapp/whatsapp";
import {
  BoltRounded,
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
  LocalPhoneOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import { SpeedDial } from "primereact/speeddial";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import CustomEmojiPicker from "../components/CustomEmojiPicker";
import { Sidebar } from "primereact/sidebar";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { Dialog } from "primereact/dialog";
import InputField from "../components/InputField";
import toast from "react-hot-toast";
import ImagePreview from "./ImagePreview";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { fetchAllAgents } from "@/apis/rcs/rcs";
import UniversalButton from "../components/UniversalButton";
import { RadioButton } from "primereact/radiobutton";
import Loader from "../components/Loader";
import { TemplatePreview } from "./component/TemplatePreview";
import dayjs from "dayjs";
import { getAgentList } from "@/apis/Agent/Agent";
import { Variables } from "./component/Variables";
import { Tooltip } from "primereact/tooltip";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

import { motion, AnimatePresence } from "framer-motion";

import UniversalSkeleton from "@/components/common/UniversalSkeleton";

export default function WhatsappLiveChat() {
  const fileInputRef = useRef(null);
  const [visibleRight, setVisibleRight] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);

  const [agentList, setAgentList] = useState([]);
  const [agentName, setAgentname] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [selectedAgentList, setSelectedAgentList] = useState(null);
  const [selectedGroupList, setSelectedGroupList] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [input, setInput] = useState("");
  const [waba, setWaba] = useState([]);
  const [selectedWaba, setSelectedWaba] = useState("");
  const [btnOption, setBtnOption] = useState("active");
  const [search, setSearch] = useState("");

  const [allConvo, setAllConvo] = useState([]);
  const [specificConversation, setSpecificConversation] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  const [sendMessageDialogVisible, setSendMessageDialogVisible] =
    useState(false);
  const [messageType, setMessageType] = useState("template");
  const [allTemplated, setAllTemplated] = useState([]);
  const [sendmessageData, setSendMessageData] = useState({});
  const [templateDetails, setTemplateDetails] = useState("");
  const [templateType, setTemplateType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [varLength, setVarLength] = useState(0);
  const [btnVarLength, setBtnVarLength] = useState(0);
  const [latestMessageData, setLatestMessageData] = useState({
    srno: "",
    replayTime: "",
  });

  const [variables, setVariables] = useState([]);

  const [btnVariables, setBtnVariables] = useState("");

  const [replyData, setReplyData] = useState("");
  const [isReply, setIsReply] = useState(false);

  const inputRef = useRef(null);
  const messageRef = useRef(null);

  const insertEmoji = (emoji) => {
    if (inputRef.current) {
      const inputref = inputRef.current;
      const start = inputref.selectionStart;
      const end = inputref.selectionEnd;

      const newText = input.substring(0, start) + emoji + input.substring(end);

      setInput(newText);

      setTimeout(() => {
        inputref.setSelectionRange(start + emoji.length, start + emoji.length);
        inputref.focus();
      }, 0);
    }
  };

  useEffect(() => {
    async function fetchWaba() {
      const res = await getWabaList();
      setWaba(res);
    }

    fetchWaba();
  }, []);

  function deleteImages(index) {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // setSelectedImage((prev) => {
    //   const newSelectedImage = [...prev];
    //   newSelectedImage.splice(index, 1);
    //   return newSelectedImage;
    // });
    setSelectedImage(null);
  }

  const sendMessage = async () => {
    // if (input.trim() || selectedImage) {
    //   const updatedChats = chats?.map((chat) =>
    //     chat.id === activeChat.id
    //       ? {
    //           ...chat,
    //           messages: [
    //             ...chat.messages,
    //             { text: selectedImage[0], sender: "You" },
    //             { text: "Auto-reply: Got it!", sender: activeChat.name },
    //           ],
    //         }
    //       : chat
    //   );
    //   setChats(updatedChats);
    //   setActiveChat(updatedChats.find((chat) => chat.id === activeChat.id));
    //   setInput("");
    //   setSelectedImage("");
    // }

    // console.log(isReply);
    // console.log(replyData);

    const fileType = selectedImage?.type?.split("/")[0];

    let replyType = "";

    switch (fileType) {
      case "image":
        replyType = "image";
        break;
      case "video":
        replyType = "video";
        break;
      case "audio":
        replyType = "audio";
        break;
      case "sticker":
        replyType = "sticker";
        break;
      default:
        replyType = "text";
        break;
    }

    const wabaSrno = waba.find(
      (waba) => waba.mobileNo === selectedWaba
    )?.wabaSrno;

    const data = {
      mobile: activeChat?.mobileNo,
      wabaNumber: selectedWaba,
      srno: activeChat?.srno,
      message: input,
      contactName: activeChat?.contectName || "",
      replyType: isReply ? "" : replyType,
      replyFrom: "user",
      wabaSrNo: wabaSrno,
    };

    let body = {};
    if (isReply && input.trim()) {
      body = {
        messaging_product: "whatsapp",
        context: {
          message_id: replyData?.receiptNo,
        },
        to: activeChat?.mobileNo,
        type: "text",
        text: {
          preview_url: "False",
          body: input,
        },
      };
      console.log(body);
    } else if (selectedImage) {
      const imageData = await uploadImageFile(selectedImage);

      body = {
        messaging_product: "whatsapp",
        to: activeChat?.mobileNo,
        type: replyType,
        [replyType]: {
          caption: input || "",
          link: imageData?.fileUrl,
        },
      };
    }

    try {
      setInput("");
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      const res = await sendInputMessageToUser(data, body);
      if (res?.status !== "success") {
        return toast.error("Error sending message");
      }
      setIsReply(false);
      await handleFetchSpecificConversation();
    } catch (e) {
      console.log("Error Sending Message");
      return;
    }

    // if (input.trim()) {
    //   try {
    //     setInput("");
    //     const res = await sendInputMessageToUser(data, body);
    //     if (res?.status !== "success") {
    //       return toast.error("Error sending message");
    //     }
    //     await handleFetchSpecificConversation();
    //   } catch (e) {
    //     console.log(e);
    //     return toast.error("Error sending message");
    //   }
    // } else if (selectedImage) {
    //   const imageData = await uploadImageFile(selectedImage[0]);

    //   body = {
    //     messaging_product: "whatsapp",
    //     to: activeChat?.srno,
    //     type: "image",
    //     image: {
    //       caption: input || "",
    //       link: imageData?.fileUrl,
    //     },
    //   };
    // }
  };

  const items = [
    {
      label: "Attachment",
      icon: <AttachmentOutlinedIcon />,
      command: () => {
        fileInputRef.current.click();
      },
    },
    {
      label: "Document",
      icon: <FilePresentOutlinedIcon />,
      command: () => {
        console.log("Document Btn");
      },
    },
    {
      label: "Template",
      icon: <BsJournalArrowDown />,
      command: () => {
        setSendMessageDialogVisible(true);
      },
    },
  ];

  async function handleFetchAllConvo() {
    if (!selectedWaba) return;
    if (!btnOption) return;
    const userActive = btnOption == "active" ? 1 : 0;
    try {
      const data = {
        mobileNo: selectedWaba,
        srno: 0,
        active: userActive,
        search,
      };
      // setIsFetching(true);
      const res = await fetchAllConversations(data);

      if (!res.conversationEntityList[0]) {
        return;
      }

      const mappedConversations = res.conversationEntityList?.map((chat) => {
        const unread = res.unreadCounts.find(
          (unreadChat) => unreadChat.mobile === chat.mobileNo
        );
        return {
          ...chat,
          unreadCount: unread ? unread.unreadCount : 0,
        };
      });
      setAllConvo(mappedConversations);
    } catch (e) {
      console.log(e);
      return toast.error("Error fetching all conversations");
    } finally {
      // setIsFetching(false);
    }
  }

  function handleSearch() {
    handleFetchAllConvo();
    setActiveChat(null);
  }

  useEffect(() => {
    const intervalid = setInterval(() => {
      handleFetchAllConvo();
    }, 500);

    return () => clearInterval(intervalid);
  }, [selectedWaba, btnOption]);

  useEffect(() => {
    setActiveChat(null);
    setAllConvo([]);
  }, [selectedWaba, btnOption]);

  async function handleFetchAllTemplates() {
    if (!selectedWaba) {
      return;
    }
    try {
      const res = await getWabaTemplateDetails(selectedWaba);
      setAllTemplated(res);
    } catch (e) {
      console.log(e);
      return toast.error("Error fetching all templates");
    }
  }
  useEffect(() => {
    handleFetchAllTemplates();
  }, [sendMessageDialogVisible === true]);

  const handleFileChange = async (e) => {
    // const filesUrl = [];
    // const files = Array.from(e.target.files);
    // try {
    //   files.forEach(async (file) => {
    //     const res = await uploadImageFile(file);
    //     // filesUrl.push(res);
    //     console.log(res);
    //   });
    // } catch (e) {
    //   console.log(e);
    //   return toast.error("Error uploading file");
    // }

    // if (files.length + selectedImage.length > 10) {
    //   toast.error("You can only upload up to 10 files.");
    //   return;
    // }
    // setSelectedImage((prev) => [...prev, ...files]);

    const files = e.target.files[0];
    setSelectedImage(files);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  async function handleFetchSpecificConversation() {
    const payload = {
      mobileNo: activeChat?.mobileNo,
      wabaMobile: activeChat?.wabaNumber,
      chatNo: 0,
    };

    try {
      const res = await fetchSpecificConversations(payload);
      const messages = [...(res?.conversationEntityList || [])].reverse();

      setLatestMessageData({
        srno: res?.conversationEntityList[0]?.srno,
        replayTime: res?.conversationEntityList[0]?.replyTime,
      });

      const enrichedMessages = await Promise.all(
        messages.map(async (msg) => {
          let mediaPath = null;

          if (msg.isReceived && msg?.replyType === "image") {
            try {
              mediaPath = await downloadAttachment({
                waba: selectedWaba,
                id: msg.mediaId,
                conversionSrno: msg.srno,
              });
            } catch (err) {
              console.error(`Failed to fetch media for srno ${msg.srno}`, err);
            }
          } else {
            mediaPath = msg.mediaPath;
          }

          return {
            ...msg,
            date: dayjs(msg.replyTime).format("YYYY-MM-DD"),
            mediaPath,
            // mediaPath: mediaPath?.msg || "/default-avatar.jpg",
          };
        })
      );

      // Group messages by date
      const grouped = enrichedMessages.reduce((acc, msg) => {
        if (!acc[msg.date]) {
          acc[msg.date] = [];
        }
        acc[msg.date].push(msg);
        return acc;
      }, {});

      const groupedArray = Object.entries(grouped).map(([date, messages]) => ({
        date,
        messages,
      }));

      setSpecificConversation(groupedArray);
    } catch (e) {
      console.error("Error in handleFetchSpecificConversation:", e);
      toast.error("Error fetching specific conversation");
    }
  }

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [activeChat, specificConversation]);

  useEffect(() => {
    handleFetchSpecificConversation();
  }, [activeChat]);

  useEffect(() => {
    async function handleFetchAllAgent() {
      try {
        const res = await getAgentList();
        setAgentList(res);
      } catch (e) {
        console.log(e);
      }
    }
    async function handleFetchAllGroup() {
      try {
        const res = await getWabaShowGroupsList();
        setGroupList(res);
      } catch (e) {
        console.log(e);
      }
    }

    handleFetchAllAgent();
    handleFetchAllGroup();
  }, []);

  async function handleAssignAgent() {
    if (!selectedAgentList) {
      return toast.error("Please select agent");
    }
    if (!agentName) {
      return toast.error("Please select agent display name");
    }
    if (!selectedGroupList) {
      return toast.error("Please select group");
    }
    if (!activeChat.mobileNo) {
      return toast.error("Please select chat first");
    }

    const data = {
      waba: selectedWaba,
      name: agentName,
      agentSrno: selectedAgentList,
      groupNo: selectedGroupList,
      mobileNo: activeChat.mobileNo,
    };

    try {
      setIsFetching(true);
      const res = await assignUserToAgent(data);
      if (res.message.includes("Successfully")) {
        toast.success("Agent assigned successfully.");
        setDialogVisible(false);
        setSelectedAgentList("");
        setSelectedGroupList("");
        setAgentname("");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsFetching(false);
    }
  }

  async function handlesendMessage() {
    if (!activeChat) {
      return toast.error("Please select chat first");
    }

    if (messageType === "text" && !sendmessageData.message) {
      return toast.error("Please enter message");
    }

    const wabaSrno = waba.find(
      (waba) => waba.mobileNo === selectedWaba
    ).wabaSrno;

    let data = {};
    let func = "";
    if (messageType === "text") {
      data = {
        mobile: activeChat.mobileNo,
        wabaNumber: selectedWaba,
        srno: activeChat.srno,
        message: sendmessageData.message,
        contactName: activeChat?.contectName || "",
        replyType: "text",
        replyFrom: "user",
        wabaSrNo: wabaSrno,
      };
      func = sendMessageToUser;
    } else if (messageType === "template") {
      const templateType = allTemplated.find(
        (temp) => temp.templateName === sendmessageData?.templateName
      );

      if (templateType?.type === "image") {
        return toast.error("Please Select Image first");
      }

      const allvariables = [];
      console.log(variables.length);
      if (varLength[0]?.length > 0) {
        Object.keys(variables).forEach((key) => {
          allvariables.push(variables[key]);
        });
        // if (varLength[0]?.length != variables.length) {
        //   return toast.error("Please enter all variables");
        // }
      }

      if (btnVarLength?.length > 0 && !btnVariables) {
        return toast.error("Please enter Button variables");
      }
      data = {
        srno: activeChat.srno,
        templateUrlVariable: btnVariables,
        templateType: templateType?.type,
        templateName: sendmessageData?.templateName,
        templateLanguage: "en",
        wabaNumber: selectedWaba,
        mobileno: activeChat.mobileNo,
        contactName: activeChat?.contectName || "",
        msgType: "template",
        variables: allvariables,
        mediaUrl: "",
        phoneDisplay: "",
        wabaSrNo: wabaSrno,
        agentsrno: "",
      };
      func = sendTemplateMessageToUser;
    } else {
      return toast.error("Please select valid messageType");
    }

    try {
      setIsFetching(true);
      const res = await func(data);
      if (
        res?.msg?.includes("successfully") ||
        res?.msg?.includes("Successfully")
      ) {
        toast.success("Message sent successfully.");
        setSendMessageDialogVisible(false);
        setSendMessageData({});
        setVariables([]);
        setVarLength(0);
        setTemplateDetails("");
        return;
      }
    } catch (e) {
      console.log(e);
      return toast.error("Something went wrong. Please try again.");
    } finally {
      setIsFetching(false);
    }
  }
  async function handlefetchTemplateDetails() {
    if (!sendmessageData?.templateName) {
      return;
    }
    const wabaId = waba.find(
      (waba) => waba.mobileNo === selectedWaba
    )?.wabaAccountId;
    try {
      const res = await getWabaTemplate(wabaId, sendmessageData?.templateName);
      setTemplateDetails(res.data[0]);
    } catch (e) {
      console.log(e);
      return toast.error("Error fetching template details");
    }
  }
  useEffect(() => {
    handlefetchTemplateDetails();
  }, [sendmessageData?.templateName, setSendMessageData]);

  function formatTime(dateString) {
    const date = new Date(dateString.replace(" ", "T"));

    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const timeAMPM = date.toLocaleTimeString("en-US", options);
    return timeAMPM;
  }

  function fetchVaribles() {
    if (!templateDetails) return;

    templateDetails?.components?.map((item) => {
      if (item?.type === "BODY") {
        setVarLength(item?.example?.body_text);
      }
      if (item?.type === "BUTTONS") {
        item?.buttons?.map(({ type, example }) => {
          if (type === "URL") {
            setBtnVarLength(example);
          }
        });
      }
    });
  }

  useEffect(() => {
    fetchVaribles();
  }, [templateDetails]);

  useEffect(() => {
    async function handleLoadNewChat() {
      if (!selectedWaba || !activeChat) return;

      try {
        const data = {
          mobile: activeChat.mobileNo,
          wabaNumber: selectedWaba,
          ...latestMessageData,
        };
        const res = await loadNewChat(data);
        if (res?.conversationEntityList.length === 0) {
          return;
        }
        await handleFetchSpecificConversation();
      } catch (e) {
        console.log(e);
      }
    }

    async function handleIsView() {
      if (!selectedWaba || !activeChat) return;
      try {
        const data = {
          mobile: activeChat.mobileNo,
          waba: selectedWaba,
          srno: latestMessageData.srno,
        };
        await readMessage(data);
      } catch (e) {
        console.log(e);
      }
    }
    const intervalId = setInterval(() => {
      handleLoadNewChat();
      handleIsView();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [latestMessageData, activeChat]);

  async function handleAttachmentDownload(data) {
    try {
      const mediaPath = await downloadAttachment({
        waba: selectedWaba,
        id: data.mediaId,
        conversionSrno: data.srno,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return isFetching ? (
    <Loader height="35rem" width="100%" />
  ) : (
    <div className="flex h-[100%] bg-gray-100 overflow-hidden ">
      <div
        className={`w-full md:w-100  border-r overflow-hidden ${activeChat ? "hidden md:block" : "block"
          }`}
      >
        <div>
          <div className="flex flex-col gap-2">
            <AnimatedDropdown
              id="createSelectWaba"
              name="createSelectWaba"
              label="Select WABA"
              tooltipContent="Select your whatsapp business account"
              tooltipPlacement="right"
              options={waba?.map((waba) => ({
                value: waba.mobileNo,
                label: waba.name,
              }))}
              value={selectedWaba}
              onChange={(value) => {
                setSelectedWaba(value);
                setAllConvo([]);
                setSearch("");
              }}
              placeholder="Select WABA"
            />
            <div
              id="input"
              className="flex items-center justify-center border-gray-300 rounded-lg border-1"
            >
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                className="w-full p-2 border-none rounded-2xl-lg focus:outline-hidden"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button onClick={handleSearch}>
                <SearchOutlined className="mr-2 text-gray-500" />
              </button>
            </div>
          </div>
          {selectedWaba && (
            <div className="flex justify-center p-2 mt-5 space-x-4 bg-gray-200 rounded-lg">
              <button
                onClick={() => setBtnOption("active")}
                className={`p-2 transition-all duration-300 rounded-lg ${btnOption === "active"
                  ? "bg-blue-500 text-white scale-105 shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Active
              </button>
              <button
                onClick={() => setBtnOption("close")}
                className={`p-2 transition-all duration-300 rounded-lg ${btnOption === "close"
                  ? "bg-blue-500 text-white scale-105 shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Close
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 h-[400px] overflow-y-auto">
          {allConvo
            ?.slice()
            ?.sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
            ?.map((chat, index) => (
              <div
                key={chat.srno || index}
                className={`p-3 border-b cursor-pointer select-none ${activeChat?.srno === chat.srno ? "bg-gray-300" : ""
                  }`}
                onClick={() => {
                  setActiveChat(chat);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <img
                        src={chat.image || "/default-avatar.jpg"}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-lg"></div>
                    </div>
                    <div className="ml-2">
                      {chat.contectName || chat.mobileNo}
                      <p className="text-xs truncate w-[200px]">
                        {chat?.messageBody}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-end">
                    <p className="text-xs">{formatDate(chat.insertTime)}</p>
                    {chat.unreadCount > 0 && (
                      <div className="flex items-center justify-center w-5 h-5 text-sm text-white bg-green-500 rounded-full">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Section */}

      {/* code goes here */}
      {activeChat && (
        <div className="relative flex flex-col flex-1 h-screen md:h-full">
          {/* Header */}
          <div className="z-0 flex items-center justify-between w-full bg-white shadow-md h-15">
            <div className="flex items-center space-x-2">
              <IoArrowBack
                className="text-xl cursor-pointer md:hidden"
                onClick={() => {
                  setActiveChat(null);
                  setSpecificConversation([]);
                }}
              />
              <img
                src={activeChat.image || "/default-avatar.jpg"}
                alt={activeChat.contectName}
                className="w-10 h-10 ml-2 rounded-full "
              />
              <h3 className="text-lg font-semibold">
                {activeChat.contectName || activeChat.mobileNo}
              </h3>
              <InfoOutlinedIcon
                onClick={() => {
                  setVisibleRight(true);
                }}
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </div>
            <div>
              <SupportAgentOutlinedIcon
                onClick={() => setDialogVisible(true)}
                className="mr-2 cursor-pointer"
              />
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messageRef}
            className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col md:max-h-[calc(100vh-8rem)] md:-mt-5"
          >
            {specificConversation?.map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className="my-4 text-xs text-center text-gray-500">
                  {group?.date}
                </div>

                <div className="flex flex-col items-start space-y-2">
                  {group.messages.map((msg, index) => {
                    return (
                      <div
                        key={index}
                        className={`p-2 rounded-lg max-w-[70%] my-1 w-50 ${!msg.isReceived ? "self-end" : "self-start"
                          }`}
                      >
                        {msg?.replyType === "image" && (
                          <div
                            className={`flex items-center gap-2 w-full ${!msg.isReceived ? "flex-row-reverse" : ""
                              }`}
                          >
                            <div
                              className={`p-2 ${msg?.caption
                                ? "border border-gray-300 rounded-md"
                                : ""
                                }`}
                            >
                              {msg?.isReceived ? (
                                msg?.mediaPath ? (
                                  <div>
                                    <img
                                      src={msg?.mediaPath?.msg}
                                      alt="Received Image"
                                      className="object-contain mb-2 border rounded-md pointer-events-none select-none h-48 w-48"
                                    />
                                    {msg?.caption && <p>{msg.caption}</p>}
                                  </div>
                                ) : (
                                  // <div className="mb-2 border rounded-md pointer-events-none select-none h-48 w-48 flex justify-center items-center">
                                  <button
                                    className="mb-2 border rounded-md h-48 w-48 flex justify-center items-center"
                                    onClick={() => {
                                      handleAttachmentDownload(msg);
                                    }}
                                  >
                                    <FileDownloadOutlinedIcon />
                                  </button>
                                  // </div>
                                )
                              ) : (
                                <div>
                                  <img
                                    src={msg?.mediaPath}
                                    alt="Sent Image"
                                    className="object-contain mb-2 border rounded-md pointer-events-none select-none h-48 w-48"
                                  />
                                  {msg?.caption && <p>{msg?.caption}</p>}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                setIsReply(true);
                                setReplyData(msg);
                              }}
                            >
                              <FaReply className="text-gray-500 size-3" />
                            </button>
                          </div>
                        )}

                        {msg?.replyType === "video" && (
                          <div
                            className={`p-2 ${msg?.caption
                              ? "border border-gray-300 rounded-md"
                              : ""
                              }`}
                          >
                            {msg?.isReceived ? (
                              msg?.mediaPath ? (
                                <div
                                  className={`flex items-center gap-2 w-full ${!msg.isReceived ? "flex-row-reverse" : ""
                                    }`}
                                >
                                  <div>
                                    <video
                                      src={msg?.mediaPath?.msg}
                                      className="object-contain mb-2 border rounded-md pointer-events-none select-none h-48 w-48"
                                      controls={false}
                                      autoPlay
                                    ></video>
                                    {msg?.caption && <p>{msg.caption}</p>}
                                  </div>

                                  <button
                                    onClick={() => {
                                      setIsReply(true);
                                      setReplyData(msg);
                                    }}
                                  >
                                    <FaReply className="text-gray-500 size-3" />
                                  </button>
                                </div>
                              ) : (
                                // <div className="mb-2 border rounded-md pointer-events-none select-none h-48 w-48 flex justify-center items-center">
                                <button
                                  className="mb-2 border rounded-md h-48 w-48 flex justify-center items-center"
                                  onClick={() => {
                                    handleAttachmentDownload(msg);
                                  }}
                                >
                                  <FileDownloadOutlinedIcon />
                                </button>
                                // </div>
                              )
                            ) : (
                              <div
                                className={`flex items-center gap-2 w-full ${!msg.isReceived ? "flex-row-reverse" : ""
                                  }`}
                              >
                                <div>
                                  <video
                                    src={msg?.mediaPath}
                                    className="object-contain mb-2 border rounded-md pointer-events-none select-none h-48 w-48"
                                    controls={false}
                                    autoPlay
                                  ></video>
                                  {msg?.caption && <p>{msg?.caption}</p>}
                                </div>
                                <button
                                  onClick={() => {
                                    setIsReply(true);
                                    setReplyData(msg);
                                  }}
                                >
                                  <FaReply className="text-gray-500 size-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {["text", "button"].includes(msg?.replyType) && (
                          <div
                            className={`flex items-center gap-2 w-full ${!msg.isReceived ? "flex-row-reverse" : ""
                              }`}
                          >
                            <div
                              className={`w-full border p-2 rounded-md ${!msg.isReceived
                                ? "bg-blue-500 text-white "
                                : "bg-gray-200 text-black "
                                }`}
                            >
                              {msg.messageBody}
                            </div>
                            <button
                              onClick={() => {
                                setIsReply(true);
                                setReplyData(msg);
                              }}
                            >
                              <FaReply className="text-gray-500 size-3" />
                            </button>
                          </div>
                        )}
                        <p
                          className={`mt-1 text-[0.7rem] ${!msg.isReceived ? "text-end" : "text-start"
                            }`}
                        >
                          {formatTime(msg?.insertTime)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {selectedImage && (
            <div className="flex flex-wrap gap-2 mt-2">
              {/* {selectedImage.map((file, index) => (
                <div className="relative" key={index}>
                  <button
                    onClick={() => setImagePreviewVisible(true)}
                    className="flex items-center gap-1 "
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="object-cover w-20 h-20"
                    />
                  </button>
                  <span
                    className="absolute text-red-500 cursor-pointer top-1 right-1"
                    onClick={() => deleteImages(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      / Add code to remove the image from the selectedImage
                      array
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </div>
              ))} */}

              <div className="relative">
                <button className="flex items-center gap-1 ">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt=""
                    className="object-cover w-20 h-20"
                  />
                </button>
                <span
                  className="absolute text-red-500 cursor-pointer top-1 right-1"
                  onClick={() => deleteImages("4")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            </div>
          )}

          {/* Input */}
          {btnOption === "active" ? (
            <div className="flex items-center w-full p-4 bg-white border-t mb-17 md:mb-0">
              <div className="mr-2">
                <CustomEmojiPicker position="top" onSelect={insertEmoji} />
              </div>
              <div className="relative flex items-center justify-center w-full gap-2 border rounded-lg">
                <input
                  type="text"
                  className="flex-1 w-full p-2 focus:outline-none"
                  placeholder="Type a message..."
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                {/* <button
                  onClick={sendMessage}
                  className="flex items-center justify-center text-white bg-blue-500 rounded-full h-7 w-7"
                >
                  <FiSend className="mr-1" />
                </button> */}
                <button
                  onClick={sendMessage}
                  className="flex items-center justify-center w-8 h-8 text-white transition-all bg-blue-600 rounded-full shadow-md hover:bg-blue-700 active:scale-95 md:mr-6"
                  aria-label="Send message"
                >
                  <FiSend className="w-4 h-4 mt-1 mr-1" />
                </button>
                <div>
                  <div className="hidden w-10 h-10"></div>
                </div>
                <Tooltip
                  target=".speeddial-bottom-right .p-speeddial-action"
                  position="left"
                />
                <SpeedDial
                  model={items}
                  direction="up"
                  // style={{ bottom: 5, right: 75 }}
                  buttonStyle={{
                    width: "2rem",
                    height: "2rem",
                  }}
                  className="right-19 bottom-1 speeddial-bottom-right"
                />

                <div className="items-center justify-center hidden gap-1 mr-2 md:flex">
                  <FormatBoldOutlined />
                  <FormatItalicOutlined />
                  <FormatStrikethroughOutlined />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-between w-full p-4 bg-white mb-17 md:mb-0 md:flex-row">
              <div>
                <div className="flex gap-2">
                  <AccessAlarmOutlinedIcon />
                  <p>24 Hour Window Elapsed</p>
                </div>
                <p className="text-xs">
                  The 24 Hour conversation window has elapsed. Please wait for
                  the user to initiate a chat
                </p>
              </div>
              <button
                onClick={() => {
                  setSendMessageDialogVisible(true);
                }}
                className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md"
              >
                Start Chat
                <ArrowRightAltOutlinedIcon />
              </button>
            </div>
          )}
          <Sidebar
            visible={visibleRight}
            position="right"
            onHide={() => setVisibleRight(false)}
            style={{}}
          >
            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={activeChat.image || "/default-avatar.jpg"}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <h1> {activeChat.contectName || activeChat.mobileNo}</h1>
              </div>
              <div className="flex items-center gap-2">
                <LocalPhoneOutlinedIcon />
                <p>{activeChat.mobileNo}</p>
              </div>
            </div>

            <div className="space-x-2 text-[0.9rem]">
              <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
                <p>Status</p>
                <p className="text-right">Requesting</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
                <p>Last Active</p>
                <p className="text-right">12/03/2025 10:35:35</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
                <p>Template Messages</p>
                <p className="text-right">2</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
                <p>Session Messages</p>
                <p className="text-right">2</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
                <p>Unresolved Queries</p>
                <p className="text-right">0</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
                <p>Source</p>
                <p className="text-right">IMPORTED</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
                <p>First Message</p>
                <p className="text-right">-</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
                <p>WA Conversation</p>
                <p className="text-right">Active</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
                <p>MAU Status</p>
                <p className="text-right">Active</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
                <p>Incoming</p>
                <p className="text-right">Allowed</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
                <p>Circle</p>
                <p className="text-right">Rajasthan</p>
              </div>
            </div>
          </Sidebar>
        </div>
      )}

      <Dialog
        header="Transfer Chat to Agent"
        visible={dialogVisible}
        style={{ width: "50vw" }}
        draggable={false}
        onHide={() => {
          if (!dialogVisible) return;
          setDialogVisible(false);
        }}
      >
        <div className="space-y-3">
          <AnimatedDropdown
            options={agentList?.data?.map((agent) => ({
              value: agent.sr_no,
              label: agent.name,
            }))}
            id="agentList"
            name="agentList"
            label="Agent List"
            tooltipContent="Select Agent"
            tooltipPlacement="right"
            value={selectedAgentList}
            onChange={(value) => setSelectedAgentList(value)}
            placeholder="Agent List"
          />

          <InputField
            label="Agent Display Name"
            tooltipContent="Enter Agent Name"
            id="agentname"
            name="agentname"
            type="tel"
            value={agentName}
            onChange={(e) => setAgentname(e.target.value)}
            placeholder="Enter Agent Display Name"
          />
          <AnimatedDropdown
            options={groupList?.map((group) => ({
              value: group.groupCode,
              label: group.groupName,
            }))}
            id="group"
            name="group"
            label="Group"
            tooltipContent="Select Group"
            tooltipPlacement="right"
            value={selectedGroupList}
            onChange={(value) => setSelectedGroupList(value)}
            placeholder="Group"
          />

          <UniversalButton
            id={"assignAgent"}
            name={"assignAgent"}
            label="Assign Agent"
            onClick={handleAssignAgent}
          />
        </div>
      </Dialog>

      <Dialog
        header="Send Message to User"
        visible={sendMessageDialogVisible}
        style={{ width: "50rem", height: "40rem" }}
        draggable={false}
        onHide={() => {
          setSendMessageDialogVisible(false);
          setTemplateType(templateType);
          setBtnVarLength(0);
          setVarLength(0);
          setVariables({});
          setBtnVariables("");
          setTemplateDetails({});
          setSendMessageData({});
        }}
      >
        <div className="flex flex-col justify-between h-full gap-4 p-2 md:flex-row">
          <div className="flex flex-col w-full gap-5">
            {/* <div className="flex gap-2">
              <div className="flex gap-2">
                <RadioButton
                  inputId="mesageTemplateType"
                  name="mesageTemplateType"
                  value="template"
                  onChange={(e) => {
                    setMessageType(e.target.value);
                    setSendMessageData({});
                    setTemplateDetails("");
                  }}
                  checked={messageType === "template"}
                />
                <label
                  htmlFor="mesageTemplateType"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Template
                </label>
              </div>
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="mesageTextType"
                  name="mesageTextType"
                  value="text"
                  onChange={(e) => {
                    setMessageType(e.target.value);
                    setSendMessageData({});
                    setTemplateDetails("");
                  }}
                  checked={messageType === "text"}
                />
                <label
                  htmlFor="mesageTextType"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Custom Message
                </label>
              </div>
            </div> */}
            <div>
              {messageType === "template" ? (
                <div className="flex flex-col gap-3">
                  <AnimatedDropdown
                    id="selectTemplate"
                    name="selectTemplate"
                    label="Select Template"
                    placeholder="Select Template"
                    options={allTemplated?.map((template) => ({
                      value: template.templateName,
                      label: template.templateName,
                    }))}
                    value={sendmessageData.templateName}
                    onChange={(e) => {
                      setSendMessageData((prevData) => ({
                        ...prevData,
                        templateName: e,
                      }));
                      const templateType = allTemplated?.find(
                        (template) => template.templateName === e
                      )?.type;
                      setTemplateType(templateType);
                      setBtnVarLength(0);
                      setVarLength(0);
                      setVariables({});
                      setBtnVariables("");
                      setTemplateDetails("");
                    }}
                  />

                  <Variables
                    templateType={templateType}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    varLength={varLength}
                    setVariables={setVariables}
                    variables={variables}
                    btnVariables={btnVariables}
                    btnVarLength={btnVarLength}
                    setBtnVariables={setBtnVariables}
                  />
                </div>
              ) : null}
              {/* (
                <div>
                  <InputField
                    label="Enter Message"
                    value={sendmessageData.message}
                    placeholder="Enter Message..."
                    onChange={(e) => {
                      setSendMessageData((prevData) => ({
                        ...prevData,
                        message: e.target.value,
                      }));
                    }}
                  />
                </div>
              ) */}
            </div>
            <div>
              <UniversalButton label="Send" onClick={handlesendMessage} />
            </div>
          </div>
          <div>
            <TemplatePreview
              tempDetails={templateDetails}
              messageType={messageType}
              sendmessageData={sendmessageData}
            />
          </div>
        </div>
      </Dialog>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/* video/* audio/*"
      // multiple
      />

      {imagePreviewVisible && (
        <ImagePreview
          imagePreviewVisible={imagePreviewVisible}
          setImagePreviewVisible={setImagePreviewVisible}
          images={[selectedImage]}
        />
      )}
    </div>
  );
}
