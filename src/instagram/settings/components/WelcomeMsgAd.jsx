import UniversalButton from "@/components/common/UniversalButton";
import React, { useState } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import Battery90Icon from "@mui/icons-material/Battery90";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import MenuIcon from "@mui/icons-material/Menu";
import toast from "react-hot-toast";
import InputField from "@/whatsapp/components/InputField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { FaRegFaceSmile } from "react-icons/fa6";
import ClearIcon from "@mui/icons-material/Clear";

const WelcomeMsgAd = () => {
  const [flowName, setFlowName] = useState("");
  const [welcomeMessageDetails, setWelcomeMessageDetails] = useState({
    text: "",
    quickReplies: [],
  });
  const [addWelcomeBtn, setAddWelcomeBtn] = useState(false);

  const handleAddMenuItem = () => {
    if (!welcomeMessageDetails.text) {
      toast.error("Please fill in all fields before adding a menu item.");
      return;
    }

    const payload = {
      eligible_platforms: ["instagram"],
      name: flowName,
      welcome_message_flow: {
        text: welcomeMessageDetails.text,
        quick_replies: welcomeMessageDetails.quickReplies.map((reply) => ({
          type: "text",
          title: reply.title,
          payload: reply.payload,
        })),
      },
    };

    console.log("Payload to be sent:", payload);
  };

  const handleAddQuickReply = () => {
    setWelcomeMessageDetails((prev) => ({
      ...prev,
      quickReplies: [...prev.quickReplies, { title: "", payload: "" }],
    }));
  };

  const handleQuickReplyChange = (index, field, value) => {
    const updatedReplies = [...welcomeMessageDetails.quickReplies];
    updatedReplies[index][field] = value;
    setWelcomeMessageDetails((prev) => ({
      ...prev,
      quickReplies: updatedReplies,
    }));
  };

  const handleRemoveQuickReply = (indexToRemove) => {
    setWelcomeMessageDetails((prev) => ({
      ...prev,
      quickReplies: prev.quickReplies.filter((_, i) => i !== indexToRemove),
    }));
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col md:flex-row gap-4">
          {/* left Panel - add content */}
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-4 space-y-6 flex flex-col items-start justify-start">
            <div className="flex flex-col items-center gap-2 w-full p-2 bg-white rounded-lg shadow">
              <InputField
                type="text"
                label="Label of Flow Name"
                placeholder="Enter Flow Name"
                tooltipContent="This is the label that will be displayed to the user."
                tooltipPlacement="right"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                className="w-46 text-sm"
              />
              {/* Text Message Input */}
              <InputField
                type="text"
                label="Text Message"
                placeholder="Enter welcome text"
                tooltipContent="This is the text Message that will be displayed to the user."
                value={welcomeMessageDetails.text}
                onChange={(e) =>
                  setWelcomeMessageDetails((prev) => ({
                    ...prev,
                    text: e.target.value,
                  }))
                }
              />
              {/* Add Quick Reply Button */}
              <button
                className="flex items-center text-sm gap-2 text-red-500 hover:text-red-700"
                onClick={handleAddQuickReply}
              >
                <AddIcon />
                Add Quick Reply
              </button>

              <div className="space-y-4 w-full">
                {/* Render Quick Reply Inputs */}
                {Array.isArray(welcomeMessageDetails.quickReplies) &&
                  welcomeMessageDetails?.quickReplies?.map((reply, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col gap-4 w-full p-3 bg-white rounded-lg shadow"
                    >
                      {/* Remove Button in Top-Right */}
                      <button
                        type="button"
                        onClick={() => handleRemoveQuickReply(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        title="Remove this quick reply"
                      >
                        <ClearIcon />
                      </button>

                      <InputField
                        type="text"
                        label={`Quick Reply Title ${index + 1}`}
                        placeholder="Enter title"
                        tooltipContent="This is the title that will be displayed to the user."
                        value={reply.title}
                        onChange={(e) =>
                          handleQuickReplyChange(index, "title", e.target.value)
                        }
                      />

                      <InputField
                        type="text"
                        label={`Quick Reply Payload ${index + 1}`}
                        placeholder="Enter payload"
                        tooltipContent="This is the text that will be sent when the user clicks the reply."
                        value={reply.payload}
                        onChange={(e) =>
                          handleQuickReplyChange(
                            index,
                            "payload",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
              </div>

              <div className="w-max-content">
                <UniversalButton onClick={handleAddMenuItem} label="Add" />
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-col h-auto border rounded-2xl p-4 bg-gray-50 space-y-4 text-sm text-gray-800">
                {/* Flow Name */}
                <div className="break-words whitespace-normal w-full">
                  <span className="font-semibold">Flow Name:</span>{" "}
                  <span className="break-words">{flowName || "N/A"}</span>
                </div>

                <div className="break-words whitespace-normal w-full">
                  <span className="font-semibold">Welcome Text:</span>{" "}
                  <span className="break-words">
                    {welcomeMessageDetails.text || "N/A"}
                  </span>
                </div>

                {/* Quick Replies */}
                {Array.isArray(welcomeMessageDetails.quickReplies) &&
                  welcomeMessageDetails.quickReplies.length > 0 && (
                    <div>
                      <span className="font-semibold block mb-1">
                        Quick Replies:
                      </span>
                      <ul className="list-disc pl-5 space-y-1">
                        {welcomeMessageDetails.quickReplies.map(
                          (reply, index) => (
                            <li
                              key={index}
                              className="break-words whitespace-normal max-w-full text-sm leading-relaxed"
                            >
                              <span className="font-medium">Title:</span>{" "}
                              <span className="break-words">
                                {reply.title || "N/A"}
                              </span>
                              <br />
                              <span className="font-medium">Payload:</span>{" "}
                              <span className="break-words">
                                {reply.payload || "N/A"}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Right Panel - Chat Preview */}
          <div className="md:w-[400px] h-[667px] rounded-[2rem] border-4 border-black shadow-lg flex flex-col overflow-hidden relative bg-white">
            {/* Top Status Bar */}
            <div className="text-center text-xs text-gray-500 flex justify-between items-center px-4 py-2">
              <p>10:32 AM</p>
              <div className="flex space-x-1">
                <AccessAlarmIcon className="text-gray-500" fontSize="small" />
                <WifiIcon className="text-gray-500" fontSize="small" />
                <Battery90Icon className="text-gray-500" fontSize="small" />
              </div>
            </div>

            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40?img=12"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Lucky Shrub
                  </h3>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <PhoneIcon fontSize="small" />
                <VideocamIcon fontSize="small" />
                <MenuIcon fontSize="small" />
              </div>
            </div>

            {/* Chat Messages (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 flex flex-col justify-end">
              <div className="text-xs text-gray-400 text-center">
                You opened this conversation through an ad. We're here to help
                you with any questions or details you need — feel free to ask!
              </div>

              <div className="flex justify-start">
                {welcomeMessageDetails.text && (
                  <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-xl max-w-[75%] break-words">
                    <p className="text-sm" >{welcomeMessageDetails.text}</p>
                    {welcomeMessageDetails.quickReplies.map((reply, index) => (
                      <div
                        key={index}
                        className="mt-2 text-sm flex items-center w-full p-1"
                      >
                        <button className="rounded-lg px-2 text-sm p-1 bg-white font-semibold break-words whitespace-normal text-left w-full">
                          {reply.title}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Input Area (Fixed Bottom) */}
            <div className="px-3 py-2 mb-4">
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-sm w-full">
                <PhotoCameraIcon
                  sx={{ fontSize: 20, color: "#4588E7" }}
                  className="text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Message..."
                  className="flex-grow bg-transparent outline-none text-sm placeholder-gray-500 px-2"
                />
                <FaRegFaceSmile className="text-gray-400" />
              </div>
            </div>
            <div className="w-24 h-1.5 bg-gray-800 rounded-full mx-auto absolute bottom-2 left-0 right-0" />
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeMsgAd;
