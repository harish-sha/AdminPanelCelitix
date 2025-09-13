// import React from "react";
// import { motion } from "framer-motion";
// import { Grid } from "@mui/material";
// import {
//   WhatsApp,
//   Email,
//   Call,
//   Lock,
//   Message,
//   PhoneAndroid,
//   SyncAlt,
//   Person,
//   Star,
//   TaskAlt,
//   TrendingUp,
//   Insights,
// } from "@mui/icons-material";
// import whatsappAnime from "../../public/animation/whatsappanimation.json";
// import Lottie from "lottie-react";

// const services = [
//   {
//     name: "WhatsApp",
//     icon: WhatsApp,
//     desc: "Send real-time notifications",
//     color: "from-green-100 to-green-300",
//   },
//   {
//     name: "RCS",
//     icon: Message,
//     desc: "Interactive messaging solution",
//     color: "from-purple-100 to-purple-300",
//   },
//   {
//     name: "OBD",
//     icon: Call,
//     desc: "Automated outbound dialer",
//     color: "from-yellow-100 to-yellow-300",
//   },
//   {
//     name: "IBD",
//     icon: Call,
//     desc: "Track inbound communications",
//     color: "from-indigo-100 to-indigo-300",
//   },
//   {
//     name: "Click2Call",
//     icon: PhoneAndroid,
//     desc: "One-click voice connect",
//     color: "from-pink-100 to-pink-300",
//   },
//   {
//     name: "Email",
//     icon: Email,
//     desc: "Campaign and transactional email",
//     color: "from-blue-100 to-blue-300",
//   },
//   {
//     name: "App Authenticator",
//     icon: Lock,
//     desc: "Secure 2FA login solutions",
//     color: "from-gray-100 to-gray-300",
//   },
//   {
//     name: "Two-Way SMS",
//     icon: SyncAlt,
//     desc: "Bi-directional messaging",
//     color: "from-red-100 to-red-300",
//   },
// ];

// const quickStats = [
//   {
//     icon: <TaskAlt className="text-green-600" />,
//     label: "Active Campaigns",
//     value: 32,
//   },
//   {
//     icon: <TrendingUp className="text-blue-600" />,
//     label: "Engagement Rate",
//     value: "78%",
//   },
//   {
//     icon: <Star className="text-yellow-500" />,
//     label: "Client Rating",
//     value: "4.8/5",
//   },
// ];

// const Dashboard = () => {
//   return (
//     <div className="bg-white text-gray-900 rounded-2xl p-4 space-y-6 min-h-screen">
//       {/* Logged In User Card */}
//       <motion.div
//         className="rounded-2xl shadow-md p-6 flex items-center justify-between gap-6 bg-gradient-to-br from-blue-50 to-blue-100"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex items-center gap-4">
//           <Person className="text-blue-600 text-4xl" />
//           <div>
//             <h2 className="text-lg font-bold">Welcome back, John!</h2>
//             <p className="text-sm opacity-80">
//               You're doing great. Here’s a quick overview of your dashboard.
//             </p>
//           </div>
//         </div>
//         <div className="grid grid-cols-3 gap-4">
//           {quickStats.map((stat, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl shadow p-3 px-5 flex flex-col items-start justify-center"
//             >
//               <div className="text-2xl">{stat.icon}</div>
//               <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
//               <div className="font-semibold text-lg">{stat.value}</div>
//             </div>
//           ))}
//         </div>
//       </motion.div>

//       <Lottie
//         animationData={whatsappAnime}
//         loop
//         autoplay
//         style={{ width: "100px", height: "100px" }}
//       />

//       {/* Service Cards */}
//       <Grid container spacing={3}>
//         {services.map((service, index) => {
//           const IconComponent = service.icon;
//           return (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className={`rounded-xl bg-gradient-to-br ${service.color} p-5 h-40 shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-300`}
//               >
//                 <motion.div
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex items-center justify-between z-10"
//                 >
//                   <div className="font-semibold text-lg">{service.name}</div>
//                   <div className="text-3xl">
//                     <IconComponent className="text-gray-700 group-hover:rotate-6 transition-transform duration-300" />
//                   </div>
//                 </motion.div>
//                 <p className="text-sm opacity-70 mt-3 z-10">{service.desc}</p>
//               </motion.div>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Modern Insight Box Section */}
//       <motion.div
//         className="mt-4 bg-gradient-to-r from-blue-100 to-white border border-blue-200 rounded-2xl shadow-md p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="flex items-center gap-4 mb-4">
//           <Insights className="text-blue-500 text-3xl" />
//           <h2 className="text-xl font-semibold">Platform Highlights</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
//             <h3 className="font-bold text-base mb-1">Boosted Deliverability</h3>
//             <p className="text-sm text-gray-600">
//               New engine improves message delivery by 22%.
//             </p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
//             <h3 className="font-bold text-base mb-1">Real-Time Flow Testing</h3>
//             <p className="text-sm text-gray-600">
//               Test WhatsApp & RCS flows in seconds.
//             </p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
//             <h3 className="font-bold text-base mb-1">Multi-Channel Sync</h3>
//             <p className="text-sm text-gray-600">
//               Unified dashboard now supports all channels together.
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Grid } from "@mui/material";
// import {
//   WhatsApp,
//   Email,
//   Call,
//   Lock,
//   Message,
//   PhoneAndroid,
//   SyncAlt,
//   Person,
//   Star,
//   TaskAlt,
//   TrendingUp,
//   Insights,
//   SmartToy,
//   SupportAgent,
//   Feedback,
// } from "@mui/icons-material";
// import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
// import whatsappAnime from "../assets/animation/whatsappanimation.json";
// import whatsappAnime2 from "../assets/animation/whatsappanimation2.json";
// import smsAnime from "../assets/animation/smsanime.json";
// import rcs from "../assets/animation/rcs.json";
// import sms from "../assets/animation/sms.json";
// import auth from "../assets/animation/auth.json";
// import email from "../assets/animation/email.json";
// import email2 from "../assets/animation/email2.json";
// import Lottie from "lottie-react";
// import { getUserDetails } from "@/apis/user/user";
// import toast from "react-hot-toast";

