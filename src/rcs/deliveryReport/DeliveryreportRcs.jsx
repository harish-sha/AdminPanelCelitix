import React, { useEffect, useState } from "react";
import Loader from "../../whatsapp/components/Loader";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { IoSearch } from "react-icons/io5";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import {
  a11yProps,
  CustomTabPanel,
} from "../../whatsapp/managetemplate/components/CustomTabPanel";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker";
import InputField from "../../whatsapp/components/InputField";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import CampaignsLogsTable from "./components/CampaignsLogsTableRcs";
import DayWiseSummarytableRcs from "./components/DayWiseSummarytableRcs";
import {
  cancelschedule,
  fetchCampaignReport,
  fetchSummaryReport,
  getAllCampaign,
  scheduledata,
  // cancelCampaign
} from "../../apis/rcs/rcs";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import { Checkbox } from "primereact/checkbox";
import toast from "react-hot-toast";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { ExportDialog } from "./components/exportDialog";
import CampaignScheduleTable from "./components/CampaignSchedule";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import moment from "moment";
import { Dialog } from "primereact/dialog";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const DeliveryreportRcs = () => {
  const [value, setValue] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  //campaignState
  const [campaignData, setCampaignData] = useState({
    startDate: new Date(),
    templateType: "",
    campaignName: "",
    status: "",
  });
  const [campaignTableData, setCampaignTableData] = useState([]);

  //summaryState
  const [summaryData, setSummaryData] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    isMonthWise: false,
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [summaryTableData, setSummaryTableData] = useState([]);
  // scheduleState
  const [scheduleData, setScheduleData] = useState({
    startDate: new Date(),
    templateType: " ",
    campaignName: " ",
    status: " ",
  });
  const [scheduleTableData, setScheduleTableData] = useState([]);

  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const [allCampaigns, setAllCampaigns] = useState([]);
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
    campaignType: "",
    status: "",
    source:"",
    deliveryStatus: "",
    type: "campaign",
  });

  const [customcheckboxStates, setcustomCheckboxStates] = useState({
    campaignName: false,
    templateName: false,
    templateType: false,
    templateCategory: false,
    status: false,
    totalAudience: false,
  });

  const [deliverycheckbox, setDeliverycheckbox] = useState({
    answered: false,
    unanswered: false,
    dialed: false,
  });

  const [visibledialog, setVisibledialog] = useState(false);

  useEffect(() => {
    async function handleFetchAllCampaign() {
      try {
        const res = await getAllCampaign();
        setAllCampaigns(res);
      } catch (e) {
        toast.error("Error fetching all campaigns");
        return;
      }
    }
    handleFetchAllCampaign();
  }, [visibledialog]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //formatDate
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  //fetchCampaignData
  const handleCampaignSearch = async () => {
    const data = {
      startDate: moment(campaignData.startDate).format("YYYY-MM-DD"),
      endDate: moment(campaignData.startDate).format("YYYY-MM-DD"),
      templateType: campaignData.templateType ?? "",
      campaignName: campaignData.campaignName,
      status: campaignData.status ?? "",
    };

    try {
      setIsFetching(true);
      const res = await fetchCampaignReport(data);
      const reversedData = res.reverse();
      setCampaignTableData(reversedData);
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

const handleSummarySearch = async () => {
  let FinalFromDate, FinalToDate;

  // Case 1: Use selectedMonth if isMonthWise is enabled
  if (selectedMonth && Number(summaryData.isMonthWise) === 1) {
    FinalFromDate = moment(selectedMonth).startOf("month").format("YYYY-MM-DD");
    FinalToDate = moment(selectedMonth).endOf("month").format("YYYY-MM-DD");
  }

  // ✅ Case 2: No selectedMonth, but isMonthWise is true — fallback to fromDate
  else if (
    Number(summaryData.isMonthWise) === 1 &&
    summaryData.fromDate
  ) {
    const fallbackMonth = summaryData.fromDate;
    FinalFromDate = moment(fallbackMonth).startOf("month").format("YYYY-MM-DD");
    FinalToDate = moment(fallbackMonth).endOf("month").format("YYYY-MM-DD");

    // Clear selectedMonth ONLY in fallback case
    setSelectedMonth(null);
  }

  // Case 3: Manual date range mode
  else if (
    Number(summaryData.isMonthWise) !== 1 &&
    summaryData.fromDate &&
    summaryData.toDate
  ) {
    FinalFromDate = moment(summaryData.fromDate).format("YYYY-MM-DD");
    FinalToDate = moment(summaryData.toDate).format("YYYY-MM-DD");

    // Optional: clear selectedMonth if switching to manual
    setSelectedMonth(null);
  }

  // Invalid case
  else {
    toast.error("Please select a valid date range or month.");
    return;
  }

  const data = {
    fromDate: FinalFromDate,
    toDate: FinalToDate,
    summaryType: "rcs,date,user",
    isMonthWise: Number(summaryData.isMonthWise),
  };

  try {
    setIsFetching(true);
    const res = await fetchSummaryReport(data);
    setSummaryTableData(res);
  } catch (e) {
    toast.error("Something went wrong.");
    console.error("Summary Search Error:", e);
  } finally {
    setIsFetching(false);
  }
};



  // fetchscheduleData
  // const handleScheduleSearch = async () => {
  //   const data = {
  //     startDate: moment(scheduleData.startDate).format("YYYY-MM-DD"),
  //     endDate: moment(scheduleData.endDate).format("YYYY-MM-DD"),
  //     templateType: scheduleData.templateType ?? "",
  //     campaignDataName: scheduleData.campaignName,
  //     status: scheduleData.status ?? "",
  //   };

  //   try {
  //     setIsFetching(true);
  //     const res = await scheduledata(data);

  //     if (Array.isArray(res) && res.length > 0) {
  //       setScheduleTableData(res);
  //     } else {
  //       setScheduleTableData([]); // Clear table data if no results
  //       toast.error("No matching records found.");
  //     }
  //   } catch (err) {
  //     toast.error("Failed to fetch schedule data.");
  //   } finally {
  //     setIsFetching(false); // Ensure loading state is reset
  //   }
  // };

  const handleScheduleSearch = async () => {
    try {
      setIsFetching(true);
      const res = await scheduledata();

      if (Array.isArray(res) && res.length > 0) {
        setScheduleTableData(res);
      } else {
        setScheduleTableData([]);
      }
    } catch (err) {
      console.error("Error fetching schedule data:", err);
      toast.error("Failed to fetch schedule data.");
    } finally {
      setIsFetching(false);
    }
  };

  // const handleCancel = async (srno) => {
  //   if (!srno) {
  //     console.error("SRNO is undefined. Cannot cancel schedule.");
  //     toast.error("Failed to cancel schedule. SRNO is missing.");
  //     return;
  //   }

  //   try {
  //     const res = await cancelschedule({
  //       srno: srno,
  //       selectedUserId: 0,
  //     });
  //     if (res) {
  //       toast.success("Schedule cancelled successfully");

  //       // Refresh the table by fetching the data again
  //       handleScheduleSearch();
  //     } else {
  //       toast.error("Failed to cancel schedule.");
  //     }
  //   } catch (err) {
  //     console.error("Cancel error:", err);
  //     toast.error("Failed to cancel schedule.");
  //   }
  // };

  const handleCancel = (srno, campaignName) => {
    // if (!srno || !campaignName) {
    //   console.error("SRNO is undefined. Cannot cancel campaign.");
    //   toast.error("Failed to cancel campaign. SRNO is missing.");
    //   return;
    // }
    setVisible(true);
    setCurrentRow({ srno, campaignName });
  };

  const handleCancelConfirm = async (srno) => {
    if (!srno) {
      toast.error("Cannot cancel the campaign.");
      return;
    }

    try {
      setIsFetching(true);

      const result = await cancelschedule({ srno: srno });

      if (result) {
        toast.success("Campaign Cancelled successfully");
        handleScheduleSearch();
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

  // useEffect(() => {
  //   handleSummarySearch();
  // }, [summaryData.isMonthWise]);

  function handleExportBtn() {
    setVisibledialog(true);
  }


  // fetchscheduleData
  const handleScheduleSearch = async () => {
    const data = {
      startDate: new Date(scheduleData.startDate).toDateString(),
      endDate: new Date(scheduleData.endDate).toDateString(),
      templateType: scheduleData.templateType ?? "",
      campaignDataName: scheduleData.campaignName,
      status: scheduleData.status ?? "",
    }
    try{
      setIsFetching(true);
      const res = await scheduledata(data)
      setScheduleTableData(res);
      console.log(res);
    }catch(err){
      toast.error("Not Fetching schedule Data",err)
    }
  }

  return (
    <div>
      <div className="w-full">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Deliveryre Report Tabs"
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            className="w-full"
          >
            <Tab
              label={
                <span>
                  <GradingOutlinedIcon fontSize="small" /> Campaigns Logs
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
                <span>
                  <LibraryBooksOutlinedIcon fontSize="small" /> Day Wise Summary
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
                  <CalendarMonthOutlinedIcon fontSize="small" /> Schedule
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




          <CustomTabPanel value={value} index={0}>
            <div className="w-full">
              <div className="flex flex-wrap items-end w-full gap-2 mb-5">
                <div className="w-full sm:w-56">
                  <UniversalDatePicker
                    label="Created On"
                    id="created"
                    name="created"
                    defaultValue={new Date()}
                    value={setCampaignData.startDate}
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        startDate: e,
                      });
                    }}
                    minDate={new Date().setMonth(new Date().getMonth() - 3)}
                    maxDate={new Date()}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <InputField
                    label="Campaign Name"
                    id="campaignName"
                    name="campaignName"
                    placeholder="Enter campaign name"
                    value={campaignData.campaignName}
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        campaignName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    label="Template Type"
                    id="templateType"
                    name="templateType"
                    options={[
                      { label: "Text", value: "text" },
                      { label: "Image", value: "image" },
                      // {
                      //   label: "Rich Card Stand Alone",
                      //   value: "richcardstandalone",
                      // },
                      // {
                      //   label: "Rich Card Carausel",
                      //   value: "richcardcarousel",
                      // },
                    ]}
                    value={campaignData.templateType}
                    placeholder="Select Template Type"
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        templateType: e,
                      });
                    }}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    label="Status"
                    id="status"
                    name="status"
                    options={[
                      { label: "Pending", value: "Pending" },
                      { label: "Completed", value: "Completed" },
                      { label: "Cancelled", value: "Cancelled" },
                      { label: "Scheduled", value: "Scheduled" },
                    ]}
                    value={campaignData.status}
                    placeholder="Select Status"
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        status: e,
                      });
                    }}
                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label={isFetching ? "Searching..." : "Search"}
                    id="campaignsearch"
                    name="campaignsearch"
                    variant="primary"
                    onClick={handleCampaignSearch}
                    icon={<IoSearch />}
                    disabled={isFetching}
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
            </div>
            <div className="w-full">
              <CampaignsLogsTable
                id="whatsappManageCampaignTable"
                name="whatsappManageCampaignTable"
                data={campaignTableData}
              />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="flex flex-wrap items-end w-full gap-2 mb-5">
              {!summaryData.isMonthWise ? (
                <>
                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      label="From Date"
                      id="fromDate"
                      name="fromDate"
                      defaultValue={new Date()}
                      value={setSummaryData?.fromDate}
                      onChange={(e) => {
                        setSummaryData({
                          ...summaryData,
                          fromDate: e,
                        });
                      }}
                      minDate={new Date().setMonth(new Date().getMonth() - 3)}
                      maxDate={new Date()}
                    />
                  </div>
                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      defaultValue={new Date()}
                      label="To Date"
                      id="toDate"
                      name="toDate"
                      value={setSummaryData.toDate}
                      onChange={(e) => {
                        setSummaryData({
                          ...summaryData,
                          toDate: e,
                        });
                      }}
                      minDate={new Date().setMonth(new Date().getMonth() - 3)}
                      maxDate={new Date()}
                    />
                  </div>
                </>
              ) : (
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
              )}

              <div className="flex items-center justify-center gap-2">
                <Checkbox
                  id="isMonthWise"
                  name="isMonthWise"
                  label="Month Wise"
                  checked={summaryData.isMonthWise}
                  onChange={(e) => {
                    setSummaryData({
                      ...summaryData,
                      isMonthWise: e.target.checked,
                    });
                  }}
                  className="m-2"
                />
                <label htmlFor="isMonthWise" className="text-md">
                  Month Wise
                </label>
              </div>
              <div className="w-full sm:w-56">
                <UniversalButton
                  label={isFetching ? "Showing..." : "Show"}
                  id="show"
                  name="show"
                  variant="primary"
                  disabled={isFetching}
                  onClick={handleSummarySearch}
                />
              </div>
            </div>
            <div className="w-full">
              <DayWiseSummarytableRcs
                data={summaryTableData}
                isMonthWise={summaryData.isMonthWise}
              />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="w-full">
              <div className="flex flex-wrap items-end w-full gap-2 mb-5">
                {/* <div className="w-full sm:w-56">
                  <UniversalDatePicker
                    label="Created On"
                    id="created"
                    name="created"
                    defaultValue={new Date()}
                    value={setScheduleData.startDate}
                    onChange={(e) => {
                      setScheduleData({
                        ...scheduleData,
                        startDate: e,
                      });
                    }}
                    minDate={new Date().setMonth(new Date().getMonth() - 3)}
                    maxDate={new Date()}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <InputField
                    label="Campaign Name"
                    id="campaignNameSchedule"
                    name="campaignNameSchedule"
                    placeholder="Enter campaign name"
                    value={scheduleData.campaignName}
                    onChange={(e) => {
                      setScheduleData({
                        ...scheduleData,
                        campaignName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    label="Template Type"
                    id="templateType"
                    name="templateType"
                    options={[
                      { label: "Text", value: "text" },
                      { label: "Image", value: "image" },
                    ]}
                    value={scheduleData.templateType}
                    placeholder="Select Template Type"
                    onChange={(e) => {
                      setScheduleData({
                        ...scheduleData,
                        templateType: e,
                      });
                    }}
                  />
                </div> */}
                <div className="w-max-content">
                  <UniversalButton
                    label={isFetching ? "Refreshing..." : "Refresh"}
                    id="campaignsearch"
                    name="campaignsearch"
                    variant="primary"
                    onClick={handleScheduleSearch}
                    icon={<IoSearch />}
                    disabled={isFetching}
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
            </div>
            {/* <div className="w-full">
              <CampaignScheduleTable
                id="RCSScheduleTable"
                name="RCSScheduleTable"
                data={scheduleTableData}
                onCancel={handleCancel}
              />
            </div> */}

            {isFetching ? (
              <div className="">
                <UniversalSkeleton height="35rem" width="100%" />
              </div>
            ) : (
              <div className="w-full">
                <CampaignScheduleTable
                  id="RCSScheduleTable"
                  name="RCSScheduleTable"
                  data={scheduleTableData}
                  onCancel={handleCancel}
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
          </CustomTabPanel>
        </Box>
      </div>

      {
        visibledialog && (
          <ExportDialog
            visibledialog={visibledialog}
            setVisibledialog={setVisibledialog}
            allCampaigns={allCampaigns}
            setDataToExport={setDataToExport}
            dataToExport={dataToExport}
          />
        )
      }
    </div >
  );
};

export default DeliveryreportRcs;
