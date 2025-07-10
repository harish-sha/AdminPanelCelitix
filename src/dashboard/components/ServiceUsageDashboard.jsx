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
      totalSent: record.totalSent || 0,
      totalCharge: record.totalCharge || 0,
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
            dataKey="totalSent"
            stroke="#3b82f6"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="totalCharge"
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
            dataKey="totalSent"
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
              item.totalSent * 0.8, // open
              item.totalSent * 1.2, // high
              item.totalSent * 0.5, // low
              item.totalSent, // close
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
        <Bar yAxisId="left" dataKey="totalSent" fill="#3b82f6" />
        <Line yAxisId="right" dataKey="totalCharge" stroke="#ef4444" />
      </ComposedChart>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-3 rounded-2xl bg-gradient-to-tr from-blue-50 via-white to-blue-100 border-2 border-dashed border-blue-200 p-2 h-147">
        {/* Sidebar */}
        <div className=" bg-white p-2 rounded-2xl shadow-md h-full space-y-4 border-1  border-gray-200 w-50">
          {/* Services Filter */}
          <span className="text-xl font-semibold text-gray-800 tracking-wide playf">
            Filter Services
          </span>
          <div className="space-y-2">
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
                    flex items-center gap-2 w-full px-2 py-2 rounded-lg transition cursor-pointer
                         ${selected
                      ? `bg-gradient-to-r ${from} ${to} ${txt} shadow-md`
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }
                    `}
                >
                  <span
                    className={`
                    flex-shrink-0 p-2 rounded-full transition
                      ${selected ? "" : bg} ${selected ? txt : "text-gray-400"
                      }
                       `}
                  >
                    {icons[service] || "🔧"}
                  </span>

                  <span className="flex-1 text-sm text-left font-medium lowercase">
                    {service}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Chart Type */}
          <span className="font-semibold text-xl playf">Chart Type</span>

          <div className="flex flex-col  gap-2">
            {CHART_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`flex items-center justify-center gap-2 px-3 py-1 rounded-md ${chartType === type ? "bg-[#687efa] text-white" : "bg-gray-100"
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
            <h2 className="text-3xl font-medium playf">Service Usage Overview</h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              {FILTERS.map((item) => (
                <div
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`relative px-4 py-1.5 rounded-full border cursor-pointer overflow-hidden transition-colors duration-300 ${filter === item ? "text-white scale-105" : "bg-white text-gray-700"
                    }`}
                >
                  <span className="relative z-10">{item}</span>
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
                className="flex items-center justify-between border border-gray-300 rounded-xl p-2 hover:border-indigo-300 transition w-full"
              >
                {/* Icon */}
                <div className="flex-shrink-0 bg-indigo-50 text-indigo-600 rounded-full p-2 text-2xl">
                  {icons[service.name]}
                </div>

                {/* Service Name + Sent */}
                <div className="flex-1 px-2">
                  <p className="text-md font-semibold text-gray-800 lowercase">
                    {service.name}
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {service.totalSent} Sent
                  </p>
                </div>

                {/* Charge */}
                <p className="text-sm text-gray-700 font-semibold whitespace-nowrap">
                  ₹{service.totalCharge.toFixed(2)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Graph */}
          <div className="mt-3 p-3 rounded-2xl bg-white border-2 border-dashed">
            <h3 className="text-lg font-semibold mb-2">Usage Analytics</h3>
            <ResponsiveContainer width="100%" height={350}>
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
