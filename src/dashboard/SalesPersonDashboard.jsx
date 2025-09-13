import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SalesPersonDashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good Morning");
    else if (hours < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      let formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      formattedTime = formattedTime.replace(/am|pm/i, (m) => m.toUpperCase());

      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setTime(formattedTime);
      setDate(formattedDate);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: "Leads",
      value: "1,245",
      change: "+12% this week",
      color: "pink",
      bgGradient: "from-pink-100 via-pink-200 to-pink-50",
      stripe: "bg-[repeating-linear-gradient(45deg,#fbcfe8_0_10px,#f9a8d4_0_20px)]",
      changeColor: "text-green-500",
    },
    {
      title: "Reports",
      value: "356",
      change: "-5% this week",
      color: "blue",
      bgGradient: "from-blue-100 via-blue-200 to-blue-50",
      stripe: "bg-[repeating-linear-gradient(45deg,#bfdbfe_0_10px,#93c5fd_0_20px)]",
      changeColor: "text-red-500",
    },
    {
      title: "Clicks",
      value: "8,742",
      change: "+8% this week",
      color: "purple",
      bgGradient: "from-purple-100 via-purple-200 to-purple-50",
      stripe: "bg-[repeating-linear-gradient(45deg,#e9d5ff_0_10px,#d8b4fe_0_20px)]",
      changeColor: "text-green-500",
    },
    {
      title: "Conversions",
      value: "524",
      change: "+3% this week",
      color: "green",
      bgGradient: "from-green-100 via-green-200 to-green-50",
      stripe: "bg-[repeating-linear-gradient(45deg,#d1fae5_0_10px,#a7f3d0_0_20px)]",
      changeColor: "text-green-500",
    },
  ];

  return (
    <div className="w-full">
      {/* Top Row: Banner + Profile */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Banner */}
        <div
          className="relative w-full h-64 md:col-span-2 rounded-xl bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?w=500&auto=format&fit=crop&q=60')",
          }}
        >
          <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
          <motion.div
            className="absolute top-4 left-4 z-10 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold drop-shadow-md">{greeting}, Lingkan Roy</h3>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-14 drop-shadow-lg">{time}</h1>
            <p className="text-lg text-gray-200 mt-2">{date}</p>
          </motion.div>
        </div>

        {/* Right: Profile Card */}
        <motion.div
          className="bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] rounded-xl shadow-lg p-6 flex flex-col relative overflow-hidden md:h-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -5 }}
        >
          <motion.div
            className="absolute -top-12 -left-12 w-36 h-36 md:w-40 md:h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-12 -right-12 w-36 h-36 md:w-40 md:h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          ></motion.div>

          <h4 className="mt-4 text-lg font-bold text-gray-800 relative z-10">Lingkan Roy</h4>
          <p className="text-sm text-gray-600 relative z-10">Product Designer</p>
          <p className="text-sm mt-1 text-gray-500 relative z-10">lingkan.roy@example.com</p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className={`relative p-6 rounded-xl flex flex-col items-center justify-center shadow-lg overflow-hidden bg-gradient-to-tr ${stat.bgGradient}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`absolute top-0 left-0 w-full h-full ${stat.stripe} opacity-20`}></div>
            <h4 className={`text-sm text-${stat.color}-600 z-10 relative`}>{stat.title}</h4>
            <p className={`text-3xl font-bold text-${stat.color}-700 z-10 mt-2`}>{stat.value}</p>
            <span className={`${stat.changeColor} text-xs z-10 mt-1`}>{stat.change}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SalesPersonDashboard;
