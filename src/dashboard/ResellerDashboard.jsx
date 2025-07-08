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
import { BsCreditCard2Back } from "react-icons/bs";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import RefreshIcon from "@mui/icons-material/Refresh";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { Loop as LoopIcon } from "@mui/icons-material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
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
import twowaysms from "../assets/animation/twowaysms.json";
import Lottie from "lottie-react";
import { getUserDetails, getCreditLimit } from "@/apis/user/user";
import CountUp from "react-countup";
import toast from "react-hot-toast";

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
} from "recharts";
import { fetchBalance } from "@/apis/settings/setting";
import { useUser } from "@/context/auth";
import CustomTooltip from "@/components/common/CustomTooltip";
import ClockCard from "./components/ClockCard";

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

// const services = [
//     {
//         name: "WhatsApp",
//         icon: WhatsApp,
//         animation: Animationwhatsapp2,
//         desc: "Send real-time notifications",
//         color: "from-green-100 to-green-300",
//     },
//     {
//         name: "RCS",
//         icon: Message,
//         animation: Animationrcs,
//         desc: "Interactive messaging solution",
//         color: "from-purple-100 to-purple-300",
//     },
//     {
//         name: "OBD",
//         icon: Call,
//         animation: Animationobd,
//         desc: "Automated outbound dialer",
//         color: "from-yellow-100 to-yellow-300",
//     },
//     {
//         name: "IBD",
//         icon: Call,
//         animation: Animationibd,
//         desc: "Track inbound communications",
//         color: "from-indigo-100 to-indigo-300",
//     },
//     {
//         name: "SMS",
//         icon: PhoneAndroid,
//         animation: Animationsms,
//         desc: "Send and receive SMS",
//         color: "from-pink-100 to-pink-300",
//     },
//     {
//         name: "Email",
//         icon: Email,
//         animation: email2,
//         desc: "Campaign and transactional email",
//         color: "from-blue-100 to-blue-300",
//     },
//     {
//         name: "App Authenticator",
//         icon: Lock,
//         animation: auth,
//         desc: "Secure 2FA login solutions",
//         color: "from-gray-100 to-gray-300",
//     },
//     {
//         name: "Two-Way SMS",
//         icon: SyncAlt,
//         desc: "Bi-directional messaging",
//         color: "from-red-100 to-red-300",
//     },
// ];