// const services = [
//   {
//     name: "WhatsApp",
//     icon: WhatsApp,
//     animation: whatsappAnime2,
//     desc: "Send real-time notifications",
//     color: "from-green-100 to-green-300",
//   },
//   {
//     name: "RCS",
//     icon: Message,
//     animation: rcs,
//     desc: "Interactive messaging solution",
//     color: "from-purple-100 to-purple-300",
//   },
//   {
//     name: "OBD",
//     icon: Call,
//     desc: "Automated outbound dialer",
//     color: "from-yellow-100 to-yellow-300",
//   },
//   {
//     name: "IBD",
//     icon: Call,
//     desc: "Track inbound communications",
//     color: "from-indigo-100 to-indigo-300",
//   },
//   {
//     name: "SMS",
//     icon: PhoneAndroid,
//     animation: sms,
//     desc: "Send and receive SMS",
//     color: "from-pink-100 to-pink-300",
//   },
//   {
//     name: "Email",
//     icon: Email,
//     animation: email2,
//     desc: "Campaign and transactional email",
//     color: "from-blue-100 to-blue-300",
//   },
//   {
//     name: "App Authenticator",
//     icon: Lock,
//     animation: auth,
//     desc: "Secure 2FA login solutions",
//     color: "from-gray-100 to-gray-300",
//   },
//   {
//     name: "Two-Way SMS",
//     icon: SyncAlt,
//     desc: "Bi-directional messaging",
//     color: "from-red-100 to-red-300",
//   },
// ];

// const quickStats = [
//   {
//     icon: <TaskAlt className="text-green-600" />,
//     label: "Active Campaigns",
//     value: 32,
//   },
//   {
//     icon: <TrendingUp className="text-blue-600" />,
//     label: "Engagement Rate",
//     value: "78%",
//   },
//   {
//     icon: <Star className="text-yellow-500" />,
//     label: "Client Rating",
//     value: "4.8/5",
//   },
// ];

// const bots = [
//   {
//     name: "Support Bot",
//     desc: "Handles common queries 24/7",
//     icon: SupportAgent,
//   },
//   {
//     name: "Onboarding Bot",
//     desc: "Welcomes and guides new users",
//     icon: SmartToy,
//   },
//   { name: "Feedback Bot", desc: "Collects customer feedback", icon: Feedback },
// ];

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     emailId: "",
//     mobileNo: "",
//     address: "",
//     companyName: "",
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       setLoading(true);
//       const response = await getUserDetails();

//       if (response && response.statusCode === 200) {
//         const user = response.data[0];

//         // ✅ Populate formData with API response
//         setUserData(user);
//         setFormData({
//           firstName: user.firstName || "",
//           lastName: user.lastName || "",
//           emailId: user.email || "",
//           mobileNo: user.mobileNo || "",
//           address: user.address || "",
//           companyName: user.companyName || "",
//         });
//       } else {
//         console.error("Failed to load user details.");
//         toast.error("Failed to load user details!");
//       }
//       setLoading(false);
//     };

//     fetchUserDetails();
//   }, []);
//   return (
//     <div className="bg-white text-gray-900 rounded-2xl p-4 space-y-6 min-h-[calc(100vh-6rem)]">
//       {/* Logged In User Card */}
//       <motion.div
//         className="rounded-2xl shadow-md p-6 flex items-center justify-between flex-wrap gap-6 bg-gradient-to-br from-blue-50 to-blue-100"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex items-center flex-wrap justify-center gap-4">
//           <div className="bg-blue-200 border-2 border-blue-400 h-20 w-20 flex items-center justify-center rounded-full shadow-2xl">
//             <Person
//               className="text-blue-600"
//               sx={{
//                 fontSize: 30,
//               }}
//             />
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold">
//               Welcome back, {formData.firstName || "User"}{" "}
//             </h2>
//             <p className="text-sm opacity-80">
//               You're doing great. Here's a quick overview of your dashboard.
//             </p>
//           </div>
//         </div>
//         <div className="grid lg:grid-cols-3 gap-4 grid-cols-1  items-center">
//           {quickStats.map((stat, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl shadow p-3 px-5 flex flex-col items-start justify-center"
//             >
//               <div className="text-2xl">{stat.icon}</div>
//               <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
//               <div className="font-semibold text-lg">{stat.value}</div>
//             </div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Service Cards */}
//       <Grid container spacing={3}>
//         {services.map((service, index) => {
//           const IconComponent = service.icon;
//           return (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className={`rounded-xl bg-gradient-to-br ${service.color} p-5 h-44 shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-300`}
//               >
//                 <div className="font-semibold text-lg text-gray-800">
//                   {service.name}
//                 </div>
//                 <motion.div className="flex items-center justify-between z-10">
//                   <div className=" absolute right-5">
//                     {service.animation ? (
//                       <Lottie
//                         animationData={service.animation}
//                         loop
//                         autoplay
//                         style={{ width: "150px", height: "120px" }}
//                       />
//                     ) : (
//                       <IconComponent className="text-gray-700 group-hover:rotate-6 transition-transform duration-300" />
//                     )}
//                   </div>
//                 </motion.div>
//                 <p className="text-sm opacity-70 mt-3 z-10">{service.desc}</p>
//               </motion.div>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Bot Section */}
//       <motion.div
//         className="mt-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl shadow-md p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="flex items-center gap-4 mb-4">
//           <SmartToy className="text-purple-600 text-3xl" />
//           <h2 className="text-xl font-semibold">Your Bots</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           {bots.map((bot, index) => {
//             const BotIcon = bot.icon;
//             return (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.03 }}
//                 className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
//               >
//                 <div className="flex items-center gap-3 mb-2">
//                   <BotIcon className="text-xl text-purple-600" />
//                   <h3 className="font-bold text-base">{bot.name}</h3>
//                 </div>
//                 <p className="text-sm text-gray-600">{bot.desc}</p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </motion.div>

