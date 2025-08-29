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

const DeleteTemplateRCS = () => {
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

  const sections = [{ id: "delete-template", title: "Delete Template" }];

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
      className={`flex w-[100%]   ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
      }`}
    >
      {/* Main Content */}
      <div className=" p-4 lg:p-6 overflow-y-auto w-4xl mx-auto ">
        <section id="delete-template" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5 pb-2">
              DELETE TEMPLATE
            </h2>
          </div>

          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <p className="mt-3 text-md flex justify-center items-center">
              This API is used to delete a template (approved or non-approved).
            </p>
            <p className="mt-1 text-md flex justify-center items-center">
              The name is the name of the template passed during submission.
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
              requestType="DELETE"
              param="/{name}"
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
                  <Table.Cell className=" text-orange-400" align="center">
                    name *
                  </Table.Cell>
                  <Table.Cell align="center">Max length 20</Table.Cell>
                  <Table.Cell align="center">
                    Template name <br />
                    <span className="text-orange-400" align="center">
                      Base 64 URL Encoded
                    </span>
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
          <div className="mt-5 flex justify-center items-center mx-auto">
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
                  <Table.Cell align="center">content-type</Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell className="popins text-orange-400" align="center">
                    application/json
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">api_key</Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell className=" text-orange-400" align="center">
                    secret key. E.g. agyduem45c
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">botid</Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell className=" text-orange-400" align="center">
                    registered bot id. E.g. OsOsQ0GwNvUdLT V9Bd
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
                  <Table.Cell className=" text-orange-400" align="center">
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
                  <Table.Cell className=" text-orange-400" align="center">
                    code
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell className="px-4 py-4 text-sm popins">
                    HTTP status code
                  </Table.Cell>
                  <Table.Cell align="center">-</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400" align="center">
                    message
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">
                    Error message / Success message
                  </Table.Cell>
                  <Table.Cell align="center">
                    Eg., Please provide a valid bot id ,Template {"name"}{" "}
                    deleted successfully!
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell className=" text-orange-400" align="center">
                    status
                  </Table.Cell>
                  <Table.Cell align="center">—</Table.Cell>
                  <Table.Cell align="center">HTTP status</Table.Cell>
                  <Table.Cell align="center">
                    E.g, Ok , Bad request , Forbidden, Internal server error
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
            <ResponseSample tabsContentResponseSample={deleteRes} />
          </div>
        </section>
      </div>

      {/* Mini Map Navigation - Hidden on small screens */}
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
            height: `${sections.length * 20}px`,
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
              top: `${sections.findIndex((s) => s.id === active) * 28}px`,
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

export default DeleteTemplateRCS;
