import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// mainlayout
import Mainlayout from "@/mainlayout/Mainlayout";

// dashboard
import Dashboard from "@/dashboard/Dashboard";
import ResellerDashboard from "@/dashboard/ResellerDashboard";

// Whatsapp
import ManageTemplate from "@/whatsapp/managetemplate/Managetemplate";
import WhatsappLaunchCampaign from "@/whatsapp/whatsappLaunchCampaign/WhatsappLaunchCampaign";
import WhatsappLiveChat from "@/whatsapp/livechat/WhatsappLiveChat";
import WhatsappManageCampaign from "@/whatsapp/whatsappManageCampaign/WhatsappManageCampaign";
import WhatsappManageOptin from "@/whatsapp/whatsappManageOptin/WhatsappManageOptin";
import WhatsappChatWidget from "@/whatsapp/WhatsappChatWidget/WhatsappChatWidget";
import WhatsappQrCode from "@/whatsapp/whatsappQrcode/WhatsappQrCode";
import WhatsappLiveChatSettings from "@/whatsapp/whatsappLiveChatSetting/WhatsappLiveChatSettings";
import WhatsappManageWaba from "@/whatsapp/whatsappManageWaba/WhatsappManageWaba";
import WhatsappConversation from "@/whatsapp/whatsappConversation/WhatsappConversation";
import CampaignDetailsReport from "@/whatsapp/whatsappManageCampaign/CampaignDetailsReport";
import ManageAgent from "@/whatsapp/manageagent/ManageAgent";
import WhatsappBot from "@/whatsapp/WhatsappBot/WhatsappBot";
import CreateWhatsAppBot from "@/whatsapp/WhatsappBot/component/createBot";
import { ApiCampaignInfo } from "@/whatsapp/whatsappManageCampaign/components/page/ApiCampaignInfo";
import WhatsappFlows from "@/whatsapp/whatsappFlows/Pages/WhatsappFlows";
import FlowCreationPage from "@/whatsapp/whatsappFlows/Pages/FlowCreationPage";

// manage funds
import Recharge from "@/managefunds/recharge/Recharge";
import Transactions from "@/managefunds/transactions/Transactions";

// manage contacts
import ManageContacts from "@/managecontacts/ManageContacts";

// profile
import Settings from "@/profile/pages/Settings";
import ProfilePage from "@/profile/pages/Profile";
import LoginIpDetails from "@/profile/pages/LoginIpDetails";
import WhatsappCreateTemplate from "@/whatsapp/whatsappcreatetemplate/WhatsappCreateTemplate";

// Admin
import ManageUser from "@/admin/manageUser/ManageUser";
import ManageDltTemplate from "@/admin/manageDltTemplate/ManageDltTemplate";
import ManageVoiceClips from "@/admin/manageVoiceClips/ManageVoiceClips";
import ManagePlan from "@/admin/managePlan/ManagePlan";
import AccountManager from "@/admin/accountManager/AccountManager";
import GraphMain from "@/admin/graphMain/GraphMain";
import GraphUserWise from "@/admin/graphUserWise/GraphUserWise";
import ManageSMPP from "@/admin/manageSMPP.jsx/ManageSMPP";
import ManagePrefix from "@/admin/managePrefix/managePrefix";
import Blacklist from "@/admin/blacklist/blacklist";
import ManageNotifications from "@/admin/manageNotifications.jsx/manageNotifications";
import ManageRouting from "@/admin/manageRouting/ManageRouting";
import AddUser from "@/admin/manageUser/pages/AddUser";
import AddService from "@/admin/manageSMPP.jsx/pages/AddService";
import AddRouting from "@/admin/manageRouting/pages/AddRouting";
import EditRouting from "@/admin/manageRouting/pages/EditRouting";
import SMPPErrorCode from "@/admin/smmpErrorCode/SMPPErrorCode";
import AddOperator from "@/admin/managePrefix/pages/AddOperator";
import CreateWhatsappTemplateAdmin from "@/admin/createWhatsappTemplate/CreateWhatsappTemplateAdmin";

// sms
import SmsReports from "@/sms/smsReports/SmsReports";
import SendSms from "@/sms/smsSend/SendSms";
import SmsDLTtemplate from "@/sms/smsDlttemplate/SmsDLTtemplate";
import SmsWishManagement from "@/sms/smsWishManagement/SmsWishManagement";
import Smscampaigndetaillogs from "@/sms/smsReports/pages/smscampaigndetaillogs";
import SmsAttachmentdetaillog from "@/sms/smsReports/pages/SmsAttachmentdetaillog";

