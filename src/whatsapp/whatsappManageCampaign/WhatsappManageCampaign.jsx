import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { IoSearch } from "react-icons/io5";

import InputField from '../../components/layout/InputField'
import Loader from '../components/Loader';
import UniversalDatePicker from '../components/UniversalDatePicker';
import AnimatedDropdown from '../components/AnimatedDropdown';
import UniversalButton from '../components/UniversalButton';
import ManageCampaignTable from './components/ManageCampaignTable';
import ManageCampaignLogsTable from './components/ManageCampaignLogsTable';
import { BsJournalArrowDown } from 'react-icons/bs';
import UniversalSkeleton from '../components/UniversalSkeleton';
import { getWhatsappCampaignReport } from '../../apis/whatsapp/whatsapp.js';

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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const WhatsappManageCampaign = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [inputValueMobileLogs, setInputValueMobileLogs] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateLogs, setSelectedDateLogs] = useState(null);
  const [campaignCategory, setCampaignCategory] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [campaignStatus, setCampaignStatus] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false)

  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/\s/g, "");
    setCampaignName(newValue);
  };

  const handleInputChangeMobileLogs = (e) => {
    setInputValueMobileLogs(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = async () => {
    console.log("Search Filters:");
    console.log({
      startDate: selectedDate,
      category: campaignCategory,
      type: campaignType,
      status: campaignStatus,
      campaignName: campaignName,
    });

    const formattedFromDate = selectedDate
      ? new Date(selectedDate).toLocaleDateString('en-GB')
      : new Date().toLocaleDateString('en-GB');

    const formattedToDate = new Date().toLocaleDateString('en-GB');

    const filters = {
      fromQueDateTime: formattedFromDate,
      toQueDateTime: formattedFromDate,
      campaignName: campaignName.trim(),
      template_category: campaignCategory || "all",
    };

    console.log("Filter Params:", filters);

    setIsFetching(true);
    const data = await getWhatsappCampaignReport(filters);

    // Apply additional filters for campaign type and status
    const filteredData = data.filter(item => {
      return (
        (!campaignType || item.templateType === campaignType) &&
        (!campaignStatus || item.status === campaignStatus)
      );
    });
    // setFilteredData(Array.isArray(data) ? data : []);
    // setFilteredData(data);
    setFilteredData(filteredData);
    setIsFetching(false);
  };

  // Fetch initial data - for to load data on page load

  const fetchInitialData = async () => {
    const filters = {
      fromQueDateTime: new Date().toLocaleDateString('en-GB'),
      toQueDateTime: new Date().toLocaleDateString('en-GB'),
      campaignName: "",
      category: "all",
    };

    setIsFetching(true);
    const data = await getWhatsappCampaignReport(filters);
    setFilteredData(data);
    setIsFetching(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchInitialData();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Fetch initial data - for to load data on page load

  const handleShowSearch = async () => {
    console.log("Show Logs:");
    console.log({
      startDate: selectedDateLogs,
      mobileNo: inputValueMobileLogs,
    });

    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsFetching(false);

    setFilteredData([]);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className='w-full ' >
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <Box sx={{ width: '100%' }}>
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
                  <CampaignOutlinedIcon size={20} /> Campaign
                </span>
              }
              {...a11yProps(0)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            />
            <Tab
              label={
                <span className='flex gap-2 items-center' >
                  <BsJournalArrowDown size={18} /> API Logs
                </span>
              }
              {...a11yProps(1)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            />
            <Tab
              label={
                <span>
                  <SummarizeOutlinedIcon size={20} /> Summary
                </span>
              }
              {...a11yProps(2)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            />
          </Tabs>
          <CustomTabPanel value={value} index={0} className='' >
            <div className='w-full' >
              <div className='flex flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full' >
                <div className="w-full sm:w-56">
                  <UniversalDatePicker
                    id="manageCampaignDate"
                    name="manageCampaignDate"
                    label="Created On"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    placeholder="Pick a start date"
                    tooltipContent="Select a date within the last 3 months."
                    tooltipPlacement="right"
                    minDate={new Date().setMonth(new Date().getMonth() - 3)}
                    maxDate={new Date()}
                    error={!selectedDate}
                    errorText="Please select a valid date"
                  />
                </div>
                <div className='w-full sm:w-56'>
                  <InputField
                    id="manageCampaignName"
                    name="manageCampaignName"
                    label="Campaign Name"
                    value={campaignName}
                    onChange={handleInputChange}
                    placeholder="Campaign Name"
                    tooltipContent="Your templatename should not contain spaces."
                    tooltipPlacement="right"
                  />
                </div>

                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    id='manageCampaignCategory'
                    name='manageCampaignCategory'
                    label="Category"
                    tooltipContent="Select category"
                    tooltipPlacement="right"
                    options={[
                      { value: "utility", label: "Utility" },
                      { value: "marketing", label: "Marketing" },
                      { value: "authentication", label: "Authentication" },
                    ]}
                    value={campaignCategory}
                    onChange={(value) => setCampaignCategory(value)}
                    placeholder="Category"
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    id='manageCampaignType'
                    name='manageCampaignType'
                    label="Type"
                    tooltipContent="Select Type"
                    tooltipPlacement="right"
                    options={[
                      { value: "text", label: "Text" },
                      { value: "image", label: "Image" },
                      { value: "document", label: "Document" },
                      { value: "carousel", label: "Carousel" },
                    ]}
                    value={campaignType}
                    onChange={(value) => setCampaignType(value)}
                    placeholder="Type"
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    id='manageCampaignStatus'
                    name='manageCampaignStatus'
                    label="Status"
                    tooltipContent="Select Status"
                    tooltipPlacement="right"
                    options={[
                      { value: "scheduled", label: "Scheduled" },
                      { value: "pending", label: "Pending" },
                      // { value: "failed", label: "Failed" },
                      // { value: "sent", label: "Sent" },
                      { value: "cancelled", label: "Cancelled" },
                      { value: "completed", label: "Completed" },
                    ]}
                    value={campaignStatus}
                    onChange={(value) => setCampaignStatus(value)}
                    placeholder="Status"
                  />
                </div>

                <div className="w-max-content">
                  <UniversalButton
                    id='manageCampaignSearchBtn'
                    name='manageCampaignSearchBtn'
                    label="Search"
                    icon={<IoSearch />}
                    onClick={handleSearch}
                    variant="primary"
                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    id='manageCampaignExportBtn'
                    name='manageCampaignExportBtn'
                    label="Export"
                    icon={<IosShareOutlinedIcon sx={{ marginBottom: '3px', fontSize: '1.1rem' }} />}
                    variant="primary"
                  />
                </div>
              </div>
              {isFetching ? (
                <div className='' >
                  <UniversalSkeleton height='35rem' width='100%' />
                </div>
              ) : (
                <div className='w-full'>
                  <ManageCampaignTable
                    id='whatsappManageCampaignTable'
                    name='whatsappManageCampaignTable'
                    data={filteredData}
                  />
                </div>
              )}

              {/* {isFetching ? (
                <UniversalSkeleton height="35rem" width="100%" />
              ) : !hasSearched ? (
                // Case 1: Initial Load - Ask user to select WABA account
                <div className="border-2 border-dashed h-[55vh] bg-white border-blue-500  rounded-2xl w-full flex items-center justify-center">
                  <div className="text-center text-blue-500 p-8 shadow-2xl shadow-blue-300 rounded-2xl">
                    <span className="text-2xl font-m font-medium tracking-wide">
                      Please select a WhatsApp Business Account (WABA) to
                      proceed.
                    </span>
                  </div>
                </div>
              ) : filteredData.length === 0 ? (
                // Case 2: No data found after filtering
                <div className="border-2 border-dashed h-[55vh] bg-white border-red-500  rounded-2xl w-full flex items-center justify-center">
                  <div className="text-center text-red-500 p-8 shadow-2xl rounded-2xl shadow-red-300">
                    <span className="text-2xl font-m font-medium tracking-wide">
                      No matching records found. <br /> Please adjust your filters
                      and try again.
                    </span>
                  </div>
                </div>
              ) : (
                // Case 3: Show data in the table
                <ManageCampaignTable
                  id='whatsappManageCampaignTable'
                  name='whatsappManageCampaignTable'
                  data={filteredData}
                />
              )} */}

            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className='w-full' >
              <div className='flex flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full' >
                <div className="w-full sm:w-56">
                  <UniversalDatePicker
                    id="manageCampaignLogsDate"
                    name="manageCampaignLogsDate"
                    label="Created On"
                    value={selectedDateLogs}
                    onChange={(newValue) => setSelectedDateLogs(newValue)}
                    placeholder="Pick a start date"
                    tooltipContent="Select the starting date for your project"
                    tooltipPlacement="right"
                    error={!selectedDateLogs}
                    errorText="Please select a valid date"
                  />
                </div>
                <div className='w-full sm:w-56' >
                  <InputField
                    id="manageCampaignLogsNumber"
                    name="manageCampaignLogsNumber"
                    type='number'
                    label="Mobile No."
                    value={inputValueMobileLogs}
                    onChange={handleInputChangeMobileLogs}
                    placeholder="Mobile Number"
                    tooltipContent="Your templatename should not contain spaces."
                    tooltipPlacement="right"
                  />
                </div>
                <div className="w-max-content ">
                  <UniversalButton
                    id='manageCampaignLogsShowhBtn'
                    name='manageCampaignLogsShowhBtn'
                    label="Show"
                    icon={<IoSearch />}
                    onClick={handleShowSearch}
                    variant="primary"
                  />
                </div>
              </div>
              {isFetching ? (
                <div className='' >
                  <UniversalSkeleton height='35rem' width='100%' />
                </div>
              ) : (
                <div className='w-full'>
                  <ManageCampaignLogsTable
                    id='whatsappManageCampaignLogsTable'
                    name='whatsappManageCampaignLogsTable'
                  />
                </div>
              )}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className='w-full' >
              <h1 className='text-xl font-semibold text-gray-800 mb-4'>Summary</h1>
            </div>
          </CustomTabPanel>
        </Box>

      )}
    </div>


  )
}



export default WhatsappManageCampaign