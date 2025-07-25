import React,{useState}  from "react" ;

const audienceStats = [
  { label: "India", percent: 69 , color: "#9431A8"},
  { label: "Pakistan", percent: 17 , color: "#7C3AED"},
  { label: "Bangladesh", percent: 9 ,  color: "#EAD166"},
  { label: "Nepal", percent: 5 , color: "#BFD641" },
];

const AudienceSection = () =>  {
   
  return (
    <div className="bg-white p-4 rounded-xl mt-6">
      <h2 className="text-md font-semibold mb-4">Top Countries</h2>
      {audienceStats.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-600">{item.label}</span>
            <span className="font-medium text-gray-600">{item.percent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className=" h-2 rounded-full"
              style={{ width: `${item.percent}%`, background: item.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
export default AudienceSection;