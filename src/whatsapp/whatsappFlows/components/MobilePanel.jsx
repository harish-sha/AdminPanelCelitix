import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Radio,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  FormControl,
  FormLabel,
  Slide,
  Chip,
} from "@mui/material";
import InputField from "../../components/InputField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import UniversalDatePicker from "../../components/UniversalDatePicker";


const MobilePanel = ({ items, onUpdateItem }) => {
  const [radioBtnLabel, setRadioBtnLabel] = useState("Choose an option");
  const [radioButtonOptions, setRadioButtonOptions] = useState([
    { title: "Option 1", description: "Description 1", image: "url1.png" },
    { title: "Option 2", description: "Description 2", image: "url2.png" },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (index, optionIndex, checked) => {
    if (onUpdateItem) {
      onUpdateItem(index, (prevItem) => {
        const updatedChecked = [...(prevItem.checked || [])];
        updatedChecked[optionIndex] = checked;
        return { ...prevItem, checked: updatedChecked };
      });
    }
  };

  const handleRadioChange = (index, groupId, selectedValue) => {
    if (onUpdateItem) {
      onUpdateItem(index, (prevItem) => {
        const updatedSelected = { ...(prevItem.selected || {}) };
        updatedSelected[groupId] = selectedValue;
        return { ...prevItem, selected: updatedSelected };
      });
    }
  };

  const handleDropdownChange = (index, dropdownId, selectedValue) => {
    if (onUpdateItem) {
      onUpdateItem(index, (prevItem) => {
        const updatedSelected = { ...(prevItem.selected || {}) };
        updatedSelected[dropdownId] = selectedValue;

        return {
          ...prevItem,
          selected: updatedSelected,
        };
      });
    }
  };

  // chipSelector
  const handleChipOptionClick = (itemIndex, optionName) => {
    onUpdateItem &&
      onUpdateItem(itemIndex, (prevItem) => {
        const selected = prevItem.selected || [];

        const isSelected = selected.includes(optionName);
        const newSelected = isSelected
          ? selected.filter((name) => name !== optionName)
          : [...selected, optionName];

        if (!isSelected && newSelected.length > 2) {
          toast.error("You can select up to 2 options only.");
          return prevItem;
        }

        return {
          ...prevItem,
          selected: newSelected,
        };
      });
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // console.log("File uploaded:", selectedFile.name);
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handlePhotoUpload = (e) => {
    const selectedPhoto = e.target.files[0];
    if (selectedPhoto) {
      setUploadPhoto(selectedPhoto);
      // console.log("Photo uploaded:", selectedPhoto.name);
    } else {
      alert("Please choose a photo.");
    }
  };

  // console.log("itemsssssss", items)

  return (
    <div className="relative h-[830px] w-[370px] rounded-3xl shadow-md bg-white p-2  border-3 border-black hide-scrollbar overflow-auto">
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Preview
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", p: 2 }}>
        {items.map((item, index) => {
          // console.log("item", item);
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
                <Typography
                  key={index}
                  variant="h8"
                  sx={{ whiteSpace: "pre-line" }}
                >
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
                  {item.textcaption || "Text Caption Placeholder"}
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
                    placeholder={
                      item.texts?.textInput_1?.helper_text || "Placeholder"
                    }
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
                    placeholder={
                      item.texts?.textArea_1?.helper_text || "Placeholder"
                    }
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
            // anshu
            case "checkBox":
              return (
                <Box key={index} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                  {item?.checkboxGroups &&
                    Object.keys(item.checkboxGroups).length > 0 ? (
                    Object.entries(item.checkboxGroups).map(
                      ([groupId, groupData], groupIdx) => (
                        <Box key={groupId} sx={{ mb: 2 }}>
                          {/* Group Label */}
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {groupData.label ||
                              `Checkbox Group ${groupIdx + 1}`}
                          </Typography>

                          {/* Options List */}
                          {(groupData["data-source"] || []).map(
                            (option, optionIndex) => (
                              <Box
                                key={optionIndex}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  p: 1,
                                  mb: 1,
                                  borderRadius: 1,
                                  border: "1px solid #e0e0e0",
                                }}
                              >
                                {/* Left: Image + Title/Desc */}
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  {option.image && (
                                    <Box
                                      component="img"
                                      src={option.image}
                                      alt={
                                        option.title ||
                                        `Option ${optionIndex + 1}`
                                      }
                                      sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        mr: 1,
                                        border: "1px solid #ccc",
                                      }}
                                    />
                                  )}
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      fontWeight={600}
                                    >
                                      {option.title ||
                                        `Option ${optionIndex + 1}`}
                                    </Typography>
                                    {option.description && (
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                      >
                                        {option.description}
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>

                                {/* Right: Checkbox */}
                                <Checkbox
                                  checked={
                                    item.checked?.[
                                    `${groupId}_${optionIndex}`
                                    ] || false
                                  }
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      index,
                                      `${groupId}_${optionIndex}`,
                                      e.target.checked
                                    )
                                  }
                                  icon={<CheckBoxOutlineBlankIcon />}
                                  checkedIcon={<CheckBoxIcon />}
                                />
                              </Box>
                            )
                          )}
                        </Box>
                      )
                    )
                  ) : (
                    <Typography color="text.secondary">
                      No checkbox groups found.
                    </Typography>
                  )}
                </Box>
              );
            // anshu

            // Render Radio Buttons
            case "radioButton":
              return (
                <Box key={index} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                  {item?.radioButton &&
                    Object.keys(item.radioButton).length > 0 ? (
                    Object.entries(item.radioButton).map(
                      ([groupId, groupData], groupIdx) => (
                        <Box key={groupId} sx={{ mb: 2 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {groupData.label || `Radio Group ${groupIdx + 1}`}
                          </Typography>

                          <RadioGroup
                            name={`radio-${groupId}`}
                            value={item.selected?.[groupId] || ""}
                            onChange={(e) =>
                              handleRadioChange(index, groupId, e.target.value)
                            }
                          >
                            {(groupData["data-source"] || []).map(
                              (option, optionIndex) => (
                                <FormControlLabel
                                  key={optionIndex}
                                  value={option.id}
                                  control={<Radio />}
                                  label={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {option.image && (
                                        <Box
                                          component="img"
                                          src={option.image}
                                          alt={
                                            option.title ||
                                            `Option ${optionIndex + 1}`
                                          }
                                          sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            mr: 1,
                                            border: "1px solid #ccc",
                                          }}
                                        />
                                      )}
                                      <Box>
                                        <Typography
                                          variant="body2"
                                          fontWeight={600}
                                        >
                                          {option.title ||
                                            `Option ${optionIndex + 1}`}
                                        </Typography>
                                        {option.description && (
                                          <Typography
                                            variant="caption"
                                            color="text.secondary"
                                          >
                                            {option.description}
                                          </Typography>
                                        )}
                                      </Box>
                                    </Box>
                                  }
                                  sx={{
                                    mb: 1,
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    border: "1px solid #e0e0e0",
                                    alignItems: "flex-start",
                                  }}
                                />
                              )
                            )}
                          </RadioGroup>
                        </Box>
                      )
                    )
                  ) : (
                    <Typography color="text.secondary">
                      No radio groups found.
                    </Typography>
                  )}
                </Box>
              );

            // Render Dropdown
            case "dropDown":
              return (
                <Box key={index} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                  {item?.dropdown && Object.keys(item.dropdown).length > 0 ? (
                    Object.entries(item.dropdown).map(
                      ([dropdownId, dropdownData], groupIdx) => (
                        <Box key={dropdownId} sx={{ mb: 2 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {dropdownData.label || `Dropdown ${groupIdx + 1}`}
                          </Typography>

                          <TextField
                            select
                            fullWidth
                            size="small"
                            value={item.selected?.[dropdownId] || ""}
                            onChange={(e) =>
                              handleDropdownChange(
                                index,
                                dropdownId,
                                e.target.value
                              )
                            }
                            sx={{ backgroundColor: "#fff" }}
                          >
                            {(dropdownData["data-source"] || []).map(
                              (option, optIdx) => (
                                <MenuItem key={option.id} value={option.id}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {option.image && (
                                      <Box
                                        component="img"
                                        src={option.image}
                                        alt={
                                          option.title || `Option ${optIdx + 1}`
                                        }
                                        sx={{
                                          width: 30,
                                          height: 30,
                                          borderRadius: 1,
                                          mr: 1,
                                          border: "1px solid #ccc",
                                        }}
                                      />
                                    )}
                                    <Box>
                                      <Typography
                                        variant="body2"
                                        fontWeight={600}
                                      >
                                        {option.title}
                                      </Typography>
                                      {option.description && (
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                        >
                                          {option.description}
                                        </Typography>
                                      )}
                                    </Box>
                                  </Box>
                                </MenuItem>
                              )
                            )}
                          </TextField>
                        </Box>
                      )
                    )
                  ) : (
                    <Typography color="text.secondary">
                      No dropdowns found.
                    </Typography>
                  )}
                </Box>
              );

            case "chipSelector":
              return (
                <div className="p-2 bg-gray-100 rounded-lg">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    {item.label || "Select Options"}
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {(item["data-source"] || []).map((option, i) => {
                      const isSelected = (item.selected || []).includes(
                        option.title
                      );

                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() =>
                            handleChipOptionClick(index, option.title)
                          }
                          className={`px-3 py-1 rounded-full text-sm border transition-all ${isSelected
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-800 border-gray-300"
                            }`}
                        >
                          {option.title}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    {(item.selected || []).length} selected (max 2)
                  </p>
                </div>
              );

            case "footerbutton":
              return (
                <>
                  <div className="w-full max-w-md  text-center py-2 bottom-0 ">
                    {/* Left and Right Captions */}
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <p>
                        {item.footer
                          ? item.footer.footer_1.left_caption
                          : "Left Caption"}
                      </p>
                      <p>
                        {item.footer
                          ? item.footer.footer_1.right_caption
                          : "Right Caption"}
                      </p>
                    </div>

                    {/* Footer Button */}
                    <button className="w-full bg-green-700 text-white py-1 rounded-full hover:bg-green-800 transition-all">
                      {item.footer
                        ? item.footer?.footer_1.center_caption
                        : "Click me"}
                    </button>

                    {/* Managed by Section */}
                    <p className="text-xs text-gray-500 mt-2">
                      Managed by the business.{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Learn more
                      </a>
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
              );

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
              );

            case "image":
              return (
                <Box key={index}>
                  <InputField
                    type="file"
                    id="file-upload"
                    accept=".png, .jpeg,"
                    onChange={handlePhotoUpload}
                  />
                </Box>
              );

            case "document":
              return (
                <>
                  {item.type === "document" && (
                    <div className="p-4 border rounded-md shadow-sm">
                      <p className="font-semibold">
                        {item.label || "Upload photos"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Min Photos: {item["min-uploaded-photos"] || 1} | Max
                        Photos: {item["max-uploaded-photos"] || 1}
                      </p>
                      <div className="mt-2 border-2 border-dashed border-gray-300 p-2 text-center rounded-md">
                        <span className="text-green-400 space-x-2">
                          <ArticleOutlinedIcon />
                          Upload Document{" "}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              );
            case "media":
              return (
                <>
                  {item.type === "media" && (
                    <div className="p-4 border rounded-md shadow-sm">
                      <p className="font-semibold">
                        {item.label || "Upload photos"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Min Photos: {item["min-uploaded-photos"] || 1} | Max
                        Photos: {item["max-uploaded-photos"] || 10}
                      </p>
                      <div className="mt-2 border-2 border-dashed border-gray-300 p-2 text-center rounded-md">
                        <span className="text-green-400 space-x-2">
                          <AddAPhotoOutlinedIcon />
                          Take Photo{" "}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              );

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
              );
            case "switch":
              return <InputField placeholder="SWITCH" label="SWITCH" />;

            case "calendar":
              return (
                <div> </div>
                // <div className="w-full px-4 py-2">
                //   <label className="block text-sm font-medium text-gray-700 mb-1">
                //     {item.label || "Date"}
                //   </label>
                //   <UniversalDatePicker
                //     selected={item.value ? new Date(item.value) : null}
                //     onChange={(date) =>
                //       onUpdateItem &&
                //       onUpdateItem(index, (prevItem) => ({
                //         ...prevItem,
                //         value: date?.toISOString().split("T")[0], 
                //       }))
                //     }
                //     placeholderText={item.placeholder || "Select a date"}
                //     minDate={
                //       item["min-date"] ? new Date(item["min-date"]) : undefined
                //     }
                //     maxDate={
                //       item["max-date"] ? new Date(item["max-date"]) : undefined
                //     }
                //     // excludeDates={
                //     //   Array.isArray(item["unavailable-date"])
                //     //     ? item["unavailable-date"].map((d) => new Date(d))
                //     //     :  undefined
                //     // }
                //    unavailableDate={ item['unavailable-dates'] ? new Date(item['unavailable-dates']) : undefined
                //     }
                //     dateFormat="yyyy-MM-dd"
                //     className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                //   />
                //   {item.helperText && (
                //     <p className="text-xs text-gray-500 mt-1">
                //       {item.helperText}
                //     </p>
                //   )}
                // </div>
              );


            // Render Date
            case "date":
              return (
                <div className="w-full px-4 py-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {item.label}
                  </label>
                  <div className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100 text-gray-800">
                    {/* {item.value
                      ? new Date(item.value).toLocaleDateString()
                      : "No date selected"} */}

                    {item['max-date'] || "Date (Optional)"}
                  </div>
                </div>
              );

            // case "userdetail":
            //   return (
            //     <InputField
            //       value={item.value || ""}
            //       onChange={(e) =>
            //         onUpdateItem &&
            //         onUpdateItem(index, (prevItem) => ({
            //           ...prevItem,
            //           value: e.target.value,
            //         }))

            //       }
            //     />
            //   )

            default:
              return null;
          }
        })}
      </Box>
    </div>
  );
};
export default MobilePanel;
