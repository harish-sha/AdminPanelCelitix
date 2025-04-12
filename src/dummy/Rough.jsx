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
  Loop as LoopIcon,
} from "@mui/icons-material";
import { fetchBalance } from "../../apis/settings/setting";

const Navbar = ({ isCollapsed, setIsCollapsed }) => {
  const [showModal, setShowModal] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [balance, setBalance] = useState(0);

  const handleBalance = async () => {
    setIsFetchingBalance(true);
    const res = await fetchBalance();
    setBalance(res.balance);
    setTimeout(() => setIsFetchingBalance(false), 600);
  };
  useEffect(() => {
    handleBalance();
  }, []);

  const toggleSidebar = useCallback(() => setIsCollapsed((prev) => !prev), [setIsCollapsed]);

  const handleProfileMenu = useCallback(
    (event) => setProfileAnchorEl(event?.currentTarget || null),
    []
  );

  const handleViewProfile = useCallback(() => {
    handleProfileMenu();
    navigate("/profile");
  }, [navigate]);

  const handleViewDownload = useCallback(() => {
    navigate("/download");
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
    navigate("/settings");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => (window.location.href = "/login"), 1000);
  }, []);

  const handleMenu = useCallback(
    (event) => setMenuAnchorEl(event?.currentTarget || null),
    []
  );

  return (
    <nav className="flex items-center w-full px-4 bg-white h-14 lg:h-16 md:h-15 shadow-md">
      <div className="flex items-center gap-4">
        <input className="toggle-checkbox" id="toggle" type="checkbox" checked={isCollapsed} onChange={() => setIsCollapsed((prev) => !prev)} />
        <label className="hamburger" htmlFor="toggle">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </label>
        <img src={celitixLogo} width={100} height={80} alt="Celitix Logo" />
      </div>

      {!isMobile ? (
        <div className="flex gap-3 ml-auto">
          {[
            {
              title: "Account Info",
              Icon: InfoIcon,
              action: () => setShowModal(true),
            },
            {
              title: `Balance: ₹${balance}`,
              Icon: isFetchingBalance ? LoopIcon : PaymentsIcon,
              action: handleBalance,
              showBalance: true
            },
            { title: "Wallet", Icon: WalletIcon },
            {
              title: "Downloads",
              Icon: DownloadIcon,
              action: handleViewDownload,
            },
          ].map(({ title, Icon, action, showBalance }, idx) => (
            <CustomTooltip key={idx} title={title} placement="top" arrow>
              <button
                className="relative p-2 rounded-full bg-[#e6f4ff] group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md"
                onClick={action}
              >
                <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 bg-indigo-100 transition-transform origin-bottom duration-300 z-0"></div>
                <Icon
                  className={`relative z-10 text-[18px] text-blue-700 ${showBalance && isFetchingBalance ? "animate-spin" : ""}`}
                />
              </button>
            </CustomTooltip>
          ))}

          <CustomTooltip title="Profile" placement="top" arrow>
            <button
              onClick={handleProfileMenu}
              className="p-2 rounded-full cursor-pointer bg-[#e6f4ff] hover:bg-indigo-100 hover:scale-105 transition-transform"
            >
              <ProfileIcon className="text-[18px] text-blue-700" />
            </button>
          </CustomTooltip>

          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={() => handleProfileMenu()}
          >
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
      ) : null}

      {showModal && (
        <UniversalAccountInfo
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
