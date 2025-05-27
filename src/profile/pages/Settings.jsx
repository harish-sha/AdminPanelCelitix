import React, { useEffect, useMemo, useState } from "react";
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
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import outlined from "@material-tailwind/react/theme/components/timeline/timelineIconColors/outlined";
import {
  getApiKey,
  getOldApiKey,
  LoginRequestIp,
  updateApiKey,
  updatePassword,
} from "../../apis/settings/setting";
import NetworkLockedOutlinedIcon from "@mui/icons-material/NetworkLockedOutlined";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Chip } from "primereact/chip";

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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(0);
  const [newAPIKey, setNewAPIKey] = useState("");
  const [oldApiKey, setOldApiKey] = useState("");

  const [password, setPassword] = useState({
    old: "",
    new: "",
  });

  const [ipDetails, setIpDetails] = useState({
    login: [],
    api: [],
    loginInput: "",
    apiInput: "",
  });

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

  async function handlegetOldApiKey() {
    try {
      const res = await getOldApiKey();
      if (res.status === 200) {
        setOldApiKey(res.oldkey);
      } else {
        toast.error("Error fetching old API Key else");
      }
    } catch (e) {
      // console.log(e);
      toast.error("Error fetching old API Key");
    }
  }

  const updateapiKey = async () => {
    if (!newAPIKey) {
      toast.error("Please Generate a new API Key");
      return;
    }

    const response = await updateApiKey(newAPIKey);

    if (response.message === "Api Key update succesfully") {
      toast.success(response.message);
      await handlegetOldApiKey();
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    handlegetOldApiKey();
  }, []);

  async function handleUpdatePassword() {
    if (!password.old) {
      toast.error("Please enter old password");
      return;
    }
    if (!password.new) {
      toast.error("Please enter new password");
      return;
    }

    const data = {
      newpass: password.new,
      oldpass: password.old,
    };
    try {
      const res = await updatePassword(data);
      if (res?.msg.includes("not")) {
        return toast.error(res?.msg);
      }
      toast.success(res?.msg);
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (e) {
      // console.log(e);
      return toast.error("Error updating password");
    }
  }

  function handleUpdateLoginIp(e) {
    const ip = e.target.value;

    setIpDetails((e) => ({
      ...e,
      loginInput: ip,
    }));
  }

  function handleLoginIpKeyDown(e, type) {
    if (event.key === "Enter" || event.key === ",") {
      e.preventDefault();
      if (!e.key.trim()) return;
      if (ipDetails?.loginInput === "") return;
      if (ipDetails?.login.length >= 5) {
        return toast.error("You can add only 5 login IPs");
      }
      if (ipDetails?.login.includes(ipDetails?.loginInput)) {
        return toast.error("IP already exists");
      }
      setIpDetails((prev) => ({
        ...prev,
        login: [...prev.login, ipDetails.loginInput],
        loginInput: "",
      }));
    }
  }
  function handleApiIpKeyDown(e, type) {
    if (event.key === "Enter" || event.key === ",") {
      e.preventDefault();
      if (!e.key.trim()) return;
      if (ipDetails?.apiInput === "") return;
      if (ipDetails?.api.length >= 5) {
        return toast.error("You can add only 5 API IPs");
      }
      if (ipDetails?.api.includes(ipDetails?.apiInput)) {
        return toast.error("IP already exists");
      }
      setIpDetails((prev) => ({
        ...prev,
        api: [...prev.api, ipDetails?.apiInput],
        apiInput: "",
      }));
    }
  }

  function handleRemoveLoginIp(e, index) {
    const updatedIp = [...ipDetails.login];
    updatedIp.splice(index, 1);

    setIpDetails((prev) => ({
      ...prev,
      login: updatedIp,
    }));
  }
  function handleRemoveApiIp(e, index) {
    const updatedIp = [...ipDetails.api];
    updatedIp.splice(index, 1);

    setIpDetails((prev) => ({
      ...prev,
      api: updatedIp,
    }));
  }

  const ChipRender = (type) => {
    const chips = ipDetails?.[type];
    const btn = type === "login" ? handleRemoveLoginIp : handleRemoveApiIp;
    return (
      <div className="flex flex-wrap gap-2">
        {chips.map((ip, index) => (
          <Chip key={ip} label={ip} removable onRemove={(e) => btn(e, index)} />
        ))}
      </div>
    );
  };

  async function saveIpDetails() {
    if (!ipDetails?.login.length) {
      return toast.error("Please add at least one login IP");
    }
    if (!ipDetails?.api.length) {
      return toast.error("Please add at least one Api IP");
    }

    const loginIp = ipDetails?.login.map((ip) => ip).join(",");
    const requestedIp = ipDetails?.api.map((ip) => ip).join(",");

    const data = {
      loginIp: loginIp,
      requestIp: requestedIp,
    };
    try {
      const res = await LoginRequestIp(data);

      if (!res?.msg?.includes("successfully")) {
        toast.success(res?.msg);
        return;
      }
      toast.success(res?.msg);
      setIpDetails({
        login: [],
        api: [],
        loginInput: "",
        apiInput: "",
      });
    } catch (e) {
      // console.log(res);
      return toast.error("Error updating IP details");
    }
  }
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
            {/* <Tab
              label={
                <span>
                  <NotificationsActiveOutlinedIcon fontSize="small" /> Alert
                  Notifications
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
            /> */}
            <Tab
              label={
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
          {/* <CustomTabPanel value={value} index={0}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div className="border rounded-lg min-h-30 shadow-md">
                <h1 className="bg-gray-700 text-white text-center p-2 rounded-tr-lg rounded-tl-lg">
                  Funds Alert
                </h1>
                <div className="grid grid-cols-2 p-2 gap-2.5 items-end">
                  <span className="text-sm font-medium text-gray-700">
                    Current Balance
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    ₹ 12528547
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    Send alert when available funds are
                  </span>
                  <InputField
                    id="fundsNotification"
                    name="fundsNotification"
                    type="text"
                    placeholder="Enter Balance..."
                    onChange={(e) => console.log(e)}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Send Alerts On
                  </span>
                  <InputField
                    id="fundsNotification"
                    name="fundsNotification"
                    type="text"
                    placeholder="Enter Balance..."
                    onChange={(e) => console.log(e)}
                  />
                </div>
              </div>
              <div className="border rounded-lg h-30 shadow-md">
                <h1 className="bg-gray-700 text-white text-center p-2 rounded-tr-lg rounded-tl-lg">
                  Expiry Alert
                </h1>
                <div className=""></div>
              </div>
              <div className="border rounded-lg min-h-30 shadow-md">
                <h1 className="bg-gray-700 text-white text-center p-2 rounded-tr-lg rounded-tl-lg">
                  Additional Email/Mobile For Receiving Alerts
                </h1>
                <div className="p-1">
                  <div className="flex gap-2 p-3">
                    <InputField
                      id="receiveEmailNotifications"
                      name="receiveEmailNotifications"
                      type="text"
                      label="Email"
                      placeholder="Enter comma separated Email ID(s) (upto 5)..."
                      onChange={(e) => console.log(e)}
                    />
                    <InputField
                      id="receiveMobileNotifications"
                      name="receiveMobileNotifications"
                      type="text"
                      label="Mobile Number"
                      placeholder="Enter comma separated Mobile no. with country code (upto 5)..."
                      onChange={(e) => console.log(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <UniversalButton
                label="Save"
                id="saveAlertNotifications"
                name="saveAlertNotifications"
                variant="primary"
              />
            </div>
          </CustomTabPanel> */}
          <CustomTabPanel value={value} index={0}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div className="relative">
                <InputField
                  id="oldPassword"
                  name="oldPassword"
                  type={showPassword ? "text" : "password"}
                  label="Current Password"
                  placeholder="Enter your old password"
                  value={password?.old}
                  onChange={(e) =>
                    setPassword({ ...password, old: e.target.value })
                  }
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
              <GeneratePasswordSettings
                label="New Password"
                value={password?.new}
                // setPassword={(e) => setPassword({ ...password, new: e })}
                onChange={(e) => setPassword({ ...password, new: e })}
              />
            </div>
            <div className="flex justify-start mt-4">
              <UniversalButton
                label="Update Password"
                id="updatepassword"
                name="updatepassword"
                variant="primary"
                onClick={handleUpdatePassword}
              />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <InputField
                id="apimanagekey"
                name="apimanagekey"
                type="text"
                label="Old key"
                placeholder="Enter Old key"
                value={oldApiKey}
                onChange={(e) => console.log(e)}
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
          <CustomTabPanel value={value} index={2}>
            <p className="text-md text-gray-900 font-semibold">
              IP Restriction (Restrict Login/ API access to allowed IP
              addresses)
            </p>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div className="space-y-2">
                <InputField
                  id="LoginIp"
                  name="LoginIp"
                  type="text"
                  label="Login"
                  placeholder="Enter comma separated IP addresses..."
                  value={ipDetails?.loginInput}
                  onChange={handleUpdateLoginIp}
                  onKeyDown={handleLoginIpKeyDown}
                />
                {ipDetails?.login?.length > 0 && (
                  <div className="space-x-2">{ChipRender("login")}</div>
                )}
              </div>
              <div className="space-y-2">
                <InputField
                  id="LoginIp"
                  name="LoginIp"
                  type="text"
                  label="API"
                  placeholder="Enter comma separated IP addresses..."
                  value={ipDetails?.apiInput}
                  onChange={(e) => {
                    setIpDetails((prev) => ({
                      ...prev,
                      apiInput: e.target.value,
                    }));
                  }}
                  onKeyDown={handleApiIpKeyDown}
                />
                {ipDetails?.api?.length > 0 && (
                  <div className="space-x-2">{ChipRender("api")}</div>
                )}
              </div>
            </div>
            <div className="flex justify-start mt-4">
              <UniversalButton
                label="Save"
                id="IPDetailsSave"
                name="IPDetailsSave"
                variant="primary"
                onClick={saveIpDetails}
              />
            </div>
          </CustomTabPanel>
        </Box>
      )}
    </div>
  );
};

export default Settings;
