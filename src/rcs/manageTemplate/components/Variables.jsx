import Textarea from "@mui/joy/Textarea";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

export const Variables = ({
  variables = [],
  setVariables,
  messageContent,
  setMessageContent,
}) => {
  const [variablesData, setVariablesData] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const addVariable = () => {
    const newVariable = { id: `${variablesData.length + 1}`, value: "" };
    const updatedVariables = [...variablesData, newVariable];
    setVariablesData(updatedVariables);
    setMessageContent((prev) => `${prev}[${newVariable.id}]`);

    // if (allowSingleVariable) {
    //   setBtnDisabled(true);
    // }
  };

  const handleVariableChange = (id, value) => {
    const updatedVariables = variablesData.map((variable) =>
      variable.id === id ? { ...variable, value } : variable
    );
    setVariablesData(updatedVariables);
    // onUpdateVariables(updatedVariables);
  };

  const removeVariable = (id) => {
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
  };

  useEffect(() => {
    setVariables(variablesData);
  }, [variablesData, setVariables]);

  return (
    <div className="mb-2 space-y-2">
      <Textarea
        name="variables"
        id="variables"
        minRows={5}
        maxRows={10}
        className="w-full p-2 resize-none"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      />

      <div className="flex items-center justify-end">
        <button
          onClick={addVariable}
          disabled={btnDisabled}
          className="bg-[#212529] text-white px-2 py-2 font-normal rounded-md text-sm hover:bg-[#434851]"
        >
          Add Variables
        </button>
      </div>

      <div className="h-auto overflow-scroll max-h-56">
        {variablesData.map((variable, index) => (
          <div
            key={variable.id}
            className="flex items-center w-full gap-5 px-1 mt-2"
          >
            <label htmlFor={`templateVariable ${index}`} className="w-4">{`[${
              index + 1
            }]`}</label>
            <input
              id={`templateVariable ${index}`}
              name={`templateVariable ${index}`}
              type="text"
              value={variable.value}
              onChange={
                (e) => handleVariableChange(variable.id, e.target.value)
              }
              placeholder={`Enter value for [${variable.id}]`}
              className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              onClick={() => {
                removeVariable(variable.id);
                toast.success(`variable removed successfully!`);
              }}
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
