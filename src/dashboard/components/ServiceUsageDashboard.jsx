// Required imports
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  //   CandlestickChart, // example custom chart or plugin
} from "recharts";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  FaWhatsapp,
  FaPhone,
  FaRegCommentDots,
  FaSms,
  FaEnvelope,
  FaChartPie,
  FaChartLine,
  FaFireAlt,
} from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import { getUserDetails } from "@/apis/user/user";
import { dailySeriveUsage } from "@/apis/settings/setting";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
// import MiniCalendar from "./date";
import DateInputWithCalendar from "./DateInputWithCalendar";

import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";
// import CandlestickChartSharpIcon from '@mui/icons-material/CandlestickChartSharp';

const ICON_MAP = {
  Bar: <BarChartIcon />,
  Line: <ShowChartIcon />,
  Pie: <PieChartIcon />,
  // Scatter: <CandlestickChartSharpIcon />,
};

const icons = {
  WHATSAPP: <FaWhatsapp className="text-green-500 text-2xl" />,
  OBD: <FaPhone className="text-blue-500 text-2xl" />,
  RCS: <FaRegCommentDots className="text-indigo-500 text-2xl" />,
  SMS: <FaSms className="text-yellow-500 text-2xl" />,
  EMAIL: <FaEnvelope className="text-red-500 text-2xl" />,
  IBD: <FaFireAlt className="text-orange-500 text-2xl" />,
};

// const FILTERS = ["Day", "Month", "Year", "Custom"];
// const FILTERS = ["Day", "Month", "Year"];
const FILTERS = ["Day", "Month"];
const CHART_TYPES = ["Bar", "Line", "Pie"];

