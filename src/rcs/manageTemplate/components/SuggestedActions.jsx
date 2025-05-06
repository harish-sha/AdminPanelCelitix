import { useEffect, useState } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import toast from "react-hot-toast";

export const SuggestedActions = ({
  btnOptions,
  setBtnData,
  selectedAction,
  setSelectedAction,
  inputData,
  setInputData,
  selectedCardIndex,
}) => {
  const handleDropdownChange = (index, newValue) => {
    setSelectedAction((prev) => ({ ...prev, [index]: newValue }));
    setInputData((prev) => ({
      ...prev,
      [index]: { title: "", value: "", type: newValue },
    }));
  };

  const handleInputChange = (index, field, val) => {
    setInputData((prev) => {
      if (field === "latitude" || field === "longitude") {
        const lat = field === "latitude" ? val : prev[index]?.latitude || "";
        const long = field === "longitude" ? val : prev[index]?.longitude || "";

        return {
          ...prev,
          [index]: {
            ...prev[index],
            latitude: lat,
            longitude: long,
            value: `${lat},${long}`,
            type: selectedAction[index],
          },
        };
      }

      return {
        ...prev,
        [index]: {
          ...prev[index],
          [field]: val || "",
          type: selectedAction[index],
        },
      };
    });
  };

  useEffect(() => {
    setBtnData(inputData);
  }, [inputData, setBtnData]);

  const InputBox = ["Url Action", "Dialer Action", "View Location", "Reply"];

  return (
    <>
      {selectedCardIndex + 1 ? (
        <label
          className="text-sm font-medium text-gray-800 font-p mt-2"
          htmlFor={`variables-${selectedCardIndex + 1}`}
        >{`Set Suggestion Buttons for Card ${selectedCardIndex + 1}.`}</label>
      ) : null}
      <div className="grid grid-cols-1 gap-2 mt-2">
        <div className="grid grid-cols-1 gap-2">
          <div className="flex lg:flex-nowrap flex-wrap  items-center gap-3 w-full">
            <div className="min-w-full lg:min-w-56">
              <AnimatedDropdown
                // label={`Suggested Action 1 `}
                options={btnOptions}
                value={selectedAction.dropdown1}
                onChange={(newValue) => {
                  handleDropdownChange("dropdown1", newValue);
                }}
                placeholder={`Suggested Action 1`}
              />
            </div>
            {selectedAction.dropdown1 && (
              <>
                <InputField
                  id="title"
                  name="title"
                  // label="Title"
                  placeholder="Enter Title"
                  value={inputData.dropdown1.title}
                  onChange={(e) =>
                    handleInputChange("dropdown1", "title", e.target.value)
                  }
                  className="p-2 border rounded w-56"
                />

                {InputBox.includes(selectedAction.dropdown1) && (
                  <>
                    {selectedAction.dropdown1 !== "View Location" && (
                      <InputField
                        id="value"
                        name="value"
                        // label="value"
                        placeholder={
                          selectedAction.dropdown1 === "Url Action"
                            ? "https://"
                            : selectedAction.dropdown1 === "Dialer Action"
                            ? "+91"
                            : "Enter Value"
                        }
                        value={inputData.dropdown1.value}
                        onChange={(e) =>
                          handleInputChange(
                            "dropdown1",
                            "value",
                            e.target.value
                          )
                        }
                        className="p-2 border rounded w-56"
                        maxLength={
                          selectedAction.dropdown1 === "Url Action"
                            ? 200
                            : selectedAction.dropdown1 === "Dialer Action"
                            ? 13
                            : 100
                        }
                        type={
                          selectedAction.dropdown1 === "Url Action"
                            ? "text"
                            : selectedAction.dropdown1 === "Dialer Action"
                            ? "number"
                            : "text"
                        }
                      />
                    )}
                    {selectedAction.dropdown1 === "View Location" && (
                      <>
                        <InputField
                          id="value"
                          name="value"
                          // label="value"
                          placeholder={"latitude"}
                          value={inputData.dropdown1.latitude}
                          onChange={(e) =>
                            handleInputChange(
                              "dropdown1",
                              "latitude",
                              e.target.value
                            )
                          }
                          className="p-2 border rounded w-56"
                        />
                        <InputField
                          id="value"
                          name="value"
                          // label="value"
                          placeholder={"longitude"}
                          value={inputData.dropdown1.longitude}
                          onChange={(e) =>
                            handleInputChange(
                              "dropdown1",
                              "longitude",
                              e.target.value
                            )
                          }
                          className="p-2 border rounded w-56"
                        />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex lg:flex-nowrap flex-wrap  items-center gap-3 w-full">
            <div className="min-w-full lg:min-w-56">
              <AnimatedDropdown
                // label={`Suggested Action 2 `}
                options={btnOptions}
                value={selectedAction.dropdown2}
                onChange={(newValue) => {
                  handleDropdownChange("dropdown2", newValue);
                }}
                placeholder={`Suggested Action 2`}
              />
            </div>
            {selectedAction.dropdown2 && (
              <>
                <InputField
                  id="title"
                  name="title"
                  // label="Title"
                  placeholder="Enter Title"
                  value={inputData.dropdown2.title}
                  onChange={(e) =>
                    handleInputChange("dropdown2", "title", e.target.value)
                  }
                  className="p-2 border rounded w-56"
                />

                {InputBox.includes(selectedAction.dropdown2) && (
                  <>
                    {selectedAction.dropdown2 !== "View Location" && (
                      <InputField
                        id="value"
                        name="value"
                        // label="value"
                        placeholder={
                          selectedAction.dropdown2 === "Url Action"
                            ? "https://"
                            : selectedAction.dropdown2 === "Dialer Action"
                            ? "+91"
                            : "Enter Value"
                        }
                        value={inputData.dropdown2.value}
                        onChange={(e) =>
                          handleInputChange(
                            "dropdown2",
                            "value",
                            e.target.value
                          )
                        }
                        className="p-2 border rounded w-56"
                        maxLength={
                          selectedAction.dropdown2 === "Url Action"
                            ? 200
                            : selectedAction.dropdown2 === "Dialer Action"
                            ? 13
                            : 100
                        }
                        type={
                          selectedAction.dropdown2 === "Url Action"
                            ? "text"
                            : selectedAction.dropdown2 === "Dialer Action"
                            ? "number"
                            : "text"
                        }
                      />
                    )}
                    {selectedAction.dropdown2 === "View Location" && (
                      <>
                        <InputField
                          id="value"
                          name="value"
                          // label="value"
                          placeholder={"latitude"}
                          value={inputData.dropdown2.latitude}
                          onChange={(e) =>
                            handleInputChange(
                              "dropdown2",
                              "latitude",
                              e.target.value
                            )
                          }
                          className="p-2 border rounded w-56"
                        />
                        <InputField
                          id="value"
                          name="value"
                          // label="value"
                          placeholder={"longitude"}
                          value={inputData.dropdown2.longitude}
                          onChange={(e) =>
                            handleInputChange(
                              "dropdown2",
                              "longitude",
                              e.target.value
                            )
                          }
                          className="p-2 border rounded w-56"
                        />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex lg:flex-nowrap flex-wrap  items-center gap-3 w-full">
            <div className="min-w-full lg:min-w-56">
              <AnimatedDropdown
                // label={`Suggested Action 3 `}
                options={btnOptions}
                value={selectedAction.dropdown3}
                onChange={(newValue) => {
                  handleDropdownChange("dropdown3", newValue);
                }}
                placeholder={`Suggested Action 3`}
              />
            </div>
            {selectedAction.dropdown3 && (
              <>
                <InputField
                  id="title"
                  name="title"
                  // label="Title"
                  placeholder="Enter Title"
                  value={inputData.dropdown3.title}
                  onChange={(e) =>
                    handleInputChange("dropdown3", "title", e.target.value)
                  }
                  className="p-2 border rounded w-56"
                />
                {InputBox.includes(selectedAction.dropdown3) && (
                  <>
                    {selectedAction.dropdown3 !== "View Location" && (
                      <InputField
                        id="value"
                        name="value"
                        // label="value"
                        placeholder={
                          selectedAction.dropdown3 === "Url Action"
                            ? "https://"
                            : selectedAction.dropdown3 === "Dialer Action"
                            ? "+91"
                            : "Enter Value"
                        }
                        value={inputData.dropdown3.value}
                        onChange={(e) =>
                          handleInputChange(
                            "dropdown3",
                            "value",
                            e.target.value
                          )
                        }
                        className="p-2 border rounded w-56"
                        maxLength={
                          selectedAction.dropdown3 === "Url Action"
                            ? 200
                            : selectedAction.dropdown3 === "Dialer Action"
                            ? 13
                            : 100
                        }
                        type={
                          selectedAction.dropdown3 === "Url Action"
                            ? "text"
                            : selectedAction.dropdown3 === "Dialer Action"
                            ? "number"
                            : "text"
                        }
                      />
                    )}
                    {selectedAction.dropdown3 === "View Location" && (
                      <>
                        <InputField
                          id="value"
                          name="value"
                          // label="value"
                          placeholder={"latitude"}
                          value={inputData.dropdown3.latitude}
                          onChange={(e) =>
                            handleInputChange(
                              "dropdown3",
                              "latitude",
                              e.target.value
                            )
                          }
                          className="p-2 border rounded w-56"
                        />
                        <InputField
                          id="value"
                          name="value"
                          // label="value"
                          placeholder={"longitude"}
                          value={inputData.dropdown3.longitude}
                          onChange={(e) =>
                            handleInputChange(
                              "dropdown3",
                              "longitude",
                              e.target.value
                            )
                          }
                          className="p-2 border rounded w-56"
                        />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex lg:flex-nowrap flex-wrap  items-center gap-3 w-full">
            <div className="min-w-full lg:min-w-56">
              <AnimatedDropdown
                // label={`Suggested Action 4`}
                options={btnOptions}
                value={selectedAction.dropdown4}
                onChange={(newValue) => {
                  handleDropdownChange("dropdown4", newValue);
                }}
                placeholder={`Suggested Action 4`}
              />
            </div>
            {selectedAction.dropdown4 && (
              <>
                <InputField
                  id="title"
                  name="title"
                  // label="Title"
                  placeholder="Enter Title"
                  value={inputData.dropdown4.title}
                  onChange={(e) =>
                    handleInputChange("dropdown4", "title", e.target.value)
                  }
                  className="p-2 border"
                />

                {InputBox.includes(selectedAction.dropdown4) && (
                  <>
                    {selectedAction.dropdown4 !== "View Location" && (
                      <InputField
                        id="value"
                        name="value"
                        // label="value"
                        placeholder={
                          selectedAction.dropdown4 === "Url Action"
                            ? "https://"
                            : "Enter Number"
                        }
                        value={inputData.dropdown4.value}
                        onChange={(e) =>
                          handleInputChange(
                            "dropdown4",
                            "value",
                            e.target.value
                          )
                        }
                        className="p-2 border rounded w-56"
                        maxLength={
                          selectedAction.dropdown4 === "Url Action"
                            ? 200
                            : selectedAction.dropdown4 === "Dialer Action"
                            ? 13
                            : 100
                        }
                        type={
                          selectedAction.dropdown4 === "Url Action"
                            ? "text"
                            : selectedAction.dropdown4 === "Dialer Action"
                            ? "number"
                            : "text"
                        }
                      />
                    )}
                    {selectedAction.dropdown4 === "View Location" && (
                      <>
                        <InputField
                          id="value"
                          name="value"
                          // label="value"
                          placeholder={"longitude"}
                          value={inputData.dropdown4.longitude}
                          onChange={(e) =>
                            handleInputChange(
                              "longitude",
                              "value",
                              e.target.value
                            )
                          }
                          className="p-2 border rounded w-56"
                        />
                        <InputField
                          id="value"
                          name="value"
                          // label="value"
                          placeholder={"latitude"}
                          value={inputData.dropdown4.latitude}
                          onChange={(e) =>
                            handleInputChange(
                              "latitude",
                              "value",
                              e.target.value
                            )
                          }
                          className="p-2 border rounded w-56"
                        />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
