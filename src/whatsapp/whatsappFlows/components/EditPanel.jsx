import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./edit-panel.css";

const EditPanel = ({ selectedItem, onClose, onSave }) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [newOption, setNewOption] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setValue(selectedItem.value || "");
      setOptions(selectedItem.options || []);
      setChecked(selectedItem.checked || []);
      setSelectedOption(selectedItem.selectedOption || "");
    }
  }, [selectedItem]);

  const handleSave = () => {
    if (
      !value.trim() &&
      ["heading", "subheading", "textBody", "textCaption", "textInput", "textArea"].includes(
        selectedItem.type
      )
    ) {
      alert("Input cannot be empty!");
      return;
    }

    const updatedData = {
      ...selectedItem,
      value,
      options,
      checked,
      selectedOption,
    };

    onSave(updatedData);
    onClose();
  };

  const handleOptionChange = (index, newValue) => {
    setOptions((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[index] = newValue;
      return updatedOptions;
    });
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions((prev) => [...prev, newOption]);
      setNewOption("");
    }
  };

  const handleRemoveOption = (index) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Paper elevation={3} className="Edit-panel">
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Edit Item</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Input Fields for Text-Based Items */}
        {["heading", "subheading"].includes(selectedItem?.type) && (
          <TextField
            label={`Edit ${selectedItem.type}`}
            variant="outlined"
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

        {["textBody", "textCaption", "textArea"].includes(selectedItem?.type) && (
          <TextField
            label={`Edit ${selectedItem.type}`}
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

        {/* Editable Options for Checkboxes */}
        {selectedItem?.type === "checkBox" && (
          <FormControl>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Edit Checkboxes
            </Typography>
            {options.map((option, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <FormControlLabel
                  control={<Checkbox checked={checked[index] || false} />}
                  label={option}
                />
                <TextField
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  sx={{ flexGrow: 1, mr: 1 }}
                />
                <IconButton onClick={() => handleRemoveOption(index)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            <Box sx={{ display: "flex", mt: 2 }}>
              <TextField
                label="Add Option"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddOption}
                disabled={!newOption.trim()}
              >
                Add
              </Button>
            </Box>
          </FormControl>
        )}

        {/* Editable Options for Radio Buttons */}
        {selectedItem?.type === "radioButton" && (
          <FormControl>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Edit Radio Buttons
            </Typography>
            <RadioGroup value={selectedOption}>
              {options.map((option, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FormControlLabel
                    control={
                      <Radio
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => setSelectedOption(option)}
                      />
                    }
                    label={option}
                  />
                  <TextField
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    sx={{ flexGrow: 1, mr: 1 }}
                  />
                  <IconButton onClick={() => handleRemoveOption(index)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </RadioGroup>
            <Box sx={{ display: "flex", mt: 2 }}>
              <TextField
                label="Add Option"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddOption}
                disabled={!newOption.trim()}
              >
                Add
              </Button>
            </Box>
          </FormControl>
        )}

        {/* Editable Options for Dropdown */}
        {selectedItem?.type === "dropDown" && (
          <FormControl fullWidth>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Edit Dropdown Options
            </Typography>
            {options.map((option, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <TextField
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  sx={{ flexGrow: 1, mr: 1 }}
                />
                <IconButton onClick={() => handleRemoveOption(index)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            <Box sx={{ display: "flex", mt: 2 }}>
              <TextField
                label="Add Option"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddOption}
                disabled={!newOption.trim()}
              >
                Add
              </Button>
            </Box>
          </FormControl>
        )}

        {/* Save Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" onClick={handleSave} className="btn-flow2" >
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditPanel;
