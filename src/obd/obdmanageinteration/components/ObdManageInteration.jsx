import React, { useState } from "react";
import { styled } from "@mui/material/styles";
// import CustomNoRowsOverlay from "../../../components/layout/CustomNoRowsOverlay";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import {
  Paper,
  Typography,
  Box,
  Button,
  Switch,
  IconButton,
} from "@mui/material";
import CustomTooltip from "../../../components/common/CustomTooltip";

import { MdOutlineDeleteForever } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import UniversalButton from "../../../whatsapp/components/UniversalButton";
import InputField from "../../../components/layout/InputField";
import { RadioButton } from "primereact/radiobutton";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-hot-toast";

const ObdManageIntegration = (id, data) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIntegrationName, setSelectedIntegrationName] = useState("");
  const [selectedEdit, setSelectedEdit] = useState("");
  const [integrationName, setIntegrationName] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState("");
  const [cta, setCta] = useState("");
  const [template, setTemplate] = useState("");
  const [savebtn, setSaveBtn] = useState("");
  const [addIntegration, setAddIntegration] = useState([]);
  const[addstatus,setAddStatus] = useState("");
  const[addCta,setAddCta] = useState();
  const[addtemplate,setAddTemplate] = useState("")

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [active, setActive] = useState();

  const handleChangeEnablePostpaid = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const handleDelete = (id, integrationName) => {
    setSelectedIntegrationName(integrationName);
    setIsVisible(true);
  };

  const handleEdit = (id, integrationName) => {
    setSelectedEdit(integrationName);
    setIsEdit(true);
  };

  const handleView = (id, integrationName) => {
    setSelectedIntegrationName;
    setIsView(true);
  };

  const addIntegrations = () => {
    setAddIntegration((prev) => [...prev, { id: Date.now(), value: " " }]);
  };

  const handleIntegrationChange = (id, newValue) => {
   
    setAddIntegration((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? { ...integration, value: newValue }
          : integration
      )
    );
  };

  const deleteIntegration = (id) => {
    setAddIntegration((prev) =>
      prev.filter((integration) => integration.id !== id)
    );
    try {
      // console.log(integrationName);
      toast.success("Integration deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "integrationName",
      headerName: "Integration Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "integrationtype",
      headerName: "Integration Type",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: () => (
        <CustomTooltip value={active}>
          <Switch
            onChange={(e) => setActive(e.target.value)}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#34C759",
              },
              "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                {
                  backgroundColor: "#34C759",
                },
            }}
          />
        </CustomTooltip>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit" placement="top" arrow>
            <IconButton
              onClick={(e) => handleEdit(e, params.row.integrationName)}
            >
              <EditNoteOutlinedIcon size={20} />
            </IconButton>
          </CustomTooltip>

          <CustomTooltip title="View" placement="top" arrow>
            <IconButton
              className="text-xs"
              onClick={(e) => handleView(e, params.row.integrationName)}
            >
              <VisibilityIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          </CustomTooltip>

          <CustomTooltip title="Delete" placement="top" arrow>
            <IconButton
              onClick={(event) =>
                handleDelete(event, params.row.integrationName)
              }
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

  const rows = [
    {
      id: 1,
      sn: 1,
      integrationName: "SMS Remainder",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      sn: 2,
      integrationName: "Webhook Demo",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 3,
      sn: 3,
      integrationName: "Webhook Demo",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 4,
      sn: 4,
      integrationName: "Voice Remainder",
      integrationtype: "Voice",
      status: "Active",
      action: "",
    },
    {
      id: 5,
      sn: 5,
      integrationName: "SMS Remainder",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 6,
      sn: 6,
      integrationName: "SMS Remainder",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 7,
      sn: 7,
      integrationName: "Voice Remainder",
      integrationtype: "Voice",
      status: "Active",
      action: "",
    },
    {
      id: 9,
      sn: 9,
      integrationName: "SMS Remainder",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 10,
      sn: 10,
      integrationName: "Webhook Demo",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 11,
      sn: 11,
      integrationName: "Voice Remainder",
      integrationtype: "Voice",
      status: "Active",
      action: "",
    },
    {
      id: 12,
      sn: 12,
      integrationName: "Webhook Demo",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 13,
      sn: 13,
      integrationName: "Webhook Demo",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 14,
      sn: 14,
      integrationName: "Voice Remainder",
      integrationtype: "Voice",
      status: "Active",
      action: "",
    },
    {
      id: 15,
      sn: 15,
      integrationName: "Webhook Demo",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 16,
      sn: 16,
      integrationName: "Voice Remainder",
      integrationtype: "Voice",
      status: "Active",
      action: "",
    },
    {
      id: 17,
      sn: 17,
      integrationName: "Voice Remainder",
      integrationtype: "Voice",
      status: "Active",
      action: "",
    },
    {
      id: 18,
      sn: 18,
      integrationName: "SMS Remainder",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 19,
      sn: 19,
      integrationName: "SMS Remainder",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 20,
      sn: 20,
      integrationName: "SMS Remainder",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
    {
      id: 21,
      sn: 21,
      integrationName: "SMS Remainder",
      integrationtype: "SMS",
      status: "Active",
      action: "",
    },
  ];

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
    <>
      <div className="mt-4">
        <Paper sx={{ height: 558 }}>
          <DataGrid
            id={id}
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
          header="Confirm Delete"
          visible={isVisible}
          onHide={() => setIsVisible(false)}
          className="lg:w-[30rem] md:w-[40rem] w-[17rem]"
          draggable={false}
        >
          <div className="flex items-center justify-center">
            <CancelOutlinedIcon
              sx={{ fontSize: 64, color: "ff3f3f" }}
              size={20}
            />
          </div>
          <div>
            <div className="p-4 text-center">
              <p className="text-[1.1rem] font-semibold text-gray-600">
                Are you sure ?
              </p>
              <p>
                Do you really want to delete <br />
                <span className="text-green-300">
                  '{selectedIntegrationName}'
                </span>
              </p>

              <div className="flex justify-center gap-4 mt-2">
                <UniversalButton
                  label="Cancel"
                  style={{
                    backgroundColor: "#090909",
                  }}
                  onClick={() => setIsVisible(false)}
                />
                <UniversalButton
                  label="Delete"
                  style={
                    {
                      // backgroundColor: "red",
                    }
                  }
                  onClick={() => setIsVisible(false)}
                />
              </div>
            </div>
          </div>
        </Dialog>

        <div className="bg-gray-400 flex flex-wrap justify-center items-center">
          <Dialog
            visible={isView}
            onHide={() => setIsView(false)}
            className="lg:w-[30rem] md:w-[40rem] w-[17rem]"
            draggable={false}
          >
            <div className="flex flex-wrap gap-4 sm:mt-5">
              <div className=" flex w-full  ">
                <InputField
                  label="Integration Name"
                 readOnly = "false"
                  placeholder="Integration name"
                />
              </div>
              <div className="flex flex-row gap-2">
                <div className="cursor-pointer  flex items-center gap-2 ">
                  <RadioButton
                    inputId="enablestaticOption1"
                    name="enablestaticdradio"
                    value="option1"
                    visible={isVisible}
                    checked={selectedOption === "option1"}
                    onChange={handleChangeEnablePostpaid}
                    onClick={() => setIsChecked(false)}
                  />
                  <label className="text-gray-600 font-semibold ">SMS</label>
                </div>

                <div className="cursor-pointer  flex items-center gap-2 ">
                  <RadioButton
                    inputId="enablestaticOption1"
                    name="enablestaticdradio"
                    value="option2"
                    visible={isVisible}
                    checked={selectedOption === "option2"}
                    onChange={handleChangeEnablePostpaid}
                    onClick={() => setIsChecked(false)}
                  />
                  <label className="text-gray-600 font-semibold ">Voice</label>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="w-full sm:46">
                  <InputField label="UserName" placeholder="UserName" readOnly = "false" />
                </div>
                <div className="w-auto">
                  <InputField label="ApiKey" placeholder="Api Key" readOnly = "false" />
                </div>
                <div className="w-auto">
                  <InputField label="Temp Id" placeholder="Temp Id" readOnly = "false" />
                </div>
                <div className="w-auto">
                  <InputField label="Sender Id" placeholder="Sender Id" readOnly = "false" />
                </div>
                <div className="w-auto ">
                  <InputField label="Entity Id" placeholder="Entity Id" readOnly = "false" />
                </div>

                <div className="w-full ">
                  <label className="text-xs">Insert PlaceHolder: Dear</label>
                  <InputField placeholder="Message Content" readOnly = "false" />
                  <label className="mt-2 text-xs">Chars: 0+0+0 = 0/1000 </label>
                </div>

               
              </div>
            </div>
          </Dialog>
        </div>

        <div className="bg-gray-600 ">
          <Dialog
            visible={isEdit}
            onHide={() => setIsEdit(false)}
            className="lg:w-[50rem] md:w-[40rem] w-[17rem]"
            draggable={false}
          >
            <div className="flex flex-wrap  items-center">
              <div className="flex justify-center items-center w-100">
                <InputField
                  label="Integration Name"
                  value={integrationName}
                  onChange={(e) => setIntegrationName(e.target.value)}
                  type="text"
                  placeholder="Enter integration name"
                />
              </div>
              <div className="flex flex-wrap gap-3  mt-4">
                <div className="w-full  sm:w-56">
                  <AnimatedDropdown
                    label="Status"
                    placeholder="Status"
                    id="integrationstatus"
                    name="integrationstatus"
                    options={[
                      { value: "On Success", label: "On Success" },
                      { value: "On Failure", label: "On Failure" },
                      { value: "DTMF Response", label: "DTMF Response" },
                    ]}
                    value={status}
                    onChange={(value) => setStatus(value)}
                  />
                </div>

                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    label="CTA"
                    placeholder="CTA"
                    id="integrationcta"
                    name="integrationcta"
                    options={[
                      { value: "CTA", label: "CTA" },
                      { value: "SMS", label: "SMS" },
                      { value: "Voice", label: "Voice" },
                      { value: "URL", label: "URL" },
                      { value: "Call Latch", label: "Call Latch" },
                    ]}
                    value={cta}
                    onChange={(value) => setCta(value)}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    label="Template"
                    placeholder="Template"
                    id="integrationtemplate"
                    name="integrationtemplate"
                    options={[
                      { value: "Template", label: "Template" },
                      { value: "Template 1", label: "Template 1" },
                      { value: "Template 2", label: "Template 2" },
                      { value: "Template 3", label: "Template 3" },
                      { value: "Template 4", label: "Template 4" },
                    ]}
                    value={template}
                    onChange={(value) => setTemplate(value)}
                  />
                </div>

                <div className="flex flex-wrap items-end gap-3 ">
                  <AddCircleOutlineIcon
                    className="text-gray-950 hover:text-gray-900"
                    onClick={addIntegrations}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              {addIntegration.map((entry) => (
                <div className="flex flex-wrap gap-3  items-center  mt-4">
                  <div className="flex flex-wrap gap-3 items-center" key={entry.id}>
                    <div className="w-full sm:w-56">
                      <AnimatedDropdown
                        label="Status"
                        name="integrationstatus"
                        id={`integrationStatus-${entry.id}`}
                        placeholder="Status"
                        value={entry.value}
                        options={[
                          { value: "On Success", label: "On Success" },
                          { value: "On Failure", label: "On Failure" },
                          { value: "DTMF Response", label: "DTMF Response" },
                        ]}
                        onChange={(value) =>
                          handleIntegrationChange(entry.id, value)
                        }
                      />
                    </div>
                    <div className="w-full sm:w-56">
                      <AnimatedDropdown
                        label="CTA"
                        placeholder="CTA"
                        id="integrationcta"
                        name="integrationcta"
                        options={[
                          { value: "CTA", label: "CTA" },
                          { value: "SMS", label: "SMS" },
                          { value: "Voice", label: "Voice" },
                          { value: "URL", label: "URL" },
                          { value: "Call Latch", label: "Call Latch" },
                        ]}
                        value={entry.value}
                        onChange={(value) =>
                          handleIntegrationChange(entry.id, value)
                        }
                      />
                    </div>

                    <div className="w-full sm:w-56">
                      <AnimatedDropdown
                        label="Template"
                        placeholder="Template"
                        id="integrationtemplate"
                        name="integrationtemplate"
                        options={[
                          { value: "Template", label: "Template" },
                          { value: "Template 1", label: "Template 1" },
                          { value: "Template 2", label: "Template 2" },
                          { value: "Template 3", label: "Template 3" },
                          { value: "Template 4", label: "Template 4" },
                        ]}
                        value={entry.value}
                        onChange={(value) =>
                          handleIntegrationChange(entry.id, value)
                        }
                      />
                    </div>
                  </div>

                  <button
                    className="rounded-2xl p-1.5 mt-5 hover:bg-gray-200 cursor-pointer"
                    onClick={() => deleteIntegration(entry.id)}
                  >
                    <MdOutlineDeleteForever
                      className="text-red-500 cursor-pointer hover:text-red-600"
                      size={20}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-row mt-5 justify-center gap-2">
              <UniversalButton
                id="obdintegrationsavebtn"
                name="obdintegrationsavebtn"
                label="Save"
                placeholder="Save"
                value={savebtn}
                onClick={() => setSaveBtn(value)}
              />
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ObdManageIntegration;
