const ChatMessagePanel = ({ service }) => {
  return (
    <div className="flex-1 h-full bg-white flex flex-col">
      <div className="p-4 border-b bg-gray-50">
        {service.toUpperCase()} Chat
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        Messages will appear here...
      </div>
      <div className="p-4 border-t bg-gray-50">Input box here</div>
    </div>
  );
};

export default ChatMessagePanel;
