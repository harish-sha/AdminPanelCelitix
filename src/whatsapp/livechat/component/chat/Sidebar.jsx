export const ChatSidebar = ({
    allConvo,
    setActiveChat,
    formatDate,
    activeChat
}) => {
  return (
    <div className="mt-4 h-[400px] overflow-y-auto">
      {allConvo
        ?.slice()
        ?.sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
        ?.map((chat, index) => (
          <div
            key={chat.srno || index}
            className={`p-3 border-b cursor-pointer select-none ${
              activeChat?.srno === chat.srno ? "bg-gray-300" : ""
            }`}
            onClick={() => {
              setActiveChat(chat);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={chat.image || "/default-avatar.jpg"}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-lg"></div>
                </div>
                <div className="ml-2">
                  {chat.contectName || chat.mobileNo}
                  <p className="text-xs truncate w-[200px]">
                    {chat?.messageBody}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end">
                <p className="text-xs">{formatDate(chat.insertTime)}</p>
                {chat.unreadCount > 0 && (
                  <div className="flex items-center justify-center w-5 h-5 text-sm text-white bg-green-500 rounded-full">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
