import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CustomTooltip from "./CustomTooltip";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Checkbox from "@mui/joy/Checkbox";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const AnimatedDropdown = ({
    id,
    name,
    label,
    tooltipContent = "",
    tooltipPlacement = "top",
    options,
    value,
    onChange,
    placeholder = "Select options...",
}) => {
    const handleOptionToggle = (selectedValue) => {
        const isSelected = value.includes(selectedValue);
        const newValue = isSelected
            ? value.filter((val) => val !== selectedValue) // Remove if already selected
            : [...value, selectedValue]; // Add if not selected
        onChange(newValue);
    };

    return (
        <div className="relative w-full">
            {label && (
                <div className="flex items-center mb-2">
                    <label htmlFor={id} className="text-sm font-medium text-gray-800">
                        {label}
                    </label>
                    {tooltipContent && (
                        <CustomTooltip
                            title={tooltipContent}
                            placement={tooltipPlacement}
                            arrow
                        >
                            <span className="ml-2">
                                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
                            </span>
                        </CustomTooltip>
                    )}
                </div>
            )}

            <Select
                id={id}
                name={name}
                multiple
                placeholder={placeholder}
                indicator={<KeyboardArrowDown />}
                value={value}
                onChange={(e, selectedValue) => handleOptionToggle(selectedValue)}
                sx={{
                    width: "100%",
                    [`& .${selectClasses.indicator}`]: {
                        transition: "0.2s",
                        [`&.${selectClasses.expanded}`]: {
                            transform: "rotate(-180deg)",
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <Option
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <Checkbox
                            checked={value.includes(option.value)}
                            onChange={() => handleOptionToggle(option.value)}
                        />
                        {option.label}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default AnimatedDropdown;
