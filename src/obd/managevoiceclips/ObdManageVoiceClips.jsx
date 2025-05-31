import * as XLSX from "xlsx";
import { useRef, useState } from "react";
import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import { IconButton, Switch } from "@mui/material";
import { toast } from "react-hot-toast";

import InputField from "../../components/layout/InputField";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import Obdmanagecampaign from "./components/Obdmanagecampaign";
import CustomTooltip from "../../components/common/CustomTooltip";
import { DataTable } from "@/components/layout/DataTable";
import MusicPlayerSlider from "./components/ObdAudioplayer";
import { DynamicFile } from "./components/DynamicFile";

import {
  deleteVoiceClip,
  fetchVoiceClips,
  fetchVoiceClipUrl,
  saveDynamicVoice,
  saveStaticVoice,
} from "@/apis/obd/obd";


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
  const [rows, setRows] = useState([]);

  const [addVariable, setAddVariable] = useState([]);
  const [addDynamicFile, setAddaddDynamicFile] = useState([]);

  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isOpenPlay, setIsOpenPlay] = useState(false);

  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  const [searchValue, setSearchValue] = useState({
    name: "",
    admin: "",
    user: "",
  });

  const [dynamicVoice, setDynamicVoice] = useState({
    isdynamic: 1,
    voiceType: "",
    voiceName: "",
    variableValue: "",
    dynamicList: [
      {
        dynamicType: "file",
        sequence: 1,
        fileName: "",
        fileBase64: "",
        id: "apply1",
      },
    ],
  });

  const fileRef = useRef(null);
  const dynamicVoiceRef = useRef([]);

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

    setStaticVoice({ ...staticVoice, fileName: file.name, file: file });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setStaticVoice({ ...staticVoice, fileName: file.name, file: file });
  };

  const isValidFileName = (fileName) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(fileName);
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

  const deleteDynamicFile = (id) => { };

  const handleaddDynamicfile = (id, newValue) => {
    setAddaddDynamicFile((prev) =>
      prev.map((addFile) =>
        addFile.id === id ? { ...addFile, value: newValue } : addFile
      )
    );
  };

  const cols = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "srNo", headerName: "AudioId", flex: 0, minWidth: 80 },
    {
      field: "fileName",
      headerName: "File/Template Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "fileType",
      headerName: "File Format",
      flex: 1,
      minWidth: 100,
    },
    { field: "size(kb)", headerName: "Size(kb)", flex: 1, minWidth: 100 },
    {
      field: "duration(sec)",
      headerName: "Duration(sec)",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return params.row.type === 1 ? "Promotional" : "Transactional";
      },
    },
    {
      field: "adminStatus",
      headerName: "Admin Status",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "User Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip value={"Active"}>
          <Switch
            checked={Number(params.row.status) === 1}
            onChange={(e) => { }}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#34C759",
              },
              "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
              {
                backgroundColor: "#34C759",
              },
            }}
          />
        </CustomTooltip>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Play" placement="top" arrow>
            <IconButton onClick={(event) => handleAudioPlay(params.row)}>
              <PlayCircleFilledWhiteOutlinedIcon
                className="cursor-pointer "
                size={20}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete" placement="top" arrow>
            <IconButton
              onClick={(event) => {
                setIsDeleteVisible(true);
                setSelectedRow(params.row);
              }}
            >
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
    // {
    //   field: "play",
    //   headerName: "Play",
    //   flex: 1,
    //   minWidth: 120,
    //   renderCell: (params) => (
    //     <CustomTooltip title="Play" placement="top" arrow>
    //       <IconButton onClick={(event) => handleAudioPlay(params.row)}>
    //         <PlayCircleFilledWhiteOutlinedIcon
    //           className="cursor-pointer "
    //           size={20}
    //         />
    //       </IconButton>
    //     </CustomTooltip>
    //   ),
    // },
  ];

  async function handlefetchAllVoiceClips() {
    try {
      const res = await fetchVoiceClips();

      if (res?.message === "Record not found") {
        setRows([]);
        if (isSearchTriggered) {
          toast.error("No data available");
        }
        return;
      }

      const filteredData = res.filter((item) => {
        const matchesName = searchValue?.name
          ? item.fileName.toLowerCase().includes(searchValue.name.toLowerCase())
          : true;

        const matchesStatus = searchValue?.user
          ? item.status === searchValue.user
          : true;

        const matchesAdminStatus = searchValue?.admin
          ? item.adminStatus === searchValue.admin
          : true;

        return matchesName && matchesStatus && matchesAdminStatus;
      });

      let formattedData = [];
      if (filteredData.length > 0) {
        formattedData = Array.isArray(filteredData)
          ? filteredData.map((item, index) => ({
            sn: index + 1,
            id: item.srNo,
            ...item,
          }))
          : [];
      } else {
        formattedData = Array.isArray(res)
          ? res.map((item, index) => ({
            sn: index + 1,
            id: item.srNo,
            ...item,
          }))
          : [];
      }
      setRows(formattedData);

      if (isSearchTriggered && formattedData.length === 0) {
        toast.error("No data available");
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    handlefetchAllVoiceClips();
  }, []);

  async function handleDelete(id) {
    try {
      const res = await deleteVoiceClip(id);
      if (!res?.message.includes("successfully")) {
        return toast.error(res.message);
      }
      toast.success(res.message);
      setIsDeleteVisible(false);
      await handlefetchAllVoiceClips();
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  const BASE_AUDIO_URL = import.meta.env.VITE_AUDIO_URL;
  async function handleAudioPlay(row) {
    try {
      const res = await fetchVoiceClipUrl(row.id);
      if (!res.path) return toast.error("Something went wrong");
      const url = `${BASE_AUDIO_URL}/${res.path}`;
      console.log(url)
      setSelectedRow({ ...row, url });
      setIsOpenPlay(true);

    } catch (e) {
      toast.error("Something went wrong", e);
    }


  }

  // async function handleAudioPlay(row) {
  //   try {
  //     const res = await fetchVoiceClipUrl(row.id);
  //     if (!res.path) return toast.error("Something went wrong");
  //     const url = res.path;
  //     setSelectedRow({ ...row, url });
  //     setIsOpenPlay(true);
  //   } catch (e) {
  //     toast.error("Something went wrong");
  //   }
  // }

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-3">
        <div className="flex items-end gap-2">
          <div className="w-full sm:w-46 ">
            <InputField
              id="obdmanagevoiceclipsfilename"
              name="obdmanagevoiceclipsfilename"
              value={searchValue.name}
              label="File Name"
              placeholder="File Name"
              type="text"
              onChange={(e) =>
                setSearchValue({ ...searchValue, name: e.target.value })
              }
            />
          </div>
          <div className="w-full  sm:w-46">
            <AnimatedDropdown
              id="obdmanagevoiceclipsadminstatus"
              name="obdmanagevoiceclipsadminstatus"
              value={searchValue.admin}
              label="Admin Status"
              tooltipContent="Admin Status"
              tooltipPlacement="right"
              placeholder="Admin Status"
              options={[
                { value: 1, label: "Approved" },
                { value: 2, label: "Pending" },
                { value: 3, label: "Disapproved" },
              ]}
              onChange={(value) => {
                setSearchValue({ ...searchValue, admin: value });
              }}
            />
          </div>
          <div className="w-full sm:w-46">
            <AnimatedDropdown
              id="manageuserstatus"
              name="manageuserstatus"
              value={searchValue.user}
              label="User Status"
              tooltipContent="User Status"
              tooltipPlacement="right"
              placeholder="User Status"
              options={[
                { value: 1, label: "Active" },
                { value: 0, label: "Inactive" },
              ]}
              onChange={(value) => {
                setSearchValue({ ...searchValue, user: value });
              }}
            />
          </div>
          <div>
            <UniversalButton
              id="obdvoicesearchbtn"
              name="obdvoicesearchbtn"
              placeholder="Search"
              label="Search"
              onClick={() => {
                setIsSearchTriggered(true);
                handlefetchAllVoiceClips();
              }}
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
      <div className="mt-3">
        <DataTable
          id={"obdmanagevoiceclips"}
          name={"obdmanagevoiceclips"}
          col={cols}
          rows={rows}
        />
      </div>

      <div className="flex items-center gap-2">
        <Dialog
          header="Edit details"
          visible={isVisible}
          onHide={() => {
            setIsVisible(false);
          }}
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
                  onClick={() => { }}
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
                      onChange={(e) =>
                        handleaddDynamicfile(entry.id, e.target.value)
                      }
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
                              className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${isUploading ? "disabled" : ""
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

      <Dialog
        header="Confirm Delete"
        visible={isDeleteVisible}
        onHide={() => {
          setIsDeleteVisible(false);
          setSelectedRow(null);
        }}
        className="lg:w-[30rem] md:w-[40rem] w-[20rem]"
        draggable={false}
      >
        <div className="flex items-center justify-center">
          {/* <CancelOutlinedIcon
            sx={{ fontSize: 64, color: "ff3f3f" }}
            size={20}
          /> */}
        </div>
        <div>
          <div className="p-4 text-center">
            <p className="text-[1.1rem] font-semibold text-gray-600">
              Are you sure ?
            </p>
            <p>
              Do you really want to delete <br />
              <span className="text-green-500">
                '{selectedRow?.fileName || ""}'
              </span>
            </p>

            <div className="flex justify-center gap-4 mt-2">
              <UniversalButton
                label="Cancel"
                style={{
                  backgroundColor: "#090909",
                }}
                onClick={() => {
                  setIsDeleteVisible(false);
                  setSelectedRow(null);
                }}
              />
              <UniversalButton
                label="Delete"
                style={
                  {
                    // backgroundColor: "red",
                  }
                }
                onClick={() => {
                  handleDelete(selectedRow?.id);
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Music Player"
        visible={isOpenPlay}
        onHide={() => {
          setIsOpenPlay(false);
          setSelectedRow(null);
        }}
        className="lg:w-[30rem] md:w-[40rem] w-[20rem]"
        draggable={false}
      >
        <MusicPlayerSlider data={selectedRow} />
      </Dialog>
    </div>
  );
};

export default ObdManageVoiceClips;