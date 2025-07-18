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

const infoFieldsToShow = [
  "pending",
  "failed",
  "blocked",
  "sent",
  "delivered",
  "not_delivered",
];

const SmsCampaignDetailedLogsTable = ({
  id,
  name,
  data = [],
  handlePreviosDayDetailDisplay,
}) => {
  console.log("data", data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const dropdownButtonRefs = useRef({});
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [clicked, setClicked] = useState({});
  const additionalInfoLabels = {
    // Example mapping: 'queuedate': 'Queue Date'
  };

  const handleInfo = (row) => {
    setClicked(row);
    setDropdownOpenId(row.id);
  };

  const closeDropdown = () => {
    setDropdownOpenId(null);
  };

  const rows = data?.map((item, index) => ({
    id: index + 1,
    sn: index + 1,
    mobile_no: item.mobile_no || "-",
    que_time: item.sent_time ?? 0,
    message: item.message ?? 0,
    status: item.status ?? 0,
    actual_status: item.actual_status || "-",
    smsunit: item.smsunit ?? 0,
    senderid: item.senderid ?? 0,
  }));

  const columns = [
    {
      field: "sn",
      headerName: "S.No",
      flex: 0,
      minWidth: 50,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "mobile_no",
      headerName: "Mobile No.",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "que_time",
      headerName: "Sent Time",
      flex: 1,
      minWidth: 120,
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
      minWidth: 120,
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
      flex: 1,
      minWidth: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "actual_status",
      headerName: "Actual Status",
      flex: 1,
      minWidth: 70,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "smsunit",
      headerName: "Sms Unit",
      flex: 1,
      minWidth: 60,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "senderid",
      headerName: "Sender Id",        
      flex: 1,
      minWidth: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
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
