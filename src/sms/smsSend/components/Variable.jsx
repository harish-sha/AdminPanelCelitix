import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import InputVariable from "@/whatsapp/whatsappLaunchCampaign/components/InputVariable";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Variable = ({ setInputDetails, inputDetails, headers }) => {
  const [allHeaders, setAllHeaders] = useState([]);

  useEffect(() => {
    const isHeaderAvailable = headers?.length;

    if (isHeaderAvailable) {
      setAllHeaders(headers);
    } else {
      setAllHeaders(["firstName", "lastName", "mobile"]);
    }
  }, [headers]);

  function handleAddVariable(e) {
    const newTag = `{#${e}#}`;

    if (inputDetails?.length + newTag.length > 1000) return;

    setInputDetails((prev) => ({
      ...prev,
      message: prev.message + newTag,
    }));
  }

  return (
    <div className="relative">
      <label
        htmlFor="message"
        className="block text-sm font-semibold text-gray-700"
      ></label>
      <UniversalTextArea
        label="Message*"
        id="manage"
        name="manage"
        placeholder="Type your message here..."
        className="resize-none h-32 pr-5"
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

      <div className="absolute top-6 -right-0 text-gray-400 cursor-pointer">
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
