import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { unsubscribeReport, deleteUnsubscribeNumber, getWabaList } from "@/apis/whatsapp/whatsapp";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import toast from "react-hot-toast";
import UniversalButton from "@/components/common/UniversalButton";

const Unsubscribe = () => {
  const [subData, setSubData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [cardDetails, setCardDetails] = useState({});
  const [allWaba, setAllWaba] = useState([]);
  const [selectedWaba, setSelectedWaba] = useState(null);
  const [deleteDropdown, setDeleteDropdown] = useState(null);

  const fetchAllWaba = async () => {
    try {
      const res = await getWabaList();
      setAllWaba(res);
    } catch {
      toast.error("Failed to load WABA list");
    }
  };

  useEffect(() => {
    fetchAllWaba();
  }, []);


  const fetchSubData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const payload = {
        wabaNumber: selectedWaba,
        mobileNo: filter,
        page: pageNumber,
        size: 10,
      }

      const response = await unsubscribeReport(payload);
      console.log("response data", response)
      if (response.success) {
        setSubData(response.data.subData || []);
        setTotalPages(response.data.totalPages || 1);
        setPage(response.data.currentPage || 1);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
    setLoading(false);
  };

  // const handleDelete = (srNo) => {
  //   // Delete API call
  //   alert(`Delete item with srNo: ${srNo}`);
  // };

  const handleDelete = async (srNo) => {
    try {
      const response = await deleteUnsubscribeNumber(srNo);
      if (response.success === false) {
        toast.error(
          response.message ||
          "Failed to delete number. Please try again."
        );
        return;
      }
      toast.success("number removed successfully!");
      fetchSubData();
    } catch (error) {
      toast.error("Failed to remove number. Please try again.");
    }
  };

  // useEffect(() => {
  //   fetchSubData(page);
  // }, [page]);

  useEffect(() => {
    if (selectedWaba) {
      setLoading(true);
      fetchSubData(page);
    }
  }, [selectedWaba]);

  return (
    <div className="relative max-w-4xl mx-auto p-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg h-130">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Unsubscribe Report</h2>
          <p className="text-sm text-gray-500">
            Manage and review unsubscribed mobile numbers
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white rounded-xl shadow p-3 text-center">
            <p className="text-lg font-bold text-blue-600">{subData.length}</p>
            <p className="text-xs text-gray-500">Current Records</p>
          </div>
          <div className="bg-white rounded-xl shadow p-3 text-center">
            <p className="text-lg font-bold text-purple-600">{totalPages}</p>
            <p className="text-xs text-gray-500">Pages</p>
          </div>
        </div>
      </div>
      {/* Filter Search */}
      <div className="flex items-end gap-2 mb-4">
        <AnimatedDropdown
          id="selectWaba"
          label={"Select WABA Account"}
          name="selectWaba"
          options={allWaba.map((waba) => ({
            value: waba.mobileNo,
            label: waba.name,
          }))}
          onChange={(val) => setSelectedWaba(val)}
          value={selectedWaba}
        />
        <div className="relative flex items-end w-full">
          <input
            type="text"
            placeholder="Search by mobile number..."
            className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:border-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>
        <UniversalButton
          onClick={() => fetchSubData(1)}
          label="Search"
        >
          Search
        </UniversalButton>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* SubData Cards */}
      <AnimatePresence>
        {!loading && subData.length > 0 ? (
          <div className="grid gap-3">
            {subData?.map((item) => (
              <motion.div
                key={item.srNo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all z-10"
              >
                <div>
                  <p className="font-semibold text-gray-700">📱 {item.mobileNo}</p>
                  <p className="text-xs text-gray-500">⏱ {item.insertTime}</p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setDeleteDropdown(item.srNo)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrashAlt fontSize="15px" />
                  </button>
                  {deleteDropdown === item.srNo && (
                    <div className="absolute -top-5 right-5 bg-white border border-gray-300 rounded-md shadow-md p-2 text-sm z-50">
                      <p className="text-gray-700 mb-2">
                        Are you sure?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            handleDelete(item.srNo);
                            setDeleteDropdown(null);
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition cursor-pointer"
                        >
                          remove
                        </button>
                        <button
                          onClick={() => setDeleteDropdown(null)}
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs hover:bg-gray-400 transition cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-12">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486759.png"
                alt="No data"
                className="mx-auto w-24 opacity-60"
              />
              <p className="text-gray-500 mt-4">No unsubscribed numbers found</p>
            </div>
          )
        )}
      </AnimatePresence>


      {/* Pagination */}
      <div className="absolute bottom-5 left-0 w-full px-4">
        <div className="flex justify-between items-end mt-8 w-auto" >
          <span className="text-xs text-gray-500">
            Showing page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`px-3 py-2 rounded-lg shadow border text-sm ${page === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-blue-500 hover:bg-blue-50"
                }`}
            >
              <FaChevronLeft />
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={`px-3 py-2 rounded-lg shadow border text-sm ${page === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-blue-500 hover:bg-blue-50"
                }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Unsubscribe
