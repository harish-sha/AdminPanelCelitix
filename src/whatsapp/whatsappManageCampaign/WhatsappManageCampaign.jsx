import React, { useEffect, useState } from "react";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import DateRangeIcon from '@mui/icons-material/DateRange';
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
  getWhatsappCampaignScheduledReport
} from "../../apis/whatsapp/whatsapp.js";
import CampaignLogCard from "./components/CampaignLogCard.jsx";
import ManageSummaryTable from "./components/ManageSummaryTable.jsx";
import UniversalLabel from "../components/UniversalLabel";
import { ExportDialog } from "./components/exportDialog";
import ManageScheduleCampaignTable from "./components/ManageScheduleCampaignTable";


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
  const [scheduleCampaignName, setScheduleCampaignName] = useState("");
  const [inputValueMobileLogs, setInputValueMobileLogs] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleSelectedDate, setScheduleSelectedDate] = useState(new Date());
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
  const [isMonthWise, setIsMonthWise] = useState(false);
  const [fromDate, setfromDate] = useState(new Date());
  const [toDate, settoDate] = useState(new Date());
  const [summaryReport, setSummaryReport] = useState([]);
  const [selectedWaBaNumber, setSelectedWaBaNumber] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [hasSearched, setHasSearched] = useState(false);
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
    // campaignName: "",
    fromDate: "",
    toDate: "",
    srno: 0,
    isCustomField: 0,
    customColumns: "",
    campaignType: 0,
    status: "",
    delStatus: {},
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
        console.log(error);
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
      fromQueDateTime: formattedFromDate,
      toQueDateTime: formattedFromDate,
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

  
  // Fetch initial data - for to load data on page load
  const fetchInitialData = async () => {
    const filters = {
      fromQueDateTime: new Date().toLocaleDateString("en-GB"),
      toQueDateTime: new Date().toLocaleDateString("en-GB"),
      campaignName: "",
      category: "all",
    };

    setIsFetching(true);
    const data = await getWhatsappCampaignReport(filters);
    setFilteredData(data);
    setIsFetching(false);
  };

