import { Link } from "react-router-dom";
import { useTheme } from "@/ApiDocs/context/ThemeContext";
import { themeColors } from "@/ApiDocs/themeColors";
import CircleIcon from "@mui/icons-material/Circle";

import React, { useState, useEffect } from "react";
import BaseurlComponent from "@/ApiDocs/components/BaseurlComponent";
import Table from "@/ApiDocs/components/Table";
import RequestComponent from "@/ApiDocs/components/RequestComponent";
import ResponseComponent from "@/ApiDocs/components/ResponseComponent";

const SendMessageNew = () => {
  const [activeSection, setActiveSection] = useState("text-templates");

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "text-templates", title: "Text Templates" },
    { id: "image-templates", title: "Image Templates" },
    { id: "media-templates", title: "Media Template" },
    { id: "authentication-template", title: "Authentication Template" },
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
  }
  `,
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
  }
  `,
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
  curl --location 'https://your-domain/wrapper/waba/message' \
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
      className={`flex w-[100%]   ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
      }`}
    >
      <div className=" p-4 lg:p-6 overflow-y-auto w-4xl mx-auto ">
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
                    categories. Categories factor into{" "}
                    <span className="text-blue-500 hover:underline">
                      <Link
                        to="https://developers.facebook.com/docs/whatsapp/pricing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        pricing
                      </Link>
                    </span>{" "}
                    and the category you designate will be{" "}
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
                  <p className="mt-4">
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
              <p className="text-base md:text-lg lg:text-base text-center lg:text-start">
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
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
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
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">key</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  API Key <br />{" "}
                  <span className="text-gray-400">
                    Enter Your API key (Available in your portal)
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder}`}>
                <td className="px-4 py-4 text-sm popins">wabaNumber</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  wabaNumber <br />{" "}
                  <span className="text-gray-400">
                    Registered_WABA_Number without + sign (91XXXXXXXXXX)
                  </span>
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              A. Without Template Variables
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Categories
                    </Link>
                  </span>{" "}
                  below.
                </td>
                <td className="px-4 py-4"> UTILITY </td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Boolean
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Optional.</span>{" "}
                  <br /> <br /> Set to true to allow us to{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      automatically assign a category.
                    </Link>
                  </span>{" "}
                  If omitted, the template may be rejected due to
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      language and locale code.
                    </Link>
                  </span>
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Template Components{" "}
                    </Link>
                  </span>
                  below.{" "}
                </td>
                <td className="px-4 py-4  text-sm popins">
                  See{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Components{" "}
                    </Link>
                  </span>
                  below.
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
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

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={TextTemplatejsonData}
                headers={TextTemplateResponseheaders}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              B. With Template Variables
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Categories
                    </Link>
                  </span>{" "}
                  below.
                </td>
                <td className="px-4 py-4"> UTILITY </td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Boolean
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Optional.</span>{" "}
                  <br /> <br /> Set to true to allow us to{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      automatically assign a category.
                    </Link>
                  </span>{" "}
                  If omitted, the template may be rejected due to
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      language and locale code.
                    </Link>
                  </span>
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Template Components{" "}
                    </Link>
                  </span>
                  below.{" "}
                </td>
                <td className="px-4 py-4  text-sm popins">
                  See{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Components{" "}
                    </Link>
                  </span>
                  below.
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
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

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={TextTemplatejsonData}
                headers={TextTemplateResponseheaders}
              />
            </div>
          </div>
        </section>
        <section id="image-templates" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              IMAGE TEMPLATES
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <div>
                <div>
                  <h3 className="font-semibold">Template Categories</h3>
                  <p className="mt-4">
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
                    </span>{" "}
                    and the category you designate will be{" "}
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
                  <p className="mt-4">
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
              <p className="text-base md:text-lg lg:text-base text-center lg:text-start">
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
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
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
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">key</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  Key <br />{" "}
                  <span className="text-gray-400">
                    Enter Your API key (Available in your portal)
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder}`}>
                <td className="px-4 py-4 text-sm popins">wabaNumber</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                   Registered_WABA_Number without + sign <br />{" "}
                  
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              A. Without Template Variables
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Categories
                    </Link>
                  </span>{" "}
                  below.
                </td>
                <td className="px-4 py-4"> UTILITY </td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Boolean
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Optional.</span>{" "}
                  <br /> <br /> Set to true to allow us to{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      automatically assign a category.
                    </Link>
                  </span>{" "}
                  If omitted, the template may be rejected due to
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      language and locale code.
                    </Link>
                  </span>
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Template Components{" "}
                    </Link>
                  </span>
                  below.{" "}
                </td>
                <td className="px-4 py-4  text-sm popins">
                  See{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Components{" "}
                    </Link>
                  </span>
                  below.
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
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

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={TextTemplatejsonData}
                headers={TextTemplateResponseheaders}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              B. With Template Variables
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Categories
                    </Link>
                  </span>{" "}
                  below.
                </td>
                <td className="px-4 py-4"> UTILITY </td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Boolean
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Optional.</span>{" "}
                  <br /> <br /> Set to true to allow us to{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      automatically assign a category.
                    </Link>
                  </span>{" "}
                  If omitted, the template may be rejected due to
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      language and locale code.
                    </Link>
                  </span>
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Template Components{" "}
                    </Link>
                  </span>
                  below.{" "}
                </td>
                <td className="px-4 py-4  text-sm popins">
                  See{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Components{" "}
                    </Link>
                  </span>
                  below.
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
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

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={TextTemplatejsonData}
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
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <div>
                <div>
                  <h3 className="font-semibold">Template Categories</h3>
                  <p className="mt-4">
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
                    </span>{" "}
                    and the category you designate will be{" "}
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
                  <p className="mt-4">
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
              <p className="text-base md:text-lg lg:text-base text-center lg:text-start">
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
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
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
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">Content-type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  application/json
                </td>
              </tr>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">key</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                 Key <br />{" "}
                  <span className="text-gray-400">
                    Your_API_Key
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder}`}>
                <td className="px-4 py-4 text-sm popins">wabaNumber</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  Your_WABA_Number(91XXXXXXXXXX) <br />{" "}
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Categories
                    </Link>
                  </span>{" "}
                  below.
                </td>
                <td className="px-4 py-4"> UTILITY </td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Boolean
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Optional.</span>{" "}
                  <br /> <br /> Set to true to allow us to{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      automatically assign a category.
                    </Link>
                  </span>{" "}
                  If omitted, the template may be rejected due to
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      language and locale code.
                    </Link>
                  </span>
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Template Components{" "}
                    </Link>
                  </span>
                  below.{" "}
                </td>
                <td className="px-4 py-4  text-sm popins">
                  See{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Components{" "}
                    </Link>
                  </span>
                  below.
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
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

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={TextTemplatejsonData}
                headers={TextTemplateResponseheaders}
              />
            </div>
          </div>
        </section>

        <section id="authentication-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              Authentication TEMPLATES
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <div>
                <div>
                  <h3 className="font-semibold">Template Categories</h3>
                  <p className="mt-4">
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
                    </span>{" "}
                    and the category you designate will be{" "}
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
                  <p className="mt-4">
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
              <p className="text-base md:text-lg lg:text-base text-center lg:text-start">
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
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Base URL
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
            <Table columns={HeaderTableColumns}>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">key</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  Your_Celitix_Account_API_Key
                </td>
              </tr>
              <tr className={`${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-sm popins">key</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                  wabaNumber <br />{" "}
                  <span className="text-gray-400">
                    91XXXXXXXXXX
                  </span>
                </td>
              </tr>

              <tr className={`${colors.tableBorder}`}>
                <td className="px-4 py-4 text-sm popins">'Content-Type</td>
                <td className="px-4 py-4 text-sm popins text-orange-500">
                   application/json <br />{" "}
                  
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Categories
                    </Link>
                  </span>{" "}
                  below.
                </td>
                <td className="px-4 py-4"> UTILITY </td>
              </tr>

              <tr className={` ${colors.tableBorder} border-b`}>
                <td className="px-4 py-4 text-orange-500 text-sm popins">
                  Boolean
                </td>
                <td className="px-4 py-4  text-sm popins">
                  <span className="text-black font-medium">Optional.</span>{" "}
                  <br /> <br /> Set to true to allow us to{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      automatically assign a category.
                    </Link>
                  </span>{" "}
                  If omitted, the template may be rejected due to
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      language and locale code.
                    </Link>
                  </span>
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
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Template Components{" "}
                    </Link>
                  </span>
                  below.{" "}
                </td>
                <td className="px-4 py-4  text-sm popins">
                  See{" "}
                  <span className="text-blue-500 hover:underline">
                    <Link
                      to="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Template Components{" "}
                    </Link>
                  </span>
                  below.
                </td>
              </tr>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
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

          <div className="mt-4 flex flex-col items-center justify-center">
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
      </div>

      {/* Mini Map Navigation - Hidden on small screens */}
      <div
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
      </div>
    </div>
  );
};

export default SendMessageNew;
