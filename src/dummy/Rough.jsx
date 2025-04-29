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
        <div className="relative h-[900px] w-[370px] rounded-[40px] shadow-md mt-[50px] bg-white p-2 overflow-hidden border-[3px] border-black font-poppins">
            <Typography variant="h6" className="text-center font-semibold text-xl mb-2">
                Preview
            </Typography>

            <Box className="flex flex-col gap-2 p-2">
                {items.map((item, index) => {
                    switch (item.type) {
                        case "heading":
                            return (
                                <Typography
                                    key={index}
                                    variant="h3"
                                    className="text-[25px] font-semibold font-poppins mb-1"
                                >
                                    {item.value || "Heading Placeholder"}
                                </Typography>
                            );

                        case "subheading":
                            return (
                                <Typography
                                    key={index}
                                    variant="h4"
                                    className="text-[20px] font-medium font-poppins mb-1"
                                >
                                    {item.value || "Subheading Placeholder"}
                                </Typography>
                            );

                        case "textBody":
                            return (
                                <Typography
                                    key={index}
                                    className="text-[16px] font-light whitespace-pre-line mb-1"
                                >
                                    {item.value || "Text Body Placeholder"}
                                </Typography>
                            );

                        case "textCaption":
                            return (
                                <Typography
                                    key={index}
                                    variant="caption"
                                    className="text-[12px] font-poppins whitespace-pre-line mb-1"
                                >
                                    {item.value || "Text Caption Placeholder"}
                                </Typography>
                            );

                        case "textInput":
                            return (
                                <TextField
                                    key={index}
                                    fullWidth
                                    size="small"
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

                        case "textArea":
                            return (
                                <TextField
                                    key={index}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    size="small"
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
                                                    size="small"
                                                />
                                            }
                                            label={option || `Option ${optionIndex + 1}`}
                                        />
                                    ))}
                                </Box>
                            );

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
                                                    size="small"
                                                />
                                            }
                                            label={option || `Option ${optionIndex + 1}`}
                                        />
                                    ))}
                                </Box>
                            );

                        case "dropDown":
                            return (
                                <Select
                                    key={index}
                                    value={item.selectedOption || ""}
                                    onChange={(e) => handleDropdownChange(index, e.target.value)}
                                    fullWidth
                                    size="small"
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
