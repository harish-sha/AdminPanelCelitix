// const handleSubmitCampaign = async () => {
//     if (!inputValue) {
//         toast.error("Please enter campaign name!");
//         return;
//     }
//     // if (!selectedWaba) {
//     //     toast.error("Please fill all required fields.");
//     //     return;
//     // }
//     // if (!selectedTemplate) {
//     //     toast.error("Please fill all required fields.");
//     //     return;
//     // }

//     const campaignData = {
//         mobileIndex: "0",
//         ContentMessage: formData?.message || "",
//         wabaNumber: selectedWaba,
//         campaignName: inputValue,
//         templateSrno: templateDataNew?.id || "",
//         templateName: selectedTemplate,
//         templateLanguage: templateDataNew?.language || "en",
//         templateCategory: templateDataNew?.category || "Marketing",
//         templateType: templateDataNew?.type || "default",
//         url: "",
//         variables: [],
//         cardsVariables: [],
//         ScheduleCheck: "0",
//         imgCard: imagePreview ? [imagePreview] : [],
//         xlsxpath: "",
//         totalRecords: "5",
//         attachmentfile: "",
//         urlValues: "",
//         urlIndex: 0,
//         isShortUrl: 0,
//         isGroup: 1,
//         countryCode: 91,
//         scheduleDateTime: "0",
//         groupValues: "-1",
//     };

//     try {
//         setSending(true);
//         console.log("🚀 Sending API Request:", campaignData);

//         const response = await sendWhatsappCampaign(campaignData);

//         if (response?.status) {
//             toast.success("Campaign added successfully!");

//             setInputValue("");
//             setSelectedTemplate("");
//             setTemplateDataNew(null);
//             setImagePreview(null);
//             setFormData({});
//         } else {
//             toast.error(response?.msg || "Failed to send campaign.");
//         }
//     } catch (error) {
//         toast.error("Error sending campaign.");
//         console.error("❌ API Error:", error);
//     } finally {
//         setSending(false);
//     }


//     // if (response?.status) {
//     //     toast.success("Campaign added successfully!");
//     //     setTimeout(() => navigate("/campaigns"), 2000); 
//     // }
// };



import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Menu, MenuItem, IconButton } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import toast from "react-hot-toast";


import AccountInfoModal from "./components/UniversalAccountInfo";
import CustomTooltip from "../../components/common/CustomTooltip";
import celitixLogo from '../../assets/images/celitix-cpaas-solution-logo.svg'

const Navbar = ({ isCollapsed, setIsCollapsed }) => {
    const [showModal, setShowModal] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:768px)");

    // ✅ Detect Screen Resize
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ✅ Sidebar Toggle
    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    // ✅ Open & Close Profile Dropdown
    const handleOpenProfileMenu = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setProfileAnchorEl(null);
    };

    const handleViewProfile = () => {
        handleCloseProfileMenu();
        navigate("/profile");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        handleCloseProfileMenu();
        toast.success("Logged out successfully!");
        // window.location.href = "/login";
        setTimeout(() => {
            window.location.href = "/login";
        }, 1000)
    };

    // ✅ Open & Close Small Screen Dropdown
    const handleOpenMenu = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
    };

    return (
        <nav className="w-full bg-white lg:h-16 md:h-15 h-14 flex items-center px-4">
            <div className="flex items-center gap-4 ">
                <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none cursor-pointer">
                    <FaBars />
                </button>

                {/* <span className="text-xl font-medium tracking-wider text-gray-800 lg:block">Celitix</span> */}
                <img src={celitixLogo} width={100} height={80} alt="" />
            </div>

            {/* ✅ Large Screen Navbar Buttons */}
            {!isSmallScreen ? (
                <div className="ml-auto flex gap-3" >
                    <CustomTooltip
                        title="Account info"
                        placement="bottom"
                        arrow
                    >
                        <button className="p-2 rounded-full cursor-pointer bg-[#e6f4ff] hover:bg-gray-200" onClick={() => setShowModal(true)}>
                            <InfoOutlinedIcon className="text-xl text-blue-600" />
                        </button>
                    </CustomTooltip>
                    <CustomTooltip
                        title="Add Funds"
                        placement="bottom"
                        arrow
                    >
                        <button className="p-2 cursor-pointer rounded-full bg-[#e6f4ff] hover:bg-gray-200">
                            <PaymentsIcon className="text-xl text-blue-700" />
                        </button>
                    </CustomTooltip>
                    <CustomTooltip
                        title="Wallet"
                        placement="bottom"
                        arrow
                    >
                        <button className="p-2 rounded-full cursor-pointer bg-[#e6f4ff] hover:bg-gray-200">
                            <AccountBalanceWalletOutlinedIcon className="text-xl text-blue-700" />
                        </button>
                    </CustomTooltip>
                    <CustomTooltip
                        title="Downloads"
                        placement="bottom"
                        arrow
                    >
                        <button className="p-2 rounded-full cursor-pointer bg-[#e6f4ff] hover:bg-gray-200">
                            <FileDownloadOutlinedIcon className="text-xl text-blue-700" />
                        </button>
                    </CustomTooltip>
                    <CustomTooltip
                        title="Profile"
                        placement="bottom"
                        arrow
                    >
                        {/* ✅ Profile Button (Dropdown) */}
                        <button onClick={handleOpenProfileMenu} className="p-2 rounded-full cursor-pointer bg-[#e6f4ff] hover:bg-gray-200">
                            <AccountCircleRoundedIcon className="text-xl text-blue-700" />
                        </button>
                    </CustomTooltip>

                    {/* ✅ Profile Dropdown */}
                    <Menu anchorEl={profileAnchorEl} open={Boolean(profileAnchorEl)} onClose={handleCloseProfileMenu}>
                        <div className="hover:text-blue-700">
                            <MenuItem onClick={handleViewProfile} sx={{
                                fontSize: '15px',
                                fontWeight: '500'
                            }}><AccountCircleIcon className="mr-2" fontSize="small" />Profile</MenuItem>
                        </div>
                        <div className="hover:text-blue-700">
                            <MenuItem sx={{
                                fontSize: '15px',
                                fontWeight: '500'
                            }}><SettingsOutlinedIcon className="mr-2" fontSize="small" />Settings</MenuItem>
                        </div>
                        <div className="hover:text-blue-700">
                            <MenuItem sx={{
                                fontSize: '15px',
                                fontWeight: '500'
                            }}><HistoryIcon className="mr-2" fontSize="small" />Transaction History</MenuItem>
                        </div>
                        <div className="hover:text-blue-700">
                            <MenuItem sx={{
                                fontSize: '15px',
                                fontWeight: '500'
                            }} onClick={handleLogout}><LogoutIcon className="mr-2" fontSize="small" />Logout</MenuItem>
                        </div>
                    </Menu>
                </div>
            ) : (
                // ✅ Small Screen Dropdown 
                <div className="ml-auto" >
                    <IconButton onClick={handleOpenMenu} className="text-gray-700">
                        <MoreVertIcon />
                    </IconButton>

                    {/* ✅ Small Screen Dropdown Menu */}
                    <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleCloseMenu} style={{ width: "550px!important" }}>
                        <MenuItem onClick={() => { setShowModal(true); handleCloseMenu(); }} sx={{
                            fontSize: '15px',
                            fontWeight: '500'
                        }} >
                            <InfoOutlinedIcon className="mr-2" fontSize="small" /> Info
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu} sx={{
                            fontSize: '15px',
                            fontWeight: '500'
                        }} >
                            <PaymentsIcon className="mr-2" fontSize="small" /> Money
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu} sx={{
                            fontSize: '15px',
                            fontWeight: '500'
                        }} >
                            <AccountBalanceWalletOutlinedIcon className="mr-2 " fontSize="small" /> Wallet
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu} sx={{
                            fontSize: '15px',
                            fontWeight: '500'
                        }} >
                            <FileDownloadOutlinedIcon className="mr-2" fontSize="small" /> Download
                        </MenuItem>
                        <MenuItem
                            onClick={handleViewProfile}
                            sx={{
                                fontSize: '15px',
                                fontWeight: '500'
                            }}
                        >
                            <AccountCircleRoundedIcon className="mr-2" fontSize="small" /> Profile
                        </MenuItem>
                        <MenuItem sx={{
                            fontSize: '15px',
                            fontWeight: '500'
                        }} >
                            <SettingsOutlinedIcon className="mr-2" fontSize="small" />Settings</MenuItem>
                        <MenuItem sx={{
                            fontSize: '15px',
                            fontWeight: '500'
                        }} ><HistoryIcon className="mr-2 " fontSize="small" />Transactions</MenuItem>
                        <MenuItem sx={{
                            fontSize: '15px',
                            fontWeight: '500'
                        }} onClick={handleLogout}><LogoutIcon className="mr-2" fontSize="small" />Logout</MenuItem>
                    </Menu>
                </div>
            )}

            {/* ✅ Account Info Modal */}
            {showModal && <AccountInfoModal show={showModal} handleClose={() => setShowModal(false)} />}
        </nav>
    );
};

export default Navbar;