import React, { useState, useEffect, useRef } from "react";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { Divider } from "@mui/material";

const InputVariable = ({ variables = [], onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (variable) => {
    onSelect(variable);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="px-1 border-1 border-gray-300 rounded-r-sm h-8.5 text-sm bg-gray-200 cursor-pointer focus:outline-none"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <PiBracketsCurlyBold />
      </button>
      {showDropdown && (
        <div className="absolute min-w-30 z-99999  left-[35px] max-h-47 overflow-auto  bg-white border border-gray-300 rounded-sm shadow-md top-0 ">
          {variables && variables.length > 0 ? (
            variables.map((variable, idx) => (
              <React.Fragment key={variable + idx}>
                {" "}
                {/* Ensure key is unique */}
                <button
                  key={idx}
                  className="block w-full py-2 px-1 text-[0.85rem] tracking-wide text-gray-700 hover:bg-gray-100 cursor-pointer text-center whitespace-nowrap focus:outline-none"
                  onClick={() => handleSelect(variable)}
                >
                  {variable}
                </button>
                <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
              </React.Fragment>
            ))
          ) : (
            <p className="text-gray-600 text-center whitespace-nowrap py-1 text-[0.8rem] tracking-wide">
              No variables!{" "}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputVariable;
