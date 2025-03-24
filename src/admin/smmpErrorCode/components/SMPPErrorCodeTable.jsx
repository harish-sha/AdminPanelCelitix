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

const SMPPErrorCodeTable = ({ id, name }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [smpperrorcodeedit, setSMPPErrorCodeEdit] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleSMPPErrorEdit = () => {
    setSMPPErrorCodeEdit(true);
  };

  const serviceOptions = [
    { value: "Service1", label: "Service1" },
    { value: "Service2", label: "Service2" },
    { value: "Service3", label: "Service3" },
  ];
  const handleServiceEdit = (service) => {
    console.log(service);
  };
  const displaytypeOptions = [
    { value: "Display1", label: "Display1" },
    { value: "Display2", label: "Display2" },
    { value: "Display3", label: "Display3" },
  ];
  const handleDisplaytyperEdit = (display) => {
    console.log(display);
  };
  const displayreasonOptions = [
    { value: "Vendor1", label: "Vendor1" },
    { value: "Vendor2", label: "Vendor2" },
    { value: "Vendor3", label: "Vendor3" },
  ];
  const handleDisplayreasonEdit = (reason) => {
    console.log(reason);
  };

  const rows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    service: "Service",
    vendorecstatus: "UNDELIV",
    vendorec: "000",
    vendorecdescription: "Delivered",
    displayecstatus: "UNDELIV",
    displayec: "000",
    displayecdescription: "Delivered",
    cbondnd: "No",
    cbondelivery: "No",
  }));

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "service", headerName: "Service", flex: 1, minWidth: 80 },
    {
      field: "vendorecstatus",
      headerName: "Vendor EC Status",
      flex: 1,
      minWidth: 120,
    },
    { field: "vendorec", headerName: "Vendor EC", flex: 1, minWidth: 90 },
    {
      field: "vendorecdescription",
      headerName: "Vendor EC Description",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "displayecstatus",
      headerName: "Display EC Status",
      flex: 1,
      minWidth: 120,
    },
    { field: "displayec", headerName: "Display EC", flex: 1, minWidth: 100 },
    {
      field: "displayecdescription",
      headerName: "Display EC Description",
      flex: 1,
      minWidth: 120,
    },
    { field: "cbondnd", headerName: "CB On DND", flex: 1, minWidth: 80 },
    {
      field: "cbondelivery",
      headerName: "CB On Delivery",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit Routing" placement="top" arrow>
            <IconButton onClick={() => handleSMPPErrorEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Routing" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleSMPPErrorDelete(params.row)}
            >
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
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
          checkboxSelection
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
      <Dialog
        header="Vendor Error Code Mapping"
        visible={smpperrorcodeedit}
        onHide={() => setSMPPErrorCodeEdit(false)}
        className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <AnimatedDropdown
              label="Service"
              options={serviceOptions}
              id="serviceedit"
              name="serviceedit"
              onChange={handleServiceEdit}
            />
            <InputField
              label="Vendor Error Code"
              id="vendorerrorcodeedit"
              name="vendorerrorcodeedit"
              placeholder="Enter Vendor Error Code"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Vendor Error Status"
              id="vendorerrorstatusedit"
              name="vendorerrorstatusedit"
              placeholder="Vendor Error Status"
            />
            <UniversalTextArea
              label="Vendor Error Code Description"
              id="vendorerrorcodedescriptionedit"
              name="vendorerrorcodedescriptionedit"
              placeholder="Vendor Error Code Description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <AnimatedDropdown
              label="Display Type"
              options={displaytypeOptions}
              id="displaytypeedit"
              name="displaytypeedit"
              onChange={handleDisplaytyperEdit}
            />
            <AnimatedDropdown
              label="Display Reason"
              options={displayreasonOptions}
              id="displayreasonedit"
              name="displayreasonedit"
              onChange={handleDisplayreasonEdit}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Display Error Code"
              id="displayerrorcodeedit"
              name="displayerrorcodeedit"
              placeholder="Display Error Code"
              readOnly="true"
            />
          </div>
          <div className="flex justify-center">
            <UniversalButton label="Save" id="saveedit" name="saveedit" />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SMPPErrorCodeTable;
