// import React, { useEffect, useRef, useState } from "react";
// import { Box, Grid, Paper, Typography, Button, Tooltip } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import dayjs from "dayjs";
// import TagIcon from "@mui/icons-material/Tag";
// import EmailIcon from "@mui/icons-material/Email";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import { motion } from "framer-motion";
// import { Switch } from "@mui/material";
// import { Dialog } from "primereact/dialog";
// import toast from "react-hot-toast";

// import {
//   deleteAutoAction,
//   fetchTemplates,
//   fetchTemplatesValue,
//   getAutoAction,
//   getWabaList,
//   saveAutoAction,
// } from "@/apis/whatsapp/whatsapp";

// import AnimatedDropdown from "../components/AnimatedDropdown";
// import { ConfigureDialog } from "./components/configureDialog";
// import UniversalButton from "../components/UniversalButton";
// import CannedMessageManager from "../../cannedmessage/components/CannedMessageManager";

// // import { extractVariable } from "../WhatsappBot/component/components/helper/extractVariable";

// const MotionPaper = motion(Paper);

// const WhatsappLiveChatSettings = () => {
//   const [selectedName, setSelectedName] = useState("");
//   const [selectedAgentName, setSelectedAgentName] = useState("");
//   const [selectedAgentId, setSelectedAgentId] = useState(null);
//   const [workingHoursDialog, setWorkingHoursDialog] = useState(false);
//   const [workingHours, setWorkingHours] = useState({});
//   const [isWorkingHoursEnabled, setIsWorkingHoursEnabled] = useState(true);

//   const [wabaState, setWabaState] = useState({
//     waba: [],
//     selected: "",
//   });

//   const [cardDetails, setCardDetails] = useState({});
//   const [configureState, setConfigureState] = useState({
//     type: "",
//     open: false,
//   });

//   const [basicDetails, setBasicDetails] = useState({
//     sendMsgCheckbox: true,
//     msgType: "1",
//     message: "",
//     filePath: "",
//     tempJson: "",
//     mediaPath: "",
//   });

//   const [allTemplates, setAllTemplates] = useState([]);
//   const [specificTemplate, setSpecificTemplate] = useState({});
//   const [variablesData, setVariablesData] = useState({
//     length: 0,
//     data: [],
//     input: [],
//     btn: [],
//     btnInput: [],
//   });

//   const fileRef = useRef(null);

//   useEffect(() => {
//     async function handleFetchWaba() {
//       try {
//         const res = await getWabaList();
//         setWabaState((prev) => ({
//           waba: res,
//           selected: "",
//         }));
//       } catch (e) {
//         return toast.error("Error fetching Waba Details");
//       }
//     }

//     handleFetchWaba();
//   }, []);

//   async function handleGetAutoAction() {
//     if (!wabaState.selected) return;
//     try {
//       const data = {
//         wabaNumber: wabaState.selected,
//         type: "-1",
//       };
//       const res = await getAutoAction(data);
//       res?.EntityMstActionScenerio &&
//         res.EntityMstActionScenerio.map(async (item) => {
//           data["type"] = item.actionScenario;
//           const res = await getAutoAction(data);
//           setCardDetails((prev) => ({
//             ...prev,
//             [item.actionScenario]: res,
//           }));
//         });
//     } catch (e) {
//       return toast.error("Error fetching auto action");
//     }
//   }

//   async function handleFetchAllTemplates() {
//     if (!wabaState.selected) return;
//     try {
//       const wabaSrno = wabaState.waba.find(
//         (waba) => waba.mobileNo === wabaState.selected
//       )?.wabaSrno;

//       const body = { officialWhatsappSrno: wabaSrno };
//       const res = await fetchTemplates(body);

//       const temps = Object.keys(res).map((key) => ({
//         value: key,
//         label: res[key],
//       }));

//       setAllTemplates(temps);
//     } catch (e) {
//       return toast.error("Error fetching all templates");
//     }
//   }

//   useEffect(() => {
//     handleGetAutoAction();
//     handleFetchAllTemplates();
//   }, [wabaState.selected]);

//   useEffect(() => {
//     if (!basicDetails?.template) return;
//     async function handleFetchTemplateValues() {
//       try {
//         const res = await fetchTemplatesValue(basicDetails.template);
//         const variable = extractVariablesFromText(res?.message);
//         const btnVar = extractVariablesFromText(res?.url);
//         setVariablesData({
//           length: variable.length,
//           data: variable,
//           input: [],
//           btn: btnVar,
//           btnInput: [],
//         });

//         setSpecificTemplate(res);
//       } catch (e) {
//         return toast.error("Error fetching template values");
//       }
//     }

//     handleFetchTemplateValues();
//   }, [basicDetails]);

//   function extractVariablesFromText(text) {
//     const regex = /{{(\d+)}}/g;
//     let match;
//     const variables = [];
//     while ((match = regex.exec(text)) !== null) {
//       if (!variables.includes(match[1])) {
//         variables.push(match[1]);
//       }
//     }
//     return variables;
//   }

//   function handleConfigure(type) {
//     if (!wabaState.selected) {
//       return toast.error("Please select WABA");
//     }
//     setConfigureState((prev) => ({
//       ...prev,
//       type,
//       open: true,
//     }));
//   }

