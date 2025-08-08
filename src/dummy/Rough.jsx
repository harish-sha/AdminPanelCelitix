import { FiFilter, FiDownload, FiAlertCircle } from "react-icons/fi";
import { RxCrossCircled } from "react-icons/rx";
import moment from "moment";

<div className="relative bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-full w-full h-full border border-gray-100">
  {/* Header */}
  <div className="flex items-center justify-between border-b pb-3 mb-3">
    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
      <FiAlertCircle className="text-blue-600" /> Daily Wallet Usage
    </h2>
    <div className="flex items-center gap-3">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        title="Filter by date"
        className="text-blue-600 border border-blue-400 hover:bg-blue-500 hover:text-white rounded-full p-1.5 transition-all"
      >
        <FiFilter size={18} />
      </button>

      <button
        onClick={handleExportWalletUsage}
        title="Export to Excel"
        className="text-blue-600 border border-blue-400 hover:bg-blue-500 hover:text-white rounded-full p-1.5 transition-all"
      >
        <FiDownload size={18} />
      </button>
    </div>
  </div>

  {/* Filter calendar */}
  {showCalendar && (
    <div className="absolute right-0 mt-2 bg-white p-4 rounded-md shadow-lg z-50 flex flex-col sm:flex-row gap-4">
      <UniversalDatePicker
        id="walletUsage"
        name="walletUsage"
        label="From Date"
        defaultValue={new Date()}
        value={setFilterDataWalletUsage.startDate}
        onChange={(newValue) =>
          setFilterDataWalletUsage({
            ...filterDataWalletUsage,
            startDate: newValue,
          })
        }
      />
      <UniversalDatePicker
        id="walletUsage"
        name="walletUsage"
        label="To Date"
        defaultValue={new Date()}
        value={setFilterDataWalletUsage.endDate}
        onChange={(newValue) =>
          setFilterDataWalletUsage({
            ...filterDataWalletUsage,
            endDate: newValue,
          })
        }
      />
      <button
        onClick={() => setShowCalendar(false)}
        className="text-red-500 hover:text-red-700 self-start"
        title="Close"
      >
        <RxCrossCircled size={22} />
      </button>
    </div>
  )}

  {/* Totals Section */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
    <h2 className="text-gray-700 text-sm sm:text-base font-medium">
      Total Spend: ₹ {totalSpend.toFixed(2)}
    </h2>
    {(filterDataWalletUsage.startDate.toDateString() !== defaultDate ||
      filterDataWalletUsage.endDate.toDateString() !== defaultDate) && (
        <h2 className="text-gray-700 text-sm sm:text-base font-medium">
          Showing results from{" "}
          {moment(filterDataWalletUsage.startDate).format("DD MMM YYYY")} to{" "}
          {moment(filterDataWalletUsage.endDate).format("DD MMM YYYY")}
        </h2>
      )}
  </div>

  {/* Table Header */}
  <div className="grid grid-cols-3 text-xs sm:text-sm font-semibold text-gray-600 border-b pb-2 uppercase">
    <div>S.No.</div>
    <div>Date</div>
    <div>Wallet Usage</div>
  </div>

  {/* Table Body */}
  <div className="divide-y text-sm">
    {currentData.length === 0 && !isLoading ? (
      <div className="flex flex-col items-center justify-center text-center py-10 text-gray-400 gap-2">
        <FiAlertCircle size={30} className="text-blue-500" />
        <p className="font-medium text-gray-600">No wallet usage data found.</p>
        <p className="text-sm text-gray-500">Try selecting a different date range using the filter above.</p>
      </div>
    ) : (
      currentData.map((item, index) => (
        <div key={index} className="grid grid-cols-3 items-center py-2 text-gray-700">
          <div>{(currentPage - 1) * rowsPerPage + index + 1}</div>
          <div>{moment(item.recordDate).format("DD MMM YYYY")}</div>
          <div className="font-medium">₹ {item.walletUsage}</div>
        </div>
      ))
    )}
  </div>

  {/* Footer */}
  <div className="flex items-center justify-between mt-4 pt-4 border-t">
    <p className="text-sm font-medium text-gray-600">
      Total Records: {walletUsageData.length}
    </p>
    <div>{/* Your pagination code here */}</div>
  </div>
</div>
