import React, { useEffect, useMemo, useState } from "react";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { BsJournalArrowDown } from "react-icons/bs";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";
import { Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { format } from "date-fns"; // Make sure to install: `npm i date-fns`
import {
  MdBarChart,
  MdOutlineDescription,
  MdOutlineAnalytics,
  MdOpenInNew,
} from "react-icons/md";
import { motion } from "framer-motion";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { TiFlowSwitch } from "react-icons/ti";

import { Checkbox } from "primereact/checkbox";

import InputField from "../../components/layout/InputField";
import Loader from "../components/Loader";
import UniversalDatePicker from "../components/UniversalDatePicker";
import AnimatedDropdown from "../components/AnimatedDropdown";
import UniversalButton from "../components/UniversalButton";
import ManageCampaignTable from "./components/ManageCampaignTable";
import ManageCampaignLogsTable from "./components/ManageCampaignLogsTable";
import UniversalSkeleton from "../components/UniversalSkeleton";
import {
  getWhatsappCampaignReport,
  getWhatsappLogReport,
  getSummaryReport,
  getWabaList,
  getAllCampaignWhatsapp,
  getWhatsappCampaignScheduledReport,
  cancelCampaign,
  downloadCustomWhatsappReport,
  flowReplyDetails,
  flowMainResponse,
} from "../../apis/whatsapp/whatsapp.js";
import CampaignLogCard from "./components/CampaignLogCard.jsx";
import ManageSummaryTable from "./components/ManageSummaryTable.jsx";
import UniversalLabel from "../components/UniversalLabel";
import { ExportDialog } from "./components/exportDialog";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ManageScheduleCampaignTable from "./components/ManageScheduleCampaignTable";
import moment from "moment";
import { useDownload } from "@/context/DownloadProvider";
import { useNavigate } from "react-router-dom";

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

const WhatsappManageCampaign = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [scheduleCampaignName, setScheduleCampaignName] = useState("");
  const [inputValueMobileLogs, setInputValueMobileLogs] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleSelectedDate, setScheduleSelectedDate] = useState(new Date());
  const [originalData, setOriginalData] = useState([]); // Store unfiltered data
  const [selectedDateLogs, setSelectedDateLogs] = useState(new Date());
  const [campaignCategory, setCampaignCategory] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [campaignStatus, setCampaignStatus] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [orignalScheduleData, setOrignalScheduleData] = useState([]);
  const [logsData, setLogsData] = useState([]);
  const [WabaList, setWabaList] = useState([]);
  const [isMonthWise, setIsMonthWise] = useState(0);
  const [fromDate, setfromDate] = useState(new Date());
  const [toDate, settoDate] = useState(new Date());
  const [summaryReport, setSummaryReport] = useState([]);
  const [selectedWaBaNumber, setSelectedWaBaNumber] = useState("");
  const [selectedSearchType, setSelectedSearchType] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [hasSearched, setHasSearched] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const { triggerDownloadNotification } = useDownload();
  //Export Download Reports start

  const [customOptions, setCustomOptions] = useState("radioOptiondisable");
  const [customdialogstatus, setCustomdialogstatus] = useState(null);
  const [customdialognumber, setCustomdialognumber] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");
  const [customdialogtype, setCustomdialogtype] = useState(null);
  const [visibledialog, setVisibledialog] = useState(false);
  const [dtmfResponse, setDtmfResponse] = useState(null);
  const [campaign, setCampaign] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaignList, setCampaignList] = useState([]);
  const [exportDialogState, setExportDialogState] = useState({
    isOpen: false,
    toDate: new Date(),
    fromDate: new Date(),
  });

  const [campaigncheckboxStates, setCampaignCheckboxStates] = useState({
    campaignName: false,
    mobileNo: false,
    callType: false,
    totalUnits: false,
    queueTime: false,
    sentTime: false,
    deliveryTime: false,
    callDuration: false,
    retryCount: false,
    callStatus: false,
    deliveryStatus: false,
    keypress: false,
    action: false,
    source: false,
  });

  const [dataToExport, setDataToExport] = useState({
    campaignName: "",
    fromDate: "",
    toDate: "",
    srno: 0,
    isCustomField: 0,
    customColumns: "",
    campaignType: 0,
    status: "" || "",
    source: "",
    deliveryStatus: "",
    type: "campaign",
  });

  const [customcheckboxStates, setcustomCheckboxStates] = useState({
    campaignName: false,
    mobileNo: false,
    callType: false,
    totalUnits: false,
    queueTime: false,
    sentTime: false,
    deliveryTime: false,
    callDuration: false,
    retryCount: false,
    callStatus: false,
    deliveryStatus: false,
    keypress: false,
    action: false,
    source: false,
  });

  const [deliverycheckbox, setDeliverycheckbox] = useState({
    answered: false,
    unanswered: false,
    dialed: false,
  });

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCampaignListAll = async () => {
      setIsLoading(true);
      try {
        const response = await getAllCampaignWhatsapp();
        setCampaignList(response);
        // if (response && Array.isArray(response)) {
        //   setCampaignList(response);
        // } else {
        //   setCampaignList([]);
        // }
      } catch (error) {
        // console.log(error);
        toast.error("Error fetching Campaign List:", error);
      }
      setIsLoading(false);
    };
    fetchCampaignListAll();
  }, []);

  const handleCampaignChange = (value) => {
    const selected = campaignList.find((campaign) => campaign.srNo === value);
    setSelectedCampaign(selected);
  };

  const handleCheckboxChange = (e, name) => {
    setCampaignCheckboxStates((prevState) => ({
      ...prevState,
      [name]: e.target.checked,
    }));
  };

  const handleExportBtn = () => {
    setVisibledialog(true);
  };

  const handleChangeOptionEnable = (event) => {
    const value = event.target.value;
    setCustomOptions(value);
  };

  const handleChangeOption = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const handleCustomDialogNumber = (e) => {
    setCustomdialognumber(e.target.value);
  };

  const handleDeliveryCheckboxChange = (e, name) => {
    setDeliverycheckbox((prevState) => ({
      ...prevState,
      [name]: e.checked,
    }));
  };

  const handleCustomCheckboxChange = (e, name) => {
    setcustomCheckboxStates((prevState) => ({
      ...prevState,
      [name]: e.checked,
    }));
  };

  const handlecampaignDialogSubmithBtn = () => { };

  const handleCustomDialogSubmithBtn = () => { };

  //Export Download Reports end

  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/\s/g, "");
    setCampaignName(newValue);
  };

  const handleScheduleInputChange = (e) => {
    const newValue = e.target.value.replace(/\s/g, "");
    setScheduleCampaignName(newValue);
  };

  const handleInputChangeMobileLogs = (e) => {
    setInputValueMobileLogs(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = async () => {
    const formattedFromDate = selectedDate
      ? new Date(selectedDate).toLocaleDateString("en-GB")
      : new Date().toLocaleDateString("en-GB");

    const formattedToDate = new Date().toLocaleDateString("en-GB");

    const filters = {
      fromQueDateTime: moment(selectedDate).format("YYYY-MM-DD"),
      toQueDateTime: moment(selectedDate).format("YYYY-MM-DD"),
      campaignName: campaignName.trim(),
      template_category: campaignCategory || "all",
    };

    setIsFetching(true);
    const data = await getWhatsappCampaignReport(filters);

    const filteredData = data.filter((item) => {
      return (
        (!campaignType || item.templateType === campaignType) &&
        (!campaignStatus || item.status === campaignStatus)
      );
    });
    // setFilteredData(Array.isArray(data) ? data : []);
    // setFilteredData(data);
    setFilteredData(filteredData);
    setIsFetching(false);
  };

  // const fetchScheduleCampaignData = async () => {
  //   setIsFetching(true);

  //   try {
  //     const data = await getWhatsappCampaignScheduledReport();

  //     const mappedData = Array.isArray(data)
  //       ? data.map((item, index) => ({
  //         id: item.srno || `row-${index}`,
  //         sn: index + 1,
  //         campaignName: item.campaignName || "N/A",
  //         campaignDate: item.campaignDate || "N/A",
  //         sentTime: item.sentTime || "N/A",
  //         count: item.count || "N/A",
  //         processFlag: item.processFlag === 1 ? "Pending" : "Completed",
  //         srno: item.srno,
  //       }))
  //       : [];

  //     // Apply filters
  //     const formattedSelectedDate =
  //       scheduleSelectedDate && !isNaN(new Date(scheduleSelectedDate))
  //         ? moment(scheduleSelectedDate).format("YYYY-MM-DD")
  //         : null;

  //     const filteredData = mappedData.filter((item) => {
  //       const matchesName = scheduleCampaignName
  //         ? item.campaignName
  //           .toLowerCase()
  //           .includes(scheduleCampaignName.toLowerCase())
  //         : true;

  //       const matchesDate = formattedSelectedDate
  //         ? item.campaignDate === formattedSelectedDate
  //         : true;

  //       return matchesName && matchesDate;
  //     });

  //     setScheduleData(filteredData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     toast.error("Failed to fetch schedule campaign data.");
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  const fetchScheduleCampaignData = async () => {
    setIsFetching(true);

    try {
      const data = await getWhatsappCampaignScheduledReport();

      const sortedData = Array.isArray(data)
        ? data.sort((a, b) => new Date(b.sentTime) - new Date(a.sentTime))
        : [];

      const rows = sortedData.map((item, index) => ({
        id: item.srno || `row-${index}`,
        sn: index + 1,
        srno: item.srno,
        sentTime: item.sentTime || "N/A",
        campaignName: item.campaignName || "N/A",
        campaignDate: item.campaignDate || "N/A",
        count: item.count || "N/A",
        processFlag: item.processFlag === 1 ? "Scheduled" : "Completed",
      }));

      setScheduleData(rows);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch schedule campaign data.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleCancel = (srno, campaignName) => {
    if (!srno || !campaignName) {
      console.error("SRNO is undefined. Cannot cancel campaign.");
      toast.error("Failed to cancel campaign. SRNO is missing.");
      return;
    }
    setVisible(true);
    setCurrentRow({ srno, campaignName });
  };

  const handleCancelConfirm = async (srno) => {
    if (!srno) {
      toast.error("SRNO is missing. Cannot cancel the campaign.");
      return;
    }

    try {
      setIsFetching(true);

      const result = await cancelCampaign({ srno: srno });

      if (result) {
        toast.success("Campaign Cancelled successfully");
        fetchScheduleCampaignData();
        setVisible(false);
      } else {
        toast.error("Failed to cancel campaign.");
      }
    } catch (error) {
      console.error("Error cancelling campaign:", error);
      toast.error("Error cancelling campaign");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchScheduleCampaignData();
  }, []);

  useEffect(() => {
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();
        if (response) {
          setWabaList(response);
        } else {
          // console.error("Failed to fetch WABA details");
          toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        // console.error("Error fetching WABA list:", error);
        toast.error("Error fetching WABA list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWabaList();
  }, []);

  // Fetch initial data - for to load data on page load
  const handleShowLogs = async () => {
    setIsFetching(true);
    const formattedFromDateLogs = selectedDateLogs
      ? // ? new Date(selectedDateLogs).toLocaleDateString("en-GB")
      moment(selectedDateLogs).format("YYYY-MM-DD")
      : new Date().toLocaleDateString("en-GB");

    // currently log data mobile no is hardcoded later fetch accoding to the login as user or admin

    const logdata = {
      // fromDate: formattedFromDateLogs,
      fromDate: formattedFromDateLogs,
      mobileNo: null,
      source: "API",
    };

    try {
      const response = await getWhatsappLogReport(logdata);
      setLogsData(response);
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error("failed to fetch logs. Please try again");
    } finally {
      setIsFetching(false);
    }
  };

  // useEffect(() => {
  //   const FinalFromDate = moment(selectedMonth).startOf("month").format("YYYY-MM-DD");
  //   const FinalToDate = moment(selectedMonth).endOf("month").format("YYYY-MM-DD");
  //   // if (!selectedWaBaNumber) {
  //   //   toast.error("Please select waba Account")
  //   //   return;
  //   // }
  //   const fetchMonthWiseReport = async () => {
  //     try {
  //       const monthWiseData = await getSummaryReport({
  //         wabaNumber: selectedWaBaNumber,
  //         monthwise: 1,
  //         year: moment(FinalFromDate).format("YYYY"),
  //         month: moment(FinalFromDate).format("MM"),
  //       });

  //       if (Array.isArray(monthWiseData)) {
  //         const formattedResult = monthWiseData.map((item) => ({
  //           ...item,
  //           marketing: item.marketing.toFixed(1),
  //           utility: item.utility.toFixed(1),
  //           categoryCreditUsage: item.categoryCreditUsage.toFixed(1),
  //           userCharge: item.userCharge.toFixed(1),
  //         }));

  //         setSummaryReport(formattedResult);
  //       } else {
  //         // Handle non-array response
  //         console.error("Unexpected API response:", result);
  //         toast.error("Failed to fetch summary report. Please try again.");
  //         setSummaryReport([]); // Reset summary report
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch month-wise report", error);
  //     }
  //   };

  //   if (isMonthWise) {

  //     fetchMonthWiseReport();
  //   }
  // }, [isMonthWise, selectedWaBaNumber, selectedMonth]); // ✅ use selectedMonth instead

  const handleSummary = async () => {
    let result;

    if (!selectedWaBaNumber) {
      toast.error("Please select a WABA Account.");
      return;
    }

    setIsFetching(true);

    // let FinalFromDate = new Date(
    //   new Date(selectedMonth).getFullYear(),
    //   new Date(selectedMonth).getMonth(),
    //   1
    // ).toLocaleDateString("en-GB");

    // let FinalToDate = new Date(
    //   new Date(
    //     new Date(selectedMonth).getFullYear(),
    //     new Date(selectedMonth).getMonth() + 1,
    //     0
    //   )
    // );

    // Format dates using moment
    const FinalFromDate = moment(selectedMonth)
      .startOf("month")
      .format("YYYY-MM-DD");
    const FinalToDate = moment(selectedMonth)
      .endOf("month")
      .format("YYYY-MM-DD");

    // if (isMonthWise) {
    //   result = await getSummaryReport({
    //     fromDate: FinalFromDate,
    //     summaryType: "waba,date,type,country",
    //     toDate: FinalToDate.toLocaleDateString("en-GB"),
    //     whatsappTypes: null,
    //     wabaNumber: selectedWaBaNumber,
    //   });
    // } else {
    //   result = await getSummaryReport({
    //     fromDate: new Date(fromDate).toLocaleDateString("en-GB"),
    //     summaryType: "waba,date,type,country",
    //     toDate: new Date(toDate).toLocaleDateString("en-GB"),
    //     whatsappTypes: null,
    //     wabaNumber: selectedWaBaNumber,
    //   });
    // }

    // const formattedResult = result.map((item) => ({
    //   ...item,
    //   marketing: item.marketing.toFixed(1),
    //   utility: item.utility.toFixed(1),
    //   categoryCreditUsage: item.categoryCreditUsage.toFixed(1),
    //   userCharge: item.userCharge.toFixed(1),
    // }));

    // setSummaryReport(formattedResult);

    // // setSummaryReport(result);
    // setIsFetching(false);
    try {
      if (isMonthWise) {
        result = await getSummaryReport({
          // fromDate: FinalFromDate,
          // summaryType: "waba,date,type,country",
          // toDate: FinalToDate,
          // whatsappTypes: null,
          wabaNumber: selectedWaBaNumber,
          monthwise: 1,
          // year: moment(FinalFromDate).format("YYYY"),
          year: selectedYear,
          // month: moment(FinalFromDate).format("MM"),
          month: selectedMonth,
        });
      } else {
        const formattedFromDate = moment(fromDate).format("YYYY-MM-DD");
        const formattedToDate = moment(toDate).format("YYYY-MM-DD");

        result = await getSummaryReport({
          fromDate: formattedFromDate,
          summaryType: "waba,date,type,country",
          toDate: formattedToDate,
          whatsappTypes: null,
          wabaNumber: selectedWaBaNumber,
        });
      }

      // Validate if result is an array
      if (Array.isArray(result)) {
        const formattedResult = result.map((item) => ({
          ...item,
          marketing: item.marketing.toFixed(1),
          utility: item.utility.toFixed(1),
          categoryCreditUsage: item.categoryCreditUsage.toFixed(1),
          userCharge: item.userCharge.toFixed(1),
        }));

        setSummaryReport(formattedResult);
      } else {
        // Handle non-array response
        console.error("Unexpected API response:", result);
        toast.error("Failed to fetch summary report. Please try again.");
        setSummaryReport([]); // Reset summary report
      }
    } catch (error) {
      console.error("Error fetching summary report:", error);
      toast.error("An error occurred while fetching the summary report.");
    } finally {
      setIsFetching(false);
    }
  };

  async function handleExport() {
    try {
      const payload = {
        type: 2,
        selectedUserId: "",
        fromDate: moment(exportDialogState.fromDate).format("YYYY-MM-DD"),
        toDate: moment(exportDialogState.toDate).format("YYYY-MM-DD"),
        isCustomField: 1,
        // customColumns: "",
        customColumns:
          "mobile_no,charged_multiplier,status,delivery_status,que_time,sent_time,delivery_time,read_status,reason,source",
        // status: state.log,
        status: "",
        // deliveryStatus: "",
        source: "api",
      };
      const res = await downloadCustomWhatsappReport(payload);
      if (!res?.status) {
        return toast.error(res?.msg);
      }

      toast.success(res?.msg);
      setExportDialogState({
        isOpen: false,
        fromDate: new Date(),
        toDate: new Date(),
      });
      triggerDownloadNotification();
    } catch (e) {
      console.log(e);
      toast.error("Error downloading attachment");
    }
  }

  // flows report
  const [flowReplyList, setFlowReplyList] = useState([]);
  const [selectedDateFlow, setSelectedDateFlow] = useState(new Date()); // format: yyyy-mm-dd
  const [isFlowFetching, setIsFlowFetching] = useState(""); // format: yyyy-mm-dd
  const [flowsDetailedReports, setFlowsDetailedReports] = useState([]);

  const fetchFlowReplyDetails = async () => {
    if (!selectedDateFlow) return;

    setIsFlowFetching(true);
    try {
      const formattedDate = moment(selectedDateFlow).format("YYYY-MM-DD");
      const response = await flowReplyDetails(formattedDate);
      setFlowReplyList(response || []);
    } catch (error) {
      console.error("Error fetching flow reply details:", error);
    }
    setIsFlowFetching(false);
  };

  const fetchFlowMainResponse = async (item) => {
    setIsFlowFetching(true);
    try {
      const data = {
        flowName: "",
        templateName: item.template_name || null,
        campaignSrno: item.campaign_srno || 0, // optional
      };
      const response = await flowMainResponse(data);
      setFlowsDetailedReports(response);
      navigate("/wflowsdetailsreport", { state: { data: response } });
    } catch (error) {
      console.error("Error fetching flow main response:", error);
    }
    setIsFlowFetching(false);
  };

  useEffect(() => {
    if (selectedDateFlow) {
      fetchFlowReplyDetails();
    }
  }, [selectedDateFlow]);

  const filteredFlowList = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    if (!q) return flowReplyList;
    return flowReplyList.filter((it) => {
      const hay = [
        it?.flow_name,
        it?.flow_id,
        it?.campaign_name,
        it?.campaign_id,
        it?.template_name,
      ].map((v) => String(v ?? "").toLowerCase());
      return hay.some((v) => v.includes(q));
    });
  }, [flowReplyList, search]);

  const highlightMatch = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-full ">
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Manage Campaigns Tabs"
            textColor="primary"
            indicatorColor="primary"
            scrollButtons="auto"
            allowScrollButtonsMobile
            className="w-full"
            variant="scrollable"
          >
            <Tab
              label={
                <span>
                  <CampaignOutlinedIcon size={20} /> Campaign
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
                  <BsJournalArrowDown size={18} /> API Logs
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
                  <SummarizeOutlinedIcon size={20} /> Summary
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
                  <DateRangeIcon size={20} /> Scheduled
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
                  <AccountTreeOutlinedIcon size={20} /> Flows Summary
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
          </Tabs>
          <CustomTabPanel value={value} index={0} className="">
            <div>
              <div className="flex flex-wrap items-end w-full gap-2 mb-5">
                <div className="w-full sm:w-48">
                  <UniversalDatePicker
                    id="manageCampaignDate"
                    name="manageCampaignDate"
                    label="Created On"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    placeholder="Pick a start date"
                    tooltipContent="Select a date within the last 3 months."
                    tooltipPlacement="right"
                    minDate={new Date().setMonth(new Date().getMonth() - 3)}
                    maxDate={new Date()}
                    error={!selectedDate}
                    errorText="Please select a valid date"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <InputField
                    id="manageCampaignName"
                    name="manageCampaignName"
                    label="Campaign Name"
                    value={campaignName}
                    onChange={handleInputChange}
                    placeholder="Campaign Name"
                    tooltipContent="Your templatename should not contain spaces."
                    tooltipPlacement="right"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <AnimatedDropdown
                    id="manageCampaignCategory"
                    name="manageCampaignCategory"
                    label="Category"
                    tooltipContent="Select category"
                    tooltipPlacement="right"
                    options={[
                      { value: "utility", label: "Utility" },
                      { value: "marketing", label: "Marketing" },
                      { value: "authentication", label: "Authentication" },
                    ]}
                    value={campaignCategory}
                    onChange={(value) => setCampaignCategory(value)}
                    placeholder="Category"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <AnimatedDropdown
                    id="manageCampaignType"
                    name="manageCampaignType"
                    label="Type"
                    tooltipContent="Select Type"
                    tooltipPlacement="right"
                    options={[
                      { value: "text", label: "Text" },
                      { value: "image", label: "Image" },
                      { value: "document", label: "Document" },
                      { value: "carousel", label: "Carousel" },
                    ]}
                    value={campaignType}
                    onChange={(value) => setCampaignType(value)}
                    placeholder="Type"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <AnimatedDropdown
                    id="manageCampaignStatus"
                    name="manageCampaignStatus"
                    label="Status"
                    tooltipContent="Select Status"
                    tooltipPlacement="right"
                    options={[
                      { value: "scheduled", label: "Scheduled" },
                      { value: "pending", label: "Pending" },
                      // { value: "failed", label: "Failed" },
                      // { value: "sent", label: "Sent" },
                      { value: "cancelled", label: "Cancelled" },
                      { value: "completed", label: "Completed" },
                    ]}
                    value={campaignStatus}
                    onChange={(value) => setCampaignStatus(value)}
                    placeholder="Status"
                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    id="manageCampaignSearchBtn"
                    name="manageCampaignSearchBtn"
                    label={isFetching ? "Searching..." : "Search"}
                    icon={<IoSearch />}
                    onClick={handleSearch}
                    variant="primary"
                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    id="manageCampaignExportBtn"
                    name="manageCampaignExportBtn"
                    label="Export"
                    icon={
                      <IosShareOutlinedIcon
                        sx={{ marginBottom: "3px", fontSize: "1.1rem" }}
                      />
                    }
                    onClick={handleExportBtn}
                    variant="primary"
                  />
                </div>
              </div>
              {isFetching ? (
                <div className="">
                  <UniversalSkeleton height="35rem" width="100%" />
                </div>
              ) : (
                <div className="w-full">
                  <ManageCampaignTable
                    id="whatsappManageCampaignTable"
                    name="whatsappManageCampaignTable"
                    data={filteredData}
                    fromDate={selectedDate}
                  />
                </div>
              )}

              {/* {isFetching ? (
                <UniversalSkeleton height="35rem" width="100%" />
              ) : !hasSearched ? (
                // Case 1: Initial Load - Ask user to select WABA account
                <div className="border-2 border-dashed h-[55vh] bg-white border-blue-500  rounded-2xl w-full flex items-center justify-center">
                  <div className="p-8 text-center text-blue-500 shadow-2xl shadow-blue-300 rounded-2xl">
                    <span className="text-2xl font-medium tracking-wide font-m">
                      Please select a WhatsApp Business Account (WABA) to
                      proceed.
                    </span>
                  </div>
                </div>
              ) : filteredData.length === 0 ? (
                // Case 2: No data found after filtering
                <div className="border-2 border-dashed h-[55vh] bg-white border-red-500  rounded-2xl w-full flex items-center justify-center">
                  <div className="p-8 text-center text-red-500 shadow-2xl rounded-2xl shadow-red-300">
                    <span className="text-2xl font-medium tracking-wide font-m">
                      No matching records found. <br /> Please adjust your filters
                      and try again.
                    </span>
                  </div>
                </div>
              ) : (
                // Case 3: Show data in the table
                <ManageCampaignTable
                  id='whatsappManageCampaignTable'
                  name='whatsappManageCampaignTable'
                  data={filteredData}
                />
              )} */}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="w-full">
              <div className="flex flex-wrap items-end w-full gap-2 mb-5">
                <div className="w-full sm:w-48">
                  <UniversalDatePicker
                    id="manageCampaignLogsDate"
                    name="manageCampaignLogsDate"
                    label="Delivered On"
                    value={selectedDateLogs}
                    onChange={(newValue) => setSelectedDateLogs(newValue)}
                    placeholder="Pick a start date"
                    tooltipContent="Select the starting date for your project"
                    tooltipPlacement="right"
                    error={!selectedDateLogs}
                    errorText="Please select a valid date"
                    minDate={new Date().setMonth(new Date().getMonth() - 3)}
                    maxDate={new Date()}
                  />
                </div>
                <div className="w-full sm:w-48">
                  <InputField
                    id="manageCampaignLogsNumber"
                    name="manageCampaignLogsNumber"
                    type="number"
                    label="Mobile No."
                    value={inputValueMobileLogs}
                    onChange={handleInputChangeMobileLogs}
                    placeholder="Mobile Number"
                    tooltipContent="Your templatename should not contain spaces."
                    tooltipPlacement="right"
                  />
                </div>
                <div className="flex items-end gap-3">
                  <div className="w-max-content ">
                    <UniversalButton
                      id="manageCampaignLogsShowhBtn"
                      name="manageCampaignLogsShowhBtn"
                      label={isFetching ? "Searching..." : "Search"}
                      icon={<IoSearch />}
                      onClick={handleShowLogs}
                      variant="primary"
                    />
                  </div>
                  <div className="w-max-content">
                    <UniversalButton
                      id="export"
                      name="export"
                      onClick={() => {
                        setExportDialogState({
                          isOpen: true,
                          toDate: new Date(),
                          fromDate: new Date(),
                        });
                      }}
                      label={"Export"}
                      icon={
                        <IosShareOutlinedIcon
                          fontSize="small"
                          sx={{ marginBottom: "1px" }}
                        />
                      }
                    />
                  </div>
                </div>
              </div>
              {/* {isFetching ? (
                <div className="">
                  <UniversalSkeleton height="25rem" width="100%" />
                </div>
              ) : (
                <div className="w-full">
                  <ManageCampaignLogsTable
                    id="whatsappManageCampaignLogsTable"
                    name="whatsappManageCampaignLogsTable"
                    data={logsData}
                  />
                </div>
              )} */}

              {isFetching ? (
                <div className="">
                  <UniversalSkeleton height="25rem" width="100%" />
                </div>
              ) : (
                <div className="w-full">
                  <Box>
                    {logsData.length === 0 ? (
                      <Box className="flex flex-col items-center justify-center space-y-2 text-gray-500 border min-h-60 rounded-2xl">
                        <SearchOffIcon
                          className="mb-2 text-red-400"
                          fontSize="large"
                        />
                        <p className="text-2xl text-blue-500">
                          No Data Available
                        </p>
                        <p className="text-lg">
                          "No logs have been recorded yet. Start tracking your
                          campaigns to see data here."
                        </p>
                      </Box>
                    ) : (
                      logsData.map((log, index) => (
                        <CampaignLogCard
                          key={index}
                          log={log}
                          selectedDate={selectedDateLogs}
                        />
                      ))
                    )}
                  </Box>
                </div>
              )}
              <Dialog
                header={"Export Data"}
                visible={exportDialogState.isOpen}
                style={{ width: "27rem" }}
                onHide={() =>
                  setExportDialogState({
                    isOpen: false,
                    toDate: new Date(),
                    fromDate: new Date(),
                  })
                }
                draggable={false}
              >
                <div className="space-y-2">
                  <UniversalDatePicker
                    id="fromDate"
                    name="fromDate"
                    label="From Date"
                    tooltipContent="Select From Date"
                    onChange={(e) => {
                      setExportDialogState((prev) => ({
                        ...prev,
                        fromDate: e,
                      }));
                    }}
                    value={exportDialogState.fromDate}
                  />
                  <UniversalDatePicker
                    id="toDate"
                    name="toDate"
                    label="To Date"
                    tooltipContent="Select To Date"
                    onChange={(e) => {
                      setExportDialogState((prev) => ({
                        ...prev,
                        toDate: e,
                      }));
                    }}
                    value={exportDialogState.toDate}
                  />
                  <div className="flex items-center gap-2 justify-center mt-2">
                    <UniversalButton
                      id="export"
                      name="export"
                      onClick={handleExport}
                      label={"Export"}
                    />
                  </div>
                </div>
              </Dialog>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="w-full">
              <div className="flex flex-wrap items-end w-full gap-2 mb-5">
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    id="manageWaBaAccount"
                    name="manageWaBaAccount"
                    label="WaBa Account"
                    tooltipContent="Select WABA Account"
                    tooltipPlacement="right"
                    options={WabaList?.map((waba) => ({
                      value: waba.wabaSrno,
                      label: waba.name,
                    }))}
                    value={selectedWaBaNumber}
                    onChange={(value) => setSelectedWaBaNumber(value)}
                    placeholder="Waba Account"
                  />
                </div>

                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    id="nameSearchType"
                    name="nameSearchType"
                    label="Search Type"
                    tooltipContent="Select Search Type"
                    tooltipPlacement="right"
                    options={[
                      { value: 0, label: "Custom" },
                      { value: 1, label: "Monthly" },
                    ]}
                    value={isMonthWise}
                    onChange={(value) => setIsMonthWise(value)}
                    placeholder="Search Type"
                  />
                </div>

                {isMonthWise === 1 ? (
                  <>
                    {/* Month Dropdown */}
                    <div className="w-full sm:w-56">
                      <AnimatedDropdown
                        id="monthSelect"
                        name="monthSelect"
                        label="Select Month"
                        tooltipContent="Select Month"
                        tooltipPlacement="right"
                        options={[
                          { value: 1, label: "January" },
                          { value: 2, label: "February" },
                          { value: 3, label: "March" },
                          { value: 4, label: "April" },
                          { value: 5, label: "May" },
                          { value: 6, label: "June" },
                          { value: 7, label: "July" },
                          { value: 8, label: "August" },
                          { value: 9, label: "September" },
                          { value: 10, label: "October" },
                          { value: 11, label: "November" },
                          { value: 12, label: "December" },
                        ]}
                        value={selectedMonth}
                        onChange={(value) => setSelectedMonth(value)}
                        placeholder="Select Month"
                      />
                    </div>

                    {/* Year Dropdown */}
                    <div className="w-full sm:w-56">
                      <AnimatedDropdown
                        id="yearSelect"
                        name="yearSelect"
                        label="Select Year"
                        tooltipContent="Select Year"
                        tooltipPlacement="right"
                        options={Array.from(
                          { length: 2025 - 1990 + 1 },
                          (_, i) => {
                            const year = 1990 + i;
                            return { value: String(year), label: String(year) };
                          }
                        ).reverse()}
                        value={selectedYear}
                        onChange={(value) => setSelectedYear(value)}
                        placeholder="Select Year"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* From Date */}
                    <div className="w-full sm:w-56">
                      <UniversalDatePicker
                        id="manageFromDate"
                        name="manageFromDate"
                        label="From Date"
                        value={fromDate}
                        onChange={(newValue) => setfromDate(newValue)}
                        placeholder="Pick a start date"
                        tooltipContent="Select the start date"
                        tooltipPlacement="right"
                        error={!fromDate}
                        minDate={new Date().setMonth(new Date().getMonth() - 3)}
                        maxDate={new Date()}
                        errorText="Please select a valid date"
                      />
                    </div>

                    {/* To Date */}
                    <div className="w-full sm:w-56">
                      <UniversalDatePicker
                        id="manageToDate"
                        name="manageToDate"
                        label="To Date"
                        value={toDate}
                        onChange={(newValue) => settoDate(newValue)}
                        placeholder="Pick an end date"
                        tooltipContent="Select the end date"
                        tooltipPlacement="right"
                        error={!toDate}
                        minDate={new Date().setMonth(new Date().getMonth() - 3)}
                        maxDate={new Date()}
                        errorText="Please select a valid date"
                      />
                    </div>
                  </>
                )}

                {/* {isMonthWise ? (
                  <>
                    <div className="w-full sm:w-56">
                      <UniversalDatePicker
                        id="manageFromDate"
                        name="manageFromDate"
                        label="Month"
                        value={selectedMonth}
                        views={["month"]}
                        onChange={(newValue) => setSelectedMonth(newValue)}
                        placeholder="Pick a month"
                        tooltipContent="Select the month"
                        tooltipPlacement="right"
                        error={!selectedMonth}
                        minDate={new Date().setMonth(new Date().getMonth() - 3)}
                        maxDate={new Date()}
                        errorText="Please select a valid month"
                      />
                    </div>

                    <div className="w-full sm:w-56">
                      <UniversalDatePicker
                        id="manageFromDate"
                        name="manageFromDate"
                        label="Year"
                        value={selectedMonth}
                        views={["year"]}
                        onChange={(newValue) => setSelectedMonth(newValue)}
                        placeholder="Pick a year"
                        tooltipContent="Select the year"
                        tooltipPlacement="right"
                        error={!selectedMonth}
                        minDate={new Date().setMonth(new Date().getMonth() - 3)}
                        maxDate={new Date()}
                        errorText="Please select a valid year"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full sm:w-56">
                      <UniversalDatePicker
                        id="manageFromDate"
                        name="manageFromDate"
                        label="From Date"
                        value={fromDate}
                        onChange={(newValue) => setfromDate(newValue)}
                        placeholder="Pick a start date"
                        tooltipContent="Select the current date"
                        tooltipPlacement="right"
                        error={!fromDate}
                        minDate={new Date().setMonth(new Date().getMonth() - 3)}
                        maxDate={new Date()}
                        errorText="Please select a valid date"
                      />
                    </div>
                    <div className="w-full sm:w-56">
                      <UniversalDatePicker
                        id="manageToDate"
                        name="manageToDate"
                        label="To Date"
                        value={toDate}
                        onChange={(newValue) => settoDate(newValue)}
                        placeholder="Pick a start date"
                        tooltipContent="Select the date you want to search from."
                        tooltipPlacement="right"
                        error={!settoDate}
                        errorText="Please select a valid date"
                        minDate={new Date().setMonth(new Date().getMonth() - 3)}
                        maxDate={new Date()}
                      />
                    </div>
                  </>
                )} */}

                {/* <div className="flex items-center gap-3 justify-center mb-2 w-full sm:w-35">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Month Wise"
                      value={isMonthWise}
                      onClick={(e) => setIsMonthWise(e.target.checked)}
                    />
                  </FormGroup>
                  <Checkbox
                    checked={isMonthWise}
                    onChange={(e) => setIsMonthWise(e.target.checked)}
                  />
                  <label
                    className="text-sm font-medium text-gray-800 font-p"
                    htmlFor="isMonthWise"
                  >
                    Month Wise
                  </label>
                </div> */}
                <div className="w-full sm:w-56">
                  <UniversalButton
                    id="manageCampaignLogsShowhBtn"
                    name="manageCampaignLogsShowhBtn"
                    label={isFetching ? "Searching..." : "Search"}
                    icon={<IoSearch />}
                    onClick={handleSummary}
                    variant="primary"
                  />
                </div>
              </div>
              {isFetching ? (
                <div className="">
                  <UniversalSkeleton height="35rem" width="100%" />
                </div>
              ) : (
                <div className="w-full">
                  <ManageSummaryTable
                    id="whatsAppSummaryReport"
                    name="whatsAppSummaryReport"
                    data={summaryReport}
                    isMonthWise={isMonthWise}
                  />
                </div>
              )}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3} className="">
            <div>
              <div className="flex flex-wrap items-end w-full gap-2 mb-5">
                {/* <div className="w-full sm:w-48">
                  <UniversalDatePicker
                    id="manageCampaignDate"
                    name="manageCampaignDate"
                    label="Created On"
                    value={scheduleSelectedDate}
                    onChange={(newValue) => setScheduleSelectedDate(newValue)}
                    placeholder="Pick a start date"
                    tooltipContent="Select a date within the last 3 months."
                    tooltipPlacement="right"
                    minDate={new Date().setMonth(new Date().getMonth() - 3)}
                    maxDate={new Date()}
                    error={!scheduleSelectedDate}
                    errorText="Please select a valid date"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <InputField
                    id="manageCampaignName"
                    name="manageCampaignName"
                    label="Campaign Name"
                    value={scheduleCampaignName}
                    onChange={handleScheduleInputChange}
                    placeholder="Campaign Name"
                    tooltipContent="Your templatename should not contain spaces."
                    tooltipPlacement="right"
                  />
                </div> */}
                {/* <div className="w-full sm:w-48">
                  <AnimatedDropdown
                    id="manageCampaignCategory"
                    name="manageCampaignCategory"
                    label="Category"
                    tooltipContent="Select category"
                    tooltipPlacement="right"
                    options={[
                      { value: "utility", label: "Utility" },
                      { value: "marketing", label: "Marketing" },
                      { value: "authentication", label: "Authentication" },
                    ]}
                    value={campaignCategory}
                    onChange={(value) => setCampaignCategory(value)}
                    placeholder="Category"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <AnimatedDropdown
                    id="manageCampaignType"
                    name="manageCampaignType"
                    label="Type"
                    tooltipContent="Select Type"
                    tooltipPlacement="right"
                    options={[
                      { value: "text", label: "Text" },
                      { value: "image", label: "Image" },
                      { value: "document", label: "Document" },
                      { value: "carousel", label: "Carousel" },
                    ]}
                    value={campaignType}
                    onChange={(value) => setCampaignType(value)}
                    placeholder="Type"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <AnimatedDropdown
                    id="manageCampaignStatus"
                    name="manageCampaignStatus"
                    label="Status"
                    tooltipContent="Select Status"
                    tooltipPlacement="right"
                    options={[
                      { value: "pending", label: "Pending" },
                      // { value: "failed", label: "Failed" },
                      // { value: "sent", label: "Sent" },
                      { value: "cancelled", label: "Cancelled" },
                      { value: "completed", label: "Completed" },
                    ]}
                    value={campaignStatus}
                    onChange={(value) => setCampaignStatus(value)}
                    placeholder="Status"
                  />
                </div> */}
                <div className="w-max-content">
                  <UniversalButton
                    id="manageCampaignSearchBtn"
                    name="manageCampaignSearchBtn"
                    label={isFetching ? "Refreshing..." : "Refresh"}
                    icon={<IoSearch />}
                    onClick={fetchScheduleCampaignData}
                    variant="primary"
                  />
                </div>
                {/* <div className="w-max-content">
                  <UniversalButton
                    id="manageCampaignExportBtn"
                    name="manageCampaignExportBtn"
                    label="Export"
                    icon={
                      <IosShareOutlinedIcon
                        sx={{ marginBottom: "3px", fontSize: "1.1rem" }}
                      />
                    }
                    onClick={handleExportBtn}
                    variant="primary"
                  />
                </div> */}
              </div>
              {isFetching ? (
                <div className="">
                  <UniversalSkeleton height="35rem" width="100%" />
                </div>
              ) : (
                <div className="w-full">
                  <ManageScheduleCampaignTable
                    id="whatsappManageCampaignScheduleTable"
                    name="whatsappManageCampaignTable"
                    data={scheduleData}
                    onCancel={handleCancel}
                  // fromDate={selectedDate}
                  />
                </div>
              )}

              {/* cancel campaign Start */}
              <Dialog
                header={"Confirm Cancel"}
                visible={visible}
                style={{ width: "27rem" }}
                onHide={() => setVisible(false)}
                draggable={false}
              >
                <div className="flex items-center justify-center">
                  <CancelOutlinedIcon
                    sx={{
                      fontSize: 64,
                      color: "#ff3f3f",
                    }}
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-[1.1rem] font-semibold text-gray-700">
                    Are you sure you want to cancel the campaign:
                    <span className="text-green-500">
                      "{currentRow?.campaignName}"
                    </span>
                    ?
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    This action is irreversible.
                  </p>
                </div>

                <div className="flex justify-center gap-4 mt-2">
                  {!isFetching && (
                    <UniversalButton
                      label="Cancel"
                      style={{
                        backgroundColor: "#090909",
                      }}
                      onClick={() => setVisible(false)}
                    />
                  )}
                  <UniversalButton
                    label={isFetching ? "Deleting..." : "Delete"}
                    style={{}}
                    onClick={() => handleCancelConfirm(currentRow.srno)}
                    disabled={isFetching}
                  />
                </div>
              </Dialog>

              {/* cancel campaign End */}

              {/* {isFetching ? (
                <UniversalSkeleton height="35rem" width="100%" />
              ) : !hasSearched ? (
                // Case 1: Initial Load - Ask user to select WABA account
                <div className="border-2 border-dashed h-[55vh] bg-white border-blue-500  rounded-2xl w-full flex items-center justify-center">
                  <div className="p-8 text-center text-blue-500 shadow-2xl shadow-blue-300 rounded-2xl">
                    <span className="text-2xl font-medium tracking-wide font-m">
                      Please select a WhatsApp Business Account (WABA) to
                      proceed.
                    </span>
                  </div>
                </div>
              ) : filteredData.length === 0 ? (
                // Case 2: No data found after filtering
                <div className="border-2 border-dashed h-[55vh] bg-white border-red-500  rounded-2xl w-full flex items-center justify-center">
                  <div className="p-8 text-center text-red-500 shadow-2xl rounded-2xl shadow-red-300">
                    <span className="text-2xl font-medium tracking-wide font-m">
                      No matching records found. <br /> Please adjust your filters
                      and try again.
                    </span>
                  </div>
                </div>
              ) : (
                // Case 3: Show data in the table
                <ManageCampaignTable
                  id='whatsappManageCampaignTable'
                  name='whatsappManageCampaignTable'
                  data={filteredData}
                />
              )} */}
            </div>
          </CustomTabPanel>
          {/* <CustomTabPanel value={value} index={4}>
            <div className="flex flex-col gap-6 bg-gradient-to-b from-gray-50 to-gray-50 min-h-[80vh] p-4 md:p-6 rounded-xl">
              {/* Header Section 
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <MdBarChart className="text-blue-600 text-2xl" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Flow Summary Report
                  </h2>
                </div>
                
                <div className="flex flex-wrap lg:flex-nowrap items-start gap-2">
                  <InputField
                  label="Search Flow"
                    type="text"
                    placeholder="Search by Flow Name & Id..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full  text-sm"
                  />
                  <UniversalDatePicker
                    label="Select Date"
                    value={selectedDateFlow}
                    onChange={(newValue) => setSelectedDateFlow(newValue)}
                    defaultValue={new Date()}
                  />
                </div>
              </div>

              {/* Display Selected Date *
              {selectedDateFlow && (
                <div className="text-sm text-gray-600 font-medium">
                  Showing results for :{" "}
                  <span className="text-gray-800 font-semibold">
                    {format(new Date(selectedDateFlow), "dd MMMM yyyy")}
                  </span>
                  {typeof filteredFlowList?.length === "number" && (
                    <span className="ml-2 text-gray-500">
                      • {filteredFlowList.length} result
                      {filteredFlowList.length === 1 ? "" : "s"}
                    </span>
                  )}
                </div>
              )}

              {/* Data State *
              {isFlowFetching ? (
                <div className="text-center text-blue-500 font-medium py-6">
                  Loading flow replies...
                </div>
              ) : flowReplyList.length === 0 ? (
                <div className="text-center text-gray-500 py-6">
                  No flow replies found for the selected date.
                </div>
              ) : filteredFlowList.length === 0 ? (
                <div className="text-center text-gray-500 py-6">
                  No results match your search.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFlowList.map((item, idx) => (
                    <motion.div
                      key={
                        item?.flow_id || `${item?.flow_name || "row"}-${idx}`
                      }
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 h-2 w-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-t-2xl" />

                      <div className="flex flex-col gap-3 pt-3">
                        {/* Campaign / Flow Name 
                        <div className="grid grid-cols-2 items-start justify-between">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                              <MdOutlineDescription className="text-gray-500" />
                              Campaign Name:
                            </p>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {/* {item.campaign_name || "—"} *
                              {highlightMatch(String(item.campaign_name || "—"), search)}
                            </h3>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                              <MdOutlineDescription className="text-gray-500" />
                              Flow Name:
                            </p>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {/* {item.flow_name || "—"} *
                              {highlightMatch(String(item.flow_name || "—"), search)}
                            </h3>
                          </div>

                          {/* <div className="flex flex-col text-gray-600 font-medium">
                            <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                              <MdOutlineAnalytics className="text-gray-500" />
                              Campaign Launched Date:
                            </p>
                            <span className="text-gray-800 font-semibold text-lg">
                              {format(new Date(selectedDate), "dd MMMM yyyy")}
                            </span>
                          </div> */}
          {/* </div> */}

          {/* Template Name *
                        <div className="grid grid-cols-2 items-start justify-between">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Template Used
                            </p>
                            <p className="text-gray-800 font-semibold text-lg">
                              {/* {item.template_name || "—"} *
                              {highlightMatch(String(item.template_name || "—"), search)}
                            </p>
                          </div>

                          {/* Reply Count *
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Total Responses Received
                            </p>
                            <span className="inline-block bg-blue-100 text-blue-700 font-semibold text-xl px-3 py-1 rounded-full">
                              {item.reply_count}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* View Detailed Report *
                      <div className="mt-4">
                        <div
                          onClick={() =>
                            fetchFlowMainResponse(item)
                          }
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-auto"
                        >
                          View Detailed Report
                          <MdOpenInNew className="text-base" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </CustomTabPanel> */}
          <CustomTabPanel value={value} index={4}>
            <div className="flex flex-col gap-6 bg-gradient-to-b from-gray-50 to-gray-50 min-h-[80vh] p-4 md:p-6 rounded-xl overflow-x-scroll  ">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {/* <MdBarChart className="text-blue-600 text-2xl" /> */}
                  <TiFlowSwitch className="text-blue-800 text-2xl" />
                  <h2 className="text-xl font-semibold text-gray-700">
                    Flow Summary Report
                  </h2>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap items-start gap-2">
                  <div className="w-60">
                    <InputField
                      label="Search Flow"
                      type="text"
                      placeholder="Search by Flow Name & Campaign..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    // className="border border-gray-300 rounded-md px-3 py-1.5 w-full  text-sm"
                    />
                  </div>
                  <div className="w-60">
                    <UniversalDatePicker
                      label="Select Date"
                      value={selectedDateFlow}
                      onChange={(newValue) => setSelectedDateFlow(newValue)}
                      defaultValue={new Date()}
                    />
                  </div>
                </div>
              </div>

              {/* Display Selected Date */}
              {selectedDateFlow && (
                <div className="text-sm text-gray-600 font-medium text-center">
                  Showing results for : &nbsp;
                  <span className="text-blue-800 font-semibold">
                    {format(new Date(selectedDateFlow), "dd MMMM yyyy")}
                  </span>
                  {typeof filteredFlowList?.length === "number" && (
                    <span className="ml-2 text-gray-500">
                      • {filteredFlowList.length} result
                      {filteredFlowList.length === 1 ? "" : "s"}
                    </span>
                  )}
                </div>
              )}

              <div className="flex justify-center">
                {/* Data State */}
                {isFlowFetching ? (
                  <div className="text-center text-blue-500 font-medium py-6 flex flex-col gap-3 w-full">
                    Loading flow replies...
                    <UniversalSkeleton height="5rem" width="100%" />
                    <UniversalSkeleton height="5rem" width="100%" />
                    <UniversalSkeleton height="5rem" width="100%" />
                    <UniversalSkeleton height="5rem" width="100%" />
                    <UniversalSkeleton height="5rem" width="100%" />
                  </div>
                ) : flowReplyList.length === 0 ? (
                  <div className="flex items-center justify-center w-[50%] min-h-[300px] rounded-2xl ">
                    <div className="flex flex-col items-center text-center p-6">
                      {/* Animated  SVG */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-24 h-24 text-indigo-600 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="6"
                          height="6"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect
                          x="15"
                          y="3"
                          width="6"
                          height="6"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect
                          x="9"
                          y="15"
                          width="6"
                          height="6"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />

                        {/* Animated lines */}
                        <path
                          d="M9 6h6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="6"
                          strokeDashoffset="6"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="6"
                            to="0"
                            dur="1s"
                            repeatCount="indefinite"
                          />
                        </path>

                        <path
                          d="M6 9v6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="6"
                          strokeDashoffset="6"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="6"
                            to="0"
                            dur="1s"
                            begin="0.3s"
                            repeatCount="indefinite"
                          />
                        </path>

                        <path
                          d="M18 9v6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="6"
                          strokeDashoffset="6"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="6"
                            to="0"
                            dur="1s"
                            begin="0.6s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>

                      {/* Text */}
                      <h2 className="text-lg font-semibold text-gray-800">
                        No Flow Replies Found
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Try selecting another date to view responses.
                      </p>
                    </div>
                  </div>
                ) : filteredFlowList.length === 0 ? (
                  <div className="flex items-center justify-center  w-[50%] min-h-[300px] rounded-2xl">
                    <div className="flex flex-col items-center text-center p-6">
                      {/* Animated  SVG */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-20 h-20 text-purple-600 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle
                          cx="11"
                          cy="11"
                          r="7"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="animate-pulse"
                        />
                        <line
                          x1="16"
                          y1="16"
                          x2="21"
                          y2="21"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <animate
                            attributeName="x2"
                            values="21;19;21"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="y2"
                            values="21;19;21"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        </line>
                      </svg>

                      <h2 className="text-lg font-semibold text-gray-800">
                        No results match your search
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Try adjusting your keywords or filters.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-150 overflow-scroll w-full rounded-2xl border p-3">
                    <div className="flex flex-col gap-4">
                      {filteredFlowList.map((item, idx) => (
                        <motion.div
                          key={
                            item?.flow_id ||
                            `${item?.flow_name || "row"}-${idx}`
                          }
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.1, delay: idx * 0.1 }}
                          className="bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-50  border-1 border-blue-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all  relative overflow-hidden group"
                        >
                          <div className="flex flex-row lg:items-start gap-4 w-full flex-wrap">
                            {/* Campaign / Flow Details */}
                            <div className="w-20 text-center">
                              <p className="text-sm font-medium text-gray-500 mb-1">
                                Sr.no
                              </p>
                              <p className="text-md font-semibold text-gray-800">
                                {idx + 1}
                              </p>
                            </div>

                            {/* Campaign name */}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-500 mb-1 flex items-center justify-center gap-1 text-nowrap">
                                <MdOutlineDescription className="text-gray-500" />
                                Campaign Name
                              </p>
                              <h3 className="text-md font-semibold text-gray-800 text-center">
                                {/* {item.campaign_name || "—"} */}
                                {highlightMatch(
                                  String(item.campaign_name || "—"),
                                  search
                                )}
                              </h3>
                            </div>

                            {/* Template Name */}
                            <div className="flex-1 text-center">
                              <p className="text-sm font-medium text-gray-500 mb-1 text-nowrap">
                                Template Used
                              </p>
                              <p className="text-gray-800 font-semibold text-md">
                                {/* {item.template_name || "—"} */}
                                {highlightMatch(
                                  String(item.template_name || "—"),
                                  search
                                )}
                              </p>
                            </div>

                            {/* FlowName */}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-500 mb-1 flex items-center justify-center gap-1 text-nowrap">
                                <MdOutlineDescription className="text-gray-500" />
                                Flow Name
                              </p>
                              <h3 className="text-md font-semibold text-gray-800 text-center">
                                {/* {item.flow_name || "—"} */}
                                {highlightMatch(
                                  String(item.flow_name || "—"),
                                  search
                                )}
                              </h3>
                            </div>

                            {/* Reply Count */}
                            <div className="flex-1 text-center text-nowrap">
                              <p className="text-sm font-medium text-gray-500 mb-1">
                                Total Responses Received
                              </p>
                              <span className="inline-block bg-blue-200 text-blue-700 font-semibold text-lg px-3 py-1 rounded-full  shadow-lg">
                                {item.reply_count}
                              </span>
                            </div>

                            {/* View Detailed Report */}
                            <div className="flex-1 text-center mt-3">
                              <div
                                onClick={() => fetchFlowMainResponse(item)}
                                className="inline-flex items-center gap-1 text-sm text-blue-800 hover:underline mt-auto cursor-pointer text-nowrap font-medium"
                              >
                                View Detailed Report
                                <MdOpenInNew className="text-base" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CustomTabPanel>
        </Box>
      )}

      {/* Campaign Export Dialog Start*/}
      {visibledialog && (
        <ExportDialog
          visibledialog={visibledialog}
          setVisibledialog={setVisibledialog}
          allCampaigns={campaignList}
          setDataToExport={setDataToExport}
          dataToExport={dataToExport}
        />
      )}
      {/* Campaign Export Dialog End*/}
    </div>
  );
};

export default WhatsappManageCampaign;
