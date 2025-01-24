import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Navbar from './navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div
                    className="flex-1 p-3 overflow-auto bg-gray-100 rounded-l-2xl">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Mainlayout



