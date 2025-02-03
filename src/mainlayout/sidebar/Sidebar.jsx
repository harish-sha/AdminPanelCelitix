import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCog, FaHome, FaSignOutAlt, FaBars, FaWhatsapp } from 'react-icons/fa';
import { LuMessageSquareMore } from "react-icons/lu";
import { SiGoogleauthenticator } from "react-icons/si";
import { MdExpandLess, MdExpandMore, MdOutlineEmail } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import clsx from 'clsx'; // Install clsx for cleaner class handling: npm install clsx
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();

    // Toggle sidebar collapse/uncollapse
    const toggleSidebar = () => {
        if (!isCollapsed) {
            setOpenDropdown(null); // Close all dropdowns when collapsing
        }
        setIsCollapsed((prev) => !prev);
    };


    // Handle dropdown open/close
    const handleDropdownClick = (dropdownName) => {
        if (isCollapsed) {
            // If the sidebar is collapsed, uncollapse it instead of opening the dropdown
            setIsCollapsed(false);
            return;
        }
        // Toggle the dropdown
        setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
    };

    // Check if a route is active
    // const isActiveRoute = (route) => location.pathname.startsWith(route);
    // Check if a route is active
    const isActiveRoute = (route) => {
        // If the route is "/", match it exactly
        if (route === "/") {
            return location.pathname === "/";
        }
        // For other routes, check if the pathname starts with the given route
        return location.pathname.startsWith(route);
    };


    // Menu items for sidebar
    const menuItems = [
        {
            name: 'SMS',
            icon: <LuMessageSquareMore />,
            label: 'SMS',
            links: [
                { to: '#', label: 'Send SMS' },
                { to: '#', label: 'Reports' },
                { to: '#', label: 'DLT Template' },
                { to: '#', label: 'Wish Management' },
                { to: '#', label: 'Reports' },
            ],
        },
        {
            name: 'Two Way SMS',
            icon: <LuMessageSquareMore />,
            label: 'Two Way SMS',
            links: [
                { to: '#', label: 'Manage Keyword' },
                { to: '#', label: 'Reports' },
                { to: '#', label: 'DLT Template' },
            ],
        },
        {
            name: 'RCS',
            icon: <LuMessageSquareMore />,
            label: 'RCS',
            links: [
                { to: '#', label: 'Send RCS' },
                { to: '#', label: 'Manage Template' },
                { to: '#', label: 'Live Chats' },
                { to: '#', label: 'Suggestion Report' },
                { to: '#', label: 'Delivery Report' },
            ],
        },
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp />,
            label: 'WhatsApp',
            links: [
                { to: '/wlaunchcampaign', label: 'Launch Campaigns' },
                { to: '/wlivechat', label: 'Live Chats' },
                { to: '#', label: 'Manage Campaigns' },
                { to: '/managetemplate', label: 'Manage Templates' },
                { to: '#', label: 'Manage Optin' },
                { to: '#', label: 'Chat Widget' },
                { to: '#', label: 'QR Code' },
                { to: '#', label: 'Live Chats Settings' },
                { to: '#', label: 'Manage WABA' },
                { to: '#', label: 'WhatsApp Conversation' },
            ],
        },
        {
            name: 'Number Lookup',
            icon: <LuMessageSquareMore />,
            label: 'Number Lookup',
            links: [
                { to: '#', label: 'HLR Lookup' },
                { to: '#', label: 'HLR Lookup Reports' },
            ],
        },
        {
            name: 'App Authenticator',
            icon: <SiGoogleauthenticator />,
            label: 'App Authenticator',
            links: [
                { to: '#', label: 'Settings' },
                { to: '#', label: 'Reports' },
            ],
        },
        {
            name: 'E-mail',
            icon: <MdOutlineEmail />,
            label: 'E-mail',
            links: [
                { to: '#', label: 'Email Template' },
                { to: '#', label: 'Reports' },
            ],
        },
        {
            name: 'OBD',
            icon: <MdOutlineEmail />,
            label: 'OBD',
            links: [
                { to: '#', label: 'Create Campaign' },
                { to: '#', label: 'Reports' },
                { to: '#', label: 'Manage Voice Clips' },
            ],
        },
        {
            name: 'IBD',
            icon: <MdOutlineEmail />,
            label: 'IBD',
            links: [
                { to: '#', label: 'Call History' },
                { to: '#', label: 'Manage Executive' },
                { to: '#', label: 'IVR Flow' },
                { to: '#', label: 'Settings' },
            ],
        },
        {
            name: 'Missed Call',
            icon: <MdOutlineEmail />,
            label: 'Missed Call',
            links: [
                { to: '#', label: 'Call History' },
                { to: '#', label: 'Settings' },
            ],
        },
        {
            name: 'Click-2-Call',
            icon: <MdOutlineEmail />,
            label: 'Click-2-Call',
            links: [
                { to: '#', label: 'Call History' },
                { to: '#', label: 'Settings' },
            ],
        },
        {
            name: 'settings',
            icon: <FaCog />,
            label: 'Settings',
            links: [
                { to: '#', label: 'Profile' },
                { to: '#', label: 'Account' },
            ],
        },
    ];

    return (
        <div
            className={clsx(
                'h-screen bg-white text-white px-0 flex flex-col transition-all duration-300',
                isCollapsed ? 'w-16' : 'w-[16rem]',
            )}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-4">
                <span className={clsx('text-xl font-medium tracking-wider text-gray-800', isCollapsed && 'hidden')}>
                    Celitix
                </span>
                <button
                    onClick={toggleSidebar}
                    className="text-gray-700 focus:outline-none"
                >
                    <FaBars />
                </button>
            </div>

            {/* Sidebar Links */}
            <nav className="mt-4 flex-grow">
                <Tooltip title={isCollapsed ? 'Home' : ''} placement="right">
                    <Link
                        to="/"
                        className={clsx(
                            'flex items-center gap-4 px-4 py-2 rounded-lg transition-all',
                            isActiveRoute('/') ? 'bg-[#e6f4ff] text-blue-800' : 'text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800'
                        )}
                    >
                        <span className="flex-shrink-0">
                            <FaHome />
                        </span>
                        <span className={clsx(isCollapsed && 'hidden', 'font-[600] ')}>Home</span>
                    </Link>
                </Tooltip>

                {menuItems.map((item) => (
                    <Tooltip
                        key={item.name}
                        title={item.label}
                        placement="right"
                        arrow
                        disableHoverListener={!isCollapsed}
                    >
                        <div>
                            {/* Main Dropdown Button */}
                            <button
                                onClick={() => handleDropdownClick(item.name)}
                                className={clsx(
                                    'flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-[#e6f4ff] transition-all',
                                    isActiveRoute(`/${item.name}`) && 'bg-[#6b728075]',
                                    isCollapsed && 'justify-center'
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 text-black">{item.icon}</span>
                                    <span className={clsx(isCollapsed && 'hidden', 'text-black font-[600]')}>{item.label}</span>
                                </div>
                                <div className='text-gray-800' >
                                    {!isCollapsed && (
                                        openDropdown === item.name ? <MdExpandLess /> : <MdExpandMore />
                                    )}
                                </div>
                            </button>
                            {/* <button
                                className="flex items-center justify-between w-full px-4 py-2 text-left"
                                onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 text-black">{item.icon}</span>
                                    <span className={clsx(isCollapsed && 'hidden', 'text-black font-[600]')}>{item.label}</span>
                                </div>
                                <div className="text-gray-800">
                                    {!isCollapsed && (openDropdown === item.name ? <MdExpandLess /> : <MdExpandMore />)}
                                </div>
                            </button> */}

                            {/* Dropdown Content */}
                            <div
                                className={clsx(
                                    'overflow-hidden transition-max-height rounded-lg  duration-300 ease-in-out ',
                                    openDropdown === item.name ? 'max-h-auto' : 'max-h-0'
                                )}
                            >
                                {item.links.map((link) => (
                                    // <>
                                    //     <Link
                                    //         key={link.to}
                                    //         to={link.to}
                                    //         className={clsx(
                                    //             'block px-4 py-2.5 text-sm hover:bg-[#e6f4ff] hover:text-blue-800  transition-all',
                                    //             isActiveRoute(link.to) && 'bg-[#e6f4ff]'
                                    //         )}
                                    //     >
                                    //         <FiberManualRecordIcon sx={{
                                    //             color: 'black',
                                    //             fontSize: '10px',
                                    //             marginRight: '10px'
                                    //         }}
                                    //             className={clsx(isActiveRoute(link.to) && 'text-blue-800')}

                                    //         />
                                    //         <span className={clsx('text-gray-800 font-[600]', isActiveRoute(link.to) && 'text-blue-800')} >{link.label}</span>
                                    //     </Link>
                                    //     <Divider variant='middle' sx={{
                                    //         mx: 0,
                                    //         p: 0,
                                    //     }} />
                                    // </>
                                    <React.Fragment key={link.to}>
                                        <Link
                                            to={link.to}
                                            className={`block px-4 py-2.5 text-sm hover:bg-[#e6f4ff] hover:text-blue-800 transition-all ${isActiveRoute(link.to) ? 'bg-[#e6f4ff] text-blue-800' : 'text-gray-800'}`}
                                        >
                                            <FiberManualRecordIcon
                                                sx={{
                                                    color: isActiveRoute(link.to) ? 'blue' : 'black',
                                                    fontSize: '10px',
                                                    marginRight: '10px',
                                                }}
                                            />
                                            <span className={`font-[600] ${isActiveRoute(link.to) ? 'text-blue-800' : 'text-gray-800'}`}>{link.label}</span>
                                        </Link>
                                        <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                                    </React.Fragment>
                                ))}
                            </div>
                            {/* 
                            <Divider variant='middle' sx={{
                                mx: 0,
                                p: 0,
                                // color: #000,
                            }} /> */}
                        </div>
                    </Tooltip>
                ))}
            </nav>

            {/* Logout Button */}
            <div className=" py-4">
                <Tooltip title="Logout" placement="right" arrow disableHoverListener={!isCollapsed}>
                    <button
                        className={clsx(
                            'flex items-center gap-4 py-2 w-full  hover:bg-[#e6f4ff] transition-all',
                            isCollapsed ? 'px-1 justify-center' : 'px-4'
                        )}
                        onClick={() => toast.success('logout successful!')}
                    >
                        <span className='text-gray-800' >
                            <FaSignOutAlt />
                        </span>
                        <span className={clsx(isCollapsed && 'hidden', 'text-gray-800 font-semibold')}>Logout</span>
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default Sidebar;





