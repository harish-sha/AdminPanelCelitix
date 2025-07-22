import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

const SubDataList = () => {
  const [subData, setSubData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  const fetchSubData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetch("https://yourapi.com/api/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wabaNumber: "919251006460",
          mobileNo: filter,
          page: pageNumber,
          size: 10,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSubData(data.data.subData);
        setTotalPages(data.data.totalPages);
        setPage(data.data.currentPage);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
    setLoading(false);
  };

  const handleDelete = (srNo) => {
    // Delete API call
    alert(`Delete item with srNo: ${srNo}`);
  };

  useEffect(() => {
    fetchSubData(page);
  }, [page, filter]);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md">
      {/* Filter Search */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by mobile number..."
            className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:border-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
          onClick={() => fetchSubData(1)}
        >
          Search
        </button>
      </div>

      {/* Loader */}
      {loading && <p className="text-center text-gray-500 py-6">Loading...</p>}

      {/* SubData Cards */}
      <AnimatePresence>
        {!loading && subData.length > 0 ? (
          <div className="grid gap-3">
            {subData.map((item) => (
              <motion.div
                key={item.srNo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-700">
                    📱 {item.mobileNo}
                  </p>
                  <p className="text-xs text-gray-500">
                    ⏱ {item.insertTime}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.srNo)}
                  className="text-red-500 hover:text-red-700 text-xl transition"
                >
                  <FaTrashAlt />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-center text-gray-400">No data found.</p>
        )}
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-5">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className={`p-2 rounded-full border ${page === 1 ? "text-gray-300 cursor-not-allowed" : "text-blue-500 hover:bg-blue-50"
            }`}
        >
          <FaChevronLeft />
        </button>
        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className={`p-2 rounded-full border ${page === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-blue-500 hover:bg-blue-50"
            }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default SubDataList;
