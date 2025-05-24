import React, { useState, useRef, useEffect } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { MdExpandLess, MdExpandMore, MdOutlineEmail } from "react-icons/md";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaWhatsapp } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { SiGoogleauthenticator } from "react-icons/si";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import rcsicon from "../../assets/icons/RCS02.svg";
import twoway from "../../assets/icons/TWOWAY.svg";
import callback from "../../assets/icons/Callback02.svg";
import missedcall from "../../assets/icons/Missedcall2.svg";
import obd from "../../assets/icons/OBD02.svg";
import ibd from "../../assets/icons/IBD02.svg";
import numberlookup from "../../assets/icons/Numberlookup.svg";
import clicktwocall from "../../assets/icons/Click2Call02.svg";
import { LuWandSparkles } from "react-icons/lu";

import { useUser } from "@/context/auth";
import { all } from "axios";
import { userItems } from "./user";
import { resellerItems } from "./reseller";

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobile }) => {
  const { user } = useUser();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [collapseAnimationDone, setCollapseAnimationDone] = useState(
    !isCollapsed
  );

  const location = useLocation();
  const [openTooltips, setOpenTooltips] = useState({});
  const dropdownRefs = useRef({});
  const navigate = useNavigate();

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
    if (route === "/") {
      return location.pathname === "/";
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

  const menuItems = user?.role === "RESELLERUSER" ? userItems : resellerItems;
  // const menuItems = [];

  const getFilteredMenuItems = (menuItems = [], userState) => {
    if (userState.role === "AGENT") {
      return [
        {
          id: "",
          name: "Home",
          icon: <FaHome />,
          label: "Home",
          type: "single",
          to: "/",
        },
        {
          id: "",
          name: "WhatsApp Live Chat",
          icon: <FaWhatsapp />,
          label: "Home",
          type: "single",
          to: "/wlivechat",
        },
      ];
    }
    if (userState.role === "RESELLER") {
      return menuItems;
    }

    const alwaysIncludeNames = [
      "Home",
      "apiDocs",
      "CallBack",
      "Managecontacts",
    ];

    const allowedServices = menuItems.map((item) => {
      if (alwaysIncludeNames.includes(item.name)) {
        return item;
      }
      const hasMatch = userState.services.some(
        (service) => service.service_type_id == item.id
      );

      return {
        ...item,
        links: hasMatch ? item.links : [],
      };
    });

    return allowedServices;
  };

  const filteredItems = getFilteredMenuItems(menuItems, user);

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
      className={`mainsidebar h-screen bg-white text-white popf px-0 pt-3 flex flex-col fixed  left-0 overflow-y-auto overflow-x-hidden z-9  
        ${isCollapsed ? "items-center " : "space-y-0"}`}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
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
            <motion.div
              onClick={() => handleDropdownClick(item.name)}
              className={`flex items-center py-2 w-full cursor-pointer hover:bg-[#e6f4ff] text-left text-gray-800 transition-all duration-300 ${collapsedClass} ${
                isActiveRoute(`/${item.name}`) ? "bg-[#6b728075]" : ""
              }`}
            >
              <span className="text-black flex-shrink-0">{item.icon}</span>
              <motion.span
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.15 }}
                className={`overflow-hidden whitespace-nowrap font-semibold ml-2 ${
                  isCollapsed ? "w-0" : "w-auto"
                }`}
              >
                {item.label}
              </motion.span>

              {!isCollapsed && (
                <div
                  className={`ml-auto transition-transform duration-300 ${
                    openDropdown === item.name ? "rotate-180" : "rotate-0"
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
              {item.links.map((link) => {
                if (link.isHide) return null;
                const isActive = isActiveRoute(link.to);
                return (
                  <React.Fragment key={link.to}>
                    <Link
                      to={link.to}
                      onClick={handleSingleRouteClick}
                      className={`block px-4 py-2.5 text-sm transition-all duration-300
          ${isActive ? "bg-[#e6f4ff] text-blue-800" : "text-gray-800"}
          ${link?.isHide ? "hidden" : ""}
          hover:bg-[#e6f4ff]"
        `}
                    >
                      <FiberManualRecordIcon
                        sx={{
                          color: isActive ? "blue" : "black",
                          fontSize: "10px",
                          marginRight: "10px",
                        }}
                      />
                      <span
                        className={`font-[600] ${
                          isActive ? "text-blue-800" : "text-gray-800"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                    <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                  </React.Fragment>
                );
              })}
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
                className={`flex items-center gap-4 px-4 py-2 transition-all w-full text-left cursor-pointer text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 ${
                  isCollapsed ? "justify-center" : ""
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
                className={`flex items-center gap-0  py-2 w-full text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 transition-all duration-300 ${collapsedClass} ${
                  isActiveRoute(item.to) ? "bg-[#e6f4ff] text-blue-800 " : ""
                }`}
              >
                <span className="flex-shrink-0 text-lg">{item.icon}</span>
                <motion.span
                  animate={{ opacity: isCollapsed ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                  className={`whitespace-nowrap font-semibold ${
                    isCollapsed ? "w-0 overflow-hidden" : "w-auto ml-2"
                  }`}
                >
                  {item.label}
                </motion.span>
              </Link>
            )}
          </Tooltip>
        )
      )}
    </motion.div>
  );
};

export default Sidebar;
