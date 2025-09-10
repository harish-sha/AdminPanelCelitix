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
import { AiOutlineInfoCircle } from "react-icons/ai";
import CustomTooltip from "@/components/common/CustomTooltip";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
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
  const inputRef = useRef(null);
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

    listItems.length > 0
      ? setOptions(listItems)
      : setOptions([{ option: "", value: "" }]);
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

  function addFormat(formatType: string) {
    if (!inputRef.current) return;
    const input = nodesInputData[id]?.message || "";
    if (input?.length >= 4096) return;

    const inputEl = inputRef.current;
    const { selectionStart, selectionEnd } = inputEl;
    const selectedText = input?.substring(selectionStart, selectionEnd);
    const data = {
      bold: {
        start: "*",
        end: "*",
      },
      italic: {
        start: "_",
        end: "_",
      },
      strike: {
        start: "~",
        end: "~",
      },
    };
    const { start, end } = data[formatType];
    const newValue =
      input.substring(0, selectionStart) +
      start +
      selectedText +
      end +
      input.substring(selectionEnd);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        message: newValue,
      },
    }));

    requestAnimationFrame(() => {
      const pos = selectionEnd + start.length + end.length;
      inputEl.setSelectionRange(pos, pos);
      inputEl.focus();
    });
  }

  function insertEmoji(emoji: string) {
    if (!inputRef.current) return;
    const input = nodesInputData[id]?.message || "";
    if (input?.length >= 4096) return;

    const inputEl = inputRef.current;

    const start = inputEl.selectionStart;
    const end = inputEl.selectionEnd;

    const newText = input.substring(0, start) + emoji + input.substring(end);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        message: newText,
      },
    }));

    requestAnimationFrame(() => {
      inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
      inputEl.focus();
    });

    //  inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    //  inputEl.focus();

    // setTimeout(() => {
    //   inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    //   inputEl.focus();
    // }, 0);
  }
  return (
    <>
      <div className="flex gap-2">
        <div className="w-full">
          <InputField
            id="text"
            name="text"
            tooltipContent="List Heading"
            maxLength="20"
            // label={nodesInputData[id]?.type === "text" ? "List Heading" : "URL"}
            label={"List Heading"}
            value={nodesInputData[id]?.text}
            onChange={(e: { target: { value: any } }) => {
              setNodesInputData((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  type: "text",
                  text: e.target.value,
                },
              }));
            }}
          />
          <p className="text-xs mt-2">
            {nodesInputData[id]?.text?.length || 0}/20
          </p>
        </div>
        {/* <AnimatedDropdown
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
            label={nodesInputData[id]?.type === "text" ? "List Heading" : "URL"}
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
        )} */}
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
          maxLength={4096}
          className="resize-none"
          ref={inputRef}
        />
        <div className="items-center justify-start hidden gap-1 md:flex mt-2">
          <button
            onClick={() => {
              addFormat("bold");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatBoldOutlined />
          </button>
          <button
            onClick={() => {
              addFormat("italic");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatItalicOutlined />
          </button>
          <button
            onClick={() => {
              addFormat("strike");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatStrikethroughOutlined />
          </button>

          <div className="mr-2">
            <CustomEmojiPicker position="top" onSelect={insertEmoji} />
          </div>
        </div>
      </div>
      <p className="text-xs">{nodesInputData[id]?.message?.length || 0}/4096</p>

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
        <InputField
          id="text"
          name="text"
          tooltipContent="Give a footer for the list. Maximum 20 characters."
          maxLength="20"
          label={"List Footer"}
          value={nodesInputData[id]?.listFooter}
          onChange={(e: { target: { value: any } }) => {
            setNodesInputData((prev) => ({
              ...prev,
              [id]: {
                ...prev[id],
                listFooter: e.target.value,
              },
            }));
          }}
        />
        <p className="text-xs mt-2">
          {nodesInputData[id]?.listFooter?.length || 0}/20
        </p>
      </div>

      <div className="w-full mt-2">
        {/* <div className="flex justify-end">
          <button onClick={handleOptionAdd}>
            <AddIcon />
          </button>
        </div> */}
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-lg font-semibold mb-2">List Items</h1>
          <div className="flex justify-end">
            <button onClick={handleOptionAdd}>
              <AddIcon />
            </button>
          </div>
          <div className="mb-1">
            <CustomTooltip
              title={
                "For List Row: Supports text header type only. Maximum 60 characters. For List Items: Maximum 72 characters."
              }
              placement={"top"}
              arrow
            >
              <span>
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </span>
            </CustomTooltip>
          </div>
        </div>
        <div className="space-y-2 ">
          {options?.map((option, index) => (
            <div className="flex gap-2 justify-center items-center" key={index}>
              <InputField
                id="option"
                name="option"
                label={`Row-Title-${index + 1}`}
                value={options[index]?.option}
                onChange={(e: { target: { value: any } }) => {
                  handleOptionInput(e.target.value, "option", index);
                }}
              />
              <InputField
                id="value"
                name="value"
                label={`Row-Description-${index + 1}`}
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
