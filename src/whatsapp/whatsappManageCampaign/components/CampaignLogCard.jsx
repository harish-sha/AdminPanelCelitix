// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Collapse,
//   IconButton,
//   Box,
//   CardHeader,
//   Avatar,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { styled } from "@mui/material/styles";
// import PersonIcon from "@mui/icons-material/Person";
// import DoneIcon from "@mui/icons-material/Done";
// import ErrorIcon from "@mui/icons-material/Error";
// import ScheduleIcon from "@mui/icons-material/Schedule";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// const CampaignLogCard = ({ log }) => {
//   const [expanded, setExpanded] = useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <div className="mb-6 rounded-lg shadow-lg bg-white">
//       <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
//         <div className="flex items-center">
//           <Avatar className="bg-white text-blue-500">
//             <PersonIcon />
//           </Avatar>
//           <div className="ml-4">
//             <Typography variant="h6" component="div" className="text-white">
//               User: {log.userId}
//             </Typography>
//             <Typography variant="body2" className="text-white">
//               Sent Date: {log.queDate}
//             </Typography>
//           </div>
//         </div>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//           className={`transform transition-transform duration-200 ${
//             expanded ? "rotate-180" : "rotate-0"
//           } text-white`}
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </div>
//       <CardContent>
//         <div className="flex justify-between mb-4">
//           <div className="flex items-center">
//             <DoneIcon className="text-green-500 mr-2" />
//             <Typography variant="body2" className="text-gray-700">
//               Delivered: {log.delivered}
//             </Typography>
//           </div>
//           <div className="flex items-center">
//             <ErrorIcon className="text-red-500 mr-2" />
//             <Typography variant="body2" className="text-gray-700">
//               Failed: {log.failed}
//             </Typography>
//           </div>
//           <div className="flex items-center">
//             <ScheduleIcon className="text-gray-500 mr-2" />
//             <Typography variant="body2" className="text-gray-700">
//               Total: {log.total}
//             </Typography>
//           </div>
//         </div>
//       </CardContent>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography paragraph variant="subtitle1" className="font-semibold">
//             Details:
//           </Typography>
//           <Typography paragraph className="text-gray-700">
//             Busy: {log.busy}
//           </Typography>
//           <Typography paragraph className="text-gray-700">
//             Block: {log.block}
//           </Typography>
//           <Typography paragraph className="text-gray-700">
//             Submitted: {log.submitted}
//           </Typography>
//           <Typography paragraph className="text-gray-700">
//             Charged Unit: {log.chargedUnit}
//           </Typography>
//           <Typography paragraph className="text-gray-700">
//             Read: {log.read}
//           </Typography>
//           <Typography paragraph className="text-gray-700">
//             Undelivered: {log.undelivered}
//           </Typography>
//         </CardContent>
//       </Collapse>
//     </div>
//   );
// };

// export default CampaignLogCard;

// ==========

import React from "react";
import {
  Avatar,
  Box,
  Typography,
  Tooltip,
  Paper,
  Divider,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PersonIcon from "@mui/icons-material/Person";
import BlockIcon from "@mui/icons-material/Block";
import SendIcon from "@mui/icons-material/Send";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import { motion } from "framer-motion";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Grid } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const statusColors = {
  delivered: "text-green-500",
  failed: "text-red-500",
  total: "text-gray-500",
};