//   async function deleteAction(type) {
//     try {
//       const data = {
//         wabaNumber: wabaState.selected,
//         type,
//         wabaSrno: wabaState.waba.find(
//           (waba) => waba.mobileNo === wabaState.selected
//         )?.wabaSrno,
//       };
//       const res = await deleteAutoAction(data);
//       setCardDetails({
//         ...cardDetails,
//         [type]: "",
//       });
//       await handleGetAutoAction();
//     } catch (e) {
//       toast.error("Something went wrong");
//       return;
//     }
//   }

//   async function handleSave() {
//     let isError = false;
//     //validation start
//     if (!wabaState.selected) return toast.error("Please select WABA");
//     if (basicDetails?.msgType === "1" && !basicDetails?.message)
//       return toast.error("Please enter message");
//     if (basicDetails?.msgType === "2" && !basicDetails?.template)
//       return toast.error("Please select template");
//     // if (basicDetails?.msgType === "2" && !basicDetails?.mediaPath)
//     //   return toast.error("Please upload media");
//     if (basicDetails?.msgType === "2" && variablesData.length) {
//       const length = variablesData?.input.filter((item) => item != "").length;

//       if (length !== variablesData?.length) {
//         return toast.error("Please fill all variables");
//       }
//     }
//     //validation end

//     let variablemessage = "";
//     let btnVariable = "";

//     if (basicDetails?.msgType === "2" && variablesData.data.length) {
//       variablemessage = specificTemplate?.message.replace(
//         /{{(\d+)}}/g,
//         (_, index) => variablesData?.input[+index - 1] || ""
//       );
//     }
//     if (basicDetails?.msgType === "2" && variablesData.btn.length) {
//       btnVariable = specificTemplate?.url.replace(
//         /{{(\d+)}}/g,
//         (_, index) => variablesData?.btnInput[+index - 1] || ""
//       );
//     }

//     let message = basicDetails.message || variablemessage;
//     specificTemplate.urlValue = btnVariable;
//     // specificTemplate.message = message;
//     variablemessage && (specificTemplate.message = variablemessage);

//     const wabaSrno = wabaState.waba.find(
//       (waba) => waba.mobileNo === wabaState.selected
//     )?.wabaSrno;
//     const data = {
//       actionSenario: configureState?.type,
//       wabaNumber: wabaState.selected,
//       wabaSrno,
//       ...basicDetails,
//       // message: basicDetails?.message || message,
//       message: message || specificTemplate.message,
//       tempJson: JSON.stringify(specificTemplate),
//     };

//     try {
//       await deleteAction(configureState.type);

//       const res = await saveAutoAction(data);
//       if (!res?.status) {
//         toast.error("Error saving data");
//       }
//       toast.success("Data saved successfully");

//       setCardDetails({
//         ...cardDetails,
//         [configureState.type]: "",
//       });
//       setConfigureState({
//         type: "",
//         open: false,
//       });
//       setBasicDetails({
//         sendMsgCheckbox: true,
//         msgType: "1",
//         message: "",
//         filePath: "",
//         tempJson: "",
//         mediaPath: "",
//         template: "",
//       });
//       setVariablesData({
//         length: 0,
//         data: [],
//         input: [],
//         btn: [],
//         btnInput: [],
//       });
//       setSpecificTemplate({});
//       // if (fileRef) fileRef.current.value = "";
//       await handleGetAutoAction();
//     } catch (e) {
//       toast.error("Error saving data");
//     }
//   }

//   async function handleWorkingSave() {
//     if (!wabaState.selected) {
//       return toast.error("Please select WABA");
//     }
//     const dayMap = [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ];

//     const inactiveTimeArray = [];
//     const noDaysSelected = [];

//     dayMap.forEach((day, idx) => {
//       const wh = workingHours[day];
//       if (wh && wh.enabled) {
//         inactiveTimeArray.push({
//           status: 1,
//           fromTime: wh.start ? wh.start.format("HH:mm") : "",
//           toTime: wh.end ? wh.end.format("HH:mm") : "",
//           day: idx + 1,
//         });
//       } else {
//         noDaysSelected.push(idx + 1);
//       }
//     });

//     const wabaSrno = wabaState.waba.find(
//       (waba) => waba.mobileNo === wabaState.selected
//     )?.wabaSrno;

//     const tempJson = JSON.stringify(specificTemplate);

//     const data = {
//       actionSenario: "inactive_agent_timing",
//       sendMsgCheckbox: true,
//       msgType: basicDetails.msgType || "2",
//       message:
//         basicDetails.message ||
//         "Hello dear Mr. rtrt,to resolve your issue please connect with us",
//       filePath: basicDetails.filePath || "",
//       wabaNumber: wabaState.selected,
//       inactiveTimeArray,
//       wabaSrno,
//       tempJson,
//       mediaPath: basicDetails.mediaPath || "",
//       messageEntity: "6",
//       noDaysSelectedArray:
//         noDaysSelected.join(",") + (noDaysSelected.length ? "," : ""),
//     };

//     try {
//       const res = await saveAutoAction(data);
//       if (!res?.status) {
//         return;
//       }
//       toast.success("Data saved successfully");
//       setWorkingHoursDialog(false);
//       await handleGetAutoAction();
//     } catch (e) {
//       toast.error("Error saving data");
//     }
//   }

