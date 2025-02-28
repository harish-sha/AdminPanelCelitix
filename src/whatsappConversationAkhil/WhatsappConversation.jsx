import { useState } from 'react';
import AnimatedDropdown from '../components/AnimatedDropdown';
import UniversalDatePicker from '../components/UniversalDatePicker';
import InputField from '../../components/layout/InputField';
import UniversalButton from '../components/UniversalButton';
import UniversalSkeleton from '../components/UniversalSkeleton'; // ✅ Ensure this import is correct
import WhatsappConversationTable from '../whatsappConversation/components/WhatsappConversationTable';
import { IoSearch } from "react-icons/io5";

const WhatsappConversation = () => {
  // ✅ State Variables
  const [selectedWaba, setSelectedWaba] = useState('');
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [inputMobile, setInputMobile] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // ✅ WABA Dropdown Options
  const selectWaba = [
    { value: "wabaTemplate1", label: "WABA Template 1" },
    { value: "wabaTemplate2", label: "WABA Template 2" },
  ];

  // ✅ Handle Search Click
  const handleSearch = async () => {
    console.log("🔍 Search Filters:");
    console.log({
      waba: selectedWaba,
      FromDate: selectedDateFrom,
      ToDate: selectedDateTo,
      mobileNumber: inputMobile,
    });

    // ✅ Validate Required Fields
    if (!selectedDateFrom || !selectedDateTo) {
      alert("Please select a valid date range.");
      return;
    }

    // ✅ Show Loader Before Fetching Results
    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
    setIsFetching(false);

    // ✅ Replace with API response if needed
    setFilteredData([]); // Placeholder for now
  };

  return (

    <div className='w-full' >
      <div className="flex flex-wrap gap-4 items-end justify-start align-middle pb-1 w-full">
        {/* Select WABA Dropdown */}
        <div className="w-full sm:w-48">
          <AnimatedDropdown
            id="wabadropdown"
            name="wabadropdown"
            label="Select WABA"
            placeholder="Select WABA"
            options={selectWaba}
            value={selectedWaba}
            onChange={(value) => setSelectedWaba(value)}
          />
        </div>

        {/* From Date Picker */}
        <div className="w-full sm:w-48">
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
        <div className="w-full sm:w-48">
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
        <div className="w-full sm:w-48">
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
    </div>
  );
};

export default WhatsappConversation;
