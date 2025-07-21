import React from 'react'
import LeadSidebar from './Components/LeadSidebar'
import Analytics from './pages/Analytics'
import LeadDash from './pages/leaddash/LeadDash'
import LeadMain from './pages/LeadMain'
import { Outlet } from 'react-router-dom'

const LeadManager = () => {
    return (
        <div className='flex h-full overflow-y-hidden border-2 rounded-2xl'>
            <LeadSidebar />
            <div className="flex-1 overflow-hidden ">
                <Outlet />
            </div>
        </div>
    )
}

export default LeadManager
