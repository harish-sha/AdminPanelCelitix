import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { ContentCopyOutlined as CopyIcon, CheckOutlined as CheckIcon } from "@mui/icons-material";
import ReactJsonPretty from "react-json-pretty";
import "./jsonTheme.css"


const ResponseComponent = ({ jsonData, headers }) => {
  const [responseActiveTab, setResponseActiveTab] = useState("body");
  const [copied, setCopied] = useState(false);

  const handleCopy = (data) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
      setCopied(true);
      toast.success("JSON copied to clipboard!");
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  return (
    <div className="w-[320px] md:w-2xl lg:w-3xl mx-auto mt-6 p-4 rounded-lg shadow-lg bg-gray-600 ">
      {/* Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            responseActiveTab === "body"
              ? "border-b-2 border-orange-400 text-white"
              : "text-gray-200"
          }`}
          onClick={() => setResponseActiveTab("body")}
        >
          Body
        </button>
        <button
          className={`px-4 py-2 rounded ${
            responseActiveTab === "header"
              ? "border-b-2 border-orange-400 text-white"
              : "text-gray-200"
          }`}
          onClick={() => setResponseActiveTab("header")}
        >
          Header
        </button>
      </div>

      {/* Conditional Content */}
      <div>
        {responseActiveTab === "body" ? (
          <div className="overflow-auto text-sm relative  mt-2">
            {/* Copy Button */}
            <div className="absolute right-0 top-0 p-2 ">
              <button
                onClick={() => handleCopy(jsonData)}
                className="text-gray-300 "
                aria-label="Copy JSON"
              >
                {copied ? <CheckIcon fontSize="small"/> : <CopyIcon fontSize="small"/>}
              </button>
            </div>

            <div className=" mt-4">
            <ReactJsonPretty data={jsonData} className="react-json-pretty" />
            </div>
          </div>
        ) : (
          <table className="min-w-full table-auto border-collapse text-sm border-none ">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left text-white p-2">Key</th>
                <th className="text-left text-white p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {headers.map((header, index) => (
                <tr key={index}>
                  <td className="p-2 text-orange-400 bg-gray-700">{header.key}</td>
                  <td className="p-2 text-white bg-gray-700">{header.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ResponseComponent;
