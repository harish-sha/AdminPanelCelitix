import React from "react";
import { Box, Grid, Paper, Typography, Button, Tooltip } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import EmailIcon from "@mui/icons-material/Email";
import InventoryIcon from "@mui/icons-material/Inventory";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";
import { Switch } from "@mui/material";
import AnimatedDropdown from "../components/AnimatedDropdown";
import { getAutoAction, getWabaList } from "@/apis/whatsapp/whatsapp";
import toast from "react-hot-toast";

const MotionPaper = motion(Paper);

const WhatsappLiveChatSettings = () => {
  const [wabaState, setWabaState] = React.useState({
    waba: [],
    selected: "",
  });
  const [cardDetails, setCardDetails] = React.useState({});

  React.useEffect(() => {
    async function handleFetchWaba() {
      try {
        const res = await getWabaList();
        console.log(res);
        setWabaState((prev) => ({
          waba: res,
          selected: "",
        }));
      } catch (e) {
        console.log(e);
        return toast.error("Error fetching Waba Details");
      }
    }

    handleFetchWaba();
  }, []);

  React.useEffect(() => {
    if (!wabaState.selected) return;

    async function handleGetAutoAction() {
      try {
        const data = {
          wabaNumber: wabaState.selected,
          type: "-1",
        };
        const res = await getAutoAction(data);
        console.log(res?.EntityMstActionScenerio);
        res?.EntityMstActionScenerio &&
          res.EntityMstActionScenerio.map(async (item) => {
            data["type"] = item.actionScenario;
            const res = await getAutoAction(data);
            console.log(res);
          });
      } catch (e) {
        console.log(e);
        return toast.error("Error fetching auto action");
      }
    }

    handleGetAutoAction();
  }, [wabaState.selected]);

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
                  {/* <Typography variant="caption" color="text.secondary">
          Active
        </Typography> */}
                  <Switch
                    color="success"
                    defaultChecked
                    inputProps={{ "aria-label": "welcome-message-toggle" }}
                  />
                </Box>
              </Box>

              {/* Description */}
              <Typography variant="body2" color="text.secondary">
                Automatically greet customers when they message you during
                working hours.
              </Typography>

              {/* Message Preview */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  border: "1px solid #d1d5db",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
                >
                  Hi!
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  Thanks for connecting. Someone from our team will get in touch
                  soon.
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
                >
                  Configure
                </Button>
              </Tooltip>
            </MotionPaper>
          </Grid>

          {/* Card 2: Social Media Caption */}
          <Grid item xs={12} sm={6}>
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default WhatsappLiveChatSettings;
