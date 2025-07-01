import React, { useState } from "react";

const options = [
  { label: "Name", value: "name" },
  { label: "Mobile Number", value: "mobile" },
  { label: "Address", value: "address" },
];

const DynamicValueBox = () => {
  const [inputValues, setInputValues] = useState(Array(5).fill(""));
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const handleOptionClick = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = `${newValues[index]} {{\$${value}}}`.trim();
    setInputValues(newValues);
    setDropdownIndex(null);
  };

  const handleInputChange = (index, newValue) => {
    const updated = [...inputValues];
    updated[index] = newValue;
    setInputValues(updated);
  };

  return (
    <div className="w-full max-w-md  bg-white shadow rounded-md border border-gray-200">
      <h3 className="text-base font-medium bg-[#1e4f73] text-white px-4 py-1 rounded-t-md">
        Dynamic value :
      </h3>
      <div className="space-y-2 mt-2">
        {inputValues.map((value, index) => (
          <div key={index} className="relative flex items-center">
            <span className="w-6 text-right mr-2 text-gray-700 font-medium">
              {index + 1}.
            </span>
            <input
              type="text"
              className="flex-1 px-3  border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-400"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Type or select an attribute"
            />
            <button
              className="px-3  bg-gray-200 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300"
              onClick={() =>
                setDropdownIndex(dropdownIndex === index ? null : index)
              }
            >
              &#123;&#125;
            </button>
            {dropdownIndex === index && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-300 shadow z-10 rounded-md">
                {options.map((opt) => (
                  <div
                    key={opt.value}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick(index, opt.value)}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicValueBox;

