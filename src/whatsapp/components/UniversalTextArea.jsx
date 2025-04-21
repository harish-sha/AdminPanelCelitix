// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// const UniversalTextArea = ({ label, id, name, value, storageKey, placeholder, error, onChange, col, row, readOnly=false }) => {
//   const [text, setText] = useState("");

//   // Load stored text from localStorage if storageKey is provided
//   useEffect(() => {
//     if (storageKey) {
//       const storedText = localStorage.getItem(storageKey);
//       if (storedText) setText(storedText);
//     }
//   }, [storageKey]);

//   // Handle text change
//   const handleTextChange = (e) => {
//     const newText = e.target.value;
//     setText(newText);
//     if (storageKey) {
//       localStorage.setItem(storageKey, newText); // Save to localStorage if needed
//     }
//     if (onChange) {
//       onChange(e); // Propagate the change
//     }
//   };

//   return (
//     <div className="w-full mb-2">
//       {label && (
//         <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">
//           {label}
//         </label>
//       )}
//       <textarea
//         id={id}
//         name={name}
//         value={value}
//         onChange={handleTextChange}
//         placeholder={placeholder}
//         cols={col}
//         rows={row}
//         readOnly={readOnly}
//         className={`w-full p-1.5 border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm ${
//           error ? "border-red-500" : "border-gray-300"
//         }`}
//       ></textarea>
//       {error && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
//     </div>
//   );
// };

// // ✅ Define prop types
// UniversalTextArea.propTypes = {
//   label: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   storageKey: PropTypes.string, // Optional, since it's not always used
//   placeholder: PropTypes.string,
//   error: PropTypes.bool,
//   onChange: PropTypes.func, // Ensure function type
// };

// // ✅ Set default props
// UniversalTextArea.defaultProps = {
//   placeholder: "Type something...",
//   error: false,
//   onChange: () => {}, // No-op function by default
// };

// export default UniversalTextArea;


import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UniversalTextArea = ({
  label,
  id,
  name,
  value,
  storageKey,
  placeholder,
  error,
  onChange,
  col,
  row,
  readOnly = false,
  className = "",
}) => {
  const [text, setText] = useState("");

  // Load stored text from localStorage if storageKey is provided
  useEffect(() => {
    if (storageKey) {
      const storedText = localStorage.getItem(storageKey);
      if (storedText) setText(storedText);
    }
  }, [storageKey]);

  // Handle text change
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    if (storageKey) {
      localStorage.setItem(storageKey, newText); // Save to localStorage if needed
    }
    if (onChange) {
      onChange(e); // Propagate the change
    }
  };

  return (
    <div className="w-full mb-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={handleTextChange}
        placeholder={placeholder}
        cols={col}
        rows={row}
        readOnly={readOnly}
        className={`w-full p-1.5 border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm ${className} ${error ? "border-red-500" : "border-gray-300"
          }`}
      ></textarea>
      {error && (
        <p className="text-red-500 text-xs mt-1">This field is required.</p>
      )}
    </div>
  );
};

// ✅ Define prop types
UniversalTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  storageKey: PropTypes.string, // Optional, since it's not always used
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func, // Ensure function type
};

// ✅ Set default props
UniversalTextArea.defaultProps = {
  placeholder: "Type something...",
  error: false,
  onChange: () => { }, // No-op function by default
};

export default UniversalTextArea;
