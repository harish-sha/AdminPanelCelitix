import React, { useState, useEffect } from "react";
import BaseURL from "../../components/BaseURL";
import RequestSample from "../../components/RequestSample";
// import Table from "../../components/Table";
import Table from "@/ApiDocs/components/Tablenew";
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
      id: 0,
      title: "202 Accepted",
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

  const richcardStndReq = [
    {
      id: 0,
      title: "Without Varibles",
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

    `,
    },
    {
      id: 1,
      title: "With Varibles",
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
    `,
    },
    {
      id: 2,
      title: " Upload Multimedia ",
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
} `,
    },
    {
      id: 3,
      title: "With Template",
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

    `,
    },
  ];

  const richcardStndRes = [
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
    `,
    },

    {
      id: 1,
      title: "404 Bad Request",
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
    `,
    },
  ];

  const richcardcarouselReq = [
    {
      id: 0,
      title: "Without Varibles",
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

    `,
    },
    {
      id: 1,
      title: "With Varibles",
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

    `,
    },
    {
      id: 2,
      title: " Upload Multimedia",
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

    `,
    },
    {
      id: 3,
      title: "With Template",
      requestPrefix: `
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

    `,
    },
  ];

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
    }`,
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
      id: 0,
      title: "202 Accepted",
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

      `,
    },

    {
      id: 1,
      title: "404 Bad Request",
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

      `,
    },
  ];

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

  // const scrollToSection = (sectionId) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //     setActiveSection(sectionId);
  //   }
  // };

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

  return (
    <div
      className={`flex w-[100%]   ${isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
        }`}
    >
      {/* Main Content */}
      <div className=" p-4 lg:p-6 overflow-y-auto w-4xl mx-auto ">
        <section id="text-message" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5 pb-2">
              TEXT MESSAGE TEMPLATE
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className="mt-4 text-md flex justify-center items-center">
                This API is used to submit a Text Message template for approval.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseURL urlPrefix="baseURL" requestType="POST" param="/" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
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
                  <Table.Cell align="center" className="text-orange-500">
                    name *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 20 and should contain only alphanumeric chars,
                    underscore and hyphen.
                  </Table.Cell>
                  <Table.Cell align="center">Template name</Table.Cell>
                  <Table.Cell align="center">e.g. “wtcfinaleng”</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Type *
                  </Table.Cell>
                  <Table.Cell align="center">Type is predefined</Table.Cell>
                  <Table.Cell align="center">
                    Template type{" "}
                    <span className="text-green-600">[text_message]</span>
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Text Message Content *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length is 2500 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Template Text message with custom variables. Variables
                    should be in square brackets
                    <span className="text-green-600">[variable_name]</span>
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. “[Name], Time to go big or go home because it's India
                    VS Australia FINALS!”
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Suggestion Type
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion type is predefined. For text message max 11
                    suggestions allowed
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion type is either of Suggestion type
                  </Table.Cell>
                  <Table.Cell align="center">e.g. reply</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Display Text
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
                  <Table.Cell align="center" className="text-orange-500">
                    Postback
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max Length 120 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Suggestion postback</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Phone Number
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid phone number</Table.Cell>
                  <Table.Cell align="center">e.g. +919876543212</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    URL
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid URL</Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://brandx.onelink.me/
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2  popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              REQUEST SAMPLE - MULTIPART
            </h2>

            <div className="w-full mt-10">
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
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-72">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-72">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    error
                  </Table.Cell>
                  <Table.Cell align="center">
                    Error response object that includes code, message and status
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    code
                  </Table.Cell>
                  <Table.Cell align="center">HTTP status code</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    message
                  </Table.Cell>
                  <Table.Cell align="center">Error message</Table.Cell>
                  <Table.Cell align="center">
                    e.g. “Template with name wtyggff45g is already present”
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">HTTP status</Table.Cell>
                  <Table.Cell align="center">
                    e.g. Accepted, Bad request, Forbidden, Internal server error
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    suggestionId
                  </Table.Cell>
                  <Table.Cell align="center">Suggestion id</Table.Cell>
                  <Table.Cell align="center">
                    e.g. BxEaKJyi_thur1Bc42oPcg
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
            <ResponseSample
              tabsContentResponseSample={tabsContentResponseSample}
            />
          </div>
        </section>

        <section id="text-message-pdf" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              TEXT MESSAGE WITH PDF
            </h2>

            <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className="text-sm text-center lg:text-start mx-auto ">
                This API is used to submit a Text Message with a pdf template
                for approval. A pdf file should be uploaded as a multipart file.
                Pdf file size should be less than 100MB.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseURL urlPrefix="baseURL" requestType="POST" param="/" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Request Parameters
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
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row align="center">
                  <Table.Cell className="text-orange-400" align="center">
                    multimedia_files
                  </Table.Cell>
                  <Table.Cell align="center">
                    A pdf file which has size less than 100MB
                  </Table.Cell>
                  <Table.Cell align="center">
                    Pdf File
                  </Table.Cell>
                  <Table.Cell calign="center">
                    (Media file uploaded name and "documentName" must be same)
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell className=" text-orange-400" align="center">
                    name *
                  </Table.Cell>
                  <Table.Cell className="px-4 py-4 text-sm popins">
                    Max length 20 and should contain only alphanumeric chars,
                    underscore.
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-green-600">Template name</span>
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. “wtfcnfinaleng”
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell align="center" className=" text-orange-400">
                    type *
                  </Table.Cell>
                  <Table.Cell align="center" >
                    Type is predefined
                  </Table.Cell>
                  <Table.Cell align="center">
                    Template type{" "}
                    <span className="text-green-600">
                      [text_message_with_pdf]
                    </span>
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell align="center" className=" text-orange-400">
                    templateState *
                  </Table.Cell>
                  <Table.Cell align="center">
                    State is predefined
                  </Table.Cell>
                  <Table.Cell align="center">
                    Template state “Create” or “Submit”
                  </Table.Cell>
                  <Table.Cell align="center">
                    E.g. “templateState”:“Create”
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell align="center" className=" text-orange-400">
                    textMessageContent *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length is 2500 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Template Text message with custom variables. Variables
                    should be in square brackets ([[variable_name]])
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. “[Name], Time to go big or go home because it’s India
                    VS Australia FINALS!”
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell align="center" className=" text-orange-400">
                    documentFileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                  <Table.Cell align="center">
                    Document file uploaded name should be same as
                    documentFileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    E.g. test.pdf
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell align="center" className=" text-orange-400">
                    messageOrder
                  </Table.Cell>
                  <Table.Cell align="center">
                    It should be either text_message_at_top or pdf_at_top
                  </Table.Cell>
                  <Table.Cell align="center">
                    Message order
                  </Table.Cell>
                  <Table.Cell align="center">
                    E.g. text_message_at_top OR pdf_at_top
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell align="center" className=" text-orange-400">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion type is predefined. For text message max 11
                    Suggestions allowed
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion type is either of Suggestion type
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. reply
                  </Table.Cell>
                </Table.Row>

                <Table.Row >
                  <Table.Cell align="center" className=" text-orange-400">
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
                  <Table.Cell align="center" className=" text-orange-400">
                    Postback
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max Length 120 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion postback
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                </Table.Row>

                <Table.Row align="center">
                  <Table.Cell align="center" className=" text-orange-400">
                    phoneNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-400">
                    URL
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                  <Table.Cell >align="center"
                    Valid URL
                  </Table.Cell>
                  <Table.Cell align="center">
                    https://brandx.onelink.me/
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
            <RequestSample tabsContent={textmsgTempReq} />
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
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-50">
                    <div className="text-center">Remarks</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    error
                  </Table.Cell>
                  <Table.Cell align="center">
                    Error response object that includes code, message and status
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    code
                  </Table.Cell>
                  <Table.Cell align="center">HTTP status code</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    message
                  </Table.Cell>
                  <Table.Cell align="center">Error message</Table.Cell>
                  <Table.Cell align="center">
                    e.g. “Template with name wtyggtf45g is already present”
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">HTTP status</Table.Cell>
                  <Table.Cell align="center">
                    e.g. Accepted, Bad request, Forbidden, Internal server error
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    suggestionId
                  </Table.Cell>
                  <Table.Cell align="center">Suggestion id</Table.Cell>
                  <Table.Cell align="center">
                    e.g. BxEaKJyi_thur1Bc42oPc9
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
            <ResponseSample tabsContentResponseSample={textmsgTempRes} />
          </div>
        </section>

        <section id="rich-card" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              RICH CARD STANDALONE
            </h2>
            <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className="text-sm lg:text-start text-center mx-auto popins">
                This API is used to submit a Rich Card standalone Message
                template for approval. Multimedia can be provided either as a
                url or multipart file upload. Either of one must be provided, if
                both are provided multipart file upload is considered url will
                be ignored.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseURL urlPrefix="baseURL" requestType="POST" param="/" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium ">
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
                  <Table.Cell align="center" className="text-orange-500">
                    multimedia_files
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">
                    List of multipart files (image/video)
                  </Table.Cell>
                  <Table.Cell align="center">
                    (Media file uploaded name and "fileName"/"thumbnailFileName"
                    must be same)
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    name *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 20 and should contain only alphanumeric chars,
                    underscore and hyphen
                  </Table.Cell>
                  <Table.Cell align="center">Template name</Table.Cell>
                  <Table.Cell align="center">e.g. “wtcfinaleng”</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    type *
                  </Table.Cell>
                  <Table.Cell align="center">Type is predefined</Table.Cell>
                  <Table.Cell align="center">Template type</Table.Cell>
                  <Table.Cell align="center">rich_card</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    templateState *
                  </Table.Cell>
                  <Table.Cell align="center">State is predefined</Table.Cell>
                  <Table.Cell align="center">
                    Template state “Create” or “Submit”
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. "templateState":"Create"
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    orientation *
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">
                    Card Orientation (VERTICAL, HORIZONTAL)
                  </Table.Cell>
                  <Table.Cell align="center">e.g. VERTICAL</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    alignment* (HORIZONTAL only)
                  </Table.Cell>
                  <Table.Cell align="center">
                    If orientation is HORIZONTAL, alignment should be specified
                  </Table.Cell>
                  <Table.Cell align="center">
                    Allowed values: LEFT, RIGHT
                  </Table.Cell>
                  <Table.Cell align="center">e.g. LEFT</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    height* (VERTICAL only)
                  </Table.Cell>
                  <Table.Cell align="center">
                    If orientation is VERTICAL, height should be specified
                  </Table.Cell>
                  <Table.Cell align="center">
                    Card Height (SHORT_HEIGHT, MEDIUM_HEIGHT)
                  </Table.Cell>
                  <Table.Cell align="center">e.g. SHORT_HEIGHT</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    cardTitle *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 200 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Card Title</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    cardDescription *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 2000 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Card Description</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    mediaUrl
                  </Table.Cell>
                  <Table.Cell align="center">
                    Valid publicly accessible URL (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Media URL</Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://brandx.onelink.me <br/>
                    /temp.mp4
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    thumbnailUrl
                  </Table.Cell>
                  <Table.Cell align="center">
                    Valid publicly accessible URL
                  </Table.Cell>
                  <Table.Cell align="center">Thumbnail URL</Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://brandx.onelink.me <br/>
                    /temp.jpeg
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    fileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">Media File</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    thumbnailFileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">
                    Required if file type is video (thumbnailFileName)
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion type is predefined (max 4 allowed)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion type must be one of allowed types
                  </Table.Cell>
                  <Table.Cell align="center">e.g. reply</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    displayText
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 25 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion display text with variables
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Postback
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 120 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion postback with variables
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    phoneNumber
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid phone number</Table.Cell>
                  <Table.Cell align="center">e.g. +919876543212</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    URL
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid URL</Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://brandx.onelink.me/
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
            <RequestSample tabsContent={richcardStndReq} />
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
                  <Table.Cell align="center" className="text-orange-500">
                    multimedia_files
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">
                    List of multipart files (image/video)
                  </Table.Cell>
                  <Table.Cell align="center">
                    (Uploaded name must match "fileName"/"thumbnailFileName")
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    name *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 20. Only alphanumeric, underscore, hyphen allowed
                  </Table.Cell>
                  <Table.Cell align="center">Template Name</Table.Cell>
                  <Table.Cell align="center">e.g. “wtcfinaleng”</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    type *
                  </Table.Cell>
                  <Table.Cell align="center">Predefined type</Table.Cell>
                  <Table.Cell align="center">Template type</Table.Cell>
                  <Table.Cell align="center">rich_card</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    templateState *
                  </Table.Cell>
                  <Table.Cell align="center">Predefined state</Table.Cell>
                  <Table.Cell align="center">
                    Template state (“Create” / “Submit”)
                  </Table.Cell>
                  <Table.Cell align="center">
                    "templateState":"Create"
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    orientation *
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">
                    Card orientation (VERTICAL / HORIZONTAL)
                  </Table.Cell>
                  <Table.Cell align="center">VERTICAL</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    alignment* (HORIZONTAL only)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Required when orientation = HORIZONTAL
                  </Table.Cell>
                  <Table.Cell align="center">Allowed: LEFT / RIGHT</Table.Cell>
                  <Table.Cell align="center">LEFT</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    height* (VERTICAL only)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Required when orientation = VERTICAL
                  </Table.Cell>
                  <Table.Cell align="center">
                    Card height (SHORT_HEIGHT / MEDIUM_HEIGHT)
                  </Table.Cell>
                  <Table.Cell align="center">SHORT_HEIGHT</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    cardTitle *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 200 (including variables)
                  </Table.Cell>
                  <Table.Cell align="center">Card title text</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    cardDescription *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 2000 (including variables)
                  </Table.Cell>
                  <Table.Cell align="center">Card description text</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    mediaUrl
                  </Table.Cell>
                  <Table.Cell align="center">
                    Valid public URL (variables allowed)
                  </Table.Cell>
                  <Table.Cell align="center">Media file URL</Table.Cell>
                  <Table.Cell align="center">
                    https://brandx.onelink.me/temp.mp4
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    thumbnailUrl
                  </Table.Cell>
                  <Table.Cell align="center">Valid public URL</Table.Cell>
                  <Table.Cell align="center">Thumbnail image URL</Table.Cell>
                  <Table.Cell align="center">
                    https://brandx.onelink.me/temp.jpeg
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    fileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendation
                  </Table.Cell>
                  <Table.Cell align="center">Uploaded file name</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    thumbnailFileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    Required for video type
                  </Table.Cell>
                  <Table.Cell align="center">Thumbnail file name</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">
                    Predefined (max 4 allowed)
                  </Table.Cell>
                  <Table.Cell align="center">Suggestion type</Table.Cell>
                  <Table.Cell align="center">reply</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    displayText
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 25 (including variables)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion display text
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    postback
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 120 (including variables)
                  </Table.Cell>
                  <Table.Cell align="center">Postback value</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    phoneNumber
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid phone number</Table.Cell>
                  <Table.Cell align="center">+919876543212</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    url
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid URL</Table.Cell>
                  <Table.Cell align="center">
                    https://brandx.onelink.me/
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
            <ResponseSample tabsContentResponseSample={richcardStndRes} />
          </div>
        </section>

        <section id="rich-carousel" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              Rich Card Carousel
            </h2>
            <div className="flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className="text-sm text-center lg:text-start mx-auto popins">
                This API is used to submit a Rich Card Carousel template for
                approval. Multimedia can be provided either as a url or
                multipart file upload. Either of one must be provided, if both
                are provided multipart file upload is considered url will be
                ignored.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseURL urlPrefix="baseURL" requestType="POST" param="/" />
          </div>
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium popins sm:text-center">
              RESPONSE PARAMETERS
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
                  <Table.Cell align="center" className="text-orange-500">
                    multimedia_files
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">
                    List of multipart files (image/video)
                  </Table.Cell>
                  <Table.Cell align="center">
                    (Media file uploaded name and "fileName"/"thumbnailFileName"
                    must be same)
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    name *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 20 and should contain only alphanumeric chars,
                    underscore and hyphen
                  </Table.Cell>
                  <Table.Cell align="center">Template name</Table.Cell>
                  <Table.Cell align="center">e.g. “wtcfinaleng”</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    type *
                  </Table.Cell>
                  <Table.Cell align="center">Type is predefined</Table.Cell>
                  <Table.Cell align="center">Template type</Table.Cell>
                  <Table.Cell align="center">rich_card</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    templateState *
                  </Table.Cell>
                  <Table.Cell align="center">State is predefined</Table.Cell>
                  <Table.Cell align="center">
                    Template state “Create” or “Submit”
                  </Table.Cell>
                  <Table.Cell align="center">
                    e.g. "templateState":"Create"
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    orientation *
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">
                    Card Orientation (VERTICAL, HORIZONTAL)
                  </Table.Cell>
                  <Table.Cell align="center">e.g. VERTICAL</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    alignment* (HORIZONTAL only)
                  </Table.Cell>
                  <Table.Cell align="center">
                    If orientation is HORIZONTAL, alignment should be specified
                  </Table.Cell>
                  <Table.Cell align="center">
                    Allowed values: LEFT, RIGHT
                  </Table.Cell>
                  <Table.Cell align="center">e.g. LEFT</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    height* (VERTICAL only)
                  </Table.Cell>
                  <Table.Cell align="center">
                    If orientation is VERTICAL, height should be specified
                  </Table.Cell>
                  <Table.Cell align="center">
                    Card Height (SHORT_HEIGHT, MEDIUM_HEIGHT)
                  </Table.Cell>
                  <Table.Cell align="center">e.g. SHORT_HEIGHT</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    cardTitle *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 200 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Card Title</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    cardDescription *
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 2000 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Card Description</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    mediaUrl
                  </Table.Cell>
                  <Table.Cell align="center">
                    Valid publicly accessible URL (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">Media URL</Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://brandx.onelink.me <br/>
                    /temp.mp4
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    thumbnailUrl
                  </Table.Cell>
                  <Table.Cell align="center">
                    Valid publicly accessible URL
                  </Table.Cell>
                  <Table.Cell align="center">Thumbnail URL</Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://brandx.onelink.me <br/>
                    /temp.jpeg
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    fileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">Media File</Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    thumbnailFileName
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media File Recommendations
                  </Table.Cell>
                  <Table.Cell align="center">
                    Required if file type is video (thumbnailFileName)
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    suggestionType
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion type is predefined (max 4 allowed)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion type must be one of allowed types
                  </Table.Cell>
                  <Table.Cell align="center">e.g. reply</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    displayText
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 25 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion display text with variables
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Postback
                  </Table.Cell>
                  <Table.Cell align="center">
                    Max length 120 (including variables if any)
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion postback with variables
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    phoneNumber
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid phone number</Table.Cell>
                  <Table.Cell align="center">e.g. +919876543212</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    URL
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                  <Table.Cell align="center">Valid URL</Table.Cell>
                  <Table.Cell align="center">
                    e.g. https://brandx.onelink.me/
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
          <div className="mt-5 flex justify-center items-center">

            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="max-w-30">
                    <div className="text-center">Field Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="max-w-40">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="max-w-40">
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
                    Error response object that includes code, message and status
                    below
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    code
                  </Table.Cell>
                  <Table.Cell align="center">
                    HTTP status code
                  </Table.Cell>
                  <Table.Cell align="center">
                    -
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    message
                  </Table.Cell>
                  <Table.Cell align="center">
                    Error message
                  </Table.Cell>
                  <Table.Cell align="center">
                    Eg., Template with name wtyggf145g is already present
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">
                    HTTP status
                  </Table.Cell>
                  <Table.Cell align="center">
                    Eg., Accepted , Bad request, Forbidden, Internal server
                    error.
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    cardId
                  </Table.Cell>
                  <Table.Cell align="center">
                    Card id
                  </Table.Cell>
                  <Table.Cell align="center">
                    Eg.,83w0A3tvGXPzgm4vyO-ZSQ
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    suggestionId
                  </Table.Cell>
                  <Table.Cell align="center">
                    Suggestion id
                  </Table.Cell>
                  <Table.Cell align="center">
                    Eg., Wco6Fqz_jacPvKJjMFUdug
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    mediaUrl
                  </Table.Cell>
                  <Table.Cell align="center">
                    Media file URL of the uploaded image/video data. This URL
                    will belong to the Celltix domain.
                  </Table.Cell>
                  <Table.Cell align="center">
                    Publicly accessible media URL of the uploaded media. E.g.,
                    https://app.celltix.com/rcs_message/media <br/>
                    /8QX8ZPKjAEM05H29PZ0N.mp4
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className="text-orange-400" align="center">
                    thumbnailUrl
                  </Table.Cell>
                  <Table.Cell align="center">
                    Thumbnail file URL of the uploaded image data. This URL will
                    belong to the Celltix domain.
                  </Table.Cell>
                  <Table.Cell align="center">
                    Publicly accessible media URL of the uploaded media. E.g.,
                    https://app.celltix.com/rcs_message/media <br/>
                    /GUTUAA8XS4XH0GTUUY14.jpeg
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
            <ResponseSample tabsContentResponseSample={richcardcarouselRes} />
          </div>
        </section>
      </div>

      {/* Mini Map Navigation - Hidden on small screens */}
      {/* <div
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
        } hidden lg:block w-66 mr-2 h-fit sticky top-4 p-2 shrink-0 rounded-2xl `}
        >
        <div className="rounded-lg h-full flex flex-row">
          <div className="relative">
            {/* Track line *
            <div
              className={`${
                isDarkMode ? "bg-gray-600" : "bg-gray-200"
              } w-1 h-auto top-5  rounded absolute left-3`}
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

export default SubmitTemplateRCS;
