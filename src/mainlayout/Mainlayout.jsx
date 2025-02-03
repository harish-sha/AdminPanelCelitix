import React, { useRef } from 'react';
import Sidebar from './sidebar/Sidebar'
import Navbar from './navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { SidebarWithBurgerMenu } from './sidebar/SidebarWithBurgerMenu';

const Mainlayout = () => {
    const scrollableContainerRef = useRef(null);
    return (
        <div className="flex h-screen">
            <Sidebar />
            {/* <SidebarWithBurgerMenu /> */}
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div
                    ref={scrollableContainerRef}
                    className="flex-1 p-3 overflow-auto bg-gray-100 outlet-container">
                    <Outlet context={{ scrollableContainerRef }} />
                </div>
            </div>
            {/* <div className="flex-1 flex flex-col">
                <Navbar />
                <div
                    ref={scrollableContainerRef}
                    className="flex-1 p-3 overflow-auto bg-gray-100 outlet-container">
                    <Outlet context={{ scrollableContainerRef }} />
                </div>
            </div> */}
        </div>
    )
}

export default Mainlayout



