import React from "react";
import { motion } from "framer-motion";

const TagAnalyticsCard = ({ tag }) => {
  if (!tag || typeof tag !== "object") return null;

  const {
    color = "#D1D5DB",
    name = "Unnamed",
    usageCount = 0,
    clicks = 0,
    responses = 0,
    engagementRate = 0,
  } = tag;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg"
    >
      <div className="flex items-center space-x-3 mb-3">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
        />
        <h3 className="text-md font-semibold text-gray-800">{name}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <p className="font-medium text-gray-500">Used In</p>
          <p>{usageCount} campaigns</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Clicks</p>
          <p>{clicks}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Responses</p>
          <p>{responses}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Engagement</p>
          <p>{engagementRate}%</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TagAnalyticsCard;
