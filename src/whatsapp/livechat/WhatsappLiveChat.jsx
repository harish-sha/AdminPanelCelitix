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
  fetchReplyData,
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
  getTemplateDetialsById
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
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
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
import { useUser } from "@/context/auth";
import moment from "moment";

export default function WhatsappLiveChat() {
  const { user } = useUser();
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

  const [isSubscribe, setIsSubscribe] = useState(false);

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
      case "application":
        replyType = "document";
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
      // ...(chatState?.isReply ? {} : { message: input || "" }),
      ...(chatState?.isReply ? {} : { message: input.trim() || "" }),
      // ...(selectedImage ? {} : { message: input || "" }),
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
      const imageData = await uploadImageFile(selectedImage.files);
      delete data.message;

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
      icon: <AttachmentOutlinedIcon style={{ color: "#4CAF50" }} />,
      command: () => {
        fileInputRef.current.click();
      },
    },
    {
      label: "Document",
      icon: <FilePresentOutlinedIcon />,
      command: () => {
        fileInputRef.current.click();
      },
    },
    {
      label: "Photos & Videos",
      icon: <ImageOutlinedIcon style={{ color: "#FF9800" }} />, // Orange
      command: () => {
        fileInputRef.current.click();
      },
    },
    {
      label: "Template",
      icon: <BsJournalArrowDown style={{ color: "#3F51B5" }} />,
      command: () => {
        setSendMessageDialogVisible(true);
      },
    },
    {
      label: "Excel",
      icon: <TableChartOutlinedIcon style={{ color: "#009688" }} />, // Teal
      command: () => {
        fileInputRef.current.click();
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
      setIsFetching(true);
      const res = await fetchAllConversations(data);

      if (!res.conversationEntityList[0]) {
        return;
      }

      // if (res?.unreadCounts?.length > 0) {
      //   const audio = new Audio("./receive-message.mp3");
      //   audio.play().catch((e) => {
      //     console.log("Audio play error:", e);
      //   });
      // }

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
      setIsFetching(false);
    }
  }

  function handleSearch() {
    handleFetchAllConvo();
    // setActiveChat(null);
    setChatState((prev) => ({ ...prev, active: null }));
  }

  // useEffect(() => {
  //   // handleFetchAllConvo();
  //   if (!wabaState?.selectedWaba) return;
  //   const intervalid = setInterval(() => {
  //     handleFetchAllConvo();
  //   }, 500);

  //   return () => clearInterval(intervalid);
  // }, [wabaState.selectedWaba, btnOption]);

  // useEffect(() => {
  //   if (!wabaState?.selectedWaba) return;
  //   // if (!wabaState?.selectedWaba || !isSubscribe) {
  //   //   handleFetchAllConvo();
  //   //   return;
  //   // }

  //   // handleFetchAllConvo();
  //   // setIsSubscribe(true);

  //   const intervalId = setInterval(() => {
  //     handleFetchAllConvo();
  //   }, 5000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [wabaState.selectedWaba, btnOption]);

  useEffect(() => {
    if (!wabaState?.selectedWaba) return;
    let intervalId = null;

    if (isSubscribe) {
      // handleFetchAllConvo();
      intervalId = setInterval(() => {
        handleFetchAllConvo();
      }, 5000);
    } else {
      handleFetchAllConvo();
      setIsSubscribe(true);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [wabaState.selectedWaba, btnOption, isSubscribe]);

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
    const type = files?.type?.split("/")[0];
    const fileName = files?.name;
    const size = `${files?.size / 1024}MB`;
    setSelectedImage({ files, type, fileName, size });
    // setSelectedImage(files);
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
          let replyMessage = null;
          let isReply = false;
          let mediaSize = null;

          if (msg?.contextReceiptNo) {
            const data = {
              wabaNumber: msg?.wabaNumber,
              receiptNo: msg?.contextReceiptNo,
            };
            const res = await fetchReplyData(data);
            replyMessage = res?.messageBody;
            isReply = true;
          }

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
            replyMessage,
            isReply,
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
        (temp) => temp.vendorTemplateId === sendmessageData?.templateName
      );

      if (
        ["image", "video", "document"].includes(templateType?.type) &&
        !selectedFile?.fileUrl
      ) {
        return toast.error("Please Select Media first");
      }

      const allvariables = [];

      if (varLength && varLength[0]?.length > 0) {
        // const validKeys = variables?.filter(
        //   (key) => key !== "" || key !== null
        // );

        const validKeys = Object.keys(variables).filter(
          (key) => variables[key] !== ""
        );

        if (varLength[0]?.length != validKeys.length) {
          return toast.error("Please enter all variables");
        }
        // return;
        validKeys.forEach((key) => {
          allvariables.push(variables[key]);
        });
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

      const templateName = allTemplated.find(
        (temp) => temp.vendorTemplateId === sendmessageData?.templateName
      )?.templateName;

      data = {
        srno: chatState?.active.srno,
        templateUrlVariable: btnVariables,
        templateType: templateType?.type,
        // templateName: sendmessageData?.templateName,
        templateName: templateName,
        templateLanguage: "en",
        wabaNumber: wabaState.selectedWaba,
        mobileno: chatState?.active.mobileNo,
        contactName: chatState?.active?.contectName || "",
        msgType: "template",
        variables: allvariables,
        mediaUrl: selectedFile?.fileUrl || "",
        // phoneDisplay: "",
        wabaSrNo: wabaState.wabaSrno,
        agentsrno: "",
        imgCard: imgCard,
        phoneDisplay: chatState?.active.mobileNo,
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
      // const res = await getWabaTemplate(wabaId, sendmessageData?.templateName);
      // setTemplateDetails(res.data[0]);
      const res = await getTemplateDetialsById(sendmessageData?.templateName);
      setTemplateDetails(res);
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
        // item?.buttons?.map(({ type, example }) => {
        //   if (type === "URL") {
        //     // const regex = /{{(\d+)}}/g;
        //     // const matches = regex.exec(example);
        //     // setBtnVarLength(matches);
        //     setBtnVarLength(example);
        //   }
        // });
        item?.buttons?.map(({ type, example, url }) => {
          if (type === "URL") {
            const varLength = url?.match(/{{(.+?)}}/g);
            setBtnVarLength(varLength?.length || 0);
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
        replayTime: moment(replayTime).format("YYYY-MM-DD HH:mm:ss"),
      };
      const res = await loadNewChat(data);

      if (res?.conversationEntityList.length === 0) {
        return;
      }
      // const audio = new Audio("./receive-message.mp3");
      // audio.play().catch((e) => {
      //   // console.log("Audio play error:", e);
      // });
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
    // handleLoadNewChat();
    // handleIsView();
    const intervalId = setInterval(() => {
      handleLoadNewChat();
      handleIsView();
    }, 500);
    return () => clearInterval(intervalId);
  }, [latestMessageData]);

  async function handleAttachmentDownload(data) {
    try {
      const mediaPath = await downloadAttachment({
        waba: wabaState.selectedWaba,
        id: data.mediaId,
        conversionSrno: data.srno,
      });
      await handleFetchSpecificConversation();
    } catch (e) {
      // console.log(e);
      toast.error("Error downloading attachment");
    }
  }

  // const chatScreenVariants = {
  //   hidden: { opacity: 0, x: "100%" },
  //   visible: {
  //     opacity: 1,
  //     x: 0, // Slide into view
  //     transition: {
  //       type: "spring",
  //       stiffness: 300,
  //       damping: 20,
  //     },
  //   },
  //   exit: {
  //     opacity: 0,
  //     x: "100%",
  //     transition: {
  //       duration: 0.3,
  //     },
  //   },
  // };

  const chatScreenVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="flex h-[100%] bg-gray-50 rounded-2xl overflow-hidden border ">
      <div
        className={`w-full md:w-100 p-1 border rounded-tl-2xl overflow-hidden border-tl-lg  ${chatState?.active ? "hidden md:block" : "block"
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
          setSelectedWaba={setSelectedWaba}
        />

        <ChatSidebar
          formatDate={formatDate}
          chatState={chatState}
          setChatState={setChatState}
          setSelectedAgentList={setSelectedAgentList}
          selectedWaba={selectedWaba}
          setSelectedGroupList={setSelectedGroupList}
        />
      </div>

      {!chatState.active && (
        <AnimatePresence>
          <motion.div
            key="empty-chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 border flex-1 border-tr-lg"
          >
            {/* Background Animation - Floating Bubbles */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
              <motion.div
                initial={{ y: 200 }}
                animate={{ y: -100 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="absolute left-10 top-10 w-64 h-64 bg-green-200 opacity-30 rounded-full"
              />
              <motion.div
                initial={{ x: -100 }}
                animate={{ x: 100 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="absolute bottom-10 right-10 w-48 h-48 bg-green-300 opacity-30 rounded-full"
              />
            </div>

            {/* main card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 px-6 py-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg text-center max-w-xl
"
            >
              <div className="w-50 h-50 mx-auto mb-3">
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src="/animation/wabalivechatanimation.json"
                  s
                  style={{ width: "100%", height: "100%" }}
                ></lottie-player>
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-semibold text-green-900 mb-2"
              >
                Welcome to LiveChat!
              </motion.h2>
              {/* <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-green-900 mb-4"
              >
                Select Your WABA Account to Start a Conversation
              </motion.h3> */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600"
              >
                Engage your customers instantly with real-time WhatsApp
                messaging. Choose a WABA account to get started.
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      <AnimatePresence>
        {chatState.active && (
          <motion.div
            key="chat-screen"
            variants={chatScreenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex flex-col flex-1 h-screen md:h-full"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
      {user.role !== "AGENT" && (
        <Dialog
          header="Transfer Chat to Agent"
          visible={dialogVisible}
          style={{ width: "35rem" }}
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

            <div className="flex items-center justify-center">
              <UniversalButton
                id={"assignAgent"}
                name={"assignAgent"}
                label="Assign Agent"
                onClick={handleAssignAgent}
              />
            </div>
          </div>
        </Dialog>
      )}

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
                      value: template.vendorTemplateId,
                      label: template.templateName,
                    }))}
                    value={sendmessageData.templateName}
                    onChange={(e) => {
                      setSendMessageData((prevData) => ({
                        ...prevData,
                        templateName: e,
                      }));
                      const templateType = allTemplated?.find(
                        (template) => template.vendorTemplateId === e
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
