import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InputField from "@/whatsapp/components/InputField";
import { RadioButton } from "primereact/radiobutton";
import React from "react";
import { Variable } from "./variable";

export const Grid1 = ({ inputDetails, setInputDetails, allTemplates }) => {
  function getSmsUnit(message: string, isUnicode = false) {
    const length = message?.length;

    const unicodeLimits = [70, 134, 201, 268, 335, 402, 469, 536, 603, 670];

    const gsmLimits = [160, 306, 459, 612, 765, 918, 1071, 1224, 1377, 1530];

    const limits = isUnicode ? unicodeLimits : gsmLimits;

    for (let i = 0; i < limits.length; i++) {
      if (length <= limits[i]) {
        return i + 1;
      }
    }
    return Math.ceil(length / (isUnicode ? 67 : 153));
  }
  return (
    <div className="border p-2 space-y-2 rounded-lg shadow-md w-2/3">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
          <RadioButton
            inputId="smsTypetrans"
            name="smsTypetrans"
            value={1}
             disabled={true}
            onChange={() => {
              setInputDetails({
                campaingName: "",
                templateId: "",
                entityId: "",
                unicode: 0,
                message: "",
                senderId: "",
                sender: [],
                templateType: 1,
              });
            }}
            checked={inputDetails.templateType === 1}
          />
          <label
            htmlFor="smsTypetrans"
            className="text-gray-700 font-medium text-sm cursor-pointer"
          >
            Transactional
          </label>
        </div>
        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
          <RadioButton
           disabled={true}
            inputId="smsTypepro"
            name="smsTypepro"
            value={2}
            onChange={() => {
              setInputDetails({
                campaingName: "",
                templateId: "",
                entityId: "",
                unicode: 0,
                message: "",
                senderId: "",
                sender: [],
                templateType: 2,
              });
            }}
            checked={inputDetails.templateType === 2}
          />
          <label
            htmlFor="smsTypepro"
            className="text-gray-700 font-medium text-sm cursor-pointer"
          >
            Promotional
          </label>
        </div>
        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
          <RadioButton
           disabled={true}
            inputId="smsTypeIntl"
            name="smsTypeIntl"
            value={3}
            onChange={() => {
              setInputDetails({
                campaingName: "",
                templateId: "",
                entityId: "",
                unicode: 0,
                message: "",
                senderId: "",
                sender: [],
                templateType: 3,
              });
            }}
            checked={inputDetails.templateType === 3}
          />
          <label
            htmlFor="smsTypeIntl"
            className="text-gray-700 font-medium text-sm cursor-pointer"
          >
            International
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* <InputField
          label="Campaign Name"
          id="campaignName"
          name="campaignName"
          value={inputDetails.campaingName}
          onChange={(e) => {
            setInputDetails((prev) => ({
              ...prev,
              campaingName: e.target.value,
            }));
          }}
          placeholder="Enter campaign name"
        /> */}
        {(inputDetails.templateType === 1 ||
          inputDetails.templateType === 2) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <DropdownWithSearch
              label="DLT Template"
               disabled={true}
              id="Dlt Template"
              name="Dlt Template"
              options={allTemplates?.map((template) => ({
                label: template.templateName,
                value: template.templateId,
              }))}
              value={inputDetails.templateId}
              onChange={(e) => {
                const entity = allTemplates.find(
                  (temp) => temp.templateId === e
                );
                setInputDetails((prev) => ({
                  ...prev,
                  templateId: e,
                  entityId: entity?.entityId,
                }));
              }}

            />
            {/* <div className="z-99999"> */}
            <DropdownWithSearch
              label="Sender Id"
              id="senderid"
              name="senderid"
              placeholder="Select Sender id"
              options={inputDetails?.sender?.map((sender) => ({
                label: sender,
                value: sender,
              }))}
              value={inputDetails.senderId}
              onChange={(e) => {
                setInputDetails((prev) => ({
                  ...prev,
                  senderId: e,
                }));
              }}
               disabled={true}
            />
          </div>
          // </div>
        )}

        {inputDetails.templateType === 3 && (
          <div>
            <InputField
              label="Sender Id"
               disabled={true}
              id="senderid"
              name="senderid"
              placeholder="Select Sender id"
              value={inputDetails.senderId}
              onChange={(e) => {
                setInputDetails((prev) => ({
                  ...prev,
                  senderId: e.target.value,
                }));
              }}
              maxLength={"13"}

            />
          </div>
        )}
        <div className="flex gap-2 flex-col mt-2">
          <label htmlFor="" className="text-sm font-medium text-gray-700">
            Language
          </label>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="englishLanguage"
                name="englishLanguage"
                value="0"
                onChange={() => {
                  setInputDetails((prev) => ({
                    ...prev,
                    unicode: 0,
                  }));
                }}
                disabled
                checked={inputDetails.unicode === 0}
              />
              <label
                htmlFor="englishLanguage"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                English
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="unicode"
                name="unicode"
                value="1"
                onChange={() => {
                  setInputDetails((prev) => ({
                    ...prev,
                    unicode: 1,
                  }));
                }}
                disabled
                checked={inputDetails.unicode === 1}
              />
              <label
                htmlFor="unicode"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Unicode
              </label>
            </div>
          </div>
        </div>

        <div className="relative">
          <Variable
            setInputDetails={setInputDetails}
            inputDetails={inputDetails?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="border text-sm border-gray-300 rounded-md p-1.5">
            Characters: {inputDetails?.message?.length}/1000
          </div>
          <div className="border text-sm border-gray-300 rounded-md p-1.5">
            SMS Units:
            {getSmsUnit(
              inputDetails?.message,
              inputDetails?.unicode === 0 ? false : true
            )}
          </div>
          <div className="border text-sm border-gray-300 rounded-md p-1.5">
            Entity ID: {inputDetails.entityId || "N/A"}
          </div>
          <div className="border text-sm border-gray-300 rounded-md p-1.5">
            Template ID: {inputDetails.templateId || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};
