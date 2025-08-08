import React, { useState } from 'react';
import MarketingHub from "./components/MarketingHub"
import SalesCrm from "./components/SalesCrm";

const Pricing = () => {
  const tabs = [
    "Marketing & Producting Hub",
    "Sales CRM"
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="mt-5 flex flex-col justify-center items-center gap-6">
      {/* Tab Headers */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab, index) => {
          const isActive = selectedTab === index;
          return (
            <button
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                isActive ? '' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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

      {/* Tab Content */}
      <div>
        {/* <h2>{tabs[selectedTab]}</h2> */}
        {selectedTab === 0 && <MarketingHub />}
        {selectedTab === 1 && <SalesCrm />}
      </div>
    </div>
  );
};

export default Pricing;
