import { fetchAllBotsList, fetchAllConvo } from "@/apis/rcs/rcs";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { InputData } from "./components/input";
import { Sidebar } from "./components/sidebar";

const RcsLiveChat = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [agentState, setAgentState] = React.useState({
    all: [],
    id: "",
  });

  const [mobileNo, setMobileNo] = React.useState("");
  const [btnOption, setBtnOption] = React.useState("active");
  const [chatState, setChatState] = React.useState({
    selected: null,
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

  async function handleFetchAgents() {
    try {
      const res = await fetchAllBotsList();
      setAgentState({
        all: res,
        id: "",
      });
    } catch (e) {
      toast.error("Error fetching conversations");
    }
  }

  async function handleFetchAllConvo() {
    if (!agentState?.id) return;
    try {
      const userActive = btnOption == "active" ? 1 : 0;
      const payload = {
        agentId: agentState?.id,
        search: mobileNo,
        active: userActive,
      };
      const res = await fetchAllConvo(payload);

      if (!res.conversationEntityList[0]) {
        return;
      }

      // if (res?.unreadCounts?.length > 0) {
      //   const audio = new Audio("./receive-message.mp3");
      //   audio.play().catch((e) => {
      //     // console.log("Audio play error:", e);
      //   });
      // }

      const mappedConversations = res.conversationEntityList?.map((chat) => {
        const unread = res.unreadCounts.find(
          (unreadChat) => unreadChat.mobile === chat.mobileNo
        );
        return {
          ...chat,
          unreadCount: unread ? unread.unreadCount : 0,
        };
      });

      setChatState((prev) => ({
        ...prev,
        allConversations: mappedConversations,
      }));

      console.log(mappedConversations);
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
  }, [btnOption, agentState]);

  return (
    <div className="flex h-[100%] bg-gray-50 rounded-2xl overflow-hidden border ">
      <div
        className={`w-full md:w-100 p-1 border rounded-tl-2xl overflow-hidden border-tl-lg  ${
          chatState?.selected ? "hidden md:block" : "block"
        }`}
      >
        <InputData
          agentState={agentState}
          setAgentState={setAgentState}
          chatState={chatState}
          setChatState={setChatState}
          search={mobileNo}
          setSearch={setMobileNo}
          handleSearch={handleFetchAllConvo}
          btnOption={btnOption}
          setBtnOption={setBtnOption}
        />

        <Sidebar
          chatState={chatState}
          setChatState={setChatState}
          isLoading={isLoading}
          agentState={agentState}
        />
      </div>
    </div>
  );
};

export default RcsLiveChat;
