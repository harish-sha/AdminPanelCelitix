import React, { useState } from "react";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import InputField from "../../components/layout/InputField";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
// import CustomNoRowsOverlay from "../../components/layout/CustomNoRowsOverlay";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import { styled } from "@mui/material/styles";
import { Paper, Typography, Box, Button } from "@mui/material";

const AppauthenticatorReports = () => {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [mobileNo, setMobileNo] = useState("");
  const [source, setSource] = useState();
  const [status, setStatus] = useState();
  const [selectedRow, setSelectedRows] = useState([]);

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "Source", headerName: "Source", flex: 0, minWidth: 80 },
    {
      field: "mobileNo",
      headerName: "MOobile No",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "authenticationStatus",
      headerName: "Authentication Status",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "receivedTime",
      headerName: "Received Time",
      flex: 1,
      minWidth: 120,
    },
  ];

  const rows = [
    {
      id: 1,
      sn: 1,
      source: 51616,
      mobileNo: 9876543210,
      message: "{Message1}",
      authenticationStatus: "Success",
      receivedTime: "24/01/25 14:58:39",
    },
    {
      id: 2,
      sn: 2,
      source: 51616,
      mobileNo: 9876543210,
      message: "{Message1}",
      authenticationStatus: "Success",
      receivedTime: "24/01/25 14:58:39",
    },
    {
      id: 3,
      sn: 3,
      source: 51616,
      mobileNo: 9876543210,
      message: "{Message1}",
      authenticationStatus: "Success",
      receivedTime: "24/01/25 14:58:39",
    },
    {
      id: 4,
      sn: 4,
      source: 51616,
      mobileNo: 9876543210,
      message: "{Message1}",
      authenticationStatus: "Success",
      receivedTime: "24/01/25 14:58:39",
    },
    {
      id: 5,
      sn: 5,
      source: 51616,
      mobileNo: 9876543210,
      message: "{Message1}",
      authenticationStatus: "Success",
      receivedTime: "24/01/25 14:58:39",
    },
    {
      id: 6,
      sn: 6,
      source: 51616,
      mobileNo: 9876543210,
      message: "{Message1}",
      authenticationStatus: "Success",
      receivedTime: "24/01/25 14:58:39",
    },
    {
      id: 7,
      sn: 7,
      source: 51616,
      mobileNo: 9876543210,
      message: "{Message1}",
      authenticationStatus: "Success",
      receivedTime: "24/01/25 14:58:39",
    },
    {
      id: 8,
      sn: 8,
      source: 51616,
      mobileNo: 9876543210,
      message: "{Message1}",
      authenticationStatus: "Success",
      receivedTime: "24/01/25 14:58:39",
    },
    {
      id: 9,
      sn: 9,
      source: 51616,
      mobileNo: 9876543210,
      message: "{Message1}",
      authenticationStatus: "Success",
      receivedTime: "24/01/25 14:58:39",
    },
    {
      id: 10,
      sn: 10,
      source: 51616,
      mobileNo: 9876543210,
      message: "{Message1}",
      authenticationStatus: "Success",
      receivedTime: "24/01/25 14:58:39",
    },
    {
      id: 11,
      sn: 11,
      source: 51616,
      mobileNo: 9876543210,
      message: "{Message1}",
      authenticationStatus: "Success",
      receivedTime: "24/01/25 14:58:39",
    },
  ];

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

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
          {selectedRow.length > 0 && (
            <Typography
              variant="body2"
              sx={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
              }}
            >
              {selectedRow.length} Rows Selected
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
    <div className="mt-5">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-auto ">
          <UniversalDatePicker
            id="authenticatorreportfromdate"
            name="authenticatorreportfromdate"
            label="From:"
            value={fromDate}
            onChange={(value) => setFromDate(value)}
            placeholder="dd-mm-yy"
            tooltipContent="From"
            tooltipPlacement="right"
          />
        </div>
        <div className="flex-auto ">
          <UniversalDatePicker
            id="authenticatorreporttodate"
            name="authenticatorreporttodate"
            label="To:"
            placeholder="dd-mm-yy"
            tooltipContent="To"
            tooltipPlacement="right"
            value={toDate}
            onChange={(value) => setToDate(value)}
          />
        </div>
        <div className="flex-auto">
          <InputField
            id="authmobileno"
            name="authmobileno"
            placeholder="Mobile No"
            type="text"
            label="Mobile No."
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>
        <div className="flex-auto">
          <AnimatedDropdown
            id="authsource"
            name="authsource"
            placeholder="Source"
            label="Source"
            tooltipContent="Source"
            tooltipPlacement="right"
            options={[
              { value: 56161, label: 56161 },
              { value: 56161, label: 56161 },
            ]}
            value={source}
            onChange={(value) => setSource(value)}
          />
        </div>
        <div className="flex-auto">
          <AnimatedDropdown
            id="authstatus"
            name="authstatus"
            placeholder="Status"
            label="Status"
            tooltipContent="Status"
            tooltipPlacement="right"
            options={[
              { value: "Success", label: "Success" },
              { value: "Failed", label: "Failed" },
            ]}
            value={status}
            onChange={(value) => setStatus(value)}
          />
        </div>
        <div className="flex items-end w-full rounded-xl sm:w-46">
          <UniversalButton
            id="authreportbtn"
            name="authreportbtn"
            label="Show"
            placeholder="Show"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-4">
        <Paper sx={{ height: 558 }}>
          <DataGrid
            // id={id}
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20, 50]}
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            checkboxSelection
            rowHeight={45}
            slots={{
              footer: CustomFooter,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
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
      </div>
    </div>
  );
};

export default AppauthenticatorReports;
