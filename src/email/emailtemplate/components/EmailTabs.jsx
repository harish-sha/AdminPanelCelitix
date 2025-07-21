import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaThLarge,
    FaFacebookMessenger,
    FaInstagram,
    FaClone,
    FaUserTie,
    FaUserCheck,
    FaUserClock,
    FaBolt,
    FaCog,
    FaFolderOpen,
    FaRegEdit,
} from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";


const channels = [
    {
        label: "Dashboard",
        value: "",
        icon: <BiSolidDashboard className='text-purple-400 text-lg' />

    },
    {
        label: "Libraries",
        value: "emaillibrary",
        icon: <FaFolderOpen className="text-green-500 text-lg" />,
    },
    {
        label: "Templates",
        value: "emailltemplates",
        icon: <FaRegEdit className="text-purple-500 text-lg" />,
    },
    {
        label: "Settings",
        value: "emaillsettings",
        icon: <FaCog className="text-gray-500 text-lg" />,
    }
];

const quickActions = [
    {
        label: "Assign Agent",
        icon: <FaUserTie className="text-indigo-500 text-sm" />,
    },
    {
        label: "Mark Active",
        icon: <FaUserCheck className="text-green-500 text-sm" />,
    },
    {
        label: "Put on Hold",
        icon: <FaUserClock className="text-yellow-500 text-sm" />,
    },
    {
        label: "Trigger Workflow",
        icon: <FaBolt className="text-gray-500 text-sm" />,
    },
];

const EmailTabs = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const activeTab = pathname.split("/")[2];
    return (
        <div className="flex flex-col gap-2 relative z-10">
            <div className="flex border-b bg-white shadow-sm px-4 relative z-10 rounded-2xl overflow-auto">
                {channels.map((ch) => {
                    const isActive = activeTab === ch.value;
                    return (
                        <button
                            key={ch.value}
                            onClick={() => navigate(`/emailmanagement/${ch.value}`)}
                            className={`relative group px-4 py-3 text-sm font-medium cursor-pointer transition-colors duration-300
                            ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"}`
                            }
                        >
                            <div className="flex items-center gap-2">
                                {ch.icon}
                                <span>{ch.label}</span>
                            </div>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute left-2 right-2 bottom-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Quick Actions */}
            {/* <div className="px-4 py-2 flex flex-wrap items-center gap-3 bg-white shadow rounded-md border border-gray-100">
                {quickActions.map((action, i) => (
                    <button
                        key={i}
                        className="flex items-center gap-2 text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full hover:bg-blue-100 hover:text-blue-600 transition"
                    >
                        {action.icon}
                        <span>{action.label}</span>
                    </button>
                ))}
            </div> */}
        </div>
    );
}

export default EmailTabs
