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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import EmergencyOutlinedIcon from "@mui/icons-material/EmergencyOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import PhoneMissedOutlinedIcon from "@mui/icons-material/PhoneMissedOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useEffect } from "react";
import toast from "react-hot-toast";
// import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import RadioGroupField from "../../../whatsapp/components/RadioGroupField";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import InputField from "../../../whatsapp/components/InputField";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import UniversalDatePicker from "../../../whatsapp/components/UniversalDatePicker";
import UniversalLabel from "../../../whatsapp/components/UniversalLabel";
import GeneratePasswordSettings from "../../../profile/components/GeneratePasswordSettings";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import {
  fetchUserbySrno,
  getPromoServices,
  getTransServices,
  updateUserbySrno,
} from "@/apis/admin/admin";
import {
  addSmsPricing,
  deleteWhatsappRateBySrno,
  getSmsRateByUser,
  getWhatsappRateBySrno,
  getWhatsappRateData,
  saveEditWhatsappRate,
} from "@/apis/admin/userRate";
import { getCountryList } from "@/apis/common/common";
import { DataTable } from "@/components/layout/DataTable";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

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
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [currentUserSrno, setCurrentUserSrno] = useState(null);

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
    expiryDate: new Date(),
    applicationType: "",
    userType: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
  });

  // const handleDetailsUpdate = async () => {
  //   const data = {
  //     srno: selectedId,
  //     ...updateDetails,
  //   };
  // };

  const handleEdit = async (srNo) => {
    console.log(srNo, "srNo");
    try {
      const response = await fetchUserbySrno(srNo); // Fetch user details by srNo
      console.log(response, "fetch user details response");
      if (response?.userMstPojoList?.length > 0) {
        const userDetails = response.userMstPojoList[0];
        setUpdateDetails({
          domain: userDetails.domain || "",
          userId: userDetails.userId || "",
          status: userDetails.status || "",
          emailId: userDetails.emailId || "",
          mobileNo: userDetails.mobileNo || "",
          firstName: userDetails.firstName || "",
          lastName: userDetails.lastName || "",
          address: userDetails.address || "",
          companyName: userDetails.companyName || "",
          expiryDate: userDetails.expiryDate || new Date(),
          applicationType: userDetails.applicationType || "",
          userType: userDetails.userType || "",
          country: userDetails.country || "",
          state: userDetails.state || "",
          city: userDetails.city || "",
          pinCode: userDetails.pinCode || "",
        });
        setSelectedId(srNo);
        setEditDetailsDialogVisible(true);
      } else {
        toast.error("No user details found for the selected user.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details. Please try again.");
    }
  };

  const handleDetailsUpdate = async () => {
    const formattedExpiryDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(updateDetails.expiryDate));

    const data = {
      srno: selectedId,
      ...updateDetails,
      expiryDate: formattedExpiryDate, // Ensure correct date format
    };

    try {
      const response = await updateUserbySrno(data); // Call the update API
      if (response?.msg === "User Updated Successfully") {
        toast.success("User details updated successfully!");
        setEditDetailsDialogVisible(false); // Close the dialog
      } else {
        toast.error(response?.message || "Failed to update user details.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user details. Please try again.");
    }
  };

  // assignService

  // whatsapp Start
  const [countryOptions, setCountryOptions] = useState([]);
  const [whatsapprows, setWhatsapprows] = useState([]);
  const [whatsappStatus, setWhatsappStatus] = useState("disable");
  const [whatsappCountry, setWhatsappCountry] = useState(null);
  const [whatsappUtility, setWhatsappUtility] = useState("");
  const [whatsappMarketing, setWhatsappMarketing] = useState("");
  const [whatsappDeleteVisible, setWhatsappDeleteVisible] = useState(false);
  const [selectedWhatsappRow, setSelectedWhatsappRow] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editingRow, setEditingRow] = useState(null); // holds full row data

  const [editWhatsappVisible, setEditWhatsappVisible] = useState(false);
  const [editWhatsappForm, setEditWhatsappForm] = useState({
    srno: "",
    userSrno: "",
    utility: "",
    marketing: "",
    countryCode: "",
  });

  const handleChangewhatsapp = (event) => {
    setWhatsappStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };

  const fetchWhatsappRateData = async (userSrno) => {
    const res = await getWhatsappRateData(userSrno);
    console.log("raw whatsapp rate response:", res);

    // Case 1: API returns array directly
    const list = Array.isArray(res) ? res : res?.data;

    if (Array.isArray(list)) {
      const formatted = list.map((item, index) => {
        console.log("Mapping item:", item);
        return {
          id: item.sr_no || index + 1,
          sn: index + 1,
          srno: item.sr_no,
          userSrno: String(item.user_srno),
          countryName: item.country_name || item.country_code || "Unknown",
          countryCode: String(item.country_srno || ""),
          utility: String(item.transactional || 0),
          marketing: String(item.promotional || 0),
          isoCode: String(item.ISO_code || ""),
          updateTime: item.update_time || "-",
        };
      });

      console.log("formatted rows", formatted);
      setWhatsapprows(formatted);
    } else {
      console.warn("No valid data returned from API");
    }
  };

  useEffect(() => {
    console.log(" WhatsApp rows updated:", whatsapprows);
  }, [whatsapprows]);

  const handleWhatsappAddCredit = async () => {
    if (!whatsappCountry || !whatsappUtility || !whatsappMarketing) {
      toast.error("Please fill all the fields.");
      return;
    }

    const payload = {
      srno: "",
      userSrno: String(currentUserSrno),
      utility: String(whatsappUtility),
      marketing: String(whatsappMarketing),
      countryCode: String(whatsappCountry),
    };

    const res = await saveEditWhatsappRate(payload);

    // ✅ Always show the message
    if (res?.message) {
      toast[
        res.message.toLowerCase().includes("success") ? "success" : "error"
      ](res.message);
    }

    // ✅ Only refresh and reset if added successfully
    if (res?.message?.toLowerCase().includes("success")) {
      await fetchWhatsappRateData(currentUserSrno);
      resetWhatsappFields(); // clear inputs
    }
  };

  const handleWhatsappEdit = async (srno) => {
    console.log("Editing WhatsApp rate for srno:", srno);

    const res = await getWhatsappRateBySrno(srno);
    console.log("Edit API response:", res);

    const d = Array.isArray(res) ? res[0] : res?.data?.[0];

    if (d) {
      setEditWhatsappForm({
        srno: d.srno ?? srno, // fallback in case srno is not returned
        userSrno: String(d.user_srno),
        utility: String(d.transactional),
        marketing: String(d.promotional),
        countryCode: String(d.country_srno),
      });

      setEditWhatsappVisible(true); // ✅ Now it will open
    } else {
      console.warn("No data found for srno:", srno);
    }
  };

  const handleWhatsappUpdate = async () => {
    const res = await saveEditWhatsappRate(editWhatsappForm);
    if (res?.message?.toLowerCase().includes("success")) {
      toast.success("Rate updated successfully");
      setEditWhatsappVisible(false);
      fetchWhatsappRateData(currentUserSrno);
    } else {
      toast.error(res?.message || "Failed to update");
    }
  };

  const handleWhatsappDelete = (srno) => {
    const row = whatsapprows.find((r) => r.srno === srno);
    setEditingRow(row);
    setWhatsappDeleteVisible(true);
  };

  const confirmWhatsappDelete = async () => {
    if (!selectedWhatsappRow?.srno) return;

    const res = await deleteWhatsappRateBySrno(selectedWhatsappRow.srno);
    if (res?.message?.toLowerCase().includes("success")) {
      toast.success("Rate deleted successfully.");
      fetchWhatsappRateData(currentUserSrno);
      setWhatsappDeleteVisible(false);
      setSelectedWhatsappRow(null);
    } else {
      toast.error(res?.message || "Delete failed.");
    }
  };

  const resetWhatsappFields = () => {
    setWhatsappCountry(null);
    setWhatsappUtility("");
    setWhatsappMarketing("");
  };

  // whatsapp End

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
    console.log("handleRcsCredit");
  };

  const handleChangercs = (event) => {
    setRcsStatus(event.target.value);
  };
  // RCS

  // SMS Start
  const [smsStatus, setSmsStatus] = useState("disable");
  const [transcheck, setTranscheck] = useState(false);
  const [promocheck, setPromocheck] = useState(false);
  const [trans, setTrans] = useState(null);
  const [promo, setPromo] = useState(null);
  const [smsrate, setSmsRate] = useState("");
  const [transOptions, setTransOptions] = useState([]);
  const [promoOption, setPromoOption] = useState([]);
  const [dltRate, setDltRate] = useState("");

  const resetSmsFields = () => {
    setTrans(null);
    setPromo(null);
    setTranscheck(false);
    setPromocheck(false);
    setSmsRate("");
    setDltRate("");
  };

  const handleChangesms = (event) => {
    setSmsStatus(event.target.value);
  };
  const handleSaveSmsPricing = async () => {
    const payload = {
      srno: "",
      userSrno: String(currentUserSrno),
      rate: smsrate,
      dltRate: dltRate || "0",
      transService: transcheck ? String(trans) : "",
      promoService: promocheck ? String(promo) : "",
    };

    console.log("Submitting SMS Pricing Payload:", payload);

    const res = await addSmsPricing(payload);
    if (res?.statusCode === 200) {
      toast.success(res.message || "SMS Pricing saved successfully!");
      resetSmsFields();
      setAssignService(false);
    } else {
      toast.error(res.message || "Failed to save SMS Pricing.");
    }
  };
  // SMS End

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
    { value: 1, label: "User" },
    { value: 2, label: "Reseller" },
  ];

  useEffect(() => {
    setIsReadOnly(userType !== "Reseller");
    setAccountUrl("");
  }, [userType]);

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

  // view user details
  const handleView = async (srNo) => {
    try {
      const response = await fetchUserbySrno(srNo); // Fetch user details by srNo
      if (response?.userMstPojoList?.length > 0) {
        setSelectedUserDetails(response.userMstPojoList[0]); // Set the first item in the array
        setViewService(true); // Open the dialog
      } else {
        toast.error("No user details found for the selected user.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details. Please try again.");
    }
  };

  // const handleAssign = (srNo) => {
  //   setAssignService(true);
  // };

  const handleAssign = async (srNo) => {
    setAssignService(true);
    setCurrentUserSrno(srNo);
    console.log("srNo", srNo);

    setTimeout(() => {
      fetchWhatsappRateData(srNo);
    }, 0);

    const [transRes, promoRes, userSmsData, countryListRes, whatsappRateRes] =
      await Promise.all([
        getTransServices(),
        getPromoServices(),
        getSmsRateByUser(srNo),
        getCountryList(),
        getWhatsappRateData(srNo),
      ]);

    // ✅ map country list
    if (countryListRes) {
      setCountryOptions(
        countryListRes.map((item) => ({
          label: item.countryName,
          value: String(item.countryCode),
        }))
      );
    }

    // map trans/promo
    setTransOptions(
      (transRes || []).map((item) => ({
        label: item.serviceName,
        value: String(item.serviceId),
      }))
    );
    setPromoOption(
      (promoRes || []).map((item) => ({
        label: item.serviceName,
        value: String(item.serviceId),
      }))
    );

    // set SMS data
    if (userSmsData?.data) {
      const d = userSmsData.data;
      setTranscheck(!!d.transService);
      setPromocheck(!!d.promoService);
      setTrans(d.transService || null);
      setPromo(d.promoService || null);
      setSmsRate(d.rate || "");
      setDltRate(d.dltRate || "");
    }

    // set WhatsApp table data
    if (whatsappRateRes?.data) {
      setWhatsapprows(whatsappRateRes.data);
    }
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
            <IconButton onClick={() => handleLonins(params.row.srno)}>
              <LockOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Otp" placement="top">
            <IconButton onClick={() => handleOtp(params.row.srno)}>
              <EmergencyOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="View User Details" placement="top">
            <IconButton onClick={() => handleView(params.row.srno)}>
              <RemoveRedEyeOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          {/* <CustomTooltip arrow title="Edit User Details" placement="top">
            <IconButton onClick={() => setEditDetailsDialogVisible(true)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip> */}
          <CustomTooltip arrow title="Edit User Details" placement="top">
            <IconButton onClick={() => handleEdit(params.row.srno)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Assign Service" placement="top">
            <IconButton onClick={() => handleAssign(params.row.srno)}>
              <SettingsOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Manage Api Key" placement="top">
            <IconButton onClick={() => handleApikey(params.row.srno)}>
              <KeyOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Reset Password" placement="top">
            <IconButton onClick={() => handleReset(params.row.srno)}>
              <LockOpenOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="User Reports" placement="top">
            <IconButton onClick={() => handleReport(params.row.srno)}>
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

  // const whatsaappcolumns = [
  //   { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
  //   { field: "country", headerName: "Country", flex: 1, minWidth: 120 },
  //   {
  //     field: "utility",
  //     headerName: "Utility (INR/Credit)",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "marketing",
  //     headerName: "Marketing (INR/Credit)",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     flex: 1,
  //     minWidth: 100,
  //     renderCell: (params) => (
  //       <>
  //         <CustomTooltip arrow title="Edit" placement="top">
  //           <IconButton onClick={() => handleWhatsappEdit(params.row)}>
  //             <EditNoteIcon
  //               sx={{
  //                 fontSize: "1.2rem",
  //                 color: "gray",
  //               }}
  //             />
  //           </IconButton>
  //         </CustomTooltip>
  //         <CustomTooltip arrow title="Delete" placement="top">
  //           <IconButton onClick={() => handleWhatsappDelete(params.row)}>
  //             <DeleteIcon
  //               sx={{
  //                 fontSize: "1.2rem",
  //                 color: "gray",
  //               }}
  //             />
  //           </IconButton>
  //         </CustomTooltip>
  //       </>
  //     ),
  //   },
  // ];
  const whatsaappcolumns = [
    { field: "sn", headerName: "S.No", flex: 0.5 },
    { field: "countryName", headerName: "Country", flex: 1 },
    { field: "utility", headerName: "Utility", flex: 1 },
    { field: "marketing", headerName: "Marketing", flex: 1 },
    { field: "updateTime", headerName: "Updated On", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Edit" placement="top">
            <IconButton onClick={() => handleWhatsappEdit(params.row.srno)}>
              <EditNoteIcon sx={{ fontSize: "1.2rem", color: "gray" }} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Delete" placement="top">
            <IconButton onClick={() => handleWhatsappDelete(params.row.srno)}>
              <DeleteIcon sx={{ fontSize: "1.2rem", color: "gray" }} />
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

  // const whatsapprows = Array.from({ length: 20 }, (_, i) => ({
  //   id: i + 1,
  //   sn: i + 1,
  //   country: "India",
  //   utility: "0.30",
  //   marketing: "0.80",
  // }));

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
        {/* <div className="space-y-3">
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
        </div> */}
        <div className="space-y-3">
          <div className="grid gap-4 mb-2 lg:grid-cols-2">
            <InputField
              label="User ID"
              id="userid"
              name="userid"
              placeholder="Enter your User ID"
              value={updateDetails.userId}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, userId: e.target.value })
              }
              required
            />
            <UniversalDatePicker
              label="Expiry Date"
              id="expiryDate"
              name="expiryDate"
              placeholder="Enter Expiry Date"
              value={updateDetails.expiryDate}
              onChange={(newValue) =>
                setUpdateDetails({ ...updateDetails, expiryDate: newValue })
              }
            />
          </div>
          <div className="flex gap-2">
            <AnimatedDropdown
              label="User Type"
              id="userType"
              name="userType"
              // options={useroption}
              options={[
                { value: 1, label: "User" },
                { value: 2, label: "Reseller" },
              ]}
              value={updateDetails.userType}
              onChange={(value) =>
                setUpdateDetails({ ...updateDetails, userType: value })
              }
            />
            <InputField
              label="Domain"
              id="domain"
              name="domain"
              placeholder="Enter Domain"
              value={updateDetails.domain}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, domain: e.target.value })
              }
            />
          </div>
          {/* Row 3 */}
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
              <label className="text-sm font-medium text-gray-700 cursor-pointer">
                Active
              </label>
              <Checkbox
                inputId="statusToggle"
                name="statusToggle"
                checked={updateDetails.status === 1}
                onChange={(e) =>
                  setUpdateDetails({
                    ...updateDetails,
                    status: e.checked ? 1 : 0,
                  })
                }
              />
              <label className="text-sm font-medium text-gray-700 cursor-pointer">
                Inactive
              </label>
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex flex-wrap gap-4 lg:w-100 md:w-100">
            <div className="flex items-center justify-center">
              <UniversalLabel
                text="Application Type"
                id="applicationType"
                name="applicationType"
                className="text-sm font-medium text-gray-700"
              />
            </div>
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="applicationType1"
                name="applicationType"
                value={1}
                onChange={(e) =>
                  setUpdateDetails({
                    ...updateDetails,
                    applicationType: e.value,
                  })
                }
                checked={updateDetails.applicationType === 1}
              />
              <label
                htmlFor="applicationType1"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Type 1
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="applicationType2"
                name="applicationType"
                value={2}
                onChange={(e) =>
                  setUpdateDetails({
                    ...updateDetails,
                    applicationType: e.value,
                  })
                }
                checked={updateDetails.applicationType === 2}
              />
              <label
                htmlFor="applicationType2"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Type 2
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
              onChange={(e) =>
                setUpdateDetails({
                  ...updateDetails,
                  firstName: e.target.value,
                })
              }
              required
            />
            <InputField
              label="Last Name"
              id="lastname"
              name="lastname"
              placeholder="Enter your Last Name"
              value={updateDetails.lastName}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, lastName: e.target.value })
              }
              required
            />
            <InputField
              label="Email ID"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email ID"
              value={updateDetails.emailId}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, emailId: e.target.value })
              }
              required
            />
            <InputField
              label="Mobile No."
              id="mobile"
              name="mobile"
              placeholder="Enter your Mobile No."
              type="number"
              value={updateDetails.mobileNo}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, mobileNo: e.target.value })
              }
            />
            <InputField
              label="Company Name"
              id="company"
              name="company"
              placeholder="Enter your Company Name"
              value={updateDetails.companyName}
              onChange={(e) =>
                setUpdateDetails({
                  ...updateDetails,
                  companyName: e.target.value,
                })
              }
            />
            <InputField
              label="Address"
              id="address"
              name="address"
              placeholder="Enter your Address"
              value={updateDetails.address}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, address: e.target.value })
              }
            />
            <InputField
              label="City"
              id="city"
              name="city"
              placeholder="Enter your City"
              value={updateDetails.city}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, city: e.target.value })
              }
            />
            <InputField
              label="State"
              id="state"
              name="state"
              placeholder="Enter your State"
              value={updateDetails.state}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, state: e.target.value })
              }
              required
            />
            <InputField
              label="Country"
              id="country"
              name="country"
              placeholder="Enter your Country"
              value={updateDetails.country}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, country: e.target.value })
              }
            />
            <InputField
              label="Pincode"
              id="Pincode"
              name="Pincode"
              placeholder="Enter your Pincode"
              value={updateDetails.pinCode}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, pinCode: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center mt-3">
            <UniversalButton
              label="Save"
              id="saveButton"
              name="saveButton"
              onClick={handleDetailsUpdate}
            />
          </div>
        </div>
      </Dialog>
      {/* Edit Details */}

      {/* Login details */}
      <Dialog
        header="Login details"
        visible={logins}
        onHide={() => setLogins(false)}
        className="w-[30rem]"
        draggable={false}
      >
        Login details
      </Dialog>
      {/* Login details */}

      {/* OTP details */}
      <Dialog
        header="OTP details"
        visible={otpService}
        onHide={() => setOtpService(false)}
        className="w-[30rem]"
        draggable={false}
      >
        <div className="max-w-md p-2 mx-auto rounded-lg border ">
          <h2 className="mb-4 text-lg font-semibold text-center text-gray-800">
            Mobile Numbers
          </h2>

          <div className="flex flex-col gap-3">
            {mobileNumbers.map((number, index) => (
              <div key={index} className="relative flex items-center gap-3">
                <InputField
                  variant="outlined"
                  placeholder="Enter mobile number..."
                  value={number}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-full"
                  size="small"
                />
                {index > 0 && (
                  // <IconButton onClick={() => removeMobileNumber(index)} sx={{ color: "red", position:"absolute", right:"3rem" }}>
                  //   <DeleteIcon />
                  // </IconButton>
                  <MdOutlineDeleteForever
                    onClick={() => removeMobileNumber(index)}
                    className="absolute text-red-500 cursor-pointer hover:text-red-600 right-2"
                    size={20}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <UniversalButton
              label="Add"
              id="addButton"
              name="addButton"
              variant="contained"
              color="primary"
              onClick={addMobileNumber}
            />
            <UniversalButton
              label="Save"
              id="saveButton"
              name="saveButton"
              variant="contained"
              color="primary"
              // onClick={addMobileNumber}
            />

            {/* <IconButton
                onClick={addMobileNumber}
                sx={{
                  bgcolor: "#1E40AF",
                  color: "white",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  "&:hover": { bgcolor: "#2563EB" },
                }}
              >
                <AddCircleIcon sx={{ fontSize: 36 }} />
              </IconButton> */}
          </div>
        </div>
      </Dialog>
      {/* OTP details */}

      {/* View details */}
      <Dialog
        header="View details"
        visible={viewService}
        onHide={() => setViewService(false)}
        className="w-[48rem] max-w-full"
        draggable={false}
      >
        {/* <div className="space-y-3">
          <div className="grid gap-4 mb-2 lg:grid-cols-2">
            <InputField
              label="User ID"
              id="viewuserid"
              name="viewuserid"
              placeholder="Enter your User ID"
              readOnly="true"
            />
            <UniversalDatePicker
              label="Expiry Date"
              id="viewexpiryDate"
              name="viewexpiryDate"
              placeholder="Enter Expiry Date"
              readOnly="true"
            />
          </div>
          <div className="flex gap-2">
            <InputField
              label="User Type"
              id="viewuserType"
              name="viewuserType"
              placeholder="Enter URL"
              readOnly="true"
            />
            <InputField
              label="Account URL"
              id="viewaccounturl"
              name="viewaccounturl"
              placeholder="Enter URL"
              readOnly="true"
            />
          </div>
          {userType === "Reseller" && (
            <div className="flex items-center gap-2" id="yesnopost">
              <div className="flex items-center justify-center">
                <UniversalLabel
                  text="Enable Postpaid"
                  id="viewenablepostpaid"
                  name="viewenablepostpaid"
                  className="text-sm font-medium text-gray-700"
                  readOnly="true"
                />
              </div>
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="viewenablepostpaidOption1"
                  name="viewenablepostpaidredio"
                  value="enable"
                />
                <label
                  htmlFor="viewenablepostpaidOption1"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="viewenablepostpaidOption2"
                  name="viewenablepostpaidredio"
                />
                <label
                  htmlFor="viewenablepostpaidOption2"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  No
                </label>
              </div>

              {enablepostpaid === "enable" && (
                <div>
                  <InputField
                    id="viewenablepostinput"
                    name="viewenablepostinput"
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
                id="vieweditstatus"
                name="vieweditstatus"
                className="text-sm font-medium text-gray-700"
              />
            </div>

            <div className="flex items-center gap-2">
              <RadioButton
                inputId="viewstatusOption1"
                name="viewstatusredio"
                value="enable"
              />
              <label
                htmlFor="viewstatusOption1"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Enable
              </label>
            </div>

            <div className="flex items-center gap-2">
              <RadioButton
                inputId="viewstatusOption2"
                name="viewstatusredio"
                value="disable"
              />
              <label
                htmlFor="viewstatusOption2"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Disable
              </label>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
            <InputField
              label="First Name"
              id="viewfirstname"
              name="viewfirstname"
              placeholder="Enter your First Name"
              readOnly="true"
            />
            <InputField
              label="Last Name"
              id="viewlastname"
              name="viewlastname"
              placeholder="Enter your Last Name"
              readOnly="true"
            />
            <InputField
              label="Email ID"
              type="email"
              id="viewemail"
              name="viewemail"
              placeholder="Enter your Email ID"
              readOnly="true"
            />
            <InputField
              label="Mobile No."
              id="viewmobile"
              name="viewmobile"
              placeholder="Enter your Mobile No."
              type="number"
              readOnly="true"
            />
            <InputField
              label="Company Name"
              id="viewcompany"
              name="viewcompany"
              placeholder="Enter your Company Name"
              readOnly="true"
            />
            <InputField
              label="Address"
              id="viewaddress"
              name="viewaddress"
              placeholder="Enter your Address"
              readOnly="true"
            />
            <InputField
              label="City"
              id="viewcity"
              name="viewcity"
              placeholder="Enter your City"
              readOnly="true"
            />
            <InputField
              label="State"
              id="viewstate"
              name="viewstate"
              placeholder="Enter your State"
              readOnly="true"
            />
            <InputField
              label="Country"
              id="viewcountry"
              name="viewcountry"
              placeholder="Enter your Country"
              readOnly="true"
            />
            <InputField
              label="Pincode"
              id="viewPincode"
              name="viewPincode"
              placeholder="Enter your Pincode"
              readOnly="true"
            />
          </div>
        </div> */}
        {selectedUserDetails ? (
          <div className="space-y-6 p-3 border rounded-xl shadow-md">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-2 text-sm">
                <RemoveRedEyeOutlinedIcon className="text-gray-600" />
                <p>
                  <strong className="text-sm">User ID : </strong>
                  {selectedUserDetails.userId || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarTodayOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Expiry Date : </strong>
                  {selectedUserDetails.expiryDate || "Not Available"}
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <PersonOutlineOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>First Name : </strong>
                  {selectedUserDetails.firstName || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PersonOutlineOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Last Name : </strong>{" "}
                  {selectedUserDetails.lastName || "Not Available"}
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <EmailOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Email ID : </strong>{" "}
                  {selectedUserDetails.emailId || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PhoneOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Mobile No. : </strong>{" "}
                  {selectedUserDetails.mobileNo || "Not Available"}
                </p>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <BusinessOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Company Name : </strong>{" "}
                  {selectedUserDetails.companyName || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <LocationOnOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Address : </strong>{" "}
                  {selectedUserDetails.address || "Not Available"}
                </p>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <LocationCityOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>City : </strong>{" "}
                  {selectedUserDetails.city || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MapOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>State : </strong>{" "}
                  {selectedUserDetails.state || "Not Available"}
                </p>
              </div>
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <PublicOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Country : </strong>{" "}
                  {selectedUserDetails.country || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PinDropOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Pincode : </strong>{" "}
                  {selectedUserDetails.pinCode || "Not Available"}
                </p>
              </div>
            </div>

            {/* Row 7 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <AccountTreeOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>User Type : </strong>{" "}
                  {selectedUserDetails.userType || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleOutlineOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Status : </strong>{" "}
                  {selectedUserDetails.status === 1
                    ? "Active"
                    : selectedUserDetails.status === 0
                    ? "Inactive"
                    : "Not Available"}
                </p>
              </div>
            </div>

            {/* Row 8 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CampaignOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Promo Service : </strong>{" "}
                  {selectedUserDetails.promoService || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <SmsOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Trans Service : </strong>{" "}
                  {selectedUserDetails.transService || "Not Available"}
                </p>
              </div>
            </div>

            {/* Row 9 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <KeyOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Domain : </strong>{" "}
                  {selectedUserDetails.domain || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <LockOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Virtual Balance : </strong>{" "}
                  {selectedUserDetails.virtualBalance || "Not Available"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading user details...</p>
        )}
      </Dialog>
      {/* View details */}

      {/* assignService */}
      <Dialog
        header="Assign Service"
        visible={assignService}
        onHide={() => setAssignService(false)}
        className="lg:w-[65rem] md:w-[50rem] w-[20rem]"
        draggable={false}
      >
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Assign Service Tabs"
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
            <Tab
              label={
                <span className="flex items-center gap-2">
                  <BsJournalArrowDown size={18} />
                  RCS
                </span>
              }
              {...a11yProps(1)}
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
              label={
                <span>
                  <SmsOutlinedIcon size={20} /> SMS
                </span>
              }
              {...a11yProps(2)}
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
              label={
                <span>
                  <CampaignOutlinedIcon size={20} />
                  OBD
                </span>
              }
              {...a11yProps(3)}
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
              label={
                <span>
                  <CampaignOutlinedIcon size={20} />
                  Two Way
                </span>
              }
              {...a11yProps(4)}
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
              label={
                <span>
                  <PhoneMissedOutlinedIcon size={20} />
                  Missed Call
                </span>
              }
              {...a11yProps(5)}
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
              label={
                <span>
                  <CampaignOutlinedIcon size={20} />
                  C2C
                </span>
              }
              {...a11yProps(6)}
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
              label={
                <span>
                  <EmailOutlinedIcon size={20} />
                  E-mail
                </span>
              }
              {...a11yProps(7)}
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
              label={
                <span>
                  <CampaignOutlinedIcon size={20} />
                  IBD
                </span>
              }
              {...a11yProps(8)}
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

          {/* whatsapp */}
          <CustomTabPanel value={value} index={0} className="">
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                {/* Option 1 */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="whatsaapOption1"
                      name="whatsappredio"
                      value="enable"
                      onChange={handleChangewhatsapp}
                      checked={whatsappStatus === "enable"}
                    />
                    <label
                      htmlFor="whatsaapOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="whatsOption2"
                      name="whatsappredio"
                      value="disable"
                      onChange={handleChangewhatsapp}
                      checked={whatsappStatus === "disable"}
                    />
                    <label
                      htmlFor="whatsOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {/* <RadioGroupField
                id="whatsappenabledisabled"
                name="whatsappenabledisabled"
                // label="Enable Whatsapp"
                options={whatsappenabledisabled}
                value={whatsappStatus}
                onChange={(e) => setWhatsappStatus(e.target.value)}
              /> */}
              {whatsappStatus === "enable" && (
                <>
                  <div id="whatsapptable">
                    <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                      <AnimatedDropdown
                        id="whatsappcountryselect"
                        name="whatsappcountryselect"
                        label="Select Country"
                        options={countryOptions}
                        value={whatsappCountry}
                        onChange={(value) => setWhatsappCountry(value)}
                      />

                      <InputField
                        id="whatsapputility"
                        name="whatsapputility"
                        label="Utility"
                        placeholder="INR / Credit"
                        value={whatsappUtility}
                        onChange={(e) =>
                          validateInput(e.target.value, setWhatsappUtility)
                        }
                        type="text"
                        readOnly={!whatsappCountry}
                      />

                      <InputField
                        id="whatsappmarketing"
                        name="whatsappmarketing"
                        label="Marketing"
                        placeholder="INR / Credit"
                        value={whatsappMarketing}
                        onChange={(e) =>
                          validateInput(e.target.value, setWhatsappMarketing)
                        }
                        type="text"
                        readOnly={!whatsappCountry}
                      />

                      <UniversalButton
                        label="Add"
                        id="whatsaapaddcredit"
                        name="whatsaapaddcredit"
                        onClick={handleWhatsappAddCredit}
                      />
                    </div>

                    <DataTable
                      height={280}
                      id="whatsapp-rate-table"
                      name="whatsappRateTable"
                      col={whatsaappcolumns}
                      rows={whatsapprows}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="whatsappsave"
                      name="whatsappsave"
                    />
                  </div>
                </>
              )}

              {/* Edit whatsapp Rate */}
              <Dialog
                header="Edit WhatsApp Rate"
                visible={editWhatsappVisible}
                onHide={() => setEditWhatsappVisible(false)}
                style={{ width: "30rem" }}
                draggable={false}
              >
                <div className="space-y-4">
                  <DropdownWithSearch
                    id="editCountry"
                    name="editCountry"
                    label="Country"
                    value={editWhatsappForm.countryCode}
                    options={countryOptions}
                    onChange={(val) =>
                      setEditWhatsappForm((prev) => ({
                        ...prev,
                        countryCode: val,
                      }))
                    }
                  />

                  <InputField
                    label="Utility"
                    value={editWhatsappForm.utility}
                    onChange={(e) =>
                      setEditWhatsappForm((prev) => ({
                        ...prev,
                        utility: e.target.value,
                      }))
                    }
                  />

                  <InputField
                    label="Marketing"
                    value={editWhatsappForm.marketing}
                    onChange={(e) =>
                      setEditWhatsappForm((prev) => ({
                        ...prev,
                        marketing: e.target.value,
                      }))
                    }
                  />

                  <div className="flex justify-end">
                    <UniversalButton
                      label="Update"
                      onClick={handleWhatsappUpdate}
                    />
                  </div>
                </div>
              </Dialog>

              {/* Delete whatsapp Rate  */}
              <Dialog
                header="Delete WhatsApp Rate"
                visible={whatsappDeleteVisible}
                style={{ width: "27rem" }}
                onHide={() => setWhatsappDeleteVisible(false)}
                draggable={false}
              >
                <div className="flex items-center justify-center">
                  <CancelOutlinedIcon sx={{ fontSize: 64, color: "#ff3f3f" }} />
                </div>
                <div className="p-4 text-center">
                  <p className="text-[1.1rem] font-semibold text-gray-700">
                    Delete rate for{" "}
                    <span className="text-green-600">
                      {editingRow?.countryName}
                    </span>
                    ?
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    This action cannot be undone.
                  </p>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <UniversalButton
                    label="Cancel"
                    onClick={() => setWhatsappDeleteVisible(false)}
                  />
                  <UniversalButton
                    label="Delete"
                    onClick={async () => {
                      const res = await deleteWhatsappRateBySrno(
                        editingRow.srno
                      );
                      if (res?.message?.toLowerCase().includes("success")) {
                        toast.success("Rate deleted.");
                        fetchWhatsappRateData(currentUserSrno);
                        setWhatsappDeleteVisible(false);
                      } else {
                        toast.error(res.message || "Delete failed.");
                      }
                    }}
                  />
                </div>
              </Dialog>
            </div>
          </CustomTabPanel>

          {/* RCS */}
          <CustomTabPanel value={value} index={1}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                {/* Option 1 */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="rcsOption1"
                      name="rcsredio"
                      value="enable"
                      onChange={handleChangercs}
                      checked={rcsStatus === "enable"}
                    />
                    <label
                      htmlFor="rcsOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="rcsOption2"
                      name="rcsredio"
                      value="disable"
                      onChange={handleChangercs}
                      checked={rcsStatus === "disable"}
                    />
                    <label
                      htmlFor="rcsOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>

              {/* <RadioGroupField
                id="rcsenabledisabled"
                name="rcsenabledisabled"
                // label="Enable Whatsapp"
                options={rcsenabledisabled}
                value={rcsStatus}
                onChange={(e) => setRcsStatus(e.target.value)}
              /> */}
              {rcsStatus === "enable" && (
                <>
                  <div id="rcstable">
                    <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                      <AnimatedDropdown
                        id="rcscountryselect"
                        name="rcscountryselect"
                        label="Select Country"
                        options={rcscountryOptions}
                        value={rcsCountry}
                        onChange={(value) => setRcsCountry(value)}
                      />

                      <InputField
                        id="rcsrate"
                        name="rcsrate"
                        label="Rate"
                        placeholder="INR / Credit"
                        value={rcsrate}
                        onChange={(e) =>
                          validateInput(e.target.value, setRcsrate)
                        }
                        type="text"
                        readOnly={!rcsCountry}
                      />

                      <UniversalButton
                        label="Add"
                        id="rcsaddcredit"
                        name="rcsaddcredit"
                        onClick={handleRcsAddCredit}
                      />
                    </div>

                    <Paper sx={{ height: 250 }} id={id} name={name}>
                      <DataGrid
                        id={id}
                        name={name}
                        rows={rcsrows}
                        columns={rcscolumns}
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
                        onRowSelectionModelChange={(ids) =>
                          setSelectedRows(ids)
                        }
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
                  <div className="flex justify-center mt-3">
                    <UniversalButton label="Save" id="rcssave" name="rcssave" />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>

          {/* SMS */}
          <CustomTabPanel value={value} index={2}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                {/* Option 1 */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="smsOption1"
                      name="smsredio"
                      value="enable"
                      onChange={handleChangesms}
                      checked={smsStatus === "enable"}
                    />
                    <label
                      htmlFor="smsOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="smsOption2"
                      name="smsredio"
                      value="disable"
                      onChange={handleChangesms}
                      checked={smsStatus === "disable"}
                    />
                    <label
                      htmlFor="smsOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>

              {smsStatus === "enable" && (
                <div className="">
                  <div className="space-y-2">
                    <p>Transaction Service</p>
                    <div className="flex mb-2 lg:w-100 md:w-100">
                      <Checkbox
                        id="smsstatus"
                        name="smsstatus"
                        onChange={(e) => setTranscheck(e.checked)}
                        checked={transcheck}
                        className="m-2"
                      />

                      <AnimatedDropdown
                        id="transdropdown"
                        name="transdropdown"
                        options={transOptions}
                        value={trans} // <- should be the selected serviceId
                        onChange={(selected) => setTrans(selected)} // selected.value if needed
                        disabled={!transcheck}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p>Promotion Service</p>
                    <div className="flex lg:w-100 md:w-100">
                      <Checkbox
                        id="smspromo"
                        name="smspromo"
                        onChange={(e) => setPromocheck(e.checked)}
                        checked={promocheck}
                        className="m-2"
                      />

                      <AnimatedDropdown
                        id="promodropdown"
                        name="promodropdown"
                        options={promoOption}
                        value={promo}
                        onChange={(selected) => setPromo(selected)}
                        disabled={!promocheck}
                      />
                    </div>
                  </div>

                  <div className="flex gap-5 items-center justify-start mt-3">
                    <div className=" lg:w-100 md:w-100">
                      <InputField
                        id="translimit"
                        name="translimit"
                        label="Rate"
                        placeholder="(INR / Credit)"
                        value={smsrate}
                        onChange={(e) =>
                          validateInput(e.target.value, setSmsRate)
                        }
                        type="number"
                      />
                    </div>
                    <div className=" lg:w-100 md:w-100">
                      <InputField
                        id="dltRate"
                        name="dltRate"
                        label="Dlt Rate"
                        placeholder="(INR / Credit)"
                        value={dltRate}
                        onChange={(e) =>
                          validateInput(e.target.value, setDltRate)
                        }
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="smsSave"
                      name="smsSave"
                      onClick={handleSaveSmsPricing}
                    />
                  </div>
                </div>
              )}
            </div>
          </CustomTabPanel>

          {/* OBD */}
          <CustomTabPanel value={value} index={3}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                {/* Option 1 */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="obdOption1"
                      name="obdredio"
                      value="enable"
                      onChange={handleChangeobd}
                      checked={obdStatus === "enable"}
                    />
                    <label
                      htmlFor="obdOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="obdOption2"
                      name="obdredio"
                      value="disable"
                      onChange={handleChangeobd}
                      checked={obdStatus === "disable"}
                    />
                    <label
                      htmlFor="obdOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>

              {obdStatus === "enable" && (
                <div>
                  <div className="flex mb-2 lg:w-100 md:w-100">
                    <Checkbox
                      id="obdstatusobd"
                      name="obdstatusobd"
                      onChange={(e) => setTranscheckobd(e.checked)}
                      checked={transcheckobd}
                      className="m-2"
                    />

                    <AnimatedDropdown
                      id="transdropdownobd"
                      name="transdropdownobd"
                      options={transOptionsobd}
                      value={transobd}
                      onChange={(value) => setTransobd(value)}
                      disabled={!transcheckobd}
                    />
                  </div>
                  <div className="flex lg:w-100 md:w-100">
                    <Checkbox
                      id="obdstatuspromo"
                      name="obdstatuspromo"
                      onChange={(e) => setPromocheckobd(e.checked)}
                      checked={promocheckobd}
                      className="m-2"
                    />

                    <AnimatedDropdown
                      id="transdropdownobd"
                      name="transdropdownobd"
                      options={promoOptionobd}
                      value={promoobd}
                      onChange={(value) => setPromoobd(value)}
                      disabled={!promocheckobd}
                    />
                  </div>

                  <div className=" lg:w-100 md:w-100">
                    <div className="flex flex-wrap gap-4 my-2 lg:w-100 md:w-100 ">
                      {/* Option 1 */}
                      <div className="flex items-center gap-2">
                        <RadioButton
                          inputId="obdrateOption1"
                          name="obdrateredio"
                          value="enable"
                          onChange={handleChangeobdRate}
                          checked={obdrateStatus === "enable"}
                        />
                        <label
                          htmlFor="obdrateOption1"
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          @ 15 sec
                        </label>
                      </div>
                      {/* Option 2 */}
                      <div className="flex items-center gap-2">
                        <RadioButton
                          inputId="obdrateOption2"
                          name="obdrateredio"
                          value="disable"
                          onChange={handleChangeobdRate}
                          checked={obdrateStatus === "disable"}
                        />
                        <label
                          htmlFor="obdrateOption2"
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          @ 30 sec
                        </label>
                      </div>
                    </div>
                    <InputField
                      id="transratesobd"
                      name="transratesobd"
                      label="Rate"
                      placeholder="(INR / Credit)"
                      value={obdrate}
                      onChange={(e) =>
                        validateInput(e.target.value, setObdRate)
                      }
                      type="number"
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="whatsappsave"
                      name="whatsappsave"
                    />
                  </div>
                </div>
              )}
            </div>
          </CustomTabPanel>

          {/* Two way sms */}
          <CustomTabPanel value={value} index={4}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                {/* Option 1 */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="twowayOption1"
                      name="twowayredio"
                      value="enable"
                      onChange={handleChangetwoway}
                      checked={twowayStatus === "enable"}
                    />
                    <label
                      htmlFor="twowayOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="twowayOption2"
                      name="twowayredio"
                      value="disable"
                      onChange={handleChangetwoway}
                      checked={twowayStatus === "disable"}
                    />
                    <label
                      htmlFor="twowayOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {twowayStatus === "enable" && (
                <>
                  <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                    <AnimatedDropdown
                      id="twowayselect"
                      name="twowayselect"
                      label="Assign Validity"
                      options={twowayOptions}
                      value={twowayAssign}
                      onChange={(value) => setTwowayAssign(value)}
                    />
                    <InputField
                      id="twowayrate"
                      name="twowayrate"
                      label="Rate"
                      placeholder="INR"
                      type="number"
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="twowaysave"
                      name="twowaysave"
                    />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>

          {/* Missed Call */}
          <CustomTabPanel value={value} index={5}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                {/* Option 1 */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="misscallOption1"
                      name="misscallredio"
                      value="enable"
                      onChange={handleChangeMisscall}
                      checked={misscallStatus === "enable"}
                    />
                    <label
                      htmlFor="misscallOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="misscallOption2"
                      name="misscallredio"
                      value="disable"
                      onChange={handleChangeMisscall}
                      checked={misscallStatus === "disable"}
                    />
                    <label
                      htmlFor="misscallOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {misscallStatus === "enable" && (
                <>
                  <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                    <AnimatedDropdown
                      id="misscallselect"
                      name="misscallselect"
                      label="Assign Validity"
                      options={misscallOptions}
                      value={misscallAssign}
                      onChange={(value) => setMisscallAssign(value)}
                    />
                    <InputField
                      id="misscallrate"
                      name="misscallrate"
                      label="Rate"
                      placeholder="INR"
                      type="number"
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="misscallsave"
                      name="misscallsave"
                    />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>

          {/* C2C */}
          <CustomTabPanel value={value} index={6}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                {/* Option 1 */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="clickOption1"
                      name="clickredio"
                      value="enable"
                      onChange={handleChangeClick}
                      checked={clickStatus === "enable"}
                    />
                    <label
                      htmlFor="clickOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="clickOption2"
                      name="clickredio"
                      value="disable"
                      onChange={handleChangeClick}
                      checked={clickStatus === "disable"}
                    />
                    <label
                      htmlFor="clickOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {clickStatus === "enable" && (
                <>
                  <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap lg:w-100 md:w-100">
                    <InputField
                      id="clickrate"
                      name="clickrate"
                      label="Rate"
                      placeholder="(INR / Credit)"
                      type="number"
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="clicksave"
                      name="clicksave"
                    />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>

          {/* Email */}
          <CustomTabPanel value={value} index={7}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                {/* Option 1 */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="emailOption1"
                      name="emailredio"
                      value="enable"
                      onChange={handleChangeEmail}
                      checked={emailStatus === "enable"}
                    />
                    <label
                      htmlFor="emailOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="emailOption2"
                      name="emailredio"
                      value="disable"
                      onChange={handleChangeEmail}
                      checked={emailStatus === "disable"}
                    />
                    <label
                      htmlFor="emailOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {emailStatus === "enable" && (
                <>
                  <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                    <AnimatedDropdown
                      id="emailselect"
                      name="emailselect"
                      label="Assign Validity"
                      options={emailOptions}
                      value={emailAssign}
                      onChange={(value) => setEmailAssign(value)}
                    />
                    <InputField
                      id="emailrate"
                      name="emailrate"
                      label="Rate"
                      placeholder="(INR / Credit)"
                      type="number"
                    />
                  </div>

                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="emailsave"
                      name="emailsave"
                    />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>

          {/* IBD */}
          <CustomTabPanel value={value} index={8}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                {/* Option 1 */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="ibdOption1"
                      name="ibdredio"
                      value="enable"
                      onChange={handleChangeIbd}
                      checked={ibdStatus === "enable"}
                    />
                    <label
                      htmlFor="ibdOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="ibdOption2"
                      name="ibdredio"
                      value="disable"
                      onChange={handleChangeIbd}
                      checked={ibdStatus === "disable"}
                    />
                    <label
                      htmlFor="ibdOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {ibdStatus === "enable" && (
                <>
                  <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                    <AnimatedDropdown
                      id="ibdselect"
                      name="ibdselect"
                      label="Assign Validity"
                      options={ibdOptions}
                      value={ibdAssign}
                      onChange={(value) => setIbdAssign(value)}
                    />
                    <InputField
                      id="ibdrate"
                      name="ibdrate"
                      label="Rate"
                      placeholder="(INR / Credit)"
                      type="number"
                    />
                  </div>
                  <div className=" lg:w-100 md:w-100">
                    <div className="flex flex-wrap gap-4 my-2 lg:w-100 md:w-100 ">
                      {/* Option 1 */}
                      <div className="flex items-center gap-2">
                        <RadioButton
                          inputId="ibdpulseOption1"
                          name="ibdpulseredio"
                          value="enable"
                          onChange={handleChangeibdPulse}
                          checked={ibdpulseStatus === "enable"}
                        />
                        <label
                          htmlFor="ibdpulseOption1"
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          Enable
                        </label>
                      </div>
                      {/* Option 2 */}
                      <div className="flex items-center gap-2">
                        <RadioButton
                          inputId="ibdpulseOption2"
                          name="ibdpulseredio"
                          value="disable"
                          onChange={handleChangeibdPulse}
                          checked={ibdpulseStatus === "disable"}
                        />
                        <label
                          htmlFor="ibdpulseOption2"
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          Disable
                        </label>
                      </div>
                    </div>
                    {ibdpulseStatus === "enable" && (
                      <InputField
                        id="ibdpulselimit"
                        name="ibdpulselimit"
                        label="Pulse Limit"
                        placeholder="(INR / Credit)"
                        type="number"
                      />
                    )}
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton label="Save" id="ibdsave" name="ibdsave" />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>
        </Box>
      </Dialog>
      {/* assignService */}

      {/* Manage Api Key */}
      <Dialog
        header="Manage Api Key "
        visible={manageApiKeys}
        onHide={() => setManageApiKeys(false)}
        className="w-[30rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <InputField
            id="apimanagekey"
            name="apimanagekey"
            type="text"
            label="Old key"
            placeholder="Enter Old key"
            readOnly
          />
          <div className="flex items-end gap-2">
            <div className="flex-1 ">
              <InputField
                id="newapikey"
                name="newapikey"
                type="text"
                label="New API Key"
                placeholder="Generate New Key"
                value={newAPIKey}
                readOnly
                style={{ cursor: "not-allowed", backgroundColor: "#E5E7EB" }}
              />
            </div>
            <div>
              <button
                onClick={handleGenerateAPIKey}
                className="px-2 py-2 text-sm text-white bg-blue-400 rounded-md shadow-md hover:bg-blue-500 focus:outline-none"
              >
                Generate Key
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <UniversalButton
            label="Save"
            id="apisaveButton"
            name="apisaveButton"
            variant="primary"
          />
        </div>
      </Dialog>
      {/* Manage Api Key */}

      {/* reset service */}
      <Dialog
        header="reset service"
        visible={reset}
        onHide={() => setreset(false)}
        className="w-[30rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <div className="relative">
            <InputField
              id="username"
              name="username"
              label="User Name"
              placeholder="demo"
            />
          </div>
          <GeneratePasswordSettings
            id="newPassword"
            name="newPassword"
            type={"text"}
            label="New Password"
            placeholder="Enter your new password"
            value={newPassword}
          />
        </div>
        <div className="flex justify-center mt-4">
          <UniversalButton
            label="Save"
            id="apisaveButton"
            name="apisaveButton"
            variant="primary"
          />
        </div>
      </Dialog>
      {/* reset service */}

      {/* User Report */}
      <Dialog
        header="User Report"
        visible={userReports}
        onHide={() => setuserReports(false)}
        className="w-[30rem]"
        draggable={false}
      >
        <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
          {/* Option 1 */}
          <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="userreportOption1"
                name="userreportredio"
                value="enable"
                onChange={handleChangeuserreport}
                checked={userreportStatus === "enable"}
              />
              <label
                htmlFor="userreportOption1"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Enable
              </label>
            </div>
          </div>
          {/* Option 2 */}
          <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="userreportOption2"
                name="userreportredio"
                value="disable"
                onChange={handleChangeuserreport}
                checked={userreportStatus === "disable"}
              />
              <label
                htmlFor="userreportOption2"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Disable
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-3">
          <UniversalButton
            label="Save"
            id="userreportsave"
            name="userreportsave"
          />
        </div>
      </Dialog>
      {/* User Report */}
    </>
  );
};

export default ManageUserTable;
