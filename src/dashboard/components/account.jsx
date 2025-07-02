import React, { useState, useMemo } from "react";
import { parseISO, format } from "date-fns";
// MUI imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const VIEW_OPTIONS = ["Day", "Month"];

function useAggregatedData(rawData, view) {
  return useMemo(() => {
    const buckets = {};
    rawData.forEach(({ date, whatsapp = 0, rcs = 0, sms = 0, obd = 0 }) => {
      const d = parseISO(date);
      const key =
        view === 1 ? format(d, "yyyy-MM") : format(d, "yyyy-MM-dd");
      if (!buckets[key]) {
        buckets[key] = { name: key, whatsapp: 0, rcs: 0, sms: 0, obd: 0 };
      }
      buckets[key].whatsapp += whatsapp;
      buckets[key].rcs += rcs;
      buckets[key].sms += sms;
      buckets[key].obd += obd;
    });
    return Object.values(buckets).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [rawData, view]);
}

export default function MultiServiceLineChart({
  rawData,
  activeServices = ["WHATSAPP", "RCS", "SMS", "OBD"],
}) {
  const [view, setView] = useState(0); // 0: Day, 1: Month
  const data = useAggregatedData(rawData, view);

  const services = [
    { key: "whatsapp", name: "WHATSAPP", label: "WhatsApp", color: "#1976d2" },
    { key: "rcs", name: "RCS", label: "RCS", color: "#388e3c" },
    { key: "sms", name: "SMS", label: "SMS", color: "#f57c00" },
    { key: "obd", name: "OBD", label: "OBD", color: "#8e24aa" },
  ];

  return (
    <Card sx={{ width: "100%", borderRadius: 4, boxShadow: 8, p: 2, bgcolor: "#fafafa" }}>
      <CardHeader
        title={
          <Box sx={{ fontSize: 20, fontWeight: 700, color: "#0d47a1" }}>
            Service Usage Trends
          </Box>
        }
        subheader={
          <Box sx={{ fontSize: 16, fontWeight: 500, color: "#616161" }}>
            {VIEW_OPTIONS[view]} View
          </Box>
        }
        sx={{ borderBottom: "2px solid #e0e0e0" }}
      />

      <Tabs
        value={view}
        onChange={(_, val) => setView(val)}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        {VIEW_OPTIONS.map((option) => (
          <Tab key={option} label={option} sx={{ fontWeight: 600, fontSize: 14 }} />
        ))}
      </Tabs>

      <CardContent sx={{ height: 280, p: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#424242" }} />
            <YAxis tick={{ fontSize: 12, fill: "#424242" }} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              itemStyle={{ color: "#212121" }}
            />

            {/* Legend restored */}
            <Legend verticalAlign="top" align="center" iconType="circle" wrapperStyle={{ marginBottom: 0 }} />

            {services.map(({ key, name, label, color }) => {
              const isActive = activeServices
                .map((s) => s.toUpperCase())
                .includes(name);

              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={label}
                  stroke={color}
                  strokeWidth={isActive ? 3 : 1.5}
                  strokeDasharray={isActive ? "0" : "5 5"}
                  dot={{
                    r: isActive ? 5 : 3,
                    fill: "#ffffff",
                    stroke: color,
                    strokeWidth: 2,
                    opacity: isActive ? 1 : 0.9,
                  }}
                  activeDot={{ r: 7 }}
                  opacity={isActive ? 1 : 0.9}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
