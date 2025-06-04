import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import { IoSearch } from "react-icons/io5";
import { RadioButton } from "primereact/radiobutton";
import AttachmentLogsTbaleSms from "./components/AttachmentLogsTbaleSms";
import { Dialog } from "primereact/dialog";
import DropdownWithSearch from "../../whatsapp/components/DropdownWithSearch";
import UniversalLabel from "../../whatsapp/components/UniversalLabel";
import { Checkbox } from "primereact/checkbox";
import toast from "react-hot-toast";
import {
  fetchCampaignData,
  fetchPreviousDayReport,
  getAttachmentLogs,
  getAllCampaignSms,
  getPreviousCampaignDetails,
  getSummaryReport,
  getSMSCampaignDataByCampNo,
  fetchScheduleCampaignData,
  cancelScheduleCampaignSms,
} from "../../apis/sms/sms";
import { DataTable } from "../../components/layout/DataTable";
import IconButton from "@mui/material/IconButton";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CustomTooltip from "../../whatsapp/components/CustomTooltip";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import { useNavigate } from "react-router-dom";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { ProgressSpinner } from "primereact/progressspinner";
import PreviousDaysTableSms from "./components/PreviousDaysTableSms";
import { ExportDialog } from "./components/exportDialog";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import moment from "moment";
import InfoPopover from "@/components/common/InfoPopover";

