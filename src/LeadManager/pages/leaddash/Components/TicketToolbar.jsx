import { useState } from "react";
import {
    FiUsers,
    FiX,
    FiEdit2,
    FiRepeat,
    FiScissors,
    FiShield,
    FiTrash2,
    FiDownload,
    FiChevronLeft,
    FiChevronRight,
    FiFilter,
} from "react-icons/fi";

export function TicketToolbar({ allChecked, anyChecked, onSelectAll, onToggleFilters }) {
    // const [allChecked, setAllChecked] = useState(false);

    // toggle handler
    const toggleAll = () => setAllChecked((c) => !c);
    return (
        <div className="flex items-center bg-white px-4 py-2 border-b">
            {/* master checkbox */}
            <input
                type="checkbox"
                checked={allChecked}
                onChange={onSelectAll}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            {/* <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            /> */}
            {!anyChecked ? (
                <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 pl-2">Sort:</span>
                    <select className="text-xs text-gray-700 border border-gray-200 rounded-md px-2 py-0.5">
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                    </select>
                </div>
            ) : (

                <div className="ml-3 flex space-x-1">
                    <button
                        className="
      flex items-center space-x-1
      px-2 py-1
      text-xs font-medium text-gray-700
      border border-gray-200 rounded-md
      hover:bg-gray-50
      transition
    "
                    >
                        <FiUsers size={16} />
                        <span>Assign</span>
                    </button>

                    <button
                        className="
      flex items-center space-x-1
      px-2 py-1
      text-xs font-medium text-gray-700
      border border-gray-200 rounded-md
      hover:bg-gray-50
      transition
    "
                    >
                        <FiX size={16} />
                        <span>Close</span>
                    </button>

                    <button
                        className="
      flex items-center space-x-1
      px-2 py-1
      text-xs font-medium text-gray-700
      border border-gray-200 rounded-md
      hover:bg-gray-50
      transition
    "
                    >
                        <FiEdit2 size={16} />
                        <span>Bulk update</span>
                    </button>

                    <button
                        className="
      flex items-center space-x-1
      px-2 py-1
      text-xs font-medium text-gray-700
      border border-gray-200 rounded-md
      hover:bg-gray-50
      transition
    "
                    >
                        <FiRepeat size={16} />
                        <span>Merge</span>
                    </button>

                    <button
                        className="
      flex items-center space-x-1
      px-2 py-1
      text-xs font-medium text-gray-700
      border border-gray-200 rounded-md
      hover:bg-gray-50
      transition
    "
                    >
                        <FiScissors size={16} />
                        <span>Scenarios</span>
                    </button>

                    <button
                        className="
      flex items-center space-x-1
      px-2 py-1
      text-xs font-medium text-gray-700
      border border-gray-200 rounded-md
      hover:bg-gray-50
      transition
    "
                    >
                        <FiShield size={16} />
                        <span>Spam</span>
                    </button>

                    <button
                        className="
      flex items-center space-x-1
      px-2 py-1
      text-xs font-medium text-gray-700
      border border-gray-200 rounded-md
      hover:bg-gray-50
      transition
    "
                    >
                        <FiTrash2 size={16} />
                        <span>Delete</span>
                    </button>
                </div>
            )}


            {/* spacer */}
            <div className="flex-1" />

            {/* export button */}
            <button
                className="
          flex items-center space-x-1
          px-2 py-1
          text-xs font-medium text-gray-700
          border border-gray-200 rounded-md
          hover:bg-gray-50
          transition
        "
            >
                <FiDownload size={16} />
                <span>Export</span>
            </button>

            {/* count + pagination */}
            <div className="inline-flex items-center border border-gray-200 bg-white rounded-md overflow-hidden mx-1">
                {/* Previous */}
                <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition">
                    <FiChevronLeft size={16} />
                </button>

                {/* Count */}
                <span className="px-3 text-sm text-gray-600">1&nbsp;–&nbsp;3&nbsp;of&nbsp;3</span>

                {/* Next */}
                <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition">
                    <FiChevronRight size={16} />
                </button>
            </div>

            {/* filters */}
            <button
                onClick={onToggleFilters}
                className="
          flex items-center space-x-1
          px-2 py-1
          text-xs font-medium text-gray-700
          border border-gray-200 rounded-md
          hover:bg-gray-50
          transition
        "
            >
                <FiFilter size={16} />
                <span>Filters (1)</span>
            </button>
        </div>
    );
}
