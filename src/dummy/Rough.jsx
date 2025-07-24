import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { motion } from "framer-motion";

const CustomTabsWithIcons = ({ tabsData, defaultValue = "", className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabsData[0]?.value || "");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef({});

  // Update indicator position on active tab change
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const tabElement = tabRefs.current[activeTab];
      setIndicatorStyle({
        width: tabElement.offsetWidth,
        left: tabElement.offsetLeft,
      });
    }
  }, [activeTab, tabsData]);

  return (
    <div className={className}>
      <Tabs value={activeTab}>
        {/* Tabs Header */}
        <div className="relative">
          <TabsHeader className="flex relative">
            {tabsData.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                ref={(el) => (tabRefs.current[value] = el)}
                onClick={() => setActiveTab(value)}
                className={`relative flex items-center gap-2 px-4 py-2 font-medium transition-colors duration-300 ${activeTab === value ? "text-blue-600" : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                {label}
              </button>
            ))}
          </TabsHeader>
          {/* Sliding Indicator */}
          <motion.div
            layout
            className="absolute bottom-0 h-[2px] bg-blue-600 rounded"
            animate={indicatorStyle}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </div>

        {/* Tabs Content */}
        <TabsBody>
          {tabsData.map(({ value, content }) => (
            <TabPanel key={value} value={value}>
              {activeTab === value && content}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default CustomTabsWithIcons;
