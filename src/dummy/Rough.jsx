<div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg">
  {/* Top Stats */}
  <div className="flex justify-between items-center mb-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Unsubscribe Report</h2>
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

  {/* Search Bar */}
  <div className="flex items-center gap-3 mb-6">
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
      className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition shadow-md"
      onClick={() => fetchSubData(1)}
    >
      Search
    </button>
  </div>

  {/* Loading Spinner */}
  {loading && (
    <div className="flex justify-center py-10">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )}

  {/* SubData Grid */}
  {!loading && subData.length > 0 ? (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {subData.map((item) => (
        <motion.div
          key={item.srNo}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 relative group"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-800 font-semibold">{item.mobileNo}</p>
              <p className="text-xs text-gray-500 mt-1">{item.insertTime}</p>
            </div>
            <button
              onClick={() => handleDelete(item.srNo)}
              className="text-red-500 hover:text-red-700 text-lg opacity-0 group-hover:opacity-100 transition"
            >
              <FaTrashAlt />
            </button>
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

  {/* Pagination */}
  <div className="flex justify-between items-center mt-8">
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