// RCS
import SendRcs from "@/rcs/SendRcs/SendRcs";
import ManageTemplateRcs from "@/rcs/manageTemplate/ManageTemplateRcs";
import SuggestionReportRcs from "@/rcs/suggestionReport/SuggestionReportRcs";
import DeliveryreportRcs from "@/rcs/deliveryReport/DeliveryreportRcs";
import ManageBotRcs from "@/rcs/manageBot/ManageBotRcs";
import AddTemplateRcs from "@/rcs/manageTemplate/pages/AddTemplateRcs";
import RcsLiveChat from "@/rcs/rcslivechat/RcsLiveChat";
import CampaignDeliveryReportDetails from "@/rcs/deliveryReport/components/CampaignDeliveryReportDetails";

// Download
import Download from "@/profile/pages/Download";

// Two-Way-SMS
import TwowayMangeKeyword from "@/twowaysms/twowayMangeKeyword/TwowayMangeKeyword";
import TwowayReports from "@/twowaysms/twowayReports/TwowayReports";
import TwowayIntegration from "@/twowaysms/twowayIntegration/TwowayIntegration";

// Cick To Call
import ClickToSetting from "@/clicktwocall/clickToSetting/ClickToSetting";
import ClickToHistory from "@/clicktwocall/clickToHistory/ClickToHistory";

// IBD
import CallHistoryIBD from "@/ibd/ibdCallHistory/CallHIstoryIBD";
import IVRFlowIBD from "@/ibd/ibdIVRFlow/IVRFlowIBD";
import ManageExecutiveIBD from "@/ibd/ibdManageExecutive/ManageExecutiveIBD";
import SettingIBD from "@/ibd/ibdSettings/SettingIBD";

// OBD
import ObdCreateCampaign from "@/obd/obdcreatecampaign/ObdCreateCampaign";
import ObdManageVoiceClips from "@/obd/managevoiceclips/ObdManageVoiceClips";
import ObdIntegration from "@/obd/obdmanageinteration/ObdIntegration";
import ObdCampaignReports from "@/obd/obdManageCampaign/ObdCampaignReports";

// missed call
import HistoryMissedCall from "@/missedcall/missedCallHistory/HistoryMissedCall";
import MissedCallSettings from "@/missedcall/missedCallSettings/MissedCallSettings";

// App Authenticator
import AppauthenticatorReports from "@/appauthenticator/authenticatorreports/AppauthenticatorReports";
import AuthenticatorSetting from "@/appauthenticator/authenticatorsettings/AuthenticatorSetting";

// Email
import EmailReport from "@/email/emailreport/EmailReport";
import EmailTemplate from "@/email/emailtemplate/EmailTemplate";

// Number Lookup
import HlrLookup from "@/numberlookup/hlrlookup/HlrLookup";
import HlrLookupReports from "@/numberlookup/hlrlookupreports/HlrLookupReports";

// Callback
import Callback from "@/callback/Callback";
import { AddCallback } from "@/callback/page/addCallback";
import { EditCallback } from "@/callback/page/editCallback";

// Tag Manager

// Not Found Page
import PageNotFound from "@/NotFound/PageNotFound";

// dummy
import Dummy from "../../dummy/Dummy";
import Arihant from "../../random/arihant";
import TagManager from "@/tagmanager/TagManager";

const Approutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>

        {/* dashboard */}
        {/* <Route index element={<Dashboard />} /> */}
        <Route index element={<ResellerDashboard />} />
        {/* <Route path="resellerdash" element={<ResellerDashboard />} /> */}

        {/* admin */}
        <Route path="manageuser" element={<ManageUser />} />
        <Route path="manageadduser" element={<AddUser />} />
        <Route path="managedlttemplate" element={<ManageDltTemplate />} />
        <Route path="managevoiceclips" element={<ManageVoiceClips />} />
        <Route path="manageplan" element={<ManagePlan />} />
        <Route path="accountmanager" element={<AccountManager />} />
        <Route path="GraphMain" element={<GraphMain />} />
        <Route path="graphuserwise" element={<GraphUserWise />} />
        <Route path="manageSMPP" element={<ManageSMPP />} />
        <Route path="managerouting" element={<ManageRouting />} />
        <Route path="manageprefix" element={<ManagePrefix />} />
        <Route path="blacklist" element={<Blacklist />} />
        <Route path="managenotifications" element={<ManageNotifications />} />
        <Route path="addrouting" element={<AddRouting />} />
        <Route path="editrouting" element={<EditRouting />} />
        <Route path="SMPPerrorcode" element={<SMPPErrorCode />} />
        <Route path="addservice" element={<AddService />} />
        <Route path="addoperator" element={<AddOperator />} />
        <Route
          path="createwhatsapptemplateadmin"
          element={<CreateWhatsappTemplateAdmin />}
        />

        {/* SMS */}
        <Route path="sendsms" element={<SendSms />} />
        <Route path="smsreports" element={<SmsReports />} />
        <Route
          path="smscampaigndetaillogs"
          element={<Smscampaigndetaillogs />}
        />
        <Route
          path="smsAttachmentdetaillog"
          element={<SmsAttachmentdetaillog />}
        />
        <Route path="smsdlttemplates" element={<SmsDLTtemplate />} />
        <Route path="smswishmanagement" element={<SmsWishManagement />} />

        {/* Two-Way-SMS */}
        <Route path="managekeywords" element={<TwowayMangeKeyword />} />
        <Route path="twowayreports" element={<TwowayReports />} />
        <Route path="twowayintegration" element={<TwowayIntegration />} />

        {/* whatsapp */}
        <Route path="managetemplate" element={<ManageTemplate />} />
        <Route path="createtemplate" element={<WhatsappCreateTemplate />} />
        <Route path="wlaunchcampaign" element={<WhatsappLaunchCampaign />} />
        <Route path="wlivechat" element={<WhatsappLiveChat />} />
        <Route path="wmanagecampaign" element={<WhatsappManageCampaign />} />
        <Route path="wmanageoptin" element={<WhatsappManageOptin />} />
        <Route path="wchatwidget" element={<WhatsappChatWidget />} />
        <Route path="wqrcode" element={<WhatsappQrCode />} />
        <Route path="wlcsetting" element={<WhatsappLiveChatSettings />} />
        <Route path="wmanagewaba" element={<WhatsappManageWaba />} />
        <Route
          path="wwhatsappconversation"
          element={<WhatsappConversation />}
        />
        <Route
          path="wcampaigndetailsreport"
          element={<CampaignDetailsReport />}
        />
        <Route
          path="wcampaigndetailsreport"
          element={<CampaignDetailsReport />}
        />
        <Route path="wwhatsappmanageagent" element={<ManageAgent />} />
        <Route path="wwhatsappbot" element={<WhatsappBot />} />
        <Route path="createwhatsappbot" element={<CreateWhatsAppBot />} />
        <Route path="apicampaigninfo" element={<ApiCampaignInfo />} />
        <Route path="wwhatsappflows" element={<WhatsappFlows />} />
        <Route path="wflowcreation" element={<FlowCreationPage />} />

        {/* RCS */}
        <Route path="sendrcs" element={<SendRcs />} />
        <Route path="rcsmanagetemplate" element={<ManageTemplateRcs />} />
        <Route path="rcsaddtemplatercs" element={<AddTemplateRcs />} />
        <Route path="rcssuggestionreport" element={<SuggestionReportRcs />} />
        <Route path="rcsdeliveryreport" element={<DeliveryreportRcs />} />
        <Route
          path="rcsdeliverycampaigndetails"
          element={<CampaignDeliveryReportDetails />}
        />
        <Route path="rcsmanagebot" element={<ManageBotRcs />} />
        {/* <Route path="rcslivechats" element={<RcsLiveChat />} /> */}

        {/* profile */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="download" element={<Download />} />
        <Route path="loginIpdetails" element={<LoginIpDetails />} />

        {/* Settings */}
        <Route path="settings" element={<Settings />} />

        {/* manage funds */}
        <Route path="recharge" element={<Recharge />} />
        <Route path="transactions" element={<Transactions />} />

        {/* manage contacts */}
        <Route path="managecontacts" element={<ManageContacts />} />

        {/* Click To Call */}
        <Route path="clicktosettings" element={<ClickToSetting />} />
        <Route path="clicktohistory" element={<ClickToHistory />} />

        {/* IBD */}
        <Route path="ibdcallhistory" element={<CallHistoryIBD />} />
        <Route path="ibdivrflow" element={<IVRFlowIBD />} />
        <Route path="ibdmanageexecutive" element={<ManageExecutiveIBD />} />
        <Route path="ibdsettings" element={<SettingIBD />} />

        {/* OBD */}
        <Route path="/obdcreatecampaign" element={<ObdCreateCampaign />} />
        <Route path="/obdmanagevoiceclips" element={<ObdManageVoiceClips />} />
        <Route path="/obdIntegration" element={<ObdIntegration />} />
        <Route path="/obdmanagecampaign" element={<ObdCampaignReports />} />

        {/* MissedCall */}
        <Route path="/missedcallhistory" element={<HistoryMissedCall />} />
        <Route path="/missedcallsettings" element={<MissedCallSettings />} />

        {/* Number Lookup */}
        <Route path="/hlrlookup" element={<HlrLookup />} />
        <Route path="/lookupreports" element={<HlrLookupReports />} />

        {/* Callback */}
        <Route path="/callback" element={<Callback />} />
        <Route path="/addcallback" element={<AddCallback />} />
        <Route path="/editcallback" element={<EditCallback />} />

        {/* Tag Manager */}
        <Route path="/tagmanager" element={<TagManager />} />

        {/* Appauthenticator */}
        <Route path="/authreports" element={<AppauthenticatorReports />} />
        <Route path="/authsettings" element={<AuthenticatorSetting />} />

        {/* Email */}
        <Route path="/emailtemplate" element={<EmailTemplate />} />
        <Route path="/emailreports" element={<EmailReport />} />
      </Route>

      <Route path="dummy" element={<Dummy />} />
      <Route path="arihant" element={<Arihant />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Approutes;
