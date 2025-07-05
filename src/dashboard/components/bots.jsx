import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import StorageIcon from '@mui/icons-material/Storage';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { getAllBot, getWhatsappFlow } from "@/apis/whatsapp/whatsapp";

function StatCard({ title, value, delta, description, color, icon }) {
  const theme = useTheme();
  return (
    <Card
      elevation={4}
      sx={{
        borderLeft: `6px solid ${theme.palette[color].main}`,
        borderRadius: 3,
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ overflow: "visible" }}>
        {/* Download button */}
        <Box
          component="button"
          onClick={() => console.log(`Download ${title} data`)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: theme.palette.text.secondary,
          }}
        >
          <DownloadIcon fontSize="small" />
        </Box>

        {/* Title, Value, Icon */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontWeight: 700,
                color: theme.palette[color].main,
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box sx={{ color: theme.palette[color].main }}>{icon}</Box>
        </Box>

        {/* Delta & Description */}
        <Box display="flex" alignItems="center" mt={2}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: theme.palette[color].main,
              mr: 1,
            }}
          >
            {delta}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}


export default function MetricsDashboard() {
  const theme = useTheme();
  const [allBots, setAllBots] = useState([]);
  const [flowList, setFlowList] = useState([]);


  useEffect(() => {
    async function fetchBots() {
      const res = await getAllBot();
      setAllBots(res || []);
    }
    fetchBots();
  }, []);

  // Fetch flows once
  // useEffect(() => {
  //   async function fetchFlows() {
  //     const res = await getWhatsappFlow();
  //     setFlowList(res || []);
  //   }
  //   fetchFlows();
  // }, []);

  useEffect(() => {
    getWhatsappFlow().then(res => setFlowList(res || []));
  }, []);

  const totalBots = allBots.length;
  const totalFlows = flowList.length;
  const draftFlows = flowList.filter(f => f.status === "DRAFT").length;
  const publishedFlows = flowList.filter(f => f.status === "PUBLISHED").length;
  const totalProjects = 24;
  const endedProjects = 10;
  const runningProjects = 12;
  const pendingProjects = 2;
  //   const metrics = [
  //   {
  //     title: 'Total Bots',
  //     value: totalBots,
  //     delta: '+2%',
  //     description: 'bots deployed',
  //     color: 'primary',
  //     icon: <StorageIcon sx={{ fontSize: 40 }} />,
  //   },
  //   {
  //     title: 'Total Flows',
  //     value: totalFlows,
  //     delta: draftFlows,
  //     published: publishedFlows,
  //     color: 'secondary',
  //     icon: <CallSplitIcon sx={{ fontSize: 40 }} />,
  //   },
  //   {
  //     title: 'Total Projects',
  //     value: 24,
  //     delta: '+5%',
  //     description: 'since last month',
  //     color: 'success',
  //     icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
  //   },
  //   {
  //     title: 'Ended Projects',
  //     value: 10,
  //     delta: '+2%',
  //     description: 'since last month',
  //     color: 'info',
  //     icon: <PauseCircleIcon sx={{ fontSize: 40 }} />,
  //   },
  //   {
  //     title: 'Running Projects',
  //     value: 12,
  //     delta: '+3%',
  //     description: 'ongoing',
  //     color: 'warning',
  //     icon: <PlayCircleIcon sx={{ fontSize: 40 }} />,
  //   },
  //   {
  //     title: 'Pending Projects',
  //     value: 2,
  //     delta: '0%',
  //     description: 'no change',
  //     color: 'error',
  //     icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
  //   },
  // ];

  return (
    <Box sx={{ p: 1, bgcolor: useTheme().palette.background.default }}>
      <Grid container spacing={4}>
        {/* 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Bots"
            value={totalBots}
            delta="+2%"
            description="bots deployed"
            color="primary"
            icon={<StorageIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>

        {/* 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Flows"
            value={totalFlows}
            delta="+5%"
            description="Flows deployed"
            // description={`Draft: ${draftFlows}   Published: ${publishedFlows}`}
            color="secondary"
            icon={<CallSplitIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>

        {/* 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Draft Flows"
            value={draftFlows}
            delta="—"
            description="in draft"
            color="warning"
            icon={<AccessTimeIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>

        {/* 4 */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Published Flows"
            value={publishedFlows}
            delta="—"
            description="live"
            color="success"
            icon={<PlayCircleIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>

        {/* 5 */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Projects"
            value={totalProjects}
            delta="+5%"
            description="since last month"
            color="info"
            icon={<CheckCircleIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>

        {/* 6 */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Ended Projects"
            value={endedProjects}
            delta="+2%"
            description="since last month"
            color="error"
            icon={<PauseCircleIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