const handleScheduleSearch = async() => {
  const formattedSelectedDate = scheduleSelectedDate && !isNaN(new Date(scheduleSelectedDate))
  ? new Date(scheduleSelectedDate).toISOString().split("T")[0]
  : null;

  // Check if filters are provided
  const filtersApplied = scheduleCampaignName || scheduleSelectedDate;

  if (!filtersApplied) {
    console.log("No filters applied, showing all data.");
    // await getWhatsappCampaignScheduledReport();
    setScheduleData(orignalScheduleData); // Reset to full data
    return;
  }

  const filteredData = orignalScheduleData.filter((item, index) => {
    const matchesCampaignName = scheduleCampaignName
      ? item.campaignName?.toLowerCase().includes(scheduleCampaignName.toLowerCase())
      : true;

    const itemDate = item.sentTime ? item.sentTime.split(" ")[0] : "";
    const matchesDate = formattedSelectedDate
      ? itemDate === formattedSelectedDate
      : true;

    const finalMatch = matchesCampaignName && matchesDate;
    return finalMatch;
  });
  setScheduleData(filteredData);
};


  // Fetch initial data - for to load data on page load
  const fetchScheduleCampaignData = async () => {
  setIsFetching(true);
  const data = await getWhatsappCampaignScheduledReport();
  console.log("scheduleDataaaa", data);

  setOrignalScheduleData(data); // Save the unfiltered data
  setScheduleData(data); // Also set to display
  setIsFetching(false);
};


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchInitialData();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchScheduleData = async () => {
      setIsLoading(true);
      await fetchScheduleCampaignData();
      setIsLoading(false);
    };
    fetchScheduleData();
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
      ? new Date(selectedDateLogs).toLocaleDateString("en-GB")
      : new Date().toLocaleDateString("en-GB");

    // currently log data mobile no is hardcoded later fetch accoding to the login as user or admin

    const logdata = {
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

  const handleSummary = async () => {
    let result;

    if (!selectedWaBaNumber) {
      toast.error("Please select a WABA Account.");
      return;
    }

    setIsFetching(true);

    let FinalFromDate = new Date(
      new Date(selectedMonth).getFullYear(),
      new Date(selectedMonth).getMonth(),
      1
    ).toLocaleDateString("en-GB");

    let FinalToDate = new Date(
      new Date(
        new Date(selectedMonth).getFullYear(),
        new Date(selectedMonth).getMonth() + 1,
        0
      )
    );

    if (isMonthWise) {
      result = await getSummaryReport({
        fromDate: FinalFromDate,
        summaryType: "waba,date,type,country",
        toDate: FinalToDate.toLocaleDateString("en-GB"),
        whatsappTypes: null,
        wabaNumber: selectedWaBaNumber,
      });
    } else {
      result = await getSummaryReport({
        fromDate: new Date(fromDate).toLocaleDateString("en-GB"),
        summaryType: "waba,date,type,country",
        toDate: new Date(toDate).toLocaleDateString("en-GB"),
        whatsappTypes: null,
        wabaNumber: selectedWaBaNumber,
      });
    }

    const formattedResult = result.map((item) => ({
      ...item,
      marketing: item.marketing.toFixed(1),
      utility: item.utility.toFixed(1),
      categoryCreditUsage: item.categoryCreditUsage.toFixed(1),
      userCharge: item.userCharge.toFixed(1),
    }));

    setSummaryReport(formattedResult);

    // setSummaryReport(result);
    setIsFetching(false);
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
                    fetchInitialData={fetchInitialData}
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
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="w-full">
              <div className="flex flex-wrap items-end w-full gap-2 mb-5">
                {isMonthWise ? (
                  <>
                    <div className="w-full sm:w-56">
                      <UniversalDatePicker
                        id="manageFromDate"
                        name="manageFromDate"
                        label="Month and Year"
                        value={selectedMonth}
                        views={["month", "year"]}
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
                )}
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
                <div className="flex items-center gap-3 justify-center mb-2 w-full sm:w-35">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Month Wise"
                      value={isMonthWise}
                      onClick={(e) => setIsMonthWise(e.target.checked)}
                    />
                  </FormGroup>
                </div>
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
                <div className="w-full sm:w-48">
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
                </div>
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
                </div> */}
                {/* <div className="w-full sm:w-48">
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
                </div> */}
                {/* <div className="w-full sm:w-48">
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
                    label={isFetching ? "Searching..." : "Search"}
                    icon={<IoSearch />}
                    onClick={()=>handleScheduleSearch()}
                    variant="primary"
                  />
                </div>
                {/* <div className="w-max-content">
                  <UniversalButton
                    id="manageScheduleCampaignExportBtn"
                    name="manageScheduleCampaignExportBtn"
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
                    fromDate={selectedDate}
                    fetchInitialData={fetchScheduleCampaignData}
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

      {/* <Dialog
        visible={visibledialog}
        style={{ width: "45rem" }}
        onHide={() => {
          setVisibledialog(false);
        }}
        draggable={false}
      >
        <div className="flex gap-4">
          <div className="cursor-pointer">
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="radioOption1"
                name="radioGroup"
                value="option1"
                onChange={handleChangeOption}
                checked={selectedOption === "option1"}
              />
              <label
                htmlFor="radioOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Campaign-wise
              </label>
            </div>
          </div>
          <div className="cursor-pointer">
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="radioOption2"
                name="radioGroup"
                value="option2"
                onChange={handleChangeOption}
                checked={selectedOption === "option2"}
              />
              <label
                htmlFor="radioOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Custom
              </label>
            </div>
          </div>
        </div>

        {selectedOption === "option1" && (
          <>
            <div className="mt-5">
              <AnimatedDropdown
                id="campaign"
                name="campaign"
                label="Select Campaign"
                options={campaignList?.map((item) => ({
                  value: item.srNo,
                  label: item.campaignName,
                }))}
                onChange={handleCampaignChange}
                value={selectedCampaign ? selectedCampaign.srNo : ""}
                placeholder="Search Campaign"
              />
            </div>
            <div className="flex items-center lg:gap-x-20 gap-x-10 my-6">
              <UniversalLabel text="Custom Columns" />
              <div className="flex gap-4">
                <div className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="radioOptionenable"
                      name="radioGroup"
                      value="radioOptionenable"
                      onChange={handleChangeOptionEnable}
                      checked={customOptions === "radioOptionenable"}
                    />
                    <label
                      htmlFor="radioOptionenable"
                      className="text-gray-700 font-medium text-sm cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>
                <div className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="radioOptiondisable"
                      name="radioGroup"
                      value="radioOptiondisable"
                      onChange={handleChangeOptionEnable}
                      checked={customOptions === "radioOptiondisable"}
                    />
                    <label
                      htmlFor="radioOptiondisable"
                      className="text-gray-700 font-medium text-sm cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {customOptions === "radioOptionenable" && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 ">
                  <div className="flex items-center">
                    <Checkbox
                      id="campaignName"
                      name="campaignName"
                      onChange={(e) => handleCheckboxChange(e, "campaignName")}
                      checked={campaigncheckboxStates.campaignName}
                      className="m-2"
                    />
                    <label
                      htmlFor="campaignName"
                      className="text-sm font-medium text-gray-800"
                    >
                      Campaign Name
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="mobileNo"
                      name="mobileNo"
                      onChange={(e) => handleCheckboxChange(e, "mobileNo")}
                      checked={campaigncheckboxStates.mobileNo}
                      className="m-2"
                    />
                    <label
                      htmlFor="mobileNo"
                      className="text-sm font-medium text-gray-800"
                    >
                      Mobile Number
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="callType"
                      name="callType"
                      onChange={(e) => handleCheckboxChange(e, "callType")}
                      checked={campaigncheckboxStates.callType}
                      className="m-2"
                    />
                    <label
                      htmlFor="callType"
                      className="text-sm font-medium text-gray-800"
                    >
                      Call Type
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="totalUnits"
                      name="totalUnits"
                      onChange={(e) => handleCheckboxChange(e, "totalUnits")}
                      checked={campaigncheckboxStates.totalUnits}
                      className="m-2"
                    />
                    <label
                      htmlFor="totalUnits"
                      className="text-sm font-medium text-gray-800"
                    >
                      Total Units
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="queueTime"
                      name="queueTime"
                      onChange={(e) => handleCheckboxChange(e, "queueTime")}
                      checked={campaigncheckboxStates.queueTime}
                      className="m-2"
                    />
                    <label
                      htmlFor="queueTime"
                      className="text-sm font-medium text-gray-800"
                    >
                      Queue Time
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="sentTime"
                      name="sentTime"
                      onChange={(e) => handleCheckboxChange(e, "sentTime")}
                      checked={campaigncheckboxStates.sentTime}
                      className="m-2"
                    />
                    <label
                      htmlFor="sentTime"
                      className="text-sm font-medium text-gray-800"
                    >
                      Sent Time
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="deliveryTime"
                      name="deliveryTime"
                      onChange={(e) => handleCheckboxChange(e, "deliveryTime")}
                      checked={campaigncheckboxStates.deliveryTime}
                      className="m-2"
                    />
                    <label
                      htmlFor="deliveryTime"
                      className="text-sm font-medium text-gray-800"
                    >
                      Delivery Time
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="callDuration"
                      name="callDuration"
                      onChange={(e) => handleCheckboxChange(e, "callDuration")}
                      checked={campaigncheckboxStates.callDuration}
                      className="m-2"
                    />
                    <label
                      htmlFor="callDuration"
                      className="text-sm font-medium text-gray-800"
                    >
                      Call Duration
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="retryCount"
                      name="retryCount"
                      onChange={(e) => handleCheckboxChange(e, "retryCount")}
                      checked={campaigncheckboxStates.retryCount}
                      className="m-2"
                    />
                    <label
                      htmlFor="retryCount"
                      className="text-sm font-medium text-gray-800"
                    >
                      Retry Count
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="callStatus"
                      name="callStatus"
                      onChange={(e) => handleCheckboxChange(e, "callStatus")}
                      checked={campaigncheckboxStates.callStatus}
                      className="m-2"
                    />
                    <label
                      htmlFor="callStatus"
                      className="text-sm font-medium text-gray-800"
                    >
                      Call Status
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="deliveryStatus"
                      name="deliveryStatus"
                      onChange={(e) =>
                        handleCheckboxChange(e, "deliveryStatus")
                      }
                      checked={campaigncheckboxStates.deliveryStatus}
                      className="m-2"
                    />
                    <label
                      htmlFor="deliveryStatus"
                      className="text-sm font-medium text-gray-800"
                    >
                      Delivery Status
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="keypress"
                      name="keypress"
                      onChange={(e) => handleCheckboxChange(e, "keypress")}
                      checked={campaigncheckboxStates.keypress}
                      className="m-2"
                    />
                    <label
                      htmlFor="keypress"
                      className="text-sm font-medium text-gray-800"
                    >
                      Key Press
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="action"
                      name="action"
                      onChange={(e) => handleCheckboxChange(e, "action")}
                      checked={campaigncheckboxStates.action}
                      className="m-2"
                    />
                    <label
                      htmlFor="action"
                      className="text-sm font-medium text-gray-800"
                    >
                      Action
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="source"
                      name="source"
                      onChange={(e) => handleCheckboxChange(e, "source")}
                      checked={campaigncheckboxStates.source}
                      className="m-2"
                    />
                    <label
                      htmlFor="source"
                      className="text-sm font-medium text-gray-800"
                    >
                      Source
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className="flex item-center justify-center mt-6">
              <UniversalButton
                id="campaignDialogSubmithBtn"
                name="campaignDialogSubmithBtn"
                label="Submit"
                onClick={handlecampaignDialogSubmithBtn}
              />
            </div>
          </>
        )}

        {selectedOption === "option2" && (
          <>
            <div className="mt-4 ">
              <div className="flex justify-between gap-x-4">
                <UniversalDatePicker label="From Date:" />
                <UniversalDatePicker label="To Date:" />
              </div>

              <div className="flex justify-between gap-5 my-4">
                <div className="flex-1">
                  <AnimatedDropdown
                    label="Select Type"
                    options={[
                      { value: "Promotional", label: "Promotional" },
                      { value: "Transactional", label: "Transactional" },
                      { value: "Both", label: "Both" },
                    ]}
                    value={customdialogtype}
                    onChange={setCustomdialogtype}
                    placeholder="Select Type"
                  />
                </div>

                <div className="flex-1">
                  <AnimatedDropdown
                    label="Select Request"
                    options={[
                      { value: "Sent", label: "Sent" },
                      { value: "Failed", label: "Failed" },
                      { value: "NDNC", label: "NDNC" },
                    ]}
                    value={customdialogstatus}
                    onChange={setCustomdialogstatus}
                    placeholder="Select Status"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-5">
                <UniversalLabel text="Delivery Status" />
                <div className="flex gap-x-5 lg:gap-x-20">
                  <div className="flex items-center">
                    <Checkbox
                      id="answered"
                      name="answered"
                      onChange={(e) =>
                        handleDeliveryCheckboxChange(e, "answered")
                      }
                      checked={deliverycheckbox.answered}
                      className="m-2"
                    />
                    <label
                      htmlFor="answered"
                      className="text-sm font-medium text-gray-800"
                    >
                      Answered
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="unanswered"
                      name="unanswered"
                      onChange={(e) =>
                        handleDeliveryCheckboxChange(e, "unanswered")
                      }
                      checked={deliverycheckbox.unanswered}
                      className="m-2"
                    />
                    <label
                      htmlFor="unanswered"
                      className="text-sm font-medium text-gray-800"
                    >
                      Unanswered
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="dialed"
                      name="dialed"
                      onChange={(e) =>
                        handleDeliveryCheckboxChange(e, "dialed")
                      }
                      checked={deliverycheckbox.dialed}
                      className="m-2"
                    />
                    <label
                      htmlFor="dialed"
                      className="text-sm font-medium text-gray-800"
                    >
                      Dialed
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex my-4 gap-4">
                <InputField
                  label="Mobile Number"
                  id="customdialognumber"
                  name="customdialognumber"
                  value={customdialognumber}
                  onChange={handleCustomDialogNumber}
                  placeholder="Enter mobile number..."
                />
                <AnimatedDropdown
                  label="DTMF Count"
                  id="dtmfResponse"
                  name="dtmfResponse"
                  options={[
                    { value: "0", label: "0" },
                    { value: "l", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                    { value: "6", label: "6" },
                    { value: "7", label: "7" },
                    { value: "8", label: "8" },
                    { value: "9", label: "9" },
                  ]}
                  onChange={setDtmfResponse}
                  value={dtmfResponse}
                  placeholder="DTMF Response"
                />
              </div>

              <div className="flex items-center lg:gap-x-20 gap-x-10 my-6">
                <UniversalLabel text="Custom Columns" />
                <div className="flex gap-4">
                  <div className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <RadioButton
                        inputId="radioOptionenable"
                        name="radioGroup"
                        value="radioOptionenable"
                        onChange={handleChangeOptionEnable}
                        checked={customOptions === "radioOptionenable"}
                      />
                      <label
                        htmlFor="radioOptionenable"
                        className="text-gray-700 font-medium text-sm cursor-pointer"
                      >
                        Enable
                      </label>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <RadioButton
                        inputId="radioOptiondisable"
                        name="radioGroup"
                        value="radioOptiondisable"
                        onChange={handleChangeOptionEnable}
                        checked={customOptions === "radioOptiondisable"}
                      />
                      <label
                        htmlFor="radioOptiondisable"
                        className="text-gray-700 font-medium text-sm cursor-pointer"
                      >
                        Disable
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {customOptions === "radioOptionenable" && (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 ">
                    <div className="flex items-center">
                      <Checkbox
                        id="campaignName"
                        name="campaignName"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "campaignName")
                        }
                        checked={customcheckboxStates.campaignName}
                        className="m-2"
                      />
                      <label
                        htmlFor="campaignName"
                        className="text-sm font-medium text-gray-800"
                      >
                        Campaign Name
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="mobileNo"
                        name="mobileNo"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "mobileNo")
                        }
                        checked={customcheckboxStates.mobileNo}
                        className="m-2"
                      />
                      <label
                        htmlFor="mobileNo"
                        className="text-sm font-medium text-gray-800"
                      >
                        Mobile Number
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="callType"
                        name="callType"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "callType")
                        }
                        checked={customcheckboxStates.callType}
                        className="m-2"
                      />
                      <label
                        htmlFor="callType"
                        className="text-sm font-medium text-gray-800"
                      >
                        Call Type
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="totalUnits"
                        name="totalUnits"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "totalUnits")
                        }
                        checked={customcheckboxStates.totalUnits}
                        className="m-2"
                      />
                      <label
                        htmlFor="totalUnits"
                        className="text-sm font-medium text-gray-800"
                      >
                        Total units
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="queueTime"
                        name="queueTime"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "queueTime")
                        }
                        checked={customcheckboxStates.queueTime}
                        className="m-2"
                      />
                      <label
                        htmlFor="queueTime"
                        className="text-sm font-medium text-gray-800"
                      >
                        Queue Time
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="sentTime"
                        name="sentTime"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "sentTime")
                        }
                        checked={customcheckboxStates.sentTime}
                        className="m-2"
                      />
                      <label
                        htmlFor="sentTime"
                        className="text-sm font-medium text-gray-800"
                      >
                        Sent Time
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="deliveryTime"
                        name="deliveryTime"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "deliveryTime")
                        }
                        checked={customcheckboxStates.deliveryTime}
                        className="m-2"
                      />
                      <label
                        htmlFor="deliveryTime"
                        className="text-sm font-medium text-gray-800"
                      >
                        Delivery Time
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="callDuration"
                        name="callDuration"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "callDuration")
                        }
                        checked={customcheckboxStates.callDuration}
                        className="m-2"
                      />
                      <label
                        htmlFor="callDuration"
                        className="text-sm font-medium text-gray-800"
                      >
                        Call Duration
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="retryCount"
                        name="retryCount"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "retryCount")
                        }
                        checked={customcheckboxStates.retryCount}
                        className="m-2"
                      />
                      <label
                        htmlFor="retryCount"
                        className="text-sm font-medium text-gray-800"
                      >
                        Retry Count
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="callStatus"
                        name="callStatus"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "callStatus")
                        }
                        checked={customcheckboxStates.callStatus}
                        className="m-2"
                      />
                      <label
                        htmlFor="callStatus"
                        className="text-sm font-medium text-gray-800"
                      >
                        Call Status
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="deliveryStatus"
                        name="deliveryStatus"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "deliveryStatus")
                        }
                        checked={customcheckboxStates.deliveryStatus}
                        className="m-2"
                      />
                      <label
                        htmlFor="deliveryStatus"
                        className="text-sm font-medium text-gray-800"
                      >
                        Delivery Status
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="keypress"
                        name="keypress"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "keypress")
                        }
                        checked={customcheckboxStates.keypress}
                        className="m-2"
                      />
                      <label
                        htmlFor="keypress"
                        className="text-sm font-medium text-gray-800"
                      >
                        Key Press
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="action"
                        name="action"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "action")
                        }
                        checked={customcheckboxStates.action}
                        className="m-2"
                      />
                      <label
                        htmlFor="action"
                        className="text-sm font-medium text-gray-800"
                      >
                        Action
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="source"
                        name="source"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "source")
                        }
                        checked={customcheckboxStates.source}
                        className="m-2"
                      />
                      <label
                        htmlFor="source"
                        className="text-sm font-medium text-gray-800"
                      >
                        Source
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="flex item-center justify-center mt-6">
                <UniversalButton
                  id="customDialogSubmithBtn"
                  name="customDialogSubmithBtn"
                  label="Submit"
                  onClick={handleCustomDialogSubmithBtn}
                />
              </div>
            </div>
          </>
        )}
      </Dialog> */}

      {/* Campaign Export Dialog End*/}
    </div>
  );
};

export default WhatsappManageCampaign;
