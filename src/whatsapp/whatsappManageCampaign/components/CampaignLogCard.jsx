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

const CampaignLogCard = ({ log, selectedDate, selectedUser }) => {
  const navigate = useNavigate();
  return (
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
        <Box className="grid md:grid-cols-3 grid-cols-1  gap-4 w-full mt-4">
          {[
            {
              label: "Total",
              value: log.total,
              icon: <GroupsOutlinedIcon className="text-gray-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log: "total", selectedDate: selectedDate, selectedUser: selectedUser },
                }),
            },
            {
              label: "Failed",
              value: log.failed,
              icon: <ErrorIcon className="text-red-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log: "failed", selectedDate: selectedDate, selectedUser: selectedUser },
                }),
            },
            {
              label: "Blocked",
              value: log.block,
              icon: <BlockIcon className="text-red-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log: "block", selectedDate: selectedDate, selectedUser: selectedUser },
                }),
            },
            {
              label: "Submitted",
              value: log.submitted,
              icon: <SendIcon className="text-blue-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log: "submitted", selectedDate: selectedDate, selectedUser: selectedUser },
                }),
            },
            {
              label: "Delivered",
              value: log.delivered,
              icon: <DoneIcon className="text-green-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log: "delivered", selectedDate: selectedDate, selectedUser: selectedUser },
                }),
            },
            {
              label: "Undelivered",
              value: log.undelivered,
              icon: <SmsFailedIcon className="text-gray-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log: "undelivered", selectedDate: selectedDate, selectedUser: selectedUser },
                }),
            },
            // {
            //   label: "Busy",
            //   value: log.busy,
            //   icon: <SmsFailedIcon className="text-yellow-500" />,
            //   onclick: () =>
            //     navigate("/apicampaigninfo", {
            //       state: { log: "busy", selectedDate: selectedDate, selectedUser: selectedUser },
            //     }),
            // },
            // {
            //   label: "Charged",
            //   value: log.chargedUnit,
            //   icon: <CurrencyRupeeOutlinedIcon className="text-green-700" />,
            //   // onclick: () =>
            //   //   navigate("/apicampaigninfo", {
            //   //     state: { log: "Charged" },
            //   //   }),
            // },
            {
              label: "Read",
              value: log.read,
              icon: <DoneAllOutlinedIcon className="text-green-500" />,
              onclick: () =>
                navigate("/apicampaigninfo", {
                  state: { log: "read", selectedDate: selectedDate, selectedUser: selectedUser },
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
