import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getUserDetails } from "@/apis/user/user";
import toast from "react-hot-toast";
import Loader from "@/whatsapp/components/Loader";
import { useUser } from "@/context/auth";
import { fetchAllConversations, getWabaList } from "@/apis/whatsapp/whatsapp";
import { Mail, PauseCircle } from "lucide-react";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [totalConvo, setTotalConvo] = useState(null);
  const [activeConvo, setActiveConvo] = useState(null);
  const [inactiveConvo, setInActiveConvo] = useState(null);
  const [activeUnreadMsg, setActiveUnreadMsg] = useState(null);
  const [inactiveUnreadMsg, setInactiveUnreadMsg] = useState(null);
  const [wabaState, setWabaState] = useState({
    waba: [],
    selectedWaba: "",
    wabaSrno: "",
  });


  async function fetchWaba() {
    const res = await getWabaList();
    setWabaState((prev) => ({
      ...prev,
      waba: res,
    }));
  }

  useEffect(() => {
    fetchWaba();
  }, [userData]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsFetching(true);

        const data = {
          mobileNo: wabaState?.waba?.[0]?.mobileNo || "",
          srno: 0,
          active: 1,
          search: "",
          agentSrno: "",
        };

        const res = await fetchAllConversations(data);

        setActiveConvo(res.conversationEntityList);
        setActiveUnreadMsg(res.unreadCounts);
      } catch (e) {
        toast.error("Error fetching active conversations");
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    };

    fetchConversations();
  }, [userData]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsFetching(true);

        const data = {
          mobileNo: wabaState?.waba?.[0]?.mobileNo || "",
          srno: 0,
          active: 0,
          search: "",
          agentSrno: "",
        };

        console.log("data", data);
        const res = await fetchAllConversations(data);
        console.log("res", res);

        setInActiveConvo(res.conversationEntityList);
        setInactiveUnreadMsg(res.unreadCounts);
      } catch (e) {
        toast.error("Error fetching active conversations");
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    };

    fetchConversations();
  }, [userData]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const response = await getUserDetails();
      console.log("response", response);

      if (response && response.statusCode === 200) {
        setUserData(response.data);
      } else {
        console.error("Failed to load user details.");
        toast.error("Failed to load user details!");
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const user = {
    name: "Pablo Nicolus",
    location: "NY, USA",
    inbox: 23,
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className=" bg-rose-50/50 p-6 min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6"
      >
        {/* Top Header Cards */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-8 grid grid-cols-1 gap-6"
        >
          {/* Welcome Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            variants={cardVariants}
            className="relative rounded-xl p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-md border border-pink-200 overflow-hidden"
          >
            {/* Background SVG */}

            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 800"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            >
              <defs>
                <linearGradient id="waveGrad" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#E6E6FA" />
                  <stop offset="100%" stopColor="#D8BFD8" />
                </linearGradient>
              </defs>

              <rect width="100%" height="100%" fill="#FDFDFD" />

              {/* Static background wave (faint) */}
              {/* Wave 1 */}
              <motion.path
                d="M0,300 C480,450 960,150 1440,300 L1440,800 L0,800 Z"
                fill="url(#waveGrad)"
                opacity="0.25"
                animate={{
                  d: [
                    "M0,300 C480,450 960,150 1440,300 L1440,800 L0,800 Z",
                    "M0,260 C480,420 960,180 1440,260 L1440,800 L0,800 Z",
                    "M0,340 C480,480 960,120 1440,340 L1440,800 L0,800 Z",
                    "M0,300 C480,450 960,150 1440,300 L1440,800 L0,800 Z",
                  ],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Wave 2 (slower + opposite) */}
              <motion.path
                d="M0,320 C480,460 960,170 1440,320 L1440,800 L0,800 Z"
                fill="#9370DB"
                opacity="0.15"
                animate={{
                  d: [
                    "M0,320 C480,460 960,170 1440,320 L1440,800 L0,800 Z",
                    "M0,280 C480,430 960,190 1440,280 L1440,800 L0,800 Z",
                    "M0,360 C480,490 960,150 1440,360 L1440,800 L0,800 Z",
                    "M0,320 C480,460 960,170 1440,320 L1440,800 L0,800 Z",
                  ],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.svg>

            {/* Foreground content */}
            <div className="relative z-10">
              <p
                className="text-4xl font-extrabold bg-gradient-to-r from-[#9d4edd] via-[#5a189a] to-[#9d4edd]
                text-transparent bg-clip-text"
              >
                Welcome Back
              </p>

              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-900">
                {userData?.name
                  ? userData.name.charAt(0).toUpperCase() +
                  userData.name.slice(1)
                  : ""}
              </h1>
            </div>
          </motion.div>

          {/* Inbox + Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              variants={cardVariants}
              className="bg-gradient-to-br from-purple-50 via-rose-50 to-amber-50 rounded-xl p-6 shadow-sm border border-purple-100"
            >
              <p className="text-sm text-purple-700">Inbox</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {/* Active Unread Messages */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-3 bg-white/70 border border-purple-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="hidden md:flex w-14 h-12 items-center justify-center text-purple-700">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-rose-600 text-transparent bg-clip-text">
                      {activeUnreadMsg?.length}
                    </h2>
                    <p className="text-xs text-purple-700/80">Active Unread</p>
                  </div>
                </motion.div>

                {/* Inactive Unread Messages */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="flex items-center gap-3 bg-white/70 border border-rose-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="hidden md:flex w-16 h-12 items-center justify-center text-rose-700">
                    <PauseCircle size={22} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 text-transparent bg-clip-text">
                      {inactiveUnreadMsg?.length}
                    </h2>
                    <p className="text-xs text-rose-700/80">Inactive Unread</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              variants={cardVariants}
              className="gap-10 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <p className="text-sm font-semibold text-slate-600">
                Quick Overview
              </p>
              <motion.div
                className="mt-3 flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-rose-50 rounded-lg p-3 text-center hover:scale-105 transition">
                  <p className="text-xs text-rose-600">Total Read Chats</p>
                  <p className="font-semibold">{(activeConvo?.length - activeUnreadMsg?.length) + (inactiveConvo?.length - inactiveUnreadMsg?.length)}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-3 text-center hover:scale-105 transition">
                  <p className="text-xs text-emerald-600">Active Read Chats</p>
                  <p className="font-semibold">{activeConvo?.length - activeUnreadMsg?.length}</p>
                </div>
                <div className="bg-sky-50 rounded-lg p-3 text-center hover:scale-105 transition">
                  <p className="text-xs text-sky-600">Inactive Read Chats</p>
                  <p className="font-semibold">{inactiveConvo?.length - inactiveUnreadMsg?.length}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column */}
        <aside className="lg:col-span-4 space-y-6">
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            {/* Top Section */}
            <div className="flex items-center justify-between bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8] p-4 rounded-xl shadow-sm border border-[#C8A2FF]">
              {/* Left Side */}
              <div>
                <p className="text-xs uppercase tracking-wide text-[#9370DB] font-semibold">
                  Profile
                </p>
                <h3 className="text-lg font-bold text-[#5D3FD3] mt-1">
                  {userData?.name &&
                    userData.name.charAt(0).toUpperCase() +
                    userData.name.slice(1)}
                </h3>

                <p className="text-sm text-slate-600">{userData?.email}</p>

                <div className="flex items-center gap-2 mt-2">
                  {/* Department */}
                  <p
                    className="text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r 
                    from-[#9370DB] to-[#7D5FFF] shadow-md"
                  >
                    {userData?.departmentName}
                  </p>

                  {/* Status */}
                  {userData?.status === 1 && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  )}
                </div>
              </div>

              {/* Right Side - Avatar */}
              <motion.div
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: "backOut" }}
              >
                <div className="hidden md:flex w-16 h-16 rounded-full bg-[#9370DB] items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white">
                  {userData?.name?.charAt(0).toUpperCase()}
                </div>
                {/* Status indicator */}
                {/* {userData?.status === 1 && (
                  <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow"></span>
                )} */}
              </motion.div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-[#E6E6FA] rounded-lg p-3 text-center hover:scale-105 transition">
                <p className="md:text-xs text-[10px] text-[#9370DB]">Total Chats</p>
                <p className="font-semibold">
                  {activeConvo?.length + inactiveConvo?.length}
                </p>
              </div>
              <div className="bg-[#D8BFD8] rounded-lg p-3 text-center hover:scale-105 transition">
                <p className="md:text-xs text-[10px] text-[#7D5FFF]">Active Chats</p>
                <p className="font-semibold">{activeConvo?.length}</p>
              </div>
              <div className="bg-[#C8A2FF] rounded-lg py-3 px-2 text-center hover:scale-105 transition">
                <p className="md:text-xs text-[10px] text-[#5D3FD3]">Inactive Chats</p>
                <p className="font-semibold">{inactiveConvo?.length}</p>
              </div>
            </div>
          </motion.div>
        </aside>
      </motion.div>
    </div>
  );
}
