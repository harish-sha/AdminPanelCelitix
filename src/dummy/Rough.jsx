import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import Box from "@mui/material/Box";
import DataTable from "../components/Datatable";
import AnimatedDropdown from "../components/AnimatedDropdown";
import InputField from "../components/InputField";
import UniversalDatePicker from "../components/UniversalDatePicker";
import UniversalButton from "../components/UniversalButton";
import { WhatsApp } from "@mui/icons-material";
import { MdClose } from "react-icons/md";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import UniversalSkeleton from "../components/UniversalSkeleton";
import Loader from "../components/Loader";
import {
    getWabaList,
    getWabaTemplateDetails,
} from "../../apis/whatsapp/whatsapp";
import { CustomTabPanel, a11yProps } from "./components/CustomTabPanel";
import "../style.css";
const ManageTemplate = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [value, setValue] = useState(0);
    const [valueWithoutSpaces, setValueWithoutSpaces] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    // Filters
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedWaba, setSelectedWaba] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [templateName, setTemplateName] = useState("");
    // Data
    const [wabaList, setWabaList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [apiData, setApiData] = useState([]); // Stores unfiltered API response
    // Fetch WABA List
    useEffect(() => {
        const fetchWabaList = async () => {
            setIsLoading(true); // Show loader while fetching
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
            setIsLoading(false); // Hide loader after fetching
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
                    console.log(response);
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
        console.log("Selected Filters:", {
            selectedCategory,
            selectedType,
            selectedStatus,
            templateName,
            selectedDate,
        });
        setIsFetching(true); // Show skeleton while filtering
        const filtered = apiData.filter((item) => {
            // Convert values to lowercase & trim spaces
            const itemCategory = item.category?.toLowerCase().trim() || "";
            const itemType = item.type?.toLowerCase().trim() || "";
            const itemStatus = item.status?.toLowerCase().trim() || "";
            const itemName = item.templateName?.toLowerCase().trim() || "";
            const itemDate = item.createdDate
                ? new Date(item.createdDate).toISOString().split("T")[0]
                : "";
            return (
                (!selectedCategory ||
                    itemCategory === selectedCategory.toLowerCase().trim()) &&
                (!selectedType || itemType === selectedType.toLowerCase().trim()) &&
                (!selectedStatus ||
                    itemStatus === selectedStatus.toLowerCase().trim()) &&
                (!templateName ||
                    itemName.includes(templateName.toLowerCase().trim())) &&
                (!selectedDate ||
                    itemDate === new Date(selectedDate).toISOString().split("T")[0])
            );
        });
        console.log("Filtered Data:", filtered); // Debugging filtered data
        setTimeout(() => {
            setFilteredData(filtered);
            setIsFetching(false);
        }, 500); // Simulating API response delay
    };
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
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleInputChange = (value) => {
        // Apply logic for spaces or no spaces here
        const newValue = value.replace(/\s/g, ""); // Example: remove spaces
        setValueWithoutSpaces(newValue);
    };
    return (
        <div className="w-full ">
            {isLoading ? (
                <Loader />
            ) : (
                <Box sx={{ width: "100%" }}>
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
                                <span>
                                    <LibraryBooksOutlinedIcon size={20} /> Library
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
                    <CustomTabPanel value={value} index={0} className="">
                        <div className="w-full">
                            <div className="flex flex-wrap gap-4 items-center justify-between align-middle wfull">
                                <div>
                                    <h1 className="text-xl font-semibold text-gray-800 mb-4">
                                        Manage Templates
                                    </h1>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-max-content">
                                        <UniversalButton
                                            id="manageTemplateAddNewBtn"
                                            name="manageTemplateAddNewBtn"
                                            label="Add New"
                                            onClick={() => navigate("/createtemplate")}
                                            variant="primary"
                                        />
                                    </div>
                                    <div className="w-max-content ">
                                        <UniversalButton
                                            id="syncStatusBtn"
                                            name="syncStatusBtn"
                                            label="Sync Status"
                                            variant="primary"
                                        />
                                    </div>
                                </div>
                            </div>
                            <>
                                <div className="flex flex-wrap gap-4 items-end justify-start align-middle pb-5 w-full">
                                    <div className="w-full sm:w-56">
                                        <UniversalDatePicker
                                            id="manageTemplateDate"
                                            name="manageTemplateDate"
                                            label="Start Date"
                                            value={selectedDate}
                                            onChange={setSelectedDate}
                                            placeholder="Pick a start date"
                                            tooltipContent="Select the starting date for your project"
                                            tooltipPlacement="right"
                                            error={!selectedDate}
                                            errorText="Please select a valid date"
                                        />
                                    </div>
                                    <div className="w-full sm:w-56">
                                        <AnimatedDropdown
                                            id="manageTemplateWaba"
                                            name="manageTemplateWaba"
                                            label="Select WABA"
                                            tooltipContent="Select your whatsapp business account"
                                            tooltipPlacement="right"
                                            options={wabaList.map((waba) => ({
                                                value: waba.mobileNo,
                                                label: waba.name,
                                            }))}
                                            value={selectedWaba}
                                            onChange={setSelectedWaba}
                                            placeholder="Select WABA"
                                        />
                                    </div>
                                    <div className="w-full sm:w-56">
                                        <InputField
                                            id="manageTemplateName"
                                            name="manageTemplateName"
                                            label="Template Name"
                                            value={templateName}
                                            onChange={(e) => setTemplateName(e.target.value)}
                                            tooltipPlacement="right"
                                            tooltipContent="Your templatename should not contain spaces."
                                            placeholder="Template Name"
                                        />
                                    </div>
                                    <div className="w-full sm:w-56">
                                        <AnimatedDropdown
                                            id="manageTemplateCategory"
                                            name="manageTemplateCategory"
                                            label="Category"
                                            tooltipContent="Select category"
                                            tooltipPlacement="right"
                                            options={[
                                                { value: "marketing", label: "Marketing" },
                                                { value: "utility", label: "Utility" },
                                                { value: "authentication", label: "Authentication" },
                                            ]}
                                            value={selectedCategory}
                                            onChange={setSelectedCategory}
                                            placeholder="Category"
                                        />
                                    </div>
                                    <div className="w-full sm:w-56">
                                        <AnimatedDropdown
                                            id="manageTemplateType"
                                            name="manageTemplateType"
                                            label="Type"
                                            tooltipContent="Select Type"
                                            tooltipPlacement="right"
                                            options={[
                                                { value: "text", label: "Text" },
                                                { value: "image", label: "Image" },
                                                { value: "document", label: "Document" },
                                                { value: "carousel", label: "Carousel" },
                                            ]}
                                            value={selectedType}
                                            onChange={setSelectedType}
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="w-full sm:w-56">
                                        <AnimatedDropdown
                                            id="manageTemplateStatus"
                                            name="manageTemplateStatus"
                                            label="Status"
                                            tooltipContent="Select Status"
                                            tooltipPlacement="right"
                                            options={[
                                                { value: "pending", label: "Pending" },
                                                { value: "rejected", label: "Rejected" },
                                                { value: "approved", label: "Approved" },
                                            ]}
                                            value={selectedStatus}
                                            onChange={setSelectedStatus}
                                            placeholder="Status"
                                        />
                                    </div>
                                    <div className="w-max-content ">
                                        <UniversalButton
                                            id="manageTemplateSearchBtn"
                                            name="manageTemplateSearchBtn"
                                            label="Search"
                                            icon={<IoSearch />}
                                            onClick={handleSearch}
                                            variant="primary"
                                        />
                                    </div>
                                </div>
                                {isFetching ? (
                                    <UniversalSkeleton height="35rem" width="100%" />
                                ) : !selectedWaba ? (
                                    // Case 1: Initial Load - Ask user to select WABA accountp
                                    <div className="border-2 border-dashed h-[50vh] bg-white border-blue-500 
rounded-2xl w-full flex items-center justify-center">
                                        <div className="text-center text-blue-500 p-8 shadow-2xl rounded-2xl">
                                            <span className="text-2xl font-m font-medium tracking-wide">
                                                Please select a WhatsApp Business Account (WABA) to
                                                proceed.
                                            </span>
                                        </div>
                                    </div>
                                ) : filteredData.length === 0 ? (
                                    // Case 2: No data found after filtering
                                    <div className="border-2 border-dashed h-[50vh] bg-white border-red-500 
rounded-2xl w-full flex items-center justify-center">
                                        <div className="text-center text-red-500 p-8 shadow-2xl rounded-2xl">
                                            <span className="text-2xl font-m font-medium tracking-wide">
                                                No matching records found. <br /> Please adjust your filters
                                                and try again.
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    // Case 3: Show data in the table
                                    <DataTable
                                        id="whatsappManageTemplateTable"
                                        name="whatsappManageTemplateTable"
                                        // handleView={handleView}
                                        // handleDuplicate={handleDuplicate}
                                        // handleDelete={handleDelete}
                                        handleView={() => { }}
                                        handleDuplicate={() => { }}
                                        handleDelete={() => { }}
                                        wabaNumber={selectedWaba}
                                        // rows={filteredData}
                                        data={filteredData}
                                    />
                                )}
                            </>
                            <Modal open={open} onClose={handleClose} className="modal-view">
                                <Box sx={modalStyle} className="rounded-lg">
                                    <div className="modal-content my-2 mx-2 rounded-md">
                                        <div className="fixed top-2 right-2 cursor-pointer rounded-full bg-gray-100 p-1 
text-gray-500 hover:bg-gray-300 hover:text-gray-800">
                                            <span
                                                className="cursor-pointer rounded-full bg-gray-200"
                                                onClick={handleClose}
                                            >
                                                <MdClose size={20} />
                                            </span>
                                        </div>
                                        <div className="modal-body border-2 rounded-lg border-gray-200">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="mainbox p-2">
                                                        <span className="main-icon">
                                                            <WhatsApp />
                                                        </span>
                                                        <div className="imgbox ">
                                                            <img
                                                                src="https://y20india.in/wp-content/uploads/2024/05/Best-WhatsAppStatus.jpeg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="contentbox text-sm">
                                                            <p>
                                                                As vibrant hues fill the canvas of life, may
                                                                this festival of colors bring immense joy,
                                                                success and prosperity to your corporate
                                                                endeavors� �
                                                            </p>
                                                            <p>
                                                                Wishing our esteemed patrons and partners a Holi
                                                                filled with the splendor of laughter, the warmth
                                                                of togetherness and the brightness of
                                                                positivity.� �
                                                            </p>
                                                            <p>
                                                                Let's continue to paint the digital landscape
                                                                with creativity, innovation and strategic
                                                                brilliance!✨ ✨
                                                            </p>
                                                            <p>Here's to a colorful journey ahead!� � </p>
                                                            <p>Happy Holi!� ✨ </p>
                                                            <p>
                                                                Best Regards,� �
                                                                <br />
                                                                [Team Celitix]
                                                            </p>
                                                        </div>
                                                        <div className="btnbox">
                                                            <a href="#">
                                                                <i className="bi bi-telephone-fill mr-2"></i>
                                                                Contact Us
                                                            </a>
                                                        </div>
                                                        <div className="btnbox">
                                                            <a href="#">
                                                                <i className="bi bi-box-arrow-up-right mr-2"></i>
                                                                Visit Us
                                                            </a>
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
                        <div className="w-full">
                            <h1 className="text-xl font-semibold text-gray-800 mb-4">
                                Libraries
                            </h1>
                        </div>
                    </CustomTabPanel>
                </Box>
            )}
        </div>
    );
};
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
};
export default ManageTemplate