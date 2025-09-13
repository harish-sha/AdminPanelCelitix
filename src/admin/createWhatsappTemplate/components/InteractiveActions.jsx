import { useEffect } from "react";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";

import CustomTooltip from "../../components/CustomTooltip";
import VariableManager from "./VariableManager";
import VariableManagerUrl from "./VariableManagerUrl";

const InteractiveActions = ({
  interactiveAction,
  setInteractiveAction,
  phoneNumber,
  setPhoneNumber,
  phoneTitle,
  setPhoneTitle,
  url,
  setUrl,
  urlTitle,
  setUrlTitle,
  quickReplies,
  setQuickReplies,
  urlValid,
  validateUrl,
  handlePhoneNumberChange,
  handleQuickReplyChange,
  addQuickReply,
  removeQuickReply,
  selectedTemplateType,
  setUrlVariables,
}) => {
  // useEffect(() => {
  //   if (interactiveAction !== "all" || selectedTemplateType) {
  //     setPhoneNumber("");
  //     setPhoneTitle("");
  //     setUrl("");
  //     setUrlTitle("");
  //     setQuickReplies([]);
  //   }
  // }, [
  //   interactiveAction,
  //   selectedTemplateType,
  //   setPhoneNumber,
  //   setPhoneTitle,
  //   setUrl,
  //   setUrlTitle,
  //   setQuickReplies,
  // ]);
  const updateVariables = (updatedVariables) => {
    // if(u)
    setUrlVariables(updatedVariables);
    const previewFormat = url.replace(/{#(.*?)#}/g, (match, id) => {
      const variable = updatedVariables.find((v) => v.id === id);
      return variable ? `[${variable.value || id}]` : match;
    });
    // onPreviewUpdate(previewFormat);
  };
  return (
    <div className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-md ">
      {/* Header */}
      <div className="flex items-center mb-2">
        <label className="text-base font-medium text-gray-700">
          Interactive Actions
        </label>
        <CustomTooltip
          title=" Maximum 25 characters are allowed"
          placement="right"
          arrow
        >
          <span className="ml-2">
            <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
          </span>
        </CustomTooltip>
      </div>
      <p className="mb-4 text-sm text-gray-500">
        Add actions like phone calls, URLs, or quick replies to your template.
      </p>

      {/* Action Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-4 mb-4">
        {["none", "callToActions", "quickReplies", "all"].map((action) => (
          <label
            key={action}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              id="interactiveAction"
              type="radio"
              name="interactiveAction"
              value={action}
              checked={interactiveAction === action}
              onChange={() => setInteractiveAction(action)}
              className="w-4 h-4"
            />
            <span className="text-sm capitalize">
              {action.replace(/([A-Z])/g, " $1")}
            </span>
          </label>
        ))}
      </div>

      {/* Call to Actions */}
      {(interactiveAction === "callToActions" ||
        interactiveAction === "all") && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                id="templateAddPhoneNumber"
                name="templateAddPhoneNumber"
                className="px-3 py-1 text-sm text-white bg-blue-400 rounded-lg hover:bg-blue-600 "
                onClick={() => setPhoneNumber(phoneNumber || "+91")}
              >
                Add Phone Number
              </button>
              <button
                id="templateAddUrl"
                name="templateAddUrl"
                className="px-3 py-1 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => setUrl("https://")}
              >
                Add URL
              </button>
            </div>

            {/* Phone Number Section */}
            {phoneNumber && (
              <div className="relative p-3 border border-gray-300 rounded-md shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <AiOutlineClose
                    className="text-gray-500 cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setPhoneNumber("");
                      setPhoneTitle("");
                    }}
                  />
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-2">
                  <input
                    id="templatePhoneNumberTitle"
                    name="templatePhoneNumberTitle"
                    type="text"
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                    placeholder="Button Title"
                    value={phoneTitle}
                    onChange={(e) => setPhoneTitle(e.target.value)}
                    maxLength={25}
                  />
                  <input
                    id="templatePhoneNumber"
                    name="templatePhoneNumber"
                    type="text"
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                    placeholder="Phone Number (+919876543210)"
                    value={phoneNumber}
                    onChange={(e) => {
                      if (!e.target.value) {
                        setPhoneNumber("+");
                        return;
                      }
                      const value = e.target.value;
                      if (/^\+?[0-9]*$/.test(value)) {
                        setPhoneNumber(value);
                      }
                    }}
                    maxLength={16}
                  />
                </div>
              </div>
            )}

            {/* URL Section */}
            {url && (
              <div className="relative p-3 border border-gray-300 rounded-md shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    URL Title
                  </label>
                  <AiOutlineClose
                    className="text-gray-500 cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setUrl("");
                      setUrlTitle("");
                    }}
                  />
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-2">
                  <input
                    id="templateUrlTitle"
                    name="templateUrlTitle"
                    type="text"
                    className="w-full px-2 py-1 mb-2 text-sm border border-gray-300 rounded"
                    placeholder="Button Title"
                    value={urlTitle}
                    onChange={(e) => setUrlTitle(e.target.value)}
                    maxLength={25}
                  />
                  <input
                    id="templateUrl"
                    name="templateUrl"
                    type="text"
                    className="w-full px-2 py-1 mb-2 text-sm border border-gray-300 rounded"
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => {
                      if (!e.target.value) {
                        setUrl("https://");
                        return;
                      }
                      setUrl(e.target.value);
                      validateUrl(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-5">
                  <VariableManagerUrl
                    templateFormat={url}
                    setTemplateFormat={setUrl}
                    onUpdateVariables={updateVariables}
                    allowSingleVariable={true}
                  />
                </div>
              </div>
            )}
          </div>
        )}

      {/* Quick Replies */}
      {(interactiveAction === "quickReplies" ||
        interactiveAction === "all") && (
          <div className="mt-4 space-y-4">
            <h6 className="mb-2 text-sm font-medium text-gray-700">
              Quick Replies
            </h6>
            {quickReplies.map((reply, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  id={`quickReply${index}`}
                  name={`quickReply${index}`}
                  type="text"
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                  placeholder={`Quick Reply ${index + 1}`}
                  value={reply}
                  onChange={(e) => handleQuickReplyChange(index, e.target.value)}
                  maxLength={25}
                />
                <AiOutlineClose
                  className="text-gray-500 cursor-pointer hover:text-red-500"
                  onClick={() => removeQuickReply(index)}
                />
              </div>
            ))}
            {quickReplies.length < 3 && (
              <button
                className="px-3 py-1 text-sm text-white bg-blue-400 rounded-lg hover:bg-blue-500"
                onClick={addQuickReply}
              >
                Add Quick Reply
              </button>
            )}
          </div>
        )}
    </div>
  );
};

export default InteractiveActions;
