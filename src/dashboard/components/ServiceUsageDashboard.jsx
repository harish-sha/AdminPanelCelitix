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

const icons = {
  WHATSAPP: <FaWhatsapp className="text-green-500 text-2xl" />,
  OBD: <FaPhone className="text-blue-500 text-2xl" />,
  RCS: <FaRegCommentDots className="text-indigo-500 text-2xl" />,
  SMS: <FaSms className="text-yellow-500 text-2xl" />,
  EMAIL: <FaEnvelope className="text-red-500 text-2xl" />,
  IBD: <FaFireAlt className="text-orange-500 text-2xl" />,
};

const FILTERS = ["Day", "Month", "Year", "Custom"];
const CHART_TYPES = ["Bar", "Line", "Pie", "Candlestick"];

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
      setStartDate(today);
      setEndDate(today);
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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 bg-white p-4 rounded-2xl shadow-md h-fit sticky top-4">
        <h3 className="font-semibold mb-4">Filter by Service</h3>
        <div className="flex flex-col gap-2">
          {activeServices.map((service) => (
            <label key={service} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => {
                  setSelectedServices((prev) =>
                    prev.includes(service)
                      ? prev.filter((s) => s !== service)
                      : [...prev, service]
                  );
                }}
              />
              {icons[service] ?? "⚠️"} <span>{service}</span>
            </label>
          ))}
        </div>

        <h3 className="font-semibold mt-6 mb-2">Chart Type</h3>
        <div className="flex flex-col gap-2">
          {CHART_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`text-left px-3 py-1 rounded-md ${
                chartType === type ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Service Usage Overview</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          {FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-1.5 rounded-full border ${
                filter === item ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}

          {filter === "Custom" && (
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
              <div>
                {/* <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="border rounded-lg px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxDate={endDate}
                /> */}
                <UniversalDatePicker
                  onChange={(date) => setStartDate(date)}
                  value={startDate}
                  label="From Date"
                  maxDate={endDate}
                />
              </div>
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="border rounded-lg px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  minDate={startDate}
                  maxDate={new Date()}
                /> */}

                <UniversalDatePicker
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

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 ">
          {filteredData.map((service) => (
            <motion.div
              key={service.name}
              whileHover={{ backgroundColor: "#f9fafb" }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between border border-gray-300 rounded-md p-3 hover:border-indigo-300 transition"
            >
              {/* Icon */}
              <div className="flex-shrink-0 bg-indigo-50 text-indigo-600 rounded-full p-3 text-2xl">
                {icons[service.name]}
              </div>

              {/* Service Name + Sent */}
              <div className="flex-1 px-4">
                <p className="text-sm font-semibold text-gray-800 capitalize">
                  {service.name}
                </p>
                <p className="text-base font-bold text-gray-900">
                  {service.totalSent} Sent
                </p>
              </div>

              {/* Charge */}
              <p className="text-sm text-gray-500 whitespace-nowrap">
                ₹{service.totalCharge.toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Graph */}
        <div className="mt-10 p-6 rounded-2xl bg-white shadow-md">
          <h3 className="text-lg font-semibold mb-4">Usage Analytics</h3>
          <ResponsiveContainer width="100%" height={350}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
