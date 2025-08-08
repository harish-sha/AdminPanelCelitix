import React, { useState } from "react";
import ChannelToggleTabs from './ChannelToggleTabs';




const planData = {
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
};


// ✅ Basic PricingCard component
const PricingCard = ({ plan }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col  border border-blue-400  ">
      <div className="w-[300px]">
        <h3 className="text-lg font-semibold text-blue-700">{plan.title}</h3>
        <p className="text-2xl font-bold mt-2 text-gray-900">{plan.price}</p>
        <ul className="mt-4 space-y-1 text-sm text-gray-600">
          {plan.features?.map((item, idx) => (
            <li key={idx}>
              <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-blue-500 text-white mr-2">
                <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {item}</li>
          ))}
        </ul>
      </div>
      {plan.channelFeatures?.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-blue-600"> Features</h4>
          <ul className="text-xs mt-1 text-gray-500 space-y-1">
            {plan.channelFeatures.map((item, idx) => (
              <li key={idx}>✓ {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};



const MarketingHub = () => {
  const [activeTab, setActiveTab] = useState("Monthly");
  const tabs = ["Monthly", "Quarterly", "Yearly"];


  return (
    <div className="p-6">
      <div><ChannelToggleTabs />
      </div>
      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${isActive ? '' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              style={
                isActive
                  ? {
                    background: 'linear-gradient(90deg, #004e92 0%, #000428 100%)',
                    color: '#fff',
                  }
                  : undefined
              }
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Plan Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {planData[activeTab]?.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}

      </div>
    </div>
  );
};

export default MarketingHub;