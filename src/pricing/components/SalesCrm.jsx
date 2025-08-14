import React, { useState } from "react";

const SalesCrm = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ["Monthly", "Quaterly", "Yearly"];
  return (
    <div className="">
      {/* Header */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
        {tabs.map((tab, index) => {
          const isActive = selectedTab === index;
          return (
            <button
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`
            px-5 py-2 rounded-full text-sm font-semibold transition
            duration-300
            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
            ${
              isActive
                ? "bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
          `}
              // style={
              //   isActive
              //     ? {
              //       background: 'linear-gradient(90deg, #004e92 0%, #000428 100%)',
              //       color: '#fff',
              //     }
              //     : undefined
              // }
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        <h2>{tabs[selectedTab]}</h2>
      </div>
    </div>
  );
};

export default SalesCrm;
