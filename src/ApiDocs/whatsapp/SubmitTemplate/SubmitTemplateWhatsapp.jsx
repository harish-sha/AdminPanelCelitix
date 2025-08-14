import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "../../context/ThemeContext";
import { themeColors } from "../../themeColors";
import RequestComponent from "../../components/RequestComponent";
import ResponseComponent from "../../components/ResponseComponent";
import BaseurlComponent from "../../components/BaseurlComponent";


import { Link } from "react-router-dom";

const SubmitTemplateWhatsapp = () => {
  const [activeSection, setActiveSection] = useState("text-templates");

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "text-templates", title: "Text Templates" },
    { id: "media-templates", title: "Media Template" },
    { id: "location-template", title: "Location Template" },
    { id: "carousel-template", title: "Carousel Template" },
    {
      id: "limited-time-offer-template",
      title: "Limited Time Offer Template",
    },
    { id: "coupon-code-template", title: "Coupon Code Template" },
    { id: "order-details-template", title: "Order Details Template" },
    { id: "cta-button-template", title: "Call To Action Template" },
    { id: "flows-template", title: "Flows Template" },
    { id: "editing-templates-category", title: "Editing Templates (Category)" },
    {
      id: "editing-templates-components",
      title: "Editing Templates(Component)",
    },
    { id: "get-templates", title: "Get Templates" },
    { id: "get-template-by-id", title: "Get Template by ID (Single)" },
    { id: "compare-templates-only-2", title: "Compare Templates (Only 2)" },
    { id: "deleting-tempaltes-by-id", title: "Deleting Templates (by ID)" },
    { id: "deleting-tempalte-by-name", title: "Deleting Template (by NAME)" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition + 200) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const scrollerPosition = (activeIndex / (sections.length - 1)) * 100;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const HeaderTableColumns = ["Name", "Value"];

  const RequestParameterTextTemplateColumn = [
    "Placeholder",
    "Description",
    "Sample Value",
  ];

  const requestDataTextTemplate = [
    {
      requestPrefix: `{
  "name": "Template_Name",
  "language": "en",
  "category": "MARKETING",
  "components": [
    {
      "type": "BODY",
      "text": "Hi {{1}}, This is a test message",
      "example": {
        "body_text": [
          [
            "John Doe"
          ]
        ]
      }
    }
  ]
}
`,
    },
  ];

  const textTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-type: application/json' \
 `;

  const TextTemplatejsonData = {
    id: "572279198452421",
    status: "PENDING",
    category: "MARKETING",
  };

  const TextTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Mon, 19 Feb 2024 18:06:18 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];

  const RequestParameterMediaTemplateColumn = [
    "Placeholder",
    "Description",
    "Example Value",
  ];

  const requestDataMediaTemplate = [
    {
      requestPrefix: `{
  "name": "TEMPLATE NAME",
  "language": "en",
  "category": "UTILITY",
  "components": [
    {
      "type": "HEADER",
      "format": "DOCUMENT",
      "example": {
        "header_handle": [
          "4::YXBwbGljYXRpb24vcGRm:ARbRac-7KRV919yIfV5nBwdQ7Gg6EQUyWW_BF8TMpBD_vQES-jRDnh_ljDxHQYqm5blYGoXD1jWowPkPTlQ2Pr2XZwOHoFTW2VM5l2EDBkGQBA:e:1705221283:256725303808337:100052252050649:ARa0nL2E0drGk4fXSCs"
        ]
      }
    },
    {
      "type": "BODY",
      "text": "Hello {{1}}. Your account is now LIVE, enjoy our services!",
      "example": {
        "body_text": [
          [
            "Name"
          ]
        ]
      }
    }
  ]
}
`,
    },
  ];

  const mediaTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-type: application/json' \
 `;

  const MediaTemplatejsonData = {
    id: "572279198452421",
    status: "PENDING",
    category: "MARKETING",
  };

  const MediaTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Mon, 19 Feb 2024 18:06:18 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];

  const requestDataLocationTemplate = [
    {
      requestPrefix: `{
  "name": "location_test",
  "language": "en",
  "category": "MARKETING",
  "components": [
    {
      "type": "HEADER",
      "format": "LOCATION"
    },
    {
      "type": "BODY",
      "text": "Hello {{1}}. Your account is now LIVE, enjoy our services!",
      "example": {
        "body_text": [
          [
            "Name"
          ]
        ]
      }
    }
  ]
}

`,
    },
  ];

  const locationTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;

  const LocationTemplatejsonData = {
    id: "1115249146374727",
    status: "PENDING",
    category: "MARKETING",
  };

  const LocationTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Tue, 23 Apr 2024 09:10:08 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];



  const RequestParameterCarouselTemplateColumn = [
    "Placeholder",
    "Description",
    "Example Value",
  ];

  const requestDataCarouselTemplate = [
    {
      requestPrefix: `{
    "name": "summer_carousel_sales_2024_v1",
      "language": "en",
        "category": "MARKETING",
    "components": [
        {
            "type": "BODY",
            "text": "Summer is here, and we have the freshest produce around! Use code {{1}} to get {{2}} off your next order.",
            "example": {
                "body_text": [
                    [
                        "15OFF",
                        "15%"
                    ]
                ]
            }
        },
        {
            "type": "CAROUSEL",
            "cards": [
                {
                    "components": [
                        {
                            "type": "HEADER",
                            "format": "IMAGE",
                            "example": {
                                "header_handle": [
                                    "4::aW1hZ2UvanBlZw==:ARb52CTUac8FTuSZdkoCXGdeoxDZPHtGa3LSZmQjIxGnvDhg3hJQe37IRYld6flatNuZiaa89a6M_23HGH0ylis7w1O6pILkUxR-TrLlKp-mYA:e:1708173546:256725303808337:100052252050649:ARbcwlC3kHgZ7vaMLbQ"
                                ]
                            }
                        },
                        {
                            "type": "BODY",
                            "text": "Rare lemons for unique lemon Tea. Use code {{1}} to get {{2}} off all produce.",
                            "example": {
                                "body_text": [
                                    [
                                        "LEOOFF15",
                                        "15%"
                                    ]
                                ]
                            }
                        },
                        {
                            "type": "BUTTONS",
                            "buttons": [
                                {
                                    "type": "QUICK_REPLY",
                                    "text": "Send more like this"
                                },
                                {
                                    "type": "QUICK_REPLY",
                                    "text": "need price detail"
                                }
                            ]
                        }
                    ]
                },
                {
                    "components": [
                        {
                            "type": "HEADER",
                            "format": "IMAGE",
                            "example": {
                                "header_handle": [
                                    "4::aW1hZ2UvcG5n:ARZrkzRYQS-SePQKO6o4eUFKsYqaEsuBXuuqmE8oJIFOwnrX8-cpujg_887eN0qZPntQnacOHTAZMQuC7WV4nuaJ2S5_9btVL7IJJ34k4f35PA:e:1708174367:256725303808337:100052252050649:ARaGtQPC_FWyQgaXFPk"
                                ]
                            }
                        },
                        {
                            "type": "BODY",
                            "text": "Card 2 Test body {{1}} and {{2}}",
                            "example": {
                                "body_text": [
                                    [
                                        "MELONOFF15",
                                        "15%"
                                    ]
                                ]
                            }
                        },
                        {
                            "type": "BUTTONS",
                            "buttons": [
                                {
                                    "type": "QUICK_REPLY",
                                    "text": "Send more like this"
                                },
                                {
                                    "type": "QUICK_REPLY",
                                    "text": "need price detail"
                                }
                            ]
                        }
                    ]
                },
                {
                    "components": [
                        {
                            "type": "HEADER",
                            "format": "IMAGE",
                            "example": {
                                "header_handle": [
                                    "4::aW1hZ2UvcG5n:ARY9GxwAjfNLo7lg57j3gdQFpPnvckfn4638X_6_orQcqb00wTZHyHpjzQsf1cqhRaVAqRlx9Cp-T_FvOKaOlQ5bZxBYwd-x9Z7JS9I_olarAQ:e:1708174393:256725303808337:100052252050649:ARYn0HTLnFru6DpFe9c"
                                ]
                            }
                        },
                        {
                            "type": "BODY",
                            "text": "Card 3 Test body {{1}} and {{2}}",
                            "example": {
                                "body_text": [
                                    [
                                        "APPLEOFF15",
                                        "15%"
                                    ]
                                ]
                            }
                        },
                        {
                            "type": "BUTTONS",
                            "buttons": [
                                {
                                    "type": "QUICK_REPLY",
                                    "text": "Send more like this"
                                },
                                {
                                    "type": "QUICK_REPLY",
                                    "text": "need price detail"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
`,
    },
  ];

  const carouselTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-type: application/json' \
`;

  const CarouselTemplatejsonData = {
    id: "572279198452421",
    status: "PENDING",
    category: "MARKETING",
  };

  const CarouselTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Mon, 19 Feb 2024 18:06:18 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];


  const requestDataLimitedTimeOfferTemplate = [
    {
      requestPrefix: `

{
  "name": "limited_time_offer",
  "language": "en",
  "category": "marketing",
  "components": [
    {
      "type": "header",
      "format": "image",
      "example": {
        "header_handle": [
          "4::aW1h"
        ]
      }
    },
    {
      "type": "limited_time_offer",
      "limited_time_offer": {
        "text": "Expiring offer!",
        "has_expiration": true
      }
    },
    {
      "type": "body",
      "text": "Good news, {{1}}! Use code {{2}} to get 25% off all Caribbean Destination packages!",
      "example": {
        "body_text": [
          [
            "Harsh",
            "HOTS25"
          ]
        ]
      }
    },
    {
      "type": "buttons",
      "buttons": [
        {
          "type": "copy_code",
          "example": "HOTS25"
        },
        {
          "type": "url",
          "text": "Book now!",
          "url": "https://awesomedestinations.com/offers?code={{1}}",
          "example": [
            "https://awesomedestinations.com/offers?ref=n3mtql"
          ]
        }
      ]
    }
  ]
}
`,
    },
  ];


  const LimitedTimeOfferTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/237518749451250/message_templates' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
  `;


  const LimitedTimeOfferTemplatejsonData = {
    "id": "825263059450263",
    "status": "PENDING",
    "category": "MARKETING"
  };


  const LimitedTimeOfferTemplateResponseheaders = [
    { key: "Content-Type", value: "text/plain; charset=utf-8" },
    { key: "Date", value: "Tue, 23 Apr 2024 06:39:53 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];


  const requestDataCouponCodeTemplate = [
    {
      requestPrefix: `

    {
      "name": "coupon_code_fall2023_25off",
      "language": "en",
      "category": "MARKETING",
      "components": [
        {
          "type": "HEADER",
          "format": "TEXT",
          "text": "Our Fall Sale is on!"
        },
        {
          "type": "BODY",
          "text": "Shop now through November and use code {{1}} to get {{2}} off of all merchandise!",
          "example": {
            "body_text": [
              [
                "25OFF",
                "25%"
              ]
            ]
          }
        },
        {
          "type": "BUTTONS",
          "buttons": [
            {
              "type": "QUICK_REPLY",
              "text": "Unsubscribe"
            },
            {
              "type": "COPY_CODE",
              "example": "250FF"
            }
          ]
        }
      ]
    }
