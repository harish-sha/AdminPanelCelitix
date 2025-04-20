import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
    const scrollableContainerRef = useRef(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

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
        <div className="h-screen flex flex-col">
            <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isMobile={isMobile} />

                <div
                    ref={scrollableContainerRef}
                    className={`flex-1 transition-all duration-300 overflow-auto p-3 bg-gray-100 lg:rounded-tl-3xl 
                        ${isMobile ? "ml-0" : isCollapsed ? "ml-16" : "ml-60"}
                    `}
                >
                    <Outlet context={{ scrollableContainerRef }} />
                </div>
            </div>
        </div>
    );
};

export default Mainlayout;





