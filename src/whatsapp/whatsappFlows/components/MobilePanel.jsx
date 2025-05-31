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
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const MobilePanel = ({ items, onUpdateItem }) => {
  console.log("Items:", items);
  
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

  console.log("itemsssssss", items)
  return (
    <div className="relative h-[830px] w-[370px] rounded-3xl shadow-md bg-white p-2 overflow-hidden border-3 border-black">
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Preview
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", p: 2 }}>
        {items.map((item, index) => {
          console.log("item", item)
          switch (item.type) {
            // Render Heading
            case "heading":
              return (
                <Typography
                  key={index}
                  variant="h5"
                  className="text-lg font-semibold mb-1"
                >
                  {item.heading || "Heading Placeholder"}
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
                  {item.subheading || "Subheading Placeholder"}
                </Typography>
              );

            // Render Text Body and Text Caption
            case "textbody":
              return (
                <Typography key={index} variant="h8" sx={{ whiteSpace: "pre-line" }}>
                  {item.textbody || "Text Body "}
                </Typography>
              );

            case "textcaption":
              return (
                <Typography
                  key={index}
                  variant="caption"
                // sx={{ whiteSpace: "pre-line" }}
                >
                  {item.textcaption|| "Text Caption Placeholder"}
                </Typography>
              );

            // Render Text Input
            case "textInput":
              return (
                <div key={index} className="mb-4">
                <Typography
                  variant="caption"
                // sx={{ whiteSpace: "pre-line" }}
                >
                  {item.texts?.textInput_1?.label || "Label"}
                </Typography>

                <InputField
                  fullWidth
                  placeholder={item.texts?.textInput_1?.helper_text || "Placeholder"}
                  // placeholder="Text Input Placeholder"
                  // onChange={(e) =>
                  //   onUpdateItem &&
                  //   onUpdateItem(index, (prevItem) => ({
                  //     ...prevItem,
                  //     value: e.target.value,
                  //   }))
                  // }
                />
                </div>
                
              );

            // Render Text Area
            case "textArea":
              return (
                <div key={index} className="mb-4">
                   <Typography variant="caption">
                      {item.texts?.textArea_1?.label || "Label"}
                    </Typography>

                <InputField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder={item.texts?.textArea_1?.helper_text || "Placeholder"}
                  // placeholder="Text Area Placeholder"
                  // onChange={(e) =>
                  //   onUpdateItem &&
                  //   onUpdateItem(index, (prevItem) => ({
                  //     ...prevItem,
                  //     value: e.target.value,
                  //   }))
                  // }
                />
                </div>
              );


            // Render Checkboxes
            case "checkBox":
  return (
    <Box key={index} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
      {/* Main Label for the Checkbox Group */}
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        {item?.checkboxGroups?.checkbox_1.label || "Checkbox Group"}
      </Typography>

      {/* Checkbox List */}
       {(Array.isArray(item?.checkboxGroups?.checkbox_1.options) && item.checkboxGroups.checkbox_1.options.length > 0
  ? item.checkboxGroups.checkbox_1.options
  : [
      { title: 'Dummy Option 1', description: 'Description 1', image: 'https://via.placeholder.com/40' },
      { title: 'Dummy Option 2', description: 'Description 2', image: 'https://via.placeholder.com/40' }
    ]
).map((option, optionIndex) => (
  <Box
    key={optionIndex}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 1,
      mb: 1,
      // border: '1px solid #eee',
      borderRadius: 1,
    }}
  >
    {/* Left Side: Image + Text */}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {option.image && (
        <Box
          component="img"
          src={option.image}
          alt={option.title || `Option ${optionIndex + 1}`}
          sx={{ width: 40, height: 40, borderRadius: '10%', mr: 1 }}
        />
      )}

      <Box>
        <Typography variant="body2" fontWeight={600}>
          {option.title || `Option ${optionIndex + 1}`}
        </Typography>
        {option.description && (
          <Typography variant="caption" color="text.secondary">
            {option.description}
          </Typography>
        )}
      </Box>
    </Box>

    {/* Right Side: Checkbox */}
    <Checkbox
      checked={item.checked?.[optionIndex] || false}
      onChange={(e) =>
        handleCheckboxChange(index, optionIndex, e.target.checked)
      }
      icon={<CheckBoxOutlineBlankIcon />}
      checkedIcon={<CheckBoxIcon />}
    />
  </Box>
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
                <div className="w-full max-w-md  text-center py-2 bottom-0 absolute pr-12">
                    {/* Left and Right Captions */}
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <p>{item.footer ? item.footer.footer_1.left_caption : "Left Caption"}</p>
                      <p>{item.footer ? item.footer.footer_1.right_caption : "Right Caption"}</p>
                    </div>

                    {/* Footer Button */}
                    <button className="w-full bg-green-700 text-white py-1 rounded-full hover:bg-green-800 transition-all">
                      {item.footer ? item.footer?.footer_1.center_caption : "Click me"}
                    </button>

                    {/* Managed by Section */}
                    <p className="text-xs text-gray-500 mt-2">
                      Managed by the business. <a href="#" className="text-blue-600 hover:underline">Learn more</a>
                    </p>
                  </div>
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