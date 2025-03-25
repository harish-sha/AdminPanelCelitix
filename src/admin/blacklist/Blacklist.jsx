import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import {
  a11yProps,
  CustomTabPanel,
} from "../../whatsapp/managetemplate/components/CustomTabPanel";
import UniversalButton from '../../whatsapp/components/UniversalButton';
import UniversalDatePicker from '../../whatsapp/components/UniversalDatePicker';
import InputField from '../../whatsapp/components/InputField';
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown';
import { IoSearch } from 'react-icons/io5';
import UniversalSkeleton from '../../whatsapp/components/UniversalSkeleton';
import { DataTable } from '../../components/layout/DataTable';
import { Dialog } from 'primereact/dialog';
import UniversalTextArea from '../../whatsapp/components/UniversalTextArea';
import { Checkbox } from "primereact/checkbox";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";


const Blacklist = () => {
  const [value, setValue] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  // block mobile
  const [blockmobileaddnumber, setBlockmobileaddnumber] = useState(false);
  const [blockmobileImportnumber, setBlockmobileImportnumber] = useState(false);
  const [blockmobileaddnumbecheck, setBlockMobileAddNumberCheck] = useState([]);
   const [isUploading, setIsUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
      const [fileData, setFileData] = useState([]);
      const [column, setColumn] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setColumns([]);
    setRows([]);
  };

  const BlockMobileAddNumberChange = (e) => {
    const { value, checked } = e.target;

    setBlockMobileAddNumberCheck((prevColumns) =>
      checked
        ? [...prevColumns, value]
        : prevColumns.filter((col) => col !== value)
    );
  };

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
      // console.log("Extracted headers:", headers);

      setFileData(jsonData);
      setColumn(headers);
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
    // block mobile

    // block content
    const [blockaddcontent, setBlockAddContent] = useState(false);
    const [blockcontentaddcheck, setBlockContentAddCheck] = useState([]);
    const BlockContentAddContentChange = (e) => {
      const { value, checked } = e.target;
  
      setBlockContentAddCheck((prevColumns) =>
        checked
          ? [...prevColumns, value]
          : prevColumns.filter((col) => col !== value)
      );
    };
       // block content
      //  block Senderid
      const [blockaddsenderid, setBlockAddSenderid] = useState(false);
      const [blockaddsenderidcheck, setBlockAddSenderidCheck] = useState([]);
      const [blockseriesImportnumber, setBlockseriesImportnumber] = useState(false);
      const BlockAddSenderidChange = (e) => {
        const { value, checked } = e.target;
    
        setBlockAddSenderidCheck((prevColumns) =>
          checked
            ? [...prevColumns, value]
            : prevColumns.filter((col) => col !== value)
        );
      };
      //  block Senderid
      // block Series
      const [blockaddseries, setBlockaddseries] = useState(false);
      const [blockseriesaddcheck, setBlockseriesaddcheck]=useState([]);

      const [isUploadingSeries, setIsUploadingSeries] = useState(false);
      const [uploadedFileSeries, setUploadedFileSeries] = useState(null);
      const [isUploadedSeries, setIsUploadedSeries] = useState(false);
        const [fileDataSeries, setFileDataSeries] = useState([]);
        const [columnSeries, setColumnSeries] = useState([]);
      const BlockAddSeriesChange = (e) => {
        const { value, checked } = e.target;
    
        setBlockseriesaddcheck((prevColumns) =>
          checked
            ? [...prevColumns, value]
            : prevColumns.filter((col) => col !== value)
        );
      };

    
  
    
  
    const handleFileDropSeries = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
  
      if (file) {
        const validExtensions = [".xls", ".xlsx", ".xlsm"];
        const fileExtension = file.name.split(".").pop();
  
        if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
          if (isValidFileName(file.name.split(".")[0])) {
            setUploadedFileSeries(file);
            setIsUploadedSeries(false);
            parseFileSeries(file);
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
  
    const handleDragOverSeries = (event) => {
      event.preventDefault();
    };
  
     // handle file change
     const handleFileChangeSeries = (event) => {
      const file = event.target.files[0];
      if (file) {
        const validExtensions = [".xls", ".xlsx", ".xlsm"];
        const fileExtension = file.name.split(".").pop();
  
        if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
          if (isValidFileName(file.name.split(".")[0])) {
            setUploadedFileSeries(file);
            setIsUploadedSeries(false);
            parseFileSeries(file);
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
  
    const handleFileUploadSeries = async () => {
      if (!uploadedFileSeries) {
        toast.error("No file selected for upload.");
        return;
      }
      if (isUploadedSeries) {
        toast.error("File already uploaded. Please select a different one.");
        return;
      }
      setIsUploadingSeries(true);
      try {
        setIsUploadedSeries(true);
        toast.success("File uploaded successfully!");
      } catch (error) {
        toast.error("File upload failed. Please try again.");
      } finally {
        setIsUploadingSeries(false);
      }
    };
  
    const isValidFileNameSeries = (fileName) => {
      const regex = /^[a-zA-Z0-9_-]+$/;
      return regex.test(fileName);
    };
  
    const parseFileSeries = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const workbook = XLSX.read(reader.result, { type: "binary" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        // const headers = Object.keys(jsonData[0]);
        const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
        // const headers = Object.keys(jsonData[0] || {}).map(header => header.trim()); // Trim header names
        // console.log("Extracted headers:", headers);
  
        setFileDataSeries(jsonData);
        setColumnSeries(headers);
        // setFileHeaders(headers);
        setIsUploadedSeries(false); // Reset to "File Selected" if a new file is selected
        // setTotalRecords(jsonData.length);
      };
      reader.readAsBinaryString(file);
    };
  
    // Handle file removal
    const handleRemoveFileSeries = () => {
      setUploadedFileSeries(null);
      setIsUploadedSeries(false);
      // setAddCountryCode(false)
      // setSelectedCountryCode('');
      // setSelectedMobileColumn("");
      // setFileData([]);
      // setTotalRecords("");
      // setXlsxPath("");
      document.getElementById("fileInput").value = "";
      toast.success("File removed successfully.");
    };
           // block Series
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <div className="flex items-end justify-between pr-2">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Block list Tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label={
                <span>
                  <GradingOutlinedIcon size={20} /> Block Mobile
                </span>
              }
              {...a11yProps(0)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
            <Tab
              label={
                <span>
                  <LibraryBooksOutlinedIcon size={20} /> Block Content
                </span>
              }
              {...a11yProps(1)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
            <Tab
              label={
                <span>
                  <LibraryBooksOutlinedIcon size={20} /> Block Senderid
                </span>
              }
              {...a11yProps(2)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
            <Tab
              label={
                <span>
                  <LibraryBooksOutlinedIcon size={20} /> Block Series
                </span>
              }
              {...a11yProps(3)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
          </Tabs>
        </div>
        <CustomTabPanel value={value} index={0}>
          <div className="w-full">
            <div className="flex items-end justify-between w-full gap-2 pb-5 align-middle flex--wrap">
              <div className='flex items-end gap-2'>
                <div className="w-full sm:w-40">
                  <UniversalDatePicker
                    label="From Date"
                    id="blockmobilefrom"
                    name="blockmobilefrom"
                    placeholder="Select Date"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <UniversalDatePicker
                    label="To Date"
                    id="blockmobileto"
                    name="blockmobileto"
                    placeholder="Select Date"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <InputField
                    label="Mobile Number"
                    id="blockmobilenumber"
                    name="blockmobilenumber"
                    placeholder="Enter Mobile Number"

                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label="Search"
                    id="blockmobileearch"
                    name="blockmobileearch"
                    variant="primary"
                    icon={<IoSearch />}
                  // onClick={handleCampaignSearch}
                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label="delete"
                    id="blockmobiledelete"
                    name="blockmobiledelete"
                    variant="primary"
                  // onClick={handleCampaignSearch}
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <div className="w-max-content">
                  <UniversalButton
                    label="Add Number"
                    id="blockmobileadd"
                    name="blockmobileadd"
                    variant="primary"
                    onClick={() => setBlockmobileaddnumber(true)}
                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label="Import"
                    id="blockmobileimport"
                    name="blockmobileimport"
                    variant="primary"
                    onClick={() => setBlockmobileImportnumber(true)}
                  />
                </div>
              </div>
            </div>
          </div>
          {isFetching ? (
            <div className="">
              <UniversalSkeleton height="35rem" width="100%" />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                id="blockcontenttable"
                name="blockcontenttable"
                rows={rows}
                col={columns}
              />
            </div>
          )}
          <Dialog
            header="Add Block Number"
            visible={blockmobileaddnumber}
            onHide={() => setBlockmobileaddnumber(false)}
            className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
            draggable={false}
          >
            <div className='space-y-4'>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    id: "blockmobilenumber1",
                    name: "obd",
                    value: "OBD",
                  },
                  {
                    id: "blockmobilenumber2",
                    name: "ibd",
                    value: "IBD",
                  },
                  {
                    id: "blockmobilenumber3",
                    name: "c2c",
                    value: "C2C",
                  },
                  {
                    id: "blockmobilenumber4",
                    name: "missedcall",
                    value: "Missed Call",
                  },
                  {
                    id: "blockmobilenumber5",
                    name: "whatsapp",
                    value: "Whats App",
                  },
                  {
                    id: "blockmobilenumber6",
                    name: "rcs",
                    value: "RCS",
                  },

                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={item.id}
                      name={item.name}
                      value={item.value}
                      onChange={BlockContentAddContentChange}
                      checked={blockcontentaddcheck.includes(item.value)}
                    />
                    <label htmlFor={item.id} className="text-sm">
                      {item.value}
                    </label>
                  </div>
                ))}
              </div>
              <InputField
                label="Block Series"
                id="blockseries"
                name="blockseries"
                placeholder="Enter Block Series"
              />
              <UniversalTextArea
                label="Remarks"
                id="blockremarks"
                name="blockremarks"
                placeholder="Enter Remarks"
              />
              <div className='flex justify-center'>
                <UniversalButton
                  label="Submit"
                  id="blockmobileaddsubmit"
                  name="blockmobileaddsubmit"
                />
              </div>
            </div>
          </Dialog>
          <Dialog
            header="Import Block Number"
            visible={blockmobileImportnumber}
            onHide={() => setBlockmobileImportnumber(false)}
            className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
            draggable={false}
          >
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
                Max 3 lacs records & mobile number should be with country code.{" "}
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
          </Dialog>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="w-full">
            <div className="flex items-end justify-between w-full gap-2 pb-5 align-middle flex--wrap">
              <div className='flex items-end gap-2'>
                <div className="w-full sm:w-40">
                  <UniversalDatePicker
                    label="From Date"
                    id="blockcontentfrom"
                    name="blockcontentfrom"
                    placeholder="Select Date"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <UniversalDatePicker
                    label="To Date"
                    id="blockcontentto"
                    name="blockcontentto"
                    placeholder="Select Date"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <InputField
                    label="Content"
                    id="blockconten"
                    name="blockconten"
                    placeholder="Enter Content"

                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label="Search"
                    id="blockcontentsearch"
                    name="blockcontentsearch"
                    variant="primary"
                    icon={<IoSearch />}
                  // onClick={handleCampaignSearch}
                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label="delete"
                    id="blockcontentdelete"
                    name="blockcontentdelete"
                    variant="primary"
                    
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <div className="w-max-content">
                  <UniversalButton
                    label="Add Content"
                    id="blockcontentadd"
                    name="blockcontentadd"
                    variant="primary"
                    onClick={() => setBlockAddContent(true)}
                  />
                </div>
              </div>
            </div>
          </div>
          {isFetching ? (
            <div className="">
              <UniversalSkeleton height="35rem" width="100%" />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                id="blockcontenttable"
                name="blockcontenttable"
                rows={rows}
                col={columns}
              />
            </div>
          )}
          <Dialog
            header="Add Content"
            visible={blockaddcontent}
            onHide={() => setBlockAddContent(false)}
            className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
            draggable={false}
          >
            <div className='space-y-4'>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    id: "blockcontent1",
                    name: "sms",
                    value: "SMS",
                  },
                  {
                    id: "blockcontent2",
                    name: "rcs",
                    value: "RCS",
                  },
                  {
                    id: "blockcontent3",
                    name: "whatsapp",
                    value: "Whats App",
                  },

                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={item.id}
                      name={item.name}
                      value={item.value}
                      onChange={BlockMobileAddNumberChange}
                      checked={blockmobileaddnumbecheck.includes(item.value)}
                    />
                    <label htmlFor={item.id} className="text-sm">
                      {item.value}
                    </label>
                  </div>
                ))}
              </div>
              <InputField
                label="Content"
                id="blockcontenadd"
                name="blockcontenadd"
                placeholder="Enter Content"
              />
              <UniversalTextArea
                label="Remarks"
                id="blockcontentremarkadd"
                name="blockcontentremarkadd"
                placeholder="Enter Remarks"
              />
              <div className='flex justify-center'>
                <UniversalButton
                  label="Submit"
                  id="blockcontentadd"
                  name="blockcontentadd"
                  variant="primary"
                />
              </div>
            </div>
          </Dialog>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
        <div className="w-full">
            <div className="flex items-end justify-between w-full gap-2 pb-5 align-middle flex--wrap">
              <div className='flex items-end gap-2'>
                <div className="w-full sm:w-40">
                  <UniversalDatePicker
                    label="From Date"
                    id="blockSenderidfrom"
                    name="blockSenderidfrom"
                    placeholder="Select Date"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <UniversalDatePicker
                    label="To Date"
                    id="blockSenderidto"
                    name="blockSenderidto"
                    placeholder="Select Date"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <InputField
                    label="Sender ID"
                    id="blockSenderid"
                    name="blockSenderid"
                    placeholder="Enter Sender ID"

                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label="Search"
                    id="blocksenderidsearch"
                    name="blocksenderidsearch"
                    variant="primary"
                    icon={<IoSearch />}
                  // onClick={handleCampaignSearch}
                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label="delete"
                    id="blocksenderiddelete"
                    name="blocksenderiddelete"
                    variant="primary"
                    
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <div className="w-max-content">
                  <UniversalButton
                    label="Add Sender ID"
                    id="blocksenderidadd"
                    name="blocksenderidadd"
                    variant="primary"
                    onClick={() => setBlockAddSenderid(true)}
                  />
                </div>
              </div>
            </div>
          </div>
          {isFetching ? (
            <div className="">
              <UniversalSkeleton height="35rem" width="100%" />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
              id="blocksenderidtable"
              name="blocksenderidtable"
                rows={rows}
                col={columns}
              />
            </div>
          )}
          <Dialog
            header="Add Sender ID"
            visible={blockaddsenderid}
            onHide={() => setBlockAddSenderid(false)}
            className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
            draggable={false}
          >
            <div className='space-y-4'>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    id: "blocksenderid1",
                    name: "sms",
                    value: "SMS",
                  },
                  {
                    id: "blocksenderid2",
                    name: "obd",
                    value: "OBD",
                  },

                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={item.id}
                      name={item.name}
                      value={item.value}
                      onChange={BlockAddSenderidChange}
                      checked={blockaddsenderidcheck.includes(item.value)}
                    />
                    <label htmlFor={item.id} className="text-sm">
                      {item.value}
                    </label>
                  </div>
                ))}
              </div>
              <InputField
                label="Sender ID"
                name="senderidadd"
                id="senderidadd"
                placeholder="Enter Sender ID"
              />
              <UniversalTextArea
                label="Remarks"
                id="senderidaddremark"
                name="senderidaddremark"
                placeholder="Enter Remarks"
              />
              <div className='flex justify-center'>
                <UniversalButton
                  label="Submit"
                  id="senderidaddsubmit"
                  name="senderidaddsubmit"
                  variant="primary"
                />
              </div>
            </div>
          </Dialog>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
        <div className="w-full">
            <div className="flex items-end justify-between w-full gap-2 pb-5 align-middle flex--wrap">
              <div className='flex items-end gap-2'>
                <div className="w-full sm:w-40">
                  <UniversalDatePicker
                    label="From Date"
                    id="blockseriesfrom"
                    name="blockseriesfrom"
                    placeholder="Select Date"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <UniversalDatePicker
                    label="To Date"
                    id="blockseriesto"
                    name="blockseriesto"
                    placeholder="Select Date"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <InputField
                    label="Series"
                    id="blockseries"
                    name="blockseries"
                    placeholder="Enter Series"

                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label="Search"
                    id="blockseriessearch"
                    name="blockseriessearch"
                    variant="primary"
                    icon={<IoSearch />}
                  // onClick={handleCampaignSearch}
                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label="delete"
                    id="blockseriesdelete"
                    name="blockseriesdelete"
                    variant="primary"
                  // onClick={handleCampaignSearch}
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <div className="w-max-content">
                  <UniversalButton
                    label="Add Series"
                    id="blockseriesadd"
                    name="blockseriesadd"
                    variant="primary"
                    onClick={() => setBlockaddseries(true)}
                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label="Import"
                    id="blockseriesimport"
                    name="blockseriesimport"
                    variant="primary"
                   onClick={() => setBlockseriesImportnumber(true)}
                  />
                </div>
              </div>
            </div>
          </div>
          {isFetching ? (
            <div className="">
              <UniversalSkeleton height="35rem" width="100%" />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
              id="blockseriestable"
              name="blockseriestable"
                rows={rows}
                col={columns}
              />
            </div>
          )}
          <Dialog
            header="Add Block Series"
            visible={blockaddseries}
            onHide={() => setBlockaddseries(false)}
            className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
            draggable={false}
          >
            <div className='space-y-4'>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    id: "blockseries1",
                    name: "obd",
                    value: "OBD",
                  },
                  {
                    id: "blockseries2",
                    name: "ibd",
                    value: "IBD",
                  },
                  {
                    id: "blockseries3",
                    name: "c2c",
                    value: "C2C",
                  },
                  {
                    id: "blockseries4",
                    name: "missedcall",
                    value: "Missed Call",
                  },
                  {
                    id: "blockseries5",
                    name: "whatsapp",
                    value: "Whats App",
                  },
                  {
                    id: "blockseries6",
                    name: "rcs",
                    value: "RCS",
                  },

                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={item.id}
                      name={item.name}
                      value={item.value}
                      onChange={BlockAddSeriesChange}
                      checked={blockseriesaddcheck.includes(item.value)}
                    />
                    <label htmlFor={item.id} className="text-sm">
                      {item.value}
                    </label>
                  </div>
                ))}
              </div>
              <InputField
                label="Block Series"
                id="blockseries"
                name="blockseries"
                placeholder="Enter Block Series"
              />
              <UniversalTextArea
                label="Remarks"
                id="blockremarks"
                name="blockremarks"
                placeholder="Enter Remarks"
              />
              <div className='flex justify-center'>
                <UniversalButton
                  label="Submit"
                  id="blockseriesaddsubmit"
                  name="blockseriesaddsubmit"
                />
              </div>
            </div>
          </Dialog>
          <Dialog
            header="Import Block Number"
            visible={blockseriesImportnumber}
            onHide={() => setBlockseriesImportnumber(false)}
            className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
            draggable={false}
          >
             <div className="file-upload mt-2">
            <div
              className="file-upload-container"
              onDrop={handleFileDropSeries}
              onDragOver={handleDragOverSeries}
            >
              <input
                type="file"
                onChange={handleFileChangeSeries}
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
                    onClick={handleFileUploadSeries}
                    disabled={isUploadingSeries}
                    className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${
                      isUploadingSeries ? "disabled" : ""
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
                {uploadedFileSeries ? (
                  <div className="file-upload-info flex items-center justify-center  gap-1">
                    <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                      {isUploaded ? "File Uploaded: " : "File Selected: "}
                      <strong>{uploadedFileSeries.name}</strong>
                    </p>
                    <button
                      className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                      onClick={handleRemoveFileSeries}
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
          </Dialog>
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default Blacklist
