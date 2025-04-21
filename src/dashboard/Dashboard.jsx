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




// changes by akhil start





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

const services = [
  {
    name: "WhatsApp",
    icon: WhatsApp,
    animation: Animationwhatsapp2,
    desc: "Send real-time notifications",
    color: "from-green-100 to-green-300",
  },
  {
    name: "RCS",
    icon: Message,
    animation: Animationrcs,
    desc: "Interactive messaging solution",
    color: "from-purple-100 to-purple-300",
  },
  {
    name: "OBD",
    icon: Call,
    animation: Animationobd,
    desc: "Automated outbound dialer",
    color: "from-yellow-100 to-yellow-300",
  },
  {
    name: "IBD",
    icon: Call,
    animation: Animationibd,
    desc: "Track inbound communications",
    color: "from-indigo-100 to-indigo-300",
  },
  {
    name: "SMS",
    icon: PhoneAndroid,
    animation: Animationsms,
    desc: "Send and receive SMS",
    color: "from-pink-100 to-pink-300",
  },
  {
    name: "Email",
    icon: Email,
    animation: email2,
    desc: "Campaign and transactional email",
    color: "from-blue-100 to-blue-300",
  },
  {
    name: "App Authenticator",
    icon: Lock,
    animation: auth,
    desc: "Secure 2FA login solutions",
    color: "from-gray-100 to-gray-300",
  },
  {
    name: "Two-Way SMS",
    icon: SyncAlt,
    desc: "Bi-directional messaging",
    color: "from-red-100 to-red-300",
  },
];

const quickStats = [
  {
    icon: <TaskAlt className="text-green-600" />,
    label: "Active Campaigns",
    value: 32,
  },
  {
    icon: <TrendingUp className="text-blue-600" />,
    label: "Engagement Rate",
    value: "78%",
  },
  {
    icon: <Star className="text-yellow-500" />,
    label: "Client Rating",
    value: "4.8/5",
  },
];

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

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    mobileNo: "",
    address: "",
    companyName: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const response = await getUserDetails();

      if (response && response.statusCode === 200) {
        const user = response.data[0];

        setUserData(user);
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          emailId: user.email || "",
          mobileNo: user.mobileNo || "",
          address: user.address || "",
          companyName: user.companyName || "",
        });
      } else {
        console.error("Failed to load user details.");
        toast.error("Failed to load user details!");
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const date = new Date();
    let dayNum = date.getDay();
    dayNum = (dayNum === 0) ? 6 : dayNum - 1;

    const weekItems = document.querySelectorAll(".week li");
    if (weekItems[dayNum]) {
      const active = weekItems[dayNum];
      active.classList.add('current');

      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      const h1 = document.createElement('h1');
      h1.innerHTML = day;
      active.appendChild(h1);

      const h5 = document.createElement('h5');
      h5.innerHTML = month;
      active.appendChild(h5);

      const h3 = document.createElement('h3');
      h3.innerHTML = year;
      active.appendChild(h3);
    }
  }, []);
  return (
    <div className="bg-white text-gray-900 rounded-2xl p-4 space-y-6 min-h-[calc(100vh-6rem)]">
      {/* Logged In User Card */}
      <motion.div
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
      </motion.div>

      {/* Service Cards */}
      <Grid container spacing={3}>
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
                <p className="text-sm opacity-70 mt-3 z-10">{service.desc}</p>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>


      {/* <div>
        <ul className="week">
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
          <li>Sun</li>
        </ul>
      </div> */}


      {/* Bot Section */}
      <motion.div
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
      <motion.div
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
      </motion.div>
    </div>
  );
};

export default Dashboard;

