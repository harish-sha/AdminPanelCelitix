// ============================================ april 21 


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
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

import { motion, AnimatePresence } from "framer-motion";

import UniversalSkeleton from "@/components/common/UniversalSkeleton";
import { ChatScreen } from "./component/chat/ChatScreen";
import { ChatSidebar } from "./component/chat/Sidebar";
import { InputData } from "./component/InputData";
import { select } from "@material-tailwind/react";
import DropdownWithSearch from "../components/DropdownWithSearch";

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
  const [carFile, setCarFile] = useState([]);

  const [btnVariables, setBtnVariables] = useState("");

  const [replyData, setReplyData] = useState("");
  const [isReply, setIsReply] = useState(false);

  const inputRef = useRef(null);
  const messageRef = useRef(null);

  const [cardIndex, setCardIndex] = useState(0);

  function handleNextCard() {
    setCardIndex(cardIndex + 1);
  }

  function handlePreviousCard() {
    if (cardIndex === 0) return;
    setCardIndex(cardIndex - 1);
  }

  //merge related States
  const [chatState, setChatState] = useState({
    active: null,
    input: "",
    allConversations: [],
    specificConversation: [],
    latestMessage: {
      srno: "",
      replayTime: "",
    },
    replyData: "",
    isReply: false,
  });

  const [wabaState, setWabaState] = useState({
    waba: [],
    selectedWaba: "",
    wabaSrno: "",
  });

  async function fetchWaba() {
    const res = await getWabaList();
    // console.log(res);
    setWabaState((prev) => ({
      ...prev,
      waba: res,
    }));
  }
  useEffect(() => {
    fetchWaba();
  }, []);
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

    const data = {
      mobile: chatState?.active.mobileNo,
      wabaNumber: wabaState?.selectedWaba,
      srno: chatState?.active.srno,
      // message: input || "",
      contactName: chatState?.active.contectName || "",
      replyType: replyType,
      replyFrom: "user",
      wabaSrNo: wabaState?.wabaSrno,
      ...(chatState?.isReply ? {} : { message: input || "" }),
    };

    let body = {};

    if (chatState?.isReply && input) {
      body = {
        messaging_product: "whatsapp",
        context: {
          message_id: chatState?.replyData?.receiptNo,
        },
        to: chatState?.active.mobileNo,
        type: replyType,
        [replyType]: {
          preview_url: "False",
          body: input,
        },
      };

    } else if (selectedImage) {
      const imageData = await uploadImageFile(selectedImage);

      body = {
        messaging_product: "whatsapp",
        to: chatState?.active?.mobileNo,
        type: replyType,
        [replyType]: {
          caption: input || "",
          link: imageData?.fileUrl,
        },
      };
    }

    // console.log(body, data);

    try {
      setInput("");
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      const res = await sendInputMessageToUser(data, body);
      if (res?.status !== "success") {
        return toast.error("Error sending message2");
      }
      const audio = new Audio("./send-message.wav");
      audio.play().catch((e) => {
        // console.log("Audio play error:", e);
      });
      setChatState((prev) => ({
        ...prev,
        isReply: false,
        replyData: "",
        input: "",
      }));
      await handleFetchSpecificConversation();
    } catch (e) {
      // console.log(e);
      return;
    }
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
        // console.log("Document Btn");
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
    if (!wabaState?.selectedWaba) return;
    if (!btnOption) return;
    const userActive = btnOption == "active" ? 1 : 0;
    try {
      const data = {
        mobileNo: wabaState?.selectedWaba,
        srno: 0,
        active: userActive,
        search: search || "",
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
      setChatState((prev) => ({
        ...prev,
        allConversations: mappedConversations,
      }));
    } catch (e) {
      // console.log(e);
      return toast.error("Error fetching all conversations");
    } finally {
      // setIsFetching(false);
    }
  }

  function handleSearch() {
    handleFetchAllConvo();
    // setActiveChat(null);
    setChatState((prev) => ({ ...prev, active: null }));
  }

  useEffect(() => {
    handleFetchAllConvo();
    if (!wabaState?.selectedWaba) return;
    const intervalid = setInterval(() => {
      // handleFetchAllConvo();
    }, 500);

    return () => clearInterval(intervalid);
  }, [wabaState.selectedWaba, btnOption]);

  useEffect(() => {
    setChatState((prev) => ({ ...prev, active: null, allConversations: [] }));
  }, [wabaState.selectedWaba, btnOption]);

  async function handleFetchAllTemplates() {
    if (!wabaState.selectedWaba) {
      return;
    }
    try {
      const res = await getWabaTemplateDetails(wabaState.selectedWaba);
      setAllTemplated(res);
    } catch (e) {
      // console.log(e);
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
      mobileNo: chatState?.active?.mobileNo,
      wabaMobile: chatState?.active?.wabaNumber,
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

          // if (msg.isReceived && msg?.replyType === "image") {
          //   try {
          //     mediaPath = await downloadAttachment({
          //       waba: wabaState.selectedWaba,
          //       id: msg.mediaId,
          //       conversionSrno: msg.srno,
          //     });
          //   } catch (err) {
          //     console.error(`Failed to fetch media for srno ${msg.srno}`, err);
          //   }
          // } else {
          // }

          mediaPath = msg.mediaPath;
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

      // setSpecificConversation(groupedArray);
      setChatState((prev) => ({
        ...prev,
        specificConversation: groupedArray,
      }));
    } catch (e) {
      console.error("Error in handleFetchSpecificConversation:", e);
      toast.error("Error fetching specific conversation");
    }
  }

  // useEffect(() => {
  //   console.log(messageRef.current?.scrollTop);
  //   console.log(messageRef.current?.scrollHeight);
  //   if (messageRef.current) {
  //     messageRef.current.scrollTop = messageRef.current.scrollHeight;
  //   }
  // }, [chatState?.active, specificConversation]);

  useEffect(() => {
    handleFetchSpecificConversation();
  }, [chatState?.active]);

  useEffect(() => {
    async function handleFetchAllAgent() {
      try {
        const res = await getAgentList();
        setAgentList(res);
      } catch (e) {
        // console.log(e);
      }
    }
    async function handleFetchAllGroup() {
      try {
        const res = await getWabaShowGroupsList();
        setGroupList(res);
      } catch (e) {
        // console.log(e);
      }
    }

    handleFetchAllAgent();
    handleFetchAllGroup();
  }, []);

  async function handleAssignAgent() {
    if (!selectedAgentList) {
      return toast.error("Please select agent");
    }
    // if (!agentName) {
    //   return toast.error("Please select agent display name");
    // }
    if (!selectedGroupList) {
      return toast.error("Please select group");
    }
    if (!chatState?.active.mobileNo) {
      return toast.error("Please select chat first");
    }

    const data = {
      waba: wabaState.selectedWaba,
      name: agentName,
      agentSrno: selectedAgentList,
      groupNo: selectedGroupList,
      mobileNo: chatState?.active.mobileNo,
    };

    try {w
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
      // console.log(e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsFetching(false);
    }
  }

  async function handlesendMessage() {
    if (!chatState?.active) {
      return toast.error("Please select chat first");
    }

    if (messageType === "text" && !sendmessageData.message) {
      return toast.error("Please enter message");
    }

    let data = {};
    let func = "";
    if (messageType === "text") {
      data = {
        mobile: chatState?.active.mobileNo,
        wabaNumber: wabaState.selectedWaba,
        srno: chatState?.active.srno,
        message: sendmessageData.message,
        contactName: chatState?.active?.contectName || "",
        replyType: "text",
        replyFrom: "user",
        wabaSrNo: wabaState.wabaSrno,
      };
      func = sendMessageToUser;
    } else if (messageType === "template") {
      const templateType = allTemplated.find(
        (temp) => temp.templateName === sendmessageData?.templateName
      );

      if (
        ["image", "video", "document"].includes(templateType?.type) &&
        !selectedFile?.fileUrl
      ) {
        return toast.error("Please Select Media first");
      }

      const allvariables = [];
      if (varLength && varLength[0]?.length > 0) {
        Object.keys(variables).forEach((key) => {
          allvariables.push(variables[key]);
        });
        // if (varLength[0]?.length != variables.length) {
        //   return toast.error("Please enter all variables");
        // }
      }

      let imgCard = [];

      let isError = false;

      const isCaroual = templateDetails?.components?.find(
        (item) => item?.type === "CAROUSEL"
      )?.type;

      if (isCaroual) {
        Object.keys(carFile).forEach((key) => {
          if (!carFile[key].filePath) {
            toast.error(`Please upload a file for Card ${key + 1}.`);
            isError = true;
            return;
          }
          const filePath = carFile[key].filePath;
          imgCard.push(filePath);
        });

        if (isError) {
          return;
        }
      }

      if (btnVarLength?.length > 0 && !btnVariables) {
        return toast.error("Please enter Button variables");
      }
      data = {
        srno: chatState?.active.srno,
        templateUrlVariable: btnVariables,
        templateType: templateType?.type,
        templateName: sendmessageData?.templateName,
        templateLanguage: "en",
        wabaNumber: wabaState.selectedWaba,
        mobileno: chatState?.active.mobileNo,
        contactName: chatState?.active?.contectName || "",
        msgType: "template",
        variables: allvariables,
        mediaUrl: selectedFile?.fileUrl || "",
        phoneDisplay: "",
        wabaSrNo: wabaState.wabaSrno,
        agentsrno: "",
        imgCards: imgCard,
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
        setSelectedFile(null);
        return;
      }
    } catch (e) {
      // console.log(e);
      return toast.error("Something went wrong. Please try again.");
    } finally {
      setIsFetching(false);
    }
  }

  async function handlefetchTemplateDetails() {
    if (!sendmessageData?.templateName) {
      return;
    }
    const wabaId = wabaState.waba.find(
      (waba) => waba.mobileNo === wabaState.selectedWaba
    )?.wabaAccountId;
    try {
      const res = await getWabaTemplate(wabaId, sendmessageData?.templateName);
      setTemplateDetails(res.data[0]);
    } catch (e) {
      // console.log(e);
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

  async function handleLoadNewChat() {
    if (!wabaState.selectedWaba || !chatState?.active) return;

    try {
      const data = {
        mobile: chatState?.active.mobileNo,
        wabaNumber: wabaState.selectedWaba,
        ...latestMessageData,
      };
      const res = await loadNewChat(data);

      if (res?.conversationEntityList.length === 0) {
        return;
      }
      const audio = new Audio("./receive-message.mp3");
      audio.play().catch((e) => {
        // console.log("Audio play error:", e);
      });
      await handleFetchSpecificConversation();
    } catch (e) {
      // console.log(e);
    }
  }
  useEffect(() => {
    async function handleIsView() {
      if (!wabaState.selectedWaba || !chatState?.active) return;
      try {
        const data = {
          mobile: chatState?.active.mobileNo,
          waba: wabaState.selectedWaba,
          srno: latestMessageData.srno,
        };
        await readMessage(data);
      } catch (e) {
        // console.log(e);
      }
    }
    handleLoadNewChat();
    handleIsView();
    const intervalId = setInterval(() => {
      // handleLoadNewChat();
      // handleIsView();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [latestMessageData]);

  async function handleAttachmentDownload(data) {
    try {
      const mediaPath = await downloadAttachment({
        waba: wabaState.selectedWaba,
        id: data.mediaId,
        conversionSrno: data.srno,
      });
    } catch (e) {
      // console.log(e);
    }
  }

  return isFetching ? (
    <Loader height="35rem" width="100%" />
  ) : (
    <div className="flex h-[100%] bg-gray-50 rounded-lg overflow-hidden p-1 border ">
      <div
        className={`w-full md:w-100 p-1 border overflow-hidden ${chatState?.active ? "hidden md:block" : "block"
          }`}
      >
        <InputData
          setSearch={setSearch}
          search={search}
          handleSearch={handleSearch}
          btnOption={btnOption}
          setBtnOption={setBtnOption}
          wabaState={wabaState}
          setWabaState={setWabaState}
          setChatState={setChatState}
        />

        <ChatSidebar
          formatDate={formatDate}
          chatState={chatState}
          setChatState={setChatState}
        />
      </div>

      {!chatState.active && (
        <AnimatePresence>
          <motion.div
            key="empty-chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center bg-gray-100 rounded-xl border flex-1 m-1"
          >
            <div className="w-40 h-40 mx-auto">
              <lottie-player
                autoplay
                loop
                mode="normal"
                src='/animation/wabalivechatanimation.json'
                style={{ width: "100%", height: "100%" }}
              ></lottie-player>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-semibold text-green-900"
            >
              Welcome to Celitix LiveChat!
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-semibold text-green-900"
            >
              Select Your Waba Account To Proceed
            </motion.h3>

            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setWabaState((prev) => ({ ...prev, selectedWaba: "" }));
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
            >
              Select WABA Account
            </motion.button>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 mt-6 max-w-xs text-center"
            >
              Please select your WhatsApp Business Account to start managing your live chats and delight your customers.
            </motion.p> */}

            {/* <div className="text-center space-y-6">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-green-100 shadow-xl flex items-center justify-center animate-bounce">
                  <QuestionAnswerOutlinedIcon sx={{ fontSize: "3rem" }} className="text-green-700" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">Welcome to Celitix LiveChat!</h2>
              <p className="text-gray-500">Select a conversation from the left panel to start chatting.</p>
            </div> */}
          </motion.div>
        </AnimatePresence>


      )}


      {
        chatState.active && (
          <ChatScreen
            setVisibleRight={setVisibleRight}
            setDialogVisible={setDialogVisible}
            messageRef={messageRef}
            formatTime={formatTime}
            btnOption={btnOption}
            selectedImage={selectedImage}
            deleteImages={deleteImages}
            handleAttachmentDownload={handleAttachmentDownload}
            insertEmoji={insertEmoji}
            inputRef={inputRef}
            sendMessage={sendMessage}
            items={items}
            visibleRight={visibleRight}
            input={input}
            setInput={setInput}
            setSendMessageDialogVisible={setSendMessageDialogVisible}
            setChatState={setChatState}
            chatState={chatState}
          // specificConversation={specificConversation}
          />
        )
      }


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

          {/* <InputField
            label="Agent Display Name"
            tooltipContent="Enter Agent Name"
            id="agentname"
            name="agentname"
            type="tel"
            value={agentName}
            onChange={(e) => setAgentname(e.target.value)}
            placeholder="Enter Agent Display Name"
          /> */}
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
        style={{ width: "60rem", height: "40rem" }}
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
          <div className="flex flex-col w-100 gap-5">
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
                  <DropdownWithSearch
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
                    setCarFile={setCarFile}
                    carFile={carFile}
                    cardIndex={cardIndex}
                    setCardIndex={setCardIndex}
                    handleNextCard={handleNextCard}
                    handlePreviousCard={handlePreviousCard}
                    tempDetails={templateDetails}
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
              selectedImage={selectedFile}
              carFile={carFile}
              cardIndex={cardIndex}
              setCardIndex={setCardIndex}
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

      {
        imagePreviewVisible && (
          <ImagePreview
            imagePreviewVisible={imagePreviewVisible}
            setImagePreviewVisible={setImagePreviewVisible}
            images={[selectedImage]}
          />
        )
      }
    </div >
  );
}
