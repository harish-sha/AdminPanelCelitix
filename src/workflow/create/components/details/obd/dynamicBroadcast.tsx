import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React from "react";

export const DynamicBroadcast = ({
  setBasicDetails,
  basicDetails,
  voiceListData,
}) => {
  return (
    <>
      <div>
        <AnimatedDropdown
          label="Voice Clip:"
          id="voiceClip"
          name="voiceClip"
          options={[
            { value: "voiceclip1", label: "Voice Clip 1" },
            { value: "voiceclip2", label: "Voice Clip 2" },
            { value: "voiceclip3", label: "Voice Clip 3" },
            { value: "voiceclip4", label: "Voice Clip 4" },
          ]}
          value={basicDetails.dynamicBroadcast}
          onChange={(value) => {
            setBasicDetails((prev) => ({
              ...prev,
              dynamicBroadcast: value,
            }));
          }}
          placeholder="Select Voice Clip"
        />
        <div className="mt-2">{/* <DynamicValueBox /> */}</div>
      </div>
    </>
  );
};
