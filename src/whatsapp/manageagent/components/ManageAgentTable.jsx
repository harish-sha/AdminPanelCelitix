import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Paper, Typography, Box, Switch, Button } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import UniversalButton from "../../components/UniversalButton";
import RadioGroupField from "../../components/RadioGroupField";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import {
  deleteAgentById,
  getAgentList,
  getWorkingHours,
  updateAgentStatus,
  saveWorkingHours
} from "../../../apis/Agent/Agent.js";
import CustomTooltip from "../../components/CustomTooltip";
import toast from "react-hot-toast";
import InputField from "../../components/InputField.jsx";
import GeneratePassword from "../../components/GeneratePassword.jsx";
import RadioGroupFieldupdown from "../../components/RadioGroupFieldupdown.jsx";

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    className={`w-11 h-6 flex items-center  rounded-full p-1 transition duration-300 ${checked ? "bg-blue-400" : "bg-gray-300"
      }`}
    onClick={() => onChange(!checked)}
  >
    <div
      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ${checked ? "translate-x-5" : ""
        }`}
    />
  </button>
);

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

const ManageAgentTable = ({ id, name, visible }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [reply, setReply] = useState(false);
  const [isActiveAgentOn, setIsActiveAgentOn] = useState(true);
  const [isInactiveAgentOn, setIsInactiveAgentOn] = useState(true);
  const [inactiveReply, setInactiveReply] = useState("");
  const [activeReply, setActiveReply] = useState("");
  const [ManageAssign, setManageAssign] = useState(false);
  const [selectwaba, setSelectWaba] = useState(null);
  const [value, setValue] = useState(0);
  const [agentList, setAgentList] = useState([]);

  const [manageagentedit, setManageAgentEdit] = useState(false);

  const [editagentname, setEditAgentName] = useState('');
  const [editagentmobile, setEditAgentMobile] = useState('');
  const [editagentemail, setEditAgentEmail] = useState('');



  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [selectedAgentName, setSelectedAgentName] = useState("");
  const [editselecteddepartment, setEditSelectedDepartment] = useState("");


  // Agent working hours and edit
  const [workingHoursDialog, setWorkingHoursDialog] = useState(false);
  const [workingHours, setWorkingHours] = useState({});
  const [isWorkingHoursEnabled, setIsWorkingHoursEnabled] = useState(true);

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });


  const departmentedit = [
    { label: 'Department 1', value: 'dept1' },
    { label: 'Department 2', value: 'dept2' },
    { label: 'Department 3', value: 'dept3' },
  ];

  const handleOpenDeleteDialog = (id, name) => {
    setSelectedAgentId(id);
    setSelectedAgentName(name);
    setDeleteDialogVisible(true);
  };

  const whatsappRedio = [
    { value: "option1", label: "Enable" },
    { value: "option2", label: "Disable" },
  ];

  const selectWABAOptions = [
    { label: "WABA 1", value: "WABA 1" },
    { label: "WABA 2", value: "WABA 2" },
    { label: "WABA 3", value: "WABA 3" },
    { label: "WABA 4", value: "WABA 4" },
    { label: "WABA 5", value: "WABA 5" },
  ];

  const top100Films = [
    { label: "Tamplate 1", value: "Tamplate 1" },
    { label: "Tamplate 2", value: "Tamplate 2" },
    { label: "Tamplate 3", value: "Tamplate 3" },
    { label: "Tamplate 4", value: "Tamplate 4" },
    { label: "Tamplate 5", value: "Tamplate 5" },
    { label: "Tamplate 6", value: "Tamplate 6" },
    { label: "Tamplate 7", value: "Tamplate 7" },
    { label: "Tamplate 8", value: "Tamplate 8" },
    { label: "Tamplate 9", value: "Tamplate 9" },
    { label: "Tamplate 10", value: "Tamplate 10" },
    { label: "Tamplate 11", value: "Tamplate 11" },
    { label: "Tamplate 12", value: "Tamplate 12" },
    { label: "Tamplate 13", value: "Tamplate 13" },
    { label: "Tamplate 14", value: "Tamplate 14" },
    { label: "Tamplate 15", value: "Tamplate 15" },
  ];

  // GET AGENT LIST
  useEffect(() => {
    const fetchAgentList = async () => {
      try {
        // setIsLoading(true);
        const response = await getAgentList();
        if (response?.data) {
          setAgentList(response.data);
        } else {
          console.error("Failed to fetch Agent details");
          toast.error("Failed to load Agent details!");
        }
      } catch (error) {
        console.error("Error fetching Agent list:", error);
        toast.error("Error fetching Agent list.");
      } finally {
        // setIsLoading(false);
      }
    };
    fetchAgentList();
  }, []);

  // Handle Agent Status Update
  const handleStatusChange = async (srNo, currentStatus) => {
    console.log(`Current status for agent ${srNo}:`, currentStatus);

    const agent = agentList.find((agent) => agent.sr_no === srNo);
    const agentName = agent ? agent.name : "Unknown Agent"; // Default to prevent undefined

    const newStatus = currentStatus === 1 ? true : false;
    console.log(`New status value to be sent for agent ${srNo}:`, newStatus);

    try {
      const response = await updateAgentStatus(srNo, newStatus);
      console.log("API response:", response);

      if (response?.statusCode === 200) {
        setAgentList((prevAgents) =>
          prevAgents.map((agent) =>
            agent.sr_no === srNo
              ? { ...agent, status: currentStatus === 1 ? 0 : 1 }
              : agent
          )
        );

        toast.success(`${agentName} status updated successfully`);
      } else {
        console.error("Failed to update agent status");
      }
    } catch (error) {
      console.error("Error updating agent status:", error);
    }
  };

  // openWorkingHourDialog
  const handleOpenWorkingHoursDialog = async (agentId, agentName) => {
    setSelectedAgentId(agentId);
    setSelectedAgentName(agentName);
    setWorkingHoursDialog(true);
    setWorkingHours(null);

    try {
      const response = await getWorkingHours(agentId);
      if (response?.statusCode === 200) {
        if (response.data.length > 0) {
          const newWorkingHours = {
            Monday: { enabled: false, start: null, end: null },
            Tuesday: { enabled: false, start: null, end: null },
            Wednesday: { enabled: false, start: null, end: null },
            Thursday: { enabled: false, start: null, end: null },
            Friday: { enabled: false, start: null, end: null },
            Saturday: { enabled: false, start: null, end: null },
            Sunday: { enabled: false, start: null, end: null },
          };

          response.data.forEach((entry) => {
            const dayMap = {
              1: "Monday",
              2: "Tuesday",
              3: "Wednesday",
              4: "Thursday",
              5: "Friday",
              6: "Saturday",
              7: "Sunday",
            };

            const dayName = dayMap[entry.day];
            if (dayName) {
              newWorkingHours[dayName] = {
                enabled: entry.status === 1,
                start: dayjs(entry.fromTime, "HH:mm:ss"),
                end: dayjs(entry.toTime, "HH:mm:ss"),
              };
            }
          });

          setWorkingHours(newWorkingHours);
        } else {
          // setWorkingHours(null);
          setWorkingHours({
            Monday: { enabled: false, start: null, end: null },
            Tuesday: { enabled: false, start: null, end: null },
            Wednesday: { enabled: false, start: null, end: null },
            Thursday: { enabled: false, start: null, end: null },
            Friday: { enabled: false, start: null, end: null },
            Saturday: { enabled: false, start: null, end: null },
            Sunday: { enabled: false, start: null, end: null },
          });
        }
      } else {
        toast.error("Failed to load working hours.");
        setWorkingHours(null);
      }
    } catch (error) {
      toast.error("Error fetching working hours.");
      setWorkingHours(null);
    }
  };

  // Save agent working hour 
  const handleSaveWorkingHours = async () => {
    const schedule = {};
    let hasValidationError = false;

    Object.keys(workingHours).forEach((day) => {
      if (workingHours[day].enabled) {
        if (!workingHours[day].start || !workingHours[day].end) {
          hasValidationError = true;
        }
        schedule[day.toLowerCase()] = {
          starttime: workingHours[day].start ? workingHours[day].start.format("HH:mm") : null,
          endTime: workingHours[day].end ? workingHours[day].end.format("HH:mm") : null,
          status: 1,
        };
      } else {
        schedule[day.toLowerCase()] = {
          starttime: null,
          endTime: null,
          status: 0,
        };
      }
    });

    if (hasValidationError) {
      toast.error("Please assign hours to all enabled days before saving.");
      return;
    }

    try {
      const response = await saveWorkingHours(selectedAgentId, schedule);
      if (response?.statusCode === 200) {
        toast.success("Working hours saved successfully!");
        setWorkingHoursDialog(false);
      } else {
        toast.error("Failed to save working hours.");
      }
    } catch (error) {
      toast.error("Error saving working hours.");
    }
  };

  // Handle Delete Agent
  const handleDeleteAgent = async () => {
    if (!selectedAgentId) return;

    try {
      const response = await deleteAgentById(selectedAgentId);

      if (response?.statusCode === 200) {
        setAgentList((prevAgents) =>
          prevAgents.filter((agent) => agent.sr_no !== selectedAgentId)
        );

        toast.success(`${selectedAgentName} deleted successfully!`);

        setDeleteDialogVisible(false);
      } else {
        toast.error(`Failed to delete ${selectedAgentName}`);
      }
    } catch (error) {
      toast.error(`Error deleting ${selectedAgentName}`);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleReply = () => {
    setReply(true);
    console.log("reply");
  };

  const handleAssign = () => {
    setManageAssign(true);
    console.log("Assign");
  };

  const handleEdit = () => {
    setManageAgentEdit(true);
    console.log("Edit");
  };


  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 120 },
    { field: "mobile", headerName: "Mobile No", flex: 1, minWidth: 120 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip
          arrow
          placement="top"
          title={params.value === 1 ? "Active" : "Inactive"}
        >
          <Switch
            checked={params.value === 1}
            onChange={() => handleStatusChange(params.row.id, params.value)}
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
      field: "department_name",
      headerName: "Department Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Auto Reply" placement="top">
            <IconButton onClick={() => handleReply(params.row)}>
              <ReplyIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip placement="top" arrow title="Working Hours">
            <IconButton onClick={() => handleOpenWorkingHoursDialog(params.row.id, params.row.name)}>
              <AccessTimeOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip placement="top" arrow title="Assign">
            <IconButton onClick={() => handleAssign(params.row)}>
              <SettingsOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip placement="top" arrow title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip placement="top" arrow title="Delete">
            <IconButton
              className="no-xs"
              onClick={() =>
                handleOpenDeleteDialog(params.row.id, params.row.name)
              }
            >
              <DeleteForeverIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "#e31a1a",
                }}
              />
            </IconButton>
          </CustomTooltip>

        </>
      ),
    },
  ];

  const rows = agentList.map((agent, index) => ({
    id: agent.sr_no, // Using sr_no as unique ID
    // id: index + 1,
    sn: index + 1,
    name: agent.name,
    email: agent.email,
    mobile: agent.mobileNo,
    department_name: agent.department_name,
    status: agent.status,
  }));

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        {/* Table Start */}
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
            // checkboxSelection
            rowHeight={45}
            slots={{ footer: CustomFooter }}
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
        {/* Table End */}


        {/* Auto Reply start */}
        <Dialog
          header="Auto-reply"
          draggable={false}
          visible={reply}
          className="w-[35rem]"
          onHide={() => setReply(false)}
        >
          {/* Active Agent Auto-Reply Section */}
          <div className="mb-4">
            <div className="flex justify-between items-center bg-[#E6F4FF] text-blue-800 px-3 py-2 rounded-t">
              <span className="text-sm font-semibold">
                Active Agent Auto-Reply
              </span>
              <ToggleSwitch
                checked={isActiveAgentOn}
                onChange={setIsActiveAgentOn}
              />
            </div>
            {isActiveAgentOn && (
              <div className="p-3 border border-gray-300 rounded-b">
                <InputText
                  placeholder="Set Auto Reply"
                  value={activeReply}
                  onChange={(e) => setActiveReply(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            )}
          </div>

          {/* Inactive Agent Auto-Reply Section */}
          <div className="mb-2">
            <div className="flex justify-between items-center bg-[#E6F4FF] text-blue-800 px-3 py-2 rounded-t">
              <span className="text-sm font-semibold">
                Inactive Agent Auto-Reply
              </span>
              <ToggleSwitch
                checked={isInactiveAgentOn}
                onChange={setIsInactiveAgentOn}
              />
            </div>
            {isInactiveAgentOn && (
              <div className="p-3 border border-gray-300 rounded-b">
                <InputText
                  placeholder="Set Auto Reply"
                  value={inactiveReply}
                  onChange={(e) => setInactiveReply(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        </Dialog>
        {/* Auto Reply end */}


        {/* Manage agents working hours start */}
        <Dialog
          header={`Working Hours - ${selectedAgentName}`}
          visible={workingHoursDialog}
          onHide={() => setWorkingHoursDialog(false)}
          className="w-[40rem]"
          draggable={false}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="space-y-2">
              {/* ✅ If working hours are not assigned, show a message + Assign Now button */}
              {workingHours === null ? (
                <div className="flex flex-col items-center justify-center text-gray-500 text-lg space-y-5 mt-5">
                  <p>{selectedAgentName} has not assigned working hours</p>
                  <button
                    className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-500 cursor-pointer text-[1rem]"
                    onClick={() =>
                      setWorkingHours({
                        Monday: { enabled: false, start: null, end: null },
                        Tuesday: { enabled: false, start: null, end: null },
                        Wednesday: { enabled: false, start: null, end: null },
                        Thursday: { enabled: false, start: null, end: null },
                        Friday: { enabled: false, start: null, end: null },
                        Saturday: { enabled: false, start: null, end: null },
                        Sunday: { enabled: false, start: null, end: null },
                      })
                    }
                  >
                    Assign Now
                  </button>
                </div>
              ) : (
                Object.keys(workingHours).map((day) => (
                  <div
                    key={day}
                    className="flex items-center flex-wrap justify-between bg-white shadow-md gap-2 p-2 rounded-lg"
                  >
                    {/* Toggle Open/Closed */}
                    <div className="flex items-center space-x-2">
                      <Switch
                        sx={{
                          "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                          {
                            backgroundColor: "#34C759",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#34C759",
                          },
                        }}
                        checked={workingHours[day].enabled}
                        onChange={() =>
                          setWorkingHours((prev) => ({
                            ...prev,
                            [day]: { ...prev[day], enabled: !prev[day].enabled },
                          }))
                        }
                      />
                      <span className="font-semibold text-blue-600 text-sm">{day}</span>
                    </div>

                    {/* Time Inputs when Enabled */}
                    {workingHours[day].enabled ? (
                      <div className="flex gap-2">
                        <TimePicker
                          value={workingHours[day].start}
                          onChange={(newTime) =>
                            setWorkingHours((prev) => ({
                              ...prev,
                              [day]: { ...prev[day], start: newTime },
                            }))
                          }
                          ampm
                          className="w-35 text-xs"
                        />
                        <TimePicker
                          value={workingHours[day].end}
                          onChange={(newTime) =>
                            setWorkingHours((prev) => ({
                              ...prev,
                              [day]: { ...prev[day], end: newTime },
                            }))
                          }
                          ampm
                          className="w-35 text-xs"
                        />
                      </div>
                    ) : (
                      <div className="w-10 flex p-2 pr-10 justify-center items-center">
                        <span className="text-gray-400 text-sm font-semibold">
                          Closed
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}


              {/* ✅ Show Save Button only if there are working hours to update */}
              {workingHours !== null && (
                <div className="flex justify-center mt-4">
                  <UniversalButton
                    label="Save"
                    id="workingHoursSave"
                    name="workingHoursSave"
                    onClick={handleSaveWorkingHours}
                  />
                </div>
              )}
            </div>

          </LocalizationProvider>
        </Dialog >
        {/* Manage agents working hours End */}


        {/* Assign Template to agent start */}
        <Dialog
          header="WhatsApp"
          visible={ManageAssign}
          onHide={() => setManageAssign(false)}
          className="w-[50rem]"
          draggable={false}
          modal
        >
          <div className="p-4 space-y-4">
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Manage Assign Tabs"
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab
                  label={
                    <span>
                      <WhatsAppIcon size={20} /> WhatsApp
                    </span>
                  }
                  {...a11yProps(0)}
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
                {/* <Tab
                            label={
                                <span>
                                    <LibraryBooksOutlinedIcon size={20} /> Library
                                </span>
                            }
                            {...a11yProps(1)}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'primary.main',
                                    backgroundColor: '#f0f4ff',
                                    borderRadius: '8px',
                                },
                            }}
                        /> */}
              </Tabs>
              <CustomTabPanel value={value} index={0} className="">
                <RadioGroupField
                  options={whatsappRedio}
                  id="whatsappredio"
                  name="whatsappredio"
                />

                <div className="w-full flex flex-wrap gap-2 space-y-2">
                  <div className="flex-1">
                    <AnimatedDropdown
                      options={selectWABAOptions}
                      id="selectWABA"
                      name="selectWABA"
                      value={selectwaba}
                      onChange={(value) => setSelectWaba(value)}
                    />
                  </div>

                  <div className="flex-1">
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={top100Films}
                      getOptionLabel={(option) => option.label}
                      // defaultValue={[top100Films[13]]}
                      disableCloseOnSelect
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // label="filterSelectedOptions"
                          placeholder="Search Templates"
                        />
                      )}
                    />
                  </div>
                </div>
              </CustomTabPanel>
              {/* <CustomTabPanel value={value} index={1}>
                        hello world 2
                    </CustomTabPanel> */}
            </Box>

            {/* Save Button */}
            <div className="flex justify-center">
              <Button label="Save" className="p-button-primary" />
            </div>
          </div>
        </Dialog >
        {/* Assign Template to agent End */}


        {/* Edit Agent Start */}
        <Dialog
          header="Edit Agent Profile"
          visible={manageagentedit}
          onHide={() => setManageAgentEdit(false)}
          className="w-[40rem]"
          draggable={false}
          modal
        >
          <div className='space-y-3'>
            {/* Agent Name */}
            <InputField
              label="Agent Name"
              id="editagentname"
              name="editagentname"
              value={editagentname}
              onChange={(e) => setEditAgentName(e.target.value)}
              type="text"
              placeholder="Enter Agent Name"
            />
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-3'>
              {/* Agent Email */}
              <InputField
                label="Agent Email"
                id="editagentemail"
                name="editagentemail"
                value={editagentemail}
                onChange={(e) => setEditAgentEmail(e.target.value)}
                type="email"
                placeholder="Enter Email ID"
                placement="right"
                tooltipContent="Email ID shouldn't same from existing agent"
              />
              {/* Agent Mobile */}
              <InputField
                label="Mobile"
                id="editagentmobile"
                name="editagentmobile"
                value={editagentmobile}
                onChange={(e) => setEditAgentMobile(e.target.value)}
                type="number"
                placeholder="Enter Mobile Number"
                placement="right"
                tooltipContent="Phone no shouldn't same from existing agent"
              />
            </div>

            <GeneratePassword
              id="editgeneratepassword"
              name="editgeneratepassword"
              label="Generate Password"
              placeholder="Enter Password"
            />

            <div className='mb-2'>
              <AnimatedDropdown
                label="Department"
                id="departmentedit"
                name="departmentedit"
                options={departmentedit}
                value={editselecteddepartment}
                onChange={(value) => setEditSelectedDepartment(value)}
              />
            </div>
            <RadioGroupFieldupdown
              id="editassign"
              name="editassign"
              label="Assign"
              options={[
                { label: 'Auto', value: 'Auto' },
                { label: 'Manual', value: 'Manual' },
                { label: 'All', value: 'All' }
              ]}
            />
            <div className='flex justify-center mt-2'>
              <UniversalButton
                label="Submit"
                id="editsubmit"
                name="editsubmit"
                variant="primary"
              />
            </div>

          </div>
        </Dialog >
        {/* Edit Agent End */}


        {/* Delete Agent Start */}
        <Dialog
          header="Confirm Deletion"
          visible={deleteDialogVisible}
          onHide={() => setDeleteDialogVisible(false)}
          className="w-[30rem]"
          draggable={false}
        >
          <div className="flex items-center justify-center">
            {/* <ErrorOutlineOutlinedIcon
            sx={{
              fontSize: 64,
            }}
          /> */}
            <CancelOutlinedIcon
              sx={{
                fontSize: 64,
                color: '#ff3f3f'
              }}
            />
          </div>
          <div className="text-center p-4">
            <p className="text-[1.1rem] font-semibold text-gray-700">
              Are you sure you want to delete the agent <br />
              <span className="text-green-500">"{selectedAgentName}"</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This action is irreversible.
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-2">
            <UniversalButton
              label="Cancel"
              style={{
                backgroundColor: "#090909",
              }}
              onClick={() => setDeleteDialogVisible(false)}
            />
            <UniversalButton
              label="Delete"
              style={{
                // backgroundColor: "red",
              }}
              onClick={handleDeleteAgent}
            />
          </div>
        </Dialog>
        {/* Delete Agent End */}


      </LocalizationProvider >

    </>
  );
};

export default ManageAgentTable;
