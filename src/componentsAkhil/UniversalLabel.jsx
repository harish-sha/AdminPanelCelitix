import React from "react";
import CustomTooltip from "../components/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";

const UniversalLabel = ({ 
  text, 
  id, 
  name, 
  tooltipContent, 
  tooltipPlacement = "top", 
  className = "block text-sm font-medium text-gray-700" 
}) => {
  return (
    <div className="flex items-center gap-2">
      <label id={id} name={name} className={className}>
        {text}
      </label>
      {tooltipContent && (
        <CustomTooltip title={tooltipContent} placement={tooltipPlacement} arrow>
          <span>
            <AiOutlineInfoCircle className='text-gray-500 cursor-pointer hover:text-gray-700' />
          </span>
        </CustomTooltip>
      )}
    </div>
  );
};

export default UniversalLabel;
