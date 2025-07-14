// // File: components/Sidebar.jsx
// import { useState } from 'react';
// import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Divider, Tooltip } from '@mui/material';
// import { motion } from 'framer-motion';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import TaskIcon from '@mui/icons-material/Assignment';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import PeopleIcon from '@mui/icons-material/People';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SettingsIcon from '@mui/icons-material/Settings';
// import InsightsIcon from '@mui/icons-material/Insights';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
// import { useNavigate } from 'react-router-dom';

// import MenuIcon from '@mui/icons-material/Menu';

// const Sidebar = ({ role = 'admin' }) => {

//   const navigate = useNavigate();

//   const navItems = [
//     { label: 'Dashboard', icon: <DashboardIcon />, roles: ['admin', 'manager'], route: '/dashboard' },
//     { label: 'Tasks', icon: <TaskIcon />, roles: ['admin', 'manager', 'user'], route: '/tasks' },
//     { label: 'Calendar', icon: <CalendarTodayIcon />, roles: ['admin', 'manager', 'user'], route: '/calendar' },
//     { label: 'Users', icon: <PeopleIcon />, roles: ['admin'], route: '/admin/manageroles' },
//     { label: 'Analytics', icon: <InsightsIcon />, roles: ['admin'], route: '/analytics' },
//     {
//       label: 'Notifications',
//       icon: <NotificationsIcon />,
//       roles: ['admin', 'manager'],
//       route: '/notifications',
//       subRoutes: [
//         { label: 'Email', route: '/notifications/email' },
//         { label: 'SMS', route: '/notifications/sms' },
//         { label: 'Push', route: '/notifications/push' }
//       ]
//     },
//     { label: 'Settings', icon: <SettingsIcon />, roles: ['admin'], route: '/settings' },
//     { label: 'Help', icon: <HelpOutlineIcon />, roles: ['admin', 'manager', 'user'], route: '/help' }
//   ];

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: 72,
//         zIndex: 1000,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: 72,
//           boxSizing: 'border-box',
//           backgroundColor: '#fff',
//           color: 'black',
//         },
//       }}
//     >
//       <div className='py-2 flex items-center justify-center'>
//         <img src="/images/celifav.png" alt="" width='40' height='40' />
//       </div>
//       <Divider sx={{ borderColor: '#374151' }} />
//       <List>
//         {navItems
//           .filter(item => item.roles.includes(role))
//           .map((item, index) => (
//             <Tooltip
//               title={
//                 item.subRoutes
//                   ? (
//                     <div>
//                       {item.subRoutes.map((sub, i) => (
//                         <div key={i} style={{ padding: '4px 8px', cursor: 'pointer' }} onClick={() => navigate(sub.route)}>
//                           {sub.label}
//                         </div>
//                       ))}
//                     </div>
//                   )
//                   : item.label
//               }
//               placement="right"
//               arrow
//               key={index}
//             >
//               <ListItem
//                 // button
//                 onClick={() => item.route && navigate(item.route)}
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   cursor: 'pointer',
//                   padding: '12px 0',
//                   '&:hover': {
//                     backgroundColor: '#e6f4ff',
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{
//                   color: '#374151', justifyContent: 'center',
//                   '&:hover': {
//                     color: '#193cb8 ',
//                   },
//                 }}>
//                   {item.icon}
//                 </ListItemIcon>
//               </ListItem>
//             </Tooltip>
//           ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;

// import { useState } from "react";
// import {
//   FiBarChart,
//   FiChevronDown,
//   FiChevronsRight,
//   FiDollarSign,
//   FiHome,
//   FiMonitor,
//   FiShoppingCart,
//   FiTag,
//   FiUsers,
//   FiUser,
//   FiLogOut,
// } from "react-icons/fi";
// import { FaWpforms } from "react-icons/fa";
// import { IoSettingsOutline } from "react-icons/io5";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Dialog } from "primereact/dialog";
// import { Box, Typography, Button } from "@mui/material";
// import toast from "react-hot-toast";
// // import { useAuth } from "../../context/AuthContext";
// // import UserProfile from "../Miscellaneous/UserProfile";



// const LeadSidebar = ({ role = "admin" }) => {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState("Dashboard");
//   const [profileDialogOpen, setProfileDialogOpen] = useState(false);
//   const navigate = useNavigate();
//   // const { logout, user } = useAuth();


//   const handleLogout = () => {
//     logout();
//     toast.success("You have successfully logged out!");
//   };

//   const navItems = [
//     { label: "Dashboard", icon: FiHome, roles: ["admin", "manager"], route: "leaddash", },
//     { label: "Tags", icon: FiTag, roles: ["admin", "manager"], route: "leadtags" },
//     { label: "Reports", icon: FiUsers, roles: ["admin"], route: "leadreports" },
//     { label: "Forms", icon: FaWpforms,  roles: ["admin"], route: "leadforms" },
//     { label: "Analytics", icon: FiBarChart, roles: ["admin"], route: "leadanalytics" },
//     { label: "Settings", icon: IoSettingsOutline, roles: ["admin", "manager",], route: "leadsettings" },
//     // {
//     //   label: "Logout", icon: FiLogOut, roles: ["admin", "manager",],
//     //   onClick: handleLogout
//     // },
//     // {
//     //   label: "Products",
//     //   icon: FiShoppingCart,
//     //   roles: ["admin", "manager"],
//     //   dropdownItems: [
//     //     { label: "Add Product", route: "/products/add" },
//     //     { label: "Manage Products", route: "/products/manage" },
//     //     { label: "Product Categories", route: "/products/categories" },
//     //   ],
//     // },
//   ];

//   return (
//     <>
//       <motion.nav
//         layout
//         // className={`sticky top-0 left-0 h-screen z-50 shrink-0 border-r border-slate-300 bg-white p-2   `}
//         // style={{
//         //   width: open ? "225px" : "fit-content",
//         // }} 

//         //  className={`fixed md:relative top-0 left-0 h-screen z-50 shrink-0 border-r border-slate-300 bg-white p-2 transition-transform duration-300 ease-in-out ${
//         //           open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         //         }`}
//         //         style={{
//         //           width: open ? "225px" : "fit-content",
//         //         }}


//         // className={`fixed md:relative top-0 left-0 h-screen z-[1000] shrink-0 border-r border-slate-300 bg-white p-2`}
//         // style={{
//         //   width: open ? "225px" : "60px",
//         //   // transform: "none",  
//         //   minWidth: "60px",
//         // }} 

//         className={`sticky top-0 left-0 h-full z-50 shrink-0 border-r border-slate-300 bg-white p-2 flex flex-col`}
//         style={{
//           width: open ? "225px" : "fit-content",
//         }}
//       >
//         <TitleSection
//           open={open}
//           role={role}
//           // user={user}
//           setProfileDialogOpen={setProfileDialogOpen}
//         />
//         <ToggleClose open={open} setOpen={setOpen} />

//         <div className="space-y-1">
//           {navItems
//             .filter((item) => item.roles.includes(role))
//             .map((item, index) => (
//               <Option
//                 key={index}
//                 Icon={item.icon}
//                 title={item.label}
//                 selected={selected}
//                 setSelected={setSelected}
//                 open={open}
//                 notifs={item.notifs}
//                 dropdownItems={item.dropdownItems}
//                 navigate={navigate}
//                 route={item.route}
//                 onClick={item.onClick}
//               />
//             ))}
//         </div>
//       </motion.nav>


//       {/* <Dialog
//         visible={profileDialogOpen}
//         onHide={() => setProfileDialogOpen(false)} // Close the dialog
//         header="Profile"
//         style={{ width: "300px" }}
//       >
//         <Box>
//           <Typography variant="body1">
//             <strong>Username:</strong> {user.username}
//           </Typography>
//           <Typography variant="body1">
//             <strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//           </Typography>
//         </Box>
//       </Dialog> */}

//       {/* <UserProfile
//       profileDialogOpen={profileDialogOpen}
//       setProfileDialogOpen={setProfileDialogOpen}
//       userData={user}
//       /> */}
//     </>
//   );
// };

// const Option = ({ Icon, title, selected, setSelected, open, notifs, dropdownItems, navigate, route, onClick }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleClick = () => {
//     setSelected(title);
//     if (onClick) {
//       onClick();
//     } else if (dropdownItems) {
//       setDropdownOpen((prev) => !prev);
//     } else if (route) {
//       navigate(route);
//     }
//   };

//   return (
//     <motion.div layout className="relative">
//       <motion.button
//       title={title}
//         layout
//         onClick={handleClick}
//         className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"
//           }`}
//       >
//         <motion.div layout className="grid h-full w-10 place-content-center text-lg">
//           <Icon />
//         </motion.div>
//         {open && (
//           <motion.span
//             layout
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.125 }}
//             className="text-xs font-medium"
//           >
//             {title}
//           </motion.span>
//         )}

