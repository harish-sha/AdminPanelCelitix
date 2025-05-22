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
import InputField from "../../components/InputField";

const MobilePanel = ({ items, onUpdateItem }) => {
  // console.log("Items:", items);
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

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File uploaded:", selectedFile.name);
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handlePhotoUpload = (e) => {
    const selectedPhoto = e.target.files[0];
    if (selectedPhoto) {
      setUploadPhoto(selectedPhoto);
      console.log("Photo uploaded:", selectedPhoto.name);
    } else {
      alert("Please choose a photo.");
    }
  };

  return (
    <div className="relative h-[830px] w-[370px] rounded-3xl shadow-md bg-white p-2 overflow-hidden border-3 border-black">
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Preview
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", p: 2 }}>
        {items.map((item, index) => {
          switch (item.type) {
            // Render Heading
            case "heading":
              return (
                <Typography
                  key={index}
                  variant="h5"
                  className="text-lg font-semibold mb-1"
                >
                  {item.value || "Heading Placeholder"}
                </Typography>
              );

            // Render Subheading
            case "subheading":
              return (
                <Typography
                  key={index}
                  variant="h8"
                  className="text-md font-medium  mb-1"
                >
                  {item.value || "Subheading Placeholder"}
                </Typography>
              );

            // Render Text Body and Text Caption
            case "textbody":
              return (
                <Typography key={index} variant="h8" sx={{ whiteSpace: "pre-line" }}>
                  {item.value || "Text Body "}
                </Typography>
              );

            case "textcaption":
              return (
                <Typography
                  key={index}
                  variant="caption"
                // sx={{ whiteSpace: "pre-line" }}
                >
                  {item.value || "Text Caption Placeholder"}
                </Typography>
              );

            // Render Text Input
            case "textInput":
              return (
                <InputField
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
                <InputField
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
                            handleCheckboxChange(
                              index,
                              optionIndex,
                              e.target.checked
                            )
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

            case "footerbutton":
              return (
                <>

                  <InputField
                    label=" "
                    placeholder="Input 1"
                    value={item.value || ""}
                    onChange={(e) =>
                      onUpdateItem &&
                      onUpdateItem(index, (prevItem) => ({
                        ...prevItem,
                        value: e.target.value,
                      }))
                    }
                  />
                  <InputField
                    label=" "
                    placeholder="Input 2"
                    value={item.value || ""}
                    onChange={(e) =>
                      onUpdateItem &&
                      onUpdateItem(index, (prevItem) => ({
                        ...prevItem,
                        value: e.target.value,
                      }))
                    }
                  />
                </>
              );

            case "embeddedlink":
              return (
                <InputField
                  type="url"
                  placeholder="Enter a valid URL"
                  value={item.value || ""}
                  onChange={(e) =>
                    onUpdateItem &&
                    onUpdateItem(index, (prevItem) => ({
                      ...prevItem,
                      value: e.target.value,
                    }))
                  }
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              )

            case "optin":
              return (
                <InputField
                  placeholder="Opt-In"
                  value={item.value || ""}
                  onChange={(e) =>
                    onUpdateItem &&
                    onUpdateItem(index, (prevItem) => ({
                      ...prevItem,
                      value: e.target.value,
                    }))

                  }
                />
              )

            case "photo":
              return (
                <Box key={index}>
                  <InputField
                    type="file"
                    id="file-upload"
                    accept=".png, .jpeg,"
                    onChange={handlePhotoUpload}
                  />
                </Box>
              )

            case "document":
              return (
                <InputField
                  value={item.value || ""}
                  onChange={(e) =>
                    onUpdateItem &&
                    onUpdateItem(index, (prevItem) => ({
                      ...prevItem,
                      value: e.target.value,
                    }))

                  }
                />
              )

            case "ifelse":
              return (
                <InputField
                  value={item.value || ""}
                  onChange={(e) =>
                    onUpdateItem &&
                    onUpdateItem(index, (prevItem) => ({
                      ...prevItem,
                      value: e.target.value,
                    }))

                  }
                />
              )

            case "image":
              return (
                <InputField
                  value={item.value || ""}
                  onChange={(e) =>
                    onUpdateItem &&
                    onUpdateItem(index, (prevItem) => ({
                      ...prevItem,
                      value: e.target.value,
                    }))

                  }
                />
              )

            case "date":
              return (
                <InputField
                  value={item.value || ""}
                  onChange={(value) =>
                    onUpdateItem &&
                    onUpdateItem(index, (prevItem) => ({
                      ...prevItem,
                      value: value,
                    }))

                  }
                />
              )

            case "userdetail":
              return (
                <InputField
                  value={item.value || ""}
                  onChange={(e) =>
                    onUpdateItem &&
                    onUpdateItem(index, (prevItem) => ({
                      ...prevItem,
                      value: e.target.value,
                    }))

                  }
                />
              )

            default:
              return null;
          }
        })}
      </Box>
    </div>
  );
};

export default MobilePanel;
