import { Link } from "react-router-dom";
import { useTheme } from "@/ApiDocs/context/ThemeContext";
import { themeColors } from "@/ApiDocs/themeColors";
import CircleIcon from "@mui/icons-material/Circle";
import RequestSample from "@/ApiDocs/components/RequestSample";

import React, { useState, useEffect, useRef } from "react";
import BaseurlComponent from "@/ApiDocs/components/BaseurlComponent";
// import Table from "@/ApiDocs/components/Tablenew";
import Table from "@/ApiDocs/components/Tablenew";
import ResponseComponent from "@/ApiDocs/components/ResponseComponent";
import RequestComponent from "@/ApiDocs/components/RequestComponent";

const SendMessageNew = () => {
  const [activeSection, setActiveSection] = useState("text-templates");

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "text-templates", title: "Text Template" },
    { id: "image-templates", title: "Image Template" },
    { id: "video-templates", title: "Video Template" },
    { id: "media-templates", title: "Document Template" },
    { id: "location-template", title: "Location Template" },
    { id: "authentication-template", title: "Authentication Template" },
    { id: "carousel-template", title: "Carousel Template" },
  ];



  const [active, setActive] = useState(null);
  const [scroller, setScroller] = useState(0);

  useEffect(() => {
    // IntersectionObserver for highlighting active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    // Scroll listener for smooth progress tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScroller(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const requestDataTextTemplate = [
    {
      id: 0,
      title: "With Variable",
      requestPrefix: `{
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "91XXXXXXXXXX",
      "type": "template",
      "template": {
        "name": "your_template_name",
        "language": {
          "code": "insert_language_code"
        },
        "components": [
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": "variable_{{1}}_value"
              },
              {
                "type": "text",
                "text": "variable_{{2}}_value"
              },
              {
                "type": "text",
                "text": "variable_{{3}}_value"
              }
            ]
          }
        ]
      }
      }`,
    },
    {
      id: 1,
      title: "Without Varibles",
      requestPrefix: `{
              "messaging_product": "whatsapp",
              "recipient_type": "individual",
              "to": "91XXXXXXXXXX",
              "type": "template",
              "template": {
                   "name": "your_template_name",
                   "language": {
                   "code": "insert_language_code"
                   }
               }
       }  `,
    },
  ];





  const requestDataImageTemplate = [
    {
      id: 0,
      title: "With Variable",
      requestPrefix: `{
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "91XXXXXXXXXX",
      "type": "template",
      "template": {
      "name": "your_template_name",
      "language": {
         "code": "insert_language_code"
      },
      "components": [
       {
         "type": "header",
         "parameters": [
         {
          "type": "image",
          "image": {
            "link": " https://www.domain.com/yourimage.jpg"
          }
        }
      ]
     },
     {
      "type": "body",
      "parameters": [
     {
       "type": "text",
       "text": "text-string for 1st variable"
     },
     {
       "type": "text",
       "text": "text-string for 2nd variable"
     },
     {
       "type": "text",
       "text": "text-string for 3rd variable"
     }
    ]
   }
   ]
   }
   }
  `,
    },
    {
      id: 1,
      title: "Without Variable",
      requestPrefix: `{
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "91XXXXXXXXXX",
      "type": "template",
      "template": {
        "name": "your_template_name",
        "language": {
          "code": "insert_language_code",
          "policy": "deterministic"
        },
        "components": [
          {
            "type": "header",
            "parameters": [
              {
                "type": "image",
                "image": {
                  "link": "https://www.domain.com/yourimage.jpg"
                }
              }
            ]
          }
        ]
      }
     }`,
    },
  ];

  const requestDataVideoTemplate = [
    {
      id: 0,
      title: "With Variable",
      requestPrefix: `{
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "91XXXXXXXXXX",
      "type": "template",
      "template": {
      "name": "your_template_name",
      "language": {
         "code": "insert_language_code"
      },
      "components": [
       {
         "type": "header",
         "parameters": [
         {
          "type": "video",
          "image": {
            "link": " https://www.domain.com/yourvideo.mp4"
          }
        }
      ]
    },
     {
      "type": "body",
      "parameters": [
     {
       "type": "text",
       "text": "text-string for 1st variable"
     },
     {
       "type": "text",
       "text": "text-string for 2nd variable"
     },
     {
       "type": "text",
       "text": "text-string for 3rd variable"
     }
    ]
   }
  ]
  }
   }
  `,
    },
    {
      id: 1,
      title: "Without Variable",
      requestPrefix: `{
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "91XXXXXXXXXX",
      "type": "template",
      "template": {
        "name": "your_template_name",
        "language": {
          "code": "insert_language_code",
          "policy": "deterministic"
        },
        "components": [
          {
            "type": "header",
            "parameters": [
              {
                "type": "video",
                "image": {
                  "link": "https://www.domain.com/yourvideo.mp4"
                }
              }
            ]
          }
        ]
      }
     }`,
    },
  ];

  const requestLocationdataTemplate = [
    {
      id: 0,
      title: "With Variable",
      requestPrefix: `{
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "91XXXXXXXXXX",
    "type": "template",
    "template": {
      "name": "your_template_name",
      "language": {
        "code": "insert_language_code"
      },
      "components": [
        {
          "type": "header",
          "parameters": [
            {
              "type": "location",
              "location": {
                "longitude": -122.425332,
                "latitude": 37.758056,
                "name": "Facebook HQ",
                "address": "1 Hacker Way, Menlo Park, CA 94025"
              }
            }
          ]
        },
        {
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": "text-string for 1st variable"
            },
            {
              "type": "text",
              "text": "text-string for 2nd variable"
            },
            {
              "type": "text",
              "text": "text-string for 3rd variable"
            }
          ]
        }
      ]
    }
  }`,
    },
    {
      id: 1,
      title: "Without Variable",
      requestPrefix: `{
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "91XXXXXXXXXX",
    "type": "template",
    "template": {
      "name": "your_template_name",
      "language": {
        "code": "insert_language_code"
      },
      "components": [
        {
          "type": "header",
          "parameters": [
            {
              "type": "location",
              "location": {
                "longitude": -122.425332,
                "latitude": 37.758056,
                "name": "Facebook HQ",
                "address": "1 Hacker Way, Menlo Park, CA 94025"
              }
            }
          ]
        }
      ]
    }
  }`,
    },
  ];

  const requestDataCarouselTemplate = [
    {
      id: 0,
      title: "With Variable",
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
            "type": "body",
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
          },
          {
            "type": "carousel",
            "cards": [
              {
                "card_index": 0,
                "components": [
                  {
                    "type": "header",
                    "parameters": [
                      {
                        "type": "image",
                        "image": {
                          "link": "https://example.com/wa/final.jpg"
                        }
                      }
                    ]
                  },
                  {
                    "type": "body",
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
                    "type": "header",
                    "parameters": [
                      {
                        "type": "image",
                        "image": {
                          "link": "https://example.com/wa/logo.jpg"
                        }
                      }
                    ]
                  },
                  {
                    "type": "body",
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
                    "type": "header",
                    "parameters": [
                      {
                        "type": "image",
                        "image": {
                          "link": "https://example.com/wa/greetings.jpg"
                        }
                      }
                    ]
                  },
                  {
                    "type": "body",
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
    }`,
    },
    {
      id: 1,
      title: "Without Variable",
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
          "type": "carousel",
          "cards": [
            {
              "card_index": 0,
              "components": [
                {
                  "type": "header",
                  "parameters": [
                    {
                      "type": "image",
                      "image": {
                        "link": "https://example.com/wa/final.jpg"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "card_index": 1,
              "components": [
                {
                  "type": "header",
                  "parameters": [
                    {
                      "type": "image",
                      "image": {
                        "link": "https://example.com/wa/logo.jpg"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "card_index": 2,
              "components": [
                {
                  "type": "header",
                  "parameters": [
                    {
                      "type": "image",
                      "image": {
                        "link": "https://example.com/wa/greetings.jpg"
                      }
                    }
                  ]
                },
                {
                  "type": "body"
                }
              ]
            }
          ]
        }
      ]
    }
  }`,
    },
  ];

  const requestDataAuthenicationTemplate = [
    {
      id: 0,
      requestPrefix: `{
             "messaging_product": "whatsapp",
             "recipient_type": "individual",
             "to": "CUSTOMER_PHONE_NUMBER",
             "type": "template",
             "template": {
                    "name": " Authentication_Template_Name",
                    "language": {
                    "code": "en"
                  },
                   "components": [
                       {
                         "type": "body",
                         "parameters": [
                             {
                                "type": "text",
                                "text": "Your_OTP_Value"
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
                                      "text": "Your_OTP_Value"
                                    }
                              ]
                         }
                     ]
                }
       }`,
    },
  ];

  const requestDataMediaTemplate = [
    {
      id: 0,
      title: "With Variable",
      requestPrefix: `{
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "91XXXXXXXXXX",
      "type": "template",
      "template": {
        "name": "your_doc_template_name",
        "language": {
          "code": "en"
        },
        "components": [
          {
            "type": "header",
            "parameters": [
              {
                "type": "document",
                "document": {
                  "link": "https://samplefilepdf.com/invoicesimple.pdf",
                  "filename": "Invoice_12345.pdf"
                }
              }
            ]
          },
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": "Variable_{{1}}_value"
              },
              {
                "type": "text",
                "text": "Variable_{{2}}_value"
              }
            ]
          }
        ]
      }
     }`,
    },

    {
      id: 1,
      title: "Without Variable",
      requestPrefix: `{
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "91XXXXXXXXXX",
    "type": "template",
    "template": {
      "name": "your_doc_template_name",
      "language": {
        "code": "en"
      },
      "components": [
        {
          "type": "header",
          "parameters": [
            {
              "type": "document",
              "document": {
                "link": "https://samplefilepdf.com/invoicesimple.pdf",
                "filename": "Invoice_12345.pdf"
              }
            }
          ]
        }
      ]
    }
  }`,
    },
  ];

  const textTemplatecURL = `
  curl --location 'Base_URL/wrapper/waba/message' \
  --header 'Content-Type: application/json' \
  --header 'key: Enter Your API key (Available in your portal)' \
  --header 'wabaNumber: Registered_WABA_Number without + sign
    (91XXXXXXXXXX)  ' \
   `;

  // const textTemplatewithVarcURL = `
  // curl --location 'Base_URL/wrapper/waba/message' \
  // --header 'Content-Type: application/json' \
  // --header 'key: Enter Your API key (Available in your portal)' \
  // --header 'wabaNumber: Registered_WABA_Number without + sign
  // (91XXXXXXXXXX)' \

  //  `;

  const authenticationTemplatecURL = `
    curl --location 'Base_URL/wrapper/waba/message' \
    --header 'key: Your_Celitix_Account_API_Key' \
    --header 'wabaNumber: 91XXXXXXXXXX' \
    --header 'Content-Type: application/json' \
   `;

  const mediaTemplatecURL = `
  curl --location 'Base_URL/wrapper/waba/message' \
    --header 'Content-Type: application/json' \
    --header 'key: Your_API_Key' \
    --header 'wabaNumber: Your_WABA_Number(91XXXXXXXXXX)' \
       `;

  const imageTemplatecURL = `
  curl --location 'Base_URL/wrapper/waba/message' \
--header 'Content-Type: application/json' \
--header 'key: Enter Your API key (Available in your portal)' \
--header 'wabaNumber: Registered_WABA_Number without + sign
(91XXXXXXXXXX)' \

       `;
  const TextTemplatejsonData = {
    id: "572279198452421",
    status: "PENDING",
    category: "MARKETING",
  };

  const TextTemplatejsonBodyData = {
    messaging_product: "whatsapp",
    contacts: [
      {
        input: "91XXXXXXXXXX",
        wa_id: "91XXXXXXXXXX",
      },
    ],
    messages: [
      {
        id: "wamid.HBgMOTE3NDkxMDc5MjA4FQIAERgSOTJBNTYwQzcyMTBCN0JCRjZFAA==",
        message_status: "accepted",
      },
    ],
  };

  const AuthenticationTemplatejsonData = {
    id: "572279198452421",
    status: "PENDING",
    category: "MARKETING",
  };

  const TextTemplateResponseBodyheaders = [
    { key: "Content-Type", value: "text/plain;charset=UTF-8" },
    { key: "Content-Encoding", value: "gzip" },
    { key: "Content-Length", value: "184" },
    { key: "Date", value: "Mon, 25 Aug 2025 06:46:55 GMT" },
    {
      key: "Cache-Control",
      value: "no-cache, no-store, max-age=0, must-revalidate",
    },
  ];
  const TextTemplateResponseheaders = [
    { key: "Content-Type", value: "text/plain;charset=UTF-8" },
    { key: "Content-Encoding", value: "gzip" },
    { key: "Content-Length", value: "184" },
    { key: "Date", value: "Mon, 25 Aug 2025 06:46:55 GMT" },
    {
      key: "Cache-Control",
      value: "no-cache, no-store, max-age=0, must-revalidate",
    },
  ];

  const AuthenticationTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
  ];

  const RequestParameterMediaTemplateColumn = [
    "Placeholder",
    "Description",
    "Example Value",
  ];

  return (
    <div
      className={`flex w-[100%] rounded-md  ${isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
        }`}
    >
      <div className=" p-4 lg:p-6 overflow-y-auto w-4xl mx-auto ">
        <section id="text-templates" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5 border-b-2 border-gray-400 pb-2">
              WhatsApp Business API Document
            </h2>

            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <div>
                <div>
                  <h3 className="font-semibold text-md">Template Categories</h3>
                  <p className="mt-4 text-sm">
                    Templates must be categorized as one of the following
                    categories. Categories factor into{" "}
                    <span className="text-blue-500 hover:underline">
                      <Link
                        to="https://developers.facebook.com/docs/whatsapp/pricing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        pricing
                      </Link>
                    </span>
                    and the category you designate will be
                    <span className="text-blue-500 hover:underline">
                      <Link
                        to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#category-validation"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        validated
                      </Link>
                    </span>{" "}
                    at the time of template creation.
                  </p>
                  <ul className="space-y-2 p-4">
                    <li className="relative pl-6 text-sm">
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      AUTHENTICATION
                    </li>

                    <li className="relative pl-6 text-sm">
                      {" "}
                      <CircleIcon
                        className="absolute left-0 top-1.5 text-gray-500"
                        style={{ fontSize: "0.4rem" }}
                      />
                      MARKETING
                    </li>

                    <li className="relative pl-6 text-sm">
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
                  <h3 className="font-semibold text-md">Template Components</h3>
                  <p className="mt-4 text-sm">
                    Templates are composed of various text, media, and
                    interactive components, based on your business needs. Refer
                    to the{" "}
                    <span className="text-blue-500 hover:underline">
                      <Link
                        to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Template Components
                      </Link>
                    </span>{" "}
                    document for a list of all possible components and their
                    requirements as well as samples and example queries.
                  </p>
                  <p className="mt-4 text-sm">
                    When creating a template, define its components by assigning
                    an array of component objects to the components property in
                    the body of the request.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-center">
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className=" md:text-lg lg:text-base text-center lg:text-start text-sm">
                Send a POST request to the{" "}
                <span className="text-blue-500 hover:underline">
                  <Link
                    to="https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/#Creating"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Business Account &gt; Message Templates
                  </Link>
                </span>{" "}
                endpoint to create a template.
              </p>
            </div>
          </div>
          <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center mt-10">
            TEXT TEMPLATES
          </h2>
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/waba/message"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Value </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Content-type
                  </Table.Cell>
                  <Table.Cell align="center">application/json</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    wabaNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    wabaNumber <br />
                    <span className="text-gray-400">
                      Registered_WABA_Number without + sign (91XXXXXXXXXX)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-4 mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              Common HTTP Response Codes
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    403
                  </Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    500
                  </Table.Cell>
                  <Table.Cell align="center">Internal server error</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    200 or 202
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-green-600">
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    405
                  </Table.Cell>
                  <Table.Cell align="center">Method not allowed</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    401
                  </Table.Cell>
                  <Table.Cell align="center">Unauthorized</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    429
                  </Table.Cell>
                  <Table.Cell align="center">Too many requests</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Template Variables
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center"> Type </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center"> Description </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Example </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    String
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> Template name. <br />
                    <br /> Maximum 512 characters.
                  </Table.Cell>
                  <Table.Cell align="center">order_confirmation</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template category. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Categories
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">UTILITY</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Boolean
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Optional.</span>
                    <br />
                    <br /> Set to true to allow us to{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      automatically assign a category
                    </Link>
                    . If omitted, the template may be rejected due to
                    miscategorization.
                  </Table.Cell>
                  <Table.Cell align="center">true</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      language and locale code
                    </Link>
                    .
                  </Table.Cell>
                  <Table.Cell align="center">en_US</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Array of objects
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Components that make up the template. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">
                    See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full mt-10">
              <RequestSample
                tabsContent={requestDataTextTemplate}
                curlBase={textTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full ">
              <ResponseComponent
                jsonData={TextTemplatejsonBodyData}
                headers={TextTemplateResponseBodyheaders}
              />
            </div>
          </div>
        </section>

        <section id="image-templates" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              IMAGE TEMPLATES
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Template Variables
            </h2>
          </div>
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/waba/message"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Value </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Content-type
                  </Table.Cell>
                  <Table.Cell align="center">application/json</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    wabaNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    wabaNumber <br />
                    <span className="text-gray-400">
                      Registered_WABA_Number without + sign (91XXXXXXXXXX)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-4 mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              Common HTTP Response Codes
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    403
                  </Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    500
                  </Table.Cell>
                  <Table.Cell align="center">Internal server error</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    200 or 202
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-green-600">
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    405
                  </Table.Cell>
                  <Table.Cell align="center">Method not allowed</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    401
                  </Table.Cell>
                  <Table.Cell align="center">Unauthorized</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    429
                  </Table.Cell>
                  <Table.Cell align="center">Too many requests</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Type</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Example</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500 ">
                    String
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> Template name.
                    <br />
                    <br /> Maximum 512 characters.
                  </Table.Cell>
                  <Table.Cell align="center">order_confirmation</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template category. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Categories
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">UTILITY</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    Boolean
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Optional.</span>
                    <br />
                    <br /> Set to true to allow us to{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      automatically assign a category
                    </Link>
                    . If omitted, the template may be rejected due to
                    miscategorization.
                  </Table.Cell>
                  <Table.Cell align="center">true</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      language and locale code
                    </Link>
                    .
                  </Table.Cell>
                  <Table.Cell align="center">en_US</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    Array of objects
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Components that make up the template. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">
                    See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full mt-10">
              {/* <RequestComponent
                requestData={requestDataImageWithoutVariableTemplate}
                curlBase={imageWithoutVarTemplatecURL}
              /> */}
              <RequestSample
                tabsContent={requestDataImageTemplate}
                curlBase={imageTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={TextTemplatejsonBodyData}
                headers={TextTemplateResponseheaders}
              />
            </div>
          </div>

          {/* <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              B. With Template Variables
            </h2>
          </div> */}
          {/* <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Value</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    <div className="text-center">String</div>
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> Template name.
                    <br />
                    <br /> Maximum 512 characters.
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-500 " align="center">
                    Category
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Enum.</span>
                    <br />
                    <br /> Required.
                    <br />
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Categories
                    </Link>
                    <br /> Template category. See.
                    <b>Example:</b> UTILITY
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    allow_category_assignment
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Boolean.</span>
                    <br />
                    <br /> Optional.
                    <br />
                    Set to true to allow{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      automatic assignment
                    </Link>
                    . If omitted, may be rejected.
                    <br />
                    <b>Example:</b> true
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    language
                  </Table.Cell>
                  <Table.Cell className=" text-sm popins" align="center">
                    <span className="text-black font-semibold">Enum.</span>
                    <br />
                    <br /> Required.
                    <br />
                    Template{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      language and locale code
                    </Link>
                    .
                    <br />
                    <b>Example:</b> en_US
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    components
                  </Table.Cell>
                  <Table.Cell align="center">
                    Array of objects
                    <br />
                    <br />
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    Components that make up the template. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>
                    .
                    <br />
                    <b>Example:</b> See Template Components
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div> */}

          {/* <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                requestData={requestDataImageWithVariableTemplate}
                curlBase={imageWithVarTemplatecURL}
              />
            </div>
          </div> */}

          {/* <div className="mt-10 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={TextTemplatejsonData}
                headers={TextTemplateResponseheaders}
              />
            </div>
          </div> */}
        </section>

        <section id="video-templates" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              VIDEO TEMPLATES
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Template Variables
            </h2>
          </div>
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/waba/message"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Value </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Content-type
                  </Table.Cell>
                  <Table.Cell align="center">application/json</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    wabaNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    wabaNumber <br />
                    <span className="text-gray-400">
                      Registered_WABA_Number without + sign (91XXXXXXXXXX)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-4 mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              Common HTTP Response Codes
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    403
                  </Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    500
                  </Table.Cell>
                  <Table.Cell align="center">Internal server error</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    200 or 202
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-green-600">
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    405
                  </Table.Cell>
                  <Table.Cell align="center">Method not allowed</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    401
                  </Table.Cell>
                  <Table.Cell align="center">Unauthorized</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    429
                  </Table.Cell>
                  <Table.Cell align="center">Too many requests</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Type</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Example</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500 ">
                    String
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> Template name.
                    <br />
                    <br /> Maximum 512 characters.
                  </Table.Cell>
                  <Table.Cell align="center">order_confirmation</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template category. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Categories
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">UTILITY</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    Boolean
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Optional.</span>
                    <br />
                    <br /> Set to true to allow us to{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      automatically assign a category
                    </Link>
                    . If omitted, the template may be rejected due to
                    miscategorization.
                  </Table.Cell>
                  <Table.Cell align="center">true</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      language and locale code
                    </Link>
                    .
                  </Table.Cell>
                  <Table.Cell align="center">en_US</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    Array of objects
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Components that make up the template. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">
                    See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full mt-10">
              {/* <RequestComponent
                requestData={requestDataImageWithoutVariableTemplate}
                curlBase={imageWithoutVarTemplatecURL}
              /> */}
              <RequestSample
                tabsContent={requestDataVideoTemplate}
                curlBase={imageTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={TextTemplatejsonBodyData}
                headers={TextTemplateResponseheaders}
              />
            </div>
          </div>
        </section>

        <section id="media-templates" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              DOCUMENT TEMPLATES
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/waba/message"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Value </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Content-type
                  </Table.Cell>
                  <Table.Cell align="center">application/json</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    wabaNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    wabaNumber <br />
                    <span className="text-gray-400">
                      Registered_WABA_Number without + sign (91XXXXXXXXXX)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-4 mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              Common HTTP Response Codes
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    403
                  </Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    500
                  </Table.Cell>
                  <Table.Cell align="center">Internal server error</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    200 or 202
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-green-600">
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    405
                  </Table.Cell>
                  <Table.Cell align="center">Method not allowed</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    401
                  </Table.Cell>
                  <Table.Cell align="center">Unauthorized</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    429
                  </Table.Cell>
                  <Table.Cell align="center">Too many requests</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Placeholder</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Sample Value</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-500" align="center">
                    String
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> Template name.
                    <br />
                    <br /> Maximum 512 characters.
                  </Table.Cell>
                  <Table.Cell align="center">order_confirmation</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className=" text-orange-500" align="center">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template category. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Categories
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">UTILITY</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500" align="center">
                    Boolean
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Optional.</span>
                    <br />
                    <br /> Set to true to allow us to{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      automatically assign a category
                    </Link>
                    . If omitted, the template may be rejected due to
                    miscategorization.
                  </Table.Cell>
                  <Table.Cell align="center">true</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500" align="center">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      language and locale code
                    </Link>
                    .
                  </Table.Cell>
                  <Table.Cell align="center">en_US</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-500" align="center">
                    Array of objects
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Components that make up the template. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">
                    See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full mt-10">
              {/* <RequestComponent
                requestData={requestDataMediaTemplate}
                curlBase={mediaTemplatecURL}
              /> */}
              <RequestSample
                tabsContent={requestDataMediaTemplate}
                curlBase={mediaTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={TextTemplatejsonBodyData}
                headers={TextTemplateResponseheaders}
              />
            </div>
          </div>
        </section>

        <section id="location-template" className="mb-16">
          <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center mt-10">
            LOCATION TEMPLATES
          </h2>
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/waba/message"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Value </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Content-type
                  </Table.Cell>
                  <Table.Cell align="center">application/json</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    wabaNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    wabaNumber <br />
                    <span className="text-gray-400">
                      Registered_WABA_Number without + sign (91XXXXXXXXXX)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-4 mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              Common HTTP Response Codes
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    403
                  </Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    500
                  </Table.Cell>
                  <Table.Cell align="center">Internal server error</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    200 or 202
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-green-600">
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    405
                  </Table.Cell>
                  <Table.Cell align="center">Method not allowed</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    401
                  </Table.Cell>
                  <Table.Cell align="center">Unauthorized</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    429
                  </Table.Cell>
                  <Table.Cell align="center">Too many requests</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Template Variables
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center"> Type </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center"> Description </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Example </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    String
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> Template name. <br />
                    <br /> Maximum 512 characters.
                  </Table.Cell>
                  <Table.Cell align="center">order_confirmation</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template category. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Categories
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">UTILITY</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Boolean
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Optional.</span>
                    <br />
                    <br /> Set to true to allow us to{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      automatically assign a category
                    </Link>
                    . If omitted, the template may be rejected due to
                    miscategorization.
                  </Table.Cell>
                  <Table.Cell align="center">true</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      language and locale code
                    </Link>
                    .
                  </Table.Cell>
                  <Table.Cell align="center">en_US</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Array of objects
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Components that make up the template. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">
                    See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full mt-10">
              <RequestSample
                tabsContent={requestLocationdataTemplate}
                curlBase={textTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={TextTemplatejsonBodyData}
                headers={TextTemplateResponseBodyheaders}
              />
            </div>
          </div>
        </section>

        <section id="authentication-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              AUTHENTICATION TEMPLATE
            </h2>
            <div className=" flex flex-col items-center justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className="mt-2">
                This document explains how to send approved{" "}
                <span className="text-blue-500 hover:underline">
                  <Link
                    to="https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    authentication templates with one-time password buttons
                  </Link>
                </span>
                .
              </p>

              <div className="mt-4">
                <h3 className="font-semibold">Template Components</h3>
                <p className="mt-4">
                  Use the{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Business Phone Number &gt; Messages
                    </Link>
                  </span>{" "}
                  endpoint to send an{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      authentication template message with a one-time password
                      button
                    </Link>
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/waba/message"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Value </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Content-type
                  </Table.Cell>
                  <Table.Cell align="center">application/json</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    wabaNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    wabaNumber <br />
                    <span className="text-gray-400">
                      Registered_WABA_Number without + sign (91XXXXXXXXXX)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-4 mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              Common HTTP Response Codes
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    403
                  </Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    500
                  </Table.Cell>
                  <Table.Cell align="center">Internal server error</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    200 or 202
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-green-600">
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    405
                  </Table.Cell>
                  <Table.Cell align="center">Method not allowed</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    401
                  </Table.Cell>
                  <Table.Cell align="center">Unauthorized</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    429
                  </Table.Cell>
                  <Table.Cell align="center">Too many requests</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Type</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Example</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-500 " align="center">
                    PHONE_NUMBER
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> The customer's WhatsApp phone number.
                  </Table.Cell>
                  <Table.Cell align="center">12015553931</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    ONE-TIME PASSWORD
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> The one-time password or verification code to be
                    delivered to the customer.
                    <br />
                    <br /> Note that this value must appear twice in the
                    payload.
                    <br />
                    <br /> Maximum 15 characters.
                  </Table.Cell>
                  <Table.Cell align="center">J$FpnYnP</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-500 " align="center">
                    TEMPLATE_LANGUAGE_CODE
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> The template's language and locale code.
                  </Table.Cell>
                  <Table.Cell align="center">en_US</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    TEMPLATE_NAME
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> The template's name.
                  </Table.Cell>
                  <Table.Cell align="center">verification_code</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                requestData={requestDataAuthenicationTemplate}
                curlBase={authenticationTemplatecURL}
              />
              {/* <RequestSample
                tabsContent={requestDataAuthenicationTemplate}
              /> */}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={AuthenticationTemplatejsonData}
                headers={AuthenticationTemplateResponseheaders}
              />
            </div>
          </div>
        </section>

        <section id="carousel-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              Carousel TEMPLATES
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/waba/message"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Value </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Content-type
                  </Table.Cell>
                  <Table.Cell align="center">application/json</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    wabaNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    wabaNumber <br />
                    <span className="text-gray-400">
                      Registered_WABA_Number without + sign (91XXXXXXXXXX)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-4 mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              Common HTTP Response Codes
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    403
                  </Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    500
                  </Table.Cell>
                  <Table.Cell align="center">Internal server error</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    200 or 202
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-green-600">
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    405
                  </Table.Cell>
                  <Table.Cell align="center">Method not allowed</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    401
                  </Table.Cell>
                  <Table.Cell align="center">Unauthorized</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    429
                  </Table.Cell>
                  <Table.Cell align="center">Too many requests</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Type</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Example</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-500 " align="center">
                    String
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> Template name.
                    <br />
                    <br /> Maximum 512 characters.
                  </Table.Cell>
                  <Table.Cell align="center">order_confirmation</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template category. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Categories
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">UTILITY</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-500 " align="center">
                    Boolean
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Optional.</span>
                    <br />
                    <br /> Set to true to allow us to{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      automatically assign a category
                    </Link>
                    . If omitted, the template may be rejected due to
                    miscategorization.
                  </Table.Cell>
                  <Table.Cell align="center">true</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-500 " align="center">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Template{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      language and locale code
                    </Link>
                    .
                  </Table.Cell>
                  <Table.Cell align="center">en_US</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-500 " align="center">
                    Array of objects
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> Components that make up the template. See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                  <Table.Cell align="center">
                    See{" "}
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Template Components
                    </Link>{" "}
                    below.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full mt-10">
              <RequestSample
                tabsContent={requestDataCarouselTemplate}
                curlBase={authenticationTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={TextTemplatejsonBodyData}
                headers={TextTemplateResponseBodyheaders}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Mini Map Navigation - Hidden on small screens */}


      <div
        className={`${isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
          } hidden lg:block h-[95%] sticky top-4 p-2 shrink-0 rounded-2xl mr-4 w-70 `}
      >
        {/* Scroll track */}
        <div
          className={`${isDarkMode ? "bg-gray-600" : "bg-gray-200"} 
        w-1 rounded absolute left-3 top-5.5 `}
          style={{
            height: `${sections.length * 32}px`,
          }}
        >
          {/* Moving scroll indicator */}
          <div
            className={`
        ${isDarkMode ? "bg-white" : "bg-black"} 
        w-1 rounded absolute transition-all duration-300
        ${active ? "bg-black" : ""}
        `}
            style={{
              height: "20px",
              top: `${sections.findIndex((s) => s.id === active) * 36}px`,
            }}
          />
        </div>
        <ul className="relative ml-6">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm 
          ${active === s.id ? "text-black font-semibold" : ""}
        `}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SendMessageNew;
