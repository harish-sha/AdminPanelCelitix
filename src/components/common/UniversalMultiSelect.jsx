import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CustomTooltip from "./CustomTooltip";
import { MultiSelect } from 'primereact/multiselect';

const UniversalMultiSelect = ({
    id,
    name,
    label,
    tooltipContent = "",
    tooltipPlacement = "top",
    options = [],
    value = [],
    onChange,
    placeholder = "Select an option...",
    filter = true,
    
}) => {
    return (
        <div className="relative w-full">
            {label && (
                <div className="flex items-center mb-2">
                    <label htmlFor={id} className="text-sm font-p font-medium text-gray-800">
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

            <MultiSelect
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChange(e.value)}
                options={options}
                optionLabel="label"
                placeholder={placeholder}
                filter={filter}
                maxSelectedLabels={0}
                className="custom-multiselect"
                display="chip"
            />
            
        </div>
    );
};

export default UniversalMultiSelect;
