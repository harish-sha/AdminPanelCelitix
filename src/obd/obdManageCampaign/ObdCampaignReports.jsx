import React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import { CustomTabPanel } from "../../whatsapp/managetemplate/components/CustomTabPanel.jsx";
import { IoSearch } from "react-icons/io5";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Loader from "../../whatsapp/components/Loader.jsx";
import InputField from "../../whatsapp/components/InputField.jsx";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown.jsx";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker.jsx";
import ObdCampaignTable from "./ObdCampaignTable.jsx";
import UniversalLabel from "../../whatsapp/components/UniversalLabel.jsx";
import UniversalButton from "../../whatsapp/components/UniversalButton.jsx";
import ObdDaySummaryTable from "./ObdDaySummaryTable.jsx";
import { RadioButton } from "primereact/radiobutton";
import { DataTable } from "@/components/layout/DataTable.jsx";
import { IconButton } from "@mui/material";
import { fetchDayWiseSummaryObd, fetchSummaryLogsObd, fetchDetailsLogsObd } from "@/apis/obd/obd.js";
import toast from "react-hot-toast";

const ObdCampaignReports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [obdCampaignName, setObdCampaignName] = useState("");
  const [obdCampaignNumber, setObdCampaignNumber] = useState("");
  const [obdCampaignType, setObdCampaignType] = useState(null);
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

  const [isFetching, setIsFetching] = useState(false);

  const formatDateToDDMMYYYY = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [campaignLogDateFilter, setCampaignLogDateFilter] = useState({
    voiceType: "",
    fromDate: new Date(),
    toDate: new Date(),
    page: ""
  })


  const [daywiseDataToFilter, setDaywiseDataToFilter] = useState({
    fromDate: new Date(),
    toDate: new Date(),
  });

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);

  const handleCampaignLog = async () => {
    const data = {
      voiceType: campaignLogDateFilter.voiceType || "",
      queTimeStart: formatDateToDDMMYYYY(campaignLogDateFilter.fromDate),
      queTimeEnd: formatDateToDDMMYYYY(campaignLogDateFilter.toDate),
      page: campaignLogDateFilter.page,
    };

    try {
      setIsFetching(true);
      const res = await fetchDetailsLogsObd(data);

      setColumns([
        { field: "sn", headerName: "S.No", flex: 0.5, minWidth: 70 },
        { field: "summaryDate", headerName: "Date", flex: 1, minWidth: 120 },
        { field: "totalUnit", headerName: "Total Unit", flex: 1, minWidth: 100 },
        { field: "unDeliv", headerName: "Pending", flex: 1, minWidth: 100 },
        { field: "failed", headerName: "Failed", flex: 1, minWidth: 100 },
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
    } catch (err) {
      toast.error("Something went wrong while fetching data.")
    } finally {
      setIsFetching(false);
    }
  }

  const handleDayWiseSummary = async () => {
    const data = {
      queTimeStart: formatDateToDDMMYYYY(daywiseDataToFilter.fromDate),
      queTimeEnd: formatDateToDDMMYYYY(daywiseDataToFilter.toDate),
    };

    try {
      setIsFetching(true);
      const res = await fetchDayWiseSummaryObd(data);

      setColumns([
        { field: "sn", headerName: "S.No", flex: 0.5, minWidth: 70 },
        { field: "summaryDate", headerName: "Date", flex: 1, minWidth: 120 },
        { field: "totalUnit", headerName: "Total Unit", flex: 1, minWidth: 100 },
        { field: "unDeliv", headerName: "Pending", flex: 1, minWidth: 100 },
        { field: "failed", headerName: "Failed", flex: 1, minWidth: 100 },
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
    } catch (error) {
      toast.error("Something went wrong while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };


  const voiceType = [
    { label: "Transactional", value: "1" },
    { label: "Promotional", value: "2" },
  ];

  // ✅ Date formatting helper
  const formatDateToDDMMYYYY2 = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [summaryDataToFilter, setSummaryDataToFilter] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    voiceType: "",
  });

  const [summarycolumns, setSummaryColumns] = useState([]);
  const [summaryrows, setSummaryRows] = useState([]);



  const handleSummaryLogs = async () => {
    const data = {
      queTimeStart: formatDateToDDMMYYYY2(summaryDataToFilter.fromDate),
      queTimeEnd: formatDateToDDMMYYYY2(summaryDataToFilter.toDate),
      voiceType: summaryDataToFilter.voiceType || "",
    };

    try {
      setIsFetching(true);
      const res = await fetchSummaryLogsObd(data);

      setSummaryColumns([
        { field: "sn", headerName: "S.No", flex: 0.5, minWidth: 70 },
        { field: "date", headerName: "Date", flex: 1, minWidth: 120 },
        { field: "totalUnit", headerName: "Total Unit", flex: 1, minWidth: 100 },
        { field: "blocked", headerName: "Blocked", flex: 1, minWidth: 120 },
        { field: "sent", headerName: "Sent", flex: 1, minWidth: 100 },
        { field: "failed", headerName: "Failed", flex: 1, minWidth: 100 },
      ]);

      setSummaryRows(
        Array.isArray(res)
          ? res.map((item, i) => ({
            id: i + 1,
            sn: i + 1,
            ...item,
          }))
          : []
      );
    } catch (error) {
      toast.error("Something went wrong while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };

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

  const handleChangeOption = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const handleChangeOptionEnable = (event) => {
    const value = event.target.value;
    setCustomOptions(value);
  };

  const handleCustomDialogNumber = (e) => {
    setCustomdialognumber(e.target.value);
  };

  const handlecampaignDialogSubmithBtn = () => { };

  const handleCustomDialogSubmithBtn = () => { };


  const obdCampColumns = [
    { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
    { field: 'campaignName', headerName: 'Campaign Name', flex: 1, minWidth: 120 },
    { field: 'type', headerName: 'Type', flex: 1, minWidth: 120 },
    { field: 'template', headerName: 'Template', flex: 1, minWidth: 120 },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 120 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <IconButton className='text-xs' onClick={() => handleView(params.row)}>
            <VisibilityIcon
              sx={{
                fontSize: '1.2rem',
                color: 'green'
              }}
            />
          </IconButton>
          <IconButton onClick={() => handleDuplicate(params.row)}>
            <FileCopyIcon
              sx={{
                fontSize: '1.2rem',
                color: 'gray',
              }} />
          </IconButton>
          <IconButton onClick={(event) => handleDelete(event, params.row)}>
            <DeleteForeverIcon
              sx={{
                fontSize: '1.2rem',
                color: '#e31a1a',
              }} />
          </IconButton>
        </>
      ),
    },
  ];


  const obdCampRows = [
    {
      id: 1,
      sn: 1,
      campaignName: 'diwali',
      type: 'Transactional',
      template: 'Simple Broadcast',
      date: '12/10/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 2,
      sn: 2,
      campaignName: 'holi',
      type: 'Promotional',
      template: 'Text-2-Speech',
      date: '13/10/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 3,
      sn: 3,
      campaignName: 'christmas',
      type: 'Transactional',
      template: 'Simple Broadcast',
      date: '15/10/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 4,
      sn: 4,
      campaignName: 'easter',
      type: 'Promotional',
      template: 'Multi Broadcast',
      date: '13/10/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 5,
      sn: 5,
      campaignName: 'new year',
      type: 'Transactional',
      template: 'Simple Broadcast',
      date: '01/01/2025',
      status: 'Success',
      action: 'True',
    },
    {
      id: 6,
      sn: 6,
      campaignName: 'thanksgiving',
      type: 'Promotional',
      template: 'Text-2-Speech',
      date: '25/11/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 7,
      sn: 7,
      campaignName: 'eid',
      type: 'Transactional',
      template: 'Multi Broadcast',
      date: '10/04/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 8,
      sn: 8,
      campaignName: 'halloween',
      type: 'Promotional',
      template: 'Simple Broadcast',
      date: '31/10/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 9,
      sn: 9,
      campaignName: 'rakhi',
      type: 'Transactional',
      template: 'Multi Broadcast',
      date: '19/08/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 10,
      sn: 10,
      campaignName: 'pongal',
      type: 'Promotional',
      template: 'Text-2-Speech',
      date: '14/01/2025',
      status: 'Success',
      action: 'True',
    },
    {
      id: 11,
      sn: 11,
      campaignName: 'lohri',
      type: 'Transactional',
      template: 'Simple Broadcast',
      date: '13/01/2025',
      status: 'Success',
      action: 'True',
    },
    {
      id: 12,
      sn: 12,
      campaignName: 'navratri',
      type: 'Promotional',
      template: 'Multi Broadcast',
      date: '03/10/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 13,
      sn: 13,
      campaignName: 'guru purab',
      type: 'Transactional',
      template: 'Text-2-Speech',
      date: '08/11/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 14,
      sn: 14,
      campaignName: 'valentine’s day',
      type: 'Promotional',
      template: 'Simple Broadcast',
      date: '14/02/2025',
      status: 'Success',
      action: 'True',
    },
    {
      id: 15,
      sn: 15,
      campaignName: 'independence day',
      type: 'Transactional',
      template: 'Multi Broadcast',
      date: '15/08/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 16,
      sn: 16,
      campaignName: 'republic day',
      type: 'Promotional',
      template: 'Text-2-Speech',
      date: '26/01/2025',
      status: 'Success',
      action: 'True',
    },
    {
      id: 17,
      sn: 17,
      campaignName: 'ganesh chaturthi',
      type: 'Transactional',
      template: 'Simple Broadcast',
      date: '07/09/2024',
      status: 'Success',
      action: 'True',
    },
    {
      id: 18,
      sn: 18,
      campaignName: 'baisakhi',
      type: 'Promotional',
      template: 'Multi Broadcast',
      date: '14/04/2024',
      status: 'Success',
      action: 'True',
    }
  ];

  // const ObdSummaryRows = [
  //   {
  //     sn: 1,
  //     id: 1,
  //     date: "20/03/2025",
  //     totalunits: "3",
  //     blocked: "0",
  //     totalsent: "1",
  //     success: "1",
  //     failed: "1"
  //   },
  //   {
  //     sn: 2,
  //     id: 2,
  //     date: "21/03/2025",
  //     totalunits: "5",
  //     blocked: "2",
  //     totalsent: "3",
  //     success: "2",
  //     failed: "3"
  //   },
  //   {
  //     sn: 3,
  //     id: 3,
  //     date: "22/03/2025",
  //     totalunits: "6",
  //     blocked: "1",
  //     totalsent: "5",
  //     success: "4",
  //     failed: "2"
  //   },
  //   {
  //     sn: 4,
  //     id: 4,
  //     date: "23/03/2025",
  //     totalunits: "7",
  //     blocked: "2",
  //     totalsent: "5",
  //     success: "3",
  //     failed: "4"
  //   },
  //   {
  //     sn: 5,
  //     id: 5,
  //     date: "24/03/2025",
  //     totalunits: "4",
  //     blocked: "0",
  //     totalsent: "4",
  //     success: "3",
  //     failed: "1"
  //   },
  //   {
  //     sn: 6,
  //     id: 6,
  //     date: "25/03/2025",
  //     totalunits: "8",
  //     blocked: "3",
  //     totalsent: "5",
  //     success: "4",
  //     failed: "4"
  //   },
  //   {
  //     sn: 7,
  //     id: 7,
  //     date: "26/03/2025",
  //     totalunits: "6",
  //     blocked: "2",
  //     totalsent: "4",
  //     success: "2",
  //     failed: "4"
  //   },
  //   {
  //     sn: 8,
  //     id: 8,
  //     date: "27/03/2025",
  //     totalunits: "9",
  //     blocked: "1",
  //     totalsent: "8",
  //     success: "7",
  //     failed: "2"
  //   },
  //   {
  //     sn: 9,
  //     id: 9,
  //     date: "28/03/2025",
  //     totalunits: "10",
  //     blocked: "3",
  //     totalsent: "7",
  //     success: "5",
  //     failed: "5"
  //   },
  //   {
  //     sn: 10,
  //     id: 10,
  //     date: "29/03/2025",
  //     totalunits: "5",
  //     blocked: "1",
  //     totalsent: "4",
  //     success: "3",
  //     failed: "2"
  //   },
  //   {
  //     sn: 11,
  //     id: 11,
  //     date: "30/03/2025",
  //     totalunits: "7",
  //     blocked: "2",
  //     totalsent: "5",
  //     success: "4",
  //     failed: "3"
  //   },
  //   {
  //     sn: 12,
  //     id: 12,
  //     date: "31/03/2025",
  //     totalunits: "6",
  //     blocked: "1",
  //     totalsent: "5",
  //     success: "4",
  //     failed: "2"
  //   },
  //   {
  //     sn: 13,
  //     id: 13,
  //     date: "01/04/2025",
  //     totalunits: "8",
  //     blocked: "2",
  //     totalsent: "6",
  //     success: "5",
  //     failed: "3"
  //   },
  //   {
  //     sn: 14,
  //     id: 14,
  //     date: "02/04/2025",
  //     totalunits: "9",
  //     blocked: "3",
  //     totalsent: "6",
  //     success: "5",
  //     failed: "4"
  //   },
  //   {
  //     sn: 15,
  //     id: 15,
  //     date: "03/04/2025",
  //     totalunits: "7",
  //     blocked: "2",
  //     totalsent: "5",
  //     success: "3",
  //     failed: "4"
  //   }
  // ];

  // const ObdSummaryColumns = [
  //   { field: 'sn', headerName: 'S.No', flex: 1 },
  //   { field: 'date', headerName: 'Date', flex: 1 },
  //   { field: 'totalunits', headerName: 'Total Units', flex: 1 },
  //   { field: 'totalsent', headerName: 'Total Sent', flex: 1 },
  //   { field: 'success', headerName: 'Success', flex: 1 },
  //   { field: 'failed', headerName: 'Failed', flex: 1 }
  // ]

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
                      <PollOutlinedIcon size={20} />Summary Logs
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

            <CustomTabPanel value={value} index={0}>
              <div className="w-full">
                <div className="flex flex-col md:flex-row lg:flex-row flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full">
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

                  <div className="w-full sm:w-56">
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
                  </div>

                  <div className="w-full sm:w-56">
                    <AnimatedDropdown
                      id="obdCampaignType"
                      name="obdCampaignType"
                      label="Campaign Type"
                      tooltipContent="Enter Your Campaign Type"
                      options={[
                        { value: "Promotional", label: "Promotional" },
                        { value: "Transactional", label: "Transactional" },
                      ]}
                      value={obdCampaignType}
                      onChange={setObdCampaignType}
                      placeholder="Type"
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      id="obdcampaigndate"
                      name="obdcampaigndate"
                      label="Date"
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <UniversalButton
                      id="obdTemplateSearchBtn"
                      name="obdSearchBtn"
                      label="Search"
                      onClick={handleCampaignLog}
                      icon={<IoSearch />}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  {/* <ObdCampaignTable /> */}
                  <DataTable
                    id="whatsapp-rate-table"
                    name="whatsappRateTable"
                    col={obdCampColumns}
                    rows={obdCampRows}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                  />
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className="w-full">
                {/* Filter Section */}
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
                      label="Search"
                      icon={<IoSearch />}
                      onClick={handleDayWiseSummary}
                      disabled={isFetching}
                    />
                  </div>
                </div>

                {/* Table Section */}
                <DataTable
                  id="obd-daywise-table"
                  name="obdDayWiseTable"
                  col={columns}
                  rows={rows}
                  loading={isFetching}
                />
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div className="w-full p-4">
                {/* Filters */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4 items-end pb-5">
                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      label="From Date"
                      value={summaryDataToFilter.fromDate}
                      onChange={(e) =>
                        setSummaryDataToFilter((prev) => ({ ...prev, fromDate: e }))
                      }
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      label="To Date"
                      value={summaryDataToFilter.toDate}
                      onChange={(e) =>
                        setSummaryDataToFilter((prev) => ({ ...prev, toDate: e }))
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
                      label="Search"
                      icon={<IoSearch />}
                      onClick={handleSummaryLogs}
                      disabled={isFetching}
                    />
                  </div>
                </div>

                {/* Table */}
                <DataTable
                  id="obd-summary-table"
                  name="obdSummaryTable"
                  col={summarycolumns}
                  rows={summaryrows}
                  loading={isFetching}
                />
              </div>
            </CustomTabPanel>
          </Box>
        )}
      </div>

      <Dialog
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
                options={[
                  { value: "Campaignl", label: "Camapaign1" },
                  { value: "Campaign2", label: "Campaign2" },
                  { value: "Campaign3", label: "Campaign3" },
                ]}
                onChange={setCampaign}
                value={campaign}
                placeholder="Search Campaign"
              />
            </div>
            <div className="flex items-center lg:gap-x-20 gap-x-10  my-6">
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
                {/* Option 2 */}
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
                  {/* Option 2 */}
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
      </Dialog>
    </>
  );
};

export default ObdCampaignReports;
