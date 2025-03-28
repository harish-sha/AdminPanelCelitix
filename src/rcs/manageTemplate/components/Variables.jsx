import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import Textarea from "@mui/joy/Textarea";
import { useEffect, useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

export const Variables = ({
  variables = [],
  setVariables,
  messageContent,
  setMessageContent,
}) => {
  const [variablesData, setVariablesData] = useState([]);
  const MAX_LENGTH = 1024;
  const textBoxRef = useRef(null);

  const isLimitExceeded = useCallback(
    () => messageContent.length >= MAX_LENGTH,
    [messageContent]
  );

  const addVariable = useCallback(() => {
    if (isLimitExceeded()) return;

    const newVariable = { id: `${variablesData.length + 1}`, value: "" };
    const variableTag = `[${newVariable.id}]`;

    if (messageContent.length + variableTag.length > MAX_LENGTH) return;

    setVariablesData((prev) => [...prev, newVariable]);
    setMessageContent((prev) => prev + variableTag);
  }, [messageContent, variablesData, setMessageContent, MAX_LENGTH]);

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
          `[${variable.id}]`,
          updatedVariables[index] ? `[${index + 1}]` : ""
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

  useEffect(() => {
    const varRegex = messageContent.match(/\[\d+\]/g) || [];

    const currentVariableIds = new Set(
      variablesData.map((variable) => `[${variable.id}]`)
    );

    const newVariables = varRegex
      .filter((match) => !currentVariableIds.has(match))
      .map((match) => ({ id: match.slice(1, -1), value: "" }));

    const validVariables = variablesData.filter((variable) =>
      varRegex.includes(`[${variable.id}]`)
    );

    const updatedVariables = [...validVariables, ...newVariables].map(
      (variable, index) => ({
        ...variable,
        id: `${index + 1}`,
      })
    );

    const updatedMessageContent = varRegex.reduce(
      (content, match, index) => content.replace(match, `[${index + 1}]`),
      messageContent
    );

    const sortedVariableNumbers = [
      ...new Set(updatedMessageContent.match(/\[\d+\]/g)),
    ]
      .map((match) => parseInt(match.slice(1, -1)))
      .sort((a, b) => a - b);

    let count = 0;
    const finalMessageContent = updatedMessageContent.replace(
      /\[\d+\]/g,
      () => {
        return `[${sortedVariableNumbers[count++]}]`;
      }
    );

    setVariablesData(updatedVariables);
    setMessageContent(finalMessageContent);
  }, [messageContent]);

  useEffect(() => {
    setVariables(variablesData);
  }, [variablesData, setVariables]);

  return (
    <div className="mb-2 space-y-2">
      <div className="relative bg-white border border-gray-300 rounded-md">
        <textarea
          name="variables"
          id="variables"
          rows={5}
          ref={textBoxRef}
          placeholder="Enter message content"
          maxLength={MAX_LENGTH}
          value={messageContent}
          onChange={(e) => handleContentMessage(e.target.value)}
          className="w-full px-3 py-2 mb-1 outline-none resize-none"
        ></textarea>
        <div className="absolute -bottom-0 right-1">
          <CustomEmojiPicker onSelect={handleEmojiClick} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className={isLimitExceeded() ? "text-red-500" : ""}>
          {messageContent.length}/{MAX_LENGTH}
        </p>
        <button
          onClick={addVariable}
          disabled={isLimitExceeded()}
          className="bg-[#212529] text-white px-2 py-2 font-normal rounded-md text-sm hover:bg-[#434851] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Variables
        </button>
      </div>

      <div className="h-auto overflow-scroll max-h-[150px]">
        {variablesData.map((variable, index) => (
          <div
            key={variable.id}
            className="flex items-center w-full gap-5 px-1 mt-2"
          >
            <label htmlFor={`templateVariable${index}`} className="w-4">{`[${
              index + 1
            }]`}</label>
            <input
              id={`templateVariable${index}`}
              name={`templateVariable${index}`}
              type="text"
              value={variable.value}
              onChange={(e) =>
                handleVariableChange(variable.id, e.target.value)
              }
              placeholder={`Enter value for [${variable.id}]`}
              className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              onClick={() => removeVariable(variable.id)}
              className="p-1 text-sm text-white bg-transparent rounded-md"
            >
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-700"
                size={24}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
