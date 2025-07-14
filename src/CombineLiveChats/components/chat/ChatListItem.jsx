const ChatListItem = ({ chat }) => {
  return (
    <div className="p-3 border-b hover:bg-gray-100 cursor-pointer">
      <p className="font-medium">{chat.name}</p>
    </div>
  );
};

export default ChatListItem;
