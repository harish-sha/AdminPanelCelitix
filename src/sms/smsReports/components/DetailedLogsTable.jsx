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

const DetailedLogsTable = ({
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
  const navigate = useNavigate();
  const handleDownload = () => {
    navigate("/download");
  };

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
    totalsms: item.TOTALSMS || "-",
    pending: item.Pending ?? 0,
    failed: item.failed ?? 0,
    sent: item.sent ?? 0,
    delivered: item.delivered ?? 0,
    notdelivered: item.not_delivered ?? 0,
    pendingdr: item.dr_not_available ?? 0,
    ndnc: item.NDNCDenied ?? 0,
  }));

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "totalsms",
      headerName: "Total Sms",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <CustomTooltip title={params.value} placement="top" arrow>
          <button
            onClick={() => handlePreviosDayDetailDisplay("TOTALSMS")}
            className="text-blue-600 hover:underline"
          >
            {params.value}
          </button>
        </CustomTooltip>
      ),
    },
    // { field: "smscount", headerName: "SMS Count", flex: 1, minWidth: 100 },
    // { field: "smsunits", headerName: "SMS Units", flex: 1, minWidth: 100 },
    { field: "pending", headerName: "Pending", flex: 1, minWidth: 90,
      renderCell: (params) => (
        <CustomTooltip title={params.value} placement="top" arrow>
          <button
            onClick={() => handlePreviosDayDetailDisplay("pending")}
            className="text-blue-600 hover:underline"
          >
            {params.value}
          </button>
        </CustomTooltip>
      ),
     },
    { field: "failed", headerName: "Failed", flex: 1, minWidth: 70,
      renderCell: (params) => (
        <CustomTooltip title={params.value} placement="top" arrow>
          <button
            onClick={() => handlePreviosDayDetailDisplay("failed")}
            className="text-blue-600 hover:underline"
          >
            {params.value}
          </button>
        </CustomTooltip>
      ),
     },
    // { field: "blocked", headerName: "Blocked", flex: 1, minWidth: 70 },
    { field: "sent", headerName: "Sent", flex: 1, minWidth: 60,
      renderCell: (params) => (
        <CustomTooltip title={params.value} placement="top" arrow>
          <button
            onClick={() => handlePreviosDayDetailDisplay("sent")}
            className="text-blue-600 hover:underline"
          >
            {params.value}
          </button>
        </CustomTooltip>
      ),
     },
    { field: "delivered", headerName: "Delivered", flex: 1, minWidth: 90,
      renderCell: (params) => (
        <CustomTooltip title={params.value} placement="top" arrow>
          <button
            onClick={() => handlePreviosDayDetailDisplay("delivered")}
            className="text-blue-600 hover:underline"
          >
            {params.value}
          </button>
        </CustomTooltip>
      ),
     },
    {
      field: "notdelivered",
      headerName: "Not delivered",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip title={params.value} placement="top" arrow>
          <button
            onClick={() => handlePreviosDayDetailDisplay("notdelivered")}
            className="text-blue-600 hover:underline"
          >
            {params.value}
          </button>
        </CustomTooltip>
      ),
    },
    { field: "pendingdr", headerName: "Pending DR", flex: 1, minWidth: 110,
      renderCell: (params) => (
        <CustomTooltip title={params.value} placement="top" arrow>
          <button
            onClick={() => handlePreviosDayDetailDisplay("pendingdr")}
            className="text-blue-600 hover:underline"
          >
            {params.value}
          </button>
        </CustomTooltip>
      ),
     },
    { field: "ndnc", headerName: "NDNC", flex: 1, minWidth: 70,
      renderCell: (params) => (
        <CustomTooltip title={params.value} placement="top" arrow>
          <button
            onClick={() => handlePreviosDayDetailDisplay("ndnc")}
            className="text-blue-600 hover:underline"
          >
            {params.value}
          </button>
        </CustomTooltip>
      ),
     },
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

export default DetailedLogsTable;
