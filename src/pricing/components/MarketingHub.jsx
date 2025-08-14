import React, { useState } from "react";
import ChannelToggleTabs from "./ChannelToggleTabs";
import CustomAccordion from "./CustomAccordion";
import { motion } from "framer-motion";

const planData = {
  WHATSAPP: {
    Monthly: [
      {
        title: "Starter",
        price: "₹999/mo",
        features: [
          "Auto Insta replies for pricing & giveaways",
          "Team Inbox for DMs & comments",
          "Unlimited WhatsApp messages",
          "Unlimited Contacts",
          "15 Custom Fields",
          "15 Custom Tags",
        ],
        channelFeatures: [
          "Unlimited DMs & Comments",
          "Price Please Automation",
          "Giveaway Campaign Automation",
          "Custom Auto Replies for FAQs",
        ],
      },
      {
        title: "Growth",
        price: "₹1999/mo",
        features: [
          "Everything in Starter",
          "30 Custom Fields",
          "Advanced Campaign Analytics",
          "CRM Integration & Lead Syncing",
          "Audience Segmentation Tools",
          "Smart Follow-up Reminders",
        ],
        channelFeatures: [
          "Advanced Auto Reply Conditions",
          "Influencer Collaboration Tracking",
          "Auto-response Based on Keywords",
          "Real-time Comment Filters",
        ],
      },
      {
        title: "Advance",
        price: "₹3999/mo",
        features: [
          "Everything in Growth",
          "Role-based Team Permissions",
          "Workflow Automation Triggers",
          "Lead Scoring and Prioritization",
          "Multi-team Workspaces",
          "Real-time Analytics Dashboard",
        ],
        channelFeatures: [
          "Sentiment Analysis in Comments",
          "Story Replies Automation",
          "Keyword-based Auto Replies",
          "Behavioral Auto Flow Suggestions",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "All Features from Advance Plan",
          "Dedicated Account Manager",
          "Custom Integration Support",
          "Priority SLA-based Support",
          "Onboarding & Training Sessions",
          "Scalable Infrastructure for Teams",
        ],
        channelFeatures: [
          "Custom AI-Powered DM Flows",
          "Access to Beta Features",
          "Custom Chatbot Development",
          "Dedicated Uptime Monitoring",
        ],
      },
    ],
    Quarterly: [
      {
        title: "Starter",
        price: "₹2700/qtr",
        features: [
          "Everything in Monthly Starter",
          "5% Discount for Quarterly Plan",
          "Billing Cycle Flexibility",
          "Basic Onboarding Support",
          "Quarterly Performance Report",
          "No Hidden Fees",
        ],
        channelFeatures: [
          "Unlimited DMs & Comments",
          "Giveaway Campaign Automation",
          "Quick Replies for New Leads",
          "In-app Metrics Overview",
        ],
      },
      {
        title: "Growth",
        price: "₹5400/qtr",
        features: [
          "Everything in Monthly Growth",
          "5% Discount for Quarterly Plan",
          "Priority Support Access",
          "Enhanced Reporting Tools",
          "Quarterly Strategy Review",
          "Multi-admin Access",
        ],
        channelFeatures: [
          "Advanced Auto Replies",
          "Keyword Triggers for Responses",
          "Audience Tags for Segmentation",
          "Influencer Collaboration Insights",
        ],
      },
      {
        title: "Advance",
        price: "₹10800/qtr",
        features: [
          "Everything in Monthly Advance",
          "10% Discount for Quarterly Plan",
          "Dedicated Campaign Consultant",
          "Extended Feature Access",
          "Custom Workflow Templates",
          "Quarterly Lead Insights Report",
        ],
        channelFeatures: [
          "Sentiment Analysis Tools",
          "Story Reply Automation",
          "Comment Intent Detection",
          "Auto DM Based on Comments",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Quarterly Roadmap Planning",
          "Compliance & Security Reviews",
          "Custom Reporting Templates",
          "Priority SLA Monitoring",
          "White-label Solution Options",
        ],
        channelFeatures: [
          "Custom AI-powered Flows",
          "Early Beta Feature Access",
          "Channel-wise Insights",
          "Dedicated Instagram Support",
        ],
      },
    ],
    Yearly: [
      {
        title: "Starter",
        price: "₹9500/yr",
        features: [
          "Everything in Monthly Starter",
          "20% Annual Discount",
          "One-on-one Annual Strategy Call",
          "Annual Usage Report",
          "Dedicated Onboarding Session",
          "Email & Chat Support",
        ],
        channelFeatures: [
          "Unlimited DMs & Comments",
          "Giveaway Flow Templates",
          "Annual Campaign Analytics",
          "Pre-built Response Templates",
        ],
      },
      {
        title: "Growth",
        price: "₹19000/yr",
        features: [
          "Everything in Monthly Growth",
          "20% Annual Discount",
          "Priority Onboarding Assistance",
          "Annual Report on Audience Trends",
          "Advanced CRM Integrations",
          "In-depth Performance Insights",
        ],
        channelFeatures: [
          "Advanced Auto Replies",
          "Custom Keyword Logic",
          "Auto Responses to Mentions",
          "Growth Analytics Dashboard",
        ],
      },
      {
        title: "Advance",
        price: "₹38000/yr",
        features: [
          "Everything in Monthly Advance",
          "25% Annual Discount",
          "Annual Team Training Sessions",
          "Tailored Workflow Automation",
          "Lead Engagement Insights",
          "Personalized Campaign Review",
        ],
        channelFeatures: [
          "Sentiment Analytics with Trends",
          "Auto-Replies on Stories & DMs",
          "AI-based Engagement Suggestions",
          "Custom Comment Actions",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Annual SLA Review",
          "Custom Enterprise API Access",
          "Global Support Availability",
          "White-label Reporting",
          "Co-branded Integrations",
        ],
        channelFeatures: [
          "Custom AI-powered Flows",
          "Exclusive Beta Features",
          "Dedicated Instagram Liaison",
          "In-depth Multi-brand Analytics",
        ],
      },
    ],
  },

  INSTAGRAM: {
    Monthly: [
      {
        title: "Starter",
        price: "₹799/mo",
        features: [
          "Auto replies for Comments & DMs",
          "Basic DM Inbox for team",
          "Unlimited Instagram Direct Messages",
          "Unlimited Followers Management",
          "10 Custom Fields",
          "10 Custom Tags",
        ],
        channelFeatures: [
          "Reply to Post Comments Automatically",
          "Welcome DM for New Followers",
          "Price Please Auto Response",
          "Giveaway Comment Auto Reply",
        ],
      },
      {
        title: "Growth",
        price: "₹1499/mo",
        features: [
          "Everything in Starter",
          "20 Custom Fields",
          "Advanced Comment Filtering",
          "Hashtag Monitoring",
          "Audience Segmentation Tools",
          "Post Engagement Tracking",
        ],
        channelFeatures: [
          "Keyword-based Comment Replies",
          "Influencer Tag Monitoring",
          "Custom Message Triggers",
          "Campaign-specific Auto Replies",
        ],
      },
      {
        title: "Advance",
        price: "₹2999/mo",
        features: [
          "Everything in Growth",
          "Workflow Automation",
          "CRM Sync with Instagram Leads",
          "Priority Comment Handling",
          "Advanced Story Reply Automation",
          "Real-time Engagement Dashboard",
        ],
        channelFeatures: [
          "Auto-reply to Story Mentions",
          "Sentiment Analysis on Comments",
          "Custom AI Response Suggestions",
          "Dynamic Auto DM Flows",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "All Advance Features",
          "Dedicated Account Manager",
          "Custom AI Flows for Instagram",
          "White-label Solutions",
          "Full API Access",
          "24/7 Priority Support",
        ],
        channelFeatures: [
          "Enterprise-grade Comment Monitoring",
          "Influencer Campaign Analytics",
          "Brand Mention Tracking",
          "Custom Automation Rules",
        ],
      },
    ],
    Quarterly: [
      {
        title: "Starter",
        price: "₹2200/qtr",
        features: [
          "Everything in Monthly Starter",
          "5% Discount for Quarterly Plan",
          "Quarterly Performance Report",
          "Basic Onboarding Support",
          "No Hidden Fees",
        ],
        channelFeatures: [
          "Comment Auto Reply Templates",
          "Welcome DM Flow",
          "Campaign Giveaway Automation",
          "In-app Comment Overview",
        ],
      },
      {
        title: "Growth",
        price: "₹4200/qtr",
        features: [
          "Everything in Monthly Growth",
          "5% Discount for Quarterly Plan",
          "Priority Support Access",
          "Enhanced Comment Analytics",
          "Quarterly Campaign Review",
        ],
        channelFeatures: [
          "Advanced Comment Triggers",
          "Auto Responses Based on Hashtags",
          "Follower Segmentation",
          "Campaign Performance Metrics",
        ],
      },
      {
        title: "Advance",
        price: "₹8400/qtr",
        features: [
          "Everything in Monthly Advance",
          "10% Discount for Quarterly Plan",
          "Dedicated Campaign Consultant",
          "Extended Feature Access",
          "Custom Workflow Templates",
        ],
        channelFeatures: [
          "Story Mention Auto Replies",
          "Comment Sentiment Tracking",
          "Keyword Grouped Responses",
          "Follower Interaction Flows",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Quarterly Roadmap Planning",
          "Brand Compliance Reviews",
          "Custom Instagram API Solutions",
        ],
        channelFeatures: [
          "AI Content Recommendation",
          "Beta Feature Access",
          "Instagram-specific SLA",
          "Dedicated Influencer Tracking",
        ],
      },
    ],
    Yearly: [
      {
        title: "Starter",
        price: "₹8000/yr",
        features: [
          "Everything in Monthly Starter",
          "20% Annual Discount",
          "One-on-one Annual Strategy Call",
          "Annual Usage Report",
        ],
        channelFeatures: [
          "Annual Comment Automation Review",
          "Welcome DM Flow Updates",
          "Yearly Engagement Insights",
          "Post Comment Templates",
        ],
      },
      {
        title: "Growth",
        price: "₹15000/yr",
        features: [
          "Everything in Monthly Growth",
          "20% Annual Discount",
          "Priority Onboarding Assistance",
          "Annual Audience Growth Report",
        ],
        channelFeatures: [
          "Advanced Auto Replies",
          "Hashtag & Mention Monitoring",
          "Campaign Trends Analysis",
          "Custom Engagement Rules",
        ],
      },
      {
        title: "Advance",
        price: "₹30000/yr",
        features: [
          "Everything in Monthly Advance",
          "25% Annual Discount",
          "Annual Workflow Optimization",
          "Influencer Collaboration Review",
        ],
        channelFeatures: [
          "AI-driven Story Reply Flows",
          "Brand Sentiment Tracking",
          "Yearly Comment Keyword Mapping",
          "Follower Retention Insights",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Annual SLA Review",
          "Custom Enterprise API Access",
          "Global Support Availability",
        ],
        channelFeatures: [
          "Custom AI-powered Flows",
          "Beta Features Exclusive Access",
          "Instagram Brand Monitoring",
          "Full-scale Automation Deployment",
        ],
      },
    ],
  },

  RCS: {
    Monthly: [
      {
        title: "Starter",
        price: "₹1299/mo",
        features: [
          "Send Rich Media Messages",
          "Basic RCS Campaign Management",
          "Unlimited Contacts",
          "10 Custom Fields",
          "5 Automation Rules",
          "Basic Analytics Dashboard",
        ],
        channelFeatures: [
          "Text + Image Messages",
          "Basic Read Receipt Tracking",
          "Quick Reply Buttons",
          "Basic Personalization",
        ],
      },
      {
        title: "Growth",
        price: "₹2499/mo",
        features: [
          "Everything in Starter",
          "20 Custom Fields",
          "Advanced Campaign Targeting",
          "Scheduled Campaigns",
          "Rich Media Carousel Messages",
          "Segmentation Tools",
        ],
        channelFeatures: [
          "Quick Reply with Images",
          "CTA Button Tracking",
          "Message Template Library",
          "Personalized Rich Media",
        ],
      },
      {
        title: "Advance",
        price: "₹4999/mo",
        features: [
          "Everything in Growth",
          "API Access for RCS Messaging",
          "Workflow Automation",
          "AI-based Reply Suggestions",
          "Advanced Campaign Reports",
          "Integration with CRMs",
        ],
        channelFeatures: [
          "Dynamic Rich Cards",
          "Advanced Button Actions",
          "Geo-targeted Campaigns",
          "Multi-step Automation Flows",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "All Advance Features",
          "Dedicated Account Manager",
          "Custom AI Automation",
          "24/7 Priority Support",
          "Full White-label Support",
          "Custom SLA",
        ],
        channelFeatures: [
          "Custom Rich Card Designs",
          "Real-time Customer Data Sync",
          "Custom APIs & Integrations",
          "Enterprise Analytics",
        ],
      },
    ],
    Quarterly: [
      {
        title: "Starter",
        price: "₹3600/qtr",
        features: [
          "Everything in Monthly Starter",
          "5% Discount",
          "Quarterly Campaign Review",
          "Basic Support Included",
        ],
        channelFeatures: [
          "Quick Setup Templates",
          "Rich Text + Image Sending",
          "Basic CTA Buttons",
          "Quarterly Analytics Report",
        ],
      },
      {
        title: "Growth",
        price: "₹6900/qtr",
        features: [
          "Everything in Monthly Growth",
          "5% Discount",
          "Priority Support Access",
          "Enhanced Campaign Reports",
        ],
        channelFeatures: [
          "Rich Carousel Campaigns",
          "Advanced CTA Tracking",
          "Customer Segmentation",
          "Campaign Flow Optimization",
        ],
      },
      {
        title: "Advance",
        price: "₹13800/qtr",
        features: [
          "Everything in Monthly Advance",
          "10% Discount",
          "Custom Automation Workflows",
          "Dedicated Campaign Consultant",
        ],
        channelFeatures: [
          "Dynamic Campaign Personalization",
          "Geo-based Message Triggers",
          "Interactive RCS Cards",
          "Quarterly Feature Upgrades",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Quarterly Roadmap Planning",
          "Beta Feature Access",
          "Custom RCS API Development",
        ],
        channelFeatures: [
          "Full White-label RCS",
          "Custom CRM Integrations",
          "Enterprise-grade Reporting",
          "Custom Security Protocols",
        ],
      },
    ],
    Yearly: [
      {
        title: "Starter",
        price: "₹12000/yr",
        features: [
          "Everything in Monthly Starter",
          "20% Annual Discount",
          "Annual Campaign Review",
          "Annual Strategy Consultation",
        ],
        channelFeatures: [
          "Template Optimization",
          "Campaign Insights Report",
          "Engagement Review",
          "Rich Media Personalization",
        ],
      },
      {
        title: "Growth",
        price: "₹22800/yr",
        features: [
          "Everything in Monthly Growth",
          "20% Annual Discount",
          "Advanced Audience Insights",
          "Annual Feature Upgrade",
        ],
        channelFeatures: [
          "Multi-step CTA Campaigns",
          "AI-based Message Recommendations",
          "Template A/B Testing",
          "Yearly Trends Report",
        ],
      },
      {
        title: "Advance",
        price: "₹45600/yr",
        features: [
          "Everything in Monthly Advance",
          "25% Annual Discount",
          "Annual Workflow Optimization",
          "Enterprise Automation Features",
        ],
        channelFeatures: [
          "Advanced Data-driven Campaigns",
          "Yearly Sentiment Analysis",
          "Geo & Behavior Targeting",
          "Full Custom Card Templates",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Custom AI Model Deployment",
          "Dedicated Enterprise Support",
          "Custom Global SLA",
        ],
        channelFeatures: [
          "Enterprise Data Processing",
          "Custom Interactive Experiences",
          "Unlimited API Access",
          "Exclusive Feature Access",
        ],
      },
    ],
  },

  EMAIL: {
    Monthly: [
      {
        title: "Starter",
        price: "₹299/mo",
        features: [
          "Send up to 10,000 Emails",
          "Basic Email Campaign Management",
          "Unlimited Contacts",
          "5 Custom Fields",
          "3 Automation Rules",
          "Basic Campaign Analytics",
        ],
        channelFeatures: [
          "HTML Email Templates",
          "Basic Open Tracking",
          "Click Tracking",
          "Basic Personalization",
        ],
      },
      {
        title: "Growth",
        price: "₹799/mo",
        features: [
          "Everything in Starter",
          "Send up to 50,000 Emails",
          "10 Custom Fields",
          "Advanced Campaign Scheduling",
          "A/B Testing",
          "Segmentation Tools",
        ],
        channelFeatures: [
          "Custom HTML & Drag-n-Drop Builder",
          "Link Tracking",
          "Dynamic Content Insertion",
          "Email Template Library",
        ],
      },
      {
        title: "Advance",
        price: "₹1499/mo",
        features: [
          "Everything in Growth",
          "API Access for Email Sending",
          "Advanced Automation",
          "AI-based Subject Line Suggestions",
          "Deliverability Optimization",
          "CRM Integrations",
        ],
        channelFeatures: [
          "Personalized Dynamic Emails",
          "Automated Drip Campaigns",
          "Advanced Segmentation",
          "Real-time Email Analytics",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "All Advance Features",
          "Dedicated Account Manager",
          "Custom Email Infrastructure",
          "24/7 Priority Support",
          "Custom SLA",
        ],
        channelFeatures: [
          "Full White-label Email Service",
          "Custom SMTP Integration",
          "Advanced Data Sync",
          "Enterprise-grade Reporting",
        ],
      },
    ],
    Quarterly: [
      {
        title: "Starter",
        price: "₹850/qtr",
        features: [
          "Everything in Monthly Starter",
          "5% Discount",
          "Quarterly Campaign Review",
          "Basic Support Included",
        ],
        channelFeatures: [
          "Quick Setup Templates",
          "HTML Email Sending",
          "Basic Click Tracking",
          "Quarterly Analytics Report",
        ],
      },
      {
        title: "Growth",
        price: "₹2275/qtr",
        features: [
          "Everything in Monthly Growth",
          "5% Discount",
          "Priority Support Access",
          "Enhanced Campaign Reports",
        ],
        channelFeatures: [
          "Drag-n-Drop Campaigns",
          "CTA Link Tracking",
          "List Segmentation",
          "Campaign Flow Optimization",
        ],
      },
      {
        title: "Advance",
        price: "₹4275/qtr",
        features: [
          "Everything in Monthly Advance",
          "10% Discount",
          "Custom Automation Workflows",
          "Dedicated Campaign Consultant",
        ],
        channelFeatures: [
          "Dynamic Email Personalization",
          "Behavior-based Triggers",
          "Multi-stage Campaigns",
          "Quarterly Feature Upgrades",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Quarterly Roadmap Planning",
          "Beta Feature Access",
          "Custom Email API Development",
        ],
        channelFeatures: [
          "Full White-label Email Platform",
          "Custom CRM Integrations",
          "Enterprise-grade Reporting",
          "Custom Security Protocols",
        ],
      },
    ],
    Yearly: [
      {
        title: "Starter",
        price: "₹3200/yr",
        features: [
          "Everything in Monthly Starter",
          "20% Annual Discount",
          "Annual Campaign Review",
          "Annual Strategy Consultation",
        ],
        channelFeatures: [
          "Template Optimization",
          "Campaign Insights Report",
          "Engagement Review",
          "Personalized Email Campaigns",
        ],
      },
      {
        title: "Growth",
        price: "₹8600/yr",
        features: [
          "Everything in Monthly Growth",
          "20% Annual Discount",
          "Advanced Audience Insights",
          "Annual Feature Upgrade",
        ],
        channelFeatures: [
          "Multi-step Email Flows",
          "AI-based Recommendations",
          "A/B Testing at Scale",
          "Yearly Trends Report",
        ],
      },
      {
        title: "Advance",
        price: "₹16200/yr",
        features: [
          "Everything in Monthly Advance",
          "25% Annual Discount",
          "Annual Workflow Optimization",
          "Enterprise Automation Features",
        ],
        channelFeatures: [
          "Advanced Data-driven Campaigns",
          "Yearly Deliverability Review",
          "Behavior & Geo Targeting",
          "Full HTML/CSS Email Templates",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Custom Infrastructure Setup",
          "Dedicated Enterprise Support",
          "Custom Global SLA",
        ],
        channelFeatures: [
          "Enterprise Data Processing",
          "Unlimited API Access",
          "Custom Email Design Services",
          "Exclusive Feature Access",
        ],
      },
    ],
  },

  OBD: {
    Monthly: [
      {
        title: "Starter",
        price: "₹799/mo",
        features: [
          "Up to 1,000 Outbound Calls",
          "Basic IVR Menu",
          "Call Recording",
          "Call Logs for 30 Days",
          "Basic Campaign Scheduling",
        ],
        channelFeatures: [
          "Simple Voice Campaigns",
          "MP3 Audio Support",
          "Basic DTMF Support",
          "Single-language IVR",
        ],
      },
      {
        title: "Growth",
        price: "₹1799/mo",
        features: [
          "Everything in Starter",
          "Up to 5,000 Outbound Calls",
          "Advanced IVR Menus",
          "Multi-language Support",
          "Automated Call Campaigns",
        ],
        channelFeatures: [
          "Multi-step Call Flows",
          "Advanced DTMF Handling",
          "Retry on No Answer",
          "Campaign Templates",
        ],
      },
      {
        title: "Advance",
        price: "₹3499/mo",
        features: [
          "Everything in Growth",
          "Up to 20,000 Outbound Calls",
          "API Access for Call Triggering",
          "Real-time Analytics Dashboard",
          "Call Transfer to Agents",
        ],
        channelFeatures: [
          "Dynamic Number Masking",
          "Webhook Event Triggers",
          "Smart Retry Logic",
          "Advanced Reporting",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "All Advance Features",
          "Unlimited Calls (Fair Usage)",
          "Dedicated Infrastructure",
          "24/7 Priority Telephony Support",
          "Custom SLA",
        ],
        channelFeatures: [
          "Full White-label OBD",
          "Dedicated Call Routing",
          "Custom Integrations",
          "Enterprise Analytics Suite",
        ],
      },
    ],
    Quarterly: [
      {
        title: "Starter",
        price: "₹2275/qtr",
        features: [
          "Everything in Monthly Starter",
          "5% Discount",
          "Quarterly Usage Review",
          "Basic IVR Optimization",
        ],
        channelFeatures: [
          "Basic Voice Campaigns",
          "MP3 Playback",
          "Basic Call Reports",
          "Quarterly Call Summary",
        ],
      },
      {
        title: "Growth",
        price: "₹5125/qtr",
        features: [
          "Everything in Monthly Growth",
          "5% Discount",
          "Priority Support Access",
          "Quarterly Call Flow Optimization",
        ],
        channelFeatures: [
          "Enhanced Voice Scripts",
          "Custom Retry Rules",
          "DTMF Input Tracking",
          "Call Routing Rules",
        ],
      },
      {
        title: "Advance",
        price: "₹9975/qtr",
        features: [
          "Everything in Monthly Advance",
          "10% Discount",
          "Advanced Analytics Reports",
          "Custom API Enhancements",
        ],
        channelFeatures: [
          "Detailed Call Insights",
          "Advanced Behavior Tracking",
          "Automated Call Sequences",
          "Quarterly Feature Upgrades",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Quarterly Roadmap Planning",
          "Exclusive Beta Access",
          "Custom Call Infrastructure",
        ],
        channelFeatures: [
          "Global Call Termination",
          "Custom Security Protocols",
          "AI-powered Voice Analytics",
          "Dedicated Account Manager",
        ],
      },
    ],
    Yearly: [
      {
        title: "Starter",
        price: "₹8600/yr",
        features: [
          "Everything in Monthly Starter",
          "20% Annual Discount",
          "Annual Call Review",
          "Basic Strategy Consultation",
        ],
        channelFeatures: [
          "Annual IVR Optimization",
          "Campaign Insights Report",
          "Call Recording Review",
          "Basic Agent Handover",
        ],
      },
      {
        title: "Growth",
        price: "₹19400/yr",
        features: [
          "Everything in Monthly Growth",
          "20% Annual Discount",
          "Advanced Call Insights",
          "Annual Feature Upgrade",
        ],
        channelFeatures: [
          "Multi-level IVR",
          "AI Voice Recommendations",
          "Advanced Retry Logic",
          "Yearly Trends Report",
        ],
      },
      {
        title: "Advance",
        price: "₹37700/yr",
        features: [
          "Everything in Monthly Advance",
          "25% Annual Discount",
          "Annual Workflow Optimization",
          "Enterprise Automation Features",
        ],
        channelFeatures: [
          "Advanced Data-driven Calling",
          "Yearly Infrastructure Review",
          "Geo-based Call Routing",
          "Smart Call Flow Builder",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Custom Global SLA",
          "Annual Strategy Review",
          "Enterprise-grade Call Infrastructure",
        ],
        channelFeatures: [
          "Enterprise Data Processing",
          "Unlimited API Access",
          "AI-powered Speech Analysis",
          "Exclusive Feature Access",
        ],
      },
    ],
  },

  IBD: {
    Monthly: [
      {
        title: "Starter",
        price: "₹699/mo",
        features: [
          "Up to 1,000 Incoming Calls",
          "Basic IVR Menu",
          "Call Recording",
          "Call Logs for 30 Days",
          "Basic Call Routing",
        ],
        channelFeatures: [
          "Simple Call Queues",
          "MP3 Audio Support",
          "Basic DTMF Input",
          "Single-language IVR",
        ],
      },
      {
        title: "Growth",
        price: "₹1599/mo",
        features: [
          "Everything in Starter",
          "Up to 5,000 Incoming Calls",
          "Advanced IVR Menus",
          "Multi-language Support",
          "Automated Call Distribution",
        ],
        channelFeatures: [
          "Multi-level Call Queues",
          "Advanced DTMF Handling",
          "Caller ID Routing",
          "Call Recording Analytics",
        ],
      },
      {
        title: "Advance",
        price: "₹3099/mo",
        features: [
          "Everything in Growth",
          "Up to 20,000 Incoming Calls",
          "API Access for Call Management",
          "Real-time Call Monitoring",
          "Call Transfer to Agents",
        ],
        channelFeatures: [
          "Dynamic Call Routing",
          "Webhook Event Triggers",
          "Smart Call Prioritization",
          "Advanced Reporting & Analytics",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "All Advance Features",
          "Unlimited Calls (Fair Usage)",
          "Dedicated Infrastructure",
          "24/7 Priority Telephony Support",
          "Custom SLA",
        ],
        channelFeatures: [
          "Full White-label IBD",
          "Dedicated Call Routing",
          "Custom Integrations",
          "Enterprise Analytics Suite",
        ],
      },
    ],
    Quarterly: [
      {
        title: "Starter",
        price: "₹1995/qtr",
        features: [
          "Everything in Monthly Starter",
          "5% Discount",
          "Quarterly Usage Review",
          "Basic IVR Optimization",
        ],
        channelFeatures: [
          "Basic Call Reports",
          "MP3 Playback",
          "Quarterly Call Summary",
          "Basic Call Routing Analytics",
        ],
      },
      {
        title: "Growth",
        price: "₹4520/qtr",
        features: [
          "Everything in Monthly Growth",
          "5% Discount",
          "Priority Support Access",
          "Quarterly Call Flow Optimization",
        ],
        channelFeatures: [
          "Enhanced Voice Scripts",
          "Custom Retry Rules",
          "DTMF Input Tracking",
          "Call Routing Rules",
        ],
      },
      {
        title: "Advance",
        price: "₹8575/qtr",
        features: [
          "Everything in Monthly Advance",
          "10% Discount",
          "Advanced Analytics Reports",
          "Custom API Enhancements",
        ],
        channelFeatures: [
          "Detailed Call Insights",
          "Advanced Behavior Tracking",
          "Automated Call Sequences",
          "Quarterly Feature Upgrades",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Quarterly Roadmap Planning",
          "Exclusive Beta Access",
          "Custom Call Infrastructure",
        ],
        channelFeatures: [
          "Global Call Termination",
          "Custom Security Protocols",
          "AI-powered Voice Analytics",
          "Dedicated Account Manager",
        ],
      },
    ],
    Yearly: [
      {
        title: "Starter",
        price: "₹7600/yr",
        features: [
          "Everything in Monthly Starter",
          "20% Annual Discount",
          "Annual Call Review",
          "Basic Strategy Consultation",
        ],
        channelFeatures: [
          "Annual IVR Optimization",
          "Campaign Insights Report",
          "Call Recording Review",
          "Basic Agent Handover",
        ],
      },
      {
        title: "Growth",
        price: "₹17400/yr",
        features: [
          "Everything in Monthly Growth",
          "20% Annual Discount",
          "Advanced Call Insights",
          "Annual Feature Upgrade",
        ],
        channelFeatures: [
          "Multi-level IVR",
          "AI Voice Recommendations",
          "Advanced Retry Logic",
          "Yearly Trends Report",
        ],
      },
      {
        title: "Advance",
        price: "₹33900/yr",
        features: [
          "Everything in Monthly Advance",
          "25% Annual Discount",
          "Annual Workflow Optimization",
          "Enterprise Automation Features",
        ],
        channelFeatures: [
          "Advanced Data-driven Calling",
          "Yearly Infrastructure Review",
          "Geo-based Call Routing",
          "Smart Call Flow Builder",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Custom Global SLA",
          "Annual Strategy Review",
          "Enterprise-grade Call Infrastructure",
        ],
        channelFeatures: [
          "Enterprise Data Processing",
          "Unlimited API Access",
          "AI-powered Speech Analysis",
          "Exclusive Feature Access",
        ],
      },
    ],
  },

  SMS: {
    Monthly: [
      {
        title: "Starter",
        price: "₹499/mo",
        features: [
          "Up to 10,000 SMS",
          "Basic Delivery Reports",
          "Single Sender ID",
          "Standard Message Templates",
          "Basic API Access",
        ],
        channelFeatures: [
          "Text-only Messaging",
          "Basic Unicode Support",
          "Single-region Delivery",
          "Basic Opt-out Management",
        ],
      },
      {
        title: "Growth",
        price: "₹1299/mo",
        features: [
          "Everything in Starter",
          "Up to 50,000 SMS",
          "Advanced Delivery Reports",
          "Multiple Sender IDs",
          "Message Scheduling",
        ],
        channelFeatures: [
          "Template Management",
          "Multiple Region Delivery",
          "Advanced Unicode Support",
          "Custom Opt-out Rules",
        ],
      },
      {
        title: "Advance",
        price: "₹2499/mo",
        features: [
          "Everything in Growth",
          "Up to 200,000 SMS",
          "Real-time Analytics",
          "Two-way Messaging",
          "Priority Delivery Routes",
        ],
        channelFeatures: [
          "Dynamic Content Messaging",
          "Webhook Event Integration",
          "Campaign Performance Tracking",
          "Advanced Segmentation",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "All Advance Features",
          "Unlimited SMS (Fair Usage)",
          "Dedicated Infrastructure",
          "24/7 Priority Support",
          "Custom SLA",
        ],
        channelFeatures: [
          "White-label SMS Platform",
          "Dedicated Routing",
          "Custom Integrations",
          "Enterprise Reporting Suite",
        ],
      },
    ],
    Quarterly: [
      {
        title: "Starter",
        price: "₹1420/qtr",
        features: [
          "Everything in Monthly Starter",
          "5% Discount",
          "Quarterly Delivery Review",
          "Basic Template Optimization",
        ],
        channelFeatures: [
          "Basic Campaign Reports",
          "Quarterly Usage Insights",
          "Simple Automation Triggers",
          "Basic A/B Testing",
        ],
      },
      {
        title: "Growth",
        price: "₹3690/qtr",
        features: [
          "Everything in Monthly Growth",
          "5% Discount",
          "Priority Support Access",
          "Quarterly Campaign Optimization",
        ],
        channelFeatures: [
          "Advanced Campaign Reports",
          "Custom Retry Rules",
          "Message Flow Tracking",
          "Regional Performance Insights",
        ],
      },
      {
        title: "Advance",
        price: "₹7120/qtr",
        features: [
          "Everything in Monthly Advance",
          "10% Discount",
          "Advanced Analytics Reports",
          "Custom API Enhancements",
        ],
        channelFeatures: [
          "Detailed Delivery Insights",
          "Advanced Behavior Tracking",
          "Automated Campaign Sequences",
          "Quarterly Feature Upgrades",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Quarterly Roadmap Planning",
          "Exclusive Beta Access",
          "Custom SMS Infrastructure",
        ],
        channelFeatures: [
          "Global Delivery Management",
          "Custom Security Protocols",
          "AI-powered Messaging Analytics",
          "Dedicated Account Manager",
        ],
      },
    ],
    Yearly: [
      {
        title: "Starter",
        price: "₹6000/yr",
        features: [
          "Everything in Monthly Starter",
          "20% Annual Discount",
          "Annual Delivery Review",
          "Basic Strategy Consultation",
        ],
        channelFeatures: [
          "Annual Template Optimization",
          "Yearly Campaign Insights",
          "Delivery Report Review",
          "Basic Sender ID Rotation",
        ],
      },
      {
        title: "Growth",
        price: "₹14400/yr",
        features: [
          "Everything in Monthly Growth",
          "20% Annual Discount",
          "Advanced Campaign Insights",
          "Annual Feature Upgrade",
        ],
        channelFeatures: [
          "Multi-region Campaign Support",
          "AI-based Recommendations",
          "Advanced Retry Logic",
          "Yearly Trends Report",
        ],
      },
      {
        title: "Advance",
        price: "₹28000/yr",
        features: [
          "Everything in Monthly Advance",
          "25% Annual Discount",
          "Annual Workflow Optimization",
          "Enterprise Automation Features",
        ],
        channelFeatures: [
          "Advanced Data-driven Messaging",
          "Yearly Infrastructure Review",
          "Geo-based Targeting",
          "Smart Message Flow Builder",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Custom Global SLA",
          "Annual Strategy Review",
          "Enterprise-grade Messaging Infrastructure",
        ],
        channelFeatures: [
          "Enterprise Data Processing",
          "Unlimited API Access",
          "AI-powered Text Analysis",
          "Exclusive Feature Access",
        ],
      },
    ],
  },

  MISSEDCALL: {
    Monthly: [
      {
        title: "Starter",
        price: "₹299/mo",
        features: [
          "Up to 500 Missed Calls",
          "Basic Call Alerts via Email",
          "Single Number",
          "Call Logs for 15 Days",
          "Basic Dashboard Access",
        ],
        channelFeatures: [
          "Single Region Support",
          "Basic IVR Greeting",
          "Simple Notification Rules",
          "Basic Caller ID Capture",
        ],
      },
      {
        title: "Growth",
        price: "₹799/mo",
        features: [
          "Everything in Starter",
          "Up to 2,500 Missed Calls",
          "SMS + Email Alerts",
          "Multiple Numbers",
          "Extended Call Logs for 30 Days",
        ],
        channelFeatures: [
          "Multi-region Support",
          "Custom IVR Greeting",
          "Advanced Notification Rules",
          "Caller Segmentation",
        ],
      },
      {
        title: "Advance",
        price: "₹1599/mo",
        features: [
          "Everything in Growth",
          "Up to 10,000 Missed Calls",
          "Real-time Webhook Alerts",
          "Priority Number Routing",
          "Call Logs for 90 Days",
        ],
        channelFeatures: [
          "Dynamic Call Routing",
          "API Integration",
          "Campaign-based Number Allocation",
          "Detailed Analytics Dashboard",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "All Advance Features",
          "Unlimited Missed Calls (Fair Usage)",
          "Dedicated Infrastructure",
          "24/7 Priority Support",
          "Custom SLA",
        ],
        channelFeatures: [
          "White-label Missed Call Platform",
          "Dedicated Number Pool",
          "Custom Integrations",
          "Enterprise Reporting Suite",
        ],
      },
    ],
    Quarterly: [
      {
        title: "Starter",
        price: "₹850/qtr",
        features: [
          "Everything in Monthly Starter",
          "5% Discount",
          "Quarterly Usage Review",
          "Basic Alert Optimization",
        ],
        channelFeatures: [
          "Basic Campaign Reports",
          "Quarterly Insights",
          "Simple Automation Rules",
          "Basic Caller Analysis",
        ],
      },
      {
        title: "Growth",
        price: "₹2280/qtr",
        features: [
          "Everything in Monthly Growth",
          "5% Discount",
          "Priority Support Access",
          "Quarterly Campaign Optimization",
        ],
        channelFeatures: [
          "Advanced Campaign Reports",
          "Custom Retry Rules",
          "Caller Behavior Tracking",
          "Regional Performance Insights",
        ],
      },
      {
        title: "Advance",
        price: "₹4560/qtr",
        features: [
          "Everything in Monthly Advance",
          "10% Discount",
          "Advanced Analytics Reports",
          "Custom API Enhancements",
        ],
        channelFeatures: [
          "Detailed Call Insights",
          "Advanced Behavior Tracking",
          "Automated Campaign Sequences",
          "Quarterly Feature Upgrades",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Quarterly Roadmap Planning",
          "Exclusive Beta Access",
          "Custom Missed Call Infrastructure",
        ],
        channelFeatures: [
          "Global Number Management",
          "Custom Security Protocols",
          "AI-powered Caller Analytics",
          "Dedicated Account Manager",
        ],
      },
    ],
    Yearly: [
      {
        title: "Starter",
        price: "₹3200/yr",
        features: [
          "Everything in Monthly Starter",
          "20% Annual Discount",
          "Annual Usage Review",
          "Basic Strategy Consultation",
        ],
        channelFeatures: [
          "Annual Alert Optimization",
          "Yearly Campaign Insights",
          "Caller Report Review",
          "Basic Number Rotation",
        ],
      },
      {
        title: "Growth",
        price: "₹8640/yr",
        features: [
          "Everything in Monthly Growth",
          "20% Annual Discount",
          "Advanced Campaign Insights",
          "Annual Feature Upgrade",
        ],
        channelFeatures: [
          "Multi-region Support",
          "AI-based Caller Recommendations",
          "Advanced Retry Logic",
          "Yearly Trends Report",
        ],
      },
      {
        title: "Advance",
        price: "₹17200/yr",
        features: [
          "Everything in Monthly Advance",
          "25% Annual Discount",
          "Annual Workflow Optimization",
          "Enterprise Automation Features",
        ],
        channelFeatures: [
          "Advanced Data-driven Call Management",
          "Yearly Infrastructure Review",
          "Geo-based Number Allocation",
          "Smart Call Flow Builder",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Custom Global SLA",
          "Annual Strategy Review",
          "Enterprise-grade Missed Call Infrastructure",
        ],
        channelFeatures: [
          "Enterprise Data Processing",
          "Unlimited API Access",
          "AI-powered Call Analysis",
          "Exclusive Feature Access",
        ],
      },
    ],
  },

  LOOKUP: {
    Monthly: [
      {
        title: "Starter",
        price: "₹499/mo",
        features: [
          "Up to 500 Number Lookups",
          "Basic Caller ID Information",
          "Single User Access",
          "Lookup Logs for 15 Days",
          "Web Dashboard Access",
        ],
        channelFeatures: [
          "Standard API Access",
          "Single Region Lookup",
          "Basic Spam Detection",
          "Standard JSON Response",
        ],
      },
      {
        title: "Growth",
        price: "₹1299/mo",
        features: [
          "Everything in Starter",
          "Up to 5,000 Number Lookups",
          "Multi-user Access",
          "Extended Logs for 30 Days",
          "CSV Export",
        ],
        channelFeatures: [
          "Priority API Access",
          "Multi-region Lookup",
          "Enhanced Spam Detection",
          "Custom Response Fields",
        ],
      },
      {
        title: "Advance",
        price: "₹2599/mo",
        features: [
          "Everything in Growth",
          "Up to 25,000 Number Lookups",
          "Webhook-based Lookup Alerts",
          "Real-time Enrichment",
          "Logs for 90 Days",
        ],
        channelFeatures: [
          "Dynamic API Throttling",
          "International Number Support",
          "Fraud Pattern Detection",
          "Detailed Usage Analytics",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "All Advance Features",
          "Unlimited Lookups (Fair Usage)",
          "Dedicated API Endpoint",
          "24/7 Priority Support",
          "Custom SLA",
        ],
        channelFeatures: [
          "White-label Lookup Platform",
          "Custom Data Enrichment",
          "Dedicated Account Manager",
          "Enterprise Data Reports",
        ],
      },
    ],
    Quarterly: [
      {
        title: "Starter",
        price: "₹1420/qtr",
        features: [
          "Everything in Monthly Starter",
          "5% Discount",
          "Quarterly Usage Review",
          "Basic Lookup Optimization",
        ],
        channelFeatures: [
          "Basic Quarterly Reports",
          "Standard API Key Rotation",
          "Basic Data Audit",
          "Caller ID Accuracy Review",
        ],
      },
      {
        title: "Growth",
        price: "₹3700/qtr",
        features: [
          "Everything in Monthly Growth",
          "5% Discount",
          "Priority Support Access",
          "Quarterly API Optimization",
        ],
        channelFeatures: [
          "Custom Lookup Reports",
          "API Retry Logic",
          "Caller Behavior Insights",
          "Region-wise Accuracy Stats",
        ],
      },
      {
        title: "Advance",
        price: "₹7410/qtr",
        features: [
          "Everything in Monthly Advance",
          "10% Discount",
          "Advanced Analytics Reports",
          "Custom API Enhancements",
        ],
        channelFeatures: [
          "Detailed Lookup Insights",
          "Advanced Fraud Detection",
          "Automated Data Validation",
          "Quarterly Feature Upgrades",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Quarterly Roadmap Planning",
          "Exclusive Beta Access",
          "Custom Lookup Infrastructure",
        ],
        channelFeatures: [
          "Global Lookup Network",
          "Custom Security Protocols",
          "AI-powered Number Intelligence",
          "Dedicated Data Consultant",
        ],
      },
    ],
    Yearly: [
      {
        title: "Starter",
        price: "₹5400/yr",
        features: [
          "Everything in Monthly Starter",
          "20% Annual Discount",
          "Annual Usage Review",
          "Basic Strategy Consultation",
        ],
        channelFeatures: [
          "Annual API Key Rotation",
          "Yearly Accuracy Report",
          "Basic Data Quality Review",
          "Simple Integration Audit",
        ],
      },
      {
        title: "Growth",
        price: "₹14000/yr",
        features: [
          "Everything in Monthly Growth",
          "20% Annual Discount",
          "Advanced Lookup Insights",
          "Annual Feature Upgrade",
        ],
        channelFeatures: [
          "Multi-region Accuracy Analysis",
          "AI-based Lookup Recommendations",
          "Advanced Retry Logic",
          "Yearly Trends Report",
        ],
      },
      {
        title: "Advance",
        price: "₹28000/yr",
        features: [
          "Everything in Monthly Advance",
          "25% Annual Discount",
          "Annual Workflow Optimization",
          "Enterprise Automation Features",
        ],
        channelFeatures: [
          "Advanced Data-driven Lookups",
          "Yearly Infrastructure Review",
          "Geo-based Lookup Routing",
          "Smart Data Flow Builder",
        ],
      },
      {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
          "Same as Monthly Enterprise",
          "Custom Global SLA",
          "Annual Strategy Review",
          "Enterprise-grade Lookup Infrastructure",
        ],
        channelFeatures: [
          "Enterprise Data Processing",
          "Unlimited API Access",
          "AI-powered Caller ID Analysis",
          "Exclusive Data Features",
        ],
      },
    ],
  }




};

