import { useEffect, useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { BsJournalArrowDown, BsThreeDotsVertical } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AnimatedDropdown from "../components/AnimatedDropdown";
import {
  assignUserToAgent,
  fetchAllConversations,
  fetchSpecificConversations,
  getWabaList,
  getWabaShowGroupsList,
  getWabaTemplate,
  getWabaTemplateDetails,
  sendMessageToUser,
  sendTemplateMessageToUser,
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
      const updatedChats = chats?.map((chat) =>
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

  useEffect(() => {
    async function handleFetchAllConvo() {
      const userActive = btnOption == "active" ? 1 : 0;
      try {
        const data = {
          mobileNo: selectedWaba,
          srno: 0,
          active: userActive,
        };
        setIsFetching(true);
        const res = await fetchAllConversations(data);

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
        setIsFetching(false);
      }
    }

    handleFetchAllConvo();
    setActiveChat(null);
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

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  async function handleFetchSpecificConversation() {
    const data = {
      // mobileNo: "91942998288",
      mobileNo: activeChat?.mobileNo,
      wabaMobile: activeChat?.wabaNumber,
      chatNo: 0,
    };
    try {
      setIsFetching(true);
      const res = await fetchSpecificConversations(data);

      const grouped = res?.conversationEntityList
        ?.reverse()
        .reduce((acc, message) => {
          const date = dayjs(message.queTime).format("YYYY-MM-DD");
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(message);
          return acc;
        }, {});

      const groupedArray = Object.keys(grouped).map((date) => ({
        date,
        messages: grouped[date],
      }));

      setSpecificConversation(groupedArray);
    } catch (e) {
      console.log(e);
      return toast.error("Error fetching specific conversation");
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    handleFetchSpecificConversation();
  }, [activeChat]);

  useEffect(() => {
    async function handleFetchAllAgent() {
      try {
        const res = await fetchAllAgents();
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
        wabaSrNo: 3,
      };
      func = sendMessageToUser;
    } else if (messageType === "template") {
      data = {
        srno: "562",
        templateUrlVariable: "asdasds",
        templateType: "text",
        templateName: "celitix",
        templateLanguage: "en",
        wabaNumber: selectedWaba,
        mobileno: activeChat.mobileNo,
        contactName: activeChat?.contectName || "",
        msgType: "template",
        variables: [],
        mediaUrl:
          "http://localhost:8080/procpaas//Whatsapp/whatsapp_2907_1741414141365.jpg",
        message: "Welcome to celitix",
        phoneDisplay: "",
        wabaSrNo: "1",
        agentsrno: "",
      };
      func = sendTemplateMessageToUser;
    } else {
      return toast.error("Please select valid messageType");
    }

    try {
      setIsFetching(true);
      const res = await func(data);
      if (res?.msg?.includes("successfully")) {
        toast.success("Message sent successfully.");
        setSendMessageDialogVisible(false);
        setSendMessageData({});
        return;
      }
      console.log(res);
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

  return isFetching ? (
    <Loader height="35rem" width="100%" />
  ) : (
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
          {selectedWaba && (
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
          )}
        </div>

        <div className="mt-4 h-[400px] overflow-y-auto">
          {allConvo
            ?.slice()
            ?.sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
            ?.map((chat, index) => (
              <div
                key={chat.srno || index}
                className={`p-3 border-b cursor-pointer select-none ${
                  activeChat?.srno === chat.srno ? "bg-gray-300" : ""
                }`}
                onClick={() => setActiveChat(chat)}
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
          <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col mt-16 mb-0 md:max-h-[calc(100vh-8rem)]">
            {specificConversation?.map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className="my-4 text-xs text-center text-gray-500">
                  {group?.date}
                </div>

                {group.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg max-w-[70%] my-1 w-50 ${
                      msg.replyFrom !== "user"
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 text-black self-start"
                    }`}
                  >
                    {msg?.replyType === "image" && (
                      <img
                        src={msg?.mediaPath}
                        alt={msg?.mediaPath}
                        className="object-contain mb-2 pointer-events-none select-none h-50 w-50 "
                      />
                    )}
                    <div className="w-25">{msg.messageBody}</div>
                    <p className="mt-1 text-[0.7rem] text-end">
                      {formatTime(msg?.queTime)}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* {selectedImage.length > 0 && (
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
          )} */}

          {/* Input */}
          {btnOption === "active" ? (
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
            style={{ height: "630px", position: "absolute", bottom: 0 }}
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
            options={agentList?.map((agent) => ({
              value: agent.srno,
              label: agent.agentName,
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
        style={{ width: "50rem" }}
        draggable={false}
        onHide={() => {
          setSendMessageDialogVisible(false);
        }}
      >
        <div className="flex flex-col justify-between gap-4 p-2 md:flex-row">
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
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
            </div>
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
                    }}
                  />

                  <p>Variables</p>
                </div>
              ) : (
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
              )}
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
    </div>
  );
}
