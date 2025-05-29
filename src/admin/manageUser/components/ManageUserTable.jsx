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
  addMobileNumbers,
  fetchUserbySrno,
  getAllowedServices,
  getMobileNumbers,
  getPromoServices,
  getTransServices,
  saveServicesByUser,
  updateUserbySrno,
} from "@/apis/admin/admin";
import {
  addSmsPricing,
  deleteRCSRateBySrno,
  deleteWhatsappRateBySrno,
  getRCSRateBySrno,
  getRCSRateData,
  getSmsRateByUser,
  getVoiceRateBySrno,
  getVoiceRateByUser,
  getWhatsappRateBySrno,
  getWhatsappRateData,
  saveEditRcsRate,
  saveEditWhatsappRate,
  saveVoiceRate,
} from "@/apis/admin/userRate";
import { getCountryList } from "@/apis/common/common";
import { DataTable } from "@/components/layout/DataTable";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getRcsRate } from "@/apis/user/user";
import moment from "moment";
import {
  getApiKey,
  getOldApiKey,
  updateApiKey,
  updatePassword,
} from "@/apis/settings/setting";
import { HiLink } from "react-icons/hi2";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

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
          onMouseEnter: () => setOpen(true),
          onMouseLeave: handlePopoverClose,
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

const ManageUserTable = ({ id, name, allUsers = [], fetchAllUsersDetails }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [logins, setLogins] = useState(false);
  const [petmDialogVisible, setPETMDialogVisible] = useState(false);
  const [otpService, setOtpService] = useState(false);
  const [viewService, setViewService] = useState(false);
  const [editService, setEditDetailsDialogVisible] = useState(false);
  const [assignRate, setassignRate] = useState(false);
  const [manageApiKeys, setManageApiKeys] = useState(false);
  const [oldKey, setOldKey] = useState("");
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

  const [selectedIds, setSelectedIds] = useState([]);

  // const handleDetailsUpdate = async () => {
  //   const data = {
  //     srno: selectedId,
  //     ...updateDetails,
  //   };
  // };

  const handleEdit = async (srNo) => {
    try {
      const response = await fetchUserbySrno(srNo);
      if (response?.userMstPojoList?.length > 0) {
        const userDetails = response.userMstPojoList[0];

        const expDate = new Date(userDetails.expiryDate);
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
          expiryDate: expDate || new Date(),
          applicationType: userDetails.applicationType || "",
          userType: userDetails.userType || "",
          country: userDetails.country || "",
          state: userDetails.state || "",
          city: userDetails.city || "",
          pinCode: userDetails.pinCode || "",
          srno: userDetails.srno || "",
        });
        setSelectedId(srNo);
        setEditDetailsDialogVisible(true);
      } else {
        toast.error("No user details found for the selected user.");
      }
    } catch (error) {
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
      expiryDate: formattedExpiryDate,
    };

    try {
      const response = await updateUserbySrno(data);
      if (response?.msg === "User Updated Successfully") {
        toast.success("User details updated successfully!");
        setEditDetailsDialogVisible(false);
        fetchAllUsersDetails();
      } else {
        toast.error(response?.message || "Failed to update user details.");
      }
    } catch (error) {
      toast.error("Failed to update user details. Please try again.");
    }
  };
  // assignRate

  const [countryOptions, setCountryOptions] = useState([]);

  // whatsapp Start
  const [whatsapprows, setWhatsapprows] = useState([]);
  const [rcsrows, setRcsrows] = useState([]);
  const [voicerowa, setVoicerows] = useState([]);
  const [whatsappStatus, setWhatsappStatus] = useState("disable");
  const [whatsappCountry, setWhatsappCountry] = useState(null);
  const [whatsappUtility, setWhatsappUtility] = useState("");
  const [whatsappMarketing, setWhatsappMarketing] = useState("");
  const [whatsappDeleteVisible, setWhatsappDeleteVisible] = useState(false);
  const [selectedWhatsappRow, setSelectedWhatsappRow] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

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

    const list = Array.isArray(res) ? res : res?.data;

    if (Array.isArray(list)) {
      const formatted = list.map((item, index) => {
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

      setWhatsapprows(formatted);
    } else {
      toast.error("No valid data returned from API");
    }
  };

  const fetchRcsRateData = async (userSrno) => {
    const res = await getRCSRateData(userSrno);

    const list = Array.isArray(res) ? res : res?.data;

    if (Array.isArray(list)) {
      const formatted = list.map((item, i) => {
        return {
          id: i + 1,
          sn: i + 1,
          srno: item.sr_no,
          ...item,
        };
      });

      setRcsrows(formatted);
    } else {
      toast.error("No valid data returned from API");
    }
  };
  const fetchObdRateData = async (userSrno) => {
    const res = await getVoiceRateBySrno(userSrno);
    if (res?.message?.includes("Record not found")) {
      return;
    }

    const formatted = [
      {
        id: 1,
        sn: 1,
        srno: res.srNo,
        ...res,
      },
    ];
    setVoicerows(formatted);

    // const list = Array.isArray(res) ? res : res?.data;

    // if (Array.isArray(list)) {
    //   const formatted = list.map((item, i) => {
    //     return {
    //       id: i + 1,
    //       sn: i + 1,
    //       srno: item.sr_no,
    //       ...item,
    //     };
    //   });

    // } else {
    //   console.warn("No valid data returned from API");
    // }
  };

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
    if (res?.message) {
      toast[
        res.message.toLowerCase().includes("success") ? "success" : "error"
      ](res.message);
    }

    if (res?.message?.toLowerCase().includes("success")) {
      await fetchWhatsappRateData(currentUserSrno);
      resetWhatsappFields();
    }
  };

  const handleWhatsappEdit = async (srno) => {
    const res = await getWhatsappRateBySrno(srno);

    const d = Array.isArray(res) ? res[0] : res?.data?.[0];

    if (d) {
      setEditWhatsappForm({
        srno: d.srno ?? srno,
        userSrno: String(d.user_srno),
        utility: String(d.transactional),
        marketing: String(d.promotional),
        countryCode: String(d.country_srno),
      });

      setEditWhatsappVisible(true);
    } else {
      toast.error("No data found for srno:", srno);
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

  // RCS Start
  const [rcsStatus, setRcsStatus] = useState("enable");
  const [rcsCountry, setRcsCountry] = useState(null);
  const [rcsrate, setRcsrate] = useState("");

  // const rcscountryOptions = [
  //   { value: "USA", label: "USA" },
  //   { value: "UK", label: "UK" },
  //   { value: "India", label: "India" },
  // ];

  const handleRcsAddCredit = async () => {
    try {
      const payload = {
        srno: "",
        userSrno: String(currentUserSrno),
        rate: String(rcsrate),
        country: String(rcsCountry),
      };
      const res = await saveEditRcsRate(payload);
      if (!res?.message?.includes("Successfully")) {
        toast.error(res?.message);
        return;
      }
      toast.success(res?.message);
      await fetchRcsRateData(currentUserSrno);
    } catch (e) {
      toast.error("Error in adding rcs credit");
    }
    // console.log("handleRcsCredit");
  };

  const handleChangercs = (event) => {
    setRcsStatus(event.target.value);
  };

  // RCS End

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

    const res = await addSmsPricing(payload);
    if (res?.statusCode === 200) {
      toast.success(res.message || "SMS Pricing saved successfully!");
      resetSmsFields();
      setassignRate(false);
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

  const [assignService, setAssignService] = useState(false);

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
  // assignRate

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

  const [enableServices, setEnableServices] = useState([
    {
      id: 1,
      name: "SMS",
      enable: false,
    },
    {
      id: 2,
      name: "WHATSAPP",
      enable: false,
    },
    {
      id: 3,
      name: "RCS",
      enable: false,
    },
    {
      id: 7,
      name: "OBD",
      enable: false,
    },
    {
      id: "",
      name: "Two Way",
      enable: false,
    },
    {
      id: "",
      name: "Missed Call",
      enable: false,
    },
    {
      id: "",
      name: "C2C",
      enable: false,
    },
    {
      id: "",
      name: "Email",
      enable: false,
    },
    {
      id: "",
      name: "IBD",
      enable: false,
    },
  ]);

  useEffect(() => {
    async function handleGetAllowedServices() {
      if (!currentUserSrno) return;
      try {
        const data = `?userSrno=${currentUserSrno}`;
        const res = await getAllowedServices(data);

        const formattedData = [
          { id: 1, name: "SMS", enable: false },
          { id: 2, name: "WHATSAPP", enable: false },
          { id: 3, name: "RCS", enable: false },
          { id: 7, name: "OBD", enable: false },
          { id: "", name: "Two Way", enable: false },
          { id: "", name: "Missed Call", enable: false },
          { id: "", name: "C2C", enable: false },
          { id: "", name: "Email", enable: false },
          { id: "", name: "IBD", enable: false },
        ];

        const entriesWithId = formattedData.filter((item) => item.id !== "");
        const entriesWithoutId = formattedData.filter((item) => item.id === "");

        const formattedMap = new Map(
          entriesWithId.map((item) => [item.id, item])
        );

        res?.forEach((item) => {
          const id = item.service_type_id;
          const name = item.display_name;

          if (formattedMap.has(id)) {
            const existing = formattedMap.get(id);
            existing.enable = true;
            existing.name = name;
          } else {
            formattedMap.set(id, { id, name, enable: true });
          }
        });

        const updatedFormattedData = [
          ...Array.from(formattedMap.values()),
          ...entriesWithoutId,
        ];

        setEnableServices(updatedFormattedData);
      } catch (e) {
        toast.error("Something went wrong");
      }
    }
    handleGetAllowedServices();
  }, [assignService]);

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
  };

  const [newAPIKey, setNewAPIKey] = useState("");

  // Function to generate an API key with only lowercase letters and numbers.
  const generateAPIKey = (length = 10) => {
    const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    for (let i = 0; i < length; i++) {
      key += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return key + "XX";
  };

  const handleGenerateAPIKey = async () => {
    try {
      const params = `?userSrno=${selectedId}`;
      const res = await getApiKey(params);
      setNewAPIKey(res?.Key);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  async function handleApiKeySave() {
    if (!newAPIKey) {
      return toast.error("Please generate API Key");
    }
    const data = {
      oldKey: oldKey,
      newKey: newAPIKey,
      userSrno: selectedId,
    };
    console.log(data);
    try {
      const res = await updateApiKey(data.newKey, data.userSrno);
      console.log(res);
      if (!res?.message.includes("succesfully")) {
        return toast.error(res?.message);
      }
      toast.success("API Key updated successfully");
      setManageApiKeys(false);
      setNewAPIKey("");
      setOldKey("");
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  const [newPassword, setNewPassword] = useState("");
  const [mobileNumbers, setMobileNumbers] = useState([""]);

  // Add new input field (Max 5)
  const addMobileNumber = () => {
    if (mobileNumbers.length >= 5) {
      toast.error("You can add a maximum of 5 mobile numbers.");
      return;
    }
    setMobileNumbers([...mobileNumbers, ""]);
  };

  async function saveMobileNumber() {
    try {
      const isEmpty = mobileNumbers.some((number) => !number.trim());

      if (isEmpty) {
        toast.error("Please enter mobile number in all inputs.");
        return;
      }
      const mbNo = mobileNumbers.join(",");
      const payload = {
        mbno: mbNo,
        userSrno: selectedIds,
      };
      const res = await addMobileNumbers(payload);
      if (!res?.msg.includes("successfully")) {
        toast.error(res?.msg);
      }
      toast.success("Mobile number updated successfully");
      setOtpService(false);
    } catch (e) {
      toast.error(e?.message || "Failed to update");
    }
  }

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

  const [userreportStatus, setUserReportStatus] = useState("disable");
  const handleChangeuserreport = (event) => {
    setUserReportStatus(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLonins = (id) => {
    setLogins(true);
  };

  const handlePetmChain = (id) => {
    setPETMDialogVisible(true);
    setSelectedId(id);
  };

  const handleOtp = (id) => {
    setOtpService(true);
    setSelectedId(id);
  };

  const allServices = [
    {
      id: 1,
      name: "SMS",
      enable: 0,
    },
    {
      id: 2,
      name: "WHATSAPP",
      enable: 0,
    },
    {
      id: 3,
      name: "RCS",
      enable: 0,
    },
    {
      id: 7,
      name: "OBD",
      enable: 0,
    },
    {
      id: "",
      name: "Two Way",
      enable: 0,
    },
    {
      id: "",
      name: "Missed Call",
      enable: 0,
    },
    {
      id: "",
      name: "C2C",
      enable: 0,
    },
    {
      id: "",
      name: "Email",
      enable: 0,
    },
    {
      id: "",
      name: "IBD",
      enable: 0,
    },
  ];

  // view user details
  const handleView = async (srNo) => {
    try {
      const response = await fetchUserbySrno(srNo);
      if (response?.userMstPojoList?.length > 0) {
        setSelectedUserDetails(response.userMstPojoList[0]);
        setViewService(true);
      } else {
        toast.error("No user details found for the selected user.");
      }
    } catch (error) {
      toast.error("Failed to fetch user details. Please try again.");
    }
  };

  const handleService = async (srno) => {
    setAssignService(true);
    setCurrentUserSrno(srno);
  };
  const handleAssignService = async () => {
    // console.log(currentUserSrno);

    // const enabled = enableServices.filter((item) => item.enable === true);

    await Promise.all(
      enableServices.map((item) => {
        if (!item.id) return;
        const payload = {
          userSrNo: String(currentUserSrno),
          allowService: item.enable === true ? 1 : 0,
          serviceTypeSrNo: String(item.id),
        };
        return saveServicesByUser(payload);
      })
    );
    setAssignService(false);
  };

  const handleAssign = async (srNo) => {
    setassignRate(true);
    setCurrentUserSrno(srNo);

    setTimeout(() => {
      fetchWhatsappRateData(srNo);
    }, 0);

    const [
      transRes,
      promoRes,
      userSmsData,
      countryListRes,
      whatsappRateRes,
      rcsRateRes,
      obdRateRes,
    ] = await Promise.all([
      getTransServices(),
      getPromoServices(),
      getSmsRateByUser(srNo),
      getCountryList(),
      getWhatsappRateData(srNo),
      getRCSRateData(srNo),
      getVoiceRateByUser(srNo),
    ]);

    // Country List
    if (countryListRes) {
      setCountryOptions(
        countryListRes.map((item) => ({
          label: item.countryName,
          value: item.srNo,
        }))
      );
    }

    // Transaction
    setTransOptions(
      (transRes || []).map((item) => ({
        label: item.serviceName,
        value: String(item.serviceId),
      }))
    );

    // Promotion
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
    const rcsRowss = Array.isArray(rcsRateRes)
      ? rcsRateRes.map((item, index) => ({
          id: index + 1,
          sn: index + 1,
          srno: item.sr_no,
          ...item,
        }))
      : [];
    rcsRateRes.length > 0 && setRcsrows(rcsRowss);

    obdRateRes &&
      setVoicerows([
        {
          id: 1,
          sn: 1,
          srno: obdRateRes?.srNo,
          ...obdRateRes,
        },
      ]);

    // obdRateRes && setVoicerows(voiceRows);
  };

  const handleApikey = async (id, name) => {
    try {
      const params = `?userSrno=${id}`;
      const res = await getOldApiKey(params);
      setOldKey(res?.oldkey);
      setManageApiKeys(true);
      setSelectedId(id);
    } catch (e) {
      toast.error("Failed to fetch user details. Please try again.");
    }
  };

  const handleReset = (id, name) => {
    setreset(true);
    setSelectedIds(id);
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
    // { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const isActive = params.value === 1;
        return (
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span>{isActive ? "Active" : "Inactive"}</span>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 400,
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
            <IconButton onClick={() => handleService(params.row.srno)}>
              <SettingsOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Assign Rate" placement="top">
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
          <CustomTooltip arrow title="PETM Link Chain" placement="top">
            <IconButton onClick={() => handlePetmChain(params.row.srno)}>
              <HiLink className="size-[1.2rem] text-gray-500" />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

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
          <CustomTooltip arrow title="Edit Rate" placement="top">
            <IconButton onClick={() => handleWhatsappEdit(params.row.srno)}>
              <EditNoteIcon sx={{ fontSize: "1.2rem", color: "gray" }} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Delete Rate" placement="top">
            <IconButton onClick={() => handleWhatsappDelete(params.row.srno)}>
              <DeleteForeverIcon sx={{ fontSize: "1.2rem", color: "red" }} />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  // const rcscolumns = [
  //   { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
  //   { field: "country", headerName: "Country", flex: 1, minWidth: 120 },
  //   { field: "rate", headerName: "Rate (INR/Credit)", flex: 1, minWidth: 120 },
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     flex: 1,
  //     minWidth: 100,
  //     renderCell: (params) => (
  //       <>
  //         <CustomTooltip arrow title="Edit" placement="top">
  //           <IconButton onClick={() => handleRcsEdit(params.row)}>
  //             <EditNoteIcon
  //               sx={{
  //                 fontSize: "1.2rem",
  //                 color: "gray",
  //               }}
  //             />
  //           </IconButton>
  //         </CustomTooltip>
  //         <CustomTooltip arrow title="Delete" placement="top">
  //           <IconButton onClick={() => handleRcsDelete(params.row)}>
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

  async function handleRcsEdit(srno) {
    const res = await getRCSRateBySrno(srno);
    console.log("res", res);

    // const d = Array.isArray(res) ? res[0] : res?.data?.[0];

    // if (d) {
    //   setEditWhatsappForm({
    //     srno: d.srno ?? srno,
    //     userSrno: String(d.user_srno),
    //     utility: String(d.transactional),
    //     marketing: String(d.promotional),
    //     countryCode: String(d.country_srno),
    //   });

    //   setEditWhatsappVisible(true);
    // } else {
    //   console.warn("No data found for srno:", srno);
    // }
  }
  async function handleRcsDelete(srno) {
    try {
      const res = await deleteRCSRateBySrno(srno);
      if (!res.statusCode) {
        return toast.error(res.message);
      }
      toast.success(res.message);
      await fetchRcsRateData(currentUserSrno);
    } catch (e) {
      toast.error("Error in deleting rcs credit");
    }
  }
  const rcscolumns = [
    { field: "sn", headerName: "S.No", flex: 0.5 },
    { field: "country_name", headerName: "Country", flex: 1 },
    { field: "rate", headerName: "Rate", flex: 1 },
    { field: "update_time", headerName: "Updated On", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Edit Rate" placement="top">
            <IconButton onClick={() => handleRcsEdit(params.row.sr_no)}>
              <EditNoteIcon sx={{ fontSize: "1.2rem", color: "gray" }} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Delete Rate" placement="top">
            <IconButton onClick={() => handleRcsDelete(params.row.sr_no)}>
              <DeleteForeverIcon sx={{ fontSize: "1.2rem", color: "red" }} />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  const voiceCols = [
    { field: "sn", headerName: "S.No", flex: 0.5 },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => {
        if (params.row.voicePlan === 1) {
          return "15sec";
        } else {
          return "30sec";
        }
      },
    },

    {
      field: "rate",
      headerName: "Rate",
      flex: 1,
      renderCell: (params) => {
        if (params.row.voicePlan === 2) {
          return params.row.voiceRate2;
        } else {
          return params.row.voiceRate;
        }
      },
    },
    { field: "updateTime", headerName: "Updated On", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Edit Rate" placement="top">
            <IconButton onClick={() => handleRcsEdit(params.row.sr_no)}>
              <EditNoteIcon sx={{ fontSize: "1.2rem", color: "gray" }} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Delete Rate" placement="top">
            <IconButton onClick={() => handleRcsDelete(params.row.sr_no)}>
              <DeleteForeverIcon sx={{ fontSize: "1.2rem", color: "red" }} />
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

  // const rcsrows = Array.from({ length: 20 }, (_, i) => ({
  //   id: i + 1,
  //   sn: i + 1,
  //   country: "India",
  //   rate: "0.30",
  // }));

  async function handleSaveOBDPricing() {
    try {
      const payload = {
        srNo: "",
        userSrNo: currentUserSrno,
        voicePlan: obdrateStatus === "enable" ? "1" : "2",
        voiceRate: 0,
        voiceRate2: 0,
      };
      obdrateStatus === "enable"
        ? (payload.voiceRate = obdrate)
        : (payload.voiceRate2 = obdrate);
      const res = await saveVoiceRate(payload);

      if (!res?.message.includes("successfully")) {
        return toast.error(res.message);
      }
      toast.success(res.message);
      // await fetchRcsRateData(currentUserSrno);
      await fetchObdRateData(currentUserSrno);
    } catch (e) {
      toast.error("Error in saving obd pricing");
    }
  }

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

  const RcsCustomFooter = () => {
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
            Total Records:
            <span className="font-semibold">{rcsrows.length}</span>
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

  function handleServiceChange(e) {
    const { id, checked } = e.target;

    const updatedService = enableServices.map((item) =>
      item.id == id ? { ...item, enable: checked } : item
    );

    setEnableServices(updatedService);
  }

  async function handleResetPassword() {
    if (!newPassword) return toast.error("Please enter new password");
    const data = {
      userSrno: selectedIds,
      newpass: newPassword,
    };

    const params = `?userSrno=${selectedIds}`;

    try {
      const res = await updatePassword(data, params);
      console.log(res);
      if (!res.msg?.includes("successfully")) {
        return toast.error("Error in resetting password");
      }
      toast.success("Password reset successfully");
      setreset(false);
    } catch (e) {
      return toast.error("Error in resetting password");
    }
  }

  useEffect(() => {
    if (!selectedId) return;
    async function fetchMobileNo() {
      try {
        const res = await getMobileNumbers(selectedIds);
        const mobile = res?.regMoblienos?.split(",");
        setMobileNumbers(mobile || [""]);
        // setotp
      } catch (e) {
        return toast.error(e.message);
      }
    }
    fetchMobileNo();
  }, [otpService]);

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

          <div className="lg:w-100 md:w-100 flex flex-wrap gap-4 mt-5">
            <div className="flex justify-center items-center">
              <UniversalLabel
                text="Status"
                id="editstatus"
                name="editstatus"
                className="text-sm font-medium text-gray-700"
              />
            </div>
            {/* Option 1 */}
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="employeeidviewOption1"
                name="employeeidviewredio"
                value="enable"
                onChange={() => {
                  setUpdateDetails({
                    ...updateDetails,
                    status: 1,
                  });
                }}
                checked={updateDetails.status == 1 ? true : false}
              />
              <label
                htmlFor="employeeidviewOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Active
              </label>
            </div>
            {/* Option 2 */}
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="employeeidviewOption2"
                name="employeeidviewredio"
                value="disable"
                onChange={() => {
                  setUpdateDetails({
                    ...updateDetails,
                    status: 0,
                  });
                }}
                checked={updateDetails.status == 0 ? true : false}
              />
              <label
                htmlFor="employeeidviewOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Inactive
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

      {/* PETM Chain */}
      <Dialog
        header="Configure PETM Chain"
        visible={petmDialogVisible}
        onHide={() => setPETMDialogVisible(false)}
        className="w-[30rem]"
        draggable={false}
      >
        PETM CHAIN
      </Dialog>
      {/* PETM Chain */}

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
              onClick={saveMobileNumber}
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
                  {(selectedUserDetails.userType === 3 && "Reseller User") ||
                    "Not Available"}
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
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CampaignOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Promo Service : </strong>
                  {selectedUserDetails.promoService || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <SmsOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Trans Service : </strong>
                  {selectedUserDetails.transService || "Not Available"}
                </p>
              </div>
            </div> */}

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

      {/* assignRate */}
      <Dialog
        header="Assign Rate"
        visible={assignRate}
        onHide={() => setassignRate(false)}
        className="lg:w-[65rem] md:w-[50rem] w-[20rem]"
        draggable={false}
      >
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Assign Rate Tabs"
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
              <>
                <div id="whatsapptable">
                  <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                    <DropdownWithSearch
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
                    height={288}
                    id="whatsapp-rate-table"
                    name="whatsappRateTable"
                    col={whatsaappcolumns}
                    rows={whatsapprows}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                  />
                </div>
                <div className="flex justify-center mt-3">
                  {/* <UniversalButton
                      label="Save"
                      id="whatsappsave"
                      name="whatsappsave"
                    /> */}
                </div>
              </>

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
                  <div className="flex items-center gap-5">
                    <InputField
                      label="Utility"
                      value={editWhatsappForm.utility}
                      onChange={(e) =>
                        validateInput(e.target.value, (val) =>
                          setEditWhatsappForm((prev) => ({
                            ...prev,
                            utility: val,
                          }))
                        )
                      }
                    />

                    <InputField
                      label="Marketing"
                      value={editWhatsappForm.marketing}
                      onChange={(e) =>
                        validateInput(e.target.value, (val) =>
                          setEditWhatsappForm((prev) => ({
                            ...prev,
                            marketing: val,
                          }))
                        )
                      }
                    />
                  </div>

                  <div className="flex justify-center">
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
            <>
              <div id="rcstable">
                <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                  <DropdownWithSearch
                    id="rcscountryselect"
                    name="rcscountryselect"
                    label="Select Country"
                    options={countryOptions}
                    value={rcsCountry}
                    onChange={(value) => setRcsCountry(value)}
                  />

                  <InputField
                    id="rcsrate"
                    name="rcsrate"
                    label="Rate"
                    placeholder="INR / Credit"
                    value={rcsrate}
                    onChange={(e) => validateInput(e.target.value, setRcsrate)}
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
                      footer: RcsCustomFooter,
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

                {/* <DataTable
                      height={280}
                      id="rcs-rate-table"
                      name="rcsRateTable"
                      rows={rcsrows}
                      columns={rcscolumns}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                    /> */}
              </div>
              {/* <div className="flex justify-center mt-3">
                    <UniversalButton label="Save" id="rcssave" name="rcssave" />
                  </div> */}
            </>
          </CustomTabPanel>

          {/* SMS */}
          <CustomTabPanel value={value} index={2}>
            <>
              {/* <div className="space-y-2">
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
              </div> */}

              <div className="flex gap-5 items-center justify-start mt-3">
                <div className=" lg:w-100 md:w-100">
                  <InputField
                    id="translimit"
                    name="translimit"
                    label="Rate"
                    placeholder="(INR / Credit)"
                    value={smsrate}
                    onChange={(e) => validateInput(e.target.value, setSmsRate)}
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
                    onChange={(e) => validateInput(e.target.value, setDltRate)}
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
            </>
          </CustomTabPanel>

          {/* OBD */}
          <CustomTabPanel value={value} index={3}>
            <>
              {/* <div className="flex mb-2 lg:w-100 md:w-100">
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
              </div> */}

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
                <div className="flex  gap-5 items-center justify-center mt-3">
                  <InputField
                    id="transratesobd"
                    name="transratesobd"
                    label="Rate"
                    placeholder="(INR / Credit)"
                    value={obdrate}
                    onChange={(e) => validateInput(e.target.value, setObdRate)}
                    type="number"
                  />
                  <div className="mt-[1.5rem]">
                    <UniversalButton
                      label="Save"
                      id="obdRateSave"
                      name="obdRateSave"
                      onClick={handleSaveOBDPricing}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-3"></div>

              <Paper sx={{ height: 250 }} id={id} name={name}>
                <DataGrid
                  id={id}
                  name={name}
                  rows={voicerowa}
                  columns={voiceCols}
                  initialState={{ pagination: { paginationModel } }}
                  pageSizeOptions={[10, 20, 50]}
                  pagination
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  rowHeight={45}
                  slots={{
                    footer: RcsCustomFooter,
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
            </>
          </CustomTabPanel>

          {/* Two way sms */}
          <CustomTabPanel value={value} index={4}>
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
          </CustomTabPanel>

          {/* Missed Call */}
          <CustomTabPanel value={value} index={5}>
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
          </CustomTabPanel>

          {/* C2C */}
          <CustomTabPanel value={value} index={6}>
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
                <UniversalButton label="Save" id="clicksave" name="clicksave" />
              </div>
            </>
          </CustomTabPanel>

          {/* Email */}
          <CustomTabPanel value={value} index={7}>
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
                <UniversalButton label="Save" id="emailsave" name="emailsave" />
              </div>
            </>
          </CustomTabPanel>

          {/* IBD */}
          <CustomTabPanel value={value} index={8}>
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
          </CustomTabPanel>
        </Box>
      </Dialog>
      {/* assignRate */}

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
            value={oldKey}
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
            onClick={handleApiKeySave}
          />
        </div>
      </Dialog>
      {/* Manage Api Key */}

      {/* reset service */}
      <Dialog
        header="Update Password"
        visible={reset}
        onHide={() => setreset(false)}
        className="w-[30rem]"
        draggable={false}
      >
        <div className="space-y-4">
          {/* <div className="relative">
            <InputField
              id="username"
              name="username"
              label="User Name"
              placeholder="demo"
            />
          </div> */}
          <GeneratePasswordSettings
            id="newPassword"
            name="newPassword"
            type={"text"}
            label="New Password"
            placeholder="Enter your new password"
            value={newPassword}
            setPassword={setNewPassword}
            onChange={(e) => {
              setNewPassword(e);
            }}
          />
        </div>
        <div className="flex justify-center mt-4">
          <UniversalButton
            label="Save"
            id="apisaveButton"
            name="apisaveButton"
            variant="primary"
            onClick={handleResetPassword}
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

      {/* Assign Service */}
      <Dialog
        header="Assign Service"
        visible={assignService}
        onHide={() => {
          setAssignService(false);
          setCurrentUserSrno(null);
        }}
        className="w-[30rem]"
        draggable={false}
      >
        <>
          {allServices.map((item, index) => {
            return (
              <div
                className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100"
                key={index}
              >
                {/* Option 1 */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      type="checkbox"
                      id={item.id}
                      name="assignService"
                      checked={
                        enableServices.find((s) => s.name === item.name)
                          ?.enable || false
                      }
                      onChange={handleServiceChange}
                      // checked={true}
                    />
                    <label
                      htmlFor={item.id}
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      {item.name}
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
          <UniversalButton
            id={"assignService"}
            label={"Assign Service"}
            name={"assignService"}
            onClick={handleAssignService}
          />
        </>
      </Dialog>
      {/* Assign Service */}
    </>
  );
};

export default ManageUserTable;
