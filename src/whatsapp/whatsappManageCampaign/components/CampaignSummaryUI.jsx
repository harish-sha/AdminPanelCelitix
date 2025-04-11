import { Box, Typography, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import ErrorIcon from "@mui/icons-material/Error";
import TimelineIcon from "@mui/icons-material/Timeline";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const CampaignSummaryUI = ({ data }) => {
  const items = [
    {
      label: "Total",
      value: data?.total,
      icon: <TimelineIcon color="primary" />,
    },
    {
      label: "Delivered",
      value: data?.delivered,
      icon: <CheckCircleIcon color="success" />,
    },
    {
      label: "Delivered Count",
      value: data?.deliveredCount,
      icon: <CheckCircleIcon color="success" />,
    },
    {
      label: "Failed",
      value: data?.failed,
      icon: <CancelIcon color="error" />,
    },
    {
      label: "Failed Count",
      value: data?.failedCount,
      icon: <CancelIcon color="error" />,
    },
    {
      label: "Undelivered",
      value: data?.undelivered,
      icon: <ErrorIcon color="error" />,
    },
    {
      label: "Undelivered Count",
      value: data?.undeliveredCount,
      icon: <ErrorIcon color="error" />,
    },
    {
      label: "Pending",
      value: data?.pending,
      icon: <ScheduleIcon color="warning" />,
    },
    {
      label: "Pending Count",
      value: data?.pendingCount,
      icon: <ScheduleIcon color="warning" />,
    },
    {
      label: "Pending Report Count",
      value: data?.pendingReportCount,
      icon: <ReportProblemIcon color="warning" />,
    },
    { label: "Sent", value: data?.sent, icon: <SendIcon color="info" /> },
    {
      label: "Sent Count",
      value: data?.sentCount,
      icon: <SendIcon color="info" />,
    },
    {
      label: "Submitted",
      value: data?.submitted,
      icon: <SendIcon color="secondary" />,
    },
    { label: "Read", value: data?.read, icon: <VisibilityIcon color="info" /> },
    {
      label: "Read Count",
      value: data?.readCount,
      icon: <VisibilityIcon color="info" />,
    },
    { label: "Block", value: data?.block, icon: <BlockIcon color="error" /> },
    {
      label: "Block Count",
      value: data?.blockCount,
      icon: <BlockIcon color="error" />,
    },
    {
      label: "Busy",
      value: data?.busy,
      icon: <ScheduleIcon color="disabled" />,
    },
    {
      label: "Busy Count",
      value: data?.busyCount,
      icon: <ScheduleIcon color="disabled" />,
    },
  ];

  return (
    <Box className="space-y-2 text-sm text-gray-700 min-w-[250px]">
      <Typography variant="h6" className="text-gray-800 mb-2">
        Campaign Summary
      </Typography>
      <Divider />
      <Box className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(({ label, value, icon }) => (
          <Box
            key={label}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
            className="border-b pb-1"
          >
            <Box display="flex" alignItems="center" gap={1}>
              {icon}
              <Typography fontSize={13}>{label}</Typography>
            </Box>
            <Typography fontWeight={600} fontSize={13}>
              {value ?? 0}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider className="my-2" />

      <Box className="text-xs text-gray-500">
        <Typography variant="body2" className="mb-1">
          <strong>Source:</strong> {data?.source ?? "N/A"}
        </Typography>
        <Typography variant="body2">
          <strong>Queued Time:</strong> {data?.queTime ?? "N/A"}
        </Typography>
      </Box>
    </Box>
  );
};

export default CampaignSummaryUI;
