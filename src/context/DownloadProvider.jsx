import { createContext, useContext, useState } from "react";

const DownloadContext = createContext();

export const DownloadProvider = ({ children }) => {
  const [hasNewDownloads, setHasNewDownloads] = useState(false);

  const triggerDownloadNotification = () => {
    setHasNewDownloads(true);
    setTimeout(() => setHasNewDownloads(false), 5000); 
  };

  return (
    <DownloadContext.Provider
      value={{ hasNewDownloads, triggerDownloadNotification }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownload = () => useContext(DownloadContext);
