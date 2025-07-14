// src/components/TimelinePanel.jsx
import React from "react";
import { FiMail, FiMoreHorizontal } from "react-icons/fi";

export default function TimelinePanel() {
  return (
    <div className="relative pl-5">
      {/* Vertical line */}
      <div className="absolute top-0 left-0 h-full w-px bg-gray-200" />

      {/* First entry */}
      <div className="relative mb-6 spapce-y-2">
        {/* Circle */}
        <div className="absolute -left-8 top-0 flex items-center justify-center h-6 w-6 rounded-full bg-gray-300">
          <FiMail className="text-gray-600" size={14} />
        </div>
        {/* Content */}
        <div className="text-xs font-medium">
          404 error when on a specific page
        </div>
           <span className="text-gray-600">#1</span>
        <div className="mt-1 text-xs text-gray-500">
          7 Jul 2025, 10:37 AM • Status: Open
        </div>
      </div>

      {/* Second entry */}
      <div className="relative mb-4 spapce-y-2">
        {/* Circle */}
        <div className="absolute -left-8 top-0 flex items-center justify-center h-6 w-6 rounded-full bg-gray-200">
          <FiMail className="text-gray-600" size={14} />
        </div>
        {/* Content */}
        <div className="text-xs font-medium">
          Authentication failure 
        </div>
          <span className="text-gray-600">#2</span>
        <div className="mt-1 text-xs text-gray-500">
          7 Jul 2025, 10:37 AM • Status: Closed
        </div>
      </div>

      {/* View all activity */}
      <button className="relative flex items-center space-x-2 text-xs text-blue-600 ">
        {/* Dots circle */}
        <div className="absolute -left-8 top-0 flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-gray-200">
          <FiMoreHorizontal className="text-gray-600" size={14} />
        </div>
        <span>View all activity</span>
      </button>
    </div>
  );
}
