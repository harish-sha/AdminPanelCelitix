<InfoPopover
            anchorEl={dropdownButtonRefs.current[params.row.id]}
            open={dropdownOpenId === params.row.id}
            onClose={closeDropdown}
          >
            {campaignInfoMap[params.row.id] &&
              campaignInfoMap[params.row.id][0] ? (
              <div className="w-[280px] max-w-full">
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                  {[
                    { label: "Total", key: "total" },
                    { label: "Block", key: "block" },
                    { label: "Failed", key: "failed" },
                    { label: "Pending", key: "pending" },
                    { label: "Submitted", key: "submitted" },
                    { label: "Sent", key: "sent" },
                    { label: "Delivered", key: "delivered" },
                    { label: "Read", key: "read" },
                    { label: "Source", key: "source" },
                    // { label: "Charged Unit", key: "chargedUnit" },
                    // { label: "Block Count", key: "blockCount" },
                    // { label: "Busy", key: "busy" },
                    // { label: "Busy Count", key: "busyCount" },
                    // { label: "Delivered Count", key: "deliveredCount" },
                    // { label: "Failed Count", key: "failedCount" },
                    // { label: "Pending Count", key: "pendingCount" },
                    // {
                    //   label: "Pending Report Count",
                    //   key: "pendingReportCount",
                    // },
                    // { label: "Read Count", key: "readCount" },
                    // { label: "Sent Count", key: "sentCount" },
                    // { label: "Undelivered", key: "undelivered" },
                    // { label: "Undelivered Count", key: "undeliveredCount" },
                  ].map(({ label, key }) => (
                    <React.Fragment key={key}>
                      <div className="font-medium capitalize text-gray-600 border-b border-gray-200 pb-2">
                        {label}
                      </div>
                      <div className="text-right font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        {campaignInfoMap[params.row.id][0]?.[key] ?? "N/A"}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No Data Available</div>
            )}
          </InfoPopover>