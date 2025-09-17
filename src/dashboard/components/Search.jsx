import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const items = [
    { label: "Home", path: "/home" },
    { label: "Profile", path: "/profile" },
    { label: "Settings", path: "/settings" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "SMS", path: "/sms" },
    { label: "Whatsapp", path: "/whatsapp" },
    { label: "RCS", path: "/rcs" },
  ];

  const [filteredItems, setFilteredItems] = useState(items);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (value.trim() === "") {
      setFilteredItems([]);
    } else {
      const results = items.filter((item) =>
        item.label.toLowerCase().includes(value)
      );
      setFilteredItems(results);
      setActiveIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < filteredItems.length) {
        const selected = filteredItems[activeIndex];
        setSearch(selected.label);
        setFilteredItems([]);
        setActiveIndex(-1);
        console.log("Navigate to:", selected.path);
      }
    }
  };

  const handleSelect = (item) => {
    setSearch(item.label);
    setFilteredItems([]);
    setActiveIndex(-1);
    console.log("Navigate to:", item.path);
  };

  return (
    <div className="relative z-10 order-3 md:order-2 w-full sm:w-80 md:w-96">
      <div className="bg-gray-50 px-3 sm:px-5 py-2 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition flex items-center justify-between gap-3 w-full">
        {/* Search input + icon */}
        <div className="flex items-center gap-2 flex-grow">
          <SearchIcon className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            placeholder="Search here"
            className="bg-transparent outline-none text-gray-600 placeholder-gray-400 w-full text-sm sm:text-base"
          />
        </div>

        {/* Keyboard hint  */}
        <div className="hidden sm:flex items-center gap-1">
          <span className="text-xs sm:text-sm text-gray-800 font-semibold">
            ⌘
          </span>
          <span className="text-xs sm:text-sm text-gray-800 font-medium">
            +
          </span>
          <span className="text-xs sm:text-sm text-gray-800 font-medium">
            K
          </span>
        </div>
      </div>

      {/* Dropdown */}
      {search !== "" && filteredItems.length > 0 && (
        <AnimatePresence>
          <motion.ul
            key="dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5"
          >
            {filteredItems.map((item, index) => (
              <motion.li
                key={item.path}
                whileHover={{
                  backgroundColor: "#EEF2FF",
                  color: "#4338CA",
                }}
                onClick={() => handleSelect(item)}
                className={`px-4 py-2 text-sm sm:text-base text-gray-700 cursor-pointer select-none transition-colors duration-150 ease-in-out ${
                  index === activeIndex ? "bg-indigo-100 text-indigo-700" : ""
                }`}
              >
                {item.label}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Search;
