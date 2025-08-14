import React, { useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function CustomAccordion({ sections }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // const sections = [
  //   {
  //     title: "Market",
  //     features: [
  //       { name: "One-time Campaigns", values: [true, true, true, true] },
  //       { name: "Ongoing Campaigns", values: [true, true, true, true] },
  //       {
  //         name: "Post-reply-flows for Campaigns",
  //         values: [
  //           "Opt-Out Flow",
  //           "Opt-Out Flow, Send Products",
  //           "Opt-Out Flow, Send Products",
  //           "Opt-Out Flow, Send Products"
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     title: "Support",
  //     features: [
  //       { name: "Shared Team Inbox", values: ["WhatsApp", "WA + IG", "WA + IG", "WA + IG + RCS"] },
  //       { name: "Conversation Analytics", values: [true, true, true, true] }
  //     ]
  //   },
  //   {
  //     title: "APIs & Webhooks",
  //     features: [
  //       { name: "REST API Access", values: [true, true, true, true] },
  //       { name: "Webhook Events", values: [true, true, true, true] },
  //       { name: "Custom Integrations", values: [false, true, true, true] }
  //     ]
  //   },
  //   {
  //     title: "Automate",
  //     features: [
  //       { name: "Workflow Builder", values: [false, true, true, true] },
  //       { name: "Conditional Logic", values: [false, true, true, true] },
  //       { name: "Scheduled Automations", values: [false, true, true, true] }
  //     ]
  //   }
  // ];


  return (
    <div className="border-2 border-gray-300 rounded-sm divide-y divid-red-300">
      {sections.map((section, idx) => (
        <div key={idx}>
          {/* Accordion Header */}
          <div
            className="flex justify-between items-center bg-gray-100 px-4 py-3 cursor-pointer font-semibold"
            onClick={() => toggleSection(idx)}
          >
            <span>{section.title}</span>
            <span className="text-sm">{openIndex === idx ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
          </div>

          {/* Accordion Content */}
          {openIndex === idx && (
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full border-collapse">
                <thead>
                  <tr>
                    {/* <th className="sticky left-0 bg-white border border-gray-300 px-4 py-2 text-left">
                      Feature
                    </th> */}
                    {/* {section.plans.map((plan, i) => (
                      <th
                        key={i}
                        className="border border-gray-300 px-4 py-2 text-left bg-gray-50"
                      >
                        {plan}
                      </th>
                    ))} */}
                  </tr>
                </thead>
                <tbody>
                  {section.features.map((feature, i) => (
                    <tr key={i}>
                      <td className="sticky left-0 bg-white border border-gray-300 px-4 py-2 text-black">
                        {feature.name}
                      </td>
                      {feature.values.map((val, j) => (
                        <td
                          key={j}
                          className="border border-gray-300 px-4 py-2 text-center "
                        >
                          {val === true ? "✔" : val || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
