import * as React from "react";
import { useState } from "react";
import {
  IconButton,
  Paper,
  Typography,
  Box,
  Button,
  Tooltip,
  Popover,
} from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { BsJournalArrowDown } from "react-icons/bs";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import EmergencyOutlinedIcon from "@mui/icons-material/EmergencyOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RadioGroupField from "../../../whatsapp/components/RadioGroupField";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import InputField from "../../../whatsapp/components/InputField";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import UniversalDatePicker from "../../../whatsapp/components/UniversalDatePicker";
import UniversalLabel from "../../../whatsapp/components/UniversalLabel";
import { useEffect } from "react";
import PhoneMissedOutlinedIcon from "@mui/icons-material/PhoneMissedOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GeneratePasswordSettings from "../../../profile/components/GeneratePasswordSettings";
import { MdOutlineDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";

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

const ContentCell = ({ value }) => {
  const [anchorEl, setAnchorEl] = useState(null); // ✅ Start as null
  const [open, setOpen] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null); // ✅ Close popover immediately
    setOpen(false);
  };

  // const open = Boolean(anchorEl);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <span style={{ flexGrow: 1, fontSize: "14px", fontWeight: "500" }}>
        {value}
      </span>

      {/* <IconButton
                size="small"
                onClick={copyToClipboard}
                sx={{ color: "#007BFF", "&:hover": { color: "#0056b3" } }}
            >
                <ContentCopyIcon fontSize="small" />
            </IconButton> */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        onMouseLeave={handlePopoverClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableRestoreFocus
        PaperProps={{
          sx: {
            p: 1,
            maxWidth: 300,
            borderRadius: 2,
            boxShadow: 3,
          },
          onMouseEnter: () => setOpen(true), // ✅ Keep open when inside popover
          onMouseLeave: handlePopoverClose, // ✅ Close when moving outside popover
        }}
      >
        {/* <Paper sx={{ p: 1, maxWidth: 300, borderRadius: 2, boxShadow: 3 }}> */}
        <Typography sx={{ fontSize: "14px", color: "#333", mb: 1 }}>
          {value}
        </Typography>

        <Button
          variant="outlined"
          size="small"
          onClick={copyToClipboard}
          startIcon={<ContentCopyIcon />}
          sx={{
            width: "100%",
            textTransform: "none",
            fontSize: "13px",
            color: "#007BFF",
            borderColor: "#007BFF",
            "&:hover": { backgroundColor: "#007BFF", color: "#fff" },
          }}
        >
          Copy
        </Button>
        {/* </Paper> */}
      </Popover>
    </div>
  );
};

