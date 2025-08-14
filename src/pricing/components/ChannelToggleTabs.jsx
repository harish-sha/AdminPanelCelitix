import React, { useState } from "react";

// const channelTabs = [
//   { label: "WHATSAPP", content: "WhatsApp-related data here" },
//   { label: "INSTAGRAM", content: "Instagram insights here" },
//   { label: "RCS", content: "RCS metrics and reports" },
//   { label: "EMAIL", content: "Email campaign data" },
//   { label: "LOOKUP", content: "Lookup service summary" },
//   { label: "SMS", content: "SMS reports" },
//   { label: "OBD", content: "OBD call logs and analytics" },
//   { label: "IBD", content: "IBD (Inbound Dialer) tracking" },
//   { label: "MISSED CALL", content: "Missed call alerts & history" },
// ];

// const ChannelToggleTabs = ({ channelFeatures, channelTabs }) => {
//   const [selected, setSelected] = useState(["WHATSAPP"]);

//   // Allow only two tabs to be selected at a time
//   const handleToggle = (label) => {
//     setSelected((prev) => {
//       if (prev.includes(label)) {
//         // Deselect tab
//         return prev.filter((tab) => tab !== label);
//       } else {
//         if (prev.length < 2) {
//           // Add tab if less than 2 selected
//           return [...prev, label];
//         } else {
//           // Remove the earliest selected tab and add the new one
//           return [prev[1], label];
//         }
//       }
//     });
//   };

//   return (
//     <>
//       <div className="p-4">
//         {/* Tabs */}
//         <div className="flex flex-wrap gap-3">
//           {channelTabs.map(({ label }) => (
//             <button
//               key={label}
//               onClick={() => handleToggle(label)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
//                 selected.includes(label)
//                   ? " text-gray-700 border-blue-600"
//                   : "bg-gray-100 text-gray-700 border-gray-300"
//               }`}
//             >
//               <label className="inline-flex items-center cursor-pointer group">
//                 <span
//                   className="w-6 h-6 mr-2 border-2 border-blue-600 rounded-full flex items-center justify-center
//                       transition-all duration-300 ease-in-out group-hover:scale-110"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selected.includes(label)}
//                     onChange={() => handleToggle(label)}
//                     className="peer hidden"
//                     disabled={
//                       !selected.includes(label) && selected.length === 2
//                     }
//                   />
//                   <svg
//                     className="w-4 h-4 text-blue-600 scale-100 opacity-0 transition-all duration-300 ease-in-out peer-checked:opacity-100"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//                 <span className="text-sm text-gray-800">{label}</span>
//               </label>
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="px-3 py-2 bg-gray-100 border rounded-lg shadow mt-2  w-[420px]">
//           <h2 className="mt-4 text-black font-semibold text-lg"> Features: </h2>
//           <div className="bg-white px-2 py-2 rounded-lg shadow border border-blue-400 grid grid-cols-2  gap-3 w-[390px] h-auto">
//             {channelTabs
//               .filter(({ label }) => selected.includes(label))
//               .map(({ label, content }) => (
//                 <div
//                   key={label}
//                   // className="bg-white p-3 rounded-lg shadow border border-blue-400  "
//                 >
//                   <button className="text-md font-semibold text-black bg-blue-200 p-1 rounded-md">
//                     {label}
//                   </button>

//                   <p className="text-gray- text-sm"></p>
//                   <div className="mt-4">
//                     <ul className="text-xs mt-1 text-gray-500 space-y-1">
//                       <li>✓ {content}</li>
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const ChannelToggleTabs = ({ channelFeatures, channelTabs, setSelectedChannel, selectedChannel }) => {

//   return (
//     <div className="p-4">
//       {/* Tabs */}
//       <div className="flex flex-wrap gap-3">
//         {channelTabs.map(({ label }) => (
//           <button
//             key={label}
//             onClick={() => setSelectedChannel(label)}
//             className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
//               selectedChannel === label
//                 ? "text-gray-700 border-blue-600"
//                 : "bg-gray-100 text-gray-700 border-gray-300"
//             }`}
//           >
//             <span
//               className={`w-6 h-6 mr-2 border-2 border-blue-600 rounded-full flex items-center justify-center ${
//                 selectedChannel === label ? "bg-blue-600" : ""
//               }`}
//             >
//               {selectedChannel === label && (
//                 <svg
//                   className="w-4 h-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               )}
//             </span>
//             <span className="text-sm">{label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="px-3 py-2 bg-gray-100 border rounded-lg shadow mt-2 w-[420px]">
//         <h2 className="mt-4 text-black font-semibold text-lg">Features:</h2>
//         <div className="bg-white px-2 py-2 rounded-lg shadow border border-blue-400 w-[390px]">
//           {channelTabs
//             .filter(({ label }) => label === selectedChannel)
//             .map(({ label, content }) => (
//               <div key={label}>
//                 <button className="text-md font-semibold text-black bg-blue-200 p-1 rounded-md">
//                   {label}
//                 </button>
//                 <ul className="text-xs mt-1 text-gray-500 space-y-1">
//                   <li>✓ {content}</li>
//                 </ul>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };


const ChannelToggleTabs = ({ channelFeatures, channelTabs, selectedChannel, setSelectedChannel, selected, setSelected }) => {


  // Allow only two tabs to be selected at a time
  const handleToggle = (label) => {
    setSelected((prev) => {
      if (prev.includes(label)) {
        // Deselect tab
        return prev.filter((tab) => tab !== label);
      } else {
        if (prev.length < 2) {
          // Add tab if less than 2 selected
          return [...prev, label];
        } else {
          // Remove the earliest selected tab and add the new one
          return [prev[1], label];
        }
      }
    });
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        {channelTabs.map(({ label }) => (
          <button
            key={label}
            onClick={() => {
              handleToggle(label)
              // setSelectedChannel(label)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${selected.includes(label)
                ? "text-gray-700 border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
          >
            <span
              className={`w-6 h-6 mr-2 border-2 border-blue-600 rounded-full flex items-center justify-center ${selected.includes(label) ? "bg-blue-600" : ""
                }`}
            >
              {selected.includes(label) && (
                <svg
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {/* <div className="px-3 py-2 bg-gray-100 border rounded-lg shadow mt-2 w-[420px]">
        <h2 className="mt-4 text-black font-semibold text-lg">Features:</h2>
        <div className="bg-white px-2 py-2 rounded-lg shadow border border-blue-400 grid grid-cols-2 gap-3 w-[390px]">
          {channelTabs
            .filter(({ label }) => selected.includes(label))
            .map(({ label, content }) => (
              <div key={label} >
                <button className="text-md font-semibold text-black bg-blue-200 p-1 rounded-md cursor-pointer" onClick={()=>setSelectedChannel(label)}>
                  {label}
                </button>
                <ul className="text-xs mt-1 text-gray-500 space-y-1">
                  <li>✓ {content}</li>
                </ul>
              </div>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default ChannelToggleTabs;
