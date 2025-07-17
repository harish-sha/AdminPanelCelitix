import React, { useRef } from "react";
import { deleteWorkflow, getAllWorkflow } from "@/apis/workflow";
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalButton from "@/components/common/UniversalButton";
import { DataTable } from "@/components/layout/DataTable";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { IconButton } from "@mui/material";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import nothinganimation from "@/assets/animation/nothinganimation.json";
import Lottie from "lottie-react";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";
import SendIcon from "@mui/icons-material/Send";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import moment from "moment";
import { FaWhatsapp } from "react-icons/fa";

export const WorkflowDetails = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [publishingId, setPublishingId] = useState(null);
  const [flowList, setFlowList] = useState([]);
  console.log("flowList", flowList);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  console.log("search", search);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownButtonRefs = useRef({});

  const [visibleDialog, setVisibledialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({
    srno: "",
    type: "",
  });
  const rowsPerPage = 4;

  const filteredFlows = (Array.isArray(flowList) ? flowList : []).filter(
    (flow) => {
      const searchText = search.toLowerCase();
      const flowName = (flow?.workflow_name || "").toLowerCase();

      return flowName.includes(searchText);
    }
  );

  const totalPages = Math.ceil(filteredFlows.length / rowsPerPage);
  // const paginatedFlows = [];
  const paginatedFlows = filteredFlows
    .reverse()
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  async function handleFetchAllWorkflow() {
    try {
      setIsLoading(true);
      const res = await getAllWorkflow(type);
      setFlowList(res);
    } catch (e) {
      toast.error("Unable to fetch workflow");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleFetchAllWorkflow();
  }, [type]);

  const highlightMatch = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  async function handleDelete(row) {
    console.log("row", row);
    if (!row.sr_no || !row.node_type) return;
    const srno = row.sr_no;
    const type = row.node_type;

    setSelectedRowData({
      srno,
      type,
    });
    setVisibledialog(true);
  }

  // function handleUpdate() { }
  // async function handleConfirmDelete(row) {
  //   const srno = selectedRowData.srno;
  //   const type = selectedRowData.type;

  //   try {
  //     const res = await deleteWorkflow(srno, type);
  //     if (!res?.status) {
  //       return toast.error(res?.message || "Unable to delete workflow");
  //     }
  //     toast.success(res?.message || "Workflow deleted successfully");
  //     setVisibledialog(false);
  //     await handleFetchAllWorkflow();
  //   } catch (e) {
  //     toast.error("Unable to delete workflow");
  //   }
  // }

  return (
    <>
      <div className="flex items-center justify-center ">
        <h1 className="text-2xl font-semibold text-gray-700 mb-3">
          Manage WorkFlows
        </h1>
      </div>
      <div className="bg-white border border-gray-300 rounded-xl shadow-sm overflow-y-auto mb-2 ">
        <div className="flex justify-between items-end w-full flex-col md:flex-row mb-2 p-2">
          <div className="flex items-end gap-2 w-full ml-1">
            <div className="w-64">
              <AnimatedDropdown
                id="type"
                name="type"
                options={[
                  { label: "ALL", value: "" },
                  { label: "OBD", value: "voice" },
                  { label: "WHATSAPP", value: "whatsapp" },
                  { label: "RCS", value: "rcs" },
                  { label: "SMS", value: "sms" },
                ]}
                label={"Select Type"}
                value={type}
                onChange={(e) => {
                  setType(e);
                }}
                placeholder="Select Type"
              />
            </div>

            <UniversalButton
              id="Search"
              name="Search"
              label={isLoading ? "Searching..." : "Search"}
              disabled={isLoading}
              onClick={() => handleFetchAllWorkflow()}
            />
          </div>

          <div className="flex items-end gap-2 justify-end w-full mt-2 md:mt-0 mr-1">
            <input
              type="text"
              placeholder="Search by Flow Name & Id..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-1.5 w-full sm:w-64 text-sm"
            />

            <UniversalButton
              id="Add WorkFlow"
              name="Add WorkFlow"
              label="Add WorkFlow"
              style={{ whiteSpace: "nowrap" }}
              onClick={() => navigate("/workflow/create")}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-xl shadow-sm overflow-y-auto mb-6 ">
        <div className="space-y-4 p-5 mt-2">
          {isLoading ? (
            <div className="w-full">
              <div className="flex flex-col gap-3">
                <UniversalSkeleton height="6rem" width="100%" />
                <UniversalSkeleton height="6rem" width="100%" />
                <UniversalSkeleton height="6rem" width="100%" />
                <UniversalSkeleton height="6rem" width="100%" />
              </div>
            </div>
          ) : paginatedFlows.length === 0 ? (
            <div className="bg-white border border-gray-300 rounded-xl shadow-sm flex flex-col items-center justify-center py-2 h-110">
              <div className="flex flex-col items-center justify-center border-2 border-dashed p-5 rounded-3xl shadow-2xl border-blue-300">
                <div className="w-60 h-60">
                  <Lottie animationData={nothinganimation} loop={true} />
                </div>
                <div className="text-xl font-semibold text-gray-500 text-center">
                  No workflows found.
                  <br />
                  <span className="text-base font-normal text-gray-400">
                    Start your professional journey by creating a new flow!
                  </span>
                </div>
                <div className="mt-4">
                  <UniversalButton
                    label="+ Add WorkFlow"
                    onClick={() => navigate("/workflow/create")}
                  />
                </div>
              </div>
            </div>
          ) : (
            paginatedFlows.map((flow, index) => (
              <div
                key={index}
                className="relative bg-blue-100 border border-blue-200 rounded-xl px-4 py-5 grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
              >
                {/* Top-right icons ONLY on small screens */}
                <div className="absolute top-2 right-2 flex gap-2 md:hidden">
                  <button
                    className="px-2 py-2 text-sm text-slate-600 flex items-center gap-1 cursor-pointer hover:bg-slate-200 rounded"
                    onClick={() => {
                      navigate("/workflow/edit", {
                        state: {
                          data: flow?.node_json || "[]",
                          workflow_meta_data: flow,
                        },
                      });
                    }}
                  >
                    <EditNoteIcon sx={{ fontSize: "1.5rem" }} />
                  </button>

                  <button
                    className="px-2 py-2 text-sm text-slate-600 flex items-center gap-1 cursor-pointer hover:bg-slate-200 rounded"
                    onClick={() => {
                      handleDelete(flow);
                    }}
                  >
                    <MdOutlineDeleteForever fontSize="20px" color="red" />
                  </button>
                </div>

                {/* Workflow details */}
                <div className="flex flex-col items-start md:items-center">
                  <div className="font-semibold text-sm mb-1">
                    WorkFlow Name
                  </div>
                  <div className="font-semibold text-sm px-2 py-1 bg-blue-300 text-blue-900 rounded-md break-words text-left md:text-center">
                    {highlightMatch(String(flow.workflow_name || ""), search)}
                  </div>
                </div>

                <div className="text-sm flex flex-col items-start md:items-center">
                  <div className="font-semibold mb-1">Node Type</div>
                  <span className="text-sm font-semibold px-2 py-1 bg-blue-300 text-blue-900 rounded-md">
                    {flow.node_type}
                  </span>
                </div>

                <div className="text-sm flex flex-col items-start md:items-center">
                  <div className="font-semibold mb-1">Is Otp Workflow</div>
                  <div className="text-gray-600">
                    {flow.isOtpWorkflow === 1 ? "Yes" : "No"}
                  </div>
                </div>

                <div className="text-sm flex flex-col items-start md:items-center">
                  <div className="font-semibold mb-1">Inserted Time</div>
                  <div className="text-gray-700">
                    {moment(flow.insertTime).format("DD-MM-YYYY")}
                  </div>
                </div>

                {/* Buttons shown only on medium and above */}
                <div className="hidden md:flex justify-center gap-3 mt-2 md:mt-0">
                  <button
                    className="px-2 py-2 text-sm text-slate-600 flex items-center gap-1 cursor-pointer hover:bg-slate-200 rounded"
                    onClick={() => {
                      navigate("/workflow/edit", {
                        state: {
                          data: flow?.node_json || "[]",
                          workflow_meta_data: flow,
                        },
                      });
                    }}
                  >
                    <EditNoteIcon sx={{ fontSize: "1.5rem" }} />
                  </button>

                  <button
                    className="px-2 py-2 text-sm text-slate-600 flex items-center gap-1 cursor-pointer hover:bg-slate-200 rounded"
                    onClick={() => {
                      handleDelete(flow);
                    }}
                  >
                    <MdOutlineDeleteForever fontSize="20px" color="red" />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 gap-2 w-full sm:justify-end mb-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`text-sm px-3 py-1 border rounded-sm cursor-pointer ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dialog
        header="Delete Workflow"
        visible={visibleDialog}
        style={{ width: "50vw" }}
        onHide={() => {
          setVisibledialog(false);
          setSelectedRowData({ srno: "", type: "" });
        }}
        draggable={false}
      >
        <div>
          <p>Are you sure you want to delete this workflow?</p>
          <div className="flex justify-end mt-2">
            <UniversalButton
              id="cancel"
              name="cancel"
              label="Cancel"
              onClick={() => {
                setVisibledialog(false);
                setSelectedRowData({ srno: "", type: "" });
              }}
            />
            <UniversalButton
              id="Delete"
              name="Delete"
              label="Delete"
              style={{ marginLeft: "10px", backgroundColor: "red" }}
              onClick={(w) => handleConfirmDelete()}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
