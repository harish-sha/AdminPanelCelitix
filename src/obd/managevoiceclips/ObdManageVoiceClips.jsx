import React, { useEffect, useRef } from "react";
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

import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import { IconButton, Switch } from "@mui/material";
import {
  deleteVoiceClip,
  fetchVoiceClips,
  fetchVoiceClipUrl,
  saveDynamicVoice,
  saveStaticVoice,
} from "@/apis/obd/obd";
import { DataTable } from "@/components/layout/DataTable";
import MusicPlayerSlider from "./components/ObdAudioplayer";
import { DynamicFile } from "./components/DynamicFile";

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

  const [staticVoice, setStaticVoice] = useState({
    name: "",
    file: null,
    fileName: "",
  });
  const [dynamicVoice, setDynamicVoice] = useState({
    isdynamic: 1,
    voiceType: "",
    voiceName: "",
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
    setStaticVoice({ ...staticVoice, fileName: "", file: null });
    fileRef.current.value = "";
    toast.success("File removed successfully.");
  };

  // dynamic option

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  async function uploadDynamicFile(e, index) {
    const selectedFile = dynamicVoice.dynamicList[index].file;
    const base64 = await getBase64(selectedFile);

    const dynamicList = [...dynamicVoice.dynamicList];
    dynamicList[index] = {
      ...dynamicList[index],
      fileBase64: base64,
    };
    setDynamicVoice((prev) => ({
      ...prev,
      dynamicList: dynamicList,
    }));
  }

  function removeDynamicFile(e, index) {
    if (!dynamicVoiceRef.current[index].value) return;
    dynamicVoiceRef.current[index].value = "";
    const dynamicList = [...dynamicVoice.dynamicList];

    dynamicList[index] = {
      ...dynamicList[index],
      fileName: "",
      fileBase64: "",
    };
    setDynamicVoice((prev) => ({
      ...prev,
      dynamicList: dynamicList,
    }));
  }

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
            onChange={(e) => {}}
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
          ? item.status == searchValue.user
          : true;

        const matchesAdminStatus = searchValue?.admin
          ? item.adminStatus == searchValue.admin
          : true;

        return matchesName && matchesStatus && matchesAdminStatus;
      });

      const formattedData = Array.isArray(filteredData)
        ? filteredData.map((item, index) => ({
            sn: index + 1,
            id: item.srNo,
            ...item,
          }))
        : [];

      setRows(formattedData);
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

  async function handleAudioPlay(row) {
    try {
      const res = await fetchVoiceClipUrl(row.id);
      if (!res.path) return toast.error("Something went wrong");
      const url = res.path;
      setSelectedRow({ ...row, url });
      setIsOpenPlay(true);
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  function hasConsecutiveDuplicates(dynamicList) {
    for (let i = 1; i < dynamicList.length; i++) {
      if (dynamicList[i].dynamicType === dynamicList[i - 1].dynamicType) {
        toast.error(
          `Consecutive items at positions ${i} and ${
            i + 1
          } have the same type "${dynamicList[i].dynamicType}"`
        );
        return true;
      }
    }
    return false;
  }

  async function handleSave() {
    if (selectedOption === "option1" && !staticVoice.file)
      return toast.error("Please select a file");

    if (selectedOption === "option1" && !staticVoice.name)
      return toast.error("Please give a file name");
    if (selectedOption === "option2" && !dynamicVoice.voiceName)
      return toast.error("Please give a file name");
    if (selectedOption === "option2" && !dynamicVoice.dynamicList.length)
      return toast.error("Please select atleast 1 item");

    let isError = false;
    if (selectedOption === "option2") {
      dynamicVoice.dynamicList.forEach((item, index) => {
        if (item.dynamicType === "file" && !item.fileBase64) {
          toast.error(`Please upload file for item ${index + 1}`);
          isError = true;
        }
      });
    }

    selectedOption === "option2" &&
      hasConsecutiveDuplicates(dynamicVoice.dynamicList);

    if (isError) return;

    const typeId = {
      transactional: 2,
      promotional: 1,
    };

    try {
      if (selectedOption === "option1") {
        const formData = new FormData();
        formData.append("mp3File", staticVoice.file);
        formData.append("type", typeId[selecteTransactional]);
        formData.append("fileName", staticVoice.name);

        const res = await saveStaticVoice(formData);
        if (!res?.msg?.includes("successfully"))
          return toast.error(res?.existmessage);
        setIsVisible(false);
        toast.success(res.msg);
        setStaticVoice({
          fileName: "",
          file: null,
        });
        setSelectedOption("option2");
        await handlefetchAllVoiceClips();
        setSelecteTransactional("transactional");
      } else if (selectedOption === "option2") {
        const payload = {
          ...dynamicVoice,
          voiceType: typeId[selecteTransactional],
        };
        const res = await saveDynamicVoice(payload);
        console.log(res);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }

  function addDynamicItem(type) {
    if (dynamicVoice?.dynamicList?.length >= 5)
      return toast.error("You can add only 5 items");
    const newItem = {
      dynamicType: type,
      sequence: dynamicVoice?.dynamicList?.length + 1,
      fileName: "",
      fileBase64: "",
      id: `apply${dynamicVoice?.dynamicList?.length + 1}`,
    };
    const lastItem =
      dynamicVoice?.dynamicList?.[dynamicVoice?.dynamicList?.length - 1];

    if (lastItem?.dynamicType === type)
      return toast.error("You can add only one item per type");

    setDynamicVoice((prev) => ({
      ...prev,
      dynamicList: [...prev.dynamicList, newItem],
    }));
  }

  function handleDynamicFileChange(e, index) {
    const files = e.target.files[0];
    const dynamicList = [...dynamicVoice.dynamicList];

    dynamicList[index] = {
      ...dynamicList[index],
      fileName: files.name,
      fileBase64: "",
      file: files,
    };
    setDynamicVoice((prev) => ({
      ...prev,
      dynamicList: dynamicList,
    }));
  }

  function deleteDynamicItem(e, index) {
    const id = `apply${index + 1}`;
    console.log(id);
    console.log(dynamicVoice.dynamicList);
    const updatedList = dynamicVoice.dynamicList.filter(
      (item) => item.id !== id
    );

    setDynamicVoice((prev) => ({
      ...prev,
      dynamicList: updatedList,
    }));
  }

  function handleDynamicVarChange(e, index) {
    const dynamicList = [...dynamicVoice.dynamicList];
    dynamicList[index] = {
      ...dynamicList[index],
      variable: e.target.value,
    };
    setDynamicVoice((prev) => ({
      ...prev,
      dynamicList: dynamicList,
    }));
  }

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
                { value: "1", label: "Approved" },
                { value: "2", label: "Pending" },
                { value: "3", label: "Disapproved" },
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
                { value: "1", label: "Active" },
                { value: "0", label: "Inactive" },
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
          header="Add Voice Clips"
          visible={isVisible}
          onHide={() => {
            setIsVisible(false);
          }}
          className="lg:w-[50rem] md:w-[40rem] w-[20rem]"
          draggable={false}
        >
          <div className="flex gap-2">
            <div className="flex flex-col gap-5">
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
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 items-center shadow-md p-2 rounded-full">
                <RadioButton
                  inputId="enabletransactionalOption1"
                  name="enableTransactional"
                  value="transactional"
                  checked={selecteTransactional === "transactional"}
                  onChange={handleChangeTransactional}
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
                <label>Promotional</label>
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
                  value={staticVoice.name}
                  onChange={(e) => {
                    setStaticVoice({
                      ...staticVoice,
                      name: e.target.value,
                    });
                  }}
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
                    accept="audio/*"
                    ref={fileRef}
                  />
                  <div className="flex items-center justify-center gap-2">
                    <label
                      htmlFor="fileInput"
                      className="file-upload-button inline-block bg-blue-400 hover:bg-blue-500 text-white font-medium text-sm px-3 py-2 rounded-lg cursor-pointer text-center tracking-wider"
                    >
                      Choose or Drop File
                    </label>
                  </div>
                  <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
                    Upload supported audio files
                  </p>
                  <div className="mt-3">
                    {staticVoice.fileName ? (
                      <div className="file-upload-info flex items-center justify-center  gap-1">
                        <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                          {isUploaded ? "File Uploaded: " : "File Selected: "}
                          <strong>{staticVoice.fileName}</strong>
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
          {/* insert here */}
          {selectedOption === "option2" && (
            <>
              <div className="flex flex-col">
                <div className="mt-2 text-sm">
                  <InputField
                    label="Template Name"
                    placeholder="Enter Template Name"
                    required
                    value={dynamicVoice.voiceName}
                    onChange={(e) => {
                      setDynamicVoice({
                        ...dynamicVoice,
                        voiceName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-row mt-2 justify-center gap-2">
                  <UniversalButton
                    id="obdvoiceaddfilebtn"
                    name="obdvoiceaddfilebtn"
                    label="Add file"
                    placeholder="Add file"
                    onClick={(e) => {
                      addDynamicItem("file");
                    }}
                  />
                  <UniversalButton
                    id="obdvoiceaddfilebtn"
                    name="obdvoiceaddfilebtn"
                    label="Add Variable"
                    placeholder="Add Variable"
                    onClick={() => {
                      addDynamicItem("variable");
                    }}
                  />
                </div>
              </div>
              {dynamicVoice.dynamicList.length > 0 && (
                <>
                  <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-300 p-2 rounded-md mt-2">
                    {dynamicVoice.dynamicList.map((list, index) => (
                      <div key={index} className="">
                        <DynamicFile
                          data={list}
                          voiceRef={dynamicVoiceRef}
                          removeDynamicFile={removeDynamicFile}
                          index={index}
                          uploadDynamicFile={uploadDynamicFile}
                          handleFileChange={handleDynamicFileChange}
                          deleteDynamicItem={deleteDynamicItem}
                          handleDynamicVarChange={handleDynamicVarChange}
                          dynamicVoice={dynamicVoice}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          <UniversalButton
            id="submit"
            label="save"
            onClick={handleSave}
            style={{
              marginTop: "2rem",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          />
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
