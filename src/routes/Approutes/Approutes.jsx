import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainlayout from '../../mainlayout/Mainlayout';
import Dashboard from '../../mainlayout/dashboard/Dashboard';
import ManageTemplate from '../../whatsapp/managetemplate/Managetemplate';
import Whatsappcreatetemplate from '../../whatsapp/whatsappcreatetemplate/whatsappcreatetemplate';
import WhatsappLaunchCampaign from '../../whatsapp/whatsappLaunchCampaign/WhatsappLaunchCampaign';


const Approutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Mainlayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/managetemplate" element={<ManageTemplate />} />
                    <Route path="/createtemplate" element={<Whatsappcreatetemplate />} />
                    <Route path="/wlaunchcampaign" element={<WhatsappLaunchCampaign />} />
                </Route>

                <Route path="*" element={
                    <div className='flex items-center justify-center min-h-[100vh]'>
                        <span className="text-3xl text-gray-700 font-semibold">
                            404 Not Found
                        </span>
                    </div>
                }
                />
            </Routes>
        </Router>
    )
}

export default Approutes


