import React, { useEffect, useState } from "react";
import InputField from "../../whatsapp/components/InputField";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import { IoSearch } from "react-icons/io5";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import DlttemplateTable from "./components/DlttemplateTable";
import { DataTable } from "@/components/layout/DataTable";
import CustomTooltip from "@/components/common/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";

import {
  getAllTemplates,
  getSingleTemplate,
  updateTemplateBySrno,
  deleteSingleSmsTemplate,
  deleteMultipleSmsTemplate,
} from "@/apis/sms/sms";

const SmsDLTtemplate = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [statusOption, setStatusOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
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
    fetchTemplates();
  }, []);

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const handleEdit = (row) => {
    console.log(row);
  };

  const handleDelete = async (row) => {
    if (window.confirm("Delete this template?")) {
      await deleteSingleSmsTemplate(row.id);
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    }
  };

  const handleMultipleDelete = async () => {
    if (selectedRows.length === 0) return;
    if (window.confirm(`Delete ${selectedRows.length} selected templates?`)) {
      await deleteMultipleSmsTemplates(selectedRows);
      setRows((prev) => prev.filter((row) => !selectedRows.includes(row.id)));
      setSelectedRows([]);
    }
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "userid", headerName: "Userid", flex: 1, minWidth: 80 },
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
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon sx={{ fontSize: "1.2rem", color: "gray" }} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Template" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleDelete(params.row)}
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
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmsDLTtemplate;