`,
    },
  ]


  const CouponCodeTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
  `;


  const CouponCodeTemplatejsonData = {
    "id": "396116563335401",
    "status": "PENDING",
    "category": "MARKETING"
  };


  const CouponCodeTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Tue, 23 Apr 2024 07:29:45 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];


  const requestDataOrderDetailsTemplate = [
    {
      requestPrefix: `{
  "name": "TEMPLATE NAME",
  "language": "en",
  "category": "UTILITY",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "Header text"
    },
    {
      "type": "BODY",
      "text": "Template Body text"
    },
    {
      "type": "FOOTER",
      "text": "Footer text"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "ORDER_DETAILS",
          "text": "Review and Pay"
        }
      ]
    }
  ]
}
`,
    },
  ];

  const orderdetailsTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-type: application/json' \
 `;

  const OrderDetailsTemplatejsonData = {
    id: "572279198452421",
    status: "PENDING",
    category: "UTILITY",
  };

  const OrderDetailsTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Mon, 19 Feb 2024 18:06:18 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];

  const requestDataCtaButtonTemplate = [
    {
      requestPrefix: `{
  "name": "example_template_name",
  "language": "en_US",
  "category": "MARKETING",
  "components": [
    {
      "type": "body",
      "text": "This is a flows as template demo"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "FLOW",
          "text": "Open flow!",
          "flow_id": "<flow-id>",
          "navigate_screen":  "Flows Json screen name",
          "flow_action": "navigate"
        }
      ]
    }
  ]
}
`,
    },
  ];

  const ctaButtonTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates' \
--header 'x-access-token: TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;

  const requestDataFlowTemplate = [
    {
      requestPrefix: `{
  "name": "example_template_name",
  "language": "en_US",
  "category": "MARKETING",
  "components": [
    {
      "type": "body",
      "text": "This is a flows as template demo"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "FLOW",
          "text": "Open flow!",
          "flow_id": "<flow-id>",
          "navigate_screen":  "Flows Json screen name",
          "flow_action": "navigate"
        }
      ]
    }
  ]
}
`,
    },
  ];

  const flowTemplatecURL = `
 curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-type: application/json' \
 `;

  const FlowTemplatejsonData = {
    id: "572279198452421",
    status: "PENDING",
    category: "MARKETING",
  };

  const FlowTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Mon, 19 Feb 2024 18:06:18 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];

  const EditingTemplateCategoryPropertiesColumn = [
    "Placeholder",
    "Description",
    "Sample Value",
  ];

  const requestDataEditingTemplateCategory = [
    {
      requestPrefix: `{
  "category": "MARKETING"
}
`,
    },
  ];

  const editingCategoryTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates/id/YOUR_TEMPLATE_ID' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;

  const EdingTemplateCategoryjsonData = {
    success: true,
  };

  const EditingTemplateCategoryResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Sun, 18 Feb 2024 19:44:51 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];

  const requestDataEditingTemplatesComponent = [
    {
      requestPrefix: `{
"category": "MARKETING"
}
`,
    },
  ];

  const editingComponentTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates/id/YOUR_TEMPLATE_ID' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;

  const EdingTemplateComponentjsonData = {
    success: true,
  };

  const EditingTemplateComponentResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Sun, 18 Feb 2024 19:44:51 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];


  const requestDataGetTemplate = [
    {
      requestPrefix: `{
"" : ""
}
`,
    },
  ]


  const getTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates/id/YOUR_TEMPLATE_ID' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;



  const getTemplatejsonData = {
    "data": [
      {
        "name": "seasonal_promotion_text_only",
        "status": "APPROVED",
        "id": "564750795574598"
      },
      {
        "name": "seasonal_promotion_video",
        "status": "PENDING",
        "id": "1252715608684590"
      },
      {
        "name": "seasonal_promotion_image_header",
        "status": "PENDING",
        "id": "1372429296936443"
      }
    ],
    "paging": {
      "cursors": {
        "before": "MAZDZD",
        "after": "MgZDZD"
      },
      "next": "https://graph.facebook.com/v19.0/102290129340398/message_templates?fields=name%2Cstatus&limit=3&after=MgZDZD"
    }
  }


  const GetTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Sun, 18 Feb 2024 19:44:51 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];


  const QueryStringParameterGetTemplateColumn = [
    "Placeholder", "Description", "Sample Value"
  ]

  const requestDataGetTemplateByID = [
    {
      requestPrefix: `{
"" : ""
}
`,
    },
  ]

  const getTemplateByIdcURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates/id/YOUR_TEMPLATE_ID' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;

  const getTemplateByIdjsonData = [

    {
      "name": "seasonal_promotion_image_header",
      "status": "PENDING",
      "id": "1372429296936443"
    }

  ]


  const GetTemplateByIdResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Sun, 18 Feb 2024 19:44:51 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];


  const requestDataCompareTemplate = [
    {
      requestPrefix: `{
"" : ""
}
`,
    },
  ]


  const compareTemplatecURL = `
curl --location -g 'https://amped-express.interakt.ai/api/v17.0/YOUR_TEMPLATE_ID/compare?template_ids=[%3CTEMPLATE_IDS]&start=%3CSTART%3E&end=%3CEND%3E' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-type: application/json' \
`;


  const CompareTemplatejsonData =
  {
    "data": [
      {
        "metric": "BLOCK_RATE",
        "type": "RELATIVE",
        "order_by_relative_metric": "<ORDER_BY_RELATIVE_METRIC>"
      },
      {
        "metric": "MESSAGE_SENDS",
        "type": "NUMBER_VALUES",
        "number_values": "<NUMBER_VALUES>"
      },
      {
        "metric": "TOP_BLOCK_REASON",
        "type": "STRING_VALUES",
        "string_values": "<STRING_VALUES>"
      }
    ]
  }




  const CompareTemplateResponseheaders = [{ key: "Content-Type", value: "application/json" },
  { key: "Date", value: "Sun, 18 Feb 2024 19:44:51 GMT" },
  { key: "Server", value: "Kestrel" },
  { key: "Transfer-Encoding", value: "chunked" },
  {
    key: "Request-Context",
    value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
  },]

  const QueryParameterColumn = ["Placeholder", "Description"]


  const requestDataDeletingTemplateByID = [
    {
      requestPrefix: `{
"" : ""
}
`,
    },
  ]

  const deletingTemplateByIdcURL = `
curl --location --request DELETE 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates?hsm_id=%3CTEMPLATE%2FHSM_ID%3E%2C&name=%3CTEMPLATE_NAME%3E' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-type: application/json' \
`


  const deletingTemplateByIdjsonData = {
    "success": true
  }


  const DeletingTemplateByIdResponseheaders = [{ key: "Content-Type", value: "application/json" },
  { key: "Date", value: "Sun, 18 Feb 2024 19:44:51 GMT" },
  { key: "Server", value: "Kestrel" },
  { key: "Transfer-Encoding", value: "chunked" },
  {
    key: "Request-Context",
    value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
  },]


  const requestDataDeletingTemplateByName = [
    {
      requestPrefix: `{
  "" : ""
  }
  `,
    },
  ]


  const deletingTemplateByNamecURL = `
curl --location --request DELETE 'https://amped-express.interakt.ai/api/v17.0/YOUR_WABA_ID/message_templates?name=%3CTemplate_Name%3E' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-type: application/json' \
  `


  const deletingTemplateByNamejsonData = {
    "success": true
  }

  const DeletingTemplateByNameResponseheaders = [{ key: "Content-Type", value: "application/json" },
  { key: "Date", value: "Sun, 18 Feb 2024 19:44:51 GMT" },
  { key: "Server", value: "Kestrel" },
  { key: "Transfer-Encoding", value: "chunked" },
  {
    key: "Request-Context",
    value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
  },]

  return (
    <div
      className={`flex w-[100%]   ${isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
        }`}
    >
      <div className=" p-4 lg:p-6 overflow-y-auto w-full ">
        <section id="text-templates" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              TEXT TEMPLATES
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <div>
                <div>
                  <h3 className="font-semibold">Template Categories</h3>
                  <p className="mt-4">
                    Templates must be categorized as one of the following
                    categories. Categories factor into <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/pricing" target="_blank" rel="noopener noreferrer">pricing</Link></span> and the category
                    you designate will be <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#category-validation" target="_blank" rel="noopener noreferrer">validated</Link></span> at the time of template
                    creation.
                  </p>
                  <ul className="space-y-2 p-4">
                    <li className="relative pl-6">
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      AUTHENTICATION
                    </li>

                    <li className="relative pl-6">
                      {" "}
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      MARKETING
                    </li>

                    <li className="relative pl-6">
                      {" "}
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      UTILITY
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Template Components</h3>
                  <p className="mt-4">
                    Templates are composed of various text, media, and
                    interactive components, based on your business needs. Refer
                    to the <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components" target="_blank" rel="noopener noreferrer">Template Components</Link></span> document for a list of all
                    possible components and their requirements as well as
                    samples and example queries.
                  </p>
                  <p className="mt-4">
                    When creating a template, define its components by assigning
                    an array of component objects to the components property in
                    the body of the request.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className="text-base md:text-lg lg:text-base text-center lg:text-start">
                Send a POST request to the <span className="text-blue-500 hover:underline">
                  <Link to="https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/#Creating" target="_blank" rel="noopener noreferrer">
                    WhatsApp Business Account &gt; Message Templates</Link>
                </span> endpoint to create a template.
              </p>
            </div>


            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/YOUR_WABA_ID/message_templates"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>

          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table columns={RequestParameterTextTemplateColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className=" text-black font-semibold">Required. </span>
                  <br /> <br /> Template name. <br /> <br /> Maximum 512
                  characters.
                </td>
                <td className="px-4 py-4">order_confirmation</td>
              </tr>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Enum
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Required. </span>{" "}
                  <br /> <br /> Template category. See{" "}
                  <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories" target="_blank" rel="noopener noreferrer">

                    Template Categories
                  </Link></span> below.
                </td>
                <td className="px-4 py-4"> UTILITY </td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Boolean
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Optional.</span>{" "}
                  <br /> <br /> Set to true to allow us to <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization" target="_blank" rel="noopener noreferrer">
                    automatically assign a category.
                  </Link></span> If omitted, the template may be rejected due to
                  miscategorization.
                </td>
                <td className="px-4 py-4  text-sm popins "> true </td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Enum
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Required. </span>{" "}
                  <br />
                  <br /> Template{" "}
                  <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages" target="_blank" rel="noopener noreferrer">
                    language and locale code.
                  </Link></span>
                </td>
                <td className="px-4 py-4  text-sm popins ">en_US</td>
              </tr>

              <tr className="">
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Array of objects
                </td>
                <td className="px-4 py-4  text-sm popins">
                  {" "}
                  <span className="text-black font-medium">
                    Required.{" "}
                  </span>{" "}
                  <br />
                  <br /> Components that make up the template. See{" "}
                  <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components" target="_blank" rel="noopener noreferrer">
                    {" "}
                    Template Components{" "}
                  </Link></span>
                  below.{" "}
                </td>
                <td className="px-4 py-4  text-sm popins">
                  See <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components" target="_blank" rel="noopener noreferrer">Template Components </Link></span>below.
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataTextTemplate}
                curlBase={textTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={TextTemplatejsonData}
              headers={TextTemplateResponseheaders}
            />
          </div>
        </section>

        <section id="media-templates" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              MEDIA TEMPLATES
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p>
                Media headers can be an image, video, or a document such as a
                PDF. All media must be uploaded with the{" "}
                <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/graph-api/guides/upload" target="_blank" rel="noopener noreferrer"> Resumable Upload API. </Link></span>
                The syntax for defining a media header is the same for all media
                types.
              </p>
            </div>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-base md:text-lg lg:text-base text-center lg:text-start mt-4">
              Send a POST request to the{" "}
              <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/#Creating" target="_blank" rel="noopener noreferrer">
                WhatsApp Business Account &gt; Message Templates
              </Link></span> endpoint to create a template.
            </p>

            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/YOUR_WABA_ID/message_templates"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>

          </div>

          <div className="flex flex-col justify-center items-center popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table columns={RequestParameterMediaTemplateColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins"></td>
                <td className="px-4 py-4  text-sm popins">
                  Indicates media asset type. Set to IMAGE, VIDEO, or DOCUMENT.
                </td>
                <td className="px-4 py-4">IMAGE</td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-orange-500 text-sm popins"></td>
                <td className="px-4 py-4  text-sm popins">
                  Uploaded media asset handle. Use the{" "}
                  <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/graph-api/guides/upload" target="_blank" rel="noopener noreferrer">Resumable Upload API</Link></span> to generate an asset handle.
                </td>
                <td className="px-4 py-4"> 4::aW...</td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example  Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataMediaTemplate}
                curlBase={mediaTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example  Response
            </h2>
            <ResponseComponent
              jsonData={MediaTemplatejsonData}
              headers={MediaTemplateResponseheaders}
            />
          </div>
        </section>

        <section id="location-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              Location TEMPLATE
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>

            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/YOUR_WABA_ID/message_templates"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">

            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>

          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example  Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataLocationTemplate}
                curlBase={locationTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example  Response
            </h2>
            <ResponseComponent
              jsonData={LocationTemplatejsonData}
              headers={LocationTemplateResponseheaders}
            />
          </div>
        </section>



        <section id="carousel-template" className="mb-16 ">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              CAROUSEL TEMPLATE
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p>
                This document describes carousel templates and how to use them.
                Carousel templates allow you to send a single text message
                accompanied by a set of up to 10 carousel cards in a
                horizontally scrollable view.
              </p>
            </div>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <h3 className="text-xl font-medium">Creating Carousel Templates</h3>
            <p className="mt-4">
              Use the <span className="text-blue-500 hover:underline">
                <Link
                  to="https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/#Creating"
                  target="_blank"
                  rel="noopener noreferrer"

                >
                  {" "}
                  WhatsApp Business Account &gt; Message Templates{" "}
                </Link></span>
              endpoint to create a carousel template.
            </p>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <h3 className="text-xl font-medium">Message Bubble</h3>
            <p className="mt-4">
              A message bubble is required. Message bubbles are text-only and
              support variables.
            </p>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <h3 className="text-xl font-medium">Carousel Cards</h3>
            <p className="mt-4">
              Carousel templates support up to 10 carousel cards. Cards must
              have a media header (image or video), body text, and at least one
              button. Supports 2 buttons. Buttons can be the same or a mix of
              quick reply buttons, phone number buttons, or URL buttons.
            </p>

            <p className="mt-2">
              The media header format and button types must be the same across
              all cards that make up a carousel template.
            </p>

            <p className="mt-2">
              Media assets will be cropped to a wide ratio based on the
              customer's device.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center  popins  ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>

            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/YOUR_WABA_ID/message_templates"
            />
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Syntax
            </h2>
            <div></div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table columns={RequestParameterCarouselTemplateColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Required</span>{" "}
                  <br /> <br />{" "}
                  <span className=" text-blue-500 hover:underline">
                    {" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/media-card-carousel-templates#message-bubble"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Message bubble{" "}
                    </Link>
                  </span>{" "}
                  text string. Supports variables. <br />
                  <br /> Maximum 1024 characters.{" "}
                </td>
                <td className="px-4 py-4">
                  Summer is here, and we've got the freshest produce around! Use
                  code <span>{"{{1}}"}</span> to get <span>{"{{2}}"}</span> off
                  your next order.
                </td>
              </tr>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Array of strings
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">
                    Required if the message bubble text string uses variables.
                  </span>{" "}
                  <br /> <br />
                  Array of example variable strings. Number of strings must
                  match the number of variables included in the string.
                </td>
                <td className="px-4 py-4"> "15OFF" , "15%"</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Required .</span>{" "}
                  <br /> <br />
                  Card body text. Support variables. <br />
                  <br /> Maximum 160 characters.
                </td>
                <td className="px-4 py-4">
                  Rare lemons for unique cocktails. Use code{" "}
                  <span>{"{{1}}"}</span> to get <span>{"{{2}}"}</span> off all
                  produce.
                </td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Array of strings
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">
                    Required if using card body text with variables.
                  </span>{" "}
                  <br /> <br />
                  Card body text example variables.
                </td>
                <td className="px-4 py-4">"15OFF","15%"</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Enum
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Required</span>{" "}
                  <br />
                  <br /> Card
                  <span className=" text-blue-500 hover:underline">
                    {" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components#media-headers"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      media header
                    </Link>{" "}
                  </span>{" "}
                  format. Must be IMAGE or VIDEO.
                </td>
                <td className="px-4 py-4">IMAGE</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Media asset handle
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">Required</span>{" "}
                  <br />
                  <br /> Uploaded media asset handle. Use the{" "}
                  <span className=" text-blue-500 hover:underline">
                    {" "}
                    <Link
                      to="https://developers.facebook.com/docs/graph-api/guides/upload"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Resumable Upload API{" "}
                    </Link>
                  </span>{" "}
                  to generate an asset handle. <br />
                  <br />
                  <span className=" text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/carousel-templates#carousel-cards"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      See Carousel{" "}
                    </Link>{" "}
                  </span>
                  Cards for media asset requirements.
                </td>
                <td className="px-4 py-4">4::aW...</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">
                    Required if using a quick reply button.
                  </span>{" "}
                  <br />
                  <br />
                  <span className=" text-blue-500 hover:underline">
                    {" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components#quick-reply-buttons"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Quick reply button{" "}
                    </Link>{" "}
                  </span>{" "}
                  label text. <br /> <br />
                  Maximum 25 characters.
                </td>
                <td className="px-4 py-4">Send more like this</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Enum
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">Required.</span>{" "}
                  <br />
                  <br /> Must be MARKETING or UTILITY.
                </td>
                <td className="px-4 py-4">MARKETING</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Enum
                </td>
                <td className="px-4 py-4  text-sm popins">
                  Template{" "}
                  <span className=" text-blue-500 hover:underline">
                    {" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      language and locale code.
                    </Link>{" "}
                  </span>
                </td>
                <td className="px-4 py-4"> en_US</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">Required.</span>{" "}
                  <br />
                  <br />
                  Template name. <br />
                  <br />
                  Maximum 512 characters.
                </td>
                <td className="px-4 py-4">summer_carousel_promo_2023</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">
                    Required if using a URL button.
                  </span>{" "}
                  <br />
                  <br />
                  <span className=" text-blue-500 hover:underline">
                    {" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components#url-buttons"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      URL button{" "}
                    </Link>{" "}
                  </span>{" "}
                  label text. Supports 1 variable. <br /> <br />
                  25 characters maximum.
                </td>
                <td className="px-4 py-4">Buy now</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">
                    Required if using a URL button.
                  </span>{" "}
                  <br />
                  <br />
                  URL of website that loads in the device's default mobile web
                  browser when the
                  <span className=" text-blue-500 hover:underline">
                    {" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components#url-buttons"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      URL button{" "}
                    </Link>{" "}
                  </span>{" "}
                  is tapped by the app user.
                  <br /> <br />
                  Supports 1 variable, appended to the end of the URL string.{" "}
                  <br />
                  <br />
                  Maximum 2000 characters.
                </td>
                <td className="px-4 py-4">
                  https://www.luckyshrub.com/shop?promo=<p>{"{{1}}"}</p>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">
                    Required if using a URL button.
                  </span>{" "}
                  <br />
                  <br />
                  URL of website. Supports 1 variable. <br />
                  <br />
                  If using a variable, add sample variable property to the end
                  of the URL string. The URL loads in the device's default
                  mobile web browser when the customer taps the
                  <span className=" text-blue-500 hover:underline">
                    {" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components#url-buttons"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      URL button.{" "}
                    </Link>{" "}
                  </span>{" "}
                  <br />
                  <br />
                  Maximum 2000 characters.
                </td>
                <td className="px-4 py-4">
                  https://www.luckyshrub.com/shop?promo=summer_lemons_2023
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example  Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataCarouselTemplate}
                curlBase={carouselTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={CarouselTemplatejsonData}
              headers={CarouselTemplateResponseheaders}
            />
          </div>
        </section>

        <section id="limited-time-offer-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              LIMITED TIME OFFER TEMPLATE COPY
            </h2>

            <div className=" flex flex-col items-center justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <div>
                <p className="mt-4">
                  Limited-time offer templates allow you to display expiration
                  dates and running countdown timers for offer codes in
                  template messages, making it easy for you to communicate
                  time-bound offers and drive customer engagement.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Limitations</h3>
                <ul className="space-y-2 p-4 mt-">
                  <li className="relative pl-6">
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Only templates categorized as MARKETING are supported.
                  </li>

                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Footer components are not supported.
                  </li>

                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Users who view a limited-time offer template message using
                    that WhatsApp web app or desktop app will not see the
                    offer, but will instead see a message indicating that they
                    have received a message but that it's not supported in the
                    client they are using.
                  </li>
                </ul>
              </div>
            </div>

          </div>




          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/YOUR_WABA_ID/message_templates"
            />
          </div>


          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>
          </div>



          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table columns={RequestParameterCarouselTemplateColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Required</span>
                  <br /> <br />

                  Body component text. Supports variables.<br />
                  <br /> Maximum 600 characters.{" "}
                </td>
                <td className="px-4 py-4">
                  Good news,<span>{"{{1}}"}</span>! Use code<span>{"{{2}}"}</span> to get 25% off all Caribbean Destination packages!
                </td>
              </tr>


              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Array of strings
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">
                    Required if body component text uses variables.
                  </span>
                  <br /> <br />
                  Array of example variable strings.  <br /><br />
                  Must supply examples for all placeholders in string.  <br /><br />
                  No maximum, but counts against maximum.
                </td>
                <td className="px-4 py-4">["Harsh","HOTS25"]</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Boolean
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Optional.</span>{" "}
                  <br /> <br />
                  Set to true to have the <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/limited-time-offer-templates#offer-expiration-details" target="_blank" rel="noopener noreferrer">offer expiration details</Link></span> appear in the delivered message.  <br /><br />
                  If set to true, the copy code button component must be included in the buttons array, and must appear first in the array.   <br /> <br />
                  If set to false, offer expiration details will not appear in the delivered message and the copy code button component is optional. If including the copy code button, it must appear first in the buttons array.
                </td>
                <td className="px-4 py-4">
                  true
                </td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Media asset handle
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">
                    Required if using an image or video header.
                  </span>
                  <br /> <br />
                  Uploaded media asset handle. Use the <span className="text-blue-500 hover:underline"><Link to="" target="_blank" rel="noopener noreferrer">Resumable Upload API</Link> </span> to generate an asset handle.
                </td>
                <td className="px-4 py-4">4::aW...</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Enum
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Required if using a header.
                  </span>{" "}
                  <br />
                  <br />Can be IMAGE, or VIDEO.
                </td>
                <td className="px-4 py-4">IMAGE</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">Required</span>{" "}
                  <br />
                  <br />Offer details text.  <br /><br />
                  Maximum 16 characters.
                </td>
                <td className="px-4 py-4">Expiring offer!</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">
                    Required
                  </span>
                  <br />
                  <br />
                  Example offer code.
                  <br /> <br />
                  Maximum 15 characters.
                </td>
                <td className="px-4 py-4">HOTS25</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Enum
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">Required.</span>{" "}
                  <br />
                  <br /> Template <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages" target="_blank" rel="noopener noreferrer">language and locale code.</Link></span>
                </td>
                <td className="px-4 py-4">en</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black">Required.</span> <br /><br />
                  Template name.  <br /><br />
                  Maximum 512 characters.
                </td>
                <td className="px-4 py-4"> limited_time_offer</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">Required.</span>
                  <br />
                  <br />
                  <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components#url-buttons" target="_blank" rel="noopener noreferrer">URL button</Link></span> label text. Supports 1 variable.   <br /><br />
                  25 characters maximum.
                </td>
                <td className="px-4 py-4">Book now!</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">
                    Required
                  </span><br /><br />
                  URL of website that loads in the device's default mobile web browser when the <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components#url-buttons" target="_blank" rel="noopener noreferrer">URL button</Link></span> is tapped by the WhatsApp user.  <br /><br />
                  Supports 1 variable appended to the end of the URL string.  <br /><br />
                  Maximum 2000 characters.
                </td>
                <td className="px-4 py-4"> https://awesomedestinations.com/offers?code=<span>{"{{1}}"}</span> </td>
              </tr>


              <tr>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="font-medium text-black">
                    Required if URL uses a variable.
                  </span><br /> <br />
                  Example URL with example variable appended to the end.  <br /><br />
                  No maximum, but value counts against maximum.
                </td>
                <td className="px-4 py-4">
                  https://awesomedestinations.com/offers?ref=n3mtql
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example  Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataLimitedTimeOfferTemplate}
                curlBase={LimitedTimeOfferTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={LimitedTimeOfferTemplatejsonData}
              headers={LimitedTimeOfferTemplateResponseheaders}
            />
          </div>
        </section>

        <section id="coupon-code-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              COUPON CODE TEMPLATE
            </h2>
            <div className=" flex flex-col justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <div>
                <div>
                  <p className="mt-4">
                    Coupon code templates are marketing templates that display a single copy code button. When tapped, the code is copied to the customer's clipboard.
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold">Limitations</h3>
                  <ul className="space-y-2 p-4 mt-">
                    <li className="relative pl-6">
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      Coupon code templates are currently not supported by the WhatsApp web client.
                    </li>

                    <li className="relative pl-6">
                      {" "}
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      Codes are limited to 15 characters.
                    </li>

                    <li className="relative pl-6">
                      {" "}
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      Button text cannot be customized.
                    </li>

                    <li className="relative pl-6">
                      {" "}
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      Templates are limited to one copy code button.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>

            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/YOUR_WABA_ID/message_templates"
            />
          </div>


          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>
          </div>




          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">

            <Table columns={RequestParameterMediaTemplateColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">String</td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Required</span> <br /> <br />
                  Template name. <br /> <br />
                  Maximum 512 characters.
                </td>
                <td className="px-4 py-4">fall2023_promotion</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">Enum</td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Required</span> <br /> <br />
                  Template <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages" target="_blank" rel="noopener noreferrer">language and locale code.</Link></span>
                </td>
                <td className="px-4 py-4">en_US</td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-orange-500 text-sm popins">String</td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Required</span> <br /> <br />
                  Coupon code to be copied when tapped. <br /> <br />
                  Maximum 15 characters.
                </td>
                <td className="px-4 py-4">25OFF</td>
              </tr>
            </Table>

          </div>



          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataCouponCodeTemplate}
                curlBase={CouponCodeTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={CouponCodeTemplatejsonData}
              headers={CouponCodeTemplateResponseheaders}
            />
          </div>

        </section>

        <section id="order-details-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              ORDER DETAILS TEMPLATES
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <h3 className="text-xl font-medium">Media Headers</h3>
              <p className="mt-4">
                Media headers can be an image, video, or a document such as a
                PDF. All media must be uploaded with the{" "}
                <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/graph-api/guides/upload" target="_blank" rel="noopener noreferrer"> Resumable Upload API. </Link></span>
                The syntax for defining a media header is the same for all media
                types.
              </p>
            </div>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-base md:text-lg lg:text-base text-center lg:text-start mt-4">
              Send a POST request to the{" "}
              <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/#Creating" target="_blank" rel="noopener noreferrer">

                WhatsApp Business Account &gt; Message Templates{" "}
              </Link></span>
              endpoint to create a template.
            </p>


            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/YOUR_WABA_ID/message_templates"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">

            <Table columns={RequestParameterMediaTemplateColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins"></td>
                <td className="px-4 py-4  text-sm popins">
                  Indicates media asset type. Set to IMAGE, VIDEO, or
                  DOCUMENT.
                </td>
                <td className="px-4 py-4">IMAGE</td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-orange-500 text-sm popins"></td>
                <td className="px-4 py-4  text-sm popins">
                  Uploaded media asset handle. Use the{" "}
                  <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/graph-api/guides/upload" target="_blank" rel="noopener noreferrer">
                    Resumable Upload API
                  </Link></span> to generate an asset handle.
                </td>
                <td className="px-4 py-4"> 4::aW...</td>
              </tr>
            </Table>

          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>

          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataOrderDetailsTemplate}
                curlBase={orderdetailsTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={OrderDetailsTemplatejsonData}
              headers={OrderDetailsTemplateResponseheaders}
            />
          </div>
        </section>

        <section id="cta-button-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              CALL TO ACTION BUTTON TEMPLATES
            </h2>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>

            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/YOUR_WABA_ID/message_templates"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">

            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  TOKEN
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-Type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>

          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example  Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataCtaButtonTemplate}
                curlBase={ctaButtonTemplatecURL}
              />
            </div>
          </div>
        </section>

        <section id="flows-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              FLOWS TEMPLATE
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>

            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/YOUR_WABA_ID/message_templates"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataFlowTemplate}
                curlBase={flowTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={FlowTemplatejsonData}
              headers={FlowTemplateResponseheaders}
            />
          </div>
        </section>

        <section id="editing-templates-category" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              EDITING TEMPLATES (CATEGORY)
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <div>
                <div>
                  <h3 className="font-semibold">Editing Templates</h3>
                  <p className="mt-4">
                    Send a POST request to the <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/graph-api/reference/whats-app-business-hsm/" target="_blank" rel="noopener noreferrer">WhatsApp Message Template </Link></span>
                    endpoint to edit a template. You can also edit a template
                    manually using the WhatsApp Manager &gt; Account tools &gt;
                    Message templates panel.
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold">Limitations</h3>
                  <ul className="space-y-2 p-4 mt-">
                    <li className="relative pl-6">
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      Only templates with an APPROVED, REJECTED, or PAUSED
                      status can be edited.
                    </li>

                    <li className="relative pl-6">
                      {" "}
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      You can only edit a template's category or components.
                    </li>

                    <li className="relative pl-6">
                      {" "}
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      You cannot edit the category of an approved template.
                    </li>

                    <li className="relative pl-6">
                      {" "}
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      Approved templates can be edited up to 10 times in a 30
                      day window, or 1 time in a 24 hour window. Rejected or
                      paused templates can be edited an unlimited number of
                      times.
                    </li>

                    <li className="relative pl-6">
                      {" "}
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      After editing an approved or paused template, it will
                      automatically be approved unless it fails template review.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/YOUR_WABA_ID/message_templates/id/YOUR_TEMPLATE_ID"
            />
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Syntax
            </h2>
            <div></div>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Post Body
            </h2>
            <div></div>
          </div>

          <div className="flex flex-col justify-center items-center popins text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center items-center">
            <Table columns={EditingTemplateCategoryPropertiesColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  String
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">
                    Required if components property is omitted.
                  </span>
                  <br />
                  Template category.
                </td>
                <td className="px-4 py-4">AUTHENTICATION</td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Array
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">
                    Required if category property is omitted.
                  </span>{" "}
                  <br />
                  Array of template components objects.
                </td>
                <td className="px-4 py-4">
                  {" "}
                  See{" "}
                  <span className="text-blue-500 underline">
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#"
                    >
                      Example Request (Editing Components){" "}
                    </Link>
                  </span>
                  below.{" "}
                </td>
              </tr>
            </Table>

            <p className="mt-4 text-center font-medium ">
              Example request to change template's category from UTILITY to
              MARKETING.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataEditingTemplateCategory}
                curlBase={editingCategoryTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={EdingTemplateCategoryjsonData}
              headers={EditingTemplateCategoryResponseheaders}
            />
          </div>
        </section>

        <section id="editing-templates-components" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              EDITING TEMPLATES (COMPONENTS)
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className="mt-4">
                Example request to a template's body text which contained both
                marketing and utility content to only contain marketing content.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>

            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/YOUR_WABA_ID/message_templates/id/YOUR_TEMPLATE_ID"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataEditingTemplatesComponent}
                curlBase={editingComponentTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={EdingTemplateComponentjsonData}
              headers={EditingTemplateComponentResponseheaders}
            />
          </div>
        </section>

        <section id="get-templates" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              GET TEMPLATES
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p>
                Send a GET request to the <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates" target="_blank" rel="noopener noreferrer"> WhatsApp Business Account &gt; Message Templates </Link></span> endpoint to get a list of templates owned by a WhatsApp Business Account.
              </p>
            </div>
          </div>


          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>

            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="GET"
              param="/YOUR_WABA_ID/message_templates"
            />
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Syntax
            </h2>
            <div></div>
          </div>


          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameters
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table columns={QueryStringParameterGetTemplateColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">Comma-separated list</td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Optional</span> <br /><br />
                  List of <span className="text-blue-500 hover:underline"> <Link to="https://developers.facebook.com/docs/graph-api/reference/whats-app-business-hsm/#fields" target="_blank" rel="noopener noreferrer">template fields </Link></span> you want returned.
                </td>
                <td className="px-4 py-4">name,status</td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-orange-500 text-sm popins">Integer</td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Optional</span> <br /><br />
                  The maximum number of templates you want returned in each page of results.
                </td>
                <td className="px-4 py-4"> 10</td>
              </tr>
            </Table>
          </div>


          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>
          </div>


          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataGetTemplate}
                curlBase={getTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={getTemplatejsonData}
              headers={GetTemplateResponseheaders}
            />
          </div>

        </section >


        <section id="get-template-by-id" className="mb-16">
          <div className="flex justify-center items-center  popins ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              GET TEMPLATES BY ID (SINGLE)
            </h2>

          </div>


          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>

            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="GET"
              param="/YOUR_WABA_ID/message_templates/id/YOUR_TEMPLATE_ID"
            />
          </div>


          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataGetTemplateByID}
                curlBase={getTemplateByIdcURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={getTemplateByIdjsonData}
              headers={GetTemplateByIdResponseheaders}
            />
          </div>
        </section>


        <section id="compare-templates-only-2" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              COMPARE TEMPLATES (ONLY 2 AT A TIME)
            </h2>

            <div className=" flex flex-col items-center justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className="mt-4">
                You can compare two templates by examining how often each one is sent, which one has the lower ratio of blocks to sends, and each template's top reason for being blocked.
              </p>


              <div className="mt-4">
                <h3 className="font-semibold">Limitations</h3>
                <ul className="space-y-2 p-4 ">
                  <li className="relative pl-6">
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Only two templates can be compared at a time.
                  </li>

                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Both templates must be in the same WhatsApp Business Account.
                  </li>

                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Templates must have been sent at least 1,000 times in the queries specified timeframe.
                  </li>

                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Timeframes are limited to 7, 30, 60 and 90 day lookbacks from the time of the request.
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Comparing Templates</h3>
                <p className="mt-2"> Use the <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/graph-api/reference/whats-app-business-hsm/compare" target="_blank" rel="noopener noreferrer">WhatsApp Message Template &gt; Compare</Link></span> endpoint to target one template and compare it with another.</p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Timeframes</h3>


                <p className="mt-2">
                  Timeframes are limited to 7, 30, 60 and 90 day lookbacks from the time of the request. To define a timeframe, set your end date to the current time as a UNIX timestamp, then subtract the number of days for your desired timeframe, in seconds, from that value:   </p>

                <ul className="space-y-2 p-4 mt-2">
                  <li className="relative pl-6">
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Subtract 604800 for a 7 day window.
                  </li>

                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Subtract 2592000 for a 30 day window.
                  </li>

                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Subtract 5184000 for a 60 day window.
                  </li>

                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Subtract 7776000 for a 90 day window.
                  </li>
                </ul>
              </div>

            </div>

          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>

            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="GET"
              param="/YOUR_TEMPLATE_ID/compare?template_ids=[<TEMPLATE_IDS]&start=<START>&end=<END>"
            />
          </div>


          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Syntax
            </h2>
            <div></div>
          </div>


          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameters
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table columns={QueryParameterColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins"></td>
                <td className="px-4 py-4  text-sm popins">
                  ID of the WhatsApp Message Template to target.
                </td>

              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins"></td>
                <td className="px-4 py-4  text-sm popins">
                  ID of the WhatsApp Message Template to compare the target to.
                </td>

              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins"></td>
                <td className="px-4 py-4  text-sm popins">
                  UNIX timestamp indicating start of timeframe. See <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/template-comparison/#timeframes" target="_blank" rel="noopener noreferrer">Timeframes</Link></span>.
                </td>

              </tr>

              <tr>
                <td className="px-4 py-4 text-orange-500 text-sm popins"></td>
                <td className="px-4 py-4  text-sm popins">
                  UNIX timestamp indicating end of timeframe. See <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/template-comparison/#timeframes" target="_blank" rel="noopener noreferrer">Timeframes</Link></span>.
                </td>

              </tr>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>


              <tr>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>
            </Table>
          </div>


          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              PARAMS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">template_ids</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  [&lt;TEMPLATE_IDS]
                </td>
              </tr>


              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">start</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  &lt;START&gt;
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">end</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  &lt;END&gt;
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataCompareTemplate}
                curlBase={compareTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={CompareTemplatejsonData}
              headers={CompareTemplateResponseheaders}
            />
          </div>

        </section>


        <section id="deleting-tempaltes-by-id" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              DELETING TEMPLATES (BY ID)
            </h2>

            <div className=" flex flex-col items-center justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <div>
                <p className="mt-4">
                  Use the <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/#Deleting" target="_blank" rel="noopener noreferrer">WhatsApp Business Account &gt; Message Templates </Link></span>endpoint to delete a template by name or by ID.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Notes</h3>
                <ul className="space-y-2 p-4 mt-">
                  <li className="relative pl-6">
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    If you delete a template that has been sent in a template message but has yet to be delivered (e.g. because the customer's phone is turned off), the template's status will be set to PENDING_DELETION and we will attempt to deliver the message for 30 days. After this time you will receive a "Structure Unavailable" error and the customer will not receive the message.
                  </li>

                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Names of an approved template that has been deleted cannot be used again for 30 days.
                  </li>


                </ul>
              </div>
            </div>

          </div>


          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>

            <BaseurlComponent urlPrefix="Base URL" requestType="DELETE" param="/YOUR_TEMPLATE_ID/compare?template_ids=[<TEMPLATE_IDS]&start=<START>&end=<END>" />
          </div>


          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>
          </div>


          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              PARAMS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">hsm_id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  &lt;TEMPLATE/HSM_ID&gt;,
                </td>
              </tr>


              <tr>
                <td className="px-4 py-4 text-sm popins">name</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  &lt;TEMPLATE_NAME&gt;,
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example  Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataDeletingTemplateByID}
                curlBase={deletingTemplateByIdcURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={deletingTemplateByIdjsonData}
              headers={DeletingTemplateByIdResponseheaders}
            />
          </div>


        </section>



        <section section id="deleting-tempalte-by-name" >
          <div className="flex justify-center items-center  popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              DELETING TEMPLATE (BY NAME)
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
            </h2>

            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="DELETE"
              param="YOUR_WABA_ID/message_templates?name=<Template_Name>"
            />
          </div>


          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-access-token</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_TOKEN <br />{" "}
                  <span className="text-gray-400">
                    Enter the access token shared by us
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  YOUR_WABA_ID <br />{" "}
                  <span className="text-gray-400">
                    Enter your WhatsApp Business Account ID
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
            </Table>
          </div>


          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              PARAMS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table columns={HeaderTableColumns}>
              <tr>
                <td className="px-4 py-4 text-sm popins">name</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  &lt;TEMPLATE_NAME&gt;,
                </td>
              </tr>
            </Table>
          </div>


          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataDeletingTemplateByName}
                curlBase={deletingTemplateByNamecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <ResponseComponent
              jsonData={deletingTemplateByNamejsonData}
              headers={DeletingTemplateByNameResponseheaders}
            />
          </div>

        </section>



      </div>

      {/* Mini Map Navigation - Hidden on small screens */}
      <div
        className={`${isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
          } hidden lg:block  h-fit sticky  top-4 p-2 shrink-0 rounded-2xl  mr-4 w-70`}
      >
        <div className="rounded-lg h-full flex flex-row">
          <div className="relative">
            {/* Track line */}
            <div
              className={`${isDarkMode ? "bg-gray-600" : "bg-gray-200"
                } w-1 h-auto top-5  rounded absolute left-3`}
              style={{
                height: `${(sections.length - 1) * 40}px`,
                top: "20px",
              }}
            >
              {/* Moving indicator */}
              <div
                className={`${isDarkMode ? "bg-white" : "bg-black"
                  } w-1 bg-black rounded absolute transition-all duration-300`}
                style={{
                  height: "20px",
                  top: `${scrollerPosition}%`,
                  transform: "translateY(-50%)",
                }}
              ></div>
            </div>

            <div className="ml-6">
              {sections.map((section) => (
                <div
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`p-2 mb-1 rounded cursor-pointer text-sm transition-colors ${activeSection === section.id
                    ? `${isDarkMode
                      ? "text-white font-semibold"
                      : "text-black font-semibold"
                    }`
                    : `${isDarkMode ? "text-gray-900" : "text-gray-600"}`
                    }`}
                >
                  {section.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitTemplateWhatsapp;
