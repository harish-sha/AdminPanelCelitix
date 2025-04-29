import React from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Radio,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import "./mobilepanel.css";

const MobilePanel = ({ items, onUpdateItem }) => {
  const handleCheckboxChange = (index, optionIndex, checked) => {
    if (onUpdateItem) {
      onUpdateItem(index, (prevItem) => {
        const updatedChecked = [...(prevItem.checked || [])];
        updatedChecked[optionIndex] = checked;
        return { ...prevItem, checked: updatedChecked };
      });
    }
  };

  const handleRadioChange = (index, selectedOption) => {
    if (onUpdateItem) {
      onUpdateItem(index, (prevItem) => ({
        ...prevItem,
        selectedOption,
      }));
    }
  };
  
  const handleDropdownChange = (index, selectedValue) => {
    if (onUpdateItem) {
      onUpdateItem(index, (prevItem) => ({
        ...prevItem,
        selectedOption: selectedValue,
      }));
    }
  };

  return (
    <div className="relative h-[900px] w-[370px] rounded-3xl shadow-md mt-13 bg-white p-2 overflow-hidden border-3 border-black">
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Preview
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", p: 2 }}>
        {items.map((item, index) => {
          switch (item.type) {
            // Render Heading
            case "heading":
              return (
                <Typography key={index} variant="h3" className="heading-preview " >
                  {item.value || "Heading Placeholder"}
                </Typography>
              );

            // Render Subheading
            case "subheading":
              return (
                <Typography key={index} variant="h4" className="subheading-preview" >
                  {item.value || "Subheading Placeholder"}
                </Typography>
              );

            // Render Text Body and Text Caption
            case "textBody":
              return (
                <Typography key={index} sx={{ whiteSpace: "pre-line" }}>
                  {item.value || "Text Body Placeholder"}
                </Typography>
              );

            case "textCaption":
              return (
                <Typography key={index} variant="caption" sx={{ whiteSpace: "pre-line" }}>
                  {item.value || "Text Caption Placeholder"}
                </Typography>
              );

            // Render Text Input
            case "textInput":
              return (
                <TextField
                  key={index}
                  fullWidth
                  value={item.value || ""}
                  placeholder="Text Input Placeholder"
                  onChange={(e) =>
                    onUpdateItem &&
                    onUpdateItem(index, (prevItem) => ({
                      ...prevItem,
                      value: e.target.value,
                    }))
                  }
                />
              );

            // Render Text Area
            case "textArea":
              return (
                <TextField
                  key={index}
                  fullWidth
                  multiline
                  rows={4}
                  value={item.value || ""}
                  placeholder="Text Area Placeholder"
                  onChange={(e) =>
                    onUpdateItem &&
                    onUpdateItem(index, (prevItem) => ({
                      ...prevItem,
                      value: e.target.value,
                    }))
                  }
                />
              );

            // Render Checkboxes
            case "checkBox":
              return (
                <Box key={index}>
                  {(item.options || []).map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      control={
                        <Checkbox
                          checked={item.checked?.[optionIndex] || false}
                          onChange={(e) =>
                            handleCheckboxChange(index, optionIndex, e.target.checked)
                          }
                        />
                      }
                      label={option || `Option ${optionIndex + 1}`}
                    />
                  ))}
                </Box>
              );

            // Render Radio Buttons
            case "radioButton":
              return (
                <Box key={index}>
                  {(item.options || []).map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      control={
                        <Radio
                          checked={item.selectedOption === option}
                          onChange={() => handleRadioChange(index, option)}
                        />
                      }
                      label={option || `Option ${optionIndex + 1}`}
                    />
                  ))}
                </Box>
              );

            // Render Dropdown
            case "dropDown":
              return (
                <Select
                  key={index}
                  value={item.selectedOption || ""}
                  onChange={(e) => handleDropdownChange(index, e.target.value)}
                  fullWidth
                >
                  {(item.options || []).map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>
                      {option || `Option ${optionIndex + 1}`}
                    </MenuItem>
                  ))}
                </Select>
              );

            default:
              return null;
          }
        })}
      </Box>
    </div>
  );
};

export default MobilePanel;
