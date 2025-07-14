import React from "react";

export default function SummaryInput() {
  return (
    <div className="bg-white px-6 py-4 border-b">
      <input
        type="text"
        placeholder="Add summary (powered by Freddy)"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
    </div>
  );
}