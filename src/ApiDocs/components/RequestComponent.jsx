import React, { useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { FaCode } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import ReactJsonPretty from "react-json-pretty";
import Drawer from "@mui/material/Drawer";
import "./jsonTheme.css";

const languageOptions = [
  "cURL",
  "Node.js (fetch)",
  "Python (requests)",
  "Go (native)",
  "PHP (cURL)",
];

const RequestComponent = ({ requestData = [], curlBase = "" }) => {
  // ----- state -----
  const [isCopied, setIsCopied] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("cURL");
  const [expanded, setExpanded] = useState(false);

  // ----- data: safe JSON parse for the pretty viewer + code templates -----
  const raw = requestData[0]?.requestPrefix || "{}";
  let jsonData = {};
  try {
    jsonData = JSON.parse(raw);
  } catch {
    jsonData = {};
  }

  // ----- copy: JSON only (card) -----
  const handleCopyJson = () => {
    navigator.clipboard.writeText(raw).then(() => {
      setIsCopied(true);
      toast.success("JSON copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // ----- code templates by language -----
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

  return (
    <>
      <div className="w-full mx-auto mt-4">
        <div
          className={`bg-gray-700 text-white p-4 rounded-lg shadow-md flex flex-col relative transition-all duration-300 ${expanded ? "max-h-full" : "h-full overflow-hidden"
            }`}
        >
          {/* top-right actions */}
          <div className="flex justify-end absolute right-2 top-2 space-x-4">
            <button onClick={() => setDrawerOpen(true)} aria-label="View code">
              <FaCode
                className="text-gray-400 hover:text-white"
                fontSize="large"
              />
            </button>

            <button
              className={`rounded-md hover:bg-gray-700 ${isCopied ? "text-white bg-gray-700" : "text-gray-400"
                }`}
              onClick={handleCopyJson}
              aria-label="Copy JSON"
              title="Copy JSON"
            >
              {isCopied ? (
                <CheckOutlinedIcon fontSize="small" />
              ) : (
                <ContentCopyOutlinedIcon fontSize="small" />
              )}
            </button>
          </div>

          {/* pretty JSON */}
          <div className="font-mono text-sm w-full mt-6 overflow-x-auto">
            <ReactJsonPretty data={jsonData} className="react-json-pretty" />
          </div>

          {/* expand/collapse */}
          {/* <div className="mt-4 self-center">
            <button
              className="text-blue-400 underline"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "View Less" : "View More"}
            </button>
          </div> */}
        </div>
      </div>

      {/* drawer: language select + live code */}
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
            <ReactJsonPretty data={renderCodeBlock()} className="json-pretty-wrap whitespace-pre-wrap break-words text-wrap" />
          </pre>
        </div>
      </Drawer>
    </>
  );
};

export default RequestComponent;
