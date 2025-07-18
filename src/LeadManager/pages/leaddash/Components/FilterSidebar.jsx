// components/FilterSidebar.jsx
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export function FilterSidebar() {
  const [search, setSearch] = useState("");

  // Shared styles
  const labelCls = "block text-sm font-semibold text-gray-600 mb-1";
  const selectCls =
    "w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 transition";

  return (
    <div className="reletive h-auto z-50 bg-gray-50 border-r shadow-md">
      <aside className="w-64  overflow-y-auto h-108  bg-white shadow-lg rounded-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-1">
          <h2 className="text-sm font-bold">FILTERS</h2>
          <button className="text-xs hover:underline">
            View applied
          </button>
        </div>

        {/* Search */}
        <div className="relative p-2 border-b">
          <FiSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fields"
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
          />
        </div>

        {/* Filters list */}
        <div className="flex-1 p-2 space-y-2">
          <div>
            <label className={labelCls}>Agents Include</label>
            <select className={selectCls}>
              <option>Any agent</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Agents Include</label>
            <select className={selectCls}>
              <option>Any agent</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Agents Include</label>
            <select className={selectCls}>
              <option>Any agent</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Groups Include</label>
            <select className={selectCls}>
              <option>Any group</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Sentiment</label>
            <select className={selectCls}>
              <option>Any</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Created</label>
            <select className={selectCls}>
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 24 hours</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Closed at</label>
            <select className={selectCls}>
              <option>Any</option>
            </select>
          </div>
        </div>

      </aside>
      {/* Apply button */}
      <div className="p-4 fixid bottom-0 border-t">
        <button className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition">
          Apply Filters
        </button>
      </div>

    </div>
  );
}
