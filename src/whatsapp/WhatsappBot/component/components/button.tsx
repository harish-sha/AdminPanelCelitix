import { Textarea } from "@/components/ui/textarea";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { set } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ButtonNodeContent = ({
  id,
  nodesInputData,
  setNodesInputData,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const [options, setOptions] = useState([]);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleOptionAdd() {
    if (options.length >= 3) {
      return;
    }
    setOptions((prev) => [...prev, ""]);
  }

  function handleOptionDelete(index: number) {
    if (options.length === 0) return;
    if (options.length === 1) {
      return;
    }

    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  }

  function handleOptionInput(e: any, index: number) {
    if (options.length === 0) return;

    const newOptions = [...options];
    newOptions[index] = e;
    setOptions(newOptions);
  }

  useEffect(() => {
    setOptions(
      nodesInputData[id]?.buttonTexts ? nodesInputData[id]?.buttonTexts : [""]
    );
  
    const nodeType = {
      imageUrl: "image",
      videoUrl: "video",
      documentUrl: "document",
    };
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        selectedOption: nodesInputData[id]?.selectedOption,
        type: nodesInputData[id]?.buttonType,
        text:
          nodesInputData[id]?.imageUrl ||
          nodesInputData[id]?.videoUrl ||
          nodesInputData[id]?.documentUrl,
      },
    }));
  }, []);

  useEffect(() => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        buttonTexts: options,
      },
    }));
  }, [options]);

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        fileUrl: file,
        // text: "d",
      },
    }));
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <AnimatedDropdown
          id="type"
          name="type"
          label="Type"
          options={[
            { label: "Image", value: "image" },
            { label: "Video", value: "video" },
            { label: "Document", value: "document" },
          ]}
          value={nodesInputData[id]?.type}
          onChange={(e: any) => {
            setNodesInputData((prev) => ({
              ...prev,
              [id]: {
                ...prev[id],
                type: e,
              },
            }));
          }}
        />

        <AnimatedDropdown
          id="selectChoice"
          name="selectChoice"
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

        {nodesInputData[id]?.selectedOption === "upload" && (
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
        )}

        {nodesInputData[id]?.selectedOption === "url" && (
          <InputField
            id="text"
            name="text"
            label={"URL"}
            value={nodesInputData[id]?.text}
            onChange={(e: { target: { value: any } }) => {
              setNodesInputData((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  text: e.target.value,
                },
              }));
            }}
          />
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-900 mb-2 ml-2">
          Body
        </label>
        <Textarea
          id="body"
          placeholder="Body"
          value={nodesInputData[id]?.message}
          onChange={(e: { target: { value: any } }) => {
            setNodesInputData((prev) => ({
              ...prev,
              [id]: {
                ...prev[id],
                message: e.target.value,
              },
            }));
          }}
          className="resize-none"
        />
      </div>

      <div className="w-full mt-2">
        <div className="flex justify-end">
          <button onClick={handleOptionAdd}>
            <AddIcon />
          </button>
        </div>
        <div className="space-y-2 ">
          {options?.map((option, index) => (
            <div className="flex gap-2 justify-center items-center" key={index}>
              <InputField
                id="buttonText"
                name="buttonText"
                label={`Button-${index + 1}`}
                value={options[index]}
                onChange={(e: { target: { value: any } }) => {
                  handleOptionInput(e.target.value, index);
                }}
                placeholder="Enter Button Text"
              />

              {options.length > 1 && (
                <Button
                  id="deleteInput"
                  name="deleteInput"
                  variant="destructive"
                  onClick={() => handleOptionDelete(index)}
                  className="mt-7"
                >
                  <MdOutlineDeleteForever />
                </Button>
              )}
              {/* <button
                className="mt-6"
                onClick={() => {
                  handleOptionDelete(index);
                }}
              >
                <MdOutlineDeleteForever
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  size={20}
                />
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