//       {/* Modern Insight Box Section */}
//       <motion.div
//         className="mt-4 bg-gradient-to-r from-blue-100 to-white border border-blue-200 rounded-2xl shadow-md p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="flex items-center gap-4 mb-4">
//           <Insights className="text-blue-500 text-3xl" />
//           <h2 className="text-xl font-semibold">Platform Highlights</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
//             <h3 className="font-bold text-base mb-1">Boosted Deliverability</h3>
//             <p className="text-sm text-gray-600">
//               New engine improves message delivery by 22%.
//             </p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
//             <h3 className="font-bold text-base mb-1">Real-Time Flow Testing</h3>
//             <p className="text-sm text-gray-600">
//               Test WhatsApp & RCS flows in seconds.
//             </p>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
//             <h3 className="font-bold text-base mb-1">Multi-Channel Sync</h3>
//             <p className="text-sm text-gray-600">
//               Unified dashboard now supports all channels together.
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Dashboard;

// new changes start

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Grid } from "@mui/material";
import {
  WhatsApp,
  Email,
  Call,
  Lock,
  Message,
  PhoneAndroid,
  SyncAlt,
  Person,
  Star,
  TaskAlt,
  TrendingUp,
  Insights,
  SmartToy,
  SupportAgent,
  Feedback,
} from "@mui/icons-material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import whatsappAnime from "../assets/animation/whatsappanimation.json";
import whatsappAnime2 from "../assets/animation/whatsappanimation2.json";
import smsAnime from "../assets/animation/smsanime.json";
import rcs from "../assets/animation/rcs.json";
import sms from "../assets/animation/sms.json";
import auth from "../assets/animation/auth.json";
import email from "../assets/animation/email.json";
import email2 from "../assets/animation/email2.json";
import Animationsms from "../assets/animation/Animation-sms.json";
import Animationrcs from "../assets/animation/Animation-rcs.json";
import Animationibd from "../assets/animation/Animation-ibd.json";
import Animationobd from "../assets/animation/Animation-obd.json";
import Animationwhatsapp2 from "../assets/animation/Animation-whatsapp2.json";
import Lottie from "lottie-react";
import { getUserDetails } from "@/apis/user/user";
import toast from "react-hot-toast";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

import CountUp from "react-countup";
import RevenueChartWithFilter from "./components/balanceChart";
import { useUser } from "@/context/auth";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CustomTooltip from "@/components/common/CustomTooltip";
import { Loop as LoopIcon } from "@mui/icons-material";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import integration from "../assets/animation/integration.json";
import zohoicon from "../assets/icons/zoho.svg";
import zapier from "../assets/icons/zapier.svg";
import wordpress from "../assets/icons/wordpress.svg";
import woocommerce from "../assets/icons/woocommerce.svg";
import telegram from "../assets/icons/telegram.svg";
import slack from "../assets/icons/slack.svg";
import shopify from "../assets/icons/shopify.svg";
import instagram from "../assets/icons/instagram.svg";
import freshdesk from "../assets/icons/freshdesk.svg";
import facebookmessenger from "../assets/icons/facebookmessenger.svg";

import { FaWhatsapp, FaPhone, FaRegCommentDots, FaSms } from "react-icons/fa";
import {
  dailySeriveUsage,
  dailyWalletUsage,
  fetchBalance,
  getOldApiKey,
} from "@/apis/settings/setting";
import moment from "moment";

import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import SmsIcon from "@mui/icons-material/Sms";

const bots = [
  {
    name: "Support Bot",
    desc: "Handles common queries 24/7",
    icon: SupportAgent,
  },
  {
    name: "Onboarding Bot",
    desc: "Welcomes and guides new users",
    icon: SmartToy,
  },
  { name: "Feedback Bot", desc: "Collects customer feedback", icon: Feedback },
];

