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
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
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
  saveWorkingHours,
  getTemplateList,
  saveCheckedAssignTemplate,
  getAssignedTemplatesByAgentId,
  updateAgentDetails,
} from "../../../apis/Agent/Agent.js";
import CustomTooltip from "../../components/CustomTooltip";
import toast from "react-hot-toast";
import InputField from "../../components/InputField.jsx";
import GeneratePassword from "../../components/GeneratePassword.jsx";
import RadioGroupFieldupdown from "../../components/RadioGroupFieldupdown.jsx";
import { getWabaList } from "../../../apis/whatsapp/whatsapp.js";
import { RadioButton } from "primereact/radiobutton";
import UniversalLabel from "../../components/UniversalLabel.jsx";

import { FaTrash } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    className={`w-11 h-6 flex items-center  rounded-full p-1 transition duration-300 ${
      checked ? "bg-blue-400" : "bg-gray-300"
    }`}
    onClick={() => onChange(!checked)}
  >
    <div
      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ${
        checked ? "translate-x-5" : ""
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

const ManageAgentTable = ({
  id,
  name,
  visible,
  deptList = [],
  refresh,
  setRefresh,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState(false);

  // handle reply
  const [reply, setReply] = useState(false);
  const [isActiveAgentOn, setIsActiveAgentOn] = useState(true);
  const [isInactiveAgentOn, setIsInactiveAgentOn] = useState(true);
  const [inactiveReply, setInactiveReply] = useState("");
  const [activeReply, setActiveReply] = useState("");

  // handle assign
  const [ManageAssign, setManageAssign] = useState(false);
  const [value, setValue] = useState(0);
  const [agentList, setAgentList] = useState([]);
  const [manageagentedit, setManageAgentEdit] = useState(false);

  // Agent
  const [updateAgentData, setUpdateAgentData] = useState({
    sr_no: "",
    user_sr_no: "",
    email: "",
    password: "",
    name: "",
    mobileNumber: "",
    status: "",
    allowAllChats: 0,
    department: null,
    departmentId: "",
    departmentName: "",
    agentCode: "",
  });
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [selectedAgentName, setSelectedAgentName] = useState("");

  // department
  const [editselecteddepartment, setEditSelectedDepartment] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  // Agent working hours and edit
  const [workingHoursDialog, setWorkingHoursDialog] = useState(false);
  const [workingHours, setWorkingHours] = useState({});
  const [isWorkingHoursEnabled, setIsWorkingHoursEnabled] = useState(true);

  const [wabaList, setWabaList] = useState([]);
  const [wabaTemplates, setWabaTemplates] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [selectedWaba, setSelectedWaba] = useState(null);
  const [selectedOption, setSelectedOption] = useState("option2");
  const [isSaving, setIsSaving] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const departmentedit = [
    { label: "Department 1", value: "dept1" },
    { label: "Department 2", value: "dept2" },
    { label: "Department 3", value: "dept3" },
  ];

  const handleOpenDeleteDialog = (id, name) => {
    setSelectedAgentId(id);
    setSelectedAgentName(name);
    setDeleteDialogVisible(true);
  };

  const fetchAgentList = async () => {
    try {
      // setIsLoading(true);
      const response = await getAgentList();
      if (response?.data) {
        setAgentList(response.data);
        setRefresh(false);
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
  // GET AGENT LIST
  useEffect(() => {
    // console.log("useEffect");
    fetchAgentList();
  }, [refresh]);

  // ================================================

  // GET WABA LIST
  useEffect(() => {
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();
        if (response) {
          setWabaList(response);
        } else {
          console.error("Failed to fetch WABA details");
          toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        console.error("Error fetching WABA list:", error);
        toast.error("Error fetching WABA list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWabaList();
  }, []);

  // Fetch template list when a WABA is selected
  useEffect(() => {
    if (selectedWaba) {
      const fetchTemplateList = async () => {
        setIsLoading(true);
        const templates = await getTemplateList(selectedWaba);
        setTemplateList(templates);
        setIsLoading(false);
      };
      fetchTemplateList();
    } else {
      setTemplateList([]);
    }
  }, [selectedWaba]);

  const addWabaSelection = () => {
    setWabaTemplates((prev) => [
      ...prev,
      { wabaSrno: null, templates: [], templateList: [] },
    ]);
  };

  const handleWabaChange = async (index, wabaSrno) => {
    try {
      setIsLoading(true);
      // Fetch available templates for the selected WABA
      const templateList = await getTemplateList(wabaSrno);

      setWabaTemplates((prev) => {
        const updatedTemplates = [...prev];
        updatedTemplates[index] = {
          wabaSrno,
          templates: prev[index]?.templates || [], // Keep previously assigned templates
          templateList,
        };
        return updatedTemplates;
      });
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("Error fetching template list.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle template selection
  const handleTemplateChange = (index, selectedTemplates) => {
    const updatedWabaTemplates = [...wabaTemplates];
    updatedWabaTemplates[index].templates = selectedTemplates;
    setWabaTemplates(updatedWabaTemplates);
  };

  const removeWabaSelection = (index) => {
    if (wabaTemplates.length === 1) {
      toast.error("At least one WABA selection is required.");
      return;
    }
    setWabaTemplates(wabaTemplates.filter((_, i) => i !== index));
  };

  // =====================================

  // Handle Agent Status Update
  const handleStatusChange = async (srNo, currentStatus) => {
    const agent = agentList.find((agent) => agent.sr_no === srNo);
    const agentName = agent ? agent.name : "Unknown Agent"; // Default to prevent undefined

    try {
      const response = await updateAgentStatus(srNo, Number(currentStatus));

      if (response?.statusCode === 200) {
        await fetchAgentList();

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
    let error = "";

    Object.keys(workingHours).forEach((day) => {
      if (workingHours[day].enabled) {
        if (!workingHours[day].start || !workingHours[day].end) {
          hasValidationError = true;
          error = "Please assign hours to all enabled days before saving.";
          return;
        }
        if (
          workingHours[day]?.start?.format("HH:mm") >
          workingHours[day]?.end?.format("HH:mm")
        ) {
          hasValidationError = true;
          error = "Start time cannot be greater than end time.";
          return;
        }
        if (
          workingHours[day]?.start?.format("HH:mm") ==
          workingHours[day]?.end?.format("HH:mm")
        ) {
          hasValidationError = true;
          error = "Start time and end time cannot be same.";
          return;
        }
        schedule[day.toLowerCase()] = {
          starttime: workingHours[day].start
            ? workingHours[day].start.format("HH:mm")
            : null,
          endTime: workingHours[day].end
            ? workingHours[day].end.format("HH:mm")
            : null,
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
      toast.error(error);
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
  };

  // const handleAssign = (row) => {
  //   setSelectedAgentId(row.id);
  //   setSelectedAgentName(row.name);
  //   setWabaTemplates([{ wabaSrno: null, templates: [], templateList: [] }]);
  //   setManageAssign(true);
  // };

  const handleAssign = async (row) => {
    if (!row || !row.id) {
      toast.error("No agent selected.");
      return;
    }

    setSelectedAgentId(row.id);
    setSelectedAgentName(row.name);
    setManageAssign(true);
    setIsLoading(true);

    try {
      // Fetch assigned templates for the selected agent
      const response = await getAssignedTemplatesByAgentId(row.id);

      // Ensure response data exists and is an array
      if (!response || !Array.isArray(response)) {
        toast.error("Unexpected API response format.");
        setWabaTemplates([{ wabaSrno: null, templates: [], templateList: [] }]);
        return;
      }

      if (response.length > 0) {
        const formattedAssignments = await Promise.all(
          response.map(async (entry) => {
            const availableTemplates = await getTemplateList(entry.wabaSrNo);

            // Extract assigned templates
            const assignedTemplates = entry.templates.map((t) => {
              const matchedTemplate = availableTemplates.find(
                (temp) => temp.sr_no === t.templateSrNo
              );
              return {
                sr_no: t.templateSrNo,
                template_name: matchedTemplate
                  ? matchedTemplate.template_name
                  : `Template ${t.templateSrNo}`,
              };
            });

            return {
              wabaSrno: entry.wabaSrNo,
              templates: assignedTemplates,
              templateList: availableTemplates, // All available templates for this WABA
            };
          })
        );
        setWabaTemplates(formattedAssignments);
      } else {
        setWabaTemplates([{ wabaSrno: null, templates: [], templateList: [] }]);
      }
    } catch (error) {
      console.error("Error fetching assigned templates:", error);
      toast.error("Error fetching assigned templates.");
      setWabaTemplates([{ wabaSrno: null, templates: [], templateList: [] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (data) => {
    setManageAgentEdit(true);
    setUpdateAgentData({
      email: data.email,
      password: data.password,
      name: data.name,
      mobileNumber: data.mobile,
      allowAllChats: parseInt(data.allowAllChats, 10),
      departmentId: data.departmentId,
    });
    setSelectedAgentId(data);
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 10 },
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
          title={params.row.status === 1 ? "Active" : "Inactive"}
        >
          <Switch
            checked={params.row.status}
            // value={setUpdateStatus}
            onChange={(e) => {
              handleStatusChange(params.row.id, e.target.checked);
            }}
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
          {/* <CustomTooltip arrow title="Auto Reply" placement="top">
            <IconButton onClick={() => handleReply(params.row)}>
              <ReplyIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip> */}
          <CustomTooltip placement="top" arrow title="Working Hours">
            <IconButton
              onClick={() =>
                handleOpenWorkingHoursDialog(params.row.id, params.row.name)
              }
            >
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
    user_sr_no: agent.userSrNo,
    departmentId: agent.department_srno,
    allowAllChats: agent.allowAllChats,
  }));

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const handleAgentUpdate = async () => {
    const departName = deptList.find(
      (item) => item.departmentId == updateAgentData.departmentId
    );

    const data = {
      ...updateAgentData,
      sr_no: selectedAgentId.id,
      user_sr_no: selectedAgentId.user_sr_no,
      departmentName: departName.departmentName,
    };

    try {
      const res = await updateAgentDetails(data);
      if (res.statusCode === 500) {
        toast.error("Mobile number already exists.");
        return;
      }
      toast.success("Agent details updated successfully.");
      await fetchAgentList();
      setManageAgentEdit(false);

      // setEditSelectedDepartment
    } catch (error) {
      toast.error("Error updating agent details.");
    }
  };

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

  const handleChangeOption = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  // Save API call
  const handleSaveAssignments = async () => {
    if (!selectedAgentId) {
      toast.error("No agent selected.");
      return;
    }

    if (wabaTemplates.length === 0) {
      toast.error("Please assign at least one WABA and template.");
      return;
    }

    const requestData = wabaTemplates
      .filter((entry) => entry.wabaSrno && entry.templates.length > 0)
      .map((entry) => ({
        wabaSrNo: entry.wabaSrno.toString(),
        templateList: entry.templates.map((t) => t.sr_no.toString()),
      }));

    if (requestData.length === 0) {
      toast.error("No valid WABA-Template pairs to save.");
      return;
    }

    try {
      setIsSaving(true);

      const response = await saveCheckedAssignTemplate(
        selectedAgentId,
        requestData
      );

      if (response?.statusCode === 200) {
        toast.success("Templates assigned successfully!");
        setManageAssign(false); // Close the dialog
      } else {
        toast.error("Failed to assign templates.");
      }
    } catch (error) {
      console.error("Error saving assignments:", error);
      toast.error("Error saving assignments.");
    } finally {
      setIsSaving(false);
    }
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
        {/* <Dialog
          header="Auto-reply"
          draggable={false}
          visible={reply}
          className="w-[35rem]"
          onHide={() => setReply(false)}
        >
          <div className="mb-4">
            <div className="flex bg-[#E6F4FF] justify-between rounded-t text-blue-800 items-center px-3 py-2">
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
          <div className="mb-2">
            <div className="flex bg-[#E6F4FF] justify-between rounded-t text-blue-800 items-center px-3 py-2">
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
        </Dialog> */}
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
              {/* If working hours are not assigned, show a message + Assign Now button */}
              {workingHours === null ? (
                <div className="flex flex-col items-center justify-center mt-5 space-y-5 text-lg text-gray-500">
                  <p>{selectedAgentName} has not assigned working hours</p>
                  <button
                    className="bg-blue-400 rounded-md text-[1rem] text-white cursor-pointer hover:bg-blue-500 px-3 py-2"
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
                    className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white rounded-lg shadow-md"
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
                            [day]: {
                              ...prev[day],
                              enabled: !prev[day].enabled,
                            },
                          }))
                        }
                      />
                      <span className="text-sm font-semibold text-blue-600">
                        {day}
                      </span>
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
                          className="text-xs w-35"
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
                          className="text-xs w-35"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-10 p-2 pr-10">
                        <span className="text-sm font-semibold text-gray-400">
                          Closed
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}

              {/*  Show Save Button only if there are working hours to update */}
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
        </Dialog>
        {/* Manage agents working hours End */}

        {/* Assign Template to agent start */}
        <Dialog
          // header="WhatsApp"
          visible={ManageAssign}
          onHide={() => setManageAssign(false)}
          header={`Assign Templates - ${selectedAgentName}`}
          // visible={visible}
          // onClose

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
                {/* <div className="flex flex-wrap gap-4 mt-2 mb-5 sm:grid-cols-2">
                  <div className="flex items-center justify-center gap-2 cursor-pointer" >
                    <RadioButton
                      inputId="radioOption1"
                      name="radioGroup"
                      value="option1"
                      onChange={handleChangeOption}
                      checked={selectedOption === 'option1'}
                    />
                    <label htmlFor="radioOption1" className="text-sm font-medium text-gray-700 cursor-pointer">Enable</label>
                  </div>
                  <div className="flex items-center justify-center gap-2" >
                    <RadioButton
                      inputId="radioOption2"
                      name="radioGroup"
                      value="option2"
                      onChange={handleChangeOption}
                      checked={selectedOption === 'option2'}
                    />
                    <label htmlFor="radioOption2" className="text-sm font-medium text-gray-700 cursor-pointer">Disable</label>
                  </div>
                </div> */}
                <div className="flex flex-col w-full gap-4">
                  {wabaTemplates.map((entry, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap border border-gray-200 p-2.5 rounded-md gap-2 items-end relative transition-all"
                    >
                      {/* WABA Selection Dropdown */}
                      <div className="flex-1">
                        <AnimatedDropdown
                          id={`selectWABA-${index}`}
                          name={`selectWABA-${index}`}
                          label="Select WABA"
                          tooltipContent="Select your WhatsApp Business Account"
                          tooltipPlacement="right"
                          value={entry.wabaSrno}
                          options={wabaList.map((waba) => ({
                            value: waba.wabaSrno,
                            label: waba.name,
                          }))}
                          onChange={(value) => handleWabaChange(index, value)}
                        />
                      </div>
                      <div className="flex-1">
                        <UniversalLabel
                          text="Select Template"
                          tooltipContent="Select templates to assign"
                          tooltipPlacement="right"
                          className="block text-sm font-medium text-gray-700"
                        />
                        <Autocomplete
                          multiple
                          id={`template-selector-${index}`}
                          options={entry.templateList}
                          getOptionLabel={(option) => option.template_name}
                          disableCloseOnSelect
                          filterSelectedOptions
                          value={entry.templates}
                          onChange={(_, newValue) =>
                            handleTemplateChange(index, newValue)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Search Templates"
                            />
                          )}
                          className="overflow-y-scroll max-h-[5rem]"
                        />
                      </div>
                      <button
                        onClick={() => removeWabaSelection(index)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <MdOutlineDeleteForever
                          className="text-red-500 cursor-pointer hover:text-red-600"
                          size={22}
                        />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={addWabaSelection}
                      className="px-4 py-2 text-sm text-white transition bg-blue-400 rounded-md cursor-pointer w-max hover:bg-blue-500"
                    >
                      Add More
                    </button>
                    <button
                      onClick={handleSaveAssignments}
                      className="px-4 py-2 text-sm text-white transition bg-blue-400 rounded-md cursor-pointer w-max hover:bg-blue-500"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </CustomTabPanel>
              {/* <CustomTabPanel value={value} index={1}>
                hello world 2
              </CustomTabPanel> */}
            </Box>
          </div>
        </Dialog>
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
          <div className="space-y-3">
            {/* Agent Name */}
            <InputField
              label="Agent Name"
              id="editagentname"
              name="editagentname"
              value={updateAgentData.name}
              onChange={(e) =>
                setUpdateAgentData({ ...updateAgentData, name: e.target.value })
              }
              type="text"
              placeholder="Enter Agent Name"
            />
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {/* Agent Email */}
              <InputField
                label="Agent Email"
                id="editagentemail"
                name="editagentemail"
                value={updateAgentData.email}
                onChange={(e) => {
                  setUpdateAgentData({
                    ...updateAgentData,
                    email: e.target.value,
                  });
                }}
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
                value={updateAgentData.mobileNumber}
                onChange={(e) => {
                  setUpdateAgentData({
                    ...updateAgentData,
                    mobileNumber: e.target.value,
                  });
                }}
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
              value={updateAgentData.password}
              onChange={(e) => {
                setUpdateAgentData({
                  ...updateAgentData,
                  password: e,
                });
              }}
            />

            <div className="mb-2">
              <AnimatedDropdown
                label="Department"
                id="departmentedit"
                name="departmentedit"
                options={deptList.map((item) => ({
                  label: item.departmentName,
                  value: item.departmentId,
                }))}
                value={updateAgentData.departmentId}
                onChange={(value) => {
                  setUpdateAgentData({
                    ...updateAgentData,
                    departmentId: value,
                  });
                }}
              />
            </div>
            <RadioGroupFieldupdown
              id="editassign"
              name="editassign"
              label="Assign"
              options={[
                { label: "Auto", value: 0 },
                { label: "Manual", value: 1 },
                { label: "All", value: 2 },
              ]}
              value={updateAgentData.allowAllChats}
              onChange={(e) => {
                setUpdateAgentData({
                  ...updateAgentData,
                  allowAllChats: parseInt(e.target.value, 10),
                });
              }}
            />
            <div className="flex justify-center mt-2">
              <UniversalButton
                label="Submit"
                id="editsubmit"
                name="editsubmit"
                variant="primary"
                onClick={handleAgentUpdate}
              />
            </div>
          </div>
        </Dialog>
        {/* Edit Agent End */}

        {/* Delete Agent Start */}
        <Dialog
          header="Confirm Deletion"
          visible={deleteDialogVisible}
          onHide={() => setDeleteDialogVisible(false)}
          className="lg:w-[30rem] md:w-[25rem] sm:w-[20rem]"
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
                color: "#ff3f3f",
              }}
            />
          </div>
          <div className="p-4 text-center">
            <p className="text-[1.1rem] text-gray-700 font-semibold">
              Are you sure you want to delete the agent <br />
              <span className="text-green-500">"{selectedAgentName}"</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
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
              style={
                {
                  // backgroundColor: "red",
                }
              }
              onClick={handleDeleteAgent}
            />
          </div>
        </Dialog>
        {/* Delete Agent End */}
      </LocalizationProvider>
    </>
  );
};

export default ManageAgentTable;
