const containerRef = useRef(null);

return (
  <div ref={containerRef} className="relative border-l-2 border-green-500 pl-6 space-y-6 overflow-y-auto">
    {timelineData.map((event, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, root: containerRef }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {/* Dot */}
        <span className="absolute -left-[14px] flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full shadow-md">
          {event.icon}
        </span>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">{event.title}</p>
          <p className="text-xs text-gray-500">{event.description}</p>
          <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
            <FaRegClock className="text-[12px]" />
            {event.time}
          </span>
        </div>
      </motion.div>
    ))}
  </div>
);
