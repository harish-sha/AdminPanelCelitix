import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import usePagination from "@mui/material/usePagination";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import { ImInfo } from "react-icons/im";
import InfoPopover from "@/components/common/InfoPopover.jsx";
import { useNavigate } from "react-router-dom";

const CustomPagination = ({
  totalPages,
  paginationModel,
  setPaginationModel,
  setCurrentPage,
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

const PreviousDaysTableSms = ({ id, name, data }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalPage, setTotalPage] = useState(1);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [clicked, setClicked] = useState(null);

  const navigate = useNavigate()

  const handleInfo = (row) => {
    setClicked(row);
    setDropdownOpenId(row.id);
  };

  const closeDropdown = () => {
    setDropdownOpenId(null);
    setClicked(null);
  };

  const infoFieldsToShow = [
    "actual_status",
    "message",
    "mobile_no",
    "senderid",
    "sent_time",
    "status",
  ];

  const rows = data?.map((item, index) => ({
    id: index + 1,
    sn: index + 1,
    status: item.status || "-",
    sent_time: item?.que_time?.split(" ")[1] || "-",
    mobile_no: item.mobile_no || "-",
    message: item.message || "-",
    actual_status: item.actual_status || "-",
    senderid: item.senderid || "-",
  })) || [];

  const paginatedRows = rows.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  useEffect(() => {
    setTotalPage(Math.ceil(rows.length / paginationModel.pageSize));
  }, [rows, paginationModel.pageSize]);


  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    { field: "sent_time", headerName: "Sent Time", flex: 1, minWidth: 120 },
    { field: "mobile_no", headerName: "Mobile Number", width: 140 },
    { field: "message", headerName: "Message", flex: 1, minWidth: 120 },
    { field: "actual_status", headerName: "Actual Status", flex: 1, minWidth: 120 },
    { field: "senderid", headerName: "SenderId", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip title="Info" placement="top" arrow>
          <span>
            <IconButton onClick={() => handleSummaryReport(params.row)}>
              <ImInfo size={18} className="text-green-500" />
            </IconButton>
          </span>
        </CustomTooltip>
      ),
    },
  ];

  const CustomFooter = () => (
    <GridFooterContainer
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {selectedRows.length > 0 && (
          <Typography variant="body2">
            {selectedRows.length} Rows Selected
          </Typography>
        )}
        <Typography variant="body2">
          Total Records: <strong>{rows.length}</strong>
        </Typography>
      </Box>
      <CustomPagination
        totalPages={totalPage}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </GridFooterContainer>
  );

  return (
    <div>
      <Paper sx={{ height: 558 }} id={id} name={name}>
        <DataGrid
          id={id}
          name={name}
          rows={paginatedRows}
          columns={columns}
          pageSizeOptions={[10, 20, 50]}
          pagination
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

export default PreviousDaysTableSms;
