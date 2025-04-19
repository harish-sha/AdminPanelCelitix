import React from "react";
import PropTypes from "prop-types";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const RadioGroupField = ({ label, value, onChange, options = [] }) => {
  return (
    <div className="flex items-center " >
      {label && (
        <FormLabel sx={{ marginRight: 2, fontSize: "0.875rem", fontWeight: 700, color: "black" }}>
          {label}
        </FormLabel>
      )}
      <FormControl
        component="fieldset"
      >
        <RadioGroup row value={value} onChange={onChange}  >
          {options.map((option) => (
            <FormControlLabel sx={{ color: "black" }} className="text-black" key={option.value} value={option.value} control={<Radio />} label={option.label} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

// Define PropTypes for validation
RadioGroupField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default RadioGroupField
