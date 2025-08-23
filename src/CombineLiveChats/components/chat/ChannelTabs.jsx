import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaInstagram,
  FaCommentDots,
  FaThLarge,
  FaUserTie,
  FaUserCheck,
  FaUserClock,
  FaBolt,
  FaCog,
  FaComments,
  FaTimesCircle,
} from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";
import { useUser } from "@/context/auth";
import { useWabaAgentContext } from "@/context/WabaAndAgent.jsx";
import { useRcsContext } from "@/context/RcsContext.jsx";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";

const channels = [
  // {
  //   service_type_id: "1",
  //   label: "Dashboard",
  //   value: "",
  //   icon: <RiDashboardLine className="text-blue-400 text-xl" />,
  // },
  {
    service_type_id: "2",
    label: "WhatsApp",
    value: "wlivechat",
    icon: <FaWhatsapp className="text-green-500 text-lg" />,
  },
  {
    service_type_id: "3",
    label: "RCS",
    value: "rcslivechats",
    icon: <FaCommentDots className="text-purple-500 text-lg" />,
  },
  {
    service_type_id: "4",
    label: "Instagram",
    value: "instachats",
    icon: <FaInstagram className="text-pink-500 text-lg" />,
  },
  {
    service_type_id: "5",
    label: "Messenger",
    value: "messengerchats",
    icon: <FaFacebookMessenger className="text-blue-500 text-lg" />,
  },
];

const ChannelTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeTab = pathname.split("/")[2];
  const [showActions, setShowActions] = useState(true);
  const {
    wabaData,
    setWabaData,
    chatData,
    setChatData,
    agentData,
    setAgentData,
    selectedContextWaba,
    setSelectedContextWaba,
    agentSelected,
    setAgentSelected,
    convoDetails,
    setInactiveConvo,
    inactiveConvo,
    setActiveConvo,
    activeConvo,
  } = useWabaAgentContext();

  const {
    contextAgentList,
    setContextAgentList,
    activeRcsChat,
    setActiveRcsChat,
    closeRcsChat,
    setCloseRcsChat,
    allChats,
    setAllChats,
  } = useRcsContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [displayWabaName, setDisplayWabaName] = useState("");
  const [displayAgentName, setDisplayAgentName] = useState("");
  const selectedChannel = channels.find((ch) => ch.value === activeTab);
  const dropdownRef = useRef(null);
  const rcsdropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }

      if (
        rcsdropdownRef.current &&
        !rcsdropdownRef.current.contains(event.target)
      ) {
        setIsAgentOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (wabaData?.selectedWaba) {
      const matchedWaba = wabaData?.waba?.find(
        (waba) => waba.mobileNo === wabaData.selectedWaba
      );
      if (matchedWaba) {
        setDisplayWabaName(matchedWaba.name);
      }
    }
  }, [wabaData?.selectedWaba]);

  useEffect(() => {
    if (contextAgentList?.all) {
      const matchedAgent = contextAgentList?.all?.find(
        (agent) => agent.agent_id === contextAgentList.id
      );
      if (matchedAgent) {
        setDisplayAgentName(matchedAgent.agent_name);
      }
    }
  }, [contextAgentList?.id]);

  const handleSelectWaba = () => {
    setIsOpen(true);
  };

  const handleSelectAgent = () => {
    setIsAgentOpen(true);
  };

  // instagram
  const [displayInstagramName, setDisplayInstagramName] = useState("");
  const [isInstagramOpen, setIsInstagramOpen] = useState(false);
  const [instagramData, setInstagramData] = useState({
    selectedAccount: "",
    accounts: [
      // { accountId: "insta_1", accountSrno: 101, name: "Fashion Hub" },
      // { accountId: "insta_2", accountSrno: 102, name: "Foodies World" },
      // { accountId: "insta_3", accountSrno: 103, name: "Travel Diaries" },
      // { accountId: "insta_4", accountSrno: 104, name: "Tech Updates" },
    ],
  });
  const instagramRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        instagramRef.current &&
        !instagramRef.current.contains(event.target)
      ) {
        setIsInstagramOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (acc) => {
    setInstagramData((prev) => ({
      ...prev,
      selectedAccount: acc?.accountId || "",
    }));
    setIsInstagramOpen(false);
  };

  // messanger
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [selectedMessenger, setSelectedMessenger] = useState(null);
  const [messengerData, setMessengerData] = useState({
    selectedAccount: "",
    accounts: [
      // { accountId: "1", name: "Messenger Account 1" },
      // { accountId: "2", name: "Messenger Account 2" },
      // { accountId: "3", name: "Messenger Account 3" },
    ],
  });
  const messengerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        messengerRef.current &&
        !messengerRef.current.contains(event.target)
      ) {
        setIsMessengerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMessengerSelect = (acc) => {
    setMessengerData((prev) => ({
      ...prev,
      selectedAccount: acc?.accountId || "",
    }));
    setIsMessengerOpen(false);
  };

  const quickActions = [
    {
      label: "Select WABA",
      icon: <FaWhatsapp className="text-indigo-500 text-sm" />,
      onClick: handleSelectWaba,
    },
    // {
    //   label: "Assign Agent",
    //   icon: <FaUserTie className="text-indigo-500 text-sm" />,
    //   onClick: handleSelectAgent,
    // },
    {
      label: `${
        convoDetails ? convoDetails?.unreadCounts?.length : ""
      } Unread Messages`,
      icon: <FaUserCheck className="text-green-500 text-sm" />,
    },
    // {
    //   label: `${
    //     (activeConvo?.length || 0) + (inactiveConvo?.length || 0)
    //   } Total Chats ${activeConvo?.length || 0} Active Chats ${
    //     inactiveConvo?.length || 0
    //   } Inactive Chats`,
    //   icon: <FaUserClock className="text-yellow-500 text-sm" />,
    // },
    {
      label: `${
        (activeConvo?.length || 0) + (inactiveConvo?.length || 0)
      } Total Chats`,
      icon: <FaUserClock className="text-yellow-500 text-sm" />,
    },
    {
      label: `${activeConvo?.length || 0} Active Chats`,
      icon: <FaUserClock className="text-yellow-500 text-sm" />,
    },
    {
      label: `${inactiveConvo?.length || 0} Inactive Chats`,
      icon: <FaTimesCircle className="text-red-400 text-sm" />,
    },
    // {
    //   label: "Configure AI",
    //   icon: <FaComments className="text-green-500 text-sm" />,
    // },
    {
      label: "Setting",
      icon: <FaCog className="text-gray-500 text-sm" />,
      onClick: () => navigate("/combineLiveChatSettings/wlcsetting"),
    },
    // {
    //   label: "Trigger Workflow",
    //   icon: <FaBolt className="text-pink-500 text-sm" />,
    // },
  ];

  const quickRcsActions = [
    {
      label: "Select Agent",
      icon: <FaWhatsapp className="text-indigo-500 text-sm" />,
      onClick: handleSelectAgent,
    },
    {
      label: `${allChats?.unreadCounts?.length || 0} Unread Messages`,
      icon: <FaUserCheck className="text-green-500 text-sm" />,
    },
    {
      label: `${
        (activeRcsChat?.conversationEntityList?.length || 0) +
        (closeRcsChat?.conversationEntityList?.length || 0)
      } Total Chats`,
      icon: <FaUserClock className="text-yellow-500 text-sm" />,
    },
    {
      label: `${
        activeRcsChat?.conversationEntityList?.length || 0
      } Active Chats`,
      icon: <FaUserClock className="text-yellow-500 text-sm" />,
    },
    {
      label: `${
        closeRcsChat?.conversationEntityList?.length || 0
      } Inactive Chats`,
      icon: <FaTimesCircle className="text-red-400 text-sm" />,
    },
    // {
    //   label: "Configure AI",
    //   icon: <FaComments className="text-green-500 text-sm" />,
    // },
    {
      label: "Setting",
      icon: <FaCog className="text-gray-500 text-sm" />,
      onClick: () => navigate("/combineLiveChatSettings/rcslcsetting"),
    },
    // {
    //   label: "Trigger Workflow",
    //   icon: <FaBolt className="text-pink-500 text-sm" />,
    // },
  ];

  const quickInstagramActions = [
    {
      label: "Select Instagram Account",
      icon: <FaInstagram className="text-pink-500 text-sm" />,
      onClick: handleSelect,
    },
    {
      label: `Unread Messages`,
      icon: <FaUserCheck className="text-green-500 text-sm" />,
    },
    {
      label: `Total Chats`,
      icon: <FaUserClock className="text-yellow-500 text-sm" />,
    },
    {
      label: `Active Chats`,
      icon: <FaUserClock className="text-yellow-500 text-sm" />,
    },
    {
      label: `Inactive Chats`,
      icon: <FaTimesCircle className="text-red-400 text-sm" />,
    },
    // {
    //   label: "Configure AI",
    //   icon: <FaComments className="text-green-500 text-sm" />,
    // },
    {
      label: "Setting",
      icon: <FaCog className="text-gray-500 text-sm" />,
      onClick: () => navigate("/combineLiveChatSettings/instalcsetting"),
    },
    // {
    //   label: "Trigger Workflow",
    //   icon: <FaBolt className="text-pink-500 text-sm" />,
    // },
  ];

  const quickMessangerActions = [
    {
      label: "Select Messanger Account",
      icon: <FaFacebookMessenger className="text-blue-500 text-sm" />,
      onClick: handleMessengerSelect,
    },
    {
      label: `Unread Messages`,
      icon: <FaUserCheck className="text-green-500 text-sm" />,
    },
    {
      label: `Total Chats`,
      icon: <FaUserClock className="text-yellow-500 text-sm" />,
    },
    {
      label: `Active Chats`,
      icon: <FaUserClock className="text-yellow-500 text-sm" />,
    },
    {
      label: `Inactive Chats`,
      icon: <FaTimesCircle className="text-red-400 text-sm" />,
    },
    // {
    //   label: "Configure AI",
    //   icon: <FaComments className="text-green-500 text-sm" />,
    // },
    {
      label: "Setting",
      icon: <FaCog className="text-gray-500 text-sm" />,
      onClick: () => navigate("/combineLiveChatSettings/messengerlcsetting"),
    },
    // {
    //   label: "Trigger Workflow",
    //   icon: <FaBolt className="text-pink-500 text-sm" />,
    // },
  ];

  // const { user } = useUser();
  // const allowedServiceIds =
  //   user?.services?.map((s) => s.service_type_id.toString()) || [];

  // const visibleChannels = channels.filter(
  //   (ch) =>
  //     ch.service_type_id === "1" ||
  //     allowedServiceIds.includes(ch.service_type_id)
  // );

  return (
    <div className="flex flex-col gap-1 relative z-10">
      <div className="flex border-b bg-white shadow-sm px-4 relative z-10 rounded-2xl overflow-auto">
        {channels.map((ch) => (
          <button
            key={ch.value}
            onClick={() => navigate(`/liveChatMain/${ch.value}`)}
            className="relative group px-4 py-3 text-sm font-medium cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {ch.icon}
              <span>{ch.label}</span>
            </div>
            {activeTab === ch.value && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute left-0 bottom-0 h-[3px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              />
            )}
          </button>
        ))}

        <div className="flex items-center">
          <motion.button
            onClick={() => setShowActions((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <motion.div
              key={showActions ? "up" : "down"}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 0.4 }}
            >
              {showActions ? (
                <FaAngleDoubleUp className="text-lg" />
              ) : (
                <FaAngleDoubleDown className="text-lg" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Quick Actions */}
      <AnimatePresence initial={false}>
        {showActions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden absolute top-12 md:relative md:top-0 z-50"
          >
            <motion.div className="px-4 py-2 md:flex w-full gap-3 bg-white shadow rounded-md border border-gray-100 overflow-auto">
              {/* Whatsapp */}
              {quickActions
                .filter((action) => {
                  // Show "Select WABA" only when service_type_id === "2"
                  if (action.label === "Select WABA") {
                    return selectedChannel?.service_type_id === "2";
                  }
                  if (
                    action.label === "Select WABA" ||
                    action.label.includes("Unread Messages") ||
                    // action.label.includes("Total ") ||
                    action.label.includes("Total Chats") ||
                    action.label.includes("Active Chats") ||
                    action.label.includes("Inactive Chats") ||
                    action.label.includes("Configure AI") ||
                    action.label.includes("Trigger Workflow") ||
                    action.label.includes("Setting")
                  ) {
                    return (
                      selectedChannel?.service_type_id === "2" &&
                      !!displayWabaName
                    );
                  }

                  // Show "Assign Agent" only when service_type_id === "3"
                  // if (action.label === "Assign Agent") {
                  //   return selectedChannel?.service_type_id === "3";
                  // }

                  // All other buttons are always shown
                  return true;
                })
                .map((action, i) => {
                  const isWabaAction = action.label === "Select WABA";
                  return (
                    <motion.button
                      key={i}
                      onClick={action?.onClick}
                      className={`flex flex-nowrap whitespace-nowrap items-center justify-center gap-2 tracking-wide text-[0.77rem] font-medium px-3 py-1 rounded-full transition mb-1 md:mb-0
                          ${
                            isWabaAction && displayWabaName
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                          }`}
                    >
                      {action.icon}
                      {isWabaAction && displayWabaName
                        ? displayWabaName
                        : action.label}
                    </motion.button>
                  );
                })}

              {/* Rcs */}
              {selectedChannel?.service_type_id === "3" && (
                <div className="flex flex-wrap gap-2">
                  {quickRcsActions.map((action, i) => {
                    const isAgentAction = action.label === "Select Agent";

                    return (
                      <motion.button
                        key={i}
                        onClick={action?.onClick}
                        className={`flex items-center gap-2 whitespace-nowrap text-[0.77rem] font-medium px-3 py-1 rounded-full transition mb-1 md:mb-0
                          ${
                            isAgentAction && displayAgentName
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                          }`}
                      >
                        {action.icon}
                        {isAgentAction && displayAgentName
                          ? displayAgentName
                          : action.label}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* instagram */}
              {selectedChannel?.service_type_id === "4" && (
                <div className="flex flex-wrap gap-2 relative">
                  {quickInstagramActions.map((action, i) => {
                    const isDropdown =
                      action.label === "Select Instagram Account";

                    // Render custom dropdown for Instagram account selection
                    if (isDropdown) {
                      return (
                        <div key={i} className="relative">
                          {/* Trigger Button */}
                          <div
                            className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 cursor-pointer flex items-center justify-between gap-2 min-w-[180px]"
                            onClick={() => setIsInstagramOpen((prev) => !prev)}
                          >
                            <FaInstagram className="text-pink-500 text-sm" />
                            <span>
                              {instagramData.selectedAccount
                                ? instagramData.accounts.find(
                                    (acc) =>
                                      acc.accountId ===
                                      instagramData.selectedAccount
                                  )?.name
                                : "Select Instagram Account"}
                            </span>
                          </div>

                          {/* Dropdown List */}
                          {isInstagramOpen && (
                            <div className="absolute top-10 left-0 shadow-xl rounded-xl w-48 bg-white z-50">
                              <ul className="w-full border border-gray-300 rounded-md text-sm bg-white">
                                {/* No Selection */}
                                <li
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b"
                                  onClick={() => {
                                    setInstagramData((prev) => ({
                                      ...prev,
                                      selectedAccount: "",
                                    }));
                                    setIsInstagramOpen(false);
                                  }}
                                >
                                  -- No Selection --
                                </li>

                                {/* Loop over Instagram Accounts */}
                                {instagramData.accounts.map((acc) => (
                                  <li
                                    key={acc.accountId}
                                    onClick={() => {
                                      setInstagramData((prev) => ({
                                        ...prev,
                                        selectedAccount: acc.accountId,
                                      }));
                                      setIsInstagramOpen(false);
                                    }}
                                    className={`px-3 py-2 cursor-pointer border-b hover:bg-pink-50 hover:text-pink-600 transition-colors
                                    ${
                                       instagramData.selectedAccount === acc.accountId
                                         ? "bg-pink-100 text-pink-700 font-medium"
                                         : ""
                                     }`}
                                  >
                                    {acc.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Render normal Instagram action buttons
                    return (
                      <motion.button
                        key={i}
                        onClick={action?.onClick}
                        className="flex items-center gap-2 whitespace-nowrap text-[0.77rem] font-medium px-3 py-1 rounded-full transition bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                      >
                        {action.icon}
                        {action.label}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Messanger */}
              {selectedChannel?.service_type_id === "5" && (
                <div className="flex flex-wrap gap-2">
                  {quickMessangerActions.map((action, i) => {
                    const isDropdown =
                      action.label === "Select Messenger Account";

                    // Render dropdown for Messenger account selection
                    if (isDropdown) {
                      return (
                        <div key={i}>
                          <div
                            className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 focus:outline-none mb-1 md:mb-0"
                            onClick={() => setIsMessengerOpen((prev) => !prev)}
                          >
                            <span>
                              {messengerData.selectedAccount
                                ? messengerData.accounts.find(
                                    (acc) =>
                                      acc.accountId ===
                                      messengerData.selectedAccount
                                  )?.name
                                : "Select Messenger Account"}
                            </span>
                            </div>
                          {/* dropdown list */}
                           {isMessengerOpen && (
                             <div className="absolute top-10 left-0 shadow-xl rounded-xl w-48 bg-white z-50">
                              <ul className="w-full border border-gray-300 rounded-md text-sm bg-white">
                                {/* No Selection */}
                                <li
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b"
                                   onClick={() => {
                                    setMessengerData((prev) => ({
                                      ...prev,
                                      selectedAccount: "",
                                    }));
                                    setIsMessenegrOpen(false);
                                  }}
                                >
                                  -- No Selection --
                                </li>

                                 {/* Loop over Messenger Accounts */}
                                 {messengerData.accounts.map((acc) => (
                                  <li
                                    key={acc.accountId}
                                    onClick={() => {
                                      setMessengerData((prev) => ({
                                        ...prev,
                                        selectedAccount: acc.accountId,
                                      }));
                                      setIsMessengerOpen(false);
                                    }}
                                    className={`px-3 py-2 cursor-pointer border-b hover:bg-pink-50 hover:text-pink-600 transition-colors
                                    ${
                                       messenger.selectedAccount === acc.accountId
                                         ? "bg-pink-100 text-pink-700 font-medium"
                                         : ""
                                     }`}
                                  >
                                    {acc.name}
                                  </li>
                                ))}
                                </ul>
                                </div>

                              )}
                          
                        </div>
                      );
                    }

                    // Render normal Messenger action buttons
                    return (
                      <motion.button
                        key={i}
                      onClick={() => setIsMessengerOpen((prev) => !prev)}
                        // onClick={action?.onClick}
                        className="flex items-center gap-2 whitespace-nowrap text-[0.77rem] font-medium px-3 py-1 rounded-full transition bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                      >
                        {action.icon}
                        {action.label}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={dropdownRef}
        className={`absolute top-22 left-4 md:left-2 shadow-xl rounded-xl z-[9999] transition-transform duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } `}
      >
        <ul className="w-40 border border-gray-300 rounded-md text-sm bg-white z-999">
          <li
            onClick={() => {
              setWabaData({ ...wabaData, selectedWaba: "", wabaSrno: null });
              setSelectedContextWaba("");
              setDisplayWabaName("");
              setIsOpen(false);
            }}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b"
          >
            -- No Selection --
          </li>
          {wabaData?.waba?.map((waba) => (
            <li
              key={waba.mobileNo}
              onClick={() => {
                const wabaSrno = wabaData?.waba?.find(
                  (w) => w.mobileNo === waba.mobileNo
                )?.wabaSrno;

                setWabaData({
                  ...wabaData,
                  selectedWaba: waba.mobileNo,
                  wabaSrno,
                });
                setChatData({
                  active: null,
                  input: "",
                  allConversations: [],
                  specificConversation: [],
                  latestMessage: { srno: "", replayTime: "" },
                  replyData: "",
                  isReply: false,
                });
                setSelectedContextWaba(waba.mobileNo);
                setIsOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer border-b hover:bg-blue-50 hover:text-blue-600 transition-colors
        ${
          wabaData?.selectedWaba === waba.mobileNo
            ? "bg-blue-100 text-blue-700 font-medium"
            : ""
        }`}
            >
              {waba.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Instagram Dropdown */}
      <div className="relative">
        {/* Dropdown */}
        <div
          ref={instagramRef}
          className={`absolute left-4 md:left-2 shadow-xl rounded-xl z-[9999] transition-transform duration-300 ${
            isInstagramOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ul className="w-40 border border-gray-300 rounded-md text-sm bg-white">
            {/* No Selection Option */}
            <li
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b"
              onClick={() => handleSelect(null)}
            >
              -- No Selection --
            </li>

            {/* Loop over Instagram Accounts */}
            {instagramData.accounts.map((acc) => (
              <li
                key={acc.accountId}
                onClick={() => handleSelect(acc)}
                className={`px-3 py-2 cursor-pointer border-b hover:bg-pink-50 hover:text-pink-600 transition-colors
          ${
            instagramData.selectedAccount === acc.accountId
              ? "bg-pink-100 text-pink-700 font-medium"
              : ""
          }`}
              >
                {acc.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* messanger */}
      <div className="relative">
        {/* Dropdown */}
        <div
          ref={messengerRef}
          className={`absolute  left-4 md:left-2 shadow-xl rounded-xl z-[9999] transition-transform duration-300 ${
            isMessengerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ul className="w-40 border border-gray-300 rounded-md text-sm bg-white">
            {/* No Selection Option */}
            <li
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b"
              onClick={() => handleMessengerSelect(null)}
            >
              -- No Selection --
            </li>

            {/* Loop over Messenger Accounts */}
            {messengerData.accounts.map((acc) => (
              <li
                key={acc.accountId}
                onClick={() => handleMessengerSelect(acc)}
                className={`px-3 py-2 cursor-pointer border-b hover:bg-blue-50 hover:text-blue-600 transition-colors
            ${
              messengerData.selectedAccount === acc.accountId
                ? "bg-blue-100 text-blue-700 font-medium"
                : ""
            }`}
              >
                {acc.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Rcs */}
      {/* <div
        ref={rcsdropdownRef}
        className={`absolute top-20 left-4 md:left-2 w-[90%] md:w-30 shadow-xl rounded-xl bg-white border border-gray-200 z-[999] transform transition-transform duration-300 ${isAgentOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } `}
      >
        <AnimatedDropdown
          // label="Select Agent"
          id="agentList"
          name="agentList"
          options={agentData?.all?.map((item) => ({
            label: item?.agent_name,
            value: item?.agent_id,
          }))}
          onChange={(e) => {
            setAgentData((prev) => ({ ...prev, id: e }));
            setChatData({
              active: null,
              input: "",
              allConversations: [],
              specificConversation: [],
              latestMessage: {
                srno: "",
                replayTime: "",
              },
            });
            setIsAgentOpen(false);
            setAgentSelected(true);
          }}
          placeholder="Select Agent"
          value={agentData?.id}
        />
      </div> */}

      <div
        ref={rcsdropdownRef}
        className={`absolute top-22 left-4 md:left-2 shadow-xl rounded-xl z-[9999] transition-transform duration-300 ${
          isAgentOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="w-40 border border-gray-300 rounded-md text-sm bg-white z-999">
          {/* Default option */}
          <li
            onClick={() => {
              setContextAgentList({ ...contextAgentList, id: "" });
              setIsAgentOpen(false);
              setAgentSelected(false);
              setDisplayAgentName("");
              setActiveRcsChat([]);
              setCloseRcsChat([]);
              setAllChats({
                unreadCounts: [],
                conversationEntityList: [],
              });
            }}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b"
          >
            -- No Selection --
          </li>

          {/* Agents list */}
          {contextAgentList?.all?.map((agent) => (
            <li
              key={agent.agent_id}
              onClick={() => {
                setContextAgentList({
                  ...contextAgentList,
                  id: agent.agent_id,
                });
                setIsAgentOpen(false);
                setAgentSelected(true);
              }}
              className={`px-3 py-2 cursor-pointer border-b hover:bg-blue-50 hover:text-blue-600 transition-colors
            ${
              agentData?.id === agent.agent_id
                ? "bg-blue-100 text-blue-700 font-medium"
                : ""
            }`}
            >
              {agent.agent_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChannelTabs;
