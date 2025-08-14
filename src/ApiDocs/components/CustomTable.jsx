import React from 'react';
import { useTheme } from '../context/ThemeContext';

const CustomTable = ({
  columns,
  rows,
  cellStyles = {},
  headerBgColor = "bg-[#4e6a78]",
  headerTextColor = "text-white",
  className
}) => {
  const { isDarkMode } = useTheme();

  return (
    // Add horizontal scrolling on small screens
    <div className="w-full my-4 rounded-lg shadow-lg overflow-x-auto">
      <table
        className={`w-full border-collapse min-w-[640px] sm:min-w-full ${className || ''} ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
      >
        <thead>
          <tr
            className={`${headerBgColor} ${headerTextColor} ${
              isDarkMode ? 'bg-gray-700 text-white' : headerBgColor
            }`}
          >
            {columns.map((column, index) => (
              <th
                key={index}
                className={`p-1.5 sm:p-2 md:p-3 text-left font-medium text-xs sm:text-sm md:text-base ${
                  index === 0
                    ? 'rounded-tl-lg'
                    : index === columns.length - 1
                    ? 'rounded-tr-lg'
                    : ''
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {Object.values(row).map((cell, cellIndex) => {
                // Base cell styling
                let cellClassNames = `p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-800'
                }`;

                // Add border-bottom to all rows except the last one
                if (rowIndex !== rows.length - 1) {
                  cellClassNames += ` ${
                    isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'
                  }`;
                }

                // Apply custom cell styling if the value is in the cellStyles object
                if (typeof cell === 'string' && cellStyles[cell]) {
                  cellClassNames += ` ${cellStyles[cell]} font-medium`;
                }

                return (
                  <td key={cellIndex} className={cellClassNames}>
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;