import React, { useEffect, useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { MultiSelect } from "primereact/multiselect";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

import {
  campaignUploadFile,
  getWabaShowGroupsList,
} from "../../../apis/whatsapp/whatsapp.js";
import { getCountryList } from "../../../apis/common/common.js";
import AnimatedDropdown from "../../components/AnimatedDropdown.jsx";
import "../whatsappLaunch.css";
import DropdownWithSearch from "../../components/DropdownWithSearch.jsx";

function RadioButtonLaunchCampaign({
  onOptionChange,
  onFileUpload,
  onGroupChange,
  onUrlIndexChange,
  groups,
  setGroups,
  setSelectedGroups,
  selectedGroups,
  setUploadedFile,
  uploadedFile,
  setIsUploaded,
  isUploaded,
  // setIsCountryCodeChecked
}) {
  const [selectedOption, setSelectedOption] = useState("option2");
  // const [selectedGroups, setSelectedGroups] = useState([]);
  // const [uploadedFile, setUploadedFile] = useState(null);
  const [showGroupList, setShowGroupList] = useState([]);
  // const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  // const [isUploaded, setIsUploaded] = useState(false);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCountryName, setSelectedCountryName] = useState("");
  const [totalRecords, setTotalRecords] = useState("");
  const [columns, setColumns] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [selectedMobileColumn, setSelectedMobileColumn] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [addCountryCode, setAddCountryCode] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [xlsxPath, setXlsxPath] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onOptionChange(value);

    // Reset all related states when switching between options
    if (value === "option1") {
      setUploadedFile(null);
      setSelectedCountryCode("");
      setSelectedCountryName("");
      setFileData([]);
      setTotalRecords("");
      setAddCountryCode(false);
      setIsUploaded(false);
      setFileHeaders([]);
      onGroupChange("-1");
      setXlsxPath("");
      setSelectedMobileColumn("");
      setSelectedGroups([]);
      if (onUrlIndexChange) onUrlIndexChange(null); // ✅ Reset URL index
    }

    if (value === "option2") {
      setUploadedFile(null);
      setSelectedGroups([]);
      setFileData([]);
      setTotalRecords("");
      setSelectedMobileColumn("");
      setAddCountryCode(false);
      setFileHeaders([]);
      onGroupChange("0");
      if (onUrlIndexChange) onUrlIndexChange(null); // ✅ Reset URL index
    }
    if (value === "option3") {
      setSelectedGroups([]);
      setFileData([]);
      setTotalRecords("");
      setSelectedMobileColumn("");
      setFileHeaders([]);
      if (onUrlIndexChange) onUrlIndexChange(null); // ✅ Reset URL index
    }
  };

  // Validate filename
  const isValidFileName = (fileName) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(fileName);
  };

  // handle File drop
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      const validExtensions = [".xls", ".xlsx", ".xlsm"];
      const fileExtension = file.name.split(".").pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split(".")[0])) {
          setUploadedFile(file);
          setIsUploaded(false);
          // parseFile(file);
        } else {
          toast.error(
            "File name can only contain alphanumeric characters, underscores, or hyphens."
          );
        }
      } else {
        toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
      }
    }
  };

  // handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = [".xls", ".xlsx", ".xlsm"];
      const fileExtension = file.name.split(".").pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split(".")[0])) {
          setUploadedFile(file);
          setIsUploaded(false);
          // parseFile(file);
        } else {
          toast.error(
            "File name can only contain alphanumeric characters, underscores, or hyphens."
          );
        }
      } else {
        toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
      }
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
    setAddCountryCode(false);
    setFileHeaders([]);
    setSelectedCountryCode("");
    setSelectedMobileColumn("");
    setFileData([]);
    setTotalRecords("");
    setXlsxPath("");
    document.getElementById("fileInput").value = "";
    // updateHeaders();
    toast.success("File removed successfully.");
  };

  const handleMobileColumnChange = (value) => {
    setSelectedMobileColumn(value);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Handle change in 'Add Country Code' checkbox
  const handleAddCountryCodeChange = (e) => {
    const isChecked = e.target.checked;
    setAddCountryCode(isChecked);

    if (!isChecked) {
      setSelectedCountryCode("");
      setSelectedCountryName("");
    }
  };

  useEffect(() => {
    if (fileHeaders.length > 0) {
      onFileUpload(
        xlsxPath,
        fileHeaders,
        totalRecords,
        selectedCountryCode,
        selectedMobileColumn,
        addCountryCode
      );
    } else {
      onFileUpload(
        xlsxPath,
        fileHeaders,
        totalRecords,
        selectedCountryCode,
        selectedMobileColumn,
        addCountryCode
      );
    }
  }, [
    fileHeaders,
    selectedCountryCode,
    selectedMobileColumn,
    xlsxPath,
    addCountryCode,
  ]); // ✅ Now listens for country code updates

  const handleFileUpload = async () => {
    if (!uploadedFile) {
      toast.error("No file selected for upload.");
      return;
    }

    if (isUploaded) {
      toast.error("File already uploaded. Please select a different one.");
      return;
    }

    setIsUploading(true);

    try {
      const response = await campaignUploadFile(uploadedFile);

      if (response?.message === "File Upload Successfully") {
        setIsUploaded(true);
        setXlsxPath(response.filepath);

        // ✅ Store only sampleRecords instead of full file data
        setFileData(response.sampleRecords || []);
        setColumns(response.headers || []);
        setFileHeaders(response.headers || []);
        setTotalRecords(response.totalRecords || "");

        onFileUpload(
          response.filepath,
          fileHeaders,
          totalRecords,
          selectedCountryCode,
          selectedMobileColumn
        );

        toast.success("File uploaded successfully.");
      } else {
        toast.error(response?.message || "File upload failed.");
      }
    } catch (error) {
      toast.error("File upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Get Waba Group List
  useEffect(() => {
    const fetchWabaShowGroupsList = async () => {
      try {
        const response = await getWabaShowGroupsList();
        // if (response) {
        //   setGroups(response);
        if (response && Array.isArray(response)) {
          setGroups(response);
        } else {
          console.error("Failed to fetch WABA Group List!");
          toast.error("Failed to load WABA Group List!");
        }
      } catch (error) {
        console.error("Error fetching WABA Group List:", error);
        toast.error("Error fetching WABA Group List.");
      }
    };
    fetchWabaShowGroupsList();
  }, []);

  // Get country list
  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        setIsLoading(true);

        const response = await getCountryList();
        if (response) {
          // getCountryList(response);
          setCountryList(response);
        } else {
          console.error("Failed to fetch Country List!");
          toast.error("Failed to load Country List");
        }
      } catch (error) {
        console.error("Error fetching country List:", error);
        toast.error("Error fetching country List.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountryList();
  }, []);

  return (
    <div className="h-full p-3 bg-gray-100 rounded-lg shadow-md ">
      <div>
        <h2 className="mb-2 text-sm font-medium tracking-wide text-gray-800">
          Choose an Option
        </h2>
        <div className="flex flex-wrap gap-4 mb-2 sm:grid-cols-2">
          {/* Option 1 */}
          <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <RadioButton
                inputId="radioOption1"
                name="radioGroup"
                value="option1"
                onChange={handleChange}
                checked={selectedOption === "option1"}
              />
              <label
                htmlFor="radioOption1"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Select Group
              </label>
            </div>
          </label>

          {/* Option 2 */}
          <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-2">
              <RadioButton
                inputId="radioOption2"
                name="radioGroup"
                value="option2"
                onChange={handleChange}
                checked={selectedOption === "option2"}
              />
              <label
                htmlFor="radioOption2"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Import contact
              </label>
            </div>
          </label>

          {/* Option 3 */}
          {/* <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-2 " >
              <RadioButton inputId="radioOption3" name="radioGroup" value="option3" onChange={handleChange} checked={selectedOption === 'option3'} />
              <label htmlFor="radioOption3" className="text-sm font-medium text-gray-700">AI Audience</label>
            </div>
          </label> */}
        </div>
      </div>

      {/* Multi-Select Dropdown for Select Group */}
      {selectedOption === "option1" && (
        <div className="flex mt-3 justify-content-center">
          <MultiSelect
            className="custom-multiselect"
            placeholder="Select Groups"
            maxSelectedLabels={0}
            optionLabel="label"
            filter
            // value={showGroupList} onChange={(e) => setShowGroupList(e.value)}
            value={selectedGroups}
            onChange={(e) => {
              if (!e.value) {
                console.error("MultiSelect received undefined value");
                return;
              }

              // ✅ Extract group codes correctly
              // const selectedValues = e.value.map((group) => group).filter(Boolean);
              // setSelectedGroups(selectedValues);

              let selectedValues = Array.isArray(e.value) ? e.value : [e.value];
              setSelectedGroups(selectedValues);

              // ✅ Convert array to comma-separated string
              const groupValues =
                selectedValues.length > 0 ? selectedValues.join(",") : "-1";

              onGroupChange(groupValues);
            }}
            options={groups.map((group) => ({
              label: `${group.groupName} (${group.totalCount})`,
              value: group.groupCode,
            }))}
          />
        </div>
      )}

      {/* Drag-and-Drop and File Upload for Import Contact */}
      {selectedOption === "option2" && (
        <div className="mt-2 file-upload">
          <div
            className="file-upload-container"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              name="fileInput"
              accept=".xls,.xlsx,.xlsm"
            />
            <div className="flex items-center justify-center gap-2">
              <label
                htmlFor="fileInput"
                className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500"
              >
                Choose or Drop File
              </label>
              <div className="upload-button-container ">
                <button
                  onClick={handleFileUpload}
                  disabled={isUploading}
                  className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${isUploading ? "disabled" : ""
                    }`}
                >
                  <FileUploadOutlinedIcon
                    sx={{ color: "white", fontSize: "23px" }}
                  />
                </button>
              </div>
            </div>
            <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
              Max 3 lacs records & mobile number should be with country code.{" "}
              <br />
              Supported File Formats: .xlsx
            </p>
            <div className="mt-3">
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-1 file-upload-info">
                  <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                    {isUploaded ? "File Uploaded: " : "File Selected: "}
                    <strong>{uploadedFile.name}</strong>
                  </p>
                  <button
                    className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                    onClick={handleRemoveFile}
                  >
                    <MdOutlineDeleteForever
                      className="text-red-500 cursor-pointer hover:text-red-600"
                      size={20}
                    />
                  </button>
                </div>
              ) : (
                <p className="text-sm font-semibold tracking-wide text-gray-500 file-upload-feedback file-upload-feedback-error">
                  No file uploaded yet!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Country Code */}
      <div className="flex flex-wrap items-start justify-between gap-2 mt-3 lg:flex-nowrap">
        {selectedOption === "option2" && isUploaded && (
          <div className="w-full">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 bg-gray-200 border-gray-300 rounded cursor-pointer"
                onChange={handleAddCountryCodeChange}
              />
              <label className="text-sm font-medium">Add Country Code</label>
            </div>
            {/* <div className="w-full mt-4">
              <AnimatedDropdown
                id="selectCountryCode"
                name="selectCountryCode"
                label="Select Country Code"
                tooltipContent="check the - [ ✔ Add country code ] to apply country code"
                tooltipPlacement="right"
                placeholder="Select Country Code"
                options={countryList
                  .sort((a, b) => a.countryName.localeCompare(b.countryName))
                  .map((country) => ({
                    label: `${country.countryName} (+${country.countryCode})`,
                    value: `${country.countryCode}-${country.countryName}`,
                  }))}
                value={selectedCountryCode ? `${selectedCountryCode}-${selectedCountryName}` : ""}
                onChange={(value) => {
                  if (value) {
                    const [code, name] = value.split('-');
                    setSelectedCountryCode(code);
                    setSelectedCountryName(name);
                  }
                }}
                disabled={!addCountryCode}
              />
            </div> */}
            <div className="w-full mt-4">
              <DropdownWithSearch
                id="selectCountryCode"
                name="selectCountryCode"
                label="Select Country Code"
                tooltipContent="check the - [ ✔ Add country code ] to apply country code"
                tooltipPlacement="right"
                placeholder="Select Country Code"
                disabled={!addCountryCode}
                options={countryList
                  .sort((a, b) => a.countryName.localeCompare(b.countryName))
                  .map((country) => ({
                    label: `${country.countryName} (+${country.countryCode})`,
                    value: `${country.countryCode}-${country.countryName}`,
                  }))}
                value={
                  selectedCountryCode
                    ? `${selectedCountryCode}-${selectedCountryName}`
                    : ""
                }
                onChange={(value) => {
                  if (value) {
                    const [code, name] = value.split("-");
                    setSelectedCountryCode(code);
                    setSelectedCountryName(name);
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Mobile Column Selection */}
        {selectedOption === "option2" && isUploaded && (
          <div className="w-full">
            <div className="w-full mt-2 lg:mt-9">
              <AnimatedDropdown
                id="selectMobileColumn"
                name="selectMobileColumn"
                label="Select Mobile Number Field"
                tooltipContent="Select your mobile number Field!"
                tooltipPlacement="right"
                options={columns.map((col, index) => ({
                  label: col,
                  value: index,
                }))}
                value={selectedMobileColumn}
                onChange={handleMobileColumnChange}
                placeholder="Select Mobile No."
              />
            </div>
          </div>
        )}
      </div>

      {/* Display Table */}
      {selectedOption === "option2" && isUploaded && fileData.length > 0 && (
        <>
          <div className="my-3">
            <p className="text-sm font-semibold tracking-wide text-gray-700">
              Total Records in file: {totalRecords}{" "}
            </p>
          </div>

          <div
            className="w-full max-w-full overflow-auto"
            style={{ maxHeight: "400px", maxWidth: "auto", width: "auto" }}
          >
            <table className="w-full border-collapse min-w-max">
              <thead className="bg-[#128C7E]">
                <tr className="">
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className="border border-gray-500 px-3 py-1 text-[0.94rem] font-medium tracking-wide text-white whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {fileData.map((row, index) => (
                  <tr key={index} className="">
                    {columns.map((col, idx) => (
                      <td
                        key={idx}
                        className="px-2 py-1 text-sm font-normal tracking-wide text-gray-800 border border-gray-400 whitespace-nowrap"
                      >
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Option Audience */}
      {selectedOption === "option3" && (
        <div className="flex items-center gap-3 mt-3">
          <h2 className="text-sm font-semibold text-gray-800 ">
            Option Audience
          </h2>
          <div className="flex items-center gap-6">
            <label className="p-0 bg-transparent cursor-pointer ">
              <div className="flex items-center justify-center gap-2 mt-1">
                <input
                  type="radio"
                  name="OptinAudience"
                  value="Yes"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  aria-label="Yes"
                />
                <span className="text-sm font-medium text-gray-800">Yes</span>
              </div>
            </label>
            <label className="p-0 bg-transparent cursor-pointer ">
              <div className="flex items-center justify-center gap-2 mt-1">
                <input
                  type="radio"
                  name="OptinAudience"
                  value="Yes"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  aria-label="No"
                />
                <span className="text-sm font-medium text-gray-800">No</span>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default RadioButtonLaunchCampaign;
