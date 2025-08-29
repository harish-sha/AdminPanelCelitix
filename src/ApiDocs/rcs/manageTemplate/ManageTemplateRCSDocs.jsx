import React, { useState, useEffect } from "react";
import BaseURL from "../../components/BaseURL";
import Table from "@/ApiDocs/components/Tablenew";
import ResponseSample from "../../components/ResponseSample";
import SamplePostData from "../../components/SamplePostData";
import CircleIcon from "@mui/icons-material/Circle";
import { Dialog } from "primereact/dialog";
import { useTheme } from "../../context/ThemeContext";

import { motion, AnimatePresence } from "framer-motion";

import { FiEye, FiEyeOff } from "react-icons/fi";

import { themeColors } from "../../themeColors";

const ManageTemplateRCSDocs = () => {
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

  const handleToggleLocationCard = () => {
    if (isMobile) {
      setIsLocationCardOpen(true);
    } else {
      setIsLocationCardHovered((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Tailwind 'lg' breakpoint is 1024px
    };
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

    // const showSuggestionReplyCard = ""

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
      : isShareLocat;
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sections = [
    { id: "get-template-details", title: "Get Template Details" },
    { id: "fetch-template-list-for-bot", title: "Fetch Template List for Bot" },
    { id: "get-template-status", title: "Get Template Status" },
    { id: "uploading-media", title: "Uploading Media" },
    { id: "callback-notifications", title: "Callback Notifications" },
    { id: "suggestion-types", title: "Suggestion Types" },
    { id: "uploading-multimedia-from-url",title: "Uploading Multimedia via URL",
    },
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
      { rootMargin: "-30% 0px -20% 0px", threshold: [0,0.3] }
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
      className={`flex w-[100%]  ${isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
        }`}
    >
      {/* Main Content */}
      <div className="p-4 lg:p-6 overflow-y-auto w-4xl mx-auto">
        <section id="get-template-details" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5 pb-2">
              GET TEMPLATE DETAILS
            </h2>
          </div>
          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="mt-3 text-md flex justify-center items-center">
              This API is used to get the details of a specified template.
            </p>
            <p className="mt-1 text-md flex justify-center items-center">
              The botId and the name are the same attributes that <br /> are
              passed during the template submission process.
            </p>
            <p className="mt-1 text-md flex justify-center items-center">
              The template name must be Base64 URL Encoded.
            </p>
          </div>
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              BASE URL
            </h2>
            <BaseURL urlPrefix="serverRoot" requestType="GET" param="/{name}" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              Path Variables
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    name *
                  </Table.Cell>
                  <Table.Cell align="center">Max length 20</Table.Cell>
                  <Table.Cell align="center">
                    Template name <br />
                    <span className="text-orange-400">Base 64 URL Encoded</span>
                  </Table.Cell>
                  <Table.Cell align="center">e.g.”wtcfinaleng”</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              Headers
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-sm popins" align="center">
                    content-type
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-orange-400">application/json</span>
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-sm popins" align="center">
                    api_key
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-orange-400">
                      secret key. E.g. agyduem45c
                    </span>
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-sm popins" align="center">
                    botid
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-orange-400">
                      registered bot id. E.g. OsOsQ0GwNvUdLT V9Bd
                    </span>
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              RESPONSE PARAMETERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    error
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">
                    Error response object that includes code, message and status
                    below
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    code
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">HTTP status code</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    message
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Error message</Table.Cell>
                  <Table.Cell align="center">
                    Eg., Template with name wtyggff45g is already
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">HTTP status</Table.Cell>
                  <Table.Cell align="center">
                    E.g , Ok, Bad request , Forbidden, Internal server error.
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    cardId
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">
                    For rich_card and carousel types CardId will be present
                  </Table.Cell>
                  <Table.Cell align="center">
                    E.g , sjjdqz_jacPvKJJMFUdug
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    suggestionId
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Suggestion id</Table.Cell>
                  <Table.Cell align="center">
                    E.g , sjjdqz_jacPvKJJMFUdug
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    mediaUrl
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">
                    Media file uploaded URL
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    thumbnailUrl
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">
                    Thumbnail file uploaded URL
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              RESPONSE SAMPLE
            </h2>
          </div>
          <div className="w-full mt-10">
            <ResponseSample tabsContentResponseSample={getTempDetails} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              HTTP Response Codes
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="text-sm popins font-normal"
                  >
                    400
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell
                    align="center"
                    className="text-sm popins font-normal text-red-500"
                  >
                    Bad Request
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="text-sm popins font-normal"
                  >
                    403
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell
                    align="center"
                    className="text-sm popins font-normal"
                  >
                    Forbidden
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="text-sm popins font-normal"
                  >
                    500
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell
                    align="center"
                    className="text-sm popins font-normal"
                  >
                    Internal server error
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="text-sm popins font-normal"
                  >
                    200
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell
                    align="center"
                    className="text-sm popins font-normal text-green-700"
                  >
                    OK
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className="text-sm popins font-normal"
                  >
                    405
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell
                    align="center"
                    className="text-sm popins font-normal"
                  >
                    Method not allowed
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>

        <section id="fetch-template-list-for-bot" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5 pb-2">
              FETCH TEMPLATE LIST FOR BOT
            </h2>
          </div>
          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="mt-3 text-md flex justify-center items-center">
              This API is used to fetch the templates for a specified bot.{" "}
            </p>
            <p className="mt-1 text-md flex justify-center items-center">
              You can pass the status parameter to retrieve only those <br />{" "}
              templates with the specified status.
            </p>

            <p className="mt-1 text-md flex justify-center items-center">
              By default it will return all templates for that bot{" "}
            </p>
          </div>
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              BASE URL
            </h2>
            <BaseURL
              urlPrefix="serverRoot"
              requestType="GET"
              param="?status=approved"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              Path Variables
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">Optional</Table.Cell>
                  <Table.Cell align="center">
                    Only templates of this status will be retrieved. <br />
                    By default, all templates will be retrieved.
                  </Table.Cell>
                  <Table.Cell align="center">Eg, approved</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              Headers
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    content-type
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-orange-400">application/json</span>
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    api_key
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-orange-400">
                      secret key. E.g. agyduem45c
                    </span>
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    botid
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-orange-400">
                      registered bot id. E.g. OsOsQ0GwNvUdLT V9Bd
                    </span>
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              RESPONSE PARAMETERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    error
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    Error response object that includes code, message and status
                    below
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    code
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">HTTP status code</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    message
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Error message</Table.Cell>
                  <Table.Cell align="center">
                    Eg., Please provide a valid bot id
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">HTTP status</Table.Cell>
                  <Table.Cell align="center">
                    E.g, Ok, Bad request, Forbidden, Internal server error
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    name
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Template name</Table.Cell>
                  <Table.Cell align="center">E.g Rich card 1</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    lastUpdate
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Last update date</Table.Cell>
                  <Table.Cell align="center">E.g Jun 29, 2023</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Template status</Table.Cell>
                  <Table.Cell align="center">
                    E.g pending, approved, rejected
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    templateType
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Template type</Table.Cell>
                  <Table.Cell align="center">
                    rich_card, carousel, text_message
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              RESPONSE SAMPLE
            </h2>
          </div>
          <div className="w-full mt-10">
            <ResponseSample tabsContentResponseSample={fetchTempListBot} />
          </div>
        </section>

        <section id="get-template-status" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5 pb-2">
              GET TEMPLATE STATUS
            </h2>
          </div>
          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="mt-3 text-md flex justify-center items-center">
              This API is used to fetch the status of a specified template..
            </p>
            <p className="mt-1 text-md flex justify-center items-center">
              The template name must be Base64 URL Encoded.
            </p>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              BASE URL
            </h2>
            <BaseURL
              urlPrefix="serverRoot"
              requestType="GET"
              param="/{name}/templateStatus"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              Path Variables
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    name *
                  </Table.Cell>
                  <Table.Cell align="center">Max length 20</Table.Cell>
                  <Table.Cell align="center">
                    Template name <br />
                    <span className="text-orange-400">Base 64 URL Encoded</span>
                  </Table.Cell>
                  <Table.Cell align="center">e.g.”wtcfinaleng”</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              Headers
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    content-type
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-orange-400">application/json</span>
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    api_key
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-orange-400">
                      secret key. E.g. agyduem45c
                    </span>
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    botid
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-orange-400">
                      registered bot id. E.g. OsOsQ0GwNvUdLT V9Bd
                    </span>
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              RESPONSE PARAMETERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                {/* Header Table */}
                <Table.Row>
                  <Table.Cell align="center">content-type</Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Content Type header</Table.Cell>
                  <Table.Cell className="text-orange-400" align="center">
                    application/json
                  </Table.Cell>
                </Table.Row>

                {/* Response Parameter Table */}
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    error
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    Error response object that includes code, message and status
                    below
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    code
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">HTTP status code</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    message
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Error message</Table.Cell>
                  <Table.Cell align="center">
                    Eg., Please provide a valid bot id
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">HTTP status</Table.Cell>
                  <Table.Cell align="center">
                    E.g, Ok, Bad request, Forbidden, Internal server error
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    templateStatus
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    Current Template status
                  </Table.Cell>
                  <Table.Cell align="center">
                    E.g, pending, approved, rejected
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              RESPONSE SAMPLE
            </h2>
          </div>
          <div className="w-full mt-10">
            <ResponseSample tabsContentResponseSample={getTempStatus} />
          </div>
        </section>

        <section id="uploading-media" className="mb-16">
          <div className="flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-wide mb-6  pb-2">
              UPLOADING MEDIA
            </h2>
          </div>

          {/* Intro Text */}
          <div className="max-w-3xl mx-auto text-center md:text-start mt-4">
            <p className="text-base md:text-lg text-gray-700">
              The media provided in the attribute{" "}
              <span className="font-semibold text-gray-700">
                multimedia_files
              </span>{" "}
              or <span className="font-semibold text-gray-700">url</span> should
              follow the below guidelines:
            </p>
          </div>

          {/* Guidelines */}
          <div className="max-w-4xl mx-auto mt-6 space-y-6 ">
            {/* Point 1 */}
            <p className="text-sm md:text-base leading-relaxed ">
              <span className="font-bold text-gray-700">
                1. Rich-Card Standalone (Orientation: Vertical, Height: Short):
              </span>{" "}
              The image must be 3:1 aspect ratio, max 2MB, optimal resolution{" "}
              <span className="font-medium">1440x480px</span>, format:
              JPEG/JPG/PNG/GIF. Video uploads: max file size 10MB.
            </p>

            {/* Point 2 */}
            <p className="text-sm md:text-base leading-relaxed  ">
              <span className="font-bold text-gray-700">
                2. Rich-Card Standalone (Orientation: Vertical, Height: Medium):
              </span>{" "}
              The image must be 2:1 aspect ratio, max 2MB, optimal resolution{" "}
              <span className="font-medium">1440x720px</span>, format:
              JPEG/JPG/PNG/GIF. Video uploads: max file size 10MB.
            </p>

            {/* Point 3 */}
            <p className="text-sm md:text-base leading-relaxed   ">
              <span className="font-bold text-gray-700">
                3. Rich-Card Standalone (Orientation: Horizontal):
              </span>{" "}
              The image must be 3:4 aspect ratio, max 2MB, optimal resolution{" "}
              <span className="font-medium">768x1024px</span>, format:
              JPEG/JPG/PNG/GIF. Video uploads: max file size 10MB.
            </p>

            {/* Point 4 */}
            <div className="text-sm md:text-base leading-relaxed  p-4 ">
              <span className="font-bold text-gray-700">
                4. Rich-Card Carousel:
              </span>
              <ul className="list-none mt-3 space-y-2 w-xl mx-auto">
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Card Height: Short, Width: Small (5:4, 960x720px)
                </li>
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Card Height: Short, Width: Medium (2:1, 1440x720px)
                </li>
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Card Height: Medium, Width: Small (4:5, 576x720px)
                </li>
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Card Height: Medium, Width: Medium (4:3, 1440x1080px)
                </li>
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Video max file size: <span className="font-medium">5MB</span>,
                  Image max file size: <span className="font-medium">1MB</span>
                </li>
              </ul>
            </div>

            {/* Point 5 */}
            <div className="text-sm md:text-base leading-relaxed  p-4 ">
              <span className="font-bold text-gray-700">
                5. Video Thumbnail:
              </span>
              Recommended file size <span className="font-medium">40KB</span>{" "}
              (max 100KB), format: JPEG/JPG/PNG.
              <ul className="list-none mt-3 space-y-2 w-xl mx-auto">
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Standalone (Vertical, Short) → 3:1 ratio
                </li>
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Standalone (Vertical, Medium) → 7:3 ratio
                </li>
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Standalone (Horizontal) → 25:33 ratio
                </li>
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Carousel (Small Width, Medium Height) → 4:5 ratio
                </li>
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Carousel (Small Width, Short Height) → 5:4 ratio
                </li>
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Carousel (Medium Width, Short Height) → 2:1 ratio
                </li>
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-400"
                    style={{ fontSize: "0.45rem" }}
                  />
                  Carousel (Medium Width, Medium Height) → 4:3 ratio
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="callback-notifications" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5  pb-2">
              CALLBACK NOTIFICATIONS
            </h2>
          </div>
          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="mt-3 text-md flex justify-center items-center">
              All state changes of the template will be notified to the URL
              provided by the you <br /> during account creation.
            </p>
            <p className="mt-1 text-md flex justify-center items-center">
              When the admin approves or rejects the template this callback API
              is called.
            </p>

            <p className="mt-1 text-md flex justify-center items-center">
              The status details about the template posted in json format are
              defined below.
            </p>
            <p className="mt-1 text-md flex justify-center items-center">
              The recipient is expected to send back status 200 OK on receiving
              these details.
            </p>

            <p className="mt-1 text-md flex justify-center items-center">
              If there is any error, the recipient's side can follow the
              standard error responses <br /> defined below.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              REQUEST PARAMETERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-sm popins" align="center">
                    content-type
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Header type</Table.Cell>
                  <Table.Cell className="text-orange-400" align="center">
                    application/json
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    error
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    Error response object that includes code, message and status
                    below
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    code
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">HTTP status code</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    message
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Error message</Table.Cell>
                  <Table.Cell align="center">
                    Eg., Please provide a valid bot id
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">HTTP status</Table.Cell>
                  <Table.Cell align="center">E.g, Ok, Bad request</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    event
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    Template approval/rejection status
                  </Table.Cell>
                  <Table.Cell align="center">value : templateStatus</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    name
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Template name</Table.Cell>
                  <Table.Cell align="center">E.g Diwali_Offers</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    botId
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Registered botId</Table.Cell>
                  <Table.Cell align="center">
                    e.g. OsOsQ0GwNvUdLTV9Bd
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    event
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    Template approval/rejection status
                  </Table.Cell>
                  <Table.Cell align="center">value : templateStatus</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Template status</Table.Cell>
                  <Table.Cell align="center">
                    E.g pending, comment, rejected
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    templatetype
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Template type</Table.Cell>
                  <Table.Cell align="center">
                    rich_card, carousel, text_message
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    comment
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Admin Comment</Table.Cell>
                  <Table.Cell align="center">comment</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    lastUpdate
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Last updated date</Table.Cell>
                  <Table.Cell align="center">E.g Jun 29, 2023</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              POST SAMPLE DATA
            </h2>
          </div>
          <div className="w-full mt-10">
            <SamplePostData />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              HTTP Response Codes
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    400
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center" className="text-red-500">
                    Bad Request
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    403
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    500
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Internal server error</Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    200
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center" className="text-green-700">
                    OK
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    405
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Method not allowed</Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-4">
              RESPONSE SAMPLE
            </h2>
          </div>
          <div className="w-full mt-10">
            <ResponseSample tabsContentResponseSample={callbckNotification} />
          </div>
        </section>

        <section id="suggestion-types" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5 pb-2">
              SUGGESTION TYPES
            </h2>

            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className="mt-3 text-md flex justify-center items-center">
                Suggestion Type Common Data
              </p>

              <p className="mt-1 text-md flex justify-center items-center">
                The common data applies to any of the suggestions.
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    displayText
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length is 25 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion display text
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    Postback
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 120 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Suggestion postback</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-10 mb-10 gap-2">
            <h3 className=" text-md flex justify-center items-center ">
              Specific Suggestion details for each type are as below:
            </h3>
            <h3 className="text-base font-medium text-gray-700 popins">
              1. Suggestion Reply
            </h3>
          </div>

          {/* <div
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
              </div> */}

          {/* Card for Desktop (Hover) */}
          {/* {!isMobile && (
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
              )} */}

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

          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                {/* Row 1 - displayText */}
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    displayText
                  </Table.Cell>
                  <Table.Cell align="center">Max length is 25</Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                {/* Row 2 - suggestionType */}
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">Max length 120</Table.Cell>
                  <Table.Cell align="center">reply</Table.Cell>
                  <Table.Cell align="center">e.g. reply</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-10  gap-2">
            <h3 className="text-base font-medium text-gray-700 flex justify-center items-center ">
              2. Suggestion Action
            </h3>
            <h4 className="text-base font-medium text-gray-700 popins">
              a. Dialer action
            </h4>
          </div>

          {/* Button */}

          <button
            className="cursor-pointer text-2xl text-green-600 hover:text-green-500 transition-colors"
            onClick={handleToggleDialerActionCard}
            onMouseEnter={
              !isMobile ? () => setIsDialerActionCardOpen(true) : undefined
            }
            onMouseLeave={
              !isMobile ? () => setIsDialerActionCardOpen(false) : undefined
            }
          >
            {/* {showDialerActionCard ? <FiEye /> : <FiEyeOff />} */}
          </button>

          {/* Card for Desktop (Hover) */}
          {/* {!isMobile && (
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
                )} */}

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

          {/* Table */}

          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                {/* Row 1 - suggestionType */}
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">dialer_action</Table.Cell>
                  <Table.Cell align="center">e.g. dialer_action</Table.Cell>
                </Table.Row>

                {/* Row 2 - phoneNumber */}
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    phoneNumber
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Valid phone number</Table.Cell>
                  <Table.Cell align="center">e.g. +919876543212</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-10  gap-2">
            <h4 className="text-base font-medium text-gray-700 popins">
              b. URL action
            </h4>
          </div>

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
            {/* {showUrlActionCard ? <FiEye /> : <FiEyeOff />} */}
          </button>

          {/* Card for Desktop (Hover) */}
          {/* {!isMobile && (
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
                )} */}
          {/* </div> */}

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

          {/* Table */}

          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                {/* Row 1 - suggestionType */}
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">url_action</Table.Cell>
                  <Table.Cell align="center">e.g. url_action</Table.Cell>
                </Table.Row>

                {/* Row 2 - url */}
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    url
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Valid URL</Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://brandx.onelink.me/
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-10  ">
            <h3 className="text-base font-medium text-gray-700 flex justify-center items-center ">
              3. View Location (Lat/Long)
            </h3>
          </div>
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
            {/* {showLocationCard ? <FiEye /> : <FiEyeOff />} */}
          </div>

          {/* Card for Desktop (Hover) */}
          {/* {!isMobile && (
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
              )} */}

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
          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                {/* Row - suggestionType */}
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">view_location_latlong</Table.Cell>
                  <Table.Cell align="center">
                    e.g. view_location_latlong
                  </Table.Cell>
                </Table.Row>

                {/* Add other rows in the same way */}
              </Table.Body>
            </Table>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-10  ">
            <h3 className="text-base font-medium text-gray-700 flex justify-center items-center ">
              4. View Location (query params)
            </h3>
          </div>
          {/* Button */}
          <div
            className="cursor-pointer text-2xl text-green-600 hover:text-green-500 transition-colors"
            // onClick={handleToggleLocationQueryCard}
            onMouseEnter={
              !isMobile ? () => setIsLocationQueryCardOpen(true) : undefined
            }
            onMouseLeave={
              !isMobile ? () => setIsLocationQueryCardOpen(false) : undefined
            }
          >
            {/* {showLocationQueryCard ? <FiEye /> : <FiEyeOff />} */}
          </div>

          {/* Card for Desktop (Hover) */}
          {/* {!isMobile && (
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
              )} */}

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

          {/* Table */}
          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                {/* Row 1 - suggestionType */}
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">view_location_query</Table.Cell>
                  <Table.Cell align="center">
                    e.g. view_location_query
                  </Table.Cell>
                </Table.Row>

                {/* Row 2 - query */}
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    query
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">Valid location name</Table.Cell>
                  <Table.Cell align="center">e.g. Bangalore</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-10  ">
            <h3 className="text-base font-medium text-gray-700 flex justify-center items-center ">
              5. Share Location
            </h3>
          </div>
          {/* Button */}
          <div
            className="cursor-pointer text-2xl text-green-600 hover:text-green-500 transition-colors"
            // onClick={handleToggleShareLocationCard}
            onMouseEnter={
              !isMobile ? () => setIsShareLocationCardOpen(true) : undefined
            }
            onMouseLeave={
              !isMobile ? () => setIsShareLocationCardOpen(false) : undefined
            }
          >
            {/* {showShareLocationCard ? <FiEye /> : <FiEyeOff />} */}
          </div>

          {/* Card for Desktop (Hover) */}
          {/* {!isMobile && (
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
              )} */}

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

          {/* Table */}
          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                {/* Row - suggestionType */}
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">share_location</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">e.g. share_location</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>

        <section id="uploading-multimedia-from-url" className="mb-16">
          <div className="flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-wide mb-6  pb-2">
              UPLOADING MEDIA FROM URL
            </h2>
          </div>
          <div className="max-w-3xl mx-auto text-center md:text-start mt-4">
            <p className="text-md  text-gray-700">
              Users can provide multimedia data as a URL also.(Another way is
              multipart file upload). URL should be a publicly accessible URL
              without any access token, the provided URL will be passed to
              Google RBM as it is.
            </p>

            <p className="text-md text-gray-700">
              Custom variables also can be passed with mediaUrl, but cannot be
              passed with thumbnailUrl. If a variable video is provided, it is
              the responsibility of the user to add a thumbnail to it
            </p>
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
        w-1 rounded absolute left-3 top-5  `}
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

export default ManageTemplateRCSDocs;
