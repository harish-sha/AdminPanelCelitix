import React, { useState } from 'react';

const channelTabs = [
  { label: 'WHATSAPP', content: 'WhatsApp-related data here' },
  { label: 'INSTAGRAM', content: 'Instagram insights here' },
  { label: 'RCS', content: 'RCS metrics and reports' },
  { label: 'EMAIL', content: 'Email campaign data' },
  { label: 'LOOKUP', content: 'Lookup service summary' },
  { label: 'SMS', content: 'SMS reports' },
  { label: 'OBD', content: 'OBD call logs and analytics' },
  { label: 'IBD', content: 'IBD (Inbound Dialer) tracking' },
  { label: 'MISSED CALL', content: 'Missed call alerts & history' },
];

const ChannelToggleTabs = ({ channelFeatures }) => {
  const [selected, setSelected] = useState("WHATSAPP");

  const handleToggle = (label) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((tab) => tab !== label)
        : [...prev, label]
    );
  };


  return (
    <>
      <div className="p-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        {channelTabs.map(({ label }) => (
          <button
            key={label}
            onClick={() => handleToggle(label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${selected.includes(label)
              ? ' text-gray-700 border-blue-600'
              : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}
          >
            <label className="inline-flex items-center cursor-pointer group">
              <span className="w-6 h-6 mr-2 border-2 border-blue-600 rounded-full flex items-center justify-center
                      transition-all duration-300 ease-in-out group-hover:scale-110">
                <input
                  type="checkbox"
                  checked={selected.includes(label)}
                  onChange={() => handleToggle(label)}
                  className="peer hidden"
                />
                <svg
                  className="w-4 h-4 text-blue-600 scale-100 opacity-0 transition-all duration-300 ease-in-out peer-checked:opacity-100"
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
              </span>
              <span className="text-sm text-gray-800">{label}</span>
            </label>

          </button>
        ))}
      </div>

      {/* Content */}
      <div  className="p-4 bg-gray-100 border rounded-lg shadow mt-5 flex flex-wrap gap-3 ">
        <h2 className='mt-4 text-black font-semibold text-lg'> Features: </h2>
        {channelTabs
          .filter(({ label }) => selected.includes(label))
          .map(({ label, content }) => (
            <div
              key={label}
              className='bg-white p-3 rounded-lg shadow border border-blue-400'
            >
              
              <h4 className="text-lg font-semibold text-blue-700">{label}</h4>
              <p className="text-gray- text-sm">{content}</p>
            </div>
          ))}
      </div>
    </div>


    </>
  );
};

export default ChannelToggleTabs;