import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCog, FaHome, FaSignOutAlt, FaBars, FaWhatsapp } from 'react-icons/fa';
import { LuMessageSquareMore } from "react-icons/lu";
import { SiGoogleauthenticator } from "react-icons/si";
import { MdExpandLess, MdExpandMore, MdOutlineEmail } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import clsx from 'clsx';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import toast from 'react-hot-toast';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    // const [isCollapsed, setIsCollapsed] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();
    const dropdownRefs = useRef({});

    const toggleSidebar = () => {
        if (!isCollapsed) {
            setOpenDropdown(null);
        }
        setIsCollapsed((prev) => !prev);
    };

    const handleDropdownClick = (dropdownName) => {
        if (isCollapsed) {
            setIsCollapsed(false);
            return;
        }
        setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
    };

    // ✅ Close dropdown when clicking on a single route
    const handleSingleRouteClick = () => {
        setOpenDropdown(null);
    };

    // const isActiveRoute = (route) => location.pathname.startsWith(route);
    const isActiveRoute = (route) => {
        if (route === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(route);
    };

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
            name: 'Home',
            icon: <FaHome />,
            label: 'Home',
            type: "single",
            to: "/",
        },
        {
            name: 'SMS',
            icon: <LuMessageSquareMore />,
            label: 'SMS',
            type: "dropdown",
            links: [
                { to: '/sendsms', label: 'Send SMS' },
                { to: '/smsreports', label: 'Reports' },
                { to: '/smsdlttemplates', label: 'DLT Template' },
                { to: '/smswishmanagement', label: 'Wish Management' },
            ],
        },
        {
            name: 'Two Way SMS',
            icon: <LuMessageSquareMore />,
            label: 'Two Way SMS',
            type: "dropdown",
            links: [
                { to: '/managekeywords', label: 'Manage Keyword' },
                { to: '/twowayreports', label: 'Reports' },
                { to: '/twowaydlttemplates', label: 'DLT Template' },
            ],
        },
        {
            name: 'RCS',
            icon: <LuMessageSquareMore />,
            label: 'RCS',
            type: "dropdown",
            links: [
                { to: '/sendrcs', label: 'Send RCS' },
                { to: '/rcsmanagetemplate', label: 'Manage Template' },
                { to: '/rcslivechats', label: 'Live Chats' },
                { to: '/rcssuggestionreport', label: 'Suggestion Report' },
                { to: '/rcsdeliveryreport', label: 'Delivery Report' },
            ],
        },
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp />,
            label: 'WhatsApp',
            type: "dropdown",
            links: [
                { to: '/wlaunchcampaign', label: 'Launch Campaigns' },
                { to: '/wlivechat', label: 'Live Chats' },
                { to: '/wmanagecampaign', label: 'Manage Campaigns' },
                { to: '/managetemplate', label: 'Manage Templates' },
                { to: '/wmanageoptin', label: 'Manage Optin' },
                { to: '/wchatwidget', label: 'Chat Widget' },
                { to: '/wqrcode', label: 'QR Code' },
                { to: '/wlcsetting', label: 'Live Chats Settings' },
                { to: '/wmanagewaba', label: 'Manage WABA' },
                { to: '/wwhatsappconversation', label: 'WhatsApp Conversation' },
            ],
        },
        {
            name: 'Number Lookup',
            icon: <LuMessageSquareMore />,
            label: 'Number Lookup',
            type: "dropdown",
            links: [
                { to: '/hlrlookup', label: 'HLR Lookup' },
                { to: '/hlrlookupreports', label: 'HLR Lookup Reports' },
            ],
        },
        {
            name: 'App Authenticator',
            icon: <SiGoogleauthenticator />,
            label: 'App Authenticator',
            type: "dropdown",
            links: [
                { to: '/authsettings', label: 'Settings' },
                { to: '/authreports', label: 'Reports' },
            ],
        },
        {
            name: 'E-mail',
            icon: <MdOutlineEmail />,
            label: 'E-mail',
            type: "dropdown",
            links: [
                { to: '/emailtemplate', label: 'Email Template' },
                { to: '/emailreports', label: 'Reports' },
            ],
        },
        {
            name: 'OBD',
            icon: <MdOutlineEmail />,
            label: 'OBD',
            type: "dropdown",
            links: [
                { to: '/obdcreatecampaign', label: 'Create Campaign' },
                { to: '/obdreports', label: 'Reports' },
                { to: '/obdmanagevoice', label: 'Manage Voice Clips' },
            ],
        },
        {
            name: 'IBD',
            icon: <MdOutlineEmail />,
            label: 'IBD',
            type: "dropdown",
            links: [
                { to: '/ibdcallhistory', label: 'Call History' },
                { to: '/ibdmanageexecutive', label: 'Manage Executive' },
                { to: '/ibdivrflow', label: 'IVR Flow' },
                { to: '/ibdsettings', label: 'Settings' },
            ],
        },
        {
            name: 'Missed Call',
            icon: <MdOutlineEmail />,
            label: 'Missed Call',
            type: "dropdown",
            links: [
                { to: '/ibdcallhistory', label: 'Call History' },
                { to: '/ibdsettings', label: 'Settings' },
            ],
        },
        {
            name: 'Click-2-Call',
            icon: <MdOutlineEmail />,
            label: 'Click-2-Call',
            type: "dropdown",
            links: [
                { to: '/clicktohistory', label: 'Call History' },
                { to: '/clicktosettings', label: 'Settings' },
            ],
        },
        {
            name: 'settings',
            icon: <FaCog />,
            label: 'Settings',
            type: "dropdown",
            links: [
                { to: '/mainsettings', label: 'Profile' },
                { to: '/mainaccount', label: 'Account' },
            ],
        },
    ];

    return (
        <div
            className={clsx(
                "h-screen bg-white text-white px-0 flex flex-col fixed top-14 left-0 transition-all duration-300 overflow-y-auto",
                isCollapsed ? "w-16" : "w-64"
            )}
            style={{ maxHeight: "calc(100vh - 3.5rem)" }}
        >
            <div className="flex items-center justify-between px-4 py-2 h-9">
                <span className={clsx('text-xl font-medium tracking-wider text-gray-800', isCollapsed && 'hidden')}>
                    Celitix
                </span>
                <button
                    onClick={toggleSidebar}
                    className={clsx("text-gray-700 focus:outline-none", isCollapsed ? "ml-2" : "ml-0")}
                >
                    <FaBars />
                </button>
            </div>

            <nav className="mt-1 ">
                {menuItems.map((item) => (
                    item.type === "dropdown" ? (
                        <Tooltip
                            key={item.name}
                            title={item.label}
                            placement="right"
                            arrow
                            disableHoverListener={!isCollapsed}
                        >
                            <div>
                                <button
                                    onClick={() => handleDropdownClick(item.name)}
                                    className={clsx(
                                        'flex items-center justify-between w-full px-4 cursor-pointer py-2  hover:bg-[#e6f4ff] transition-all text-left',
                                        isActiveRoute(`/${item.name}`) && 'bg-[#6b728075]',
                                        isCollapsed && 'justify-center'
                                    )}
                                >
                                    <div className="flex items-center gap-4 h-6">
                                        <span className="flex-shrink-0 text-black">{item.icon}</span>
                                        <span className={clsx(isCollapsed && 'hidden', 'text-black font-[600]')}>
                                            {item.label}
                                        </span>
                                    </div>
                                    <div className={clsx(isCollapsed && '', 'text-gray-800')}>
                                        {!isCollapsed && (openDropdown === item.name ? <MdExpandLess /> : <MdExpandMore />)}
                                    </div>
                                </button>

                                {/* ✅ Dropdown Content */}
                                <div
                                    ref={(el) => (dropdownRefs[item.name] = el)}
                                    style={{
                                        maxHeight: openDropdown === item.name ? `${dropdownRefs[item.name]?.scrollHeight}px` : "0px",
                                        transition: "max-height 0.2s ease-in",
                                    }}
                                    className="overflow-hidden"
                                >
                                    {item.links.map((link) => (
                                        <React.Fragment key={link.to}>
                                            <Link
                                                to={link.to}
                                                className={`block px-4 py-2.5 text-sm hover:bg-[#e6f4ff] transition-all duration-300 ${isActiveRoute(link.to) ? 'bg-[#e6f4ff] text-blue-800' : 'text-gray-800'}`}
                                            >
                                                <FiberManualRecordIcon
                                                    sx={{
                                                        color: isActiveRoute(link.to) ? 'blue' : 'black',
                                                        fontSize: '10px',
                                                        marginRight: '10px',
                                                    }}
                                                />
                                                <span className={`font-[600] ${isActiveRoute(link.to) ? 'text-blue-800' : 'text-gray-800'}`}>
                                                    {link.label}
                                                </span>
                                            </Link>
                                            <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </Tooltip>
                    ) : (
                        <Tooltip
                            key={item.name}
                            title={isCollapsed ? item.label : ""}
                            placement="right"
                            arrow
                        >
                            <Link
                                to={item.to}
                                onClick={handleSingleRouteClick}
                                className={clsx(
                                    "flex items-center gap-4 px-4 py-2 transition-all",
                                    isActiveRoute(item.to) ? "bg-[#e6f4ff] text-blue-800" : "text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800",
                                    isCollapsed && "justify-center"
                                )}
                            >
                                <span className="flex-shrink-0">{item.icon}</span>
                                <span className={clsx(isCollapsed && "hidden", "font-[600]")}>{item.label}</span>
                            </Link>
                        </Tooltip>
                    )
                ))}
            </nav>

        </div>
    );
};

export default Sidebar;





