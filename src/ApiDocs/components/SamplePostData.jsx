import React, { useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import toast, { Toaster } from "react-hot-toast";
import ReactJsonPretty from "react-json-pretty";
import "./jsonTheme.css"

const SamplePostData = () => {
  const [isCopied, setIsCopied] = useState(false);

  const contentSection = [
    {
      id: 0,
      title: "202 Accepted",
      requestPrefix: `{
  "event": "Status",
  "statusDetails": {
    "name": "Offers",
    "botId": "sdfgsrgrgrg",
    "status": "rejected",
    "templateType": "live",
    "comment": "by admin",
    "lastUpdate": "jul 21, 2010"
  }}`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard
      .writeText(contentSection[0].requestPrefix)
      .then(() => {
        setIsCopied(true);
        toast.success("JSON copied to clipboard!", {
          duration: 2000,
          position: "top-center",
          style: {
            backgroundColor: "#fff",
            color: "#000",
          },
          iconTheme: {
            primary: "#10B981", // green
            secondary: "#fff",
          },
        });
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        toast.error("Failed to copy text", {
          duration: 2000,
          position: "top-center",
          style: {
            backgroundColor: "#fff",
            color: "#000",
          },
        });
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <>
      <div className="w-3xl mx-auto">
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md flex items-center flex-col h-66 relative">
          <Toaster />
          <div className="flex justify-between items-center absolute right-2.5">
            <div className="flex-1"></div>
            <div className="flex gap-4">
              <button
                className={`transition-colors absolute right-4 rounded-md hover:bg-gray-700 ${
                  isCopied ? "text-white bg-gray-700" : "text-gray-400 hover:text-white"
                }`}
                onClick={handleCopy}
                aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
              >
                {isCopied ? (
                  <CheckOutlinedIcon fontSize="small" />
                ) : (
                  <ContentCopyOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>
          </div>

          {/* Use ReactJsonPretty for displaying JSON */}
          <div className="font-mono text-sm w-full mt-4 overflow-x-auto">
            <ReactJsonPretty
              data={JSON.parse(contentSection[0].requestPrefix)}
              className="react-json-pretty"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SamplePostData;
