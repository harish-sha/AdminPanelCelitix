import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
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
  const [value, setValue] = React.useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOption4, setSelectedOption4] = useState("");

  const options2 = [
    { value: "utility", label: "Utility" },
    { value: "marketing", label: "Marketing" },
    { value: "authentication", label: "Authentication" },
  ];
  const options3 = [
    { value: "text", label: "Text" },
    { value: "image", label: "Image" },
    { value: "document", label: "Document" },
    { value: "carousel", label: "Carousel" },
  ];
  const options4 = [
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
    { value: "sent", label: "Sent" },
  ];


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    console.log("Search Filters:");
    console.log({
      startDate: selectedDate,
      category: selectedOption2,
      type: selectedOption3,
      status: selectedOption4,
      templateName: inputValue,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
                <span>
                  <SummarizeOutlinedIcon size={20} /> Logs
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
              <>
                <div className='flex flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full' >
                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      id="manageCampaignDate"
                      name="manageCampaignDate"
                      label="Created On"
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      placeholder="Pick a start date"
                      tooltipContent="Select the starting date for your project"
                      tooltipPlacement="right"
                      error={!selectedDate}
                      errorText="Please select a valid date"
                    />
                  </div>
                  <div className='w-full sm:w-56' >
                    <InputField
                      id="manageCampaignName"
                      name="manageCampaignName"
                      label="Campaign Name"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Campaign Name"
                      tooltipContent="Your templatename should not contain spaces."
                      tooltipPlacement="right"
                    />
                  </div>

                  <div className="w-full sm:w-56" >
                    <AnimatedDropdown
                      id='manageCampaignCategory'
                      name='manageCampaignCategory'
                      label="Category"
                      tooltipContent="Select category"
                      tooltipPlacement="right"
                      options={options2}
                      value={selectedOption2}
                      onChange={(value) => setSelectedOption2(value)}
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
                      options={options3}
                      value={selectedOption3}
                      onChange={(value) => setSelectedOption3(value)}
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
                      options={options4}
                      value={selectedOption4}
                      onChange={(value) => setSelectedOption4(value)}
                      placeholder="Status"
                    />
                  </div>

                  <div className="w-max-content ">
                    <UniversalButton
                      id='manageCampaignSearchBtn'
                      name='manageCampaignSearchBtn'
                      label="Search"
                      icon={<IoSearch />}
                      onClick={handleSearch}
                      variant="primary"
                    />
                  </div>
                  <div className="w-max-content ">
                    <UniversalButton
                      id='manageCampaignExportBtn'
                      name='manageCampaignExportBtn'
                      label="Export"
                      icon={<IosShareOutlinedIcon fontSize='small' sx={{ marginBottom: '3px' }} />}
                      onClick={handleSearch}
                      variant="primary"
                    />
                  </div>


                </div>
                <div className='w-full' >
                  <ManageCampaignTable
                    id='whatsappManageCampaignTable'
                    name='whatsappManageCampaignTable'
                  // handleView={handleView}
                  // handleDuplicate={handleDuplicate}
                  // handleDelete={handleDelete}
                  />
                </div>
              </>

              {/* <Modal open={open} onClose={handleClose} className='modal-view' >
                <Box sx={modalStyle} className="rounded-lg" >
                  <div className="modal-content my-2 mx-2 rounded-md">
                    <div className="fixed top-2  right-2 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-300 hover:text-gray-800">
                      <span className='cursor-pointer rounded-full bg-gray-200' onClick={handleClose}><MdClose size={20} /></span>
                    </div>
                    <div className="modal-body border-2 rounded-lg border-gray-200">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mainbox p-2">
                            <span className="main-icon">
                              <WhatsApp />
                            </span>
                            <div className="imgbox ">
                              <img src="https://y20india.in/wp-content/uploads/2024/05/Best-WhatsApp-Status.jpeg" alt="" />
                            </div>
                            <div className="contentbox text-sm">
                              <p>As vibrant hues fill the canvas of life, may this festival of colors bring immense joy, success and prosperity to your corporate endeavors🎇💻</p>
                              <p>Wishing our esteemed patrons and partners a Holi filled with the splendor of laughter, the warmth of togetherness and the brightness of positivity.📞📞</p>
                              <p>Let's continue to paint the digital landscape with creativity, innovation and strategic brilliance!✨✨</p>
                              <p>Here's to a colorful journey ahead!🎉🎊</p>
                              <p>Happy Holi!🎇✨</p>
                              <p>Best Regards,🎊🎉<br />[Team Celitix]</p>
                            </div>
                            <div className="btnbox">
                              <a href="#"><i className="bi bi-telephone-fill mr-2"></i>Contact Us</a>
                            </div>
                            <div className="btnbox">
                              <a href="#"><i className="bi bi-box-arrow-up-right mr-2"></i>Visit Us</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal> */}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className='w-full' >
              <h1 className='text-xl font-semibold text-gray-800 mb-4' >Libraries</h1>
            </div>
          </CustomTabPanel>
        </Box>

      )}
    </div>


  )
}



export default WhatsappManageCampaign