"use client";

import React, { useState, useMemo } from "react";
import { parseISO, format } from "date-fns";
// MUI imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  Line,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const VIEW_OPTIONS = ["Day", "Month", "Year"];
const CHART_MODES = ["Combined", "Balance"];

function useAggregatedData(rawData, view) {
  return useMemo(() => {
    const buckets = {};
    rawData.forEach(({ date, online = 0, offline = 0, balance = 0 }) => {
      const d = parseISO(date);
      let key;
      switch (view) {
        case 1: key = format(d, "yyyy-MM"); break; // Month
        case 2: key = format(d, "yyyy");   break; // Year
        default: key = format(d, "yyyy-MM-dd"); // Day
      }
      if (!buckets[key]) buckets[key] = { name: key, online: 0, offline: 0, lastBalance: 0 };
      buckets[key].online += online;
      buckets[key].offline += offline;
      buckets[key].lastBalance = balance;
    });
    return Object.values(buckets)
      .map(({ name, online, offline, lastBalance }) => ({
        name,
        total: online + offline,
        balance: lastBalance,
      }))
      .sort((a, b) => (a.name > b.name ? 1 : -1));
  }, [rawData, view]);
}

export default function RevenueChartWithFilter({ rawData }) {
  const [view, setView] = useState(0);
  const [mode, setMode] = useState(0);
  const data = useAggregatedData(rawData, view);

  return (
    <Card elevation={6} sx={{ borderRadius: 3, overflow: 'visible' }}>
      <CardHeader
        title={<Box component="span" sx={{ fontSize: 20, fontWeight: 600 }}>Revenue & Balance History</Box>}
        subheader={<Box component="span" sx={{ fontSize: 15, fontWeight: 600 }}>{`View by ${VIEW_OPTIONS[view]}`}</Box>}
        sx={{ pb: 0 }}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
        <Tabs value={view} onChange={(_, val) => setView(val)} textColor="primary" indicatorColor="primary">
          {VIEW_OPTIONS.map((opt, i) => <Tab key={opt} label={opt} />)}
        </Tabs>
        <Tabs value={mode} onChange={(_, val) => setMode(val)} textColor="secondary" indicatorColor="secondary">
          {CHART_MODES.map((opt, i) => <Tab key={opt} label={opt} />)}
        </Tabs>
      </Box>

      <CardContent sx={{ height: 280, bgcolor: 'background.paper', pt: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          {mode === 0 ? (
            <ComposedChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1976d2" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#388e3c" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#388e3c" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#555' }} />
              <YAxis tick={{ fontSize: 12, fill: '#555' }} />
              <Tooltip
                labelStyle={{ color: '#000' }}
                contentStyle={{ borderRadius: 8, boxShadow: '0px 4px 16px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="top" align="center" iconType="circle" />

              <Bar dataKey="total" name="Total Sales" barSize={24} fill="url(#totalGradient)" radius={[4,4,0,0]} />
              <Bar dataKey="balance" name="Balance" barSize={24} fill="url(#balanceGradient)" radius={[4,4,0,0]} />
            </ComposedChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#555' }} />
              <YAxis tick={{ fontSize: 12, fill: '#555' }} />
              <Tooltip
                labelStyle={{ color: '#000' }}
                contentStyle={{ borderRadius: 8, boxShadow: '0px 4px 16px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="top" align="center" iconType="circle" />
              <Line type="monotone" dataKey="balance" name="Balance" stroke="#d32f2f" strokeWidth={3} dot={{ r: 6, fill: '#d32f2f', stroke: '#fff', strokeWidth: 2 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
