"use client";

import React from 'react';
import { Grid, Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import StorageIcon from '@mui/icons-material/Storage';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const metrics = [
  {
    title: 'Total Bots',
    value: 8,
    delta: '+2%',
    description: 'bots deployed',
    color: 'primary',
    icon: <StorageIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Total Flows',
    value: 15,
    delta: '+5%',
    description: 'flows created',
    color: 'secondary',
    icon: <CallSplitIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Total Projects',
    value: 24,
    delta: '+5%',
    description: 'since last month',
    color: 'success',
    icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Ended Projects',
    value: 10,
    delta: '+2%',
    description: 'since last month',
    color: 'info',
    icon: <PauseCircleIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Running Projects',
    value: 12,
    delta: '+3%',
    description: 'ongoing',
    color: 'warning',
    icon: <PlayCircleIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Pending Projects',
    value: 2,
    delta: '0%',
    description: 'no change',
    color: 'error',
    icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
  },
];

export default function MetricsDashboard() {
  const theme = useTheme();

  return (
    <Box sx={{ p: 4, bgcolor: theme.palette.background.default }}>
      <Grid container spacing={4}>
        {metrics.map((m, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              elevation={4}
              sx={{
                borderLeft: theme => `6px solid ${theme.palette[m.color].main}`,
                borderRadius: 3,
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ overflow: 'visible' }}>
                {/* Download Button */}
                <Box
                  component="button"
                  onClick={() => console.log(`Download ${m.title} data`)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: theme.palette.text.secondary,
                  }}
                >
                  <DownloadIcon fontSize="small" />
                </Box>

                {/* Icon and Title/Value */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      {m.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ mt: 1, fontWeight: 700, color: theme.palette[m.color].main }}
                    >
                      {m.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: theme.palette[m.color].main }}>
                    {m.icon}
                  </Box>
                </Box>

                {/* Delta and Description */}
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: theme.palette[m.color].main, mr: 1 }}
                  >
                    {m.delta}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {m.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
