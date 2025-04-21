import React, {useState} from 'react'
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import toast, { Toaster } from "react-hot-toast";




const RequestSample = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isCopied, setIsCopied] = useState(false);


  const tabs = [
    {
      id: 0,
      title: "Without Variable",
      requestPrefix: "// Request Sample - Without Variable",
    },
    {
      id: 1,
      title: "With Variable",
      requestPrefix: "// Request Sample - With Variable",
    },
    {
      id: 2,
      title: "Template State",
      requestPrefix: "// Request Sample - Template State ",
    },
  ];



  const jsonContent = `{
    "name": "wefinaleng",
    "type": "text_message",
    "textMessageContent": "Time to go big or FINALS!",
    "suggestions": [{
      "suggestionType": "reply",
      "displayText": "Click to Win",
      "postback": "click_to_win"
    },
    {
      "suggestionType": "url_action",
      "url": "https://abc.me/",
      "displayText": "Answer and Win",
      "postback": "answer_and_win"
    }]
  }`;



  const handleCopy = () => {
    navigator.clipboard
      .writeText(jsonContent)
      .then(() => {
        // Show check icon
        setIsCopied(true);

        // Show toast notification
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

        // Reset icon after 2 seconds
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
    <div className="bg-gray-800 text-white p-6 rounded-lg w-4xl mx-auto my-12">
    {/* Toast container */}
    <Toaster />

    {/* Tab selector */}
    {/* Mobile dropdown - visible on small screens */}
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

    {/* Row tabs - visible on medium screens and above */}
    <div className="hidden sm:block relative bg-gray-800 rounded-full p-1 mb-6">
      {/* Animated capsule */}
      <div
        className="absolute bg-gray-600 rounded-full h-10 transition-all duration-300 ease-in-out"
        style={{
          width: `${100 / tabs.length}%`,
          left: `${activeTab * (100 / tabs.length)}%`,
        }}
      />

      {/* Tab buttons */}
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

    {/* Content area */}
    <div className="bg-gray-700 rounded-md p-4">
      <div className="flex flex-wrap justify-between">
        <div className="text-gray-400">
          {tabs[activeTab].requestPrefix}
        </div>
        <button
          className={`transition-colors p-2 rounded-md hover:bg-gray-700 ${
            isCopied
              ? "text-white bg-gray-700"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={handleCopy}
          aria-label={
            isCopied ? "Copied to clipboard" : "Copy to clipboard"
          }
        >
          {isCopied ? (
            <CheckOutlinedIcon fontSize="small" />
          ) : (
            <ContentCopyOutlinedIcon fontSize="small" />
          )}
        </button>
      </div>
      
      <pre className="text-white  text-sm flex flex-row justify-start items-start whitespace-pre-wrap ">
        {jsonContent}
      </pre>
    </div>
  </div>
  )
}

export default RequestSample
