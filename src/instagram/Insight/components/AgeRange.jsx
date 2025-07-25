import React from "react";

const ageData = [
  { label: "18–24", percent: 58.6, color: "#9431A8" }, 
  { label: "25–34", percent: 35.4, color: "#7C3AED" }, 
  { label: "13–17", percent: 3.0, color: "#EAD166" },  
  { label: "35–44", percent: 1.8, color: "#BFD641" }   
];

const AgeRangeInsights = () => {
  return (
    <div className="bg-white p-4 rounded-xl mt-6">
      <h2 className="text-MD font-semibold mb-4">
        Audience Age 
      </h2>
      <div className="space-y-3">
        {ageData.map((age, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">{age.label}</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${age.percent}%`,
                  backgroundColor: age.color
                }}
              />
            </div>
            <span className="text-sm text-gray-600 font-semibold w-12 text-right">
              {age.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgeRangeInsights;
