import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import React from "react";

export const Variable = ({ setInputDetails, inputDetails }) => {
  return (
    <div className="">
      <label
        htmlFor="message"
        className="block text-sm font-semibold text-gray-700"
      ></label>
      <UniversalTextArea
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
        col={1}
        row={1}
      />
    </div>
  );
};
