import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
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
import { getNotificationVariable, saveNotification } from "@/apis/admin/admin";
import { useLocation } from "react-router-dom";

export const AddNotification = () => {
  const { state } = useLocation();

  const [value, setValue] = React.useState(0);
  const [allVar, setAllVar] = React.useState([]);

  React.useEffect(() => {
    async function handleFetchAllVar() {
      try {
        const res = await getNotificationVariable();
        if (!res?.success) {
          return toast.error("Error fetching all variables.");
        }
        const variable = res?.data?.map((obj) => Object.values(obj));
        console.log("variable", variable);
        setAllVar(variable[0]);
      } catch (e) {
        console.log("e", e);
        toast.error("Error fetching all variables.");
      }
    }
    handleFetchAllVar();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        // maxHeight: "91vh",
        overflow: "hidden",
      }}
    >
      <div className="text-2xl font-semibold mb-2">Add Notification</div>
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
        <Whatsapp state={state} allVar={allVar} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RCS state={state} allVar={allVar} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Email state={state} allVar={allVar} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <SMS state={state} allVar={allVar} />
      </CustomTabPanel>
    </Box>
  );
};
