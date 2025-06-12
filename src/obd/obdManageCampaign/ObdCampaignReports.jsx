import React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import { IconButton } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DateRangeIcon from "@mui/icons-material/DateRange";
import toast from "react-hot-toast";

import Loader from "@/whatsapp/components/Loader.jsx";
import InputField from "@/whatsapp/components/InputField.jsx";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown.jsx";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker.jsx";

import ObdCampaignTable from "./components/ObdCampaignTable.jsx";
import UniversalLabel from "../../whatsapp/components/UniversalLabel.jsx";
import UniversalButton from "../../whatsapp/components/UniversalButton.jsx";
import ObdDaySummaryTable from "./components/ObdDaySummaryTable.jsx";
import ObdSummaryLogsTable from "./components/ObdSummaryLogsTable.jsx";

import { CustomTabPanel } from "../../whatsapp/managetemplate/components/CustomTabPanel.jsx";
import { DataTable } from "@/components/layout/DataTable.jsx";
import ExportDialogObd from "./export/ExportDialogObd.jsx"

import {
  fetchDayWiseSummaryObd,
  fetchSummaryLogsObd,
  fetchDetailsLogsObd,
  getScheduledVoiceCampaignReport,
  cancelCamapign
} from "@/apis/obd/obd.js";

import moment from "moment";
import { exportToExcel } from "@/utils/utills.js";
import ManageScheduleCampaignTableObd from "./components/ManageScheduleCampaignTableObd.jsx";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton.jsx";

