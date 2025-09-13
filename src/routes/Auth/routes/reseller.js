export const resellerItems = [
  { name: "Home", links: "/", roles: ["ADMIN"] },
  {
    name: "User Management",
    links: [
      "/manageuser",
      "/manageadduser",
      "/managesalesperson",
      "/addsalesuser",
    ],
    roles: ["ADMIN"],
  },
  {
    name: "Reports",
    links: [
      "/smsreports",
      "/rcsdeliveryreport",
      "/wmanagecampaign",
      "/rcsdeliverycampaigndetails",
      "/apicampaigninfo",
      "/obdmanagecampaign",
      "/obdCampaignDetailslog",
      "/smscampaigndetailsreport",
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
