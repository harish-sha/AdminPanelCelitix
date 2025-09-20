import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { motion, AnimatePresence } from "framer-motion";

const Search = ({ items }) => {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items || []);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!items) return;
    setFilteredItems(items);
  }, [items]);

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
        handleSelect(filteredItems[activeIndex]);
      }
    }
  };

  const handleSelect = (item) => {
    setSearch("");
    setFilteredItems([]);
    setActiveIndex(-1);
    console.log("Navigate to:", item.path);
    if (item.onClick) item.onClick();
  };

  // Highlight matching text
  const highlightText = (text) => {
    const index = text.toLowerCase().indexOf(search.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.substring(0, index)}
        <span className="bg-yellow-200">{text.substring(index, index + search.length)}</span>
        {text.substring(index + search.length)}
      </>
    );
  };

  return (
    <div className="relative z-50 w-full sm:w-80 md:w-96 mx-auto">
      <motion.div
        className="bg-gray-50 px-4 py-2 rounded-full shadow-md border border-gray-200 flex items-center gap-2"
        animate={{ boxShadow: ["0 0 0px rgba(99,102,241,0.6)", "0 0 10px rgba(99,102,241,0.8)", "0 0 0px rgba(99,102,241,0.6)"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <SearchIcon className="text-gray-500 w-5 h-5" />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Search reports, campaigns, dashboards..."
          className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
        />
      </motion.div>

      {/* Dropdown */}
      {search && filteredItems.length > 0 && (
        <AnimatePresence>
          <motion.ul
            key="dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg"
          >
            {filteredItems.map((item, index) => (
              <motion.li
                key={item.path}
                whileHover={{ backgroundColor: "#EEF2FF", color: "#4338CA" }}
                onClick={() => handleSelect(item)}
                className={`px-4 py-2 text-sm sm:text-base cursor-pointer select-none transition-colors duration-150 ${index === activeIndex ? "bg-indigo-100 text-indigo-700" : "text-gray-700"}`}
              >
                {highlightText(item.label)}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Search;
