"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaPhone,
  FaRegCommentDots,
  FaSms,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import moment from "moment";

const FILTERS = ["Day", "Month", "Year"];

const icons = {
  whatsapp: <FaWhatsapp className="text-green-500 text-2xl" />,
  voice: <FaPhone className="text-blue-500 text-2xl" />,
  rcs: <FaRegCommentDots className="text-indigo-500 text-2xl" />,
  sms: <FaSms className="text-yellow-500 text-2xl" />,
};

export default function Dashboard() {
  const [filter, setFilter] = useState("Day");
  const [usageData, setUsageData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const startDate = moment().startOf("day").toDate();
  const endDate = moment().endOf("day").toDate();

  const dailyServiceUsage = async () => {
    const payload = {
      userSrno: 0,
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),
    };
    setIsLoading(true);
    try {
      const res = await fetch("/api/service-usage", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setUsageData(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setUsageData({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dailyServiceUsage();
  }, [startDate, endDate, filter]);

  const services = ["whatsapp", "voice", "rcs", "sms"];

  const chartData = services.map((s) => {
    const item = usageData?.[s]?.[0] || {};
    return {
      name: s.toUpperCase(),
      totalSent: item.totalSent || 0,
      totalCharge: item.totalCharge || 0,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Service Usage Overview</h2>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {FILTERS.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-full border ${filter === item
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
              } transition`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Usage Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => {
          const record = usageData?.[service]?.[0];
          return (
            <motion.div
              key={service}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center shadow-sm"
            >
              {icons[service]}
              <p className="text-sm mt-2 text-gray-500 capitalize">{service}</p>
              <p className="text-xl font-bold mt-1">
                {record?.totalSent ?? 0} Sent
              </p>
              <p className="text-sm text-gray-400">
                ₹{record?.totalCharge?.toFixed(2) ?? "0.00"} charged
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Graph */}
      <div className="mt-10 bg-gray-100 p-4 rounded-xl">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" label={{ value: "Sent", angle: -90, position: "insideLeft" }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: "Charge ₹", angle: 90, position: "insideRight" }}
            />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="totalSent" fill="#60a5fa" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalCharge"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
