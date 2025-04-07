import * as React from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { MdOutlineDeleteForever } from "react-icons/md";
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Paper, Typography, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CustomNoRowsOverlay from "../../whatsapp/components/CustomNoRowsOverlay";

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

const WhatsappManageContactsTable = ({
  id,
  name,
  setSelectedRows,
  allContacts,
  setUpdateContactVisible,
  setUpdateContactDetails,
  setIdToDelete,
  setDeleteContactDialogVisible
}) => {
  const [selectedRows, setLocalSelectedRows] = React.useState([]);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const handleRowSelection = (ids) => {
    setSelectedRows(ids);
    setLocalSelectedRows(ids);
  };

  const toggleButtons = (isEnabled) => {
    document.getElementById("manageoptinsettingsbtn").disabled = !isEnabled;
    document.getElementById("manageoptinblockbtn").disabled = !isEnabled;
    document.getElementById("manageoptinexportbtn").disabled = !isEnabled;
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 120 },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 120 },
    { field: "mobileno", headerName: "Mobile No", flex: 1, minWidth: 120 },
    { field: "uniqueId", headerName: "Unique ID", flex: 1, minWidth: 120 },
    {
      field: "emailstatus",
      headerName: "Email Status",
      flex: 1,
      minWidth: 120,
    },
    { field: "group", headerName: "Group", flex: 1, minWidth: 120 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    // { field: 'totalAudience', headerName: 'Total Audience', flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <IconButton
            className="no-xs"
            onClick={() => {
              setDeleteContactDialogVisible(true);
              setIdToDelete(params.row);
            }}
          >
            <MdOutlineDeleteForever
              className="text-red-500 cursor-pointer hover:text-red-600"
              size={20}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              setUpdateContactVisible(true);
              setUpdateContactDetails(params.row);
            }}
          >
            <EditNoteIcon
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

  const rows = Array.isArray(allContacts)
    ? allContacts?.map((contact, index) => ({
      id: index + 1,
      sn: index + 1,
      firstName: contact.firstName ?? "-",
      lastName: contact.lastName ?? "-",
      mobileno: contact.mobileno ?? "-",
      emailstatus: contact.status == 1 ? "Active" : "Inactive",
      group: contact.groupName ?? "-",
      status: contact.status == 1 ? "Active" : "Inactive",
      action: "True",
      srno: contact.addSrno,
      gender: contact.gender,
      ...contact,
    }))
    : [];

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
        onRowSelectionModelChange={(ids) => {
          console.log(ids);
        }}
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

export default WhatsappManageContactsTable;
