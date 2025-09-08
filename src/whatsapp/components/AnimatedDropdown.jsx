// import React from "react";
// import { AiOutlineInfoCircle } from "react-icons/ai";
// import CustomTooltip from "./CustomTooltip";
// import Select, { selectClasses } from "@mui/joy/Select";
// import Option from "@mui/joy/Option";
// import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// import { BsCheck } from "react-icons/bs";

// const AnimatedDropdown = ({
//   id,
//   name,
//   label,
//   tooltipContent = "",
//   tooltipPlacement = "top",
//   options = [],
//   value = "",
//   onChange,
//   placeholder = "Select an option...",
//   disabled = false,
// }) => {
//   const handleChange = (selectedValue) => {
//     if (selectedValue === "no-selection") {
//       onChange("");
//     } else {
//       onChange(selectedValue);
//     }
//   };
//   return (
//     <div className="relative w-full">
//       {label && (
//         <div className="flex items-center mb-2">
//           <label
//             htmlFor={id}
//             className="text-sm font-medium text-gray-800 font-p"
//           >
//             {label}
//           </label>
//           {tooltipContent && (
//             <CustomTooltip
//               title={tooltipContent}
//               placement={tooltipPlacement}
//               arrow
//             >
//               <span className="ml-2">
//                 <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
//               </span>
//             </CustomTooltip>
//           )}
//         </div>
//       )}

//       <Select
//         id={id}
//         name={name}
//         value={value}
//         // onChange={(e, selectedValue) => onChange(selectedValue)} // Update value
//         onChange={(e, selectedValue) => handleChange(selectedValue)}
//         placeholder={placeholder}
//         indicator={<KeyboardArrowDown />}
//         disabled={disabled}
//         sx={{
//           width: "100%",
//           [`& .${selectClasses.indicator}`]: {
//             transition: "0.2s",
//             [`&.${selectClasses.expanded}`]: {
//               transform: "rotate(-180deg)",
//             },
//           },
//         }}
//         slotProps={{
//           listbox: {
//             sx: {
//               maxHeight: "300px",
//               overflowY: "auto",
//               minWidth: "250px",
//               position: "relative",
//               zIndex: 1300,
//             },
//           },
//         }}
//       >
//         {/* Empty selection option */}
//         <Option
//           key="no-selection"
//           value="no-selection"
//           className="italic text-gray-500 font-p z-50"
//         >
//           -- No Selection --
//         </Option>
//         {options.map((option, index) => (
//           <Option
//             key={`${option.value}-${index}`}
//             value={option.value}
//             className="flex items-center justify-between font-serif font-p"
//           >
//             {option.label}
//             {value === option.value && (
//               <BsCheck className="text-xl text-gray-600" />
//             )}
//           </Option>
//         ))}
//       </Select>
//     </div>
//   );
// };

// export default AnimatedDropdown;
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CustomTooltip from "./CustomTooltip";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { BsCheck } from "react-icons/bs";

const DROPDOWN_EVENT = "animatedDropdownToggle";

const AnimatedDropdown = ({
  id,
  name,
  label,
  tooltipContent = "",
  tooltipPlacement = "top",
  options = [],
  value = "",
  onChange,
  placeholder = "Select an option...",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside); // ✅ changed
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  // listen for global toggle events
  useEffect(() => {
    const handleEvent = (e) => {
      if (e.detail.id !== id) {
        setOpen(false);
      }
    };
    window.addEventListener(DROPDOWN_EVENT, handleEvent);
    return () => window.removeEventListener(DROPDOWN_EVENT, handleEvent);
  }, [id]);

  const handleOpenChange = useCallback(
    (isOpen) => {
      setOpen(isOpen);
      if (isOpen) {
        window.dispatchEvent(
          new CustomEvent(DROPDOWN_EVENT, { detail: { id } })
        );
      }
    },
    [id]
  );

  const handleChange = (selectedValue) => {
    if (selectedValue === "no-selection") onChange("");
    else onChange(selectedValue);
    setOpen(false);
  };
  return (
    <div className="relative w-full">
      {label && (
        <div className="flex items-center mb-2">
          <label
            htmlFor={id}
            className="text-sm font-medium text-gray-800 font-p"
          >
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
        value={value}
        // onChange={(e, selectedValue) => onChange(selectedValue)} // Update value
        onChange={(e, selectedValue) => handleChange(selectedValue)}
        placeholder={placeholder}
        indicator={<KeyboardArrowDown />}
        disabled={disabled}
        listboxOpen={open}
        onListboxOpenChange={handleOpenChange}
        sx={{
          width: "100%",
          [`& .${selectClasses.indicator}`]: {
            transition: "0.2s",
            [`&.${selectClasses.expanded}`]: {
              transform: "rotate(-180deg)",
            },
          },
        }}
        slotProps={{
          popper: {
            sx: { zIndex: 1500 }, // always above dialogs
          },
          listbox: {
            sx: {
              maxHeight: "300px",
              overflowY: "auto",
              minWidth: "250px",
              position: "relative",
              zIndex: 1500,
            },
          },
        }}
      >
        {/* Empty selection option */}
        <Option
          key="no-selection"
          value="no-selection"
          className="italic text-gray-500 font-p z-50"
        >
          -- No Selection --
        </Option>
        {options.map((option, index) => (
          <Option
            key={`${option.value}-${index}`}
            value={option.value}
            className="flex items-center justify-between font-serif font-p"
          >
            {option.label}
            {value === option.value && (
              <BsCheck className="text-xl text-gray-600" />
            )}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default AnimatedDropdown;
