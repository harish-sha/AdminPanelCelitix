import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React from "react";

export const Broadcast = ({ setBasicDetails, basicDetails, voiceListData }) => {
  return (
    <>
      <div>
        <div className="w-full mt-4">
          <AnimatedDropdown
            id="sb"
            name="sb"
            options={voiceListData?.map((data) => ({
              value: data.srNo,
              label: data.fileName,
            }))}
            value={basicDetails.simpleBroadcast}
            onChange={(value) => {
              setBasicDetails((prev) => ({
                ...prev,
                simpleBroadcast: value,
              }));
              //   handleSelectSBVoice(value);
            }}
            placeholder="Select Voice Clip 1"
            label="Voice Clip 1"
            disabled={false}
          />
        </div>
        {basicDetails.templateType === "multibroadcast" && (
          <div className="w-full mt-4">
            <AnimatedDropdown
              id="mb"
              name={"mb"}
              options={voiceListData?.map((data) => ({
                value: data.srNo,
                label: data.fileName,
              }))}
              value={basicDetails.multiBroadcast}
              onChange={(value) => {
                setBasicDetails((prev) => ({
                  ...prev,
                  multiBroadcast: value,
                }));
                //   handleSelectMBVoice(value);
              }}
              placeholder="Select Voice Clip 2"
              label="Voice Clip 2"
            />
          </div>
        )}
      </div>
    </>
  );
};
