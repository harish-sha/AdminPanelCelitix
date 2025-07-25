import React, { useState } from "react";
import CommentModerationTable from "./components/CommentModerationTable";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/whatsapp/components/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import WifiIcon from "@mui/icons-material/Wifi";
import Battery90Icon from "@mui/icons-material/Battery90";
import MenuIcon from "@mui/icons-material/Menu";
import {
  FaPaperPlane,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPause,
  FaEye,
  FaPlusCircle,
} from "react-icons/fa";
import {
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaBoxOpen,
  FaComments,
  FaStar,
} from "react-icons/fa";
import CountUp from "react-countup";
import { Preview } from "./components/preview";
// import { Preview } from './components/preview';

const CommentModeration = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [persistMenuItems, setPersistMenuItems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const userOption = [
    { label: "Demo1", value: "demo1" },
    { label: "Demo2", value: "demo2" },
    { label: "Demo3", value: "demo3" },
  ];
  const mediaOption = [
    { label: "Keyword1", value: "Keyword1" },
    { label: "Keyword2", value: "Keyword2" },
    { label: "Keyword3", value: "Keyword3" },
  ];
  // const statusOption= [
  //   {label: 'Disable', value: 'disable'},
  //   {label: 'Enable ', value: 'enable '}
  // ]

  const statsData = [
    {
      label: "Total Comments",
      count: (
        <CountUp
          start={0}
          end={1000}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaUsers,
      bg: "from-pink-100 to-pink-50",
      iconBg: "bg-pink-300",
    },
    {
      label: "Replied Comments",
      count: (
        <CountUp
          start={0}
          end={800}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaShoppingCart,
      bg: "from-blue-100 to-blue-50",
      iconBg: "bg-blue-300",
    },
    {
      label: "Deleted Comments",
      count: (
        <CountUp
          start={0}
          end={500}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaDollarSign,
      bg: "from-green-100 to-green-50",
      iconBg: "bg-green-300",
    },
    {
      label: "Growth",
      count: (
        <CountUp
          start={0}
          end={100}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaChartLine,
      bg: "from-purple-100 to-purple-50",
      iconBg: "bg-purple-300",
    },
    {
      label: "Private Replies",
      count: (
        <CountUp
          start={0}
          end={12}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaBoxOpen,
      bg: "from-yellow-100 to-yellow-50",
      iconBg: "bg-yellow-300",
    },
    {
      label: "Hide Comments",
      count: (
        <CountUp
          start={0}
          end={1200}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaComments,
      bg: "from-teal-100 to-teal-50",
      iconBg: "bg-teal-300",
    },
    {
      label: "Comments Enabled Media",
      count: (
        <CountUp
          start={0}
          end={700}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaStar,
      bg: "from-orange-100 to-orange-50",
      iconBg: "bg-orange-300",
    },
  ];

  const StatsCards = () => {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pb-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl  shadow-md bg-gradient-to-br ${stat.bg} p-3 flex items-center justify-between hover:shadow-lg transition`}
          >
            <div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              <p className="text-md font-bold text-gray-800 mt-1">
                {stat.count}
              </p>
            </div>
            <div
              className={`p-2 rounded-full ${stat.iconBg} text-white shadow-md`}
            >
              <stat.icon className="text-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-2/3">
        <div className="flex flex-wrap items-end w-full gap-2 mb-4">
          <div className="w-max-content">
            <AnimatedDropdown
              label="Instagram Account"
              options={userOption}
              onChange={(e) => console.log(e)}
            />
          </div>
          <div className="w-max-content">
            <AnimatedDropdown
              label="Media "
              options={mediaOption}
              onChange={(e) => console.log(e)}
            />
          </div>
          <div className="w-max-content">
            <InputField label="User" placeholder="Enter User Name" />
          </div>
          {/* <div className="w-max-content">
            <AnimatedDropdown
              label="Status"
              options={statusOption}
              onChange={(e) => console.log(e)}
            />
          </div> */}
          {/* Search Button */}
          <div className="w-max-content">
            <UniversalButton label="Show" />
          </div>
        </div>

        <StatsCards />

        {isFetching ? (
          <div className="w-full">
            <UniversalSkeleton height="35rem" width="100%" />
          </div>
        ) : (
          <div className="w-full">
            <CommentModerationTable
              id="CommentModerationTable"
              name="CommentModerationTable"
            />
          </div>
        )}
      </div>
      <div className="mx-auto">
        <Preview />
      </div>
    </div>
  );
};

export default CommentModeration;
