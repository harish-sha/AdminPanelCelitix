import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import React from "react";

export const TTS = ({ setBasicDetails, basicDetails }) => {
  return (
    <>
      <div className="my-2">
        <div className="relative">
          <UniversalTextArea
            id={"tts"}
            name={"tts"}
            value={basicDetails.tts}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 1000) {
                setBasicDetails((prev) => ({
                  ...prev,
                  tts: value,
                }));
              }
            }}
             disabled={true}
            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
            placeholder="Enter text..."
            label="Voice Text"
            col={1}
            row={5}

            // tooltipContent="Enter Value which you want to convert in (TTS) on select variable either convert the text dynamic"
          />
        </div>
        <div className="text-gray-600 text-xs flex justify-end">
          Chars: {basicDetails?.tts?.length}/1000
        </div>
      </div>
    </>
  );
};
