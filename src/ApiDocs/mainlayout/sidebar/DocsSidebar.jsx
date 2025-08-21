import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaCog,
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaWhatsapp,
} from "react-icons/fa";
import { MdExpandLess, MdExpandMore, MdOutlineEmail } from "react-icons/md";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import { SiGoogleauthenticator } from "react-icons/si";
import { LuMessageSquareMore } from "react-icons/lu";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import toast from "react-hot-toast";
import { SiGoogledocs } from "react-icons/si";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useUser } from "@/context/auth";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { useTheme } from "@/ApiDocs/context/ThemeContext";
import { themeColors } from "../../themeColors";
import rcsicon from "@/assets/icons/RCS02.svg";
import twoway from "@/assets/icons/TWOWAY.svg";
import callback from "@/assets/icons/Callback02.svg";
import missedcall from "@/assets/icons/Missedcall2.svg";
import obd from "@/assets/icons/OBD02.svg";
import ibd from "@/assets/icons/IBD02.svg";
import numberlookup from "@/assets/icons/Numberlookup.svg";
import clicktwocall from "@/assets/icons/Click2Call02.svg";
import { IoHelpCircleOutline } from "react-icons/io5";
import { TbMessages } from "react-icons/tb";
import { FaRegMessage } from "react-icons/fa6";
import { MdPhoneMissed } from "react-icons/md";
import { VscCallOutgoing } from "react-icons/vsc";
import { VscCallIncoming } from "react-icons/vsc";
import { MdOutlineTouchApp } from "react-icons/md";

