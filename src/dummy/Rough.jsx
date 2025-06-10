return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center gap-3 mb-2">
          <DriveFileRenameOutlineOutlinedIcon className="text-indigo-500" style={{ fontSize: 38 }} />
          <h2 className="text-3xl font-bold text-gray-800 text-center tracking-tight">
            Manage Canned Messages
          </h2>
        </div>
        <p className="text-base text-gray-600 text-center max-w-2xl">
          <span className="inline-flex items-center gap-1">
            <AutoFixHighOutlinedIcon className="text-indigo-400" />
            <span>
              Easily create, manage, and organize pre-saved messages to enhance your live chat experience.
            </span>
          </span>
          <br />
          <span className="inline-flex items-center gap-1">
            <FileUploadOutlinedIcon className="text-indigo-400" />
            <span>
              Use canned messages to respond quickly and professionally, ensuring customer satisfaction and efficient communication.
            </span>
          </span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 border-2 border-gray-200 bg-white/80 p-4 rounded-2xl shadow-xl">
        {/* Form Section */}
        <div className="space-y-4 p-4 border-r-2 border-gray-100 lg:w-1/2 bg-white/90 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <EditNoteOutlinedIcon className="text-indigo-400" />
            <span className="text-lg font-semibold text-gray-700">Add / Edit Canned Message</span>
          </div>
          <InputField
            label="Canned Message Name"
            tooltipContent="Enter a label for the canned message"
            placeholder="Message Label"
            value={form.cannedMessageName}
            onChange={(e) =>
              setForm({ ...form, cannedMessageName: e.target.value })
            }
            className="border p-2 w-full"
          />

          <div className="relative">
            <UniversalTextArea
              label="Message Content"
              tooltipContent="Enter the content of the canned message"
              placeholder="Message Content"
              value={form.textBody}
              onChange={(e) => setForm({ ...form, textBody: e.target.value })}
              className="border p-2 w-full h-70"
            />
            <div className="absolute top-9 right-3 cursor-pointer">
              <CustomEmojiPicker
                onSelect={(emoji) =>
                  setForm({ ...form, textBody: form.textBody + emoji })
                }
                position="bottom"
              />
            </div>
            <CustomTooltip title="Generate With AI" arrow placement="top">
              <button
                onClick={() => setIsOpen(true)}
                className="absolute right-3 bottom-3 w-8 h-8 rounded-full flex items-center justify-center z-0 cursor-pointer"
              >
                <Lottie
                  animationData={metaAiAnimation}
                  loop
                  autoplay
                  style={{ width: "48px", height: "48px" }}
                />
              </button>
            </CustomTooltip>
          </div>
          <div className="w-full mb-4 relative">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="absolute top-full left-0 w-full mt-4 p-4 bg-white border rounded-xl shadow-lg z-50 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <p className=" text-violet-700 font-medium">
                      Ask AI to Generate Template <AutoAwesomeIcon />
                    </p>
                    <IconButton
                      onClick={closePanel}
                      sx={{ padding: "3px", fontSize: "18px" }}
                    >
                      <AiOutlineClose className="text-gray-500 hover:text-red-500 cursor-pointer" />
                    </IconButton>
                  </div>

                  <div className="flex items-center justify-center relative">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md text-sm pr-11"
                      placeholder="e.g. Generate a welcome message for a food bot"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                    />

                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className=" cursor-pointer absolute right-0 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <LoopIcon className="animate-spin text-indigo-800" />
                      ) : (
                        <AutoFixHighOutlinedIcon className=" text-indigo-800" />
                      )}
                    </button>
                  </div>

                  <div className="min-h-[60px] bg-gray-100 p-3 rounded-md border">
                    {isGenerating ? (
                      <div className="flex flex-col gap-2">
                        <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                        <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                        <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                        <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                      </div>
                    ) : aiSuggestion && !hasInserted ? (
                      <TypingText
                        key={aiSuggestion}
                        text={aiSuggestion}
                        onDone={() => setIsTypingDone(true)}
                      />
                    ) : aiSuggestion ? (
                      <pre className="whitespace-pre-wrap text-sm text-gray-800">
                        {aiSuggestion}
                      </pre>
                    ) : (
                      <p className="text-sm text-gray-400">
                        AI response will appear here.
                      </p>
                    )}
                  </div>

                  {isTypingDone && aiSuggestion && !hasInserted && (
                    <div className="flex items-center justify-center">
                      <button
                        className="text-sm text-indigo-600 hover:underline cursor-pointer"
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            textBody: aiSuggestion,
                          }));
                          setHasInserted(true);
                        }}
                      >
                        <FileUploadOutlinedIcon /> Insert into Message Content
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center">
            <UniversalButton
              id="cannedMessageSubmitBtn"
              name="cannedMessageSubmitBtn"
              label={isFetching ? (editSrNo ? "Updating..." : "Adding...") : (editSrNo ? "Update Message" : "Add Message")}
              variant="primary"
              disabled={isFetching}
              type="submit"
              onClick={handleSubmit}
            />
            {editSrNo && (
              <button
                className="ml-4 text-xs text-gray-500 underline"
                onClick={() => {
                  setEditSrNo(null);
                  setForm({ cannedMessageName: "", textBody: "" });
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:flex flex-col items-center justify-center px-2">
          <div className="h-full w-1 bg-gradient-to-b from-indigo-100 via-indigo-300 to-indigo-100 rounded-full" />
        </div>

        {/* List Section */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <DriveFileRenameOutlineOutlinedIcon className="text-indigo-400" />
            <span className="text-lg font-semibold text-gray-700">Your Canned Messages</span>
          </div>
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search canned messages..."
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-200"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-120 overflow-y-auto p-1">
            {messages.length === 0 ? (
              <div className="col-span-2 flex flex-col items-center justify-center h-full w-full py-12">
                <DriveFileRenameOutlineOutlinedIcon
                  className="animate-bounce text-indigo-500"
                  style={{ fontSize: 80 }}
                />
                <h3 className="text-lg font-semibold text-gray-700 mt-4">No Canned Messages Yet</h3>
                <p className="text-gray-500 text-center mt-2 max-w-xs text-sm">
                  You haven&apos;t added any canned messages. Use the form on the left to create your first quick reply and boost your chat productivity!
                </p>
              </div>
            ) : (
              messages
                .filter(
                  msg =>
                    msg.cannedMessageName.toLowerCase().includes(search?.toLowerCase() || "") ||
                    msg.textBody.toLowerCase().includes(search?.toLowerCase() || "")
                )
                .map((msg) => (
                  <motion.div
                    key={msg.srNo}
                    className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-gray-200 rounded-xl shadow-md p-4 flex flex-col min-h-[140px] hover:shadow-lg transition"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileUploadOutlinedIcon className="text-indigo-400" />
                        <h3 className="text-base font-semibold text-gray-800">
                          {msg.cannedMessageName}
                        </h3>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(msg)}
                          className="text-blue-500 hover:text-blue-600 transition cursor-pointer text-sm p-1 hover:bg-gray-100 rounded-md"
                          title="Edit"
                        >
                          <EditNoteOutlinedIcon sx={{ fontSize: "18px" }} />
                        </button>
                        <button
                          onClick={() => setDeleteDropdown(msg.srNo)}
                          className="text-red-500 hover:text-red-600 transition cursor-pointer text-sm p-1 hover:bg-gray-100 rounded-md"
                          title="Delete"
                        >
                          <FaTrashAlt className="text-xs" />
                        </button>
                      </div>
                    </div>
                    <pre className="text-xs text-gray-600 mt-1 whitespace-pre-wrap flex-1">
                      {msg.textBody}
                    </pre>
                    {deleteDropdown === msg.srNo && (
                      <div className="absolute top-8 right-2 bg-white border border-gray-300 rounded-md shadow-md p-2 text-sm z-50">
                        <p className="text-gray-700 mb-2">Are you sure?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              handleDelete(msg.srNo);
                              setDeleteDropdown(null);
                            }}
                            className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition cursor-pointer"
                          >
                            Delete
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
                  </motion.div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);