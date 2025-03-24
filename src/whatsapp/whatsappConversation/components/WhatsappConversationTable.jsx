import * as React from "react";
import { useState } from "react";
import {
  IconButton,
  Paper,
  Typography,
  Box,
  Button,
  Tooltip,
  Popover,
} from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";

import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay.jsx";

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
  setCurrentPage
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

const WhatsappConversationTable = ({
  id,
  name,
  data = [],
  paginationModel,
  setPaginationModel,
  setCurrentPage,
  totalPage,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const totalPages = Math.ceil(totalPage / paginationModel.pageSize);


  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "contectName",
      headerName: "Contact Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "mobileNo",
      headerName: "Mobile Number",
      flex: 1,
      minWidth: 120,
    },
    { field: "replyType", headerName: "Reply Type", flex: 1, minWidth: 120 },
    {
      field: "messageBody",
      headerName: "Message",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "wabaNumber",
      headerName: "WabaNumber",
      flex: 1,
      minWidth: 120,
    },
    { field: "replyTime", headerName: "Time", flex: 1, minWidth: 120 },
  ];

  const rows = Array.isArray(data?.data)
    ? data?.data.map((item, index) => ({
        id: index + 1,
        sn: index + 1,
        ...item,
      }))
    : [];


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
            Total Records: <span className="font-semibold">{data?.total || 0}</span>
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
    <Paper sx={{ height: 558 }} id={id} name={name}>
      <DataGrid
        id={id}
        name={name}
        rows={rows}
        columns={columns}
        rowHeight={45}
        slots={{
          footer: CustomFooter,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        slotProps={{ footer: { totalRecords: totalPage } }}
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
  );
};

export default WhatsappConversationTable;