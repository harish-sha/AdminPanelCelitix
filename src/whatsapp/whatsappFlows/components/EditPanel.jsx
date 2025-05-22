import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
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
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UniversalButton from "../../components/UniversalButton";
import toast from "react-hot-toast";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import UniversalDatePicker from "../../components/UniversalDatePicker";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import { is } from "date-fns/locale";

const EditPanel = ({ selectedItem, onClose, onSave }) => {

  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [newOption, setNewOption] = useState("");
  const [isToggled, setIsToggled] = useState(false)
  const [file, setFile] = useState("")
  const [uploadPhoto, setUploadPhoto] = useState("")

  useEffect(() => {
    if (selectedItem) {
      setValue(selectedItem.value || "");
      setOptions(selectedItem.options || []);
      setChecked(selectedItem.checked || []);
      setSelectedOption(selectedItem.selectedOption || "");

    }
  }, [selectedItem]);

  const handleToggle = () => {
    // if (isToggled) {
    //    setIsToggled(false);

    // } else {
    //  setIsToggled(true); 
    // }

    // setIsToggled((prev) = !prev)
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

  const handleSave = () => {
    if (
      !value.trim() &&
      [
        "heading",
        "subheading",
        "textbody",
        "textcaption",
        "textInput",
        "textArea",
      ].includes(selectedItem.type)
    ) {
      toast.error("Input cannot be empty!");
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
      <Paper
        elevation={3}
        // className="bg-white z-10 p-5 absolute top-[40%] left-[78%] translate-x-[-50%] translate-y-[-50%] w-[70%] md:w-[40%] lg:w-[40%] xl:w-[40%] h-[87%] mt-29"
        className="bg-white z-10 p-5 absolute right-3 w-80 top-18"
      >
        {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Typography variant="h6">Edit Item</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box> */}

        <div className="flex items-center justify-between">
          <Typography variant="h7">Edit Item</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>


        {/* Input Fields for Text-Based Items */}
        {["heading", "subheading"].includes(selectedItem?.type) && (
          <div className="mb-2 font-semibold text-lg">
            <InputField
              label={`Edit ${selectedItem.type}`}
              variant="outlined"
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
            // sx={{ mb: 2 ,fontSize:"md" }}
            />
            <Switch
              color={isToggled ? "primary" : "secondary"}
              onChange={handleToggle}
            // {isToggled ? "ON" : "OFF"}
            />
            {isToggled && (
              <AnimatedDropdown
                // onHide={false}
                value={isToggled}
                onChange={(value) => handleToggle(value)}
                fullWidth
                sx={{ marginTop: 2 }}
                visible={isToggled}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" }
                ]}

              />
            )}
          </div>
        )}


        {["textbody", "textcaption", "textInput", "textArea"].includes(
          selectedItem?.type) && (
            <div className="mb-2 font-bold text-lg">
              <InputField
                // label={`Edit ${selectedItem.type}`}
                placeholder={`Edit ${selectedItem.type}`}
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              // sx={{ mb: 2 }}
              />
              <Switch
                color={isToggled ? "primary" : "secondary"}
                onClick={handleToggle}
              // {isToggled ? "ON" : "OFF"}
              />
              {isToggled && (
                <AnimatedDropdown
                  value={isToggled}
                  onChange={(value) => handleToggle(value)}
                  fullWidth
                  sx={{ marginTop: 2 }}
                  visible={isToggled === isToggled}
                  options={[
                    { value: "A", label: "A" },
                    { value: "B", label: "B" },
                    { value: "C", label: "C" },
                    { value: "D", label: "D" }
                  ]}
                />
              )}
            </div>
          )}



        {/* Editable Options for Checkboxes */}
        {selectedItem?.type === "checkBox" && (
          <FormControl>
            {/* <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Edit Checkboxes
            </Typography> */}
            {options.map((option, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <FormControlLabel
                  control={<Checkbox checked={checked[index] || false} />}
                  label={option}
                />
                <InputField
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  sx={{ flexGrow: 1, mr: 1 }}
                />
                <IconButton onClick={() => handleRemoveOption(index)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            <Box sx={{ display: "flex", mt: 2, }}>
              <div className="w-62">
                <InputField
                  label="Add Option"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                // sx={{ flexGrow: 1, mr: 1 }}
                />
              </div>
              <button
                // variant="outlined"
                // size="small"
                onClick={handleAddOption}
                disabled={!newOption.trim()}
                className="mt-5 ml-2"
              >
                <AddCircleOutlineOutlinedIcon className="text-gray-800 font-bold " size="20" />
              </button>
            </Box>
          </FormControl>
        )}

        {/* Editable Options for Radio Buttons */}
        {selectedItem?.type === "radioButton" && (
          <FormControl>
            {/* <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Edit Radio Buttons
            </Typography> */}
            <RadioGroup value={selectedOption}>
              {options.map((option, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
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
                  <InputField
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
              <div className="w-62">
                <InputField
                  label="Add Option"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  sx={{ flexGrow: 1, mr: 1 }}
                />
              </div>
              <button
                // variant="outlined"
                // size="small"
                onClick={handleAddOption}
                disabled={!newOption.trim()}
                className="mt-5 ml-2"
              >
                <AddCircleOutlineOutlinedIcon className="text-gray-800 font-bold " size="20" />
              </button>

            </Box>
          </FormControl>
        )}

        {/* Editable Options for Dropdown */}
        {selectedItem?.type === "dropDown" && (
          <FormControl fullWidth>
            {/* <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Edit Dropdown Options
            </Typography> */}
            {options.map((option, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <InputField
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
              <InputField
                label="Add Option"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
              // sx={{ flexGrow: 1, mr: 1 }}
              />
              <button
                // variant="outlined"
                // size="small"
                onClick={handleAddOption}
                disabled={!newOption.trim()}
                className="mt-5 ml-2"
              >
                <AddCircleOutlineOutlinedIcon className="text-gray-800 font-bold " size="20" />
              </button>
            </Box>
          </FormControl>
        )}


        {/* Editable option for FooterButton  */}
        {selectedItem?.type === "footerbutton" && (
          <>
            <InputField
              label=" "
              placeholder="Input 1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <InputField
              label=" "
              placeholder="Input 2"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Switch
              color={isToggled ? "primary" : "secondary"}
              onClick={handleToggle}
            // {isToggled ? "ON" : "OFF"}
            />
            {isToggled && (
              <AnimatedDropdown
                value={isToggled}
                onChange={(value) => handleToggle(value)}
                fullWidth
                sx={{ marginTop: 2 }}
                visible={isToggled === isToggled}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" }
                ]}
              />
            )}
          </>
        )}


        {/* Editable option for Embedded link */}
        {selectedItem?.type === "embeddedlink" && (
          <>
            <InputField
              label=" "
              placeholder="Button Embedded Link"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Switch
              color={isToggled ? "primary" : "secondary"}
              onClick={handleToggle}
            // {isToggled ? "ON" : "OFF"}
            />
            {isToggled && (
              <AnimatedDropdown
                value={isToggled}
                onChange={(value) => handleToggle(value)}
                fullWidth
                sx={{ marginTop: 2 }}
                visible={isToggled === isToggled}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" }
                ]}
              />
            )}
          </>
        )
        }

        {/* Editable option for Opt In */}
        {selectedItem?.type === "optin" && (
          <>
            <InputField
              // label="Opt-In"
              placeholder="Opt-In"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Switch
              color={isToggled ? "primary" : "secondary"}
              onClick={handleToggle}
            // {isToggled ? "ON" : "OFF"}
            />
            {isToggled && (
              <AnimatedDropdown
                value={isToggled}
                onChange={(value) => handleToggle(value)}
                fullWidth
                sx={{ marginTop: 2 }}
                visible={isToggled === isToggled}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" }
                ]}
              />
            )}
          </>
        )}

        {selectedItem?.type === "photo" && (
          <>

            <InputField
              type="file"
              id="file-upload"
              accept=".png, .jpeg,"
              onChange={handlePhotoUpload}
            />
            <Switch
              color={isToggled ? "primary" : "secondary"}
              onClick={handleToggle}
            // {isToggled ? "ON" : "OFF"}
            />
            {isToggled && (
              <AnimatedDropdown
                value={isToggled}
                onChange={(value) => handleToggle(value)}
                fullWidth
                sx={{ marginTop: 2 }}
                visible={isToggled === isToggled}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" }
                ]}
              />
            )}
          </>
        )}

        {selectedItem?.type === "document" && (
          <>
            <InputField
              type="file"
              id="file-upload"
              accept=".doc,.docx,.pdf"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Switch
              color={isToggled ? "primary" : "secondary"}
              onClick={handleToggle}
            // {isToggled ? "ON" : "OFF"}
            />
            {isToggled && (
              <AnimatedDropdown
                value={isToggled}
                onChange={(value) => handleToggle(value)}
                fullWidth
                sx={{ marginTop: 2 }}
                visible={isToggled === isToggled}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" }
                ]}
              />
            )}
          </>
        )}

        {selectedItem?.type === "ifelse" && (
          <InputField
            placeholder="If-Else"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}

        {selectedItem?.type === "image" && (
          <>

            <InputField
              type="file"
              id="file-upload"
              accept=".png, .jpeg,"
              onChange={handlePhotoUpload}
            />

            <Switch
              color={isToggled ? "primary" : "secondary"}
              onClick={handleToggle}
            // {isToggled ? "ON" : "OFF"}
            />
            {isToggled && (
              <AnimatedDropdown
                value={isToggled}
                onChange={(value) => handleToggle(value)}
                fullWidth
                sx={{ marginTop: 2 }}
                visible={isToggled === isToggled}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" }
                ]}
              />
            )}

          </>
        )}

        {selectedItem?.type === "date" && (
          <UniversalDatePicker
            placeholder="Date"
            value={options}
            onChange={(value) => setOptions(value)}

          />
        )}

        {selectedItem?.type === "userdetail" && (
          <>
            <InputField
              placeholder="User Details"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Switch
              color={isToggled ? "primary" : "secondary"}
              onClick={handleToggle}
            // {isToggled ? "ON" : "OFF"}
            />
            {isToggled && (
              <AnimatedDropdown
                value={isToggled}
                onChange={(value) => handleToggle(value)}
                fullWidth
                sx={{ marginTop: 2 }}
                // visible={isToggled === isToggled}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" }
                ]}
              />
            )}
          </>
        )}

        {/* Save Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <UniversalButton
            onClick={handleSave}
            label="Save"
            className="btn-flow2"
          >
            Save
          </UniversalButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditPanel;