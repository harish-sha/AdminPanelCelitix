import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import InputVariable from "@/whatsapp/whatsappLaunchCampaign/components/InputVariable";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

export const Variable = ({ setInputDetails, inputDetails, headers }) => {
  const [allHeaders, setAllHeaders] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const isHeaderAvailable = headers?.length;

    if (isHeaderAvailable) {
      setAllHeaders(headers);
    } else {
      setAllHeaders(["firstName", "lastName", "mobile"]);
    }
  }, [headers]);

  function handleAddVariable(e) {
    if (!inputRef) return;
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const newTag = e;

    if (inputDetails?.length + newTag.length > 1000) return;

    const updatedMessage =
      inputDetails.substring(0, start) + newTag + inputDetails.substring(end);

    setInputDetails((prev) => ({
      ...prev,
      message: updatedMessage,
    }));

    const cursorPos = start + newTag.length;
    input.setSelectionRange(cursorPos, cursorPos);
    input.focus();
  }

  return (
    <div className="relative">
      <div className="">
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-700"
        ></label>
        <UniversalTextArea
          ref={inputRef}
          label="Message*"
          id="manage"
          name="manage"
          placeholder="Type your message here..."
          className="resize-none h-32 pr-7 scroll-ml-0.5 overflow-y-auto scrollbar-left"
          value={inputDetails}
          onChange={(e) => {
            if (e.target.value.length <= 1000) {
              setInputDetails((prev) => ({
                ...prev,
                message: e.target.value,
              }));
            }
          }}
        />
      </div>

      <div className="absolute top-7 -right-0 text-gray-400 cursor-pointer">
        <InputVariable
          onSelect={(e) => {
            handleAddVariable(e);
          }}
          variables={allHeaders}
        />
      </div>
    </div>
  );
};
