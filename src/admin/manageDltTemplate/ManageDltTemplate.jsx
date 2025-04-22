import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import InputField from "../../whatsapp/components/InputField";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import DropdownWithSearch from "../../whatsapp/components/DropdownWithSearch";
import ManageDltTemplateTable from "./components/ManageDltTemplateTable";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";

const ManageDltTemplate = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [statusOption, setStatusOption] = useState(null);
  const [templateuserid, setTemplateuserid] = useState(null);
  const [importselectuser, setImportselectuser] = useState(null);
  const [templatedltimport, setTemplateDltImport] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [columns, setColumns] = useState([]);

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];
  const userids = [
    { label: "demopro", value: "demopro" },
    { label: "prodemo", value: "prodemo" },
  ];
  const importusers = [
    { label: "demopro", value: "demopro" },
    { label: "prodemo", value: "prodemo" },
  ];

  const handleImport = (id, name) => {
    setTemplateDltImport(true);
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

  const handleDragOver = (event) => {
    event.preventDefault();
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
      setIsUploaded(true);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const isValidFileName = (fileName) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(fileName);
  };

  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const workbook = XLSX.read(reader.result, { type: "binary" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      // const headers = Object.keys(jsonData[0]);
      const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
      // const headers = Object.keys(jsonData[0] || {}).map(header => header.trim()); // Trim header names
      console.log("Extracted headers:", headers);

      setFileData(jsonData);
      setColumns(headers);
      // setFileHeaders(headers);
      setIsUploaded(false); // Reset to "File Selected" if a new file is selected
      // setTotalRecords(jsonData.length);
    };
    reader.readAsBinaryString(file);
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
    // setAddCountryCode(false)
    // setSelectedCountryCode('');
    // setSelectedMobileColumn("");
    // setFileData([]);
    // setTotalRecords("");
    // setXlsxPath("");
    document.getElementById("fileInput").value = "";
    toast.success("File removed successfully.");
  };

  return (
    <div className="w-full">
      {/* {isLoading ? (
        <>
          <Loader />
        </>
      ) : ( */}
      <div>
        <div className="flex flex-wrap gap-2 items-end pb-3 w-full">
          {/* Mobile Number Input Field */}
          <div className="w-40">
            <InputField
              id="templateid"
              name="templateid"
              type="number"
              label="Template ID"
              placeholder="Enter Template ID"
            />
          </div>
          <div className="w-46">
            <InputField
              id="templatename"
              name="templateidname"
              label="Template Name"
              placeholder="Enter Template Name"
            />
          </div>

          <div className="w-40">
            <DropdownWithSearch
              label="User ID"
              id="templateuserid"
              name="templateuserid"
              placeholder="Enter User ID"
              value={templateuserid}
              onChange={(e) => setTemplateuserid(e.target.value)}
              options={userids}
            />
          </div>
          <div className="w-40">
            <AnimatedDropdown
              label="Status"
              options={statusOptions}
              id="templatestatus"
              name="templatestatus"
              value={statusOption}
              onChange={(newValue) => setStatusOption(newValue)}
              placeholder="Select Status"
            />
          </div>

          {/* Search Button */}
          <div className="w-max-content">
            <UniversalButton
              id="dlttemplatesearch"
              name="dlttemplatesearch"
              label={isFetching ? "Searching..." : "Search"}
              icon={<IoSearch />}
              disabled={isFetching}
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Delete"
              id="dlttemplatedelete"
              name="dlttemplatedelete"
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              id="dlttemplatedownload"
              name="dlttemplatedownload"
              label="Download"
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Import"
              id="dlttemplateimport"
              name="dlttemplateimport"
              onClick={() => handleImport()}
            />
          </div>
        </div>

        {/* ✅ Show Loader or Table */}
        {isFetching ? (
          <div className="w-full">
            <UniversalSkeleton height="35rem" width="100%" />
          </div>
        ) : (
          <div className="w-full">
            <ManageDltTemplateTable
              id="managedlttemplatetable"
              name="managedlttemplatetable"
            />
          </div>
        )}
      </div>

      <Dialog
        header="Import DLT Content Template"
        visible={templatedltimport}
        onHide={() => setTemplateDltImport(false)}
        className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div className="grid grid-cols-2 gap-4">
          <DropdownWithSearch
            label="Select User"
            placeholder="Select User"
            id="importselectuser"
            name="importselectuser"
            options={importusers}
            value={importselectuser}
            onChange={(e) => setImportselectuser(e.target.value)}
          />
          <InputField
            label="Entity ID"
            id="importentityid"
            name="importentityid"
            placeholder="Enter Entity ID"
            type="number"
          />
        </div>
        <div>
          <div className="file-upload mt-2">
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
                <br />
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
        </div>
      </Dialog>

      {/* )} */}
    </div>
  );
};

export default ManageDltTemplate;
