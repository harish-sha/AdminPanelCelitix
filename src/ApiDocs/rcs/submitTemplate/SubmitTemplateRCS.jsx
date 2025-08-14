import React, { useState, useEffect } from "react";
import BaseURL from "../../components/BaseURL";
import RequestSample from "../../components/RequestSample";
import Table from "../../components/Table";
import ResponseSample from "../../components/ResponseSample";

import { useTheme } from "../../context/ThemeContext";

import { themeColors } from "../../themeColors";

const SubmitTemplateRCS = () => {
  const [activeSection, setActiveSection] = useState("text-message");
 


  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "text-message", title: "Text Message Template" },
    { id: "text-message-pdf", title: "Text Message With PDF" },
    { id: "rich-card", title: "Rich Card Standalone" },
    { id: "rich-carousel", title: "Rich Card Carousel" },
  ];

 
  

  const RequestParameterTextMessageTemplateTableColumns = [
    "Field Name",
    "Validation",
    "Description",
    "Remarks",
  ];

  const ResponseParameterTextMessageTemplateColumn = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const RequestParameterTextMessageWithPdfColumns = [
    "Field Name",
    "Validation",
    "Description",
    "Remarks",
  ];

  const ResponseParameterTextMessageWithPdfColumns = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const RequestParameterRichCardStandaloneColumns = [
    "Field Name",
    "Validation",
    "Description",
    "Remarks",
  ];

  const ResponseParameterRichCardStandaloneColumns = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const RequestParameterRichCardCarouselColumns = [
    "Field Name",
    "Validation",
    "Description",
    "Remarks",
  ];

  const ResponseParameterRichCardCarouselColumns = [
    "Field Name",
    "Description",
    "Remarks",
  ];

  const tabsContent = [
    {
      id: 0,
      title: "Without Variable",
      requestPrefix: `{
  "name": "wtcfinaleng",
  "type": "text_message",
  "textMessageContent": "Time to go big or go home because\r\nit's India VS Australia FINALS!",
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
      requestPrefix: `{
"name": "wtcfinaleng",
"type": "text_message",
"textMessageContent": "Hi [Name], Time to
go big or go home because it's India VS
Australia FINALS!",
"suggestions": [{
"suggestionType": "reply",
"displayText": "Click to Win [Offers]",
"postback": "click_to_win"
},{
"suggestionType": "url_action",
"url": "https://brandx.onelink.me/",
"displayText": "Answer and Win [Offers]",
"postback": "answer_and_win"
},{
"suggestionType": "dialer_action",
"phoneNumber": "+919876543212",
"displayText": "Call Now [Offers]",
"postback": "call_now"
}]
}

    `,
    },

    {
      id: 2,
      title: "Template State",
      requestPrefix: `
    {
  "name": "wefinaleng",
  "type": "text_message",
  "textMessageContent": "Time to go big or FINALS!",
  "suggestions": [{
    "suggestionType": "reply",
    "displayText": "Click to Win",
    "postback": "click_to_win"
  },
  {
    "suggestionType": "url_action",
    "url": "https://abc.me/",
    "displayText": "Answer and Win",
    "postback": "answer_and_win"
  }]
}

    `,
    },
  ];

  const textmsgTempReq = [
    {
      id: 0,
      title: "Without Variable",
      requestPrefix: `{
      
      
"name": "wtcfinaleng",
"type": "text_message_with_pdf",
"textMessageContent": "Time to go big or go
home because it's India VS Australia FINALS!",
"documentFileName":"sample (4).pdf",
"templateState":"Create",
"messageOrder":"text_message_at_top",
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

  }`,
    },

    {
      id: 1,
      title: "With Variable",
      requestPrefix: `{
      
"name": "wtcfinaleng",
"type": "text_message_with_pdf",
"textMessageContent": "Hi [Name], Time to
go big or go home because it's India VS
Australia FINALS!",
"documentFileName":"sample (4).pdf",
"templateState":"Create",
"messageOrder":"text_message_at_top",
"suggestions": [{
"suggestionType": "reply",
"displayText": "Click to Win
[Offers]",
"postback": "click_to_win"
},
{
"suggestionType": "url_action",
"url": "https://brandx.onelink.me/",
"displayText": "Answer and Win
[Offers]",
"postback": "answer_and_win"
},
{
"suggestionType": "dialer_action",
"phoneNumber": "+919876543212",
"displayText": "Call Now [Offers]",
"postback": "call_now"
}
]

}`,
    },
    {
      id: 2,
      title: "With Template State",
      requestPrefix: `{
  
"name": "wtcfinaleng",
"type": "text_message_with_pdf",
"templateState":"Create",
"textMessageContent": "Time to go big or go
home because it's India VS Australia FINALS!",
"documentFileName":"sample (4).pdf",
"templateState":"Create",
"messageOrder":"text_message_at_top",
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
  ];


const textmsgTempRes = [
  {
    id:0,
    title:"202 Accepted",
    requestPrefix: `
    {
"name": "wtcfinaleng",
"type": "text_message_with_pdf",
"textMessageContent": "Time to go big or go home because it's India VS Australia FINALS!",
"documentUrl":"https://virbm.in/rcs_message/media/8QX8ZPKJAEM05H29PZ0N.pdf",
"messageOrder":"text_message_at_top",
"suggestions": [
{
"suggestionId":"sjjdqz_jacPvKJJMFUdug",
"suggestionType": "reply",
"displayText": "Click to Win",
"postback": "click_to_win"
},
{
"suggestionId": "artcFqz_jacPvKJJMiUdug",
"suggestionType": "url_action",
"url":"https://brandx.onelink.me/",
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
    `
  },
  {
    id:1,
    title:"404 Bad Request",
    requestPrefix: `
    {
"error": {
"code": 400,
"message": "Please provide a valid bot id",
"status": "Bad Request"
}
}

    `
  }
]

const richcardStndReq = [

  {
    id:0,
    title:"Without Varibles",
    requestPrefix: `
    {
"name": "wtcfinaleng",
"type": "rich_card",
"orientation": "VERTICAL",
"height": "SHORT_HEIGHT",
"standAlone": {
"cardTitle": "Keep calm & BAT on!",
"cardDescription": "Time to go big or go home
because it's India VS Australia FINALS!",
"fileName": "Confirm_Email_Button.mp4",
"thumbnailFileName":
"Confirm_Email_Button.png",
"suggestions": [{
"suggestionType": "reply",
"displayText": "Answer & Win",
"postback": "answer_win_1"
}]
}
 }

    `
  },
  {
    id:1,
    title:"With Varibles",
    requestPrefix: `
    {
"name": "wtcfinaleng",
"type": "rich_card",
"orientation": "VERTICAL",
"height": "SHORT_HEIGHT",
"standAlone": {
"cardTitle": "Keep calm & BAT on!",
"cardDescription": "Hi [Name], Time to go big
or go home because it's India VS Australia
FINALS!",
"fileName": "Confirm_Email_Button.png",
"suggestions": [
{
"suggestionType": "reply",
"displayText": "Answer & Win [Prizes]",
"postback": "answer_win_1"
}
]
}
  }
    `
  },
  {
    id:2,
    title:" Upload Multimedia ",
    requestPrefix: `
   {
  "name": "wtcfinaleng",
  "type": "rich_card",
  "orientation": "VERTICAL",
  "height": "SHORT_HEIGHT",
  "standAlone": {
    "cardTitle": "Keep calm & BAT on!",
    "cardDescription": "Time to go big or go home!",
    "mediaUrl": "https://brandx.onelink.me
    /Confirm_Email_Button.mp4",
    "thumbnailUrl": "https://brandx.onelink.me/[Confirm]",
    "suggestions": [
      {
        "suggestionType": "reply",
        "displayText": "Answer & Win",
        "postback": "answer_win_1"
      }
    ]
  }
} `
  },
  {
    id:3,
    title:"With Template",
    requestPrefix: `
    {
"name": "wtcfinaleng",
"type": "rich_card",
"templateState":"Submit",
"orientation": "VERTICAL",
"height": "SHORT_HEIGHT",
"standAlone": {
"cardTitle": "Keep calm & BAT on!",
"cardDescription": "Time to go big or go home!",
"fileName": "Confirm_Email_Button.mp4",
"thumbnailFileName": "Confirm_Email_Button.png",
 "suggestions": [
{
"suggestionType": "reply",
"displayText": "Answer & Win",
"postback": "answer_win_1"
}
]
  }
 }

    `
  }
]

const richcardStndRes = [
  {
    id:0,
    title:"202 Accepted",
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
        "mediaUrl": "https://virbm.in/rcs_message/media/8QX8ZPKJAEM05H29PZ0N.mp4",
        "thumbnailUrl": "https://virbm.in/rcs_message/media/GUTUAA8XS4XH0GTUUY14.jpeg",
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
    `
  },

  {
    id:1,
    title:"404 Bad Request",
    requestPrefix: ` 
    {
"error":
{
"code": 400,
"message": "Please provide a valid bot i
d",
"status": "Bad Request"
}
 }
    `
  }
]


const richcardcarouselReq = [
  {
    id:0,
    title:"Without Varibles",
    requestPrefix: `
 {
  "name": "brandXcar1",
  "type": "carousel",
  "height": "SHORT_HEIGHT",
  "width": "MEDIUM_WIDTH",
  "carouselList": [
    {
      "cardTitle": "Ditch the ordinary!",
      "cardDescription": "Fashion-forward sunglasses to amp up your look",
      "fileName": "Confirm_Email_Button.png",
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
      "thumbnailFileName": "Confirm_Email_Button.png",
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

    `
  },
  {
    id:1,
    title:"With Varibles",
    requestPrefix: `
   {
  "name": "brandXcar1",
  "type": "carousel",
  "height": "SHORT_HEIGHT",
  "width": "MEDIUM_WIDTH",
  "carouselList": [
    {
      "cardTitle": "Ditch the ordinary!",
      "cardDescription": "Hi [Name] Fashion-forward sunglasses to amp up your look",
      "fileName": "Confirm_Email_Button.mp4",
      "thumbnailFileName": "Confirm_Email_Button.png",
      "suggestions": [
        {
          "suggestionType": "url_action",
          "url": "https://brandx.onelink.me/",
          "displayText": "Buy Now at [Discount] less",
          "postback": "buy_now"
        }
      ]
    },
    {
      "cardTitle": "Step into the limelight!",
      "cardDescription": "Hi [Name], Choose from new arrival sunglasses.",
      "fileName": "Confirm_Email_Button.png",
      "suggestions": [
        {
          "suggestionType": "dialer_action",
          "phoneNumber": "+919876543212",
          "displayText": "Call now [Discount] Offers",
          "postback": "call_now_offers"
        }
      ]
    }
  ]
}

    `
  },
  {
    id:2,
    title:" Upload Multimedia",
    requestPrefix: `
   {
  "name": "brandXcar1",
  "type": "carousel",
  "height": "SHORT_HEIGHT",
  "width": "MEDIUM_WIDTH",
  "carouselList": [
    {
      "cardTitle": "Ditch the ordinary!",
      "cardDescription": "Hi [Name] Fashion-forward sunglasses to amp up your look",
      "mediaUrl": "https://brandx.onelink.me/Confirm_Email_Button.mp4",
      "thumbnailUrl": "https://brandx.onelink.me/Confirm_Email_Button.png",
      "suggestions": [
        {
          "suggestionType": "url_action",
          "url": "https://brandx.onelink.me/",
          "displayText": "Buy Now at [Discount] less",
          "postback": "buy_now"
        }
      ]
    },
    {
      "cardTitle": "Step into the limelight!",
      "cardDescription": "Hi [Name], Choose from new arrival sunglasses.",
      "mediaUrl": "https://brandx.onelink.me/[Image]",
      "suggestions": [
        {
          "suggestionType": "dialer_action",
          "phoneNumber": "+919876543212",
          "displayText": "Call now [Discount] Offers",
          "postback": "call_now_offers"
        }
      ]
    }
  ]
}

    `
  },
  {
    id:3,
    title:"With Template",
    requestPrefix:`
   {
  "name": "brandXcar1",
  "type": "carousel",
  "templateState": "Submit",
  "height": "SHORT_HEIGHT",
  "width": "MEDIUM_WIDTH",
  "carouselList": [
    {
      "cardTitle": "Ditch the ordinary!",
      "cardDescription": "Fashion-forward sunglasses to amp up your look",
      "fileName": "Confirm_Email_Button.png",
      "suggestions": [
        {
          "suggestionType": "url_action",
          "url": "https://brandx.onelink.me/",
          "displayText": "Buy Now",
          "postback": "buy_now"
        }
      ]
    }
  ]
}

    `
  },
]



  const tabsContentResponseSample = [
    {
      id: 0,
      title: "202 Accepted",
      requestPrefix: ` {
        "name": "wtcfinaleng",
        "type": "text_message",
        "textMessageContent": "Time to go big or go home because it's India VS Australia FINALS!",
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
    }`
    },

    {
      id: 1,
      title: "404 Bad Request",
      requestPrefix: `{
        "error":
        {
        "code": 400,
        "message": "Please provide a valid bot id",
        "status": "Bad Request"
        }
         }`,
    },
  ];

  const richcardcarouselRes = [
    {
      id:0,
      title:"202 Accepted",
      requestPrefix: `
      {
 "name": "brandXcar1",
 "type": "carousel",
 "botId": "wr1M4c9gzJInvrF6TImd3w",
 "height": "SHORT_HEIGHT",
 "width": "MEDIUM_WIDTH",
 "carouselList": [
 {
 "cardId": "83w0A3tvGXPzgm4vy0-ZSQ",
 "cardTitle": "Ditch the ordinary!",
 "cardDescription": "Fashion-forward 
sunglasses to amp up your look",
"mediaUrl": 
"https://virbm.in/rcs_message/media/H6X8ZPKJA
EM05H29PZ9N.jpeg",
 "suggestions": [
 {
 "suggestionId": 
"streFIwNFjODZMiaClAODg",
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
 "cardDescription": "Choose from new arrival 
sunglasses.",
 "mediaUrl": 
"https://virbm.in/rcs_message/media/8QX8ZPKJA
EM05H29PZ0N.mp4",
 "thumbnailUrl": 
"https://virbm.in/rcs_message/media/GUTUAA8X
S4XH0GTUUY14.jpeg",
 "suggestions": [
 {
 "suggestionId": 
"zOigZIwNFjODZMiaClAODg",
 "suggestionType": "dialer_action",
 "phoneNumber": "+919876543212",
 "displayText": "Call now",
 "postback": "call_now"
 }
 ]
 }
 ]
}

      `
    },

    {
      id:1,
      title:"404 Bad Request",
      requestPrefix: `
      {
"error":
{
"code": 400,
"message": "Please provide a valid bot i
d",
"status": "Bad Request"
}
 }

      `
    }
  ]


  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // // Optionally reset activeSection to the first section
  // setActiveSection("text-message");
  //   // window.scrollTo({ top: 0, behavior: "auto" });
  // }, []);
  


  // useEffect(() => {
  //   window.screenTop()
  //   // Use a slight delay to ensure DOM is fully rendered
  //   const timer = setTimeout(() => {
  //     window.scrollTo({ top: 0, behavior: "instant" });
  //     setActiveSection("text-message"); // Reset to first section
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };


  

  return (
    <div
      className={`flex w-[100%]   ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
      }`}
    >
      {/* Main Content */}
      <div className=" p-4 lg:p-6 overflow-y-auto w-full ">
        <section id="text-message" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              TEXT MESSAGE TEMPLATE
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-sm text-center lg:text-start">
              This API is used to submit a Text Message template for approval.
            </p>
           </div>
          </div>
          <div className="mt-5 flex justify-center ">
            <BaseURL urlPrefix="baseURL" requestType="POST" param="/" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins ">
              Request Parameter
            </h2>

            <div className="mt-5 flex justify-center items-center ">
              <div className="w-full">
                <Table
                  columns={RequestParameterTextMessageTemplateTableColumns}
                >
                  <tr
                    className={` ${
                     colors.tableBorder
                    } border-b`}
                  >
                    <td className="px-2 py-2 text-orange-400 text-sm popins">
                      name *
                    </td>
                    <td className="px-2 py-2 text-sm popins"> Max length 20 and should contain only alphanumeric chars, underscore and hyphen.
                    </td>
                    <td className="px-2 py-2 text-sm popins">Template name</td>
                    <td className="px-2 py-2 text-sm popins">
                      {" "}
                      e.g.”wtcfinaleng”
                    </td>
                  </tr>
                  <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >
                    <td className="px-2 py-2  text-orange-400 text-sm popins">
                      Type *
                    </td>
                    <td className="px-2 py-2 text-sm popins">
                      {" "}
                      Type is predefined
                    </td>
                    <td className="px-2 py-2">
                      {" "}
                      Template type{" "}
                      <span className="text-green-600">
                        [text_message]
                      </span>{" "}
                    </td>
                    <td className="px-2 py-2 text-sm popins">-</td>
                  </tr>

                  <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >
                    <td className="px-2 py-2 text-orange-400 text-sm popins">
                      Text Message Content *
                    </td>
                    <td className="px-2 py-2 text-sm popins ">
                      Max length is 2500 (including variables if any)
                    </td>
                    <td className="px-2 py-2 text-sm popins">
                      Template Text message with custom variables. Variables
                      should be in square brackets
                      <span className="text-green-600">[variable_name]</span>
                    </td>
                    <td className="px-2 py-2 text-sm popins">
                      {" "}
                      e.g.”[Name], Time to go big or go home because it's India
                      VS Australia FINALS!”
                    </td>
                  </tr>

                  <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >
                    <td className="px-2 py-2 text-sm popins text-orange-400">
                      Suggestion Type
                    </td>
                    <td className="px-2 py-2 text-sm popins ">
                      Suggestion type is predefined. For text message max 11
                      Suggestions allowed
                    </td>
                    <td className="px-2 py-2 text-sm popins">
                      Suggestion type is either of Suggestion type
                    </td>
                    <td className="px-2 py-2 text-sm popins"> e.g.reply</td>
                  </tr>

                  <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >
                    <td className="px-2 py-2 text-sm popins text-orange-400">
                      Display Text
                    </td>
                    <td className="px-2 py-2 text-sm popins">
                      Max length is 25 (including variables if any)
                    </td>
                    <td className="px-2 py-2 text-sm popins">
                      Suggestion display text
                    </td>
                    <td className="px-2 py-2 text-sm popins "> - </td>
                  </tr>

                  <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >
                    <td className="px-2 py-2 text-sm popins text-orange-400">
                      Postback
                    </td>
                    <td className="px-2 py-2 text-sm popins ">
                      Max Length 120 (including variables if any)
                    </td>
                    <td className="px-2 py-2 text-sm popins">
                      Suggestion postback
                    </td>
                    <td className="px-2 py-2 text-sm popins"> - </td>
                  </tr>

                  <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >
                    <td className="px-2 py-2 text-sm popins text-orange-400">
                      Phone Number
                    </td>
                    <td className="px-2 py-2 text-sm popins">-</td>
                    <td className="px-2 py-2 text-sm popins">
                      {" "}
                      Valid phone number
                    </td>
                    <td className="px-2 py-2 text-sm popins">
                      {" "}
                      E.g +919876543212
                    </td>
                  </tr>

                  <tr className=" ">
                    <td className="px-2 py-2 text-orange-400">URL</td>
                    <td className="px-2 py-2 text-sm popins ">-</td>
                    <td className="px-2 py-2 text-sm popins">Valid URL</td>
                    <td className="px-2 py-2 text-sm popins">
                      {" "}
                      E.g https://brandx.onelink.me/
                    </td>
                  </tr>
                </Table>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              REQUEST SAMPLE - MULTIPART
            </h2>
         
          <div className="  flex justify-center">
            <RequestSample tabsContent={tabsContent} />
          </div>
          </div>
        
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins ">
              RESPONSE PARAMETERS
            </h2>

            <p className="text-sm">
              (Along with the below, the request parameters will also be sent
              back )
            </p>
          </div>

          <div className="mt-5 flex justify-center items-center">
         
              <Table columns={ResponseParameterTextMessageTemplateColumn}>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    error
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    Error response object that includes code, message and status
                    below
                  </td>
                  <td className="px-4 py-4">-</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    code
                  </td>
                  <td className="px-4 py-4  text-sm popins">
                    {" "}
                    HTTP status code
                  </td>
                  <td className="px-4 py-4"> - </td>
                </tr>

                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    message
                  </td>
                  <td className="px-4 py-4  text-sm popins ">Error message</td>
                  <td className="px-4 py-4  text-sm popins">
                    {" "}
                    Eg., Template with name wtyggff45g is already present{" "}
                  </td>
                </tr>

                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    status
                  </td>
                  <td className="px-4 py-4  text-sm popins ">HTTP status</td>
                  <td className="px-4 py-4  text-sm popins">
                    E.g, Accepted , Bad request, Forbidden, Internal server
                    error.
                  </td>
                </tr>

                <tr className="">
                  <td className="px-4 py-4 text-orange-400 text-sm popins">
                    suggestionId
                  </td>
                  <td className="px-4 py-4  text-sm popins">Suggestion id</td>
                  <td className="px-4 py-4  text-sm popins">
                    E.g, BxEaKJyi_thur1Bc42oPcg
                  </td>
                </tr>
              </Table>
           
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              RESPONSE SAMPLE 
            </h2>
          </div>
          <div className="flex justify-center mt-4">
            <ResponseSample
              tabsContentResponseSample={tabsContentResponseSample}
            />
          </div>

          {/* </div> */}
        </section>

        <section id="text-message-pdf" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              TEXT MESSAGE WITH PDF
            </h2>
             
            <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-sm text-center lg:text-start mx-auto ">
              This API is used to submit a Text Message with a pdf template for
              approval. A pdf file should be uploaded as a multipart file. Pdf
              file size should be less than 100MB.
            </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <BaseURL urlPrefix="baseURL" requestType="POST" param="/"/>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Parameters
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center  ">
            
              <Table columns={RequestParameterTextMessageWithPdfColumns}>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b` }
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400 w-1/5">
                    multimedia_files
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    A pdf file which has size less than 100MB
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">Pdf File</td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    (Media file uploaded name and "documentName" must be same)
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400 w-1/5">
                    name *
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Max length 20 and should contain only alphanumeric chars,
                    underscore.
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    <span className="text-green-600 px-4 py-4 text-sm popins">
                      Template name
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    e.g. “wtfcnfinaleng”
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400 w-1/5">
                    type *
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Type is predefined
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Template type{" "}
                    <span className="text-green-600 px-4 py-4 text-sm popins">
                      [text_message_with_pdf]
                    </span>{" "}
                  </td>
                  <td className="px-4 py-4 w-1/5">-</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400 w-1/5">
                    templateState *
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    State is predefined
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Template state “Create” or “Submit”
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    E.g. “templateState”:“Create”
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-orange-400 w-1/5">
                    textMessageContent *
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Max length is 2500 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Template Text message with custom variables. Variables
                    should be in square brackets ([[variable_name]])
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    e.g. “[Name], Time to go big or go home because it’s India
                    VS Australia FINALS!”
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400 w-1/5">
                    documentFileName
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">-</td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Document file uploaded name should be same as
                    documentFileName
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">E.g. test.pdf</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400 w-1/5">
                    messageOrder
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    It should be either text_message_at_top or pdf_at_top
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">Message order</td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    E.g. text_message_at_top OR pdf_at_top
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400 w-1/5">
                    suggestionType
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Suggestion type is predefined. For text message max 11
                    Suggestions allowed
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Suggestion type is either of Suggestion type
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">e.g. reply</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400 w-1/5">
                    displayText
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Max length is 25 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Suggestion display text
                  </td>
                  <td className="px-4 py-4 w-1/5">-</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400 w-1/5">
                    Postback
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Max Length 120 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    Suggestion postback
                  </td>
                  <td className="px-4 py-4 w-1/5">-</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400 w-1/5">
                    phoneNumber
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">-</td>
                  <td className="px-4 py-4 text-sm popins w-1/5">-</td>
                  <td className="px-4 py-4 text-sm popins w-1/5">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400 w-1/5">
                    URL
                  </td>
                  <td className="px-4 py-4 text-sm popins w-1/5">-</td>
                  <td className="px-4 py-4 text-sm popins w-1/5">Valid URL</td>
                  <td className="px-4 py-4 text-sm popins w-1/5">
                    https://brandx.onelink.me/
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
            <RequestSample tabsContent = {textmsgTempReq } />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              RESPONSE PARAMETERS
            </h2>

            <p className="text-sm">
              (Along with the below, the request parameters will also be sent
              back )
            </p>
          </div>

          <div className="mt-5 flex justify-center items-center ">
           
              <Table columns={ResponseParameterTextMessageWithPdfColumns}>
                <tr
                  className={` ${
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
                  className={` ${
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
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    message
                  </td>
                  <td className="px-4 py-4 text-sm popins">Error message</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g., Template with name wtyggtf45g is already present
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    status
                  </td>
                  <td className="px-4 py-4 text-sm popins">HTTP status</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g, Accepted, Bad request, Forbidden, Internal server
                    error.
                  </td>
                </tr>
                <tr
                 
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    suggestionId
                  </td>
                  <td className="px-4 py-4 text-sm popins">Suggestion id</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g, BxEaKJyi_thur1Bc42oPc9
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
            <ResponseSample tabsContentResponseSample= {textmsgTempRes}/>
          </div>
        </section>

        <section id="rich-card" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              RICH CARD STANDALONE
            </h2>
            <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-sm lg:text-start text-center mx-auto popins">
              This API is used to submit a Rich Card standalone Message template
              for approval. Multimedia can be provided either as a url or
              multipart file upload. Either of one must be provided, if both are
              provided multipart file upload is considered url will be ignored.
            </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <BaseURL urlPrefix="baseURL" requestType="POST" param="/"/>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
              Request Parameters
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center ">
           
              <Table columns={RequestParameterRichCardStandaloneColumns}>
                <tr
                  className={` ${
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
                    List of multipart files (image/video)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    (Media file uploaded name and "fileName"/"thumbnailFileName"
                    must be same)
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    name *
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 20 and should contain only alphanumeric chars,
                    underscore and hyphen.
                  </td>
                  <td className="px-4 py-4 text-sm popins">Template name</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g: "wtcfinaleng"
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    type *
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Type is predefined
                  </td>
                  <td className="px-4 py-4 text-sm popins">Template type</td>
                  <td className="px-4 py-4 text-sm popins">rich_card</td>
                </tr>
                <tr
                  className={` ${
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
                    Template state “Create” or “Submit”
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g: "templateState":"Create"
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    orientation *
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">
                    Card Orientation (VERTICAL, HORIZONTAL)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Eg., VERTICAL</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    alignment* (Applicable only for HORIZONTAL orientation)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    If the orientation is HORIZONTAL, the alignment should be
                    specified.
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    In case of HORIZONTAL orientation alignment should be (LEFT,
                    RIGHT)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Eg., LEFT</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    height* (Applicable only for VERTICAL orientation)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    If the orientation is VERTICAL, the height should be
                    specified
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Card Height (SHORT_HEIGHT, MEDIUM_HEIGHT)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Eg., SHORT_HEIGHT
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    cardTitle *
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 200 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Card Title</td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={` ${
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
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    mediaUrl
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid url which can be publicly accessible. (including
                    variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Media Url</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g https://brandx.onelink.me/temp.mp4
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    thumbnailUrl
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid url which can be publicly accessible.
                  </td>
                  <td className="px-4 py-4 text-sm popins">thumbnail Url</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g https://brandx.onelink.me/temp.jpeg
                  </td>
                </tr>
                <tr
                  className={` ${
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
                  className={` ${
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
                  className={` ${
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
                    Suggestion type is either of Suggestion type
                  </td>
                  <td className="px-4 py-4 text-sm popins">e.g.reply</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    displayText
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 25 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion display text with variables
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    Postback
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max Length 120 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion postback with variables
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={` ${
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
                    E.g +919876543212
                  </td>
                </tr>
                <tr className="">
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    URL
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">Valid URL</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g https://brandx.onelink.me/
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
            <RequestSample tabsContent={richcardStndReq}/>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              RESPONSE PARAMETERS
            </h2>

            <p className="text-sm">
              (Along with the below, the request parameters will also be sent
              back )
            </p>
          </div>
          <div className="mt-5 flex justify-center items-center ">
           
              <Table columns={ResponseParameterRichCardStandaloneColumns}>
                <tr
                  className={` ${
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
                  className={` ${
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
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    message
                  </td>
                  <td className="px-4 py-4 text-sm popins">Error message</td>
                  <td className="px-4 py-4 text-sm popins">
                    Eg., Template with name wtyggtf45g is already present
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    status
                  </td>
                  <td className="px-4 py-4 text-sm popins">HTTP status</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g, Accepted, Bad request, Forbidden, Internal server
                    error.
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    cardId
                  </td>
                  <td className="px-4 py-4 text-sm popins">Card id</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g, 83w0A3tvGXPzqm4v0-ZSQ
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    suggestionId
                  </td>
                  <td className="px-4 py-4 text-sm popins">Suggestion id</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g., Wco6Fcqz_jaCpVKJMFUdudg
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    mediaUrl
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Media file URL of the uploaded image/video data. This URL
                    will belong to the Celtix domain.
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Publicly accessible media URL of the uploaded media. E.g.,
                    https://app.celitix.com/rcs_message/media/8QX82KPKJAEM05H29PZ0N.mp4
                  </td>
                </tr>
                <tr className="">
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    thumbnailUrl
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Thumbnail file URL of the uploaded image data. This URL will
                    belong to the Celtix domain.
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Publicly accessible media URL of the uploaded media. E.g.,
                    https://app.celitix.com/rcs_mess
                    age/media/GUTUAA8XS4XH0GTUUY14.jpeg
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
            <ResponseSample tabsContentResponseSample={richcardStndRes}/>
          </div>
        </section>

        <section id="rich-carousel" >
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Rich Card Carousel
            </h2>
            <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="text-sm text-center lg:text-start mx-auto popins">
              This API is used to submit a Rich Card Carousel template for
              approval. Multimedia can be provided either as a url or multipart
              file upload. Either of one must be provided, if both are provided
              multipart file upload is considered url will be ignored.
            </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <BaseURL urlPrefix="baseURL" requestType="POST" param="/"/>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              RESPONSE PARAMETERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center">
            
              <Table columns={RequestParameterRichCardCarouselColumns}>
                <tr
                  className={` ${
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
                    List of multipart files(image/video)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    (Media file uploaded name and "fileName"/"thumbnailFileName"
                    must be same)
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    name *
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 20 and should contain only alphanumeric chars,
                    underscore and hyphen.
                  </td>
                  <td className="px-4 py-4 text-sm popins">Template name</td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g.: "brandXcar1"
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    type *
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Type is predefined
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Template state “Create” or “Submit”
                  </td>
                  <td className="px-4 py-4">e.g. "templateState":"Create"</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-orange-400">templateState *</td>
                  <td className="px-4 py-4 text-sm popins">
                    State is predefined
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Template state “Create” or “Submit”
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    e.g. "templateState":"Create"
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    height *
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">
                    Card Height (SHORT_HEIGHT, MEDIUM_HEIGHT)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Eg. SHORT</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    width *
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">
                    Card width (SHORT_WIDTH, MEDIUM_WIDTH)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Eg., MEDIUM</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    cardTitle *
                  </td>
                  <td className="px-4 py-4">
                    Max length 200 (including variables if any)
                  </td>
                  <td className="px-4 py-4">Card Title</td>
                  <td className="px-4 py-4">-</td>
                </tr>
                <tr
                  className={` ${
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
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    mediaUrl
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid URL which can be publicly accessible (including
                    variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">Media URL</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g. https://brandx.onelink.me
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    thumbnailUrl
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Valid URL which can be publicly accessible
                  </td>
                  <td className="px-4 py-4 text-sm popins">Thumbnail URL</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g. https://brandx.onelink.me/temp.jpeg
                  </td>
                </tr>
                <tr
                  className={` ${
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
                  className={` ${
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
                  className={` ${
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
                    Suggestion type is either of Suggestion type
                  </td>
                  <td className="px-4 py-4 text-sm popins">e.g. reply</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    displayText
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Max length 25 (including variables if any)
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Suggestion display text
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    Postback
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
                  className={` ${
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
                    E.g. +919876543212
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    url
                  </td>
                  <td className="px-4 py-4 text-sm popins">-</td>
                  <td className="px-4 py-4 text-sm popins">Valid URL</td>
                  <td className="px-4 py-4 text-sm popins">
                    E.g. https://brandx.onelink.me/
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
            <RequestSample tabsContent={richcardcarouselReq} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              RESPONSE PARAMETERS
            </h2>

            <p className="text-sm">
              (Along with the below, the request parameters will also be sent
              back )
            </p>
          </div>
          <div className="mt-5 flex justify-center items-center ">
            
              <Table columns={ResponseParameterRichCardCarouselColumns}>
                <tr
                  className={` ${
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
                  className={` ${
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
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    message
                  </td>

                  <td className="px-4 py-4 text-sm popins">Error message</td>
                  <td className="px-4 py-4 text-sm popins">
                    Eg., Template with name wtyggf145g is already present
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    status
                  </td>
                  <td className="px-4 py-4 text-sm popins">HTTP status</td>
                  <td className="px-4 py-4 text-sm popins">
                    Eg., Accepted , Bad request, Forbidden, Internal server
                    error.
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    cardId
                  </td>
                  <td className="px-4 py-4 text-sm popins">Card id</td>
                  <td className="px-4 py-4 text-sm popins">
                    Eg.,83w0A3tvGXPzgm4vyO-ZSQ
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    suggestionId
                  </td>
                  <td className="px-4 py-4 text-sm popins">Suggestion id</td>
                  <td className="px-4 py-4 text-sm popins">
                    Eg., Wco6Fqz_jacPvKJjMFUdug
                  </td>
                </tr>
                <tr
                  className={` ${
                    colors.tableBorder
                  } border-b`}
                >
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    mediaUrl
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Media file URL of the uploaded image/video data. This URL
                    will belong to the Celltix domain.
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Publicly accessible media URL of the uploaded media. E.g.,
                    https://app.celltix.com/rcs_message/media/8QX8ZPKjAEM05H29PZ0N.mp4
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm popins text-orange-400">
                    thumbnailUrl
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Thumbnail file URL of the uploaded image data. This URL will
                    belong to the Celltix domain.
                  </td>
                  <td className="px-4 py-4 text-sm popins">
                    Publicly accessible media URL of the uploaded media. E.g.,
                    https://app.celltix.com/rcs_message/media/GUTUAA8XS4XH0GTUUY14.jpeg
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
            <ResponseSample tabsContentResponseSample={richcardcarouselRes} />
          </div>
        </section>
      </div>

      {/* Mini Map Navigation - Hidden on small screens */}
      <div
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
        } hidden lg:block w-66 mr-2 h-fit sticky top-4 p-2 shrink-0 rounded-2xl `}
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

export default SubmitTemplateRCS;
