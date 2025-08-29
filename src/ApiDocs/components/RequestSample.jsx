import React, { useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import toast, { Toaster } from "react-hot-toast";
import ReactJsonPretty from "react-json-pretty";
import "./jsonTheme.css";
import Drawer from "@mui/material/Drawer";
import { FaCode } from "react-icons/fa";

const RequestSample = ({ tabsContent, curlBase = "" }) => {
  const [activeTab, setActiveTab] = useState(tabsContent?.[0]?.id ?? 0);
  const [isCopied, setIsCopied] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("cURL");

  const tabs = Array.isArray(tabsContent) ? tabsContent : [];
  const activeTabObj = tabs.find((tab) => tab.id === activeTab);

  const raw =
  tabsContent?.find((tab) => tab.id === activeTab)?.requestPrefix || "{}";
  let jsonData = {};
  try {
    jsonData = JSON.parse(raw);
  } catch {
    jsonData = {};
  }

  const renderCodeBlock = () => {
    switch (selectedLang) {
      case "cURL":
        // Uses provided curlBase + body
        return `${curlBase}
        --data '${raw}'`;

      case "Node.js (fetch)":
        return `// Fill your actual URL, method and headers as needed
fetch("<<your-url>>", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(${JSON.stringify(jsonData, null, 2)})
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);`;

      case "Python (requests)":
        return `# Fill your actual URL and headers as needed
import requests

resp = requests.post(
  "<<your-url>>",
  json=${JSON.stringify(jsonData, null, 2)},
  headers={"Content-Type": "application/json"}
)
print(resp.status_code)
print(resp.text)`;

      case "Go (native)":
        return `// Fill your actual URL and headers as needed
package main

import (
  "bytes"
  "encoding/json"
  "fmt"
  "io"
  "net/http"
)

func main() {
  body, _ := json.Marshal(${JSON.stringify(jsonData, null, 2)})
  resp, err := http.Post("<<your-url>>", "application/json", bytes.NewReader(body))
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()
  b, _ := io.ReadAll(resp.Body)
  fmt.Println(resp.StatusCode)
  fmt.Println(string(b))
}`;

      case "PHP (cURL)":
        return `<?php
// Fill your actual URL and headers as needed
$ch = curl_init("<<your-url>>");
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
  CURLOPT_POSTFIELDS => json_encode(${JSON.stringify(jsonData, null, 2)}),
]);
$resp = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
echo $code . "\\n" . $resp;`;

      default:
        return "";
    }
  };

  // ----- copy: current code in drawer (matches selectedLang) -----
  const handleCopyCode = () => {
    const code = renderCodeBlock();
    navigator.clipboard.writeText(code).then(() => {
      toast.success(`${selectedLang} code copied!`);
    });
  };

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
    <div className="bg-gray-500 text-white p-4 md:p-5 lg:p-6 rounded-lg w-full">
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
            left: `${
              tabs.findIndex((tab) => tab.id === activeTab) *
              (100 / tabs.length)
            }%`,
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
        <div className="flex justify-end absolute right-2 top-2 space-x-4">
          <button onClick={() => setDrawerOpen(true)} aria-label="View code">
            <FaCode
              className="text-gray-400 hover:text-white"
              fontSize="large"
            />
          </button>

          <button
            onClick={handleCopy}
            className={`transition-colors px-2 py-1 rounded-md hover:bg-gray-600 ${
              isCopied ? "text-white bg-gray-600" : "text-gray-300"
            }`}
            aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
          >
            {isCopied ? (
              <CheckOutlinedIcon fontSize="small" sx={{ color: "white" }} />
            ) : (
              <ContentCopyOutlinedIcon
                fontSize="small"
                sx={{ color: "white" }}
              />
            )}
          </button>
        </div>

        <ReactJsonPretty
          data={formatJson(activeTabObj?.requestPrefix)}
          className="react-json-pretty"
        />
      </div>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="lg:w-[500px] w-[300px] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Postman Request Curl</h2>
            <button onClick={handleCopyCode} title="Copy code">
              <ContentCopyOutlinedIcon
                fontSize="small"
                className="text-gray-600 hover:text-black"
              />
            </button>
          </div>

          <div>
            {/* <label className="text-sm text-gray-600">Choose Language</label> */}
            <div className="flex items-center space-x-2">
              {/* <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select> */}

              {/* <button onClick={handleCopyCode} title="Copy code">
                <ContentCopyOutlinedIcon
                  fontSize="small"
                  className="text-gray-600 hover:text-black"
                />
              </button> */}
            </div>
          </div>

          <pre className="bg-[#364153] text-green-500 p-4 rounded overflow-y-auto text-sm h-auto">
            <ReactJsonPretty
              data={renderCodeBlock()}
              className="json-pretty-wrap whitespace-pre-wrap break-words text-wrap"
            />
          </pre>
        </div>
      </Drawer>
    </div>
  );
};

export default RequestSample;
