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
import { useNavigate } from "react-router-dom";
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
import whatsappAnime from "@/assets/animation/whatsappanimation.json";
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
import Animationobd from "@/assets/animation/Animation-obd.json";
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
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
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

import WhatsappIcon from "@/assets/icons/whatsapp3d.png";
import SmsIcon from "@/assets/icons/sms3d.jpg";
import RcsIcon from "@/assets/icons/rcs3d.jpg";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import celitixLogo from "@/assets/images/celitix-cpaas-solution-logo.svg";
import Search from "./components/Search";
import { Dialog } from "primereact/dialog";
import WalletUsage from "./components/walletUsage";
import ServiceCard from "./components/ServiceCard";
import StatsCard from "./components/StatsCard";
import { DollarSign, Users } from "lucide-react";
import Celitixfavicon from "@/assets/icons/Celitixfavicon.png";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

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
    salesPersonId: "Not Assigned",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [allowedServices, setAllowServices] = useState([]);

  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("Whatsapp");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const response = await getUserDetails();

      if (response && response.statusCode === 200) {
        const user = response.data[0];

        setUserData(user);
        setFormData({
          firstName: user.firstName || "",
          salesPersonId: user.salesPersonId || "Not Assigned",
        });
        setAllowServices(user.allowedServices || []);
        console.log("allowedServices:", user.allowedServices);
      } else {
        console.error("Failed to load user details.");
        toast.error("Failed to load user details!");
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const { user } = useUser();

  const services = [
    {
      title: "Whatsapp",
      service_type_id: 2,
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
      animation: Animationwhatsapp2,
      desc: "Send real-time notifications",
      bgColor: "bg-indigo-90/50",
      textColor: "text-gray-900",
    },
    {
      title: "SMS",
      service_type_id: 1,
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
      animation: smsAnime,
      desc: "Send and receive SMS",
      bgColor: "bg-green-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "RCS",
      service_type_id: 3,
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
      animation: rcs,
      desc: "Interactive messaging solution",
      bgColor: "bg-teal-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "OBD",
      service_type_id: 7,
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
      animation: Animationobd,
      desc: "Automated outbound dialer",
      bgColor: "bg-indigo-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "IBD",
      service_type_id: 10,
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

      animation: Animationibd,
      desc: "Track inbound communications",
      bgColor: "bg-green-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "EMAIL",
      service_type_id: 4,
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
      animation: email,
      desc: "Campaign and transactional email",
      bgColor: "bg-teal-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "Authentication",
      service_type_id: 5,
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
      animation: auth,
      desc: "Secure 2FA login solutions",
      bgColor: "bg-indigo-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "TWO-WAY SMS",
      service_type_id: 8,
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
      animation: Animationsms,
      desc: "Bi-directional messaging",
      bgColor: "bg-green-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "Number LookUp",
      service_type_id: 6,
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
      animation: email2,
      desc: "Interactive messaging solution",
      bgColor: "bg-teal-100/60",
      textColor: "text-gray-900",
    },
    {
      title: "Missed Call",
      service_type_id: 9,
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

      animation: Animationibd,
      desc: "Automated outbound dialer",
      bgColor: "bg-indigo-100/60",
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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [walletUsageData, setWalletUsageData] = useState([]);
  const [activeServices, setActiveServices] = useState([]);

  const FILTERS = ["Day", "Month"];

  const COLORS = ["#9FE0DF", "#BD94D6", "#DCCE89", "#7C80E0"];

  const formatDate = (date) => {
    if (!date) return "--";
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

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

  const servicesDailyUsage = [
    {
      name: "Whatsapp",
      bgColor: "bg-green-200",
      textColor: "text-black",
      icon: WhatsappIcon,
    },
    {
      name: "Voice",
      bgColor: "bg-indigo-400",
      textColor: "text-black",
      icon: SmsIcon,
    },
    {
      name: "RCS",
      bgColor: "bg-purple-200",
      textColor: "text-black",
      icon: RcsIcon,
    },
    {
      name: "SMS",
      bgColor: "bg-yellow-200",
      textColor: "text-black",
      icon: SmsIcon,
    },
    {
      name: "IBD",
      bgColor: "bg-green-200",
      textColor: "text-black",
      icon: SmsIcon,
    },
    {
      name: "Email",
      bgColor: "bg-indigo-400",
      textColor: "text-black",
      icon: SmsIcon,
    },
    {
      name: "Authentication",
      bgColor: "bg-purple-200",
      textColor: "text-black",
      icon: SmsIcon,
    },
    {
      name: "Two-Way SMS",
      bgColor: "bg-yellow-200",
      textColor: "text-black",
      icon: SmsIcon,
    },
  ];

  const chartData = servicesDailyUsage.map((s) => {
    const key = s.name.toLowerCase();
    const item = usageData?.[key]?.[0] || {};
    return {
      service: s.name,
      name: s.name.toUpperCase(),
      sent: item.totalSent || 0,
      cost: item.totalCharge || 0,
      icon: s.icon,
    };
  });

  const [showBar, setShowBar] = useState(true);
  const [showLine, setShowLine] = useState(true);
  const [showPie, setShowPie] = useState(true);

  const [selectedServices, setSelectedServices] = useState(
    servicesDailyUsage.map((s) => s.name)
  );

  const toggleService = (serviceName) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
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
  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    const handlegetOldApiKey = async () => {
      try {
        const res = await getOldApiKey();
        if (res.status === 200) {
          setOldApiKey(res.oldkey);
        } else {
          toast.error("Error fetching old API Key else");
        }
      } catch (e) {
        // console.log(e);
        toast.error("Error fetching old API Key");
      }
    };
    handlegetOldApiKey();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const serviceUsage = Array.isArray(usageData)
    ? usageData[0] || {}
    : usageData || {};

  const dailyTotals = Object.keys(serviceUsage).flatMap((serviceKey) => {
    const normalizedKey = serviceKey.toLowerCase();
    const selectedNormalized = selectedServices.map((s) => s.toLowerCase());

    if (!selectedNormalized.includes(normalizedKey)) return [];

    const serviceData = serviceUsage[serviceKey] || [];

    return serviceData.map((d) => ({
      date: moment(d.date).format("DD MMM"),
      totalSent: Number(d.totalSent) || 0,
      totalCharged: Number(d.totalCharge) || 0,
      service: serviceKey,
    }));
  });
  const totalSentSum = dailyTotals.reduce((acc, d) => acc + d.totalSent, 0);
  const totalChargedSum = dailyTotals.reduce(
    (acc, d) => acc + d.totalCharged,
    0
  );

  const integrationUrl = `https://int.celitix.com/?user_id=${oldApiKey}&api_key=AIzaSyBqlfMk-_yK_3ICUUYej_nVUDXz0cP327Y`;

  // *************************************************Daily service usages START***********************************

  const rings = [80, 130, 180];

  const ringsicons = [
    { src: slack, ring: 1, angle: 90 },
    { src: zohoicon, ring: 2, angle: 0 },
    { src: shopify, ring: 1, angle: 230 },
    { src: wordpress, ring: 2, angle: 60 },
    { src: telegram, ring: 2, angle: 130 },
    { src: zapier, ring: 2, angle: 190 },
    { src: instagram, ring: 1, angle: 320 },
    { src: woocommerce, ring: 2, angle: 270 },
    { src: freshdesk, ring: 0, angle: 180 },
    { src: facebookmessenger, ring: 0, angle: 0 },
  ];

  const size = 500;
  const center = size / 2;

  return (
    <div className="bg-white text-gray-900 rounded-4xl md:p-4 p-2 space-y-5 overflow-hidden">
      <div className="relative w-full overflow-hidden bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 text-gray-800 rounded-4xl p-2 md:p-0 shadow-md">
        {/* <div className="absolute inset-0">
          <img
            src="https://t4.ftcdn.net/jpg/16/70/74/05/240_F_1670740500_Rzcl2FWPcL27vm0LjskhXHJbF0jKttmj.jpg"
            className="w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-white/30"></div>
        </div> */}

        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between mt-5 gap-4 px-4">
          {/* Brand Name */}
          <div className="z-10">
            <img src={celitixLogo} width={120} height={80} alt="Celitix Logo" />
          </div>

          {/* Search Bar */}
          <Search />

          {/* Notification */}
          <button className="relative p-2 sm:p-3 rounded-full bg-white/40 backdrop-blur-md hover:bg-white/60 transition">
            < NotificationsNoneIcon />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex justify-center items-center md:gap-3 gap-4 z-10">
            {/* Profile  */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
              <span
                className="absolute inset-0 flex items-center justify-center text-sm sm:text-md text-white bg-black/40"
                onClick={handleProfileClick}
              >
                {(formData.firstName || "U").charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-0 md:mt-40">
          <StatsCard />
        </div>
      </div>

      {/* service cards */}
      <div className="relative overflow-y-scroll xl:overflow-hidden bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 border border-gray-200 rounded-4xl shadow-md backdrop-blur-2xl text-gray-800">
        <div className="mt-5 text-center">
          <h2 className="text-2xl font-bold  gradient-animate text-blue-400 tracking-wide">
            Discover Our Channels
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

          <rect
            width="100%"
            height="100%"
            fill="url(#diagonalLines)"
            className="animate-diagonal"
          />
        </svg>

        <div className="mt-0 md:mt-5">
          <ServiceCard services={services} allowedServices={allowedServices} />
        </div>
      </div>

      {/* intigration section */}
      <div className="space-y-4 flex flex-col sm:flex-row gap-4 items-stretch h-145">
        {/* Left Wallet Chart */}

        <div className="flex-1 h-full">
          <WalletUsage />
        </div>

        {/* Right SVG  Circles */}
        <div className="flex-1 relative bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 rounded-4xl shadow-lg md:p-4 p-6 w-full">
          <div className="">
            <h2 className="text-2xl font-extrabold text-blue-400 text-center">
              Add Integrations
            </h2>
            <p className="text-gray-500 text-center text-sm mt-2">
              Connect Freshdesk, Zoho, Shopify, and more from a single
              dashboard.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative" style={{ width: size, height: size }}>
              <div
                className="absolute inset-0 animate-spin-slow"
                onClick={() => setVisible(true)}
              >
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

                {ringsicons.map((icon, i) => {
                  const r = rings[icon.ring];
                  const rad = (icon.angle * Math.PI) / 180;
                  const x = center + r * Math.cos(rad) - 20;
                  const y = center + r * Math.sin(rad) - 20;
                  return (
                    <div
                      key={i}
                      className="absolute animate-spin-slower"
                      style={{ left: x, top: y }}
                    >
                      <img
                        src={icon.src}
                        alt="icon"
                        className="w-12 h-12 rounded-full bg-white shadow-md  object-contain p-1"
                      />
                    </div>
                  );
                })}
              </div>

              <div
                className="absolute "
                style={{
                  width: 60,
                  height: 60,
                  top: center - 30,
                  left: center - 30,
                }}
              >
                <img
                  src={Celitixfavicon}
                  className="w-18 h-18 rounded-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Service Usages */}
      <div className="bg-white shadow-lg border p-4 flex flex-col justify-center items-center gap-6 w-full mt-15 rounded-3xl">
        <div className="relative w-full flex justify-center">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 xl:hidden"
          >
            <ChevronLeft className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
          </button>

          {/* Service Toggle Row */}
          <div
            ref={scrollRef}
            className="flex flex-nowrap shadow-md rounded-full px-4 py-3 bg-white gap-3 absolute -top-14 md:-top-16 sm:-top-18 lg:-top-12 w-[92%]  border border-gray-200 
               justify-start md:justify-center overflow-hidden"
          >
            {servicesDailyUsage.map((s, idx) => (
              <div
                key={idx}
                onClick={() => toggleService(s.name)}
                className={`flex items-center gap-2 rounded-full px-3 py-2 cursor-pointer transition text-sm font-medium
              ${selectedServices.includes(s.name)
                    ? `${s.bgColor} ${s.textColor} opacity-90 hover:opacity-100`
                    : "shadow-md bg-blue-50 text-gray-700 hover:bg-blue-100"
                  }`}
              >
                {/* <img
                  src={s.icon}
                  alt={s.name}
                  className="w-7 h-7 object-contain rounded-full"
                /> */}
                <span>{s.name}</span>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 xl:hidden"
          >
            <ChevronRight className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
          </button>
        </div>

        {/* Service Usages Content */}
        <div className="mb-8 w-full p-4 mt-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="font-semibold text-gray-800 md:text-lg ">
              Service Usage Overview
            </h2>
            <div className="flex flex-col ">
              <div className="flex gap-2 flex-wrap justify-end mb-4">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-full border text-sm font-medium transition
              ${filter === f
                        ? "bg-blue-600 text-white border-blue-600 shadow"
                        : "bg-blue-100 text-gray-900 border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                      }`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
              <div>
                <div className="flex flex-col font-semibold text-gray-900">
                  <span className="text-sm font-medium text-gray-700">
                    Total Campaign: {totalSentSum} msgs
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    Total Charge: {totalChargedSum}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-sm text-gray-700">
            <div>
              <span className="font-semibold">From:</span>
              {formatDate(startDate)}
            </div>
            <div>
              <span className="font-semibold">To:</span> {formatDate(endDate)}
            </div>
          </div>

          {/* Summary Row */}
          <div className="flex flex-wrap gap-4 mb-8">
            {chartData
              .filter((item) => selectedServices.includes(item.service))
              .map((item, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 transition hover:scale-[1.02]"
                >
                  <div className="flex flex-col items-center justify-center px-3 py-4 rounded-2xl shadow-md border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-900 h-full">
                    <p className="text-sm font-medium mb-2">{item.name}</p>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-semibold text-gray-700 text-center">
                      <p>Campaign: {item.sent}</p>
                      <p>Charged: ₹{item.cost}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            {/* Bar Chart */}
            <div className="flex flex-col items-center gap-3 w-full">
              {showBar ? (
                <>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={filteredChartData}
                      margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [`${value} msgs`, name]}
                      />
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
                  <button
                    className="w-24 rounded-lg py-1 font-medium bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={() => setShowBar(false)}
                  >
                    Hide
                  </button>
                </>
              ) : (
                <button
                  className="w-30 rounded-lg py-1 font-medium bg-gray-100 text-blue-700 hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-2"
                  onClick={() => setShowBar(true)}
                >
                  <ShowChartIcon /> Show Bar
                </button>
              )}
            </div>

            {/* Line Chart */}
            <div className="flex flex-col items-center gap-3 w-full">
              {showLine ? (
                <>
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
                  <button
                    className="w-24 rounded-lg py-1 font-medium bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={() => setShowLine(false)}
                  >
                    Hide
                  </button>
                </>
              ) : (
                <button
                  className="w-30 rounded-lg py-1 font-medium bg-gray-100 text-blue-700 hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-2"
                  onClick={() => setShowLine(true)}
                >
                  <BarChartIcon /> Show Line
                </button>
              )}
            </div>

            {/* Pie Chart */}
            <div className="flex flex-col items-center gap-3 w-full">
              {showPie ? (
                <>
                  <ResponsiveContainer width="100%" height={300}>
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
                        formatter={(value, name) => {
                          const safeTotal = totalSent || 1;
                          return [
                            `${value} msgs (${(
                              (value / safeTotal) *
                              100
                            ).toFixed(1)}%)`,
                            name,
                          ];
                        }}
                      />
                      <Legend verticalAlign="bottom" align="center" />
                    </PieChart>
                  </ResponsiveContainer>
                  <button
                    className="w-24 rounded-lg py-1 font-medium bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={() => setShowPie(false)}
                  >
                    Hide
                  </button>
                </>
              ) : (
                <button
                  className="w-28 rounded-lg py-1 font-medium bg-gray-100 text-blue-700 hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-2"
                  onClick={() => setShowPie(true)}
                >
                  <PieChartIcon /> Show Pie
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-3">
          <div className="relative bg-white border-t-1 border-purple-200 p-6 md:py-8 px-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
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
              <p className="text-sm font-semibold text-gray-500">Total Bots</p>
              <span className="text-lg text-red-700 font-bold">11</span>
              <p className="text-xs text-gray-500">
                <span className="text-red-700 font-bold">+2%</span> Bots
                deployed
              </p>
            </div>
          </div>
          <div className="relative bg-white border-t-1 border-purple-200 p-6 md:py-8 px-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
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
              <p className="text-sm font-semibold text-gray-500">Total Flows</p>
              <span className="text-lg text-red-700 font-bold">54</span>
              <p className="text-xs text-gray-500">
                <span className="text-red-700 font-bold">+5%</span> Flows
                deployed
              </p>
            </div>
          </div>
          <div className="relative bg-white border-t-1 border-purple-200 p-6 md:py-8 px-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
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
              <p className="text-sm font-semibold text-gray-500">Draft Flows</p>
              <span className="text-lg text-red-700 font-bold">29</span>
              <p className="text-xs text-gray-500">
                <span className="text-red-700 font-bold">-</span> in draft
              </p>
            </div>
          </div>

          <div className="relative bg-white border-t-1 border-purple-200 p-6 md:py-8 px-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
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
                Published Flows
              </p>
              <span className="text-lg text-red-700 font-bold">25</span>
              <p className="text-xs text-gray-500">
                <span className="text-red-700 font-bold">-</span> live
              </p>
            </div>
          </div>

          <div className="relative bg-white border-t-1 border-purple-200 p-6 md:py-8 px-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
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
                Total Projects
              </p>
              <span className="text-lg text-red-700 font-bold">24</span>
              <p className="text-xs text-gray-500">
                <span className="text-red-700 font-bold">+5%</span> Since last
                month
              </p>
            </div>
          </div>

          <div className="relative bg-white border-t-1 border-purple-200 p-6 md:py-8 px-4 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
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
                <span className="text-red-700 font-bold">+5%</span> Flows
                deployed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Integration DialogBox */}
      <Dialog
        header="CPaaS Integrations Panel"
        visible={visible}
        style={{ width: "70vw", maxWidth: "75vw", height: "70vh" }}
        onHide={() => setVisible(false)}
        draggable={false}
        maximizable
      >
        {/* <div>
          <button onClick={() => window.open(integrationUrl, "_blank")}>Open</button>
        </div> */}
        <iframe
          src={integrationUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          className="rounded-md"
        ></iframe>
      </Dialog>
    </div>
  );
};

export default Dashboard;
