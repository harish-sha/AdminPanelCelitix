// import React, { useRef } from 'react';
// import Sidebar from './sidebar/Sidebar'
// import Navbar from './navbar/Navbar'
// import { Outlet } from 'react-router-dom'
// import { SidebarWithBurgerMenu } from './sidebar/SidebarWithBurgerMenu';

// const Mainlayout = () => {
//     const scrollableContainerRef = useRef(null);
//     return (
//         <div className="flex h-screen">
//             <Sidebar />
//             {/* <SidebarWithBurgerMenu /> */}
//             <div className="flex-1 flex flex-col">
//                 <Navbar />
//                 <div
//                     ref={scrollableContainerRef}
//                     className="flex-1 p-3 overflow-auto bg-gray-100 outlet-container">
//                     <Outlet context={{ scrollableContainerRef }} />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Mainlayout


import React, { useState, useRef } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
    const scrollableContainerRef = useRef(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                {/* Main Content (Shifts when Sidebar Collapses) */}
                <div
                    ref={scrollableContainerRef}
                    className={`flex-1 transition-all duration-300 overflow-auto p-3 bg-gray-100 outlet-container ${isCollapsed ? "ml-16" : "ml-64"
                        }`}
                >
                    <Outlet context={{ scrollableContainerRef }} />
                </div>
            </div>
        </div>
    );
};

export default Mainlayout;




