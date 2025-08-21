import { useUser } from "@/context/auth";
import { useLocation, Outlet } from "react-router-dom";
import PageNotFound from "@/NotFound/PageNotFound";
import { useMemo } from "react";
import Loader from "@/whatsapp/components/Loader";


export const PermissionRoute = () => {
  const { user, isLoading } = useUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = useMemo(
    () => [
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
          "/rcsmanagebot",
          "/rcslivechats",
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
          "/smscampaigndetailsreport",
          "/createtemplate",
          "/wlcsetting",
          "/wwhatsappflows",
          "/wflowcreation",
          "/apicampaigninfo",
          "/wblockuser",
          "/wmmlite",
          "/wflowedit",
          "/cannedmessagemanager",
          "/edit-template"
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
        name: "Leadmanagement",
        links: ["/leadmanagement/leaddash", "/leadmanagement/leadanalytics", "/leadmanagement/leadforms", "/leadmanagement/leadsettings", "/leadmanagement/leadreports", "/leadmanagement/leadtags", "/leadmanagement/leadmain", "/leadmanagement/leaddash/details"],
        roles: ["ADMIN"],
      },
      {
        name: "OBD",
        links: [
          "/obdcreatecampaign",
          "/obdmanagecampaign",
          "/obdmanagevoiceclips",
          "/obdIntegration",
          "/obdCampaignDetailslog",
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
        name: "ManageContacts",
        links: "/managecontacts",
        roles: ["ADMIN", "DIRECTUSER"],
      },
      {
        name: "Wish Management",
        links: "/smswishmanagement",
        roles: ["ADMIN"],
      },
      {
        name: "apiDocs",
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
          "/tagmanager",
          "/selfrecharge",
          "/unsubscribe"
        ],
        roles: ["ADMIN"],
      },
      {
        name: "Download",
        links: "/dummy",
        roles: ["ADMIN"],
      },
      {
        name: "WorkFlow",
        links: ["/workflow", "/workflow/create", "/workflow/edit"],
        roles: ["ADMIN"],
      },
      {
        name: "chatManagement",
        links: [
          "/liveChatMain/",
          "/combineLiveChatSettings",
          "/liveChatMain/wlivechat",
          "/liveChatMain/rcslivechats",
          "/liveChatMain/instagram",
          "/liveChatMain/messengerchats",
          "/liveChatMain/instachats",
          "/combineLiveChatSettings/wlcsetting",
          "/combineLiveChatSettings/rcslcsetting",
          "/combineLiveChatSettings/instalcsetting",
          "/combineLiveChatSettings/messengerlcsetting",
        ],
        roles: ["ADMIN"],
      },
      {
        name: "WorkFlow",
        links: "/aiconfiguration",
        roles: ["ADMIN"],
      },
    ],
    []
  );

  const privateRoutes = useMemo(() => {
    if (!user) return [];

    if (user.role === "ADMIN") return menuItems;

    if (user.role === "AGENT") {
      return [
        { name: "Home", links: ["/"], roles: ["AGENT"] },
        { name: "WhatsApp LiveChat", links: ["/wlivechat"], roles: ["AGENT"] },
        {
          name: "openRoutes",
          links: ["/profile", "/settings"],
          roles: ["AGENT"],
        },
      ];
    }

    // Default for other roles
    const alwaysInclude = [
      "Home",
      "apiDocs",
      "CallBack",
      "openRoutes",
      "ManageContacts",
      "Leadmanagement",
      "WorkFlow",
      "chatManagement",
      // "E-mail",
    ];

    return menuItems.filter(
      (item) =>
        alwaysInclude.includes(item.name) ||
        user.services.some((service) => service.display_name === item.name)
    );
  }, [user, menuItems]);

  const isPathAllowed = useMemo(() => {
    return privateRoutes.some((item) =>
      Array.isArray(item.links)
        ? item.links.includes(currentPath)
        : item.links === currentPath
    );
  }, [privateRoutes, currentPath]);

  if (isLoading || !user)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (!isPathAllowed) return <PageNotFound />;


  // const getPrivateRoute = (menuItems, userState) => {
  //   let allowedServices = [];

  //   if (userState.role === "ADMIN") {
  //     return menuItems;
  //   }
  //   if (userState.role === "AGENT") {
  //     return [
  //       {
  //         name: "Home",
  //         links: "/",
  //         roles: ["AGENT"],
  //       },
  //       {
  //         name: "WhatsApp LiveChat",
  //         links: "/wlivechat",
  //         roles: ["AGENT"],
  //       },
  //       {
  //         name: "openRoutes",
  //         links: ["/profile", "/settings"],
  //         roles: ["ADMIN"],
  //       },
  //     ];
  //   }

  //   menuItems.forEach((item) => {
  //     // if (item.roles.includes(userState.role)) allowedServices.push(item);
  //     userState.services.forEach((service, index) => {
  //       if (item.name == service.display_name) {
  //         allowedServices.push(item);
  //       }
  //     });
  //     if (item.name === "Home") {
  //       allowedServices.push(item);
  //     }
  //     if (item.name === "apiDocs") {
  //       allowedServices.push(item);
  //     }
  //     if (item.name === "CallBack") {
  //       allowedServices.push(item);
  //     }
  //     if (item.name === "openRoutes") {
  //       allowedServices.push(item);
  //     }
  //     if (item.name === "Manage Contacts") {
  //       allowedServices.push(item);
  //     }
  //     if (item.name === "Leadmanagement") {
  //       allowedServices.push(item);
  //     }
  //     if (item.name === "WorkFlow") {
  //       allowedServices.push(item);
  //     }
  //     if (item.name === "E-mail") {
  //       allowedServices.push(item);
  //     }
  //     if (item.name === "chatManagement") {
  //       allowedServices.push(item);
  //     }
  //     // if (item.name === "Admin") {
  //     //   allowedServices.push(item);
  //     // }
  //   });

  //   return allowedServices;
  // };

  // const privateRoute = getPrivateRoute(menuItems, user);

  // if (!privateRoute.some((item) => item?.links?.includes(currentPath)))
  //   return <PageNotFound />;
  return <Outlet />;
};
