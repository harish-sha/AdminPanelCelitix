// context/WabaAgentContext.js
import { createContext, useContext, useState } from "react";

const WabaAgentContext = createContext();

export const WabaAgentProvider = ({ children }) => {
  const [wabaData, setWabaData] = useState(null);
  const [agentData, setAgentData] = useState(null);
  const [convoDetails, setConvoDetails] = useState(null);
  const [activeConvo, setActiveConvo] = useState(null);
  const [inactiveConvo, setInactiveConvo] = useState(null);
  const [initialChatState, setInititialChatState ] = useState(null);
  const [agentInfo, setAgentInfo ] = useState(null);
  const [switchChat, setSwitchChat] = useState(null);

  //other states
  const [chatData, setChatData] = useState(null);
  const [selectedContextWaba, setSelectedContextWaba] = useState();
  const [agentSelected, setAgentSelected] = useState(false);

  return (
    <WabaAgentContext.Provider
      value={{
        wabaData,
        setWabaData,
        agentData,
        setAgentData,
        chatData,
        setChatData,
        selectedContextWaba,
        setSelectedContextWaba,
        agentSelected,
        setAgentSelected,
        convoDetails,
        setConvoDetails,
        activeConvo,
        setActiveConvo,
        inactiveConvo,
        setInactiveConvo,
        initialChatState,
        setInititialChatState,
        agentInfo,
        setAgentInfo,
        switchChat,
        setSwitchChat
      }}
    >
      {children}
    </WabaAgentContext.Provider>
  );
};

export const useWabaAgentContext = () => useContext(WabaAgentContext);
