export const themeColors = (isDarkMode) => ({
  border: isDarkMode ? "border-white" : "border-black",
  background: isDarkMode ? "bg-gray-800" : "bg-[#cecece]",
  textPrimary: isDarkMode ? "text-white" : "text-gray-800", // Primary text color
  textSecondary: isDarkMode ? "text-gray-400" : "text-gray-600", // Secondary text color
  hoverText: isDarkMode ? "group-hover:text-black" : "group-hover:text-white",
  hoverBg: isDarkMode ? "group-hover:bg-white" : "group-hover:bg-black",
  tableBorder: isDarkMode ? "border-white" : "border-gray-400",
});