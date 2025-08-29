import { Link } from "react-router-dom";
import { useTheme } from "@/ApiDocs/context/ThemeContext";
import { themeColors } from "@/ApiDocs/themeColors";
import CircleIcon from "@mui/icons-material/Circle";

import React, { useState, useEffect } from "react";
import BaseurlComponent from "@/ApiDocs/components/BaseurlComponent";
import Table from "@/ApiDocs/components/Tablenew";
import RequestComponent from "@/ApiDocs/components/RequestComponent";
import ResponseComponent from "@/ApiDocs/components/ResponseComponent";

const SubmitTemplateSms = () => {
  const [activeSection, setActiveSection] = useState("sms-template");

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "sms-template", title: "SMS Template" },
    { id: "generateOtp-template", title: "Generate OTP Template" },
    { id: "verifyOtp-template", title: "Verify OTP Template" }
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



  const requestDataSMSTemplate = [
    {
      requestPrefix: `{
  "listsms": [
    {
      "sms": "Test SMS",
      "mobiles": "968xxxxxxx",
      "senderid": "ABCDEF",
      "tempid": "xxxxxxxxxxxxxxxxxxxx",
      "entityid": "xxxxxxxxxxxxxxxxxxx",
      "unicode": "0"
    }
  ]
}`,
    },
  ];
  const requestDataGenerateOtpTemplate = [
    {
      requestPrefix: ``,
    },
  ];


  const smsTemplatecURL = `
  curl --location 'Base_URL/rest/sms/sendsms' \
  --header 'Content-Type: application/json' \
  --header 'key: Celitix API Key' \
`;

  const generateOtpTemplatecURL = `
  curl --location 'Base_URL/api/generateOtp?mobileno=xxxxxxxx&timetoalive=2000&message=OTP%20121212%20To%20update%20mobile%20number%20do%20not%20share%20anyone%20DVS&entityid=1212121&tempid=123123123' \
  --header 'Key: Celitix API Key' \
`;

  const verifyOtpTemplatecURL = `
  curl --location 'Base_URL/api/validateOtpApi?mobileno=xxxxxxxxx&otp=209519' \
  --header 'Key: Celitix API Key' \
`;

  const TextTemplatejsonData = {
    smslist: {
      sms: {
        reason: "success",
        code: "000",
        clientsmsid: "528xxxxxx",
        messageid: "275xxxxxx",
        mobileno: "+91766xxxxxxx",
        status: "success",
      },
    },
  };

  const GenerateOtpTemplatejsonData = {
    result: "fail",
    otpId: "-1"
  };

  const VerifyOtpTemplatejsonData = {
    result: "fail",
    otpId: "-1"
  };

  const TextTemplateResponseheaders = [
    { key: "Content-Type", value: " text/plain;charset=UTF-8" },
    { key: "Date", value: " Fri, 22 Aug 2025 12:14:33 GMT" },
    { key: "Server", value: "Apache/2.4.58 (Ubuntu)" },
    { key: "Content", value: "Length - 129" },
    {
      key: "Connection",
      value: "Keep-Alive",
    },
  ];

  const GenerateOtpTemplateResponseheaders = [
    { key: "Content-Type", value: " text/plain;charset=UTF-8" },
    { key: "Date", value: " Fri, 22 Aug 2025 12:14:33 GMT" },
    { key: "Server", value: "Apache/2.4.58 (Ubuntu)" },
    { key: "Cache-Control", value: "no-cache, no-store, max-age=0, must-revalidate" },
    {
      key: "Connection",
      value: "Keep-Alive",
    },
  ];

  const VerifyOtpTemplateResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: " Fri, 22 Aug 2025 12:14:33 GMT" },
    { key: "Server", value: "Apache/2.4.58 (Ubuntu)" },
    { key: "Cache-Control", value: "no-cache, no-store, max-age=0, must-revalidate" },
    {
      key: "Transfer-Encoding",
      value: "chunked",
    },
  ];

  return (
    <div
      className={`flex w-[100%]   ${isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
        }`}
    >
      <div className=" p-4 lg:p-6 overflow-y-auto w-4xl mx-auto ">
        <section id="sms-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              SMS TEMPLATE
            </h2>
            {/* <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
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
            </div> */}
          </div>

          {/* <div className="mt-5 flex flex-col justify-center">
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
          </div> */}
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Endpoint
            </h2>
            <BaseurlComponent
              urlPrefix="Base_URL"
              requestType="POST"
              param="/rest/sms/sendsms"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center mt-7">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="left" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="left" className="min-w-52">
                    <div className="text-center">Value</div>
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
                  <Table.Cell align="center">Celitix API Key</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-10 ">
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
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    403
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Forbidden
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    500
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Internal server error
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    200 or 202
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins text-green-600"
                  >
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    405
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Method not allowed
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    401
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Unauthorized
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    429
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Too many requests
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  my-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Parameter</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="font-semibold">Celitix API Key.</span>
                    <br />
                    <br />
                    Get API key from your account settings.
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    sms
                  </Table.Cell>
                  <Table.Cell align="center">
                    DLT approved message content to be sent.
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    mobiles
                  </Table.Cell>
                  <Table.Cell align="center">
                    Recipient’s mobile number with country code.
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    senderid
                  </Table.Cell>
                  <Table.Cell align="center">
                    DLT approved SMS header.
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="  text-orange-500">
                    tempid
                  </Table.Cell>
                  <Table.Cell align="center">
                    DLT approved template ID.
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    entityid
                  </Table.Cell>
                  <Table.Cell align="center">
                    DLT approved entity ID.
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    unicode
                  </Table.Cell>
                  <Table.Cell align="center">
                    “0” for English. “1” for other than English language.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins my-5">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                requestData={requestDataSMSTemplate}
                curlBase={smsTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins my-5">
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

        <section id="generateOtp-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              GENERATE OTP TEMPLATE
            </h2>
          </div>


          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Endpoint
            </h2>
            <BaseurlComponent
              urlPrefix="Base_URL"
              requestType="POST"
              param="/api/generateOtp"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center mt-7">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="left" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="left" className="min-w-52">
                    <div className="text-center">Value</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">Celitix API Key</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-10 ">
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
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    403
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Forbidden
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    500
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Internal server error
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    200 or 202
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins text-green-600"
                  >
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    405
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Method not allowed
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    401
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Unauthorized
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    429
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Too many requests
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  my-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Parameter</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    mobileno
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="font-semibold">91xxxxxxxx</span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    timetoalive
                  </Table.Cell>
                  <Table.Cell align="center">
                    2000
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    message
                  </Table.Cell>
                  <Table.Cell align="center">
                    Approved message content
                  </Table.Cell>
                </Table.Row>


                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    entityid
                  </Table.Cell>
                  <Table.Cell align="center">
                    DLT approved entity ID.
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    tempid
                  </Table.Cell>
                  <Table.Cell align="center">
                    DLT approved temp ID.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins my-5">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                curlBase={generateOtpTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins my-5">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={GenerateOtpTemplatejsonData}
                headers={GenerateOtpTemplateResponseheaders}
              />
            </div>
          </div>
        </section>

        <section id="verifyOtp-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              VERIFY OTP TEMPLATE
            </h2>
          </div>


          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Endpoint
            </h2>
            <BaseurlComponent
              urlPrefix="Base_URL"
              requestType="POST"
              param="/api/validateOtpApi"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center mt-7">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="left" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="left" className="min-w-52">
                    <div className="text-center">Value</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">Celitix API Key</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-10 ">
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
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    403
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Forbidden
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    500
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Internal server error
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    200 or 202
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins text-green-600"
                  >
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    405
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Method not allowed
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    401
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Unauthorized
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-orange-500 text-sm popins"
                  >
                    429
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="px-4 py-4 text-sm popins"
                  >
                    Too many requests
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  my-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Parameter</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    mobileno
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span>91xxxxxxxxx (Mobile Number)</span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    otp
                  </Table.Cell>
                  <Table.Cell align="center">
                    xxxxxx (Valid OTP)
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins my-5">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                curlBase={verifyOtpTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins my-5">
              Example Response
            </h2>
            <div className="w-full">
              <ResponseComponent
                jsonData={VerifyOtpTemplatejsonData}
                headers={VerifyOtpTemplateResponseheaders}
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
        w-1 rounded absolute left-3 top-5.5  `}
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

export default SubmitTemplateSms;