//   const liveChatCards = [
//     {
//       id: 1,
//       name: "Welcome Message",
//       button: ["Configure Text"],
//       desc: "Automatically greet customers when they message you during off hours..",
//       message: "",
//       type: "Welcome_message",
//     },
//     {
//       id: 2,
//       name: "Off Hours Message",
//       button: ["Configure Text", "Configure Time"],
//       desc: "Configure automated reply for user's first query during off hours.",
//       message: "",
//       type: "off_hour_msg",
//     },
//     {
//       id: 3,
//       name: "Agent-Change",
//       button: ["Configure Text"],
//       desc: "Automatically greet customers when they message you during off hours.",
//       message: "",
//       type: "agent_change",
//     },
//     // { id: 4, name: "Agent-No-Response", button: ["Configure Text"], desc: "Automatically greet customers when they message you during off hours.", message: "", type: "agent_no_response" },
//   ];

//   async function handle15MinTime(minutes) {
//     if (!wabaState.selected) return toast.error("Please select WABA");

//     const wabaSrno = wabaState.waba.find(
//       (waba) => waba.mobileNo === wabaState.selected
//     )?.wabaSrno;

//     const data = {
//       actionSenario: "15_minutes_message",
//       sendMsgCheckbox: true,
//       msgType: "2",
//       message: "",
//       filePath: "",
//       wabaNumber: wabaState.selected,
//       wabaSrno: wabaSrno,
//       tempJson: JSON.stringify({
//         template: {
//           replyButtons: [],
//           name: "test13",
//           language: { code: "en", policy: "deterministic" },
//         },
//         to: "mobileno",
//         type: "template",
//       }),
//       mediaPath: "",
//       messageEntity: "0",
//       timeout: Number(minutes) || 0,
//     };

//     try {
//       const res = await saveAutoAction(data);
//       if (!res?.status) {
//         // toast.error("Error saving 15 min message");
//         return;
//       }
//       toast.success("15 min message saved successfully");
//       await handleGetAutoAction();
//     } catch (e) {
//       toast.error("Error saving 15 min message");
//     }
//   }

//   return (
//     <>
//       <Box
//         sx={{
//           background: "linear-gradient(to bottom right, #f0f4ff, #ffffff)",
//           py: 2,
//           px: 2,
//           borderRadius: "20px",
//         }}
//       >
//         {/* <CannedMessageManager /> */}

//         {/* Heading */}
//         <Box maxWidth="lg" mx="auto" textAlign="center" mb={2} mt={2}>
//           <Typography
//             variant="h5"
//             fontWeight="bold"
//             color="text.primary"
//             gutterBottom
//           >
//             💬 WhatsApp Live Chat Settings
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             Configure and automate your WhatsApp experience for smoother
//             customer communication.
//           </Typography>
//         </Box>
//         <div className="flex justify-end w-full items-center mb-2">
//           <div className="w-56">
//             <AnimatedDropdown
//               id="waba"
//               name="waba"
//               label="Select WABA"
//               tooltipContent="Select your whatsapp business account"
//               tooltipPlacement="right"
//               options={wabaState?.waba?.map((waba) => ({
//                 value: waba.mobileNo,
//                 label: waba.name,
//               }))}
//               value={wabaState.selected}
//               onChange={(e) => {
//                 setWabaState((prev) => ({
//                   ...prev,
//                   selected: e,
//                 }));
//                 setCardDetails({});
//               }}
//             />
//           </div>
//         </div>

//         {/* <Grid container spacing={5} justifyContent="center" maxWidth="lg">
//           <Grid item xs={12} sm={6}>
//             <MotionPaper
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               elevation={5}
//               sx={{
//                 borderRadius: 4,
//                 p: 4,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//                 border: "1px solid #d1fae5",
//                 backgroundColor: "#ecfdf5",
//                 transition: "all 0.3s ease",
//               }}
//             >
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="space-between"
//               >
//                 <Box display="flex" alignItems="center" gap={2}>
//                   <Box
//                     sx={{
//                       backgroundColor: "#25D3661A",
//                       p: 1.5,
//                       borderRadius: 2,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <WhatsAppIcon sx={{ color: "#25D366", fontSize: 28 }} />
//                   </Box>
//                   <Typography variant="h6" fontWeight={700} color="#1f2937">
//                     Welcome Message
//                   </Typography>
//                 </Box>

//                 <Box display="flex" alignItems="center" gap={1}>
//                   <Switch
//                     color="success"
//                     checked={cardDetails["welcome_message"]?.message || 0}
//                     inputProps={{ "aria-label": "welcome-message-toggle" }}
//                     value={cardDetails["welcome_message"]?.status || false}
//                     onClick={(e) => deleteAction("welcome_message")}
//                   />
//                 </Box>
//               </Box>

//               <Typography variant="body2" color="text.secondary">
//                 Automatically greet customers when they message you during
//                 working hours.
//               </Typography>

//               <Box
//                 sx={{
//                   backgroundColor: "#fff",
//                   border: "1px solid #d1d5db",
//                   borderRadius: 2,
//                   p: 2,
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   fontWeight={600}
//                   color="text.primary"
//                 >
//                   {cardDetails["welcome_message"]?.message ||
//                     "Click to configure"}
//                 </Typography>
//               </Box>
//               <Tooltip title="Click to configure" arrow>
//                 <Button
//                   variant="contained"
//                   size="medium"
//                   sx={{
//                     mt: 1,
//                     alignSelf: "flex-start",
//                     backgroundColor: "#25D366",
//                     fontWeight: 600,
//                     textTransform: "none",
//                     px: 3,
//                     ":hover": { backgroundColor: "#1ebc59" },
//                   }}
//                   onClick={() => handleConfigure("welcome_message")}
//                 >
//                   Configure
//                 </Button>
//               </Tooltip>
//             </MotionPaper>
//           </Grid>
//         </Grid> */}

