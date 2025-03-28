import { useEffect, useState } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import toast from "react-hot-toast";

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
      [index]: { title: "", value: "", type: newValue },
    }));
  };

  const handleInputChange = (index, field, val) => {
    setInputData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: val || "",
        type: selectedAction[index],
      },
    }));
  };

  useEffect(() => {
    setBtnData(inputData);
  }, [inputData, setBtnData]);

  const InputBox = ["Url Action", "Dialer Action", "View Location"];

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div>
        <AnimatedDropdown
          label={`Suggested Action 1 `}
          options={btnOptions}
          value={selectedAction.dropdown1}
          onChange={(newValue) => {
            handleDropdownChange("dropdown1", newValue);
          }}
          placeholder={`Select Action 1`}
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
                placeholder={
                  selectedAction.dropdown1 === "View Location"
                    ? "lat,long"
                    : "Enter value"
                }
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
          label={`Suggested Action 2 `}
          options={btnOptions}
          value={selectedAction.dropdown2}
          onChange={(newValue) => {
            handleDropdownChange("dropdown2", newValue);
          }}
          placeholder={`Select Action 2`}
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

            {InputBox.includes(selectedAction.dropdown2) && (
              <InputField
                id="value"
                name="value"
                label="value"
                placeholder={
                  selectedAction.dropdown2 === "View Location"
                    ? "lat,long"
                    : "Enter value"
                }
                value={inputData.dropdown2.value}
                onChange={(e) =>
                  handleInputChange("dropdown2", "value", e.target.value)
                }
                className="p-2 border"
              />
            )}
          </div>
        )}
      </div>
      <div>
        <AnimatedDropdown
          label={`Suggested Action 3 `}
          options={btnOptions}
          value={selectedAction.dropdown3}
          onChange={(newValue) => {
            handleDropdownChange("dropdown3", newValue);
          }}
          placeholder={`Select Action 3`}
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
            {InputBox.includes(selectedAction.dropdown3) && (
              <InputField
                id="value"
                name="value"
                label="value"
                placeholder={
                  selectedAction.dropdown3 === "View Location"
                    ? "lat,long"
                    : "Enter value"
                }
                value={inputData.dropdown3.value}
                onChange={(e) =>
                  handleInputChange("dropdown3", "value", e.target.value)
                }
                className="p-2 border"
              />
            )}
          </div>
        )}
      </div>
      <div>
        <AnimatedDropdown
          label={`Suggested Action 4`}
          options={btnOptions}
          value={selectedAction.dropdown4}
          onChange={(newValue) => {
            handleDropdownChange("dropdown4", newValue);
          }}
          placeholder={`Select Action 4`}
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

            {InputBox.includes(selectedAction.dropdown4) && (
              <InputField
                id="value"
                name="value"
                label="value"
                placeholder={
                  selectedAction.dropdown4 === "View Location"
                    ? "lat,long"
                    : "Enter value"
                }
                value={inputData.dropdown4.value}
                onChange={(e) =>
                  handleInputChange("dropdown4", "value", e.target.value)
                }
                className="p-2 border"
                required
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
