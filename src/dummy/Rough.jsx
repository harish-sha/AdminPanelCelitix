import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UniversalSkeleton from '../components/UniversalSkeleton';
import Loader from '../components/Loader';
import DataTable from '../components/Datatable';
import AnimatedDropdown from '../components/AnimatedDropdown';
import InputField from '../components/InputField';
import UniversalDatePicker from '../components/UniversalDatePicker';
import UniversalButton from "../components/UniversalButton";
import { getWabaList, getWabaTemplateDetails } from '../../apis/whatsapp/whatsapp';
import { CustomTabPanel, a11yProps } from './components/CustomTabPanel';
import '../style.css';

const ManageTemplate = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [value, setValue] = useState(0);

    // Filters
    const [selectedWaba, setSelectedWaba] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [templateName, setTemplateName] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    // Data
    const [wabaList, setWabaList] = useState([]);
    const [apiData, setApiData] = useState([]); // Stores unfiltered API response
    const [filteredData, setFilteredData] = useState([]); // Stores filtered data

    // Fetch WABA List
    useEffect(() => {
        const fetchWabaList = async () => {
            try {
                const response = await getWabaList();
                if (response) {
                    setWabaList(response);
                } else {
                    console.error("Failed to fetch WABA List");
                }
            } catch (error) {
                console.error("Error fetching WABA List:", error);
            }
        };
        fetchWabaList();
    }, []);

    // Fetch Templates when WABA is selected
    useEffect(() => {
        if (!selectedWaba) return;

        setIsFetching(true);
        const fetchTemplates = async () => {
            try {
                const response = await getWabaTemplateDetails(selectedWaba);
                if (response) {
                    setApiData(response);
                    setFilteredData(response); // Initially, show all data
                } else {
                    setApiData([]);
                    setFilteredData([]);
                }
            } catch (error) {
                console.error("Error fetching template data:", error);
                setApiData([]);
                setFilteredData([]);
            }
            setIsFetching(false);
        };
        fetchTemplates();
    }, [selectedWaba]);

    // ✅ Correct Filtering Function
    const handleSearch = () => {
        if (!selectedWaba) {
            console.error("Please select a WABA account before searching.");
            return;
        }

        setIsFetching(true); // Show skeleton while filtering

        const filtered = apiData.filter(item => {
            // Convert values to lowercase & trim spaces
            const itemCategory = item.category?.toLowerCase().trim() || "";
            const itemType = item.type?.toLowerCase().trim() || "";
            const itemStatus = item.status?.toLowerCase().trim() || "";
            const itemName = item.templateName?.toLowerCase().trim() || "";
            const itemDate = item.createdDate ? new Date(item.createdDate).toISOString().split('T')[0] : "";

            return (
                (!selectedCategory || itemCategory === selectedCategory.toLowerCase().trim()) &&
                (!selectedType || itemType === selectedType.toLowerCase().trim()) &&
                (!selectedStatus || itemStatus === selectedStatus.toLowerCase().trim()) &&
                (!templateName || itemName.includes(templateName.toLowerCase().trim())) &&
                (!selectedDate || itemDate === new Date(selectedDate).toISOString().split('T')[0])
            );
        });

        setTimeout(() => {
            setFilteredData(filtered);
            setIsFetching(false);
        }, 500); // Simulating API response delay
    };

    return (
        <div className='w-full'>
            {isLoading ? <Loader /> : (
                <Box sx={{ width: '100%' }}>
                    <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="Manage Templates">
                        <Tab label="Templates" {...a11yProps(0)} />
                        <Tab label="Library" {...a11yProps(1)} />
                    </Tabs>
                    <CustomTabPanel value={value} index={0}>

                        <div className='w-full'>
                            <h1 className='text-xl font-semibold text-gray-800 mb-4'>Manage Templates</h1>

                            {/* Filters */}
                            <div className='flex flex-wrap gap-4 pb-5'>
                                <AnimatedDropdown
                                    label="Select WABA"
                                    options={wabaList.map(waba => ({ value: waba.mobileNo, label: waba.name }))}
                                    value={selectedWaba}
                                    onChange={setSelectedWaba}
                                />
                                <AnimatedDropdown
                                    label="Category"
                                    options={[
                                        { value: "marketing", label: "Marketing" },
                                        { value: "utility", label: "Utility" },
                                    ]}
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                />
                                <AnimatedDropdown
                                    label="Type"
                                    options={[
                                        { value: "text", label: "Text" },
                                        { value: "image", label: "Image" },
                                    ]}
                                    value={selectedType}
                                    onChange={setSelectedType}
                                />
                                <AnimatedDropdown
                                    label="Status"
                                    options={[
                                        { value: "approved", label: "Approved" },
                                        { value: "pending", label: "Pending" },
                                    ]}
                                    value={selectedStatus}
                                    onChange={setSelectedStatus}
                                />
                                <InputField
                                    label="Template Name"
                                    value={templateName}
                                    onChange={(e) => setTemplateName(e.target.value)}
                                />
                                <UniversalDatePicker
                                    label="Start Date"
                                    value={selectedDate}
                                    onChange={setSelectedDate}
                                />
                                <UniversalButton label="Search" icon={<IoSearch />} onClick={handleSearch} />
                            </div>

                            {/* Data Table */}
                            {isFetching ? (
                                <UniversalSkeleton height='35rem' width='100%' />
                            ) : filteredData.length === 0 ? (
                                <div className="text-center text-gray-600 mt-10">
                                    <h2>No Data Available</h2>
                                </div>
                            ) : (
                                <DataTable rows={filteredData} />
                            )}
                        </div>
                    </CustomTabPanel>
                </Box>
            )}
        </div>
    );
};

export default ManageTemplate;
