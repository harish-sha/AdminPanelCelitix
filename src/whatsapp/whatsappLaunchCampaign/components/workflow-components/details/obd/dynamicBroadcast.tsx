import InputField from "@/components/layout/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React from "react";

export const DynamicBroadcast = ({
  setBasicDetails,
  basicDetails,
  dynamicVoiceList,
  dynamicvoiceVariables,
  handleFetchDynamicVoiceVar,
  variableRef,
  handleVoiceVariableChange,
}) => {
  return (
    <>
      <div>
        <AnimatedDropdown
          label="Voice Clip:"
          id="voiceClip"
          name="voiceClip"
          options={dynamicVoiceList.map((data) => ({
            value: data.srno,
            label: data.fileName,
          }))}
          value={basicDetails.dynamicBroadcast}
          onChange={(value) => {
            setBasicDetails((prev) => ({
              ...prev,
              dynamicBroadcast: value,
            }));
            value && handleFetchDynamicVoiceVar(value);
          }}
          placeholder="Select Voice Clip"
        />
        <div className="mt-2 mb-2">
          {basicDetails.dynamicBroadcast && (
            <div className="border-2 p-2 rounded-md border-dashed border-gray-500 relative">
              <div className="text-red-800 text-xs font-medium text-center">
                Please fill all the variable fields! (remaining sequence are the
                voice clips)
              </div>
              {dynamicvoiceVariables.map((item, index) => {
                return (
                  <div
                    key={`variable-${item.sequence}`}
                    className="relative mt-4"
                  >
                    <InputField
                      id={`variable-${item.sequence}`}
                      name={`variable-${item.sequence}`}
                      label={`Sequence Variable ${item.sequence}`}
                      value={item.variableSampleValue}
                      onChange={(e) =>
                        handleVoiceVariableChange(index, e.target.value)
                      }
                      placeholder={`Enter value for variable ${item.sequence}`}
                      tooltipContent={`Sequence: ${item.sequence}`}
                      ref={(el) => {
                        if (el) variableRef.current[index] = el;
                      }}
                      maxLength={20}
                    />

                    {/* <div className="absolute top-7 right-0 z-10">
                      <DynamicObdVariable
                        variables={allHeaders}
                        selectVariable={(e) => {
                          handleDynamicVariableSelect(e, index);
                        }}
                      />
                    </div> */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
