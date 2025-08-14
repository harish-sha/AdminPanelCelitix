import React, { useState, useEffect } from "react";

import { useTheme } from "../../context/ThemeContext";
import { themeColors } from "../../themeColors";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import RequestComponent from "../../components/RequestComponent";
import ResponseComponent from "../../components/ResponseComponent";
import CircleIcon from "@mui/icons-material/Circle";
import CodeComponent from "../../components/CodeComponent";
import BaseurlComponent from "../../components/BaseurlComponent";


const SendTemplateWhatsapp = () => {
  const [activeSection, setActiveSection] = useState("interactive-template");

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "interactive-template", title: "Interactive Template" },
    { id: "template-with-variables", title: "Template (with variables)" },
    { id: "template-cta-button", title: "Template (CTA Button)" },
    { id: "authentication-templates", title: "Authentication Templates" },
    { id: "carousel-template", title: "Carousel Template" },
    { id: "limited-time-offer", title: "Limited Time Offer Template Copy" },

    
   
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


  const requestDataInteractiveTemplate = [
    {
      requestPrefix: `{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "+919999595313",
  "type": "template",
  "template": {
    "name": "TEMPLATE_NAME",
    "language": {
      "code": "LANGUAGE_AND_LOCALE_CODE"
    },
    "components": [
      {
        "type": "header",
        "parameters": [
          {
            "type": "image",
            "image": {
              "link": "http(s)://URL"
            }
          }
        ]
      },
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": "TEXT_STRING"
          },
          {
            "type": "currency",
            "currency": {
              "fallback_value": "VALUE",
              "code": "USD",
              "amount_1000": "NUMBER"
            }
          },
          {
            "type": "date_time",
            "date_time": {
              "fallback_value": "MONTH DAY, YEAR"
            }
          }
        ]
      },
      {
        "type": "button",
        "sub_type": "quick_reply",
        "index": "0",
        "parameters": [
          {
            "type": "payload",
            "payload": "PAYLOAD"
          }
        ]
      },
      {
        "type": "button",
        "sub_type": "quick_reply",
        "index": "1",
        "parameters": [
          {
            "type": "payload",
            "payload": "PAYLOAD"
          }
        ]
      }
    ]
  }
}
`,
    },
  ];

  const InteractiveTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/phone_no_id/messages' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;

  const InteractiveTemplateResponseData = {
    "messaging_product": "whatsapp",
    "contacts": [
      {
        "input": "919999595313",
        "wa_id": "919999595313"
      }
    ],
    "messages": [
      {
        "id": "wamid.HBgMOTE5OTk5NTk1MzEzFQIAERgSNkUyMjIwMjEzNjU5N0E2MzEwAA==",
        "message_status": "accepted"
      }
    ]
  };

  const InteractiveTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Mon, 19 Feb 2024 18:06:18 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];


  const requestDataTemplateWithVariable = [
    {
      requestPrefix: `{
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "number",
    "type": "template",
    "template": {
        "name": "templatename",
        "language": {
            "code": "code"
        },
        "components": [
            {
                "type": "body",
                "parameters": [
                    {
                        "type": "text",
                        "text": "textvalue"
                    }
                ]
            }
        ]
    }
}
`,
    },
  ];

  const TemplateWithVariabelcURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/phone_no_id/messages' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;

  const TemplateWithVariabelResponseData = {
    "messaging_product": "whatsapp",
    "contacts": [
      {
        "input": "919999595313",
        "wa_id": "919999595313"
      }
    ],
    "messages": [
      {
        "id": "wamid.HBgMOTE5OTk5NTk1MzEzFQIAERgSNkUyMjIwMjEzNjU5N0E2MzEwAA==",
        "message_status": "accepted"
      }
    ]
  };

  const TemplateWithVariabelResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Mon, 19 Feb 2024 18:06:18 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];


  const requestDataTemplateCtaButton = [
    {
      requestPrefix: `{
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "919999595313",
    "type": "template",
    "template": {
        "name": "templatename",
        "language": {
            "code": "code"
        },
        "components": [{
            "type": "button",
            "sub_type": "url",
            "index": "0",
            "parameters": [{
                "type": "payload",
                "payload": "value"
            }]
        }]
    }
}
`,
    },
  ];

  const TemplateCtaButtoncURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/phone_no_id/messages' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;

  const TemplateCtaButtonResponseData = {
    "messaging_product": "whatsapp",
    "contacts": [
      {
        "input": "919999595313",
        "wa_id": "919999595313"
      }
    ],
    "messages": [
      {
        "id": "wamid.HBgMOTE5OTk5NTk1MzEzFQIAERgSNkUyMjIwMjEzNjU5N0E2MzEwAA==",
        "message_status": "accepted"
      }
    ]
  };

  const TemplateCtaButtonResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Mon, 19 Feb 2024 18:06:18 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];  



  const RequestParameterAuthenticationTemplateColumn = [
    "Placeholder",
    "Description",
    "Example Value",
  ];

