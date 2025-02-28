import { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import toast from 'react-hot-toast';


import AnimatedDropdown from '../components/AnimatedDropdown';
import UniversalDatePicker from '../components/UniversalDatePicker';
import InputField from '../components/InputField';
import { HiOutlineChat } from "react-icons/hi";
import WhatsappConversationTable from './components/WhatsappConversationTable';
import UniversalButton from '../components/UniversalButton';
import UniversalSkeleton from '../components/UniversalSkeleton';
import Loader from '../components/Loader';
import { getWabaList } from '../../apis/whatsapp/whatsapp.js';


const WhatsappConversation = () => {
  const [selectedWaba, setSelectedWaba] = useState('');
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [inputMobile, setInputMobile] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wabaList, setWabaList] = useState(null);


  // WABA LIST
  useEffect(() => {
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();
        if (response) {
          setWabaList(response);
        } else {
          console.error("Failed to fetch WABA details");
          toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        console.error("Error fetching WABA list:", error);
        toast.error("Error fetching WABA list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWabaList();
  }, []);

  // ✅ Handle Search Click
  const handleSearch = async () => {
    console.log("🔍 Search Filters:");
    console.log({
      waba: selectedWaba,
      FromDate: selectedDateFrom,
      ToDate: selectedDateTo,
      mobileNumber: inputMobile,
    });

    if (!selectedDateFrom || !selectedDateTo) {
      alert("Please select a valid date range.");
      return;
    }

    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsFetching(false);
    setFilteredData([]);
  };


  return (
    <div className='w-full'>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className='flex  justify-center gap-1' >
            <div className='pt-1' >
              <HiOutlineChat
                className='text-2xl text-green-600'
              />
            </div>
            <h1 className='text-xl text-center font-m font-semibold text-green-600 mb-5'> Whatsapp Conversation</h1>
          </div>
          <div className="flex flex-wrap gap-4 items-end justify-start align-middle mb-5 w-full">
            {/* Select WABA Dropdown */}
            <div className="w-full sm:w-56">
              <AnimatedDropdown
                id="wabadropdown"
                name="wabadropdown"
                label="Select WABA"
                placeholder="Select WABA"
                options={wabaList?.map((waba) => ({
                  value: waba.mobileNo,
                  label: waba.name,
                }))}
                value={selectedWaba}
                onChange={(value) => setSelectedWaba(value)}
              />
            </div>

            {/* From Date Picker */}
            <div className="w-full sm:w-56">
              <UniversalDatePicker
                id="conversationfrom"
                name="conversationfrom"
                label="From Date"
                value={selectedDateFrom}
                onChange={(newValue) => setSelectedDateFrom(newValue)}
                error={!selectedDateFrom}
                errorText="Please select a valid date"
              />
            </div>

            {/* To Date Picker */}
            <div className="w-full sm:w-56">
              <UniversalDatePicker
                id="conversationto"
                name="conversationto"
                label="To Date"
                value={selectedDateTo}
                onChange={(newValue) => setSelectedDateTo(newValue)}
                error={!selectedDateTo}
                errorText="Please select a valid date"
              />
            </div>

            {/* Mobile Number Input Field */}
            <div className="w-full sm:w-56">
              <InputField
                id="conversationmobile"
                name="conversationmobile"
                label="Mobile Number"
                value={inputMobile}
                type="number"
                onChange={(e) => setInputMobile(e.target.value)}
                placeholder="Enter Mobile Number"
              />
            </div>

            {/* Search Button */}
            <div className="w-max-content">
              <UniversalButton
                id="conversationsearch"
                name="conversationsearch"
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
                name="conversationexport"
                label="Export"
                onClick={() => console.log("Export Clicked")} // ✅ Add function for export
              />
            </div>
          </div>

          {/* ✅ Show Loader or Table */}
          {isFetching ? (
            <div className="w-full">
              <UniversalSkeleton height="35rem" width="100%" />
            </div>
          ) : (
            <div className="w-full">
              <WhatsappConversationTable
                id="whatsappManageCampaignTable"
                name="whatsappManageCampaignTable"
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default WhatsappConversation