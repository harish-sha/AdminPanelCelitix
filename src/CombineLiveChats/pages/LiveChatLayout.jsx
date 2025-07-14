import { Outlet } from "react-router-dom";
import ChannelTabs from "../components/chat/ChannelTabs";

const LiveChatLayout = () => {
  return (
    <div className="h-[92vh] w-full flex flex-col  rounded-2xl">
      <ChannelTabs />
      <div className="overflow-hidden pt-2">
        <Outlet />
      </div>
    </div>
  );
};

export default LiveChatLayout;
