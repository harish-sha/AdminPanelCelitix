import { Link } from "react-router-dom";
import { useTheme } from "@/ApiDocs/context/ThemeContext";
import { themeColors } from "@/ApiDocs/themeColors";
import CircleIcon from "@mui/icons-material/Circle";

import React, { useState, useEffect } from "react";
import BaseurlComponent from "@/ApiDocs/components/BaseurlComponent";
import Table from "@/ApiDocs/components/Tablenew";
import RequestComponent from "@/ApiDocs/components/RequestComponent";
import ResponseComponent from "@/ApiDocs/components/ResponseComponent";

const SubmitTemplateOutbound = () => {
  // const [activeSection, setActiveSection] = useState("obd-template");

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "obd-template", title: "Obd Template" },
    { id: "voice clip", title: "Upload Voice Clip" },
    { id: "text-to-speech", title: "Text-to-speech" },
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
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
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

  const RequestParameterTextTemplateColumn = ["Placeholder", "Description"];

  const requestDataVoiceTemplate = [
    {
      requestPrefix: `{
  "filename": "testvoice.mp3",
  "voiceType": "1",
  "fileData": "data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYxLjEuMTAwAAAAAAAAAAAAAAD"
}`,
    },
  ];

  const requestDataTextTemplate = [
    {
      requestPrefix: `{
  "voiceType": "1",
  "mobileNo": "919876543210",
  "voiceText": "Hi, Welcome to ABC company. This is a test text to speech call."
}`,
    },
  ];

  const obdVoiceTemplatecURL = `
  curl --location 'Base_URL/rest/voice/upload' \
  --header 'Content-Type: application/json' \
  --header 'key: Celitix API Key' \
`;

  const obdTextTemplatecURL = `
  curl --location 'Base_URL/rest/voice/submitVoicecall' \
  --header 'Content-Type: application/json' \
  --header 'key: Celitix API Key' \
`;

  const TextTemplatejsonData = {
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

  return (
    <div
      className={`flex w-[100%]   ${isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
        }`}
    >
      <div className=" p-4 lg:p-6 overflow-y-auto w-4xl mx-auto ">
        <section id="obd-template" className="mb-10">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              OBD TEMPLATE
            </h2>
          </div>
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Endpoint
            </h2>
            <BaseurlComponent
              urlPrefix="Base_URL"
              requestType="POST"
              param="/rest/voice/upload"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center mt-7 ">
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
                    <div className="text-center">Value</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell
                    align="center"
                    className=" text-orange-500"
                  >
                    Content-type
                  </Table.Cell>
                  <Table.Cell align="center">application/json</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className=" text-orange-500"
                  >
                    key
                  </Table.Cell>
                  <Table.Cell align="center">Celitix API Key</Table.Cell>
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
                  <Table.HeaderCell align="center" className="min-w-40 ">
                    <div className="text-center">Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    403
                  </Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    500
                  </Table.Cell>
                  <Table.Cell align="center">Internal server error</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    200 or 202
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-green-600">
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    405
                  </Table.Cell>
                  <Table.Cell align="center">Method not allowed</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    401
                  </Table.Cell>
                  <Table.Cell align="center">Unauthorized</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    429
                  </Table.Cell>
                  <Table.Cell align="center">Too many requests</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>
        <section id="voice clip" className="mb-10">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              UPLOAD VOICE CLIP
            </h2>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center mb-4 mt-5">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Placeholder</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell
                    align="center"
                    className=" text-orange-500 text-sm popins"
                  >
                    filename
                  </Table.Cell>
                  <Table.Cell align="center" >
                    Audio file name with extension (.mp3 / .wav)
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className=" text-orange-500 text-sm popins"
                  >
                    voiceType
                  </Table.Cell>
                  <Table.Cell align="center" >
                    “1” for Transactional & “2” for Promotional
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className=" text-orange-500 "
                  >
                    fileData
                  </Table.Cell>
                  <Table.Cell align="center" >
                    Audio file type in <code>data:audio/mpeg;base64</code>{" "}
                    format
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                requestData={requestDataVoiceTemplate}
                curlBase={obdVoiceTemplatecURL}
              />
            </div>
          </div>

          <div className=" flex flex-col items-center justify-center mt-8">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins">
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

        <section id="text-to-speech" className="mb-10">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              SEND TEXT-TO-SPEECH
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              Endpoint
            </h2>
            <BaseurlComponent
              urlPrefix="Base_URL"
              requestType="POST"
              param="/rest/voice/submitVoicecall"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-5">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Placeholder</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell
                    align="center"
                    className=" text-orange-500 "
                  >
                    voiceType
                  </Table.Cell>
                  <Table.Cell align="center" >
                    “1” for Transactional & “2” for Promotional
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className=" text-orange-500 "
                  >
                    mobileNo
                  </Table.Cell>
                  <Table.Cell align="center" >
                    Recipient’s phone number with country code
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell
                    align="center"
                    className=" text-orange-500 "
                  >
                    fileData
                  </Table.Cell>
                  <Table.Cell align="center" >
                    Audio file type in <code>data:audio/mpeg;base64</code>{" "}
                    format
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-7">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full">
              <RequestComponent
                requestData={requestDataTextTemplate}
                curlBase={obdTextTemplatecURL}
              />
            </div>
          </div>

          <div className="mt-7 flex flex-col items-center justify-center">
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
        <div
          className={`${isDarkMode ? "bg-gray-600" : "bg-gray-200"} 
      w-1 rounded absolute left-3 top-5.5  `}
          style={{
            height: `${sections.length * 27}px`,
          }}
        >
          <div
            className={`
        ${isDarkMode ? "bg-white" : "bg-black"} 
        w-1 rounded absolute transition-all duration-300
        ${active ? "bg-black" : ""}
      `}
            style={{
              height: "20px",
              top: `${sections.findIndex((s) => s.id === active) * 32}px`,
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

export default SubmitTemplateOutbound;
