import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import React, { useState, useRef } from "react";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import usePagination from "@mui/material/usePagination";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import { useNavigate } from "react-router-dom";
import { ImInfo } from "react-icons/im";
import InfoPopover from "@/components/common/InfoPopover.jsx";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
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

const SmsCampaignDetailedLogsTable = ({
  id,
  name,
  data = [],
  handlePreviosDayDetailDisplay,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  console.log("data", data)
  const dropdownButtonRefs = useRef({});

  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const [clicked, setClicked] = useState({});
  const additionalInfoLabels = {
    // Example mapping: 'queuedate': 'Queue Date'
  };

  const handleInfo = (row) => {
    // setClicked(row);
    setDropdownOpenId(row.id);
  };

  const closeDropdown = () => {
    setDropdownOpenId(null);
  };

  const rows = data?.map((item, index) => ({
    id: index,
    sn: index + 1,
    mobile_no: item.mobile_no || "-",
    que_time: item.sent_time ?? 0,
    message: item.message ?? 0,
    status: item.status ?? 0,
    actual_status: item.actual_status || "-",
    account_usage_type_id: item.account_usage_type_id || "-",
    smsunit: item.smsunit ?? 0,
    senderid: item.senderid ?? 0,
    // que_time: item.que_time,
    del_time: item.del_time,
    unique_id: item.unique_id,
    circle_srno: item.circle_srno,
    source: item.source,
    PE_ID: item.PE_ID,
    actual_sms_length: item.actual_sms_length,
    // actual_status: item.actual_status,
  }));

  const columns = [
    {
      field: "sn",
      headerName: "S.No",
      flex: 0,
      width: 80,
      // renderCell: (params) => (
      //   <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      //     {params.value}
      //   </div>
      // ),
    },
    {
      field: "mobile_no",
      headerName: "Mobile No.",
      flex: 0,
      minWidth: 160,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "que_time",
      headerName: "Sent Time",
      flex: 0,
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
      minWidth: 220,
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0,
      width: 140,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "actual_status",
      headerName: "Delivery Status",
      flex: 0,
      width: 140,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    // {
    //   field: "account_usage_type_id",
    //   headerName: "Account Usage Type",
    //   flex: 0,
    //   minWidth: 240,
    //   renderCell: (params) => {
    //     const usageTypes = {
    //       1: "Transactional",
    //       2: "Promotional",
    //       3: "International",
    //     };
    //     return (
    //       <div
    //         style={{ display: "flex", alignItems: "center", height: "100%" }}
    //       >
    //         {usageTypes[params.value] || "Unknown"}
    //       </div>
    //     );
    //   },
    // },
    {
      field: "smsunit",
      headerName: "SMS Unit",
      flex: 0,
      width: 100,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "senderid",
      headerName: "Sender Id",
      flex: 0,
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0,
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center justify-start h-full">
          <CustomTooltip title="View Campaign" placement="top" arrow>
            <IconButton
              className="text-xs"
              ref={(el) => {
                if (el) dropdownButtonRefs.current[params.row.id] = el;
              }}
              onClick={() => handleInfo(params.row)}
            >
              <InfoOutlinedIcon
                sx={{ fontSize: "1.2rem", color: "green" }}
                className="mt-1"
              />
            </IconButton>
          </CustomTooltip>
          <InfoPopover
            anchorEl={dropdownButtonRefs.current[params.row.id]}
            open={dropdownOpenId == params.row.id}
            onClose={closeDropdown}
          >
            {data[params.row.id] ? (
              <div className="w-[290px] max-w-full px-2">
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                  {[
                    { label: "Queue Time", key: "que_time" },
                    { label: "Delivery Time", key: "del_time" },
                    { label: "Unique ID", key: "unique_id" },
                    { label: "Circle Srno", key: "circle_srno" },
                    { label: "Circle Name", key: "circle_name" },
                    { label: "source", key: "source" },
                    { label: "PE ID", key: "PE_ID" },
                    { label: "Template ID", key: "template_id" },
                    { label: "Description", key: "reason" },
                    { label: "Unicode", key: "isunicode" },
                    { label: "Character Length", key: "actual_sms_length" },
                    { label: "Country Name", key: "country_name" },
                    { label: "Country Code", key: "country_code" },
                    // { label: "Actual Status", key: "actual_status" },
                    { label: "Service Type", key: "account_usage_type_id" },
                  ].map(({ label, key }) => (
                    <React.Fragment key={key}>
                      <div className="font-medium capitalize text-gray-600 border-b border-gray-200 pb-2 text-nowrap">
                        {label}
                      </div>
                      <div className="text-right font-semibold text-gray-800 border-b border-gray-200 pb-2 text-nowrap">
                        {key === "isunicode"
                          ? data[params.row.id][key] === "0"
                            ? "No"
                            : "Yes"
                          : key === "account_usage_type_id"
                            ? ({
                              1: "Transactional",
                              2: "Promotional",
                              3: "International",
                            }[data[params.row.id][key]] ?? "N/A")
                            : data[params.row.id][key] ?? "N/A"}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No Data Available</div>
            )}
          </InfoPopover>
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(data?.length / paginationModel.pageSize);
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
            Total Records: <span className="font-semibold">{data?.length}</span>
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
          getRowHeight={() => "auto"}
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

export default SmsCampaignDetailedLogsTable;
