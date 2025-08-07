import React, { useState, useEffect } from "react";
import moment from "moment";
import { dailyWalletUsage } from "@/apis/settings/setting";
import UniversalButton from "@/components/common/UniversalButton";
import { IoSearch } from "react-icons/io5";
import { exportToExcel } from "@/utils/utills";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { CiFilter } from "react-icons/ci";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import { RxCrossCircled } from "react-icons/rx";
import toast from "react-hot-toast";
import { FiFilter, FiDownload, FiAlertCircle } from "react-icons/fi";
import CountUp from "react-countup";
import { motion } from "framer-motion";



const campaignsData = [];

const rowsPerPage = 10;

const WalletUsage = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [walletUsageData, setWalletUsageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDataWalletUsage, setFilterDataWalletUsage] = useState({
    // rechargeType: 0,
    endDate: new Date(),
    startDate: new Date(),
  });

  const totalPages = Math.ceil(walletUsageData.length / rowsPerPage);

  const currentData = walletUsageData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPage = (page) => setCurrentPage(page);

  const dailyAmountUsage = async () => {
    const payload = {
      fromDate: moment(filterDataWalletUsage.startDate).format("YYYY-MM-DD"),
      toDate: moment(filterDataWalletUsage.endDate).format("YYYY-MM-DD"),
      // fromDate: "2022-07-30",
      // toDate: "2025-08-03",
    };

    setIsLoading(true);
    try {
      const response = await dailyWalletUsage(payload);
      setWalletUsageData(response.data || []);
    } catch (error) {
      console.error("Error fetching wallet usage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const walletusagerows = walletUsageData;
  const walletusagecolumns = [
    { field: "recordDate", headerName: "Date" },
    { field: "walletUsage", headerName: "Wallet Usage" },
  ];

  // export without totalspend and from & to date
  // function handleExportWalletUsage() {
  //   if (!walletUsageData.length) {
  //     toast.error("No data to download");
  //     return;
  //   }

  //   const colFields = walletusagecolumns.map((col) => col.field);
  //   const colHeaders = walletusagecolumns.map((col) => col.headerName);

  //   const rows = walletUsageData.map((row) =>
  //     colFields.map((field) => {
  //       if (field === "recordDate") {
  //         return moment(row[field]).format("DD MMM YYYY");
  //       }
  //       return row[field] ?? "";
  //     })
  //   );
  //   const filename = "wallet_usage_data";
  //   exportToExcel(colHeaders, rows, filename);
  //   toast.success("File Downloaded Successfully");
  // }

  // export with totalspend and from & to date
  function handleExportWalletUsage() {
    if (!walletUsageData.length) {
      toast.error("No data to download");
      return;
    }

    const colFields = walletusagecolumns.map((col) => col.field);
    const colHeaders = walletusagecolumns.map((col) => col.headerName);

    // Convert rows
    const rows = walletUsageData.map((row) =>
      colFields.map((field) => {
        if (field === "recordDate") {
          return moment(row[field]).format("DD MMM YYYY");
        }
        return row[field] ?? "";
      })
    );

    const filename = "wallet_usage_data";

    // Optional Summary Rows
    const totalRow = ["Total Spend", `₹ ${totalSpend.toFixed(2)}`];

    const defaultDate = new Date().toDateString();
    const customDateSelected =
      filterDataWalletUsage.startDate.toDateString() !== defaultDate ||
      filterDataWalletUsage.endDate.toDateString() !== defaultDate;

    const dateRangeRow = customDateSelected
      ? [
        "Selected Date Range",
        `${moment(filterDataWalletUsage.startDate).format("DD MMM YYYY")} to ${moment(
          filterDataWalletUsage.endDate
        ).format("DD MMM YYYY")}`,
      ]
      : [];

    const exportData = [colHeaders, ...rows];

    if (customDateSelected) exportData.push([], dateRangeRow);
    exportData.push([], totalRow);

    exportToExcel(exportData[0], exportData.slice(1), filename);
    toast.success("File Downloaded Successfully");
  }


  useEffect(() => {
    dailyAmountUsage();
  }, [filterDataWalletUsage]);

  const totalSpend = walletUsageData.reduce(
    (acc, item) => acc + (item.walletUsage || 0),
    0
  );

  const defaultDate = new Date().toDateString();

  return (
    <div className="relative bg-white rounded-xl shadow-md p-2 sm:p-6 max-w-full w-full h-full border border-gray-100">
      <div className="w-full flex items-center justify-between mb-2 border-b pb-2">
        <h2 className="text-md text-gray-800 font-semibold">Daily Wallet Usage</h2>
        <div className="flex items-center gap-3">
          <div
            className="text-blue-600 border border-blue-400 hover:bg-blue-500 hover:text-white rounded-full cursor-pointer h-7 w-7 flex items-center justify-center transition-all" onClick={() => setShowCalendar(!showCalendar)}
          >
            <CiFilter fontSize="14px" />
          </div>
          <div
            onClick={() => handleExportWalletUsage()}
            className="text-blue-600 border border-blue-400 hover:bg-blue-500 hover:text-white rounded-full cursor-pointer h-7 w-7 flex items-center justify-center transition-all"
          >
            <FiDownload fontSize="14px" />
          </div>
        </div>
      </div>

      {showCalendar && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-0 bg-white p-4 rounded-md shadow-lg z-50 flex gap-2">
          <div className="w-54">
            <UniversalDatePicker
              id="walletUsage"
              name="walletUsage"
              label="From Date"
              defaultValue={new Date()}
              placeholder="Pick a start date"
              value={setFilterDataWalletUsage.startDate}
              onChange={(newValue) => {
                setFilterDataWalletUsage({
                  ...filterDataWalletUsage,
                  startDate: newValue || new Date(),
                });
              }}
            />
          </div>
          <div className="w-54">
            <UniversalDatePicker
              id="walletUsage"
              name="walletUsage"
              label="To Date"
              placeholder="Pick a start date"
              defaultValue={new Date()}
              value={setFilterDataWalletUsage.endDate}
              onChange={(newValue) => {
                setFilterDataWalletUsage({
                  ...filterDataWalletUsage,
                  endDate: newValue || new Date(),
                });
              }}
            />
          </div>
          <div
            onClick={() => setShowCalendar(false)}
            className="cursor-pointer text-red-500 hover:text-red-700 absolute right-4"
          >
            <RxCrossCircled size={20} />
          </div>
          {/* <button
                onClick={() => {
                  dailyAmountUsage();
                  setShowCalendar(false);
                }}
                className="bg-blue-500 text-white text-sm font-medium px-4 py-1 rounded-md hover:bg-blue-600 mt-2"
              >
                Apply Filter
              </button> */}
        </motion.div>
      )}
      <div className="flex items-center justify-between w-full mb-2">
        <h2 className="text-sm text-gray-700 font-semibold">
          {/* Total Spend: ₹ {totalSpend.toFixed(2)} */}
          Total Spend: ₹
          <CountUp
            start={0}
            end={totalSpend}
            separator=","
            decimals={2}
            duration={1.5}
          />
        </h2>
        {filterDataWalletUsage.startDate &&
          filterDataWalletUsage.endDate &&
          (filterDataWalletUsage.startDate.toDateString() !== defaultDate ||
            filterDataWalletUsage.endDate.toDateString() !== defaultDate) ? (
          <h2 className="text-sm text-gray-700 font-semibold">
            Showing result from: {filterDataWalletUsage.startDate.toDateString()} to: {filterDataWalletUsage.endDate.toDateString()}
          </h2>
        ) : null}
      </div>
      <div className="h-100">
        {/* Table Header */}
        <div className="grid grid-cols-3 text-sm font-medium text-gray-600 border-b pb-2 ">
          <div>S.No.</div>
          <div>Date</div>
          <div>Wallet Usage</div>
        </div>

        {/* Table Body */}
        <div className="divide-y text-sm h-full">
          {currentData.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 gap-2 h-full">
              <FiAlertCircle size={30} className="text-blue-500" />
              <p className="font-medium text-gray-600">No wallet usage data found.</p>
              <p className="text-sm text-gray-500">Try selecting a different date range using the filter above.</p>
            </div>
          )}

          {currentData.map((item, index) => (
            <div key={index} className="grid grid-cols-3 items-center py-2">
              <div>{(currentPage - 1) * rowsPerPage + index + 1}</div>
              <div>{moment(item.recordDate).format("DD MMM YYYY")}</div>
              <div className="font-medium text-gray-700">
                ₹ {item.walletUsage}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end w-full border-t pt-2">
        <div className="text-sm font-medium text-gray-600 text-nowrap">
          Total Records : {walletUsageData.length}
        </div>
        {/* Pagination */}
        <div className="w-full">
          <div className="flex flex-wrap justify-end items-center mt-4 gap-2 sm:gap-0 ">
            <div className="flex gap-2 justify-center">
              {currentPage > 1 && (
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  className="px-2 py-0 rounded-full border text-blue-600 hover:bg-blue-50"
                >
                  &lt;
                </button>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  if (totalPages <= 3) return true;
                  if (page === 1 || page === totalPages) return true;
                  if (Math.abs(page - currentPage) <= 1) return true;
                  if (currentPage <= 3 && page <= 3) return true;
                  if (currentPage >= totalPages - 2 && page >= totalPages - 4)
                    return true;
                  return false;
                })
                .map((page, i, arr) => {
                  const prev = arr[i - 1];
                  const isEllipsis = prev && page - prev > 1;
                  return (
                    <React.Fragment key={page}>
                      {isEllipsis && (
                        <span className="px-1 text-gray-500 select-none">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => goToPage(page)}
                        className={`px-2 py-0 rounded-full border text-sm font-medium
              ${currentPage === page
                            ? "bg-blue-500 text-white border-blue-500"
                            : "text-blue-600 border-blue-300 hover:bg-blue-50"
                          }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                })}

              {currentPage < totalPages && (
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  className="px-2 py-0 rounded-full border text-blue-600 hover:bg-blue-50"
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletUsage;
