export const resellerItems = [
  { name: "Home", links: "/", roles: ["ADMIN"] },
  {
    name: "User Management",
    links: ["/manageuser"],
    roles: ["ADMIN"],
  },
  {
    name: "Reports",
    links: [
      "/smsreports",
      "/rcsdeliveryreport",
      "/wmanagecampaign",
      "/rcsdeliverycampaigndetails",
    ],
    roles: ["ADMIN"],
  },
  {
    name: "managefunds",
    links: ["/recharge"],
    roles: ["ADMIN"],
  },
  {
    name: "Managecontacts",
    links: ["/managecontacts"],
    roles: ["ADMIN", "DIRECTUSER"],
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
