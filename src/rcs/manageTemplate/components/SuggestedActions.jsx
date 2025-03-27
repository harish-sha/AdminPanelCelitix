import { useEffect, useState } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";

export const SuggestedActions = ({ btnOptions, setBtnData }) => {
  const [selectedAction, setSelectedAction] = useState({
    dropdown1: "",
    dropdown2: "",
    dropdown3: "",
    dropdown4: "",
  });

  const [inputData, setInputData] = useState({
    dropdown1: {
      type: "",
      title: "",
      value: "",
    },
    dropdown2: {
      type: "",
      title: "",
      value: "",
    },
    dropdown3: {
      type: "",
      title: "",
      value: "",
    },
    dropdown4: {
      type: "",
      title: "",
      value: "",
    },
  });

  const handleDropdownChange = (index, newValue) => {
    setSelectedAction((prev) => ({ ...prev, [index]: newValue }));
    setInputData((prev) => ({
      ...prev,
      [index]: { title: "", value: "" },
    }));
  };

  const handleInputChange = (index, field, val) => {
    setInputData((prev) => ({
      ...prev,
      [index]: { ...prev[index], [field]: val, type: selectedAction[index] },
    }));
  };

  useEffect(() => {
    setBtnData(inputData);
  }, [inputData, setBtnData]);

  const InputBox = ["Url Action", "Dialer Action", "View Location", "Reply"];

  return (
    <div className="flex flex-col gap-2 p-2 border">
      <div>
        <AnimatedDropdown
          label={`Suggested Action `}
          options={btnOptions}
          value={selectedAction.dropdown1}
          onChange={(newValue) => {
            handleDropdownChange("dropdown1", newValue);
          }}
          placeholder={`Select Action`}
        />
        {selectedAction.dropdown1 && (
          <div className="flex gap-2">
            <InputField
              id="title"
              name="title"
              label="Title"
              placeholder="Enter Title"
              value={inputData.dropdown1.title}
              onChange={(e) =>
                handleInputChange("dropdown1", "title", e.target.value)
              }
              className="p-2 border"
            />

            {InputBox.includes(selectedAction.dropdown1) && (
              <InputField
                id="value"
                name="value"
                label="value"
                placeholder="Enter value"
                value={inputData.dropdown1.value}
                onChange={(e) =>
                  handleInputChange("dropdown1", "value", e.target.value)
                }
                className="p-2 border"
              />
            )}
          </div>
        )}
      </div>
      <div>
        <AnimatedDropdown
          label={`Suggested Action `}
          options={btnOptions}
          value={selectedAction.dropdown2}
          onChange={(newValue) => {
            handleDropdownChange("dropdown2", newValue);
          }}
          placeholder={`Select Action`}
        />

        {selectedAction.dropdown2 && (
          <div className="flex gap-2">
            <InputField
              id="title"
              name="title"
              label="Title"
              placeholder="Enter Title"
              value={inputData.dropdown2.title}
              onChange={(e) =>
                handleInputChange("dropdown2", "title", e.target.value)
              }
              className="p-2 border"
            />

            <InputField
              id="value"
              name="value"
              label="value"
              placeholder="Enter value"
              value={inputData.dropdown2.value}
              onChange={(e) =>
                handleInputChange("dropdown2", "value", e.target.value)
              }
              className="p-2 border"
            />
          </div>
        )}
      </div>
      <div>
        <AnimatedDropdown
          label={`Suggested Action `}
          options={btnOptions}
          value={selectedAction.dropdown3}
          onChange={(newValue) => {
            handleDropdownChange("dropdown3", newValue);
          }}
          placeholder={`Select Action`}
        />
        {selectedAction.dropdown3 && (
          <div className="flex gap-2">
            <InputField
              id="title"
              name="title"
              label="Title"
              placeholder="Enter Title"
              value={inputData.dropdown3.title}
              onChange={(e) =>
                handleInputChange("dropdown3", "title", e.target.value)
              }
              className="p-2 border"
            />

            <InputField
              id="value"
              name="value"
              label="value"
              placeholder="Enter value"
              value={inputData.dropdown3.value}
              onChange={(e) =>
                handleInputChange("dropdown3", "value", e.target.value)
              }
              className="p-2 border"
            />
          </div>
        )}
      </div>
      <div>
        <AnimatedDropdown
          label={`Suggested Action `}
          options={btnOptions}
          value={selectedAction.dropdown4}
          onChange={(newValue) => {
            handleDropdownChange("dropdown4", newValue);
          }}
          placeholder={`Select Action`}
        />
        {selectedAction.dropdown4 && (
          <div className="flex gap-2">
            <InputField
              id="title"
              name="title"
              label="Title"
              placeholder="Enter Title"
              value={inputData.dropdown4.title}
              onChange={(e) =>
                handleInputChange("dropdown4", "title", e.target.value)
              }
              className="p-2 border"
            />

            <InputField
              id="value"
              name="value"
              label="value"
              placeholder="Enter value"
              value={inputData.dropdown4.value}
              onChange={(e) =>
                handleInputChange("dropdown4", "value", e.target.value)
              }
              className="p-2 border"
            />
          </div>
        )}
      </div>
    </div>
  );
};
