import React, { useState } from 'react';
import { MdVerifiedUser, MdLockOutline, MdOutlineZoomOutMap } from 'react-icons/md';
import { FaEdit } from "react-icons/fa";
import { motion } from 'framer-motion';

const predefinedTemplates = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Template ${i + 1}`,
  type: i % 2 === 0 ? 'Transactional' : 'Authentication',
  description: 'This is a beautifully crafted email template to engage your users effectively.',
  icon: i % 2 === 0 ? <MdVerifiedUser className="text-white text-2xl" /> : <MdLockOutline className="text-white text-2xl" />,
}));

const EmailLibrary = () => {
  const [selectedType, setSelectedType] = useState("All");

  const filteredTemplates = selectedType === "All"
    ? predefinedTemplates
    : predefinedTemplates.filter(t => t.type === selectedType);

  return (
    <div className="p-6 bg-gradient-to-b from-slate-50 via-white to-slate-100 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-4 text-gray-800 text-center playf"
      >
        Explore Our Email Templates
      </motion.h2>
      <div className="flex justify-center mb-6 gap-4 flex-wrap">
        {['All', 'Transactional', 'Authentication'].map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium shadow-md transition-all duration-300 ${selectedType === type ? 'bg-[#578FCA] hover:bg-[#3674B5] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
          >
            {type}
          </button>
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 backdrop-blur-sm opacity-0.5 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center gap-3 px-4 hover:border-2 rounded-2xl border-blue-800">
              <div className="px-4 py-1.5 flex items-center gap-3 rounded-full bg-[#578FCA] text-white text-sm font-medium tracking-wider shadow-md hover:bg-[#3674B5] transition-transform transform hover:scale-105"><MdOutlineZoomOutMap fontSize="20px" /> Preview</div>
              <div className="px-4 py-1.5 rounded-full bg-green-500 text-white text-sm font-medium shadow-md hover:bg-green-600 flex items-center gap-3 transition-transform transform hover:scale-105 tracking-wider"><FaEdit fontSize="15px" />
                Edit</div>
            </div>
            <div className="flex flex-col items-center text-center relative z-0">
              <div className={`rounded-full w-14 h-14 flex items-center justify-center mb-3 shadow-inner ${template.type === 'Transactional' ? 'bg-blue-500' : 'bg-green-500'}`}>
                {template.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700">
                {template.title}
              </h3>
              <div className={`text-xs mt-2 mb-3 px-3 py-1 rounded-full font-medium ${template.type === 'Transactional' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                {template.type}
              </div>
              <p className="text-sm text-gray-500">
                {template.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EmailLibrary;