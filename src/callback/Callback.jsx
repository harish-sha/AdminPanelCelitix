import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import UniversalDatePicker from "../whatsapp/components/UniversalDatePicker";
import InputField from "../whatsapp/components/InputField";
import UniversalButton from "../whatsapp/components/UniversalButton";
import AnimatedDropdown from "../whatsapp/components/AnimatedDropdown";
import CallBackProfile from "./components/CallBackProfile";

// Custom Tab Panel
function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const Callback = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formValues, setFormValues] = useState({
    callbackName: "",
    name: "",
    channelCategory: [],
    statusCategory: [],
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (field) => (e) => {
    const value = e?.target?.value ?? e;
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpen = () => {
    navigate("/addcallback");
  };

  const dropdownOptions = {
    channelCategory: [
      { value: "OBD", label: "OBD" },
      { value: "IBD", label: "IBD" },
      { value: "C2C", label: "C2C" },
    ],
    statusCategory: [
      { value: "Active", label: "Active" },
      { value: "InActive", label: "InActive" },
    ],
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Callback Profile Tabs"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab
          label="Callback Profile"
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
          label="Callback Logs"
          {...a11yProps(1)}
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

      <div className="flex flex-row-reverse my-4">
        <UniversalButton label="Add Callback" onClick={handleOpen} />
      </div>

      <CustomTabPanel value={value} index={0}>
        <div className="flex flex-wrap gap-4 items-end justify-start pb-5 w-full">
          <div className="w-full sm:w-56">
            <UniversalDatePicker
              label="Select Date"
              id="manageDate"
              name="manageDate"
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="dd-mm-yy"
              tooltipPlacement="right"
              minDate={new Date().setMonth(new Date().getMonth() - 3)}
              maxDate={new Date()}
              error={!selectedDate}
              errorText="Please select a valid date"
            />
          </div>

          {[
            {
              label: "Callback Name",
              placeholder: "Callback Name",
              field: "callbackName",
            },
            {
              label: "Name",
              placeholder: "Name",
              field: "name",
            },
          ].map(({ label, placeholder, field }) => (
            <div key={field} className="w-full sm:w-56">
              <InputField
                label={label}
                placeholder={placeholder}
                value={formValues[field]}
                onChange={handleInputChange(field)}
              />
            </div>
          ))}

          {["channelCategory", "statusCategory"].map((field) => (
            <div key={field} className="w-full sm:w-56">
              <AnimatedDropdown
                label={field === "channelCategory" ? "Channel" : "Status"}
                tooltipContent={`Select ${field}`}
                tooltipPlacement="right"
                options={dropdownOptions[field]}
                value={formValues[field]}
                onChange={handleInputChange(field)}
                placeholder={field === "channelCategory" ? "Channel" : "Status"}
              />
            </div>
          ))}

          <div className="w-full sm:w-56">
            <UniversalButton label="Search" />
          </div>

          <div className="w-full mt-7">
            <CallBackProfile />
          </div>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <h1>Hello</h1>
      </CustomTabPanel>
    </Box>
  );
};

export default Callback;
