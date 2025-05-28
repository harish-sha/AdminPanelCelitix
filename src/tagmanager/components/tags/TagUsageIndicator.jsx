import React from "react";
import { Tooltip } from "@mui/material";

const TagUsageIndicator = ({ tagName, usageCount, color }) => {
  return (
    <Tooltip title={`${usageCount} uses`} arrow>
      <div className="flex items-center space-x-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        ></span>
        <span className="text-sm font-medium text-gray-800">{tagName}</span>
        <span className="text-xs text-gray-500">({usageCount})</span>
      </div>
    </Tooltip>
  );
};

export default TagUsageIndicator;
