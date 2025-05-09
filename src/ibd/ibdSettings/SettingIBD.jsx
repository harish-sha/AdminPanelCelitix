import React, { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Dialog } from 'primereact/dialog';
import AnimatedDropdown from '@/whatsapp/components/AnimatedDropdown';
import InputWithLabel from '@/whatsapp/components/InputWithLabel';
import InputField from '@/whatsapp/components/InputField';
import UniversalButton from '@/components/common/UniversalButton';

const allFlows = [
    { name: 'flow6', status: 'Published', createdAt: '30 Apr 2025, 11:15am' },
    { name: 'signup', status: 'Draft', createdAt: '22 Apr 2025, 05:48pm' },
    { name: 'newtest', status: 'Draft', createdAt: '22 Apr 2025, 05:46pm' },
    { name: 'flow5', status: 'Draft', createdAt: '01 May 2025, 10:00am' },
    { name: 'chatflownew', status: 'Draft', createdAt: '05 May 2025, 03:25pm' },
    { name: 'chatflow', status: 'Published', createdAt: '05 May 2025, 01:37pm' },
    { name: 'flow7', status: 'Draft', createdAt: '01 May 2025, 09:00am' },
    { name: 'flow8', status: 'Published', createdAt: '30 Apr 2025, 03:00pm' }
];
const SettingIBD = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedFlow, setSelectedFlow] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const rowsPerPage = 4;

    const filteredFlows = allFlows.filter(flow =>
        flow.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredFlows.length / rowsPerPage);
    const paginatedFlows = filteredFlows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleMenuOpen = (event, flow) => {
        setSelectedFlow(flow);
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
        setSelectedFlow(null);
    };

    const handleEdit = () => {
        console.log('Edit:', selectedFlow.name);
        handleMenuClose();
    };

    const handleDelete = () => {
        console.log('Delete:', selectedFlow.name);
        handleMenuClose();
    };

    const handleExport = () => {
        console.log('Export:', selectedFlow.name);
        handleMenuClose();
    };
    return (
        <div className=" bg-white border border-gray-300 rounded-xl shadow-sm">
            <div className="p-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold mb-2 sm:mb-0">WhatsApp Flows</h2>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by Flow Name"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
                        />
                        <button
                            onClick={() => setShowDialog(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            + Create New Flow
                        </button>
                    </div>
                </div>

                {/* Flows */}
                <div className="space-y-4">
                    {paginatedFlows.map((flow, index) => (
                        <div
                            key={index}
                            className="bg-blue-100 border border-blue-200 rounded-lg px-4 py-5 flex items-center justify-between flex-wrap sm:flex-nowrap"
                        >
                            <div className="flex items-center gap-3 min-w-[180px]">
                                <div className="bg-white p-2 rounded-full shadow">
                                    <div className="w-8 h-8 bg-gray-400 rounded"></div>
                                </div>
                                <div>
                                    <div className="font-semibold text-sm">{flow.name}</div>
                                    <span
                                        className={`text-xs font-bold px-2 py-1 rounded ${flow.status === 'Draft'
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-blue-500 text-white'
                                            }`}
                                    >
                                        {flow.status}
                                    </span>
                                </div>
                            </div>

                            <div className="text-sm text-center min-w-[80px]">
                                <div className="font-semibold text-sm">Flow Type</div>
                                <span className="text-xs font-bold px-2 py-1 bg-blue-300 text-blue-900 rounded">STATIC</span>
                            </div>

                            <div className="text-sm text-center min-w-[150px]">
                                <div className="font-semibold">WhatsApp Integration</div>
                                <div className="text-gray-600">Demo</div>
                            </div>

                            <div className="text-sm text-center min-w-[150px]">
                                <div className="font-semibold">Created At</div>
                                <div className="text-gray-700">{flow.createdAt}</div>
                            </div>

                            <div className="flex items-center gap-3 mt-3 sm:mt-0">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm flex items-center gap-1">
                                    ▶ {flow.status === 'Published' ? 'Draft' : 'Publish'}
                                </button>
                                <IconButton onClick={(e) => handleMenuOpen(e, flow)} size="small">
                                    <MoreVertIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-end items-center mt-4 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`text-sm px-3 py-1 border rounded hover:bg-gray-100 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
                                }`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                {/* Dropdown Menu */}
                <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <MenuItem onClick={handleEdit}>
                        <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleExport}>
                        <ListItemIcon><FileDownloadIcon fontSize="small" /></ListItemIcon>
                        <ListItemText>Export Screen</ListItemText>
                    </MenuItem>
                </Menu>

                <Dialog
                    visible={showDialog}
                    onHide={() => setShowDialog(false)}
                    style={{ width: '40rem' }}
                    draggable={false}
                    header={
                        <h2 className="text-md heading">
                            <span className="text-purple-600">Create New </span>Flow
                        </h2>
                    }
                >
                    <div className='flex flex-col gap-4'>
                        <InputField
                            label="Flow Name"
                            id="flowname"
                            name="flowname"
                            type="text"
                            placeholder="Enter Flow Name"
                        />
                        <AnimatedDropdown
                            label="Select Categories"
                            id="flowcategories"
                            name="flowcategories"
                            options={[
                                { value: 'static', label: 'Static' },
                                { value: 'dynamic', label: 'Dynamic' },
                            ]}
                            placeholder='Select Flow Categories'
                            onChange={(value) => console.log(value)}
                        />
                        <AnimatedDropdown
                            label="Whatsapp integration"
                            id="whatsappintegration"
                            name="whatsappintegration"
                            options={[
                                { value: 'static', label: 'Static' },
                                { value: 'dynamic', label: 'Dynamic' },
                            ]}
                            placeholder='Select Whatsapp Integration'
                            onChange={(value) => console.log(value)}
                        />
                        <UniversalButton
                            label="Create Flow"
                            type="button"
                            id="createflow"
                            name="createflow"
                            onClick={() => console.log('Flow Created')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        />
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

export default SettingIBD













// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Grid } from "@mui/material";
// import {
//   WhatsApp,
//   Email,
//   Call,
//   Lock,
//   Message,
//   PhoneAndroid,
//   SyncAlt,
//   Person,
//   Star,
//   TaskAlt,
//   TrendingUp,
//   Insights,
//   SmartToy,
//   SupportAgent,
//   Feedback,
// } from "@mui/icons-material";
// import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
// import whatsappAnime from "../../assets/animation/whatsappanimation.json";
// import whatsappAnime2 from "../../assets/animation/whatsappanimation2.json";
// import smsAnime from "../../assets/animation/smsanime.json";
// import rcs from "../../assets/animation/rcs.json";
// import sms from "../../assets/animation/sms.json";
// import auth from "../../assets/animation/auth.json";
// import email from "../../assets/animation/email.json";
// import email2 from "../../assets/animation/email2.json";
// import Animationsms from "../../assets/animation/Animation-sms.json";
// import Animationrcs from "../../assets/animation/Animation-rcs.json";
// import Animationibd from "../../assets/animation/Animation-ibd.json";
// import Animationobd from "../../assets/animation/Animation-obd.json";
// import Animationwhatsapp2 from "../../assets/animation/Animation-whatsapp2.json";
// import Lottie from "lottie-react";
// import { getUserDetails } from "@/apis/user/user";
// import toast from "react-hot-toast";



// import {
//   BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
// } from "recharts";

// const revenueData = [
//   { name: "Mon", online: 14000, offline: 11000 },
//   { name: "Tue", online: 16000, offline: 12000 },
//   { name: "Wed", online: 8000, offline: 22000 },
//   { name: "Thu", online: 17000, offline: 7000 },
//   { name: "Fri", online: 13000, offline: 11000 },
//   { name: "Sat", online: 16000, offline: 14000 },
//   { name: "Sun", online: 20000, offline: 12000 },
// ];

// const satisfactionData = [
//   { name: "Week 1", last: 400, current: 600 },
//   { name: "Week 2", last: 380, current: 800 },
//   { name: "Week 3", last: 410, current: 900 },
//   { name: "Week 4", last: 600, current: 1057 },
// ];

// const targetRealityData = [
//   { name: "Jan", reality: 5000, target: 7000 },
//   { name: "Feb", reality: 6000, target: 9000 },
//   { name: "Mar", reality: 7000, target: 9500 },
//   { name: "Apr", reality: 8200, target: 11000 },
//   { name: "May", reality: 9000, target: 12000 },
//   { name: "Jun", reality: 9400, target: 12500 },
//   { name: "Jul", reality: 9800, target: 13000 },
// ];










// const services = [
//   {
//     name: "WhatsApp",
//     icon: WhatsApp,
//     animation: Animationwhatsapp2,
//     desc: "Send real-time notifications",
//     color: "from-green-100 to-green-300",
//   },
//   {
//     name: "RCS",
//     icon: Message,
//     animation: Animationrcs,
//     desc: "Interactive messaging solution",
//     color: "from-purple-100 to-purple-300",
//   },
//   {
//     name: "OBD",
//     icon: Call,
//     animation: Animationobd,
//     desc: "Automated outbound dialer",
//     color: "from-yellow-100 to-yellow-300",
//   },
//   {
//     name: "IBD",
//     icon: Call,
//     animation: Animationibd,
//     desc: "Track inbound communications",
//     color: "from-indigo-100 to-indigo-300",
//   },
//   {
//     name: "SMS",
//     icon: PhoneAndroid,
//     animation: Animationsms,
//     desc: "Send and receive SMS",
//     color: "from-pink-100 to-pink-300",
//   },
//   {
//     name: "Email",
//     icon: Email,
//     animation: email2,
//     desc: "Campaign and transactional email",
//     color: "from-blue-100 to-blue-300",
//   },
//   {
//     name: "App Authenticator",
//     icon: Lock,
//     animation: auth,
//     desc: "Secure 2FA login solutions",
//     color: "from-gray-100 to-gray-300",
//   },
//   {
//     name: "Two-Way SMS",
//     icon: SyncAlt,
//     desc: "Bi-directional messaging",
//     color: "from-red-100 to-red-300",
//   },
// ];

// const quickStats = [
//   {
//     icon: <TaskAlt className="text-green-600" />,
//     label: "Active Campaigns",
//     value: 32,
//   },
//   {
//     icon: <TrendingUp className="text-blue-600" />,
//     label: "Engagement Rate",
//     value: "78%",
//   },
//   {
//     icon: <Star className="text-yellow-500" />,
//     label: "Client Rating",
//     value: "4.8/5",
//   },
// ];

// const bots = [
//   {
//     name: "Support Bot",
//     desc: "Handles common queries 24/7",
//     icon: SupportAgent,
//   },
//   {
//     name: "Onboarding Bot",
//     desc: "Welcomes and guides new users",
//     icon: SmartToy,
//   },
//   { name: "Feedback Bot", desc: "Collects customer feedback", icon: Feedback },
// ];

// const SettingIBD = () => {
//   const [userData, setUserData] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: "",
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       setLoading(true);
//       const response = await getUserDetails();
//       if (response && response.statusCode === 200) {
//         const user = response.data[0];
//         setUserData(user);
//         setFormData({ firstName: user.firstName || "" });
//       } else {
//         console.error("Failed to load user details.");
//         toast.error("Failed to load user details!");
//       }
//       setLoading(false);
//     };
//     fetchUserDetails();
//   }, []);

//   return (
//     <div className="bg-white text-gray-900 rounded-2xl p-4 space-y-6 min-h-[calc(100vh-6rem)]">
//       {/* Logged In User Card */}
//       <motion.div
//         className="rounded-2xl shadow-md p-6 flex items-center justify-between flex-wrap gap-6 bg-gradient-to-br from-blue-50 to-blue-100"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex items-center flex-wrap justify-center gap-4">
//           <div className="bg-blue-200 border-2 border-blue-400 h-20 w-20 flex items-center justify-center rounded-full shadow-2xl">
//             <Person
//               className="text-blue-600"
//               sx={{
//                 fontSize: 30,
//               }}
//             />
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold">
//               Welcome back, {formData.firstName || "User"}{" "}
//             </h2>
//             <p className="text-sm opacity-80">
//               You're doing great. Here's a quick overview of your dashboard.
//             </p>
//           </div>
//         </div>
//         <div className="grid lg:grid-cols-3 gap-4 grid-cols-1  items-center">
//           {quickStats.map((stat, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl shadow p-3 px-5 flex flex-col items-start justify-center"
//             >
//               <div className="text-2xl">{stat.icon}</div>
//               <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
//               <div className="font-semibold text-lg">{stat.value}</div>
//             </div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Service Cards */}
//       <Grid container spacing={3}>
//         {services.map((service, index) => {
//           const IconComponent = service.icon;
//           return (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className={`rounded-xl bg-gradient-to-br ${service.color} p-5 h-50 shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-300`}
//               >
//                 <div className="font-semibold text-lg text-gray-800">
//                   {service.name}
//                 </div>
//                 <motion.div className="flex items-center justify-end z-10">
//                   <div className="flex justify-end">
//                     {service.animation ? (
//                       <div className="w-full  h-auto text-left">
//                         <Lottie
//                           animationData={service.animation}
//                           loop
//                           autoplay
//                           className="w-22 h-auto "
//                         />
//                       </div>
//                     ) : (
//                       <IconComponent className="text-gray-700 group-hover:rotate-6 transition-transform duration-300" />
//                     )}
//                   </div>
//                 </motion.div>
//                 <p className="text-sm opacity-70 mt-3">{service.desc}</p>
//               </motion.div>
//             </Grid>
//           );
//         })}
//       </Grid>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//       {/* Total Revenue */}
//       <div className="bg-white p-4 rounded-2xl shadow-sm">
//         <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
//         <ResponsiveContainer width="100%" height={220}>
//           <BarChart data={revenueData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="online" fill="#3498db" name="Online Sales" />
//             <Bar dataKey="offline" fill="#2ecc71" name="Offline Sales" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Customer Satisfaction */}
//       <div className="bg-white p-4 rounded-2xl shadow-sm">
//         <h2 className="text-lg font-semibold mb-2">Customer Satisfaction</h2>
//         <ResponsiveContainer width="100%" height={220}>
//           <LineChart data={satisfactionData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="last" stroke="#3498db" name="Last Month" />
//             <Line type="monotone" dataKey="current" stroke="#2ecc71" name="This Month" />
//           </LineChart>
//         </ResponsiveContainer>
//         <div className="flex justify-between text-sm mt-2 text-gray-600">
//           <div>$1,017</div>
//           <div>$1,757</div>
//         </div>
//       </div>

//       {/* Target vs Reality */}
//       <div className="bg-white p-4 rounded-2xl shadow-sm">
//         <h2 className="text-lg font-semibold mb-2">Target vs Reality</h2>
//         <ResponsiveContainer width="100%" height={220}>
//           <BarChart data={targetRealityData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="reality" fill="#1abc9c" name="Reality Sales" />
//             <Bar dataKey="target" fill="#f1c40f" name="Target Sales" />
//           </BarChart>
//         </ResponsiveContainer>
//         <div className="flex justify-between text-sm mt-2">
//           <span className="text-green-600">8,823</span>
//           <span className="text-yellow-600">12,122</span>
//         </div>
//       </div>
//         </div>
//     </div>
//   );
// };

// export default SettingIBD;

