import React, { useState, useEffect } from "react";

import { useTheme } from "../../context/ThemeContext";
import { themeColors } from "../../themeColors";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import RequestComponent from "../../components/RequestComponent";
import ResponseComponent from "../../components/ResponseComponent";
import BaseurlComponent from "../../components/BaseurlComponent";

const SendMessage = () => {
  const [activeSection, setActiveSection] = useState("session-text-message");

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "session-text-message", title: "Session Text Message" },
    { id: "media-message", title: "Media Message" },
    
   
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


  const requestDataSessionTextMessage = [
    {
      requestPrefix: `{
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+919999595313",
      "type": "text",
      "text": {
        "preview_url": false,
        "body": "This is a test"
        }
    }
`,
    },
  ];

  const SessionTextMessagecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/phone_no_id/messages' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
 `;

  const SessionTextMessageResponseData = {
    "messaging_product": "whatsapp",
    "contacts": [
      {
        "input": "+919999595313",
        "wa_id": "919999595313"
      }
    ],
    "messages": [
      {
        "id": "wamid.HBgMOTE5OTk5NTk1MzEzFQIAERgSQUMwM0Y5RjNEMjIwQTFEMEE5AA=="
      }
    ]
  };

  const SessionTextMessageResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Sun, 18 Feb 2024 19:54:32 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];


  const requestDataMediaMessage = [
    {
      requestPrefix: `{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "PHONE-NUMBER",
  "type": "image",
  "image": {
    "id" : "MEDIA-OBJECT-ID"
  }
}
`,
    },
  ];


  const MediaMessagecURL = `
curl --location 'https://amped-express.interakt.ai/api/v17.0/phone_no_id/messages' \
--header 'x-access-token: YOUR_TOKEN' \
--header 'x-waba-id: YOUR_WABA_ID' \
--header 'Content-Type: application/json' \
   `;


   const MediaMessageResponseData = {
    "messaging_product": "whatsapp",
    "contacts": [
      {
        "input": "+919999595313",
        "wa_id": "919999595313"
      }
    ],
    "messages": [
      {
        "id": "wamid.HBgMOTE5OTk5NTk1MzEzFQIAERgSQUMwM0Y5RjNEMjIwQTFEMEE5AA=="
      }
    ]
  }


  const MediaMessageResponseheaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Date", value: "Sun, 18 Feb 2024 19:54:32 GMT" },
    { key: "Server", value: "Kestrel" },
    { key: "Transfer-Encoding", value: "chunked" },
    {
      key: "Request-Context",
      value: "appId=cid-v1:3842b663-3342-4b73-804d-2baaedf43f32",
    },
  ];

  return (
    <div
    className={`flex w-[100%]   ${
      isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
    }`}
  >
    <div className=" p-4 lg:p-6 overflow-y-auto w-full ">
      <section id="session-text-message" className="mb-16">
      <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              SESSION TEXT MESSAGE
            </h2>
            <div className=" flex items-center justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p>
              To send a text message, make a POST call to /PHONE_NUMBER_ID/messages and attach a message object with type=text. Then, add a <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#text-object" target="_blank" rel="noopener noreferrer">text object</Link></span> .
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
          <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center mb-4">
             Base URL
            </h2>
            <BaseurlComponent 
             urlPrefix="Base URL" requestType="POST" param="/YOUR_PHONE_NUMBER_ID/messages" 
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
                  <td className="px-4 py-4 text-sm popins">x-access-token</td>
                  <td className="px-4 py-4 text-sm popins text-orange-500">
                    YOUR_TOKEN <br />{" "}
                    <span className="text-gray-400">
                      Enter the access token shared by us
                    </span>
                  </td>
                </tr>

                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                  <td className="px-4 py-4 text-sm popins text-orange-500">
                    YOUR_WABA_ID <br />{" "}
                    <span className="text-gray-400">
                      Enter your WhatsApp Business Account ID
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-sm popins">Content-type</td>
                  <td className="px-4 py-4 text-sm popins text-orange-500">
                    application/json
                  </td>
                </tr>
              </Table>
          </div>

 
          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div>
              <RequestComponent
                requestData={requestDataSessionTextMessage}
                curlBase={SessionTextMessagecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
            Example  Response
            </h2>
            <ResponseComponent
              jsonData={SessionTextMessageResponseData}
              headers={SessionTextMessageResponseheaders}
            />
          </div>
        

       </section>


       <section id="media-message" >
       <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              MEDIA MESSAGE
            </h2>
            <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
              <p className="mt-2">
              Use the POST <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages" target="_blank" rel="noopener noreferrer">WhatsApp Business Phone Number &gt; Messages</Link></span> endpoint to send a media message. Use the type property to indicate the media asset's type (audio, document, image, sticker, or video) and either the id or link property to indicate its ID (which you must generate) or location on your public server.
              </p>
             
             <p className="mt-2">
             If using id, you must first <span className="text-blue-500 hover:underline"><Link to='https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#upload-media'  target="_blank" rel="noopener noreferrer">upload your media asset</Link ></span> to our servers and capture the returned media ID. If using link, your asset must be on a publicly accessible server or the message will fail to send.
             </p>
            
            <p className="mt-2">To reduce the likelihood of errors and avoid unnecessary requests to your public server, we recommend that you upload your media assets and use their IDs when sending messages.</p>

            <p className="mt-2">Media assets can also be cached. See <span className="text-blue-500 hover:underline"><Link to="https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages#media-http-caching"  target="_blank" rel="noopener noreferrer">Media HTTP Caching</Link></span>.</p>
            </div>
          </div> 
         

          <div className="mt-5 flex flex-col justify-center ">
          <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center mb-4">
             Base URL
            </h2>
            <BaseurlComponent
             urlPrefix="Base URL" requestType="POST" param="/YOUR_PHONE_NUMBER_ID/messages" 
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
                  <td className="px-4 py-4 text-sm popins">x-access-token</td>
                  <td className="px-4 py-4 text-sm popins text-orange-500">
                    YOUR_TOKEN <br />{" "}
                    <span className="text-gray-400">
                      Enter the access token shared by us
                    </span>
                  </td>
                </tr>

                <tr className={`${colors.tableBorder} border-b`}>
                  <td className="px-4 py-4 text-sm popins">x-waba-id</td>
                  <td className="px-4 py-4 text-sm popins text-orange-500">
                    YOUR_WABA_ID <br />{" "}
                    <span className="text-gray-400">
                      Enter your WhatsApp Business Account ID
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 text-sm popins">Content-type</td>
                  <td className="px-4 py-4 text-sm popins text-orange-500">
                    application/json
                  </td>
                </tr>
              </Table>
          </div>

 
          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <p className="mt-2 font-medium">Sample request using image with link:</p>
            <div>
              <RequestComponent
                requestData={requestDataMediaMessage}
                curlBase={MediaMessagecURL}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
            Example  Response
            </h2>
            <ResponseComponent
              jsonData={MediaMessageResponseData}
              headers={MediaMessageResponseheaders}
            />
          </div>

       </section>
   </div>


 {/* Mini Map Navigation  */}
 <div
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
        } hidden lg:block  h-fit sticky  top-4 p-2 shrink-0 rounded-2xl  mr-4 w-66`}
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
  )
}

export default SendMessage
