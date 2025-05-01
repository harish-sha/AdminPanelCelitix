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
  ref = null,
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (storageKey) {
      const storedText = localStorage.getItem(storageKey);
      if (storedText) setText(storedText);
    }
  }, [storageKey]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    if (storageKey) {
      localStorage.setItem(storageKey, newText);
    }
    if (onChange) {
      onChange(e);
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
        ref={ref}
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

UniversalTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  storageKey: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
};

UniversalTextArea.defaultProps = {
  placeholder: "Type something...",
  error: false,
  onChange: () => { },
};

export default UniversalTextArea;
