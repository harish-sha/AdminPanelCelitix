import React from "react";

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

import { motion } from "framer-motion";

export const RCSService = ({ rcsServiceData = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-2xl shadow-sm mt-2"
    >
      {rcsServiceData.length === 0 && (
        <p className="text-center text-gray-500">No Data Available</p>
      )}
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={rcsServiceData}>
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
  );
};
