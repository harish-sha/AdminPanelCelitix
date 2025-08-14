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
} from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";
import { useUser } from "@/context/auth";
import { useWabaAgentContext } from "@/context/WabaAndAgent.jsx";
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
  } = useWabaAgentContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [displayWabaName, setDisplayWabaName] = useState("");
  const selectedChannel = channels.find((ch) => ch.value === activeTab);
  console.log("displayWabaName", displayWabaName);
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

  const handleSelectWaba = () => {
    setIsOpen(true);
  };

  const handleSelectAgent = () => {
    setIsAgentOpen(true);
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
      label: "Mark Active",
      icon: <FaUserCheck className="text-green-500 text-sm" />,
    },
    {
      label: "Put on Hold",
      icon: <FaUserClock className="text-yellow-500 text-sm" />,
    },
    {
      label: "Trigger Workflow",
      icon: <FaBolt className="text-pink-500 text-sm" />,
    },
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
            <div className="px-4 py-2 md:flex w-full gap-3 bg-white shadow rounded-md border border-gray-100 overflow-auto ">
              {quickActions
                .filter((action) => {
                  // Hide "Assign Agent" when WhatsApp is selected
                  if (
                    selectedChannel?.service_type_id === "2" &&
                    action.label === "Assign Agent"
                  ) {
                    return false;
                  } else if (
                    selectedChannel?.service_type_id === "3" &&
                    action.label === "Select WABA"
                  ) {
                    return false;
                  }
                  return true;
                })
                .map((action, i) => {
                  const isWabaAction = action.label === "Select WABA";
                  return (
                    <button
                      key={i}
                      onClick={action?.onClick}
                      className={`flex flex-nowrap whitespace-nowrap items-center justify-center gap-2 text-xs px-3 py-1 rounded-full transition mb-1 md:mb-0
                        ${isWabaAction && displayWabaName
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                        }
                      `}
                    >
                      {action.icon}
                      {isWabaAction && displayWabaName
                        ? displayWabaName
                        : action.label}
                    </button>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <div
        ref={dropdownRef}
        className={`absolute top-0 -left-8 w-full md:w-40 shadow-lg z-40 transform transition-transform duration-300 md:ml-4 ${
          isOpen ? "translate-x-0 left-0" : "-translate-x-full"
        }`}
        >
        <AnimatedDropdown
          id="createSelectWaba"
          name="createSelectWaba"
          // label="Select WABA"
          tooltipContent="Select your whatsapp business account"
          tooltipPlacement="right"
          options={wabaData?.waba?.map((waba) => ({
            value: waba.mobileNo,
            label: waba.name,
          }))}
          value={wabaData?.selectedWaba}
          onChange={(value) => {
            const wabaSrno = wabaData?.waba?.find(
              (waba) => waba.mobileNo === value
            )?.wabaSrno;

            setWabaData({ ...wabaData, selectedWaba: value, wabaSrno });

            setChatData({
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
            setSelectedContextWaba(value);
            setIsOpen(false);
          }}
          placeholder="Select WABA"
        />
      </div> */}

      <div
        ref={dropdownRef}
        className={`absolute top-22 left-4 md:left-2  shadow-xl rounded-xl z-[9999] transform transition-transform duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* <AnimatedDropdown
          id="createSelectWaba"
          name="createSelectWaba"
          tooltipContent="Select your WhatsApp Business Account"
          tooltipPlacement="right"
          
          options={wabaData?.waba?.map((waba) => ({
            value: waba.mobileNo,
            label: waba.name,
          }))}
          value={wabaData?.selectedWaba}
          onChange={(value) => {
            const wabaSrno = wabaData?.waba?.find(
              (waba) => waba.mobileNo === value
            )?.wabaSrno;

            setWabaData({ ...wabaData, selectedWaba: value, wabaSrno });

            setChatData({
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

            setSelectedContextWaba(value);
            setIsOpen(false);
          }}
          placeholder="Choose a WABA"
        /> */}

        <ul className="w-40 border border-gray-300 rounded-md text-sm bg-white z-999">
          <li
            onClick={() => {
              setWabaData({ ...wabaData, selectedWaba: "", wabaSrno: null });
              setSelectedContextWaba("");
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
        ${wabaData?.selectedWaba === waba.mobileNo
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : ""
                }
      `}
            >
              {waba.name}
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={rcsdropdownRef}
        className={`absolute top-20 left-4 md:left-2 w-[90%] md:w-30 shadow-xl rounded-xl bg-white border border-gray-200 z-[999] transform transition-transform duration-300 ${isAgentOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
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
      </div>
    </div>
  );
};

export default ChannelTabs;
