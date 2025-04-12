import React, { useState } from "react";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { Paper, Typography, Box, Button } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import SystemUpdateAltOutlinedIcon from "@mui/icons-material/SystemUpdateAltOutlined";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
// import CustomNoRowsOverlay from "../../components/common/CustomNoRowsOverlay";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay.jsx";

// import { CustomTabPanel } from "../../whatsapp/managetemplate/components/CustomTabPanel.jsx";
// import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker.jsx";
// import UniversalTextArea from "../../whatsapp/components/UniversalTextArea.jsx";
// import UniversalButton from "../../whatsapp/components/UniversalButton.jsx";
// import UniversalTimePicker from "../../ibd/callHistory/UniversalTimePicker.jsx";
// import { DataTable } from "../../components/common/DataTable.jsx";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Dialog } from "primereact/dialog";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker.jsx";
import { CustomTabPanel } from "@/whatsapp/managetemplate/components/CustomTabPanel.jsx";
import { DataTable } from "@/components/layout/DataTable.jsx";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import UniversalButton from "@/components/common/UniversalButton";

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

const ClickTwoCallTable = (id) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [visiblenotedialog, setVisiblenotedialog] = useState(false);
  const [value, setValue] = useState(0);

  const columns = [
    { field: "sno", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "from", headerName: "From", flex: 1, minWidth: 120 },
    { field: "details", headerName: "Details", flex: 1, minWidth: 120 },
    { field: "duration", headerName: "Duration", flex: 1, minWidth: 120 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    { field: "to", headerName: "To", flex: 1, minWidth: 120 },
    // { field: "details", headerName: "Details", flex: 1, minWidth: 120 },
    // { field: "duration", headerName: "Duration", flex: 1, minWidth: 120 },
    // { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: () => (
        <>
          <IconButton className="text-xs">
            <SmartDisplayOutlinedIcon
              sx={{
                fontSize: "1.2rem",
                color: "green",
              }}
            />
          </IconButton>
          <IconButton>
            <SystemUpdateAltOutlinedIcon
              sx={{
                fontSize: "1.2rem",
                color: "blue",
              }}
            />
          </IconButton>
          <IconButton>
            <NoteOutlinedIcon
              onClick={handleCallNote}
              sx={{
                fontSize: "1.2rem",
                color: "gray",
              }}
            />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      sno: 1,
      from: "9852365478",
      details: "22-09-2023 14:58:08 15:58:08",
      duration: "00:13 Pulse: 0",
      status: "Answered",
      to: "8545958452",
      action: "True",
    },
    {
      id: 2,
      sno: 2,
      from: "9122365474",
      details: "23-09-2023 14:58:08 15:58:08",
      duration: "00:13 Pulse: 0",
      status: "Answered",
      to: "9455958452",
      action: "True",
    },
  ];

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


  const DialogTablecoloumns = [
    { field: "date", headerName: "Date", flex: 0, minWidth: 80 },
    { field: "time", headerName: "Time", flex: 1, minWidth: 100 },
    { field: "remark", headerName: "Remark", flex: 1, minWidth: 100 },
  ];

  const DialogTablerows = [
    {
      id: "1",
      date: "22-09-2023",
      time: "14:58:08",
      remark: "Lorem ipsum dolor sd",
    },
  ];


  // events
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // call note
  const handleCallNote = () => {
    setVisiblenotedialog(true);
  };

  const handleAddNoteSubmitBtn = () => { };

  return (
    <>
      <Paper sx={{ height: 558 }}>
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

      <Dialog
        visible={visiblenotedialog}
        style={{ width: "40rem" }}
        onHide={() => {
          setVisiblenotedialog(false);
        }}
        draggable={false}
      >
        <>
          <Box sx={{ width: "100%" }}>
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Manage Campaigns Tabs"
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab
                  label={<span>Add Note</span>}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "#f0f4ff",
                      borderRadius: "8px",
                    },
                  }}
                />

                <Tab
                  label={<span>Call Note History</span>}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "#f0f4ff",
                      borderRadius: "8px",
                    },
                  }}
                />
              </Tabs>
            </div>
            <CustomTabPanel value={value} index={0}>
              <div>
                <div className="flex gap-2">
                  <UniversalDatePicker
                    id="c2caddnotedate"
                    name="c2caddnotedate"
                    label="Date"
                  />
                  {/* <UniversalTimePicker label="Time" /> */}
                </div>
                <div className="my-2">
                  <UniversalTextArea
                    label="Remarks"
                    className="textArea"
                    placeholder="Enter remarks..."
                  />
                </div>
                <div className="flex items-center justify-center mt-4 lg:mt-6">
                  <UniversalButton
                    id="submitaddnoteBtn"
                    name="submitaddnoteBtn"
                    label="Submit"
                    onClick={handleAddNoteSubmitBtn}
                    className="bg-blue-400 text-white rounded-2xl px-6 py-1"
                  />
                </div>
              </div>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <DataTable
                id="table"
                rows={DialogTablerows}
                col={DialogTablecoloumns}
              />
            </CustomTabPanel>
          </Box>
        </>
      </Dialog>
    </>
  );
};

export default ClickTwoCallTable;
