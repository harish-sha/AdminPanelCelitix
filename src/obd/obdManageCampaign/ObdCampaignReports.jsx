import React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import { CustomTabPanel } from "../../whatsapp/managetemplate/components/CustomTabPanel.jsx";
import { IoSearch } from "react-icons/io5";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';


import Loader from "../../whatsapp/components/Loader.jsx";
import InputField from "../../whatsapp/components/InputField.jsx";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown.jsx";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker.jsx";

import ObdCampaignTable from "./ObdCampaignTable.jsx";
import UniversalLabel from "../../whatsapp/components/UniversalLabel.jsx";
import UniversalButton from "../../whatsapp/components/UniversalButton.jsx";
import ObdDaySummaryTable from "./ObdDaySummaryTable.jsx";
import { RadioButton } from "primereact/radiobutton";

const ObdCampaignReports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [obdCampaignName, setObdCampaignName] = useState("");
  const [obdCampaignNumber, setObdCampaignNumber] = useState("");
  const [obdCampaignType, setObdCampaignType] = useState(null);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [customOptions, setCustomOptions] = useState("radioOptiondisable");
  const [customdialogtype, setCustomdialogtype] = useState(null);
  const [customdialogstatus, setCustomdialogstatus] = useState(null);
  const [customdialognumber, setCustomdialognumber] = useState("");
  const [obdcampaigndate, setObdCampaignDate] = useState(null);
  const [visibledialog, setVisibledialog] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [dtmfResponse, setDtmfResponse] = useState(null);
  const [value, setValue] = useState(0);

  const [campaigncheckboxStates, setCampaignCheckboxStates] = useState({
    campaignName: false,
    mobileNo: false,
    callType: false,
    totalUnits: false,
    queueTime: false,
    sentTime: false,
    deliveryTime: false,
    callDuration: false,
    retryCount: false,
    callStatus: false,
    deliveryStatus: false,
    keypress: false,
    action: false,
    source: false,
  });

  const [deliverycheckbox, setDeliverycheckbox] = useState({
    answered: false,
    unanswered: false,
    dialed: false,
  });

  const [customcheckboxStates, setcustomCheckboxStates] = useState({
    campaignName: false,
    mobileNo: false,
    callType: false,
    totalUnits: false,
    queueTime: false,
    sentTime: false,
    deliveryTime: false,
    callDuration: false,
    retryCount: false,
    callStatus: false,
    deliveryStatus: false,
    keypress: false,
    action: false,
    source: false,
  });

  // Handle checkbox of campaign
  const handleCheckboxChange = (e, name) => {
    setCampaignCheckboxStates((prevState) => ({
      ...prevState,
      [name]: e.checked, // Update the specific checkbox state
    }));
  };

  // Handle delivery checkbox
  const handleDeliveryCheckboxChange = (e, name) => {
    setDeliverycheckbox((prevState) => ({
      ...prevState,
      [name]: e.checked,
    }));
  };

  // Handle checkbox of custom
  const handleCustomCheckboxChange = (e, name) => {
    setcustomCheckboxStates((prevState) => ({
      ...prevState,
      [name]: e.checked,
    }));
  };

  // events
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setObdCampaignName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setObdCampaignNumber(event.target.value);
  };

  const handleExportBtn = () => {
    setVisibledialog(true);
  };

  const handleSearchBtn = () => {};

  const handleSummarySearchBtn = () => {};

  const handleChangeOption = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const handleChangeOptionEnable = (event) => {
    const value = event.target.value;
    setCustomOptions(value);
  };

  const handleCustomDialogNumber = (e) => {
    setCustomdialognumber(e.target.value);
  };

  const handlecampaignDialogSubmithBtn = () => {};

  const handleCustomDialogSubmithBtn = () => {};

  return (
    <>
      <div className="w-full">
        {isLoading ? (
          <Loader />
        ) : (
          <Box sx={{ width: "100%" }}>
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between">
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
                      <LibraryBooksOutlinedIcon size={20} /> Campaign Logs
                    </span>
                  }
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
                    <span>
                      <PollOutlinedIcon size={20} /> Day-wise Summary
                    </span>
                  }
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

              <div className="w-full sm:w-56 mt-4 ml-6 flex lg:justify-end md:justify-end">
                <UniversalButton
                  id="exportBtn"
                  name="exportBtn"
                  label="Export"
                  icon={
                    <IosShareOutlinedIcon
                      sx={{ marginBottom: "3px", fontSize: "1.1rem" }}
                    />
                  }
                  onClick={handleExportBtn}
                />
              </div>
            </div>

            <CustomTabPanel value={value} index={0}>
              <div className="w-full">
                <div className="flex flex-col md:flex-row lg:flex-row flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full">
                  <div className="w-full sm:w-56">
                    <InputField
                      id="obdcampaignname"
                      name="obdcampaignname"
                      label="Campaign Name"
                      value={obdCampaignName}
                      onChange={handleInputChange}
                      placeholder="Campaign Name"
                      tooltipContent="Enter your Campaign Name"
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <InputField
                      id="obdCampaignNumber"
                      name="obdCampaignNumber"
                      label="Mobile Number"
                      value={obdCampaignNumber}
                      onChange={handleNumberChange}
                      placeholder="Mobile number"
                      type="number"
                      tooltipContent="Enter Your Mobile Number"
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <AnimatedDropdown
                      id="obdCampaignType"
                      name="obdCampaignType"
                      label="Campaign Type"
                      tooltipContent="Enter Your Campaign Type"
                      options={[
                        { value: "Promotional", label: "Promotional" },
                        { value: "Transactional", label: "Transactional" },
                      ]}
                      value={obdCampaignType}
                      onChange={setObdCampaignType}
                      placeholder="Type"
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <UniversalDatePicker
                      id="obdcampaigndate"
                      name="obdcampaigndate"
                      label="Date"
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <UniversalButton
                      id="obdTemplateSearchBtn"
                      name="obdSearchBtn"
                      label="Search"
                      onClick={handleSearchBtn}
                      icon={<IoSearch />}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <ObdCampaignTable />
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className="w-full">
                <div className="flex flex-col md:flex-row lg:flex-row flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full">
                  <div className="w-full sm:w-56 ">
                    <UniversalDatePicker label="Created At" />
                  </div>
                  <div className="w-full sm:w-56 ">
                    <UniversalDatePicker label="End Date" />
                  </div>

                  <div className="w-full sm:w-56 ">
                    <UniversalButton
                      id="obdSummarySearchBtn"
                      name="obdSummarySearchBtn"
                      label="Search"
                      onClick={handleSummarySearchBtn}
                      icon={<IoSearch />}
                    />
                  </div>
                </div>

                
                  <ObdDaySummaryTable />
                
              </div>
            </CustomTabPanel>
          </Box>
        )}
      </div>

      <Dialog
        visible={visibledialog}
        style={{ width: "45rem" }}
        onHide={() => {
          setVisibledialog(false);
        }}
        draggable={false}
      >
        <div className="flex gap-4">
          <div className="cursor-pointer">
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="radioOption1"
                name="radioGroup"
                value="option1"
                onChange={handleChangeOption}
                checked={selectedOption === "option1"}
              />
              <label
                htmlFor="radioOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Campaign-wise
              </label>
            </div>
          </div>
          <div className="cursor-pointer">
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="radioOption2"
                name="radioGroup"
                value="option2"
                onChange={handleChangeOption}
                checked={selectedOption === "option2"}
              />
              <label
                htmlFor="radioOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Custom
              </label>
            </div>
          </div>
        </div>

        {selectedOption === "option1" && (
          <>
            <div className="mt-5">
              <AnimatedDropdown
                id="campaign"
                name="campaign"
                options={[
                  { value: "Campaignl", label: "Camapaign1" },
                  { value: "Campaign2", label: "Campaign2" },
                  { value: "Campaign3", label: "Campaign3" },
                ]}
                onChange={setCampaign}
                value={campaign}
                placeholder="Search Campaign"
              />
            </div>
            <div className="flex items-center lg:gap-x-20 gap-x-10  my-6">
             <UniversalLabel text="Custom Columns" />

              <div className="flex gap-4">
                <div className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="radioOptionenable"
                      name="radioGroup"
                      value="radioOptionenable"
                      onChange={handleChangeOptionEnable}
                      checked={customOptions === "radioOptionenable"}
                    />
                    <label
                      htmlFor="radioOptionenable"
                      className="text-gray-700 font-medium text-sm cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="radioOptiondisable"
                      name="radioGroup"
                      value="radioOptiondisable"
                      onChange={handleChangeOptionEnable}
                      checked={customOptions === "radioOptiondisable"}
                    />
                    <label
                      htmlFor="radioOptiondisable"
                      className="text-gray-700 font-medium text-sm cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {customOptions === "radioOptionenable" && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 ">
                  <div className="flex items-center">
                    <Checkbox
                      id="campaignName"
                      name="campaignName"
                      onChange={(e) => handleCheckboxChange(e, "campaignName")}
                      checked={campaigncheckboxStates.campaignName}
                      className="m-2"
                    />
                    <label
                      htmlFor="campaignName"
                      className="text-sm font-medium text-gray-800"
                    >
                      Campaign Name
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="mobileNo"
                      name="mobileNo"
                      onChange={(e) => handleCheckboxChange(e, "mobileNo")}
                      checked={campaigncheckboxStates.mobileNo}
                      className="m-2"
                    />
                    <label
                      htmlFor="mobileNo"
                      className="text-sm font-medium text-gray-800"
                    >
                      Mobile Number
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="callType"
                      name="callType"
                      onChange={(e) => handleCheckboxChange(e, "callType")}
                      checked={campaigncheckboxStates.callType}
                      className="m-2"
                    />
                    <label
                      htmlFor="callType"
                      className="text-sm font-medium text-gray-800"
                    >
                      Call Type
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="totalUnits"
                      name="totalUnits"
                      onChange={(e) => handleCheckboxChange(e, "totalUnits")}
                      checked={campaigncheckboxStates.totalUnits}
                      className="m-2"
                    />
                    <label
                      htmlFor="totalUnits"
                      className="text-sm font-medium text-gray-800"
                    >
                      Total Units
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="queueTime"
                      name="queueTime"
                      onChange={(e) => handleCheckboxChange(e, "queueTime")}
                      checked={campaigncheckboxStates.queueTime}
                      className="m-2"
                    />
                    <label
                      htmlFor="queueTime"
                      className="text-sm font-medium text-gray-800"
                    >
                      Queue Time
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="sentTime"
                      name="sentTime"
                      onChange={(e) => handleCheckboxChange(e, "sentTime")}
                      checked={campaigncheckboxStates.sentTime}
                      className="m-2"
                    />
                    <label
                      htmlFor="sentTime"
                      className="text-sm font-medium text-gray-800"
                    >
                      Sent Time
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="deliveryTime"
                      name="deliveryTime"
                      onChange={(e) => handleCheckboxChange(e, "deliveryTime")}
                      checked={campaigncheckboxStates.deliveryTime}
                      className="m-2"
                    />
                    <label
                      htmlFor="deliveryTime"
                      className="text-sm font-medium text-gray-800"
                    >
                      Delivery Time
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="callDuration"
                      name="callDuration"
                      onChange={(e) => handleCheckboxChange(e, "callDuration")}
                      checked={campaigncheckboxStates.callDuration}
                      className="m-2"
                    />
                    <label
                      htmlFor="callDuration"
                      className="text-sm font-medium text-gray-800"
                    >
                      Call Duration
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="retryCount"
                      name="retryCount"
                      onChange={(e) => handleCheckboxChange(e, "retryCount")}
                      checked={campaigncheckboxStates.retryCount}
                      className="m-2"
                    />
                    <label
                      htmlFor="retryCount"
                      className="text-sm font-medium text-gray-800"
                    >
                      Retry Count
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="callStatus"
                      name="callStatus"
                      onChange={(e) => handleCheckboxChange(e, "callStatus")}
                      checked={campaigncheckboxStates.callStatus}
                      className="m-2"
                    />
                    <label
                      htmlFor="callStatus"
                      className="text-sm font-medium text-gray-800"
                    >
                      Call Status
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="deliveryStatus"
                      name="deliveryStatus"
                      onChange={(e) =>
                        handleCheckboxChange(e, "deliveryStatus")
                      }
                      checked={campaigncheckboxStates.deliveryStatus}
                      className="m-2"
                    />
                    <label
                      htmlFor="deliveryStatus"
                      className="text-sm font-medium text-gray-800"
                    >
                      Delivery Status
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="keypress"
                      name="keypress"
                      onChange={(e) => handleCheckboxChange(e, "keypress")}
                      checked={campaigncheckboxStates.keypress}
                      className="m-2"
                    />
                    <label
                      htmlFor="keypress"
                      className="text-sm font-medium text-gray-800"
                    >
                      Key Press
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="action"
                      name="action"
                      onChange={(e) => handleCheckboxChange(e, "action")}
                      checked={campaigncheckboxStates.action}
                      className="m-2"
                    />
                    <label
                      htmlFor="action"
                      className="text-sm font-medium text-gray-800"
                    >
                      Action
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="source"
                      name="source"
                      onChange={(e) => handleCheckboxChange(e, "source")}
                      checked={campaigncheckboxStates.source}
                      className="m-2"
                    />
                    <label
                      htmlFor="source"
                      className="text-sm font-medium text-gray-800"
                    >
                      Source
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className="flex item-center justify-center mt-6">
              <UniversalButton
                id="campaignDialogSubmithBtn"
                name="campaignDialogSubmithBtn"
                label="Submit"
                onClick={handlecampaignDialogSubmithBtn}
              />
            </div>
          </>
        )}
        {selectedOption === "option2" && (
          <>
            <div className="mt-4 ">
              <div className="flex justify-between gap-x-4">
                <UniversalDatePicker label="From Date:" />
                <UniversalDatePicker label="To Date:" />
              </div>

              <div className="flex justify-between gap-5 my-4">
                <div className="flex-1">
                  <AnimatedDropdown
                    label="Select Type"
                    options={[
                      { value: "Promotional", label: "Promotional" },
                      { value: "Transactional", label: "Transactional" },
                      { value: "Both", label: "Both" },
                    ]}
                    value={customdialogtype}
                    onChange={setCustomdialogtype}
                    placeholder="Select Type"
                  />
                </div>

                <div className="flex-1">
                  <AnimatedDropdown
                    label="Select Request"
                    options={[
                      { value: "Sent", label: "Sent" },
                      { value: "Failed", label: "Failed" },
                      { value: "NDNC", label: "NDNC" },
                    ]}
                    value={customdialogstatus}
                    onChange={setCustomdialogstatus}
                    placeholder="Select Status"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-5">
              <UniversalLabel text="Delivery Status"/>
                <div className="flex gap-x-5 lg:gap-x-20">
                  <div className="flex items-center">
                    <Checkbox
                      id="answered"
                      name="answered"
                      onChange={(e) =>
                        handleDeliveryCheckboxChange(e, "answered")
                      }
                      checked={deliverycheckbox.answered}
                      className="m-2"
                    />
                    <label
                      htmlFor="answered"
                      className="text-sm font-medium text-gray-800"
                    >
                      Answered
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="unanswered"
                      name="unanswered"
                      onChange={(e) =>
                        handleDeliveryCheckboxChange(e, "unanswered")
                      }
                      checked={deliverycheckbox.unanswered}
                      className="m-2"
                    />
                    <label
                      htmlFor="unanswered"
                      className="text-sm font-medium text-gray-800"
                    >
                      Unanswered
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="dialed"
                      name="dialed"
                      onChange={(e) =>
                        handleDeliveryCheckboxChange(e, "dialed")
                      }
                      checked={deliverycheckbox.dialed}
                      className="m-2"
                    />
                    <label
                      htmlFor="dialed"
                      className="text-sm font-medium text-gray-800"
                    >
                      Dialed
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex my-4 gap-4">
                <InputField
                  label="Mobile Number"
                  id="customdialognumber"
                  name="customdialognumber"
                  value={customdialognumber}
                  onChange={handleCustomDialogNumber}
                  placeholder="Enter mobile number..."
                />
                <AnimatedDropdown
                  label="DTMF Count"
                  id="dtmfResponse"
                  name="dtmfResponse"
                  options={[
                    { value: "0", label: "0" },
                    { value: "l", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                    { value: "6", label: "6" },
                    { value: "7", label: "7" },
                    { value: "8", label: "8" },
                    { value: "9", label: "9" },
                  ]}
                  onChange={setDtmfResponse}
                  value={dtmfResponse}
                  placeholder="DTMF Response"
                />
              </div>

              <div className="flex items-center lg:gap-x-20 gap-x-10 my-6">
                <UniversalLabel text="Custom Columns" />
                <div className="flex gap-4">
                  <div className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <RadioButton
                        inputId="radioOptionenable"
                        name="radioGroup"
                        value="radioOptionenable"
                        onChange={handleChangeOptionEnable}
                        checked={customOptions === "radioOptionenable"}
                      />
                      <label
                        htmlFor="radioOptionenable"
                        className="text-gray-700 font-medium text-sm cursor-pointer"
                      >
                        Enable
                      </label>
                    </div>
                  </div>
                  {/* Option 2 */}
                  <div className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <RadioButton
                        inputId="radioOptiondisable"
                        name="radioGroup"
                        value="radioOptiondisable"
                        onChange={handleChangeOptionEnable}
                        checked={customOptions === "radioOptiondisable"}
                      />
                      <label
                        htmlFor="radioOptiondisable"
                        className="text-gray-700 font-medium text-sm cursor-pointer"
                      >
                        Disable
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {customOptions === "radioOptionenable" && (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 ">
                    <div className="flex items-center">
                      <Checkbox
                        id="campaignName"
                        name="campaignName"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "campaignName")
                        }
                        checked={customcheckboxStates.campaignName}
                        className="m-2"
                      />
                      <label
                        htmlFor="campaignName"
                        className="text-sm font-medium text-gray-800"
                      >
                        Campaign Name
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="mobileNo"
                        name="mobileNo"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "mobileNo")
                        }
                        checked={customcheckboxStates.mobileNo}
                        className="m-2"
                      />
                      <label
                        htmlFor="mobileNo"
                        className="text-sm font-medium text-gray-800"
                      >
                        Mobile Number
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="callType"
                        name="callType"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "callType")
                        }
                        checked={customcheckboxStates.callType}
                        className="m-2"
                      />
                      <label
                        htmlFor="callType"
                        className="text-sm font-medium text-gray-800"
                      >
                        Call Type
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="totalUnits"
                        name="totalUnits"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "totalUnits")
                        }
                        checked={customcheckboxStates.totalUnits}
                        className="m-2"
                      />
                      <label
                        htmlFor="totalUnits"
                        className="text-sm font-medium text-gray-800"
                      >
                        Total units
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="queueTime"
                        name="queueTime"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "queueTime")
                        }
                        checked={customcheckboxStates.queueTime}
                        className="m-2"
                      />
                      <label
                        htmlFor="queueTime"
                        className="text-sm font-medium text-gray-800"
                      >
                        Queue Time
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="sentTime"
                        name="sentTime"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "sentTime")
                        }
                        checked={customcheckboxStates.sentTime}
                        className="m-2"
                      />
                      <label
                        htmlFor="sentTime"
                        className="text-sm font-medium text-gray-800"
                      >
                        Sent Time
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="deliveryTime"
                        name="deliveryTime"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "deliveryTime")
                        }
                        checked={customcheckboxStates.deliveryTime}
                        className="m-2"
                      />
                      <label
                        htmlFor="deliveryTime"
                        className="text-sm font-medium text-gray-800"
                      >
                        Delivery Time
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="callDuration"
                        name="callDuration"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "callDuration")
                        }
                        checked={customcheckboxStates.callDuration}
                        className="m-2"
                      />
                      <label
                        htmlFor="callDuration"
                        className="text-sm font-medium text-gray-800"
                      >
                        Call Duration
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="retryCount"
                        name="retryCount"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "retryCount")
                        }
                        checked={customcheckboxStates.retryCount}
                        className="m-2"
                      />
                      <label
                        htmlFor="retryCount"
                        className="text-sm font-medium text-gray-800"
                      >
                        Retry Count
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="callStatus"
                        name="callStatus"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "callStatus")
                        }
                        checked={customcheckboxStates.callStatus}
                        className="m-2"
                      />
                      <label
                        htmlFor="callStatus"
                        className="text-sm font-medium text-gray-800"
                      >
                        Call Status
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="deliveryStatus"
                        name="deliveryStatus"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "deliveryStatus")
                        }
                        checked={customcheckboxStates.deliveryStatus}
                        className="m-2"
                      />
                      <label
                        htmlFor="deliveryStatus"
                        className="text-sm font-medium text-gray-800"
                      >
                        Delivery Status
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="keypress"
                        name="keypress"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "keypress")
                        }
                        checked={customcheckboxStates.keypress}
                        className="m-2"
                      />
                      <label
                        htmlFor="keypress"
                        className="text-sm font-medium text-gray-800"
                      >
                        Key Press
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="action"
                        name="action"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "action")
                        }
                        checked={customcheckboxStates.action}
                        className="m-2"
                      />
                      <label
                        htmlFor="action"
                        className="text-sm font-medium text-gray-800"
                      >
                        Action
                      </label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="source"
                        name="source"
                        onChange={(e) =>
                          handleCustomCheckboxChange(e, "source")
                        }
                        checked={customcheckboxStates.source}
                        className="m-2"
                      />
                      <label
                        htmlFor="source"
                        className="text-sm font-medium text-gray-800"
                      >
                        Source
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="flex item-center justify-center mt-6">
                <UniversalButton
                  id="customDialogSubmithBtn"
                  name="customDialogSubmithBtn"
                  label="Submit"
                  onClick={handleCustomDialogSubmithBtn}
                />
              </div>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ObdCampaignReports;
