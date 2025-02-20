import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainlayout from '../../mainlayout/Mainlayout';
import Dashboard from '../../dashboard/Dashboard';
import ManageTemplate from '../../whatsapp/managetemplate/Managetemplate';
import Whatsappcreatetemplate from '../../whatsapp/whatsappcreatetemplate/whatsappcreatetemplate';
import WhatsappLaunchCampaign from '../../whatsapp/whatsappLaunchCampaign/WhatsappLaunchCampaign';
import WhatsappLiveChat from '../../whatsapp/livechat/WhatsappLiveChat';
import WhatsappManageCampaign from '../../whatsapp/whatsappManageCampaign/WhatsappManageCampaign';
import WhatsappManageOptin from '../../whatsapp/whatsappManageOptin/WhatsappManageOptin';
import WhatsappChatWidget from '../../whatsapp/WhatsappChatWidget/WhatsappChatWidget';
import WhatsappQrCode from '../../whatsapp/whatsappQrcode/WhatsappQrCode';
import WhatsappLiveChatSettings from '../../whatsapp/whatsappLiveChatSetting/WhatsappLiveChatSettings';
import WhatsappManageWaba from '../../whatsapp/whatsappManageWaba/WhatsappManageWaba';
import WhatsappConversation from '../../whatsapp/whatsappConversation/WhatsappConversation';
import ProfilePage from '../../mainlayout/navbar/pages/Profile';

import Dummy from '../../dummy/Dummy';


const Approutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Mainlayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/managetemplate" element={<ManageTemplate />} />
                <Route path="/createtemplate" element={<Whatsappcreatetemplate />} />
                <Route path="/wlaunchcampaign" element={<WhatsappLaunchCampaign />} />
                <Route path="/wlivechat" element={<WhatsappLiveChat />} />
                <Route path="/wmanagecampaign" element={<WhatsappManageCampaign />} />
                <Route path="/wmanageoptin" element={<WhatsappManageOptin />} />
                <Route path="/wchatwidget" element={<WhatsappChatWidget />} />
                <Route path="/wqrcode" element={<WhatsappQrCode />} />
                <Route path="/wlcsetting" element={<WhatsappLiveChatSettings />} />
                <Route path="/wmanagewaba" element={<WhatsappManageWaba />} />
                <Route path="/wwhatsappconversation" element={<WhatsappConversation />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/dummy" element={<Dummy />} />

            <Route path="*" element={
                <div className='flex items-center justify-center min-h-[100vh]'>
                    <span className="text-3xl text-gray-700 font-semibold">
                        404 Not Found
                    </span>
                </div>
            }
            />
        </Routes>
    )
}

export default Approutes


