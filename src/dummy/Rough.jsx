import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ isDarkMode = false, isMobile = false }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [openTooltips, setOpenTooltips] = useState({});
  const dropdownRefs = useRef({});

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDropdownClick = (name) => {
    setOpenDropdown(openDropdown === name ? "" : name);
  };

  const handleTooltipOpen = (name) => {
    setOpenTooltips((prev) => ({ ...prev, [name]: true }));
  };

  const handleTooltipClose = (name) => {
    setOpenTooltips((prev) => ({ ...prev, [name]: false }));
  };

  const isActiveRoute = (route) => location.pathname === route;

  const menuItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      to: "/dashboard",
      icon: <i className="pi pi-home"></i>,
    },
    {
      name: "management",
      label: "Management",
      type: "dropdown",
      icon: <i className="pi pi-users"></i>,
      links: [
        { label: "Users", to: "/management/users" },
        { label: "Teams", to: "/management/teams" },
      ],
    },
    {
      name: "settings",
      label: "Settings",
      to: "/settings",
      icon: <i className="pi pi-cog"></i>,
    },
  ];

  return (
    // <motion.div
    //   layout
    //   initial={{ x: isMobile ? -240 : 0, width: isCollapsed ? 64 : 240 }}
    //   animate={{
    //     x: isMobile ? (isCollapsed ? -240 : 0) : 0,
    //     width: isCollapsed ? 64 : 240,
    //   }}
    //   transition={{ type: "tween", stiffness: 260, damping: 30 }}
    //   className={`h-screen fixed top-0 left-0 flex flex-col overflow-y-auto z-40 transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
    //     }`}
    // >
    //   {/* Header */}
    //   <div className="flex items-center justify-between px-4 py-2 h-14">
    //     {!isCollapsed && (
    //       <span className={`text-xl font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
    //         Celitix
    //       </span>
    //     )}
    //     <button
    //       onClick={toggleSidebar}
    //       className={`focus:outline-none text-xl ${isDarkMode ? "text-white" : "text-gray-700"}`}
    //     >
    //       <FaBars />
    //     </button>
    //   </div>

    //   {/* Menu Items */}
    //   <nav className="mt-2">
    //     {menuItems.map((item) =>
    //       item.type === "dropdown" ? (
    //         <Tooltip
    //           key={item.name}
    //           title={item.label}
    //           placement="right"
    //           arrow
    //           open={isCollapsed ? openTooltips[item.name] : false}
    //           onOpen={() => handleTooltipOpen(item.name)}
    //           onClose={() => handleTooltipClose(item.name)}
    //           disableHoverListener={!isCollapsed}
    //           disableFocusListener={!isCollapsed}
    //           disableTouchListener={!isCollapsed}
    //         >
    //           <div>
    //             <button
    //               onClick={() => handleDropdownClick(item.name)}
    //               className={`flex items-center w-full py-2 px-4 transition-all ${isCollapsed ? "justify-center" : "justify-between"
    //                 } ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-[#e6f4ff]"} ${isActiveRoute(`/${item.name}`) ? "bg-blue-100" : ""
    //                 }`}
    //             >
    //               <div className="flex items-center gap-3">
    //                 <span>{item.icon}</span>
    //                 {!isCollapsed && <span className="font-semibold">{item.label}</span>}
    //               </div>
    //               {!isCollapsed && (
    //                 <span>{openDropdown === item.name ? <MdExpandLess /> : <MdExpandMore />}</span>
    //               )}
    //             </button>

    //             {/* Dropdown Items */}
    //             <motion.div
    //               initial={{ height: 0, opacity: 0 }}
    //               animate={{
    //                 height:
    //                   openDropdown === item.name
    //                     ? dropdownRefs.current[item.name]?.scrollHeight || "auto"
    //                     : 0,
    //                 opacity: openDropdown === item.name ? 1 : 0,
    //               }}
    //               className="overflow-hidden transition-all duration-300"
    //               ref={(el) => (dropdownRefs.current[item.name] = el)}
    //             >
    //               <div className="flex flex-col ml-6">
    //                 {item.links.map((link) => (
    //                   <Link
    //                     key={link.to}
    //                     to={link.to}
    //                     className={`py-2 px-4 text-sm rounded-md transition-all ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
    //                       } ${isActiveRoute(link.to) ? "bg-blue-100" : ""}`}
    //                   >
    //                     {link.label}
    //                   </Link>
    //                 ))}
    //               </div>
    //             </motion.div>
    //           </div>
    //         </Tooltip>
    //       ) : (
    //         <Tooltip
    //           key={item.name}
    //           title={item.label}
    //           placement="right"
    //           arrow
    //           open={isCollapsed ? openTooltips[item.name] : false}
    //           onOpen={() => handleTooltipOpen(item.name)}
    //           onClose={() => handleTooltipClose(item.name)}
    //           disableHoverListener={!isCollapsed}
    //           disableFocusListener={!isCollapsed}
    //           disableTouchListener={!isCollapsed}
    //         >
    //           <Link
    //             to={item.to}
    //             className={`flex items-center gap-3 w-full py-2 px-4 transition-all ${isCollapsed ? "justify-center" : "justify-start"
    //               } ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-[#e6f4ff]"} ${isActiveRoute(item.to) ? "bg-blue-100" : ""
    //               }`}
    //           >
    //             <span>{item.icon}</span>
    //             {!isCollapsed && <span className="font-semibold">{item.label}</span>}
    //           </Link>
    //         </Tooltip>
    //       )
    //     )}
    //   </nav>
    // </motion.div>

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
      className={`mainsidebar h-screen bg-white text-white  px-0 pt-3 flex flex-col fixed  left-0 overflow-y-auto overflow-x-hidden z-9  
            ${isCollapsed ? "items-center " : "space-y-0"}`}
      style={{ maxHeight: "calc(100vh - 3.5rem)" }}
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
              className={`flex items-center py-2 w-full cursor-pointer hover:bg-[#e6f4ff] text-left text-gray-800 transition-all duration-300 ${collapsedClass} ${isActiveRoute(`/${item.name}`) ? "bg-[#6b728075]" : ""
                }`}
            >
              <span className="text-black flex-shrink-0">{item.icon}</span>
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
                    to={link.to}
                    onClick={handleSingleRouteClick}
                    className={`block px-4 py-2.5 text-sm hover:bg-[#e6f4ff] transition-all duration-300 ${isActiveRoute(link.to)
                      ? "bg-[#e6f4ff] text-blue-800"
                      : "text-gray-800"
                      }`}
                  >
                    <FiberManualRecordIcon
                      sx={{
                        color: isActiveRoute(link.to) ? "blue" : "black",
                        fontSize: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <span
                      className={`font-[600] ${isActiveRoute(link.to)
                        ? "text-blue-800"
                        : "text-gray-800"
                        }`}
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
                onClick={handleSingleRouteClick}
                className={`flex items-center gap-0  py-2 w-full text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 transition-all duration-300 ${collapsedClass} ${isActiveRoute(item.to) ? "bg-[#e6f4ff] text-blue-800 " : ""
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
    </motion.div>
  );
};

export default Sidebar;
