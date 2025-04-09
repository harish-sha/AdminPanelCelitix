import React, { useEffect, useState } from "react";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
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
import Checkbox from "@mui/material/Checkbox";


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
  getWabaList
} from "../../apis/whatsapp/whatsapp.js";
import CampaignLogCard from "./components/CampaignLogCard.jsx";
import ManageSummaryTable from "./components/ManageSummaryTable.jsx";

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
  const [inputValueMobileLogs, setInputValueMobileLogs] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateLogs, setSelectedDateLogs] = useState(new Date());
  const [campaignCategory, setCampaignCategory] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [campaignStatus, setCampaignStatus] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [logsData, setLogsData] = useState([]);
  const [WabaList, setWabaList] = useState([]);
  const [isMonthWise, setIsMonthWise] = useState(false);
  const [fromDate, setfromDate] = useState(new Date());
  const [toDate, settoDate] = useState(new Date());
  const [summaryReport, setSummaryReport] = useState([]);
  const [selectedWaBaNumber, setSelectedWaBaNumber] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/\s/g, "");
    setCampaignName(newValue);
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

    // Apply additional filters for campaign type and status
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchInitialData();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();
        if (response) {
          setWabaList(response);
        } else {
          console.error("Failed to fetch WABA details");
          // toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        console.error("Error fetching WABA list:", error);
        // toast.error("Error fetching WABA list.");
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
      source: "",
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
          </Tabs>
          <CustomTabPanel value={value} index={0} className="">
            <div>
              <div className="flex lg:flex-nowrap md:flex-wrap flex-wrap items-end gap-2 mb-5">
                <div className="w-full">
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
                <div className="w-full">
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
                <div className="w-full">
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
                <div className="w-full">
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
                <div className="w-full">
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
                    label="Search"
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
              <div className="flex lg:flex-nowrap md:flex-wrap flex-wrap items-end gap-2 mb-5">
                <div className="lg:w-56 w-full">
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
                <div className="lg:w-56 w-full">
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
                    label="Show"
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
                        <CampaignLogCard key={index} log={log} />
                      ))
                    )}
                  </Box>
                </div>
              )}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="w-full">
              <div className="flex lg:flex-nowrap md:flex-wrap flex-wrap items-end gap-2 mb-5">
                {isMonthWise ? (
                  <>
                    <div className="lg:w-56 w-full">
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
                    <div className="lg:w-56 w-full">
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
                    <div className="lg:w-56 w-full">
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
                <div className="lg:w-56 w-full">
                  <AnimatedDropdown
                    id="manageWaBaAccount"
                    name="manageWaBaAccount"
                    label="WaBa Account"
                    tooltipContent="Select Status"
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
                <div className="flex items-center justify-start w-full sm:w-35">
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
                    label="Show"
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
        </Box>
      )}
    </div>
  );
};

export default WhatsappManageCampaign;
