import React, { useEffect, useRef } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalButton from "@/components/common/UniversalButton";
import { AiOutlineEye } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Url = ({
  id,
  nodesInputData,
  setNodesInputData,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        type: nodesInputData[id]?.type,
        // variableId: nodesInputData[id]?.variableName,
      },
    }));
    // type = nodesInputData[id]?.type;
    // variableId = nodesInputData[id]?.variableName;
  }, []);

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        fileUrl: file,
      },
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="w-1/3">
          <AnimatedDropdown
            id="type"
            name="type"
            label="Type"
            tooltipContent="Select URL Type"
            options={[
              //   { label: "Text", value: "text" },
              { label: "Image", value: "image" },
              { label: "Video", value: "video" },
              { label: "Document", value: "document" },
            ]}
            value={nodesInputData[id]?.urlbuttonType}
            onChange={(e: any) => {
              setNodesInputData((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  urlbuttonType: e,
                },
              }));
            }}
          />
        </div>
        {(nodesInputData[id]?.urlbuttonType === "image" ||
          nodesInputData[id]?.urlbuttonType === "document" ||
          nodesInputData[id]?.urlbuttonType === "video") && (
          <>
            <div className="w-1/3">
              <AnimatedDropdown
                id="selectChoice"
                name="selectChoice"
                tooltipContent="Select Choice"
                label="Select Choice"
                options={[
                  { value: "url", label: "Enter Url" },
                  { value: "upload", label: "Upload" },
                ]}
                value={nodesInputData[id]?.selectedOption}
                onChange={(e) => {
                  setNodesInputData(() => ({
                    ...nodesInputData,
                    [id]: {
                      ...nodesInputData[id],
                      selectedOption: e,
                      text: "",
                    },
                  }));
                }}
              />
            </div>
            {nodesInputData[id]?.selectedOption === "upload" && (
              <div className="flex items-end gap-2">
                <div className="flex flex-col gap-2 mt-0">
                  <Label
                    htmlFor="uplaodfile"
                    className="text-sm font-medium text-gray-800 font-"
                  >
                    Upload File
                  </Label>
                  <Input
                    type="file"
                    id="uplaodfile"
                    name="uplaodfile"
                    onChange={handleFileUpload}
                    accept={`${nodesInputData[id]?.type}/*`}
                    required
                    ref={fileRef}
                    className="w-[250px]"
                  />
                </div>
                <button onClick={() => {}} className="cursor-pointer">
                  <AiOutlineEye size={20} className="text-green-700" />
                </button>
              </div>
            )}

            {nodesInputData[id]?.selectedOption === "url" && (
              <div className="flex items-end gap-2">
                <InputField
                  id="text"
                  name="text"
                  tooltipContent="Enter URL of media"
                  label={"URL"}
                  value={nodesInputData[id]?.urlbuttonMediaUrl}
                  onChange={(e: { target: { value: any } }) => {
                    setNodesInputData((prev) => ({
                      ...prev,
                      [id]: {
                        ...prev[id],
                        urlbuttonMediaUrl: e.target.value,
                      },
                    }));
                  }}
                />
                <button onClick={() => {}} className="cursor-pointer">
                  <AiOutlineEye size={20} className="text-green-700" />
                </button>
              </div>
            )}
          </>
        )}
        {/* {nodesInputData[id]?.urlbuttonType === "text" && (
          <div className="flex items-end gap-2 w-full">
            <InputField
              id="text"
              name="text"
              tooltipContent="Max 20 characters"
              label={"URL Header"}
              value={nodesInputData[id]?.urlbuttonText}
              onChange={(e: { target: { value: any } }) => {
                setNodesInputData((prev) => ({
                  ...prev,
                  [id]: {
                    ...prev[id],
                    urlbuttonText: e.target.value,
                  },
                }));
              }}
              maxLength="20"
            />
            <p className="text-xs">
              {nodesInputData[id]?.text?.length || 0}/20
            </p>
          </div>
        )} */}
      </div>

      <div>
        <div>
          <label className="text-sm font-medium text-gray-900 mb-2 ml-2">
            Body Text
          </label>
          <Textarea
            id="body"
            placeholder="Body Text"
            value={nodesInputData[id]?.urlbuttonbody}
            onChange={(e: { target: { value: any } }) => {
              setNodesInputData((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  urlbuttonbody: e.target.value,
                },
              }));
            }}
            className="resize-none"
            maxLength={1024}
          />
        </div>
        <p className="text-xs mt-2">
          {nodesInputData[id]?.message?.length || 0}/1024
        </p>
      </div>

      <InputField
        id="text"
        name="text"
        tooltipContent="URL Button Text"
        label={"URL Button Text"}
        value={nodesInputData[id]?.urlbuttonText}
        onChange={(e: { target: { value: any } }) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              urlbuttonText: e.target.value,
            },
          }));
        }}
        maxLength="20"
      />
      <InputField
        id="text"
        name="text"
        type="url"
        tooltipContent="Button URL"
        label={"Button URL"}
        value={nodesInputData[id]?.urlbuttonUrl}
        onChange={(e: { target: { value: any } }) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              urlbuttonUrl: e.target.value,
            },
          }));
        }}
        maxLength="20"
      />

      <div className="flex items-end gap-2 w-full">
        <InputField
          id="text"
          name="text"
          tooltipContent="URL Footer Characters max 20 characters"
          label={"URL Footer"}
          value={nodesInputData[id]?.urlbuttonFooter}
          onChange={(e: { target: { value: any } }) => {
            setNodesInputData((prev) => ({
              ...prev,
              [id]: {
                ...prev[id],
                urlbuttonFooter: e.target.value,
              },
            }));
          }}
          maxLength="20"
        />
        <p className="text-xs">
          {nodesInputData[id]?.urlbuttonFooter?.length || 0}/20
        </p>
      </div>
    </div>
  );
};
