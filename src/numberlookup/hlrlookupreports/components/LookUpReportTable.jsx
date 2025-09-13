import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import { MdOutlineDeleteForever } from "react-icons/md";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";
import usePagination from "@mui/material/usePagination/usePagination";
import styled from "styled-components";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import { Dialog } from "primereact/dialog";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import InputField from "../../../whatsapp/components/InputField";
import UniversalTextArea from "../../../whatsapp/components/UniversalTextArea";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
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

const LookUpTable = ({ id, name, data }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [lookUpedit, setLookUpEdit] = useState(false);
  const [LookUpDelete, setLookUpDelete] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleLookUpEdit = (value) => {
    console.log(value);
    setLookUpEdit(true);
  };

  const handleLookUpDelete = (value) => {
    console.log(value);
    setLookUpDelete(true);
  };

  // const rows = Array.from({ length: 50 }, (_, i) => ({
  //   id: i + 1,
  //   sn: i + 1,
  //   templateName: "",
  //   category: "",
  //   status: "",
  //   type: "",
  //   health: "",
  //   createdDate: "",
  //   action: "",
  // }));

  const rows = data?.map((row, idx) => ({
    sn: idx + 1,
    id: row["Sr. No."] || idx,
    insertTime: moment(row["Insert Time"]).format("YYYY-MM-DD hh:mm:ss"),
    lookupDescription: row["Lookup Description"],
    lookupStatus: row["Lookup Status"],
    mobileNo: row["Mobile No"],
    originalCircle: row["Original Circle"],
    originalOperator: row["Original Operator"],
    ported: row["Ported"],
    portedCircle: row["Ported Circle"],
    portedOperator: row["Ported Operator"],
    status: row["Status"],
  }));

  const columns = [
    { field: "sn", headerName: "Sr. No.", flex: 0, width: 100 },
    {
      field: "insertTime",
      headerName: "Insert Time",
      flex: 1,
      minWidth: 180,
      // renderCell: (params) => (
      //   <div
      //     style={{
      //       // whiteSpace: "normal",
      //       // wordBreak: "break-word",
      //       // lineHeight: "1.4",
      //     }}
      //   >
      //     {params.value}
      //   </div>
      // ),
    },
    {
      field: "lookupDescription",
      headerName: "Lookup Description",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.4",
            // fontSize: "14px"
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "lookupStatus",
      headerName: "Lookup Status",
      flex: 1,
      minWidth: 150,
    },
    { field: "mobileNo", headerName: "Mobile No", flex: 1, minWidth: 150 },
    {
      field: "originalCircle",
      headerName: "Original Circle",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "originalOperator",
      headerName: "Original Operator",
      flex: 1,
      minWidth: 160,
    },
    { field: "ported", headerName: "Ported", flex: 1, minWidth: 100 },
    {
      field: "portedCircle",
      headerName: "Ported Circle",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "portedOperator",
      headerName: "Ported Operator",
      flex: 1,
      minWidth: 160,
    },
    { field: "status", headerName: "Status", flex: 1, minWidth: 100 },
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
      <Paper sx={{ height: 564 }} id={id} name={name}>
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
          // checkboxSelection
          disableRowSelectionOnClick
          // disableColumnResize
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

export default LookUpTable;
