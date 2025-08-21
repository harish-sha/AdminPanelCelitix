import { createContext, useContext, useState } from "react";

const InstagramContext= createContext();

export const InstagramProvider = ({ children }) => {
 

  return (
    <InstagramContext.Provider
      value={{
       
      }}
    >
      {children}
    </InstagramContext.Provider>
  );
};

export const useInstagramContext = () => useContext(InstagramContext);
