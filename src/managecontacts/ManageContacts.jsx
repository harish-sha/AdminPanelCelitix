import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx';
import CustomTooltip from '../whatsapp/components/CustomTooltip'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { MultiSelect } from 'primereact/multiselect'
import AnimatedDropdown from '../whatsapp/components/AnimatedDropdown'
import UniversalButton from '../whatsapp/components/UniversalButton'
import { IoSearch } from 'react-icons/io5'
import InputField from '../components/layout/InputField'
import WhatsappManageContactsTable from './components/WhatsappManageContactsTable'
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RadioGroupField from '../whatsapp/components/RadioGroupField'
import UniversalDatePicker from '../whatsapp/components/UniversalDatePicker'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { MdOutlineDeleteForever } from "react-icons/md";
import toast from 'react-hot-toast'
import UniversalSkeleton from '../whatsapp/components/UniversalSkeleton'

const ManageContacts = () => {
  const [selectedMultiGroup, setSelectedMultiGroup] = useState(null);
  const [selectedMultiGroupContact, setSelectedMultiGroupContact] = useState(null);
  const [selectedmanageGroups, setSelectedManageGroups] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [addGroupvisible, setaddGroupVisible] = useState(false);
  const [addContactvisible, setaddContactVisible] = useState(false);
  const [selectedddImportContact, setSelectedAddImportContact] = useState("option2");
  const [selectedaddwish, setSelectedAddWish] = useState("No");
  const [selectedgamderadd, setSelectedGamderAdd] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [totalRecords, setTotalRecords] = useState("")
  const [manageContactFirst, setMmanageContactFirst] = useState("");
  const [manageContactMobile, setManageContactMobile] = useState("");

  const multiGroup = [
    { name: 'Group 1'},
    { name: 'Group 2'},
    { name: 'Group 3'},
    { name: 'Group 4'},
    { name: 'Group 5'}
  ];
  const multiGroupContact = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  const manageGroups = [
    { name: 'Group1', code: 'G1' },
    { name: 'Group2', code: 'G2' },
    { name: 'Group3', code: 'G3' },
    { name: 'Group4', code: 'G4' },
    { name: 'Group5', code: 'G5' }
  ];

  const addImportContact = [
    { value: "option1", label: "Add Contact" },
    { value: "option2", label: "Import Contacts" },
  ];
  const handleOptionChange = (event) => {
    setSelectedAddImportContact(event.target.value);
    // console.log("Selected Option:", event.target.value);
  };
  const addwish = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];
  const handleOptionChange2 = (event) => {
    setSelectedAddWish(event.target.value);
    // console.log("Selected Option:", event.target.value);
  };
  const gamderadd = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const handleOptionChange3 = (event) => {
    setSelectedGamderAdd(event.target.value);
    // console.log("Selected Option:", event.target.value);
  };

  const selectedManageGroups = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const manageGroupsOption = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };


  const options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];


  const handleShowSearch = async () => {
    console.log("Show Logs:");
    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulating API Call
    setIsFetching(false);
    // setFilteredData([]); // Reset data
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchGroup = async () => {
    console.log("Search Filters:");
    console.log({
      user: selectedMultiGroup,
      fastName: manageContactFirst,
      mobileNumber: manageContactMobile,
      status: selectedStatus,
    });

    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsFetching(false);

    // setFilteredData([]); 
  };

  const groups = [
    { id: 1, name: "Group 1" },
    { id: 2, name: "Group 2" },
    { id: 3, name: "Group 3" },
    { id: 4, name: "Group 4" },
    { id: 5, name: "Group 5" },
    { id: 6, name: "Group 6" },
    { id: 7, name: "Group 7" },
    { id: 8, name: "Group 8" },
    { id: 9, name: "Group 9" },
    { id: 10, name: "Group 10" },
  ];

  // handle File drop
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      const validExtensions = ['.xls', '.xlsx', '.xlsm'];
      const fileExtension = file.name.split('.').pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split('.')[0])) {
          setUploadedFile(file);
          setIsUploaded(false);
          parseFile(file);
        } else {
          toast.error("File name can only contain alphanumeric characters, underscores, or hyphens.");
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
      const validExtensions = ['.xls', '.xlsx', '.xlsm'];
      const fileExtension = file.name.split('.').pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split('.')[0])) {
          setUploadedFile(file);
          setIsUploaded(false);
          parseFile(file);
        } else {
          toast.error("File name can only contain alphanumeric characters, underscores, or hyphens.");
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
      const workbook = XLSX.read(reader.result, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      // const headers = Object.keys(jsonData[0]);
      const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
      // const headers = Object.keys(jsonData[0] || {}).map(header => header.trim()); // Trim header names
      console.log("Extracted headers:", headers);

      setFileData(jsonData);
      setColumns(headers);
      setFileHeaders(headers);
      // setIsUploaded(false); // Reset to "File Selected" if a new file is selected
      setTotalRecords(jsonData.length);
    };
    reader.readAsBinaryString(file);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Excel file upload
  const handleFileUpload = async () => {
    // if (uploadedFile) {
    //   if (isUploaded) {
    //     toast.error("File already uploaded. Please select a different one.");
    //     return;
    //   }
    //   setIsUploading(true);
    //   try {
    //     const response = await campaignUploadFile(uploadedFile);
    //     console.log("File uploaded successfully :", response)
    //     setIsUploaded(true);
    //     toast.success("File uploaded successfully.");
    //     setColumns(response.headers);
    //     setFileData(response.sampleRecords);
    //     setFileHeaders(response.headers || [])
    //   } catch (error) {
    //     toast.error("File upload failed: " + error.message);
    //   } finally {
    //     setIsUploading(false);
    //   }
    // } else {
    //   toast.error("No file selected for upload.");
    // }
  };

  // Validate filename
  const isValidFileName = (fileName) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(fileName);
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
    // setAddCountryCode(false)
    // setSelectedCountryCode('');
    document.getElementById("fileInput").value = "";
    toast.success("File removed successfully.");
  };

  const handleManageContactMobile = (e) => {
    setManageContactMobile(e.target.value);
  };


  const handleManageContactFirst = (e) => {
    setMmanageContactFirst(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-end justify-end align-middle pb-1 w-full">
        {/* Name Input Field */}

        <div className="w-max-content">
          <UniversalButton
            id="addgroupbtn"
            name="addgroupbtn"
            label="Add Group"
            onClick={() => setaddGroupVisible(true)}
          />
        </div>

        <div className="w-max-content">
          <UniversalButton
            id="addcontactbtn"
            name="addcontactbtn"
            label="Add Contact"
            onClick={() => setaddContactVisible(true)}
          />
        </div>

        <div className="w-max-content">
          <UniversalButton
            id="exportbtn"
            name="exportbtn"
            label="Export"
          />
        </div>
      </div>
      <div className='flex flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full' >
        <div className="w-full sm:w-56">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium text-gray-700">User</label>

            <CustomTooltip
              title="Select User"
              placement="right"
              arrow
            >
              <span>
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </span>
            </CustomTooltip>
          </div>
          <MultiSelect
            className="custom-multiselect"
            placeholder="Select Groups"
            maxSelectedLabels={0}
            optionLabel="name"
            options={multiGroup}
            value={selectedMultiGroup}
            onChange={(e) => setSelectedMultiGroup(e.value)}
            filter
          />
        </div>

        <div className="w-full sm:w-56" >
          <InputField
            label='First Name'
            id="name"
            name="name"
            type='text'
            tooltipContent='Enter First Name'
            placeholder='Enter First Name'
            value={manageContactFirst}
            onChange={handleManageContactFirst}
          />
        </div>
        <div className="w-full sm:w-56" >
          <InputField
            label='Mobile Number'
            tooltipContent='Enter Mobile Number'
            id="mobile"
            name="mobile"
            type='number'
            value={manageContactMobile}
            onChange={handleManageContactMobile}
            placeholder='Enter Mobile Number'
          />
        </div>
        <div className="w-full sm:w-56" >
          <AnimatedDropdown
            id='statusdropdown'
            name='statusdropdown'
            label="Status"
            tooltipContent="Select Status"
            tooltipPlacement="right"
            options={options}
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            placeholder="Status"
          />
        </div>


        <div className="w-max-content ">
          <UniversalButton
            id='managegroupSearchBtn'
            name='managegroupSearchBtn'
            label={isFetching ? "Searching..." : "Search"}
            icon={<IoSearch />}
            onClick={handleSearchGroup}
            variant="primary"
            disabled={isFetching}
          />
        </div>
        <div className="w-max-content ">
          <UniversalButton
            id='managegroupdeletebtn'
            name='managegroupdeletebtn'
            label="Delete"
          />
        </div>

      </div>

      {isFetching ? (
        <UniversalSkeleton height="35rem" width="100%" />
      ) : (
        <WhatsappManageContactsTable />
      )}

      <div className="card flex justify-content-center">
        {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
        <Dialog header="Group" visible={addGroupvisible} draggable={false} style={{ width: '40rem' }} onHide={() => { if (!addGroupvisible) return; setaddGroupVisible(false); }}>
          <div className="card">
            <TabView>
              <TabPanel header="Add New" leftIcon="pi pi-calendar mr-2">
                <InputField
                  id="addGroupname"
                  name="addGroupname"
                  type='text'
                  placeholder='Enter group name...'
                />
                <div className="flex justify-center mt-2">
                  <UniversalButton
                    id="addnewgroup"
                    name="addnewgroup"
                    label="Submit"
                    variant="primary"
                  />
                </div>
              </TabPanel>
              <TabPanel header="Manage" rightIcon="pi pi-user ml-2">
                <div className="m-0">
                  <div className="card flex justify-content-center">
                    <Dropdown value={selectedmanageGroups} onChange={(e) => setSelectedManageGroups(e.value)} options={manageGroups} optionLabel="name" placeholder="Select Groups"
                      filter valueTemplate={selectedManageGroups} itemTemplate={manageGroupsOption} className="w-full md:w-14rem" />
                  </div>
                  <table className="w-full border border-gray-300 my-2 text-left">
                    <thead className="bg-gray-100 border-b-2 border-gray-300">
                      <tr>
                        <th className="px-4 py-1 border-r">Group Name</th>
                        <th className="px-4 py-1">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groups.map((group) => (
                        <tr key={group.id} className="h-10 border-b border-gray-300">
                          <td className="px-4 py-1 border-r">{group.name}</td>
                          <td className="px-4 py-1 flex gap-3">
                            <IconButton className="no-xs" onClick={() => handleView(group)}>
                              <DeleteIcon sx={{ fontSize: "1.2rem", color: "green" }} />
                            </IconButton>
                            <IconButton onClick={() => handleDuplicate(group)}>
                              <EditNoteIcon sx={{ fontSize: "1.2rem", color: "gray" }} />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </Dialog>
      </div>
      <div className="card flex justify-content-center">
        <Dialog header="Add Contact" visible={addContactvisible} draggable={false} style={{ width: '40rem' }} onHide={() => { if (!addContactvisible) return; setaddContactVisible(false); }}>
          <div className="m-0">
            <MultiSelect
              className="custom-multiselect"
              placeholder="Select Groups"
              maxSelectedLabels={0}
              optionLabel="name"
              options={multiGroupContact}
              value={selectedMultiGroupContact}
              onChange={(e) => setSelectedMultiGroupContact(e.value)}
              filter
            />
            <RadioGroupField
              name="addImportContact"
              id="addImportContact"
              options={addImportContact}
              value={selectedddImportContact}
              onChange={handleOptionChange}
            />

            {selectedddImportContact === "option1" && (
              <div>
                <div className="grid grid-cols-2 lg:flex-nowrap flex-wrap gap-3">
                  <InputField
                    placeholder="Enter first name.."
                    id="userfirstname"
                    name="userfirstname"
                    type="text"
                  />
                  <InputField
                    placeholder="Enter middle name.."
                    id="usermiddlename"
                    name="usermiddlename"
                    type="text"
                  />
                  <InputField
                    placeholder="Enter last name.."
                    id="userlastname"
                    name="userlastname"
                    type="text"
                  />
                  <InputField
                    placeholder="Enter mobile no.."
                    id="mobilenumber"
                    name="mobilenumber"
                    type="number"
                  />
                  <InputField
                    placeholder="Enter email id.."
                    id="emailid"
                    name="emailid"
                    type="email"
                  />
                  <InputField
                    placeholder="Enter unique id.."
                    id="uniqueid"
                    name="uniqueid"
                    type="text"
                  />
                  <UniversalDatePicker
                    label="Birth Date"
                  />
                  <UniversalDatePicker
                    label="Anniversary Date"
                    className='mb-0'
                  />
                  <RadioGroupField
                    name="addwish"
                    id="addwish"
                    options={addwish}
                    value={selectedaddwish}
                    onChange={handleOptionChange2}
                  />
                  <RadioGroupField
                    name="gamderadd"
                    id="addgamderaddImportContact"
                    options={gamderadd}
                    value={selectedgamderadd}
                    onChange={handleOptionChange3}
                  />
                </div>
                <div className="flex justify-center mt-2">
                  <UniversalButton
                    id="addnewConcat"
                    name="addnewConcat"
                    label="Submit"
                    variant="primary"
                  />
                </div>
              </div>
            )}

            {selectedddImportContact === "option2" && (
              <div className="importcontacts">
                {/* Your content for Import Contacts */}
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
                    <div className="flex items-center justify-center gap-2" >
                      <label htmlFor="fileInput" className="file-upload-button inline-block bg-blue-400 hover:bg-blue-500 text-white font-medium text-sm px-3 py-2 rounded-lg cursor-pointer text-center tracking-wider">
                        Choose or Drop File
                      </label>
                      <div className="upload-button-container ">
                        <button
                          onClick={handleFileUpload}
                          disabled={isUploading}
                          className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${isUploading ? 'disabled' : ''}`}
                        >
                          <FileUploadOutlinedIcon sx={{ color: "white", fontSize: "23px" }} />
                        </button>
                      </div>
                    </div>
                    <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
                      Max 3 lacs records & mobile number should be with country code. <br />
                      Supported File Formats: .xlsx
                    </p>
                    <div className="mt-3" >
                      {uploadedFile ? (
                        <div className="file-upload-info flex items-center justify-center  gap-1">
                          <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                            {isUploaded ? (
                              "File Uploaded: "
                            ) : (
                              "File Selected: "
                            )}
                            <strong>{uploadedFile.name}</strong>
                          </p>
                          <button
                            className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                            onClick={handleRemoveFile}
                          >
                            <MdOutlineDeleteForever
                              className='text-red-500 cursor-pointer hover:text-red-600'
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

                <div className="flex justify-center mt-2">
                  <UniversalButton
                    id="addimportConcat"
                    name="addimportConcat"
                    label="Submit"
                    variant="primary"
                  />
                </div>
              </div>
            )}
          </div>
        </Dialog>
      </div>
    </div>

  )
}

export default ManageContacts
