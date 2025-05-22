import { useUser } from "@/context/auth";
import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import PageNotFound from "@/NotFound/PageNotFound";

export const PermissionRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();
  const menuItems = [
    { name: "Home", links: "/", roles: ["ADMIN"] },
    {
      name: "SMS",
      links: [
        "/sendsms",
        "/smsreports",
        "/smsdlttemplates",
        "/smscampaigndetaillogs",
        "/smsAttachmentdetaillog",
      ],
      roles: ["ADMIN"],
    },
    {
      name: "Two Way SMS",
      links: ["/managekeywords", "/twowayreports", "/twowayintegration"],
      roles: ["ADMIN"],
    },
    {
      name: "RCS",
      links: [
        "/sendrcs",
        "/rcsmanagetemplate",
        "/rcssuggestionreport",
        "/rcsdeliverycampaigndetails",
        "/rcsaddtemplatercs",
        "/rcsdeliveryreport",
      ],
      roles: ["ADMIN"],
    },
    {
      name: "WHATSAPP",
      links: [
        "/wlaunchcampaign",
        "/wlivechat",
        "/wmanagecampaign",
        "/managetemplate",
        "/wqrcode",
        "/wmanagewaba",
        "/wwhatsappconversation",
        "/wwhatsappmanageagent",
        "/wwhatsappbot",
        "/createwhatsappbot",
        "/wcampaigndetailsreport",
        "/createtemplate",
        "/wlcsetting",
        "/wwhatsappflows",
        "/wflowcreation",
        "/wwhatsappflows",
      ],
      roles: ["ADMIN"],
    },
    {
      name: "Number Lookup",
      links: ["/hlrlookup", "/lookupreports"],
      roles: ["ADMIN"],
    },
    {
      name: "App Authenticator",
      links: ["/authsettings", "/authreports"],
      roles: ["ADMIN"],
    },
    {
      name: "E-mail",
      links: ["/emailtemplate", "/emailreports"],
      roles: ["ADMIN"],
    },
    {
      name: "OBD",
      links: [
        "/obdcreatecampaign",
        "/obdmanagecampaign",
        "/obdmanagevoiceclips",
        "/obdIntegration",
      ],
      roles: ["ADMIN"],
    },
    {
      name: "IBD",
      links: [
        "/ibdcallhistory",
        "/ibdmanageexecutive",
        "/ibdivrflow",
        "/ibdsettings",
      ],
      roles: ["ADMIN"],
    },
    {
      name: "Missed Call",
      links: ["/missedcallhistory", "/missedcallsettings"],
      roles: ["ADMIN"],
    },
    {
      name: "Click-2-Call",
      links: ["/clicktohistory", "/clicktosettings"],
      roles: ["ADMIN"],
    },
    {
      name: "CallBack",
      links: ["/callback", "/addcallback", "/editcallback"],
      roles: ["ADMIN"],
    },
    {
      name: "Manage Funds",
      links: ["/recharge"],
      roles: ["ADMIN", "DIRECTUSER"],
    },
    {
      name: "Admin",
      links: [
        "/manageuser",
        "/managedlttemplate",
        "/rcsmanagebot",
        "/managevoiceclips",
        "/manageplan",
        "/accountmanager",
        "/graphmain",
        "/graphuserwise",
        "/manageSMPP",
        "/managerouting",
        "/SMPPerrorcode",
        "/manageprefix",
        "/blacklist",
        "/managenotifications",
        "/CreateWhatsappTemplateAdmin",
      ],
      roles: ["ADMIN"],
    },
    {
      name: "Manage Contacts",
      links: "/managecontacts",
      roles: ["ADMIN", "DIRECTUSER"],
    },
    {
      name: "Wish Management",
      links: "/smswishmanagement",
      roles: ["ADMIN"],
    },
    {
      name: "API Docs",
      links: "/docs",
      roles: ["ADMIN"],
    },
    {
      name: "openRoutes",
      links: [
        "/download",
        "/loginIpdetails",
        "/profile",
        "/settings",
        "/transactions",
      ],
      roles: ["ADMIN"],
    },
    {
      name: "Download",
      links: "/dummy",
      roles: ["ADMIN"],
    },
  ];

  const currentPath = location.pathname;

  const getPrivateRoute = (menuItems, userState) => {
    let allowedServices = [];

    if (userState.role === "ADMIN") {
      return menuItems;
    }
    if (userState.role === "AGENT") {
      return [
        {
          name: "Home",
          links: "/",
          roles: ["AGENT"],
        },
        {
          name: "WhatsApp LiveChat",
          links: "/wlivechat",
          roles: ["AGENT"],
        },
        {
          name: "openRoutes",
          links: [, "/profile", "/settings"],
          roles: ["ADMIN"],
        },
      ];
    }

    menuItems.forEach((item) => {
      // if (item.roles.includes(userState.role)) allowedServices.push(item);
      userState.services.forEach((service, index) => {
        if (item.name == service.display_name) {
          allowedServices.push(item);
        }
      });
      if (item.name === "Home") {
        allowedServices.push(item);
      }
      if (item.name === "apiDocs") {
        allowedServices.push(item);
      }
      if (item.name === "CallBack") {
        allowedServices.push(item);
      }
      if (item.name === "openRoutes") {
        allowedServices.push(item);
      }
      if (item.name === "Manage Contacts") {
        allowedServices.push(item);
      }
    });

    return allowedServices;
  };

  const privateRoute = getPrivateRoute(menuItems, user);

  if (!privateRoute.some((item) => item?.links?.includes(currentPath)))
    return <PageNotFound />;
  return <Outlet />;
};
