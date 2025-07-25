export const resellerItems = [
  { name: "Home", links: "/", roles: ["ADMIN"] },
  {
    name: "User Management",
    links: [
      "/manageuser",
      "/manageadduser",
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
      "/addservice",
      "/addrouting",
      "/addoperator",
      "/manageprefix",
      "/blacklist",
      "/managenotifications",
      "/CreateWhatsappTemplateAdmin",
      "/managewabaadmin",
    ],
    roles: ["ADMIN"],
  },
  {
    name: "Reports",
    links: [
      {
        id: "1",
        links: [
          "/smsreports",
          "/smscampaigndetaillogs",
          "/smsAttachmentdetaillog",
        ],
      },
      {
        id: "2",
        links: [
          "/wmanagecampaign",
          "/apicampaigninfo",
          "/wcampaigndetailsreport",
        ],
      },
      {
        id: "3",
        links: ["/rcsdeliverycampaigndetails", "/rcsdeliveryreport"],
      },
      {
        id: "4",
        links: [],
      },
      {
        id: "7",
        links: ["/obdmanagecampaign", "/obdCampaignDetailslog"],
      },
    ],
    roles: ["ADMIN"],
  },
  {
    name: "managefunds",
    links: ["/recharge", "/user/transactions"],
    roles: ["ADMIN"],
  },
  {
    name: "Managecontacts",
    links: ["/managecontacts"],
    roles: ["ADMIN", "DIRECTUSER"],
  },
  {
    name: "Callback",
    links: ["/callback", "/addcallback", "/editcallback"],
    roles: ["ADMIN", "DIRECTUSER"],
  },
  {
    name: "openRoutes",
    links: [
      "/download",
      "/loginIpdetails",
      "/profile",
      "/settings",
      "/transactions",
      "/notification"
    ],
    roles: ["ADMIN"],
  },
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