//         <div className=" flex flex-wrap justify-center items-center gap-5 space-y-8 mx-auto">
//           {liveChatCards.map((card) => {
//             return (
//               <>
//                 <div
//                   key={card.id}
//                   className="relative flex w-90 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
//                 >
//                   <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-green-100 to-green-50">
//                     <Box
//                       display="flex"
//                       alignItems="center"
//                       justifyContent="space-between"
//                       marginTop={6}
//                     >
//                       <Box display="flex" alignItems="center" gap={2}>
//                         <Box
//                           sx={{
//                             backgroundColor: "#25D3661A",
//                             p: 1.5,
//                             borderRadius: 2,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             marginLeft: 1,
//                           }}
//                         >
//                           <WhatsAppIcon
//                             sx={{ color: "#25D366", fontSize: 28 }}
//                           />
//                         </Box>
//                         <Typography
//                           variant="h6"
//                           fontWeight={600}
//                           color="#1f2937"
//                         >
//                           {card.name}
//                         </Typography>
//                       </Box>

//                       <Box display="flex" alignItems="center" gap={1}>
//                         <Switch
//                           color="success"
//                           checked={cardDetails[card.type]?.message || 0}
//                           inputProps={{ "aria-label": `${card.type}-toggle` }}
//                           value={cardDetails[card.type]?.status || false}
//                           onClick={() => deleteAction(card.type)}
//                         />
//                       </Box>
//                     </Box>
//                   </div>

//                   <div className="p-4">
//                     <p className="mb-2 block font-sans text-sm  font-normal tracking-normal text-gray-600 antialiased">
//                       {card.desc}
//                     </p>
//                     <div className="border border-gray-300 rounded-md p-2 bg-gray-100 h-50 overflow-scroll text-wrap">
//                       <pre className="text-sm font-normal text-gray-600 text-wrap">
//                         {cardDetails[card.type]?.message ||
//                           "Hi! Thanks for connecting. Our team is unavailable right now. We'll be back at 10am tomorrow."}
//                       </pre>
//                     </div>
//                   </div>

//                   <div className="p-6 pt-0 flex flex-wrap justify-center items-center gap-2">
//                     {card.button.map((btnLabel) => (
//                       <Tooltip key={btnLabel} title="Click to configure" arrow>
//                         <Button
//                           variant="contained"
//                           size="medium"
//                           sx={{
//                             mt: 1,
//                             alignSelf: "flex-start",
//                             backgroundColor: "#25D366",
//                             fontWeight: 600,
//                             textTransform: "none",
//                             px: 3,
//                             ":hover": { backgroundColor: "#1ebc59" },
//                           }}
//                           onClick={() => {
//                             if (!wabaState.selected) {
//                               toast.error("Please select WABA");
//                               return;
//                             }
//                             if (btnLabel === "Configure Text")
//                               handleConfigure(card.type);
//                             else if (btnLabel === "Configure Time")
//                               setWorkingHoursDialog(true);
//                           }}
//                         >
//                           {btnLabel}
//                         </Button>
//                       </Tooltip>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             );
//           })}
//         </div>
//       </Box>

//       <Dialog
//         header={`Working Hours - ${selectedAgentName}`}
//         visible={workingHoursDialog}
//         onHide={() => setWorkingHoursDialog(false)}
//         className="w-[40rem]"
//         draggable={false}
//         onClick={handleWorkingSave}
//       >
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <div className="space-y-2">
//             {/* If working hours are not assigned, show a message + Assign Now button */}
//             {Object.keys(workingHours).length === 0 ? (
//               <div className="flex flex-col items-center justify-center text-gray-500 text-lg space-y-5 mt-5">
//                 <p>{selectedAgentName} has not assigned working hours</p>
//                 <button
//                   className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-500 cursor-pointer text-[1rem]"
//                   onClick={() =>
//                     setWorkingHours({
//                       Monday: { enabled: false, start: null, end: null },
//                       Tuesday: { enabled: false, start: null, end: null },
//                       Wednesday: { enabled: false, start: null, end: null },
//                       Thursday: { enabled: false, start: null, end: null },
//                       Friday: { enabled: false, start: null, end: null },
//                       Saturday: { enabled: false, start: null, end: null },
//                       Sunday: { enabled: false, start: null, end: null },
//                     })
//                   }
//                 >
//                   Assign Now
//                 </button>
//               </div>
//             ) : (
//               Object.keys(workingHours).map((day) => (
//                 <div
//                   key={day}
//                   className="flex items-center flex-wrap justify-between bg-white shadow-md gap-2 p-2 rounded-lg"
//                 >
//                   {/* Toggle Open/Closed */}
//                   <div className="flex items-center space-x-2">
//                     <Switch
//                       sx={{
//                         "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
//                         {
//                           backgroundColor: "#34C759",
//                         },
//                         "& .MuiSwitch-switchBase.Mui-checked": {
//                           color: "#34C759",
//                         },
//                       }}
//                       checked={workingHours[day].enabled}
//                       onChange={() =>
//                         setWorkingHours((prev) => ({
//                           ...prev,
//                           [day]: {
//                             ...prev[day],
//                             enabled: !prev[day].enabled,
//                           },
//                         }))
//                       }
//                     />
//                     <span className="font-semibold text-blue-600 text-sm">
//                       {day}
//                     </span>
//                   </div>

