import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, Menu, MenuItem, IconButton } from "@mui/material";
import { FaBars } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import UniversalAccountInfo from "../../profile/components/UniversalAccountInfo";
import CustomTooltip from "../../components/common/CustomTooltip";
import celitixLogo from "../../assets/images/celitix-cpaas-solution-logo.svg";
import { useUser } from "@/context/auth";

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
import { collapse } from "@material-tailwind/react";
import { useDownload } from "@/context/DownloadProvider";

const Navbar = ({ isCollapsed, setIsCollapsed }) => {
  const { authLogout, user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [balance, setBalance] = useState(0);
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);

  const { hasNewDownloads } = useDownload();

  // const handleBalance = async () => {
  //   const res = await fetchBalance();
  //   setBalance(res.balance);
  // };

  const handleBalance = async () => {
    setIsFetchingBalance(true);
    const res = await fetchBalance();
    setBalance(res.balance || 0);
    setTimeout(() => setIsFetchingBalance(false), 600);
  };

  // later change when route is set properly - may 10 - (start)

  // useEffect(() => {
  //   handleBalance();
  // }, []);

  useEffect(() => {
    if (user?.role === "AGENT") return;
    handleBalance();
  }, []);

  // later change when route is set properly - may 10 - (end)

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
    sessionStorage.removeItem("token");
    toast.success("Logged out successfully!");
    window.location.href = "/login";
    authLogout();
    // setTimeout(() => (window.location.href = "/login"), 1000);
  }, []);

  const handleMenu = useCallback(
    (event) => setMenuAnchorEl(event?.currentTarget || null),
    []
  );

  useEffect(() => {
    // console.log("isCollapsed", isCollapsed);
  }, [isCollapsed]);

  return (
    <nav className="flex items-center w-full px-4 bg-white h-14 lg:h-16 md:h-15">
      <div className="flex items-center gap-4">
        {/* <button
          onClick={toggleSidebar}
          className="text-gray-700 focus:outline-none cursor-pointer"
        > */}
        {/* <FaBars /> */}
        {/* <label className="hamburger">
          <input type="checkbox" checked={!isCollapsed} onChange={(event) => { setIsCollapsed((prev) => !prev) }} />
          <svg viewBox="0 0 32 32">
            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label> */}
        <input
          className="toggle-checkbox"
          id="toggle"
          type="checkbox"
          checked={isCollapsed}
          onChange={(event) => {
            setIsCollapsed((prev) => !prev);
          }}
        />
        <label className="hamburger" htmlFor="toggle">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </label>

        {/* </button> */}
        {/* <span className="text-xl font-medium tracking-wider text-gray-800 lg:block">Celitix</span> */}
        {/* <img src={celitixLogo} width={120} height={80} alt="Celitix Logo" /> */}
      </div>

      {!isMobile ? (
        <div className="flex gap-3 ml-auto">
          {[
            // {
            //   title: "Account Info",
            //   Icon: InfoIcon,
            //   action: () => setShowModal(true),
            // },
            // {
            //   title: `Balance: ₹${balance}`,
            //   Icon: isFetchingBalance ? LoopIcon : WalletIcon,
            //   action: handleBalance,
            //   showBalance: true,
            // },
            // {
            //   title: "Downloads",
            //   Icon: DownloadIcon,
            //   action: handleViewDownload,
            // },
            ...(user?.role !== "AGENT"
              ? [
                  {
                    title: "Account Info",
                    Icon: InfoIcon,
                    action: () => setShowModal(true),
                  },
                  {
                    title: `Balance: ₹${balance}`,
                    Icon: isFetchingBalance ? LoopIcon : WalletIcon,
                    action: handleBalance,
                    showBalance: true,
                  },
                  {
                    title: "Downloads",
                    Icon: DownloadIcon,
                    action: handleViewDownload,
                    customElement: (
                      <motion.div className="relative">
                        <CustomTooltip
                          title="Downloads"
                          placement="bottom"
                          arrow
                        >
                          <button
                            className={` group p-2 w-10 h-10 rounded-full overflow-hidden transition-all duration-300 ${
                              hasNewDownloads
                                ? "bg-green-100 hover:bg-green-200"
                                : "bg-[#e6f4ff] hover:bg-gray-200"
                            }`}
                            onClick={handleViewDownload}
                          >
                            {/* Icon container with fill animation */}
                            {hasNewDownloads ? (
                              <motion.div
                                animate={{ y: [0, 5, 0] }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              >
                                <DownloadIcon
                                  className={`text-[18px] ${
                                    hasNewDownloads
                                      ? "text-green-800"
                                      : "text-blue-700"
                                  }`}
                                />
                              </motion.div>
                            ) : (
                              <DownloadIcon
                                className={`text-[18px] ${
                                  hasNewDownloads
                                    ? "text-green-800"
                                    : "text-blue-700"
                                }`}
                              />
                            )}

                            {/* Water fill effect */}
                            {hasNewDownloads && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "100%" }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="absolute bottom-0 left-0 w-full bg-green-300 z-0 opacity-40"
                                style={{ borderRadius: "50%" }}
                              ></motion.div>
                            )}

                            {/* Floating label */}
                            {hasNewDownloads && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: -28 }}
                                transition={{ delay: 0.5 }}
                                className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 w-40 text-xs text-green-800 rounded-full shadow-md"
                              >
                                Download in progress...
                              </motion.div>
                            )}
                          </button>
                        </CustomTooltip>
                      </motion.div>
                    ),
                  },
                ]
              : []), // Exclude these items for "AGENT" role
          ].map(({ title, Icon, action, customElement }, idx) => (
            <div key={idx}>
              {customElement ? (
                customElement
              ) : (
                <CustomTooltip key={idx} title={title} placement="bottom" arrow>
                  {/* <button
                className="p-2 rounded-full cursor-pointer bg-[#e6f4ff] hover:bg-gray-200"
                onClick={action}
                >
                <Icon className="text-xl text-blue-700" />
                </button> */}
                  <button
                    className="relative p-2 rounded-full bg-[#e6f4ff] group overflow-hidden transition-all duration-300  hover:shadow-md cursor-pointer"
                    onClick={action}
                  >
                    <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 bg-indigo-200 transition-transform origin-bottom duration-300 z-0"></div>
                    <span className="relative z-10 text-blue-700">
                      {title.includes("Balance") && isFetchingBalance ? (
                        <LoopIcon className="text-[18px] animate-spin" />
                      ) : (
                        <Icon className="text-[18px]" />
                      )}
                    </span>
                  </button>
                </CustomTooltip>
              )}
            </div>
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
            PaperProps={{
              sx: {
                borderRadius: "15px",
                padding: "5px 0",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              },
              component: motion.div,
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              transition: { duration: 0.2 },
            }}
          >
            {[
              {
                text: "Profile",
                icon: <AccountIcon />,
                action: handleViewProfile,
              },
              // {
              //   text: "Login Details",
              //   icon: <IpAddress sx={{ fontSize: 26 }} />,
              //   action: handleLoginDetails,
              // },
              // {
              //   text: "Transaction History",
              //   icon: <HistoryIcon />,
              //   action: handleTransactionHistory,
              // },
              ...(user?.role !== "AGENT"
                ? [
                    {
                      text: "Login Details",
                      icon: <IpAddress sx={{ fontSize: 26 }} />,
                      action: handleLoginDetails,
                    },
                    {
                      text: "Transaction History",
                      icon: <HistoryIcon />,
                      action: handleTransactionHistory,
                    },
                  ]
                : []),
              {
                text: "Settings",
                icon: <SettingsIcon />,
                action: handleViewSetting,
              },
              { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
            ].map(({ text, icon, action }, idx) => (
              <MenuItem
                key={idx}
                sx={{
                  fontSize: "15px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  mx: 1,
                  gap: 0.5,
                  borderRadius: "8px",
                  borderBottom: "1px solid #e0e0e0",
                  marginBottom: "3px",
                  "&:hover": {
                    backgroundColor: "#e6f4ff",
                    color: "#1e3a8a",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.09)",
                    scale: 1.01,
                    transition: "all 0.2s ease-in",
                  },
                }}
                onClick={action}
              >
                {icon} <span className="ml-2">{text}</span>
              </MenuItem>
            ))}
          </Menu>
        </div>
      ) : (
        <div className="ml-auto">
          <IconButton onClick={handleMenu} className="text-gray-700">
            {/* <MoreIcon /> */}
            <label className="hamburger">
              <input
                type="checkbox"
                checked={Boolean(menuAnchorEl)}
                onChange={(event) => event?.currentTarget || null}
              />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </IconButton>

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
              // { text: "Balance", icon: <PaymentsIcon /> },
              { text: "Balance", icon: <WalletIcon /> },
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
