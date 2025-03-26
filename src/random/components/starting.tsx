import InputField from "@/whatsapp/components/InputField";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";

export const StartingNodeContent = () => {
  const [inputFields, setInputFields] = useState([""]);

  function handleInputAddBtn() {
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
    setInputFields(newInputFields);
  }

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
            <Button
              id="deleteInput"
              name="deleteInput"
              variant="destructive"
              onClick={() => handleInputDeleteBtn(index)}
              className="mt-7"
            >
              <MdOutlineDeleteForever />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