//                   {/* Time Inputs when Enabled */}
//                   {workingHours[day].enabled ? (
//                     <div className="flex gap-2">
//                       <TimePicker
//                         value={workingHours[day].start}
//                         onChange={(newTime) =>
//                           setWorkingHours((prev) => ({
//                             ...prev,
//                             [day]: { ...prev[day], start: newTime },
//                           }))
//                         }
//                         ampm
//                         className="w-35 text-xs"
//                       />
//                       <TimePicker
//                         value={workingHours[day].end}
//                         onChange={(newTime) =>
//                           setWorkingHours((prev) => ({
//                             ...prev,
//                             [day]: { ...prev[day], end: newTime },
//                           }))
//                         }
//                         ampm
//                         className="w-35 text-xs"
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-10 flex p-2 pr-10 justify-center items-center">
//                       <span className="text-gray-400 text-sm font-semibold">
//                         Closed
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}

//             {/*  Show Save Button only if there are working hours to update */}
//             {Object.keys(workingHours).length !== 0 && (
//               <div className="flex justify-center mt-4">
//                 <UniversalButton
//                   label="Save"
//                   id="workingHoursSave"
//                   name="workingHoursSave"
//                   onClick={handleWorkingSave}
//                 />
//               </div>
//             )}
//           </div>
//         </LocalizationProvider>
//       </Dialog>

//       {configureState?.open && (
//         <ConfigureDialog
//           configureState={configureState}
//           setconfigureState={setConfigureState}
//           setBasicDetails={setBasicDetails}
//           basicDetails={basicDetails}
//           handleSave={handleSave}
//           allTemplates={allTemplates}
//           specificTemplate={specificTemplate}
//           variablesData={variablesData}
//           setVariablesData={setVariablesData}
//           fileRef={fileRef}
//           setSpecificTemplate={setSpecificTemplate}
//           handle15MinTime={handle15MinTime}
//         />
//       )}
//     </>
//   );
// };

// export default WhatsappLiveChatSettings;

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
import { Switch } from "@mui/material";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import {
  BiMessageSquareDetail,
  BiCog,
  BiUserCircle,
  BiChevronRight,
} from "react-icons/bi";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { AiOutlineRobot } from "react-icons/ai";
import {
  deleteAutoAction,
  fetchTemplates,
  fetchTemplatesValue,
  getAutoAction,
  getWabaList,
  saveAutoAction,
} from "@/apis/whatsapp/whatsapp";
import { motion, AnimatePresence } from "framer-motion";
import { FaHandPointDown } from "react-icons/fa";
import { deleteblockUser, getblockUser } from "@/apis/whatsapp/whatsapp";
import AnimatedDropdown from "../components/AnimatedDropdown";
import { ConfigureDialog } from "./components/configureDialog";
import UniversalButton from "../components/UniversalButton";
import CannedMessageManager from "../../cannedmessage/components/CannedMessageManager";
import StorageIcon from "@mui/icons-material/Storage";
import { CgUnblock } from "react-icons/cg";
import { Datasource } from "./components/Datasource";
import { Ai } from "./components/Ai";
import CustomTooltip from "../components/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Unsubscribe from "../unsubscribe/Unsubscribe";

const MotionPaper = motion(Paper);

const tabs = [
  // {
  //   key: "configuration",
  //   label: "AI Configurations",
  //   icon: <BiMessageSquareDetail size={20} />,
  // },
  { key: "settings", label: "Chat Settings", icon: <BiCog size={20} /> },
  { key: "users", label: "Block User", icon: <BiUserCircle size={20} /> },
  {
    key: "unsubscribe",
    label: "Unsubscribe Report",
    icon: <MdOutlineUnsubscribe size={20} />,
  },
];

const chatSubOptions = [
  { key: "ai", label: "AI Assist", icon: <AiOutlineRobot size={18} /> },
  { key: "data", label: "Data source", icon: <StorageIcon size={18} /> },
];

