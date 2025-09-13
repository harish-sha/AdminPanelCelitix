import { FaHome, FaSignOutAlt, FaWhatsapp } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { SiGoogleauthenticator } from "react-icons/si";
import { LuMessageSquareMore } from "react-icons/lu";

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

export const resellerItems = [
  {
    id: "",
    name: "Home",
    icon: <FaHome />,
    label: "Home",
    type: "single",
    to: "/",
    roles: ["ADMIN", "AGENT"],
  },
  {
    id: "",
    name: "User Management",
    icon: <IoWalletOutline />,
    label: "User Management",
    type: "dropdown",
    links: [
      { to: "/manageuser", label: "Manage User" },
      // { to: "/managesalesperson", label: "Manage Sales Person" },
    ],
    roles: ["ADMIN"],
  },
  {
    id: "",
    name: "Reports",
    icon: <img src={numberlookup} className="w-4 h-4" />,
    label: "Reports",
    type: "dropdown",
    links: [
      { to: "/smsreports", label: "SMS", id: "1" },
      { to: "/rcsdeliveryreport", label: "RCS", id: "3" },
      { to: "/wmanagecampaign", label: "WHATSAPP", id: "2" },
      { to: "/obdmanagecampaign", label: "OBD", id: "7" },
      { to: "/obdCampaignDetailslog", label: "OBD", isHide: true, id: "7" },
      {
        to: "/rcsdeliverycampaigndetails",
        label: "Delivery Campaign Report",
        isHide: true,
        id: "3",
      },
      { to: "/smscampaigndetailsreport", label: "Create Bot", isHide: true },
      { to: "/apicampaigninfo", label: "apicampaigninfo", isHide: true },
    ],
    roles: ["ADMIN"],
  },
  {
    id: "",
    name: "managefunds",
    icon: <IoWalletOutline />,
    label: "Manage Funds",
    type: "dropdown",
    links: [
      { to: "/recharge", label: "Recharge" },
      { to: "/user/transactions", label: "User Transaction History" },
    ],
    roles: ["ADMIN"],
  },

  // {
  //   id: "",
  //   name: "Managecontacts",
  //   icon: <GroupOutlinedIcon fontSize="20" />,
  //   label: "Manage Contacts",
  //   type: "single",
  //   to: "/managecontacts",
  //   roles: ["ADMIN", "DIRECTUSER"],
  // },
  // {
  //   id: "",
  //   name: "CallBack",
  //   // icon: <MdOutlineEmail />,
  //   icon: <img src={callback} className="w-4.5 h-4.5" />,
  //   label: "Callback",
  //   type: "dropdown",
  //   links: [
  //     { to: "/callback", label: "Call Back" },
  //     { to: "/addcallback", label: "Add Call Back", isHide: true },
  //     { to: "/editcallback", label: "Edit Call Back", isHide: true },
  //   ],
  //   roles: [],
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
];
