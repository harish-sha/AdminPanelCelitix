import React from "react";

const citiesData = [
  { name: "Jaipur", percentage: 9.8, color: "#9431A8" },
  { name: "Delhi", percentage: 9.4, color: "#7C3AED" },
  { name: "Udaipur", percentage: 8.2, color: "#EAD166" },
  { name: "Noida", percentage: 4.6, color: "#BFD641" },
];

const TopCitiesInsight = () => {
  return (
    <div className="bg-white p-4 rounded-xl mt-6">
      <h2 className="text-md font-semibold mb-4">Top towns/cities</h2>
      <div className="space-y-3">
        {citiesData.map((city, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">{city.name}</span>
              <span className="font-medium text-gray-600">{city.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
              <div
                className="h-full  rounded-full"
                style={{ width: `${city.percentage}%`, background: city.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCitiesInsight;
