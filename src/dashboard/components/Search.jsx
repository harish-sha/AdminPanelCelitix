// import React, { useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// const Search = () => {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const items = [
//     { label: "Home", path: "/home" },
//     { label: "Profile", path: "/profile" },
//     { label: "Settings", path: "/settings" },
//     { label: "Dashboard", path: "/dashboard" },
//     { label: "SMS", path: "/sms" },
//     { label: "Whatsapp", path: "/whatsapp" },
//     { label: "RCS", path: "/rcs" },
//   ];

//   const [filteredItems, setFilteredItems] = useState(items);
//   const [activeIndex, setActiveIndex] = useState(-1);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearch(value);

//     if (value.trim() === "") {
//       setFilteredItems([]);
//     } else {
//       const results = items.filter((item) =>
//         item.label.toLowerCase().includes(value)
//       );
//       setFilteredItems(results);
//       setActiveIndex(-1);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (filteredItems.length === 0) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setActiveIndex((prev) => (prev + 1) % filteredItems.length);
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setActiveIndex((prev) =>
//         prev === 0 ? filteredItems.length - 1 : prev - 1
//       );
//     } else if (e.key === "Enter") {
//       if (activeIndex >= 0 && activeIndex < filteredItems.length) {
//         const selected = filteredItems[activeIndex];
//         setSearch(selected.label);
//         setFilteredItems([]);
//         setActiveIndex(-1);
//         console.log("Navigate to:", selected.path);
//       }
//     }
//   };

//   const handleSelect = (item) => {
//     setSearch(item.label);
//     setFilteredItems([]);
//     setActiveIndex(-1);
//     console.log("Navigate to:", item.path);
//   };

//   return (
//     <div className="relative z-50 order-3 md:order-2 w-full sm:w-80 md:w-96">
//       <div className="bg-gray-50 px-3 sm:px-5 py-2 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition flex items-center justify-between gap-3 w-full">
//         {/* Search input + icon */}
//         <div className="flex items-center gap-2 flex-grow">
//           <SearchIcon className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
//           <input
//             type="text"
//             value={search}
//             onChange={handleSearch}
//             onKeyDown={handleKeyDown}
//             placeholder="Search here"
//             className="bg-transparent outline-none text-gray-600 placeholder-gray-400 w-full text-sm sm:text-base"
//           />
//         </div>

//         {/* Keyboard hint  */}
//         <div className="hidden sm:flex items-center gap-1">
//           <span className="text-xs sm:text-sm text-gray-800 font-semibold">
//             ⌘
//           </span>
//           <span className="text-xs sm:text-sm text-gray-800 font-medium">
//             +
//           </span>
//           <span className="text-xs sm:text-sm text-gray-800 font-medium">
//             K
//           </span>
//         </div>
//       </div>

//       {/* Dropdown */}
//       {search !== "" && filteredItems.length > 0 && (
//         <AnimatePresence>
//           <motion.ul
//             key="dropdown"
//             initial={{ opacity: 0, y: -8, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -8, scale: 0.98 }}
//             transition={{ duration: 0.2, ease: "easeOut" }}
//             className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5"
//           >
//             {filteredItems.map((item, index) => (
//               <motion.li
//                 key={item.path}
//                 whileHover={{
//                   backgroundColor: "#EEF2FF",
//                   color: "#4338CA",
//                 }}
//                 onClick={() => handleSelect(item)}
//                 className={`px-4 py-2 text-sm sm:text-base text-gray-700 cursor-pointer select-none transition-colors duration-150 ease-in-out ${index === activeIndex ? "bg-indigo-100 text-indigo-700" : ""
//                   }`}
//               >
//                 {item.label}
//               </motion.li>
//             ))}
//           </motion.ul>
//         </AnimatePresence>
//       )}
//     </div>
//   );
// };

// export default Search;


import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { motion, AnimatePresence } from "framer-motion";

const Search = ({ items }) => {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items || []);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Typing effect state
  const placeholderTexts = ["Reports", "Campaigns", "Dashboards", "SMS", "Whatsapp"];
  const [placeholder, setPlaceholder] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!items) return;
    setFilteredItems(items);
  }, [items]);

  // Typing effect
  useEffect(() => {
    const typingSpeed = 90; // ms per character
    const pauseDelay = 1000; // ms at end of word

    const handleTyping = () => {
      const currentText = placeholderTexts[textIndex];
      if (!deleting) {
        // Typing
        if (charIndex < currentText.length) {
          setPlaceholder(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Pause before deleting
          setTimeout(() => setDeleting(true), pauseDelay);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setPlaceholder(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setDeleting(false);
          setTextIndex((textIndex + 1) % placeholderTexts.length);
        }
      }
    };

    const timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex]);

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
    <div className="relative w-full sm:w-96 mx-auto">
      {/* Animated circle wrapper */}
      <motion.div
        className="relative rounded-full p-1"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(99,102,241,0.4)",
            "0 0 20px 8px rgba(99,102,241,0.4)",
            "0 0 0 0 rgba(99,102,241,0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Input container */}
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-md">
          <SearchIcon className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            placeholder={search ? "" : `Search ${placeholder}...`}
            className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
          />
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
      </motion.div>

      {/* Dropdown */}
      {search && filteredItems.length > 0 && (
        <AnimatePresence>
          <motion.ul
            key="dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg z-50"
          >
            {filteredItems.map((item, index) => (
              <motion.li
                key={item.path}
                whileHover={{ backgroundColor: "#EEF2FF", color: "#4338CA" }}
                onClick={() => handleSelect(item)}
                className={`px-4 py-2 text-sm sm:text-base cursor-pointer select-none transition-colors duration-150 ${index === activeIndex ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
                  }`}
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
