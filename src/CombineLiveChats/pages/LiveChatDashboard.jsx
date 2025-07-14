// import { motion } from "framer-motion";

// const LiveChatDashboard = () => {
//   return (
//     <div className="p-4 bg-white shadow rounded-md mx-4 mt-4 w-full">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="text-xl font-semibold text-gray-800"
//       >
//         Welcome to Live Conversations Dashboard
//       </motion.div>
//       <p className="text-sm text-gray-500 mt-1">
//         Access all your real-time chats from WhatsApp, RCS, Instagram, and
//         Messenger in one place.
//       </p>

//       <div className="grid grid-cols-4 gap-4 mt-6">
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-xl shadow"
//         >
//           <h4 className="text-lg font-medium">WhatsApp Active</h4>
//           <p className="text-2xl font-bold mt-2">54</p>
//         </motion.div>

//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="bg-purple-100 border border-purple-400 text-purple-700 p-4 rounded-xl shadow"
//         >
//           <h4 className="text-lg font-medium">RCS Active</h4>
//           <p className="text-2xl font-bold mt-2">34</p>
//         </motion.div>

//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="bg-pink-100 border border-pink-400 text-pink-700 p-4 rounded-xl shadow"
//         >
//           <h4 className="text-lg font-medium">Instagram Active</h4>
//           <p className="text-2xl font-bold mt-2">18</p>
//         </motion.div>

//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="bg-blue-100 border border-blue-400 text-blue-700 p-4 rounded-xl shadow"
//         >
//           <h4 className="text-lg font-medium">Messenger Active</h4>
//           <p className="text-2xl font-bold mt-2">27</p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LiveChatDashboard;

import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookMessenger,
  FaCommentDots,
  FaUserCheck,
  FaServer,
} from "react-icons/fa";

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
    className={`p-4 rounded-xl shadow bg-white border-l-4 ${color} flex items-center gap-4`}
  >
    <div className="text-3xl">{icon}</div>
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  </motion.div>
);

const LiveChatDashboard = () => {
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Live Conversations Dashboard
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track all real-time interactions from WhatsApp, RCS, Instagram, and
          Messenger in one place.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="WhatsApp Active"
          value="54"
          icon={<FaWhatsapp className="text-green-500" />}
          color="border-green-500"
        />
        <StatCard
          title="RCS Active"
          value="34"
          icon={<FaCommentDots className="text-purple-500" />}
          color="border-purple-500"
        />
        <StatCard
          title="Instagram Active"
          value="18"
          icon={<FaInstagram className="text-pink-500" />}
          color="border-pink-500"
        />
        <StatCard
          title="Messenger Active"
          value="27"
          icon={<FaFacebookMessenger className="text-blue-500" />}
          color="border-blue-500"
        />
      </div>

      {/* Activity Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Activity */}
        <div className="col-span-2 bg-white shadow rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Chats
          </h3>
          <ul className="divide-y text-sm text-gray-600">
            <li className="py-2 flex justify-between">
              <span>
                <strong>@john_doe</strong> replied on WhatsApp
              </span>
              <span className="text-xs text-gray-400">2 mins ago</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>
                <strong>@jane_insta</strong> started chat on Instagram
              </span>
              <span className="text-xs text-gray-400">8 mins ago</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>
                <strong>@rcs_user</strong> ended conversation
              </span>
              <span className="text-xs text-gray-400">15 mins ago</span>
            </li>
          </ul>
        </div>

        {/* Agent & System Status */}
        <div className="space-y-6">
          {/* Agents Online */}
          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Agents Online
            </h3>
            <div className="flex items-center gap-3">
              <FaUserCheck className="text-green-500 text-xl" />
              <span className="text-sm text-gray-700">12 active agents</span>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              System Health
            </h3>
            <div className="flex items-center gap-3">
              <FaServer className="text-blue-500 text-xl" />
              <span className="text-sm text-gray-700">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatDashboard;
