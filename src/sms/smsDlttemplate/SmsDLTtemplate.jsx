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

const SmsDLTtemplate = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [statusOption, setStatusOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [templatedltimport, setTemplateDltImport] = useState(false);

  const [entityid, setEntityId] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

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

      const mappedData = rawData.map((item, index) => ({
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
            ? "Promotional"
            : item.type === 2
            ? "Transactional"
            : "Unknown",
        consenttype: "-",
        inserttime: item.insertDate
          ? new Date(item.insertDate).toLocaleString()
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
      console.error("Error fetching templates:", err);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    fetchTemplates();
  }, []);

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

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
        senderid: res[0]?.senderid,
      });
    } catch (e) {
      console.log(e);
      return toast.error("Something went wrong");
    }
  };
  const handleEdit = async () => {
    console.log("updateTemplateData", updateTemplateData);

    try {
      const res = await updateTemplateBySrno(updateTemplateData);
      console.log(res);
      if (!res?.message.includes("successfully")) {
        return toast.error(res?.message);
      }
      toast.success("Template updated successfully");
      setSelectedTemplate("");
      setSelectedTemplateId("");
      setIsEditVisible(false);
      await fetchTemplates();
    } catch (e) {
      console.log(e);
      return toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    await deleteSingleSmsTemplate(id);
    await fetchTemplates();
    setSelectedTemplateId("");
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

  const columns = [
    { field: "sn", headerName: "S.No", flex: 1, minWidth: 55 },
    { field: "userid", headerName: "UserId", flex: 1, minWidth: 80 },
    {
      field: "templatename",
      headerName: "Template Name",
      flex: 1,
      minWidth: 120,
    },
    { field: "templateid", headerName: "Template ID", flex: 1, minWidth: 110 },
    { field: "entityid", headerName: "Entity ID", flex: 1, minWidth: 80 },
    { field: "message", headerName: "Message", flex: 1, minWidth: 250 },
    { field: "senderid", headerName: "Sender ID", flex: 1, minWidth: 95 },
    { field: "smstype", headerName: "SMS type", flex: 1, minWidth: 120 },
    {
      field: "consenttype",
      headerName: "Consent type",
      flex: 1,
      minWidth: 120,
    },
    { field: "inserttime", headerName: "Insert time", flex: 1, minWidth: 110 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 80 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
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
                console.log(params.row);
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
      console.log(res);
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
    Object.keys(templateData).forEach((key) => {
      if (templateData[key] === "" || templateData[key] === null) {
        isError = true;
        return toast.error(`Please fill all the value of ${key}."`);
      }
    });

    if (isError) {
      return;
    }

    const data = {
      entityId: entityid,
      filepath: contactData?.filepath,
      hashmap: {
        entityId: entityid,
        TemplateName: templateData.templatename,
        TemplateId: templateData.templateId,
        TemplateType: templateData.type,
        Message: templateData.message,
        Status: templateData.status,
        SenderId: templateData.senderId,
      },
    };

    try {
      const res = await importTemplate(data);
      console.log(res);
    } catch (e) {
      console.log(e);
      return toast.error("Error importing template.");
    }
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
              />
            </div>
            <div className="sm:w-56 w-full">
              <InputField
                id="templatename"
                name="templateidname"
                label="Template Name"
                placeholder="Enter Template Name"
              />
            </div>

            <div className="sm:w-56 w-full">
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
                onClick={() => {
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

          {isFetching ? (
            <div className="w-full">
              <UniversalSkeleton height="35rem" width="100%" />
            </div>
          ) : (
            <div className="w-full">
              {/* <DlttemplateTable id="dlttemplatetable" name="dlttemplatetable" /> */}
              <DataTable
                id="whatsapp-rate-table"
                name="whatsappRateTable"
                col={columns}
                rows={rows}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                checkboxSelection={true}
              />
            </div>
          )}
        </div>
      )}

      <Dialog
        header="Import DLT Content Template"
        visible={templatedltimport}
        onHide={() => setTemplateDltImport(false)}
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
                    value: String(index),
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
                  label="Template Id"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: String(index),
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
                    value: String(index),
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
                    value: String(index),
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
                    value: String(index),
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
                  label="senderId"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: String(index),
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
                        console.log(col);
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
              {`Do you really want to delete ${
                isMultipleDelete ? "these" : "this"
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
                label="Entity Id"
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
                label="Template Id"
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
              className="resize-none "
            />

            <InputField
              id="senderId"
              name="senderId"
              label="Sender Id"
              value={updateTemplateData.senderid}
              onChange={(e) => {
                setUpdateTemplateData({
                  ...updateTemplateData,
                  senderid: e.target.value,
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
