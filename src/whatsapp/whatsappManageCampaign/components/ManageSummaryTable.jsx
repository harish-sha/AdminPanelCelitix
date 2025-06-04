import * as React from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay.jsx";

import { Paper, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import moment from "moment";

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
}) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) =>
      setPaginationModel({ ...paginationModel, page: newPage - 1 }),
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

const ManageSummaryTable = ({ id, name, data = [], isMonthWise }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  let columns = [];
  let rows = [];

  if (isMonthWise) {
    columns = [
      { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
      { field: "displayName", headerName: "Name", flex: 1, minWidth: 120 },
      { field: "month", headerName: "Month", flex: 1, minWidth: 120 },
      { field: "year", headerName: "Year", flex: 1, minWidth: 120 },
      { field: "country", headerName: "Country", flex: 1, minWidth: 120 },
      { field: "type", headerName: "Type", flex: 1, minWidth: 120 },
      { field: "count", headerName: "Count", flex: 1, minWidth: 120 },
      {
        field: "userCharge",
        headerName: "User Charge",
        flex: 1,
        minWidth: 120,
      },
    ];

    rows = Array.isArray(data)
      ? data.map((item, index) => ({
          id: index + 1,
          sn: index + 1,
          displayName: item.displayName,
          month: item.month,
          year: item.year,
          country: item.country,
          type: item.whatsappType,
          count: item.count,
          userCharge: item.userCharge,
        }))
      : [];
  } else {
    columns = [
      { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
      { field: "displayName", headerName: "Name", flex: 1, minWidth: 120 },
      {
        field: "sentDate",
        headerName: "Sent Date",
        flex: 1,
        minWidth: 120,
        renderCell: (params) =>
          moment(new Date(params.row.sentDate)).format("DD-MM-YYYY"),
      },
      { field: "country", headerName: "Country", flex: 1, minWidth: 120 },
      { field: "type", headerName: "Type", flex: 1, minWidth: 120 },
      { field: "count", headerName: "Count", flex: 1, minWidth: 120 },
      {
        field: "userCharge",
        headerName: "User Charge",
        flex: 1,
        minWidth: 120,
      },
    ];
    rows = Array.isArray(data)
      ? data.map((item, index) => ({
          id: index + 1,
          sn: index + 1,
          displayName: item.displayName,
          sentDate: item.sentDate,
          country: item.country,
          type: item.whatsappType,
          count: item.count,
          userCharge: item.userCharge,
        }))
      : [];
  }

  // "marketing": 1.0000,
  // "whatsappType": "MARKETING",
  // "utility": 2.0000,
  // "country": "IN",
  // "displayName": "Proactive_Celitix",
  // "userCharge": 26.0,
  // "month": "January",
  // "year": 2025,
  // "categoryCreditUsage": 2,
  // "countryCode": "IN",
  // "count": 2,
  // "sentDate": "2025-01-01",
  // "offWhatSrno": 1

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

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
        checkboxSelection
        rowHeight={45}
        slots={{ footer: CustomFooter, noRowsOverlay: CustomNoRowsOverlay }}
        slotProps={{ footer: { totalRecords: rows.length } }}
        onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
        disableRowSelectionOnClick
        // autoPageSize
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

export default ManageSummaryTable;
