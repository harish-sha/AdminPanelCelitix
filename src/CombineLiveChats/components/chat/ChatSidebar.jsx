import { useState } from "react";
import ChatListItem from "./ChatListItem";

const ChatSidebar = ({ service }) => {
  const [activeTab, setActiveTab] = useState("active");

  // Mocked chat list (replace with API call)
  const activeChats = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];
  const inactiveChats = [
    { id: 3, name: "Old User 1" },
    { id: 4, name: "Old User 2" },
  ];

  return (
    <div className="w-1/4 border-r bg-gray-50 h-full flex flex-col">
      <div className="flex justify-around p-2 border-b bg-white">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-3 py-1 rounded ${
            activeTab === "active" ? "bg-blue-500 text-white" : "text-gray-600"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("inactive")}
          className={`px-3 py-1 rounded ${
            activeTab === "inactive"
              ? "bg-blue-500 text-white"
              : "text-gray-600"
          }`}
        >
          Inactive
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        {(activeTab === "active" ? activeChats : inactiveChats).map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
