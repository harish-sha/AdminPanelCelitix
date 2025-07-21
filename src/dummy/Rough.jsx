{publishingId === flow.flowId && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className={`absolute z-10 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 
                ${positionAbove ? "bottom-full mb-2" : "top-full mt-2"}`}
    ref={(el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        setPositionAbove(rect.bottom > viewportHeight); // Flip if it would overflow
      }
    }}
  >
    <p className="text-sm text-gray-800 font-semibold">
      Are you sure you want to publish?
    </p>
    <p className="text-xs mt-1 text-gray-600">
      Once published, you <strong>won’t be able to edit or delete</strong> this
      flow. It will be publicly available to users. <br />
      <div className="border-b border-dashed my-2 border-gray-900"></div>
      You may also send this flow for testing purposes without publishing it.
    </p>

    <div className="flex justify-end gap-3 mt-4">
      <button
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition"
        onClick={() => setPublishingId(null)}
      >
        <IoCloseCircle className="text-lg" />
        Cancel
      </button>

      <button
        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm transition"
        onClick={async () => {
          setIsPublishingNow(flow.flowId);
          await new Promise((res) => setTimeout(res, 1000));
          await updateStatus(flow.flowId, flow.mobileno);
          setIsPublishingNow(null);
          setPublishingId(null);
        }}
        disabled={isPublishingNow === flow.flowId}
      >
        <FaCheckCircle className="text-sm" />
        Yes, Publish
      </button>
    </div>
  </motion.div>
)}