//         {notifs && open && (
//           <motion.span
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//             }}
//             style={{ y: "-50%" }}
//             transition={{ delay: 0.5 }}
//             className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
//           >
//             {notifs}
//           </motion.span>
//         )}
//       </motion.button>

//       {/* Dropdown Menu */}
//       {dropdownItems && dropdownOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           className="absolute left-10 top-full mt-1 w-40 bg-white shadow-lg rounded-md border border-slate-200 z-10"
//         >
//           {dropdownItems.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => navigate(item.route)}
//               className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
//             >
//               {item.label}
//             </button>
//           ))}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// const TitleSection = ({ open, role, setProfileDialogOpen }) => {
//   return (
//     <div className=" border-slate-300">
//       <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
//         <div className="flex items-center gap-2">
//           {/* <Logo /> */}
//           {/* {open && (
//             <motion.div
//               layout
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.125 }}
//             >
//               <span className="block text-xs font-semibold">Task Manager</span>
//               <span className="block text-xs text-slate-500">
//                 {role.charAt(0).toUpperCase() + role.slice(1)} Panel
//               </span>
//             </motion.div>
//           )} */}
//         </div>
//         {/* {open && <FiChevronDown className="mr-2" />} */}
//         {/* {open && (
//           <FiUser
//             className="mr-2 cursor-pointer"
//             onClick={() => setProfileDialogOpen(true)}
//           />
//         )} */}
//       </div>
//     </div>
//   );
// };

