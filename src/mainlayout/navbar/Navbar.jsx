import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery, Menu, MenuItem, IconButton } from "@mui/material";
import { FaBars } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";

import UniversalAccountInfo from "../../profile/components/UniversalAccountInfo";
import CustomTooltip from "../../components/common/CustomTooltip";
import celitixLogo from "../../assets/images/celitix-cpaas-solution-logo.svg";
import { useUser } from "@/context/auth";
// import { FiAlertCircle } from "react-icons/fi";
import { FiAlertCircle, FiMessageSquare, FiSmartphone, FiSend } from "react-icons/fi";
import moment from "moment";

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
import { fetchBalance, fetchIpDetails } from "../../apis/settings/setting";
import { collapse } from "@material-tailwind/react";
import { useDownload } from "@/context/DownloadProvider";
import { getaccountInfo } from "@/apis/user/user";
import { Dialog } from "primereact/dialog";

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
    setTimeout(() => authLogout(), 1000);
    // authLogout();
    // setTimeout(() => (window.location.href = "/login"), 1000);
  }, []);

  const handleMenu = useCallback(
    (event) => setMenuAnchorEl(event?.currentTarget || null),
    []
  );

  useEffect(() => {
    // console.log("isCollapsed", isCollapsed);
  }, [isCollapsed]);

  const [ipDetails, setIpDetails] = useState([]);

  useEffect(() => {
    const IpDetails = async () => {
      const response = await fetchIpDetails();
      setIpDetails(response[0]);
    };
    IpDetails();
  }, []);



  return (
    <nav className="flex items-center w-full px-4 bg-white h-14 lg:h-16 md:h-15">
      <div className="flex items-center gap-4">
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
          <div className="bar bg-black"></div>
          <div className="bar bg-black"></div>
          <div className="bar bg-black"></div>
        </label>

        {/* </button> */}
        {/* <span className="text-xl font-medium tracking-wider text-gray-800 lg:block">Celitix</span> */}
        <img src={celitixLogo} width={120} height={80} alt="Celitix Logo" />
      </div>

      {!isMobile ? (
        <div className="flex gap-3 items-center ml-auto">
          {/* NAVBAR RIGHT CLUSTER */}
          <div className="flex items-center gap-3">

            {/* API Docs animated card/button */}
            <motion.div
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group rounded-lg p-[1px] bg-gradient-to-r from-emerald-400/70 via-sky-400/70 to-fuchsia-400/70
               hover:from-emerald-500 via-sky-500 hover:to-fuchsia-500 transition-colors duration-200"
            >
              <Link
                to="/docs/quickstart" // change to your route, e.g. "/api-docs" or external link
                className="flex items-center gap-2 rounded-[10px] bg-white/90 px-3 py-1.5 text-sm
                 backdrop-blur dark:bg-gray-900/80 dark:text-gray-100"
                aria-label="Open API Documentation"
              >
                {/* Icon bubble */}
                <motion.div
                  className="flex h-7 w-7 items-center justify-center rounded-md text-white
                   dark:bg-white dark:text-gray-900"
                  initial={false}
                  animate={{ rotate: 0 }}
                  whileHover={{ rotate: 8 }}
                  transition={{ type: "spring", stiffness: 240, damping: 16 }}
                >
                  <BookOpen className="h-4 w-4 text-green-500" aria-hidden="true" />
                </motion.div>

                {/* Texts */}
                <div className="flex min-w-0 flex-col">
                  <span className="font-medium hover:font-semibold text-[13px] transition-all duration-200">API Docs</span>
                  {/* <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-none">
                    REST, Webhooks & Guides
                  </span> */}
                </div>

                {/* Chevron/External icon */}
                <motion.div
                  className="ml-1"
                  initial={{ x: 0, opacity: 0.7 }}
                  whileHover={{ x: 3, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                >
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200" />
                </motion.div>
              </Link>
            </motion.div>
          </div>

          <div className="group relative">
            <div
              className="flex items-center gap-2 rounded-md border border-gray-200 bg-blue-50 px-2.5 py-1 text-[11px] leading-none text-gray-700
               dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 tracking-wide h-10"
              aria-describedby="last-login-tooltip"
            >
              <div className="flex flex-col gap-1">
                <div>
                  <span className="text-gray-400 dark:text-gray-500">•</span>&nbsp;
                  <span className="font-semibold">User&nbsp;ID : </span>
                  <span className="font-mono tabular-nums">{ipDetails?.user_id || "-"}</span>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-gray-500">•</span>&nbsp;
                  <span className="font-semibold ">Current&nbsp;Login IP : </span>
                  <span className="font-mono tabular-nums">{ipDetails?.ip || "-"}</span>
                </div>
              </div>
            </div>

            {/* <div
              id="last-login-tooltip"
              role="tooltip"
              className="pointer-events-none absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md
               bg-black px-2 py-1 text-[10px] text-white opacity-0 shadow-md transition-opacity duration-150
               group-hover:opacity-100 tracking-wider"
            >
              {ipDetails?.insert_time ? `Last activity: ${ipDetails.insert_time}` : "No timestamp available"}
              <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black" />
            </div> */}
          </div>
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
                          className={` group p-2 w-10 h-10 rounded-full overflow-hidden transition-all duration-300 ${hasNewDownloads
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
                                className={`text-[18px] ${hasNewDownloads
                                  ? "text-green-800"
                                  : "text-blue-700"
                                  }`}
                              />
                            </motion.div>
                          ) : (
                            <DownloadIcon
                              className={`text-[18px] ${hasNewDownloads
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
                  // {
                  //   text: "Transaction History",
                  //   icon: <HistoryIcon />,
                  //   action: handleTransactionHistory,
                  // },
                  {
                    text: "Settings",
                    icon: <SettingsIcon />,
                    action: handleViewSetting,
                  },
                ]
                : []),
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
            sx={{
              "& .MuiPaper-root": { borderRadius: "15px", padding: "5px 0", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" },
              "MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-urgdh2-MuiButtonBase-root-MuiMenuItem-root": {
                "&:hover": { backgroundColor: "#e6f4ff", color: "#1e3a8a", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.09)", scale: 1.01, transition: "all 0.2s ease-in", borderBottom: "1px solid #e0e0e0", marginBottom: "3px" },
              }
            }}
            PaperProps={{
              component: motion.div, initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 }
            }}
          >
            {[
              {
                text: "Info",
                icon: <InfoIcon />,
                action: () => setShowModal(true),
              },
              // { text: "Balance", icon: <PaymentsIcon /> },
              { text: "Balance", icon: <WalletIcon /> },
              { text: "Download", icon: <DownloadIcon />, action: handleViewDownload },
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
                onClick={() => {
                  handleMenu();        // closes the menu
                  action?.();          // run action if defined
                }}
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
