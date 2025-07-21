import { useRef, useState, useEffect } from "react";
import { MultiSelect } from "primereact/multiselect";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RadioButton } from "primereact/radiobutton";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown.jsx";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch.jsx";

import { getCountryList } from "@/apis/common/common.js";
import { campaignUploadFile } from "@/apis/whatsapp/whatsapp.js";

const RadioButtonLaunchCampaignObd = ({
  onOptionChange,
  onFileUpload,
  onGroupChange,
  groups,
  setGroups,
  selectedGroups,
  setSelectedGroups,
  fileUpload,
  resetImportContact,
  countryCode,
  onMobileDropdown,
  // fileInputRef,
  selectedOption,
  setSelectedOption,
  uploadedFile,
  setUploadedFile,
  isUploaded,
  setIsUploaded,
  isUploading,
  setIsUploading,
  totalRecords,
  setTotalRecords,
  columns,
  setColumns,
  selectedCountryCode,
  setSelectedCountryCode,
  selectedCountryName,
  setSelectedCountryName,
  addCountryCode,
  setAddCountryCode,
  countryList,
  setCountryList,
  xlsxPath,
  setXlsxPath,
  fileData,
  setFileData,
  selectedMobileColumn,
  setSelectedMobileColumn,
  fileHeaders,
  setFileHeaders,
  isLoading,
  setIsLoading,
}) => {
  // Get country list
  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        // setIsLoading(true);

        const response = await getCountryList();
        if (response) {
          getCountryList(response);
          setCountryList(response);
        } else {
          console.error("Failed to fetch Country List!");
          toast.error("Failed to load Country List");
        }
      } catch (error) {
        console.error("Error fetching country List:", error);
        toast.error("Error fetching country List.");
      } finally {
        // setIsLoading(false);
      }
    };
    fetchCountryList();
  }, []);

  // useEffect(() => {
  //   handleRemoveFile();
  // }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onOptionChange(value);

    if (value === "option1") {
      setUploadedFile(null);
      setIsUploaded(false);
      setAddCountryCode(false);
      setSelectedCountryCode("");
      setSelectedMobileColumn("");
      setFileData([]);
      setTotalRecords("");
      setXlsxPath("");
      setFileHeaders([]);
      // document.getElementById("fileInput").value = "";
    } else if (value === "option2") {
      setSelectedGroups([]);
      onGroupChange([]);
    }
  };

  // Validate filename
  const isValidFileName = (fileName) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(fileName);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
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
          parseFile(file);
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
          parseFile(file);
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

  // Parse uploaded file and extract headers and data
  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const workbook = XLSX.read(reader.result, { type: "binary" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      // const headers = Object.keys(jsonData[0]);
      const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
      // const headers = Object.keys(jsonData[0] || {}).map(header => header.trim()); // Trim header names

      setFileData(jsonData);
      setColumns(headers);
      setFileHeaders(headers);
      setIsUploaded(false);
      setTotalRecords(jsonData.length);
    };
    reader.readAsBinaryString(file);
  };

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
    // fileUpload(isUploading)
    try {
      const response = await campaignUploadFile(uploadedFile);

      if (response?.message === "File Upload Successfully") {
        setIsUploaded(true);
        setXlsxPath(response.filepath);
        setFileData(response.sampleRecords || []);
        setColumns(response.headers || []);
        setFileHeaders(response.headers || []);
        setTotalRecords(response.totalRecords || "");
        fileUpload(uploadedFile);
        onFileUpload(
          response.filepath,
          response.headers || [],
          response.totalRecords || "",
          response.countryCode || selectedCountryCode,
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

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
    setAddCountryCode(false);
    setSelectedCountryCode("");
    setSelectedMobileColumn("");
    setAddCountryCode(false);
    setFileData([]);
    setTotalRecords("");
    setXlsxPath("");
    setFileHeaders([]);
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }
  };

  // Handle change in 'Add Country Code' checkbox
  const handleAddCountryCodeChange = (e) => {
    const isChecked = e.target.checked;
    setAddCountryCode(isChecked);
    countryCode(isChecked);

    if (!isChecked) {
      setSelectedCountryCode("");
      setSelectedCountryName("");
    }
  };

  const handleMobileColumnChange = (value) => {
    setSelectedMobileColumn(value);
    onMobileDropdown(value);
  };

  return (
    <div className="w-full ">
      <h2 className="text-sm font-medium text-gray-800 mb-2 tracking-wide">
        Choose an Option
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Option 1 */}
        <div className="cursor-pointer  px-2 py-2 bg-white shadow-2xl border  border-gray-300 rounded-lg">
          <div className="flex items-center gap-2 rounded-full">
            <RadioButton
              inputId="radioOption1"
              name="radioGroup"
              value="option1"
              onChange={handleChange}
              checked={selectedOption === "option1"}
            />
            <label
              htmlFor="radioOption1"
              className="text-gray-700 font-medium text-sm cursor-pointer"
            >
              Select Groups
            </label>
          </div>
        </div>
        {/* Option 2 */}
        <div className="cursor-pointer  px-2 py-2 shadow-2xl bg-white border  border-gray-300 rounded-lg">
          <div className="flex items-center  gap-2 rounded-full">
            <RadioButton
              inputId="radioOption2"
              name="radioGroup"
              value="option2"
              onChange={handleChange}
              checked={selectedOption === "option2"}
            />
            <label
              htmlFor="radioOption2"
              className="text-gray-700 font-medium text-sm cursor-pointer"
            >
              import Contacts
            </label>
          </div>
        </div>
      </div>

      {/* Multi-Select Dropdown for Select Group */}
      {selectedOption === "option1" && (
        <div className="flex justify-content-center mt-3">
          <MultiSelect
            className="custom-multiselect"
            placeholder="Select Groups"
            maxSelectedLabels={0}
            optionLabel="label"
            filter
            value={selectedGroups}
            onChange={(e) => onGroupChange(e.value)}
            options={groups.map((grp) => ({
              label: `${grp.groupName} (${grp.totalCount})`,
              value: grp.groupCode,
            }))}
          />
        </div>
      )}

      {/* Drag-and-Drop and File Upload for Import Contact */}
      {selectedOption === "option2" && (
        <div className="file-upload mt-2">
          <div
            className="file-upload-container"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              // ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              name="fileInput"
              accept=".xls,.xlsx,.xlsm"
            />
            <div className="flex items-center justify-center gap-2">
              <label
                htmlFor="fileInput"
                className="file-upload-button inline-block bg-blue-400 hover:bg-blue-500 text-white font-medium text-sm px-3 py-2 rounded-lg cursor-pointer text-center tracking-wider"
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
              Supported File Formats: .xlsx
            </p>
            <div className="mt-3">
              {uploadedFile ? (
                <div className="file-upload-info flex items-center justify-center  gap-1">
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
                <p className="file-upload-feedback file-upload-feedback-error text-gray-500 text-sm font-semibold tracking-wide">
                  No file uploaded yet!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Country Code */}
      <div className="flex items-start lg:flex-nowrap flex-wrap justify-between mt-3 gap-2">
        {selectedOption === "option2" && isUploaded && (
          <div className="w-full">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 bg-gray-200 border-gray-300 rounded cursor-pointer"
                onChange={handleAddCountryCodeChange}
              />
              <label className="text-sm font-medium">Add Country Code</label>
            </div>

            <div className="w-full lg:mt-4 mt-4">
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

                    onFileUpload(
                      xlsxPath,
                      fileHeaders,
                      totalRecords,
                      code,
                      selectedMobileColumn
                    );
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Mobile Column Selection */}
        {selectedOption === "option2" && isUploaded && (
          <div className="w-full">
            <div className="w-full lg:mt-4 xl:mt-9 mt-2">
              <DropdownWithSearch
                id="selectMobileColumn"
                name="selectMobileColumn"
                label="Select Mobile Number Field"
                tooltipContent="Select your mobile number Field! aqb"
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
            <p className="text-sm text-gray-700 font-semibold tracking-wide">
              Total Records in file: {totalRecords}{" "}
            </p>
          </div>

          <div className="lg:w-[400px] xl:w-[500px] 2xl:w-[600px]">
            <div
              className="overflow-auto w-full max-w-full "
              style={{ maxHeight: "400px", maxWidth: "auto", width: "auto" }}
            >
              <table className="w-full min-w-max border-collapse">
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
                          className="border border-gray-400 px-2 py-1 text-sm font-normal whitespace-nowrap tracking-wide text-gray-800"
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RadioButtonLaunchCampaignObd;
