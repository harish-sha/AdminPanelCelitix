import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, Menu, MenuItem, IconButton } from "@mui/material";
import { FaBars } from "react-icons/fa";
import toast from "react-hot-toast";

import UniversalAccountInfo from "../../profile/components/UniversalAccountInfo";
import CustomTooltip from "../../components/common/CustomTooltip";
import celitixLogo from "../../assets/images/celitix-cpaas-solution-logo.svg";

import {
    AccountBalanceWalletOutlined as WalletIcon,
    PersonPinCircleOutlined as IpAddress,
    FileDownloadOutlined as DownloadIcon,
    AccountCircleRounded as ProfileIcon,
    SettingsOutlined as SettingsIcon,
    AccountCircle as AccountIcon,
    InfoOutlined as InfoIcon,
    Payments as PaymentsIcon,
    MoreVert as MoreIcon,
    History as HistoryIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";


const Navbar = ({ isCollapsed, setIsCollapsed }) => {
    const [showModal, setShowModal] = useState(false);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 768px)");

    // ✅ Sidebar Toggle
    const toggleSidebar = useCallback(() => setIsCollapsed((prev) => !prev), [setIsCollapsed]);

    // ✅ Profile Dropdown Handlers
    const handleProfileMenu = useCallback((event) => setProfileAnchorEl(event?.currentTarget || null), []);

    const handleViewProfile = useCallback(() => {
        handleProfileMenu();
        navigate("/profile");
    }, [navigate]);

    const handleLoginDetails = useCallback(() => {
        handleProfileMenu();
        navigate("/loginIpdetails");
    }, [navigate]);

    const handleTransactionHistory = useCallback(() => {
        handleProfileMenu();
        navigate("/transactions");
    }, [navigate]);

    const handleViewSetting = useCallback(() => {
        handleProfileMenu();
        navigate("/settings")
    }, [navigate])

    const handleLogout = useCallback(() => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        setTimeout(() => (window.location.href = "/login"), 1000);
    }, []);

    // ✅ Mobile Menu Handlers
    const handleMenu = useCallback((event) => setMenuAnchorEl(event?.currentTarget || null), []);

    return (
        <nav className="w-full bg-white h-14 lg:h-16 md:h-15 flex items-center px-4">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none cursor-pointer">
                    <FaBars />
                </button>
                {/* <span className="text-xl font-medium tracking-wider text-gray-800 lg:block">Celitix</span> */}
                <img src={celitixLogo} width={100} height={80} alt="Celitix Logo" />
            </div>

            {/* ✅ Large Screen Navbar */}
            {!isMobile ? (
                <div className="ml-auto flex gap-3">
                    {[
                        { title: "Account Info", Icon: InfoIcon, action: () => setShowModal(true) },
                        { title: "Add Funds", Icon: PaymentsIcon },
                        { title: "Wallet", Icon: WalletIcon },
                        { title: "Downloads", Icon: DownloadIcon },
                    ].map(({ title, Icon, action }, idx) => (
                        <CustomTooltip key={idx} title={title} placement="bottom" arrow>
                            <button
                                className="p-2 rounded-full cursor-pointer bg-[#e6f4ff] hover:bg-gray-200"
                                onClick={action}
                            >
                                <Icon className="text-xl text-blue-700" />
                            </button>
                        </CustomTooltip>
                    ))}

                    {/* Profile Button (Dropdown) */}
                    <CustomTooltip title="Profile" placement="bottom" arrow>
                        <button onClick={handleProfileMenu} className="p-2 rounded-full cursor-pointer bg-[#e6f4ff] hover:bg-gray-200">
                            <ProfileIcon className="text-xl text-blue-700" />
                        </button>
                    </CustomTooltip>

                    {/* Profile Dropdown Menu */}
                    <Menu anchorEl={profileAnchorEl} open={Boolean(profileAnchorEl)} onClose={() => handleProfileMenu()}>
                        {[
                            { text: "Profile", icon: <AccountIcon />, action: handleViewProfile },
                            { text: "Login Details", icon: <IpAddress sx={{ fontSize: 26 }} />, action: handleLoginDetails },
                            { text: "Settings", icon: <SettingsIcon />, action: handleViewSetting },
                            { text: "Transaction History", icon: <HistoryIcon />, action: handleTransactionHistory },
                            { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
                        ].map(({ text, icon, action }, idx) => (
                            <MenuItem key={idx} sx={{ fontSize: "15px", fontWeight: "500" }} onClick={action}>
                                {icon} <span className="ml-2">{text}</span>
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            ) : (
                // ✅ Small Screen Dropdown 
                <div className="ml-auto">
                    <IconButton onClick={handleMenu} className="text-gray-700">
                        <MoreIcon />
                    </IconButton>

                    {/* Small Screen Dropdown Menu */}
                    <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={() => handleMenu()}>
                        {[
                            { text: "Info", icon: <InfoIcon />, action: () => setShowModal(true) },
                            { text: "Money", icon: <PaymentsIcon /> },
                            { text: "Wallet", icon: <WalletIcon /> },
                            { text: "Download", icon: <DownloadIcon /> },
                            { text: "Profile", icon: <ProfileIcon />, action: handleViewProfile },
                            { text: "Login Details", icon: <IpAddress />, action: handleLoginDetails },
                            { text: "Settings", icon: <SettingsIcon />, action: handleViewSetting },
                            { text: "Transactions", icon: <HistoryIcon />, action: handleTransactionHistory },
                            { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
                        ].map(({ text, icon, action }, idx) => (
                            <MenuItem key={idx} sx={{ fontSize: "15px", fontWeight: "500" }} onClick={action}>
                                {icon} <span className="ml-2">{text}</span>
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            )}

            {/* ✅ Account Info Modal */}
            {showModal && <UniversalAccountInfo show={showModal} handleClose={() => setShowModal(false)} />}
            {/* {showModal && <UniversalAccountInfo show={showModal} handleClose={() => setShowModal(false)} />} */}
        </nav>
    );
};

export default Navbar;

