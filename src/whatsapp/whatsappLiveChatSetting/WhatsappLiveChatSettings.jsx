import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Paper, Typography, Button, Tooltip } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import TagIcon from "@mui/icons-material/Tag";
import EmailIcon from "@mui/icons-material/Email";
import InventoryIcon from "@mui/icons-material/Inventory";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";
import { Switch } from "@mui/material";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";

import {
  deleteAutoAction,
  fetchTemplates,
  fetchTemplatesValue,
  getAutoAction,
  getWabaList,
  saveAutoAction,
} from "@/apis/whatsapp/whatsapp";

import AnimatedDropdown from "../components/AnimatedDropdown";
import { ConfigureDialog } from "./components/configureDialog";
import UniversalButton from "../components/UniversalButton";
import CannedMessageManager from "../../cannedmessage/components/CannedMessageManager";

// import { extractVariable } from "../WhatsappBot/component/components/helper/extractVariable";

const MotionPaper = motion(Paper);

const WhatsappLiveChatSettings = () => {
  const [selectedName, setSelectedName] = useState("");
  const [selectedAgentName, setSelectedAgentName] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [workingHoursDialog, setWorkingHoursDialog] = useState(false);
  const [workingHours, setWorkingHours] = useState({});
  const [isWorkingHoursEnabled, setIsWorkingHoursEnabled] = useState(true);

  const [wabaState, setWabaState] = useState({
    waba: [],
    selected: "",
  });

  const [cardDetails, setCardDetails] = useState({});
  const [configureState, setConfigureState] = useState({
    type: "",
    open: false,
  });

  const [basicDetails, setBasicDetails] = useState({
    sendMsgCheckbox: true,
    msgType: "1",
    message: "",
    filePath: "",
    tempJson: "",
    mediaPath: "",
  });

  const [allTemplates, setAllTemplates] = useState([]);
  const [specificTemplate, setSpecificTemplate] = useState({});
  const [variablesData, setVariablesData] = useState({
    length: 0,
    data: [],
    input: [],
    btn: [],
    btnInput: [],
  });

  const fileRef = useRef(null);

  useEffect(() => {
    async function handleFetchWaba() {
      try {
        const res = await getWabaList();
        setWabaState((prev) => ({
          waba: res,
          selected: "",
        }));
      } catch (e) {
        return toast.error("Error fetching Waba Details");
      }
    }

    handleFetchWaba();
  }, []);

  async function handleGetAutoAction() {
    if (!wabaState.selected) return;
    try {
      const data = {
        wabaNumber: wabaState.selected,
        type: "-1",
      };
      const res = await getAutoAction(data);
      res?.EntityMstActionScenerio &&
        res.EntityMstActionScenerio.map(async (item) => {
          data["type"] = item.actionScenario;
          const res = await getAutoAction(data);
          setCardDetails((prev) => ({
            ...prev,
            [item.actionScenario]: res,
          }));
        });
    } catch (e) {
      return toast.error("Error fetching auto action");
    }
  }

  async function handleFetchAllTemplates() {
    if (!wabaState.selected) return;
    try {
      const wabaSrno = wabaState.waba.find(
        (waba) => waba.mobileNo === wabaState.selected
      )?.wabaSrno;

      const body = { officialWhatsappSrno: wabaSrno };
      const res = await fetchTemplates(body);

      const temps = Object.keys(res).map((key) => ({
        value: key,
        label: res[key],
      }));

      setAllTemplates(temps);
    } catch (e) {
      return toast.error("Error fetching all templates");
    }
  }

  useEffect(() => {
    handleGetAutoAction();
    handleFetchAllTemplates();
  }, [wabaState.selected]);

  useEffect(() => {
    if (!basicDetails?.template) return;
    async function handleFetchTemplateValues() {
      try {
        const res = await fetchTemplatesValue(basicDetails.template);
        const variable = extractVariablesFromText(res?.message);
        const btnVar = extractVariablesFromText(res?.url);
        setVariablesData({
          length: variable.length,
          data: variable,
          input: [],
          btn: btnVar,
          btnInput: [],
        });

        setSpecificTemplate(res);
      } catch (e) {
        return toast.error("Error fetching template values");
      }
    }

    handleFetchTemplateValues();
  }, [basicDetails]);

  function extractVariablesFromText(text) {
    const regex = /{{(\d+)}}/g;
    let match;
    const variables = [];
    while ((match = regex.exec(text)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    return variables;
  }

  function handleConfigure(type) {
    if (!wabaState.selected) {
      return toast.error("Please select WABA");
    }
    setConfigureState((prev) => ({
      ...prev,
      type,
      open: true,
    }));
  }

  async function deleteAction(type) {
    try {
      const data = {
        wabaNumber: wabaState.selected,
        type,
        wabaSrno: wabaState.waba.find(
          (waba) => waba.mobileNo === wabaState.selected
        )?.wabaSrno,
      };
      const res = await deleteAutoAction(data);
      setCardDetails({
        ...cardDetails,
        [type]: "",
      });
      await handleGetAutoAction();
    } catch (e) {
      toast.error("Something went wrong");
      return;
    }
  }

  async function handleSave() {
    let isError = false;
    //validation start
    if (!wabaState.selected) return toast.error("Please select WABA");
    if (basicDetails?.msgType === "1" && !basicDetails?.message)
      return toast.error("Please enter message");
    if (basicDetails?.msgType === "2" && !basicDetails?.template)
      return toast.error("Please select template");
    // if (basicDetails?.msgType === "2" && !basicDetails?.mediaPath)
    //   return toast.error("Please upload media");
    if (basicDetails?.msgType === "2" && variablesData.length) {
      const length = variablesData?.input.filter((item) => item != "").length;

      if (length !== variablesData?.length) {
        return toast.error("Please fill all variables");
      }
    }
    //validation end

    let variablemessage = "";
    let btnVariable = "";

    if (basicDetails?.msgType === "2" && variablesData.data.length) {
      variablemessage = specificTemplate?.message.replace(
        /{{(\d+)}}/g,
        (_, index) => variablesData?.input[+index - 1] || ""
      );
    }
    if (basicDetails?.msgType === "2" && variablesData.btn.length) {
      btnVariable = specificTemplate?.url.replace(
        /{{(\d+)}}/g,
        (_, index) => variablesData?.btnInput[+index - 1] || ""
      );
    }

    let message = basicDetails.message || variablemessage;
    specificTemplate.urlValue = btnVariable;
    // specificTemplate.message = message;
    variablemessage && (specificTemplate.message = variablemessage);

    const wabaSrno = wabaState.waba.find(
      (waba) => waba.mobileNo === wabaState.selected
    )?.wabaSrno;
    const data = {
      actionSenario: configureState?.type,
      wabaNumber: wabaState.selected,
      wabaSrno,
      ...basicDetails,
      // message: basicDetails?.message || message,
      message: message || specificTemplate.message,
      tempJson: JSON.stringify(specificTemplate),
    };

    try {
      await deleteAction(configureState.type);

      const res = await saveAutoAction(data);
      if (!res?.status) {
        toast.error("Error saving data");
      }
      toast.success("Data saved successfully");

      setCardDetails({
        ...cardDetails,
        [configureState.type]: "",
      });
      setConfigureState({
        type: "",
        open: false,
      });
      setBasicDetails({
        sendMsgCheckbox: true,
        msgType: "1",
        message: "",
        filePath: "",
        tempJson: "",
        mediaPath: "",
        template: "",
      });
      setVariablesData({
        length: 0,
        data: [],
        input: [],
        btn: [],
        btnInput: [],
      });
      setSpecificTemplate({});
      // if (fileRef) fileRef.current.value = "";
      await handleGetAutoAction();
    } catch (e) {
      toast.error("Error saving data");
    }
  }

  async function handleWorkingSave() {
    if (!wabaState.selected) {
      return toast.error("Please select WABA");
    }
    const dayMap = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const inactiveTimeArray = [];
    const noDaysSelected = [];

    dayMap.forEach((day, idx) => {
      const wh = workingHours[day];
      if (wh && wh.enabled) {
        inactiveTimeArray.push({
          status: 1,
          fromTime: wh.start ? wh.start.format("HH:mm") : "",
          toTime: wh.end ? wh.end.format("HH:mm") : "",
          day: idx + 1,
        });
      } else {
        noDaysSelected.push(idx + 1);
      }
    });

    const wabaSrno = wabaState.waba.find(
      (waba) => waba.mobileNo === wabaState.selected
    )?.wabaSrno;

    const tempJson = JSON.stringify(specificTemplate);

    const data = {
      actionSenario: "inactive_agent_timing",
      sendMsgCheckbox: true,
      msgType: basicDetails.msgType || "2",
      message:
        basicDetails.message ||
        "Hello dear Mr. rtrt,to resolve your issue please connect with us",
      filePath: basicDetails.filePath || "",
      wabaNumber: wabaState.selected,
      inactiveTimeArray,
      wabaSrno,
      tempJson,
      mediaPath: basicDetails.mediaPath || "",
      messageEntity: "6",
      noDaysSelectedArray:
        noDaysSelected.join(",") + (noDaysSelected.length ? "," : ""),
    };

    try {
      const res = await saveAutoAction(data);
      if (!res?.status) {
        return;
      }
      toast.success("Data saved successfully");
      setWorkingHoursDialog(false);
      await handleGetAutoAction();
    } catch (e) {
      toast.error("Error saving data");
    }
  }

  const liveChatCards = [
    {
      id: 1,
      name: "Welcome Message",
      button: ["Configure Text"],
      desc: "Automatically greet customers when they message you during off hours..",
      message: "",
      type: "Welcome_message",
    },
    {
      id: 2,
      name: "Off Hours Message",
      button: ["Configure Text", "Configure Time"],
      desc: "Configure automated reply for user's first query during off hours.",
      message: "",
      type: "off_hour_msg",
    },
    {
      id: 3,
      name: "Agent-Change",
      button: ["Configure Text"],
      desc: "Automatically greet customers when they message you during off hours.",
      message: "",
      type: "agent_change",
    },
    // { id: 4, name: "Agent-No-Response", button: ["Configure Text"], desc: "Automatically greet customers when they message you during off hours.", message: "", type: "agent_no_response" },
  ];

  async function handle15MinTime(minutes) {
    if (!wabaState.selected) return toast.error("Please select WABA");

    const wabaSrno = wabaState.waba.find(
      (waba) => waba.mobileNo === wabaState.selected
    )?.wabaSrno;

    const data = {
      actionSenario: "15_minutes_message",
      sendMsgCheckbox: true,
      msgType: "2",
      message: "",
      filePath: "",
      wabaNumber: wabaState.selected,
      wabaSrno: wabaSrno,
      tempJson: JSON.stringify({
        template: {
          replyButtons: [],
          name: "test13",
          language: { code: "en", policy: "deterministic" },
        },
        to: "mobileno",
        type: "template",
      }),
      mediaPath: "",
      messageEntity: "0",
      timeout: Number(minutes) || 0,
    };

    try {
      const res = await saveAutoAction(data);
      if (!res?.status) {
        // toast.error("Error saving 15 min message");
        return;
      }
      toast.success("15 min message saved successfully");
      await handleGetAutoAction();
    } catch (e) {
      toast.error("Error saving 15 min message");
    }
  }

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(to bottom right, #f0f4ff, #ffffff)",
          py: 2,
          px: 2,
          borderRadius: "20px",
        }}
      >
        {/* <CannedMessageManager /> */}

        {/* Heading */}
        <Box maxWidth="lg" mx="auto" textAlign="center" mb={2} mt={2}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            💬 WhatsApp Live Chat Settings
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Configure and automate your WhatsApp experience for smoother
            customer communication.
          </Typography>
        </Box>
        <div className="flex justify-end w-full items-center mb-2">
          <div className="w-56">
            <AnimatedDropdown
              id="waba"
              name="waba"
              label="Select WABA"
              tooltipContent="Select your whatsapp business account"
              tooltipPlacement="right"
              options={wabaState?.waba?.map((waba) => ({
                value: waba.mobileNo,
                label: waba.name,
              }))}
              value={wabaState.selected}
              onChange={(e) => {
                setWabaState((prev) => ({
                  ...prev,
                  selected: e,
                }));
                setCardDetails({});
              }}
            />
          </div>
        </div>

        {/* <Grid container spacing={5} justifyContent="center" maxWidth="lg">
          <Grid item xs={12} sm={6}>
            <MotionPaper
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              elevation={5}
              sx={{
                borderRadius: 4,
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                border: "1px solid #d1fae5",
                backgroundColor: "#ecfdf5",
                transition: "all 0.3s ease",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      backgroundColor: "#25D3661A",
                      p: 1.5,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <WhatsAppIcon sx={{ color: "#25D366", fontSize: 28 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700} color="#1f2937">
                    Welcome Message
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Switch
                    color="success"
                    checked={cardDetails["welcome_message"]?.message || 0}
                    inputProps={{ "aria-label": "welcome-message-toggle" }}
                    value={cardDetails["welcome_message"]?.status || false}
                    onClick={(e) => deleteAction("welcome_message")}
                  />
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Automatically greet customers when they message you during
                working hours.
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#fff",
                  border: "1px solid #d1d5db",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  {cardDetails["welcome_message"]?.message ||
                    "Click to configure"}
                </Typography>
              </Box>
              <Tooltip title="Click to configure" arrow>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{
                    mt: 1,
                    alignSelf: "flex-start",
                    backgroundColor: "#25D366",
                    fontWeight: 600,
                    textTransform: "none",
                    px: 3,
                    ":hover": { backgroundColor: "#1ebc59" },
                  }}
                  onClick={() => handleConfigure("welcome_message")}
                >
                  Configure
                </Button>
              </Tooltip>
            </MotionPaper>
          </Grid>
        </Grid> */}

        <div className=" flex flex-wrap justify-center items-center gap-5 space-y-8 mx-auto">
          {liveChatCards.map((card) => {
            return (
              <>
                <div
                  key={card.id}
                  className="relative flex w-90 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
                >
                  <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-green-100 to-green-50">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      marginTop={6}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box
                          sx={{
                            backgroundColor: "#25D3661A",
                            p: 1.5,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 1,
                          }}
                        >
                          <WhatsAppIcon
                            sx={{ color: "#25D366", fontSize: 28 }}
                          />
                        </Box>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          color="#1f2937"
                        >
                          {card.name}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <Switch
                          color="success"
                          checked={cardDetails[card.type]?.message || 0}
                          inputProps={{ "aria-label": `${card.type}-toggle` }}
                          value={cardDetails[card.type]?.status || false}
                          onClick={() => deleteAction(card.type)}
                        />
                      </Box>
                    </Box>
                  </div>

                  <div className="p-4">
                    <p className="mb-2 block font-sans text-sm  font-normal tracking-normal text-gray-600 antialiased">
                      {card.desc}
                    </p>
                    <div className="border border-gray-300 rounded-md p-2 bg-gray-100 h-50 overflow-scroll text-wrap">
                      <pre className="text-sm font-normal text-gray-600 text-wrap">
                        {cardDetails[card.type]?.message ||
                          "Hi! Thanks for connecting. Our team is unavailable right now. We'll be back at 10am tomorrow."}
                      </pre>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex flex-wrap justify-center items-center gap-2">
                    {card.button.map((btnLabel) => (
                      <Tooltip key={btnLabel} title="Click to configure" arrow>
                        <Button
                          variant="contained"
                          size="medium"
                          sx={{
                            mt: 1,
                            alignSelf: "flex-start",
                            backgroundColor: "#25D366",
                            fontWeight: 600,
                            textTransform: "none",
                            px: 3,
                            ":hover": { backgroundColor: "#1ebc59" },
                          }}
                          onClick={() => {
                            if (!wabaState.selected) {
                              toast.error("Please select WABA");
                              return;
                            }
                            if (btnLabel === "Configure Text")
                              handleConfigure(card.type);
                            else if (btnLabel === "Configure Time")
                              setWorkingHoursDialog(true);
                          }}
                        >
                          {btnLabel}
                        </Button>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </Box>

      <Dialog
        header={`Working Hours - ${selectedAgentName}`}
        visible={workingHoursDialog}
        onHide={() => setWorkingHoursDialog(false)}
        className="w-[40rem]"
        draggable={false}
        onClick={handleWorkingSave}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="space-y-2">
            {/* If working hours are not assigned, show a message + Assign Now button */}
            {Object.keys(workingHours).length === 0 ? (
              <div className="flex flex-col items-center justify-center text-gray-500 text-lg space-y-5 mt-5">
                <p>{selectedAgentName} has not assigned working hours</p>
                <button
                  className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-500 cursor-pointer text-[1rem]"
                  onClick={() =>
                    setWorkingHours({
                      Monday: { enabled: false, start: null, end: null },
                      Tuesday: { enabled: false, start: null, end: null },
                      Wednesday: { enabled: false, start: null, end: null },
                      Thursday: { enabled: false, start: null, end: null },
                      Friday: { enabled: false, start: null, end: null },
                      Saturday: { enabled: false, start: null, end: null },
                      Sunday: { enabled: false, start: null, end: null },
                    })
                  }
                >
                  Assign Now
                </button>
              </div>
            ) : (
              Object.keys(workingHours).map((day) => (
                <div
                  key={day}
                  className="flex items-center flex-wrap justify-between bg-white shadow-md gap-2 p-2 rounded-lg"
                >
                  {/* Toggle Open/Closed */}
                  <div className="flex items-center space-x-2">
                    <Switch
                      sx={{
                        "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                        {
                          backgroundColor: "#34C759",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#34C759",
                        },
                      }}
                      checked={workingHours[day].enabled}
                      onChange={() =>
                        setWorkingHours((prev) => ({
                          ...prev,
                          [day]: {
                            ...prev[day],
                            enabled: !prev[day].enabled,
                          },
                        }))
                      }
                    />
                    <span className="font-semibold text-blue-600 text-sm">
                      {day}
                    </span>
                  </div>

                  {/* Time Inputs when Enabled */}
                  {workingHours[day].enabled ? (
                    <div className="flex gap-2">
                      <TimePicker
                        value={workingHours[day].start}
                        onChange={(newTime) =>
                          setWorkingHours((prev) => ({
                            ...prev,
                            [day]: { ...prev[day], start: newTime },
                          }))
                        }
                        ampm
                        className="w-35 text-xs"
                      />
                      <TimePicker
                        value={workingHours[day].end}
                        onChange={(newTime) =>
                          setWorkingHours((prev) => ({
                            ...prev,
                            [day]: { ...prev[day], end: newTime },
                          }))
                        }
                        ampm
                        className="w-35 text-xs"
                      />
                    </div>
                  ) : (
                    <div className="w-10 flex p-2 pr-10 justify-center items-center">
                      <span className="text-gray-400 text-sm font-semibold">
                        Closed
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}

            {/*  Show Save Button only if there are working hours to update */}
            {Object.keys(workingHours).length !== 0 && (
              <div className="flex justify-center mt-4">
                <UniversalButton
                  label="Save"
                  id="workingHoursSave"
                  name="workingHoursSave"
                  onClick={handleWorkingSave}
                />
              </div>
            )}
          </div>
        </LocalizationProvider>
      </Dialog>

      {configureState?.open && (
        <ConfigureDialog
          configureState={configureState}
          setconfigureState={setConfigureState}
          setBasicDetails={setBasicDetails}
          basicDetails={basicDetails}
          handleSave={handleSave}
          allTemplates={allTemplates}
          specificTemplate={specificTemplate}
          variablesData={variablesData}
          setVariablesData={setVariablesData}
          fileRef={fileRef}
          setSpecificTemplate={setSpecificTemplate}
          handle15MinTime={handle15MinTime}
        />
      )}
    </>
  );
};

export default WhatsappLiveChatSettings;
