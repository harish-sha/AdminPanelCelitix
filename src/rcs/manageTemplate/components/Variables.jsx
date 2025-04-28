import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import Textarea from "@mui/joy/Textarea";
import { useEffect, useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

import { Dialog } from "primereact/dialog";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/whatsapp/components/InputField";
import { set } from "date-fns";

export const Variables = ({
  variables = [],
  setVariables,
  messageContent,
  setMessageContent,
  selectedCardIndex,
}) => {
  const [variablesData, setVariablesData] = useState([]);
  const MAX_LENGTH = 2500;
  const textBoxRef = useRef(null);

  const [userVariables, setUserVariables] = useState([]);
  const [variableInput, setVariableInput] = useState("");
  const [isVariableVisible, setIsVariableVisible] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState("");

  const isLimitExceeded = useCallback(
    () => messageContent.length >= MAX_LENGTH,
    [messageContent]
  );

  const addVariable = () => {
    if (isLimitExceeded()) return;

    if (!selectedVariable) return toast.error("Please select a variable");
    const variableTag = `{#${selectedVariable}#}`;

    const input = textBoxRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (messageContent.length + variableTag.length > MAX_LENGTH) return;

    setVariablesData((prev) => [...prev, selectedVariable]);

    const newMessageContent =
      messageContent.slice(0, start) + variableTag + messageContent.slice(end);
    setMessageContent(newMessageContent);

    setIsVariableVisible(false);
    setSelectedVariable("");
  };

  const handleVariableChange = useCallback((id, value) => {
    setVariablesData((prev) =>
      prev.map((variable) =>
        variable.id === id ? { ...variable, value } : variable
      )
    );
  }, []);

  const removeVariable = useCallback(
    (id) => {
      const updatedVariables = variablesData
        .filter((variable) => variable.id !== id)
        .map((variable, index) => ({ ...variable, id: `${index + 1}` }));

      let updatedTemplateFormat = messageContent;
      variablesData.forEach((variable, index) => {
        updatedTemplateFormat = updatedTemplateFormat.replace(
          `{#${variable.id}#}`,
          updatedVariables[index] ? `{#${index + 1}#}` : ""
        );
      });

      setVariablesData(updatedVariables);
      setMessageContent(updatedTemplateFormat);
      toast.success("Variable removed successfully!");
    },
    [messageContent, variablesData, setMessageContent]
  );

  const handleContentMessage = useCallback(
    (value) => {
      if (value.length <= messageContent.length || value.length <= MAX_LENGTH) {
        setMessageContent(value);
      }
    },
    [messageContent, setMessageContent, MAX_LENGTH]
  );

  const insertEmojiAtIndex = () => {};

  const handleEmojiClick = useCallback(
    (emoji) => {
      if (isLimitExceeded()) return;

      const input = textBoxRef.current;
      if (!input) return;

      const start = input.selectionStart;
      const end = input.selectionEnd;

      const newText =
        messageContent.substring(0, start) +
        emoji +
        messageContent.substring(end);

      if (messageContent.length + emoji.length <= MAX_LENGTH) {
        setMessageContent(newText);
      }
    },
    [messageContent, setMessageContent, MAX_LENGTH, isLimitExceeded]
  );

  const handleAddVariable = () => {
    if (!variableInput) {
      return toast.error("Please enter a variable name");
    }

    const storedVariables = JSON.parse(
      localStorage.getItem("variables") || "[]"
    );

    const updatedVariables = [...storedVariables, variableInput];

    setUserVariables((prevVars) => [...prevVars, variableInput]);
    localStorage.setItem("variables", JSON.stringify(updatedVariables));
    setVariableInput("");
  };

  useEffect(() => {
    const matches = messageContent.match(/\{#(.*?)#\}/g) || [];

    const result = matches.map((match) => match.replace(/\{#|#\}/g, ""));
    setVariablesData(result);
  }, [messageContent]);

  useEffect(() => {
    setVariables(variablesData);
  }, [variablesData, setVariables]);

  useEffect(() => {
    setUserVariables(JSON.parse(localStorage.getItem("variables") || "[]"));
  }, []);

  return (
    <div className="mb-2 space-y-2">
      {selectedCardIndex + 1 ? (
        <label
          className="text-sm font-medium text-gray-800 font-p mt-2"
          htmlFor={`variables-${selectedCardIndex + 1}`}
        >{`Enter message for Card ${selectedCardIndex + 1}.`}</label>
      ) : null}
      <div className="relative bg-white border border-gray-300 rounded-md">
        <textarea
          name="variables"
          id={`variables-${selectedCardIndex + 1}`}
          rows={5}
          ref={textBoxRef}
          placeholder="Enter message content"
          maxLength={MAX_LENGTH}
          value={messageContent}
          onChange={(e) => handleContentMessage(e.target.value)}
          className="w-full px-3 py-2 mb-1 text-sm outline-none resize-none"
        ></textarea>
        <div className="absolute top-0 right-0.5">
          <CustomEmojiPicker onSelect={handleEmojiClick} />
        </div>
      </div>

      <div className="flex items-start justify-between">
        <small
          className={
            isLimitExceeded()
              ? "text-red-500"
              : "text-sm font-medium text-gray-700"
          }
        >
          {messageContent.length}/{MAX_LENGTH}
        </small>
        <button
          // onClick={addVariable}
          onClick={() => {
            setIsVariableVisible(true);
          }}
          disabled={isLimitExceeded()}
          className="bg-[#212529] text-white px-2 py-2 font-normal rounded-md text-sm hover:bg-[#434851] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Variables
        </button>
      </div>

      <Dialog
        header="Select Variable"
        visible={isVariableVisible}
        className="w-[20rem] md:-[25rem] lg:w-[30rem]"
        onHide={() => {
          setIsVariableVisible(false);
        }}
        draggable={false}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <InputField
              label="Add New Variable"
              value={variableInput}
              onChange={(e) => setVariableInput(e.target.value)}
              placeholder="Add Variable"
            />
            <div className="mt-7">
              <UniversalButton label="Add" onClick={handleAddVariable} />
            </div>
          </div>
          <AnimatedDropdown
            label="Select Variables"
            options={userVariables?.map((variable) => ({
              label: variable,
              value: variable,
            }))}
            value={selectedVariable}
            onChange={(e) => {
              setSelectedVariable(e);
            }}
          />
          <div className="flex items-center justify-center mt-2">
            <UniversalButton label="Select" onClick={addVariable} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
