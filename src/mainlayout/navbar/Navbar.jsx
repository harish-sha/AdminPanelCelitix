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
    const [profileClicked, setProfileClicked] = useState(false);
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
        setProfileClicked(true);
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
        setProfileClicked(false);
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
                        <MenuItem onClick={handleViewProfile}><AccountCircleIcon className="mr-2 text-blue-700" />Profile</MenuItem>
                        <MenuItem><SettingsOutlinedIcon className="mr-2 text-blue-700" />Settings</MenuItem>
                        <MenuItem><HistoryIcon className="mr-2 text-blue-700" />Transaction History</MenuItem>
                        <MenuItem onClick={handleLogout}><LogoutIcon className="mr-2 text-blue-700" />Logout</MenuItem>
                    </Menu>
                </div>
            ) : (
                // ✅ Small Screen Dropdown (Replaces buttons)
                <div className="ml-auto" >
                    <IconButton onClick={handleOpenMenu} className="text-gray-700">
                        <MoreVertIcon />
                    </IconButton>

                    {/* ✅ Small Screen Dropdown Menu */}
                    <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleCloseMenu} style={{ width: "550px!important" }}>
                        <MenuItem onClick={() => { setShowModal(true); handleCloseMenu(); }}>
                            <InfoOutlinedIcon className="mr-2 text-blue-800" /> Info
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                            <PaymentsIcon className="mr-2 text-blue-800" /> Money
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                            <AccountBalanceWalletOutlinedIcon className="mr-2 text-blue-800" /> Wallet
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                            <FileDownloadOutlinedIcon className="mr-2 text-blue-800" /> Download
                        </MenuItem>
                        <MenuItem
                            onClick={() => setProfileClicked((prev) => !prev)} // Toggle profile menu visibility
                        >
                            <AccountCircleRoundedIcon className="mr-2 text-blue-800" /> Profile
                        </MenuItem>

                        {/* Show additional menu items only if profileClicked is true */}
                        {profileClicked && isMobile && (
                            <>
                                <div className="" >

                                    <MenuItem>
                                        <SettingsOutlinedIcon className="mr-2 text-blue-800" />Settings</MenuItem>
                                    <MenuItem><HistoryIcon className="mr-2 text-blue-800" />Transactions</MenuItem>
                                    <MenuItem onClick={handleLogout}><LogoutIcon className="mr-2 text-blue-800" />Logout</MenuItem>
                                </div>
                            </>
                        )}


                    </Menu>
                </div>
            )}

            {/* ✅ Account Info Modal */}
            {showModal && <AccountInfoModal show={showModal} handleClose={() => setShowModal(false)} />}
        </nav>
    );
};

export default Navbar;
