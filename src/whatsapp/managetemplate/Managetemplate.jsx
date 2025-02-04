import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

import DataTable from '../components/Datatable'
import AnimatedDropdown from '../components/AnimatedDropdown';
import InputField from '../components/InputField';
// import UniversalSkeleton from '../../components/common/UniversalSkeleton';
import UniversalDatePicker from '../components/UniversalDatePicker';
import UniversalButton from "../components/UniversalButton";
import { WhatsApp } from '@mui/icons-material';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UniversalSkeleton from '../components/UniversalSkeleton';
import '../style.css'
import Loader from '../components/Loader';

// import { Box }


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


const ManageTemplate = () => {
    const navigate = useNavigate();
    // const [valueWithSpaces, setValueWithSpaces] = useState("");
    const [valueWithoutSpaces, setValueWithoutSpaces] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");
    const [selectedOption3, setSelectedOption3] = useState("");
    const [selectedOption4, setSelectedOption4] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    // const handleSearch = () => {
    //     // Implement search logic here
    // };

    // const handleAddNew = () => {
    //     // Implement add new logic here
    // };

    const handleView = (row) => {
        setSelectedRow(row);
        setOpen(true);
    };

    const handleDuplicate = (row) => {
        // Implement duplicate logic here
    };

    const handleDelete = (row) => {
        // Implement delete logic here
    };

    const handleClose = () => {
        setOpen(false);
    };


    const options = [
        { value: "WABA1", label: "WABA1" },
        { value: "WABA2", label: "WABA2" },
        { value: "WABA3", label: "WABA3" },
    ];

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
        { value: "rejected", label: "Rejected" },
        { value: "approval", label: "Approval" },
    ];

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleAddNew = () => {
        navigate("/createtemplate");
    };

    const handleSearch = () => {
        console.log("Search Filters:");
        console.log({
            startDate: selectedDate,
            WABA: selectedOption,
            category: selectedOption2,
            type: selectedOption3,
            status: selectedOption4,
            templateName: valueWithoutSpaces,
        });
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (value) => {
        // Apply logic for spaces or no spaces here
        const newValue = value.replace(/\s/g, ""); // Example: remove spaces
        setValueWithoutSpaces(newValue);
    };

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
                                    <GradingOutlinedIcon size={20} /> Templates
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
                                    <LibraryBooksOutlinedIcon size={20} /> Library
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
                    </Tabs>
                    <CustomTabPanel value={value} index={0} className='' >

                        <div className='w-full' >
                            <div className='flex flex-wrap gap-4 items-center justify-between align-middle  w-full' >
                                <div>
                                    <h1 className='text-xl font-semibold text-gray-800 mb-4'>Manage Templates</h1>
                                </div>
                                <div className='flex gap-2' >

                                    <div className="w-max-content ">
                                        <UniversalButton
                                            id='manageTemplateAddNewBtn'
                                            name='manageTemplateAddNewBtn'
                                            label="Add New"
                                            onClick={handleAddNew}
                                            variant="primary"
                                        />
                                    </div>
                                    <div className="w-max-content ">
                                        <UniversalButton
                                            id='syncStatusBtn'
                                            name='syncStatusBtn'
                                            label="Sync Status"
                                            // onClick={handleAddNew}
                                            variant="primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <>
                                <div className='flex flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full' >
                                    <div className="w-full sm:w-56">
                                        <UniversalDatePicker
                                            id="manageTemplateDate"
                                            name="manageTemplateDate"
                                            label="Start Date"
                                            value={selectedDate}
                                            onChange={(newValue) => setSelectedDate(newValue)}
                                            placeholder="Pick a start date"
                                            tooltipContent="Select the starting date for your project"
                                            tooltipPlacement="right"
                                            error={!selectedDate}
                                            errorText="Please select a valid date"
                                        />
                                    </div>
                                    <div className="w-full sm:w-56">
                                        <AnimatedDropdown
                                            id='manageTemplateWaba'
                                            name='manageTemplateWaba'
                                            label="Select WABA"
                                            tooltipContent="Select your whatsapp business account"
                                            tooltipPlacement="right"
                                            options={options}
                                            value={selectedOption}
                                            onChange={(value) => setSelectedOption(value)}
                                            placeholder="Select WABA"
                                        />
                                    </div>
                                    <div className='w-full sm:w-56' >
                                        <InputField
                                            id="manageTemplateName"
                                            name="manageTemplateName"
                                            label="Template Name"
                                            value={valueWithoutSpaces}
                                            // onChange={(val) => setValueWithoutSpaces(val)}
                                            // value={inputValue}
                                            onChange={(e) => handleInputChange(e.target.value)}
                                            placeholder="Template Name"
                                            noSpaces={true}
                                            tooltipContent="Your templatename should not contain spaces."
                                            tooltipPlacement="right"
                                        />
                                    </div>

                                    <div className="w-full sm:w-56" >
                                        <AnimatedDropdown
                                            id='manageTemplateLanguage'
                                            name='manageTemplateLanguage'
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
                                            id='manageTemplateType'
                                            name='manageTemplateType'
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
                                            id='manageTemplateStatus'
                                            name='manageTemplateStatus'
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
                                            id='manageTemplateSearchBtn'
                                            name='manageTemplateSearchBtn'
                                            label="Search"
                                            icon={<IoSearch />}
                                            onClick={handleSearch}
                                            variant="primary"
                                        />
                                    </div>


                                </div>
                                <div className='w-full' >
                                    <DataTable
                                        handleView={handleView}
                                        handleDuplicate={handleDuplicate}
                                        handleDelete={handleDelete} />
                                </div>
                            </>

                            <Modal open={open} onClose={handleClose} className='modal-view' >
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
                            </Modal>
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

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "20px"
};

export default ManageTemplate