import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Loader from "../../whatsapp/components/Loader";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import InputField from "../../components/layout/InputField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GeneratePasswordSettings from "../components/GeneratePasswordSettings";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import outlined from "@material-tailwind/react/theme/components/timeline/timelineIconColors/outlined";
import { getApiKey, updateApiKey } from "../../apis/settings/setting";
import NetworkLockedOutlinedIcon from '@mui/icons-material/NetworkLockedOutlined';
import toast from "react-hot-toast";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const Settings = () => {
  // Set isLoading to false for demo purposes.
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(0);
  const [newAPIKey, setNewAPIKey] = useState("");

  // Handler for the button click to generate a new API key.
  const handleGenerateAPIKey = async () => {
    const apiKey = await getApiKey();
    setNewAPIKey(apiKey.Key);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const updateapiKey = async () => {
    if (!newAPIKey) {
      toast.error("Please Generate a new API Key");
      return;
    }

    const response = await updateApiKey(newAPIKey);

    if (response.message === "Api Key update succesfully") {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Settings Tabs"
            textColor="primary"
            indicatorColor="primary"
          // variant="fullWidth"
          >
            <Tab
              label={
                // <span
                //   style={{
                //     display: "flex",
                //     alignItems: "center",
                //     gap: "0.5rem",
                //   }}
                // >
                //   <span
                //     style={{
                //       paddingRight: "0.5rem",
                //       borderRight: "1px solid #ccc",
                //       display: "flex",
                //       alignItems: "center",
                //     }}
                //   >
                //     <PasswordOutlinedIcon fontSize="small" />
                //   </span>
                //   <span>Change Password</span>
                // </span>

                <span>
                  <PasswordOutlinedIcon fontSize="small" /> Change Password
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
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      paddingRight: "0.5rem",
                      borderRight: "1px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <KeyOutlinedIcon size={18} />
                  </span>
                  <span>Manage API Key</span>
                </span>
              }
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
            <Tab
              label={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      paddingRight: "0.5rem",
                      borderRight: "1px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <NetworkLockedOutlinedIcon size={18} />
                  </span>
                  <span>IP Restrictions</span>
                </span>
              }
              {...a11yProps(2)}
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
            <p>Change Password</p>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div className="relative">
                <InputField
                  id="oldPassword"
                  name="oldPassword"
                  type={showPassword ? "text" : "password"}
                  label="Old Password"
                  placeholder="Enter your old password"
                />
                <div
                  onClick={handleTogglePassword}
                  className="absolute px-2 transform -translate-y-1/2 cursor-pointer right-1 top-11"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </div>
              </div>
              <GeneratePasswordSettings label="New Password" />
            </div>
            <div className="flex justify-start mt-4">
              <UniversalButton
                label="Update Password"
                id="updatepassword"
                name="updatepassword"
                variant="primary"
              />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <p>Manage API Key</p>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <InputField
                id="apimanagekey"
                name="apimanagekey"
                type="text"
                label="Old key"
                placeholder="Enter Old key"
              />
              <div className="flex items-end gap-2">
                <div className="flex-1 ">
                  <InputField
                    id="newapikey"
                    name="newapikey"
                    type="text"
                    label="New API Key"
                    placeholder="Generate New Key"
                    value={newAPIKey}
                    readOnly
                    style={{
                      cursor: "not-allowed",
                      backgroundColor: "#E5E7EB",
                    }}
                  />
                </div>
                <div>
                  <button
                    onClick={handleGenerateAPIKey}
                    className="px-2 py-2 text-sm text-white bg-blue-400 rounded-md shadow-md hover:bg-blue-500 focus:outline-none"
                  >
                    Generate Key
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-start mt-4">
              <UniversalButton
                label="Save"
                id="apisaveButton"
                name="apisaveButton"
                variant="primary"
                onClick={updateapiKey}
              />
            </div>
          </CustomTabPanel>
        </Box>
      )}
    </div>
  );
};

export default Settings;
