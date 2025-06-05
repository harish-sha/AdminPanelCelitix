import { createContext, useContext, useEffect, useMemo, useState } from "react";

const PageData = createContext(null);

export const PageDataProvider = ({ children }) => {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    console.log("pageData", pageData);
  }, [pageData]);
  const saveData = (data) => {
    setPageData(data);
    // sessionStorage.setItem("page", JSON.stringify(data));
  };

  const removeData = () => {
    setPageData(null);
    // sessionStorage.removeItem("user");
  };

  // const value = useMemo(() => ({ user, authLogin, authLogout }), [user]);

  return (
    <PageData.Provider value={{ pageData, saveData, removeData }}>
      {children}
    </PageData.Provider>
  );
};

export const usePageData = () => useContext(PageData);
