import React, { useState, useEffect } from "react";
import BaseURL from "../../components/BaseURL";
import toast, { Toaster } from "react-hot-toast";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "../../context/ThemeContext";
import Table from "../../components/Table";
import RequestSample from "../../components/RequestSample";
import ResponseSample from "../../components/ResponseSample";
// import { useLocation } from "react-router-dom";


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
      <div className=" p-4 lg:px-4 overflow-y-auto  w-full ">
        <section id="update-text-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              UPDATE TEXT TEMPLATE
            </h2>
            </div>
            <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className="text-sm 
              
              popins ">
                This API is used to update a Text Message template that has not
                yet been approved. The template name must be Base64 URL Encoded.
              </p>
              <p className="text-sm  popins">
                Template name, type and botId cannot be modified and remain same
                as provided while creation. All other template details need to
                be passed in request same as add template , if any details not
                passed in update api will be deleted from the template .
              </p>

              <p className="text-sm  mt-3 popins ">
                <span className="font-semibold"> NOTE</span> - All preexisting
                template details will be deleted and fresh entries will be
                created for template details (except name, type and botId).
              </p>
            </div>
        
          <div className="mt-5 flex justify-center">
            <BaseURL urlPrefix="Base URL" requestType="PUT" param="/{name}" />
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
                    Template name <br />
                    <span className="text-orange-400">Base 64 URL Encoded</span>
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g.”wtcfinaleng”
                  </td>
                </tr>
              </Table>
          
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center ">
           
              <Table columns={RequestParameterUpdateTextTemplateColumns}>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    textMessageContent *
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 2500 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Template text message with variables. Variables should be in
                    square brackets [variable_name]
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. "[Name], Time to go big or go home because it's India
                    VS Australia FINALS!"
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    templateState *
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    State is predefined
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Template state is either "Create" or "Submit"
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. "templateState":"Create"
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    suggestionType
                  </td>
                  <td className="px-4 py-4 text-sm popins ">
                    Suggestion type is predefined. For text message max 11
                    suggestions allowed
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion type is either of suggestion type
                  </td>
                  <td className="px-4 py-4 text-sm popins">e.g. reply</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    displayText
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length is 25 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion display text
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    postback
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 120 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion postback
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    phoneNumber
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid phone number
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. +919876543212
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    URL
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">Valid URL</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. https://brandx.onelink.me/
                  </td>
                </tr>
              </Table>
           
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-5">
              REQUEST SAMPLE - MULTIPART
            </h2>
          </div>
          <div className="flex justify-center">
            <RequestSample tabsContent={updateTexttemplateReq} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Response Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center ">
            
              <Table columns={ResponseParameterUpdateTextTemplateColumns}>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    error
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Error response object that includes code, message and status
                    below
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    code
                  </td>
                  <td className="px-4 py-4 text-sm popins">HTTP status code</td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    message
                  </td>
                  <td className="px-4 py-4 text-sm popins">Error message</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. Template with name wtyggf45g is already present
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    status
                  </td>
                  <td className="px-4 py-4 text-sm popins">HTTP status</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. Accepted, Bad request, Forbidden, Internal server
                    error.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    suggestionId
                  </td>
                  <td className="px-4 py-4 text-sm popins">Suggestion id</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. BxEaKJyi_thur1Bc42oPcg
                  </td>
                </tr>
              </Table>
            
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center mb-5">
              RESPONSE SAMPLE 
            </h2>
          </div>

          <div className="mt-5 flex justify-center">
            <ResponseSample tabsContentResponseSample={updateTexttemplateRes} />
          </div>
        </section>

        <section id="update-text-with-pdf" className="mb-16">
           <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              UPDATE TEXT WITH PDF 
            </h2>
          </div>
          <div className="flex flex-wrap justify-center md:text-start w-xs md:w-2xl lg:2xl mx-auto sm:text-center">
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
          <div className="mt-5 flex justify-center">
            <BaseURL urlPrefix="Base URL" requestType="PUT" param="/{name}" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Path Variables
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center  mx-auto">
            
              <Table columns={PathVariableColumns}>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    name *
                  </td>
                  <td className="px-4 py-4 text-sm popins ">Max length 20</td>
                  <td className="px-4 py-4 text-sm popins ">
                    Template name <br />
                    <span className="text-orange-400 text-sm popins">
                      Base 64 URL Encoded
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm popins ">
                    e.g.”wtcfinaleng”
                  </td>
                </tr>
              </Table>
          
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
              <Table columns={RequestParameterUpdateTextTemplateWithPdfColumns}>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    multimedia_files
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    A pdf file which has size less than 100MB
                  </td>
                  <td className="px-4 py-4 text-sm popins">Pdf File</td>
                  <td className="px-4 py-4 text-sm popins">
                    (Media file uploaded name and 'documentName' must be same)
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    textMessageContent *
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 2500 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Template text message with variables. Variables should be in
                    square bracket [variable_name]
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. "[Name], Time to go big or go home because it's India
                    VS Australia FINALS!"
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    documentFileName
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">
                    Document file uploaded name should be same as documentName
                  </td>
                  <td className="px-4 py-4 text-sm popins">e.g. test.pdf</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    messageOrder
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    It should be either text_message_at_top or pdf_at_top
                  </td>
                  <td className="px-4 py-4 text-sm popins">Message order</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. text_message_at_top or pdf_at_top
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    displayText
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length is 25 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion display text
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    postback
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 120 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion postback
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    phoneNumber
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid phone number
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. +919876543212
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    URL
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">Valid URL</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. https://brandx.onelink.me/
                  </td>
                </tr>
              </Table>
          
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              REQUEST SAMPLE - MULTIPART
            </h2>
          </div>
          <div className="flex justify-center mt-5">
            <RequestSample tabsContent={updatetemppdfReq} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 mx-auto ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Response Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
           
              <Table
                columns={ResponseParameterUpdateTextTemplateWithPdfColumns}
              >
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    error
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Error response object that includes code, message and status
                    below
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    code
                  </td>
                  <td className="px-4 py-4 text-sm popins ">
                    HTTP status code
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    message
                  </td>
                  <td className="px-4 py-4 text-sm popins">Error message</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. Template with name wtyggf45g is already present
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    status
                  </td>
                  <td className="px-4 py-4 text-sm popins">HTTP status</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. Accepted, Bad request, Forbidden, Internal server
                    error.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    suggestionId
                  </td>
                  <td className="px-4 py-4 text-sm popins">Suggestion id</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. BxEaKJyi_thur1Bc42oPcg
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

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Format URL
            </h2>
          </div>
          <div className="mt-5 flex justify-center">
            <BaseURL urlPrefix="serverRoot" requestType="PUT" param="/{name}" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Base URL
            </h2>
          </div>
          <div className="mt-5 flex justify-center">
            <BaseURL urlPrefix="base URL" requestType="PUT" param="/{name}"/>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Path Variables
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
           
              <Table columns={PathVariableColumns}>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    name *
                  </td>
                  <td className="px-4 py-4 text-sm popins">Max length 20</td>
                  <td className="px-4 py-4 text-sm popins">
                    Template name <br />
                    <span className="text-orange-400 text-sm popins">
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
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins">content-type</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    application/json
                  </td>
                </tr>

                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins">api_key</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    secret key. E.g. agyduem45c
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-sm popins">botid</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    registered bot id. E.g. OsOsQ0GwNvUdLT V9Bd{" "}
                  </td>
                </tr>
              </Table>
            
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
           
              <Table columns={RequestParameterRCStandaloneColumns}>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    multimedia_files
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Media File Recommendations
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    list of multipart files(image/video)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Media file uploaded name and 'thumbnailFileName' must be
                    same
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    orientation *
                  </td>
                  <td className="px-4 py-4 text-sm popins ">-</td>
                  <td className="px-4 py-4 text-sm popins">
                    Orientation(VERTICAL/HORIZONTAL)
                  </td>
                  <td className="px-4 py-4 text-sm popins">e.g. VERTICAL</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    alignment * (Applicable only for HORIZONTAL)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    If the orientation is HORIZONTAL, the alignment should be
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    In case of HORIZONTAL orientation alignment should
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. SHORT_HEIGHT
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    height * (Applicable only for VERTICAL)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    If the orientation is VERTICAL, the height should be
                    specified
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Card Height (SHORT_HEIGHT/MEDIUM_HEIGHT)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. text_message_at_top or pdf_at_top
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    cardTitle *
                  </td>
                  <td className="px-4 py-4">
                    Max length 200 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins"px-4 py-4>Card title</td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    cardDescription *
                  </td>
                  <td className="px-4 py-4 text-sm popins ">
                    Max length 2000 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Card Description</td>
                  <td className="px-4 py-4">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    mediaUri
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid uri which can be publicly accessible (including
                    variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Media Uri</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. https://brandx.onelink.me/temp.mp4
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    thumbnailUri
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid uri which can be publicly accessible
                  </td>
                  <td className="px-4 py-4 text-sm popins">thumbnail Uri</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. https://brandx.onelink.me/temp.jpeg
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 popins text-sm text-orange-400">
                    fileName
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Media File Recommendations
                  </td>
                  <td className="px-4 py text-sm popins">Media File</td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    thumbnailFileName
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Media File Recommendations
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    If the file type is video then need to give
                    thumbnailFileName
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm text-orange-400">
                    suggestionType
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion type is predefined. A max of 4 Suggestions
                    allowed
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion type is either of suggestion type
                  </td>
                  <td className="px-4 py-4 text-sm popins">e.g. reply</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    displayText
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length is 25 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion display text
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    postback
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 120 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion postback
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    phoneNumber
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid phone number
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. +919876543212
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    URL
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">Valid URL</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. https://brandx.onelink.me/
                  </td>
                </tr>
              </Table>
           
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              REQUEST SAMPLE - MULTIPART
            </h2>
          </div>
          <div className="mt-5 flex justify-center">
            <RequestSample tabsContent={updateRichcardReq} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Response Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
           
              <Table columns={ResponseParameterRCStandaloneColumns}>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    error
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Error response object that includes code, message and status
                    below
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    code
                  </td>
                  <td className="px-4 py-4 text-sm popins">HTTP status code</td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    message
                  </td>
                  <td className="px-4 py-4 text-sm popins">Error message</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. Template with name wtyggf45g is already present
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    status
                  </td>
                  <td className="px-4 py-4 text-sm popins">HTTP status</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. Accepted, Bad request, Forbidden, Internal server
                    error.
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    cardId
                  </td>
                  <td className="px-4 py-4 text-sm popins">Card id</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. BxEaKJyi_thur1Bc42oPcg
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    suggestionId
                  </td>
                  <td className="px-4 py-4 text-sm popins">Suggestion id</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. BxEaKJyi_thur1Bc42oPcg
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    mediaUri
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Media file URL of the uploaded image/video data. This URL
                    will belong to the Celtiix domain.
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Publicly accessible media URL of the uploaded media. E.g.
                    https://app.celtiix.com/rcs/message/media/0Q8XPJA8
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    thumbnailUri
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Thumbnail file URL of the uploaded image data. This URL will
                    belong to the Celtiix domain.
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Publicly accessible media URL of the uploaded media. E.g.
                    https://app.celtiix.com/rcs/message/media/0UAAX5X4H0UVI4.jpeg
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
            <ResponseSample tabsContentResponseSample={upadateRichcardRes} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              HTTP Response Codes
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
           
              <Table columns={httpTableColoumn}>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins  font-normal">400</td>
                  <td className="px-4 py-4 text-sm popins font-normal text-red-500">
                    Bad Request
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal">403</td>
                  <td className="px-4 py-4 text-sm popins font-normal">
                    {" "}
                    Forbidden
                  </td>
                </tr>

                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal ">500</td>
                  <td className="px-4 py-4 text-sm popins font-normal">
                    Internal server error
                  </td>
                </tr>

                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  {" "}
                  <td className="px-4 py-4 text-sm popinsfont-normal ">202</td>
                  <td className="px-4 py-4 text-sm popins font-normal text-green-500">
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

        <section id="rich-card-carousel" >
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
          <div className="mt-5 flex justify-center">
            <BaseURL urlPrefix="serverRoot" requestType="PUT" param="/{name}"/>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Base URL
            </h2>
          </div>
          <div className="mt-5 flex justify-center">
            <BaseURL urlPrefix="Base URL" requestType="PUT" param="/{name}" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Path Variables
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            
              <Table columns={PathVariableColumns}>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    name *
                  </td>
                  <td className="px-4 py-4 text-sm popins">Max length 20</td>
                  <td className="px-4 py-4 text-sm popins">
                    Template name <br />
                    <span className="text-orange-400 text-sm popins">
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
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins">content-type</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    application/json
                  </td>
                </tr>

                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins">api_key</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    secret key. E.g. agyduem45c
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-sm popins">botid</td>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    registered bot id. E.g. OsOsQ0GwNvUdLT V9Bd{" "}
                  </td>
                </tr>
              </Table>
           
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
           
              <Table columns={RequestParameterCarouselColumns}>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    multimedia_files
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Media File Recommendations
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    list of multipart files(image/video)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    'fileName'/'thumbnailFileName' <br/> must be same
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    cardTitle *
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 200 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Card title</td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    cardDescription *
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 2000 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Card Description</td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    mediaUri
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid uri which can be publicly accessible (including
                    variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Media Uri</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. https://brandx.onelink.me<br/>/temp.mp4
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    thumbnailUri
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid uri which can be publicly accessible
                  </td>
                  <td className="px-4 py-4 text-sm popins">thumbnail Uri</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. https://brandx.onelink.me<br/>/temp.jpeg
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    fileName
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Media File Recommendations
                  </td>
                  <td className="px-4 py-4 text-sm popins">Media File</td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    thumbnailFileName
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Media File Recommendations
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    If the file type is video then need to give
                    thumbnailFileName
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    suggestionType
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion type is predefined. A max of 4 Suggestions
                    allowed
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion type is either of suggestion type
                  </td>
                  <td className="px-4 py-4 text-sm popins">e.g. reply</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    displayText
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length is 25 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion display text
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    postback
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 120 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion postback
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    phoneNumber
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid phone number
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. +919876543212
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    URL
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">Valid URL</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. https://brandx.onelink.me/
                  </td>
                </tr>
              </Table>
           
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              REQUEST SAMPLE - MULTIPART
            </h2>
          </div>
          <div className="mt-5 flex justify-center">
            <RequestSample tabsContent={updateRichcarouselReq} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Response Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
           
              <Table columns={ResponseParameterRCStandaloneColumns}>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    error
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Error response object that <br/> includes code, message and <br/> status
                    below
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    code
                  </td>
                  <td className="px-4 py-4 text-sm popins">HTTP status code</td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    message
                  </td>
                  <td className="px-4 py-4 text-sm popins">Error message</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. Template with name <br/> wtyggf45g is already present
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    status
                  </td>
                  <td className="px-4 py-4 text-sm popins">HTTP status</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. Accepted, Bad request,<br/> Forbidden, Internal server
                    error.
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    cardId
                  </td>
                  <td className="px-4 py-4 text-sm popins">Card id</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. 83w0A5tVXGpZm4y0-ZSQ
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    suggestionId
                  </td>
                  <td className="px-4 py-4 text-sm popins">Suggestion id</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. BxEaKJyi_thur1Bc42oPcg
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    mediaUri
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Media file URL of the <br/> uploaded image/video <br/>data. This URL
                    will belong <br/>to the Celtiix domain.
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Publicly accessible media URL <br/>of the uploaded media. E.g.<br/>
                    https://app.celtiix.com/rcs/message<br/>/media/0Q8XPJA8
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    thumbnailUri
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Thumbnail file URL of the <br/> uploaded image data. This <br/>URL will
                    belong to the <br/>Celtiix domain.
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Publicly accessible media URL <br/>of the uploaded media. E.g.<br/>
                    https://app.celtiix.com/rcs/message/media<br/>/0UAAX5X4H0UVI4.jpeg
                  </td>
                </tr>
              </Table>
           
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              HTTP Response Codes
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
           
              <Table columns={httpTableColoumn}>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins  font-normal">400</td>
                  <td className="px-4 py-4 text-sm popins font-normal text-red-500">
                    Bad Request
                  </td>
                </tr>
                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal">403</td>
                  <td className="px-4 py-4 text-sm popins font-normal">
                    {" "}
                    Forbidden
                  </td>
                </tr>

                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal ">500</td>
                  <td className="px-4 py-4 text-sm popins font-normal">
                    Internal server error
                  </td>
                </tr>

                <tr
                  className={`${
                    colors.tableBorder
                  } border-b`}
                >
                  {" "}
                  <td className="px-4 py-4 text-sm popins font-normal ">202</td>
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
            <ResponseSample tabsContentResponseSample={updateRichcarouselRes} />
          </div>
        </section>
      </div>

      {/* Mini Map Navigation - Hidden on small screens */}
      <div
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
        } hidden lg:block w-66 h-fit sticky  top-4  shrink-0 rounded-2xl  mr-4 `}
      >
        <div className="rounded-lg p-3 h-full flex flex-row">
          <div className="relative">
            {/* Track line */}
            <div
              className={`${
                isDarkMode ? "bg-gray-600" : "bg-gray-200"
              } w-1 h-40 top-5  rounded absolute left-3`}
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

export default UpdateTemplateRCS;
