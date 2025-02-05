import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Modal from '@mui/material/Modal';
import { MdClose } from 'react-icons/md';
import { WhatsApp } from '@mui/icons-material';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PropTypes from 'prop-types';

import DataTable from '../components/Datatable';
import AnimatedDropdown from '../components/AnimatedDropdown';
import InputField from '../components/InputField';
import UniversalSkeleton from '../components/UniversalSkeleton';
import UniversalDatePicker from '../components/UniversalDatePicker';
import UniversalButton from '../components/UniversalButton';
import Loader from '../components/Loader';

import '../style.css';

const ManageTemplate = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");
    const [selectedOption3, setSelectedOption3] = useState("");
    const [selectedOption4, setSelectedOption4] = useState("");
    const [templateName, setTemplateName] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false); // ✅ New state for search loading
    const [filteredData, setFilteredData] = useState([]); // ✅ Holds filtered data
    const [value, setValue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleSearch = async () => {
        console.log("Search Filters:", {
            startDate: selectedDate,
            WABA: selectedOption,
            category: selectedOption2,
            type: selectedOption3,
            status: selectedOption4,
            templateName: templateName,
        });

        // ✅ Show the loader before fetching results
        setIsFetching(true);
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate data fetch
        setIsFetching(false);

        // ✅ Here you would fetch the real filtered data from API
        setFilteredData([]); // Replace this with actual API data
    };

    return (
        <div className='w-full'>
            {isLoading ? (
                <Loader />
            ) : (
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={value}
                        onChange={(e, newValue) => setValue(newValue)}
                        aria-label="Manage Templates Tabs"
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab
                            label={
                                <span>
                                    <GradingOutlinedIcon size={20} /> Templates
                                </span>
                            }
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

                    <div className='w-full'>
                        <div className='flex flex-wrap gap-4 items-center justify-between align-middle w-full'>
                            <h1 className='text-xl font-semibold text-gray-800 mb-4'>Manage Templates</h1>
                            <div className='flex gap-2'>
                                <UniversalButton
                                    id='manageTemplateAddNewBtn'
                                    name='manageTemplateAddNewBtn'
                                    label="Add New"
                                    onClick={() => navigate("/createtemplate")}
                                    variant="primary"
                                />
                                <UniversalButton
                                    id='syncStatusBtn'
                                    name='syncStatusBtn'
                                    label="Sync Status"
                                    variant="primary"
                                />
                            </div>
                        </div>

                        {/* ✅ FILTER SECTION */}
                        <div className='flex flex-wrap gap-4 items-end justify-start pb-5 w-full'>
                            <UniversalDatePicker
                                id="manageTemplateDate"
                                name="manageTemplateDate"
                                label="Start Date"
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                placeholder="Pick a start date"
                                tooltipContent="Select the starting date for your project"
                                tooltipPlacement="right"
                            />
                            <AnimatedDropdown
                                id='manageTemplateWaba'
                                name='manageTemplateWaba'
                                label="Select WABA"
                                options={[
                                    { value: "WABA1", label: "WABA1" },
                                    { value: "WABA2", label: "WABA2" },
                                    { value: "WABA3", label: "WABA3" }
                                ]}
                                value={selectedOption}
                                onChange={setSelectedOption}
                                placeholder="Select WABA"
                            />
                            <InputField
                                id="manageTemplateName"
                                name="manageTemplateName"
                                label="Template Name"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                placeholder="Template Name"
                                tooltipContent="Your template name should not contain spaces."
                                tooltipPlacement="right"
                            />
                            <AnimatedDropdown
                                id='manageTemplateCategory'
                                name='manageTemplateCategory'
                                label="Category"
                                options={[
                                    { value: "utility", label: "Utility" },
                                    { value: "marketing", label: "Marketing" },
                                    { value: "authentication", label: "Authentication" }
                                ]}
                                value={selectedOption2}
                                onChange={setSelectedOption2}
                                placeholder="Category"
                            />
                            <UniversalButton
                                id='manageTemplateSearchBtn'
                                name='manageTemplateSearchBtn'
                                label="Search"
                                icon={<IoSearch />}
                                onClick={handleSearch}
                                variant="primary"
                            />
                        </div>

                        {/* ✅ DATA TABLE LOADING STATE */}
                        {isFetching ? (
                            <UniversalSkeleton height='30rem' width='100%' />
                        ) : (
                            <DataTable
                                id='whatsappManageTemplateTable'
                                name='whatsappManageTemplateTable'
                                rows={filteredData} // ✅ Use filtered data after search
                            />
                        )}
                    </div>

                    {/* ✅ MODAL */}
                    <Modal open={open} onClose={() => setOpen(false)} className='modal-view'>
                        <Box sx={modalStyle} className="rounded-lg">
                            <div className="modal-content my-2 mx-2 rounded-md">
                                <div className="fixed top-2 right-2 cursor-pointer bg-gray-100 p-1 text-gray-500 hover:bg-gray-300 hover:text-gray-800">
                                    <MdClose size={20} onClick={() => setOpen(false)} />
                                </div>
                                <div className="modal-body border-2 rounded-lg border-gray-200 p-4">
                                    <WhatsApp />
                                    <h2 className="text-lg font-semibold mt-2">Template Details</h2>
                                    <p>Showing details for the selected template...</p>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </Box>
            )}
        </div>
    );
};

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

export default ManageTemplate;
