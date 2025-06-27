import { FaHome, FaSignOutAlt, FaWhatsapp } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { SiGoogleauthenticator } from "react-icons/si";
import { LuMessageSquareMore } from "react-icons/lu";
import { LuWorkflow } from "react-icons/lu";
import rcsicon from "../../assets/icons/RCS02.svg";
import twoway from "../../assets/icons/TWOWAY.svg";
import callback from "../../assets/icons/Callback02.svg";
import missedcall from "../../assets/icons/Missedcall2.svg";
import obd from "../../assets/icons/OBD02.svg";
import ibd from "../../assets/icons/IBD02.svg";
import numberlookup from "../../assets/icons/Numberlookup.svg";
import clicktwocall from "../../assets/icons/Click2Call02.svg";
import { LuWandSparkles } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import { MdOutlineEmail } from "react-icons/md";

export const userItems = [
  {
    id: "",
    name: "Home",
    icon: <FaHome />,
    label: "Home",
    type: "single",
    to: "/",
    roles: ["ADMIN", "AGENT"],
  },
  // {
  //   id: "",
  //   name: "ResellerDash",
  //   icon: <FaHome />,
  //   label: "ResellerDash",
  //   type: "single",
  //   to: "/resellerdash",
  // },
  // {
  //     name: 'Dummy',
  //     icon: <BlockOutlinedIcon fontSize='20' />,
  //     label: 'Dummy',
  //     type: "single",
  //     to: "/dummy",
  // },
  {
    id: "1",
    name: "SMS",
    icon: <LuMessageSquareMore />,
    label: "SMS",
    type: "dropdown",
    links: [
      { to: "/sendsms", label: "Send SMS" },
      { to: "/smsreports", label: "Reports" },
      { to: "/smsdlttemplates", label: "DLT Template" },
      {
        to: "/smscampaigndetaillogs",
        label: "Sms Details Logs",
        isHide: true,
      },
      {
        to: "/smsAttachmentdetaillog",
        label: "Sms Details Logs",
        isHide: true,
      },
    ],
    roles: ["ADMIN", "DIRECTUSER"],
  },
  {
    id: "",
    name: "Two Way SMS",
    icon: <img src={twoway} className="w-4 h-4" />,

    label: "Two Way SMS",
    type: "dropdown",
    links: [
      { to: "/managekeywords", label: "Manage Keyword" },
      { to: "/twowayreports", label: "Reports" },
      { to: "/twowayintegration", label: "Integration" },
    ],
    roles: ["ADMIN"],
  },
  {
    id: "3",
    name: "RCS",
    icon: <img src={rcsicon} className="w-4 h-4" />,
    label: "RCS",
    type: "dropdown",
    links: [
      { to: "/sendrcs", label: "Send RCS" },
      { to: "/rcsmanagetemplate", label: "Manage Template" },
      // { to: "/rcslivechats", label: "Live Chats" },
      { to: "/rcssuggestionreport", label: "Suggestion Report" },
      { to: "/rcsdeliveryreport", label: "Delivery Report" },
      {
        to: "/rcsdeliverycampaigndetails",
        label: "Delivery Campaign Report",
        isHide: true,
      },
      {
        to: "/rcsaddtemplatercs",
        label: "RcsAddTemplate",
        isHide: true,
      },
    ],
    roles: ["ADMIN", "DIRECTUSER"],
  },
  {
    id: "2",
    name: "WhatsApp",
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    type: "dropdown",
    links: [
      { to: "/wlaunchcampaign", label: "Launch Campaigns" },
      { to: "/wlivechat", label: "Live Chats" },
      { to: "/wmanagecampaign", label: "Manage Campaigns" },
      { to: "/managetemplate", label: "Manage Templates" },
      // { to: "/wmanageoptin", label: "Manage Optin" },
      // { to: "/wchatwidget", label: "Chat Widget" },
      { to: "/wqrcode", label: "QR Code" },
      { to: "/wlcsetting", label: "Live Chats Settings" },
      { to: "/wmanagewaba", label: "Manage WABA" },
      { to: "/wwhatsappconversation", label: "WhatsApp Conversation" },
      { to: "/wwhatsappmanageagent", label: "Manage Agent" },
      { to: "/wwhatsappbot", label: "Manage Bot" },
      { to: "/wwhatsappflows", label: "Manage Flows" },
      { to: "/wblockuser", label: "Block User" },
      { to: "/cannedmessagemanager", label: "Canned Message" },
      { to: "/createwhatsappbot", label: "Create Bot", isHide: true },
      { to: "/wcampaigndetailsreport", label: "Create Bot", isHide: true },
      { to: "/createtemplate", label: "Create Bot", isHide: true },
      { to: "/wflowcreation", label: "Create Whatsapp Flow", isHide: true },
    ],
    roles: ["ADMIN", "DIRECTUSER"],
  },
  {
    id: "",
    name: "Number Lookup",
    icon: <img src={numberlookup} className="w-4 h-4" />,
    label: "Number Lookup",
    type: "dropdown",
    links: [
      { to: "/hlrlookup", label: "HLR Lookup" },
      { to: "/lookupreports", label: "HLR Lookup Reports" },
    ],
    roles: ["ADMIN"],
  },
  {
    id: "",
    name: "App Authenticator",
    icon: <SiGoogleauthenticator />,
    label: "App Authenticator",
    type: "dropdown",
    links: [
      { to: "/authsettings", label: "Settings" },
      { to: "/authreports", label: "Reports" },
    ],
    roles: ["ADMIN"],
  },
  {
    id: "",
    name: "E-mail",
    icon: <MdOutlineEmail />,
    label: "E-mail",
    type: "dropdown",
    links: [
      { to: "/emailtemplate", label: "Email Template" },
      { to: "/emailreports", label: "Reports" },
    ],
    roles: ["ADMIN"],
  },
  {
    id: "7",
    name: "OBD",
    icon: <img src={obd} className="w-4 h-4" />,
    label: "OBD",
    type: "dropdown",
    links: [
      { to: "/obdcreatecampaign", label: "Create Campaign" },
      { to: "/obdmanagecampaign", label: "Reports" },
      { to: "/obdmanagevoiceclips", label: "Manage Voice Clips" },
      // { to: "/obdIntegration", label: "Integration" },
    ],
    roles: ["ADMIN"],
  },
  {
    id: "",
    name: "IBD",
    icon: <img src={ibd} className="w-4 h-4" />,
    label: "IBD",
    type: "dropdown",
    links: [
      { to: "/ibdcallhistory", label: "Call History" },
      { to: "/ibdmanageexecutive", label: "Manage Executive" },
      { to: "/ibdivrflow", label: "IVR Flow" },
      { to: "/ibdsettings", label: "Settings" },
    ],
    roles: ["ADMIN"],
  },
  {
    id: "",
    name: "Missed Call",
    icon: <img src={missedcall} className="w-4 h-4" />,
    label: "Missed Call",
    type: "dropdown",
    links: [
      { to: "/missedcallhistory", label: "Call History" },
      { to: "/missedcallsettings", label: "Settings" },
    ],
    roles: ["ADMIN"],
  },
  {
    id: "",
    name: "Click-2-Call",
    icon: <img src={clicktwocall} className="w-4 h-4" />,

    label: "Click-2-Call",
    type: "dropdown",
    links: [
      { to: "/clicktohistory", label: "Call History" },
      { to: "/clicktosettings", label: "Settings" },
    ],
    roles: ["ADMIN"],
  },
  // {
  //     name: 'settings',
  //     icon: <IoSettingsOutline />,
  //     label: 'Settings',
  //     type: "dropdown",
  //     links: [
  //         { to: '/mainsettings', label: 'Profile' },
  //         { to: '/mainaccount', label: 'Account' },
  //     ],
  // },
  {
    id: "",
    name: "CallBack",
    // icon: <MdOutlineEmail />,
    icon: <img src={callback} className="w-4.5 h-4.5" />,
    label: "Callback",
    type: "dropdown",
    links: [
      { to: "/callback", label: "Call Back" },
      { to: "/addcallback", label: "Add Call Back", isHide: true },
      { to: "/editcallback", label: "Edit Call Back", isHide: true },
    ],
    roles: [],
  },
  {
    id: "",
    name: "managefunds",
    icon: <IoWalletOutline />,
    label: "Manage Funds",
    type: "dropdown",
    links: [{ to: "/recharge", label: "Recharge" }],
    roles: ["ADMIN"],
  },
  // {
  //   id: "",
  //   name: "admin",
  //   icon: <IoPersonOutline />,
  //   label: "Admin",
  //   type: "dropdown",
  //   links: [
  //     { to: "/manageuser", label: "Manage User" },
  //     { to: "/managedlttemplate", label: "Manage DLT Template" },
  //     { to: "/rcsmanagebot", label: "Manage Bot" },
  //     { to: "/managevoiceclips", label: "Manage Voice Clips" },
  //     { to: "/manageplan", label: "Manage Plan" },
  //     { to: "/accountmanager", label: "Account Manager" },
  //     { to: "/graphmain", label: "Graph Main" },
  //     { to: "/graphuserwise", label: "Graph User Wise" },
  //     { to: "/manageSMPP", label: "Manage SMPP" },
  //     { to: "/managerouting", label: "Manage Routing" },
  //     { to: "/SMPPerrorcode", label: "SMPP Error Code" },
  //     { to: "/manageprefix", label: "Manage Prefix" },
  //     { to: "/blacklist", label: "Blacklist" },
  //     { to: "/managenotifications", label: "ManageNotifications" },
  //     { to: "/CreateWhatsappTemplateAdmin", label: "whatsapp Library" },
  //   ],
  //   roles: ["ADMIN"],
  // },
  {
    id: "",
    name: "Managecontacts",
    icon: <GroupOutlinedIcon fontSize="20" />,
    label: "Manage Contacts",
    type: "single",
    to: "/managecontacts",
    roles: ["ADMIN", "DIRECTUSER"],
  },
  // {
  //   id: "",
  //   name: "Workflow",
  //   icon: <LuWorkflow fontSize="20" style={{ fontSize: "17px" }} />,
  //   label: "Workflow",
  //   type: "single",
  //   to: "/workflow",
  //   // links: [
  //   //   { to: "/workflow", label: "Manage Workflow" },
  //   //   { to: "/workflow/create", label: "Add Workflow", isHide: true },
  //   // ],
  //   roles: ["ADMIN"],
  // },
  // {
  //   id: "",
  //   name: "Wishmanagement",
  //   icon: <LuWandSparkles fontSize="20" style={{ fontSize: "17px" }} />,
  //   label: "Wish Management",
  //   type: "single",
  //   to: "/smswishmanagement",
  //   roles: ["ADMIN"],
  // },
  // {
  //   id: "",
  //   name: "apiDocs",
  //   icon: <DescriptionOutlinedIcon fontSize="20" />,
  //   label: "API Docs",
  //   type: "single",
  //   onClick: () => navigate("/docs"),
  //   roles: ["ADMIN"],
  // },
  // {
  //     name: 'Logout',
  //     icon: <FaSignOutAlt />,
  //     label: 'Logout',
  //     type: "single",
  //     onClick: handleLogout
  // },
];
