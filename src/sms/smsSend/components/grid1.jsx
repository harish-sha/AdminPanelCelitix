import InputField from "@/components/layout/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { RadioButton } from "primereact/radiobutton";
import { Variable } from "./Variable";
import { all } from "axios";
import { GenerateAiContent } from "@/components/common/CustomContentGenerate";
import { useState } from "react";

export const Grid1 = ({
  inputDetails,
  setInputDetails,
  headers,
  allTemplates,
}) => {
  const [ai, setAi] = useState({
    isGenerating: false,
    text: "",
    response: "",
    typing: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  const closePanel = () => {
    setIsOpen(false);
    setAi({
      isGenerating: false,
      text: "",
      response: "",
      typing: false,
    });
  };
  return (
    <div className="border w-full p-2 space-y-2 rounded-lg shadow-md">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
          <RadioButton
            inputId="smsTypetrans"
            name="smsTypetrans"
            value={1}
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
        <InputField
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
        />
        {(inputDetails.templateType === 1 ||
          inputDetails.templateType === 2) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <DropdownWithSearch
              label="DLT Template"
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
            />
          </div>
          // </div>
        )}

        {inputDetails.templateType === 3 && (
          <div>
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
            headers={headers}
          />
          <GenerateAiContent
            ai={ai}
            setAi={setAi}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            right={0.5}
            bottom={1}
            setMessageContent={(e) => {
              setInputDetails((prev) => ({
                ...prev,
                message: e,
              }));
            }}
            messageContent={inputDetails?.message}
            length={1000}
            type="carousel"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="border text-sm border-gray-300 rounded-md p-1.5">
            Characters: {inputDetails?.message?.length}/1000
          </div>
          <div className="border text-sm border-gray-300 rounded-md p-1.5">
            SMS Units: {Math.ceil(inputDetails?.message?.length / 153)}
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
