import { fetchAllBotsList, fetchAllConvo } from "@/apis/rcs/rcs";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { InputData } from "./components/input";

const RcsLiveChat = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [agentState, setAgentState] = React.useState([]);

  const [mobileNo, setMobileNo] = React.useState("");
  const [btnOption, setBtnOption] = React.useState("active");
  const [chatState, setChatState] = React.useState({
    active: null,
    input: "",
    allConversations: [],
    specificConversation: [],
    latestMessage: {
      srno: "",
      replayTime: "",
    },
    agent_id: "",
    // replyData: "",
    // isReply: false,
  });

  async function handleFetchAgents() {
    try {
      const res = await fetchAllBotsList();
      setAgentState(res);
    } catch (e) {
      toast.error("Error fetching conversations");
    }
  }
  async function handleFetchAllConvo() {
    if (!chatState?.agent_id) return;
    try {
      const payload = {
        agentId: chatState?.agent_id,
        search: mobileNo,
        active: chatState.active,
      };
      const res = await fetchAllConvo(payload);
      console.log(res);
    } catch (e) {
      toast.error("Error fetching conversations");
    }
  }

  //useEffect

  useEffect(() => {
    handleFetchAgents();
  }, []);

  useEffect(() => {
    handleFetchAllConvo();
  }, [btnOption, chatState]);

  return (
    <div>
      <div>
        <InputData
          agentState={agentState}
          chatState={chatState}
          setChatState={setChatState}
          search={mobileNo}
          setSearch={setMobileNo}
          handleSearch={handleFetchAllConvo}
          btnOption={btnOption}
          setBtnOption={setBtnOption}
        />
      </div>
    </div>
  );
};

export default RcsLiveChat;
