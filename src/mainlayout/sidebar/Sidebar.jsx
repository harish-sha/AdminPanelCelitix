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
        setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
    };

    // Check if a route is active
    const isActiveRoute = (route) => location.pathname.startsWith(route);

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
                { to: '/managetemplate', label: 'Launch Campaigns' },
                { to: '#', label: 'Live Chats' },
                { to: '#', label: 'Manage Campaigns' },
                { to: '#', label: 'Manage Templates' },
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
                'h-screen bg-white text-white px-2 flex flex-col transition-all duration-300',
                isCollapsed ? 'w-16' : 'w-64',
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
                <Tooltip title="Home" placement="right" arrow disableHoverListener={!isCollapsed}>
                    <Link
                        to="/"
                        className={clsx(
                            'flex items-center gap-4 px-4 py-2 mb-1 rounded-lg hover:bg-[#e6f4ff] transition-all',
                            isActiveRoute('/') && 'bg-[#e6f4ff]',
                            isCollapsed && 'justify-center'
                        )}
                    >
                        <span className="flex-shrink-0 text-blue-800">
                            <FaHome />
                        </span>
                        <span className={clsx(isCollapsed && 'hidden', 'text-blue-800 font-[600]')}>Home</span>
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

                            {/* Dropdown Content */}
                            <div
                                className={clsx(
                                    'overflow-hidden transition-max-height rounded-lg  duration-300 ease-in-out',
                                    openDropdown === item.name ? 'max-h-auto' : 'max-h-0'
                                )}
                            >
                                {item.links.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={clsx(
                                            'block px-4 py-[0.3rem] text-sm hover:bg-[#e6f4ff] my-2 rounded-lg transition-all',
                                            isActiveRoute(link.to) && 'bg-[#e6f4ff]'
                                        )}
                                    >
                                        <FiberManualRecordIcon sx={{
                                            color: 'black',
                                            fontSize: '10px',
                                            marginRight: '10px'
                                        }} />
                                        <span className='text-gray-700 font-[600]' >{link.label}</span>
                                    </Link>
                                ))}
                            </div>

                            <Divider variant='middle' sx={{
                                mx: 0,
                                p: 0,
                                // color: #000,
                            }} />
                        </div>
                    </Tooltip>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="px-2 py-4">
                <Tooltip title="Logout" placement="right" arrow disableHoverListener={!isCollapsed}>
                    <button
                        className={clsx(
                            'flex items-center gap-4 py-2 w-full rounded-lg hover:bg-[#6b728075] transition-all',
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





