import React from "react";
import { FaSignal, FaWifi, FaBatteryFull } from "react-icons/fa";

export const Preview = ({ inputDetails }) => {
  return (
    <div className="smartphone w-1/3">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-gray-100 text-black text-xs font-medium rounded-t-xl">
        <div>9:30</div>
        <div className="w-4 h-4 bg-black rounded-full" />
        <div className="flex items-center gap-1">
          <FaSignal className="text-[10px]" />
          <FaWifi className="text-[10px]" />
          <FaBatteryFull className="text-[12px]" />
        </div>
      </div>

      <div className="smartphone-content">
        <div className="flex border-b items-center gap-2 px-4 py-2">
          <div className="border w-7 h-7 rounded-full bg-white"></div>
          <p>{inputDetails?.senderId || "SenderId"}</p>
        </div>
        <div className="p-3">
          {inputDetails.message && (
            <div className="bg-blue-500 text-white p-2 rounded-t-2xl rounded-br-2xl shadow-md max-w-lg mx-auto max-h-[15rem] overflow-y-auto">
              <pre className="text-sm font-medium break-words whitespace-pre-wrap px-1 py-2">
                {inputDetails.message}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
