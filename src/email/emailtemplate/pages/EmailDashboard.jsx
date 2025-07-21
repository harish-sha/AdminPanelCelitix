import React, { useRef, useState } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Lottie from "lottie-react";
import nothinganimation from "@/assets/animation/nothinganimation.json";
import UniversalButton from '@/components/common/UniversalButton';
import { useNavigate } from "react-router-dom";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";
import CustomTooltip from "@/components/common/CustomTooltip";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
const EmailDashboard = () => {
  const [search, setSearch] = useState("");

   const [currentPage, setCurrentPage] = useState(1);

  const [publishingId, setPublishingId] = useState(null);
  const [isPublishingNow, setIsPublishingNow] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownButtonRefs = useRef({});
  const rowsPerPage = 4;
  const navigate = useNavigate();
  const [flowList, setFlowList] = useState([
    {
      flowId: "1",
      flowName: "inputswitch",
      status: "DRAFT",
      category: "Authentication",
      channel: "Proactive",
      insertTime: "2025-07-11",
      mobileno: "9999999999"
    },
    {
      flowId: "2",
      flowName: "camping flow wp",
      status: "PUBLISHED",
      category: "Transactional",
      channel: "Proactive",
      insertTime: "2025-07-09",
      mobileno: "9999999999"
    },
    {
      flowId: "3",
      flowName: "ifelsetestingnew12",
      status: "PUBLISHED",
      category: "Authentication",
      channel: "Proactive",
      insertTime: "2025-07-08",
      mobileno: "9999999999"
    },
    {
      flowId: "4",
      flowName: "ifelsetesting2",
      status: "PUBLISHED",
      category: "Transactional",
      channel: "Proactive",
      insertTime: "2025-07-08",
      mobileno: "9999999999"
    },
    {
      flowId: "5",
      flowName: "ifelsetesting2",
      status: "PUBLISHED",
      category: "Transactional",
      channel: "Proactive",
      insertTime: "2025-07-08",
      mobileno: "9999999999"
    },
    {
      flowId: "6",
      flowName: "ifelsetesting2",
      status: "PUBLISHED",
      category: "Transactional",
      channel: "Proactive",
      insertTime: "2025-07-08",
      mobileno: "9999999999"
    },
    {
      flowId: "4",
      flowName: "ifelsetesting2",
      status: "PUBLISHED",
      category: "Transactional",
      channel: "Proactive",
      insertTime: "2025-07-08",
      mobileno: "9999999999"
    },
    {
      flowId: "5",
      flowName: "ifelsetesting2",
      status: "PUBLISHED",
      category: "Transactional",
      channel: "Proactive",
      insertTime: "2025-07-08",
      mobileno: "9999999999"
    },
    {
      flowId: "6",
      flowName: "ifelsetesting2",
      status: "PUBLISHED",
      category: "Transactional",
      channel: "Proactive",
      insertTime: "2025-07-08",
      mobileno: "9999999999"
    }
  ]);


  const handleNavigate = () => {
    navigate('/emailmanagement/emailltemplates');
  };

  const filteredFlows = (Array.isArray(flowList) ? flowList : []).filter(
    (flow) =>
      (flow?.flowName || "").toLowerCase().includes(search.toLowerCase())
  );


  const totalPages = Math.ceil(filteredFlows.length / rowsPerPage);
  const paginatedFlows = filteredFlows
    .reverse()
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  return (
    <div>
      <div className=" bg-white border border-gray-300 rounded-xl shadow-sm">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-2 sm:mb-0">
              Created Email
              <MdOutlineEmail className="text-[#25D366] text-2xl" />
            </h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by Email Template Name"
                

                className="border border-gray-300 rounded-md px-3 py-1.5 w-full sm:w-64 text-sm"
              />
            </div>
          </div>

          {/* Flows */}
          <div className="space-y-4">
            {paginatedFlows.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-2">
                <div className="w-60 h-60">
                  <Lottie animationData={nothinganimation} loop={true} />
                </div>
                <div className="text-xl font-semibold text-gray-500 text-center">
                  No Emails found.
                  <br />
                  <span className="text-base font-normal text-gray-400">
                    Start your professional journey by creating a new email template!
                  </span>
                </div>
                <div className="mt-4">
                  <UniversalButton
                    label="Create Temp"
                    onClick={handleNavigate}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                    icon={<SearchOutlinedIcon className="text-white" />}
                    iconPosition="left"
                    style={{
                      width: 'fit-content',
                      padding: '8px 16px',
                      fontSize: '14px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}

                  />
                </div>
              </div>
            ) : (paginatedFlows.map((flow, index) => (
                <div
                  key={index}
                  className="bg-[#D1F8EF] border border-blue-200 rounded-xl px-4 py-5 grid md:grid-cols-4  grid-cols-1 items-center justify-between flex-wrap sm:flex-nowrap space-y-2"
                >
                  <div className="flex items-center gap-3 ">
                    <div className="bg-white flex items-center justify-center p-0.5 rounded-full shadow">
                      {flow.status === "DRAFT" && (
                        <RadioButtonCheckedOutlinedIcon
                          className="text-orange-500"
                          sx={{
                            fontSize: "22px",
                          }}
                        />
                      )}
                      {flow.status === "PUBLISHED" && (
                        <RadioButtonCheckedOutlinedIcon
                          className="text-green-500"
                          sx={{
                            fontSize: "22px",
                          }}
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-sm">
                        {flow.flowName}
                      </div>
                      {/* <span
                        className={`text-xs shadow-md tracking-wide px-2 py-1 rounded-md w-max  ${flow.status === "DRAFT"
                          ? "bg-orange-500 text-white"
                          : "bg-blue-500 text-white"
                          }`}
                      >
                        {flow.status}
                      </span> */}
                    </div>
                  </div>

                  <div className="text-sm text-start md:text-center ">
                    <div className="font-semibold text-sm mb-2">
                      Email Category
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-[#A1E3F9] text-blue-900 rounded-md">
                      {flow.category || "STATIC"}
                    </span>
                  </div>

                 

                  <div className="text-sm text-start md:text-center">
                    <div className="font-semibold">Created At</div>
                    <div className="text-gray-700">
                      {moment(flow.insertTime).format("DD-MM-YYYY")}
                    </div>
                  </div>

                

                  <div className="flex items-center justify-start md:justify-end gap-3 mt-1 md:mt-3 sm:mt-0">
                    <button
                      className="bg-[#578FCA] cursor-pointer hover:bg-[#3674B5] text-white px-4 py-2 border-2 border-white rounded-3xl text-sm flex items-center gap-2"
                      onClick={() => {
                        handlepublishBtn(flow);
                      }}
                    >
                      <SendIcon sx={{ fontSize: "1rem" }} />
                      Send Test Email
                    </button>

                    <CustomTooltip
                      title="Settings"
                      arrow
                      tooltipPlacement="top"
                    >
                      <IconButton
                        ref={(el) => {
                          if (el) dropdownButtonRefs.current[flow.flowId] = el;
                        }}
                        onClick={(e) => handleMenuOpen(e, flow)}
                        size="small"
                      >
                        <SettingsOutlinedIcon
                          className="text-gray-600"
                          fontSize="small"
                        />
                      </IconButton>
                    </CustomTooltip>
                    {dropdownOpenId === flow.flowId && (
                      <DropdownMenuPortal
                        targetRef={{
                          current: dropdownButtonRefs.current[flow.flowId],
                        }}
                        onClose={handleMenuClose}
                      >
                        {flow.status === "DRAFT" && (
                          <button
                            onClick={() => handleEdit(flow)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 flex items-center gap-2"
                          >
                            <EditIcon
                              fontSize="small"
                              className="text-gray-600"
                            />
                            Edit
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(flow)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 flex items-center gap-2"
                        >
                          <DeleteIcon
                            fontSize="small"
                            className="text-red-600"
                          />
                          Delete
                        </button>

                        {/* Export Button */}
                        <button
                          onClick={() => handleExport(flow)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 flex items-center gap-2"
                        >
                          <FileDownloadIcon
                            fontSize="small"
                            className="text-green-600"
                          />
                          Export
                        </button>
                      </DropdownMenuPortal>
                    )}
                  </div>
                </div>
              ))
              )}
          </div>
          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`text-sm px-3 py-1 border rounded-sm cursor-pointer   ${currentPage === i + 1 ? "bg-[#3674B5] text-white" : ""
                  }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailDashboard
