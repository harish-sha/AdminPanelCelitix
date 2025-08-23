import React, { useEffect, useRef, useState } from "react";
import InputField from "../../whatsapp/components/InputField";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import { IoSearch } from "react-icons/io5";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import { DataTable } from "@/components/layout/DataTable";
import CustomTooltip from "@/components/common/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import moment from "moment";

import {
  getAllTemplates,
  getSingleTemplate,
  updateTemplateBySrno,
  deleteSingleSmsTemplate,
  deleteMultipleSmsTemplate,
  importTemplate,
} from "@/apis/sms/sms";
import { Dialog } from "primereact/dialog";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import toast from "react-hot-toast";
import { uploadContactFile } from "@/apis/contact/contact";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import { exportToExcel } from "@/utils/utills";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoPopover from "@/components/common/InfoPopover";


const SmsDLTtemplate = () => {
  const [isFetching, setIsFetching] = useState(false);
  // const [statusOption, setStatusOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [templatedltimport, setTemplateDltImport] = useState(false);

  const [templateIdFilter, setTemplateIdFilter] = useState("");
  const [templateNameFilter, setTemplateNameFilter] = useState("");

  const [entityid, setEntityId] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [clicked, setClicked] = useState([]);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownButtonRefs = useRef({});
  const closeDropdown = () => setDropdownOpenId(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".bot-settings")) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const [contactData, setContactData] = useState({});
  const [templateData, setTemplateData] = useState({
    templateName: "",
    templateId: "",
    type: "",
    message: "",
    status: "",
    senderId: "",
  });

  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [updateTemplateData, setUpdateTemplateData] = useState({});


  const fetchTemplates = async () => {
    setIsFetching(true);
    try {
      const rawData = await getAllTemplates("all");
      const reverseData = rawData.reverse();

      const filteredData = reverseData.filter((item) =>
        item.templateId?.toLowerCase().includes(templateIdFilter.toLowerCase()) &&
        item.templateName?.toLowerCase().includes(templateNameFilter.toLowerCase())
      );

      const mappedData = filteredData.map((item, index) => ({
        id: item.srNo,
        sn: index + 1,
        userid: item.userID || "-",
        templatename: item.templateName || "-",
        templateid: item.templateId || "-",
        entityid: item.entityId || "-",
        message: item.message || "-",
        senderid: item.senderID?.split(",")?.[0]?.trim() || "-",
        smstype:
          item.type === 1
            ? "Transactional"
            : item.type === 2
              ? "Promotional"
              : item.type === 3
                ? "International"
                : "Unknown",
        // consenttype: "-",
        inserttime: item.insertDate
          ? moment(item.insertDate).format("DD-MM-YYYY HH:mm:ss")
          : "-",
        status:
          item.status === 1
            ? "Approved"
            : item.status === 2
              ? "Rejected"
              : item.status === 3
                ? "Pending"
                : "Unknown",
      }));

      setRows(mappedData);
    } catch (err) {
      toast.error("Error fetching templates.");
    } finally {
      setIsFetching(false);
    }
  };

  // useEffect(() => {
  //   fetchTemplates();
  // }, [templateIdFilter, templateNameFilter]);

  // const statusOptions = [
  //   { label: "Active", value: "active" },
  //   { label: "Inactive", value: "inactive" },
  // ];

  const handleEditClick = async (id) => {
    setSelectedTemplateId(id);
    setIsEditVisible(true);

    try {
      const res = await getSingleTemplate(id);

      setSelectedTemplate(res[0]);
      setUpdateTemplateData({
        srNo: res[0]?.sr_no,
        entityId: res[0]?.entityId,
        templateId: res[0]?.templateid,
        msgFormat: res[0]?.msg_format,
        senderId: res[0]?.senderid,
      });
    } catch (e) {
      return toast.error("Something went wrong");
    }
  };
  const handleEdit = async () => {
    try {
      const res = await updateTemplateBySrno(updateTemplateData);

      if (!res?.message.includes("successfully")) {
        return toast.error(res?.message);
      }
      toast.success("Template updated successfully");
      setSelectedTemplate("");
      setSelectedTemplateId("");
      setIsEditVisible(false);
      await fetchTemplates();
    } catch (e) {
      return toast.error("Something went wrong");
    }
  };

  // const handleDelete = async (id) => {
  //   await deleteSingleSmsTemplate(id);
  //   await fetchTemplates();
  //   setSelectedTemplateId("");
  // };

  const handleDelete = async (id) => {
    try {
      const res = await deleteSingleSmsTemplate(id);

      if (res?.message?.includes("successfully")) {
        toast.success(res.message);
        await fetchTemplates();
        setSelectedTemplateId("");
      } else {
        toast.error(res?.message || "Failed to delete the template.");
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error deleting template:", error);
      toast.error("Something went wrong while deleting the template.");
    }
  };

  const handleMultipleDelete = async (selectedRows) => {
    if (selectedRows.length === 0) return;

    await deleteMultipleSmsTemplate({
      srNoList: selectedRows,
    });
    await fetchTemplates();
    setSelectedRows([]);
    setSelectedTemplateId("");
  };

  const handleView = (row) => {
    setClicked({
      TemplateID: row.templateid || "N/A",
      EntityID: row.entityid || "N/A",
      ConsentType: row.consentType || "N/A",
    });
    setDropdownOpenId(row.id);
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, width: 70 },
    { field: "userid", headerName: "USER ID", flex: 0, minWidth: 100 },
    {
      field: "templatename",
      headerName: "Template Name",
      flex: 1,
      minWidth: 120,
    },
    // { field: "templateid", headerName: "Template ID", flex: 1, minWidth: 110 },
    // { field: "entityid", headerName: "Entity ID", flex: 1, minWidth: 80 },
    {
      field: "message", headerName: "Message", flex: 1, minWidth: 300,
      renderCell: (params) => (
        <div className="text-sm text-gray-700 text-wrap">
          {params.value}
        </div>
      )
    },
    { field: "senderid", headerName: "Sender ID", flex: 1, minWidth: 130 },
    { field: "smstype", headerName: "SMS Type", flex: 1, minWidth: 120 },
    // {
    //   field: "consenttype",
    //   headerName: "Consent type",
    //   flex: 1,
    //   minWidth: 120,
    // },
    { field: "inserttime", headerName: "Insert Time", flex: 1, minWidth: 200 },
    // { field: "status", headerName: "Status", flex: 1, minWidth: 80 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      width: 120,
      renderCell: (params) => (
        <>
          <CustomTooltip title="more Info" placement="top" arrow>
            <IconButton
              className="text-xs relative"
              ref={(el) => {
                if (el) dropdownButtonRefs.current[params.row.id] = el;
              }}
              onClick={() => handleView(params.row)}
            >
              <InfoOutlinedIcon sx={{ fontSize: "1.2rem", color: "green" }} />
            </IconButton>
          </CustomTooltip>

          <InfoPopover
            anchorEl={dropdownButtonRefs.current[params.row.id]}
            open={dropdownOpenId === params.row.id}
            onClose={closeDropdown}
          >
            {clicked && Object.keys(clicked).length > 0 ? (
              <table className="w-80 text-sm text-left border border-gray-200 rounded-md overflow-hidden"
              >
                <tbody>
                  {Object.entries(clicked).map(([key, value], index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors border-b last:border-none"
                    >
                      <td className="px-2 py-2 font-medium text-gray-600 capitalize w-1/3">
                        {key}
                      </td>
                      <td className="px-4 py-2 text-gray-800">
                        {value || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-sm text-gray-400 italic px-2 py-2">
                No data available
              </div>
            )}
          </InfoPopover>
          <CustomTooltip title="Edit Template" placement="top" arrow>
            <IconButton
              onClick={() => {
                handleEditClick(params.row.id);
              }}
            >
              <EditNoteIcon sx={{ fontSize: "1.2rem", color: "gray" }} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Template" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => {
                setIsVisible(true);
                setSelectedTemplateId(params.row.id);
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
  ];

  function handleImport() {
    setTemplateDltImport(true);
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsUploaded(false);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsUploaded(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileUpload = async () => {
    if (!uploadedFile) return;
    if (!entityid) {
      return toast.error("Please insert an entity id.");
    }
    if (contactData?.filepath) {
      return toast.error(
        "File already uploaded. Please select a different one."
      );
    }
    setIsUploading(true);

    try {
      const res = await uploadContactFile(uploadedFile);
      setContactData(res);
      setIsUploading(false);
      setIsUploaded(true);
    } catch (e) {
      return toast.error("File upload failed. Please try again.");
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
    setUploadedFile(null);
    setContactData({
      filePath: "",
      fileHeaders: "",
      totalRecords: "",
      selectedCountryCode: "",
      selectedMobileColumn: "",
      sampleRecords: "",
    });
    fileInputRef.current.value = "";
  };

  async function handleImportTemplate() {
    let isError = false;
    if (!entityid) {
      return toast.error("Please insert an entity id.");
    }
    if (!contactData?.filepath) {
      return toast.error("Please upload a file.");
    }

    // console.log(templateData);

    const requiredTemplateData = {
      templateName: "",
      templateId: "",
      type: "",
      message: "",
      status: "",
      senderId: "",
    };

    for (const key of Object.keys(requiredTemplateData)) {
      const value = templateData[key];
      if (value === "" || value == null || value === "null") {
        isError = true;
        toast.error(`Please fill the value of ${key}.`);
        break;
      }
    }

    if (isError) return;

    const dd = {
      entityId: entityid,
      templatename: templateData.templateName,
      templateid: templateData.templateId,
      template_type: templateData.type,
      msg_format: templateData.message,
      templatestatus: templateData.status,
      senderid: templateData.senderId,
    };

    const inverted = Object.fromEntries(
      Object.entries(dd).map(([key, value]) => [value, key])
    );

    const data = {
      entityId: entityid,
      filepath: contactData?.filepath,
      hashmap: inverted,
      // hashmap: {
      //   entityId: entityid,
      //   TemplateName: templateData.templateName,
      //   TemplateId: templateData.templateId,
      //   TemplateType: templateData.type,
      //   Message: templateData.message,
      //   Status: templateData.status,
      //   SenderId: templateData.senderId,
      // },
    };

    try {
      const res = await importTemplate(data);

      toast.success(res?.message);
      setTemplateDltImport(false);
      setEntityId("");
      setTemplateData({});
      setContactData({});
      setIsUploading(false);
      setIsUploaded(false);
      setUploadedFile(null);
      fileInputRef.current.value = "";
      fetchTemplates()
    } catch (e) {
      return toast.error("Error importing template.");
    }
  }

  function handleDownload() {
    if (!rows.length) return toast.error("No data to download");
    const col = columns.map((col) => col.field);

    const row = rows.map((row) => col.map((field) => row[field] ?? ""));
    const name = "DLT Template List";
    exportToExcel(col, row, name);
    toast.success("File Downloaded Successfully");
  }

  return (
    <div className="w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-xl font-semibold text-gray-700">
            Manage Templates
          </h1>
          <div className="flex flex-wrap gap-2 items-end mb-4 mt-5 w-full">
            <div className="sm:w-56 w-full">
              <InputField
                id="templateid"
                name="templateid"
                type="number"
                label="Template ID"
                placeholder="Enter Template ID"
                value={templateIdFilter}
                onChange={(e) => setTemplateIdFilter(e.target.value)}
              />
            </div>
            <div className="sm:w-56 w-full">
              <InputField
                id="templatename"
                name="templateidname"
                label="Template Name"
                placeholder="Enter Template Name"
                value={templateNameFilter}
                onChange={(e) => setTemplateNameFilter(e.target.value)}
              />
            </div>

            {/* <div className="sm:w-56 w-full">
              <AnimatedDropdown
                label="Status"
                options={statusOptions}
                id="templatestatus"
                name="templatestatus"
                value={statusOption}
                onChange={(newValue) => setStatusOption(newValue)}
                placeholder="Select Status"
              />
            </div> */}

            {/* Search Button */}
            <div className="w-max-content">
              <UniversalButton
                id="dlttemplatesearch"
                name="dlttemplatesearch"
                label={isFetching ? "Searching..." : "Search"}
                icon={<IoSearch />}
                disabled={isFetching}
                onClick={fetchTemplates}
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
                label="Delete"
                id="dlttemplatedelete"
                name="dlttemplatedelete"
                onClick={() => {
                  if (selectedRows.length === 0) return;

                  setIsMultipleDelete(true);
                  setIsVisible(true);
                  setSelectedTemplateId(selectedRows);
                }}
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
                id="dlttemplatedownload"
                name="dlttemplatedownload"
                label="Download"
                onClick={handleDownload}
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
                label="Import"
                id="dlttemplateimport"
                name="dlttemplateimport"
                onClick={handleImport}
              />
            </div>
          </div>

          <DataTable
            id="dlttemplateTable"
            name="dlttemplateTable"
            col={columns}
            rows={rows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            checkboxSelection={true}
          />
        </div>
      )}

      <Dialog
        header="Import DLT Content Template"
        visible={templatedltimport}
        onHide={() => {
          setTemplateDltImport(false);
          setEntityId("");
          setTemplateData({});
          setContactData({});
          setIsUploading(false);
          setIsUploaded(false);
          setUploadedFile(null);
        }}
        className="lg:w-[45rem] md:w-[40rem] w-[20rem]"
        draggable={false}
      >
        <InputField
          label="Entity ID"
          id="importentityid"
          name="importentityid"
          placeholder="Enter Entity ID"
          type="number"
          value={entityid}
          onChange={(e) => setEntityId(e.target.value)}
        />
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
                ref={fileInputRef}
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

        {contactData?.headers?.length > 0 && (
          <>
            <div
              id="headerData"
              className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6"
            >
              <div>
                <AnimatedDropdown
                  id="templateName"
                  name="templateName"
                  label="Template Name"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.templateName}
                  onChange={(e) => {
                    setTemplateData({
                      ...templateData,
                      templateName: String(e),
                    });
                  }}
                />
              </div>
              <div>
                <AnimatedDropdown
                  id="templateId"
                  name="templateId"
                  label="Template ID"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.templateId}
                  onChange={(e) => {
                    setTemplateData({
                      ...templateData,
                      templateId: String(e),
                    });
                  }}
                />
              </div>
              <div>
                <AnimatedDropdown
                  id="templatetype"
                  name="templatetype"
                  label="Template type"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.type}
                  onChange={(e) => {
                    setTemplateData({
                      ...templateData,
                      type: String(e),
                    });
                  }}
                />
              </div>
              <div>
                <AnimatedDropdown
                  id="message"
                  name="message"
                  label="Message"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.message}
                  onChange={(e) => {
                    setTemplateData({
                      ...templateData,
                      message: String(e),
                    });
                  }}
                />
              </div>
              <div>
                <AnimatedDropdown
                  id="status"
                  name="status"
                  label="Status"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.status}
                  onChange={(e) => {
                    setTemplateData({
                      ...templateData,
                      status: String(e),
                    });
                  }}
                />
              </div>
              <div>
                <AnimatedDropdown
                  id="senderId"
                  name="senderId"
                  label="sender ID"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.senderId}
                  onChange={(e) => {
                    if (!e) return;
                    setTemplateData({
                      ...templateData,
                      senderId: String(e),
                    });
                  }}
                />
              </div>
            </div>

            <div
              className="w-full max-w-full overflow-auto mt-3"
              style={{ maxHeight: "400px", maxWidth: "auto", width: "auto" }}
            >
              <table className="w-full border-collapse min-w-max">
                <thead className="bg-[#128C7E]">
                  <tr className="">
                    {contactData?.headers?.map((col, index) => (
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
                  {contactData?.sampleRecords?.map((row, index) => (
                    <tr key={index} className="">
                      {contactData?.headers?.map((col, idx) => {
                        return (
                          <td
                            key={idx}
                            className="px-2 py-1 text-sm font-normal tracking-wide text-gray-800 border border-gray-400 whitespace-nowrap"
                          >
                            {row[col]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <UniversalButton
          id="createTemplate"
          name="createTemplate"
          label="Submit"
          onClick={handleImportTemplate}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2rem",
          }}
        />
      </Dialog>

      <Dialog
        header="Confirm Delete"
        visible={isVisible}
        onHide={() => setIsVisible(false)}
        className="lg:w-[30rem] md:w-[40rem] w-[17rem]"
        draggable={false}
      >
        <div className="flex items-center justify-center">
          <CancelOutlinedIcon
            sx={{ fontSize: 64, color: "ff3f3f" }}
            size={20}
          />
        </div>
        <div>
          <div className="p-4 text-center">
            <p className="text-[1.1rem] font-semibold text-gray-600">
              Are you sure ?
            </p>
            <p>
              {`Do you really want to delete ${isMultipleDelete ? "these" : "this"
                } record? This process cannot be undo.`}
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <UniversalButton
                label="Cancel"
                style={{
                  backgroundColor: "#090909",
                }}
                onClick={() => setIsVisible(false)}
              />
              <UniversalButton
                label="Delete"
                style={
                  {
                    // backgroundColor: "red",
                  }
                }
                onClick={() => {
                  isMultipleDelete
                    ? handleMultipleDelete(selectedTemplateId)
                    : handleDelete(selectedTemplateId);
                  setIsVisible(false);
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Edit Template"
        visible={isEditVisible}
        onHide={() => setIsEditVisible(false)}
        className="lg:w-[30rem] md:w-[40rem] w-[17rem]"
        draggable={false}
      >
        {selectedTemplate && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
              <InputField
                id="entityId"
                name="entityId"
                label="Entity ID"
                value={updateTemplateData.entityId}
                onChange={(e) => {
                  setUpdateTemplateData({
                    ...updateTemplateData,
                    entityId: e.target.value,
                  });
                }}
              />
              <InputField
                id="templateId"
                name="templateId"
                label="Template ID"
                value={updateTemplateData.templateId}
                onChange={() => {
                  setUpdateTemplateData({
                    ...updateTemplateData,
                    templateId: selectedTemplate.templateId,
                  });
                }}
              />
            </div>

            <UniversalTextArea
              id="message"
              name="message"
              label="Message"
              value={updateTemplateData.msgFormat}
              onChange={(e) => {
                setUpdateTemplateData({
                  ...updateTemplateData,
                  msgFormat: e.target.value,
                });
              }}
              className="min-h-35 max-h-50"
            />

            <InputField
              id="senderId"
              name="senderId"
              label="Sender ID"
              value={updateTemplateData.senderId}
              onChange={(e) => {
                setUpdateTemplateData({
                  ...updateTemplateData,
                  senderId: e.target.value,
                });
              }}
              className="resize-none "
            />

            <UniversalButton
              id="updateTemplate"
              name="updateTemplate"
              label="Update"
              onClick={handleEdit}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "1rem",
              }}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default SmsDLTtemplate;
