import {
  getFlowReplyList,
  getFlowSampleRequest,
} from "@/apis/whatsapp/whatsapp";
import React, { useEffect, useState } from "react";
import {
  a11yProps,
  CustomTabPanel,
} from "@/whatsapp/managetemplate/components/CustomTabPanel";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "@material-tailwind/react";
import WhatsappFlows from "./WhatsappFlows";
import { Reports } from "./reports";

export const WorkFlowIndex = () => {
  const [value, setValue] = useState(0);
 
  return (
    <Box sx={{ width: "100%" }}>
      <div className="flex items-end justify-between pr-2">
        <Tabs
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          aria-label="Block list Tabs"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            label={<span>Flows</span>}
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
            label={<span>Reports</span>}
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
      </div>
      <CustomTabPanel value={value} index={0}>
        <WhatsappFlows />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Reports />
      </CustomTabPanel>
    </Box>
  );
};
