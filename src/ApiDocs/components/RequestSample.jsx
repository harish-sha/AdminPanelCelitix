import React, { useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import toast, { Toaster } from "react-hot-toast";
import ReactJsonPretty from "react-json-pretty";
import "./jsonTheme.css"


const RequestSample = ({ tabsContent }) => {
  const [activeTab, setActiveTab] = useState(tabsContent?.[0]?.id ?? 0);
  const [isCopied, setIsCopied] = useState(false);

  const tabs = Array.isArray(tabsContent) ? tabsContent : [];
  const activeTabObj = tabs.find((tab) => tab.id === activeTab);

  const handleCopy = () => {
    const textToCopy = formatJson(activeTabObj?.requestPrefix);
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        toast.success("JSON copied to clipboard!", {
          duration: 2000,
          position: "top-center",
          style: { backgroundColor: "#fff", color: "#000" },
          iconTheme: { primary: "#10B981", secondary: "#fff" },
        });
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        toast.error("Failed to copy text", {
          duration: 2000,
          position: "top-center",
          style: { backgroundColor: "#fff", color: "#000" },
        });
        console.error("Could not copy text: ", err);
      });
  };

  const formatJson = (jsonString) => {
    try {
      const cleaned = jsonString?.trim().replace(/(\r\n|\n|\r)/gm, " ");
      const parsed = JSON.parse(cleaned);
      return JSON.stringify(parsed, null, 2);
    } catch (err) {
      return jsonString;
    }
  };

  return (
     <div className="bg-gray-500 text-white p-4 md:p-5 lg:p-6 rounded-lg lg:w-3xl md:w-2xl mx-auto">
<Toaster />

      {/* Mobile Dropdown */}
      <div className="sm:hidden mb-6">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(Number(e.target.value))}
          className="w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.title}
            </option>
          ))}
        </select>
      </div>

      {/* Tab Buttons */}
      <div className="hidden sm:block relative bg-gray-800 rounded-full mb-6">
        <div
          className="absolute bg-gray-600 rounded-full h-full transition-all duration-300 ease-in-out"
          style={{
            width: `${100 / tabs.length}%`,
            left: `${tabs.findIndex((tab) => tab.id === activeTab) * (100 / tabs.length)}%`,
          }}
        />
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 py-2 rounded-full relative z-10 transition-colors duration-300 ${
                activeTab === tab.id ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* JSON Viewer */}
      <div className="bg-gray-700 rounded-md p-4 relative overflow-x-auto max-w-full w-[280px] md:w-[620px] lg:w-full break-words whitespace-pre-wrap">

        <button
          onClick={handleCopy}
          className={`absolute top-2 right-2 transition-colors px-2 py-1 rounded-md hover:bg-gray-600 ${
            isCopied ? "text-white bg-gray-600" : "text-gray-300"
          }`}
          aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
        >
          {isCopied ? (
            <CheckOutlinedIcon fontSize="small" sx={{ color: "white" }} />
          ) : (
            <ContentCopyOutlinedIcon fontSize="small" sx={{ color: "white" }} />
          )}
        </button>

        <ReactJsonPretty
          data={formatJson(activeTabObj?.requestPrefix)}
          className="react-json-pretty"
        />
      </div>
    </div>
  );
};

export default RequestSample;

