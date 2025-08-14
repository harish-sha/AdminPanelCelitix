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
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  FaPhoneSlash,
  FaCode,
  FaUsers,
  FaQuestionCircle,
  FaMobileAlt,
  FaRegCommentDots,
} from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { MdOutlineRocketLaunch } from "react-icons/md";

import { useTheme } from "../../context/ThemeContext";
import { themeColors } from "../../themeColors";

const DocsSidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobile,
  closeMobileSidebar,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openTooltips, setOpenTooltips] = useState({});
  const [collapseAnimationDone, setCollapseAnimationDone] = useState(
    !isCollapsed
  );
  const location = useLocation();
  const dropdownRefs = useRef({});
  const { isDarkMode } = useTheme();

  const colors = themeColors(isDarkMode);

  const toggleSidebar = () => {
    if (!isCollapsed) {
      setOpenDropdown(null);
    }
    setIsCollapsed((prev) => !prev);
  };

  const handleTooltipOpen = (key) => {
    setOpenTooltips((prev) => ({ ...prev, [key]: true }));
  };

  const handleTooltipClose = (key) => {
    setOpenTooltips((prev) => ({ ...prev, [key]: false }));
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
    // if (isMobile && closeMobileSidebar) {
    //     closeMobileSidebar(); // close sidebar on click (optional)
    //   }

    if (isCollapsed) {
      setIsCollapsed(false);
      return;
    }
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleSingleRouteClick = () => {
    if (isMobile) setIsCollapsed(true);
  };

  const isActiveRoute = (route) => {
    if (route === "/docs") {
      return location.pathname === "/docs";
    }
    return location.pathname.startsWith(route);
  };

  const collapsedClass = isCollapsed
    ? "justify-center px-0 "
    : "justify-start px-4 ";

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
      icon: <FaRegCommentDots />,
      label: "RCS",
      type: "dropdown",
      links: [
        { to: "rcs", label: "Introduction" },
        { to: "submit-template-rcs", label: "Submit Template" },
        { to: "update-template-rcs", label: "Update Template" },
        { to: "manage-template-rcs", label: "Manage Template" },
        { to: "delete-template-rcs", label: "Delete Template" },

      ],
    },
    {
      name: "Whatsapp",
      icon: <FaWhatsapp />,
      label: "Whatsapp",
      type: "dropdown",
      links: [
        { to: "whatsapp", label: "Introduction" },
        { to: "submit-template-whatsapp", label: "Submit Template" },
        { to: "send-template-whatsapp", label: "Send Template" },
        { to: "send-message-whatsapp", label: "Send Message" },
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
        { to: "update-template-sms", label: "Update Template" },
        { to: "delete-template-sms", label: "Delete Template" },
      ],
    },
    {
      name: "Twowaysms",
      icon: <LuMessageSquareMore />,
      label: "Two Way Sms",
      type: "dropdown",
      links: [
        { to: "twowaysms", label: "Introduction" },
        { to: "submit-template-twowaysms", label: "Submit Template" },
        { to: "update-template-twowaysms", label: "Update Template" },
        { to: "delete-template-twowaysms", label: "Delete Template" },
      ],
    },
    {
      name: "Authentication",
      icon: <MdOutlineLock />,
      label: "Authentication",
      type: "dropdown",
      links: [
        { to: "authentication", label: "Introduction" },
        { to: "submit-template-authentication", label: "Submit Template" },
        { to: "update-template-authentication", label: "Update Template" },
        { to: "delete-template-authentication", label: "Delete Template" },
      ],
    },
    {
      name: "Outbound",
      icon: <LuMessageSquareMore />,
      label: "Outbound",
      type: "dropdown",
      links: [
        { to: "outbound", label: "Introduction" },
        { to: "submit-template-outbound", label: "Submit Template" },
        { to: "update-template-outbound", label: "Update Template" },
        { to: "delete-template-outbound", label: "Delete Template" },
      ],
    },
    {
      name: "Inbound",
      icon: <LuMessageSquareMore />,
      label: "Inbound",
      type: "dropdown",
      links: [
        { to: "inbound", label: "Introduction" },
        { to: "submit-template-inbound", label: "Submit Template" },
        { to: "update-template-inbound", label: "Update Template" },
        { to: "delete-template-inbound", label: "Delete Template" },
      ],
    },
    {
      name: "Missedcall",
      icon: <FaPhoneSlash />,
      label: "Missed Call",
      type: "dropdown",
      links: [
        { to: "missedcall", label: "Introduction" },
        { to: "submit-template-missedcall", label: "Submit Template" },
        { to: "update-template-missedcall", label: "Update Template" },
        { to: "delete-template-missedcall", label: "Delete Template" },
      ],
    },
    {
      name: "Clicktwocall",
      icon: <FaMobileAlt />,
      label: "Click-2-call",
      type: "dropdown",
      links: [
        { to: "clicktwocall", label: "Introduction" },
        { to: "submit-template-clicktwocall", label: "Submit Template" },
        { to: "update-template-clicktwocall", label: "Update Template" },
        { to: "delete-template-clicktwocall", label: "Delete Template" },
      ],
    },

    {
      name: "Cookbook",
      icon: <FaCode />,
      label: "Cookbook",
      type: "single",
      to: "cookbook",
    },
    {
      name: "Forum",
      icon: <FaUsers />,
      label: "Forum",
      type: "single",
      to: "forum",
    },
    {
      name: "Help",
      icon: <FaQuestionCircle />,
      label: "Help",
      type: "single",
      to: "help",
    },
    {
      name: "Back2Home",
      icon: <FaHome />,
      label: "Back 2 Home",
      type: "single",
      to: "/",
    },
  ];

  return (
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
        } h-screen px-0 pt-3 flex flex-col fixed left-0 overflow-y-auto overflow-x-hidden z-9 ${isCollapsed ? "items-center" : "space-y-0"
        }`}
      style={{ maxHeight: "calc(100vh - 3.5rem)" }}
    >
      <nav
        className={clsx(
          `mt-1 ${isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-gray-800"
          }`
        )}
      >

        {menuItems.map((item) =>
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
              <motion.div
                onClick={() => handleDropdownClick(item.name)}
                className={`  flex items-center py-2 w-full cursor-pointer hover:bg-[#585656ec] text-left hover:text-gray-800 transition-all duration-300 ${collapsedClass} ${isActiveRoute(`/${item.name}`) ? "bg-[#6b728075]" : ""
                  }`}
              >
                <span className={` ${colors.textPrimary}  flex-shrink-0`}>{item.icon}</span>
                <motion.span
                  animate={{ opacity: isCollapsed ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                  className={`overflow-hidden whitespace-nowrap font-semibold ml-2 ${colors.textPrimary}  ${isCollapsed ? "w-0" : "w-auto"
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

              {/*Dropdown Content */}
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
                {item.links.map((link) => (
                  <React.Fragment key={link.to}>
                    <Link
                      to={`/docs/${link.to}`}
                      onClick={handleSingleRouteClick}
                      className={` block px-4 py-2.5 text-sm hover:bg-[#585656ec] hover:text-gray-100 transition-all duration-300 ${isActiveRoute(`/docs/${link.to}`)
                          ? isDarkMode
                            ? "bg-[#7E7F80] text-white"
                            : "bg-[#605F5F]"
                          : isDarkMode
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                    >
                      {/* <FiberManualRecordIcon
                      className={`${colors.textPrimary}`}
                        sx={{
                          color: isActiveRoute(`/docs/${link.to}`)
                            ? "text-gray-300"
                            : "black",
                          fontSize: "10px",
                          marginRight: "10px",
                        }}
                      /> */}
                      <span
                        className={`font-[500]  ml-6 ${isActiveRoute(`/docs/${link.to}`)
                            ? "text-white"
                            : "text-gray-900"
                          }  ${colors.textPrimary}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                    <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                  </React.Fragment>
                ))}
              </motion.div>
            </Tooltip>
          ) : (
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
                  className={`flex items-center gap-4 px-4 py-2 transition-all w-full text-left cursor-pointer text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 ${isCollapsed ? "justify-center" : ""
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
                  onClick={handleSingleRouteClick(null)}
                  className={`flex items-center gap-0  py-2 w-full  hover:bg-[#585656ec] hover:text-gray-100 transition-all duration-300 ${collapsedClass} ${isActiveRoute(`/docs/${item.to}`)
                      ? "bg-[#585656ec] text-gray-100"
                      : ""
                    }`}
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