const channelTabs = [
  { label: "WHATSAPP", content: "" },
  { label: "INSTAGRAM", content: "Instagram insights here" },
  { label: "RCS", content: "RCS metrics and reports" },
  { label: "EMAIL", content: "Email campaign data" },
  { label: "LOOKUP", content: "Lookup service summary" },
  { label: "SMS", content: "SMS reports" },
  { label: "OBD", content: "OBD call logs and analytics" },
  { label: "IBD", content: "IBD (Inbound Dialer) tracking" },
  { label: "MISSEDCALL", content: "Missed call alerts & history" },
];

// PricingCard.jsx
const PricingCard = ({
  plan,
  channelTabs,
  selected,
  selectedChannel,
  setSelectedChannel,
  activeTab,
  idx,
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="border-2 border-blue-400 rounded-3xl p-1.5 min-w-[280px]">
          <div className="relative rounded-bl-2xl rounded-2xl border-b-2 border-r-2 border-l-2 border-blue-500 bg-white overflow-hidden  w-full hover:scale-105 transition-transform duration-300 h-[420px]">
            {/* Featured Tag */}
            <div className="h-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white py-1 border-red-500 z-10 h-20 w-40">
                <h3 className="text-md font-semibold text-blue-700 text-center">
                  {plan.title}
                </h3>
                <p className="text-lg font-semibold mt-1 text-gray-900 text-center">{plan.price}</p>
                <div className="absolute h-16.5 w-17 bg-white rounded-tr-2xl rounded-tl-2xl -top-0 -left-16.5 border-r-2 border-t-2 border-l-2 border-blue-500 z-50"></div>
                <div className="absolute h-16.5 w-17 bg-white rounded-tl-2xl rounded-br-2xl -top-0 -right-16.5 border-l-2 border-t-2 border-blue-500 z-50"></div>
                <div className="absolute h-5 w-full bg-white rounded-b-2xl -bottom-0 -right-0 border-b-2 border-r-2 border-l-2 border-blue-500 z-50"></div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 h-full bg-blue-50 mt-20">
              {/* <h2 className="text-black font-semibold text-lg mb-1 mt-20">
              Features:
            </h2> */}

              <div className="bg-white rounded-lg flex flex-row justify-between items-start gap-4 px-3 py-2 border border-gray-200 w-[100%] h-[80%]">
                {channelTabs
                  .filter(({ label }) => selected.includes(label))
                  .map(({ label }) => {
                    const planObj = planData[label]?.[activeTab]?.[idx];
                    const f = planObj?.channelFeatures || [];
                    return (
                      <div key={label} className="space-y-2">
                        <button
                          className="text-sm font-semibold text-black border border-blue-600 rounded-full px-2 py-1 w-full cursor-default"
                          disabled
                        >
                          {label}
                        </button>
                        <ul className="list-none text-gray-700 text-xs space-y-1">
                          {f.map((f, i) => (
                            <li className="flex items-center gap-2" key={i}>
                              <span className="flex items-center justify-center text-blue-600 font-semibold border border-blue-600 rounded-full w-3 h-3 text-xs">
                                ✓
                              </span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </>
  );
};

// MarketingHub.jsx
const MarketingHub = () => {
  const [activeTab, setActiveTab] = useState("Monthly");
  const [selectedChannel, setSelectedChannel] = useState("WHATSAPP");
  const [selected, setSelected] = useState(["WHATSAPP"]);

  const tabs = ["Monthly", "Quarterly", "Yearly"];

  const selectedChannelData = channelTabs.find(
    (c) => c.label === selectedChannel
  );

  const sections = {
    WHATSAPP: [
      {
        title: "Market",
        features: [
          { name: "One-time Campaigns", values: [true, true, true, true] },
          { name: "Ongoing Campaigns", values: [true, true, true, true] },
        ],
      },
      {
        title: "APIs & Webhooks",
        features: [
          { name: "REST API Access", values: [true, true, true, true] },
          { name: "Webhook Events", values: [true, true, true, true] },
        ],
      },
    ],

    INSTAGRAM: [
      {
        title: "Support",
        features: [
          {
            name: "Shared Team Inbox",
            values: ["WA + IG", "WA + IG", "WA + IG", "WA + IG + RCS"],
          },
          { name: "Conversation Analytics", values: [true, true, true, true] },
        ],
      },
      {
        title: "Automate",
        features: [
          { name: "Workflow Builder", values: [false, true, true, true] },
        ],
      },
    ],

    RCS: [
      {
        title: "Market",
        features: [
          { name: "Ongoing Campaigns", values: [true, true, false, false] },
        ],
      },
    ],

    EMAIL: [
      {
        title: "Automate",
        features: [
          { name: "Scheduled Automations", values: [false, true, true, true] },
        ],
      },
    ],
  };

  const mergedSections = selected.flatMap((channel) => sections[channel] || []);

  const filteredSections = mergedSections
    .map((section) => ({
      ...section,
      features: section.features.filter((f) => f.name),
    }))
    .filter((section) => section.features.length > 0);

  const combinedPlans = [0, 1, 2, 3]
    .map((planIndex) => {
      // Collect the plans for this index from all selected channels
      const plansForIndex = selected
        .map((channel) => planData[channel]?.[activeTab]?.[planIndex])
        .filter(Boolean);

      if (plansForIndex.length === 0) return null;

      // Sum prices helper
      const parsePrice = (priceStr) => {
        if (!priceStr || priceStr.toLowerCase().includes("custom")) return 0;
        const digits = priceStr.replace(/[^\d]/g, "");
        return digits ? Number(digits) : 0;
      };

      // Sum prices
      const totalPriceNum = plansForIndex.reduce(
        (sum, p) => sum + parsePrice(p.price),
        0
      );

      // Get price suffix from first plan (like "/mo" or "/qtr")
      const priceSuffix =
        plansForIndex[0]?.price.replace(/[₹\d,\/]/g, "") || "";

      const totalPrice =
        totalPriceNum > 0
          ? `₹${totalPriceNum}${priceSuffix}`
          : "Custom Pricing";

      // Merge features & channelFeatures, dedupe
      const mergedFeatures = Array.from(
        new Set(plansForIndex.flatMap((p) => p.features || []))
      );
      const mergedChannelFeatures = Array.from(
        new Set(plansForIndex.flatMap((p) => p.channelFeatures || []))
      );

      return {
        title: plansForIndex[0]?.title || "",
        price: totalPrice,
        features: mergedFeatures,
        channelFeatures: mergedChannelFeatures,
      };
    })
    .filter(Boolean);

  return (
    <div className="p-6 flex flex-col items-center max-w-screen-3xl mx-auto ">
      {/* Channel Tabs */}
      <ChannelToggleTabs
        channelTabs={channelTabs}
        setSelectedChannel={setSelectedChannel}
        selectedChannel={selectedChannel}
        selected={selected}
        setSelected={setSelected}
      />

      {/* Plan Duration Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 mt-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
            px-5 py-2 rounded-full text-sm font-semibold transition
            duration-300
            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
            ${isActive
                  ? "bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
          `}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Plan Cards Grid */}
      <div className="grid w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl gap-5">
        {combinedPlans.map((plan, idx) => (
          <PricingCard
            key={`combined-plan-${idx}`}
            plan={plan}
            channelTabs={channelTabs}
            selected={selected}
            selectedChannel={selectedChannel}
            setSelectedChannel={setSelectedChannel}
            activeTab={activeTab}
            idx={idx}
          />
        ))}
      </div>

      {/* Accordion Section */}
      {/* <div className="mt-10 w-full max-w-screen-lg px-2">
        <CustomAccordion sections={filteredSections} />
      </div> */}
    </div>
  );
};

export default MarketingHub;
