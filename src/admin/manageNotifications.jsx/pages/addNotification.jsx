import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { CustomTabPanel, a11yProps } from "@/components/common/CustomTabPanel";
import toast from "react-hot-toast";
import { WhatsApp } from "@mui/icons-material";
import rcsicon from "@/assets/icons/RCS02.svg";
import { LuMessageSquareMore } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { Whatsapp } from "../components/whatsapp";
import { RCS } from "../components/rcs";
import { Email } from "../components/email";
import { SMS } from "../components/sms";

export const AddNotification = () => {
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState({});

  async function handleSaveWhatsappNotification() {
    // payload
    //     {
    //   "wabaSrno": "1",
    //   "templateSrno": "51",
    //   "mediaPath": "http://localhost:9090/cpaas/Whatsapp/whatsapp193871753251992378.mp4",
    //   "variableList": "\"{#last_name#}\"",
    //   "urlVariable": "",
    //   "reminderSrno": "2",
    //   "whatsappReminderSrno": "0", //for save pass it as 0 or skip  // for update get value
    //   "templateType": "video",
    //   "templateName": "welcome_registration",
    //   "templateLanguage": "mr",
    //   "notificationStatus": "on"
    // }
  }
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
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
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
              <MdOutlineMailOutline size={20} className="mr-2" /> Email
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
              <LuMessageSquareMore size={20} className="mr-2" /> SMS
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
        <Whatsapp
          handleSaveWhatsappNotification={handleSaveWhatsappNotification}
          data={data}
          setData={setData}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RCS data={data} setData={setData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Email data={data} setData={setData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <SMS data={data} setData={setData} />
      </CustomTabPanel>
    </Box>
  );
};
