import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { IoSearch } from "react-icons/io5";
import { BsJournalArrowDown } from "react-icons/bs";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker";
import InputField from "../../components/layout/InputField";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import TransactionsHistoryTable from "./components/TransactionsHistoryTable";
import TransactionsSummaryTable from "./components/TransactionsSummaryTable";
import { MultiSelect } from "primereact/multiselect";
import CustomTooltip from "../../components/common/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import { DataTable } from "../../components/layout/DataTable";
import { fetchTransactions } from "../../apis/settings/setting";
import moment from "moment";
import { exportToExcel } from "@/utils/utills";

import toast from "react-hot-toast";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Transactions = () => {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMultiHistory, setSelectedMultiHistory] = useState(null);
  const [selectedMultiSummary, setSelectedMultiSummary] = useState(null);
  const [selectedHistoryFrom, setSelectedHistoryFrom] = useState(null);
  const [selectedHistoryTo, setSelectedHistoryTo] = useState(new Date());
  const [selectedFromSummary, setselectedFromSummary] = useState(new Date());
  const [selectedToSummary, setselectedToSummary] = useState(new Date());
  const [selectedHistoryService, setSelectedHistoryService] = useState("");
  const [selectedHistoryType, setSelectedHistoryType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputValueMobileLogs, setInputValueMobileLogs] = useState("");
  const [selectedOptionServiceSummary, setSelectedOptionServiceSummary] =
    useState("");
  const [selectedOptionTypeSummary, setSelectedOptionTypeSummary] =
    useState("");

  const [filterData, setFilterData] = useState({
    rechargeType: 0,
    toDate: new Date(),
    startDate: new Date(),
  });
  const [transactionalData, setTransactionalData] = useState([]);

  const handleSearch = async () => {
    try {
      setIsFetching(true);
      const data = {
        ...filterData,
        startDate: moment(filterData.startDate).format("YYYY-MM-DD"),
        toDate: moment(filterData.toDate).format("YYYY-MM-DD"),
      }
      const res = await fetchTransactions(data);
      setTransactionalData(res);
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setIsFetching(false);
    }
  };


  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, width: 70 },
    { field: "user", headerName: "UserName", flex: 1, minWidth: 120 },
    {
      field: "rechargeDate",
      headerName: "Recharge Date",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "before",
      headerName: "Amount Before Recharge",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "amount",
      headerName: "Amount Recharged",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "after",
      headerName: "Amount After Recharge",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "type",
      headerName: "Recharge Type",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "gst",
      headerName: "Gst Amount",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "balance",
      headerName: "Total Amount",
      flex: 1,
      minWidth: 120,
    },
    { field: "remark", headerName: "Remarks", flex: 1, minWidth: 120 },
  ];

  const rows = Array.isArray(transactionalData)
    ? transactionalData.map((item, index) => ({
      ...item,
      sn: index + 1,
      id: index + 1,
      balance: Number(item.balance).toFixed(2),
    }))
    : [];

  const multiHistory = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const multiSummary = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
  ];

  const options2 = [
    { value: "obd", label: "OBD" },
    { value: "ibd", label: "IBD" },
    { value: "c2c", label: "C2C" },
  ];

  const options3 = [
    { value: "Credit", label: "Credit" },
    { value: "Debit", label: "Debit" },
  ];

  const service = [
    { value: "obd", label: "OBD" },
    { value: "ibd", label: "IBD" },
    { value: "c2c", label: "C2C" },
  ];
  const type = [
    { value: "Credit", label: "Credit" },
    { value: "Debit", label: "Debit" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChangeMobileLogs = (e) => {
    setInputValueMobileLogs(e.target.value);
  };

  const handleShowSearch = async () => {
    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsFetching(false);
    setFilteredData([]); // Reset data
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchHistory = async () => {
    // console.log("Search Filters:");
    // console.log({
    //   user: selectedMultiHistory,
    //   dateFrom: selectedHistoryFrom,
    //   dateTo: selectedHistoryTo,
    //   service: selectedHistoryService,
    //   type: selectedHistoryType,
    // });
    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsFetching(false);
    setFilteredData([]);
  };

  const handleSearchSummary = async () => {
    // console.log("Search Filters:");
    // console.log({
    //   user: selectedMultiSummary,
    //   dateFrom: selectedFromSummary,
    //   dateTo: selectedToSummary,
    //   service: selectedOptionServiceSummary,
    //   type: selectedOptionTypeSummary,
    // });
    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate data fetch
    setIsFetching(false);
    setFilteredData([]); // Replace this with actual API data
  };

  function handleExport() {
    // columns
    if (!rows.length) return toast.error("No data to download");
    const col = columns.map((col) => col.field);

    const row = rows.map((row) => col.map((field) => row[field] ?? ""));

    const name = "Transaction Data";
    exportToExcel(col, row, name);
    toast.success("File Downloaded Successfully");
  }

  // function handleExport() {
  //   // columns
  //   if (!rows.length) return toast.error("No data to download");
  //   const col = columns.map((col) => col.field);

  //   const row = rows.map((row) => col.map((field) => row[field] ?? ""));

  //   const name = "Transaction Data";
  //   exportToExcel(col, row, name);
  //   toast.success("File Downloaded Successfully");
  // }

  return (
    <div className="w-full ">
      <Box sx={{ width: "100%" }}>
        <div className="flex items-center justify-between px-3">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Manage Transactions Tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label={
                <span className="flex items-center gap-2">
                  <AccountBalanceWalletOutlinedIcon fontSize="small" />{" "}
                  Transaction History
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
          </Tabs>
          <div className="w-max-content">
            <UniversalButton
              id="manageCampaignExportBtn"
              name="manageCampaignExportBtn"
              label="Export"
              // icon={<IosShareOutlinedIcon fontSize='small' sx={{ marginBottom: '3px' }} />}
              variant="primary"
              onClick={handleExport}
            // onClick={handleExport}
            />
          </div>
        </div>
        <CustomTabPanel value={value} index={0} className="">
          <div className="w-full">
            <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex-wrap">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  id="transactionshistoryfrom"
                  name="transactionshistoryfrom"
                  label="From"
                  defaultValue={new Date()}
                  // placeholder="Pick a start date"
                  tooltipContent="Select the starting date for your project"
                  tooltipPlacement="right"
                  errorText="Please select a valid date"
                  value={setFilterData.startDate}
                  onChange={(newValue) => {
                    setFilterData({
                      ...filterData,
                      startDate: newValue,
                    });
                  }}
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  id="transactionshistoryto"
                  name="transactionshistoryto"
                  label="To"
                  // placeholder="Pick a start date"
                  tooltipContent="Select the starting date for your project"
                  tooltipPlacement="right"
                  errorText="Please select a valid date"
                  value={setFilterData.toDate}
                  defaultValue={new Date()}
                  onChange={(newValue) => {
                    setFilterData({
                      ...filterData,
                      toDate: newValue,
                    });
                  }}
                />
              </div>
              <div className="w-full sm:w-56">
                <AnimatedDropdown
                  id="transactionshistorytype"
                  name="transactionshistorytype"
                  label="Type"
                  tooltipContent="Select type"
                  tooltipPlacement="right"
                  options={[
                    { value: 0, label: "All" },
                    { value: 1, label: "Recharge" },
                    { value: 3, label: "Credit" },
                    { value: 4, label: "Debit" },
                  ]}
                  placeholder="Type"
                  value={filterData.rechargeType}
                  onChange={(value) => {
                    setFilterData({
                      ...filterData,
                      rechargeType: value,
                    });
                  }}
                />
              </div>

              <div className="w-max-content ">
                <UniversalButton
                  id="manageCampaignSearchBtn"
                  name="manageCampaignSearchBtn"
                  label={isFetching ? "Searching..." : "Search"}
                  icon={<IoSearch />}
                  onClick={handleSearch}
                  variant="primary"
                  disabled={isFetching}
                />
              </div>
            </div>
            {isFetching ? (
              <div className="">
                <UniversalSkeleton height="35rem" width="100%" />
              </div>
            ) : (
              <div className="w-full">
                <DataTable
                  id="transactionshistorytable"
                  name="transactionshistorytable"
                  col={columns}
                  rows={rows}
                />
              </div>
            )}
          </div>
        </CustomTabPanel>
        {/* <CustomTabPanel value={value} index={1}>
                    <div className='w-full' >
                        <div className='flex items-end justify-start w-full gap-4 pb-5 align-middle flex--wrap' >
                            <div className="w-full sm:w-56">
                                <div className="flex items-center gap-2 mb-2">
                                    <label className="text-sm font-medium text-gray-700">User</label>

                                    <CustomTooltip
                                        title="Select User"
                                        placement="right"
                                        arrow
                                    >
                                        <span>
                                            <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                                        </span>
                                    </CustomTooltip>
                                </div>
                                <MultiSelect
                                    className="custom-multiselect"
                                    placeholder="Select Groups"
                                    maxSelectedLabels={0}
                                    optionLabel="name"
                                    options={multiSummary}
                                    value={selectedMultiSummary}
                                    onChange={(e) => setSelectedMultiSummary(e.value)}
                                    filter

                                />
                            </div>
                            <div className="w-full sm:w-56">
                                <UniversalDatePicker
                                    id="transactionssummaryfrom"
                                    name="transactionssummaryfrom"
                                    label="From"
                                    value={selectedFromSummary}
                                    onChange={(newValue) => setselectedFromSummary(newValue)}
                                    placeholder="Pick a start date"
                                    tooltipContent="Select the starting date for your project"
                                    tooltipPlacement="right"
                                    error={!selectedFromSummary}
                                    errorText="Please select a valid date"
                                />
                            </div>
                            <div className="w-full sm:w-56">
                                <UniversalDatePicker
                                    id="transactionssummarytoday"
                                    name="transactionssummarytoday"
                                    label="To"
                                    value={selectedToSummary}
                                    onChange={(newValue) => setselectedToSummary(newValue)}
                                    placeholder="Pick a start date"
                                    tooltipContent="Select the starting date for your project"
                                    tooltipPlacement="right"
                                    error={!selectedToSummary}
                                    errorText="Please select a valid date"
                                />
                            </div>

                            <div className="w-full sm:w-56" >
                                <AnimatedDropdown
                                    id='transactionssummarySource'
                                    name='transactionssummarySource'
                                    label="Service"
                                    tooltipContent="Select Service"
                                    tooltipPlacement="right"
                                    options={service}
                                    value={selectedOptionServiceSummary}
                                    onChange={(value) => setSelectedOptionServiceSummary(value)}
                                    placeholder="Service"
                                />
                            </div>
                            <div className="w-full sm:w-56" >
                                <AnimatedDropdown
                                    id='transactionssummarytype'
                                    name='transactionssummarytype'
                                    label="Type"
                                    tooltipContent="Select Type"
                                    tooltipPlacement="right"
                                    options={type}
                                    value={selectedOptionTypeSummary}
                                    onChange={(value) => setSelectedOptionTypeSummary(value)}
                                    placeholder="Type"
                                />
                            </div>

                            <div className="w-max-content ">
                                <UniversalButton
                                    id='manageCampaignLogsShowhBtn'
                                    name='manageCampaignLogsShowhBtn'
                                    label={isFetching ? "Searching..." : "Search"}
                                    icon={<IoSearch />}
                                    onClick={handleSearchSummary}
                                    variant="primary"
                                    disabled={isFetching}
                                />
                            </div>
                        </div>

                        {isFetching ? (
                            <div className='' >
                                <UniversalSkeleton height='35rem' width='100%' />
                            </div>
                        ) : (
                            <div className='w-full'>
                                <TransactionsSummaryTable
                                    id='transactionssummarytable'
                                    name='transactionssummarytable'
                                />
                            </div>
                        )}
                    </div>
                </CustomTabPanel> */}
      </Box>
    </div>
  );
};

export default Transactions;
