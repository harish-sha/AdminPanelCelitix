import React, { useState, useEffect } from "react";

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import toast, { Toaster } from "react-hot-toast";

import { useTheme } from "../context/ThemeContext";

import Table from "../components/Table";
import { themeColors } from "../themeColors";


const Introduction = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const { isDarkMode } = useTheme();
    const colors = themeColors(isDarkMode);
  

  const [isCopied, setIsCopied] = useState(false);

  const authenticationTableColoumn = ["Types", "Params", "Values"];

  const httpTableColoumn = ["Code", "Description"];

  const baseUrl = "https://api.celitix.com";

  const cardData = [
    {
      title: "Text Message",
      body: "The Text Message template supports simple text messages with suggested replies or actions. Text messages can contain up to 11 suggestions.",
    },
    {
      title: "Rich Card Stand-alone",
      body: "The Rich Card Stand-alone template allows for the inclusion of a rich card: image, gif or video along with suggested replies and actions. A maximum of 4 suggestions can be included with the rich card in this template.",
    },
    {
      title: "Rich Card Carousel",
      body: "The Rich Card Carousel template supports carousels with a minimum of two rich cards, with each featuring suggested replies and actions. For a scenario where you want to share various options, products, or services with your audience, the Rich Card Carousel template allows you to present up to 10 cards in the carousel with each card having upto 4 suggestions.",
    },
  ];

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "base-url", title: "Base URL" },
    { id: "authentication", title: "Authentication" },
    { id: "http-response-codes", title: "HTTP Response Codes" },
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

  const handleCopy = () => {
    navigator.clipboard
      .writeText(baseUrl)
      .then(() => {
        // Show check icon
        setIsCopied(true);

        // Show toast notification
        toast.success("URL copied to clipboard!", {
          duration: 2000,
          position: "top-center",
          style: {
            backgroundColor: "#fff",
            color: "#000",
          },
          iconTheme: {
            primary: "#10B981", // green
            secondary: "#fff",
          },
        });

        // Reset icon after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        toast.error("Failed to copy text", {
          duration: 2000,
          position: "top-center",
          style: {
            backgroundColor: "#fff",
            color: "#000",
          },
        });
        console.error("Could not copy text: ", err);
      });
  };



  return (
    <div
      className={`flex w-[100%]   ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-black"
      }`}
    >
      {/* Main Content */}
      <div className=" p-4 lg:p-8 overflow-y-auto w-full  ">
        <section id="introduction" className="mb-16  ">
          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex ">
            <h1 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              INTRODUCTION
            </h1>
          </div>
          <div className="flex flex-col justify-center md:text-start mt-2 sm:text-center w-xs md:w-2xl lg:w-2xl  mx-auto">
            <p className="text-sm  popins ">
              The RCS Template is a predefined set of RBM (RCS Business
              Messaging) UI elements for e.g., a Rich Card with suggestions
              which can be used as a base for formulating messages in your
              campaign to the target audience.
            </p>

            <p className="text-sm  popins ">
              Once a bot is created, the aggregator can create multiple
              templates against the bot and use them for running campaigns. You
              can add images, videos and suggested actions for your template
            </p>
          </div>
          <div className="mt-5   md:w-3xl mx-auto  flex flex-wrap justify-center  items-center">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              RBM supports 3 different types of templates
            </h2>

            <div className="flex flex-wrap justify-center items-center  w-xs md:w-2xl lg:w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
                {cardData.map((card, index) => (
                  <div
                    key={index}
                    className={`${
                      isDarkMode
                        ? "bg-gray-600 text-white"
                        : "bg-[pink] text-black"
                    } w-full h-full shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105`}
                  >
                    <h2 className="text-lg font-semibold mb-3 flex justify-center">
                      {card.title}
                    </h2>
                    <p className=" text-sm ">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="base-url" className="mb-16">
          <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center mb-3">
            Base URL
          </h2>
          <div className="lg:w-3xl md:w-2xl w-[320px] mx-auto ">
            <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-end mb-2 ">
                <div className="font-mono text-sm break-all">
                  <span className="text-[#50b930] text-xl">{baseUrl}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded hover:bg-gray-700 transition-colors"
                    aria-label="Copy to clipboard"
                  >
                    {isCopied ? (
                      <CheckOutlinedIcon />
                    ) : (
                      <ContentCopyOutlinedIcon />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="authentication" className="mb-16">
          <div className=" ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              Authentication
            </h2>
            <p className="text-sm text-center">
              All API calls require the following headers for authentication
            </p>
          </div>
          <div className="mt-5 flex justify-center items-center ">
           
              <Table columns={authenticationTableColoumn}>
              <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >                  <td className="px-4 py-4  font-normal">Header</td>
                  <td className="px-4 py-4 font-normal">content-type</td>
                  <td className="px-4 py-4 text-orange-400 font-normal">
                    application/json
                  </td>
                </tr>
                <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >                  <td className="px-4 py-4 font-normal">Header</td>
                  <td className="px-4 py-4 font-normal"> api_key</td>
                  <td className="px-4 py-4 text-orange-400 font-normal">
                    string
                  </td>
                </tr>

                <tr className="">
                  <td className="px-4 py-4 font-normal ">Header</td>
                  <td className="px-4 py-4 font-normal">botid</td>
                  <td className="px-4 py-4 font-normal text-orange-400">
                    string
                  </td>
                </tr>
              </Table>
            
          </div>
        </section>

        <section id="http-response-codes" >
        <div className="flex flex-col justify-center items-center gap-2 popins sm:flex ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              Common HTTP Response Codes
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center ">
            
              <Table columns={httpTableColoumn}>
              <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >                  <td className="px-4 py-4  font-normal">400</td>
                  <td className="px-4 py-4 font-normal text-red-500">
                    Bad Request
                  </td>
                </tr>
                <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >                  <td className="px-4 py-4 font-normal">403</td>
                  <td className="px-4 py-4 font-normal"> Forbidden</td>
                </tr>

                <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >                  <td className="px-4 py-4 font-normal ">500</td>
                  <td className="px-4 py-4 font-normal">
                    Internal server error
                  </td>
                </tr>

                <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >                  <td className="px-4 py-4 font-normal ">200 or 202</td>
                  <td className="px-4 py-4 font-normal text-green-600">OK</td>
                </tr>

                <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >                  <td className="px-4 py-4 font-normal ">405</td>
                  <td className="px-4 py-4 font-normal">Method not allowed</td>
                </tr>

                <tr
                    className={` ${
                      colors.tableBorder
                    } border-b`}
                  >                  <td className="px-4 py-4 font-normal ">401</td>
                  <td className="px-4 py-4 font-normal">Unauthorized</td>
                </tr>

                <tr className="">
                  <td className="px-4 py-4 font-normal ">429</td>
                  <td className="px-4 py-4 font-normal">Too many requests</td>
                </tr>
              </Table>
            
          </div>
        </section>
      </div>

      {/* Mini Map Navigation */}
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
                      : `${isDarkMode ? "text-gray-200" : "text-gray-600"}`
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

export default Introduction;
