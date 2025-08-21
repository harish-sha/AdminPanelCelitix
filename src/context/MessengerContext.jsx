import { createContext, useContext, useState } from "react";

const MessangerContext = createContext();

export const MessangerProvider = ({ children }) => {
  return (
    <MessangerContext.Provider value={{}}>{children}</MessangerContext.Provider>
  );
};

export const useMessangerContext = () => useContext(MessangerContext);
