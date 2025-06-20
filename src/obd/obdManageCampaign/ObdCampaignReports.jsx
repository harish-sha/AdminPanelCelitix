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
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";


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
import ExportDialogObd from "./export/ExportDialogObd.jsx";

import {
  fetchDayWiseSummaryObd,
  fetchSummaryLogsObd,
  fetchDetailsLogsObd,
  getScheduledVoiceCampaignReport,
  cancelCamapign,
} from "@/apis/obd/obd.js";

import moment from "moment";
import { exportToExcel } from "@/utils/utills.js";
import ManageScheduleCampaignTableObd from "./components/ManageScheduleCampaignTableObd.jsx";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton.jsx";
import { useUser } from "@/context/auth.jsx";
import { fetchAllUsers } from "@/apis/admin/admin.js";

const ObdCampaignReports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [obdCampaignName, setObdCampaignName] = useState("");
  const [obdCampaignNumber, setObdCampaignNumber] = useState("");
  const [obdCampaignType, setObdCampaignType] = useState(null);
  const [obdVoiceType, setObdVoiceType] = useState(null);
  const [obdcampaigndate, setObdCampaignDate] = useState(null);
  const [visibledialog, setVisibledialog] = useState(false);
  const [value, setValue] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const [obdCampaignData, setObdCampaignData] = useState(null);
  const [campaignFromDate, setCampaigndFromDate] = useState(new Date());
  const [campaignToDate, setCampaigndToDate] = useState(new Date());
  const [obdDaySummaryData, setObdDaySummaryData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const [filteredRows, setFilteredRows] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const { user } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    //fetchAllUsersDetails
    if (user.role === "RESELLER") {
      const fetchAllUsersDetails = async () => {
        const data = {
          userId: "",
          mobileNo: "",
          companyName: "",
          status: "-1",
        };
        try {
          setIsFetching(true);
          const res = await fetchAllUsers(data);
          setAllUsers(res.userMstPojoList);
        } catch (e) {
          // console.log(e);
          toast.error("Something went wrong! Please try again later.");
        } finally {
          setIsFetching(false);
        }
      };
      fetchAllUsersDetails();
    }
  }, []);


  console.log("obdCampaignData", obdCampaignData);
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
    setFilteredRows(filteredData);
  };

  // Day wise summary Start
  const handleDayWiseSummary = async () => {
    if (user.role === "RESELLER" && !selectedUser) {
      toast.error("Please select a user first.");
      return;
    }

    const data = {
      fromDate: moment(daywiseDataToFilter.toDate).format(
        "YYYY-MM-DD"
      ),
      toDate: moment(daywiseDataToFilter.toDate).format(
        "YYYY-MM-DD"
      ),
      selectedUserId: selectedUser || 0
    };

    try {
      setIsFetching(true);
      const res = await fetchDayWiseSummaryObd(data);
      setObdDaySummaryData(res);
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

  const [summaryData, setSummarydata] = useState([]);

  const handleSummaryLogs = async () => {
    if (user.role === "RESELLER" && !selectedUser) {
      toast.error("Please select a user first.");
      return;
    }
    const data = {
      fromDate: moment(summaryDataToFilter.fromDate).format("YYYY-MM-DD"),
      toDate: moment(summaryDataToFilter.toDate).format("YYYY-MM-DD"),
      voiceType: summaryDataToFilter.voiceType || "",
      selectedUserId: selectedUser || 0
    };

    try {
      setIsFetching(true);
      const res = await fetchSummaryLogsObd(data);
      setSummarydata(res);
    } catch (error) {
      toast.error("Something went wrong while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };

  // Summary Report End

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

  // const fetchCampaignReportsdata = async (data) => {
  //   try {
  //     setIsFetching(true);
  //     const res = await fetchDetailsLogsObd(data);
  //     setObdCampaignData(res);

  //     if (obdCampaignName && res?.Data) {
  //     const filteredData = res.Data.filter((item) =>
  //       item.campaignName?.toLowerCase().includes(obdCampaignName.toLowerCase())
  //     );

  //     setObdCampaignData({
  //       ...res,
  //       Data: filteredData,
  //     });
  //   }
  //   } catch (error) {
  //     console.error("Error fetching Obd campaign Reports:", error);
  //     toast.error("Error fetching Obd campaign Reports");
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  const campaignTypeOptions = [
    { value: "0", label: "TTS" },
    { value: "1", label: "MB" },
    { value: "2", label: "SB" },
    { value: "3", label: "Dynamic" }, // ⚠️ Changed value to "3" to make it unique
  ];

  const fetchCampaignReportsdata = async (data) => {
    try {
      setIsFetching(true);
      const res = await fetchDetailsLogsObd(data);
      let filteredData = res?.Data || [];

      const campaignNameFilter = obdCampaignName?.trim().toLowerCase();
      const selectedType = campaignTypeOptions.find(
        (opt) => opt.value === obdCampaignType
      )?.label?.toLowerCase();

      if (campaignNameFilter) {
        filteredData = filteredData.filter((item) =>
          item.campaignName?.toLowerCase().includes(campaignNameFilter)
        );
      }

      if (selectedType) {
        filteredData = filteredData.filter(
          (item) => item.campaignType?.toLowerCase() === selectedType
        );
      }

      setObdCampaignData({
        ...res,
        Data: filteredData,
      });

    } catch (error) {
      console.error("Error fetching Obd campaign Reports:", error);
      toast.error("Error fetching Obd campaign Reports");
    } finally {
      setIsFetching(false);
    }
  };


  const handleSearchObdCampaignLogs = () => {

    if (user.role === "RESELLER" && !selectedUser) {
      toast.error("Please select a user first.");
      return;
    }

    const formattedDate = moment(campaignFromDate).format("YYYY-MM-DD");

    const newData = {
      voiceType: obdVoiceType,
      fromDate: formattedDate,
      toDate: formattedDate,
      mobile: obdCampaignNumber,
      selectedUserId: selectedUser || 0,
      page: 1,
    };

    setData(newData);

    fetchCampaignReportsdata(newData);
  };

  // campaign Report End

  // Scheduled Report Start

  const fetchScheduleCampaignData = async () => {
    if (user.role === "RESELLER" && !selectedUser) {
      toast.error("Please select a user first.");
      return;
    }
    try {
      setIsFetching(true);
      const res = await getScheduledVoiceCampaignReport(selectedUser);
      setScheduleData(res);
    } catch (error) {
      console.error("Error fetching the scheduled campaign data :", error);
    } finally {
      setIsFetching(false);
    }
  };

  // const handleCancel = async (srno) => {
  //   try {
  //     const res = await cancelCamapign(srno, selectedUser);
  //     toast.success("Campaign deleted successfully");
  //     fetchScheduleCampaignData();
  //   } catch (error) {
  //     console.error("Error in deleting the data");
  //   }
  // };

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

      const result = await cancelCamapign(srno, selectedUser);

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


              <div className="ml-6 flex lg:justify-end md:justify-end items-end gap-3">
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
                {user.role === "RESELLER" && (
                  <div className="w-full sm:w-56">
                    <AnimatedDropdown
                      id="manageuser"
                      name="manageuser"
                      label="Select User"
                      tooltipContent="Select user you want to see reports"
                      tooltipPlacement="right"
                      options={allUsers.map((user) => ({
                        label: user.userId,
                        value: user.srno,
                      }))}
                      value={selectedUser}
                      onChange={setSelectedUser}
                      placeholder="Select User"
                    />
                  </div>
                )}
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
                        { value: "3", label: "Dynamic Broadcast" },
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
                        // { value: "0", label: "All" },
                        { value: "2", label: "Promotional" },
                        { value: "1", label: "Transactional" },
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
                    selectedUser={selectedUser}

                  />
                </div>
              </div>
            </CustomTabPanel>
            {/* Campaign Logs Report End */}

            {/*Day Wise Summary Report Start  */}
            <CustomTabPanel value={value} index={1}>
              <div className="w-full">
                <div className="flex flex-col md:flex-row lg:flex-row flex-wrap gap-4 items-end pb-5 w-full">
                  {/* <div className="w-full sm:w-56">
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
                  </div> */}

                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      label="Created Date"
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
                {isFetching ? (
                  <div className="">
                    <UniversalSkeleton height="35rem" width="100%" />
                  </div>
                ) : (
                  <div className="w-full">
                    <ManageScheduleCampaignTableObd
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
                      <span className="text-green-500">"{currentRow?.campaignName}"</span>?
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
              </div>
            </CustomTabPanel>
            {/* Scheduled Report End */}
          </Box>
        )}
      </div>

      <ExportDialogObd
        visibledialog={visibledialog}
        setVisibledialog={setVisibledialog}
        selectedUser={selectedUser}
      />
    </>
  );
};

export default ObdCampaignReports;
