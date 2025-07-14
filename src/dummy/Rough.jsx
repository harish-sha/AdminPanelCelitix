// File: src/components/chat/ChannelTabs.jsx

import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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

const channels = [
  { label: "Dashboard", value: "", icon: <FaThLarge className="text-gray-500 text-base" /> },
  { label: "WhatsApp", value: "wlivechat", icon: <FaWhatsapp className="text-green-500 text-base" /> },
  { label: "RCS", value: "rcs", icon: <FaCommentDots className="text-purple-500 text-base" /> },
  { label: "Instagram", value: "instagram", icon: <FaInstagram className="text-pink-500 text-base" /> },
  { label: "Messenger", value: "messenger", icon: <FaFacebookMessenger className="text-blue-500 text-base" /> },
];

const quickActions = [
  { label: "Assign Agent", icon: <FaUserTie className="text-indigo-500 text-sm" /> },
  { label: "Mark Active", icon: <FaUserCheck className="text-green-500 text-sm" /> },
  { label: "Put on Hold", icon: <FaUserClock className="text-yellow-500 text-sm" /> },
  { label: "Trigger Workflow", icon: <FaBolt className="text-pink-500 text-sm" /> },
];

const ChannelTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeTab = pathname.split("/")[2] || "";

  return (
    <div className="flex flex-col gap-2 relative z-10">
      {/* Tabs */}
      <div className="flex border-b bg-gradient-to-r from-white via-slate-50 to-white shadow-md px-4 rounded-t-2xl overflow-x-auto">
        {channels.map((ch) => (
          <button
            key={ch.value}
            onClick={() => navigate(`/liveChatMain/${ch.value}`)}
            className={`relative group px-5 py-3 text-sm font-medium transition-all duration-300 ease-in-out rounded-t-lg flex items-center gap-2 whitespace-nowrap
              ${
                activeTab === ch.value
                  ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              }`}
          >
            {ch.icon}
            <span>{ch.label}</span>
            {activeTab === ch.value && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute left-0 bottom-0 h-[3px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 flex flex-wrap items-center gap-3 bg-white shadow rounded-b-2xl border-t border-gray-100">
        {quickActions.map((action, i) => (
          <button
            key={i}
            className="flex items-center gap-2 text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full hover:bg-blue-100 hover:text-blue-600 transition"
          >
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChannelTabs;
