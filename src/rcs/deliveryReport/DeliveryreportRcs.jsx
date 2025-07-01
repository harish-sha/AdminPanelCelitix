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
} from "../../apis/rcs/rcs";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import { Checkbox } from "primereact/checkbox";
import toast from "react-hot-toast";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { ExportDialog } from "./components/exportDialog";
import CampaignScheduleTable from "./components/CampaignSchedule";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { fetchAllUsers } from "@/apis/admin/admin";
import { useUser } from "@/context/auth";
import moment from "moment";
import { Dialog } from "primereact/dialog";

const DeliveryreportRcs = () => {
  const [value, setValue] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const { user } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    //fetchAllUsersDetails
    if (user.role === "ADMIN") {
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
          toast.error("Something went wrong! Please try again later.");
        } finally {
          setIsFetching(false);
        }
      };
      fetchAllUsersDetails();
    }
  }, [user.role]);

  //campaignState
  const [campaignData, setCampaignData] = useState({
    startDate: new Date(),
    templateType: "",
    campaignName: "",
    status: "",
    selectedUser: "0",
  });

  const [campaignTableData, setCampaignTableData] = useState([]);

  //summaryState
  const [summaryData, setSummaryData] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    isMonthWise: false,
    selectedUser: "0",
  });
  const [summaryTableData, setSummaryTableData] = useState([]);

  // scheduleState
  const [scheduleData, setScheduleData] = useState({
    startDate: new Date(),
    templateType: " ",
    campaignName: " ",
    status: " ",
  });
  const [scheduleTableData, setScheduleTableData] = useState([]);

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
    deliveryStatus: "",
    source:"",
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
  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

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

    return `${year}/${month}/${day}`;
  };

  //fetchCampaignData
  const handleCampaignSearch = async () => {
    if (user.role === "ADMIN" && !selectedUser) {
      toast.error("Please select a user first.");
      return;
    }
    const data = {
      startDate: moment(campaignData.startDate).format("YYYY-MM-DD"),
      endDate: moment(campaignData.startDate).format("YYYY-MM-DD"),
      templateType: campaignData.templateType ?? "",
      campaignName: campaignData.campaignName,
      status: campaignData.status ?? "",
      selectedUserId: campaignData.selectedUser ?? "0",
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

  //fetchSummaryData
  const handleSummarySearch = async () => {
    if (user.role === "ADMIN" && !selectedUser) {
      toast.error("Please select a user first.");
      return;
    }
    if (!summaryData.fromDate || !summaryData.toDate) {
      toast.error("Please select from and to date.");
    }
    const data = {
      fromDate: moment(summaryData.fromDate).format("YYYY-MM-DD"),
      toDate: moment(summaryData.toDate).format("YYYY-MM-DD"),
      // fromDate: "2022-10-01",
      // toDate: "2025-02-26",
      summaryType: "rcs,date,user",
      isMonthWise: Number(summaryData.isMonthWise),
      selectedUserId: campaignData.selectedUser ?? "0",
    };

    try {
      setIsFetching(true);
      const res = await fetchSummaryReport(data);
      setSummaryTableData(res);
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  // fetchscheduleData
  const handleScheduleSearch = async () => {
    if (user.role === "ADMIN" && !selectedUser) {
      toast.error("Please select a user first.");
      return;
    }
    try {
      setIsFetching(true);
      const res = await scheduledata(selectedUser || "0");

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

  const handleCancel = (srno, campaignName) => {
    // console.log("srno", srno)
    // console.log("campaignName", campaignName)
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
      // console.log("Canceling schedule with SRNO:", srno);
      const res = await cancelschedule({ srno }, selectedUser || "0");
      if (res) {
        toast.success("Schedule cancelled successfully");

        // Refresh the table by fetching the data again
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

  // const handleCancel = async (srno) => {
  //   if (!srno) {
  //     toast.error("Failed to cancel schedule. SRNO is missing.");
  //     return;
  //   }

  //   try {
  //     const res = await cancelschedule({ srno }, selectedUser || "0");
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

  // useEffect(() => {
  //   handleSummarySearch();
  // }, [summaryData.isMonthWise]);
  // useEffect(() => {
  //   handleSummarySearch();
  // }, [summaryData.isMonthWise]);

  function handleExportBtn() {
    setVisibledialog(true);
  }

  return (
    <div>
      <div className="w-full">
        <Box sx={{ width: "100%" }}>
          <div className="flex items-center justify-between w-full">
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
                    <LibraryBooksOutlinedIcon fontSize="small" /> Day Wise
                    Summary
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
            {user.role === "ADMIN" && (
              <div className="w-full sm:w-54">
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
                  // onChange={setSelectedUser}
                  onChange={(e) => {
                    setSelectedUser(e);
                    setCampaignData({
                      ...campaignData,
                      selectedUser: e,
                    });
                    setSummaryData({
                      ...summaryData,
                      selectedUser: e,
                    });
                  }}
                  placeholder="Select User"
                />
              </div>
            )}
          </div>

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
                selectedUser={selectedUser}
              />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="flex flex-wrap items-end w-full gap-2 mb-5">
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
          </CustomTabPanel>
        </Box>
      </div>

      {visibledialog && (
        <ExportDialog
          visibledialog={visibledialog}
          setVisibledialog={setVisibledialog}
          allCampaigns={allCampaigns}
          setDataToExport={setDataToExport}
          dataToExport={dataToExport}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default DeliveryreportRcs;
