import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import React, { useState, useRef } from "react";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import usePagination from "@mui/material/usePagination";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import { useNavigate } from "react-router-dom";
import InfoPopover from "@/components/common/InfoPopover";
import { ImInfo } from "react-icons/im";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const CustomPagination = ({
  totalPages,
  paginationModel,
  setPaginationModel,
}) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) =>
      setPaginationModel({ ...paginationModel, page: newPage - 1 }),
  });

  const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
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

const CampaignTableSms = ({ id, name, data, selectedUser }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [campaignInfoMap, setCampaignInfoMap] = useState({});
  const navigate = useNavigate();
  const handleDetailed = () => {
    navigate("/smscampaigndetaillogs");
  };

  const closeDropdown = () => setDropdownOpenId(null);

  const dropdownButtonRefs = useRef([]);

  // console.log("data in camp table sms", data);

  const rows = data?.map((item, i) => ({
    id: i + 1,
    sn: i + 1,
    ...item,
    campaign_type:
      item.account_usage_type_id === 1
        ? "Transactional"
        : item.account_usage_type_id === 2
        ? "Promotional"
        : item.account_usage_type_id === 3
        ? "International"
        : "Unknown",
  }));

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "que_time", headerName: "Created On", flex: 0, minWidth: 50 },
    {
      field: "campaign_name",
      headerName: "Campaign Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "campaign_type",
      headerName: "Campaign Type",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "templatename",
      headerName: "Template Name",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "insert_flag",
      headerName: "Status",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "smsCount",
      headerName: "Total Audience",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          {/* <CustomTooltip title="View Campaign" placement="top" arrow>
                <IconButton
                  className="text-xs"
                  ref={(el) => {
                    if (el)
                      dropdownButtonRefs.current[params.row.campaignSrno] = el;
                  }}
                  onClick={() => handleView(params.row)}
                >
                  <InfoOutlinedIcon
                    sx={{ fontSize: "1.2rem", color: "green" }}
                  />
                </IconButton>
              </CustomTooltip> */}
          <InfoPopover
            anchorEl={dropdownButtonRefs.current[params.row.campaignSrno]}
            open={dropdownOpenId == params.row.campaignSrno}
            onClose={closeDropdown}
          >
            {campaignInfoMap[params.row.campaignSrno] ? (
              <div className="w-[280px] max-w-full">
                {/* <div className="text-base font-semibold mb-2 text-gray-800">
                                Campaign Summary
                              </div> */}
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                  {[
                    { label: "Total", key: "TotalUnit" },
                    { label: "TotalSMS", key: "TOTALSMS" },
                    { label: "Pending", key: "Pending" },
                    { label: "Failed", key: "failed" },
                    { label: "Delivered", key: "delivered" },
                    { label: "Un Delivered", key: "undelivered" },
                    { label: "Pending DR", key: "drNotAvailable" },
                    // { label: "QUE Time", key: "queTime" },

                    // "TotalUnit",
                    // "TOTALSMS",
                    // "Pending",
                    // "failed",
                    // // "failed",
                    // "delivered",
                    // "undelivered",
                    // "drNotAvailable",
                    // // "queTime",
                  ].map(({ label, key }) => (
                    <React.Fragment key={key}>
                      <div className="font-medium capitalize text-gray-600 border-b border-gray-200 pb-2">
                        {/* {key.replace(/([A-Z])/g, " $1")} */}
                        {label}
                      </div>
                      <div className="text-right font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        {campaignInfoMap[params.row.campaignSrno][key] ?? "N/A"}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No Data Available</div>
            )}
          </InfoPopover>
          <CustomTooltip title="Detailed Log" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() =>
                navigate("/smscampaigndetaillogs", {
                  state: {
                    id: params.row.receipt_no_of_duplicate_message,
                    userId: selectedUser,
                  },
                })
              }
            >
              <DescriptionOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          </CustomTooltip>
          {/* <CustomTooltip title="Cancel" placement="top" arrow>
                <IconButton onClick={() => handleCancel(params.row)}>
                  <CancelOutlinedIcon
                    sx={{
                      fontSize: "1.2rem",
                      color: "gray",
                    }}
                  />
                </IconButton>
              </CustomTooltip> */}
        </>
      ),
    },
  ];

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);
  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", lg: "space-between" },
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
              sx={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
            >
              {selectedRows.length} Rows Selected
            </Typography>
          )}

          <Typography variant="body2">
            Total Records: <span className="font-semibold">{rows.length}</span>
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
          />
        </Box>
      </GridFooterContainer>
    );
  };
  return (
    <div>
      <Paper sx={{ height: 558 }} id={id} name={name}>
        <DataGrid
          id={id}
          name={name}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 50]}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowHeight={45}
          slots={{
            footer: CustomFooter,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnMenu
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": { outline: "none !important" },
            "& .MuiDataGrid-columnHeaders": {
              color: "#193cb8",
              fontSize: "14px",
              fontWeight: "bold !important",
            },
            "& .MuiDataGrid-row--borderBottom": {
              backgroundColor: "#e6f4ff !important",
            },
            "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
          }}
        />
      </Paper>
    </div>
  );
};

export default CampaignTableSms;
