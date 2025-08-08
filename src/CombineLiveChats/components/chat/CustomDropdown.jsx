import { useState, useRef, useEffect } from "react";

function CustomDropdown({ options, value, onChange, placeholder = "Select..." }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div ref={dropdownRef} className="relative w-[150px] text-sm">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-left shadow-sm hover:border-gray-400"
      >
        {selectedLabel || <span className="text-gray-400">{placeholder}</span>}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${value === option.value ? "bg-gray-100 font-medium" : ""
                }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
