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

import {
  getConversationReport,
  getWabaList,
} from "../../apis/whatsapp/whatsapp.js";

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
  const formatDate = (date) => date.toISOString().split("T")[0];

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

          <div className="flex flex-wrap items-end gap-4 mb-5">
            {/* Select WABA Dropdown */}
            <div className="flex w-56">
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
            <div className="flex w-56">

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
               <div className="flex w-56">
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
             <div className="flex w-56">
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
             <div className="flex">
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
             </div>
             <div className="flex">
            {/* Export Button */}
            <div className="w-max-content ">
            <UniversalButton
              id="conversationexport"
              label="Export"
              onClick={() => console.log("Export Clicked")}
            />
             </div>
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
