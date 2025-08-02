// /* Sidebar */
// .sidebar {
//   background: #fafafa;
//   padding: 1rem;
//   border-right: 1px solid #ddd;
// }

// .sidebar-item {
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   background: white;
//   border-radius: 12px;
//   padding: 10px 12px;
//   margin-bottom: 8px;
//   cursor: pointer;
//   transition: background 0.3s;
// }

// .sidebar-item.active,
// .sidebar-item:hover {
//   background: linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7);
//   color: white;
// }

// /* Chat Area */
// .chat-container {
//   background-color: #fdfdfd;
//   background-image: url("https://i.ibb.co/7k0zBv7/instagram-bg-pattern.png");
//   background-size: 300px;
//   padding: 1rem;
// }

// .message {
//   max-width: 70%;
//   padding: 10px 15px;
//   border-radius: 18px;
//   margin-bottom: 10px;
//   font-size: 0.9rem;
//   line-height: 1.4;
// }

// .message.sent {
//   background-color: #3897f0;
//   color: white;
//   margin-left: auto;
// }

// .message.received {
//   background-color: #e0e0e0;
//   color: #333;
// }

// /* Input area */
// .chat-input {
//   border-top: 1px solid #ddd;
//   padding: 10px;
//   display: flex;
//   align-items: center;
//   background: #fff;
// }

// .chat-input input {
//   flex: 1;
//   border: none;
//   outline: none;
//   padding: 10px;
//   font-size: 0.9rem;
//   border-radius: 20px;
//   background: #f2f2f2;
// }

// .chat-input button {
//   background: linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7);
//   border: none;
//   color: white;
//   padding: 10px 15px;
//   border-radius: 50%;
//   margin-left: 8px;
//   cursor: pointer;
// }

<motion.div
  key={chat.srno || index}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.1 }}
  className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 mb-2 shadow-sm  ${chatState?.active === chat.original.name
    ? "bg-gradient-to-r from-[#ff9e66] via-[#e965a5] to-[#a667d3] text-white"
    : "bg-gradient-to-br from-pink-100 to-blue-100 hover:from-pink-200 hover:to-blue-200 text-gray-800"
    }`}
  onClick={() => {
    setChatState((prev) => ({
      ...prev,
      specificConversation: chat.messages || [],
      active: chat.original.name,
    }));
  }}
></motion.div>