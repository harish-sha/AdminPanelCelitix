import { useEffect, useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { BsJournalArrowDown, BsStars, BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineForum } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedDropdown from "../components/AnimatedDropdown";
import { getWabaList } from "../../apis/whatsapp/whatsapp";
import {
  BoltRounded,
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
  LocalPhoneOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { SpeedDial } from "primereact/speeddial";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import CustomEmojiPicker from "../components/CustomEmojiPicker";
import { Sidebar } from "primereact/sidebar";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { Dialog } from "primereact/dialog";
import InputField from "../components/InputField";
import { Badge } from 'primereact/badge';
import toast from "react-hot-toast";
import ImagePreview from "./ImagePreview";
import { MessageSquare } from "lucide-react";
// import { wabaanimation } from '../../../public/animation/wabalivechatanimation.json';

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
  const [selectedImage, setSelectedImage] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+919672670732",
      image:
        "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
      messages: [
        { text: "Hello!", sender: "John Doe" },
        { text: "Hi there!", sender: "You" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+919672670733",
      image:
        "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
      messages: [
        { text: "Hey!", sender: "Jane Smith" },
        { text: "What's up?", sender: "You" },
      ],
    },
  ]);
  const [activeChat, setActiveChat] = useState(null);
  const [input, setInput] = useState("");
  const [waba, setWaba] = useState([]);
  const [selectedWaba, setSelectedWaba] = useState("");
  const [btnOption, setBtnOption] = useState("active");
  const [search, setSearch] = useState("");

  const inputRef = useRef(null);

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
    setSelectedImage((prev) => {
      const newSelectedImage = [...prev];
      newSelectedImage.splice(index, 1);
      return newSelectedImage;
    });
  }

  const sendMessage = () => {
    if (input.trim() || selectedImage) {
      const updatedChats = chats.map((chat) =>
        chat.id === activeChat.id
          ? {
            ...chat,
            messages: [
              ...chat.messages,
              { text: selectedImage[0], sender: "You" },
              { text: "Auto-reply: Got it!", sender: activeChat.name },
            ],
          }
          : chat
      );
      setChats(updatedChats);
      setActiveChat(updatedChats.find((chat) => chat.id === activeChat.id));
      setInput("");
      setSelectedImage("");
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
        console.log("Document Btn");
      },
    },
    {
      label: "Template",
      icon: <BsJournalArrowDown />,
      command: () => {
        console.log("Template Btn");
      },
    },
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Ensure total count doesn't exceed 10
    if (files.length + selectedImage.length > 10) {
      toast.error("You can only upload up to 10 files.");
      return;
    }

    // Append new files while keeping the previous ones
    setSelectedImage((prev) => [...prev, ...files]);
  };

  return (
    // <div className="flex h-[100%] bg-gray-100 overflow-hidden rounded-xl">
    //   <div
    //     className={`w-full md:w-1/3 py-2 px-1  bg-white rounded-r-xl overflow-hidden ${activeChat ? "hidden md:block" : "block"
    //       }`}
    //   >
    //     <div>
    //       <AnimatedDropdown
    //         id="createSelectWaba"
    //         name="createSelectWaba"
    //         label="Select WABA"
    //         tooltipContent="Select your whatsapp business account"
    //         tooltipPlacement="right"
    //         options={waba?.map((waba) => ({
    //           value: waba.mobileNo,
    //           label: waba.name,
    //         }))}
    //         value={selectedWaba}
    //         onChange={(value) => setSelectedWaba(value)}
    //         placeholder="Select WABA"
    //       />
    //       <div id="input" className="relative flex items-center justify-center">
    //         <input
    //           type="text"
    //           name="search"
    //           id="search"
    //           placeholder="Search"
    //           className="w-full p-2 mt-5 rounded-lg border-1 focus:outline-hidden"
    //           value={search}
    //           onChange={(e) => setSearch(e.target.value)}
    //         />
    //         <SearchOutlined className="absolute text-gray-500 right-2 top-7" />
    //       </div>
    //       <div className="flex justify-center p-2 mt-5 space-x-4 bg-gray-200 rounded-lg">
    //         <button
    //           onClick={() => setBtnOption("active")}
    //           className={`p-2 transition-all duration-300 rounded-lg ${btnOption === "active"
    //             ? "bg-blue-500 text-white scale-105 shadow-lg"
    //             : "bg-white text-gray-700 hover:bg-gray-300"
    //             }`}
    //         >
    //           Active
    //         </button>
    //         <button
    //           onClick={() => setBtnOption("close")}
    //           className={`p-2 transition-all duration-300 rounded-lg ${btnOption === "close"
    //             ? "bg-blue-500 text-white scale-105 shadow-lg"
    //             : "bg-white text-gray-700 hover:bg-gray-300"
    //             }`}
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </div>

    //     <div className="mt-4">
    //       {chats.map((chat) => (
    //         <div
    //           key={chat.id}
    //           className={`p-3 border-b cursor-pointer rounded-md select-none ${activeChat?.id === chat.id ? "bg-gray-300 shadow-xl" : ""
    //             }`}
    //           onClick={() => setActiveChat(chat)}
    //         >
    //           <div className="flex items-center justify-between ">
    //             <div className="flex items-center gap-">
    //               <div className="relative">
    //                 <img
    //                   src={chat.image}
    //                   alt=""
    //                   className="w-10 h-10 rounded-full"
    //                 />
    //                 <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-lg"></div>
    //               </div>
    //               {chat.name}
    //             </div>
    //             <div>
    //               <p className="text-xs text-gray-500 font-semibold">3:14 AM</p>
    //               <Badge value="2" severity="success" className="" ></Badge>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   {!activeChat && (
    //     <div className="flex-1 flex items-center justify-center w-full  bg-gray-300 rounded-xl">
    //       <div className="max-w-md text-center space-y-6">
    //         {/* Icon Display */}
    //         <div className="flex justify-center gap-4 mb-4">
    //           <div className="relative">
    //             <div
    //               className="w-25 h-25 rounded-2xl shadow-xl bg-gray-900 flex items-center
    //            justify-center animate-bounce "
    //             >
    //               <QuestionAnswerOutlinedIcon sx={{
    //                 fontSize: "3rem",
    //               }} className="w-13 h-13 text-green-700" />
    //             </div>
    //           </div>
    //         </div>

    //         <h2 className="text-2xl font-semibold text-gray-900 tracking-wider">Welcome to Celitix LiveChat!</h2>
    //         <p className="text-base-content/60">
    //           Select a conversation from the sidebar to start chatting
    //         </p>
    //       </div>
    //     </div>
    //   )}

    //   {activeChat && (
    //     <div className="relative flex flex-col flex-1 h-screen md:h-full">
    //       <div className="z-0 flex items-center justify-between w-full bg-white shadow-md h-15">
    //         <div className="flex items-center space-x-2">
    //           <IoArrowBack
    //             className="text-xl cursor-pointer md:hidden"
    //             onClick={() => setActiveChat(null)}
    //           />
    //           <img
    //             src={activeChat.image}
    //             alt=""
    //             className="w-10 h-10 rounded-full"
    //           />
    //           <h3 className="text-lg font-semibold">{activeChat.name}</h3>
    //           <InfoOutlinedIcon
    //             onClick={() => {
    //               setVisibleRight(true);
    //             }}
    //             sx={{
    //               fontSize: "1.2rem",
    //               color: "green",
    //             }}
    //           />
    //         </div>
    //         <div>
    //           <SupportAgentOutlinedIcon
    //             onClick={() => setDialogVisible(true)}
    //             className="mr-2 cursor-pointer"
    //           />
    //         </div>
    //       </div>

    //       <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col mt-16 mb-0 md:max-h-[calc(100vh-8rem)]">
    //         {activeChat.messages.map((msg, index) => (
    //           <div
    //             key={index}
    //             className={`p-2 rounded-lg max-w-xs ${msg.sender === "You"
    //               ? "bg-blue-500 text-white self-end"
    //               : "bg-gray-200 text-black self-start"
    //               }`}
    //           >
    //             {msg.text}
    //           </div>
    //         ))}
    //       </div>

    //       {selectedImage.length > 0 && (
    //         <div className="flex flex-wrap gap-2 mt-2">
    //           {selectedImage.map((file, index) => (
    //             <div className="relative" key={index}>
    //               <button
    //                 onClick={() => setImagePreviewVisible(true)}
    //                 className="flex items-center gap-1 "
    //               >
    //                 <img
    //                   src={URL.createObjectURL(file)}
    //                   alt=""
    //                   className="object-cover w-20 h-20"
    //                 />
    //               </button>
    //               <span
    //                 className="absolute text-red-500 cursor-pointer top-1 right-1"
    //                 onClick={() => deleteImages(index)}
    //               >
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   className="w-4 h-4"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                 >
    //                   / Add code to remove the image from the selectedImage
    //                   array
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth="2"
    //                     d="M6 18L18 6M6 6l12 12"
    //                   />
    //                 </svg>
    //               </span>
    //             </div>
    //           ))}
    //         </div>
    //       )}

    //       <div className="flex items-center w-full p-4 bg-white border-t mb-17 md:mb-0">
    //         <div className="mr-2">
    //           <CustomEmojiPicker position="top" onSelect={insertEmoji} />
    //         </div>
    //         <div className="relative w-full border rounded-lg">
    //           <input
    //             type="text"
    //             className="flex-1 md:w-[35rem] w-[14rem] p-2 focus:outline-none"
    //             placeholder="Type a message..."
    //             ref={inputRef}
    //             value={input}
    //             onChange={(e) => setInput(e.target.value)}
    //             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    //           />
    //           <button
    //             onClick={sendMessage}
    //             className="absolute p-2 ml-2 text-white bg-blue-500 rounded-lg right-2 bottom-1"
    //           >
    //             <FiSend />
    //           </button>
    //           <div>
    //             <SpeedDial
    //               model={items}
    //               direction="up"
    //               style={{ bottom: 4, right: 40 }}
    //               buttonStyle={{
    //                 width: "2rem",
    //                 height: "2rem",
    //               }}
    //             />
    //           </div>
    //           <div className="absolute items-center justify-center hidden gap-1 right-25 bottom-2 md:flex">
    //             <FormatBoldOutlined />
    //             <FormatItalicOutlined />
    //             <FormatStrikethroughOutlined />
    //           </div>
    //         </div>
    //       </div>
    //       <Sidebar
    //         visible={visibleRight}
    //         position="right"
    //         onHide={() => setVisibleRight(false)}
    //         style={{ height: "630px", position: "absolute", bottom: 0 }}
    //       >
    //         <div className="flex flex-col justify-center gap-2">
    //           <div className="flex items-center gap-2">
    //             <img
    //               src={activeChat.image}
    //               alt=""
    //               className="w-10 h-10 rounded-full"
    //             />
    //             <h1>{activeChat.name}</h1>
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <LocalPhoneOutlinedIcon />
    //             <p>{activeChat.phone}</p>
    //           </div>
    //         </div>

    //         <div className="space-x-2 text-[0.9rem]">
    //           <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
    //             <p>Status</p>
    //             <p className="text-right">Requesting</p>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
    //             <p>Last Active</p>
    //             <p className="text-right">12/03/2025 10:35:35</p>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
    //             <p>Template Messages</p>
    //             <p className="text-right">2</p>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
    //             <p>Session Messages</p>
    //             <p className="text-right">2</p>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
    //             <p>Unresolved Queries</p>
    //             <p className="text-right">0</p>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
    //             <p>Source</p>
    //             <p className="text-right">IMPORTED</p>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
    //             <p>First Message</p>
    //             <p className="text-right">-</p>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
    //             <p>WA Conversation</p>
    //             <p className="text-right">Active</p>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
    //             <p>MAU Status</p>
    //             <p className="text-right">Active</p>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
    //             <p>Incoming</p>
    //             <p className="text-right">Allowed</p>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
    //             <p>Circle</p>
    //             <p className="text-right">Rajasthan</p>
    //           </div>
    //         </div>
    //       </Sidebar>
    //     </div>
    //   )}
    //   <Dialog
    //     visible={dialogVisible}
    //     style={{ width: "50vw" }}
    //     draggable={false}
    //     onHide={() => {
    //       if (!dialogVisible) return;
    //       setDialogVisible(false);
    //     }}
    //   >
    //     <div className="space-y-3">
    //       <AnimatedDropdown
    //         options={[
    //           {
    //             value: "arIHANT1",
    //             label: "Arihant",
    //           },
    //           {
    //             value: "aRIHANT2",
    //             label: "Arihant",
    //           },
    //         ]}
    //         id="agentList"
    //         name="agentList"
    //         label="Agent List"
    //         tooltipContent="Select Agent"
    //         tooltipPlacement="right"
    //         value={selectedAgentList}
    //         onChange={(value) => setSelectedAgentList(value)}
    //         placeholder="Agent List"
    //       />

    //       <InputField
    //         label="Agent Name"
    //         tooltipContent="Enter Agent Name"
    //         id="agentname"
    //         name="agentname"
    //         type="tel"
    //         value={agentName}
    //         onChange={(e) => setAgentname(e.target.value)}
    //         placeholder="Enter Agent Name"
    //       />
    //       <AnimatedDropdown
    //         options={[
    //           {
    //             value: "arIHANT3",
    //             label: "Arihant",
    //           },
    //           {
    //             value: "aRIHANT4",
    //             label: "Arihant",
    //           },
    //         ]}
    //         id="group"
    //         name="group"
    //         label="Group"
    //         tooltipContent="Select Group"
    //         tooltipPlacement="right"
    //         value={selectedGroupList}
    //         onChange={(value) => setSelectedGroupList(value)}
    //         placeholder="Group"
    //       />
    //     </div>
    //   </Dialog>
    //   <input
    //     type="file"
    //     ref={fileInputRef}
    //     style={{ display: "none" }}
    //     onChange={handleFileChange}
    //     accept="image/*"
    //     multiple
    //   />

    //   {imagePreviewVisible && (
    //     <ImagePreview
    //       imagePreviewVisible={imagePreviewVisible}
    //       setImagePreviewVisible={setImagePreviewVisible}
    //       images={selectedImage}
    //     />
    //   )}
    // </div>
    <div className="flex h-[90vh] bg-gradient-to-br from-green-400 via-white to-blue-400 rounded-xl overflow-hidden shadow-lg">

      <AnimatePresence>
        {!selectedWaba && (
          <motion.div
            key="waba-selector"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full h-[90vh] bg-gradient-to-br from-green-100 via-white to-blue-100 px-4"
          >
            <div className="text-center max-w-md w-full space-y-8 mb-35">
              <div className="w-40 h-40 mx-auto">
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  // src="https://assets3.lottiefiles.com/packages/lf20_0yfsb3a1.json"
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
                Ready to Manage Your Conversations?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-sm"
              >
                Choose your WhatsApp Business Account to access live chats, track activity, and delight your customers.
              </motion.p>
              {/* <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-sm mx-auto"
              >
                <AnimatedDropdown
                  id="createSelectWaba"
                  name="createSelectWaba"
                  label="Your WABA Accounts"
                  options={waba?.map((w) => ({ value: w.mobileNo, label: w.name }))}
                  value={selectedWaba}
                  onChange={(value) => setSelectedWaba(value)}
                  placeholder="Select WABA to continue"
                />
              </motion.div> */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-sm mx-auto"
              >
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex justify-between items-center bg-green-100 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-green-100 transition-all"
                  >
                    {/* <span className="text-lg font-semibold text-green-700">
                      Select Your WABA
                    </span> */}
                    <span className="text-gray-500">
                      {selectedWaba || "Select WABA to continue"}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-0 w-full bg-white  rounded-lg shadow-lg mt-2 z-10"
                    >
                      <div className="max-h-40 overflow-auto">
                        {waba.map((w, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedWaba(w.name)}
                            className="cursor-pointer p-2.5 border-b hover:bg-gray-100"
                          >
                            {w.name}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      <AnimatePresence>
        {selectedWaba && (
          <motion.div
            key="chat-list"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-full md:w-1/3 bg-white p-4 overflow-y-auto border-r"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Active Users</h3>
              <button className="text-sm text-red-500 underline" onClick={() => setSelectedWaba("")}>Change WABA</button>
            </div>
            {chats.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <p>No active users found for this WABA.</p>
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className="p-3 mb-2 rounded-lg bg-gray-100 hover:bg-blue-100 cursor-pointer transition"
                  onClick={() => setActiveChat(chat)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={chat.image}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{chat.name}</h4>
                      <p className="text-sm text-gray-500 truncate">
                        {chat.messages[chat.messages.length - 1].text}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedWaba && !activeChat && (
          <motion.div
            key="empty-chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center bg-gray-100 rounded-r-xl"
          >
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-green-100 shadow-xl flex items-center justify-center animate-bounce">
                  <QuestionAnswerOutlinedIcon sx={{ fontSize: "3rem" }} className="text-green-700" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">Welcome to Celitix LiveChat!</h2>
              <p className="text-gray-500">Select a conversation from the left panel to start chatting.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeChat && (
          <motion.div
            key="chat-window"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-col flex-1 bg-white shadow-md"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <IoArrowBack
                  className="md:hidden text-xl cursor-pointer"
                  onClick={() => setActiveChat(null)}
                />
                <img
                  src={activeChat.image}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h4 className="font-semibold text-gray-700">
                  {activeChat.name}
                </h4>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeChat.messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-2 rounded-lg max-w-xs ${msg.sender === "You"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"}`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t flex items-center gap-2">
              <CustomEmojiPicker position="top" onSelect={insertEmoji} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <FiSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
