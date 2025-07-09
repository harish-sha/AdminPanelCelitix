import React, { useEffect, useState, useRef } from "react";
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
import { FaShopify, FaFacebookMessenger, FaSlack } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { AiFillApi } from "react-icons/ai";
import { FaWhatsapp, FaPhone, FaRegCommentDots, FaSms } from "react-icons/fa";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RefreshIcon from "@mui/icons-material/Refresh";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { Loop as LoopIcon } from "@mui/icons-material";
import whatsappAnime from "../assets/animation/whatsappanimation.json";
import whatsappAnime2 from "../assets/animation/whatsappanimation2.json";
import smsAnime from "../assets/animation/smsanime.json";
import rcs from "../assets/animation/rcs.json";
import sms from "../assets/animation/sms.json";
import auth from "../assets/animation/auth.json";
import email from "../assets/animation/email.json";
import email2 from "../assets/animation/email2.json";
import integration from "../assets/animation/integration.json";
import Animationsms from "../assets/animation/Animation-sms.json";
import Animationrcs from "../assets/animation/Animation-rcs.json";
import Animationibd from "../assets/animation/Animation-ibd.json";
import Animationobd from "../assets/animation/Animation-obd.json";

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

import Animationwhatsapp2 from "../assets/animation/Animation-whatsapp2.json";
import twowaysms from "../assets/animation/twowaysms.json";
import twowaysmsnew from "../assets/animation/twowaysmsnew.json";
import Lottie from "lottie-react";
import { getUserDetails } from "@/apis/user/user";
import { useUser } from "@/context/auth";
import CountUp from "react-countup";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { SiZendesk, SiZapier, SiZoho } from "react-icons/si";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import CustomTooltip from "@/components/common/CustomTooltip";
import {
  dailySeriveUsage,
  dailyWalletUsage,
  fetchBalance,
  getOldApiKey,
} from "@/apis/settings/setting";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import moment from "moment";
import ClockCard from "./components/ClockCard";
import RevenueChartWithFilter from "./components/balanceChart";
import LineGraphChart from "./components/account";
import MetricsDashboard from "./components/bots";
import ServiceUsageDashboard from "./components/ServiceUsageDashboard";
import ParticleRing from "./components/ParticleRing";

const revenueData = [
  { name: "Mon", online: 14000, offline: 11000 },
  { name: "Tue", online: 16000, offline: 12000 },
  { name: "Wed", online: 8000, offline: 22000 },
  { name: "Thu", online: 17000, offline: 7000 },
  { name: "Fri", online: 13000, offline: 11000 },
  { name: "Sat", online: 16000, offline: 14000 },
  { name: "Sun", online: 20000, offline: 12000 },
];

const satisfactionData = [
  { name: "Week 1", last: 400, current: 600 },
  { name: "Week 2", last: 380, current: 800 },
  { name: "Week 3", last: 410, current: 900 },
  { name: "Week 4", last: 600, current: 1057 },
];

const targetRealityData = [
  { name: "Jan", reality: 5000, target: 7000 },
  { name: "Feb", reality: 6000, target: 9000 },
  { name: "Mar", reality: 7000, target: 9500 },
  { name: "Apr", reality: 8200, target: 11000 },
  { name: "May", reality: 9000, target: 12000 },
  { name: "Jun", reality: 9400, target: 12500 },
  { name: "Jul", reality: 9800, target: 13000 },
];

// const quickStats = [
//     {
//         icon: <TaskAlt className="text-green-600" />,
//         label: "Active Campaigns",
//         value: 32,
//     },
//     {
//         icon: <TrendingUp className="text-blue-600" />,
//         label: "Engagement Rate",
//         value: "78%",
//     },
//     {
//         icon: <Star className="text-yellow-500" />,
//         label: "Client Rating",
//         value: "4.8/5",
//     },
// ];

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

const ResellerDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
  });
  const [balance, setBalance] = useState(0);
  const [rechargableCredit, setRechargableCredit] = useState(0);
  const [showRefresh, setShowRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const { user } = useUser();

  const getBalance = async () => {
    setIsLoading(true);
    try {
      const res = await fetchBalance();
      console.log("balance", res);
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

  // =======================================daily service usage end=================================================

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [walletUsageData, setWalletUsageData] = useState([]);
  const [activeServices, setActiveServices] = useState([]);

  const FILTERS = ["Day", "Month", "Year"];

  const icons = {
    whatsapp: <FaWhatsapp className="text-green-500 text-2xl" />,
    voice: <FaPhone className="text-blue-500 text-2xl" />,
    rcs: <FaRegCommentDots className="text-indigo-500 text-2xl" />,
    sms: <FaSms className="text-yellow-500 text-2xl" />,
  };

  const [filter, setFilter] = useState("Day");
  const [usageData, setUsageData] = useState(null);

  // const dailyAmountUsage = async () => {
  //   const payload = {
  //     userSrno: 0,
  //     // fromDate: moment(startDate).format("YYYY-MM-DD"),
  //     date: moment(endDate).format("YYYY-MM-DD"),
  //   };
  //   console.log("date payload", payload);
  //   setIsLoading(true);
  //   try {
  //     const response = await dailyWalletUsage(payload);
  //     console.log("daily wallet usage", response.data);
  //     if (response.data && response.data.length > 0) {
  //       setWalletUsageData(response.data);
  //     } else {
  //       setWalletUsageData([]);
  //     }
  //   } catch (error) {
  //     console.error("Error daily wallet usage:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const dailyServiceUsage = async () => {
    const payload = {
      userSrno: 0,
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),
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
      name: s.toUpperCase(),
      totalSent: item.totalSent || 0,
      totalCharge: item.totalCharge || 0,
    };
  });

  // useEffect(() => {
  //   dailyAmountUsage();
  // }, []);

  // useEffect(() => {
  //   dailyAmountUsage(); // Fetch data when the component mounts or when date range changes
  // }, [startDate, endDate]);
  // useEffect(() => {
  //   dailyServiceUsage();
  // }, []);

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

  // ======================================daily service usage end=================================================

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await getUserDetails();
        if (response?.statusCode === 200) {
          const user = response.data[0];
          setUserData(user);

          // 2) Derive the flat list of ACTIVE service names:
          const names = Array.isArray(user.services)
            ? user.services.map((s) => s.display_name.toUpperCase())
            : [];
          setActiveServices(names);
        } else {
          throw new Error("Non-200 status code");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load user details!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const quickStats = [
    {
      icon: <AccountBalanceIcon className="text-green-900" />,
      label: "Current Balance",
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
    },
    {
      icon: <TrendingUp className="text-blue-600" />,
      label: "Engagement Rate",
      value: "78%",
    },
    {
      icon: [
        <Star className="text-yellow-500" />,
        <Star className="text-yellow-500" />,
        <Star className="text-yellow-500" />,
        <Star className="text-yellow-500" />,
        <StarHalfOutlinedIcon className="text-yellow-500" />,
      ],
      label: "Client Rating",
      value: "4.8/5",
    },
  ];

  const services = [
    {
      name: "WHATSAPP",
      icon: WhatsApp,
      displayName: "Whatsapp",
      animation: Animationwhatsapp2,
      desc: "Send real-time notifications",
      color: "from-green-100 to-green-300",
    },
    {
      name: "RCS",
      icon: Message,
      displayName: "RCS",
      animation: Animationrcs,
      desc: "Interactive messaging solution",
      color: "from-purple-100 to-purple-300",
    },
    {
      name: "OBD",
      icon: Call,
      displayName: "OBD",
      animation: Animationobd,
      desc: "Automated outbound dialer",
      color: "from-yellow-100 to-yellow-300",
    },
    {
      name: "IBD",
      icon: Call,
      displayName: "IBD",
      animation: Animationibd,
      desc: "Track inbound communications",
      color: "from-indigo-100 to-indigo-300",
    },
    {
      name: "SMS",
      icon: PhoneAndroid,
      displayName: "SMS",
      animation: Animationsms,
      desc: "Send and receive SMS",
      color: "from-pink-100 to-pink-300",
    },
    {
      name: "EMAIL",
      icon: Email,
      displayName: "Email",
      animation: email2,
      desc: "Campaign and transactional email",
      color: "from-blue-100 to-blue-300",
    },
    {
      name: "APP_AUTHENTICATOR",
      icon: Lock,
      displayName: "App Authenticator",
      animation: auth,
      desc: "Secure 2FA login solutions",
      color: "from-gray-100 to-gray-300",
    },
    {
      name: "Two-WAY-SMS",
      icon: SyncAlt,
      displayName: "Two-Way SMS",
      animation: twowaysms,
      desc: "Bi-directional messaging",
      color: "from-red-100 to-red-300",
    },
  ];

  const rawData = [
    { date: "2025-07-01T10:00:00Z", online: 1200, offline: 800, balance: 5000 },
    { date: "2025-07-02T15:30:00Z", online: 300, offline: 200, balance: 5300 },
  ];

  const rawDatanew = [
    {
      date: "2025-07-01T10:00:00Z",
      whatsapp: 1200,
      rcs: 800,
      sms: 500,
      obd: 700,
    },
    {
      date: "2025-07-01T15:00:00Z",
      whatsapp: 300,
      rcs: 200,
      sms: 150,
      obd: 100,
    },
    {
      date: "2025-07-02T10:00:00Z",
      whatsapp: 1500,
      rcs: 600,
      sms: 400,
      obd: 600,
    },
  ];

  // Add Integrations start
  const [oldApiKey, setOldApiKey] = useState("");
  const [visible, setVisible] = useState(false);
  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

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

  const integrationUrl = `https://int.celitix.com/?user_id=${oldApiKey}&api_key=AIzaSyC0kAJahOWabdn2eiwVnBr3HXCHaTSnXzQ`;

  console.log("final integration url", integrationUrl);

  // const integrations = [
  //   {
  //     name: "Zoho",
  //     icon: <AiFillApi size={40} />,
  //     url: iframeSrcMap.zoho,
  //   },
  //   {
  //     name: "WebEngage",
  //     icon: <FaFacebookMessenger size={40} />,
  //     url: iframeSrcMap.messenger,
  //   },
  //   {
  //     name: "Freshdesk",
  //     icon: <MdSupportAgent size={40} />,
  //     url: iframeSrcMap.freshdesk,
  //   },
  //   {
  //     name: "Shopify",
  //     icon: <FaShopify size={40} />,
  //     url: iframeSrcMap.shopify,
  //   },
  //   {
  //     name: "Messenger",
  //     icon: <FaFacebookMessenger size={40} />,
  //     url: iframeSrcMap.messenger,
  //   },
  //   {
  //     name: "WordPress",
  //     icon: <FaFacebookMessenger size={40} />,
  //     url: iframeSrcMap.messenger,
  //   },
  //   {
  //     name: "Zapier",
  //     icon: <FaFacebookMessenger size={40} />,
  //     url: iframeSrcMap.messenger,
  //   },
  //   {
  //     name: "WooCommerce",
  //     icon: <FaFacebookMessenger size={40} />,
  //     url: iframeSrcMap.messenger,
  //   },
  //   {
  //     name: "Cronberry",
  //     icon: <FaFacebookMessenger size={40} />,
  //     url: iframeSrcMap.messenger,
  //   },
  //   {
  //     name: "Google Sheets",
  //     icon: <FaFacebookMessenger size={40} />,
  //     url: iframeSrcMap.messenger,
  //   },
  // ];

  const iconSize = 48;

  function generateRandomPath() {
    const points = [];
    const pointCount = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < pointCount; i++) {
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 80;
      points.push(`${i === 0 ? "M" : "L"}${x},${y}`);
    }

    return points.join(" ");
  }

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
          <div className="bg-blue-200 border-2 border-indigo-400 h-16 w-16 flex items-center justify-center rounded-full shadow-2xl">
            {/* <Person
              className="text-blue-600"
              sx={{
                fontSize: 30,
              }}
            /> */}
            <span className="text-indigo-600 text-2xl font-semibold">
              {(formData.firstName || "U").charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-3xl font-semibold playf">
              Welcome back, {formData.firstName || "User"}{" "}
            </h2>
            <p className="text-xs opacity-80">
              You're doing great. Here's a quick overview of your dashboard.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          {quickStats.map((stat, i) => (
            <div
              key={i}
              className="relative bg-white rounded-xl shadow p-3 px-4 flex flex-col items-start justify-center md:w-50"
            >
              {stat.showRefreshIcon && (
                <CustomTooltip title="Refresh Balance" placement="top" arrow>
                  <div className="absolute top-2 right-2 cursor-pointer">
                    {isLoading ? (
                      <LoopIcon
                        className="text-[18px] animate-spin text-blue-400 cursor-pointer"
                        sx={{ color: "blue" }}
                      />
                    ) : (
                      <button onClick={getBalance} className="">
                        <LoopIcon className="text-blue-400 cursor-pointer" />
                      </button>
                    )}
                  </div>
                </CustomTooltip>
              )}
              <div className="text-2xl">{stat.icon}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              <div className="font-semibold text-lg">{stat.value}</div>
            </div>
          ))}
          <ClockCard />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Service Cards */}
        <Grid container spacing={3}>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const hasService = user.services?.some(
              (s) => s.display_name.toLowerCase() === service.name.toLowerCase()
            );
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative rounded-xl bg-gradient-to-br ${service.color
                    } p-5 h-50 shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-300 ${hasService ? "ring-1 ring-green-300" : "ring-1 ring-red-300"
                    } `}
                >
                  {hasService && (
                    <>
                      <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider h-5 w-4 border-2 border-white"></div>
                      <div className="absolute top-2 right-8 bg-green-600 text-white text-[11px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                        Active
                      </div>
                    </>
                  )}
                  {!hasService && (
                    <>
                      <div className="absolute top-2 right-2 bg-red-400 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider h-5 w-4 border-2 border-white"></div>
                      <div className="absolute top-2 right-8 bg-red-400 text-white text-[11px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                        inActive
                      </div>
                    </>
                  )}
                  <div className="font-semibold text-lg text-gray-900">
                    {service.displayName}
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
        </Grid>
      </motion.div>

      {/* Add Integrations Start */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onClick={openDialog}
        className="cursor-pointer group relative p-6 rounded-2xl shadow-md bg-gradient-to-tr from-blue-50 via-white to-blue-100 border-2 border-dashed border-blue-200 hover:shadow-xl transition-all overflow-hidden"
      >
        {/* <div className="absolute inset-0 overflow-hidden opacity-20 group-hover:opacity-30 transition-opacity">
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient
                id="connectionGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#2b40b0" />
                <stop offset="50%" stopColor="#8447c6" />
                <stop offset="100%" stopColor="#36bae2" />
              </linearGradient>
            </defs>
            {[...Array(8)].map((_, i) => (
              <motion.path
                key={i}
                d={generateRandomPath()}
                // stroke="#3b82f6"
                stroke="url(#connectionGradient)"
                strokeWidth="0.2"
                fill="none"
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {[...Array(12)].map((_, i) => (
              <motion.circle
                key={`dot-${i}`}
                cx={10 + Math.random() * 80}
                cy={10 + Math.random() * 80}
                r={0.3 + Math.random() * 0.7}
                // fill="#3b82f6"
                fill="url(#connectionGradient)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 5,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 5,
                }}
              />
            ))}
          </svg>
        </div> */}

        <div className="relative z-10 flex items-center justify-around space-y-2">
          {/* <AiOutlineAppstoreAdd size={48} className="text-blue-600" /> */}
          <div className="flex flex-col items-center">
            <Lottie
              animationData={integration}
              loop
              autoplay
              className="w-35 h-auto"
            />
            <h2 className="text-4xl font-extrabold text-gray-800 playf bluetxt">
              Add Integrations
            </h2>
            <p className="text-gray-500 text-center text-sm">
              Connect Freshdesk, Zoho, Shopify, and more from a single
              dashboard.
            </p>
          </div>

          <motion.div
            layout
            className="flex justify-center items-center flex-wrap mt-4 transition-all duration-500 gap-12 group-hover:gap-13"
          >
            {/* {[
              { icon: <AiFillApi size={iconSize} />, color: "text-purple-600 hover:text-purple-800" },
              { icon: <FaFacebookMessenger size={iconSize} />, color: "text-blue-500 hover:text-blue-700" },
              { icon: <MdSupportAgent size={iconSize} />, color: "text-amber-600 hover:text-amber-800" },
              { icon: <FaShopify size={iconSize} />, color: "text-green-600 hover:text-green-800" },
              { icon: <SiZendesk size={iconSize} />, color: "text-green-400 hover:text-green-600" },
              { icon: <SiZapier size={iconSize} />, color: "text-orange-500 hover:text-orange-700" },
              { icon: <SiZoho size={iconSize} />, color: "text-red-500 hover:text-red-700" },
              { icon: <FaSlack size={iconSize} />, color: "text-indigo-500 hover:text-indigo-700" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className={`transition-all duration-300 ${item.color}`}
                whileHover={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.div>
            ))} */}
            {[
              { icon: <img src={zohoicon} alt="" className="w-22" /> },
              { icon: <img src={zapier} alt="" className="w-12" /> },
              { icon: <img src={wordpress} alt="" className="w-12" /> },
              { icon: <img src={woocommerce} alt="" className="w-14" /> },
              { icon: <img src={slack} alt="" className="w-12" /> },
              { icon: <img src={telegram} alt="" className="w-12" /> },
              { icon: <img src={shopify} alt="" className="w-12" /> },
              { icon: <img src={instagram} alt="" className="w-12" /> },
              { icon: <img src={freshdesk} alt="" className="w-25" /> },
              { icon: <img src={facebookmessenger} alt="" className="w-10" /> },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className={`transition-all duration-300`}
                whileHover={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <p className="relative z-10 text-xs text-gray-400 mt-5 text-center">
          Click to configure integrations
        </p>
      </motion.div>

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
      {/* Add Integrations End */}

      {/* <ParticleRing /> */}

      {/* Service Usage Overview start */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ServiceUsageDashboard />
      </motion.div>
      {/* Service Usage Overview End */}

      {/* bots & flows start */}
      <motion.div
        className=" bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl shadow-md p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <MetricsDashboard />
      </motion.div>
      {/* bots & flows End */}
    </div>
  );
};

export default ResellerDashboard;