const ObdCampaignReports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [obdCampaignName, setObdCampaignName] = useState("");
  const [obdCampaignNumber, setObdCampaignNumber] = useState("");
  const [obdCampaignType, setObdCampaignType] = useState(null);
  const [obdVoiceType, setObdVoiceType] = useState(null);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [customOptions, setCustomOptions] = useState("radioOptiondisable");
  const [customdialogtype, setCustomdialogtype] = useState(null);
  const [customdialogstatus, setCustomdialogstatus] = useState(null);
  const [customdialognumber, setCustomdialognumber] = useState("");
  const [obdcampaigndate, setObdCampaignDate] = useState(null);
  const [visibledialog, setVisibledialog] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [dtmfResponse, setDtmfResponse] = useState(null);
  const [value, setValue] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const [obdCampaignData, setObdCampaignData] = useState(null);
  const [campaignFromDate, setCampaigndFromDate] = useState(new Date());
  const [campaignToDate, setCampaigndToDate] = useState(new Date());
  const [obdDaySummaryData, setObdDaySummaryData] = useState();

  const [isFetching, setIsFetching] = useState(false);

  const [filteredRows, setFilteredRows] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const formatDateToYYYYMMDD = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [campaignLogDateFilter, setCampaignLogDateFilter] = useState({
    voiceType: "",
    fromDate: new Date(),
    toDate: new Date(),
    page: "",
  });

  const [daywiseDataToFilter, setDaywiseDataToFilter] = useState({
    fromDate: new Date(),
    toDate: new Date(),
  });

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);

  const [allObdCampRows, setAllObdCampRows] = useState([]);
  const [filteredObdCampRows, setFilteredObdCampRows] = useState([]);

  const [campaignFilteredObdRow, setCampaignFilteredRow] = useState({
    obdCampaignName: "",
    formatDateToYYYYMMDD: "",
    campaignType: "",
    mobno: "",
  });

  // const handleCampaignLog = async () => {
  //   const data = {
  //     voiceType: campaignLogDateFilter.voiceType || "",
  //     queTimeStart: formatDateToDDMMYYYY(campaignLogDateFilter.fromDate),
  //     queTimeEnd: formatDateToDDMMYYYY(campaignLogDateFilter.toDate),
  //     page: campaignLogDateFilter.page,
  //   };

  //   try {
  //     setIsFetching(true);
  //     const res = await fetchDetailsLogsObd(data);

  //     setColumns([
  //       { field: "sn", headerName: "S.No", flex: 0.5, minWidth: 70 },
  //       { field: "summaryDate", headerName: "Date", flex: 1, minWidth: 120 },
  //       { field: "totalUnit", headerName: "Total Unit", flex: 1, minWidth: 100 },
  //       { field: "unDeliv", headerName: "Pending", flex: 1, minWidth: 100 },
  //       { field: "failed", headerName: "Failed", flex: 1, minWidth: 100 },
  //     ]);
  //     setRows(
  //       Array.isArray(res)
  //         ? res.map((item, i) => ({
  //           id: i + 1,
  //           sn: i + 1,
  //           ...item,
  //         }))
  //         : []
  //     );
  //   } catch (err) {
  //     toast.error("Something went wrong while fetching data.")
  //   } finally {
  //     setIsFetching(false);
  //   }
  // }

  const handleCampaignLog = () => {
    console.log("Filter Values:", campaignFilteredObdRow);

    const filteredData = obdCampRows.filter((row) => {
      // console.log("row", row);

      const matchName = obdCampaignName
        ? row.campaignName
          .toLowerCase()
          .includes(obdCampaignName.toLowerCase().trim())
        : true;
      // console.log("matchName", matchName);

      const matchDate = obdcampaigndate
        ? row.date === moment(obdcampaigndate).format("YYYY-MM-DD")
        : true;
      // console.log("matchDate ", matchDate);

      const matchType = obdCampaignType
        ? row.type?.toLowerCase() === obdCampaignType.toLowerCase()
        : true;
      // console.log("obdCampaignType", obdCampaignType)

      const matchMobno = obdCampaignNumber
        ? row.mobno?.toString().includes(obdCampaignNumber.toString())
        : true;

      return matchName && matchType && matchMobno && matchDate;
    });
    setDataTable(filteredData);

    console.log("Filtered Data:", filteredData);
    setFilteredRows(filteredData);
  };

  // Day wise summary Start
  const handleDayWiseSummary = async () => {
    const data = {
      fromDate: moment(daywiseDataToFilter.formatDateToYYYYMMDD).format(
        "YYYY-MM-DD"
      ),
      toDate: moment(daywiseDataToFilter.formatDateToYYYYMMDD).format(
        "YYYY-MM-DD"
      ),
    };

    try {
      setIsFetching(true);
      const res = await fetchDayWiseSummaryObd(data);
      setObdDaySummaryData(res);
      console.log("res", res);
    } catch (error) {
      toast.error("Something went wrong while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };
  // Day wise summary End

  // Summary Report Start
  const voiceType = [
    { label: "Transactional", value: "1" },
    { label: "Promotional", value: "2" },
  ];

  const [summaryDataToFilter, setSummaryDataToFilter] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    voiceType: "",
  });

  const [summaryData, setSummarydata] = useState([])

  const handleSummaryLogs = async () => {
    const data = {
      fromDate: moment(summaryDataToFilter.toDate).format("YYYY-MM-DD"),
      toDate: moment(summaryDataToFilter.toDate).format("YYYY-MM-DD"),
      voiceType: summaryDataToFilter.voiceType || "",
    };

    try {
      setIsFetching(true);
      const res = await fetchSummaryLogsObd(data);
      console.log("res", res)
      setSummarydata(res)
    } catch (error) {
      toast.error("Something went wrong while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };

  console.log("summaryData", summaryData)

  // Summary Report End

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

  const [deliverycheckbox, setDeliverycheckbox] = useState({
    answered: false,
    unanswered: false,
    dialed: false,
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

  // Handle checkbox of campaign
  const handleCheckboxChange = (e, name) => {
    setCampaignCheckboxStates((prevState) => ({
      ...prevState,
      [name]: e.checked, // Update the specific checkbox state
    }));
  };

  // Handle delivery checkbox
  const handleDeliveryCheckboxChange = (e, name) => {
    setDeliverycheckbox((prevState) => ({
      ...prevState,
      [name]: e.checked,
    }));
  };

  // Handle checkbox of custom
  const handleCustomCheckboxChange = (e, name) => {
    setcustomCheckboxStates((prevState) => ({
      ...prevState,
      [name]: e.checked,
    }));
  };

  // events
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setObdCampaignName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setObdCampaignNumber(event.target.value);
  };

  const handleExportBtn = () => {
    setVisibledialog(true);
  };

  const handleSearchBtn = () => { };

  const handleSummarySearchBtn = () => { };

 

  const handleCustomDialogNumber = (e) => {
    setCustomdialognumber(e.target.value);
  };

  const handlecampaignDialogSubmithBtn = (e) => {
    console.log("hii")
    setVisibledialog(false);
    setSelectedOption(value);
    setCampaign(e.target.value);

    toast.success("Export Successfully");
  };

  // Export Start

  const handleCustomDialogSubmithBtn = () => {
    console.log("hiii")
  };

  // Export End

  // campaign Report Start

  // const [data, setData] = useState(
  //   {
  //     voiceType: "",
  //     fromDate: "",
  //     toDate: "",
  //     mobile: "",
  //     page: 2,
  //   }
  // );
  const [data, setData] = useState("");

  const fetchCampaignReportsdata = async (data) => {
    try {
      setIsFetching(true);
      const res = await fetchDetailsLogsObd(data);
      setObdCampaignData(res);
    } catch (error) {
      console.error("Error fetching Obd campaign Reports:", error);
      toast.error("Error fetching Obd campaign Reports");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearchObdCampaignLogs = () => {
    const formattedDate = moment(campaignFromDate).format("YYYY-MM-DD");

    const newData = {
      voiceType: obdCampaignType,
      fromDate: formattedDate,
      toDate: formattedDate,
      mobile: obdCampaignNumber,
      page: 1,
    };

    setData(newData);

    fetchCampaignReportsdata(newData);
  };

  // campaign Report End

  // Scheduled Report Start

  const fetchScheduleCampaignData = async () => {
    try {
      setIsFetching(true)
      const res = await getScheduledVoiceCampaignReport()
      setScheduleData(res)
      console.log("res", res)
    } catch (error) {
      console.error("Error fetching the scheduled campaign data :", error)
    } finally {
      setIsFetching(false)
    }
  };

  const handleCancel = async (srno) => {
    console.log("srno", srno)
    try {
      const res = await cancelCamapign(srno)
      toast.success("Campaign deleted successfully")
      fetchScheduleCampaignData()
    } catch (error) {
      console.error("Error in deleting the data")
    }
  };

  const [scheduleData, setScheduleData] = useState([]);

  // Scheduled Report End
  return (
    <>
      <div className="w-full">
        {isLoading ? (
          <Loader />
        ) : (
          <Box sx={{ width: "100%" }}>
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between">
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
                      <LibraryBooksOutlinedIcon size={20} /> Campaign Logs
                    </span>
                  }
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
                      <PollOutlinedIcon size={20} /> Day-wise Summary
                    </span>
                  }
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
                      <PollOutlinedIcon size={20} />
                      Summary Logs
                    </span>
                  }
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

              <div className="w-full sm:w-56 mt-4 ml-6 flex lg:justify-end md:justify-end">
                <UniversalButton
                  id="exportBtn"
                  name="exportBtn"
                  label="Export"
                  icon={
                    <IosShareOutlinedIcon
                      sx={{ marginBottom: "3px", fontSize: "1.1rem" }}
                    />
                  }
                  onClick={handleExportBtn}
                />
              </div>
            </div>

            {/* Campaign Logs Report Start */}
            <CustomTabPanel value={value} index={0}>
              <div className="w-full">
                <div className="flex flex-col md:flex-row lg:flex-row flex--wrap gap-4 items-end justify-start align-middle mb-3 w-full">
                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      id="obdcampaignfromdate"
                      name="obdcampaignfromdate"
                      label="From Date"
                      value={campaignFromDate}
                      onChange={(newValue) => setCampaigndFromDate(newValue)}
                    // minDate={threeMonthsAgo}
                    // maxDate={today}
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <InputField
                      id="obdcampaignname"
                      name="obdcampaignname"
                      label="Campaign Name"
                      value={obdCampaignName}
                      onChange={handleInputChange}
                      placeholder="Campaign Name"
                      tooltipContent="Enter your Campaign Name"
                    />
                  </div>

                  {/* <div className="w-full sm:w-56">
                    <InputField
                      id="obdCampaignNumber"
                      name="obdCampaignNumber"
                      label="Mobile Number"
                      value={obdCampaignNumber}
                      onChange={handleNumberChange}
                      placeholder="Mobile number"
                      type="number"
                      tooltipContent="Enter Your Mobile Number"
                    />
                  </div> */}

                  <div className="w-full sm:w-56">
                    <AnimatedDropdown
                      id="obdCampaignType"
                      name="obdCampaignType"
                      label="Campaign Type"
                      tooltipContent="Select Campaign Type"
                      options={[
                        { value: "0", label: "TTS" },
                        { value: "1", label: "Multi Broadcast" },
                        { value: "2", label: "Simple Broadcast" },
                        { value: "2", label: "Dynamic Broadcast" },
                      ]}
                      value={obdCampaignType}
                      onChange={setObdCampaignType}
                      placeholder="Campaign Type"
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <AnimatedDropdown
                      id="obdVoiceType"
                      name="obdVoiceType"
                      label="Voice Type"
                      tooltipContent="Select Voice Type"
                      options={[
                        { value: "0", label: "All" },
                        { value: "1", label: "Promotional" },
                        { value: "2", label: "Transactional" },
                      ]}
                      value={obdVoiceType}
                      onChange={setObdVoiceType}
                      placeholder="Voice Type"
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <UniversalButton
                      id="obdTemplateSearchBtn"
                      name="obdSearchBtn"
                      label={isFetching ? "Searching..." : "Search"}
                      onClick={handleSearchObdCampaignLogs}
                      icon={<IoSearch />}
                      disabled={isFetching}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <ObdCampaignTable
                    id="CampaignTableObd"
                    name="CampaignTableObd"
                    data={obdCampaignData}
                    filterData={data}
                    fetchCampaignReportsdata={fetchCampaignReportsdata}
                  />
                </div>
              </div>
            </CustomTabPanel>
            {/* Campaign Logs Report End */}

            {/*Day Wise Summary Report Start  */}
            <CustomTabPanel value={value} index={1}>
              <div className="w-full">
                <div className="flex flex-col md:flex-row lg:flex-row flex-wrap gap-4 items-end pb-5 w-full">
                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      label="From Date"
                      id="summaryfromDate"
                      name="summaryfromDate"
                      value={daywiseDataToFilter.fromDate}
                      onChange={(e) =>
                        setDaywiseDataToFilter((prev) => ({
                          ...prev,
                          fromDate: e,
                        }))
                      }
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      label="To Date"
                      id="summarytodate"
                      name="summarytodate"
                      value={daywiseDataToFilter.toDate}
                      onChange={(e) =>
                        setDaywiseDataToFilter((prev) => ({
                          ...prev,
                          toDate: e,
                        }))
                      }
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <UniversalButton
                      id="obdSummarySearchBtn"
                      name="obdSummarySearchBtn"
                      label={isFetching ? "Searching..." : "Search"}
                      icon={<IoSearch />}
                      onClick={handleDayWiseSummary}
                      disabled={isFetching}
                    />
                  </div>
                </div>

                <ObdDaySummaryTable
                  id="obd-daywise-table"
                  name="obdDayWiseTable"
                  data={obdDaySummaryData}
                />
              </div>
            </CustomTabPanel>
            {/*Day Wise Summary Report End  */}

            {/* Summary Logs Report Start */}
            <CustomTabPanel value={value} index={2}>
              <div className="w-full">
                <div className="flex flex-col md:flex-row flex-wrap gap-4 items-end pb-5">
                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      label="From Date"
                      value={summaryDataToFilter.fromDate}
                      onChange={(e) =>
                        setSummaryDataToFilter((prev) => ({
                          ...prev,
                          fromDate: e,
                        }))
                      }
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      label="To Date"
                      value={summaryDataToFilter.toDate}
                      onChange={(e) =>
                        setSummaryDataToFilter((prev) => ({
                          ...prev,
                          toDate: e,
                        }))
                      }
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <AnimatedDropdown
                      label="Voice Type"
                      id="voiceType"
                      name="voiceType"
                      options={voiceType}
                      value={summaryDataToFilter.voiceType}
                      placeholder="Select Type"
                      onChange={(value) =>
                        setSummaryDataToFilter((prev) => ({
                          ...prev,
                          voiceType: value,
                        }))
                      }
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <UniversalButton
                      label={isFetching ? "Searching..." : "Search"}
                      icon={<IoSearch />}
                      onClick={handleSummaryLogs}
                      disabled={isFetching}
                    />
                  </div>
                </div>

                <ObdSummaryLogsTable
                  id="obd-summary-table"
                  name="obdSummaryTable"
                  data={summaryData}
                />
              </div>
            </CustomTabPanel>
            {/* Summary Logs Report End */}

            {/* Scheduled Report Start */}
            <CustomTabPanel value={value} index={3} className="">
              <div className="w-full">
                <div className="w-max-content mb-8">
                  <UniversalButton
                    id="manageCampaignSearchBtn"
                    name="manageCampaignSearchBtn"
                    label={isFetching ? "Refreshing..." : "Refresh"}
                    icon={<IoSearch />}
                    disabled={isFetching}
                    onClick={fetchScheduleCampaignData}
                    variant="primary"
                  />
                </div>
                {/* {isFetching ? (
                  <div className="">
                    <UniversalSkeleton height="35rem" width="100%" />
                  </div>
                ) : ( */}
                <div className="w-full">
                  <ManageScheduleCampaignTableObd
                    id="whatsappManageCampaignScheduleTable"
                    name="whatsappManageCampaignTable"
                    data={scheduleData}
                    onCancel={handleCancel}
                  // fromDate={selectedDate}
                  />
                </div>
                {/* )} */}
              </div>
            </CustomTabPanel>
            {/* Scheduled Report End */}
          </Box>
        )}
      </div>

      <ExportDialogObd
        visibledialog={visibledialog}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        campaign={campaign}
        setCampaign={setCampaign}
        setCustomOptions={setCustomOptions}
        customOptions={customOptions}
        handlecampaignDialogSubmithBtn={handlecampaignDialogSubmithBtn}
        customdialogtype={customdialogtype}
        setCustomdialogtype={setCustomdialogtype}
        customdialogstatus={customdialogstatus}
        setCustomdialogstatus={setCustomdialogstatus}
        customdialognumber={customdialognumber}
        setCustomdialognumber={setCustomdialognumber}
        handleCheckboxChange={handleCheckboxChange}
        campaigncheckboxStates={campaigncheckboxStates}
        setCampaignCheckboxStates={setCampaignCheckboxStates}
        deliverycheckbox={deliverycheckbox}
        setDeliverycheckbox={setDeliverycheckbox}
        handleCustomDialogNumber={handleCustomDialogNumber}
        handleCustomDialogSubmithBtn={handleCustomDialogSubmithBtn}
        dtmfResponse={dtmfResponse}
        setDtmfResponse={setDtmfResponse}
        customcheckboxStates={customcheckboxStates}
        setcustomCheckboxStates={setcustomCheckboxStates}
        handleDeliveryCheckboxChange={handleDeliveryCheckboxChange}
        customcheckboxStates={customcheckboxStates}
        handleCustomCheckboxChange={handleCustomCheckboxChange}
        campaigncheckboxStates={campaigncheckboxStates}
        handleCheckboxChange={handleCheckboxChange}
        setVisibledialog={setVisibledialog}
      />
    </>
  );
};

export default ObdCampaignReports;
