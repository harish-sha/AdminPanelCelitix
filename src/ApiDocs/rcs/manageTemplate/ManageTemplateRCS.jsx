import React, { useState, useEffect } from "react";
import BaseURL from "../../components/BaseURL";
import Table from "../../components/Table";
import ResponseSample from "../../components/ResponseSample";
import SamplePostData from "../../components/SamplePostData";
import CircleIcon from "@mui/icons-material/Circle";
import { Dialog } from "primereact/dialog";
import { useTheme } from "../../context/ThemeContext";

import { motion, AnimatePresence } from "framer-motion";

import { FiEye, FiEyeOff } from "react-icons/fi";

import { themeColors } from "../../themeColors";

const ManageTemplateRCS = () => {
  const [activeSection, setActiveSection] = useState("delete-template");
  const [isMobile, setIsMobile] = useState(false);

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const [isSuggestionReplyCardOpen, setIsSuggestionReplyCardOpen] =
    useState(false);
  const [isSuggestionReplyCardHovered, setIsSuggestionReplyCardHovered] =
    useState(false);

  const [isDialerActionCardOpen, setIsDialerActionCardOpen] = useState(false);
  const [isDialerActionCardHovered, setIsDialerActionCardHovered] =
    useState(false);

  const [isUrlActionCardOpen, setIsUrlActionCardOpen] = useState(false);
  const [isUrlActionCardHovered, setIsUrlActionCardHovered] = useState(false);

  const [isLocationCardOpen, setIsLocationCardOpen] = useState(false);
  const [isLocationCardHovered, setIsLocationCardHovered] = useState(false);

  const [isLocationQueryCardOpen, setIsLocationQueryCardOpen] = useState(false);
  const [isLocationQueryCardHovered, setIsLocationQueryCardHovered] =
    useState(false);

  const [isShareLocationCardOpen, setIsShareLocationCardOpen] = useState(false);
  const [isShareLocationCardHovered, setIsShareLocationCardHovered] =
    useState(false);

  // const handleToggleSuggestionReplyCard = () =>
  //   setIsSuggestionReplyCardOpen((prev) => !prev);

  const handleToggleSuggestionReplyCard = () => {
    if (isMobile) {
      setIsSuggestionReplyCardOpen(true);
    } else {
      setIsSuggestionReplyCardHovered((prev) => !prev);
    }
  };

  const handleToggleDialerActionCard = () => {
    if (isMobile) {
      setIsDialerActionCardOpen(true);
    } else {
      setIsDialerActionCardHovered((prev) => !prev);
    }
  };

  const handleToggleUrlActionCard = () => {
    if (isMobile) {
      setIsUrlActionCardOpen(true);
    } else {
      setIsUrlActionCardHovered((prev) => !prev);
    }
  };

  // const handleToggleLocationCard = () => {
  //  if (isMobile) {
  //   setIsLocationCardOpen(true);
  //  } else {
  //   setIsLocationCardHovered((prev) => !prev);
  //  }
  // }

  const handleToggleLocationCard = () => {
    if (isMobile) {
      setIsLocationCardOpen((prev) => !prev); // Toggle Dialog visibility
    } else {
      setIsLocationCardHovered((prev) => !prev); // Toggle hover state
    }
  };

  const handleToggleLocationQueryCard = () => {
    if (isMobile) {
      setIsLocationQueryCardOpen(true);
    } else {
      setIsLocationQueryCardHovered((prev) => !prev);
    }
  };

  const handleToggleShareLocationCard = () => {
    if (isMobile) {
      setIsShareLocationCardOpen(true);
    } else {
      setIsShareLocationCardHovered((prev) => !prev);
    }
  };

  const showSuggestionReplyCard = !isMobile
    ? isSuggestionReplyCardHovered
    : isSuggestionReplyCardOpen;

  const showDialerActionCard = !isMobile
    ? isDialerActionCardOpen
    : isDialerActionCardHovered;

  const showUrlActionCard = !isMobile
    ? isUrlActionCardOpen
    : isUrlActionCardHovered;

  const showLocationCard = !isMobile
    ? isLocationCardOpen
    : isLocationCardHovered;

  const showLocationQueryCard = !isMobile
    ? isLocationQueryCardOpen
    : isLocationQueryCardHovered;

  const showShareLocationCard = !isMobile
    ? isShareLocationCardOpen
    : isShareLocationCardHovered;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Tailwind 'lg' breakpoint is 1024px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sections = [
    { id: "delete-template", title: "Delete Template" },
    { id: "get-template-details", title: "Get Template Details" },
    { id: "fetch-template-list-for-bot", title: "Fetch Template List for Bot" },
    { id: "get-template-status", title: "Get Template Status" },
    { id: "uploading-media", title: "Uploading Media" },
    { id: "callback-notifications", title: "Callback Notifications" },
    { id: "suggestion-types", title: "Suggestion Types" },
    {
      id: "uploading-multimedia-from-url",
      title: "Uploading Multimedia via URL",
    },
  ];

  const PathVariableColumns = [
    "Field Name",
    "Validation",
    "Description",
    "Remarks",
  ];

  const HeaderTableColumns = ["Name", "Value"];

  const httpTableColoumn = ["Code", "Description"];

  const ResponseParameterDeleteTemplateColumn = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const ResponseParameterGetTemplateDetailsColumn = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const ResponseParameterFetchTemplateListBotColumn = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const ResponseParameterGetTemplateStatusColumn = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const RequestParameterCallbackNotificationsColumn = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const SuggestionReplyColumn = [
    "Field Name",
    "Validation",
    "Description",
    "Remarks",
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

  const deleteRes = [
    {
      id: 0,
      title: "200 Ok",
      requestPrefix: `
   {
"message": "Template {name} deleted successfully! "
}`,
    },
    {
      id: 1,
      title: "400 Bad Request",
      requestPrefix: `
    {
"error": {
"code": 400,
"message": "Please provide a valid bot id",
"status": "Bad Request"
}
 }
    `,
    },
  ];

  const getTempDetails = [
    {
      id: 0,
      title: "200 Ok",
      requestPrefix: `
    {
"name": "wtcfinaleng",
"type": "text_message",
"textMessageContent": "Time to go big or go home because it's India VS Australia FINALS!",
"status": "pending",
"lastUpdate": "Jun 30, 2023",
"suggestions": [
{
"suggestionId": "sjjdqz_jacPvKJJMFUdug",
"suggestionType": "reply",
"displayText": "Click to Win",
"postback": "click_to_win"
},
{
"suggestionId": "artcFqz_jacPvKJJMiUdug",
"suggestionType": "url_action",
"url": "https://brandx.onelink.me/",
"displayText": "Answer and Win",
"postback": "answer_and_win"
},
{
"suggestionId": "Wco6Fqz_jacPvKJJMFUdug",
"suggestionType": "dialer_action",
"phoneNumber": "+919876543212",
"displayText": "Call Now",
"postback": "call_now"
}
 ]
 }

    `,
    },

    {
      id: 1,
      title: "400 Bad Request",
      requestPrefix: `
    {
"error": {
"code": 400,
"message": "Please provide a valid bot id",
"status": "Bad Request"
}
}
    `,
    },
  ];

  const fetchTempListBot = [
    {
      id: 0,
      title: "200 Ok",
      requestPrefix: `
    {
"templateList": [
{
"name": "Rich card 1",
"lastUpdate": "Jun 30, 2023",
"status": "pending",
"templateType": "rich_card"
},
{
"name": "Text template 1",
"lastUpdate": "Jun 29, 2023",
"status": "approved",
"templateType": "text_message"
},
{
"name": "Rich card carousel",
"lastUpdate": "Jun 28, 2023",
"status": "rejected",
"templateType": "carousel"
}
]}
    `,
    },

    {
      id: 1,
      title: "400 Bad Request",
      requestPrefix: `
    {
"error": {
"code": 400,
"message": "Please provide a valid bot id",
"status": "Bad Request"
}
}

    `,
    },
  ];

  const getTempStatus = [
    {
      id: 0,
      title: "200 Ok",
      requestPrefix: `
    {
"templateStatus": "pending"
}
    `,
    },
    {
      id: 1,
      title: "400 Bad Request",
      requestPrefix: `
    {
"error": {
"code": 400,
"message": "Please provide a valid bot id",
"status": "Bad Request"
}
}
    `,
    },
  ];

  const callbckNotification = [
    {
      id: 0,
      title: "200 Ok",
      requestPrefix: `Ok
    
    `,
    },

    {
      id: 1,
      title: "400 Bad Request",
      requestPrefix: `
    {
"error": {
"code": 400,
"message": "Required parameter statusDetails is missing",
"status": "Bad Request"
}
}
    `,
    },
    {
      id: 2,
      title: "403 Forbidden",
      requestPrefix: `
   {
  "error": {
    "code": 403,
    "message": "Please provide a valid bot id",
    "status": "Forbidden"
  }
}

    `,
    },
  ];

  return (
    <div
      className={`flex w-[100%]  ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
      }`}
    >
      {/* Main Content */}
      <div className=" p-4 lg:p-8 overflow-y-auto w-full">
        <section id="delete-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              DELETE TEMPLATE
            </h2>
          </div>
          <div className="flex flex-col  justify-center md:text-start w-2xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-sm popins">
              This API is used to delete a template (approved or non-approved).
            </p>
            <p className="text-sm popins">
              The name is the name of the template passed during submission.
            </p>
            <p className="text-sm popins">
              The template name must be Base64 URL Encoded.
            </p>
          </div>
          <div className="mt-5 flex justify-center ">
            <BaseURL
              urlPrefix="serverRoot"
              requestType="DELETE"
              param="/{name}"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Path Variables
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
           
              <Table columns={PathVariableColumns}>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    name *
                  </td>
                  <td className="px-4 py-4 text-sm popins">Max length 20</td>
                  <td className="px-4 py-4 text-sm popins">
                    Template name
                    <span className="text-orange-400">
                      {" "}
                      Base 64 URL Encoded
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g.”wtcfinaleng”
                  </td>
                </tr>
              </Table>
          
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Headers
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
              <Table columns={HeaderTableColumns}>
                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">content-type</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    application/json
                  </td>
                </tr>

                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">api_key</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    secret key. E.g. agyduem45c
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-sm popins">botid</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    registered bot id. E.g. OsOsQ0GwNvUdLT V9Bd
                  </td>
                </tr>
              </Table>
           
          </div>

          {/* <div> */}
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins ">
              RESPONSE PARAMETERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ml-6 mr-6">
           
              <Table columns={ResponseParameterDeleteTemplateColumn}>
                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    error
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Error response object that includes code, message and status
                    below
                  </td>
                  <td className="px-4 py-4">-</td>
                </tr>
                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    code
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    HTTP status code
                  </td>
                  <td className="px-4 py-4"> - </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    message
                  </td>
                  <td className="px-4 py-4  text-sm popins ">
                    Error message / Success message
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Eg., Please provide a valid bot id ,Template {"name"}
                    deleted successfully!
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    status
                  </td>
                  <td className="px-4 py-4  text-sm popins ">HTTP status</td>
                  <td className="px-4 py-4  text-sm popins">
                    E.g,Ok , Bad request , Forbidden, Internal server error
                  </td>
                </tr>
              </Table>
            
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              RESPONSE SAMPLE
            </h2>
          </div>
          <div className="mt-5 flex justify-center">
            <ResponseSample tabsContentResponseSample={deleteRes} />
          </div>

          {/* </div> */}
        </section>

        <section id="get-template-details" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              GET TEMPLATE DETAILS
            </h2>
          </div>
          <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-sm  popins ">
              This API is used to get the details of a specified template.
            </p>
            <p className="text-sm  popins ">
              The botId and the name are the same attributes that are passed
              during the template submission process.
            </p>
            <p className="text-sm  popins ">
              The template name must be Base64 URL Encoded.
            </p>
          </div>
          <div className="mt-5 flex justify-center ">
            <BaseURL urlPrefix="serverRoot" requestType="GET" param="/{name}" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Path Variables
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
            
              <Table columns={PathVariableColumns}>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    name *
                  </td>
                  <td className="px-4 py-4 text-sm popins">Max length 20</td>
                  <td className="px-4 py-4 text-sm popins">
                    Template name
                    <span className="text-orange-400">
                      {" "}
                      Base 64 URL Encoded
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g.”wtcfinaleng”
                  </td>
                </tr>
              </Table>
           
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Headers
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
           
              <Table columns={HeaderTableColumns}>
                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">content-type</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    application/json
                  </td>
                </tr>

                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">api_key</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    secret key. E.g. agyduem45c
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-sm popins">botid</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    registered bot id. E.g. OsOsQ0GwNvUdLT V9Bd
                  </td>
                </tr>
              </Table>
           
          </div>

          {/* <div> */}
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins ">
              RESPONSE PARAMETERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ml-6 mr-6">
           
              <Table columns={ResponseParameterGetTemplateDetailsColumn}>
                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    error
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Error response object that includes code, message and status
                    below
                  </td>
                  <td className="px-4 py-4">-</td>
                </tr>
                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    code
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    HTTP status code
                  </td>
                  <td className="px-4 py-4"> - </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    message
                  </td>
                  <td className="px-4 py-4  text-sm popins ">Error message</td>
                  <td className="px-4 py-4  text-sm popins">
                    Eg., Template with name wtyggff45g is already
                  </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    status
                  </td>
                  <td className="px-4 py-4  text-sm popins ">HTTP status</td>
                  <td className="px-4 py-4  text-sm popins">
                    E.g , Ok, Bad request ,Forbidden, Internal server error.
                  </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    cardId
                  </td>
                  <td className="px-4 py-4  text-sm popins ">
                    For rich_card and carousel types CardId will be present
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    E.g , sjjdqz_jacPvKJJMFUdug
                  </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    suggestionId
                  </td>
                  <td className="px-4 py-4  text-sm popins ">Suggestion id</td>
                  <td className="px-4 py-4  text-sm popins">
                    E.g , sjjdqz_jacPvKJJMFUdug
                  </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    mediaUrl
                  </td>
                  <td className="px-4 py-4  text-sm popins ">
                    Media file uploaded URL
                  </td>
                  <td className="px-4 py-4  text-sm popins">-</td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    thumbnailUrl
                  </td>
                  <td className="px-4 py-4  text-sm popins ">
                    Thumbnail file uploaded URL
                  </td>
                  <td className="px-4 py-4  text-sm popins">-</td>
                </tr>
              </Table>
           
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              RESPONSE SAMPLE
            </h2>
          </div>
          <div className="mt-2 flex justify-center">
            <ResponseSample tabsContentResponseSample={getTempDetails} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              HTTP Response Codes
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
           
              <Table columns={httpTableColoumn}>
                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins  font-normal">400</td>
                  <td className="px-4 py-4 text-sm popins font-normal text-red-500">
                    Bad Request
                  </td>
                </tr>
                <tr className={`${colors.tableBorder} border-b`}>
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal">403</td>
                  <td className="px-4 py-4 text-sm popins font-normal">
                    {" "}
                    Forbidden
                  </td>
                </tr>

                <tr className={`${colors.tableBorder} border-b`}>
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal ">500</td>
                  <td className="px-4 py-4 text-sm popins font-normal">
                    Internal server error
                  </td>
                </tr>

                <tr className={`${colors.tableBorder} border-b`}>
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal ">200</td>
                  <td className="px-4 py-4 text-sm popins font-normal text-green-700">
                    OK
                  </td>
                </tr>

                <tr>
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal ">405</td>
                  <td className="px-4 py-4 text-sm popins font-normal">
                    Method not allowed
                  </td>
                </tr>
              </Table>
            </div>
         
        </section>

        <section id="fetch-template-list-for-bot" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex text-center mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              FETCH TEMPLATE LIST FOR BOT
            </h2>
          </div>
          <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-sm  popins ">
              This API is used to fetch the templates for a specified bot. You
              can pass the status parameter to retrieve only those templates
              with the specified status.
            </p>
            <p className="text-sm popins">
              By default it will return all templates for that bot{" "}
            </p>
          </div>
          <div className="mt-5 flex justify-center ">
            <BaseURL
              urlPrefix="serverRoot"
              requestType="GET"
              param="?status=approved"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Path Variables
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
           
              <Table columns={PathVariableColumns}>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    status
                  </td>
                  <td className="px-4 py-4 text-sm popins">Optional</td>
                  <td className="px-4 py-4 text-sm popins">
                    Only templates of this status will be retrieved.By default,
                    all templates will be retrieved.
                  </td>
                  <td className="px-4 py-4 text-sm popins">Eg, approved</td>
                </tr>
              </Table>
            
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Headers
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
              <Table columns={HeaderTableColumns}>
                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">content-type</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    application/json
                  </td>
                </tr>

                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">api_key</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    secret key. E.g. agyduem45c
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-sm popins">botid</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    registered bot id. E.g. OsOsQ0GwNvUdLT V9Bd
                  </td>
                </tr>
              </Table>
            
          </div>

          {/* <div> */}
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins ">
              RESPONSE PARAMETERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ml-6 mr-6">
           
              <Table columns={ResponseParameterFetchTemplateListBotColumn}>
                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    error
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Error response object that includes code, message and status
                    below
                  </td>
                  <td className="px-4 py-4">-</td>
                </tr>
                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    code
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    HTTP status code
                  </td>
                  <td className="px-4 py-4"> - </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    message
                  </td>
                  <td className="px-4 py-4  text-sm popins ">Error message</td>
                  <td className="px-4 py-4  text-sm popins">
                    Eg., Please provide a valid bot id
                  </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    status
                  </td>
                  <td className="px-4 py-4 text-sm popins ">HTTP status</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g,Ok , Bad request , Forbidden, Internal server error
                  </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    name
                  </td>
                  <td className="px-4 py-4  text-sm popins"> Template name</td>
                  <td className="px-4 py-4 text-sm"> E.g Rich card 1 </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    lastUpdate
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Last update date
                  </td>
                  <td className="px-4 py-4 text-sm"> E.g Jun 29, 2023</td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    status
                  </td>
                  <td className="px-4 py-4  text-sm popins">Template status</td>
                  <td className="px-4 py-4 text-sm">
                    E.g pending , approved , rejected
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    templateType
                  </td>
                  <td className="px-4 py-4  text-sm popins"> Template type</td>
                  <td className="px-4 py-4 text-sm">
                    rich_card, carousel, text_message
                  </td>
                </tr>
              </Table>
           
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              RESPONSE SAMPLE
            </h2>
          </div>
          <div className="mt-5 flex justify-center">
            <ResponseSample tabsContentResponseSample={fetchTempListBot} />
          </div>
        </section>

        <section id="get-template-status" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex text-center mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              GET TEMPLATE STATUS
            </h2>
          </div>
          <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-sm  popins ">
              This API is used to fetch the status of a specified template..
            </p>
            <p className="text-sm  popins ">
              The template name must be Base64 URL Encoded.
            </p>
          </div>

          <div className="mt-5 flex justify-center ">
            <BaseURL
              urlPrefix="serverRoot"
              requestType="GET"
              param="/{name}/templateStatus"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Path Variables
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
            
              <Table columns={PathVariableColumns}>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    name *
                  </td>
                  <td className="px-4 py-4 text-sm popins">Max length 20</td>
                  <td className="px-4 py-4 text-sm popins">
                    Template name
                    <span className="text-orange-400">
                      {" "}
                      Base 64 URL Encoded
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g.”wtcfinaleng”
                  </td>
                </tr>
              </Table>
            
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Headers
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
          
              <Table columns={HeaderTableColumns}>
                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">content-type</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    application/json
                  </td>
                </tr>

                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">api_key</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    secret key. E.g. agyduem45c
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-sm popins">botid</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    registered bot id. E.g. OsOsQ0GwNvUdLT V9Bd
                  </td>
                </tr>
              </Table>
            
          </div>

          {/* <div> */}
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins ">
              RESPONSE PARAMETERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ml-6 mr-6">
           
              <Table columns={ResponseParameterGetTemplateStatusColumn}>
                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    error
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Error response object that includes code, message and status
                    below
                  </td>
                  <td className="px-4 py-4 text-sm">-</td>
                </tr>
                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    code
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    HTTP status code
                  </td>
                  <td className="px-4 py-4 text-sm"> - </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    message
                  </td>
                  <td className="px-4 py-4  text-sm popins ">Error message</td>
                  <td className="px-4 py-4  text-sm popins">
                    Eg., Please provide a valid bot id
                  </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    status
                  </td>
                  <td className="px-4 py-4  text-sm popins ">HTTP status</td>
                  <td className="px-4 py-4  text-sm popins">
                    E.g,Ok , Bad request , Forbidden, Internal server error
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    templateStatus
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Current Template status
                  </td>
                  <td className="px-4 py-4 text-sm">
                    E.g , pending ,approved, rejected
                  </td>
                </tr>
              </Table>
           
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              RESPONSE SAMPLE
            </h2>
          </div>
          <div className="mt-5 flex justify-center">
            <ResponseSample tabsContentResponseSample={getTempStatus} />
          </div>

          {/* </div> */}
        </section>

        <section id="uploading-media" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex text-center ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              UPLOADING MEDIA
            </h2>
            <p className="text-sm  popins ">
              The media provided in the attribute multimedia_files or url should
              follow the below guidelines
            </p>
          </div>
          <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-sm  popins p-4">
              <span className="font-bold text-sm">
                1. Rich-Card Standalone (Orientation:Vertical, Height:Short):
              </span>{" "}
              The image you specify must be 3:1 aspect ratio, have a max file
              size of 2MB, have an optimal resolution of 1440 pixels x 480
              pixels, and should be a JPEG, JPG, PNG, or GIF. If the image you
              select doesn’t meet these requirements, you’ll have the
              opportunity to update it later. If you are uploading a video, the
              max file size is 10MB
            </p>
            <p className="text-sm  popins p-4 ">
              <span className="font-bold text-sm">
                2. Rich-Card Standalone (Orientation:Vertical, Height:Medium):{" "}
              </span>{" "}
              The image you specify must be 2:1 aspect ratio, have a max file
              size of 2MB, have an optimal resolution of 1440 pixels x 720
              pixels, and should be a JPEG, JPG, PNG, or GIF. If the image you
              select doesn’t meet these requirements, you’ll have the
              opportunity to update it later. If you are uploading a video, the
              max file size is 10MB
            </p>
            <p className="text-sm  popins p-4 ">
              <span className="font-bold text-sm">
                3. Rich-Card Standalone (Orientation:Horizontal):
              </span>{" "}
              The image you specify must be 3:4 aspect ratio, have a max file
              size of 2MB, have an optimal resolution of 768 pixels x 1024
              pixels, and should be a JPEG, JPG, PNG, or GIF, and be located at
              a publicly available URL. If the image you select doesn’t meet
              these requirements, you’ll have the opportunity to update it
              later. If you are uploading a video, the max file size is 10MB.
            </p>
            <p className="text-sm  popins p-4 ">
              <span className="font-bold text-sm"> 4. Rich-Card Carousel</span>
              <div className="flex flex-wrap justify-center text-sm popins w-4xl mx-auto mt-2">
                <ul className="space-y-2 p-2">
                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Card Height: Short, Card Width: Small (Aspect Ratio 5:4,
                    Optimal Resolution 960 x 720 px)
                  </li>
                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Card Height: Short, Card Width: Medium (Aspect Ratio 2:1,
                    Optimal Resolution 1440 x 720 px)
                  </li>
                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Card Height: Medium, Card Width: Small (Aspect Ratio 4:5,
                    Optimal Resolution 576 x 720 px)
                  </li>
                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />{" "}
                    Card Height: Medium, Card Width: Medium (Aspect Ratio 4:3,
                    Optimal Resolution 1440 x 1080 px)
                  </li>
                  <li className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />{" "}
                    If you are uploading a video, the max file size is 5 MB f.
                    If you are uploading a image, the max file size is 1MB.
                  </li>
                </ul>
              </div>
            </p>

            <p className="text-sm  popins p-4 ">
              <span className="font-bold text-sm popins">
                5. Video Thumbnail:{" "}
              </span>
              The thumbnail image you specify must be with a recommended file
              size of 40 KB and a recommended maximum size of 100 KB and should
              be a JPEG, JPG, PNG. The thumbnail image in the attribute
              multimedia_files should follow the below guidelines:
              <div className="flex flex-wrap justify-center text-sm popins w-4xl mx-auto mt-2">
                <ul className="space-y-2 p-2">
                  <ol className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />{" "}
                    Rich-Card Standalone (Orientation:Vertical, Height:Short):
                    The thumbnail image you specify must be 3:1 aspect ratio.
                  </ol>
                  <ol className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />{" "}
                    Rich-Card Standalone (Orientation:Vertical, Height:Medium):
                    The thumbnail image you specify must be 7:3 aspect ratio.
                  </ol>
                  <ol className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Rich-Card Standalone (Orientation:Horizontal): The thumbnail
                    image you specify must be 25:33 aspect ratio.{" "}
                  </ol>

                  <ol className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Rich-Card Carousel (SMALL_WIDTH && MEDIUM_HEIGHT) The
                    thumbnail image you specify must be 4:5 aspect ratio.
                  </ol>

                  <ol className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Rich-Card Carousel (SMALL_WIDTH && SHORT_HEIGHT) The
                    thumbnail image you specify must be 5:4 aspect ratio.
                  </ol>

                  <ol className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Rich-Card Carousel (MEDIUM_WIDTH && SHORT_HEIGHT) The
                    thumbnail image you specify must be 2:1 aspect ratio.
                  </ol>

                  <ol className="relative pl-6">
                    {" "}
                    <CircleIcon
                      className="absolute left-0 top-1.5 text-gray-500"
                      style={{ fontSize: "0.4rem" }}
                    />
                    Rich-Card Carousel (MEDIUM_WIDTH && MEDIUM_HEIGHT) The
                    thumbnail image you specify must be 4:3 aspect ratio.
                  </ol>
                </ul>
              </div>
            </p>
          </div>
        </section>

        <section id="callback-notifications" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              CALLBACK NOTIFICATIONS
            </h2>
          </div>
          <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-sm  popins ">
              All state changes of the template will be notified to the URL
              provided by the you during account creation.
            </p>
            <p className="text-sm  popins ">
              When the admin approves or rejects the template this callback API
              is called.
            </p>

            <p className="text-sm  popins ">
              The status details about the template posted in json format are
              defined below.
            </p>
            <p className="text-sm  popins ">
              The recipient is expected to send back status 200 OK on receiving
              these details.
            </p>

            <p className="text-sm  popins ">
              If there is any error, the recipient's side can follow the
              standard error responses defined below.
            </p>
          </div>

          {/* <div> */}
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins ">
              REQUEST PARAMETERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ml-6 mr-6">
            
              <Table columns={RequestParameterCallbackNotificationsColumn}>
                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    event
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Template approval/rejection status
                  </td>
                  <td className="px-4 py-4 text-sm">value : templateStatus</td>
                </tr>
                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    name
                  </td>
                  <td className="px-4 py-4  text-sm popins">Template name</td>
                  <td className="px-4 py-4 text-sm"> E.g Diwali_Offers </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    botId
                  </td>
                  <td className="px-4 py-4  text-sm popins ">
                    Registered botId
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    e.g. OsOsQ0GwNvUdLTV9Bd
                  </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    event
                  </td>
                  <td className="px-4 py-4  text-sm popins ">
                    Template approval/rejection status
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    value : templateStatus
                  </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    status
                  </td>
                  <td className="px-4 py-4  text-sm popins ">
                    Template status
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    E.g pending , comment, rejected
                  </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    templatetype
                  </td>
                  <td className="px-4 py-4  text-sm popins">Template Type</td>
                  <td className="px-4 py-4 text-sm">
                    rich_card, carousel, text_message
                  </td>
                </tr>

                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    comment
                  </td>
                  <td className="px-4 py-4  text-sm popins">Admin Comment</td>
                  <td className="px-4 py-4 text-sm">comment</td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    lastUpdate
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Last updated date
                  </td>
                  <td className="px-4 py-4 text-sm">E.g Jun 29, 2023</td>
                </tr>
              </Table>
           
          </div>

          <div className="mt-5 flex justify-center">
            <SamplePostData />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              HTTP Response Codes
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
              <Table columns={httpTableColoumn}>
                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins  font-normal">400</td>
                  <td className="px-4 py-4 text-sm popins font-normal text-red-500">
                    Bad Request
                  </td>
                </tr>
                <tr className={`${colors.tableBorder} border-b`}>
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal">403</td>
                  <td className="px-4 py-4 text-sm popins font-normal">
                    {" "}
                    Forbidden
                  </td>
                </tr>

                <tr className={`${colors.tableBorder} border-b`}>
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal ">500</td>
                  <td className="px-4 py-4 text-sm popins font-normal">
                    Internal server error
                  </td>
                </tr>

                <tr className={`${colors.tableBorder} border-b`}>
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal ">200</td>
                  <td className="px-4 py-4 text-sm popins font-normal text-green-700">
                    OK
                  </td>
                </tr>

                <tr>
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal ">405</td>
                  <td className="px-4 py-4 text-sm popins font-normal">
                    Method not allowed 
                  </td>
                </tr>
              </Table>
            
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              RESPONSE SAMPLE
            </h2>
          </div>
          <div className="mt-5 flex justify-center">
            <ResponseSample tabsContentResponseSample={callbckNotification} />
          </div>
        </section>

        <section id="suggestion-types" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              SUGGESTION TYPES
            </h2>

            <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  ">
              <h2 className="text-md font-medium ">
                Suggestion Type Common Data
              </h2>

              <p className="text-sm   popins">
                The common data applies to any of the suggestions.
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-center items-center">
            
              <Table columns={SuggestionReplyColumn}>
                <tr className={` ${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    displayText 
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Max length is 25 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm">Suggestion display text</td>
                  <td className="px-4 py-4 text-sm">-</td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    Postback
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Max Length 120 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm">Suggestion postback</td>
                  <td className="px-4 py-4">-</td>
                </tr>
              </Table>
           
          </div>

          <h3 className="flex  justify-center items-center gap-2 popins    sm:flex   text-md font-medium mt-10">
            Specific Suggestion detailsfor each type are as below:
          </h3>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex relative">
            <div className="relative flex gap-2 mt-4 -ml-32 md:-ml-120 lg:-ml-145">
              <h3 className="text-base font-normal popins">
                1. Suggestion Reply
              </h3>

              <div
                className="cursor-pointer text-2xl text-green-600 hover:text-green-500 transition-colors"
                onClick={handleToggleSuggestionReplyCard}
                onMouseEnter={
                  !isMobile
                    ? () => setIsSuggestionReplyCardHovered(true)
                    : undefined
                }
                onMouseLeave={
                  !isMobile
                    ? () => setIsSuggestionReplyCardHovered(false)
                    : undefined
                }
              >
                {showSuggestionReplyCard ? <FiEye /> : <FiEyeOff />}
              </div>

              {/* Card for Desktop (Hover) */}
              {!isMobile && (
                <AnimatePresence>
                  {showSuggestionReplyCard && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-50 mt-1 bg-white text-black shadow-lg rounded-2xl p-4 border border-gray-200 z-10 max-w-xs"
                      onMouseEnter={() => setIsSuggestionReplyCardHovered(true)}
                      onMouseLeave={() =>
                        setIsSuggestionReplyCardHovered(false)
                      }
                    >
                      <pre className="rounded-lg p-3 text-sm overflow-x-auto">
                        {JSON.stringify(
                          {
                            suggestionType: "reply",
                            displayText: "Click to Win",
                            postback: "click_to_win",
                          },
                          null,
                          2
                        )}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Dialog for Mobile */}
            {isMobile && (
              <Dialog
                header="Suggestion Reply"
                visible={isSuggestionReplyCardOpen}
                onHide={() => setIsSuggestionReplyCardOpen(false)}
                style={{ width: "90vw", maxWidth: "400px" }}
                modal
              >
                <pre className="rounded-lg p-3 text-sm text-black overflow-x-auto">
                  {JSON.stringify(
                    {
                      suggestionType: "reply",
                      displayText: "Click to Win",
                      postback: "click_to_win",
                    },
                    null,
                    2
                  )}
                </pre>
              </Dialog>
            )}

            {/* Table Section */}
            <div className="mt-1 pb-1">
              <div className="mt-5 flex justify-center items-center ml-6 mr-6">
               
                  <Table columns={SuggestionReplyColumn}>
                    <tr>
                      <td className="px-4 py-4 text-orange-400 text-sm popins">
                        suggestionType
                      </td>
                      <td className="px-4 py-4  text-sm popins">
                        Max Length 120 reply
                      </td>
                      <td className="px-4 py-4 text-sm">-</td>
                      <td className="px-4 py-4 text-sm">e.g.reply</td>
                    </tr>
                  </Table>
               
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex   text-md font-medium mt-10">
            <h3 className="text-base font-normal text-start popins mt-4 -ml-32 md:-ml-120 lg:-ml-148">
              2. Suggestion Action
            </h3>

            <div className="flex flex-col justify-center items-center gap-2 popins sm:flex relative">
              <div className="relative flex gap-2 mt-4 -ml-32 md:-ml-120 lg:-ml-145">
                <h4 className="text-base font-normal text-center popins">
                  a. Dialer action
                </h4>

                {/* Button */}

                <button
                  className="cursor-pointer text-2xl text-green-600 hover:text-green-500 transition-colors"
                  onClick={handleToggleDialerActionCard}
                  onMouseEnter={
                    !isMobile
                      ? () => setIsDialerActionCardOpen(true)
                      : undefined
                  }
                  onMouseLeave={
                    !isMobile
                      ? () => setIsDialerActionCardOpen(false)
                      : undefined
                  }
                >
                  {showDialerActionCard ? <FiEye /> : <FiEyeOff />}
                </button>

                {/* Card for Desktop (Hover) */}
                {!isMobile && (
                  <AnimatePresence>
                    {showDialerActionCard && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-45 -mt-4 bg-white text-black shadow-lg rounded-2xl p-4 border border-gray-200 z-10 max-w-xs"
                        style={{ top: "100%" }}
                        onMouseEnter={() => setIsDialerActionCardHovered(true)}
                        onMouseLeave={() => setIsDialerActionCardHovered(false)}
                      >
                        <pre className=" rounded-lg p-3 text-sm font-normal  overflow-x-auto">
                          {JSON.stringify(
                            {
                              suggestionType: "dialer_action",
                              phoneNumber: "+919876543212",
                              displayText: "Call Now",
                              postback: "call_now",
                            },
                            null,
                            2
                          )}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Dialog for Mobile */}
              {isMobile && (
                <Dialog
                  header="Dialer action"
                  visible={isDialerActionCardOpen}
                  onHide={() => setIsDialerActionCardOpen(false)}
                  style={{ width: "90vw", maxWidth: "400px" }}
                  modal
                >
                  <pre className=" rounded-lg p-3 text-sm text-black overflow-x-auto">
                    {JSON.stringify(
                      {
                        suggestionType: "dialer_action",
                        phoneNumber: "+919876543212",
                        displayText: "Call Now",
                        postback: "call_now",
                      },
                      null,
                      2
                    )}
                  </pre>
                </Dialog>
              )}

              <div className="relative mt-1 pb-1">
                {/* Table */}

                <div className="mt-5 flex justify-center items-center ">
                  
                    <Table columns={SuggestionReplyColumn}>
                      <tr className={`${colors.tableBorder} border-b`}>
                        <td className="px-4 py-4 text-orange-400 text-sm popins">
                          suggestionType
                        </td>

                        <td className="px-4 py-4 text-sm font-normal popins">
                          dialer_action
                        </td>

                        <td className="px-4 py-4 text-sm">-</td>

                        <td className="px-4 py-4 text-sm font-normal">
                          e.g.dialer_action
                        </td>
                      </tr>

                      <tr>
                        <td className="px-4 py-4 text-orange-400 text-sm popins">
                          phoneNumber
                        </td>

                        <td className="px-4 py-4  text-sm popins">-</td>

                        <td className="px-4 py-4 text-sm font-normal">
                          Valid phone number
                        </td>

                        <td className="px-4 py-4 text-sm font-normal">
                          E.g +919876543212
                        </td>
                      </tr>
                    </Table>
                 
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2 popins sm:flex relative mt-10">
              <div className="relative flex gap-2 mt-4 -ml-32 md:-ml-120 lg:-ml-145">
                <h4 className="text-base font-normal  popins ">
                  b. URL action
                </h4>

                {/* Button */}

                <button
                  className="cursor-pointer text-2xl text-green-600 hover:text-green-500 transition-colors"
                  onClick={handleToggleUrlActionCard}
                  onMouseEnter={
                    !isMobile ? () => setIsUrlActionCardOpen(true) : undefined
                  }
                  onMouseLeave={
                    !isMobile ? () => setIsUrlActionCardOpen(false) : undefined
                  }
                >
                  {showUrlActionCard ? <FiEye /> : <FiEyeOff />}
                </button>

                {/* Card for Desktop (Hover) */}
                {!isMobile && (
                  <AnimatePresence>
                    {showUrlActionCard && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-40 -mt-4 bg-white text-black shadow-lg rounded-2xl p-4 border border-gray-200 z-10 max-w-xs"
                        style={{ top: "100%" }}
                        onMouseEnter={() => setIsUrlActionCardHovered(true)}
                        onMouseLeave={() => setIsUrlActionCardHovered(false)}
                      >
                        <pre className=" rounded-lg p-3 text-sm font-normal overflow-x-auto">
                          {JSON.stringify(
                            {
                              suggestionType: "url_action",
                              url: "https://brandx.onelink.me/",
                              displayText: "Answer and Win",
                              postback: "answer_and_win",
                            },
                            null,
                            2
                          )}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Dialog for Mobile */}
              {isMobile && (
                <Dialog
                  header="URL action"
                  visible={isUrlActionCardOpen}
                  onHide={() => setIsUrlActionCardOpen(false)}
                  style={{ width: "90vw", maxWidth: "400px" }}
                  modal
                >
                  <pre className=" rounded-lg p-3 text-sm text-black overflow-x-auto">
                    {JSON.stringify(
                      {
                        suggestionType: "url_action",
                        url: "https://brandx.onelink.me/",
                        displayText: "Answer and Win",
                        postback: "answer_and_win",
                      },
                      null,
                      2
                    )}
                  </pre>
                </Dialog>
              )}

              <div className="relative mt-1 pb-1">
                {/* Table */}

                <div className="mt-5 flex justify-center items-center ">
                  
                    <Table columns={SuggestionReplyColumn}>
                      <tr className={`${colors.tableBorder} border-b`}>
                        <td className="px-4 py-4 text-orange-400 text-sm popins">
                          suggestionType
                        </td>

                        <td className="px-4 py-4 text-sm popins font-normal">
                          url_action
                        </td>

                        <td className="px-4 py-4 text-sm">-</td>

                        <td className="px-4 py-4 text-sm font-normal">
                          e.g.url_action
                        </td>
                      </tr>

                      <tr>
                        <td className="px-4 py-4 text-orange-400 text-sm popins">
                          url
                        </td>

                        <td className="px-4 py-4 text-sm popins">-</td>

                        <td className="px-4 py-4 text-sm font-normal">
                          Valid URL
                        </td>

                        <td className="px-4 py-4 text-sm font-normal">
                          E.g https://brandx.onelink.me/
                        </td>
                      </tr>
                    </Table>
                
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex relative mt-10">
            <div className="relative flex gap-2 mt-4 -ml-16 md:-ml-100 lg:-ml-128">
              <h3 className="text-base font-normal popins">
                3. View Location (Lat/Long)
              </h3>

              {/* Button */}
              <div
                className="cursor-pointer text-2xl text-green-600 hover:text-green-500 transition-colors"
                onClick={handleToggleLocationCard}
                onMouseEnter={
                  !isMobile ? () => setIsLocationCardOpen(true) : undefined
                }
                onMouseLeave={
                  !isMobile ? () => setIsLocationCardOpen(false) : undefined
                }
              >
                {showLocationCard ? <FiEye /> : <FiEyeOff />}
              </div>

              {/* Card for Desktop (Hover) */}
              {!isMobile && (
                <AnimatePresence>
                  {showLocationCard && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-66 -mt-4 bg-white text-black shadow-lg rounded-2xl p-4 border border-gray-200 z-10 max-w-s"
                      style={{ top: "100%" }}
                      onMouseEnter={() => setIsLocationCardHovered(true)}
                      onMouseLeave={() => setIsLocationCardHovered(false)}
                    >
                      <pre className=" rounded-lg p-3 text-sm overflow-x-auto">
                        {JSON.stringify(
                          {
                            suggestionType: "view_location_latlong",
                            displayText: "View location",
                            postback: "view_location",
                            latitude: "12.971599",
                            longitude: "77.594566",
                            label: "test",
                          },
                          null,
                          2
                        )}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Dialog for Mobile */}
            {isMobile && (
              <Dialog
                header="View Location (Lat/Long)"
                visible={isLocationCardOpen}
                onHide={() => setIsLocationCardOpen(false)}
                style={{ width: "90vw", maxWidth: "400px" }}
                modal
              >
                <pre className=" rounded-lg p-3 text-black text-sm overflow-x-auto">
                  {JSON.stringify(
                    {
                      suggestionType: "view_location_latlong",
                      displayText: "View location",
                      postback: "view_location",
                      latitude: "12.971599",
                      longitude: "77.594566",
                      label: "test",
                    },
                    null,
                    2
                  )}
                </pre>
              </Dialog>
            )}

            {/* Table Wrapper with relative positioning */}
            <div className="relative mt-1 pb-1">
              <div className="mt-5 flex justify-center items-center">
                
                  <Table columns={SuggestionReplyColumn}>
                    <tr>
                      <td className="px-4 py-4 text-sm popins text-orange-400">
                        suggestionType
                      </td>
                      <td className="px-4 py-4 text-sm popins">
                        view_location_latlong
                      </td>
                      <td className="px-4 py-4 text-sm popins">-</td>
                      <td className="px-4 py-4 text-sm popins">
                        e.g.view_location_latlong
                      </td>
                    </tr>
                    {/* Add other rows similarly */}
                  </Table>
                
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex relative mt-10">
            <div className="relative flex gap-2 mt-4 -ml-4 md:-ml-95 lg:-ml-116">
              <h3 className="text-base font-normal text-start popins ">
                4. View Location (query params) 
              </h3>

              {/* Button */}
              <div
                className="cursor-pointer text-2xl text-green-600 hover:text-green-500 transition-colors"
                onClick={handleToggleLocationQueryCard}
                onMouseEnter={
                  !isMobile ? () => setIsLocationQueryCardOpen(true) : undefined
                }
                onMouseLeave={
                  !isMobile
                    ? () => setIsLocationQueryCardOpen(false)
                    : undefined
                }
              >
                {showLocationQueryCard ? <FiEye /> : <FiEyeOff />}
              </div>

              {/* Card for Desktop (Hover) */}
              {!isMobile && (
                <AnimatePresence>
                  {showLocationQueryCard && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-76 -mt-4 bg-white text-black shadow-lg rounded-2xl p-4 border border-gray-200 z-10 max-w-s"
                      style={{ top: "100%" }}
                      onMouseEnter={() => setIsLocationQueryCardHovered(true)}
                      onMouseLeave={() => setIsLocationQueryCardHovered(false)}
                    >
                      <pre className=" rounded-lg p-3 text-sm  overflow-x-auto">
                        {JSON.stringify(
                          {
                            suggestionType: "view_location_query",
                            displayText: "View location",
                            postback: "view_location",
                            query: "Bangalore",
                          },
                          null,
                          2
                        )}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Dialog for Mobile */}
            {isMobile && (
              <Dialog
                header="View Location (query params)"
                visible={isLocationQueryCardOpen}
                onHide={() => setIsLocationQueryCardOpen(false)}
                style={{ width: "90vw", maxWidth: "400px" }}
                modal
              >
                <pre className=" rounded-lg p-3 text-sm text-black overflow-x-auto">
                  {JSON.stringify(
                    {
                      suggestionType: "view_location_query",
                      displayText: "View location",
                      postback: "view_location",
                      query: "Bangalore",
                    },
                    null,
                    2
                  )}
                </pre>
              </Dialog>
            )}

            {/* Table Wrapper with relative positioning */}
            <div className="relative mt-1 pb-1">
              {/* Table */}
              <div className="mt-5 flex justify-center items-center ">
                
                  <Table columns={SuggestionReplyColumn}>
                    <tr className={` ${colors.tableBorder} border-b`}>
                      <td className="px-4 py-4 text-orange-400 text-sm popins">
                        suggestionType
                      </td>
                      <td className="px-4 py-4  text-sm popins">
                        view_location_query
                      </td>
                      <td className="px-4 py-4">-</td>
                      <td className="px-4 py-4 text-sm">
                        e.g.view_location_query
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-4 text-orange-400 text-sm popins">
                        query
                      </td>
                      <td className="px-4 py-4  text-sm popins">-</td>
                      <td className="px-4 py-4 text-sm">
                        Valid location name{" "}
                      </td>
                      <td className="px-4 py-4 text-sm">E.g Bangalore</td>
                    </tr>
                  </Table>
               
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 popins sm:flex relative mt-10">
            <div className="relative flex gap-2 mt-4 -ml-32 md:-ml-120 lg:-ml-148">
              <h3 className="text-base font-normal  popins">
                5. Share Location
              </h3>

              {/* Button */}
              <div
                className="cursor-pointer text-2xl text-green-600 hover:text-green-500 transition-colors"
                onClick={handleToggleShareLocationCard}
                onMouseEnter={
                  !isMobile ? () => setIsShareLocationCardOpen(true) : undefined
                }
                onMouseLeave={
                  !isMobile
                    ? () => setIsShareLocationCardOpen(false)
                    : undefined
                }
              >
                {showShareLocationCard ? <FiEye /> : <FiEyeOff />}
              </div>

              {/* Card for Desktop (Hover) */}
              {!isMobile && (
                <AnimatePresence>
                  {showShareLocationCard && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`  absolute left-45 -mt-4 bg-white text-black shadow-lg rounded-2xl p-4 border border-gray-200 z-10 max-w-xs`}
                      style={{ top: "100%" }}
                      onMouseEnter={() => setIsShareLocationCardHovered(true)}
                      onMouseLeave={() => setIsShareLocationCardHovered(false)}
                    >
                      <pre className=" rounded-lg p-3 text-sm  overflow-x-auto">
                        {JSON.stringify(
                          {
                            suggestionType: "share_location",
                            displayText: "locate you",
                            postback: "share_location",
                          },
                          null,
                          2
                        )}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Dialog for Mobile */}
            {isMobile && (
              <Dialog
                header="Share Location"
                visible={isShareLocationCardOpen}
                onHide={() => setIsShareLocationCardOpen(false)}
                style={{ width: "90vw", maxWidth: "400px" }}
                modal
              >
                <pre className=" rounded-lg p-3 text-sm  overflow-x-auto text-black">
                  {JSON.stringify(
                    {
                      suggestionType: "share_location",
                      displayText: "locate you",
                      postback: "share_location",
                    },
                    null,
                    2
                  )}
                </pre>
              </Dialog>
            )}

            {/* Table Wrapper with relative positioning */}
            <div className="relative mt-1 pb-1">
              {/* Table */}
              <div className="mt-5 flex justify-center items-center ">
                
                  <Table columns={SuggestionReplyColumn}>
                    <tr>
                      <td className="px-4 py-4 text-orange-400 text-sm popins">
                        suggestionType
                      </td>
                      <td className="px-4 py-4 text-sm popins">
                        share_location
                      </td>
                      <td className="px-4 py-4 text-sm">-</td>
                      <td className="px-4 py-4 text-sm">e.g.share_location</td>
                    </tr>
                  </Table>
              
              </div>

              {/* Card - Absolutely positioned below the table */}
            </div>
          </div>
        </section>

        <section id="uploading-multimedia-from-url" >
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              UPLOADING MEDIA FROM URL
            </h2>
          </div>
          <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-sm  popins ">
              Users can provide multimedia data as a URL also.(Another way is
              multipart file upload). URL should be a publicly accessible URL
              without any access token, the provided URL will be passed to
              Google RBM as it is.
            </p>

            <p className="text-sm  popins ">
              Custom variables also can be passed with mediaUrl, but cannot be
              passed with thumbnailUrl. If a variable video is provided, it is
              the responsibility of the user to add a thumbnail to it
            </p>
          </div>
        </section>
      </div>

      {/* Mini Map Navigation - Hidden on small screens */}
      <div
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
        } hidden lg:block  h-fit sticky  top-4 p-2 shrink-0 rounded-2xl  mr-4 w-68`}
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
  );
};

export default ManageTemplateRCS;
