import React, { useEffect } from "react";
import { useState } from "react";
import InputField from "../../components/layout/InputField";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import { IoSearch } from "react-icons/io5";
import Obdmanagecampaign from "./components/Obdmanagecampaign";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import CustomTooltip from "../../components/common/CustomTooltip";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import * as XLSX from "xlsx";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";





const ObdManageVoiceClips = () => {
  const [fileName, setFileName] = useState();
  const [templateName, setTemplateName] = useState();
  const [variableName, setVariableName] = useState();
  const [adminStatus, setAdminStatus] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option2");
  const [selecteTransactional, setSelecteTransactional] =
    useState("transactional");
  const [addFile, setAddFile] = useState();
  const [removeChooseFile, setRemoveChooseFile] = useState();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [columns, setColumns] = useState([]);

  const [addVariable, setAddVariable] = useState([]);
  const [addDynamicFile, setAddaddDynamicFile] = useState([]);

  const handleChangeEnablePostpaid = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };
  const handleChangeTransactional = (event) => {
    const value = event.target.value;
    setSelecteTransactional(value);
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
    document.getElementById("fileInput").value = "";
    toast.success("File removed successfully.");
  };

  // dynamic option

  const addVariables = () => {
    setAddVariable((prev) => [...prev, { id: Date.now(), value: "" }]);
  };
  const handleVariableChange = (id, newValue) => {
    setAddVariable((prev) =>
      prev.map((variable) =>
        variable.id === id ? { ...variable, value: newValue } : variable
      )
    );
  };
  const deleteVariable = (id) => {
    setAddVariable((prev) => prev.filter((variable) => variable.id !== id));
  };
  const addDynamicFiles = () => {
    setAddaddDynamicFile((prev) => [...prev, { id: Date.now(), value: "" }]);
  };

  const deleteDynamicFile = (id) => {};

  const handleaddDynamicfile = (id, newValue) => {
    setAddaddDynamicFile((prev) =>
    prev.map((addFile) => 
    addFile.id === id ? { ...addFile, value: newValue} : addFile
    )
    )
  }
  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-3">
        <div className="flex items-end gap-2">
          <div className="w-full sm:w-46 ">
            <InputField
              id="obdmanagevoiceclipsfilename"
              name="obdmanagevoiceclipsfilename"
              value={fileName}
              label="File Name"
              placeholder="File Name"
              type="text"
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="w-full  sm:w-46">
            <AnimatedDropdown
              id="obdmanagevoiceclipsadminstatus"
              name="obdmanagevoiceclipsadminstatus"
              value={adminStatus}
              label="Admin Status"
              tooltipContent="Admin Status"
              tooltipPlacement="right"
              placeholder="Admin Status"
              options={[
                { value: "Approved", label: "Approved" },
                { value: "Pending", label: "Pending" },
                { value: "Disapproved", label: "Disapproved" },
              ]}
              onChange={(value) => setAdminStatus(value)}
            />
          </div>
          <div className="w-full sm:w-46">
            <AnimatedDropdown
              id="manageuserstatus"
              name="manageuserstatus"
              value={userStatus}
              label="User Status"
              tooltipContent="User Status"
              tooltipPlacement="right"
              placeholder="User Status"
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
              onChange={(value) => setUserStatus(value)}
            />
          </div>
          <div>
            <UniversalButton
              id="obdvoicesearchbtn"
              name="obdvoicesearchbtn"
              placeholder="Search"
              label="Search"
              icon={<IoSearch />}
            />
          </div>
        </div>

        <div className="flex">
          <UniversalButton
            id="obdvoiceaddfilebtn"
            name="obdvoiceaddfilebtn"
            label="Add file"
            placeholder="Add file"
            onClick={() => setIsVisible(true)}
          />
        </div>
      </div>
      <div>
        <Obdmanagecampaign />
      </div>

      <div className="flex items-center gap-2">
        <Dialog
          header="Edit details"
          visible={isVisible}
          onHide={() => setIsVisible(false)}
          className="lg:w-[50rem] md:w-[40rem] w-[20rem]"
          draggable={false}
        >
          <div className="flex gap-2">
            <div className="flex gap-5 items-end ">
              <div className="flex gap-2 items-center shadow-md p-2 rounded-full">
                <RadioButton
                  inputId="enablestaticOption1"
                  name="enablestaticdradio"
                  value="option1"
                  // visible={isVisible}
                  checked={selectedOption === "option1"}
                  onChange={handleChangeEnablePostpaid}
                  // onClick={()=>setIsChecked(false)}
                />
                <label className="text-sky-800 font-semibold ">Static</label>
              </div>
              <div className="flex gap-2 items-center shadow-md p-2 rounded-full">
                <RadioButton
                  inputId="enabledynamicOption1"
                  name="enabledynamicradio"
                  value="option2"
                  visible={isVisible}
                  checked={selectedOption === "option2"}
                  onChange={handleChangeEnablePostpaid}
                  onClick={() => setIsDynamic(true)}
                />
                <label className="text-sky-800 font-semibold ">Dynamic</label>
              </div>
            </div>
            <div className="flex gap-5 items-end ">
              <div className="flex gap-2 items-center shadow-md p-2 rounded-full">
                <RadioButton
                  inputId="enabletransactionalOption1"
                  name="enableTransactional"
                  value="transactional"
                  checked={selecteTransactional === "transactional"}
                  onChange={handleChangeTransactional}
                  onClick={() => setIsVisible(false)}
                />
                <label>Transactional</label>
              </div>

              <div className="flex gap-2 items-center shadow-md p-2 rounded-full">
                <RadioButton
                  inputId="enablepromotionalOption1"
                  name="enableTransactional"
                  value="promotional"
                  checked={selecteTransactional === "promotional"}
                  onChange={handleChangeTransactional}
                />
                <label>Promptional</label>
              </div>
            </div>
          </div>

          {selectedOption === "option1" && (
            <>
              <div className="mt-2 text-sm">
                <InputField
                  label="File Name"
                  placeholder="Enter File Name"
                  required
                  // value={userid}
                  // onChange={(e) => setUserId(e.target.value)}
                />
              </div>
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
                        className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${
                          isUploading ? "disabled" : ""
                        }`}
                      >
                        <FileUploadOutlinedIcon
                          sx={{ color: "white", fontSize: "23px" }}
                        />
                      </button>
                    </div>
                  </div>
                  <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
                    Max 3 lacs records & mobile number should be with country
                    code. <br />
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
            </>
          )}
          {selectedOption === "option2" && (
            <>
              <div className="flex flex-col">
                <div className="mt-2 text-sm">
                  <InputField
                    label="Template Name"
                    placeholder="Enter Template Name"
                    required
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </div>
                <div className="flex flex-row mt-2 justify-center gap-2">
                  <UniversalButton
                    id="obdvoiceaddfilebtn"
                    name="obdvoiceaddfilebtn"
                    label="Add file"
                    placeholder="Add file"
                    onClick={addDynamicFiles}
                  />
                  <UniversalButton
                    id="obdvoiceaddfilebtn"
                    name="obdvoiceaddfilebtn"
                    label="Add Variable"
                    placeholder="Add Variable"
                    onClick={addVariables}
                    // value={variableName}
                    // onClick={(variableName)=>setVariableName(variableName)}
                  />
                </div>

                {/* variable start */}

                <div className="mt-4">
                  {addVariable.map((entry, index) => (
                    <div
                      className="flex gap-2 items-center mt-3"
                      key={entry.id}
                    >
                      <label
                        htmlFor={`variable-${entry.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                         {index + 1}.
                      </label>
                      <InputField
                        id={`variable-${entry.id}`}
                        placeholder={`Enter Variable ${index + 1}`}
                        value={entry.value}
                        onChange={(e) =>
                          handleVariableChange(entry.id, e.target.value)
                        }
                      />
                      <button
                        className="rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                        onClick={() => deleteVariable(entry.id)}
                      >
                        <MdOutlineDeleteForever
                          className="text-red-500 cursor-pointer hover:text-red-600"
                          size={20}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                {/* variable end */}
                {/* choose file start */}
                {addDynamicFile.map((entry, index) => {
                  <div className="flex gap-2 items-center mt-3 " key={entry.id}>
                    <label
                      htmlFor={`addFile-${entry.id}`}
                      className="text-sm font-medium text-gray-700 "
                      value={entry.value}
                      onChange={(e)=> handleaddDynamicfile(entry.id, e.target.value)}
                    >
                      {index + 1}
                    </label>
                    <div className="file-upload mt-2 w-full">
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
                              className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${
                                isUploading ? "disabled" : ""
                              }`}
                            >
                              <FileUploadOutlinedIcon
                                sx={{ color: "white", fontSize: "23px" }}
                              />
                            </button>
                          </div>
                        </div>
                        {/* <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
                        Max 3 lacs records & mobile number should be with
                        country code. <br />
                        Supported File Formats: .xlsx
                      </p> */}
                        <div className="mt-3">
                          {uploadedFile ? (
                            <div className="file-upload-info flex items-center justify-center  gap-1">
                              <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                                {isUploaded
                                  ? "File Uploaded: "
                                  : "File Selected: "}
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
                    <button
                      className=" rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                      onClick={() => deleteDynamicFile(entry.id)}
                    >
                      <MdOutlineDeleteForever
                        className="text-red-500 cursor-pointer hover:text-red-600"
                        size={20}
                      />
                    </button>
                  </div>;
                })}

                {/* choose file end */}
              </div>
            </>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default ObdManageVoiceClips;
