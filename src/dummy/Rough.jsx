{/* Card + tooltip */ }
<div className="relative flex items-center">
  <motion.div
    className="group relative rounded-md border border-gray-200 bg-blue-50 text-[11px] leading-none
               text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 shadow-sm
               transition-shadow tracking-wide h-9 flex items-center overflow-hidden"
    initial={{ width: 220 }}
    whileHover={{ width: 280 }}
    transition={{ type: "spring", stiffness: 260, damping: 22 }}
    aria-describedby="last-login-tooltip"
  >
    {/* Content */}
    <div className="flex items-center gap-2 px-2.5">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="text-gray-400 dark:text-gray-500">•</span>
          <span className="font-semibold">Last&nbsp;Login&nbsp;IP:</span>
          {isRefreshing ? (
            <span className="inline-block h-[10px] w-20 rounded-sm bg-black/10 dark:bg-white/10 animate-pulse" />
          ) : (
            <span className="font-mono tabular-nums">{ipDetails?.ip || "-"}</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-gray-400 dark:text-gray-500">•</span>
          <span className="font-semibold">User&nbsp;ID:</span>
          {isRefreshing ? (
            <span className="inline-block h-[10px] w-16 rounded-sm bg-black/10 dark:bg-white/10 animate-pulse" />
          ) : (
            <span className="font-mono tabular-nums">{ipDetails?.user_id || "-"}</span>
          )}
        </div>
      </div>
    </div>

    {/* Refresh button (appears on hover) */}
    <motion.button
      type="button"
      onClick={refreshIpDetails}
      aria-label="Refresh Last Login details"
      className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center
                 rounded-md bg-gray-900 text-white dark:bg-white dark:text-gray-900 opacity-0
                 group-hover:opacity-100 transition-opacity"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
        transition={isRefreshing ? { repeat: Infinity, duration: 0.9, ease: "linear" } : {}}
      >
        <RefreshCcw className="h-3.5 w-3.5" />
      </motion.span>
    </motion.button>
  </motion.div>


  Side Bar API Docs

SMS
Whatsapp
RCS
Two Way SMS
OBD
Inbound
Missed Call
Click 2 Call
OTP Generator

  {/* Tooltip with insert_time on hover */}
  <div
    id="last-login-tooltip"
    role="tooltip"
    className="pointer-events-none absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md
               bg-black px-2 py-1 text-[10px] text-white opacity-0 shadow-md transition-opacity duration-150
               group-hover:opacity-100 tracking-wider"
  >
    {isRefreshing
      ? "Refreshing…"
      : ipDetails?.insert_time
        ? `Last activity: ${ipDetails.insert_time}`
        : "No timestamp available"}
    <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black" />
  </div>
</div>
