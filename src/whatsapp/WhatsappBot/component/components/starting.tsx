import InputField from "@/whatsapp/components/InputField";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";

export const StartingNodeContent = ({
  id,
  nodesInputData,
  setNodesInputData,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const [inputFields, setInputFields] = useState([""]);

  function handleInputAddBtn() {
    if (inputFields.length >= 5) {
      toast.error("You can only add up to 5 starting keywords");
      return;
    }
    setInputFields([...inputFields, ""]);
  }

  function handleInputDeleteBtn(index: number) {
    if (inputFields.length > 1) {
      setInputFields(inputFields.filter((_, i) => i !== index));
    }
  }

  function handleInputChange(index: number, value: string) {
    const newInputFields = [...inputFields];
    newInputFields[index] = value;

    // const hasDuplicate = new Set(newInputFields).size !== newInputFields.length;
    // if (hasDuplicate) {
    //   return toast.error("Duplicate Starting Keyword is not allowed");
    // }

    setInputFields(newInputFields);
  }

  useEffect(() => {
    nodesInputData[id]?.startingKeyword &&
      setInputFields(nodesInputData[id]?.startingKeyword.split(","));
  }, []);

  useEffect(() => {
    const joinedString = inputFields.filter(Boolean).join(",");
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        startingKeyword: joinedString,
      },
    }));
  }, [id, inputFields]);

  return (
    <div>
      <div className="flex items-end justify-end gap-2">
        <Button id="addInput" name="addInput" onClick={handleInputAddBtn}>
          Add Input
        </Button>
      </div>

      {inputFields.map((inputValue, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          <InputField
            label={`Starting Keyword ${index + 1}`}
            id={`startingKeyword-${index}`}
            name={`startingKeyword-${index}`}
            placeholder="Enter Starting keyword"
            value={inputValue}
            onChange={(e: { target: { value: string } }) =>
              handleInputChange(index, e.target.value)
            }
          />
          {inputFields.length > 1 && (
            <span
              id="deleteInput"

              onClick={() => handleInputDeleteBtn(index)}
              className="mt-7 text-red-700 cursor-pointer hover:text-red-700 transition-colors duration-200"
            >
              <MdOutlineDeleteForever fontSize={24} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
