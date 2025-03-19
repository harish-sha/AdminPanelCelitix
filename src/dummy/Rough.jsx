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

// Admin
import ManageUser from '../../admin/manageUser/ManageUser';
import ManageDltTemplate from '../../admin/manageDltTemplate/ManageDltTemplate';
import ManageVoiceClips from '../../admin/manageVoiceClips/ManageVoiceClips';
import ManagePlan from '../../admin/managePlan/ManagePlan';
import AccountManager from '../../admin/accountManager/AccountManager';
import GraphMain from '../../admin/graphMain/GraphMain';
import GraphUserWise from '../../admin/graphUserWise/GraphUserWise';
import ManageSMPP from '../../admin/manageSMPP.jsx/ManageSMPP';
import ManagePrefix from '../../admin/managePrefix/managePrefix';
import Blacklist from '../../admin/blacklist/blacklist';
import ManageNotifications from '../../admin/manageNotifications.jsx/manageNotifications';
import ManageRouting from '../../admin/manageRouting/ManageRouting';
import AddUser from '../../admin/manageUser/pages/AddUser';
import SendRcs from '../../rcs/sendRcs/SendRcs';
import ManageTemplateRcs from '../../rcs/manageTemplate/ManageTemplateRcs';
import SuggestionReportRcs from '../../rcs/suggestionReport/SuggestionReportRcs';
import DeliveryreportRcs from '../../rcs/deliveryReport/DeliveryreportRcs';
import ManageBotRcs from '../../rcs/manageBot/ManageBotRcs';
import AddTemplateRcs from '../../rcs/manageTemplate/pages/AddTemplateRcs';
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

                {/* manage funds */}
                <Route path="/recharge" element={<Recharge />} />
                <Route path="/transactions" element={<Transactions />} />

                {/* manage contacts */}
                <Route path="/managecontacts" element={<ManageContacts />} />

                {/* admin */}
                <Route path="/manageuser" element={<ManageUser />} />
                <Route path="/manageadduser" element={<AddUser />} />
                <Route path="/managedlttemplate" element={<ManageDltTemplate />} />
                <Route path="/managevoiceclips" element={<ManageVoiceClips />} />
                <Route path="/manageplan" element={<ManagePlan />} />
                <Route path="/accountmanager" element={<AccountManager />} />
                <Route path="/GraphMain" element={<GraphMain />} />
                <Route path="/graphuserwise" element={<GraphUserWise />} />
                <Route path="/manageSMPP" element={<ManageSMPP />} />
                <Route path="/managerouting" element={<ManageRouting />} />
                <Route path="/SMPPerrorcode" element={<ManageSMPP />} />
                <Route path="/manageprefix" element={<ManagePrefix />} />
                <Route path="/blacklist" element={<Blacklist />} />
                <Route path="/managenotifications" element={<ManageNotifications />} />
                {/* rcs */}
                <Route path="/sendrcs" element={<SendRcs />} />
                <Route path="/rcsmanagetemplate" element={<ManageTemplateRcs />} />
                <Route path="/rcsaddtemplatercs" element={<AddTemplateRcs />} />
                <Route path="/rcssuggestionreport" element={<SuggestionReportRcs />} />
                <Route path="/rcsdeliveryreport" element={<DeliveryreportRcs />} />
                <Route path="/rcsmanagebot" element={<ManageBotRcs />} />
                <Route path="/loginIpdetails" element={<LoginIpDetails />} />

            </Route>
            <Route path="/dummy" element={<Dummy />} />

            <Route path="*" element={
                <div className='flex items-center justify-center min-h-[100vh]'>
                    <span className="text-3xl font-semibold text-gray-700">
                        404 Not Found
                    </span>
                </div>
            }
            />
        </Routes>
    )
}

export default Approutes


