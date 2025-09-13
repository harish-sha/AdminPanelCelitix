import { Textarea } from "@/components/ui/textarea";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React, { useEffect, useRef } from "react";
import { extractVariable } from "./helper/extractVariable";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";

export const TextNodeContent = ({
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
  useEffect(() => {
    const variable = extractVariable({ message: nodesInputData[id]?.message });

    if (!variable || variable == "") {
      return;
    }

    addVariable(variable);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        variable: variable,
      },
    }));
  }, []);
  const handleAddVariable = (e: any) => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        variable: e,
      },
    }));
    if (!e) return;
    const newTag = `{{${e}}}`;

    const updatedMessage = (nodesInputData[id]?.message || "") + newTag;

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        message: updatedMessage,
      },
    }));
  };

  function addFormat(formatType: string) {
    if (!inputRef.current) return;
    const input = nodesInputData[id]?.message || "";
    if (input?.length >= 200) return;

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
    if (input?.length >= 200) return;

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

    // requestAnimationFrame(() => {
    //   inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    //   inputEl.focus();
    // });

    inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    inputEl.focus();

    // setTimeout(() => {
    //   inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    //   inputEl.focus();
    // }, 0);
  }
  return (
    <div className="flex flex-col gap-2">
      <div>
        <label
          htmlFor="textBox"
          className="text-sm font-medium text-gray-800 font-p mb-2"
        >
          Message
        </label>
        <Textarea
          id="textBox"
          placeholder="Enter message"
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
          className="resize-none w-full h-30"
          maxLength={200}
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

      {/* <Variable variable={nodesInputData[id]?.variable} message={nodesInputData[id]?.message} /> */}
    </div>
  );
};
