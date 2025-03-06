import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// mainlayou
import Mainlayout from '../../mainlayout/Mainlayout';

// dashboard
import Dashboard from '../../dashboard/Dashboard';

// Whatsapp
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
import CampaignDetailsReport from '../../whatsapp/whatsappManageCampaign/CampaignDetailsReport';
import ManageAgent from '../../whatsapp/manageagent/ManageAgent';
import WhatsappBot from '../../whatsapp/WhatsappBot/WhatsappBot';

// dummy
import Dummy from '../../dummy/Dummy';

// manage funds
import Recharge from '../../managefunds/recharge/Recharge';
import Transactions from '../../managefunds/transactions/Transactions';

// manage contacts
import ManageContacts from '../../managecontacts/ManageContacts';

// profile
import Settings from '../../profile/pages/Settings';
import ProfilePage from "../../profile/pages/Profile"
import LoginIpDetails from '../../profile/pages/LoginIpDetails';


const Approutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Mainlayout />}>
                {/* dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* whatsapp */}
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
                <Route path="/wcampaigndetailsreport" element={<CampaignDetailsReport />} />
                <Route path="/wcampaigndetailsreport" element={<CampaignDetailsReport />} />
                <Route path="/wwhatsappmanageagent" element={<ManageAgent />} />
                <Route path="/wwhatsappbot" element={<WhatsappBot />} />

                {/* profile */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/loginIpdetails" element={<LoginIpDetails />} />

                {/* manage funds */}
                <Route path="/recharge" element={<Recharge />} />
                <Route path="/transactions" element={<Transactions />} />

                {/* manage contacts */}
                <Route path="/managecontacts" element={<ManageContacts />} />

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


