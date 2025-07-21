// src/components/ActionToolbar.jsx
import React from "react";
import {
  FiStar,
  FiChevronLeft,
  FiPlus,
  FiMoreVertical,
  FiList,
  FiActivity,
  FiMoreHorizontal,
  FiChevronsRight,
} from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { GoSidebarCollapse } from "react-icons/go";

export default function ActionToolbar({ onToggleCollapse, onToggleSidebar }) {
  return (
    <div className="bg-white px-2 md:px-2 py-2 flex flex-nowrap md:flex-nowrap items-center space-x-1 md:space-x-2 border-b w-fit lg:w-full">
      {/* Left group */}
      <button className="btn-sm">
        <FiStar size={16} />
        <span className="hidden md:inline ml-1"> </span>
      </button>

      <button className="btn-sm flex items-center space-x-1">
        <FiChevronLeft size={16} />
        <span className="hidden sm:inline">Reply</span>
      </button>

      <button className="btn-sm flex items-center space-x-1">
        <FiPlus size={16} />
        <span className="hidden sm:inline">Add note</span>
      </button>

      <button className="btn-sm flex items-center space-x-1">
        <FiChevronLeft size={16} className="rotate-180" />
        <span className="hidden sm:inline">Forward</span>
      </button>

      <button className="btn-sm">
        <span className="hidden sm:inline">Close</span>
        <FiMoreVertical size={16} className="sm:hidden" />
      </button>

      <button className="btn-sm">
        <span className="hidden md:inline">Merge</span>
        <FiMoreVertical size={16} className="md:hidden" />
      </button>

      <button className="btn-sm text-red-600">
        <span className="hidden md:inline">Delete</span>
        <FiMoreVertical size={16} className="md:hidden" />
      </button>

      {/* overflow menu */}
      <button className="btn-sm md:hidden">
        <FiMoreVertical size={16} />
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right group */}
      <button
        className="
     inline-flex items-center
   
     text-sm font-medium text-gray-700
     bg-white border border-gray-300 rounded-md
     hover:bg-gray-50
     transition
          "
      >
        <span className="py-1 px-2">Threads</span>
        {/* <FiPlus className="ml-1" size={16} /> */}
        <button className="btn-sm">
          <FiPlus size={16} className="my-0.2" />
        </button>
      </button>

      <button className="btn-sm flex items-center space-x-1">
        <FiActivity size={16} />
        <span className="hidden lg:inline">Show activities</span>
      </button>

      <div className="inline-flex items-center border border-gray-200 bg-white rounded-md overflow-hidden">
        {/* Back */}
        <button className="p-1.5 hover:bg-gray-200 bg-gray-100 transition">
          <FiChevronLeft size={16} />
        </button>

        {/* More */}
        <button className="p-1.5 hover:bg-gray-100 transition">
          <FiMoreHorizontal size={16} />
        </button>

        {/* Forward */}
        <button className="p-1.5 hover:bg-gray-200 bg-gray-100 transition">
          <FiChevronRight size={16} />
        </button>
      </div>

      <button
        onClick={onToggleSidebar}
        className="btn-sm"
        aria-label="Toggle sidebar"
      >
       SideBar
      </button>

      <button
        onClick={onToggleCollapse}
        className="btn-sm"
        aria-label="Toggle collapse"
      >
        <GoSidebarCollapse size={16} className="text-gray-500" />
      </button>
    </div>
  );
}
