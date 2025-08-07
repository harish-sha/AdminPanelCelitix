// context/WabaAgentContext.js
import { createContext, useContext, useState } from 'react';

const WabaAgentContext = createContext();

export const WabaAgentProvider = ({ children }) => {
  const [wabaData, setWabaData] = useState(null);
  const [agentData, setAgentData] = useState(null);
  console.log("agentData", agentData)

  //other states
  const[chatData, setChatData] = useState(null);
  const[selectedContextWaba, setSelectedContextWaba] = useState()

  return (
    <WabaAgentContext.Provider value={{ wabaData, setWabaData, agentData, setAgentData, chatData, setChatData, selectedContextWaba, setSelectedContextWaba }}>
      {children}
    </WabaAgentContext.Provider>
  );
};

export const useWabaAgentContext = () => useContext(WabaAgentContext);