// const Logo = () => {
//   return (
//     <motion.div
//       layout
//       className="grid size-10 shrink-0 place-content-center rounded-md "
//     >
//       <svg
//         width="24"
//         height="auto"
//         viewBox="0 0 50 39"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="fill-slate-50"
//       >
//         <path
//           d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
//           stopColor="#000000"
//         ></path>
//         <path
//           d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
//           stopColor="#000000"
//         ></path>
//       </svg>
//       {/* <img src="/images/celifav.png" alt="" width='40' height='40' /> */}

//     </motion.div>
//   );
// };

// const ToggleClose = ({ open, setOpen }) => {
//   return (
//     <motion.button
//       layout
//       onClick={() => setOpen((pv) => !pv)}
//       className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
//     >
//       {/* <div className="flex items-center p-2">
//         <motion.div layout className="grid size-10 place-content-center text-lg">
//           <FiChevronsRight
//             className={`transition-transform ${open && "rotate-180"}`}
//           />
//         </motion.div>
//         {open && (
//           <motion.span
//             layout
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.125 }}
//             className="text-xs font-medium"
//           >
//             Hide
//           </motion.span>
//         )}
//       </div> */}
//     </motion.button>
//   );
// };

// export default LeadSidebar;




// src/components/LeadSidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiBarChart,
  FiChevronsRight,
  FiHome,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const navItems = [
  { label: "Dashboard", icon: FiHome,   roles: ["admin","manager"], route: "/leadmanagement/leaddash" },
  { label: "Tags",      icon: FiTag,    roles: ["admin","manager"], route: "/leadmanagement/leadtags" },
  { label: "Reports",   icon: FiUsers,  roles: ["admin"],         route: "/leadmanagement/leadreports" },
  { label: "Forms",     icon: FaWpforms,roles: ["admin"],         route: "/leadmanagement/leadforms" },
  { label: "Analytics", icon: FiBarChart,roles: ["admin"],        route: "/leadmanagement/leadanalytics" },
  { label: "Settings",  icon: IoSettingsOutline, roles:["admin","manager"], route:"/leadmanagement/leadsettings" },
];

export default function LeadSidebar({ role = "admin" }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      layout
      className="sticky top-0 left-0 h-full z-50 shrink-0 border-r border-slate-300 bg-white p-2 flex flex-col"
      style={{ width: open ? 225 : 60 }}
    >
      {/* Collapse toggle */}
      {/* <motion.button
        layout
        onClick={() => setOpen((o) => !o)}
        className="absolute bottom-0 left-0 right-0 border-t border-slate-300 p-2 hover:bg-slate-100"
      >
        <FiChevronsRight
          className={`mx-auto transition-transform ${open ? "" : "rotate-180"}`}
        />
      </motion.button> */}

      {/* Nav items */}
      <div className="mt-2 space-y-1">
        {navItems
          .filter((item) => item.roles.includes(role))
          .map(({ label, icon: Icon, route }) => (
            <NavLink
              key={route}
              to={route}
              end
              className={({ isActive }) =>
                `flex items-center h-10 rounded-md transition-colors ${
                  isActive
                    ? "bg-indigo-100 text-indigo-800"
                    : "text-slate-500 hover:bg-slate-100"
                }`
              }
              title={label}
            >
              <div className="flex h-full w-10 items-center justify-center text-lg">
                <Icon />
              </div>
              {open && (
                <span className="text-xs font-medium">
                  {label}
                </span>
              )}
            </NavLink>
          ))}
      </div>
    </motion.nav>
  );
}


