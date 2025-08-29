import React, { useState, useEffect } from "react";
import BaseURL from "../../components/BaseURL";
import toast, { Toaster } from "react-hot-toast";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "../../context/ThemeContext";
// import Table from "../../components/Table";
import RequestSample from "../../components/RequestSample";
import ResponseSample from "../../components/ResponseSample";
// import { useLocation } from "react-router-dom";
import Table from "@/ApiDocs/components/Tablenew";

import { themeColors } from "../../themeColors";

const UpdateTemplateRCS = () => {
  const [activeSection, setActiveSection] = useState("update-text-template");
  const [activeTab, setActiveTab] = useState(1);

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  //  const { pathname } = useLocation();

  const updateTexttemplateReq = [
    {
      id: 0,
      title: "Without Variable",
      requestPrefix: `
     {
  "textMessageContent": "Time to go big or go home because it's India VS Australia FINALS!",
  "suggestions": [
    {
      "suggestionType": "reply",
      "displayText": "Click to Win",
      "postback": "click_to_win"
    },
    {
      "suggestionType": "url_action",
      "url": "https://brandx.onelink.me/",
      "displayText": "Answer and Win",
      "postback": "answer_and_win"
    },
    {
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
      title: "With Variable",
      requestPrefix: `
      {
 "templateState":"Submit",
"textMessageContent": "Time to go big or go
home because it's India VS Australia FINALS!",
"suggestions": [{
"suggestionType": "reply",
"displayText": "Click to Win",
"postback": "click_to_win"
},
{
"suggestionType": "url_action",
"url": "https://brandx.onelink.me/",
"displayText": "Answer and Win",
"postback": "answer_and_win"
},
{
"suggestionType": "dialer_action",
"phoneNumber": "+919876543212",
"displayText": "Call Now",
"postback": "call_now"
}
]
 }

      `,
    },
  ];

  const updateTexttemplateRes = [
    {
      id: 0,
      title: "202 Accepted",
      requestPrefix: `
      {
"name": "wtcfinaleng",
"type": "text_message",
"textMessageContent": "Time to go 
big or go home because it's India VS 
Australia FINALS!",
"suggestions": [
 {
"suggestionId": 
"sjjdqz_jacPvKJJMFUdug",
"suggestionType": "reply",
"displayText": "Click to Win",
"postback": "click_to_win"
},
{
"suggestionId": 
"artcFqz_jacPvKJJMiUdug",
"suggestionType": "url_action",
"url": "https://brandx.onelink.me/",
"displayText": "Answer and Win",
"postback": "answer_and_win"
},
{
"suggestionId": 
"Wco6Fqz_jacPvKJJMFUdug",
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
      title: "404 Bad Request",
      requestPrefix: `
      {
"error": {
"code": 400,
"message": "Please provide a valid bot 
id",
"status": "Bad Request"
}
 }

      `,
    },
  ];

  const updatetemppdfReq = [
    {
      id: 0,
      title: "Without Varibles",
      requestPrefix: `
      {
"textMessageContent": "Time to go big or go
home because it's India VS Australia FINALS!",
"suggestions": [
{
"suggestionType": "reply",
"displayText": "Click to Win",
"postback": "click_to_win"
},
{
"suggestionType": "url_action",
"url": "https://brandx.onelink.me/",
"displayText": "Answer and Win",
"postback": "answer_and_win"
},
{
"suggestionType": "dialer_action",
"phoneNumber": "+919876543212",
"displayText": "Call Now",
"postback": "call_now"
}
]
}   `,
    },
    {
      id: 1,
      title: "With Template State",
      requestPrefix: `
      {
"templateState":"Submit",
"textMessageContent": "Time to go big or go
home because it's India VS Australia FINALS!",
"suggestions": [{
"suggestionType": "reply",
"displayText": "Click to Win",
"postback": "click_to_win"
},
{
"suggestionType": "url_action",
"url": "https://brandx.onelink.me/",
"displayText": "Answer and Win",
"postback": "answer_and_win"
},
{
"suggestionType": "dialer_action",
"phoneNumber": "+919876543212",
"displayText": "Call Now",
"postback": "call_now"
}
]
}
      `,
    },
  ];

  const updatetemppdfRes = [
    {
      id: 0,
      title: "202 Accepted",
      requestPrefix: `
      {
  "name": "wtcfinaleng",
  "type": "text_message",
  "textMessageContent": "Time to go big or go home because it's India VS Australia FINALS!",
  "documentUrl": "https://virbm.in/rcs_message/media/8QX8ZPKJAEM05H29PZ0N.pdf",
  "messageOrder": "text_message_at_top",
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
      title: "404 Bad Request",
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

  const updateRichcardReq = [
    {
      id: 0,
      title: "Without Varibles",
      requestPrefix: `
     {
  "orientation": "VERTICAL",
  "height": "SHORT_HEIGHT",
  "standAlone": {
    "cardTitle": "Keep calm & BAT on!",
    "cardDescription": "Time to go big or go home because it's India VS Australia FINALS!",
    "fileName": "Confirm_Email_Button.mp4",
    "thumbnailFileName": "Confirm_Email_Button.mp4",
    "suggestions": [
      {
        "suggestionType": "reply",
        "displayText": "Answer & Win",
        "postback": "answer_win_1"
      }
    ]
  }
}

      `,
    },
    {
      id: 1,
      title: "Upload MultiMedia",
      requestPrefix: `
    {
  "orientation": "VERTICAL",
  "height": "SHORT_HEIGHT",
  "standAlone": {
    "cardTitle": "Keep calm & BAT on!",
    "cardDescription": "Time to go big or go home because it's India VS Australia FINALS!",
    "mediaUrl": "https://brandx.onelink.me/Confirm_Email_Button.mp4",
    "thumbnailUrl": "https://brandx.onelink.me/Confirm_Email_Button.png",
    "suggestions": [
      {
        "suggestionType": "reply",
        "displayText": "Answer & Win",
        "postback": "answer_win_1"
      }
    ]
  }
}

      `,
    },
  ];

  const upadateRichcardRes = [
    {
      id: 0,
      title: "202 Accepted",
      requestPrefix: `
   {
  "name": "wtcfinaleng",
  "type": "rich_card",
  "orientation": "VERTICAL",
  "height": "SHORT_HEIGHT",
  "standAlone": {
    "cardId": "83w0A3tvGXPzgm4vy0-ZSQ",
    "cardTitle": "Keep calm & BAT on!",
    "cardDescription": "Hi [Name], Time to go big or go home because it's India VS Australia FINALS!",
    "mediaUrl": "https://app.celitix.com/rcs_message/media/8QX8ZPKJAEM05H29PZ0N.mp4",
    "thumbnailUrl": "https://app.celitix.com/rcs_message/media/GUTUAA8XS4XH0GTUUY14.jpeg",
    "suggestions": [
      {
        "suggestionId": "Wco6Fqz_jacPvKJJMFUdug",
        "suggestionType": "reply",
        "displayText": "Answer & Win [Prizes]",
        "postback": "answer_win_1"
      }
    ]
  }
}

      `,
    },
    {
      id: 1,
      title: "404 Bad Request",
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

  const updateRichcarouselReq = [
    {
      id: 0,
      title: "Without Varibles",
      requestPrefix: `
{
  "height": "SHORT_HEIGHT",
  "width": "MEDIUM_WIDTH",
  "carouselList": [
    {
      "cardTitle": "Ditch the ordinary!",
      "cardDescription": "Fashion-forward sunglasses to amp up your look",
      "fileName": "Button.mp4",
      "thumbnailFileName": "Button.jpg",
      "suggestions": [
        {
          "suggestionType": "url_action",
          "url": "https://brandx.onelink.me/",
          "displayText": "Buy Now",
          "postback": "buy_now"
        }
      ]
    },
    {
      "cardTitle": "Step into the limelight!",
      "cardDescription": "Choose from new arrival sunglasses.",
      "fileName": "Confirm_Email_Button.mp4",
      "thumbnailFileName": "Confirm_Email_Button.jpg",
      "suggestions": [
        {
          "suggestionType": "dialer_action",
          "phoneNumber": "+919876543212",
          "displayText": "Call now",
          "postback": "call_now"
        }
      ]
    }
  ]
}
      `,
    },
    {
      id: 1,
      title: " MultiMedia Varibles",
      requestPrefix: `
     {
  "height": "SHORT_HEIGHT",
  "width": "MEDIUM_WIDTH",
  "carouselList": [
    {
      "cardTitle": "Ditch the ordinary!",
      "cardDescription": "Fashion-forward sunglasses to amp up your look",
      "mediaUrl": "https://brandx.onelink.me/Confirm_Email_Button.mp4",
      "thumbnailUrl": "https://brandx.onelink.me/Confirm_Email_Button.png",
      "suggestions": [
        {
          "suggestionType": "url_action",
          "url": "https://brandx.onelink.me/",
          "displayText": "Buy Now",
          "postback": "buy_now"
        }
      ]
    },
    {
      "cardTitle": "Step into the limelight!",
      "cardDescription": "Choose from new arrival sunglasses.",
      "mediaUrl": "https://brandx.onelink.me/[Image]",
      "thumbnailUrl": "https://brandx.onelink.me/Confirm_Email_Button.png",
      "suggestions": [
        {
          "suggestionType": "dialer_action",
          "phoneNumber": "+919876543212",
          "displayText": "Call now",
          "postback": "call_now"
        }
      ]
    }
  ]
}

      `,
    },
  ];

  const updateRichcarouselRes = [
    {
      id: 0,
      title: "202 Accepted",
      requestPrefix: `
     {
  "name": "brandXcar1",
  "type": "carousel",
  "height": "SHORT_HEIGHT",
  "width": "MEDIUM_WIDTH",
  "carouselList": [
    {
      "cardId": "83w0A3tvGXPzgm4vy0-ZSQ",
      "cardTitle": "Ditch the ordinary!",
      "cardDescription": "Fashion-forward sunglasses to amp up your look",
      "mediaUrl": "https://app.celitix.com/rcs_message/media/H6X8ZPKJAEM05H29PZ9N.jpeg",
      "suggestions": [
        {
          "suggestionId": "streFIwNFjODZMiaClAODg",
          "suggestionType": "url_action",
          "url": "https://brandx.onelink.me/",
          "displayText": "Buy Now",
          "postback": "buy_now"
        }
      ]
    },
    {
      "cardId": "frw0A3tvGXPzgm4vy0-ZSQ",
      "cardTitle": "Step into the limelight!",
      "cardDescription": "Choose from new arrival sunglasses.",
      "mediaUrl": "https://app.celitix.com/rcs_message/media/8QX8ZPKJAEM05H29PZ0N.mp4",
      "thumbnailUrl": "https://app.celitix.com/rcs_message/media/GUTUAA8XS4XH0GTUUY14.jpeg",
      "suggestions": [
        {
          "suggestionId": "zOigZIwNFjODZMiaClAODg",
          "suggestionType": "dialer_action",
          "phoneNumber": "+919876543212",
          "displayText": "Call now",
          "postback": "call_now"
        }
      ]
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

  const sections = [
    { id: "update-text-template", title: "Update Text Template" },
    { id: "update-text-with-pdf", title: "Update Text With PDF" },
    { id: "rich-card-standalone", title: "Rich Card Standalone" },
    { id: "rich-card-carousel", title: "Rich Card Carousel" },
  ];

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   // window.scrollTo({ top: 0, behavior: "auto" });
  // }, [pathname]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   setActiveSection("update-text-template")
  // },[])

  // useEffect(() => {
  //   // Use a slight delay to ensure DOM is fully rendered
  //   const timer = setTimeout(() => {
  //     window.scrollTo({ top: 0, behavior: "instant" });
  //     setActiveSection("update-text-template"); // Reset to first section
  //   }, 0);

  //   // Disable browser/router scroll restoration if applicable
  //   if (window.history.scrollRestoration) {
  //     window.history.scrollRestoration = "manual";
  //   }

  //   return () => clearTimeout(timer); // Cleanup timer
  // }, []);

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

  // const activeIndex = sections.findIndex((s) => s.id === activeSection);
  // const scrollerPosition = (activeIndex / (sections.length - 1)) * 100;

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

  const httpTableColoumn = ["Code", "Description"];

  const PathVariableColumns = [
    "Field Name",
    "Validation",
    "Description",
    "Remarks",
  ];

  const RequestParameterUpdateTextTemplateColumns = [
    "Field Name",
    "Validation",
    "Description",
    "Remarks",
  ];

  const ResponseParameterUpdateTextTemplateColumns = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const RequestParameterUpdateTextTemplateWithPdfColumns = [
    "Field Name",
    "Validation",
    "Description",
    "Remarks",
  ];

  const ResponseParameterUpdateTextTemplateWithPdfColumns = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const HeaderTableColumns = ["Name", "Value"];

  const RequestParameterRCStandaloneColumns = [
    "Field Name",
    "Validation",
    "Description",
    "Remarks",
  ];

  const responseTableColumns = ["Code", "Description"];

  const ResponseParameterRCStandaloneColumns = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const RequestParameterCarouselColumns = [
    "Field Name",
    "Validation",
    "Description",
    "Remarks",
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div
      className={`flex w-[100%]  ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-black"
      }`}
    >
      {/* Main Content */}
      <div className=" p-4 lg:px-4 overflow-y-auto  w-4xl mx-auto ">
        <section id="update-text-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5  pb-2">
              UPDATE TEXT TEMPLATE
            </h2>
          </div>
          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="mt-4 text-sm">
              This API is used to update a Text Message template that has not
              yet been approved. The template name must be Base64 URL Encoded.
            </p>
            <p className="mt-4 text-sm">
              Template name, type and botId cannot be modified and remain same
              as provided while creation. All other template details need to be
              passed in request same as add template , if any details not passed
              in update api will be deleted from the template .
            </p>

            <p className="mt-4 text-sm">
              <span className="font-semibold"> NOTE</span> - All preexisting
              template details will be deleted and fresh entries will be created
              for template details (except name, type and botId).
            </p>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseURL urlPrefix="Base URL" requestType="PUT" param="/{name}" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Path Variables
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-400">name *</Table.Cell>
                  <Table.Cell>Max length 20</Table.Cell>
                  <Table.Cell>
                    Template name <br />
                    <span className="text-orange-400">Base 64 URL Encoded</span>
                  </Table.Cell>
                  <Table.Cell>e.g.”wtcfinaleng”</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className=" text-orange-400">
                    textMessageContent *
                  </Table.Cell>
                  <Table.Cell>
                    Max length 2500 (including variables if any)
                  </Table.Cell>
                  <Table.Cell>
                    Template text message with variables. Variables should be in
                    square brackets [variable_name]
                  </Table.Cell>
                  <Table.Cell>
                    e.g. "[Name], Time to go big or go home because it's India
                    VS Australia FINALS!"
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400">
                    templateState *
                  </Table.Cell>
                  <Table.Cell>State is predefined</Table.Cell>
                  <Table.Cell>
                    Template state is either "Create" or "Submit"
                  </Table.Cell>
                  <Table.Cell>e.g. "templateState":"Create"</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell>
                    Suggestion type is predefined. For text message max 11
                    suggestions allowed
                  </Table.Cell>
                  <Table.Cell>
                    Suggestion type is either of suggestion type
                  </Table.Cell>
                  <Table.Cell>e.g. reply</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400">
                    displayText
                  </Table.Cell>
                  <Table.Cell>
                    Max length is 25 (including variables if any)
                  </Table.Cell>
                  <Table.Cell>Suggestion display text</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400">postback</Table.Cell>
                  <Table.Cell>
                    Max length 120 (including variables if any)
                  </Table.Cell>
                  <Table.Cell>Suggestion postback</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400">
                    phoneNumber
                  </Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>Valid phone number</Table.Cell>
                  <Table.Cell>e.g. +919876543212</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400">URL</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>Valid URL</Table.Cell>
                  <Table.Cell>e.g. https://brandx.onelink.me/</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              REQUEST SAMPLE - MULTIPART
            </h2>
          </div>
          <div className="w-full mt-10">
            <RequestSample tabsContent={updateTexttemplateReq} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Response Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center ">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className=" text-orange-400">error</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>
                    Error response object that includes code, message and status
                    below
                  </Table.Cell>
                  <Table.Cell>-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400">code</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>HTTP status code</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400">message</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>Error message</Table.Cell>
                  <Table.Cell>
                    e.g. Template with name wtyggf45g is already present
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400">status</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>HTTP status</Table.Cell>
                  <Table.Cell>
                    e.g. Accepted, Bad request, Forbidden, Internal server
                    error.
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400">
                    suggestionId
                  </Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>Suggestion id</Table.Cell>
                  <Table.Cell>e.g. BxEaKJyi_thur1Bc42oPcg</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              RESPONSE SAMPLE
            </h2>
          </div>

          <div className="w-full mt-10">
            <ResponseSample tabsContentResponseSample={updateTexttemplateRes} />
          </div>
        </section>

        <section id="update-text-with-pdf" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5  pb-2">
              UPDATE TEXT WITH PDF
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center md:text-start w-full  sm:text-center mt-2">
            <ul className="space-y-2 p-4">
              <li className="relative pl-6">
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />
                This API is used to update a Text Message with pdf template that
                has not yet been approved by Vi Admin.
              </li>

              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />{" "}
                The template name must be Base64 URL Encoded.
              </li>

              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />
                Template name, type and botId cannot be modified and remain same
                as provided while creation.
              </li>

              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />
                All other template details need to be passed in request the same
                as add template , if any details are not passed in update api,
                the same will be deleted from the template .
              </li>
            </ul>

            <p className="text-sm text-center">
              <span className="font-semibold">NOTE</span> - All preexisting
              template details will be deleted and fresh entries will be created
              for template details (except name, type and botId).
            </p>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>

            <BaseURL urlPrefix="Base URL" requestType="PUT" param="/{name}" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Path Variables
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center  mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">name *</Table.Cell>
                  <Table.Cell align="center">Max length 20</Table.Cell>
                  <Table.Cell align="center">
                    Template name <br />
                    <span className="text-orange-400 ">
                      Base 64 URL Encoded
                    </span>
                  </Table.Cell>
                  <Table.Cell align="center">e.g.”wtcfinaleng”</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-400">
                    multimedia_files
                  </Table.Cell>
                  <Table.Cell align="center">
                    A pdf file which has size less than 100MB
                  </Table.Cell>
                  <Table.Cell align="center">Pdf File</Table.Cell>
                  <Table.Cell align="center">
                    (Media file uploaded name and 'documentName' must be same)
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    textMessageContent *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 2500 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Template text message with variables. Variables should be in
                    square bracket [variable_name]
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. "[Name], Time to go big or go home because it's India
                    VS Australia FINALS!"
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400">
                    documentFileName
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">
                    Document file uploaded name should be same as documentName
                  </Table.Cell>
                  <Table.Cell align="center">e.g. test.pdf</Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    messageOrder
                  </Table.Cell>
                  <Table.Cell align="center">
                    It should be either text_message_at_top or pdf_at_top
                  </Table.Cell>
                  <Table.Cell align="center">Message order</Table.Cell>
                  <Table.Cell align="center">
                    e.g. text_message_at_top or pdf_at_top
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    displayText
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length is 25 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Suggestion display text</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400" align="center">postback</Table.Cell>
                  <Table.Cell>
                    Max length 120 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Suggestion postback</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400" align="center">
                    phoneNumber
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid phone number</Table.Cell>
                  <Table.Cell align="center">e.g. +919876543212</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400" align="center">URL</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid URL</Table.Cell>
                  <Table.Cell align="center">e.g. https://brandx.onelink.me/</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              REQUEST SAMPLE - MULTIPART
            </h2>
          </div>
          <div className="w-full mt-10">
            <RequestSample tabsContent={updatetemppdfReq} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 mx-auto ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Response Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">error</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">
                    Error response object that includes code, message and status
                    below
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">code</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">HTTP status code</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400" align="center">message</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Error message</Table.Cell>
                  <Table.Cell align="center">
                    e.g. Template with name wtyggf45g is already present
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">status</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">HTTP status</Table.Cell>
                  <Table.Cell align="center">
                    e.g. Accepted, Bad request, Forbidden, Internal server
                    error.
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    suggestionId
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Suggestion id</Table.Cell>
                  <Table.Cell align="center">e.g. BxEaKJyi_thur1Bc42oPcg</Table.Cell>
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
            <ResponseSample tabsContentResponseSample={updatetemppdfRes} />
          </div>
        </section>

        <section id="rich-card-standalone" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              UPDATE RICH CARD STANDALONE TEMPLATE
            </h2>
          </div>
          <div className="flex flex-wrap justify-center w-xs md:w-2xl lg:w-2xl mx-auto text-sm popins">
            <ul className="space-y-2 p-4">
              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />
                This API is used to update a Rich Card Standalone template that
                has not yet been approved.
              </li>
              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />{" "}
                The template name must be Base64 URL Encoded.
              </li>
              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />
                Template name, type and botId cannot be modified and remain same
                as provided while creation.
              </li>
              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />{" "}
                All other template details need to be passed in request the same
                as add template , if any details are not passed in update api,
                the same will be deleted from the template .
              </li>

              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />
                Multimedia can be provided either as a url or multipart file
                upload. Either of one must be provided, if both are provided
                multipart file upload is considered url will be ignored.
              </li>
            </ul>

            <p className="text-sm text-center">
              <span className="font-semibold">NOTE</span> - All preexisting
              template details will be deleted and fresh entries will be created
              for template details (except name, type and botId).
            </p>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Request Format URL
            </h2>
          </div>
          <div className="w-full mt-10">
            <BaseURL urlPrefix="serverRoot" requestType="PUT" param="/{name}" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Base URL
            </h2>
          </div>
          <div className="w-full mt-10">
            <BaseURL urlPrefix="base URL" requestType="PUT" param="/{name}" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Path Variables
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    name *
                  </Table.Cell>
                  <Table.Cell align="center">Max length 20</Table.Cell>
                  <Table.Cell align="center">
                    Template name <br />
                    <span className="text-orange-400 text-sm popins">
                      Base64 URL Encoded
                    </span>
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. <span className="text-green-600">wtcfinaleng</span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Headers
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Header</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-58">
                    <div className="text-center">Value</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center">content-type</Table.Cell>
                  <Table.Cell align="center" className="text-orange-400">
                    application/json
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">api_key</Table.Cell>
                  <Table.Cell align="center" className="text-orange-400">
                    secret key. E.g. agyduem45c
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">botid</Table.Cell>
                  <Table.Cell align="center" className="text-orange-400">
                    registered bot id. E.g. OsOsQ0GwNvUdLT V9Bd
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-35">
                    Field Name{" "}
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className=" text-orange-400" align="center">
                    multimedia_files
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">
                    list of multipart files(image/video)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media file uploaded name <br/> 
                    and 'thumbnailFileName' <br/>
                    must be same
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    orientation *
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                  <Table.Cell align="center">
                    Orientation(VERTICAL/HORIZONTAL)
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. VERTICAL
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    alignment * (Applicable only for HORIZONTAL)
                  </Table.Cell>
                  <Table.Cell align="center">
                    If the orientation is HORIZONTAL, the alignment should be
                  </Table.Cell>
                  <Table.Cell align="center">
                    In case of HORIZONTAL orientation alignment should
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. SHORT_HEIGHT
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    height * (Applicable only for VERTICAL)
                  </Table.Cell>
                  <Table.Cell align="center">
                    If the orientation is VERTICAL, the height should be
                    specified
                  </Table.Cell>
                  <Table.Cell align="center">
                    Card Height (SHORT_HEIGHT/MEDIUM_HEIGHT)
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. text_message_at_top or pdf_at_top
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    cardTitle *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 200 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Card title
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    cardDescription *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 2000 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Card Description
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    mediaUri
                  </Table.Cell>
                  <Table.Cell align="center">
                    Valid uri which can be publicly accessible (including
                    variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media Uri
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://brandx.onelink <br/>
                    .me/temp.mp4
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    thumbnailUri
                  </Table.Cell>
                  <Table.Cell align="center">
                    Valid uri which can be publicly accessible
                  </Table.Cell>
                  <Table.Cell align="center">
                    thumbnail Uri
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://brandx.onelink <br/>
                    .me/temp.jpeg
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className="text-orange-400" align="center">
                    fileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    thumbnailFileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">
                    If the file type is video then need to give
                    thumbnailFileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion type is predefined. A max of 4 Suggestions
                    allowed
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion type is either of suggestion type
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. reply
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    displayText
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length is 25 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion display text
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    postback
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 120 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion postback
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    phoneNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                  <Table.Cell align="center">
                    Valid phone number
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. +919876543212
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    URL
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                  <Table.Cell align="center">
                    Valid URL
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://brandx.onelink <br/>
                    .me/
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              REQUEST SAMPLE - MULTIPART
            </h2>
          </div>
          <div className="w-full mt-10">
            <RequestSample tabsContent={updateRichcardReq} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Response Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
            <Table zebra bordered stickyHeader scrollButtons devVisible >
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    error
                  </Table.Cell>
                  <Table.Cell align="center">
                    Error response object that includes <code>code</code>,{" "}
                    <code>message</code> and <code>status</code>.
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    code
                  </Table.Cell>
                  <Table.Cell align="center">HTTP status code</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    message
                  </Table.Cell>
                  <Table.Cell align="center">Error message</Table.Cell>
                  <Table.Cell align="center">
                    e.g.{" "}
                    <span className="italic">
                      Template with name wtyggf45g is already present
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">HTTP status</Table.Cell>
                  <Table.Cell align="center">
                    e.g. Accepted, Bad Request, Forbidden, Internal Server Error
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    cardId
                  </Table.Cell>
                  <Table.Cell align="center">Card ID</Table.Cell>
                  <Table.Cell align="center">
                    e.g. BxEaKJyi_thur1Bc42oPcg
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    suggestionId
                  </Table.Cell>
                  <Table.Cell align="center">Suggestion ID</Table.Cell>
                  <Table.Cell align="center">
                    e.g. BxEaKJyi_thur1Bc42oPcg
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    mediaUri
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media file URL of the uploaded image/video data. Belongs to
                    the Celtiix domain.
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://app.celtiix.com/rcs/message/media/0Q8XPJA8
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    thumbnailUri
                  </Table.Cell>
                  <Table.Cell align="center">
                    Thumbnail file URL of the uploaded image data. Belongs to
                    the Celtiix domain.
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g.
                    https://app.celtiix.com/rcs/message/media <br/>
                    /0UAAX5X4H0UVI4.jpeg
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
            <ResponseSample tabsContentResponseSample={upadateRichcardRes} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              HTTP Response Codes
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-32">
                    <div className="text-center">Status Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-64">
                    <div className="text-center">Meaning</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center">400</Table.Cell>
                  <Table.Cell align="center" className="text-red-500">
                    Bad Request
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">403</Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">500</Table.Cell>
                  <Table.Cell align="center">Internal Server Error</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">202</Table.Cell>
                  <Table.Cell align="center" className="text-green-500">
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">405</Table.Cell>
                  <Table.Cell align="center">Method Not Allowed</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>

        <section id="rich-card-carousel">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              UPDATE RICH CARD CAROUSEL TEMPLATE
            </h2>
          </div>

          <div className="mx-auto flex flex-col justify-center w-xs md:w-2xl lg:w-2xl  text-start popins text-sm">
            <ul className="space-y-2 p-4">
              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />
                This API is used to update a Rich Card Carousel template that
                has not yet been approved.
              </li>
              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />{" "}
                The template name must be Base64 URL Encoded.
              </li>
              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />
                Template name, type and botId cannot be modified and remain same
                as provided while creation.
              </li>
              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />{" "}
                All other template details need to be passed in request the same
                as add template , if any details are not passed in update api,
                the same will be deleted from the template .
              </li>

              <li className="relative pl-6">
                {" "}
                <CircleIcon
                  className="absolute left-0 top-1.5 text-gray-500"
                  style={{ fontSize: "0.4rem" }}
                />
                Multimedia can be provided either as a url or multipart file
                upload. Either of one must be provided, if both are provided
                multipart file upload is considered url will be ignored.
              </li>
            </ul>

            <p className="text-sm  popins">
              <span className="font-semibold">NOTE</span> - All preexisting
              template details will be deleted and fresh entries will be created
              for template details (except name, type and botId).
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Format URL
            </h2>
          </div>
          <div className="w-full mt-10">
            <BaseURL urlPrefix="serverRoot" requestType="PUT" param="/{name}" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Base URL
            </h2>
          </div>
          <div className="w-full mt-10">
            <BaseURL urlPrefix="Base URL" requestType="PUT" param="/{name}" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Path Variables
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    name *
                  </Table.Cell>
                  <Table.Cell align="center">Max length 20</Table.Cell>
                  <Table.Cell align="center">
                    Template name <br />
                    <span className="text-orange-400 text-sm popins">
                      Base64 URL Encoded
                    </span>
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. <span className="text-green-600">wtcfinaleng</span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Headers
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-58">
                    <div className="text-center">Value</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center">content-type</Table.Cell>
                  <Table.Cell align="center" className="text-orange-400">
                    application/json
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">api_key</Table.Cell>
                  <Table.Cell align="center" className="text-orange-400">
                    Secret key <br />
                    e.g. <span className="text-green-600">agyduem45c</span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">botid</Table.Cell>
                  <Table.Cell align="center" className="text-orange-400">
                    Registered bot id <br />
                    e.g.{" "}
                    <span className="text-green-600">OsOsQ0GwNvUdLTV9Bd</span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">       
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Validation</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    multimedia_files
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">
                    List of multipart files (image/video)
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="font-medium">'fileName'</span> /{" "}
                    <span className="font-medium">'thumbnailFileName'</span>{" "}
                    must be same
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    cardTitle *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 200 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Card Title</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    cardDescription *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 2000 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Card Description</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    mediaUri
                  </Table.Cell>
                  <Table.Cell align="center">
                    Valid URI, publicly accessible (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Media URI</Table.Cell>
                  <Table.Cell align="center">
                    e.g.{" "}
                    <span className="text-green-600">
                      https://brandx.onelink.me/temp.mp4
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    thumbnailUri
                  </Table.Cell>
                  <Table.Cell align="center">
                    Valid URI, publicly accessible
                  </Table.Cell>
                  <Table.Cell align="center">Thumbnail URI</Table.Cell>
                  <Table.Cell align="center">
                    e.g.{" "}
                    <span className="text-green-600">
                      https://brandx.onelink.me/temp.jpeg
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    fileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">Media File</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    thumbnailFileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">
                    Required if file type is video
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">
                    Predefined. Max 4 suggestions allowed
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion type is one of allowed suggestion types
                  </Table.Cell>
                  <Table.Cell align="center">e.g. reply</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    displayText
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 25 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion display text
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    postback
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 120 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Suggestion postback</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    phoneNumber
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid phone number</Table.Cell>
                  <Table.Cell align="center">
                    e.g. <span className="text-green-600">+919876543212</span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    URL
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid URL</Table.Cell>
                  <Table.Cell align="center">
                    e.g.{" "}
                    <span className="text-green-600">
                      https://brandx.onelink.me/
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              REQUEST SAMPLE - MULTIPART
            </h2>
          </div>
          <div className="w-full mt-10">
            <RequestSample tabsContent={updateRichcarouselReq} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Response Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    error
                  </Table.Cell>
                  <Table.Cell align="center">
                    Error response object that includes <br />
                    <span className="font-medium">code, message</span> and{" "}
                    <span className="font-medium">status</span> below
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    code
                  </Table.Cell>
                  <Table.Cell align="center">HTTP status code</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    message
                  </Table.Cell>
                  <Table.Cell align="center">Error message</Table.Cell>
                  <Table.Cell align="center">
                    e.g. Template with name <br />{" "}
                    <span className="text-green-600">wtyggf45g</span> is already
                    present
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">HTTP status</Table.Cell>
                  <Table.Cell align="center">
                    e.g. Accepted, Bad Request, Forbidden, Internal Server Error
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    cardId
                  </Table.Cell>
                  <Table.Cell align="center">Card id</Table.Cell>
                  <Table.Cell align="center">
                    e.g.{" "}
                    <span className="text-green-600">83w0A5tVXGpZm4y0-ZSQ</span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    suggestionId
                  </Table.Cell>
                  <Table.Cell align="center">Suggestion id</Table.Cell>
                  <Table.Cell align="center">
                    e.g.{" "}
                    <span className="text-green-600">
                      BxEaKJyi_thur1Bc42oPcg
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    mediaUri
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media file URL of the uploaded <br />
                    image/video data. This URL will belong <br />
                    to the Celtiix domain.
                  </Table.Cell>
                  <Table.Cell align="center">
                    Publicly accessible media URL <br />
                    of the uploaded media. <br />
                    e.g.{" "}
                    <span className="text-green-600">
                      https://app.celtiix.com/rcs/message/media/0Q8XPJA8
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-400">
                    thumbnailUri
                  </Table.Cell>
                  <Table.Cell align="center">
                    Thumbnail file URL of the uploaded <br />
                    image data. This URL will belong <br />
                    to the Celtiix domain.
                  </Table.Cell>
                  <Table.Cell align="center">
                    Publicly accessible media URL <br />
                    of the uploaded media. <br />
                    e.g.{" "}
                    <span className="text-green-600">
                      https://app.celtiix.com/rcs/message/media/0UAAX5 <br/>
                      X4H0UVI4.jpeg
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              HTTP Response Codes
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto"> 
            <Table zebra bodered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Status Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-58">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="font-normal">
                    400
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="text-red-500 font-normal"
                  >
                    Bad Request
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="font-normal">
                    403
                  </Table.Cell>
                  <Table.Cell align="center" className="font-normal">
                    Forbidden
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="font-normal">
                    500
                  </Table.Cell>
                  <Table.Cell align="center" className="font-normal">
                    Internal Server Error
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="font-normal">
                    202
                  </Table.Cell>
                  <Table.Cell
                    align="center"
                    className="text-green-700 font-normal"
                  >
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="font-normal">
                    405
                  </Table.Cell>
                  <Table.Cell align="center" className="font-normal">
                    Method Not Allowed
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
            <ResponseSample tabsContentResponseSample={updateRichcarouselRes} />
          </div>
        </section>
      </div>

      {/* Mini Map Navigation - Hidden on small screens */}
      {/* <div
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
        } hidden lg:block w-66 h-fit sticky  top-4  shrink-0 rounded-2xl  mr-4 `}
      >
        <div className="rounded-lg p-3 h-full flex flex-row">
          <div className="relative">
            {/* Track line *
            <div
              className={`${
                isDarkMode ? "bg-gray-600" : "bg-gray-200"
              } w-1 h-40 top-5  rounded absolute left-3`}
              style={{
                height: `${(sections.length - 1) * 40}px`,
                top: "20px",
              }}
            >
              {/* Moving indicator *
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
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
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

export default UpdateTemplateRCS;
