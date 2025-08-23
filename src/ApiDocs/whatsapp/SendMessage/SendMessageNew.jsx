import { Link } from "react-router-dom";
import { useTheme } from "@/ApiDocs/context/ThemeContext";
import { themeColors } from "@/ApiDocs/themeColors";
import CircleIcon from "@mui/icons-material/Circle";

import React, { useState, useEffect, useRef } from "react";
import BaseurlComponent from "@/ApiDocs/components/BaseurlComponent";
import Table from "@/ApiDocs/components/Tablenew";
import RequestComponent from "@/ApiDocs/components/RequestComponent";
import ResponseComponent from "@/ApiDocs/components/ResponseComponent";

const SendMessageNew = () => {
  const [activeSection, setActiveSection] = useState("text-templates");

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "text-templates", title: "Text Templates" },
    { id: "image-templates", title: "Image Templates" },
    { id: "media-templates", title: "Document Template" },
    { id: "authentication-template", title: "Authentication Template" },
  ];

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;

  //     // Find which section is currently in view
  //     for (let i = sections.length - 1; i >= 0; i--) {
  //       const section = document.getElementById(sections[i].id);
  //       if (section && section.offsetTop <= scrollPosition + 200) {
  //         setActiveSection(sections[i].id);
  //         break;
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

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

  const HeaderTableColumns = ["Name", "Value"];

  const RequestParameterTextTemplateColumn = [
    "Placeholder",
    "Description",
    "Sample Value",
  ];

  const requestDataTextTemplate = [
    {
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

  const requestDataTextwithVarTemplate = [
    {
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
  ];

  const requestDataImageWithoutVariableTemplate = [
    {
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

const requestDataImageWithVariableTemplate = [
  {
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
];

  const requestDataAuthenicationTemplate = [
    {
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
       }`
    },
  ];

  const requestDataMediaTemplate = [
    {
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
  ];

  const textTemplatecURL = `
  curl --location 'Base_URL/wrapper/waba/message' \
  --header 'Content-Type: application/json' \
  --header 'key: Enter Your API key (Available in your portal)' \
  --header 'wabaNumber: Registered_WABA_Number without + sign
    (91XXXXXXXXXX)  ' \
   `;

  const textTemplatewithVarcURL = `
  curl --location 'Base_URL/wrapper/waba/message' \
  --header 'Content-Type: application/json' \
  --header 'key: Enter Your API key (Available in your portal)' \
  --header 'wabaNumber: Registered_WABA_Number without + sign
  (91XXXXXXXXXX)' \

   `;

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
  const imageWithoutVarTemplatecURL = `
  curl --location 'Base_URL/wrapper/waba/message' \
 --header 'Content-Type: application/json' \
 --header 'key: Enter Your API key (Available in your portal)' \
 --header 'wabaNumber: Registered_WABA_Number without + sign
(91XXXXXXXXXX)' \
       `;
  const imageWithVarTemplatecURL = `
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

  const AuthenticationTemplatejsonData = {
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
              A. Without Template Variables
            </h2>
          </div>
          {/* <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div> */}

          {/* <div className="mt-5 flex justify-center items-center">
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
          </div> */}

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                requestData={requestDataTextTemplate}
                curlBase={textTemplatecURL}
              />
            </div>
          </div>

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

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              B. With Template Variables
            </h2>
          </div>
          {/* <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div> */}

          {/* <div className="mt-5 flex justify-center items-center">
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
                  <Table.Cell align="center" className=" text-orange-500 ">
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
                  <Table.Cell align="center" className="text-orange-500 ">
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
          </div> */}

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                requestData={requestDataTextwithVarTemplate}
                curlBase={textTemplatewithVarcURL}
              />
            </div>
          </div>

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
        <section id="image-templates" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              IMAGE TEMPLATES
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              A. Without Template Variables
            </h2>
          </div>
          {/* <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div> */}

          {/* <div className="mt-5 flex justify-center items-center">
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
          </div> */}

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                requestData={requestDataImageWithoutVariableTemplate}
                curlBase={imageWithoutVarTemplatecURL}
              />
            </div>
          </div>

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

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              B. With Template Variables
            </h2>
          </div>
          {/* <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div> */}

          {/* <div className="mt-5 flex justify-center items-center">
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

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                requestData={requestDataImageWithVariableTemplate}
                curlBase={imageWithVarTemplatecURL}
              />
            </div>
          </div>

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
        <section id="media-templates" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              DOCUMENT TEMPLATES
            </h2>
          </div>

          {/* <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div> */}

          {/* <div className="mt-5 flex justify-center items-center">
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
          </div> */}

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                requestData={requestDataMediaTemplate}
                curlBase={mediaTemplatecURL}
              />
            </div>
          </div>

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

        <section id="authentication-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              Authentication TEMPLATES
            </h2>
          </div>

          {/* <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div> */}

          {/* <div className="mt-5 flex justify-center items-center">
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
          </div> */}

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                requestData={requestDataAuthenicationTemplate}
                curlBase={authenticationTemplatecURL}
              />
            </div>
          </div>

          {/* <div className="mt-10 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={AuthenticationTemplatejsonData}
                headers={AuthenticationTemplateResponseheaders}
              />
            </div>
          </div> */}
        </section>
      </div>

      {/* Mini Map Navigation - Hidden on small screens */}
      {/* <div
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
        } hidden lg:block  h-fit sticky  top-4 p-2 shrink-0 rounded-2xl  mr-4 w-70`}
      >
        <div className="rounded-lg h-full flex flex-row">
          <div className="relative">
            <div
              className={`${
                isDarkMode ? "bg-gray-600" : "bg-gray-200"
              } w-1 h-auto top-5  rounded absolute left-3`}
              style={{
                height: `${(sections.length - 1) * 40}px`,
                top: "20px",
              }}
            >
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
      </div> */}

      <div
        className={`${isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
          } hidden lg:block h-[95%] sticky top-4 p-2 shrink-0 rounded-2xl mr-4 w-70 `}
      >
        {/* Scroll track */}
        <div
          className={`${isDarkMode ? "bg-gray-600" : "bg-gray-200"} 
      w-1 rounded absolute left-3 top-5.5  `}
          style={{
            height: `${sections.length * 30}px`,
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