const DocsSidebar = ({ isCollapsed, setIsCollapsed, isMobile }) => {
  const { user } = useUser();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [collapseAnimationDone, setCollapseAnimationDone] = useState(
    !isCollapsed
  );
  const dropdownRefs = useRef({});

  const collapsedClass = isCollapsed
    ? "justify-center px-0 "
    : "justify-start px-4 ";
  const [openTooltips, setOpenTooltips] = useState({});
  const navigate = useNavigate();

  const toggleSidebar = () => {
    if (!isCollapsed) setOpenDropdown(null);
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    if (!isCollapsed) {
      setOpenTooltips({});
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (isCollapsed) {
      setOpenDropdown(null);
    }
  }, [isCollapsed]);

  const handleDropdownClick = (dropdownName) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      return;
    }
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  // const isActiveRoute = (route) => location.pathname.startsWith(route);
  const handleTooltipOpen = (key) =>
    setOpenTooltips((s) => ({ ...s, [key]: true }));
  const handleTooltipClose = (key) =>
    setOpenTooltips((s) => ({ ...s, [key]: false }));

  const isActiveRoute = (route) => {
    const updatedRoute = route.replace(/^\/docs/, "");

    if (route === "/") {
      return location.pathname === "/";
    }
    const removedDocsPathName = location.pathname.replace(/^\/docs\/?/, "");
    return removedDocsPathName.startsWith(updatedRoute);
  };
  // const navigate = useNavigate();
  // const handleLogout = () => {
  //     localStorage.removeItem("token");
  //     toast.success("Logged out successfully!");
  //     // window.location.href = "/login";
  //     setTimeout(() => {
  //         window.location.href = "/login";
  //     }, 1000)
  // };

  useEffect(() => {
    const activeMenu = menuItems.find((item) =>
      item.links?.some((link) => isActiveRoute(link.to))
    );

    if (activeMenu) {
      setOpenDropdown(activeMenu.name);
    } else {
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  const handleSingleRouteClick = () => {
    if (isMobile) setIsCollapsed(true);
  };

  const { isDarkMode } = useTheme();

  const colors = themeColors(isDarkMode);
  const menuItems = [
    {
      name: "Quickstart",
      icon: <MdOutlineRocketLaunch />,
      label: "Quickstart",
      type: "single",
      to: "quickstart",
    },
    {
      name: "RCS",
      icon: <FaRegMessage />,
      label: "RCS",
      type: "dropdown",
      links: [
        { to: "rcs", label: "Introduction" },
        { to: "submit-template-rcs", label: "Submit Template" },
        // { to: "update-template-rcs", label: "Update Template" },
        // { to: "manage-template-rcs", label: "Manage Template" },
        // { to: "delete-template-rcs", label: "Delete Template" },
      ],
    },
    {
      name: "Whatsapp",
      icon: <FaWhatsapp />,
      label: "Whatsapp",
      type: "dropdown",
      links: [
        { to: "whatsapp", label: "Introduction" },
        { to: "send-messages-whatsapp", label: "Send Message" },
        { to: "submit-template-whatsapp", label: "Submit Template old" },
        // { to: "send-template-whatsapp", label: "Send Template old" },
        // { to: "send-message-whatsapp", label: "Send Message" },
      ],
    },
    {
      name: "Sms",
      icon: <LuMessageSquareMore />,
      label: "Sms",
      type: "dropdown",
      links: [
        { to: "sms", label: "Introduction" },
        { to: "submit-template-sms", label: "Submit Template" },
        // { to: "update-template-sms", label: "Update Template" },
        // { to: "delete-template-sms", label: "Delete Template" },
      ],
    },
    {
      name: "Twowaysms",
      icon: <TbMessages />,
      label: "Two Way Sms",
      type: "dropdown",
      links: [
        // { to: "twowaysms", label: "Introduction" },
        // { to: "submit-template-twowaysms", label: "Submit Template" },
        // { to: "update-template-twowaysms", label: "Update Template" },
        // { to: "delete-template-twowaysms", label: "Delete Template" },
      ],
    },
    {
      name: "Authentication",
      icon: <SiGoogleauthenticator />,
      label: "Authentication",
      type: "dropdown",
      links: [
        // { to: "authentication", label: "Introduction" },
        // { to: "submit-template-authentication", label: "Submit Template" },
        // { to: "update-template-authentication", label: "Update Template" },
        // { to: "delete-template-authentication", label: "Delete Template" },
      ],
    },
    {
      name: "Outbound",
      icon: <VscCallOutgoing />,
      label: "Outbound",
      type: "dropdown",
      links: [
        { to: "outbound", label: "Introduction" },
        { to: "submit-template-outbound", label: "Submit Template" },
        // { to: "update-template-outbound", label: "Update Template" },
        // { to: "delete-template-outbound", label: "Delete Template" },
      ],
    },
    {
      name: "Inbound",
      icon: <VscCallIncoming />,
      label: "Inbound",
      type: "dropdown",
      links: [
        // { to: "inbound", label: "Introduction" },
        // { to: "submit-template-inbound", label: "Submit Template" },
        // { to: "update-template-inbound", label: "Update Template" },
        // { to: "delete-template-inbound", label: "Delete Template" },
      ],
    },
    {
      name: "Missedcall",
      icon: <MdPhoneMissed />,
      label: "Missed Call",
      type: "dropdown",
      links: [
        // { to: "missedcall", label: "Introduction" },
        // { to: "submit-template-missedcall", label: "Submit Template" },
        // { to: "update-template-missedcall", label: "Update Template" },
        // { to: "delete-template-missedcall", label: "Delete Template" },
      ],
    },
    {
      name: "Clicktwocall",
      icon: <MdOutlineTouchApp />,
      label: "Click-2-call",
      type: "dropdown",
      links: [
        // { to: "clicktwocall", label: "Introduction" },
        // { to: "submit-template-clicktwocall", label: "Submit Template" },
        // { to: "update-template-clicktwocall", label: "Update Template" },
        // { to: "delete-template-clicktwocall", label: "Delete Template" },
      ],
    },
    // {
    //   name: "Cookbook",
    //   //   icon: <FaCode />,
    //   label: "Cookbook",
    //   type: "single",
    //   to: "cookbook",
    // },
    // {
    //   name: "Forum",
    //   //   icon: <FaUsers />,
    //   label: "Forum",
    //   type: "single",
    //   to: "forum",
    // },
    // {
    //   name: "Help",
    //   icon: <IoHelpCircleOutline />,
    //   label: "Help",
    //   type: "single",
    //   to: "help",
    // },
    {
      name: "Back2Home",
      icon: <FaHome />,
      label: "Dashboard",
      type: "single",
      to: "/",
    },
  ];

  const getFilteredMenuItems = (items, userState) => {
    return items;
  };

  const filteredItems = getFilteredMenuItems(menuItems, user);

  return (
    // <div
    //     className={clsx(
    //         "h-screen  bg-white text-white px-0 flex flex-col fixed top-14 left-0 transition-all duration-300 overflow-y-auto",
    //         isCollapsed ? "w-16" : "w-64"
    //     )}
    //     style={{ maxHeight: "calc(100vh - 3.5rem)" }}
    // >
    //     <div className="flex items-center justify-between px-4 py-2 h-9">
    //         <span className={clsx('text-xl font-medium tracking-wider text-gray-800', isCollapsed && 'hidden')}>
    //             Celitix
    //         </span>
    //         <button
    //             onClick={toggleSidebar}
    //             className={clsx("text-gray-700 focus:outline-none", isCollapsed ? "ml-2" : "ml-0")}
    //         >
    //             <FaBars />
    //         </button>
    //     </div>

    //     <nav className="mt-1">
    //         {menuItems.map((item) => (
    //             item.type === "dropdown" ? (
    //                 <Tooltip
    //                     key={item.name}
    //                     title={item.label}
    //                     placement="right"
    //                     arrow
    //                     disableHoverListener={!isCollapsed}
    //                 >
    //                     <div>
    //                         <button
    //                             onClick={() => handleDropdownClick(item.name)}
    //                             className={clsx(
    //                                 'flex items-center justify-between w-full px-4 cursor-pointer py-2  hover:bg-[#e6f4ff] transition-all text-left',
    //                                 isActiveRoute(`/${item.name}`) && 'bg-[#6b728075]',
    //                                 isCollapsed && 'justify-center'
    //                             )}
    //                         >
    //                             <div className="flex items-center gap-4 h-6">
    //                                 <span className="flex-shrink-0 text-black">{item.icon}</span>
    //                                 <span className={clsx(isCollapsed && 'hidden', 'text-black font-[600] ')}>
    //                                     {item.label}
    //                                 </span>
    //                             </div>
    //                             <div className={clsx(isCollapsed && '', 'text-gray-800')}>
    //                                 {!isCollapsed && (openDropdown === item.name ? <MdExpandLess /> : <MdExpandMore />)}
    //                             </div>
    //                         </button>

    //                         {/* ✅ Dropdown Content */}
    //                         <div
    //                             ref={(el) => (dropdownRefs[item.name] = el)}
    //                             style={{
    //                                 maxHeight: openDropdown === item.name ? `${dropdownRefs[item.name]?.scrollHeight}px` : "0px",
    //                                 transition: "max-height 0.2s ease-in",
    //                             }}
    //                             className="overflow-hidden"
    //                         >
    //                             {item.links.map((link) => (
    //                                 <React.Fragment key={link.to}>
    //                                     <Link
    //                                         to={link.to}
    //                                         className={`block px-4 py-2.5 text-sm hover:bg-[#e6f4ff] transition-all duration-300 ${isActiveRoute(link.to) ? 'bg-[#e6f4ff] text-blue-800' : 'text-gray-800'}`}
    //                                     >
    //                                         <FiberManualRecordIcon
    //                                             sx={{
    //                                                 color: isActiveRoute(link.to) ? 'blue' : 'black',
    //                                                 fontSize: '10px',
    //                                                 marginRight: '10px',
    //                                             }}
    //                                         />
    //                                         <span className={`font-[600] ${isActiveRoute(link.to) ? 'text-blue-800' : 'text-gray-800'}`}>
    //                                             {link.label}
    //                                         </span>
    //                                     </Link>
    //                                     <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
    //                                 </React.Fragment>
    //                             ))}
    //                         </div>
    //                     </div>
    //                 </Tooltip>
    //             ) : (
    //                 <Tooltip key={item.name} title={isCollapsed ? item.label : ""} placement="right" arrow>
    //                     {item.onClick ? (
    //                         <button
    //                             onClick={item.onClick}
    //                             className={clsx(
    //                                 "flex items-center gap-4 px-4 py-2 transition-all w-full text-left cursor-pointer",
    //                                 "text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800",
    //                                 isCollapsed && "justify-center"
    //                             )}
    //                         >
    //                             <span className="flex-shrink-0">{item.icon}</span>
    //                             <span className={clsx(isCollapsed && "hidden", "font-[600]")}>{item.label}</span>
    //                         </button>
    //                     ) : (
    //                         <Link
    //                             to={item.to}
    //                             className={clsx(
    //                                 "flex items-center gap-4 px-4 py-2 transition-all",
    //                                 isActiveRoute(item.to) ? "bg-[#e6f4ff] text-blue-800" : "text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800",
    //                                 isCollapsed && "justify-center"
    //                             )}
    //                         >
    //                             <span className="flex-shrink-0">{item.icon}</span>
    //                             <span className={clsx(isCollapsed && "hidden", "font-[600]")}>{item.label}</span>
    //                         </Link>
    //                     )}
    //                 </Tooltip>
    //             )
    //         ))}
    //     </nav>

    // </div>

    <motion.div
      layout
      initial={{ x: isMobile ? -240 : 0, width: isCollapsed ? 64 : 240 }}
      animate={{
        x: isMobile ? (isCollapsed ? -240 : 0) : 0,
        width: isCollapsed ? 64 : 240,
      }}
      transition={{ type: "tween", stiffness: 260, damping: 30 }}
      onAnimationStart={() => {
        if (isCollapsed) setCollapseAnimationDone(false);
      }}
      onAnimationComplete={() => {
        setCollapseAnimationDone(!isCollapsed);
      }}
      className={`mainsidebar ${isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-gray-800"
        }h-screen text-white  popf px-0 pt-3 flex flex-col fixed  left-0 overflow-y-auto overflow-x-hidden z-9  {isCollapsed ? "items-center" : "space-y-0"
        }`}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      <nav
        className={clsx(
          `mt-1 ${isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-gray-800"
          }`
        )}
      >
        {filteredItems.map((item) =>
          item.type === "dropdown" ? (
            <Tooltip
              key={item.name}
              title={item.label}
              placement="right"
              arrow
              open={isCollapsed ? openTooltips[item.name] : false}
              onOpen={() => handleTooltipOpen(item.name)}
              onClose={() => handleTooltipClose(item.name)}
              disableHoverListener={!isCollapsed}
              disableFocusListener={!isCollapsed}
              disableTouchListener={!isCollapsed}
            >
              <div>
                {/* Dropdown header */}
                <motion.div
                  onClick={() => handleDropdownClick(item.name)}
                  className={`${colors.textPrimary}
    group flex items-center py-2 w-full cursor-pointer
    hover:bg-[#585656ec] text-left text-gray-800 hover:text-gray-100
    transition-all duration-300 ${collapsedClass} 
    ${isActiveRoute(`/${item.name}`) ? "bg-[#585656ec]" : ""}`}
                >
                  <span
                    className={`flex-shrink-0 transition-colors duration-300 
      ${isActiveRoute(`/${item.name}`) ? "text-gray-100" : ""}
      group-hover:text-gray-100`}
                  >
                    {item.icon}
                  </span>

                  <motion.span
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                    className={`overflow-hidden whitespace-nowrap font-semibold ml-2 ${isCollapsed ? "w-0" : "w-auto"
                      }`}
                  >
                    {item.label}
                  </motion.span>

                  {!isCollapsed && (
                    <div
                      className={`ml-auto transition-transform duration-300 ${openDropdown === item.name ? "rotate-180" : "rotate-0"
                        }`}
                    >
                      {openDropdown === item.name ? (
                        <MdExpandLess />
                      ) : (
                        <MdExpandMore />
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Dropdown content */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height:
                      openDropdown === item.name
                        ? dropdownRefs[item.name]?.scrollHeight
                        : 0,
                    opacity: openDropdown === item.name ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                  ref={(el) => (dropdownRefs[item.name] = el)}
                >
                  {item.links.map((link) => {
                    if (link.isHide) return null;
                    const isActive = isActiveRoute(link.to);
                    return (
                      <React.Fragment key={link.to}>
                        <Link
                          to={`/docs/${link.to}`}
                          onClick={handleSingleRouteClick}
                          className={`block px-4 py-2.5 text-sm
    hover:bg-[#585656ec] hover:text-gray-100 transition-all duration-300
    ${isActiveRoute(link.to)
                              ? "bg-[#585656ec] text-white"
                              : isDarkMode
                                ? "text-white"
                                : "text-gray-800"
                            }`}
                        >
                          <FiberManualRecordIcon
                            sx={{
                              fontSize: "10px",
                              marginRight: "10px",
                              color: isActiveRoute(link.to)
                                ? "#ffffff"
                                : isDarkMode
                                  ? "#ffffff"
                                  : "",
                            }}
                          />
                          {link.label}
                        </Link>
                        <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                      </React.Fragment>
                    );
                  })}
                </motion.div>
              </div>
            </Tooltip>
          ) : (
            // SINGLE LINK
            <Tooltip
              key={item.name}
              title={isCollapsed ? item.label : ""}
              placement="right"
              arrow
              open={isCollapsed ? openTooltips[item.name] : false}
              onOpen={() => handleTooltipOpen(item.name)}
              onClose={() => handleTooltipClose(item.name)}
              disableHoverListener={!isCollapsed}
              disableFocusListener={!isCollapsed}
              disableTouchListener={!isCollapsed}
            >
              {item.onClick ? (
                <motion.div
                  onClick={() => {
                    item.onClick();
                    handleSingleRouteClick();
                  }}
                  className={`flex items-center gap-4 px-4 py-2 transition-all w-full text-left cursor-pointer text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 ${isCollapsed ? "justify-center " : ""
                    }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className={`${isCollapsed ? "hidden" : ""} font-[600]`}>
                    {item.label}
                  </span>
                </motion.div>
              ) : (
                <Link
                  to={item.to}
                  onClick={handleSingleRouteClick}
                  className={`flex items-center gap-0 py-2 w-full
    hover:bg-[#585656ec] hover:text-gray-100 transition-all duration-300
    ${collapsedClass}
    ${isActiveRoute(item.to) ? "bg-[#585656ec] text-white" : ""}`}
                >
                  <span className="flex-shrink-0 text-lg">{item.icon}</span>
                  <motion.span
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                    className={`whitespace-nowrap font-semibold ${isCollapsed ? "w-0 overflow-hidden" : "w-auto ml-2"
                      }`}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              )}
            </Tooltip>
          )
        )}
      </nav>
    </motion.div>
  );
};

export default DocsSidebar;
