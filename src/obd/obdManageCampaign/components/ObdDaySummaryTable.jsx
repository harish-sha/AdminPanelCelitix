import React, { useState, useRef } from "react";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { Paper, Typography, Box, Button, IconButton } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CustomTooltip from "@/components/common/CustomTooltip"; // Ensure your path
import InfoPopover from "@/components/common/InfoPopover"; // Ensure your path

const ObdDaySummaryTable = ({ id, name, data = {} }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownButtonRefs = useRef({});
  const campaignInfoMap = data?.CampaignInfoMap || {};

  const handleView = (row) => {
    setDropdownOpenId((prev) => (prev === row.id ? null : row.id));
  };

  const closeDropdown = () => setDropdownOpenId(null);

  const pageSize = paginationModel.pageSize;
  const currentPageIndex = paginationModel.page;

  const rows = Array.isArray(data?.Data)
    ? data.Data.map((item, index) => ({
        id: item.campaignSrno,
        sn: currentPageIndex * pageSize + (index + 1),
        campaignName: item.campaignName || "N/A",
        campaignType: item.campaignType || "N/A",
        voiceType:
          item.voiceType === 1
            ? "Transactional"
            : item.voiceType === 2
            ? "Promotional"
            : "N/A",
        date: item.quetimeS || "N/A",
        processFlag:
          item.processFlag === 1
            ? "Pending"
            : item.processFlag === 2
            ? "Processing"
            : item.processFlag === 3
            ? "Completed"
            : item.processFlag === 4
            ? "Cancelled"
            : "N/A",
      }))
    : [];

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "campaignName",
      headerName: "Campaign Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "campaignType",
      headerName: "Campaign Type",
      flex: 1,
      minWidth: 120,
    },
    { field: "voiceType", headerName: "Voice Type", flex: 1, minWidth: 120 },
    { field: "date", headerName: "Date", flex: 1, minWidth: 120 },
    { field: "processFlag", headerName: "Status", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip title="View Campaign" placement="top" arrow>
            <IconButton
              className="text-xs"
              ref={(el) => (dropdownButtonRefs.current[params.row.id] = el)}
              onClick={() => handleView(params.row)}
            >
              <InfoOutlinedIcon sx={{ fontSize: "1.2rem", color: "green" }} />
            </IconButton>
          </CustomTooltip>
          <InfoPopover
            anchorEl={dropdownButtonRefs.current[params.row.id]}
            open={dropdownOpenId === params.row.id}
            onClose={closeDropdown}
          >
            {campaignInfoMap[params.row.id] ? (
              <div className="w-[280px] max-w-full grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                {[
                  "total",
                  "block",
                  "failed",
                  "submitted",
                  "pending",
                  "sent",
                  "delivered",
                  "undelivered",
                  "read",
                  "source",
                ].map((key) => (
                  <React.Fragment key={key}>
                    <div className="font-medium capitalize text-gray-600 border-b border-gray-200 pb-2">
                      {key.replace(/([A-Z])/g, " $1")}
                    </div>
                    <div className="text-right font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      {campaignInfoMap[params.row.id][key] ?? "N/A"}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No Data Available</div>
            )}
          </InfoPopover>

          <CustomTooltip title="Campaign Detail Report" placement="top" arrow>
            <IconButton onClick={() => console.log("View Logs", params.row.id)}>
              <DescriptionOutlinedIcon
                sx={{ fontSize: "1.2rem", color: "gray" }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
  });

  const CustomPagination = () => {
    const { items } = usePagination({
      count: totalPages,
      page: paginationModel.page + 1,
      onChange: (_, newPage) =>
        setPaginationModel((prev) => ({ ...prev, page: newPage - 1 })),
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
                <Button key={index} variant="outlined" size="small" {...item}>
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

  const CustomFooter = () => (
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {selectedRows.length > 0 && (
          <Typography
            variant="body2"
            sx={{ borderRight: "1px solid #ccc", pr: 1 }}
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
        <CustomPagination />
      </Box>
    </GridFooterContainer>
  );

  return (
    <Paper sx={{ height: 558 }}>
      <DataGrid
        id={id}
        name={name}
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 20, 50]}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowHeight={45}
        slots={{ footer: CustomFooter, noRowsOverlay: CustomNoRowsOverlay }}
        onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
        disableRowSelectionOnClick
        disableColumnResize
        disableColumnMenu
        sx={{
          border: 0,
          "& .MuiDataGrid-cellCheckbox": {
            outline: "none !important",
          },
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
          "& .MuiDataGrid-columnSeparator": {
            // display: "none",
            color: "#ccc",
          },
        }}
      />
    </Paper>
  );
};

export default ObdDaySummaryTable;
