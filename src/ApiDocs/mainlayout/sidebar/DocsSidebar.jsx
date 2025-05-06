import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCog, FaHome, FaSignOutAlt, FaBars, FaWhatsapp } from 'react-icons/fa';
import { MdExpandLess, MdExpandMore, MdOutlineEmail } from 'react-icons/md';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { SiGoogleauthenticator } from "react-icons/si";
import { LuMessageSquareMore } from "react-icons/lu";
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import toast from 'react-hot-toast';
import { SiGoogledocs } from "react-icons/si";
import clsx from 'clsx';

const DocsSidebar = ({ isCollapsed, setIsCollapsed }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();
    const dropdownRefs = useRef({});

    const navigate = useNavigate();

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

    // const isActiveRoute = (route) => location.pathname.startsWith(route);
    const isActiveRoute = (route) => {
        if (route === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(route);
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

    const menuItems = [
        {
            name: 'Home',
            icon: <FaHome />,
            label: 'Home',
            type: "single",
            to: "whatsappDocs",
        },
    ];

    return (
        <div
            className={clsx(
                "h-screen  bg-white text-white px-0 flex flex-col fixed top-14 left-0 transition-all duration-300 overflow-y-auto",
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

            <nav className="mt-1">
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
                                        <span className={clsx(isCollapsed && 'hidden', 'text-black font-[600] ')}>
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
                        <Tooltip key={item.name} title={isCollapsed ? item.label : ""} placement="right" arrow>
                            {item.onClick ? (
                                <button
                                    onClick={item.onClick}
                                    className={clsx(
                                        "flex items-center gap-4 px-4 py-2 transition-all w-full text-left cursor-pointer",
                                        "text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800",
                                        isCollapsed && "justify-center"
                                    )}
                                >
                                    <span className="flex-shrink-0">{item.icon}</span>
                                    <span className={clsx(isCollapsed && "hidden", "font-[600]")}>{item.label}</span>
                                </button>
                            ) : (
                                <Link
                                    to={item.to}
                                    className={clsx(
                                        "flex items-center gap-4 px-4 py-2 transition-all",
                                        isActiveRoute(item.to) ? "bg-[#e6f4ff] text-blue-800" : "text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800",
                                        isCollapsed && "justify-center"
                                    )}
                                >
                                    <span className="flex-shrink-0">{item.icon}</span>
                                    <span className={clsx(isCollapsed && "hidden", "font-[600]")}>{item.label}</span>
                                </Link>
                            )}
                        </Tooltip>
                    )
                ))}
            </nav>

        </div>
    );
};

export default DocsSidebar;





