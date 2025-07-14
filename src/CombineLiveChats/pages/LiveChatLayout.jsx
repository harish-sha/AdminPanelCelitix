import { Outlet } from "react-router-dom";
import ChannelTabs from "../components/chat/ChannelTabs";

const LiveChatLayout = () => {
  return (
    <div className="h-[91vh] w-full flex flex-col rounded-2xl bg-gray-50">
      <ChannelTabs />
      <div className="overflow-hidden pt-2">
        <Outlet />
      </div>
    </div>
  );
};

export default LiveChatLayout;
