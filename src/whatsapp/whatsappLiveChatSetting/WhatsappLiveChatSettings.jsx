import React, { useEffect } from "react";
import { Box, Grid, Paper, Typography, Button, Tooltip } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import EmailIcon from "@mui/icons-material/Email";
import InventoryIcon from "@mui/icons-material/Inventory";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";
import { Switch } from "@mui/material";
import AnimatedDropdown from "../components/AnimatedDropdown";
import {
  deleteAutoAction,
  fetchTemplates,
  fetchTemplatesValue,
  getAutoAction,
  getWabaList,
  saveAutoAction,
} from "@/apis/whatsapp/whatsapp";
import toast from "react-hot-toast";
import { ConfigureDialog } from "./components/configureDialog";
import { extractVariable } from "../WhatsappBot/component/components/helper/extractVariable";

const MotionPaper = motion(Paper);

const WhatsappLiveChatSettings = () => {
  const [wabaState, setWabaState] = React.useState({
    waba: [],
    selected: "",
  });
  const [cardDetails, setCardDetails] = React.useState({});
  const [configureState, setConfigureState] = React.useState({
    type: "",
    open: false,
  });

  const [basicDetails, setBasicDetails] = React.useState({
    sendMsgCheckbox: true,
    msgType: "1",
    message: "",
    filePath: "",
    tempJson: "",
    mediaPath: "",
  });
  const [allTemplates, setAllTemplates] = React.useState([]);
  const [specificTemplate, setSpecificTemplate] = React.useState({});
  const [variablesData, setVariablesData] = React.useState({
    length: 0,
    data: [],
    input: [],
  });
  const fileRef = React.useRef(null);

  React.useEffect(() => {
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
  React.useEffect(() => {
    handleGetAutoAction();
    handleFetchAllTemplates();
  }, [wabaState.selected]);

  React.useEffect(() => {
    if (!basicDetails?.template) return;
    async function handleFetchTemplateValues() {
      try {
        const res = await fetchTemplatesValue(basicDetails.template);
        const variable = extractVariablesFromText(res?.message);
        setVariablesData({
          length: variable.length,
          data: variable,
          input: [],
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
      console.log(res);
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
    if (basicDetails?.msgType === "2" && !basicDetails?.mediaPath)
      return toast.error("Please upload media");
    if (basicDetails?.msgType === "2" && variablesData.length) {
      const length = variablesData?.input.filter((item) => item != "").length;

      if (length !== variablesData?.length) {
        return toast.error("Please fill all variables");
      }
    }
    //validation end

    const wabaSrno = wabaState.waba.find(
      (waba) => waba.mobileNo === wabaState.selected
    )?.wabaSrno;
    const data = {
      actionSenario: configureState?.type,
      wabaNumber: wabaState.selected,
      wabaSrno,
      ...basicDetails,
    };

    try {
      await deleteAction(configureState.type);
      const res = await saveAutoAction(data);
      if (!res?.status) {
        toast.error("Error saving data");
      }
      toast.success("Data saved successfully");
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
      });
      setSpecificTemplate({});
      fileRef.current.value = "";
      await handleGetAutoAction();
    } catch (e) {
      toast.error("Error saving data");
    }
  }

  return (
    <>
      <div className="flex justify-end w-full items-center mb-4 mr-5">
        <div className="w-[15%]">
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
      <Box
        sx={{
          background: "linear-gradient(to bottom right, #f0f4ff, #ffffff)",
          py: 5,
          px: 4,
        }}
      >
        {/* Heading */}
        <Box maxWidth="lg" mx="auto" textAlign="center" mb={8}>
          <Typography
            variant="h4"
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

        <Grid container spacing={5} justifyContent="center" maxWidth="lg">
          {/* Card 1: WhatsApp Welcome */}

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
              {/* Header Row: Icon + Title + Toggle */}
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
                    checked={cardDetails["welcome_message"]?.message || false}
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

              {/* Configure Button */}
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

          {/* Card 2: Social Media Caption */}
          {/* <Grid item xs={12} sm={6}>
            <MotionPaper
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              elevation={4}
              sx={{
                borderRadius: 4,
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{ backgroundColor: "#e3f2fd", p: 1.5, borderRadius: 2 }}
                >
                  <EmailIcon color="primary" />
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  Email Newsletter
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Need help writing your next email? Let us know your goal and
                we'll write it for you.
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                >
                  New message
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  Hey, lexi! write an email to my friend, michonne about [tell
                  us]
                </Typography>
              </Box>
              <Tooltip title="Click to begin" arrow>
                <Button variant="outlined">Try now →</Button>
              </Tooltip>
            </MotionPaper>
          </Grid> */}
        </Grid>
      </Box>

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
        />
      )}
    </>
  );
};

export default WhatsappLiveChatSettings;
