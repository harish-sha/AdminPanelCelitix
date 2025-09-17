import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaEnvelopeOpenText,
  FaMobileAlt,
} from "react-icons/fa";
import {
  unsubscribeReport,
  deleteUnsubscribeNumber,
  getWabaList,
} from "@/apis/whatsapp/whatsapp";
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
      };

      const response = await unsubscribeReport(payload);
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
          response.message || "Failed to delete number. Please try again."
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
    <div
      className="relative m-1 p-4 bg-gray-100 rounded-xl border border-gray-100 h-full mb-2">
      {/* Header */}
      <div className="md:flex flex-wrap justify-between items-center hidden mb-2">
        <div>
          <div className="flex items-center gap-3">
            <FaEnvelopeOpenText className="text-blue-600 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-800">
              Unsubscribe Report
            </h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Track and manage all unsubscribed mobile numbers
          </p>
        </div>
        <div className="flex gap-5">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg px-3 py-2 text-center border">
            <p className="text-xl font-bold text-blue-500">{subData.length}</p>
            <p className="text-xs text-gray-600">Current Records</p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg px-3 py-2 text-center border">
            <p className="text-xl font-bold text-blue-500">{totalPages}</p>
            <p className="text-xs text-gray-600">Pages</p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap md:flex-nowrap items-end gap-3 mb-1 md:mb-4">
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
          <FaSearch className="absolute top-3 left-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by mobile number..."
            className="w-full border border-gray-200 bg-white rounded-md py-2 px-4 pl-10 text-sm  focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-blue-400"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <UniversalButton onClick={() => fetchSubData(1)} label="Search">
          Search
        </UniversalButton>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* SubData List */}
      <AnimatePresence>
        {!loading && subData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 lg:max-h-88 2xl:max-h-152 overflow-y-scroll pb-12">
            {subData?.map((item) => (
              <motion.div
                key={item.srNo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-white p-5 rounded-2xl shadow border border-gray-100 hover:shadow-md  transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FaMobileAlt className="text-blue-500 text-lg" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {item.mobileNo}
                    </p>
                    <p className="text-xs text-gray-700 tracking-wide bg-gray-100 px-2 py-1 rounded-full w-fit mt-1">
                      {item.insertTime}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setDeleteDropdown(item.srNo)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrashAlt fontSize="16px" />
                  </button>
                  {deleteDropdown === item.srNo && (
                    <div className="absolute -top-5 right-5 bg-white border border-gray-300 rounded-md shadow-md p-2 text-sm z-50">
                      <p className="text-gray-700 mb-2">Are you sure?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            handleDelete(item.srNo);
                            setDeleteDropdown(null);
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition cursor-pointer"
                        >
                          Remove
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
            <div className="text-center py-16 bg-white rounded-2xl shadow-inner border border-gray-200">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486759.png"
                alt="No data"
                className="mx-auto w-28 opacity-80 mb-4"
              />
              <p className="text-gray-600 text-lg font-medium mb-2">
                No unsubscribed numbers found
              </p>
            </div>
          )
        )}
      </AnimatePresence>

      {/* Pagination */}
      <div className="absolute bottom-5 left-0 w-full px-4 py-2 rounded-full bg-white">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-semibold tracking-wide">
            Showing page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 shadow"
                }`}
            >
              <FaChevronLeft />
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${page === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 shadow"
                }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Unsubscribe;
