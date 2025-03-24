import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import styled from "styled-components";
import usePagination from "@mui/material/usePagination/usePagination";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import InputField from "../../../whatsapp/components/InputField";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import UniversalLabel from "../../../whatsapp/components/UniversalLabel";
import { RadioButton } from "primereact/radiobutton";

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
const ManageSMPPTable = ({ id, name }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [addserviceedit, setAddServiceedit] = useState(false);
  const [versioneditStatus, setVersionEditStatus] = useState("disable");
  const [tpeditStatus, setTpEditStatus] = useState("disable");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleChangeVersionEditStatus = (event) => {
    setVersionEditStatus(event.target.value);
  };
  const handleChangetpEditStatus = (event) => {
    setTpEditStatus(event.target.value);
  };

  const servicetypeoption = [
    { label: "Select Service Type", value: "" },
    { label: "Transactional", value: "Transactional" },
    { label: "Promotional", value: "Promotional" },
    { label: "Both", value: "Both" },
  ];

  const handleEditService = (service) => {
    console.log(service);
  };

  const dataencodingoption = [
    { label: "Default", value: "Default" },
    { label: "GSM", value: "GSM" },
  ];

  const handleEditDataEncoding = (data) => {
    console.log(data);
  };

  const bindmodeoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleEditBindMode = (bind) => {
    console.log(bind);
  };

  const totalsocketseditoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleEditTotalSockets = (sockets) => {
    console.log(sockets);
  };

  const sourceoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleEditSource = (source) => {
    console.log(source);
  };
  const destinationoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleEditDestination = (destination) => {
    console.log(destination);
  };
  const registereddeliveryoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleEditRegisteredDelivery = (delivery) => {
    console.log(delivery);
  };
  const windowsizeoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleEditWindowSize = (windows) => {
    console.log(windows);
  };

  const handleEdit = () => {
    setAddServiceedit(true);
  };

  const rows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    servicename: "Service",
    username: "Ashima",
    host: "66.249.70.162",
    sendingport: "12345",
    receiverport: "56789",
    sockets: "5",
    connectivity: "Start",
    status: "pending",
  }));

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "servicename",
      headerName: "Service Name",
      flex: 1,
      minWidth: 130,
    },
    { field: "username", headerName: "User Name", flex: 1, minWidth: 120 },
    { field: "host", headerName: "Host", flex: 1, minWidth: 120 },
    {
      field: "sendingport",
      headerName: "Sending Port",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "receiverport",
      headerName: "Receiver Port",
      flex: 1,
      minWidth: 120,
    },
    { field: "sockets", headerName: "Sockets", flex: 1, minWidth: 60 },
    {
      field: "connectivity",
      headerName: "Connectivity",
      flex: 1,
      minWidth: 120,
    },
    { field: "status", headerName: "Status", flex: 1, minWidth: 80 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit Service" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Service" placement="top" arrow>
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

      <Dialog
        header="Add Service edit"
        visible={addserviceedit}
        style={{ width: "60rem" }}
        onHide={() => {
          setAddServiceedit(false);
        }}
        draggable={false}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">SMPP Bind Settings :</h2>
          <div className="grid grid-cols-4 gap-4">
            <InputField
              label="Service Name"
              id="servicenameedit"
              name="servicenameedit"
              placeholder="Enter Service Name"
            />

            <div className="flex flex-col">
              <div className="">
                <UniversalLabel
                  text="SMPP Version"
                  id="versionedit"
                  name="versionedit"
                />
              </div>
              <div className="flex gap-4 mt-3">
                {/* Option 1 */}
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="versioneditOption1"
                    name="versioneditredio"
                    value="enable"
                    onChange={handleChangeVersionEditStatus}
                    checked={versioneditStatus === "enable"}
                  />
                  <label
                    htmlFor="versioneditOption1"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    3.3
                  </label>
                </div>
                {/* Option 2 */}
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="versioneditOption2"
                    name="versioneditredio"
                    value="disable"
                    onChange={handleChangeVersionEditStatus}
                    checked={versioneditStatus === "disable"}
                  />
                  <label
                    htmlFor="versioneditOption2"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    3.4
                  </label>
                </div>
              </div>
            </div>

            <InputField
              label="Host URL or IP Address"
              id="hostedit"
              name="hostedit"
              placeholder="Enter Host URL or IP Address"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <InputField
              label="User Name"
              id="usernameedit"
              name="usernameedit"
              placeholder="Enter User Name"
            />
            <InputField
              label="Password"
              id="passwordedit"
              name="passwordedit"
              placeholder="Enter Password"
            />
            <InputField
              label="Sending Port"
              id="sendingportedit"
              name="sendingportedit"
              placeholder="Enter Sending Port"
            />
            <InputField
              label="Receiver Port"
              id="receiverportedit"
              name="receiverportedit"
              placeholder="Enter Receiver Port"
            />
          </div>
          <h2 className="text-lg font-semibold">SMPP Server Settings :</h2>
          <div className="grid grid-cols-4 gap-4">
            <AnimatedDropdown
              label="Service Type"
              id="servicetypeedit"
              name="servicetypeedit"
              options={servicetypeoption}
              onChange={handleEditService}
            />
            <AnimatedDropdown
              label="Data Encoding"
              id="dataencodingedit"
              name="dataencodingedit"
              options={dataencodingoption}
              onChange={handleEditDataEncoding}
            />
            <InputField
              label="System Type"
              id="systemtypeedit"
              name="systemtypeedit"
              placeholder="Enter System Type"
            />
            <AnimatedDropdown
              label="Bind Mode"
              id="bindmodeedit"
              name="bindmodeedit"
              options={bindmodeoption}
              onChange={handleEditBindMode}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <AnimatedDropdown
              label="Total Sockets"
              id="totalsocketsedit"
              name="totalsocketsedit"
              placeholder="Enter Total Sockets"
              options={totalsocketseditoption}
              onChange={handleEditTotalSockets}
            />
            <InputField
              label="Number of Receivers"
              id="receiversedit"
              name="receiversedit"
              placeholder="Enter Number of Receivers"
            />
            <AnimatedDropdown
              label="Source"
              id="sourceedit"
              name="sourceedit"
              options={sourceoption}
              onChange={handleEditSource}
            />
            <AnimatedDropdown
              label="Destination"
              id="destinationedit"
              name="destinationedit"
              options={destinationoption}
              onChange={handleEditDestination}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <AnimatedDropdown
              label="Registered Delivery"
              id="registereddeliveryedit"
              name="registereddeliveryedit"
              options={registereddeliveryoption}
              onChange={handleEditRegisteredDelivery}
            />
            <InputField
              label="Sender Id Prefix"
              id="senderidprefixedit"
              name="senderidprefixedit"
              placeholder="Enter Sender Id Prefix"
            />
            <div className="flex flex-col">
              <div className="">
                <UniversalLabel text="TPS" id="tpedit" name="tpedit" />
              </div>
              <div className="flex gap-4 mt-3">
                {/* Option 1 */}
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="tpeditOption1"
                    name="tpeditredio"
                    value="enable"
                    onChange={handleChangetpEditStatus}
                    checked={tpeditStatus === "enable"}
                  />
                  <label
                    htmlFor="tpeditOption1"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Yes
                  </label>
                </div>
                {/* Option 2 */}
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="tpeditOption2"
                    name="tpeditredio"
                    value="disable"
                    onChange={handleChangetpEditStatus}
                    checked={tpeditStatus === "disable"}
                  />
                  <label
                    htmlFor="tpeditOption2"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            {tpeditStatus === "enable" && (
              <InputField
                label="TPS "
                id="tpeditvalue"
                name="tpeditvalue"
                placeholder="Enter TPS Value"
              />
            )}
          </div>

          <h2 className="text-lg font-semibold">Que Settings :</h2>
          <div className="grid grid-cols-4 gap-4">
            <InputField
              label="Order Size"
              id="ordersizeedit"
              name="ordersizeedit"
              placeholder="Enter Order Size"
            />
            <InputField
              label="Initial Size"
              id="initialsizeedit"
              name="initialsizeedit"
              placeholder="Enter Initial Size"
            />
            <InputField
              label="Trigger Size"
              id="triggersizeedit"
              name="triggersizeedit"
              placeholder="Enter Trigger Size"
            />
            <AnimatedDropdown
              label="Window Size"
              id="windowsizeedit"
              name="windowsizeedit"
              placeholder="Enter Window Size"
              options={windowsizeoption}
              onChange={handleEditWindowSize}
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

export default ManageSMPPTable;