const SmsReports = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingScheduleData, setIsFetchingScheduleData] = useState(false);
  const [exports, setExports] = useState(false);
  const [exportStatus, setExportStatus] = useState("disable");
  const [selectexportcampaign, setSelectExportCampaign] = useState(null);
  const [customcolumnStatus, setCustomColumnStatus] = useState("disable");
  const [customcolumnCustom, setCustomColumnCustom] = useState("disable");
  const [campaigncolumns, setCampaignColumns] = useState([]);
  const [campaigncolumnscustom, setCampaignColumnsCustom] = useState([]);
  const [deliverystatus, setDeliveryStatus] = useState([]);
  const [selecttemplatetype, setSelectTemplatetype] = useState(null);
  const [selectstatus, setSelectStatus] = useState(null);
  const [selectedCol, setSelectedCol] = useState("");

  const dropdownButtonRefs = useRef([]);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [campaignInfoMap, setCampaignInfoMap] = useState({});

  const closeDropdown = () => setDropdownOpenId(null);

  //common State
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  //campaign State
  const [campaignDataToFilter, setCampaignDataToFilter] = useState({
    toDate: new Date(),
    campaingName: "",
    mobilesnodata: "",
    campaingType: 1,
  });

  const [campaignScheduleDataToFilter, setCampaignScheduleDataToFilter] =
    useState({
      campaignDate: new Date(),
      campaignName: "",
    });

  const [campaignTableData, setCampaignTableData] = useState([]);

  //previous Day State
  const [previousDataToFilter, setPreviousDataToFilter] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    campaingName: "",
    mobilesnodata: "",
    campaingType: "",
    senderId: "",
    message: "",
    source: "",
    searchSrNo: "",
    searchUserId: "",
  });
  const [previousTableData, setPreviousTableData] = useState([]);
  const [previousDayDetailsDialog, setPreviousDayDetailsDialog] =
    useState(false);
  const [selectedColDetails, setSelectedColDetails] = useState("");
  const [previousDayColumn, setPreviousDayColumn] = useState([]);
  const [previousDayRows, setPreviousDayRows] = useState([]);

  //day wise State
  const [daywiseDataToFilter, setDaywiseDataToFilter] = useState({
    summaryType: "date,user",
    smsType: "",
    fromDate: new Date(),
    toDate: new Date(),
    selectOption: "daywise",
  });
  const [daywiseTableData, setDaywiseTableData] = useState([]);

  //attachment state
  const [attachmentDataToFilter, setAttachmentDataToFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
    type: "",
  });

  const [attachmentTableData, setAttachmentTableData] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [dataToExport, setDataToExport] = useState({
    campaignName: "",
    fromDate: "",
    toDate: "",
    srno: 0,
    isCustomField: 0,
    customColumns: "",
    campaignType: "",
    status: "",
    // delStatus: {},
    delStatus: {
      delivered: false,
      undelivered: false,
      rejected: false,
      pdr: false,
    },
    type: "campaign",
  });

  const templatetypeOptions = [
    { label: "Transactional", value: "Transactional" },
    { label: "Promotional", value: "Promotional" },
    { label: "Both", value: "Both" },
  ];

  const statusOptions = [
    { label: "Delivered", value: "Delivered" },
    { label: "Failed", value: "Failed" },
    { label: "Sent", value: "Sent" },
    { label: "Undelivered", value: "Undelivered" },
  ];

  const CampaignColumnsChange = (e) => {
    let _campaigncolumns = [...campaigncolumns];

    if (e.checked) _campaigncolumns.push(e.value);
    else _campaigncolumns.splice(_campaigncolumns.indexOf(e.value), 1);

    setCampaignColumns(_campaigncolumns);
  };

  const CampaignColumnsCustomChange = (e) => {
    const { value, checked } = e.target;

    setCampaignColumnsCustom((prevColumns) =>
      checked
        ? [...prevColumns, value]
        : prevColumns.filter((col) => col !== value)
    );
  };

  const DeliveryStatusChange = (e) => {
    const { value, checked } = e.target; // Extract the value and checked state

    setDeliveryStatus(
      (prevStatus) =>
        checked
          ? [...prevStatus, value] // Add if checked
          : prevStatus.filter((status) => status !== value) // Remove if unchecked
    );
  };

  const handleExports = () => {
    setExports(true);
  };

  const handleChangeexport = (event) => {
    setExportStatus(event.target.value);
  };

  const handleChangeCustomColumn = (event) => {
    setCustomColumnStatus(event.target.value);
  };
  const handleCustomColumn = (event) => {
    setCustomColumnCustom(event.target.value);
  };

  const exportcampaignOptions = [
    { label: "Campaign 1", value: "Campaign 1" },
    { label: "Campaign 2", value: "Campaign 2" },
    { label: "Campaign 3", value: "Campaign 3" },
  ];

  const campaignoptions = [
    { label: "Transactional", value: "1" },
    { label: "Promotional", value: "2" },
    { label: "International", value: "3" },
  ];
  const previousoptions = [
    { label: "Transactional", value: "1" },
    { label: "Promotional", value: "2" },
    { label: "International", value: "3" },
  ];
  const summaryoptions = [
    { label: "Transactional", value: "1" },
    { label: "Promotional", value: "2" },
    { label: "International", value: "3" },
  ];
  const attachmentoptions = [
    { label: "All", value: "All" },
    { label: "File", value: "File" },
    { label: "Short Url", value: "Short Url" },
    { label: "Whats App Chat", value: "Whats App Chat" },
    { label: "Click To Call", value: "Click To Call " },
  ];

  const handleChangesmsReports = (event) => {
    setSmsStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setColumns([]);
    setRows([]);
  };

  const handleView = async (row) => {
    const id = row.campaignSrno;

    setDropdownOpenId(null);

    const date = moment(campaignDataToFilter.toDate).format("YYYY-MM-DD");

    const data = {
      campaignSrno: id,
      fromDate: date,
      toDate: date,
      selectedUserId: 0,
    };

    try {
      const res = await getSMSCampaignDataByCampNo(data);

      setCampaignInfoMap((prev) => ({
        [id]: res || null,
      }));

      setDropdownOpenId(id);
    } catch (e) {
      console.error("Error fetching campaign summary:", e);
    }
  };

  useEffect(() => {
    async function handleFetchAllSms() {
      try {
        const res = await getAllCampaignSms();
        setAllCampaigns(res);
      } catch (e) {
        toast.error("Something went wrong");
        return;
      }
    }
    handleFetchAllSms();
  }, [isExportDialogOpen]);

  const handleCampaignSearch = async () => {
    try {
      setIsFetching(true);
      const data = {
        // ...campaignDataToFilter,
        campaignName: campaignDataToFilter.campaingName,
        campaignType: campaignDataToFilter.campaingType || "-1",
        mobilesnodata: campaignDataToFilter.mobilesnodata,
        toDate: moment(campaignDataToFilter.toDate).format("YYYY-MM-DD"),
        fromDate: moment(campaignDataToFilter.toDate).format("YYYY-MM-DD"),
        // toDate: "2025-05-29",
        // fromDate: "2025-05-29",
      };
      const res = await fetchCampaignData(data);

      // Map account_usage_type_id to campaign types
      const mappedData = Array.isArray(res)
        ? res.map((item, i) => ({
          id: item.receipt_no_of_duplicate_message,
          sn: i + 1,
          ...item,
          campaign_type:
            item.account_usage_type_id === 1
              ? "Transactional"
              : item.account_usage_type_id === 2
                ? "Promotional"
                : item.account_usage_type_id === 3
                  ? "International"
                  : "Unknown",

          insert_flag:
            item.insert_flag === 1
              ? "Pending"
              : item.insert_flag === 2
                ? "Processing"
                : item.insert_flag === 3
                  ? "Sent"
                  : "Unknown",
        }))
        : [];

      setCampaignTableData(mappedData);
      // setCampaignTableData(res);
      setColumns([
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
        { field: "que_time", headerName: "Created On", flex: 0, minWidth: 200 },
        {
          field: "campaign_name",
          headerName: "Campaign Name",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "campaign_type",
          headerName: "Campaign Type",
          flex: 1,
          minWidth: 50,
        },
        {
          field: "templatename",
          headerName: "Template Name",
          flex: 1,
          minWidth: 50,
        },
        {
          field: "insert_flag",
          headerName: "Status",
          flex: 1,
          minWidth: 50,
        },
        {
          field: "smsCount",
          headerName: "Total Audience",
          flex: 1,
          minWidth: 50,
        },
        {
          field: "action",
          headerName: "Action",
          flex: 1,
          minWidth: 100,
          renderCell: (params) => (
            <>
              {/* <CustomTooltip title="View Campaign" placement="top" arrow>
                <IconButton
                  className="text-xs"
                  ref={(el) => {
                    if (el)
                      dropdownButtonRefs.current[params.row.campaignSrno] = el;
                  }}
                  onClick={() => handleView(params.row)}
                >
                  <InfoOutlinedIcon
                    sx={{ fontSize: "1.2rem", color: "green" }}
                  />
                </IconButton>
              </CustomTooltip> */}
              <InfoPopover
                anchorEl={dropdownButtonRefs.current[params.row.campaignSrno]}
                open={dropdownOpenId == params.row.campaignSrno}
                onClose={closeDropdown}
              >
                {campaignInfoMap[params.row.campaignSrno] ? (
                  <div className="w-[280px] max-w-full">
                    {/* <div className="text-base font-semibold mb-2 text-gray-800">
                                Campaign Summary
                              </div> */}
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                      {[
                        { label: "Total", key: "TotalUnit" },
                        { label: "TotalSMS", key: "TOTALSMS" },
                        { label: "Pending", key: "Pending" },
                        { label: "Failed", key: "failed" },
                        { label: "Delivered", key: "delivered" },
                        { label: "Un Delivered", key: "undelivered" },
                        { label: "Pending DR", key: "drNotAvailable" },
                        // { label: "QUE Time", key: "queTime" },

                        // "TotalUnit",
                        // "TOTALSMS",
                        // "Pending",
                        // "failed",
                        // // "failed",
                        // "delivered",
                        // "undelivered",
                        // "drNotAvailable",
                        // // "queTime",
                      ].map(({ label, key }) => (
                        <React.Fragment key={key}>
                          <div className="font-medium capitalize text-gray-600 border-b border-gray-200 pb-2">
                            {/* {key.replace(/([A-Z])/g, " $1")} */}
                            {label}
                          </div>
                          <div className="text-right font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            {campaignInfoMap[params.row.campaignSrno][key] ??
                              "N/A"}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No Data Available</div>
                )}
              </InfoPopover>

              <CustomTooltip title="Detailed Log" placement="top" arrow>
                <IconButton
                  className="no-xs"
                  onClick={() =>
                    navigate("/smscampaigndetaillogs", {
                      state: { id: params.row.receipt_no_of_duplicate_message },
                    })
                  }
                >
                  <DescriptionOutlinedIcon
                    sx={{
                      fontSize: "1.2rem",
                      color: "green",
                    }}
                  />
                </IconButton>
              </CustomTooltip>
              {/* <CustomTooltip title="Cancel" placement="top" arrow>
                <IconButton onClick={() => handleCancel(params.row)}>
                  <CancelOutlinedIcon
                    sx={{
                      fontSize: "1.2rem",
                      color: "gray",
                    }}
                  />
                </IconButton>
              </CustomTooltip> */}
            </>
          ),
        },
      ]);
      // setRows(
      //   Array.isArray(res)
      //     ? res?.map((item, i) => ({
      //       id: item.receipt_no_of_duplicate_message,
      //       sn: i + 1,
      //       ...item,
      //       total_audience: "-",
      //       campaign_type: "-",
      //     }))
      //     : []
      // );
      setRows(mappedData);
    } catch (e) {
      // console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  // const handleScheduleCampaignSearch = async () => {
  //   try {
  //     setIsFetchingScheduleData(true);

  //     // Prepare the data for the API call (if needed)

  //     const filterCampaignName = campaignScheduleDataToFilter.campaignName;
  //     // const filterCampaignDate = new Date(campaignScheduleDataToFilter.campaignDate).toLocaleDateString("en-GB");
  //     const filterCampaignDate = campaignScheduleDataToFilter.campaignDate
  //       ? new Date(campaignScheduleDataToFilter.campaignDate)
  //           .toISOString()
  //           .slice(0, 10)
  //       : "";

  //     // Make the API call (use data if required)
  //     const res = await fetchScheduleCampaignData();

  //     console.log("API Response:", res);

  //     const handleScheduleSmsCancel = async (row) => {
  //       const srno = row.campaignSrno;
  //       const selectedUserId = 0;

  //       try {
  //         const result = await cancelScheduleCampaignSms({
  //           srno,
  //           selectedUserId,
  //         });
  //         if (result) {
  //           toast.success("Campaign cancelled successfully");

  //           // Remove the deleted campaign from the table data
  //           setCampaignTableData((prev) =>
  //             prev.filter((item) => item.campaignSrno !== srno)
  //           );
  //           setRows((prev) =>
  //             prev.filter((item) => item.campaignSrno !== srno)
  //           );
  //         } else {
  //           console.warn("Cancel request failed or returned empty response.");
  //           toast.error("Cancel request failed");
  //         }
  //       } catch (error) {
  //         console.error("Error cancelling campaign:", error);
  //         toast.error("Error cancelling campaign");
  //       }
  //     };

  //     // Filter logic
  //     let filteredData = Array.isArray(res)
  //       ? res.filter((item) => {
  //           const itemName = item.campaignName?.toLowerCase().trim() || "";
  //           // const itemDate = item.campaignDate
  //           //   ? new Date(item.campaignDate).toLocaleDateString("en-GB")
  //           //   : "";

  //           const itemDate = item.campaignDate
  //             ? new Date(item.campaignDate).toISOString().slice(0, 10)
  //             : "";

  //           const nameMatches = filterCampaignName
  //             ? itemName.includes(filterCampaignName)
  //             : true;
  //           const dateMatches = filterCampaignDate
  //             ? itemDate === filterCampaignDate
  //             : true;

  //           return nameMatches && dateMatches;
  //         })
  //       : [];

  //     // Map data to the expected format
  //     filteredData = filteredData.map((item, i) => ({
  //       id: item.srno || `row-${i}`,
  //       sn: i + 1,
  //       campaign_date: item.campaignDate || "-",
  //       campaign_name: item.campaignName || "-",
  //       sent_time: item.sentTime || "-",
  //       campaignSrno: item.srno,
  //     }));

  //     console.log("Filtered Campaign Data:", filteredData);

  //     // Update state with filtered data
  //     setCampaignTableData(filteredData);
  //     setRows(filteredData);

  //     // Define DataGrid columns
  //     setColumns([
  //       { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
  //       {
  //         field: "campaign_date",
  //         headerName: "Campaign Date",
  //         flex: 1,
  //         minWidth: 120,
  //       },
  //       {
  //         field: "campaign_name",
  //         headerName: "Campaign Name",
  //         flex: 1, 

  //         minWidth: 150,
  //       },
  //       { field: "sent_time", headerName: "Sent Time", flex: 1, minWidth: 120 },
  //       {
  //         field: "action",
  //         headerName: "Action",
  //         flex: 1,
  //         minWidth: 100,
  //         renderCell: (params) => (
  //           <>
  //             {/* <CustomTooltip title="Detailed Log" placement="top" arrow>
  //             <IconButton
  //               className="no-xs"
  //               onClick={() =>
  //                 navigate("/smscampaigndetaillogs", {
  //                   state: { id: params.row.id },
  //                 })
  //               }
  //             >
  //               <DescriptionOutlinedIcon
  //                 sx={{
  //                   fontSize: "1.2rem",
  //                   color: "green",
  //                 }}
  //               />
  //             </IconButton>
  //           </CustomTooltip> */}

  //             <CustomTooltip title="Cancel" placement="top" arrow>
  //               <IconButton onClick={() => handleScheduleSmsCancel(params.row)}>
  //                 <CancelOutlinedIcon
  //                   sx={{
  //                     fontSize: "1.2rem",
  //                     color: "gray",
  //                   }}
  //                 />
  //               </IconButton>
  //             </CustomTooltip>
  //           </>
  //         ),
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error("Error fetching campaign data:", error);
  //     toast.error("Something went wrong.");
  //   } finally {
  //     setIsFetchingScheduleData(false);
  //   }
  // };

  const handleScheduleSmsCancel = async (row) => {
    const srno = row.campaignSrno;
    const selectedUserId = 0; // Or dynamically if required

    try {
      const result = await cancelScheduleCampaignSms({ srno, selectedUserId });
      if (result) {
        toast.success("Campaign cancelled successfully");

        // Remove it from the data table
        setCampaignTableData((prev) =>
          prev.filter((item) => item.campaignSrno !== srno)
        );
        setRows((prev) => prev.filter((item) => item.campaignSrno !== srno));
      } else {
        console.warn("Cancel request failed or returned empty response.");
        toast.error("Cancel request failed");
      }
    } catch (error) {
      console.error("Error cancelling campaign:", error);
      toast.error("Error cancelling campaign");
    }
  };

  const handleScheduleCampaignSearch = async () => {
    try {
      setIsFetchingScheduleData(true);

      const res = await fetchScheduleCampaignData();
      console.log("API Response:", res);

      // Step 1: Map API response first
      let mappedData = Array.isArray(res)
        ? res.map((item, i) => ({
          id: item.srno || `row-${i}`,
          sn: i + 1,
          campaign_date: item.campaignDate || "-",
          campaign_name: item.campaignName || "-",
          sent_time: item.sentTime || "-",
          campaignSrno: item.srno,
        }))
        : [];

      // Step 2: Extract filters if any
      const filterCampaignName = campaignScheduleDataToFilter?.campaignName
        ?.toLowerCase()
        .trim();
      const filterCampaignDate = campaignScheduleDataToFilter?.campaignDate
        ? new Date(campaignScheduleDataToFilter.campaignDate)
          .toISOString()
          .slice(0, 10)
        : null;

      // Step 3: Filter only if filters are provided
      // if (filterCampaignName || filterCampaignDate) {
      //   mappedData = mappedData.filter((item) => {
      //     const nameMatches = filterCampaignName
      //       ? item.campaign_name.toLowerCase().includes(filterCampaignName)
      //       : true;

      //     const itemDate = item.campaign_date
      //       ? new Date(item.campaign_date).toISOString().slice(0, 10)
      //       : "";

      //     const dateMatches = filterCampaignDate
      //       ? itemDate === filterCampaignDate
      //       : true;

      //     return nameMatches && dateMatches;
      //   });
      // }

      // Step 4: Update table state
      setCampaignTableData(mappedData);
      setRows(mappedData);

      // Step 5: Setup columns
      setColumns([
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
        {
          field: "campaign_date",
          headerName: "Campaign Date",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "campaign_name",
          headerName: "Campaign Name",
          flex: 1,
          minWidth: 150,
        },
        { field: "sent_time", headerName: "Sent Time", flex: 1, minWidth: 120 },
        {
          field: "action",
          headerName: "Action",
          flex: 1,
          minWidth: 100,
          renderCell: (params) => (
            <>
              <CustomTooltip title="Cancel" placement="top" arrow>
                <IconButton onClick={() => handleScheduleSmsCancel(params.row)}>
                  <CancelOutlinedIcon
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
      ]);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsFetchingScheduleData(false);
    }
  };

  // const handleScheduleSmsCancel = async (row) => {
  //   const srno = row.campaignSrno;
  //   const selectedUserId = 0;

  //   try {
  //     const result = await cancelScheduleCampaignSms({
  //       srno,
  //       selectedUserId,
  //     });
  //     if (result) {
  //       toast.success("Campaign cancelled successfully");

  //       // Remove the deleted campaign from the table data
  //       setCampaignTableData((prev) =>
  //         prev.filter((item) => item.campaignSrno !== srno)
  //       );
  //       setRows((prev) => prev.filter((item) => item.campaignSrno !== srno));
  //     } else {
  //       console.warn("Cancel request failed or returned empty response.");
  //       toast.error("Cancel request failed");
  //     }
  //   } catch (error) {
  //     console.error("Error cancelling campaign:", error);
  //     toast.error("Error cancelling campaign");
  //   }
  // };

  // const handleScheduleCampaignSearch = async () => {
  //   try {
  //     setIsFetchingScheduleData(true);

  //     // Prepare the data for the API call (if needed)
  //     const filterCampaignName = campaignScheduleDataToFilter.campaignName;
  //     const filterCampaignDate = new Date(
  //       campaignScheduleDataToFilter.campaignDate
  //     ).toLocaleDateString("en-GB");

  //     // Make the API call (use data if required)
  //     const res = await fetchScheduleCampaignData();

  //     console.log("API Response:", res);

  //     // Filter logic
  //     let filteredData = Array.isArray(res)
  //       ? res.filter((item) => {
  //           const itemName = item.campaignName?.toLowerCase().trim() || "";
  //           const itemDate = item.campaignDate
  //             ? new Date(item.campaignDate).toLocaleDateString("en-GB")
  //             : "";

  //           const nameMatches = filterCampaignName
  //             ? itemName.includes(filterCampaignName)
  //             : true;
  //           const dateMatches = filterCampaignDate
  //             ? itemDate === filterCampaignDate
  //             : true;

  //           return nameMatches && dateMatches;
  //         })
  //       : [];

  //     // Map data to the expected format
  //     filteredData = filteredData.map((item, i) => ({
  //       id: item.srno || `row-${i}`,
  //       sn: i + 1,
  //       campaign_date: item.campaignDate || "-",
  //       campaign_name: item.campaignName || "-",
  //       sent_time: item.sentTime || "-",
  //       campaignSrno: item.srno,
  //     }));

  //     // Update state with filtered data
  //     setCampaignTableData(filteredData);
  //     setRows(filteredData);

  //     console.log("Filtered Campaign Data:", filteredData);

  //     // Define DataGrid columns
  //     setColumns([
  //       { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
  //       {
  //         field: "campaign_date",
  //         headerName: "Campaign Date",
  //         flex: 1,
  //         minWidth: 120,
  //       },
  //       {
  //         field: "campaign_name",
  //         headerName: "Campaign Name",
  //         flex: 1,
  //         minWidth: 150,
  //       },
  //       {
  //         field: "sent_time",
  //         headerName: "Sent Time",
  //         flex: 1,
  //         minWidth: 120,
  //       },
  //       {
  //         field: "action",
  //         headerName: "Action",
  //         flex: 1,
  //         minWidth: 100,
  //         renderCell: (params) => (
  //           <>
  //             <CustomTooltip title="Cancel" placement="top" arrow>
  //               <IconButton onClick={() => handleScheduleSmsCancel(params.row)}>
  //                 <CancelOutlinedIcon
  //                   sx={{
  //                     fontSize: "1.2rem",
  //                     color: "gray",
  //                   }}
  //                 />
  //               </IconButton>
  //             </CustomTooltip>
  //           </>
  //         ),
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error("Error fetching campaign data:", error);
  //     toast.error("Something went wrong.");
  //   } finally {
  //     setIsFetchingScheduleData(false);
  //   }
  // };

  const handlePreviousDaysSearch = async () => {
    const data = {
      ...previousDataToFilter,
      // fromDate: new Date(previousDataToFilter.fromDate).toLocaleDateString(
      //   "en-GB"
      // ),
      // toDate: new Date(previousDataToFilter.toDate).toLocaleDateString("en-GB"),
      fromDate: moment(previousDataToFilter.fromDate).format("YYYY-MM-DD"),
      toDate: moment(previousDataToFilter.toDate).format("YYYY-MM-DD"),
    };

    try {
      setIsFetching(true);
      const res = await fetchPreviousDayReport(data);
      setColumns([
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
        {
          field: "sending_user_id",
          headerName: "User",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "TOTALSMS",
          headerName: "Total SMS",
          flex: 1,
          minWidth: 120,
          renderCell: (params) => (
            <CustomTooltip title={params.row.TOTALSMS} placement="top" arrow>
              <button
                onClick={() => {
                  setSelectedCol("TOTALSMS");
                  handlePreviosDayDetailDisplay("TOTALSMS");
                }}
              >
                {params.row.TOTALSMS}
              </button>
            </CustomTooltip>
          ),
        },
        {
          field: "Pending",
          headerName: "Pending",
          flex: 1,
          minWidth: 90,
          renderCell: (params) => (
            <CustomTooltip title={params.row.Pending} placement="top" arrow>
              <button
                onClick={() => {
                  setSelectedCol("Pending");
                  handlePreviosDayDetailDisplay("Pending");
                }}
              >
                {params.row.Pending}
              </button>
            </CustomTooltip>
          ),
        },
        {
          field: "failed",
          headerName: "Failed",
          flex: 1,
          minWidth: 70,
          renderCell: (params) => (
            <CustomTooltip title={params.row.failed} placement="top" arrow>
              <button
                onClick={() => {
                  setSelectedCol("failed");
                  handlePreviosDayDetailDisplay("failed");
                }}
              >
                {params.row.failed}
              </button>
            </CustomTooltip>
          ),
        },
        {
          field: "Sent",
          headerName: "Sent",
          flex: 1,
          minWidth: 60,
          renderCell: (params) => (
            <CustomTooltip title={params.row.Sent} placement="top" arrow>
              <button
                onClick={() => {
                  setSelectedCol("Sent");
                  handlePreviosDayDetailDisplay("Sent");
                }}
              >
                {params.row.Sent}
              </button>
            </CustomTooltip>
          ),
        },
        {
          field: "delivered",
          headerName: "Delivered",
          flex: 1,
          minWidth: 90,
          renderCell: (params) => (
            <CustomTooltip title={params.row.delivered} placement="top" arrow>
              <button
                onClick={() => {
                  setSelectedCol("delivered");
                  handlePreviosDayDetailDisplay("delivered");
                }}
              >
                {params.row.delivered}
              </button>
            </CustomTooltip>
          ),
        },
        {
          field: "undelivered",
          headerName: "Undelivered",
          flex: 1,
          minWidth: 110,

          renderCell: (params) => (
            <CustomTooltip title={params.row.undelivered} placement="top" arrow>
              <button
                onClick={() => {
                  setSelectedCol("undelivered");
                  handlePreviosDayDetailDisplay("undelivered");
                }}
              >
                {params.row.undelivered}
              </button>
            </CustomTooltip>
          ),
        },
        {
          field: "drNotAvailable",
          headerName: "Pending DR",
          flex: 1,
          minWidth: 110,
        },
        { field: "NDNCDenied", headerName: "NDNC", flex: 1, minWidth: 70 },
      ]);

      setRows(
        Array.isArray(res)
          ? res.map((item, i) => ({
            id: i + 1,
            sn: i + 1,
            ...item,
          }))
          : []
      );
    } catch (e) {
      // console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleDayWiseSummary = async () => {
    const data = {
      // ...daywiseDataToFilter,
      // fromDate: new Date(daywiseDataToFilter.fromDate).toLocaleDateString(
      //   "en-GB"
      // ),
      // toDate: new Date(daywiseDataToFilter.toDate).toLocaleDateString("en-GB"),
      fromDate: moment(daywiseDataToFilter.fromDate).format("YYYY-MM-DD"),
      toDate: moment(daywiseDataToFilter.toDate).format("YYYY-MM-DD"),
      summaryType: "date,user",
      smsType: daywiseDataToFilter.smsType ?? "",
    };

    try {
      setIsFetching(true);
      const res = await getSummaryReport(data);
      // console.log(res);
      setColumns([
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
        { field: "queuedate", headerName: "Que Date", flex: 1, minWidth: 50 },
        { field: "smscount", headerName: "SMS Count", flex: 1, minWidth: 50 },
        { field: "smsunits", headerName: "SMS Units", flex: 1, minWidth: 50 },
        { field: "pending", headerName: "Pending", flex: 1, minWidth: 50 },
        { field: "failed", headerName: "Failed", flex: 1, minWidth: 50 },
        { field: "blocked", headerName: "Blocked", flex: 1, minWidth: 50 },
        { field: "sent", headerName: "Sent", flex: 1, minWidth: 50 },
        { field: "delivered", headerName: "Delivered", flex: 1, minWidth: 50 },
        {
          field: "not_delivered",
          headerName: "Not delivered",
          flex: 1,
          minWidth: 50,
        },
        {
          field: "pending",
          headerName: "Pending DR",
          flex: 1,
          minWidth: 50,
        },
        {
          field: "action",
          headerName: "Action",
          flex: 1,
          minWidth: 50,
          renderCell: (params) => (
            <>
              <CustomTooltip title="Download" placement="top" arrow>
                <IconButton
                  className="no-xs"
                  onClick={() => {
                    // console.log(params.row);
                  }}
                >
                  <DownloadForOfflineOutlinedIcon
                    sx={{
                      fontSize: "1.2rem",
                      color: "green",
                    }}
                  />
                </IconButton>
              </CustomTooltip>
            </>
          ),
        },
      ]);

      setRows(
        Array.isArray(res)
          ? res.map((item, i) => ({
            id: i + 1,
            sn: i + 1,
            ...item,
          }))
          : []
      );
    } catch (e) {
      // console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleAttachmentSearch = async () => {
    const data = {
      ...attachmentDataToFilter,
      // startDate: new Date(attachmentDataToFilter.startDate).toLocaleDateString(
      //   "en-GB"
      // ),
      // endDate: new Date(attachmentDataToFilter.endDate).toLocaleDateString(
      //   "en-GB"
      // ),
      startDate: moment(attachmentDataToFilter.startDate).format("YYYY-MM-DD"),
      endDate: moment(attachmentDataToFilter.endDate).format("YYYY-MM-DD"),
      type: "",
    };

    try {
      setIsFetching(true);
      const res = await getAttachmentLogs(data);
      setColumns([
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 120 },
        {
          field: "campaign_name",
          headerName: "Campaign Name",
          flex: 1,
          minWidth: 120,
        },
        // { field: "queTime", headerName: "Date", flex: 1, minWidth: 120 },
        {
          field: "queTime",
          headerName: "Date",
          flex: 1,
          minWidth: 120,
          renderCell: (params) =>
            moment(params.row.queTime).format("YYYY-MM-DD HH:mm"),
        },
        {
          field: "count",
          headerName: "Total clicks",
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
              <CustomTooltip title="Detailed Log" placement="top" arrow>
                <IconButton
                  className="no-xs"
                  onClick={() =>
                    navigate("/smsAttachmentdetaillog", {
                      state: { id: params.row.campaign_srno },
                    })
                  }
                >
                  <DescriptionOutlinedIcon
                    sx={{
                      fontSize: "1.2rem",
                      color: "green",
                    }}
                  />
                </IconButton>
              </CustomTooltip>
              <CustomTooltip title="Download" placement="top" arrow>
                <IconButton
                  onClick={() => {
                    // console.log(params.row);
                  }}
                >
                  <DownloadForOfflineOutlinedIcon
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
      ]);

      const sortedData = res.sort(
        (a, b) => new Date(b.queTime) - new Date(a.queTime)
      );

      setRows(
        Array.isArray(sortedData)
          ? res.map((item, i) => ({
            id: i + 1,
            sn: i + 1,
            ...item,
          }))
          : []
      );
    } catch (e) {
      // console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  const handlePreviosDayDetailDisplay = async (col) => {
    if (!col) return;
    const data = {
      summaryType: col || selectedCol,
      mobileNo: "",
      // fromDate: new Date(previousDataToFilter.fromDate).toLocaleDateString(
      //   "en-GB"
      // ),
      // toDate: new Date(previousDataToFilter.toDate).toLocaleDateString("en-GB"),
      fromDate: moment(previousDataToFilter.fromDat).format("YYYY-MM-DD"),
      toDate: moment(previousDataToFilter.toDate).format("YYYY-MM-DD"),
      page: currentPage,
      source: "",
    };

    setPreviousDayDetailsDialog(true);
    setSelectedColDetails(col);
    try {
      setIsFetching(true);
      const res = await getPreviousCampaignDetails(data);
      setTotalPage(res?.pages || 0);

      setPreviousDayColumn([
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
        // {
        //   field: "que_time",
        //   headerName: "Created on",
        //   flex: 1,
        //   minWidth: 120,
        // },
        {
          field: "que_time",
          headerName: "Created on",
          flex: 1,
          minWidth: 120,
          renderCell: (params) => (
            <>{moment(params.row.que_time).format("DD-MM-YYYY HH:mm")}</>
          ),
        },
        {
          field: "smsunit",
          headerName: "Sms Unit",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "mobile_no",
          headerName: "Mobile Number",
          flex: 1,
          minWidth: 120,
        },
        // {
        //   field: "source",
        //   headerName: "Sms Source",
        //   flex: 1,
        //   minWidth: 120,
        // },
        {
          field: "message",
          headerName: "Message",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "sent_time",
          headerName: "Sent Time",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "source",
          headerName: "Sms Source",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "senderid",
          headerName: "SenderId",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "total",
          headerName: "Total",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "status",
          headerName: "Status",
          flex: 1,
          minWidth: 120,
        },
      ]);

      setPreviousDayRows(
        Array.isArray(res?.data)
          ? res?.data.map((item, index) => ({
            sn: index + 1,
            id: index + 1,
            ...item,
          }))
          : []
      );
      setPreviousDayDetailsDialog(true);
    } catch (e) {
      // console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    handlePreviosDayDetailDisplay(selectedCol);
  }, [currentPage, selectedCol]);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <div className="flex items-end justify-between pr-2">
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
                  <GradingOutlinedIcon size={20} /> Campaigns Logs
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
                  <LibraryBooksOutlinedIcon size={20} /> Detailed Logs
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
                  <LibraryBooksOutlinedIcon size={20} /> Day Wise Summary
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
                  <LibraryBooksOutlinedIcon size={20} /> Attachment Logs
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
                  <LibraryBooksOutlinedIcon size={20} /> Schedule Logs
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

          {/* <UniversalButton
            label="Export"
            id="exportsmsreport"
            name="exportsmsreport"
            onClick={handleExports}
          /> */}
        </div>
        <CustomTabPanel value={value} index={0}>
          <div className="w-full">
            <div className="flex flex-wrap items-end w-full gap-2 mb-5">
              <div className="w-full sm:w-52">
                <UniversalDatePicker
                  label="Created On"
                  id="campaigndate"
                  name="campaigndate"
                  value={campaignDataToFilter.toDate}
                  onChange={(value) => {
                    setCampaignDataToFilter((prev) => ({
                      ...prev,
                      toDate: value,
                    }));
                  }}
                  placeholder="Select Date"
                  minDate={new Date().setMonth(new Date().getMonth() - 3)}
                  maxDate={new Date()}
                />
              </div>
              <div className="w-full sm:w-52">
                <InputField
                  label="Campaign Name"
                  id="campaignName"
                  name="campaignName"
                  placeholder="Enter campaign name"
                  value={campaignDataToFilter.campaingName}
                  onChange={(e) => {
                    setCampaignDataToFilter((prev) => ({
                      ...prev,
                      campaingName: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="w-full sm:w-52">
                <InputField
                  label="Mobile Number"
                  id="campaignnumber"
                  name="campaignnumber"
                  placeholder="Enter Campaign Number"
                  value={campaignDataToFilter.mobilesnodata}
                  onChange={(e) => {
                    setCampaignDataToFilter((prev) => ({
                      ...prev,
                      mobilesnodata: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="w-full sm:w-52">
                <AnimatedDropdown
                  label="Campaign Type"
                  id="campaignType"
                  name="campaignType"
                  options={campaignoptions}
                  value={campaignDataToFilter.campaingType}
                  placeholder="Select Campaign Type"
                  onChange={(value) => {
                    setCampaignDataToFilter((prev) => ({
                      ...prev,
                      campaingType: value,
                    }));
                  }}
                />
              </div>
              <div className="w-full sm:w-52 flex gap-2">
                <div className="w-max-content">
                  <UniversalButton
                    label={isFetching ? "Searching..." : "Search"}
                    id="campaignsearch"
                    name="campaignsearch"
                    variant="primary"
                    icon={<IoSearch />}
                    onClick={handleCampaignSearch}
                    disabled={isFetching}
                  />
                </div>
                <UniversalButton
                  label={"Export"}
                  id="exportCampaign"
                  name="exportCampaign"
                  variant="primary"
                  onClick={() => {
                    setIsExportDialogOpen(true);
                  }}
                  disabled={isFetching}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <DataTable
              id="CampaignTableSms"
              name="CampaignTableSms"
              rows={rows}
              col={columns}
            />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="w-full">
            <div className="flex flex-wrap items-end w-full gap-2 mb-5">
              <div className="w-full sm:w-42">
                <UniversalDatePicker
                  label="From Date"
                  id="previousfromDate"
                  name="previousfromDate"
                  placeholder="Select From Date"
                  value={previousDataToFilter.fromDate}
                  onChange={(value) => {
                    setPreviousDataToFilter((prev) => ({
                      ...prev,
                      fromDate: value,
                    }));
                  }}
                  minDate={new Date().setMonth(new Date().getMonth() - 3)}
                  maxDate={new Date()}
                  defaultValue={new Date()}
                />
              </div>
              <div className="w-full sm:w-42">
                <UniversalDatePicker
                  label="To Date"
                  id="previoustodate"
                  name="previoustodate"
                  placeholder="Select To Date"
                  value={previousDataToFilter.toDate}
                  onChange={(value) => {
                    setPreviousDataToFilter((prev) => ({
                      ...prev,
                      toDate: value,
                    }));
                  }}
                  minDate={new Date().setMonth(new Date().getMonth() - 3)}
                  maxDate={new Date()}
                />
              </div>
              <div className="w-full sm:w-42">
                <InputField
                  label="Mobile Number"
                  id="previousnumber"
                  name="previousnumber"
                  placeholder="Enter Mobile Number"
                  value={previousDataToFilter.mobilesnodata}
                  onChange={(e) => {
                    setPreviousDataToFilter((prev) => ({
                      ...prev,
                      mobilesnodata: e.target.value,
                    }));
                  }}
                  type="number"
                />
              </div>
              <div className="w-full sm:w-42">
                <AnimatedDropdown
                  label="Type"
                  id="previousType"
                  name="previousType"
                  options={previousoptions}
                  placeholder="Select Type"
                  value={previousDataToFilter.campaingType}
                  onChange={(value) => {
                    setPreviousDataToFilter((prev) => ({
                      ...prev,
                      campaingType: value,
                    }));
                  }}
                />
              </div>
              <div className="w-full sm:w-42">
                <AnimatedDropdown
                  label="Source"
                  id="previousSource"
                  name="previousSource"
                  options={[
                    {
                      label: "All",
                      value: "",
                    },
                    {
                      label: "API",
                      value: "api",
                    },
                    {
                      label: "GUI",
                      value: "gui",
                    },
                  ]}
                  placeholder="Select Type"
                  value={previousDataToFilter.source}
                  onChange={(value) => {
                    setPreviousDataToFilter((prev) => ({
                      ...prev,
                      source: value,
                    }));
                  }}
                />
              </div>
              {/* <div className="w-full sm:w-42">
                <InputField
                  label="Sender ID"
                  id="previoussenderid"
                  name="previoussenderid"
                  placeholder="Enter Sender ID"
                  value={previousDataToFilter.senderId}
                  onChange={(e) => {
                    setPreviousDataToFilter((prev) => ({
                      ...prev,
                      senderId: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="w-full sm:w-42">
                <InputField
                  label="Content"
                  id="previouscontent"
                  name="previouscontent"
                  placeholder="Enter Content ID"
                  value={previousDataToFilter.message}
                  onChange={(e) => {
                    setPreviousDataToFilter((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }));
                  }}
                />
              </div> */}

              <div className="w-full sm:w-42">
                <div className="w-max-content">
                  <UniversalButton
                    label="Show"
                    id="previousshow"
                    name="previousshow"
                    variant="primary"
                    onClick={handlePreviousDaysSearch}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <DataTable
              id="PreviousDaysTableSms"
              name="PreviousDaysTableSms"
              rows={rows}
              col={columns}
            />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="w-full">
            <div className="flex flex-wrap items-end w-full gap-2 mb-5">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="From Date"
                  id="summaryfromDate"
                  name="summaryfromDate"
                  value={daywiseDataToFilter.fromDate}
                  onChange={(e) => {
                    setDaywiseDataToFilter((prev) => ({
                      ...prev,
                      fromDate: e,
                    }));
                  }}
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="To Date"
                  id="summarytodate"
                  name="summarytodate"
                  value={daywiseDataToFilter.toDate}
                  onChange={(e) => {
                    setDaywiseDataToFilter((prev) => ({
                      ...prev,
                      toDate: e,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-wrap w-full gap-4 sm:w-56">
                <AnimatedDropdown
                  label="SmsType"
                  id="SmsTyoe"
                  name="SmsType"
                  options={[
                    { value: 1, label: "Day Wise" },
                    { value: 2, label: "Sms type Wise" },
                  ]}
                  value={daywiseDataToFilter.selectOption}
                  placeholder="Select Type"
                  onChange={(value) => {
                    setDaywiseDataToFilter((prev) => ({
                      ...prev,
                      selectOption: value,
                    }));
                  }}
                />
              </div>

              <div className="w-full sm:w-56">
                <AnimatedDropdown
                  label="Type"
                  id="summaryType"
                  name="summaryType"
                  options={summaryoptions}
                  value={daywiseDataToFilter.smsType}
                  placeholder="Select Type"
                  onChange={(value) => {
                    setDaywiseDataToFilter((prev) => ({
                      ...prev,
                      smsType: value,
                    }));
                  }}
                  disabled={daywiseDataToFilter.selectOption === 1}
                />
              </div>
              <div className="w-full sm:w-56">
                <div className="w-max-content">
                  <UniversalButton
                    label="Show"
                    id="summaryshow"
                    name="summaryshow"
                    variant="primary"
                    onClick={handleDayWiseSummary}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <DataTable
              id="DayWiseSummaryTableSms"
              name="DayWiseSummaryTableSms"
              col={columns}
              rows={rows}
            />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div className="w-full">
            <div className="flex flex-wrap items-end w-full gap-2 mb-5">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="From Date"
                  id="attachmentfromDate"
                  name="attachmentfromDate"
                  value={attachmentDataToFilter.startDate}
                  onChange={(e) => {
                    setAttachmentDataToFilter((prev) => ({
                      ...prev,
                      startDate: e,
                    }));
                  }}
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="To Date"
                  id="attachmenttodate"
                  name="attachmenttodate"
                  value={attachmentDataToFilter.endDate}
                  onChange={(e) => {
                    setAttachmentDataToFilter((prev) => ({
                      ...prev,
                      endDate: e,
                    }));
                  }}
                />
              </div>

              <div className="w-full sm:w-56">
                <AnimatedDropdown
                  label="Type"
                  id="attachmentType"
                  name="attachmentType"
                  options={attachmentoptions}
                  placeholder="Select Type"
                  value={attachmentDataToFilter.type}
                  onChange={(value) => {
                    setAttachmentDataToFilter((prev) => ({
                      ...prev,
                      type: value,
                    }));
                  }}
                />
              </div>
              <div className="w-max-content">
                <UniversalButton
                  label="Show"
                  id="attachmentshow"
                  name="attachmentshow"
                  variant="primary"
                  onClick={handleAttachmentSearch}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <DataTable
              id="AttachmentTableSms"
              name="AttachmentTableSms"
              col={columns}
              rows={rows}
            />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <div className="w-full">
            <div className="flex flex-wrap items-end w-full gap-2 mb-5">
              {/* <div className="w-full sm:w-52">
                <UniversalDatePicker
                  label="Created On"
                  id="campaigndate"
                  name="campaigndate"
                  value={campaignScheduleDataToFilter.campaignDate}
                  onChange={(value) => {
                    setCampaignScheduleDataToFilter((prev) => ({
                      ...prev,
                      campaignDate: value,
                    }));
                  }}
                  placeholder="Select Date"
                  minDate={new Date().setMonth(new Date().getMonth() - 3)}
                  maxDate={new Date()}
                />
              </div>
              <div className="w-full sm:w-52">
                <InputField
                  label="Campaign Name"
                  id="campaignName"
                  name="campaignName"
                  placeholder="Enter campaign name"
                  value={campaignScheduleDataToFilter.campaignName}
                  onChange={(e) => {
                    setCampaignScheduleDataToFilter((prev) => ({
                      ...prev,
                      campaignName: e.target.value,
                    }));
                  }}
                />
              </div> */}
              <div className="w-full sm:w-52 flex gap-2">
                <div className="w-max-content">
                  <UniversalButton
                    label={isFetchingScheduleData ? "Refreshing..." : "Refresh"}
                    id="campaignsearch"
                    name="campaignsearch"
                    variant="primary"
                    icon={<IoSearch />}
                    onClick={handleScheduleCampaignSearch}
                    disabled={isFetchingScheduleData}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <DataTable
              id="ScheduleCampaignTableSms"
              name="ScheduleCampaignTableSms"
              rows={rows}
              col={columns}
            />
          </div>
        </CustomTabPanel>
      </Box>

      <Dialog
        header={selectedColDetails}
        visible={previousDayDetailsDialog}
        onHide={() => {
          setPreviousDayDetailsDialog(false);
          setPreviousDayRows([]);
          setPreviousDayColumn([]);
          setTotalPage(0);
          setPaginationModel({ page: 0, pageSize: 10 });
          setCurrentPage(1);
          setSelectedCol("");
        }}
        className="w-fit "
        draggable={false}
      >
        {/* {isFetching ? (
          <div className="card flex justify-content-center">
            <ProgressSpinner strokeWidth="2" className="text-blue-500" />
          </div>
        ) : (
          // <DataTable
          //   id="previousdaydetailstable"
          //   name="previousdaydetailstable"
          //   rows={previousDayRows}
          //   col={previousDayColumn}
          // />
          <PreviousDaysTableSms
            id="previousdaydetailstable"
            name="previousdaydetailstable"
            rows={previousDayRows}
            col={previousDayColumn}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        )} */}
        <PreviousDaysTableSms
          id="previousdaydetailstable"
          name="previousdaydetailstable"
          rows={previousDayRows}
          col={previousDayColumn}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      </Dialog>

      {/* exportDialogStart */}
      {isExportDialogOpen && (
        <ExportDialog
          visibledialog={isExportDialogOpen}
          setVisibledialog={setIsExportDialogOpen}
          allCampaigns={allCampaigns}
          setDataToExport={setDataToExport}
          dataToExport={dataToExport}
        />
      )}
    </div>
  );
};

export default SmsReports;