const CampaignLogCard = ({ log }) => {
  const navigate = useNavigate();
  return (
    // <Paper className="w-full p-6 bg-white shadow-lg rounded-xl border border-gray-200">
    //   {/* Header */}
    //   <Box className="flex items-center space-x-4 border-b pb-4 mb-4">
    //     <Avatar className="bg-blue-500">
    //       <PersonIcon className="text-white" />
    //     </Avatar>
    //     <Box>
    //       <Typography variant="h6" className="font-semibold text-gray-800">
    //         User: {log.userId}
    //       </Typography>
    //       <Typography variant="body2" className="text-gray-500">
    //         Sent Date: {log.queDate}
    //       </Typography>
    //     </Box>
    //   </Box>

    //   {/* Data Grid */}
    //   <Grid container spacing={3}>
    //     {[
    //       {
    //         label: "Delivered",
    //         value: log.delivered,
    //         icon: <DoneIcon className="text-green-500" />,
    //       },
    //       {
    //         label: "Failed",
    //         value: log.failed,
    //         icon: <ErrorIcon className="text-red-500" />,
    //       },
    //       {
    //         label: "Total",
    //         value: log.total,
    //         icon: <ScheduleIcon className="text-gray-500" />,
    //       },
    //       { label: "Busy", value: log.busy },
    //       { label: "Block", value: log.block },
    //       { label: "Submitted", value: log.submitted },
    //       { label: "Charged Unit", value: log.chargedUnit },
    //       { label: "Read", value: log.read },
    //       { label: "Undelivered", value: log.undelivered },
    //     ].map((item, index) => (
    //       <Grid item xs={6} sm={4} md={3} key={index}>
    //         <motion.div
    //           className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md h-28"
    //           initial={{ opacity: 0, y: 10 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           transition={{ duration: 0.4 + index * 0.1 }}
    //         >
    //           {item.icon && (
    //             <Tooltip title={`${item.label} Messages`} arrow>
    //               {item.icon}
    //             </Tooltip>
    //           )}
    //           <Typography variant="body2" className="text-gray-700 mt-2">
    //             {item.label}
    //           </Typography>
    //           <Typography variant="h6" className="font-semibold text-gray-900">
    //             {item.value}
    //           </Typography>
    //         </motion.div>
    //       </Grid>
    //     ))}
    //   </Grid>
    // </Paper>

    // <Paper className="w-full p-6 bg-gray-900 text-white shadow-lg rounded-xl border border-gray-700 relative overflow-hidden">
    //   {/* Background Glow */}
    //   <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 opacity-30 blur-3xl"></div>

    //   {/* Header */}
    //   <Box className="flex items-center space-x-4 border-b border-gray-600 pb-4 mb-4 relative z-10">
    //     <Avatar className="bg-white text-gray-900 shadow-md">
    //       <PersonIcon />
    //     </Avatar>
    //     <Box>
    //       <Typography variant="h6" className="font-bold text-white">
    //         User: {log.userId}
    //       </Typography>
    //       <Typography variant="body2" className="text-gray-400">
    //         Sent Date: {log.queDate}
    //       </Typography>
    //     </Box>
    //   </Box>

    //   {/* Data Blocks */}
    //   <Box className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
    //     {[
    //       {
    //         label: "Delivered",
    //         value: log.delivered,
    //         icon: <DoneIcon className="text-green-400" />,
    //       },
    //       {
    //         label: "Failed",
    //         value: log.failed,
    //         icon: <ErrorIcon className="text-red-400" />,
    //       },
    //       {
    //         label: "Total",
    //         value: log.total,
    //         icon: <ScheduleIcon className="text-gray-400" />,
    //       },
    //       { label: "Busy", value: log.busy },
    //       { label: "Block", value: log.block },
    //       { label: "Submitted", value: log.submitted },
    //       { label: "Charged Unit", value: log.chargedUnit },
    //       { label: "Read", value: log.read },
    //       { label: "Undelivered", value: log.undelivered },
    //     ].map((item, index) => (
    //       <motion.div
    //         key={index}
    //         className="flex flex-col items-center p-4 bg-gray-800 bg-opacity-50 rounded-lg shadow-md backdrop-blur-lg border border-gray-700 hover:bg-gray-700 transition duration-300"
    //         initial={{ opacity: 0, scale: 0.9 }}
    //         animate={{ opacity: 1, scale: 1 }}
    //         transition={{ duration: 0.3 + index * 0.1 }}
    //       >
    //         {item.icon && (
    //           <Tooltip title={`${item.label} Messages`} arrow>
    //             {item.icon}
    //           </Tooltip>
    //         )}
    //         <Typography variant="body2" className="text-gray-300 mt-2">
    //           {item.label}
    //         </Typography>
    //         <Typography variant="h6" className="font-bold text-white">
    //           {item.value}
    //         </Typography>
    //       </motion.div>
    //     ))}
    //   </Box>
    // </Paper>

    <Box className="flex justify-center items-start min-h-[70vh]">
      <Paper className="w-full  p-5 bg-white text-gray-900 shadow-lg border border-gray-300 flex flex-col space-y-4">
        {/* Header */}
        <Box className="flex items-center space-x-4 pb-3 bg-gray-200 p-3 rounded-xl">
          <Avatar className="bg-blue-500 text-white shadow-md">
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" className="font-semibold text-gray-900">
              User ID: {log.userId}
            </Typography>
            <Typography variant="body2" className="text-gray-500 ">
              Sent Date: {log.queDate}
            </Typography>
          </Box>
        </Box>
        <Divider />
        {/* Stats List */}
        <Box className="grid grid-cols-3 gap-4 w-full mt-4">
          {[
            {
              label: "Delivered",
              value: log.delivered,
              icon: <DoneIcon className="text-green-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log },
                }),
            },
            {
              label: "Failed",
              value: log.failed,
              icon: <ErrorIcon className="text-red-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log },
                }),
            },
            {
              label: "Total",
              value: log.total,
              icon: <GroupsOutlinedIcon className="text-gray-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log },
                }),
            },
            {
              label: "Busy",
              value: log.busy,
              icon: <SmsFailedIcon className="text-yellow-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log },
                }),
            },
            {
              label: "Blocked",
              value: log.block,
              icon: <BlockIcon className="text-red-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log },
                }),
            },
            {
              label: "Submitted",
              value: log.submitted,
              icon: <SendIcon className="text-blue-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log },
                }),
            },
            {
              label: "Charged",
              value: log.chargedUnit,
              icon: <CurrencyRupeeOutlinedIcon className="text-green-700" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log },
                }),
            },
            {
              label: "Read",
              value: log.read,
              icon: <DoneAllOutlinedIcon className="text-green-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log },
                }),
            },
            {
              label: "Undelivered",
              value: log.undelivered,
              icon: <SmsFailedIcon className="text-gray-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log },
                }),
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-3 cursor-pointer bg-gray-200 rounded-md px-4 py-3 shadow-sm hover:bg-gray-300 transition duration-200 ease-in"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 + index * 0.1 }}
              onClick={item.onclick}
            >
              {item.icon && (
                <Tooltip title={item.label} arrow>
                  {item.icon}
                </Tooltip>
              )}
              <Typography variant="body2" className="text-gray-800 font-medium">
                {item.label}:&nbsp;
              </Typography>
              <Typography variant="body2" className="font-bold text-gray-900">
                {item.value}
              </Typography>
            </motion.div>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default CampaignLogCard;