export default function ServiceUsageDashboard() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filter, setFilter] = useState("Day");
  const [activeServices, setActiveServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [usageData, setUsageData] = useState({});
  const [chartType, setChartType] = useState("Bar");
  const [isLoading, setIsLoading] = useState(false);
  const [chartHeight, setChartHeight] = useState(340);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        // Tailwind "sm" breakpoint
        setChartHeight(200); // smaller height
      } else if (window.innerWidth <= 800) {
        setChartHeight(260);
      } else {
        setChartHeight(340);
      }
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await getUserDetails();
        if (response?.statusCode === 200) {
          const user = response.data[0];
          const services = user.allowedServices.map((s) =>
            s.display_name.toUpperCase()
          );

          console.log("servoice", services);
          setActiveServices(services);
          setSelectedServices(services);
        }
      } catch (err) {
        console.error("Failed to load user details", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const today = new Date();
    if (filter === "Day") {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      setStartDate(yesterday);
      setEndDate(yesterday);
    } else if (filter === "Month") {
      setStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
      setEndDate(today);
    } else if (filter === "Year") {
      setStartDate(new Date(today.getFullYear(), 0, 1));
      setEndDate(today);
    }
  }, [filter]);

  //   useEffect(() => {
  //     if (startDate && endDate) fetchServiceUsage();
  //   }, [startDate, endDate]);

  useEffect(() => {
    if (filter !== "Custom" && startDate && endDate) {
      fetchServiceUsage();
    }
  }, [startDate, endDate, filter]);

  const fetchServiceUsage = async () => {
    const payload = {
      userSrno: 0,
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),
    };
    setIsLoading(true);
    try {
      const res = await dailySeriveUsage(payload);
      setUsageData(res || {});
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const displayNameToUsageKey = {
    OBD: "voice", // 'OBD' from allowedServices maps to 'voice' in usageData
    SMS: "sms",
    WHATSAPP: "whatsapp",
    RCS: "rcs",
  };

  const filteredData = selectedServices.map((s) => {
    const displayName = s;
    const usageKey =
      displayNameToUsageKey[displayName] || displayName.toLowerCase();
    const record = usageData?.[usageKey]?.[0] || {};
    return {
      name: displayName,
      "Total Sent": record.totalSent || 0,
      "Total Charge": record.totalCharge || 0,
    };
  });

  const renderChart = () => {
    if (chartType === "Line") {
      return (
        <ComposedChart data={filteredData}>
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Total Sent"
            stroke="#3b82f6"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Total Charge"
            stroke="#ef4444"
          />
        </ComposedChart>
      );
    } else if (chartType === "Pie") {
      return (
        <PieChart>
          <Tooltip />
          <Pie
            data={filteredData}
            dataKey="Total Sent"
            nameKey="name"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#3b82f6", "#ef4444", "#10b981", "#f59e0b"][index % 4]}
              />
            ))}
          </Pie>
        </PieChart>
      );
    } else if (chartType === "Candlestick") {
      const candlestickSeries = [
        {
          data: filteredData.map((item) => ({
            x: item.name,
            y: [
              item["Total Sent"] * 0.8, // open
              item["Total Sent"] * 1.2, // high
              item["Total Sent"] * 0.5, // low
              item["Total Sent"], // close
            ],
          })),
        },
      ];

      const candlestickOptions = {
        chart: {
          type: "candlestick",
          height: 350,
        },
        title: {
          text: "Service Usage Candlestick Chart",
          align: "left",
        },
        xaxis: {
          type: "category",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      };

      return (
        <ReactApexChart
          options={candlestickOptions}
          series={candlestickSeries}
          type="candlestick"
          height={350}
        />
      );
    }
    return (
      <ComposedChart data={filteredData}>
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="Total Sent" fill="#3b82f6" />
        <Line yAxisId="right" dataKey="Total Charge" stroke="#ef4444" />
      </ComposedChart>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex md:flex-row flex-col gap-3 rounded-2xl bg-gradient-to-tr from-blue-50 via-white to-blue-100 border-2 border-dashed border-blue-200 p-2 md:h-147 ">
        {/* Sidebar */}
        <div className="bg-white p-2 rounded-2xl shadow-md md:h-full h-1/5 space-y-4 border-1 border-gray-200 md:w-50 w-full">
          {/* Services Filter */}
          <span className="text-xl font-semibold text-gray-800 tracking-wide playf">
            Filter Services
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 gap-3">
            {activeServices.map((service) => {
              const selected = selectedServices.includes(service);
              // Map service → its color palette
              const palette = {
                whatsapp: [
                  "from-green-100",
                  "to-green-300",
                  "text-black-00",
                  "bg-green-50",
                ],
                sms: [
                  "from-pink-100",
                  "to-pink-300",
                  "text-black-600",
                  "bg-pink-50",
                ],
                rcs: [
                  "from-purple-100",
                  "to-purple-300",
                  "text-black-600",
                  "bg-purple-50",
                ],
                obd: [
                  "from-yellow-100",
                  "to-yellow-300",
                  "text-black-600",
                  "bg-yellow-50",
                ],
              }[service.toLowerCase()] || [
                "from-gray-100",
                "to-gray-300",
                "text-black-600",
                "bg-gray-50",
              ];

              const [from, to, txt, bg] = palette;

              return (
                <button
                  key={service}
                  onClick={() =>
                    setSelectedServices((prev) =>
                      selected
                        ? prev.filter((s) => s !== service)
                        : [...prev, service]
                    )
                  }
                  className={`
                    flex flex-col sm:flex-row items-center sm:gap-2 gap-0 w-full px-2 py-2 rounded-lg transition cursor-pointer
                         ${
                           selected
                             ? `bg-gradient-to-r ${from} ${to} ${txt} shadow-md`
                             : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                         }
                    `}
                >
                  <span
                    className={`
                    flex-shrink-0 p-2 rounded-full transition
                      ${selected ? "" : bg} ${selected ? txt : "text-gray-400"}
                       `}
                  >
                    {icons[service] || "🔧"}
                  </span>

                  <span className="flex-1 text-sm text-left font-medium">
                    {service}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Chart Type */}
          <span className="font-semibold text-xl playf">Chart Type</span>

          <div className="flex md:flex-col flex-col sm:flex-row gap-2">
            {CHART_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`flex items-center justify-center gap-2 px-3 py-1 rounded-md ${
                  chartType === type ? "bg-[#687efa] text-white" : "bg-gray-100"
                }`}
              >
                {ICON_MAP[type] || <span className="w-5" />}
                {/* label */}
                <span className="font-medium">{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-tr from-blue-50 via-white to-blue-100 p-3 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-3xl font-medium playf">
              Service Usage Overview
            </h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
              {FILTERS.map((item) => (
                <div
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`relative px-4 py-1.5 rounded-full border cursor-pointer overflow-hidden transition-colors duration-300 ${
                    filter === item
                      ? "text-white scale-105"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <span className="relative z-10">{item?.toUpperCase()}</span>
                  <span
                    className={`absolute inset-0 rounded-full transition-transform duration-300 ease-in-out bg-gradient-to-r from-[#687efa] to-[#687efa] z-0
        ${filter === item ? "translate-y-0" : "translate-y-full"}`}
                    style={{ transformOrigin: "bottom" }}
                  ></span>
                </div>
              ))}

              {/* background: linear-gradient(to right, #2b40b0, #8447c6, #36bae2); */}

              {filter === "Custom" && (
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
                  <div>
                    <DateInputWithCalendar
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      value={startDate}
                      label="From Date"
                      maxDate={endDate}
                    />
                  </div>
                  <div>
                    <DateInputWithCalendar
                      onChange={(date) => setEndDate(date)}
                      value={endDate}
                      label="To Date"
                      minDate={startDate}
                      maxDate={new Date()}
                    />
                  </div>

                  <button
                    onClick={fetchServiceUsage}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Usage Cards */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredData.map((service, i) => (
            <motion.div
              key={service.name}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center shadow-sm"
            >
              <div className="text-3xl">{icons[service.name]}</div>
              <p className="text-sm mt-2 text-gray-500 capitalize">
                {service.name}
              </p>
              <p className="text-xl font-bold mt-1">{service.totalSent} Sent</p>
              <p className="text-sm text-gray-400">
                ₹{service.totalCharge.toFixed(2)} charged
              </p>
            </motion.div>
          ))}
        </div> */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
            {filteredData.map((service) => (
              <motion.div
                key={service.name}
                whileHover={{ backgroundColor: "#f9fafb" }}
                transition={{ duration: 0.2 }}
                className="flex flex-row md:flex-col lg:flex-row items-center justify-between border border-gray-300 rounded-xl p-2 hover:border-indigo-300 transition"
              >
                {/* Icon */}
                <div className="flex-shrink-0 bg-indigo-50 text-indigo-600 rounded-full p-2 text-2xl">
                  {icons[service.name]}
                </div>

                {/* Service Name + Sent */}
                <div className="flex-1 px-2">
                  <p className="text-md font-semibold text-gray-800">
                    {service.name?.toUpperCase()}
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {service["Total Sent"]} Sent
                  </p>
                </div>

                {/* Charge */}
                <div className="flex-1">
                  <p className="text-sm text-gray-700 font-semibold whitespace-nowrap">
                    ₹{service["Total Charge"].toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Graph */}
          <div className="mt-3 p-3 rounded-2xl bg-white border-2 border-dashed">
            <h3 className="text-lg font-semibold mb-2">Usage Analytics</h3>
            <ResponsiveContainer width="100%" height={chartHeight}>
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