const ManageUserTable = ({ id, name, allUsers = [] }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [logins, setLogins] = useState(false);
  const [otpService, setOtpService] = useState(false);
  const [viewService, setViewService] = useState(false);
  const [editService, setEditDetailsDialogVisible] = useState(false);
  const [assignService, setAssignService] = useState(false);
  const [manageApiKeys, setManageApiKeys] = useState(false);
  const [reset, setreset] = useState(false);
  const [userReports, setuserReports] = useState("");
  const [value, setValue] = useState(0);

  //userId
  const [selectedId, setSelectedId] = useState("");

  //updateDetails
  const [updateDetails, setUpdateDetails] = useState({
    domain: "",
    userId: "",
    status: "",
    emailId: "",
    mobileNo: "",
    firstName: "",
    lastName: "",
    address: "",
    companyName: "",
    expiryDate: "",
    applicationType: "",
    userType: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
  });
  const handleDetailsUpdate = async () => {
    const data = {
      srno: selectedId,
      ...updateDetails,
    };
    console.log(data);
  };

  // assignService
  // whatsapp
  const [whatsappStatus, setWhatsappStatus] = useState("disable");
  const [whatsappCountry, setWhatsappCountry] = useState(null);
  const [whatsappUtility, setWhatsappUtility] = useState("");
  const [whatsappMarketing, setWhatsappMarketing] = useState("");

  const countryOptions = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ];

  const handleWhatsappAddCredit = () => {
    console.log("hello world");
  };

  const handleChangewhatsapp = (event) => {
    setWhatsappStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };

  // whatsapp
  // RCS
  const [rcsStatus, setRcsStatus] = useState("disable");
  const [rcsCountry, setRcsCountry] = useState(null);
  const [rcsrate, setRcsrate] = useState("");

  const rcscountryOptions = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ];

  const handleRcsAddCredit = () => {
    console.log("hello world");
  };

  const handleChangercs = (event) => {
    setRcsStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  // RCS
  // SMS
  const [smsStatus, setSmsStatus] = useState("disable");
  const [transcheck, setTranscheck] = useState(false);
  const [promocheck, setPromocheck] = useState(false);
  const [trans, setTrans] = useState(null);
  const [promo, setPromo] = useState(null);
  const [smsrate, setSmsRate] = useState("");

  const transOptions = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ];
  const promoOption = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ];

  const handleChangesms = (event) => {
    setSmsStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  // SMS
  // OBD
  const [obdStatus, setObdStatus] = useState("disable");
  const [transcheckobd, setTranscheckobd] = useState(false);
  const [promocheckobd, setPromocheckobd] = useState(false);
  const [transobd, setTransobd] = useState(null);
  const [promoobd, setPromoobd] = useState(null);
  const [obdrate, setObdRate] = useState("");
  const [obdrateStatus, setObdRateStatus] = useState("disable");

  const transOptionsobd = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ];
  const promoOptionobd = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ];

  const handleChangeobd = (event) => {
    setObdStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  const handleChangeobdRate = (event) => {
    setObdRateStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  // OBD
  // two-way
  const [twowayStatus, setTwoWayStatus] = useState("disable");
  const [twowayAssign, setTwowayAssign] = useState(null);
  const twowayOptions = [
    { value: "3 Months", label: "3 Months" },
    { value: "6 Months", label: "6 Months" },
    { value: "12 Months", label: "12 Months" },
  ];
  const handleChangetwoway = (event) => {
    setTwoWayStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  // two-way
  // misscall
  const [misscallStatus, setMisscallStatus] = useState("disable");
  const [misscallAssign, setMisscallAssign] = useState(null);
  const misscallOptions = [
    { value: "3 Months", label: "3 Months" },
    { value: "6 Months", label: "6 Months" },
    { value: "12 Months", label: "12 Months" },
  ];
  const handleChangeMisscall = (event) => {
    setMisscallStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  // misscall
  // C2C
  const [clickStatus, setClickStatus] = useState("disable");
  const handleChangeClick = (event) => {
    setClickStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  // C2C

  // Email
  const [emailStatus, setEmailStatus] = useState("disable");
  const [emailAssign, setEmailAssign] = useState(null);
  const emailOptions = [
    { value: "3 Months", label: "3 Months" },
    { value: "6 Months", label: "6 Months" },
    { value: "12 Months", label: "12 Months" },
  ];
  const handleChangeEmail = (event) => {
    setEmailStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  // Email

  // IBD
  const [ibdStatus, setIbdStatus] = useState("disable");
  const [ibdpulseStatus, setibdPulseStatus] = useState("disable");
  const [ibdAssign, setIbdAssign] = useState(null);
  const ibdOptions = [
    { value: "3 Months", label: "3 Months" },
    { value: "6 Months", label: "6 Months" },
    { value: "12 Months", label: "12 Months" },
  ];
  const handleChangeIbd = (event) => {
    setIbdStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  const handleChangeibdPulse = (event) => {
    setibdPulseStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  // IBD
  // Function to validate input
  const validateInput = (value, setter) => {
    value = value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");

    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts[0].length > 1 && !value.includes(".")) {
      value = parts[0][0] + "." + parts[0].slice(1);
    }

    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + "." + parts[1].substring(0, 2);
    }

    let floatVal = parseFloat(value);
    if (floatVal > 9.99) {
      value = "9.99"; // Max limit
    }

    if (value && floatVal < 0.01) {
      value = ""; // Prevent values less than 0.01
    }

    setter(value);
  };
  // assignService

  // Edit
  const [userid, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [editstatusStatus, setEditStatusStatus] = useState("disable");
  const [userType, setUserType] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [accountUrl, setAccountUrl] = useState("");
  const [enablepostpaid, setEnablePostpaid] = useState("disable");

  // Dropdown options
  const useroption = [
    { value: "User", label: "User" },
    { value: "Reseller", label: "Reseller" },
  ];

  const handleChangeEnablePostpaid = (event) => {
    setEnablePostpaid(event.target.value);
  };
  const handleChangeEditStatus = (event) => {
    setEditStatusStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  // Edit

  {
    /* Manage Api Key */
  }
  const [newAPIKey, setNewAPIKey] = useState("");

  // Function to generate an API key with only lowercase letters and numbers.
  const generateAPIKey = (length = 10) => {
    const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    // Generate random part of full length
    for (let i = 0; i < length; i++) {
      key += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return key + "XX";
  };

  const handleGenerateAPIKey = () => {
    const apiKey = generateAPIKey();
    setNewAPIKey(apiKey);
  };
  {
    /* Manage Api Key */
  }

  {
    /* reset service */
  }
  const [newPassword, setNewPassword] = useState("");

  {
    /* reset service */
  }
  {
    /* OTP details */
  }
  const [mobileNumbers, setMobileNumbers] = useState([""]); // Initial input field

  // Add new input field (Max 5)
  const addMobileNumber = () => {
    if (mobileNumbers.length >= 5) {
      toast.error("You can add a maximum of 5 mobile numbers.");
      return;
    }
    setMobileNumbers([...mobileNumbers, ""]);
  };

  // Remove input field
  const removeMobileNumber = (index) => {
    const updatedNumbers = mobileNumbers.filter((_, i) => i !== index);
    setMobileNumbers(updatedNumbers);
  };

  // Handle input change
  const handleInputChange = (index, value) => {
    const updatedNumbers = [...mobileNumbers];
    updatedNumbers[index] = value;
    setMobileNumbers(updatedNumbers);
  };

  {
    /* OTP details */
  }

  {
    /* User Report */
  }
  const [userreportStatus, setUserReportStatus] = useState("disable");
  const handleChangeuserreport = (event) => {
    setUserReportStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };
  {
    /* User Report */
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLonins = (id, name) => {
    setLogins(true);
  };
  const handleOtp = (id, name) => {
    setOtpService(true);
  };
  const handleView = (id, name) => {
    setViewService(true);
  };
  const handleEdit = (id, name) => {
    setEditDetailsDialogVisible(true);
  };
  const handleAssign = (id, name) => {
    setAssignService(true);
  };
  const handleApikey = (id, name) => {
    setManageApiKeys(true);
  };
  const handleReset = (id, name) => {
    setreset(true);
  };
  const handleReport = (id, name) => {
    setuserReports(true);
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "userId", headerName: "User ID", flex: 1, minWidth: 120 },
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 120 },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 120 },
    { field: "companyName", headerName: "Company", flex: 1, minWidth: 120 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 350,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Login" placement="top">
            <IconButton onClick={() => handleLonins(params.row)}>
              <LockOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Otp" placement="top">
            <IconButton onClick={() => handleOtp(params.row)}>
              <EmergencyOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="View User Details" placement="top">
            <IconButton onClick={() => handleView(params.row)}>
              <RemoveRedEyeOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Edit User Details" placement="top">
            <IconButton onClick={() => setEditDetailsDialogVisible(true)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Assign Service" placement="top">
            <IconButton onClick={() => handleAssign(params.row)}>
              <SettingsOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Manage Api Key" placement="top">
            <IconButton onClick={() => handleApikey(params.row)}>
              <KeyOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Reset Password" placement="top">
            <IconButton onClick={() => handleReset(params.row)}>
              <LockOpenOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="User Reports" placement="top">
            <IconButton onClick={() => handleReport(params.row)}>
              <AssignmentOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  const whatsaappcolumns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "country", headerName: "Country", flex: 1, minWidth: 120 },
    {
      field: "utility",
      headerName: "Utility (INR/Credit)",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "marketing",
      headerName: "Marketing (INR/Credit)",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Edit" placement="top">
            <IconButton onClick={() => handleWhatsappEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Delete" placement="top">
            <IconButton onClick={() => handleWhatsappDelete(params.row)}>
              <DeleteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  const rcscolumns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "country", headerName: "Country", flex: 1, minWidth: 120 },
    { field: "rate", headerName: "Rate (INR/Credit)", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Edit" placement="top">
            <IconButton onClick={() => handleRcsEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Delete" placement="top">
            <IconButton onClick={() => handleRcsDelete(params.row)}>
              <DeleteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  const rows = Array.isArray(allUsers)
    ? allUsers.map((item, i) => ({
        id: i + 1,
        sn: i + 1,
        ...item,
      }))
    : [];

  const whatsapprows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    country: "India",
    utility: "0.30",
    marketing: "0.80",
  }));

  const rcsrows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    country: "India",
    rate: "0.30",
  }));

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
    <>
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

      {/* Dialog Section Start */}

      {/* Edit details */}
      <Dialog
        header="Edit details"
        visible={editService}
        onHide={() => setEditDetailsDialogVisible(false)}
        className="lg:w-[50rem] md:w-[40rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-3">
          <div className="grid gap-4 mb-2 lg:grid-cols-2">
            <InputField
              label="User ID"
              id="userid"
              name="userid"
              placeholder="Enter your User ID"
              required
              // value={userid}
              // onChange={(e) => setUserId(e.target.value)}
            />
            <UniversalDatePicker
              label="Expiry Date"
              id="expiryDate"
              name="expiryDate"
              placeholder="Enter Expiry Date"
              // value={expiryDate}
              // onChange={(newValue) => setExpiryDate(newValue)}
            />
          </div>
          <div className="flex gap-2">
            <AnimatedDropdown
              label="User Type"
              id="userType"
              name="userType"
              options={useroption}
              // value={userType} // Ensure correct value is set
              onChange={() => {}}
            />
            <InputField
              label="Account URL"
              id="accounturl"
              name="accounturl"
              placeholder="Enter URL"
              // value={accountUrl} // Controlled input value
              readOnly={isReadOnly} // Controlled readOnly property
              // onChange={(e) => setAccountUrl(e.target.value)} // Handle manual input
            />
          </div>
          {userType === "Reseller" && (
            <div className="flex items-center gap-2" id="yesnopost">
              <div className="flex items-center justify-center">
                <UniversalLabel
                  text="Enable Postpaid"
                  id="enablepostpaid"
                  name="enablepostpaid"
                  className="text-sm font-medium text-gray-700"
                />
              </div>

              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="enablepostpaidOption1"
                  name="enablepostpaidredio"
                  // value="enable"
                  // onChange={handleChangeEnablePostpaid}
                  checked={enablepostpaid === "enable"}
                />
                <label
                  htmlFor="enablepostpaidOption1"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Yes
                </label>
              </div>

              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="enablepostpaidOption2"
                  name="enablepostpaidredio"
                  value="disable"
                  // onChange={handleChangeEnablePostpaid}
                  // checked={enablepostpaid === "disable"}
                />
                <label
                  htmlFor="enablepostpaidOption2"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  No
                </label>
              </div>
              {enablepostpaid === "enable" && (
                <div>
                  <InputField
                    id="enablepostinput"
                    name="enablepostinput"
                    placeholder="Enter Limit"
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-4 lg:w-100 md:w-100">
            <div className="flex items-center justify-center">
              <UniversalLabel
                text="Status"
                id="editstatus"
                name="editstatus"
                className="text-sm font-medium text-gray-700"
              />
            </div>

            <div className="flex items-center gap-2">
              <RadioButton
                inputId="editstatusOption1"
                name="editstatusredio"
                // value="enable"
                // onChange={handleChangeEditStatus}
                checked={updateDetails.status === "enable"}
              />
              <label
                htmlFor="editstatusOption1"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Enable
              </label>
            </div>

            <div className="flex items-center gap-2">
              <RadioButton
                inputId="editstatusOption2"
                name="editstatusredio"
                checked={updateDetails.status === "disable"}
              />
              <label
                htmlFor="editstatusOption2"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Disable
              </label>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
            <InputField
              label="First Name"
              id="firstname"
              name="firstname"
              placeholder="Enter your First Name"
              value={updateDetails.firstName}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  firstName: e.target.value,
                });
              }}
              required
            />
            <InputField
              label="Last Name"
              id="lastname"
              name="lastname"
              placeholder="Enter your Last Name"
              value={updateDetails.lastName}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  lastName: e.target.value,
                });
              }}
              required
            />
            <InputField
              label="Email ID"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email ID"
              value={updateDetails.emailId}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  emailId: e.target.value,
                });
              }}
              required
            />
            <InputField
              label="Mobile No."
              id="mobile"
              name="mobile"
              placeholder="Enter your Mobile No."
              type="number"
              value={updateDetails.mobileNo}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  mobileNo: e.target.value,
                });
              }}
            />
            <InputField
              label="Company Name"
              id="company"
              name="company"
              placeholder="Enter your Company Name"
              value={updateDetails.country}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  country: e.target.value,
                });
              }}
            />
            <InputField
              label="Address"
              id="address"
              name="address"
              placeholder="Enter your Address"
              value={updateDetails.address}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  address: e.target.value,
                });
              }}
            />
            <InputField
              label="City"
              id="city"
              name="city"
              placeholder="Enter your City"
              value={updateDetails.city}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  city: e.target.value,
                });
              }}
            />
            <InputField
              label="State"
              id="state"
              name="state"
              placeholder="Enter your State"
              value={updateDetails.state}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  state: e.target.value,
                });
              }}
              required
            />
            <InputField
              label="Country"
              id="country"
              name="country"
              placeholder="Enter your Country"
              value={updateDetails.country}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  country: e.target.value,
                });
              }}
            />
            <InputField
              label="Pincode"
              id="Pincode"
              name="Pincode"
              placeholder="Enter your Pincode"
              value={updateDetails?.zipCode}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  zipCode: e.target.value,
                });
              }}
            />
          </div>

          <div className="flex justify-center mt-3">
            <UniversalButton
              label="Save"
              id="whatsappsave"
              name="whatsappsave"
              onClick={handleDetailsUpdate}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ManageUserTable;
