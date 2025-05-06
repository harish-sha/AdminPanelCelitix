import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CustomTooltip from "./CustomTooltip";

const ColorPicker = ({
  id,
  name,
  label,
  tooltipContent = "",
  defaultValue = "#008000", // Default color
  onChange,
  value,
  tooltipPlacement = "top",
  error = false,
  errorText = "",
}) => {
  // Convert Hex to RGB
  const hexToRgb = (hex) => {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // State to store the current color and RGB value
  const [color, setColor] = useState(defaultValue);
  const [rgbValue, setRgbValue] = useState(hexToRgb(defaultValue));

  // Handle color change
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    setRgbValue(hexToRgb(newColor));

    if (onChange) {
      onChange(newColor); // Pass updated value to parent if needed
    }
  };

  return (
    <div className="w-full flex items-center gap-2 mb-2">
      {/* Label & Tooltip Container */}
      <div className="w-4/12 flex items-center">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-bold text-gray-700 w-full"
          >
            {label}
          </label>
        )}
        {tooltipContent && (
          <CustomTooltip
            title={tooltipContent}
            placement={tooltipPlacement}
            arrow
          >
            <span>
              <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
            </span>
          </CustomTooltip>
        )}
      </div>

      {/* Color Picker & RGB Display */}
      <div className="w-8/12 flex items-center gap-2">
        {/* Color Picker Input */}
        <input
          id={id}
          name={name}
          type="color"
          value={value}
          onChange={handleColorChange}
          className={`block w-10 h-8 border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <span
          className={`block w-full p-1.5 h-[1.9rem] border rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          style={{ color: "#877D7D", fontSize: "12px" }} // Dynamic background
        >
          {rgbValue}
        </span>

        {/* RGB Code Display */}
      </div>

      {/* Error Message */}
      {error && <p className="mt-1 text-sm text-red-500">{errorText}</p>}
    </div>
  );
};

export default ColorPicker;
