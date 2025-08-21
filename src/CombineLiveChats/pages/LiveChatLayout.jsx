import { Outlet, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUser } from "@/context/auth";

import ChannelTabs from "../components/chat/ChannelTabs";
import WhatsappLiveChat from "@/whatsapp/livechat/WhatsappLiveChat";
import WhatsappChats from "@/CombineLiveChats/components/ServiceLayout/whatsappChats";
import RcsLiveChat from "@/rcs/rcslivechat/RcsLiveChat";
import InstagramLiveChat from "@/Instagram/InstagramLiveChat/InstagramLiveChat";
import InstagramChats from "../components/ServiceLayout/InstagramChats";
import MessengerChats from "../components/ServiceLayout/MessengerChats";
import RcsChats from "@/CombineLiveChats/components/ServiceLayout/RcsChats";
import MessengerLiveChat from "@/messenger/MessengerLiveChat/MessengerLiveChat";

const LiveChatLayout = () => {
  const { channel } = useParams();
  const { user } = useUser();
  const allowedServiceIds =
    user?.services?.map((s) => s.service_type_id.toString()) || [];
  // const allowedServiceIds = ["7", "8", "9", "10"]; // dummmy

  const { pathname } = useLocation();
  const tab = pathname.split("/")[2];

  const renderDynamicContent = () => {
    switch (channel) {
      case "wlivechat":
        return allowedServiceIds.includes("2") ? (
          <WhatsappLiveChat />
        ) : (
          <WhatsappChats />
        );
      case "rcslivechats":
        return allowedServiceIds.includes("3") ? <RcsLiveChat /> : <RcsChats />;
      case "instachats":
        return allowedServiceIds.includes("9") ? (
          <InstagramLiveChat />
        ) : (
          <InstagramChats />
        );
      case "messengerchats":
        return allowedServiceIds.includes("8") ? (
          <MessengerLiveChat />
        ) : (
          <MessengerChats />
        );
      default:
        return <Outlet />; // For index route or unknown path
    }
  };
  return (
    <div className="h-[91vh] w-full flex flex-col rounded-2xl">
      <ChannelTabs />
      <div className="overflow-hidden pt-1">
        {/* <Outlet /> */}
        {renderDynamicContent()}
      </div>
    </div>
  );
};

export default LiveChatLayout;
