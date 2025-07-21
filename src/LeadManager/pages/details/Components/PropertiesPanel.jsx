import React from "react";
import { FiClock } from "react-icons/fi";



export default function PropertiesPanel() {
  return (
    
       <div className="p-3 border-b space-y-2 overflow-y-auto relative h-[86vh] z-50 "> 
        <h3 className="text-sm font-semibold">Open</h3>

        {/* First response */}
        <div className="space-y-1 ">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-1">
              <FiClock className="text-red-500" />
              <span className="font-medium">First response due</span>
            </div>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Edit
            </span>
          </div>
          <div className="text-xs text-gray-600">
            by Mon, Jul 7, 2025 1:15 PM
          </div>
        </div>

        {/* Resolution due */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-1">
              <FiClock className="text-red-500" />
              <span className="font-medium">Resolution due</span>
            </div>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Edit
            </span>
          </div>
          <div className="text-xs text-gray-600">
            by Mon, Jul 7, 2025 9:00 PM
          </div>
        </div>

        {/* Tags, Type, Status, Priority, Update */}
        <div className="space-y-2 px-2 overflow-y-auto  h-70">
          <label className="block text-xs font-medium">Tags</label>
          <input
            type="text"
            className="w-full px-2 py-1 border rounded text-sm"
          />

          <label className="block text-xs font-medium">Type</label>
          <select className="w-full px-2 py-1 border rounded text-sm">
            <option>Question</option>
          </select>
          <label className="block text-xs font-medium">Type</label>
          <select className="w-full px-2 py-1 border rounded text-sm">
            <option>Question</option>
          </select>
          <label className="block text-xs font-medium">Type</label>
          <select className="w-full px-2 py-1 border rounded text-sm">
            <option>Question</option>
          </select>
          <label className="block text-xs font-medium">Type</label>
          <select className="w-full px-2 py-1 border rounded text-sm">
            <option>Question</option>
          </select>
          <label className="block text-xs font-medium">Type</label>
          <select className="w-full px-2 py-1 border rounded text-sm">
            <option>Question</option>
          </select>

          <label className="block text-xs font-medium">Status</label>
          <select className="w-full px-2 py-1 border rounded text-sm">
            <option>Open</option>
          </select>

          <label className="block text-xs font-medium">Priority</label>
          <select className="w-full px-2 py-1 border rounded text-sm">
            <option>Low</option>
          </select>
        </div>
        <div className="bottom-2 absolute border-t w-full ">
          <button className="w-full bg-[#009689] text-white py-2 rounded text-sm hover:bg-[#a8b6b5] transition">
            Update
          </button>
        </div>
   </div> 
    
  );
}
