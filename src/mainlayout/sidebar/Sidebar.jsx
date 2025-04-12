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

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobile }) => {
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
    ? "justify-center px-0"
    : "justify-start px-4";

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
      name: "Home",
      icon: <FaHome />,
      label: "Home",
      type: "single",
      to: "/",
    },
    // {
    //     name: 'Dummy',
    //     icon: <BlockOutlinedIcon fontSize='20' />,
    //     label: 'Dummy',
    //     type: "single",
    //     to: "/dummy",
    // },
    {
      name: "SMS",
      icon: <LuMessageSquareMore />,
      label: "SMS",
      type: "dropdown",
      links: [
        { to: "/sendsms", label: "Send SMS" },
        { to: "/smsreports", label: "Reports" },
        { to: "/smsdlttemplates", label: "DLT Template" },
        { to: "/smswishmanagement", label: "Wish Management" },
      ],
    },
    {
      name: "Two Way SMS",
      icon: <LuMessageSquareMore />,
      label: "Two Way SMS",
      type: "dropdown",
      links: [
        { to: "/managekeywords", label: "Manage Keyword" },
        { to: "/twowayreports", label: "Reports" },
        { to: "/twowayintegration", label: "Integration" },
      ],
    },
    {
      name: "RCS",
      icon: <LuMessageSquareMore />,
      label: "RCS",
      type: "dropdown",
      links: [
        { to: "/sendrcs", label: "Send RCS" },
        { to: "/rcsmanagetemplate", label: "Manage Template" },
        { to: "/rcslivechats", label: "Live Chats" },
        { to: "/rcssuggestionreport", label: "Suggestion Report" },
        { to: "/rcsdeliveryreport", label: "Delivery Report" },
        // { to: '/rcsmanagebot', label: 'Manage Bot' },
      ],
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      type: "dropdown",
      links: [
        { to: "/wlaunchcampaign", label: "Launch Campaigns" },
        { to: "/wlivechat", label: "Live Chats" },
        { to: "/wmanagecampaign", label: "Manage Campaigns" },
        { to: "/managetemplate", label: "Manage Templates" },
        { to: "/wmanageoptin", label: "Manage Optin" },
        { to: "/wchatwidget", label: "Chat Widget" },
        { to: "/wqrcode", label: "QR Code" },
        { to: "/wlcsetting", label: "Live Chats Settings" },
        { to: "/wmanagewaba", label: "Manage WABA" },
        { to: "/wwhatsappconversation", label: "WhatsApp Conversation" },
        { to: "/wwhatsappmanageagent", label: "Manage Agent" },
        { to: "/wwhatsappbot", label: "Manage Bot" },
      ],
    },
    {
      name: "Number Lookup",
      icon: <LuMessageSquareMore />,
      label: "Number Lookup",
      type: "dropdown",
      links: [
        { to: "/hlrlookup", label: "HLR Lookup" },
        { to: "/hlrlookupreports", label: "HLR Lookup Reports" },
      ],
    },
    {
      name: "App Authenticator",
      icon: <SiGoogleauthenticator />,
      label: "App Authenticator",
      type: "dropdown",
      links: [
        { to: "/authsettings", label: "Settings" },
        { to: "/authreports", label: "Reports" },
      ],
    },
    {
      name: "E-mail",
      icon: <MdOutlineEmail />,
      label: "E-mail",
      type: "dropdown",
      links: [
        { to: "/emailtemplate", label: "Email Template" },
        { to: "/emailreports", label: "Reports" },
      ],
    },
    {
      name: "OBD",
      icon: <MdOutlineEmail />,
      label: "OBD",
      type: "dropdown",
      links: [
        { to: "/obdcreatecampaign", label: "Create Campaign" },
        { to: "/obdmanagecampaign", label: "Reports" },
        { to: "/obdmanagevoiceclips", label: "Manage Voice Clips" },
        { to: "/obdIntegration", label: "Integration" },
      ],
    },
    {
      name: "IBD",
      icon: <MdOutlineEmail />,
      label: "IBD",
      type: "dropdown",
      links: [
        { to: "/ibdcallhistory", label: "Call History" },
        { to: "/ibdmanageexecutive", label: "Manage Executive" },
        { to: "/ibdivrflow", label: "IVR Flow" },
        { to: "/ibdsettings", label: "Settings" },
      ],
    },
    {
      name: "Missed Call",
      icon: <MdOutlineEmail />,
      label: "Missed Call",
      type: "dropdown",
      links: [
        { to: "/missedcallhistory", label: "Call History" },
        { to: "/missedcallsettings", label: "Settings" },
      ],
    },
    {
      name: "Click-2-Call",
      icon: <MdOutlineEmail />,
      label: "Click-2-Call",
      type: "dropdown",
      links: [
        { to: "/clicktohistory", label: "Call History" },
        { to: "/clicktosettings", label: "Settings" },
      ],
    },
    // {
    //     name: 'settings',
    //     icon: <IoSettingsOutline />,
    //     label: 'Settings',
    //     type: "dropdown",
    //     links: [
    //         { to: '/mainsettings', label: 'Profile' },
    //         { to: '/mainaccount', label: 'Account' },
    //     ],
    // },
    {
      name: 'CallBack',
      icon: <MdOutlineEmail />,
      label: 'Callback',
      type: 'dropdown',
      links: [
        { to: '/callback', label: 'Call Back' }
      ]

    },
    {
      name: "managefunds",
      icon: <IoWalletOutline />,
      label: "Manage Funds",
      type: "dropdown",
      links: [
        { to: "/recharge", label: "Recharge" },
        // { to: '/transactions', label: 'Transactions' },
      ],
    },
    {
      name: "admin",
      icon: <IoPersonOutline />,
      label: "Admin",
      type: "dropdown",
      links: [
        { to: "/manageuser", label: "Manage User" },
        { to: "/managedlttemplate", label: "Manage DLT Template" },
        { to: "/managevoiceclips", label: "Manage Voice Clips" },
        { to: "/manageplan", label: "Manage Plan" },
        { to: "/accountmanager", label: "Account Manager" },
        { to: "/graphmain", label: "Graph Main" },
        { to: "/graphuserwise", label: "Graph User Wise" },
        { to: "/manageSMPP", label: "Manage SMPP" },
        { to: "/managerouting", label: "Manage Routing" },
        { to: "/SMPPerrorcode", label: "SMPP Error Code" },
        { to: "/manageprefix", label: "Manage Prefix" },
        { to: "/blacklist", label: "Blacklist" },
        { to: "/managenotifications", label: "ManageNotifications" },
      ],
    },
    {
      name: "Managecontacts",
      icon: <GroupOutlinedIcon fontSize="20" />,
      label: "Manage Contacts",
      type: "single",
      to: "/managecontacts",
    },
    {
      name: "apiDocs",
      icon: <DescriptionOutlinedIcon fontSize="20" />,
      label: "Api Docs",
      type: "single",
      onClick: () => navigate("/docs"),
    },
    // {
    //     name: 'Logout',
    //     icon: <FaSignOutAlt />,
    //     label: 'Logout',
    //     type: "single",
    //     onClick: handleLogout
    // },
  ];

  return (
    // <motion.div
    //     layout
    //     initial={{ x: isMobile ? -240 : 0, width: isCollapsed ? 64 : 240 }}
    //     animate={{ x: isMobile ? (isCollapsed ? -240 : 0) : 0, width: isCollapsed ? 64 : 240 }}
    //     transition={{ type: "tween", stiffness: 260, damping: 30 }}
    //     onAnimationComplete={() => {
    //         setCollapseAnimationDone(!isCollapsed);
    //     }}
    //     className="mainsidebar h-screen bg-white text-white px-0 flex flex-col fixed lg:top-15 top-14 left-0 overflow-y-auto z-9"
    //     style={{ maxHeight: "calc(100vh - 3.5rem)" }}
    // >

    //     {menuItems.map((item) => (
    //         item.type === "dropdown" ? (
    //             <Tooltip
    //                 key={item.name}
    //                 title={item.label}
    //                 placement="right"
    //                 arrow
    //                 disableHoverListener={!isCollapsed}
    //                 disableFocusListener={!isCollapsed}
    //                 disableTouchListener={!isCollapsed}
    //             >
    //                 <motion.div
    //                     onClick={() => handleDropdownClick(item.name)}
    //                     className={`flex items-center justify-between w-full px-4 cursor-pointer py-2 hover:bg-[#e6f4ff] transition-all duration-300 text-left ${isActiveRoute(`/${item.name}`) ? 'bg-[#6b728075]' : ''
    //                         } ${isCollapsed ? 'justify-center' : ''}`}
    //                 >
    //                     <div className="flex items-center gap-4 h-6">
    //                         <span className="flex-shrink-0 text-black">{item.icon}</span>
    //                         <motion.span
    //                             initial={false}
    //                             animate={{
    //                                 opacity: isCollapsed ? 0 : 1,
    //                                 width: isCollapsed ? 0 : "auto",
    //                             }}
    //                             transition={{ duration: 0.2 }}
    //                             className="overflow-hidden whitespace-nowrap font-[600] text-black"
    //                         >
    //                             {item.label}
    //                         </motion.span>

    //                     </div>
    //                     {!isCollapsed && (
    //                         <div
    //                             className={`text-gray-800 transition-transform duration-300 ${openDropdown === item.name ? "rotate-180" : "rotate-0"
    //                                 }`}
    //                         >
    //                             {openDropdown === item.name ? <MdExpandLess /> : <MdExpandMore />}
    //                         </div>
    //                     )}

    //                 </motion.div>

    //                 {/*Dropdown Content */}
    //                 <motion.div
    //                     initial={{ height: 0, opacity: 0 }}
    //                     animate={{
    //                         height: openDropdown === item.name ? dropdownRefs[item.name]?.scrollHeight : 0,
    //                         opacity: openDropdown === item.name ? 1 : 0,
    //                     }}
    //                     transition={{ duration: 0.3 }}
    //                     className="overflow-hidden"
    //                     ref={(el) => (dropdownRefs[item.name] = el)}
    //                 >
    //                     {item.links.map((link) => (
    //                         <React.Fragment key={link.to}>
    //                             <Link
    //                                 to={link.to}
    //                                 onClick={handleSingleRouteClick}
    //                                 className={`block px-4 py-2.5 text-sm hover:bg-[#e6f4ff] transition-all duration-300 ${isActiveRoute(link.to) ? 'bg-[#e6f4ff] text-blue-800' : 'text-gray-800'}`}
    //                             >
    //                                 <FiberManualRecordIcon
    //                                     sx={{
    //                                         color: isActiveRoute(link.to) ? 'blue' : 'black',
    //                                         fontSize: '10px',
    //                                         marginRight: '10px',
    //                                     }}
    //                                 />
    //                                 <span className={`font-[600] ${isActiveRoute(link.to) ? 'text-blue-800' : 'text-gray-800'}`}>
    //                                     {link.label}
    //                                 </span>
    //                             </Link>
    //                             <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
    //                         </React.Fragment>
    //                     ))}
    //                 </motion.div>
    //             </Tooltip>
    //         ) : (
    //             <Tooltip key={item.name} title={isCollapsed ? item.label : ""} placement="right" arrow>
    //                 {item.onClick ? (
    //                     <motion.div
    //                         onClick={() => {
    //                             item.onClick();
    //                             handleSingleRouteClick();
    //                         }}
    //                         className={`flex items-center gap-4 px-4 py-2 transition-all w-full text-left cursor-pointer text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 ${isCollapsed ? 'justify-center' : ''
    //                             }`}
    //                     >
    //                         <span className="flex-shrink-0">{item.icon}</span>
    //                         <span className={`${isCollapsed ? 'hidden' : ''} font-[600]`}>{item.label}</span>
    //                     </motion.div>
    //                 ) : (
    //                     <Link
    //                         to={item.to}
    //                         onClick={handleSingleRouteClick}
    //                         className={`flex items-center gap-4 px-4 py-2 transition-all text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 ${isActiveRoute(item.to) ? 'bg-[#e6f4ff] text-blue-800' : ''
    //                             } ${isCollapsed ? 'justify-center' : ''}`}
    //                     >
    //                         {/* <span className="flex-shrink-0">{item.icon}</span> */}
    //                         {/* <span className={`${isCollapsed ? 'hidden' : ''} font-[600]`}>{item.label}</span> */}
    //                         <motion.div
    //                         // layout
    //                         // className=" place-content-center text-lg"
    //                         >
    //                             {item.icon}
    //                         </motion.div>
    //                         {(!isCollapsed || collapseAnimationDone) && (
    //                             <motion.span
    //                                 // layout
    //                                 className="font-semibold">
    //                                 {item.label}
    //                             </motion.span>
    //                         )}
    //                     </Link>
    //                 )}
    //             </Tooltip>
    //         )
    //     ))}

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
      className={`mainsidebar h-screen bg-white text-white px-0 flex flex-col fixed top-14 left-0 overflow-y-auto overflow-x-hidden z-9  
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
                className={`flex items-center gap-2 py-2 w-full text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 transition-all duration-300 ${collapsedClass} ${isActiveRoute(item.to) ? "bg-[#e6f4ff] text-blue-800" : ""
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
