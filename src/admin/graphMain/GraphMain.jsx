import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { CustomTabPanel, a11yProps } from "@/components/common/CustomTabPanel";
import toast from "react-hot-toast";
import {
  liveMonitoringRCS,
  liveMonitoringRCSStatus,
  liveMonitoringSendingService,
  liveMonitoringWhatsapp,
} from "@/apis/admin/admin";
import { WhatsApp } from "@mui/icons-material";
import rcsicon from "@/assets/icons/RCS02.svg";
import { LuMessageSquareMore } from "react-icons/lu";
import { WhatsAppGraph } from "./components/WhatsApp";
import { RCS } from "./components/RCS";
import { RCSService } from "./components/RCSService";
import { SendingService } from "./components/SendingS";

const GraphMain = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function handleliveMonitoringWhatsapp() {
    try {
      const res = await liveMonitoringWhatsapp();
      console.log("res-Whatsapp", res);
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong!");
    }
  }
  async function handleliveMonitoringRCS() {
    try {
      const res = await liveMonitoringRCS();
      console.log("res-RCS", res);
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong!");
    }
  }
  async function handleliveMonitoringRCSStatus() {
    try {
      const res = await liveMonitoringRCSStatus();
      console.log("res-RCSStatus", res);
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong!");
    }
  }
  async function handleliveMonitoringSendingService() {
    try {
      const res = await liveMonitoringSendingService();
      console.log("res-SendingService", res);
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong!");
    }
  }

  //useEffect

  React.useEffect(() => {
    handleliveMonitoringWhatsapp();
    handleliveMonitoringRCS();
    handleliveMonitoringRCSStatus();
    handleliveMonitoringSendingService();
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        // maxHeight: "91vh",
        overflow: "hidden",
      }}
    >
      <div className="text-2xl font-semibold mb-2">Live Monitoring</div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Manage Campaigns Tabs"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab
          label={
            <span>
              <WhatsApp size={20} /> WhatsApp
            </span>
          }
          {...a11yProps(0)}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "#f0f4ff",
              borderRadius: "8px",
            },
          }}
        />
        <Tab
          label={
            <span className="flex items-center">
              <img src={rcsicon} alt="" className="size-5 mr-2" /> RCS
            </span>
          }
          {...a11yProps(0)}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "#f0f4ff",
              borderRadius: "8px",
            },
          }}
        />
        <Tab
          label={
            <span className="flex items-center">
              <img src={rcsicon} alt="" className="size-5 mr-2" /> RCS Status
            </span>
          }
          {...a11yProps(0)}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "#f0f4ff",
              borderRadius: "8px",
            },
          }}
        />
        <Tab
          label={
            <span className="flex items-center">
              <LuMessageSquareMore size={20} className="mr-2" /> Sending Service
            </span>
          }
          {...a11yProps(0)}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "#f0f4ff",
              borderRadius: "8px",
            },
          }}
        />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <WhatsAppGraph />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RCS />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <RCSService />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <SendingService />
      </CustomTabPanel>
    </Box>
  );
};

export default GraphMain;
