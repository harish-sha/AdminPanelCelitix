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
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import rcsicon from "../../assets/icons/RCS02.svg";
import twoway from "../../assets/icons/TWOWAY.svg";
import callback from "../../assets/icons/Callback02.svg";
import missedcall from "../../assets/icons/Missedcall2.svg";
import obd from "../../assets/icons/OBD02.svg";
import ibd from "../../assets/icons/IBD02.svg";
import numberlookup from "../../assets/icons/Numberlookup.svg";
import clicktwocall from "../../assets/icons/Click2Call02.svg";
import { LuWandSparkles } from "react-icons/lu";
import InstagramIcon from "@mui/icons-material/Instagram";

import { useUser } from "@/context/auth";
import { all } from "axios";

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

  const menuItems = [
    {
      id: "",
      name: "Home",
      icon: <FaHome />,
      label: "Home",
      type: "single",
      to: "/",
      roles: ["ADMIN", "AGENT"],
    },
    // {
    //   id: "",
    //   name: "ResellerDash",
    //   icon: <FaHome />,
    //   label: "ResellerDash",
    //   type: "single",
    //   to: "/resellerdash",
    // },
    // {
    //     name: 'Dummy',
    //     icon: <BlockOutlinedIcon fontSize='20' />,
    //     label: 'Dummy',
    //     type: "single",
    //     to: "/dummy",
    // },
    {
      id: "1",
      name: "SMS",
      icon: <LuMessageSquareMore />,
      label: "SMS",
      type: "dropdown",
      links: [
        { to: "/sendsms", label: "Send SMS" },
        { to: "/smsreports", label: "Reports" },
        { to: "/smsdlttemplates", label: "DLT Template" },
        {
          to: "/smscampaigndetaillogs",
          label: "Sms Details Logs",
          isHide: true,
        },
        {
          to: "/smsAttachmentdetaillog",
          label: "Sms Details Logs",
          isHide: true,
        },
      ],
      roles: ["ADMIN", "DIRECTUSER"],
    },
    {
      id: "",
      name: "Two Way SMS",
      icon: <img src={twoway} className="w-4 h-4" />,

      label: "Two Way SMS",
      type: "dropdown",
      links: [
        { to: "/managekeywords", label: "Manage Keyword" },
        { to: "/twowayreports", label: "Reports" },
        { to: "/twowayintegration", label: "Integration" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "3",
      name: "RCS",
      icon: <img src={rcsicon} className="w-4 h-4" />,
      label: "RCS",
      type: "dropdown",
      links: [
        { to: "/sendrcs", label: "Send RCS" },
        { to: "/rcsmanagetemplate", label: "Manage Template" },
        // { to: "/rcslivechats", label: "Live Chats" },
        { to: "/rcssuggestionreport", label: "Suggestion Report" },
        { to: "/rcsdeliveryreport", label: "Delivery Report" },
        {
          to: "/rcsdeliverycampaigndetails",
          label: "Delivery Campaign Report",
          isHide: true,
        },
        {
          to: "/rcsaddtemplatercs",
          label: "RcsAddTemplate",
          isHide: true,
        },
      ],
      roles: ["ADMIN", "DIRECTUSER"],
    },
    {
      id: "2",
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      type: "dropdown",
      links: [
        { to: "/wlaunchcampaign", label: "Launch Campaigns" },
        { to: "/wlivechat", label: "Live Chats" },
        { to: "/wmanagecampaign", label: "Manage Campaigns" },
        { to: "/managetemplate", label: "Manage Templates" },
        // { to: "/wmanageoptin", label: "Manage Optin" },
        // { to: "/wchatwidget", label: "Chat Widget" },
        { to: "/wqrcode", label: "QR Code" },
        { to: "/selfrecharge", label: "Recharge" },
        { to: "/wlcsetting", label: "Live Chats Settings" },
        { to: "/wmanagewaba", label: "Manage WABA" },
        { to: "/wwhatsappconversation", label: "WhatsApp Conversation" },
        { to: "/wwhatsappmanageagent", label: "Manage Agent" },
        { to: "/wwhatsappbot", label: "Manage Bot" },
        { to: "/wwhatsappflows", label: "Flows" },
        { to: "/createwhatsappbot", label: "Create Bot", isHide: true },
        { to: "/wcampaigndetailsreport", label: "Create Bot", isHide: true },
        { to: "/createtemplate", label: "Create Bot", isHide: true },
        { to: "/wflowcreation", label: "Create Whatsapp Flow", isHide: true },
      ],
      roles: ["ADMIN", "DIRECTUSER"],
    },
    {
      id: "",
      name: "Number Lookup",
      icon: <img src={numberlookup} className="w-4 h-4" />,
      label: "Number Lookup",
      type: "dropdown",
      links: [
        { to: "/hlrlookup", label: "HLR Lookup" },
        { to: "/lookupreports", label: "HLR Lookup Reports" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "App Authenticator",
      icon: <SiGoogleauthenticator />,
      label: "App Authenticator",
      type: "dropdown",
      links: [
        { to: "/authsettings", label: "Settings" },
        { to: "/authreports", label: "Reports" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "4",
      name: "E-mail",
      icon: <MdOutlineEmail />,
      label: "E-mail",
      type: "dropdown",
      links: [
        { to: "/emailmanagement/", label: "Manage Template" },
        { to: "/emailreports", label: "Reports" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "7",
      name: "OBD",
      icon: <img src={obd} className="w-4 h-4" />,
      label: "OBD",
      type: "dropdown",
      links: [
        // { to: "/obdcreatecampaign", label: "Create Campaign" },
        // { to: "/obdmanagecampaign", label: "Reports" },
        // { to: "/obdmanagevoiceclips", label: "Manage Voice Clips" },
        // { to: "/obdIntegration", label: "Integration" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "IBD",
      icon: <img src={ibd} className="w-4 h-4" />,
      label: "IBD",
      type: "dropdown",
      links: [
        { to: "/ibdcallhistory", label: "Call History" },
        { to: "/ibdmanageexecutive", label: "Manage Executive" },
        { to: "/ibdivrflow", label: "IVR Flow" },
        { to: "/ibdsettings", label: "Settings" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "Missed Call",
      icon: <img src={missedcall} className="w-4 h-4" />,
      label: "Missed Call",
      type: "dropdown",
      links: [
        { to: "/missedcallhistory", label: "Call History" },
        { to: "/missedcallsettings", label: "Settings" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "Click-2-Call",
      icon: <img src={clicktwocall} className="w-4 h-4" />,

      label: "Click-2-Call",
      type: "dropdown",
      links: [
        { to: "/clicktohistory", label: "Call History" },
        { to: "/clicktosettings", label: "Settings" },
      ],
      roles: ["ADMIN"],
    },
    {
      name: "settings",
      icon: <IoSettingsOutline />,
      label: "Settings",
      type: "dropdown",
      links: [
        // { to: '/mainsettings', label: 'Profile' },
        // { to: '/mainaccount', label: 'Account' },
        { to: "/mainsettings", label: "MainSettings" },
        { to: "/mediasettings", label: "MediaSettings" },
      ],
    },

    {
      name: "instagram",
      icon: <InstagramIcon sx={{ fontSize: "20px" }} />,
      label: "Instagram",
      type: "dropdown",
      links: [
        {
          to: "/manageinstaprofile",
          label: "Manage Profile",
        },
        { to: "/instalivechats", label: "Live Chats" },
        { to: "/manageinstatemplate", label: "Templates" },
        { to: "/instaadsmanager", label: "Ads Manager" },
        { to: "/instareport", label: "Reports" },
        { to: "/instasettings", label: "Settings" },
      ],
    },
    {
      id: "",
      name: "CallBack",
      // icon: <MdOutlineEmail />,
      icon: <img src={callback} className="w-4.5 h-4.5" />,
      label: "Callback",
      type: "dropdown",
      links: [
        { to: "/callback", label: "Call Back" },
        { to: "/addcallback", label: "Add Call Back", isHide: true },
        { to: "/editcallback", label: "Edit Call Back", isHide: true },
      ],
      roles: [],
    },
    {
      id: "",
      name: "managefunds",
      icon: <IoWalletOutline />,
      label: "Manage Funds",
      type: "dropdown",
      links: [{ to: "/recharge", label: "Recharge" }],
      roles: ["ADMIN"],
    },
    // {
    //   id: "",
    //   name: "admin",
    //   icon: <IoPersonOutline />,
    //   label: "Admin",
    //   type: "dropdown",
    //   links: [
    //     { to: "/manageuser", label: "Manage User" },
    //     { to: "/managedlttemplate", label: "Manage DLT Template" },
    //     { to: "/rcsmanagebot", label: "Manage Bot" },
    //     { to: "/managevoiceclips", label: "Manage Voice Clips" },
    //     { to: "/manageplan", label: "Manage Plan" },
    //     { to: "/accountmanager", label: "Account Manager" },
    //     { to: "/graphmain", label: "Graph Main" },
    //     { to: "/graphuserwise", label: "Graph User Wise" },
    //     { to: "/manageSMPP", label: "Manage SMPP" },
    //     { to: "/managerouting", label: "Manage Routing" },
    //     { to: "/SMPPerrorcode", label: "SMPP Error Code" },
    //     { to: "/manageprefix", label: "Manage Prefix" },
    //     { to: "/blacklist", label: "Blacklist" },
    //     { to: "/managenotifications", label: "ManageNotifications" },
    //     { to: "/CreateWhatsappTemplateAdmin", label: "whatsapp Library" },
    //   ],
    //   roles: ["ADMIN"],
    // },
    {
      id: "",
      name: "Managecontacts",
      icon: <GroupOutlinedIcon fontSize="20" />,
      label: "Manage Contacts",
      type: "single",
      to: "/managecontacts",
      roles: ["ADMIN", "DIRECTUSER"],
    },
    {
      id: "",
      name: "Wishmanagement",
      icon: <LuWandSparkles fontSize="20" style={{ fontSize: "17px" }} />,
      label: "Wish Management",
      type: "single",
      to: "/smswishmanagement",
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "Leadmanagement",
      icon: (
        <LeaderboardOutlinedIcon fontSize="20" style={{ fontSize: "17px" }} />
      ),
      label: "Lead Management",
      type: "single",
      to: "/leadmanagement/leaddash",
      // links: [
      //   to: "/leadmanagement/leaddash"
      // ]
      roles: ["ADMIN"],
    },
    // {
    //   id: "",
    //   name: "apiDocs",
    //   icon: <DescriptionOutlinedIcon fontSize="20" />,
    //   label: "API Docs",
    //   type: "single",
    //   onClick: () => navigate("/docs"),
    //   roles: ["ADMIN"],
    // },
    // {
    //     name: 'Logout',
    //     icon: <FaSignOutAlt />,
    //     label: 'Logout',
    //     type: "single",
    //     onClick: handleLogout
    // },
  ];

  const getFilteredMenuItems = (menuItems, userState) => {
    // let allowedServices = [];

    if (userState.role === "ADMIN") {
      return menuItems;
    }

    if (userState.role === "AGENT") {
      return [
        {
          id: "",
          name: "Home",
          icon: <FaHome />,
          label: "Home",
          type: "single",
          to: "/",
          roles: ["AGENT"],
        },
        {
          id: "",
          name: "WhatsApp LiveChat",
          icon: <FaWhatsapp />,
          label: "WhatsApp LiveChat",
          type: "single",
          to: "/wlivechat",
          roles: ["AGENT"],
        },
      ];
    }

    const alwaysIncludeNames = [
      "Home",
      "apiDocs",
      "CallBack",
      "Managecontacts",
      "instagram"
    ];

    // menuItems.forEach((item) => {
    //   // if (item.roles.includes(userState.role)) allowedServices.push(item);
    //   // userState.services.forEach((service, index) => {
    //   //   if (item.id == service.service_type_id) {
    //   //     allowedServices.push(item);
    //   //   }
    //   // });
    //   // if (item.name === "Home") {
    //   //   allowedServices.push(item);
    //   // }
    //   // if (item.name === "apiDocs") {
    //   //   allowedServices.push(item);
    //   // }
    //   // if (item.name === "CallBack") {
    //   //   allowedServices.push(item);
    //   // }
    //   // if (item.name === "Managecontacts") {
    //   //   allowedServices.push(item);
    //   // }
    //   // userState.services.forEach((service, index) => {
    //   //   if (item.id == service.service_type_id) {
    //   //     allowedServices.push(item);
    //   //   }
    //   // });
    // });

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
                        className={`font-[600] ${isActive ? "text-blue-800" : "text-gray-800"
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
