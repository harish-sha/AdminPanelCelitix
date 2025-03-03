import React from "react";
import PropTypes from "prop-types";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const RadioGroupFieldupdown = ({ label, value,id, name, onChange, options = [] }) => {
  return (
    <div className="flex flex-col items-start"> {/* ✅ Changed layout to column */}
    {label && (
        <FormLabel 
          sx={{fontSize: "0.875rem", fontWeight: 500, color: "black" }}
        >
          {label}
        </FormLabel>
      )}
      <FormControl component="fieldset">
        {/* ✅ Radio buttons now appear ABOVE the label */}
        <RadioGroup row value={value} onChange={onChange}>
          {options.map((option) => (
            <FormControlLabel 
              key={option.value} 
              value={option.value} 
              id={id}
              name={name}  
              control={<Radio />} 
              label={option.label} 
              sx={{ color: "black" }}
            />
          ))}
        </RadioGroup>
      </FormControl>
      
      
    </div>
  );
};

// ✅ PropTypes validation
RadioGroupFieldupdown.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// ✅ Default props
RadioGroupFieldupdown.defaultProps = {
  label: "",
  options: [],
};

export default RadioGroupFieldupdown;
