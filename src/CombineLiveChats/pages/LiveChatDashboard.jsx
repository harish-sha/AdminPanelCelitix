import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookMessenger,
  FaCommentDots,
  FaServer,
  FaSmile,
  FaClock,
} from "react-icons/fa";

// Reusable Stat Card
const StatCard = ({ title, value, icon, color, borderColor }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
    className={`p-4 rounded-xl shadow bg-white ${borderColor} border-l-4 ${color} flex items-center gap-4`}
  >
    <div className="text-3xl">{icon}</div>
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  </motion.div>
);

// Recent Activity Timeline
const ActivityTimeline = () => (
  <div className="bg-white border rounded-xl shadow-sm p-5">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
    <ul className="relative border-l border-gray-200 ml-4 space-y-5">
      {[
        { user: "@john_doe", action: "Replied on WhatsApp", time: "2 mins ago" },
        { user: "@rcs_user", action: "Started chat on RCS", time: "10 mins ago" },
        { user: "@sophie_insta", action: "Ended conversation", time: "1 hour ago" },
      ].map((item, i) => (
        <li key={i} className="ml-4">
          <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -left-1.5"></div>
          <p className="text-sm text-gray-700">
            <strong>{item.user}</strong> {item.action}
          </p>
          <span className="text-xs text-gray-400">{item.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Live Conversations Table
const LiveConversations = () => (
  <div className="bg-white border rounded-xl shadow-sm p-5">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Live Conversations</h3>
    <table className="w-full text-sm text-gray-700">
      <thead className="text-left border-b text-gray-500 text-xs uppercase">
        <tr>
          <th className="pb-2">User</th>
          <th className="pb-2">Channel</th>
          <th className="pb-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {[
          { user: "John Doe", channel: "WhatsApp", status: "Active" },
          { user: "Priya Verma", channel: "Instagram", status: "Typing" },
          { user: "Alex Carter", channel: "Messenger", status: "Resolved" },
        ].map((chat, i) => (
          <tr key={i} className="border-b last:border-none">
            <td className="py-2 flex items-center gap-2">
              <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
              {chat.user}
            </td>
            <td className="py-2">{chat.channel}</td>
            <td className="py-2">
              <span
                className={`px-2 py-1 rounded-full text-xs ${chat.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : chat.status === "Typing"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-600"
                  }`}
              >
                {chat.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Quick Insights Panel
const QuickInsights = () => (
  <div className="bg-white border rounded-xl shadow-sm p-5">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Insights</h3>
    <ul className="text-sm space-y-3 text-gray-700">
      <li className="flex justify-between items-center">
        <span className="flex items-center gap-2">
          <FaClock className="text-blue-500" /> Avg. Response Time
        </span>
        <span className="font-medium">1m 35s</span>
      </li>
      <li className="flex justify-between items-center">
        <span className="flex items-center gap-2">
          <FaSmile className="text-green-500" /> Customer Satisfaction
        </span>
        <span className="font-medium">94%</span>
      </li>
    </ul>
  </div>
);

const ChatVolume = () => (
  <div className="bg-white border rounded-xl shadow-sm p-5">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Chat Volume (7 Days)</h3>
    <div className="flex gap-2 items-end h-24">
      {[40, 55, 70, 30, 65, 80, 50].map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex-1 bg-gradient-to-t from-blue-300 to-blue-500 rounded"
        ></motion.div>
      ))}
    </div>
  </div>
);

const TopAgents = () => (
  <div className="bg-white border rounded-xl shadow-sm p-5">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Agents</h3>
    <ul className="space-y-3 text-sm text-gray-700">
      {[
        { name: "Alex Carter", chats: 120 },
        { name: "Priya Verma", chats: 95 },
        { name: "John Smith", chats: 80 },
      ].map((agent, i) => (
        <li key={i} className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-300 rounded-full">
              <img src="/default-avatar.jpg" alt="" className="rounded-full" />
            </div>
            <span>{agent.name}</span>
          </div>
          <span className="text-gray-500">{agent.chats} chats</span>
        </li>
      ))}
    </ul>
  </div>
);

const LiveChatDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 h-full overflow-scroll">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-5 flex flex-wrap items-center md:justify-between justify-center"
      >
        <h2 className="text-2xl font-semibold text-gray-800 ">Live Chat Dashboard</h2>
        <p className="text-sm text-gray-700 ">
          Track live conversations, agent performance, and user activity at a glance.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="WhatsApp Active" value="54" icon={<FaWhatsapp className="text-green-500" />} borderColor="border-green-400" />
        <StatCard title="RCS Active" value="34" icon={<FaCommentDots className="text-purple-500" />} borderColor="border-purple-400" />
        <StatCard title="Instagram Active" value="18" icon={<FaInstagram className="text-pink-500" />} borderColor="border-pink-400" />
        <StatCard title="Messenger Active" value="27" icon={<FaFacebookMessenger className="text-blue-500" />} borderColor="border-blue-400" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-scroll">
        <div className="col-span-2 space-y-8">
          {/* <LiveConversations /> */}
          <ActivityTimeline />
          <ChatVolume />
        </div>
        <div className="space-y-8">
          <QuickInsights />
          <TopAgents />
          <div className="bg-white border rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">System Health</h3>
            <div className="flex items-center gap-3 text-gray-700">
              <FaServer className="text-blue-500 text-xl" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatDashboard;

