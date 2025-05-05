import React, { useEffect, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import InputField from "../../whatsapp/components/InputField";
import DropdownWithSearch from "../../whatsapp/components/DropdownWithSearch";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";

const SendSms = () => {
  const [selectedOption, setSelectedOption] = useState("option1");

  const dltoption=[
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
  ]
  const handleChange = (event) => {
    setSelectedOption(event.value);
  };
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
      <div className="">
        <div>
          <h2 className="mb-2 text-sm font-medium tracking-wide text-gray-800">
            Choose an Option
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-2 mb-2 sm:grid-cols-1">
            {/* Option 1 */}
            <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-start gap-2 cursor-pointer">
                <RadioButton
                  inputId="radioOption1"
                  name="radioGroup"
                  value="option1"
                  onChange={handleChange}
                  checked={selectedOption === "option1"}
                />
                <label
                  htmlFor="radioOption1"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Transactional
                </label>
              </div>
            </label>

            {/* Option 2 */}
            <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-start gap-2">
                <RadioButton
                  inputId="radioOption2"
                  name="radioGroup"
                  value="option2"
                  onChange={handleChange}
                  checked={selectedOption === "option2"}
                />
                <label
                  htmlFor="radioOption2"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Promotional
                </label>
              </div>
            </label>

            {/* Option 3 */}
            <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-start gap-2 ">
                <RadioButton
                  inputId="radioOption3"
                  name="radioGroup"
                  value="option3"
                  onChange={handleChange}
                  checked={selectedOption === "option3"}
                />
                <label
                  htmlFor="radioOption3"
                  className="text-sm font-medium text-gray-700"
                >
                  International
                </label>
              </div>
            </label>
          </div>
        </div>
        {selectedOption === "option1" && (
          <div className="space-y-2">
            <h1>hello1</h1>
            <InputField 
              label="Campaign Name"
              id="campaignname"
              name="campaignname"
              tooltipContent="Enter a name for your SMS campaign. It is optional."
              tooltipPlacement="right"
              placeholder="Enter Campaign Name"
            />
            <DropdownWithSearch
              label="DLT Template"
              id="dlttemplate"
              name="dlttemplate"
               tooltipContent="Select a pre-approved DLT template for your message."
              tooltipPlacement="right"
              options={dltoption}
              placeholder="Select DLT Template"
              onChange={(value) => console.log(value)}
            />
            <AnimatedDropdown
              id="Sender ID"
              name="Sender ID"
              label="Sender ID"
              tooltipContent="Select a Sender ID for your SMS. It is optional."
              tooltipPlacement="right"
              placeholder="Select Sender ID"
              options={[
                { label: "Sender ID 1", value: "sender1" },
                { label: "Sender ID 2", value: "sender2" },
                { label: "Sender ID 3", value: "sender3" },
              ]}
              onChange={(value) => console.log(value)}
            />
          </div>

        )}
        {selectedOption === "option2" && (
         
          <h1>hello2</h1>
        )}
        {selectedOption === "option3" && (
          <h1>hello3</h1>
        )}
      </div>
      <div>

      </div>
    </div>
  );
};

export default SendSms;