const RequestParameterCarouselTemplateColumn = [
  "Placeholder",
  "Description",
  "Example Value",
]

  const requestDataAuthenticationTemplates = [
    {
      requestPrefix: `{
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "919999595313",
    "type": "template",
    "template": {
        "name": "templatename",
        "language": {
            "code": "code"
        },
        "components": [{
            "type": "button",
            "sub_type": "url",
            "index": "0",
            "parameters": [{
                "type": "payload",
                "payload": "value"
            }]
        }]
    }
}
`,
    },
  ];

  const AuthenticationTemplatescURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/YOUR_PHONE_NUMBER_ID/messages' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-type: application/json' \
 `;

  const AuthenticationTemplatesResponseData = {
    "messaging_product": "whatsapp",
    "contacts": [
      {
        "input": "PHONE_NUMBER",
        "wa_id": "PHONE_NUMBER"
      }
    ],
    "messages": [
      {
        "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgARGBI4Qzc5QkNGNTc5NTMyMDU5QzEA"
      }
    ]
  };

  const AuthenticationTemplatesResponseheaders = [
    { key: "", value: "" },
   
  ];  


const AuthenticationRawBody = {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "PHONE_NUMBER",
      "type": "template",
      "template": {
        "name": "verification_code",
        "language": {
          "code": "en_US"
      },
      "components": [
        {
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": "J$FpnYnP"
            }
          ]
        },
        {
          "type": "button",
          "sub_type": "url",
          "index": "0",
          "parameters": [
            {
              "type": "text",
              "text": "J$FpnYnP"
            }
          ]
        }
      ]
    }
  }


  const requestDataCarouselTemplate = [
    {
      requestPrefix: `{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "919833056101",
  "type": "template",
  "template": {
    "name": "test_template",
    "language": {
      "code": "en"
    },
    "components": [
      {
        "type": "BODY",
        "parameters": [
          {
            "type": "TEXT",
            "text": "15OFF"
          },
                                  {
            "type": "TEXT",
            "text": "15"
          }
        ]
      },
      {
        "type": "CAROUSEL",
        "cards": [
          {
            "card_index": 0,
            "components": [
              {
                "type": "HEADER",
                "parameters": [
                  {
                   
                    "type": "IMAGE",
                    "image": {
                      "link": "https://example.com/wa/final.jpg"
                    }
                  }
                ]
              },
              {
                "type": "BODY",
                "parameters": [
                  {
                    "type": "text",
                    "text": "15OFF"
                  },
                                                                  {
                    "type": "text",
                    "text": "15"
                  }
                ]
              }
            ]
          },
                                  {
            "card_index": 1,
            "components": [
              {
                "type": "HEADER",
                "parameters": [
                  {
                   
                    "type": "IMAGE",
                    "image": {
                      "link": "https://example.com/wa/logo.jpg"
                    }
                  }
                ]
              },
              {
                "type": "BODY",
                "parameters": [
                  {
                    "type": "text",
                    "text": "15OFF"
                  },
                                                                  {
                    "type": "text",
                    "text": "15"
                  }
                ]
              }
            ]
          },
                                  {
            "card_index": 2,
            "components": [
              {
                "type": "HEADER",
                "parameters": [
                  {
                   
                    "type": "IMAGE",
                    "image": {
                      "link": "https://example.com/wa/greetings.jpg"
                    }
                  }
                ]
              },
            
              {
                "type": "BODY",
                "parameters": [
                  {
                    "type": "text",
                    "text": "15OFF"
                  },
                                                                  {
                    "type": "text",
                    "text": "15"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
`,
    },
  ];

  const CarouselTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/phone_no_id/messages' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;

  const CarouselTemplateResponseData = {
    "messaging_product": "whatsapp",
    "contacts": [
      {
        "input": "919999595313",
        "wa_id": "919999595313"
      }
    ],
    "messages": [
      {
        "id": "wamid.HBgMOTE5OTk5NTk1MzEzFQIAERgSNkUyMjIwMjEzNjU5N0E2MzEwAA==",
        "message_status": "accepted"
      }
    ]
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
      requestPrefix: `{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "PHONE_NUMBER",
  "type": "template",
  "template": {
    "name": "TEMPLATE_NAME",
    "language": {
      "code": "en"
    },
    "components": [
      {
        "type": "header",
        "parameters": [
          {
            "type": "image",
            "image": {
              "id": "1166301034380136"
            }
          }
        ]
      },
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": "Harsh"
          },
          {
            "type": "text",
            "text": "HOTS25"
          }
        ]
      },
      {
        "type": "limited_time_offer",
        "parameters": [
          {
            "type": "limited_time_offer",
            "limited_time_offer": {
              "expiration_time_ms": 1713961800000
            }
          }
        ]
      },
      {
        "type": "button",
        "sub_type": "copy_code",
        "index": 0,
        "parameters": [
          {
            "type": "coupon_code",
            "coupon_code": "HOTS25"
          }
        ]
      },
      {
        "type": "button",
        "sub_type": "url",
        "index": 1,
        "parameters": [
          {
            "type": "text",
            "text": "n3mtql"
          }
        ]
      }
    ]
  }
}
`,
    },
  ];

  const LimitedTimeOfferTemplatecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/249189624947841/messages' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;

  const LimitedTimeOfferTemplateResponseData ={
    "messaging_product": "whatsapp",
    "contacts": [
      {
        "input": "+919999XXXXXX",
        "wa_id": "919999XXXXXX"
      }
    ],
    "messages": [
      {
        "id": "wamid.HBgMOTE5OTk5NTk1MzEzFQIAERgSODgwM0M5QTU1NDYyRDk2RkQ5AA==",
        "message_status": "accepted"
      }
    ]
  };

  const LimitedTimeOfferTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Tue, 23 Apr 2024 06:51:25 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
   
  ];  


  return (
    <div
    className={`flex w-[100%]   ${
      isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
    }`}
  >
    <div className=" p-4 lg:p-6 overflow-y-auto w-full ">
     
     <section id="interactive-template" className="mb-16">
     <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
            INTERACTIVE TEMPLATE 
            </h2>
            <div className=" flex flex-col items-center justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p>
              Interactive message templates expand the content you can send recipients beyond the standard message template and media messages template types to include interactive buttons using the components object. There are two types of predefined buttons:

              </p>
              <ul className="space-y-2 p-4">
                    <li className="relative pl-6">
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                     <span className="font-medium"> Call-to-Action —</span> Allows your customer to call a phone number and visit a website.
                    </li>

                    <li className="relative pl-6">
                      {" "}
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                     <span className="font-medium">Quick Reply —</span> Allows your customer to return a simple text message.
                    </li>

                   
                  </ul>

                  <p className="mt-2">
                  These buttons can be attached to text messages or media messages. Once your interactive message templates have been created and approved, you can use them in notification messages as well as customer service/care messages.
                  </p>

                  <p className="mt-2">
                  To send an interactive message template, make a POST call to /PHONE_NUMBER_ID/messages and attach a message object with type=template. Then, add a <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#template-object" target="_blank" rel="noopener noreferrer">template object</Link></span> with your chosen  <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#button-parameter-object" target="_blank" rel="noopener noreferrer">button</Link></span>.
                  </p>
            </div>
          </div>

 
          <div className="mt-5 flex flex-col justify-center ">
          <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
             Base URL
            </h2>
            <BaseurlComponent
             urlPrefix="Base URL" requestType="POST" param="/YOUR_PHONE_NUMBER_ID/messages" 
            />
          </div>

        
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
              <Table columns={HeaderTableColumns}>
                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">x-access-token</td>
                  <td className="px-4 py-4 text-sm popins text-orange-500">
                    YOUR_TOKEN <br />
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
                requestData={requestDataInteractiveTemplate}
                curlBase={InteractiveTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
            Example  Response
            </h2>
            <ResponseComponent
              jsonData={InteractiveTemplateResponseData}
              headers={InteractiveTemplateResponseheaders}
            />
          </div>

     </section>


     <section id="template-with-variables" className="mb-16">
     <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
            TEMPLATE (WITH VARIABLES) 
            </h2>
            <div className=" flex flex-col items-center justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            
                  <p className="mt-2">
                  To send a text-based message template, make a POST call to /PHONE_NUMBER_ID/messages and attach a message object with type=template. Then, add a <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#template-object" target="_blank" rel="noopener noreferrer">template object</Link></span>.
                  </p>
            </div>
          </div>
  
          <div className="mt-5 flex flex-col justify-center ">
          <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
             Base URL
            </h2>
            <BaseurlComponent 
             urlPrefix="Base URL" requestType="POST" param="/YOUR_PHONE_NUMBER_ID/messages" 
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
              <Table columns={HeaderTableColumns}>
                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">x-access-token</td>
                  <td className="px-4 py-4 text-sm popins text-orange-500">
                    YOUR_TOKEN <br />
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
                requestData={requestDataTemplateWithVariable}
                curlBase={TemplateWithVariabelcURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
            Example  Response
            </h2>
            <ResponseComponent
              jsonData={TemplateWithVariabelResponseData}
              headers={TemplateWithVariabelResponseheaders}
            />
          </div>


     </section>



    <section id="template-cta-button" className="mb-16">

    <div className="flex flex-col justify-center items-center gap-2 popins  ">
        <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
            TEMPLATE (CTA BUTTON) 
         </h2>
         
     </div>


          
          <div className="mt-5 flex flex-col justify-center ">
          <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
             Base URL
            </h2>
            <BaseurlComponent 
             urlPrefix="Base URL" requestType="POST" param="/YOUR_PHONE_NUMBER_ID/messages" 
            />
          </div>

        
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
              <Table columns={HeaderTableColumns}>
                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">x-access-token</td>
                  <td className="px-4 py-4 text-sm popins text-orange-500">
                    YOUR_TOKEN <br />
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
                requestData={requestDataTemplateCtaButton}
                curlBase={TemplateCtaButtoncURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
            Example  Response
            </h2>
            <ResponseComponent
              jsonData={TemplateCtaButtonResponseData}
              headers={TemplateCtaButtonResponseheaders}
            />
          </div>
    </section>


    <section id="authentication-templates"  className="mb-16">
      <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
            AUTHENTICATION TEMPLATE 
            </h2>
      <div className=" flex flex-col items-center justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            
                  <p className="mt-2">
                  This document explains how to send approved <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates" target="_blank" rel="noopener noreferrer"> authentication templates with one-time password buttons</Link></span>.
                  </p>

                  <div className="mt-4">
                  <h3 className="font-semibold">Template Components</h3>
                  <p className="mt-4">
                  Use the <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages" target="_blank" rel="noopener noreferrer">WhatsApp Business Phone Number &gt; Messages</Link></span> endpoint to send an <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates" target="_blank" rel="noopener noreferrer">authentication template message with a one-time password button</Link></span>.
                  </p>
                 
                </div>
            </div>  
          </div>


          <div className="flex flex-col justify-center items-center popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table columns={RequestParameterAuthenticationTemplateColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">PHONE_NUMBER</td>
                <td className="px-4 py-4  text-sm popins">
                The customer's WhatsApp phone number.
                </td>
                <td className="px-4 py-4">12015553931</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">ONE-TIME PASSWORD</td>
                <td className="px-4 py-4  text-sm popins">
                The one-time password or verification code to be delivered to the customer. <br /><br /> 
                Note that this value must appear twice in the payload. <br /><br /> 
                Maximum 15 characters.
                </td>
                <td className="px-4 py-4">J$FpnYnP</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">TEMPLATE_LANGUAGE_CODE</td>
                <td className="px-4 py-4  text-sm popins">
                The template's language and locale code.
                </td>
                <td className="px-4 py-4">en_US</td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-orange-500 text-sm popins">TEMPLATE_NAME</td>
                <td className="px-4 py-4  text-sm popins">
                The template's name
                </td>
                <td className="px-4 py-4"> verification_code</td>
              </tr>
            </Table>
          </div>

         
          <div className="flex flex-col justify-center items-center popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Response Contents
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table columns={RequestParameterAuthenticationTemplateColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">String</td>
                <td className="px-4 py-4  text-sm popins">
                The customer phone number that the message was sent to. This may not match wa_id.
                </td>
                <td className="px-4 py-4">+16315551234</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">String</td>
                <td className="px-4 py-4  text-sm popins">
                WhatsApp ID of the customer who the message was sent to. This may not match input.
                </td>
                <td className="px-4 py-4">+16315551234</td>
              </tr>


              <tr>
                <td className="px-4 py-4 text-orange-500 text-sm popins">String</td>
                <td className="px-4 py-4  text-sm popins">
                WhatsApp message ID. You can use the ID listed after "wamid." to track your message status.
                </td>
                <td className="px-4 py-4"> wamid.HBgLMTY1MDM4Nzk0MzkVAgARGBI3N0EyQUJDMjFEQzZCQUMzODMA</td>
              </tr>
            </Table>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
          <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
             Base URL
            </h2>
            <BaseurlComponent 
             urlPrefix="Base URL" requestType="POST" param="/YOUR_PHONE_NUMBER_ID/messages" 
            />
          </div>
         

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Syntax
            </h2>
            <div></div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center">
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
            <p className="mt-2 font-medium">Sample request using image with link:</p>
            <div>
              <RequestComponent
                requestData={requestDataAuthenticationTemplates}
                curlBase={AuthenticationTemplatescURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
            Example Response
            </h2>
            <ResponseComponent
              jsonData={AuthenticationTemplatesResponseData}
              headers={AuthenticationTemplatesResponseheaders}
            />
          </div>
         

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins mb-4">
            Body Raw (json)
            </h2>
            <CodeComponent
             sampleData={AuthenticationRawBody} 
            />
          </div>
    </section>


    <section id="carousel-template" className="mb-16">
    <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
            CAROUSEL TEMPLATE 
            </h2>
          </div>

          <div className=" flex flex-col items-center justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto text-center lg:text-start mt-2">
            <p className="mt-2">
            This document describes how to send a <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/carousel-templates" target="_blank" rel="noopener noreferrer">carousel template</Link></span> in a template message.
            </p>


            <p className="mt-4">
        Use the <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages" target="_blank" rel="noopener noreferrer">WhatsApp Business Phone Number &gt; Messages</Link></span> endpoint to send a carousel template message using a carousel template with an APPROVED status.
         </p>

          </div>

   
          <div className="flex flex-col justify-center items-center popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table columns={RequestParameterCarouselTemplateColumn}>
              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">String</td>
                <td className="px-4 py-4  text-sm popins">
               <span className="text-black font-medium"> Required if the message bubble uses variables. </span> <br /><br />
               Message bubble text variable.  <br /><br />
                 There is no maximum character limit on this value, but counts against the message bubble limit of 1024 characters.
                </td>
                <td className="px-4 py-4">20OFF</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">Integer</td>
                <td className="px-4 py-4  text-sm popins">
               <span className="font-medium text-black">Required</span> <br /><br />
               Zero-indexed order in which button appears at the bottom of the template message. 0 indicates the first button, 1 indicates second button, etc.
                </td>
                <td className="px-4 py-4">0</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">Integer</td>
                <td className="px-4 py-4  text-sm popins">
               <span className="font-medium text-black">Required</span> <br /><br />
               Zero-indexed order in which card appears within the card carousel. 0 indicates first card, 1 indicates second card, etc.
                </td>
                <td className="px-4 py-4">0</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">String</td>
                <td className="px-4 py-4  text-sm popins">
               <span className="font-medium text-black">Required if card body text uses a variable.</span> <br /><br />
               Card body text variable.  <br /><br />
               There is no maximum character limit on this value, but counts against the card body text limit of 160 characters. 
                </td>
                <td className="px-4 py-4">20OFF</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">Media asset handle</td>
                <td className="px-4 py-4  text-sm popins">
               <span className="font-medium text-black">Required</span> <br /><br />        
               Uploaded media asset ID. Use the <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#upload-media" target="_blank" rel="noopener noreferrer">/PHONE_NUMBER_ID/media</Link></span> endpoint to generate an ID.
                </td>
                <td className="px-4 py-4">24230790383178626</td>
              </tr>


              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">String</td>
                <td className="px-4 py-4  text-sm popins">
               <span className="font-medium text-black">Optional</span> <br /><br />
               Value to be included in messages webhooks (messages.button.payload) when the button is tapped.
                </td>
                <td className="px-4 py-4">59NqSd</td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">Enum</td>
                <td className="px-4 py-4  text-sm popins">
               <span className="font-medium text-black">Required</span> <br /><br />
               <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages" target="_blank" rel="noopener noreferrer">Language and locale code</Link></span> of the template to be sent in the template message.
                </td>
                <td className="px-4 py-4">en_US</td>
              </tr>


              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">String</td>
                <td className="px-4 py-4  text-sm popins">
               <span className="font-medium text-black">Required</span> <br /><br />
               Name of the template to be sent in the template message.
                </td>
                <td className="px-4 py-4">summer_carousel_promo_2023</td>
              </tr>


              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">String</td>
                <td className="px-4 py-4  text-sm popins">
               <span className="font-medium text-black">Required</span> <br /><br />
               Phone number of customer who the template message should be sent to.
                </td>
                <td className="px-4 py-4">16505555555</td>
              </tr>

              <tr>
                <td className="px-4 py-4 text-orange-500 text-sm popins">String</td>
                <td className="px-4 py-4  text-sm popins">
                <span className="text-black font-medium">Required if the URL button uses a variable.</span> <br /><br />
                URL button variable value.
                </td>
                <td className="px-4 py-4"> last_chance_2023</td>
              </tr>
            </Table>
          </div>
           

          <div className="mt-5 flex flex-col justify-center ">
          <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
             Base URL
            </h2>
            <BaseurlComponent 
             urlPrefix="Base URL" requestType="POST" param="/YOUR_PHONE_NUMBER_ID/messages" 
            />
          </div>

        
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
              <Table columns={HeaderTableColumns}>
                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">x-access-token</td>
                  <td className="px-4 py-4 text-sm popins text-orange-500">
                    YOUR_TOKEN <br />
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
                requestData={requestDataCarouselTemplate}
                curlBase={CarouselTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
            Example  Response
            </h2>
            <ResponseComponent
              jsonData={CarouselTemplateResponseData}
              headers={CarouselTemplateResponseheaders}
            />
          </div>  
    </section>


  <section id="limited-time-offer" >
  <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
                LIMITED TIME OFFER TEMPLATE COPY 
            </h2>
         
          </div>


          
          <div className="mt-5 flex flex-col justify-center ">
          <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
             Base URL
            </h2>
            <BaseurlComponent 
             urlPrefix="Base URL" requestType="POST" param="/YOUR_PHONE_NUMBER_ID/messages" 
            />
          </div>

        
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
              <Table columns={HeaderTableColumns}>
                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">x-access-token</td>
                  <td className="px-4 py-4 text-sm popins text-orange-500">
                    YOUR_TOKEN <br />
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
                requestData={requestDataLimitedTimeOfferTemplate}
                curlBase={LimitedTimeOfferTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
            Example  Response
            </h2>
            <ResponseComponent
              jsonData={LimitedTimeOfferTemplateResponseData}
              headers={LimitedTimeOfferTemplateResponseheaders}
            />
          </div>
  </section>

    </div>
     

      {/* Mini Map Navigation */}
 <div
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
        } hidden lg:block  h-fit sticky  top-4 p-2 shrink-0 rounded-2xl  mr-4 w-70`}
      >
        <div className="rounded-lg h-full flex flex-row">
          <div className="relative">
            {/* Track line */}
            <div
              className={`${
                isDarkMode ? "bg-gray-600" : "bg-gray-200"
              } w-1 h-auto top-5  rounded absolute left-3`}
              style={{
                height: `${(sections.length - 1) * 40}px`,
                top: "20px",
              }}
            >
              {/* Moving indicator */}
              <div
                className={`${
                  isDarkMode ? "bg-white" : "bg-black"
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
                  className={`p-2 mb-1 rounded cursor-pointer text-sm transition-colors ${
                    activeSection === section.id
                      ? `${
                          isDarkMode
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
  )
}

export default SendTemplateWhatsapp
