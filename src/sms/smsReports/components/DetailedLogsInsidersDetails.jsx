import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import { Paper, Typography, Box, Button } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

import { getPreviousCampaignDetails } from "../../../apis/sms/sms";
import InputField from "@/whatsapp/components/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { IoSearch } from "react-icons/io5";
import UniversalButton from "@/components/common/UniversalButton";
import toast from "react-hot-toast";
import moment from "moment";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import { ImInfo } from "react-icons/im";
import InfoPopover from "@/components/common/InfoPopover.jsx";

const PaginationList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});

const CustomPagination = ({
  totalPages,
  paginationModel,
  setPaginationModel,
  setCurrentPage,
}) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) => {
      setCurrentPage(newPage);
      setPaginationModel({ ...paginationModel, page: newPage - 1 });
    },
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
      <PaginationList>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <Button
                key={index}
                variant={selected ? "contained" : "outlined"}
                size="small"
                sx={{ minWidth: "27px" }}
                {...item}
              >
                {page}
              </Button>
            );
          } else {
            children = (
              <Button
                key={index}
                variant="outlined"
                size="small"
                {...item}
                sx={{}}
              >
                {type === "previous" ? "Previous" : "Next"}
              </Button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </PaginationList>
    </Box>
  );
};

const CampaignDetailsReport = () => {
  const location = useLocation();
  const { campaignDetails, campaignName, total, data } = location.state || {};

  const dropdownButtonRefs = useRef({});

  const [selectedRows, setSelectedRows] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(total || 1);
  const [campaignDetailsNew, setCampaignDetailsNew] = useState(campaignDetails);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [clicked, setClicked] = useState({});
  const additionalInfoLabels = {
    // Example mapping: 'queuedate': 'Queue Date'
  }


  const fetchData = async () => {
    const body = {
      summaryType: data.summaryType,
      mobileNo: mobileNumber,
      fromDate: data.fromDate,
      toDate: data.toDate,
      page: currentPage,
      source: "",
      delStatus: deliveryStatus,
    };
    const res = await getPreviousCampaignDetails(body);
    setTotalPage(res.total)
    setCampaignDetailsNew(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, campaignName]);

  const handleSearch = async () => {
    setIsFetching(true);
    await fetchData();
    setIsFetching(false);
  };

  const handleInfo = (row) => {
    setClicked(row);
    setDropdownOpenId(row.id);
  };

  const closeDropdown = () => {
    setDropdownOpenId(null);
  };

  const infoFieldsToShow = [
    "que_time",
    "Delivery Time",
    "unique_id",
    "circle_srno",
    "source",
    "PE_ID",
    "template_id",
    "source",
    "isunicode",
    "Character Length",
    "desc",
    "Service Type",
  ];

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "mobile_no", headerName: "Mobile Number", flex: 1, minWidth: 150 },
    { field: "sent_time", headerName: "Sent Time", flex: 1, minWidth: 150 },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div
          className="text-sm  text-wrap"
        >
          {params.value}
        </div>
      ),
    },
    { field: "status", headerName: "Status", flex: 1, minWidth: 150 },
    {
      field: "actual_status",
      headerName: "Delivery Status",
      flex: 1,
      minWidth: 150,
    },
    { field: "smsunit", headerName: "SMS Unit", flex: 1, minWidth: 150 },
    { field: "senderid", headerName: "Header", flex: 1, minWidth: 150 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 120,
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
                <table className="w-90 text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                  <tbody>
                    {Object.entries(clicked)
                      .filter(([key]) => infoFieldsToShow.includes(key))
                      .map(([key, value], index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors border-b last:border-none"
                        >
                          <td className="px-4 py-2 font-medium text-gray-600 capitalize w-1/3 text-nowrap">
                            {additionalInfoLabels[key] || key}
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

  const rows = campaignDetailsNew?.map((item, index) => ({
    id: index + 1,
    sn: index + 1,
    // unique_id: item.unique_id || "N/A",
    // que_time: item.que_time || "-",
    // receipt_no_of_duplicate_message:
    //   item.receipt_no_of_duplicate_message || "0",
    // account_usage_type_id: item.account_usage_type_id || "-",
    // smsunit: item.smsunit || "-",
    // PE_ID: item.PE_ID,
    // // account_usage_type_id: item.account_usage_type_id,
    // actual_sms_length: item.actual_sms_length,
    // actual_status: item.actual_status,
    // circle_srno: item.circle_srno,
    // del_time: item.del_time,
    // isunicode: item.isunicode,
    // message: item.message,
    // message_type: item.message_type,
    // mobile_no: item.mobile_no,
    // // receipt_no_of_duplicate_message: item.receipt_no_of_duplicate_message,
    // senderid: item.senderid,
    // sent_time: item.sent_time,
    // // smsunit: item.smsunit,
    // source: item.source,
    // status: item.status,
    // template_id: item.template_id,
    // // unique_id: item.unique_id,
    ...item,
    ["Service Type"]:
      item.account_usage_type_id === "1"
        ? "Transactional"
        : item.account_usage_type_id === "2"
          ? "Promotional"
          : item.account_usage_type_id === "3"
            ? "International"
            : "Unknown",
    ["Character Length"]: item.actual_sms_length,
    ["Delivery Time"]: item.del_time,
  }));

  const totalPages = Math.ceil(totalPage / paginationModel.pageSize);

  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            lg: "space-between",
          },
          alignItems: "center",
          padding: 1,
          gap: 2,
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {selectedRows.length > 0 && (
            <Typography
              variant="body2"
              sx={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
              }}
            >
              {selectedRows.length} Rows Selected
            </Typography>
          )}

          <Typography variant="body2">
            Total Records: <span className="font-semibold">{totalPage}</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <CustomPagination
            totalPages={totalPages}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            setCurrentPage={setCurrentPage}
          />
        </Box>
      </GridFooterContainer>
    );
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="mb-4 font-semibold text-center text-green-600 lg:text-lg text-md">
          <CampaignOutlinedIcon fontSize="medium" sx={{ fontSize: "1.8rem" }} />{" "}
          Campaign Detail Report - {campaignName}
        </h1>
      </div>
      <div className="flex flex-wrap items-end justify-center w-full gap-4 mb-5 align-middle lg:justify-start">
        <div className="w-full sm:w-64">
          <InputField
            id="mobileNoCampaignDetails"
            name="mobileNoCampaignDetails"
            label="Mobile No"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
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
              // { value: "clicked", label: "Clicked" },
              { value: "read", label: "Read" },
              { value: "failed", label: "Failed" },
            ]}
            value={deliveryStatus}
            onChange={setDeliveryStatus}
            placeholder="Select Status"
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

      <Paper sx={{ height: 558 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={45}
          paginationModel={paginationModel}
          onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnMenu
          slots={{ footer: CustomFooter }}
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              color: "#193cb8",
              fontSize: "14px",
              fontWeight: "bold !important",
            },
            "& .MuiDataGrid-row--borderBottom": {
              backgroundColor: "#e6f4ff !important",
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default CampaignDetailsReport;
