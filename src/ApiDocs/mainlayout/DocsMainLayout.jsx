import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import DocsSidebar from "./sidebar/DocsSidebar";
import DocsNavbar from "./navbar/DocsNavbar";
import { useTheme } from "../context/ThemeContext";
import { FaBars } from "react-icons/fa";

const DocsMainLayout = () => {
  const scrollableContainerRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const { isDarkMode } = useTheme();

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 1024;
      setIsMobile(isNowMobile);
      if (isNowMobile) setIsCollapsed(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // <div
    //   className={`h-screen flex flex-col ${
    //     isDarkMode ? "bg-gray-800 text-white" : "bg-[#eeeeee] text-black"
    //   }`}
    // >
    //   <DocsNavbar />
    //   {isMobile && isCollapsed && (
    //     <button
    //       id="mobile button"
    //       onClick={() => setIsCollapsed((prev) => !prev)}
    //       className={` ${
    //         isDarkMode ? "bg-[#eeeeee] text-black" : "bg-gray-800 text-white"
    //       } fixed top-18 left-4 z-50 text-xl p-1 rounded-md shadow-md md:hidden`}
    //     >
    //       <FaBars />
    //     </button>
    //   )}

    //   <div className="flex flex-1 overflow-hidden relative">
    //     <div
    //       className={`
    //         transition-all duration-300
    //         ${
    //           isMobile
    //             ? "fixed z-40 top-14 left-0 h-[calc(100vh-3.5rem)]"
    //             : "relative"
    //         }
    //       `}
    //     >
    //       <DocsSidebar
    //         isCollapsed={isCollapsed}
    //         setIsCollapsed={setIsCollapsed}
    //         isMobile={isMobile}
    //       />
    //     </div>

    //     <div
    //       className={`flex-1 transition-all duration-300 overflow-auto ${
    //         !isMobile ? (isCollapsed ? "ml-0" : "ml-0.1") : ""
    //       }`}
    //     >
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
    <div
      className={`h-screen flex flex-col ${isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
        }`}
    >
      <DocsNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className="flex flex-1 overflow-hidden ">
        <DocsSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={isMobile}
        />
        <div
          className={`flex-1 transition-all duration-300 overflow-auto lg:rounded-tl-3xl rounded-tr-3xl ${isMobile ? "ml-0" : isCollapsed ? "ml-16" : "ml-60"
            }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DocsMainLayout;
