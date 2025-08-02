import ChatMessagePanel from "../components/chat/ChatMessagePanel";
import ChatSidebar from "../components/chat/ChatSidebar";

const ServiceView = ({ service }) => {
  return (
    <div className="w-full flex h-full">
      <ChatSidebar service={service} />
      <ChatMessagePanel service={service} />
    </div>
  );
};

export default ServiceView;
