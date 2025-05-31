import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { HiOutlineChat } from "react-icons/hi";
import toast from "react-hot-toast";

import AnimatedDropdown from "../components/AnimatedDropdown";
import UniversalDatePicker from "../components/UniversalDatePicker";
import InputField from "../components/InputField";
import WhatsappConversationTable from "./components/WhatsappConversationTable";
import UniversalButton from "../components/UniversalButton";
import UniversalSkeleton from "../components/UniversalSkeleton";
import Loader from "../components/Loader";

import { exportToExcel } from "@/utils/utills.js";

import {
  getConversationReport,
  getWabaList,
} from "../../apis/whatsapp/whatsapp.js";

import moment from "moment";

const WhatsappConversation = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wabaList, setWabaList] = useState([]);
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    wabaSrno: 1,
    fromDate: new Date(),
    toDate: new Date(),
    mobileNo: "",
    page: 0,
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [isMobileSearched, setIsMobileSearched] = useState(false);

  // Fetch WABA List
  useEffect(() => {
    const fetchWabaList = async () => {
      setIsLoading(true);
      try {
        const response = await getWabaList();
        if (response) {
          setWabaList(response);
        } else {
          toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        toast.error("Error fetching WABA list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWabaList();
  }, []);

  // Format Date
  const formatDate = (date) => moment(date).format("YYYY-MM-DD");

  // Handle Search Click
  const handleSearch = async () => {
    if (!filters.wabaSrno) return toast.error("Please select WABA");

    const isNewSearch = filters.mobileNo && !isMobileSearched;
    const page = isNewSearch ? 0 : currentPage;

    if (isNewSearch) {
      setIsMobileSearched(true);
    }

    try {
      setIsFetching(true);

      const formattedData = {
        ...filters,
        fromDate: formatDate(filters?.fromDate),
        toDate: formatDate(filters?.toDate),
        mobileNo: filters?.mobileNo || "",
        page,
      };

      const res = await getConversationReport(formattedData);
      setData(res);
      setTotalPage(res?.total || 0);
    } catch (e) {
      toast.error("Error fetching WhatsApp Conversation");
    } finally {
      setIsFetching(false);
    }
  };

  const handleExport = async () => {
    // Check if data exists and has length
    if (!data?.data || !Array.isArray(data.data) || data.data.length === 0) {
      return toast.error("No data to download");
    }

    // Define columns for export
    const col = [
      "S.No",
      "Contact Name",
      "Mobile Number",
      "Reply Type",
      "Message",
      "WabaNumber",
      "Time",
    ];

    // Map rows for export
    const row = data.data.map((rowData, index) => [
      index + 1, // Serial number
      rowData.contectName || "N/A", // Contact Name
      rowData.mobileNo || "N/A", // Mobile Number
      rowData.replyType || "N/A", // Reply Type
      rowData.messageBody || "N/A", // Message
      rowData.wabaNumber || "N/A", // WabaNumber
      moment(rowData.replyTime).format("DD-MM-YYYY HH:mm:ss") || "N/A", // Time
    ]);

    const name = `conversationReport`;
    exportToExcel(col, row, name);
    toast.success("File Downloaded Successfully");
  };

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  return (
    <div className="w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center gap-1">
            <HiOutlineChat className="text-2xl text-green-600" />
            <h1 className="mb-5 text-xl font-semibold text-green-600">
              Whatsapp Conversation
            </h1>
          </div>

          <div className="flex flex-wrap items-end w-full gap-2 mb-5">
            {/* Select WABA Dropdown */}
            <div className="w-full sm:w-56">
              <AnimatedDropdown
                id="wabadropdown"
                label="Select WABA"
                placeholder="Select WABA"
                options={wabaList.map((waba) => ({
                  value: waba.wabaSrno,
                  label: waba.name,
                }))}
                value={filters.wabaSrno}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, wabaSrno: value }))
                }
              />
            </div>
            <div className="w-full sm:w-56">
              {/* From Date Picker */}
              <UniversalDatePicker
                id="conversationfrom"
                label="From Date"
                value={filters.fromDate}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, fromDate: value }))
                }
              />
            </div>
            <div className="w-full sm:w-56">
              {/* To Date Picker */}
              <UniversalDatePicker
                id="conversationto"
                label="To Date"
                value={filters.toDate}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, toDate: value }))
                }
              />
            </div>
            <div className="w-full sm:w-56">
              {/* Mobile Number Input Field */}
              <InputField
                id="conversationmobile"
                label="Mobile Number"
                type="number"
                placeholder="Enter Mobile Number"
                value={filters.mobileNo}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, mobileNo: e.target.value }))
                }
              />
            </div>
            {/* Search Button */}
            <div className="w-max-content ">
              <UniversalButton
                id="conversationsearch"
                label={isFetching ? "Searching..." : "Search"}
                icon={<IoSearch />}
                onClick={handleSearch}
                disabled={isFetching}
              />
            </div>
            {/* Export Button */}
            <div className="w-max-content">
              <UniversalButton
                id="conversationexport"
                label="Export"
                onClick={handleExport}
              />
            </div>
          </div>

          {/* Show Loader or Table */}
          {isFetching ? (
            <UniversalSkeleton height="35rem" width="100%" />
          ) : (
            <WhatsappConversationTable
              data={data}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WhatsappConversation;
