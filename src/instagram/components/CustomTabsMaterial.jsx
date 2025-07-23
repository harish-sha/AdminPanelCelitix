import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

/**
 * CustomTabs Component
 * @param {Array} tabsData - Array of { label, value, icon, content }
 * @param {String} defaultValue - Default active tab value
 * @param {String} className - Additional Tailwind classes for styling
 */
const CustomTabsMaterial = ({ tabsData, defaultValue, className = "" }) => {
    return (
        <Tabs value={defaultValue || (tabsData.length > 0 ? tabsData[0].value : "")} className={className}>
            {/* Tabs Header */}
            <TabsHeader>
                {tabsData.map(({ label, value, icon: Icon }) => (
                    <Tab key={value} value={value}>
                        <div className="flex items-center gap-2">
                            {Icon && <Icon className="w-5 h-5" />}
                            {label}
                        </div>
                    </Tab>
                ))}
            </TabsHeader>

            {/* Tabs Content */}
            <TabsBody>
                {tabsData.map(({ value, content }) => (
                    <TabPanel key={value} value={value} className="py-4">
                        {content}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
};

export default CustomTabsMaterial;