const integrations = [
  zohoicon,
  zapier,
  wordpress,
  woocommerce,
  telegram,
  slack,
  shopify,
  instagram,
  freshdesk,
  facebookmessenger,
];

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
  });
  const [search, setSearch] = useState("");
  const [balance, setBalance] = useState(0);
  const [rechargableCredit, setRechargableCredit] = useState(0);
  const [showRefresh, setShowRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("Whatsapp");

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const response = await getUserDetails();

      if (response && response.statusCode === 200) {
        const user = response.data[0];

        setUserData(user);
        setFormData({
          firstName: user.firstName || "",
        });
      } else {
        console.error("Failed to load user details.");
        toast.error("Failed to load user details!");
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const { user } = useUser();

  const quickStats = [
    {
      title: "Current Balance",
      value: (
        <CountUp
          start={0}
          end={balance}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      showRefreshIcon: true,
      bgColor: "bg-indigo-100/60",
      textColor: "text-gray-900",
      // buttonColor: "text-gray-600",
      icon: <AccountBalanceIcon className="text-green-900" />,
    },
    {
      title: "Engagement Rate",
      value: "78%",
      bgColor: "bg-green-100/60",
      textColor: "text-gray-900",
      showRefreshIcon: false,
      // iconColor: "text-gray-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
    },
    {
      title: "Client Rating",
      value: "4.8/5",
      bgColor: "bg-teal-100/60",
      textColor: "text-gray-900",
      showRefreshIcon: false,
      // iconColor: "text-gray-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
    },
  ];

  const getBalance = async () => {
    setIsLoading(true);
    try {
      const res = await fetchBalance();
      setBalance(parseFloat(res.balance));
      setRechargableCredit(parseFloat(res.rechargableCredit));
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  const services = [
    {
      title: "Whatsapp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
      desc: "Send real-time notifications",
      bgColor: "bg-indigo-90/50",
      textColor: "text-gray-900",
    },
    {
      title: "SMS",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
      desc: "Send and receive SMS",
      bgColor: "bg-green-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "RCS",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
      desc: "Interactive messaging solution",
      bgColor: "bg-teal-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "OBD",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
      desc: "Automated outbound dialer",
      bgColor: "bg-indigo-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "IBD",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
      desc: "Track inbound communications",
      bgColor: "bg-green-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "EMAIL",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
      desc: "Campaign and transactional email",
      bgColor: "bg-teal-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "Authentication",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
      desc: "Secure 2FA login solutions",
      bgColor: "bg-indigo-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "TWO-WAY SMS",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
      desc: "Bi-directional messaging",
      bgColor: "bg-green-100/60",
      textColor: "text-gray-900",
    },
  ];

  const walletData = [
    { date: "Sep 01", usage: 500 },
    { date: "Sep 02", usage: 250 },
    { date: "Sep 03", usage: 1200 },
    { date: "Sep 04", usage: 1200 },
    { date: "Sep 05", usage: 1200 },
  ];

  // filter
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  // *************************************************Daily service usages START***********************************
  const serviceTabs = [
    {
      title: "Whatsapp",
    },
    {
      title: "SMS",
    },
    {
      title: "RCS",
    },
    {
      title: "OBD",
    },
    {
      title: "IBD",
    },
    {
      title: "EMAIL",
    },
    {
      title: "Authentication",
    },
    {
      title: "TWO-WAY SMS",
    },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [walletUsageData, setWalletUsageData] = useState([]);
  const [activeServices, setActiveServices] = useState([]);

  const FILTERS = ["Day", "Month"];

  const icons = {
    whatsapp: <FaWhatsapp className="text-green-500 text-2xl" />,
    voice: <FaPhone className="text-blue-500 text-2xl" />,
    rcs: <FaRegCommentDots className="text-indigo-500 text-2xl" />,
    sms: <FaSms className="text-yellow-500 text-2xl" />,
  };

  const COLORS = ["#9FE0DF", "#BD94D6", "#DCCE89", "#7C80E0"];

  const [filter, setFilter] = useState("Day");
  const [usageData, setUsageData] = useState(null);

  const dailyServiceUsage = async () => {
    const payload = {
      userSrno: 0,
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),
      // fromDate: "2022-09-06",
      // toDate: "2025-09-06",
    };
    setIsLoading(true);
    try {
      const data = await dailySeriveUsage(payload);
      console.log("daily service usage", data);

      if (data && Object.keys(data).length > 0) {
        setUsageData(data);
      } else {
        setUsageData({});
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setUsageData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const servicesDailyUsage = ["whatsapp", "voice", "rcs", "sms"];

  const chartData = servicesDailyUsage.map((s) => {
    const item = usageData?.[s]?.[0] || {};
    return {
      service: s,
      name: s.toUpperCase(),
      sent: item.totalSent || 0,
      cost: item.totalCharge || 0,
      icon: icons[s],
    };
  });
  console.log("chartData:", chartData);

  const [selectedServices, setSelectedServices] = useState(servicesDailyUsage);
  const [chartType, setChartType] = useState("bar");
  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const filteredChartData =
    selectedServices.length > 0
      ? chartData.filter((item) => selectedServices.includes(item.service))
      : chartData;

  const totalSent = filteredChartData.reduce((sum, item) => sum + item.sent, 0);

  useEffect(() => {
    const today = new Date();

    if (filter === "Day") {
      const newStart = new Date(today);
      const newEnd = new Date(today);
      setStartDate(newStart);
      setEndDate(newEnd);
    } else if (filter === "Month") {
      setStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
      setEndDate(today);
    } else if (filter === "Year") {
      setStartDate(new Date(today.getFullYear(), 0, 1));
      setEndDate(today);
    }
  }, [filter]);

  useEffect(() => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      dailyServiceUsage();
    }
  }, [startDate, endDate]);

  const [oldApiKey, setOldApiKey] = useState("");
  const [visible, setVisible] = useState(false);

  const integrationUrl = `https://int.celitix.com/?user_id=${oldApiKey}&api_key=AIzaSyBqlfMk-_yK_3ICUUYej_nVUDXz0cP327Y`;

  // *************************************************Daily service usages START***********************************

  const rings = [60, 110, 160];

  const ringsicons = [
    { src: slack, ring: 1, angle: 90 },
    { src: zohoicon, ring: 2, angle: 0 },
    { src: shopify, ring: 1, angle: 230 },
    { src: wordpress, ring: 2, angle: 60 },
    { src: telegram, ring: 2, angle: 120 },
    { src: zapier, ring: 2, angle: 210 },
    { src: instagram, ring: 1, angle: 350 },
    { src: woocommerce, ring: 2, angle: 280 },
    { src: freshdesk, ring: 0, angle: 180 },
    { src: facebookmessenger, ring: 0, angle: 0 },
  ];

  const size = 400;
  const center = size / 2;

  return (
    <div className="bg-white text-gray-900 rounded-2xl p-4 space-y-6 min-h-[calc(100vh-6rem)]">
      {/* Logged In User Card */}
      {/* <motion.div
        className="rounded-2xl shadow-md p-6 flex items-center justify-between flex-wrap gap-6 bg-gradient-to-br from-blue-50 to-blue-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center flex-wrap justify-center gap-4">
          <div className="bg-blue-200 border-2 border-blue-400 h-20 w-20 flex items-center justify-center rounded-full shadow-2xl">
            <Person
              className="text-blue-600"
              sx={{
                fontSize: 30,
              }}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              Welcome back, {formData.firstName || "User"}{" "}
            </h2>
            <p className="text-sm opacity-80">
              You're doing great. Here's a quick overview of your dashboard.
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 grid-cols-1  items-center">
          {quickStats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-3 px-5 flex flex-col items-start justify-center"
            >
              <div className="text-2xl">{stat.icon}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              <div className="font-semibold text-lg">{stat.value}</div>
            </div>
          ))}
        </div>
      </motion.div> */}

      <div className="relative h-auto  overflow-hidden bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 text-gray-800 rounded-xl">
        <svg
          className="absolute bottom-0 left-0 w-full h-[69%] z-0"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#0099ff"
            fillOpacity="0.2"
            d="M0,256L40,240C80,224,160,192,240,176C320,160,400,160,480,165.3C560,171,640,181,720,192C800,203,880,213,960,218.7C1040,224,1120,224,1200,202.7C1280,181,1360,139,1400,117.3L1440,96L1440,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
          M0,256L40,240C80,224,160,192,240,176C320,160,400,160,480,165.3C560,171,640,181,720,192C800,203,880,213,960,218.7C1040,224,1120,224,1200,202.7C1280,181,1360,139,1400,117.3L1440,96L1440,320L0,320Z;

          M0,224L40,208C80,192,160,160,240,144C320,128,400,128,480,144C560,160,640,192,720,202.7C800,213,880,203,960,186.7C1040,171,1120,149,1200,144C1280,139,1360,149,1400,154.7L1440,160L1440,320L0,320Z;

          M0,256L40,240C80,224,160,192,240,176C320,160,400,160,480,165.3C560,171,640,181,720,192C800,203,880,213,960,218.7C1040,224,1120,224,1200,202.7C1280,181,1360,139,1400,117.3L1440,96L1440,320L0,320Z"
            />
          </path>
        </svg>

        <div className="flex flex-col justify-center items-center  md:flex-row md:justify-between mt-5 gap-4 ">
          {/* Brand Name */}
          <div className="z-10 ml-6 order-1 md:order-1 ">
            <h2 className="md:text-xl text-6xl lg:text-4xl font-semibold text-grat-700">
              Celitix
            </h2>
          </div>

          {/* Search Bar */}
          <div className="  z-10 order-3 md:order-2 ">
            <button className="bg-gray-50   px-3 sm:px-5 py-2 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
                <SearchIcon className="text-gray-700" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search here"
                  className="bg-transparent outline-none text-gray-400 placeholder-gray-400 w-full sm:w-auto"
                />
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <span className="text-xs sm:text-sm text-gray-800 font-semibold">
                  ⌘
                </span>
                <span className="text-xs sm:text-sm text-gray-800 font-medium">
                  +
                </span>
                <span className="text-xs sm:text-sm text-gray-800 font-medium">
                  K
                </span>
              </div>
            </button>
          </div>

          <div className="flex justify-center items-center md:gap-3 gap-4 z-10 mr-6 order-2 md:order-3">
            {/* Notification */}
            <button className="relative p-2 sm:p-3 rounded-full bg-white/40 backdrop-blur-md hover:bg-white/60 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
              6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 
              8 7.388 8 8.75v5.408c0 .379-.214.725-.553.895L6 17h5"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile  */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
              <span className="absolute inset-0 flex items-center justify-center text-sm sm:text-md text-white bg-black/40">
                {(formData.firstName || "U").charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className=" flex flex-col md:flex-row items-end gap-4 md:p-4 p-6 mt-0 md:mt-40">
          {quickStats.map((stat, i) => (
            <div
              key={i}
              className={`relative flex flex-col justify-between p-4 sm:p-5 w-full sm:w-56 h-28 sm:h-32 rounded-2xl shadow-sm ${stat.bgColor} backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-2 font-medium ${stat.textColor}`}
                >
                  <span className="text-sm sm:text-base">{stat.title}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">⋮</button>
              </div>
              <div
                className={`text-xl sm:text-2xl font-bold ${stat.textColor}`}
              >
                {stat.value}
              </div>
              <div className="absolute bottom-4 right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100">
                {stat.showRefreshIcon ? (
                  <CustomTooltip title="Refresh Balance" placement="top" arrow>
                    <div className="cursor-pointer">
                      {isLoading ? (
                        <LoopIcon className="text-[16px] sm:text-[18px] animate-spin text-blue-400 cursor-pointer" />
                      ) : (
                        <button onClick={getBalance}>
                          <LoopIcon className="text-blue-400 cursor-pointer" />
                        </button>
                      )}
                    </div>
                  </CustomTooltip>
                ) : (
                  stat.icon
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* service cards */}
      <div className="relative overflow-y-scroll md:overflow-hidden h-[40vh] bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 border border-gray-200 rounded-2xl shadow-md backdrop-blur-2xl text-gray-800">
        <div className="mt-5 ml-10">
          <h2 className="text-2xl font-bold  gradient-animate">
            Services Cards
          </h2>
        </div>

        {/* Diagonal wave lines background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="diagonalLines"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="40"
                stroke="rgba(96, 94, 160,0.1)"
                strokeWidth="2"
              />
            </pattern>
          </defs>

          {/* Animated rect */}
          <rect
            width="100%"
            height="100%"
            fill="url(#diagonalLines)"
            className="animate-diagonal"
          />
        </svg>

        <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6  items-end gap-4 p-4 md:p-6 mt-0 md:mt-5 ">
          {services.map((s, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between 
                    p-4 sm:p-5 w-full sm:w-56 h-28 sm:h-32 
                    rounded-2xl shadow-sm ${s.bgColor} 
                    backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-2 font-medium ${s.textColor}`}
                >
                  <span className="text-md ">{s.title}</span>
                </div>
                <div className="absolute top-4 right-4 w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100">
                  {s.icon}
                </div>
              </div>
              <div className={`text-xs  font-semibold ${s.textColor}`}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>

        {/* TailwindCSS keyframes animation */}
        <style jsx>{`
          .gradient-animate {
            background: linear-gradient(
              90deg,
              #93c5fd,
              /* blue-800 */ #2e29b2,
              /* purple-800 */ #6e3c7b,
              /* indigo-800 */ #4dbab4
            );
            background-size: 200% 100%; /* make it twice as wide for animation */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shine 3s linear infinite;
          }

          @keyframes shine {
            0% {
              background-position: 0% 0%;
            }
            100% {
              background-position: 200% 0%;
            }
          }

          @keyframes moveDiagonal {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(-40px, 40px);
            }
          }
          .animate-diagonal {
            animation: moveDiagonal 8s linear infinite;
          }
        `}</style>
      </div>

      {/* intigration section */}
      <div className="space-y-4 w-full mt-10 flex flex-col sm:flex-row gap-4">
        {/* Left Wallet Chart */}
        <div className="flex-1 bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 p-6 rounded-2xl shadow-lg relative flex flex-col">
          <div>
            <h3 className="text-xl font-semibold">Wallet Balance Table</h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              {isOpen ? (
                <FilterAltOffIcon
                  onClick={handleClick}
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                />
              ) : (
                <FilterAltIcon
                  onClick={handleClick}
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                />
              )}

              {isOpen && (
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <UniversalDatePicker
                    label="From Date"
                    className="w-full sm:w-auto"
                  />
                  <UniversalDatePicker
                    label="To Date"
                    className="w-full sm:w-auto"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Chart Section */}
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={walletData}
                barSize={window.innerWidth < 640 ? 20 : 38}
                margin={{ top: 15, right: 10, left: -10, bottom: 10 }}
              >
                <defs>
                  <linearGradient
                    id="walletGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#6b7280", fontSize: 10, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 10, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, "Spend"]}
                />
                <Bar
                  dataKey="usage"
                  fill="url(#walletGradient)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total Spend */}
          <div className="mt-4 flex justify-between items-center border-t border-gray-200 pt-3 px-2 sm:px-4">
            <span className="font-semibold text-gray-700">Total Spend</span>
            <span className="font-bold text-gray-900">₹4350.00</span>
          </div>
        </div>

        {/* Right SVG  Circles */}
        <div className="flex-1 relative bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 rounded-xl ">
          <div className="mb-0">
            <h2 className="text-xl font-extrabold text-gray-800 mt-5 text-center">
              Add Integrations
            </h2>
            {/* <p className="text-gray-500 text-center text-sm mt-2">
              Connect Freshdesk, Zoho, Shopify, and more from a single
              dashboard.
            </p> */}
          </div>

          <div className="flex items-center justify-center  ">
            <div className="relative" style={{ width: size, height: size }}>
              {/* orbiting layer */}
              <div className="absolute inset-0 animate-spin-slow">
                {/* rings */}
                {rings.map((r, i) => (
                  <div
                    key={i}
                    className="absolute border border-gray-300 rounded-full"
                    style={{
                      width: r * 2,
                      height: r * 2,
                      top: center - r,
                      left: center - r,
                    }}
                  />
                ))}

                {/* orbiting icons */}
                {ringsicons.map((icon, i) => {
                  const r = rings[icon.ring];
                  const rad = (icon.angle * Math.PI) / 180;
                  const x = center + r * Math.cos(rad) - 20;
                  const y = center + r * Math.sin(rad) - 20;
                  return (
                    <div
                      key={i}
                      className="absolute animate-spin-slower" // <-- spin each icon itself
                      style={{ left: x, top: y }}
                    >
                      <img
                        src={icon.src}
                        alt="icon"
                        className="w-10 h-10 rounded-full bg-white shadow-md p-1"
                      />
                    </div>
                  );
                })}
              </div>

              {/* center circle (static) */}
              <div
                className="absolute rounded-full bg-white shadow-md"
                style={{
                  width: 60,
                  height: 60,
                  top: center - 30,
                  left: center - 30,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Service Usages */}
      <div className="bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 p-3 flex flex-wrap justify-center items-center  gap-4 rounded-lg">
        <div className="flex flex-wrap  gap-4 ">
          {servicesDailyUsage.map((s) => (
            <div
              key={s}
              onClick={() => toggleService(s)}
              className={`flex items-center gap-2 rounded-lg p-2 cursor-pointer hover:shadow transition ${
                selectedServices.includes(s)
                  ? "bg-gradient-to-r from-indigo-200 to-purple-200"
                  : "bg-gray-200 opacity-50"
              }`}
            >
              {icons[s]}
              <span className="font-medium text-gray-800">
                {s.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/*Service UsagesContent */}
      <div className="bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 rounded-xl shadow-lg p-6 h-[30%] mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h2 className="font-semibold text-gray-700 text-base sm:text-lg">
            Service Usage Overview
          </h2>
          <div className="flex gap-2">
            <div className="flex gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full border text-sm font-medium transition-all duration-200
                        ${
                          filter === f
                            ? "bg-blue-500 text-white border-blue-500 shadow-md"
                            : "bg-blue-100 text-gray-900 border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                        }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Row */}
        <div className="flex flex-wrap gap-3 mb-7">
          {chartData
            .filter((item) =>
              selectedServices.includes(item.name.toLowerCase())
            )
            .map((item, index) => (
              <div className="">
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between  p-3  bg-white rounded-2xl  w-50  md:w-70  h-20 shadow-md 
               border-1 border-blue-200   bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100 relative overflow-hidden "
                >
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.15),rgba(255,255,255,0.15)_12px,transparent_12px,transparent_24px)] rounded-2xl pointer-events-none" />

                  {/* Content */}
                  <div className="flex flex-wrap  justify-center   items-center  gap-4  relative z-10 ">
                    <div className="flex  justify-center items-center gap-2">
                      {item.icon}
                      <p className="text-sm font-medium">{item.name}</p>
                    </div>

                    <p className="text-xs font-semibold text-gray-800">
                      Sent: {item.sent}
                    </p>
                    <p className="text-sm sm:text-base font-bold   ">
                      ₹{item.cost}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className=" h-72 md:h-80 mt-6">
          {/* BarChart */}
          {chartType === "bar" && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={filteredChartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value} msgs`, name]} />
                <Legend />

                <Bar dataKey="sent" name="Sent Messages">
                  {filteredChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* LineChart */}
          {chartType === "line" && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={filteredChartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} msgs`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sent"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {/* Pie Chart */}
          {chartType === "pie" && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredChartData}
                  dataKey="sent"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  label={({ name, sent }) => `${name} ${sent}`}
                >
                  {filteredChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    `${value} msgs (${value / totalSent})`,
                    name,
                  ]}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ marginTop: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="flex  flex-wrap  gap-4">
        <div className="relative bg-white w-80 h-40 p-6 md:p-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
          <div className="absolute bottom-0 left-0 w-full h-40">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 400 150"
            >
              <path
                d="M0,100 C150,200 250,0 400,100 L400,150 L0,150 Z"
                fill="#a78bfa"
                opacity="0.3"
              />
              <path
                d="M0,120 C180,200 220,20 400,120 L400,150 L0,150 Z"
                fill="#6366f1"
                opacity="0.2"
              />
            </svg>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-gray-500">
              Ended Projects
            </p>
            <span className="text-lg text-red-700 font-bold">10</span>
            <p className="text-xs text-gray-500">
              <span className="text-red-700 font-bold">+5%</span> Flows deployed
            </p>
          </div>
        </div>
        <div className="relative bg-white w-80 h-40 p-6 md:p-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
          <div className="absolute bottom-0 left-0 w-full h-40">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 400 150"
            >
              <path
                d="M0,100 C150,200 250,0 400,100 L400,150 L0,150 Z"
                fill="#a78bfa"
                opacity="0.3"
              />
              <path
                d="M0,120 C180,200 220,20 400,120 L400,150 L0,150 Z"
                fill="#6366f1"
                opacity="0.2"
              />
            </svg>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-gray-500">
              Ended Projects
            </p>
            <span className="text-lg text-red-700 font-bold">10</span>
            <p className="text-xs text-gray-500">
              <span className="text-red-700 font-bold">+5%</span> Flows deployed
            </p>
          </div>
        </div>
        <div className="relative bg-white w-80 h-40 p-6 md:p-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
          <div className="absolute bottom-0 left-0 w-full h-40">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 400 150"
            >
              <path
                d="M0,100 C150,200 250,0 400,100 L400,150 L0,150 Z"
                fill="#a78bfa"
                opacity="0.3"
              />
              <path
                d="M0,120 C180,200 220,20 400,120 L400,150 L0,150 Z"
                fill="#6366f1"
                opacity="0.2"
              />
            </svg>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-gray-500">
              Ended Projects
            </p>
            <span className="text-lg text-red-700 font-bold">10</span>
            <p className="text-xs text-gray-500">
              <span className="text-red-700 font-bold">+5%</span> Flows deployed
            </p>
          </div>
        </div>
        <div className="relative bg-white w-80 h-40 p-6 md:p-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
          <div className="absolute bottom-0 left-0 w-full h-40">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 400 150"
            >
              <path
                d="M0,100 C150,200 250,0 400,100 L400,150 L0,150 Z"
                fill="#a78bfa"
                opacity="0.3"
              />
              <path
                d="M0,120 C180,200 220,20 400,120 L400,150 L0,150 Z"
                fill="#6366f1"
                opacity="0.2"
              />
            </svg>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-gray-500">
              Ended Projects
            </p>
            <span className="text-lg text-red-700 font-bold">10</span>
            <p className="text-xs text-gray-500">
              <span className="text-red-700 font-bold">+5%</span> Flows deployed
            </p>
          </div>
        </div>{" "}
        <div className="relative bg-white w-80 h-40 p-6 md:p-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
          <div className="absolute bottom-0 left-0 w-full h-40">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 400 150"
            >
              <path
                d="M0,100 C150,200 250,0 400,100 L400,150 L0,150 Z"
                fill="#a78bfa"
                opacity="0.3"
              />
              <path
                d="M0,120 C180,200 220,20 400,120 L400,150 L0,150 Z"
                fill="#6366f1"
                opacity="0.2"
              />
            </svg>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-gray-500">
              Ended Projects
            </p>
            <span className="text-lg text-red-700 font-bold">10</span>
            <p className="text-xs text-gray-500">
              <span className="text-red-700 font-bold">+5%</span> Flows deployed
            </p>
          </div>
        </div>{" "}
        <div className="relative bg-white w-80 h-40 p-6 md:p-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
          <div className="absolute bottom-0 left-0 w-full h-40">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 400 150"
            >
              <path
                d="M0,100 C150,200 250,0 400,100 L400,150 L0,150 Z"
                fill="#a78bfa"
                opacity="0.3"
              />
              <path
                d="M0,120 C180,200 220,20 400,120 L400,150 L0,150 Z"
                fill="#6366f1"
                opacity="0.2"
              />
            </svg>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-gray-500">
              Ended Projects
            </p>
            <span className="text-lg text-red-700 font-bold">10</span>
            <p className="text-xs text-gray-500">
              <span className="text-red-700 font-bold">+5%</span> Flows deployed
            </p>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      {/* <Grid container spacing={3}>
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`rounded-xl bg-gradient-to-br ${service.color} p-5 h-50 shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-300`}
              >
                <div className="font-semibold text-lg text-gray-800">
                  {service.name}
                </div>
                <motion.div className="flex items-center justify-end z-10">
                  <div className="flex justify-end">
                    {service.animation ? (
                      <div className="w-full  h-auto text-left">
                        <Lottie
                          animationData={service.animation}
                          loop
                          autoplay
                          className="w-22 h-auto "
                        />
                      </div>
                    ) : (
                      <IconComponent className="text-gray-700 group-hover:rotate-6 transition-transform duration-300" />
                    )}
                  </div>
                </motion.div>
                <p className="text-sm opacity-70 mt-3">{service.desc}</p>
              </motion.div>
            </Grid>
          );
        })}
      </Grid> */}

      {/* Bot Section */}
      {/* <motion.div
        className="mt-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <SmartToy className="text-purple-600 text-3xl" />
          <h2 className="text-xl font-semibold">Your Bots</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {bots.map((bot, index) => {
            const BotIcon = bot.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <BotIcon className="text-xl text-purple-600" />
                  <h3 className="font-bold text-base">{bot.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{bot.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Modern Insight Box Section */}
      {/* <motion.div
        className="mt-4 bg-gradient-to-r from-blue-100 to-white border border-blue-200 rounded-2xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <Insights className="text-blue-500 text-3xl" />
          <h2 className="text-xl font-semibold">Platform Highlights</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-base mb-1">Boosted Deliverability</h3>
            <p className="text-sm text-gray-600">
              New engine improves message delivery by 22%.
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-base mb-1">Real-Time Flow Testing</h3>
            <p className="text-sm text-gray-600">
              Test WhatsApp & RCS flows in seconds.
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-base mb-1">Multi-Channel Sync</h3>
            <p className="text-sm text-gray-600">
              Unified dashboard now supports all channels together.
            </p>
          </div>
        </div>
      </motion.div>  */}
    </div>
  );
};

export default Dashboard;
