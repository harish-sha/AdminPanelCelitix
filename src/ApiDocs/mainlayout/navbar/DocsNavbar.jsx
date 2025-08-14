import { useState, useCallback } from "react";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Dialog } from "primereact/dialog";
import { useMediaQuery, Menu, MenuItem, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';



import { motion, AnimatePresence } from "framer-motion";
// import celitixLogo from "../../assets/images/celitix-cpaas-solution-logo.svg";

// import { FaBars } from "react-icons/fa";
// import { RxCross1 } from "react-icons/rx";

import { themeColors } from "../../themeColors";

import { useTheme } from "../../context/ThemeContext";

// const handleDocsLoginBtn = () => {};

const DocsNavbar = ({ isCollapsed, setIsCollapsed }) => {
  // const [showModal, setShowModal] = useState(false);
  // const [showDropdown, setShowDropdown] = useState(false);
  // const [isCollapsed, setIsCollapsed] = useState(false);
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleSearchdialog, setVisibleSearchdialog] = useState(false);
  const [visibleShortcutdialog, setVisibleShortcutdialog] = useState(false);
 const [isColl , setIsColl] = useState(false) 
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const colors = themeColors(isDarkMode);

  // const handleShowModal = () => setShowModal(true);
  // const handleCloseModal = () => setShowModal(false);

  const handleShowKeyboard = () => setVisibleShortcutdialog(true);

  const handleShowSearch = () => setVisibleSearchdialog(true);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        className={`w-full h-16 flex items-center px-4 ${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-gray-800"
        } `}
      >
        <div className="flex items-center gap-4">
          <input
            className="toggle-checkbox"
            id="toggle"
            type="checkbox"
            checked={isCollapsed}
            onChange={(event) => {
              setIsCollapsed((prev) => !prev);
            }}
          />
          <label className="hamburger" htmlFor="toggle">
            <div className={`bar ${
              isDarkMode ? "bg-white" : "bg-gray-800"
            }`}></div>
            <div className={`bar ${
              isDarkMode ? "bg-white" : "bg-gray-800"
            }`}></div>
            <div className={`bar ${
              isDarkMode ? "bg-white" : "bg-gray-800"
            }`}></div>
          </label>
          <span
            className={`text-lg font-medium tracking-wider lg:block ${
              isDarkMode ? "text-white" : "text-gray-800"
            } `}
          >
            Api Documentation
          </span>
          {/* <img src={celitixLogo} width={120} height={80} alt="Celitix Logo" /> */}
        </div>

        <div className="hidden md:flex items-center rounded h-12 w-auto ml-auto gap-4">
          <div className="flex space-x-1 p-2">
            <button className="py-2 px-1">
              <SearchOutlinedIcon
                sx={{
                  fontSize: "22px",
                }}
                className={`text-xl cursor-pointer ${colors.textPrimary}`}
                onClick={handleShowSearch}
              />
            </button>
            <button className="py-2 px-2" onClick={toggleDarkMode}>
              {isDarkMode ? (
                <LightModeOutlinedIcon
                  sx={{
                    fontSize: "22px",
                  }}
                  className={`text-xl ${colors.textPrimary}`}
                />
              ) : (
                <DarkModeOutlinedIcon
                  sx={{
                    fontSize: "22px",
                  }}
                  className={`text-xl ${colors.textPrimary}`}
                />
              )}
            </button>
            <button className="py-2 px-2" onClick={handleShowKeyboard}>
              <KeyboardOutlinedIcon
                sx={{
                  fontSize: "22px",
                }}
                className={`text-xl cursor-pointer ${
                  colors.textPrimary
                }`}
              />
            </button>
            {/* <div className="relative flex justify-center items-center cursor-pointer group mx-2">
              <span className={`${colors.textPrimary}`}>
                Docs
              </span>
              <div
                className={`absolute left-0 bottom-3 h-0.5 ${
                  isDarkMode ? "bg-white" : "bg-black"
                } w-0 group-hover:w-full transition-all duration-300`}
              ></div>
            </div> */}
            <div className="relative flex items-center justify-center cursor-pointer group mx-2">
              <span
                className={`w-[110px] ${
                  colors.textPrimary
                }`}
              >
                API reference
              </span>
              <div
                className={`absolute left-0 bottom-3 h-0.5  ${
                  isDarkMode ? "bg-white" : "bg-black"
                } w-0 group-hover:w-full transition-all duration-300`}
              ></div>
            </div>
            {/* <button
              className={`relative overflow-hidden px-2 py-2 border rounded-xl group cursor-pointer w-full ${
                colors.textPrimary
              }`}
            >
              <span
                className={`absolute inset-0 
    ${isDarkMode ? "bg-white" : "bg-black"} 
    scale-x-0 origin-left transition-transform duration-300 
    group-hover:scale-x-100 z-0`}
              />
              <span
                className={`relative z-10 transition-colors duration-300 
    ${
      isDarkMode
        ? "text-white group-hover:text-black"
        : "text-black group-hover:text-white"
    }`}
              >
                Log in
              </span>
            </button> */}
          </div>
        </div>

        <div className="md:hidden flex ml-auto">
          <label className="hamburger">
            <input
              type="checkbox"
              checked={isColl}
              onClick={toggleMenu}
              onChange={() => {
                setIsColl((prev) => !prev);
              }}
            />
            <svg viewBox="0 0 32 32">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>
        </div>


<AnimatePresence>
  {isOpen && (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className={`md:hidden absolute -right-3 top-8 rounded w-48 shadow-lg z-50 ${
          isDarkMode ? "bg-gray-500" : "bg-[#cecece]"
        }`}
      >
        <div className="flex flex-col my-6">
          <div className="flex flex-row items-center justify-center  ">
            <button className="py-2 px-3 ">
              <SearchOutlinedIcon
                className={`text-xl cursor-pointer ${colors.textPrimary}`}
                onClick={handleShowSearch}
              />
            </button>
            <button className="py-2 px-3 " onClick={toggleDarkMode}>
              {isDarkMode ? (
                <LightModeOutlinedIcon className="text-xl text-white" />
              ) : (
                <DarkModeOutlinedIcon className="text-xl text-black" />
              )}
            </button>
            <button className="py-2 px-3 " onClick={handleShowKeyboard}>
              <KeyboardOutlinedIcon
                className={`text-xl cursor-pointer ${colors.textPrimary}`}
              />
            </button>
          </div>

          {/* <div className="relative flex justify-center items-center cursor-pointer group my-3">
            <span className={`${colors.textPrimary}`}>Docs</span>
          </div> */}

          <div className="relative flex items-center justify-center cursor-pointer group my-3">
            <span className={`w-[130px] rounded-xl ${colors.textPrimary} border-1 p-2 `}>
              API reference
            </span>
          </div>

          {/* <div className="flex items-center justify-center my-3">
            <button
              className={`w-[150px] relative overflow-hidden px-2 py-2 border rounded-xl group cursor-pointer ${colors.border}`}
            >
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Log in
              </span>
            </button>
          </div> */}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
      </nav>

      <Dialog
        visible={visibleShortcutdialog}
        style={{ width: "25rem" }}
        onHide={() => {
          setVisibleShortcutdialog(false);
        }}
        draggable={false}
        resizable={false}
        contentStyle={{ backgroundColor: '#cecece'  }}
        headerStyle={{ backgroundColor: '#cecece' }}
      >
        <div className="">
          <h1 className="text-center font-semibold text-xl">
            Keyboard Shortcuts
          </h1>

          <div className="my-4 grid grid-cols-2">
            <div className="font-semibold">Ctrl + B</div>
            <div> Sidebar Toggle</div>

            <div className="font-semibold">Ctrl + k </div>
            <div> Search Docs</div>

            <div className="font-semibold">Ctrl + L</div>
            <div> Theme Change</div>

            <div className="font-semibold">Ctrl + Shift + S</div>
            <div>Keyboard Shortcuts</div>
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={visibleSearchdialog}
        style={{ width: "42rem", height:"25rem" }}
        contentStyle={{ backgroundColor: '#cecece'  }}
        headerStyle={{ backgroundColor: '#cecece' }}
        onHide={() => {
          setVisibleSearchdialog(false);
          setSearchQuery("");
        }}
        draggable={false}
        resizable={false}
        closable={false}
        dismissableMask={true}
        position="top"
      >
         <div className="rounded-lg w-full overflow-hidden">
      <div >
        <div className="relative  bg-[#cecece] border-2 border-gray-500 rounded-lg mt-2">
          {/* Search Icon */}
          <div className="bg-[#cecece] absolute inset-y-0 left-1 pl-3 flex items-center pointer-events-none">
            <SearchOutlinedIcon
              className="text-gray-400"
              sx={{ fontSize: 30 }}
            />
          </div>

          {/* Input Field */}
          <input
            type="text"
            className="block w-full pl-12 pr-10 py-2  border-gray-300 rounded-md leading-5 bg-[#cecece] placeholder-gray-500 focus:outline-none"
            placeholder="Search here"
            value={searchQuery}
            onChange={handleSearch}
          />

          {/* Cross Icon (Clear Button) */}
          {searchQuery && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button type="button" onClick={clearSearch} className="focus:outline-none">
                <CloseIcon className="text-gray-600" sx={{ fontSize: 24 }} />
              </button>
            </div>
          )}
        </div>

        {/* Search Results Info */}
        <div className="mt-4 text-gray-600">
          {searchQuery ? (
            <div className="flex items-center justify-center flex-col py-6">
              <SearchOffIcon
                className="text-gray-400 mb-2"
                sx={{ fontSize: '80px' }}
              />
              <p>No results for "{searchQuery}"</p>
            </div>
          ) : (
            <p className="text-center py-6">No recent searches</p>
          )}
        </div>
      </div>
    </div>
      </Dialog>
    </>
  );
};

export default DocsNavbar;
