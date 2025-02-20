import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import DocsSidebar from "./sidebar/DocsSidebar";
import DocsNavbar from "./navbar/DocsNavbar";

const DocsMainLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (

        <div className="h-screen flex flex-col">
            <DocsNavbar />
            <div className="flex flex-1 overflow-hidden">
                <DocsSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div className={`flex-1 transition-all duration-300 overflow-auto p-3 bg-gray-100 outlet-container ${isCollapsed ? "ml-16" : "ml-64"
                    }`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DocsMainLayout;




