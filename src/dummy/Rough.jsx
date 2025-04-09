<div className="flex h-full bg-gray-100 overflow-hidden">
  {/* Sidebar - WABA Selector + Chat List */}
  <motion.div
    initial={{ x: 0, opacity: 1 }}
    animate={{ x: activeChat ? -300 : 0, opacity: activeChat ? 0 : 1 }}
    transition={{ duration: 0.3 }}
    className={`w-full md:w-100 border-r overflow-hidden bg-white p-4 ${
      activeChat ? 'hidden md:block' : 'block'
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
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="p-2">
          <SearchOutlined className="text-gray-500" />
        </button>
      </div>

      {selectedWaba && (
        <div className="flex justify-center gap-4 bg-gray-100 p-2 rounded-lg">
          {['active', 'close'].map((option) => (
            <button
              key={option}
              onClick={() => setBtnOption(option)}
              className={`p-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                btnOption === option
                  ? 'bg-blue-500 text-white scale-105 shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-300'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-2 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {allConvo.length === 0 ? (
          <SkeletonLoader />
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
                className={`p-3 border-b cursor-pointer select-none rounded-lg hover:bg-gray-100 ${
                  activeChat?.srno === chat.srno ? 'bg-blue-100' : ''
                }`}
                onClick={() => setActiveChat(chat)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src={chat.image || '/default-avatar.jpg'}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{chat.contectName || chat.mobileNo}</p>
                      <p className="text-xs text-gray-500 truncate w-48">{chat.messageBody}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{formatDate(chat.insertTime)}</p>
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

  {/* Placeholder when no chat selected */}
  {!activeChat && (
    <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 text-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <p>Select a chat to start messaging 📨</p>
      </motion.div>
    </div>
  )}

  {/* Main Chat Section */}
  {activeChat && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col flex-1 bg-white shadow-md rounded-l-2xl overflow-hidden"
    >
      {/* Chat Header */}
      {/* Message List */}
      {/* Message Input */}
      {/* Additional UI as needed */}
    </motion.div>
  )}

  {/* new */}
  <div className="flex h-full bg-gray-100 overflow-hidden">
  {/* Sidebar - WABA Selector + Chat List */}
  <motion.div
    initial={{ x: 0, opacity: 1 }}
    animate={{ x: activeChat ? -300 : 0, opacity: activeChat ? 0 : 1 }}
    transition={{ duration: 0.3 }}
    className={`w-full md:w-100 border-r overflow-hidden bg-white p-4 ${
      activeChat ? 'hidden md:block' : 'block'
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
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="p-2">
          <SearchOutlined className="text-gray-500" />
        </button>
      </div>

      {selectedWaba && (
        <div className="flex justify-center gap-4 bg-gray-100 p-2 rounded-lg">
          {['active', 'close'].map((option) => (
            <button
              key={option}
              onClick={() => setBtnOption(option)}
              className={`p-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                btnOption === option
                  ? 'bg-blue-500 text-white scale-105 shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-300'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-2 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {allConvo.length === 0 ? (
          <SkeletonLoader count={5} />
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
                className={`p-3 border-b cursor-pointer select-none rounded-lg hover:bg-gray-100 ${
                  activeChat?.srno === chat.srno ? 'bg-blue-100' : ''
                }`}
                onClick={() => setActiveChat(chat)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src={chat.image || '/default-avatar.jpg'}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{chat.contectName || chat.mobileNo}</p>
                      <p className="text-xs text-gray-500 truncate w-48">{chat.messageBody}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{formatDate(chat.insertTime)}</p>
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

  {/* Placeholder when no chat selected */}
  {!activeChat && (
    <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 text-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <p>Select a chat to start messaging 📨</p>
      </motion.div>
    </div>
  )}

  {/* Main Chat Section */}
  {activeChat && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col flex-1 bg-white shadow-md rounded-l-2xl overflow-hidden"
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-3">
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
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-sm">
              {activeChat.contectName || activeChat.mobileNo}
            </h3>
          </div>
        </div>
        <div className="flex gap-3">
          <InfoOutlinedIcon
            className="text-green-600 cursor-pointer"
            onClick={() => setVisibleRight(true)}
          />
          <SupportAgentOutlinedIcon
            className="cursor-pointer"
            onClick={() => setDialogVisible(true)}
          />
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messageRef}
        className="flex-1 overflow-y-auto px-4 py-2 space-y-2 flex flex-col md:max-h-[calc(100vh-10rem)]"
      >
        {specificConversation.length === 0 ? (
          <SkeletonLoader count={8} />
        ) : (
          specificConversation.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="my-4 text-xs text-center text-gray-500">
                {group.date}
              </div>
              <div className="flex flex-col items-start space-y-2">
                {group.messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className={`max-w-[70%] p-2 rounded-md ${
                      !msg.isReceived
                        ? 'self-end bg-blue-500 text-white'
                        : 'self-start bg-gray-200 text-black'
                    }`}
                  >
                    <p className="text-sm">{msg.messageBody}</p>
                    <p className="text-[0.7rem] text-right mt-1">
                      {formatTime(msg.insertTime)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t flex items-center gap-2">
        <CustomEmojiPicker position="top" onSelect={insertEmoji} />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
        >
          <FiSend className="text-lg" />
        </button>
      </div>
    </motion.div>
  )}
</div>
{/* // new end */}

{/* new 2  */}

<div className="flex h-full bg-gray-100 overflow-hidden">
  {/* Sidebar - WABA Selector + Chat List */}
  <motion.div
    initial={{ x: 0, opacity: 1 }}
    animate={{ x: activeChat ? -300 : 0, opacity: activeChat ? 0 : 1 }}
    transition={{ duration: 0.3 }}
    className={`w-full md:w-100 border-r overflow-hidden bg-white p-4 ${
      activeChat ? 'hidden md:block' : 'block'
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
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="p-2">
          <SearchOutlined className="text-gray-500" />
        </button>
      </div>

      {selectedWaba && (
        <div className="flex justify-center gap-4 bg-gray-100 p-2 rounded-lg">
          {['active', 'close'].map((option) => (
            <button
              key={option}
              onClick={() => setBtnOption(option)}
              className={`p-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                btnOption === option
                  ? 'bg-blue-500 text-white scale-105 shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-300'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-2 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {allConvo.length === 0 ? (
          <SkeletonLoader count={5} />
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
                className={`p-3 border-b cursor-pointer select-none rounded-lg hover:bg-gray-100 ${
                  activeChat?.srno === chat.srno ? 'bg-blue-100' : ''
                }`}
                onClick={() => setActiveChat(chat)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src={chat.image || '/default-avatar.jpg'}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{chat.contectName || chat.mobileNo}</p>
                      <p className="text-xs text-gray-500 truncate w-48">{chat.messageBody}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{formatDate(chat.insertTime)}</p>
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
              <QuestionAnswerOutlinedIcon sx={{ fontSize: '3rem' }} className="text-green-700" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">Welcome to Celitix LiveChat!</h2>
          <p className="text-gray-500">Select a conversation from the left panel to start chatting.</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Main Chat Section */}
  {activeChat && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col flex-1 bg-white shadow-md rounded-l-2xl overflow-hidden"
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-3">
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
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-sm">
              {activeChat.contectName || activeChat.mobileNo}
            </h3>
          </div>
        </div>
        <div className="flex gap-3">
          <InfoOutlinedIcon
            className="text-green-600 cursor-pointer"
            onClick={() => setVisibleRight(true)}
          />
          <SupportAgentOutlinedIcon
            className="cursor-pointer"
            onClick={() => setDialogVisible(true)}
          />
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messageRef}
        className="flex-1 overflow-y-auto px-4 py-2 space-y-2 flex flex-col md:max-h-[calc(100vh-10rem)]"
      >
        {specificConversation.length === 0 ? (
          <SkeletonLoader count={8} />
        ) : (
          specificConversation.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="my-4 text-xs text-center text-gray-500">
                {group.date}
              </div>
              <div className="flex flex-col items-start space-y-2">
                {group.messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className={`max-w-[70%] p-2 rounded-md ${
                      !msg.isReceived
                        ? 'self-end bg-blue-500 text-white'
                        : 'self-start bg-gray-200 text-black'
                    }`}
                  >
                    <p className="text-sm">{msg.messageBody}</p>
                    <p className="text-[0.7rem] text-right mt-1">
                      {formatTime(msg.insertTime)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t flex items-center gap-2">
        <CustomEmojiPicker position="top" onSelect={insertEmoji} />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
        >
          <FiSend className="text-lg" />
        </button>
      </div>
    </motion.div>
  )}
</div>

{/* new 2 end */}

</div>


