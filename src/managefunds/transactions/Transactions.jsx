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
import {
  dailyWalletUsage,
  fetchTransactions,
} from "../../apis/settings/setting";
import moment from "moment";
import { exportToExcel } from "@/utils/utills";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";

import toast from "react-hot-toast";
import { useUser } from "@/context/auth";

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
  const { user } = useUser();
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
      };
      const res = await fetchTransactions(data);
      setTransactionalData(res);
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setIsFetching(false);
    }
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 10 },
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
    ? transactionalData

        .map((item, index) => ({
          ...item,
          sn: index + 1,
          id: index + 1,
          balance: Number(item.balance).toFixed(2),
        }))
        .reverse()
    : [];

  console.log("rows", rows);

  const type = [
    { value: "Credit", label: "Credit" },
    { value: "Debit", label: "Debit" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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

  function handleExportWalletUsage() {
    // columns
    if (!walletusagerows.length) return toast.error("No data to download");
    const col = walletusagecolumns.map((col) => col.field);

    const row = walletusagerows.map((row) =>
      col.map((field) => row[field] ?? "")
    );

    const name = "wallet_usage_data";
    exportToExcel(col, row, name);
    toast.success("File Downloaded Successfully");
  }

  const [filterDataWalletUsage, setFilterDataWalletUsage] = useState({
    // rechargeType: 0,
    endDate: new Date(),
    startDate: new Date(),
  });

  const [walletUsageData, setWalletUsageData] = useState([]);
  const walletusagecolumns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 100 },
    { field: "recordDate", headerName: "Date", width: 300 },
    { field: "walletUsage", headerName: "Wallet Usage (₹)", width: 300 },
  ];

  const dailyAmountUsage = async () => {
    if (user.role === "AGENT") return;
    const payload = {
      fromDate: moment(filterDataWalletUsage.startDate).format("YYYY-MM-DD"),
      toDate: moment(filterDataWalletUsage.endDate).format("YYYY-MM-DD"),
    };

    setIsLoading(true);
    try {
      const response = await dailyWalletUsage(payload);
      setWalletUsageData(response.data || []);
    } catch (error) {
      console.error("Error daily wallet usage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const walletusagerows = Array.isArray(walletUsageData)
    ? walletUsageData.map((item, index) => ({
        ...item,
        sn: index + 1,
        id: index + 1,
        recordDate: item.recordDate,
        walletUsage: item.walletUsage,
      }))
    : [];

  // useEffect(() => {
  //   dailyAmountUsage();
  // }, [filterDataWalletUsage.startDate, filterDataWalletUsage.endDate]);

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
            <Tab
              label={
                <span className="flex items-center gap-2">
                  <BsJournalArrowDown size={18} /> wallet Usage
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
          </Tabs>
        </div>
        <CustomTabPanel value={value} index={0} className="">
          <div className="w-full">
            <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex-wrap">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  id="transactionshistoryfrom"
                  name="transactionshistoryfrom"
                  label="From Date"
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
                  label="To Date"
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
              <div className="w-max-content">
                <UniversalButton
                  id="manageCampaignExportBtn"
                  name="manageCampaignExportBtn"
                  label="Export"
                  icon={
                    <IosShareOutlinedIcon
                      fontSize="small"
                      sx={{ marginBottom: "3px" }}
                    />
                  }
                  variant="primary"
                  onClick={handleExport}
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
        <CustomTabPanel value={value} index={1}>
          <div className="w-full">
            <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex--wrap">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  id="walletUsage"
                  name="walletUsage"
                  label="From Date"
                  defaultValue={new Date()}
                  // value={startsDate}
                  // onChange={(e) => setStartsDate(e.target.value)}
                  placeholder="Pick a start date"
                  value={setFilterDataWalletUsage.startDate}
                  onChange={(newValue) => {
                    setFilterDataWalletUsage({
                      ...filterDataWalletUsage,
                      startDate: newValue,
                    });
                  }}
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  id="walletUsage"
                  name="walletUsage"
                  label="To"
                  placeholder="Pick a start date"
                  defaultValue={new Date()}
                  // value={endsDate}
                  // onChange={(e) => setEndsDate(e.target.value)}
                  value={setFilterDataWalletUsage.endDate}
                  onChange={(newValue) => {
                    setFilterDataWalletUsage({
                      ...filterDataWalletUsage,
                      endDate: newValue,
                    });
                  }}
                />
              </div>
              <div className="w-max-content">
                <UniversalButton
                  id="walletUsage"
                  name="walletUsage"
                  label={isFetching ? "Searching..." : "Search"}
                  icon={<IoSearch />}
                  onClick={dailyAmountUsage}
                  variant="primary"
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
                      fontSize="small"
                      sx={{ marginBottom: "3px" }}
                    />
                  }
                  variant="primary"
                  onClick={handleExportWalletUsage}
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
                  id="walletusage"
                  name="walletusage"
                  col={walletusagecolumns}
                  rows={walletusagerows}
                />
              </div>
            )}
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Transactions;