const WhatsappLiveChatSettings = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [allWaba, setAllWaba] = useState([]);
  const [selectedWaba, setSelectedWaba] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isBlocking, setIsBlocking] = useState(false);

  const [fileData, setFileData] = useState({
    url: "",
    file: "",
  });

  // useEffect(() => {
  //     // Only for demo: generate 50 dummy users if no real data
  //     if (selectedWaba && blockedUsers.length === 0 && !loading) {
  //         const dummy = Array.from({ length: 50 }).map((_, i) => ({
  //             wa_id: `91999999${(1000 + i).toString().padStart(4, "0")}`,
  //         }));
  //         setBlockedUsers(dummy);
  //     }
  // }, [selectedWaba, blockedUsers, loading]);

  // bloackuser
  const filteredUsers = blockedUsers.filter((user) =>
    user.wa_id.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchAllWaba();
  }, []);

  useEffect(() => {
    if (selectedWaba) {
      setLoading(true);
      fetchBlockedUsers();
    }
  }, [selectedWaba]);

  const fetchAllWaba = async () => {
    try {
      const res = await getWabaList();
      setAllWaba(res);
    } catch {
      toast.error("Failed to load WABA list");
    }
  };

  const fetchBlockedUsers = async () => {
    try {
      const res = await getblockUser(selectedWaba);
      const formatted = Array.isArray(res?.data)
        ? res.data.map((user, i) => ({ sn: i + 1, ...user }))
        : [];
      setBlockedUsers(formatted);
    } catch {
      toast.error("Failed to load blocked users");
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async () => {
    try {
      setIsBlocking(true);
      const payload = {
        messaging_product: "whatsapp",
        block_users: [{ user: selectedId }],
      };
      const res = await deleteblockUser(selectedWaba, payload);
      if (res?.block_users?.removed_users?.length === 0) {
        toast.error("Could not unblock user");
        return;
      }
      toast.success("User unblocked");
      setDialogVisible(false);
      fetchBlockedUsers();
    } catch {
      toast.error("Error unblocking user");
    } finally {
      setIsBlocking(false);
    }
  };

  const skeletonCards = Array.from({ length: 3 }).map((_, idx) => (
    <div
      key={idx}
      className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between animate-pulse min-h-[120px]"
    >
      <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
    </div>
  ));

  function highlightMatch(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="bg-yellow-200 text-black rounded">
          {text.slice(idx, idx + query.length)}
        </span>
        {text.slice(idx + query.length)}
      </>
    );
  }
  // bloackuser
  // chat setting
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

    const cardTypeDetails = cardDetails[type];
    let tempId = null;
    const parsedJson = JSON.parse(cardTypeDetails?.tempJson);
    if (parsedJson?.templateName) {
      const tempName = parsedJson?.templateName;
      tempId = allTemplates?.find((item) => item.label === tempName)?.value;
    }
    let msgType = "1";
    if (parsedJson?.templateName) {
      msgType = "2";
    }
    // fileRef.current.value = cardTypeDetails?.mediaPath;

    setFileData({
      url: parsedJson?.mediaPath,
      file: parsedJson?.mediaPath,
    });
    setBasicDetails((prev) => ({
      sendMsgCheckbox: true,
      msgType,
      message: cardTypeDetails?.message,
      filePath: cardTypeDetails?.filePath,
      tempJson: cardTypeDetails?.tempJson,
      mediaPath: parsedJson?.mediaPath,
      timeout: cardTypeDetails?.timeout,
      template: tempId,
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
    delete basicDetails?.template
    const data = {
      actionSenario: configureState?.type,
      wabaNumber: wabaState.selected,
      wabaSrno,
      ...basicDetails,
      // message: basicDetails?.message || message,
      message: message || specificTemplate.message,
      tempJson: JSON.stringify(specificTemplate),
      // assignAgentCheckbox: false
      messageEntity: "0",
    };

    try {
      await deleteAction(configureState.type);

      const res = await saveAutoAction(data);
      if (!res?.status) {
        toast.error("Error saving data");
        return;
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
      messageEntity: "0",
      noDaysSelectedArray:
        noDaysSelected.join(",") + (noDaysSelected.length ? "," : ""),
      agent: basicDetails?.agent || "",
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
      button: ["Configure"],
      desc: "Greets users automatically when they message for the first time. Helps create a quick and professional first response.",
      message: "",
      type: "welcome_message",
      tooltip:
        "“Hi! 👋 Thanks for reaching out. Our team will connect with you shortly.”",
    },
    {
      id: 2,
      name: "Agent Inactive Timings",
      button: ["Configure", "Configure Time"],
      desc: "Sends a reply to the user’s first message received outside business hours. Useful for informing users about support timing.",
      message: "",
      type: "inactive_agent_timing",
      tooltip: (
        <>
          <div>
            <b>What it does:</b> Sends a one-time auto-reply to the user’s first
            message after business hours.
          </div>

          <div>
            <b>Example:</b> “Our team is unavailable now. We’ll reply during our
            shift, 10 AM–7 PM.”
          </div>
        </>
      ),
    },
    {
      id: 3,
      name: "Agent-Change",
      button: ["Configure"],
      desc: "Sends an automated message when a chat is reassigned or the agent becomes inactive. Keeps the user informed during off-hours.",
      message: "",
      type: "agent_assign_message",
      tooltip: "“All agents are currently unavailable. We’ll reconnect soon.”",
    },
    {
      id: 4,
      name: "Agent No Response",
      button: ["Configure"],
      desc: "Activates auto-replies during agent off-shift times. Ensures customers receive a response even when no one is online.",
      message: "",
      type: "15_minutes_message",
      tooltip: (
        <>
          <div>
            <b>What it does:</b> Auto-replies when no agent is online based on
            shift time settings.
          </div>

          <div>
            <b>Example:</b> “No agents are online right now. We'll respond after
            10 AM.”
          </div>
        </>
      ),
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
      // tempJson: JSON.stringify({
      //   template: {
      //     replyButtons: [],
      //     name: "test13",
      //     language: { code: "en", policy: "deterministic" },
      //   },
      //   to: "mobileno",
      //   type: "template",
      // }),
      tempJson: "",
      mediaPath: "",
      messageEntity: cardDetails["15_minutes_message"]?.messageEntity || "0",
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

  const [activeTab, setActiveTab] = useState("settings");
  const [activeSub, setActiveSub] = useState("ai");

  const renderContent = () => {
    if (activeTab === "configuration") {
      switch (activeSub) {
        case "ai":
          return (
            <div className="p-4 bg-white rounded-lg shadow">
              <Ai />
            </div>
          );
        case "data":
          return (
            <div className="p-4 bg-white rounded-lg shadow">
              <Datasource />
            </div>
          );
        default:
          return null;
      }
    }

    if (activeTab === "settings")
      return (
        <div className="p-2 bg-white rounded-lg shadow overflow-auto h-155 md:h-auto  pb-20 md:pb-0">
          <>
            <div
              // sx={{
              //   background: "linear-gradient(to bottom right, #f0f4ff, #ffffff)",
              //   py: 2,
              //   px: 2,
              //   borderRadius: "20px",
              // }}
              className="min-h-[89.4vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl py-6 px-0 md:px-4 shadow-lg overflow-auto md:h-[100vh] pb-20 md:pb-30"
            >
              {/* <CannedMessageManager /> */}

              {/* Heading */}
              <div className="text-center flex flex-col">
                <span className="text-2xl font-bold text-gray-700 mb-2">
                  Agent Settings
                </span>
                <span className="text-gray-600  text-sm text-center">
                  Configure and automate your WhatsApp experience for smoother
                  customer communication.
                </span>
              </div>
              <div className="flex justify-end w-full items-center mb-2">
                <div className="w-96 mb-5 mx-auto mt-2">
                  <AnimatedDropdown
                    id="waba"
                    name="waba"
                    label="Select WABA Account"
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
              <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center h-auto p-0 md:p-5 border-3 border-dashed border-indigo-200 ">
                {wabaState.selected ? (
                  <div className=" flex flex-wrap justify-center items-center gap-5  mx-auto">
                    {liveChatCards.map((card, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="relative flex w-90 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
                          >
                            <div className=" mx-3 mt-3 h-30 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white  shadow-blue-gray-500/40 bg-gradient-to-r from-green-100 to-green-50">
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                marginTop={4}
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
                                    checked={
                                      cardDetails[card.type]?.message || 0
                                    }
                                    inputProps={{
                                      "aria-label": `${card.type}-toggle`,
                                    }}
                                    value={
                                      cardDetails[card.type]?.status || false
                                    }
                                    onClick={() => deleteAction(card.type)}
                                  />
                                </Box>
                              </Box>
                            </div>

                            <div className="p-3">
                              <p className="mb-2 flex font-sans text-sm  font-normal tracking-normal text-gray-600 antialiased">
                                {card.desc}
                                <CustomTooltip
                                  title={card.tooltip}
                                  placement="top"
                                  arrow
                                >
                                  <span className="">
                                    <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
                                  </span>
                                </CustomTooltip>
                              </p>
                              <div className="border border-gray-300 rounded-md p-2 bg-gray-100 h-50 overflow-scroll text-wrap">
                                <pre className="text-sm font-normal text-gray-600 text-wrap">
                                  {cardDetails[card.type]?.message ||
                                    "Hi! Thanks for connecting. Our team is unavailable right now. We'll be back at 10am tomorrow."}
                                </pre>
                              </div>
                            </div>

                            <div className="p-6 pt-0 flex flex-wrap justify-center items-center gap-2">
                              {card.button.map((btnLabel, index) => (
                                <Tooltip
                                  key={index}
                                  title="Click to configure"
                                  arrow
                                >
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
                                      if (btnLabel === "Configure")
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
                ) : (
                  <div className="flex flex-col items-center justify-center p-5 2xl:p-25">
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.3 }}
                        className="border-3 p-8 border-indigo-200 rounded-2xl border-dashed shadow-2xl"
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                          className="mb-2 flex items-center justify-center"
                        >
                          <FaHandPointDown
                            className="text-5xl text-indigo-400"
                            style={{ transform: "rotate(180deg)" }}
                          />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                          Please select a WABA account
                        </h3>
                        <p className="text-gray-500 text-center max-w-xs text-sm">
                          Choose a WABA from the dropdown above to view blocked
                          users.
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            <Dialog
              header={`Working Hours - ${selectedAgentName}`}
              visible={workingHoursDialog}
              onHide={() => setWorkingHoursDialog(false)}
              className="w-[40rem]"
              draggable={false}
              // onClick={handleWorkingSave}
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
                            Wednesday: {
                              enabled: false,
                              start: null,
                              end: null,
                            },
                            Thursday: {
                              enabled: false,
                              start: null,
                              end: null,
                            },
                            Friday: { enabled: false, start: null, end: null },
                            Saturday: {
                              enabled: false,
                              start: null,
                              end: null,
                            },
                            Sunday: { enabled: false, start: null, end: null },
                          })
                        }
                      >
                        Assign Now
                      </button>
                    </div>
                  ) : (
                    Object.keys(workingHours).map((day, index) => (
                      <div
                        key={index}
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
                fileData={fileData}
                setFileData={setFileData}
              />
            )}
          </>
        </div>
      );

    if (activeTab === "users")
      return (
        <div className="p-2 bg-white rounded-lg shadow overflow-auto h-155 md:h-auto pb-20 md:pb-0">
          <div className="min-h-[89.4vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl py-6 px-4 shadow-lg">
            <div className=" mx-auto">
              <div className="text-center mb-4 ">
                <h1 className="text-2xl font-bold text-gray-700 mb-2">
                  Blocked WhatsApp Users
                </h1>
                <p className="text-gray-600  text-sm text-center">
                  Manage users who are currently blocked from messaging your
                  WhatsApp business account. Unblock users easily with a single
                  click.
                </p>
              </div>

              <div className="mb-6 max-w-sm mx-auto">
                <AnimatedDropdown
                  id="selectWaba"
                  label={"Select WABA Account"}
                  name="selectWaba"
                  options={allWaba.map((waba) => ({
                    value: waba.mobileNo,
                    label: waba.name,
                  }))}
                  onChange={(val) => setSelectedWaba(val)}
                  value={selectedWaba}
                />
              </div>

              <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center h-auto p-5 border-3 border-dashed border-indigo-200">
                <div className="flex flex-col items-center justify-center p-5 2xl:p-25">
                  {!selectedWaba ? (
                    <div className="flex flex-col items-center justify-center h-auto md:h-full">
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 30 }}
                          transition={{ duration: 0.3 }}
                          className="border-3 p-8 border-indigo-200 rounded-2xl border-dashed shadow-2xl"
                        >
                          <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                            className="mb-2 flex items-center justify-center"
                          >
                            <FaHandPointDown
                              className="text-5xl text-indigo-400"
                              style={{ transform: "rotate(180deg)" }}
                            />
                          </motion.div>
                          <h3 className="text-xl font-semibold text-green-800 mb-2">
                            Please select a WABA account
                          </h3>
                          <p className="text-gray-500 text-center max-w-xs text-sm">
                            Choose a WABA from the dropdown above to view
                            blocked users.
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  ) : loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {skeletonCards}
                    </div>
                  ) : blockedUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 30 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center w-max justify-center border-3 px-0 md:px-8 py-4 md:py-8 border-indigo-200 rounded-2xl border-dashed shadow-2xl"
                        >
                          <CgUnblock className="text-6xl text-indigo-400 animate-bounce mb-0" />
                          <h3 className="text-lg font-semibold text-gray-700">
                            No Blocked Users
                          </h3>
                          <p className="text-gray-500 text-center mt-2 max-w-xs text-sm">
                            All clear! No users are currently blocked for this
                            WABA.
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 flex justify-start">
                        <input
                          type="number"
                          placeholder="Search number..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-1.5 w-full max-w-xs focus:outline-none "
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-scroll h-120 border-t-2 border-dashed pt-2">
                        <AnimatePresence>
                          {filteredUsers.length === 0 ? (
                            <AnimatePresence>
                              <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                transition={{ duration: 0.3 }}
                                className="col-span-full flex flex-col items-center justify-center h-full"
                              >
                                <CgUnblock className="text-6xl text-indigo-400 animate-bounce mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700">
                                  No Blocked Users
                                </h3>
                                <p className="text-gray-500 text-center mt-2 max-w-xs text-sm">
                                  All clear! No users are currently blocked for
                                  this WABA.
                                </p>
                              </motion.div>
                            </AnimatePresence>
                          ) : (
                            filteredUsers.map((user) => (
                              <motion.div
                                key={user.wa_id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between border border-indigo-50 h-35"
                              >
                                <div className="mb-4">
                                  <h3 className="text-md font-semibold text-gray-700">
                                    {highlightMatch(user.wa_id, search)}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    Blocked from: {selectedWaba}
                                  </p>
                                </div>
                                <button
                                  onClick={() => {
                                    setSelectedId(user.wa_id);
                                    setDialogVisible(true);
                                  }}
                                  className="mt-auto inline-flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 transition px-4 py-2 rounded-lg text-sm font-medium cursor-pointer "
                                >
                                  <CgUnblock size={18} />
                                  Unblock
                                </button>
                              </motion.div>
                            ))
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Dialog
              header="Unblock Confirmation"
              visible={dialogVisible}
              style={{ width: "30rem" }}
              onHide={() => setDialogVisible(false)}
              draggable={false}
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  Are you sure you want to unblock:
                  <span className="font-medium text-black ml-1">
                    {selectedId}
                  </span>
                  ?
                </p>
                <div className="flex justify-end gap-3">
                  {!isBlocking && (
                    <UniversalButton
                      id="cancel"
                      name="cancel"
                      label="Cancel"
                      onClick={() => setDialogVisible(false)}
                    />
                  )}
                  <UniversalButton
                    id="unblock"
                    name="unblock"
                    label={isBlocking ? "Unblocking..." : "Unblock"}
                    style={{ backgroundColor: "#EF4444", color: "#fff" }}
                    onClick={handleUnblock}
                    disabled={isBlocking}
                  />
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      );

    if (activeTab === "unsubscribe") return <Unsubscribe />;
    return null;
  };

  return (
    <div className="flex flex-row flex-wrap md:h-full bg-gray-50 rounded-2xl">
      {/* Sidebar */}
      <aside className="w-full md:w-55 bg-white border-r md:mb-0 mb-0 h-full rounded-l-2xl">
        <nav className="mt-0 md:mt-2 flex md:flex-col md:gap-0 gap-3  overflow-x-auto">
          {tabs.map((tab) => (
            <div key={tab.key} className="w-full p-1">
              <button
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center w-full px-4 py-3 mb-1 text-sm font-medium rounded-lg transition-colors cursor-pointer hover:bg-gray-100 focus:outline-none ${
                  activeTab === tab.key
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
              {/* Sub-options for Live Chat */}
              {activeTab === "configuration" && tab.key === "configuration" && (
                <div className="ml-8 mt-2 space-y-2">
                  {chatSubOptions.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setActiveSub(opt.key)}
                      className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors hover:bg-blue-50 focus:outline-none ${
                        activeSub === opt.key
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      <span className="mr-2">{opt.icon}</span>
                      {opt.label}
                      <BiChevronRight className="ml-auto" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="md:flex-1 w-full h-[86vh]">{renderContent()}</main>
    </div>
  );
};

export default WhatsappLiveChatSettings;
