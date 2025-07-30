import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import React from "react";
import InputVariable from "../../../InputVariable";

export const Variable = ({ setInputDetails, inputDetails, headers }) => {
  function handleAddVariable(e) {
    const message = inputDetails;
    const newMessage = message + `{#${e}#}`;
    setInputDetails((prev) => ({
      ...prev,
      message: newMessage,
    }));
  }
  return (
    <div className="">
      <label
        htmlFor="message"
        className="block text-sm font-semibold text-gray-700"
      ></label>
      <div className="relative">
        <UniversalTextArea
          label="Message*"
          id="manage"
          disabled={true}
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
          col={1}
          row={1}
        />

        <div className="absolute top-[1.89rem] right-0.5">
          <InputVariable
            onSelect={(e) => {
              handleAddVariable(e);
            }}
            variables={headers}
          />
        </div>
      </div>
    </div>
  );
};
