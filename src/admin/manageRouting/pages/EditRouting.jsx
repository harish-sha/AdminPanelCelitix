import React, { useState } from "react";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import InputField from "../../../whatsapp/components/InputField";
import UniversalLabel from "../../../whatsapp/components/UniversalLabel";
import { RadioButton } from "primereact/radiobutton";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import DropdownWithSearch from "../../../whatsapp/components/DropdownWithSearch";
import UniversalTextArea from "../../../whatsapp/components/UniversalTextArea";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import styled from "styled-components";
import usePagination from "@mui/material/usePagination/usePagination";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

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

const EditRouting = ({ id, name }) => {
  const [editroutinguserStatus, setEditRoutingUserStatus] = useState("disable");
  const [editroutingheaderStatus, setEditRoutingHeaderStatus] =
    useState("disable");
  const [editroutingmobileStatus, setEditRoutingMobileStatus] =
    useState("disable");
  const [editroutingoperatorsStatus, setEditRoutingOperatorsStatus] =
    useState("disable");
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleChangeeditroutinguserStatus = (event) => {
    setEditRoutingUserStatus(event.target.value);
  };
  const handleChangeeditroutingheaderStatus = (event) => {
    setEditRoutingHeaderStatus(event.target.value);
  };
  const handleChangeeditroutingmobileStatus = (event) => {
    setEditRoutingMobileStatus(event.target.value);
  };
  const handleChangeeditroutingoperatorsStatus = (event) => {
    setEditRoutingOperatorsStatus(event.target.value);
  };

  const serviceoptions = [
    { label: "Select Service Type", value: "" },
    { label: "Transactional", value: "Transactional" },
    { label: "Promotional", value: "Promotional" },
    { label: "Both", value: "Both" },
  ];

  const handleEditServiceChange = (service) => {
    // console.log(service);
  };

  const useroptions = [
    { label: "Select User Type", value: "" },
    { label: "User", value: "User" },
    { label: "Reseller", value: "Reseller" },
  ];
  const handleUserOptionsChange = (user) => {
    // console.log(user);
  };

  const rows = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    plan: "Otp",
    sendingservice: "Operator1",
    userserialno: "!=%",
    senderid: "!=,",
    holdingtime: "00:00:00",
    routingstatus: "Make Disable",
    status: "pending",
  }));

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "plan", headerName: "Plan", flex: 1, minWidth: 130 },
    {
      field: "sendingservice",
      headerName: "Sending Service",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "userserialno",
      headerName: "User Serial No",
      flex: 1,
      minWidth: 120,
    },
    { field: "senderid", headerName: "Sender ID", flex: 1, minWidth: 120 },
    {
      field: "holdingtime",
      headerName: "Holding Time",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "routingstatus",
      headerName: "Routing Status",
      flex: 1,
      minWidth: 120,
    },
    { field: "status", headerName: "Status", flex: 1, minWidth: 80 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Up Routing" placement="top" arrow>
            <IconButton onClick={() => handleUp(params.row)}>
              <ArrowDropUpOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Down Routing" placement="top" arrow>
            <IconButton onClick={() => handleDown(params.row)}>
              <ArrowDropDownOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Edit Routing" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
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
              onClick={() => handleDelete(params.row)}
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
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">SMPP Bind Settings :</h2>
        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="Plan"
            id="editroutingplan"
            name="editroutingplan"
            placeholder="Enter Plan"
          />

          <AnimatedDropdown
            label="Sending Service"
            id="editroutingservice"
            name="editroutingservice"
            options={serviceoptions}
            placeholder="Select Sending Service"
            onChange={handleEditServiceChange}
          />

          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="">
              <UniversalLabel
                text="User :"
                id="editroutinguser"
                name="editroutinguser"
                className="text-gray-700 font-medium text-sm"
              />
            </div>
            <div className="flex gap-2">
              <RadioButton
                inputId="editroutinguserOption1"
                name="editroutinguserredio"
                value="enable"
                onChange={handleChangeeditroutinguserStatus}
                checked={editroutinguserStatus === "enable"}
              />
              <label
                htmlFor="editroutinguserOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Allow
              </label>
            </div>

            {/* Disallow */}
            <div className="flex gap-2">
              <RadioButton
                inputId="editroutinguserOption2"
                name="editroutinguserredio"
                value="disable"
                onChange={handleChangeeditroutinguserStatus}
                checked={editroutinguserStatus === "disable"}
              />
              <label
                htmlFor="editroutinguserOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Disallow
              </label>
            </div>

            <div className="w-full">
              <DropdownWithSearch
                id="editroutinguserOption"
                name="editroutinguserOption"
                options={useroptions}
                onChange={handleUserOptionsChange}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="">
              <UniversalLabel
                text="Header :"
                id="editroutingheader"
                name="editroutingheader"
                className="text-gray-700 font-medium text-sm"
              />
            </div>
            <div className="flex gap-2">
              <RadioButton
                inputId="editroutingheaderOption1"
                name="editroutingheaderredio"
                value="enable"
                onChange={handleChangeeditroutingheaderStatus}
                checked={editroutingheaderStatus === "enable"}
              />
              <label
                htmlFor="editroutingheaderOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Allow
              </label>
            </div>

            {/* Disallow */}
            <div className="flex gap-2">
              <RadioButton
                inputId="editroutingheaderOption2"
                name="editroutingheaderredio"
                value="disable"
                onChange={handleChangeeditroutingheaderStatus}
                checked={editroutingheaderStatus === "disable"}
              />
              <label
                htmlFor="editroutingheaderOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Disallow
              </label>
            </div>

            <div className="w-full">
              <UniversalTextArea
                id="editroutingheader"
                name="editroutingheader"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="">
              <UniversalLabel
                text="Mobile : "
                id="editroutingmobile"
                name="editroutingmobile"
                className="text-gray-700 font-medium text-sm"
              />
            </div>
            <div className="flex gap-2">
              <RadioButton
                inputId="editroutingmobileOption1"
                name="editroutingmobileredio"
                value="enable"
                onChange={handleChangeeditroutingmobileStatus}
                checked={editroutingmobileStatus === "enable"}
              />
              <label
                htmlFor="editroutingmobileOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Allow
              </label>
            </div>

            {/* Disallow */}
            <div className="flex gap-2">
              <RadioButton
                inputId="editroutingmobileOption2"
                name="editroutingmobileredio"
                value="disable"
                onChange={handleChangeeditroutingmobileStatus}
                checked={editroutingmobileStatus === "disable"}
              />
              <label
                htmlFor="editroutingmobileOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Disallow
              </label>
            </div>

            <div className="w-full">
              <UniversalTextArea
                id="editroutingmobile"
                name="editroutingmobile"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="">
              <UniversalLabel
                text="Operators :"
                id="editroutingoperators"
                name="editroutingoperators"
                className="text-gray-700 font-medium text-sm"
              />
            </div>
            <div className="flex gap-2">
              <RadioButton
                inputId="editroutingoperatorsOption1"
                name="editroutingoperatorsredio"
                value="enable"
                onChange={handleChangeeditroutingoperatorsStatus}
                checked={editroutingoperatorsStatus === "enable"}
              />
              <label
                htmlFor="editroutingoperatorsOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Allow
              </label>
            </div>

            {/* Disallow */}
            <div className="flex gap-2">
              <RadioButton
                inputId="editroutingoperatorsOption2"
                name="editroutingoperatorsredio"
                value="disable"
                onChange={handleChangeeditroutingoperatorsStatus}
                checked={editroutingoperatorsStatus === "disable"}
              />
              <label
                htmlFor="editroutingoperatorsOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Disallow
              </label>
            </div>

            <div className="w-full">
              <UniversalTextArea
                id="editroutingoperators"
                name="editroutingoperators"
              />
            </div>
          </div>
        </div>

        <div className="">
          <UniversalButton label="Save" id="saveedit" name="saveedit" />
        </div>
        <div>
          <Paper sx={{ height: 300 }} id={id} name={name}>
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
      </div>
    </div>
  );
};

export default EditRouting;
