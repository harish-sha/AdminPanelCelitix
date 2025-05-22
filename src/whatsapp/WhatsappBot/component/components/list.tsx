import { Textarea } from "@/components/ui/textarea";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { set } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { extractVariable } from "./helper/extractVariable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { Handle, Position } from "@xyflow/react";

// import { Handle, Position } from "@xyflow/react";

export const List = ({
  id,
  nodesInputData,
  setNodesInputData,
  allVariables,
  addVariable,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  allVariables: any[];
  addVariable: (data: String) => void;
}) => {
  console.log("asd", nodesInputData[id]);
  const fileInputRef = useRef(null);
  const [options, setOptions] = useState([
    {
      option: "",
      value: "",
    },
  ]);

  function handleOptionAdd() {
    if (options.length >= 10) {
      return;
    }
    setOptions((prev) => [
      ...prev,
      {
        option: "",
        value: "",
      },
    ]);
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

  function handleOptionInput(e: any, type: string, index: number) {
    if (options.length === 0) return;

    const newOptions = [...options];
    newOptions[index][type] = e;
    setOptions(newOptions);
  }

  useEffect(() => {
    const nodeData = nodesInputData[id];

    // if (!nodeData) return;

    const variable = extractVariable({ message: nodeData?.message });

    variable && addVariable(variable);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        variable,
        text: nodeData?.listHeading,
      },
    }));
    const listItems = [];
    nodeData?.options?.forEach((item: any) => {
      const data = {
        option: "",
        value: "",
      };
      data.option = item.option;
      data.value = item.value;
      listItems.push(data);
    });

    setOptions(listItems);
  }, []);

  useEffect(() => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        options: options,
      },
    }));
  }, [options]);

  const handleAddVariable = (e: any) => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        variable: e,
      },
    }));
    const newTag = `{{${e}}}`;
    if (!e) return;
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        message: (prev[id]?.message || "") + newTag,
      },
    }));
  };

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        text: file,
      },
    }));
  };

  return (
    <>
      <div className="flex gap-2">
        <AnimatedDropdown
          id="type"
          name="type"
          label="Type"
          options={[
            { label: "Text", value: "text" },
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

        {nodesInputData[id]?.type !== "text" && (
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
        )}
        {nodesInputData[id]?.selectedOption !== "upload" && (
          <InputField
            id="text"
            name="text"
            label={nodesInputData[id]?.type === "text" ? "Text" : "URL"}
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
              ref={fileInputRef}
              className="w-[250px]"
            />
          </div>
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

      <div>
        <AnimatedDropdown
          id="selectVaribleDropdown"
          name="selectVaribleDropdown"
          label="Select Variable"
          options={allVariables.map((v) => ({
            label: v,
            value: v,
          }))}
          value={nodesInputData[id]?.variable}
          onChange={(e: any) => {
            handleAddVariable(e);
          }}
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
                id="option"
                name="option"
                label={`Option-${index + 1}`}
                value={options[index]?.option}
                onChange={(e: { target: { value: any } }) => {
                  handleOptionInput(e.target.value, "option", index);
                }}
              />
              <InputField
                id="value"
                name="value"
                label={`Value-${index + 1}`}
                value={options[index]?.value}
                onChange={(e: { target: { value: any } }) => {
                  handleOptionInput(e.target.value, "value", index);
                }}
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
            </div>
          ))}
        </div>
      </div>

      {/* <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-800 mb-1">Option Nodes</h4>
        <div className="flex flex-col gap-2">
          {options.map((opt, idx) => (
            <div
              key={`option-node-${idx}`}
              className="relative bg-gray-100 px-3 py-2 rounded border text-sm"
            >
              {opt.option || `Option ${idx + 1}`}
              <Handle
                type="source"
                position={Position.Right}
                id={`opt-${idx}`}
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: -6,
                  background: "#333",
                }}
              />
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};
