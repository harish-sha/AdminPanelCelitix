import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Table = ({ columns = [], children }) => {
  const { isDarkMode } = useTheme();

  const baseStyles = isDarkMode
    ? 'bg-gray-800 text-white'
    : 'text-[#333333]';

  return (
    <div className={` rounded-xl overflow-x-auto custom-scrollbar shadow-lg ${baseStyles} `}>
    <table className="  sm:overflow-x-auto lg:overflow-x-auto ">
      <thead className='w-full'>
        <tr className={`text-center  ${baseStyles}`}>
          {columns.map((col, index) => (
            <th
              key={index}
              className={ `${isDarkMode ? "bg-gray-500" : "bg-[#4e6a78] text-white " } w-auto p-1.5 sm:p-1 md:p-3 font-medium break-words border-none`}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={`${isDarkMode ? "bg-gray-700 text-white" : "bg-[#eeeeee] text-gray-800" } text-center `}>{children}</tbody>
    </table>
  </div>
  );
};

export default Table;
