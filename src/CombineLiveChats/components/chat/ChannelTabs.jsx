import { useState } from "react";
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

const quickActions = [
  {
    label: "Assign Agent",
    icon: <FaUserTie className="text-indigo-500 text-sm" />,
  },
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

const ChannelTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeTab = pathname.split("/")[2];
  const [showActions, setShowActions] = useState(true);

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
            <div className="px-4 py-2 md:flex  w-full gap-3 bg-white shadow rounded-md border border-gray-100 overflow-auto ">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className="flex flex-nowrap whitespace-nowrap items-center justify-center gap-2 text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full hover:bg-blue-100 hover:text-blue-600 transition mb-1 md:mb-0"
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChannelTabs;
