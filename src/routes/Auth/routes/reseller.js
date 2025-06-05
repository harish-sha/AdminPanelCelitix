export const resellerItems = [
  { name: "Home", links: "/", roles: ["ADMIN"] },
  {
    name: "User Management",
    links: ["/manageuser", "/manageadduser"],
    roles: ["ADMIN"],
  },
  {
    name: "Reports",
    links: [
      {
        id: "1",
        links: ["/smsreports"],
      },
      {
        id: "2",
        links: ["/wmanagecampaign", "/apicampaigninfo"],
      },
      {
        id: "3",
        links: ["/rcsdeliverycampaigndetails", "/rcsdeliveryreport"],
      },
      {
        id: "7",
        links: [],
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
