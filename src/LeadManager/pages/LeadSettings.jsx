// src/pages/LeadSettings.jsx
import React from "react";

import {
  FiStar,
  FiFileText,
  FiSettings,
  FiCheckSquare,
  FiAward,
  FiTag,
  FiPlayCircle,
  FiClock,
  FiMessageCircle,
} from "react-icons/fi";
import FeatureCard from "../Components/FeatureCard";

const features = [
  {
    icon: <FiStar />,
    title: "Canned Responses",
    desc: "Pre-create replies to quickly insert them in responses to customers",
  },
  {
    icon: <FiFileText />,
    title: "Ticket Templates",
    desc: "Allow agents to log new tickets faster by using pre-filled forms",
  },
  {
    icon: <FiSettings />,
    title: "Scenario Automations",
    desc: "Perform a routine set of multiple actions on a ticket with a single click",
  },
  {
    icon: <FiCheckSquare />,
    title: "Canned Forms",
    desc: "Let agents collect all the required information in one-shot using pre-created forms",
  },
  {
    icon: <FiAward />,
    title: "Arcade",
    desc: "Have agents compete for points, trophies, and badges when they complete key support activities",
  },
  {
    icon: <FiTag />,
    title: "Tags",
    desc: "Label your tickets, articles, and contacts for better organization and reporting",
  },
  {
    icon: <FiPlayCircle />,
    title: "Session Replay",
    desc: "Capture context on where customers faced issues so agents can view it",
  },
  {
    icon: <FiClock />,
    title: "Average Handling Time",
    desc: "Calculate the average time your agents spend on a ticket",
  },
  {
    icon: <FiMessageCircle />,
    title: "Threads",
    desc: "Cohesive communications approach to collaborate with anyone in a chat-like experience",
    tag: "New",
  },
];

export default function LeadSettings() {
  return (
    <div className="p-6">
      {/* Single section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agent Productivity</h1>
        <div className="text-sm text-gray-500">
          0 of {features.length} Configured <span className="text-green-500">✓</span>
        </div>
      </div>

      {/* 3×3 grid of cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <FeatureCard
            key={f.title}
            icon={f.icon}
            title={f.title}
            desc={f.desc}
            tag={f.tag}
          />
        ))}
      </div>
    </div>
  );
}