// const quickStats = [
//     // {
//     //     icon: <TaskAlt className="text-green-600" />,
//     //     label: "Active Campaigns",
//     //     value: 32,
//     // },
//     // {
//     //     icon: <TrendingUp className="text-blue-600" />,
//     //     label: "Engagement Rate",
//     //     value: "78%",
//     // },
//     {
//         icon: <span className="text-green-600">💰</span>, // Balance icon (custom icon)
//         label: "Balance",
//         value: <CountUp start={0} end={balance} separator="," decimals={2} duration={2.5} /> // Balance with counting animation
//     },
//     {
//         icon: <span className="text-red-600">⚠️</span>, // Outstanding balance icon (custom icon)
//         label: "Outstanding Balance",
//         value: <CountUp start={0} end={rechargableCredit} separator="," decimals={2} duration={2.5} /> // Rechargeable Credit with counting animation
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
    const [creditLimit, setCreditLimit] = useState(0);

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

    const fetchCreditLimit = async () => {
        setIsLoading(true);
        try {
            const response = await getCreditLimit();
            console.log("response", response);
            const limit = parseFloat(response.creditLimit);
            setCreditLimit(isNaN(limit) ? 0 : limit);
            setRefreshKey((prevKey) => prevKey + 1);
        } catch (error) {
            console.error("Error fetching credit limit:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCreditLimit();
    }, []);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setIsLoading(true);
            const response = await getUserDetails();
            if (response && response.statusCode === 200) {
                const user = response.data[0];
                setUserData(user);
                setFormData({ firstName: user.firstName || user.name || "" });
            } else {
                console.error("Failed to load user details.");
                toast.error("Failed to load user details!");
            }
            setIsLoading(false);
        };
        fetchUserDetails();
    }, []);

    const quickStats = [
        // {
        //     icon: <TaskAlt className="text-green-600" />,
        //     label: "Active Campaigns",
        //     value: 32,
        // },
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
            // onHover: () => setShowRefresh(true),
            // onMouseLeave: () => setShowRefresh(false),
            showRefreshIcon: true,
        },
        // {
        //     icon: <GppMaybeIcon className="text-red-800" />,
        //     label: "Outstanding Balance",
        //     value: <CountUp start={0} end={rechargableCredit} separator="," decimals={2} duration={1.5} />
        // },
        ...(user.role === "RESELLER"
            ? [
                {
                    icon: <GppMaybeIcon className="text-red-800" />,
                    label: "Outstanding Balance",
                    value: (
                        <CountUp
                            start={0}
                            end={rechargableCredit}
                            separator=","
                            decimals={2}
                            duration={1.5}
                            key={refreshKey}
                        />
                    ),
                },
                {
                    icon: <BsCreditCard2Back className="text-blue-800" />,
                    label: "Credit Limit",
                    value: (
                        <CountUp
                            start={0}
                            end={creditLimit}
                            separator=","
                            decimals={2}
                            duration={1.5}
                            key={refreshKey}
                        />
                    ),
                },
            ]
            : [
                {
                    icon: <TrendingUp className="text-blue-600" />,
                    label: "Engagement Rate",
                    value: "78%",
                },
            ]),
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

    return (
        <div className="bg-white text-gray-900 rounded-2xl p-4 space-y-6 min-h-[calc(100vh-6rem)]">
            {/* Logged In User Card */}
            <motion.div
                className="rounded-2xl shadow-md p-6 flex items-center justify-between flex-wrap gap-6 bg-gradient-to-br from-blue-50 to-blue-100"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center flex-wrap justify-center gap-3">
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
                    <div className="">
                        <h2 className="text-3xl font-semibold playf">
                            Welcome back, {formData.firstName || "User"}
                        </h2>
                        <p className="text-xs opacity-80">
                            You're doing great. Here's a quick overview of your dashboard.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                    {quickStats.map((stat, i) => (
                        <div
                            key={i}
                            className="relative bg-white rounded-xl shadow p-3 px-4 flex flex-col items-start justify-center w-50 h-28"
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
                                            <button onClick={() => {
                                                getBalance()
                                                fetchCreditLimit()
                                            }} className="">
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
                                <div className="font-semibold text-lg text-gray-800">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Total Revenue */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-4 rounded-2xl shadow-sm"
                >
                    <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="online" fill="#3498db" name="Online Sales" />
                            <Bar dataKey="offline" fill="#2ecc71" name="Offline Sales" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Customer Satisfaction */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-4 rounded-2xl shadow-sm"
                >
                    <h2 className="text-lg font-semibold mb-2">Customer Satisfaction</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={satisfactionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="last"
                                stroke="#3498db"
                                name="Last Month"
                            />
                            <Line
                                type="monotone"
                                dataKey="current"
                                stroke="#2ecc71"
                                name="This Month"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-between text-sm mt-2 text-gray-600">
                        <div>₹1,017</div>
                        <div>₹1,757</div>
                    </div>
                </motion.div>

                {/* Target vs Reality */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-4 rounded-2xl shadow-sm"
                >
                    <h2 className="text-lg font-semibold mb-2">Target vs Reality</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={targetRealityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="reality" fill="#1abc9c" name="Reality Sales" />
                            <Bar dataKey="target" fill="#f1c40f" name="Target Sales" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-between text-sm mt-2">
                        <span className="text-green-600">₹8,823</span>
                        <span className="text-yellow-600">₹12,122</span>
                    </div>
                </motion.div>
            </div>
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
        </div>
    );
};

export default ResellerDashboard;
