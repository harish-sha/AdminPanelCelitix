import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai"; // Info icon
import { IoIosArrowDown } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import CustomTooltip from "./CustomTooltip";

const AnimatedDropdown = ({
    label,
    tooltipContent = "",
    tooltipPlacement = "top",
    options,
    value,
    onChange,
    placeholder = "Select an option",
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionSelect = (selectedValue) => {
        onChange(selectedValue);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            {label && (
                <div className="flex items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
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

            <button
                onClick={toggleDropdown}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-200 focus:border-indigo-300 sm:text-sm text-left bg-white flex items-center justify-between"
            >
                <span>
                    {value
                        ? options.find((option) => option.value === value)?.label
                        : placeholder}
                </span>
                <span className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                    <IoIosArrowDown />
                </span>
            </button>

            <div
                className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 transition-all duration-200 overflow-hidden ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                style={{ transition: "all 0.2s ease-in-out" }}
            >
                <ul className="py-1 text-sm text-gray-700">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-100 ${value === option.value ? "bg-indigo-100 font-medium" : ""
                                }`}
                            onClick={() => handleOptionSelect(option.value)}
                        >
                            {option.label}
                            {value === option.value && <BsCheck className="text-indigo-600 text-xl" />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AnimatedDropdown;


