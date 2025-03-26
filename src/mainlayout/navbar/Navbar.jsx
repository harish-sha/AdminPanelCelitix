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
import { fetchBalance } from "../../apis/settings/setting";
import { collapse } from "@material-tailwind/react";

const Navbar = ({ isCollapsed, setIsCollapsed }) => {
  const [showModal, setShowModal] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [balance, setBalance] = useState(0);

  const handleBalance = async () => {
    const res = await fetchBalance();
    setBalance(res.balance);
  };
  useEffect(() => {
    handleBalance();
  }, []);

  const toggleSidebar = useCallback(
    () => setIsCollapsed((prev) => !prev),
    [setIsCollapsed]
  );


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


  useEffect(() => {
    console.log("isCollapsed", isCollapsed);
  }, [isCollapsed]);

  return (
    <nav className="flex items-center w-full px-4 bg-white h-14 lg:h-16 md:h-15">
      <div className="flex items-center gap-4">
        {/* <button
          onClick={toggleSidebar}
          className="text-gray-700 cursor-pointer focus:outline-none"
        > */}
        {/* <FaBars /> */}
        {/* <label className="hamburger">
          <input type="checkbox" checked={!isCollapsed} onChange={(event) => { setIsCollapsed((prev) => !prev) }} />
          <svg viewBox="0 0 32 32">
            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label> */}
        <input className="toggle-checkbox" id="toggle" type="checkbox" checked={isCollapsed} onChange={(event) => { setIsCollapsed((prev) => !prev) }} />
        <label className="hamburger" htmlFor="toggle">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </label>

        {/* </button> */}
        {/* <span className="text-xl font-medium tracking-wider text-gray-800 lg:block">Celitix</span> */}
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
              title: balance,
              Icon: PaymentsIcon,
            },
            { title: "Wallet", Icon: WalletIcon },
            {
              title: "Downloads",
              Icon: DownloadIcon,
              action: handleViewDownload,
            },
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
            <button
              onClick={handleProfileMenu}
              className="p-2 rounded-full cursor-pointer bg-[#e6f4ff] hover:bg-gray-200"
            >
              <ProfileIcon className="text-xl text-blue-700" />
            </button>
          </CustomTooltip>

          {/* Profile Dropdown Menu */}
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={() => handleProfileMenu()}
          >
            {[
              {
                text: "Profile",
                icon: <AccountIcon />,
                action: handleViewProfile,
              },
              {
                text: "Login Details",
                icon: <IpAddress sx={{ fontSize: 26 }} />,
                action: handleLoginDetails,
              },
              {
                text: "Settings",
                icon: <SettingsIcon />,
                action: handleViewSetting,
              },
              {
                text: "Transaction History",
                icon: <HistoryIcon />,
                action: handleTransactionHistory,
              },
              { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
            ].map(({ text, icon, action }, idx) => (
              <MenuItem
                key={idx}
                sx={{ fontSize: "15px", fontWeight: "500" }}
                onClick={action}
              >
                {icon} <span className="ml-2">{text}</span>
              </MenuItem>
            ))}
          </Menu>
        </div>
      ) : (
        // ✅ Small Screen Dropdown
        <div className="ml-auto">
          <IconButton onClick={handleMenu} className="text-gray-700">
            {/* <MoreIcon /> */}
            <label className="hamburger">
              <input type="checkbox" checked={Boolean(menuAnchorEl)} onChange={(event) => (event?.currentTarget || null)} />
              <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </IconButton>

          {/* Small Screen Dropdown Menu */}
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={() => handleMenu()}
          >
            {[
              {
                text: "Info",
                icon: <InfoIcon />,
                action: () => setShowModal(true),
              },
              { text: "Balance", icon: <PaymentsIcon /> },
              { text: "Wallet", icon: <WalletIcon /> },
              { text: "Download", icon: <DownloadIcon /> },
              {
                text: "Profile",
                icon: <ProfileIcon />,
                action: handleViewProfile,
              },
              {
                text: "Login Details",
                icon: <IpAddress />,
                action: handleLoginDetails,
              },
              {
                text: "Settings",
                icon: <SettingsIcon />,
                action: handleViewSetting,
              },
              {
                text: "Transactions",
                icon: <HistoryIcon />,
                action: handleTransactionHistory,
              },
              { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
            ].map(({ text, icon, action }, idx) => (
              <MenuItem
                key={idx}
                sx={{ fontSize: "15px", fontWeight: "500" }}
                onClick={action}
              >
                <div>
                  {icon} <span className="ml-2">{text}</span>
                  {balance && text === "Balance" && (
                    <span className="ml-2 text-xs text-gray-500">
                      {balance}
                    </span>
                  )}
                </div>
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}

      {/* ✅ Account Info Modal */}
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
