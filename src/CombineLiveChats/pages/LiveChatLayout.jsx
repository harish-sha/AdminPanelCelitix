import { Outlet, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUser } from "@/context/auth";

import ChannelTabs from "../components/chat/ChannelTabs";
import WhatsappLiveChat from "@/whatsapp/livechat/WhatsappLiveChat";
import WhatsappChats from "@/CombineLiveChats/components/ServiceLayout/whatsappChats";
import RcsLiveChat from "@/rcs/rcslivechat/RcsLiveChat";
import InstagramChats from "../components/ServiceLayout/InstagramChats";
import MessengerView from "./channels/MessengerView";
import MessengerChats from "../components/ServiceLayout/MessengerChats";
import RcsChats from "@/CombineLiveChats/components/ServiceLayout/RcsChats";
import InstaLiveChats from "@/instagram/Livechats/InstaLiveChats";

const LiveChatLayout = () => {
  const { channel } = useParams();
  const { user } = useUser();
  // const allowedServiceIds =
  //   user?.services?.map((s) => s.service_type_id.toString()) || [];
  const allowedServiceIds = ["7", "8", "9", "10"]; // dummmy

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
      case "instalivechats":
        return allowedServiceIds.includes("9") ? (
          <InstaLiveChats />
        ) : (
          <InstagramChats />
        );
      case "messengerchats":
        return allowedServiceIds.includes("8") ? (
          <MessengerView />
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
