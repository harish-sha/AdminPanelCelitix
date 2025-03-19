import { useEffect, useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { BsJournalArrowDown, BsThreeDotsVertical } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
    console.log(agentName + selectedAgentList + selectedGroupList);
  }, [agentName, selectedAgentList, selectedGroupList]);

  useEffect(() => {
    async function fetchWaba() {
      const res = await getWabaList();
      setWaba(res);
    }

    fetchWaba();
  }, []);

  useEffect(() => {
    console.log(search);
  }, [search]);
  function deleteImages(index) {
    setSelectedImage((prev) => {
      const newSelectedImage = [...prev];
      newSelectedImage.splice(index, 1);
      return newSelectedImage;
    });

    // To see the updated state, use useEffect
    console.log("Deleted Index:", index);
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

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

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
    <div className="flex h-[100%] bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`w-full md:w-1/3 bg-white border-r overflow-hidden ${
          activeChat ? "hidden md:block" : "block"
        }`}
      >
        {/* <h2 className="text-xl font-bold">Chats</h2> */}

        <div>
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
            onChange={(value) => setSelectedWaba(value)}
            placeholder="Select WABA"
          />
          <div id="input" className="relative flex items-center justify-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="w-full p-2 mt-5 rounded-lg border-1 focus:outline-hidden"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchOutlined className="absolute text-gray-500 right-2 top-7" />
          </div>
          <div className="flex justify-center p-2 mt-5 space-x-4 bg-gray-200 rounded-lg">
            <button
              onClick={() => setBtnOption("active")}
              className={`p-2 transition-all duration-300 rounded-lg ${
                btnOption === "active"
                  ? "bg-blue-500 text-white scale-105 shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-300"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setBtnOption("close")}
              className={`p-2 transition-all duration-300 rounded-lg ${
                btnOption === "close"
                  ? "bg-blue-500 text-white scale-105 shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-300"
              }`}
            >
              Close
            </button>
          </div>
        </div>

        <div className="mt-4 ">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 border-b cursor-pointer select-none ${
                activeChat?.id === chat.id ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-">
                  <div className="relative">
                    <img
                      src={chat.image}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-lg"></div>
                  </div>
                  {chat.name}
                </div>
                <div className="flex items-center justify-center w-5 h-5 text-sm text-white bg-green-500 rounded-full">
                  5
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      {activeChat && (
        <div className="relative flex flex-col flex-1 h-screen md:h-full">
          {/* Header */}
          <div className="z-0 flex items-center justify-between w-full bg-white shadow-md h-15">
            <div className="flex items-center space-x-2">
              <IoArrowBack
                className="text-xl cursor-pointer md:hidden"
                onClick={() => setActiveChat(null)}
              />
              <img
                src={activeChat.image}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <h3 className="text-lg font-semibold">{activeChat.name}</h3>
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
          <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col mt-16 mb-0 md:max-h-[calc(100vh-8rem)]">
            {activeChat.messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === "You"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {selectedImage.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedImage.map((file, index) => (
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
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center w-full p-4 bg-white border-t mb-17 md:mb-0">
            <div className="mr-2">
              <CustomEmojiPicker position="top" onSelect={insertEmoji} />
            </div>
            <div className="relative w-full border rounded-lg">
              <input
                type="text"
                className="flex-1 md:w-[35rem] w-[14rem] p-2 focus:outline-none"
                placeholder="Type a message..."
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="absolute p-2 ml-2 text-white bg-blue-500 rounded-lg right-2 bottom-1"
              >
                <FiSend />
              </button>
              <div>
                <SpeedDial
                  model={items}
                  direction="up"
                  style={{ bottom: 4, right: 40 }}
                  buttonStyle={{
                    width: "2rem",
                    height: "2rem",
                  }}
                />
              </div>
              <div className="absolute items-center justify-center hidden gap-1 right-25 bottom-2 md:flex">
                <FormatBoldOutlined />
                <FormatItalicOutlined />
                <FormatStrikethroughOutlined />
              </div>
            </div>
          </div>
          <Sidebar
            visible={visibleRight}
            position="right"
            onHide={() => setVisibleRight(false)}
            style={{ height: "630px", position: "absolute", bottom: 0 }}
          >
            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={activeChat.image}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <h1>{activeChat.name}</h1>
              </div>
              <div className="flex items-center gap-2">
                <LocalPhoneOutlinedIcon />
                <p>{activeChat.phone}</p>
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
            options={[
              {
                value: "arIHANT1",
                label: "Arihant",
              },
              {
                value: "aRIHANT2",
                label: "Arihant",
              },
            ]}
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
            label="Agent Name"
            tooltipContent="Enter Agent Name"
            id="agentname"
            name="agentname"
            type="tel"
            value={agentName}
            onChange={(e) => setAgentname(e.target.value)}
            placeholder="Enter Agent Name"
          />
          <AnimatedDropdown
            options={[
              {
                value: "arIHANT3",
                label: "Arihant",
              },
              {
                value: "aRIHANT4",
                label: "Arihant",
              },
            ]}
            id="group"
            name="group"
            label="Group"
            tooltipContent="Select Group"
            tooltipPlacement="right"
            value={selectedGroupList}
            onChange={(value) => setSelectedGroupList(value)}
            placeholder="Group"
          />
        </div>
      </Dialog>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
        multiple
      />

      {imagePreviewVisible && (
        <ImagePreview
          imagePreviewVisible={imagePreviewVisible}
          setImagePreviewVisible={setImagePreviewVisible}
          images={selectedImage}
        />
      )}
    </div>
  );
}
