import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import {
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Popper,
} from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

import { fetchDetailsbySrNo } from "@/apis/obd/obd.js";
import InputField from "@/components/layout/InputField.jsx";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown.jsx";
import { IoSearch } from "react-icons/io5";
import UniversalButton from "@/whatsapp/components/UniversalButton.jsx";
import toast from "react-hot-toast";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton.jsx";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay.jsx";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import CustomTooltip from "@/components/common/CustomTooltip";
import { ImInfo } from "react-icons/im";
import InfoPopover from "@/components/common/InfoPopover.jsx";
import { DataTable } from "@/components/layout/DataTable";

const CampaignDetailsReports = () => {
  const location = useLocation();
  const { campaignSrNo, name } = location.state || {};
  const [searchData, setSearchData] = useState({
    status: null,
    mobileNo: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const [rows, setRows] = useState([]);
  const dropdownButtonRefs = useRef({});
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [clicked, setClicked] = useState({});

  const infoFieldsToShow = ["sentTime", "deliveryTime", "queTime"];

  function handleInfo(row) {
    const id = row.id;
    setDropdownOpenId((prevId) => (prevId === id ? null : id));
    setClicked(row.additionalInfo || []);
  }

  function closeDropdown() {
    setDropdownOpenId(null);
  }

  const handleSearch = async () => {
    if (!campaignSrNo) return;
    try {
      setIsFetching(true);
      const data = await fetchDetailsbySrNo(campaignSrNo);

      const filteredData = data?.data.filter((item) => {
        const matchesMobile =
          !searchData?.mobileNo?.trim() ||
          item.mobileNo?.includes(searchData?.mobileNo?.trim());

        const matchesDelivery =
          !searchData?.status?.trim() ||
          item?.status?.toLowerCase() === searchData?.status?.toLowerCase();

        return matchesMobile && matchesDelivery;
      });

      const formattedData = filteredData.map((item, index) => ({
        id: index + 1,
        sn: index + 1,
        ...item,
        voiceType:
          item.voiceType === 1
            ? "Transactional"
            : item.voiceType === 2
            ? "Promotional"
            : "" || "N/A",

        processFlag:
          item.processFlag === 1
            ? "Pending"
            : item.processFlag === 2
            ? "Processing"
            : item.processFlag === 3
            ? "Completed"
            : item.processFlag === 4
            ? "Cancelled"
            : "" || "N/A",

        additionalInfo: {
          sentTime: item.sentTime,
          deliveryTime: item.deliveryTime,
          queTime: item.queTime,
        },
      }));

      console.log("formattedData", formattedData);

      setRows(formattedData);

      //   setCampaignDetails(filteredData);

      //   setPaginationModel({
      //     page: 0,
      //     pageSize: 10,
      //   });
      //   setCurrentPage(1);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [campaignSrNo]);

  const cols = [
    { field: "sn", headerName: "S.No", flex: 0, width: 60 },

    { field: "mobileNo", headerName: "Mobile No", flex: 1, minWidth: 120 },
    {
      field: "campaignType",
      headerName: "Campaign Type",
      flex: 1,
      minWidth: 120,
    },
    { field: "voiceType", headerName: "Voice Type", flex: 1, minWidth: 120 },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      flex: 1,
      minWidth: 130,
    },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    { field: "unit", headerName: "Unit", flex: 0, width: 100 },
    { field: "retryCount", headerName: "Retry Count", flex: 1, minWidth: 60 },
    {
      field: "chargedUnit",
      headerName: "Charged Unit",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "callDuration",
      headerName: "Call Duration",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0,
      minWidth: 100,
      renderCell: (params) => (
        <CustomTooltip title="Info" placement="top" arrow>
          <span>
            <IconButton
              type="button"
              ref={(el) => {
                if (el) dropdownButtonRefs.current[params.row.id] = el;
              }}
              onClick={() => handleInfo(params.row)}
              className="no-xs relative"
            >
              <ImInfo size={18} className="text-green-500" />
            </IconButton>

            <InfoPopover
              anchorEl={dropdownButtonRefs.current[params.row.id]}
              open={dropdownOpenId === params.row.id}
              onClose={closeDropdown}
            >
              {clicked && Object.keys(clicked).length > 0 ? (
                <table className="w-80 text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                  <tbody>
                    {Object.entries(clicked)
                      .filter(([key]) => infoFieldsToShow.includes(key))
                      .map(([key, value], index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors border-b last:border-none"
                        >
                          <td className="px-4 py-2 font-medium text-gray-600 capitalize w-1/3 text-nowrap">
                            {infoFieldsToShow[key] || key}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            {key === "isEnabledForInsights"
                              ? value === true || value === "true"
                                ? "True"
                                : "False"
                              : value || "N/A"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-sm text-gray-400 italic px-2 py-2">
                  No data
                </div>
              )}
            </InfoPopover>
          </span>
        </CustomTooltip>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div>
        <h1 className="mb-4 font-semibold text-center text-green-600 lg:text-lg text-md">
          <CampaignOutlinedIcon fontSize="medium" sx={{ fontSize: "1.8rem" }} />
          &nbsp; OBD Campaign Detail Report - {name}
        </h1>
      </div>
      <div className="flex flex-wrap items-end justify-center w-full gap-4 mb-5 align-middle lg:justify-start">
        <div className="w-full sm:w-64">
          <InputField
            id="mobileNoCampaignDetails"
            name="mobileNoCampaignDetails"
            label="Mobile No"
            value={searchData.mobileNo}
            onChange={(e) =>
              setSearchData({ ...searchData, mobileNo: e.target.value })
            }
            placeholder="Mobile No"
            tooltipContent="Enter the mobile number."
            tooltipPlacement="right"
            type="number"
          />
        </div>
        <div className="w-full sm:w-64">
          <AnimatedDropdown
            id="campaignDeliveryStatusdropdown"
            name="campaignDeliveryStatusdropdown"
            label="Delivery Status"
            tooltipContent="Select the delivery status."
            tooltipPlacement="right"
            options={[
              { value: "sent", label: "Sent" },
              { value: "delivered", label: "Delivered" },
              { value: "clicked", label: "Clicked" },
              { value: "replied", label: "Replied" },
              { value: "failed", label: "Failed" },
            ]}
            value={searchData.status}
            onChange={(e) => setSearchData({ ...searchData, status: e })}
            placeholder="Category"
          />
        </div>
        <div className="w-max-content">
          <UniversalButton
            id="manageCampaignSearchBtn"
            name="manageCampaignSearchBtn"
            label="Search"
            icon={<IoSearch />}
            onClick={handleSearch}
            variant="primary"
          />
        </div>
      </div>

      {isFetching ? (
        <UniversalSkeleton height="35rem" width="100%" />
      ) : (
        <DataTable
          id="obdCampaignDetailReportTable"
          name="obdCampaignDetailReportTable"
          rows={rows}
          col={cols}
        />
      )}
    </div>
  );
};

export default CampaignDetailsReports;
