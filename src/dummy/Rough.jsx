return isFetching ? (
  <Loader height="35rem" width="100%" />
) : (
  <div className="flex h-[100%] bg-gray-100 overflow-hidden ">
    <motion.div
      initial={{ x: 0, opacity: 1 }}
      animate={{ x: activeChat ? -300 : 0, opacity: activeChat ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className={`w-full md:w-100 border-r overflow-hidden bg-white p-4 ${activeChat ? "hidden md:block" : "block"
        }`}
    >
      <div className="flex flex-col gap-4">
        <AnimatedDropdown
          id="createSelectWaba"
          name="createSelectWaba"
          label="Select WABA"
          tooltipContent="Select your WhatsApp Business Account"
          tooltipPlacement="right"
          options={waba?.map((waba) => ({
            value: waba.mobileNo,
            label: waba.name,
          }))}
          value={selectedWaba}
          onChange={(value) => {
            setSelectedWaba(value);
            setAllConvo([]);
            setSearch("");
          }}
          placeholder="Select WABA"
        />

        <div className="flex items-center border border-gray-300 rounded-lg">
          <input
            type="text"
            className="w-full p-2 border-none rounded-lg focus:outline-none"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} className="p-2">
            <SearchOutlined className="text-gray-500" />
          </button>
        </div>

        {selectedWaba && (
          <div className="flex justify-center gap-4 bg-gray-100 p-2 rounded-lg">
            {["active", "close"].map((option) => (
              <button
                key={option}
                onClick={() => setBtnOption(option)}
                className={`p-2 rounded-lg transition-all duration-300 text-sm font-medium ${btnOption === option
                    ? "bg-blue-500 text-white scale-105 shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 space-y-2 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
          {allConvo.length === 0 ? (
            <>
              <UniversalSkeleton />
              <UniversalSkeleton />
              <UniversalSkeleton />
              <UniversalSkeleton />
              <UniversalSkeleton />
            </>
          ) : (
            allConvo
              .slice()
              .sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
              .map((chat, index) => (
                <motion.div
                  key={chat.srno || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 border-b cursor-pointer select-none rounded-lg hover:bg-gray-100 ${activeChat?.srno === chat.srno ? "bg-blue-100" : ""
                    }`}
                  onClick={() => setActiveChat(chat)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src={chat.image || "/default-avatar.jpg"}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">
                          {chat.contectName || chat.mobileNo}
                        </p>
                        <p className="text-xs text-gray-500 truncate w-48">
                          {chat.messageBody}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        {formatDate(chat.insertTime)}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
          )}
        </div>
      </div>
    </motion.div>

    {/* Chat Section */}

    {/* Placeholder when no chat selected */}
    <AnimatePresence>
      {selectedWaba && !activeChat && (
        <motion.div
          key="empty-chat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="hidden md:flex flex-1 items-center justify-center bg-gray-100 rounded-r-xl"
        >
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-green-100 shadow-xl flex items-center justify-center animate-bounce">
                <QuestionAnswerOutlinedIcon
                  sx={{ fontSize: "3rem" }}
                  className="text-green-700"
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">
              Welcome to Celitix LiveChat!
            </h2>
            <p className="text-gray-500">
              Select a conversation from the left panel to start chatting.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* code goes here */}
    {activeChat && (
      <div className="relative flex flex-col flex-1 h-screen md:h-full">
        {/* Header */}
        <div className="z-0 flex items-center justify-between w-full bg-white shadow-md h-15">
          <div className="flex items-center space-x-2">
            <IoArrowBack
              className="text-xl cursor-pointer md:hidden"
              onClick={() => {
                setActiveChat(null);
                setSpecificConversation([]);
              }}
            />
            <img
              src={activeChat.image || "/default-avatar.jpg"}
              alt={activeChat.contectName}
              className="w-10 h-10 ml-2 rounded-full "
            />
            <h3 className="text-lg font-semibold">
              {activeChat.contectName || activeChat.mobileNo}
            </h3>
            <InfoOutlinedIcon
              onClick={() => {
                setVisibleRight(true);
              }}
              sx={{
                fontSize: "1.2rem",
                color: "green",
              }}
            />
          </div>
          <div>
            <SupportAgentOutlinedIcon
              onClick={() => setDialogVisible(true)}
              className="mr-2 cursor-pointer"
            />
          </div>
        </div>

        {/* Messages */}
        <div
          ref={messageRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col md:max-h-[calc(100vh-8rem)] md:-mt-5"
        >
          {specificConversation?.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="my-4 text-xs text-center text-gray-500">
                {group?.date}
              </div>

              <div className="flex flex-col items-start space-y-2">
                {group.messages.map((msg, index) => {
                  return (
                    <div
                      key={index}
                      className={`p-2 rounded-lg max-w-[70%] my-1 w-50 ${!msg.isReceived ? "self-end" : "self-start"
                        }`}
                    >
                      {msg?.replyType === "image" && (
                        <div
                          className={`flex items-center gap-2 w-full ${!msg.isReceived ? "flex-row-reverse" : ""
                            }`}
                        >
                          <div
                            className={`p-2 ${msg?.caption
                                ? "border border-gray-300 rounded-md"
                                : ""
                              }`}
                          >
                            {msg?.isReceived ? (
                              msg?.mediaPath ? (
                                <div>
                                  <img
                                    src={msg?.mediaPath?.msg}
                                    alt="Received Image"
                                    className="object-contain mb-2 border rounded-md pointer-events-none select-none h-48 w-48"
                                  />
                                  {msg?.caption && <p>{msg.caption}</p>}
                                </div>
                              ) : (
                                // <div className="mb-2 border rounded-md pointer-events-none select-none h-48 w-48 flex justify-center items-center">
                                <button
                                  className="mb-2 border rounded-md h-48 w-48 flex justify-center items-center"
                                  onClick={() => {
                                    handleAttachmentDownload(msg);
                                  }}
                                >
                                  <FileDownloadOutlinedIcon />
                                </button>
                                // </div>
                              )
                            ) : (
                              <div>
                                <img
                                  src={msg?.mediaPath}
                                  alt="Sent Image"
                                  className="object-contain mb-2 border rounded-md pointer-events-none select-none h-48 w-48"
                                />
                                {msg?.caption && <p>{msg?.caption}</p>}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              setIsReply(true);
                              setReplyData(msg);
                            }}
                          >
                            <FaReply className="text-gray-500 size-3" />
                          </button>
                        </div>
                      )}

                      {msg?.replyType === "video" && (
                        <div
                          className={`p-2 ${msg?.caption
                              ? "border border-gray-300 rounded-md"
                              : ""
                            }`}
                        >
                          {msg?.isReceived ? (
                            msg?.mediaPath ? (
                              <div
                                className={`flex items-center gap-2 w-full ${!msg.isReceived ? "flex-row-reverse" : ""
                                  }`}
                              >
                                <div>
                                  <video
                                    src={msg?.mediaPath?.msg}
                                    className="object-contain mb-2 border rounded-md pointer-events-none select-none h-48 w-48"
                                    controls={false}
                                    autoPlay
                                  ></video>
                                  {msg?.caption && <p>{msg.caption}</p>}
                                </div>

                                <button
                                  onClick={() => {
                                    setIsReply(true);
                                    setReplyData(msg);
                                  }}
                                >
                                  <FaReply className="text-gray-500 size-3" />
                                </button>
                              </div>
                            ) : (
                              // <div className="mb-2 border rounded-md pointer-events-none select-none h-48 w-48 flex justify-center items-center">
                              <button
                                className="mb-2 border rounded-md h-48 w-48 flex justify-center items-center"
                                onClick={() => {
                                  handleAttachmentDownload(msg);
                                }}
                              >
                                <FileDownloadOutlinedIcon />
                              </button>
                              // </div>
                            )
                          ) : (
                            <div
                              className={`flex items-center gap-2 w-full ${!msg.isReceived ? "flex-row-reverse" : ""
                                }`}
                            >
                              <div>
                                <video
                                  src={msg?.mediaPath}
                                  className="object-contain mb-2 border rounded-md pointer-events-none select-none h-48 w-48"
                                  controls={false}
                                  autoPlay
                                ></video>
                                {msg?.caption && <p>{msg?.caption}</p>}
                              </div>
                              <button
                                onClick={() => {
                                  setIsReply(true);
                                  setReplyData(msg);
                                }}
                              >
                                <FaReply className="text-gray-500 size-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {["text", "button"].includes(msg?.replyType) && (
                        <div
                          className={`flex items-center gap-2 w-full ${!msg.isReceived ? "flex-row-reverse" : ""
                            }`}
                        >
                          <div
                            className={`w-full border p-2 rounded-md ${!msg.isReceived
                                ? "bg-blue-500 text-white "
                                : "bg-gray-200 text-black "
                              }`}
                          >
                            {msg.messageBody}
                          </div>
                          <button
                            onClick={() => {
                              setIsReply(true);
                              setReplyData(msg);
                            }}
                          >
                            <FaReply className="text-gray-500 size-3" />
                          </button>
                        </div>
                      )}
                      <p
                        className={`mt-1 text-[0.7rem] ${!msg.isReceived ? "text-end" : "text-start"
                          }`}
                      >
                        {formatTime(msg?.insertTime)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="flex flex-wrap gap-2 mt-2">
            {/* {selectedImage.map((file, index) => (
              <div className="relative" key={index}>
                <button
                  onClick={() => setImagePreviewVisible(true)}
                  className="flex items-center gap-1 "
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="object-cover w-20 h-20"
                  />
                </button>
                <span
                  className="absolute text-red-500 cursor-pointer top-1 right-1"
                  onClick={() => deleteImages(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    / Add code to remove the image from the selectedImage
                    array
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            ))} */}

            <div className="relative">
              <button className="flex items-center gap-1 ">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt=""
                  className="object-cover w-20 h-20"
                />
              </button>
              <span
                className="absolute text-red-500 cursor-pointer top-1 right-1"
                onClick={() => deleteImages("4")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>
          </div>
        )}

        {/* Input */}
        {btnOption === "active" ? (
          <div className="flex items-center w-full p-4 bg-white border-t mb-17 md:mb-0">
            <div className="mr-2">
              <CustomEmojiPicker position="top" onSelect={insertEmoji} />
            </div>
            <div className="relative flex items-center justify-center w-full gap-2 border rounded-lg">
              <input
                type="text"
                className="flex-1 w-full p-2 focus:outline-none"
                placeholder="Type a message..."
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              {/* <button
                onClick={sendMessage}
                className="flex items-center justify-center text-white bg-blue-500 rounded-full h-7 w-7"
              >
                <FiSend className="mr-1" />
              </button> */}
              <button
                onClick={sendMessage}
                className="flex items-center justify-center w-8 h-8 text-white transition-all bg-blue-600 rounded-full shadow-md hover:bg-blue-700 active:scale-95 md:mr-6"
                aria-label="Send message"
              >
                <FiSend className="w-4 h-4 mt-1 mr-1" />
              </button>
              <div>
                <div className="hidden w-10 h-10"></div>
              </div>
              <Tooltip
                target=".speeddial-bottom-right .p-speeddial-action"
                position="left"
              />
              <SpeedDial
                model={items}
                direction="up"
                // style={{ bottom: 5, right: 75 }}
                buttonStyle={{
                  width: "2rem",
                  height: "2rem",
                }}
                className="right-19 bottom-1 speeddial-bottom-right"
              />

              <div className="items-center justify-center hidden gap-1 mr-2 md:flex">
                <FormatBoldOutlined />
                <FormatItalicOutlined />
                <FormatStrikethroughOutlined />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between w-full p-4 bg-white mb-17 md:mb-0 md:flex-row">
            <div>
              <div className="flex gap-2">
                <AccessAlarmOutlinedIcon />
                <p>24 Hour Window Elapsed</p>
              </div>
              <p className="text-xs">
                The 24 Hour conversation window has elapsed. Please wait for
                the user to initiate a chat
              </p>
            </div>
            <button
              onClick={() => {
                setSendMessageDialogVisible(true);
              }}
              className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              Start Chat
              <ArrowRightAltOutlinedIcon />
            </button>
          </div>
        )}
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
          style={{}}
        >
          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2">
              <img
                src={activeChat.image || "/default-avatar.jpg"}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <h1> {activeChat.contectName || activeChat.mobileNo}</h1>
            </div>
            <div className="flex items-center gap-2">
              <LocalPhoneOutlinedIcon />
              <p>{activeChat.mobileNo}</p>
            </div>
          </div>

          <div className="space-x-2 text-[0.9rem]">
            <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
              <p>Status</p>
              <p className="text-right">Requesting</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
              <p>Last Active</p>
              <p className="text-right">12/03/2025 10:35:35</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
              <p>Template Messages</p>
              <p className="text-right">2</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
              <p>Session Messages</p>
              <p className="text-right">2</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
              <p>Unresolved Queries</p>
              <p className="text-right">0</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
              <p>Source</p>
              <p className="text-right">IMPORTED</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
              <p>First Message</p>
              <p className="text-right">-</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
              <p>WA Conversation</p>
              <p className="text-right">Active</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
              <p>MAU Status</p>
              <p className="text-right">Active</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
              <p>Incoming</p>
              <p className="text-right">Allowed</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-2 border-gray-300 border-1">
              <p>Circle</p>
              <p className="text-right">Rajasthan</p>
            </div>
          </div>
        </Sidebar>
      </div>
    )}

    <Dialog
      header="Transfer Chat to Agent"
      visible={dialogVisible}
      style={{ width: "50vw" }}
      draggable={false}
      onHide={() => {
        if (!dialogVisible) return;
        setDialogVisible(false);
      }}
    >
      <div className="space-y-3">
        <AnimatedDropdown
          options={agentList?.data?.map((agent) => ({
            value: agent.sr_no,
            label: agent.name,
          }))}
          id="agentList"
          name="agentList"
          label="Agent List"
          tooltipContent="Select Agent"
          tooltipPlacement="right"
          value={selectedAgentList}
          onChange={(value) => setSelectedAgentList(value)}
          placeholder="Agent List"
        />

        <InputField
          label="Agent Display Name"
          tooltipContent="Enter Agent Name"
          id="agentname"
          name="agentname"
          type="tel"
          value={agentName}
          onChange={(e) => setAgentname(e.target.value)}
          placeholder="Enter Agent Display Name"
        />
        <AnimatedDropdown
          options={groupList?.map((group) => ({
            value: group.groupCode,
            label: group.groupName,
          }))}
          id="group"
          name="group"
          label="Group"
          tooltipContent="Select Group"
          tooltipPlacement="right"
          value={selectedGroupList}
          onChange={(value) => setSelectedGroupList(value)}
          placeholder="Group"
        />

        <UniversalButton
          id={"assignAgent"}
          name={"assignAgent"}
          label="Assign Agent"
          onClick={handleAssignAgent}
        />
      </div>
    </Dialog>

    <Dialog
      header="Send Message to User"
      visible={sendMessageDialogVisible}
      style={{ width: "50rem", height: "40rem" }}
      draggable={false}
      onHide={() => {
        setSendMessageDialogVisible(false);
        setTemplateType(templateType);
        setBtnVarLength(0);
        setVarLength(0);
        setVariables({});
        setBtnVariables("");
        setTemplateDetails({});
        setSendMessageData({});
      }}
    >
      <div className="flex flex-col justify-between h-full gap-4 p-2 md:flex-row">
        <div className="flex flex-col w-full gap-5">
          {/* <div className="flex gap-2">
            <div className="flex gap-2">
              <RadioButton
                inputId="mesageTemplateType"
                name="mesageTemplateType"
                value="template"
                onChange={(e) => {
                  setMessageType(e.target.value);
                  setSendMessageData({});
                  setTemplateDetails("");
                }}
                checked={messageType === "template"}
              />
              <label
                htmlFor="mesageTemplateType"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Template
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="mesageTextType"
                name="mesageTextType"
                value="text"
                onChange={(e) => {
                  setMessageType(e.target.value);
                  setSendMessageData({});
                  setTemplateDetails("");
                }}
                checked={messageType === "text"}
              />
              <label
                htmlFor="mesageTextType"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Custom Message
              </label>
            </div>
          </div> */}
          <div>
            {messageType === "template" ? (
              <div className="flex flex-col gap-3">
                <AnimatedDropdown
                  id="selectTemplate"
                  name="selectTemplate"
                  label="Select Template"
                  placeholder="Select Template"
                  options={allTemplated?.map((template) => ({
                    value: template.templateName,
                    label: template.templateName,
                  }))}
                  value={sendmessageData.templateName}
                  onChange={(e) => {
                    setSendMessageData((prevData) => ({
                      ...prevData,
                      templateName: e,
                    }));
                    const templateType = allTemplated?.find(
                      (template) => template.templateName === e
                    )?.type;
                    setTemplateType(templateType);
                    setBtnVarLength(0);
                    setVarLength(0);
                    setVariables({});
                    setBtnVariables("");
                    setTemplateDetails("");
                  }}
                />

                <Variables
                  templateType={templateType}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  varLength={varLength}
                  setVariables={setVariables}
                  variables={variables}
                  btnVariables={btnVariables}
                  btnVarLength={btnVarLength}
                  setBtnVariables={setBtnVariables}
                />
              </div>
            ) : null}
            {/* (
              <div>
                <InputField
                  label="Enter Message"
                  value={sendmessageData.message}
                  placeholder="Enter Message..."
                  onChange={(e) => {
                    setSendMessageData((prevData) => ({
                      ...prevData,
                      message: e.target.value,
                    }));
                  }}
                />
              </div>
            ) */}
          </div>
          <div>
            <UniversalButton label="Send" onClick={handlesendMessage} />
          </div>
        </div>
        <div>
          <TemplatePreview
            tempDetails={templateDetails}
            messageType={messageType}
            sendmessageData={sendmessageData}
          />
        </div>
      </div>
    </Dialog>

    <input
      type="file"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={handleFileChange}
      accept="image/* video/* audio/*"
    // multiple
    />

    {imagePreviewVisible && (
      <ImagePreview
        imagePreviewVisible={imagePreviewVisible}
        setImagePreviewVisible={setImagePreviewVisible}
        images={[selectedImage]}
      />
    )}
  </div>
);