import React from "react";
import { useDrag } from "react-dnd";
import { Box, Paper } from "@mui/material";
import "./sidebar.css";

const DraggableItem = ({ item, onClick }) => {
  const [, drag] = useDrag({
    type: item.type,
    item: { type: item.type },
  });

  return (
    <div ref={drag} onClick={onClick} className="cursor-pointer">
      <div
        className="flex flex-col items-center justify-center p-2 w-40 mb-2 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out"
      >
        <span className="sidebar-items-icon">{item.icon}</span>
        {/* Icon */}
        <span className="text-sm font-semibold text-gray-700 mt-1">
          {item.label}
        </span>
      </div>
    </div>
  );
};

export default DraggableItem;
