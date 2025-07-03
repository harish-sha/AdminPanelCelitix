import { fetchAllConvo } from "@/apis/rcs/rcs";
import React from "react";
import toast from "react-hot-toast";

const RcsLiveChat = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [agentState, setAgentState] = React.useState({
    id: "",
    all: [],
  });

  const [mobileNo, setMobileNo] = React.useState("");
  const [chatState, setChatState] = React.useState({
    active: null,
    input: "",
    allConversations: [],
    specificConversation: [],
    latestMessage: {
      srno: "",
      replayTime: "",
    },
    // replyData: "",
    // isReply: false,
  });

  async function handleFetchAllConvo() {
    if (!agentState.id) return;
    try {
      const payload = {
        agentId: agentState.id,
        search: mobileNo,
        active: chatState.active,
      };
      const res = await fetchAllConvo(payload);
      console.log(res);
    } catch (e) {
      toast.error("Error fetching conversations");
    }
  }
  return <div>RcsLiveChat</div>;
};

export default RcsLiveChat;
