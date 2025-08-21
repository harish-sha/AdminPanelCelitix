import { createContext, useContext, useState } from "react";

const RcsContext = createContext();

export const RcsProvider = ({ children }) => {
  const [contextAgentList, setContextAgentList] = useState({
    all: [],
    id: "",
  });
  const [allChats, setAllChats] = useState([]);
  const [activeRcsChat, setActiveRcsChat] = useState(null);
  const [closeRcsChat, setCloseRcsChat] = useState(null);


  return (
    <RcsContext.Provider
      value={{
        contextAgentList,
        setContextAgentList,
        allChats,
        setAllChats,
        activeRcsChat,
        setActiveRcsChat,
        closeRcsChat,
        setCloseRcsChat,
      }}
    >
      {children}
    </RcsContext.Provider>
  );
};

export const useRcsContext = () => useContext(RcsContext);
