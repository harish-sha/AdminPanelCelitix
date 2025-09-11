import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { motion } from "framer-motion";

import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import restaurtantimg from "../../assets/images/restaurant.avif";
import workinghour from "../../assets/images/workinghour.jpg";
import whatsapp from "../../assets/images/whatsapp.jpg";
import chatbot from "../../assets/images/chatbot.avif";
import customerservice from "../../assets/images/customerservice.avif";
import touristplace from "../../assets/images/tourist.avif";
import university from "../../assets/images/university.avif";
import UniversalButton from "../components/UniversalButton";
import DropdownMenuPortal from "../../utils/DropdownMenuPortal.jsx";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { Carousel } from "primereact/carousel";
import Loader from "../components/Loader";
import { IoSearch } from "react-icons/io5";
import { deleteBot, getAllBot } from "@/apis/whatsapp/whatsapp";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import moment from "moment";

const WhatsappBot = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  // const [dropdownButtonRefs, setDropdownButtonRefs] = useState({});
  const dropdownButtonRefs = useRef({});

  const [dropdownItems, setDropdownItems] = useState([
    "Edit",
    "Duplicate",
    "Share",
  ]);

  const [id, setId] = useState(null);

  const [allBots, setAllBots] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  const handleNavigate = () => navigate("/createwhatsappbot");

  async function handleFetchAllBot() {
    try {
      const res = await getAllBot();

      const sorted = res.sort((a, b) => new Date(b.saveTime) - new Date(a.saveTime));

      setAllBots(sorted);
    } catch (e) {
      toast.error("Failed to fetch all bots");
    }
  }
  useEffect(() => {
    handleFetchAllBot();
  }, []);

  const toggleDropdown = (id) => {
    setDropdownOpenId((prevId) => (prevId === id ? null : id));
  };

  const closeDropdown = () => setDropdownOpenId(null);

  const templates = [
    {
      name: "Restaurant Bot",
      icon: (
        <RestaurantMenuOutlinedIcon
          sx={{
            fontSize: "3rem",
          }}
        />
      ),
      backgroundImage: restaurtantimg,
    },
    {
      name: "Whatsapp Bot",
      icon: <FaWhatsapp />,
      backgroundImage: whatsapp,
    },
    {
      name: "LiveChat After-Hours",
      icon: (
        <AccessAlarmsOutlinedIcon
          sx={{
            fontSize: "3rem",
          }}
        />
      ),
      backgroundImage: workinghour,
    },
    {
      name: "Blank Bot",
      icon: (
        <SmartToyOutlinedIcon
          sx={{
            fontSize: "3rem",
          }}
        />
      ),
      backgroundImage: chatbot,
    },
    {
      name: "Package Tracking Bot",
      icon: <FaMapMarkerAlt />,
      backgroundImage: touristplace,
    },
    {
      name: "Customer Service Bot",
      icon: (
        <SupportAgentOutlinedIcon
          sx={{
            fontSize: "3rem",
          }}
        />
      ),
      backgroundImage: customerservice,
    },
    {
      name: "University Bot",
      icon: (
        <SchoolOutlinedIcon
          sx={{
            fontSize: "3rem",
          }}
        />
      ),
      backgroundImage: university,
    },
    {
      name: "Chat Bot",
      icon: (
        <SmartToyOutlinedIcon
          sx={{
            fontSize: "3rem",
          }}
        />
      ),
      backgroundImage: chatbot,
    },
  ];

  const templateItem = (template) => (
    <div
      className="relative flex items-center justify-center h-60 mx-4 rounded-2xl overflow-hidden shadow-lg bg-cover bg-center group transition-transform duration-300 hover:scale-105"
      style={{ backgroundImage: `url(${template.backgroundImage})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/30  transition-all duration-300 group-hover:from-white/70 group-hover:via-white/50 group-hover:to-white/30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-gray-900 space-y-2">
        <div
          className="text-3xl text-teal-600"
          style={{
            fontSize: "3rem",
          }}
        >
          {template.icon}
        </div>
        <p className="text-lg font-semibold drop-shadow-sm ">{template.name}</p>
      </div>

      {/* Hover Button */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {/* <button
          className="absolute bottom-[-50px] group-hover:bottom-3 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold rounded-full tracking-wider shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => console.log(`Edit ${template.name}`)}
        >
          Edit
        </button> */}
        <button
          className="absolute bottom-[-50px] group-hover:bottom-3 px-5 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-semibold rounded-full tracking-wider shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => console.log(`Edit ${template.name}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );

  async function handledeleteBot(id) {
    try {
      const res = await deleteBot(id);
      // console.log(res);
      if (res?.status) {
        toast.success(res?.msg);
        setIsVisible(false);
        setId("");
        handleFetchAllBot();
      }
    } catch (e) {
      // console.log(e);
    }
  }

  async function handleBtnClick(item, id) {
    if (item === "Edit") {
      navigate("/createwhatsappbot", {
        state: id,
      });
    }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-3 rounded-xl space-y-6 bg-gray-50  w-full overflow-hidden min-h-[90vh]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-3 items-center mb-4">
            {/* Title */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xl font-semibold text-gray-900">
              Manage Bots
              <FaWhatsapp className="text-[#25D366] text-2xl" />
            </div>

            {/* Search */}
            <div className="flex justify-center lg:justify-center">
              <div className="relative flex items-center transition-all duration-500">
                <div
                  className={`relative flex items-center border rounded-lg border-gray-300 transition-all duration-300
          ${searchActive ? "w-60" : "w-0"}
          ${!searchActive ? "animate-rotate-glow" : ""}`}
                >
                  <input
                    type="text"
                    className={`rounded-lg pr-3 pl-2 py-2 text-sm transition-all duration-300
            ${
              searchActive
                ? "border border-gray-400 outline-none w-full opacity-100"
                : "w-0 opacity-0"
            }
            focus:outline-none`}
                    placeholder="Search Bots&Templates..."
                    onBlur={() => setSearchActive(false)}
                  />
                  <IoSearch
                    className="absolute text-gray-600 cursor-pointer right-2"
                    size={22}
                    color="green"
                    onClick={() => setSearchActive(true)}
                  />
                </div>

                {!searchActive && (
                  <span className="ml-2 text-sm text-gray-500 transition-opacity duration-300 animate-fade-in">
                    Search Bots
                  </span>
                )}
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center lg:justify-end md:justify-end">
              <UniversalButton
                id="addwhatsappbot"
                name="addwhatsappbot"
                label="+ New Bot"
                onClick={handleNavigate}
              />
            </div>
          </div>

          {/* <div className="items-center grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 h-30">
            <div className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              Manage Bots
              <FaWhatsapp className="text-[#25D366] text-2xl" />
            </div>
            {/* search bots 
            <div className={`relative flex items-center transition-all duration-300 ${searchActive ? "w-85" : "w-12"} border rounded-lg border-gray-300 mr-50 `}>
              <input
                type="text"
                className={`border border-gray-300 rounded-lg px-4 py-2 text-sm transition-all duration-300 ${searchActive ? "w-full opacity-100" : "w-0 opacity-0"} focus:outline-none`}
                placeholder="Search templates (status, name etc.)"
                onBlur={() => setSearchActive(false)}
              />
              <IoSearch
                className="absolute text-gray-600 cursor-pointer right-3"
                size={22}
                color='green'
                onClick={() => setSearchActive(true)}
              />
            </div>
            <div className="relative flex items-center h-0 transition-all duration-500 ">
              <div
                className={`relative flex items-center transition-all duration-300 border rounded-lg border-gray-300 
                        ${searchActive ? "w-80 " : "w-0"} 
                        ${!searchActive ? "animate-rotate-glow" : ""}`}
              >
                <input
                  type="text"
                  className={`rounded-lg pr-3 pl-2 py-2 text-sm transition-all duration-300 
                            ${
                              searchActive
                                ? "border border-gray-400 outline-none w-full opacity-100"
                                : "w-0 opacity-0"
                            } focus:outline-none`}
                  placeholder="Search Bots, Bot Templates..."
                  onBlur={() => setSearchActive(false)}
                />
                <IoSearch
                  className="absolute text-gray-600 cursor-pointer right-2"
                  size={22}
                  color="green"
                  onClick={() => setSearchActive(true)}
                />
              </div>

              {!searchActive && (
                <span className="ml-2  text-sm text-gray-500 transition-opacity duration-300 animate-fade-in">
                  Search Bots
                </span>
              )}
            </div>
            <div className="flex items-center justify-end">
            <UniversalButton
              id="addwhatsappbot"
              name="addwhatsappbot"
              label="+ New Bot"
              onClick={handleNavigate}
            />
            </div>
          </div> */}

          <div className="bg-white p-3 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Templates
            </h2>
            <Carousel
              value={templates}
              numVisible={3}
              numScroll={1}
              itemTemplate={templateItem}
              circular
              showIndicators={true}
              showNavigators={true}
              className="custom-carousel"
              responsiveOptions={[
                {
                  breakpoint: "1024px",
                  numVisible: 2,
                  numScroll: 1,
                },
                {
                  breakpoint: "768px",
                  numVisible: 1,
                  numScroll: 1,
                },
              ]}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              Created Bots <SmartToyOutlinedIcon />
            </h2>
            <div className="overflow-auto h-80">
              {allBots.map((bot) => {
                const ref = dropdownButtonRefs[bot.botSrno];

                return (
                  <div
                    key={bot.botSrno}
                    className="border rounded-xl overflow-hidden hover:shadow-lg transition-all mb-4"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-blue-50 px-6 py-4 gap-3">
                      <div className="flex items-center gap-4 flex-1">
                        <RadioButtonCheckedOutlinedIcon
                          className="text-green-500"
                          fontSize="small"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {bot.botName}
                          </p>
                          {/* <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                            {bot.isPublish ? "Published" : "Unpublished"}
                          </span> */}
                        </div>
                      </div>
                      {/* <div className="text-sm text-gray-700 flex-1">
                        Versions: <strong>{bot.versions}</strong>
                      </div> */}
                      {/* <div className="text-sm text-red-500 font-medium flex-1">
                        {bot.integrations}
                      </div> */}
                      <div className="text-sm text-gray-500 flex-1 flex lg:flex-col md:flex-row items-center md:justify-start gap-1">
                        Created On:{" "}
                        <strong>
                          {moment(bot.saveTime).format("DD-MM-YYYY")}
                        </strong>
                      </div>
                      <div className="flex items-center gap-2 relative bot-settings">
                        <CustomTooltip title="Settings" arrow>
                          <IconButton
                            ref={(el) => {
                              if (el)
                                dropdownButtonRefs.current[bot.botSrno] = el;
                            }}
                            onClick={() => toggleDropdown(bot.botSrno)}
                          >
                            <SettingsOutlinedIcon
                              className="text-gray-600"
                              fontSize="small"
                            />
                          </IconButton>
                        </CustomTooltip>
                        {dropdownOpenId === bot.botSrno && (
                          <DropdownMenuPortal
                            targetRef={{
                              current: dropdownButtonRefs.current[bot.botSrno],
                            }}
                          >
                            {dropdownItems.map((item, index) => {
                              const iconMap = {
                                Edit: <EditNoteIcon fontSize="small" />,
                                Duplicate: <FaEnvelope size={14} />,
                                Share: <FaGlobe size={14} />,
                              };

                              return (
                                <button
                                  key={index}
                                  onClick={() => {
                                    handleBtnClick(item, bot);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 flex items-center gap-2"
                                >
                                  {iconMap[item]}
                                  {item}
                                </button>
                              );
                            })}
                          </DropdownMenuPortal>
                        )}

                        <CustomTooltip title="Delete Bot" arrow>
                          <IconButton
                            onClick={() => {
                              setId(bot?.botSrno);
                              setIsVisible(true);
                            }}
                          >
                            <MdOutlineDeleteForever
                              className="text-red-500"
                              size={20}
                            />
                          </IconButton>
                        </CustomTooltip>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Dialog
        header="Confirm Delete"
        visible={isVisible}
        onHide={() => setIsVisible(false)}
        className="lg:w-[30rem] md:w-[40rem] w-[17rem]"
        draggable={false}
      >
        <div className="flex items-center justify-center">
          <CancelOutlinedIcon
            sx={{ fontSize: 64, color: "ff3f3f" }}
            size={20}
          />
        </div>
        <div>
          <div className="p-4 text-center">
            <p className="text-[1.1rem] font-semibold text-gray-600">
              Are you sure ?
            </p>
            <p>
              Do you really want to delete this bot? This process cannot be
              undo.
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <UniversalButton
                label="Cancel"
                style={{
                  backgroundColor: "#090909",
                }}
                onClick={() => setIsVisible(false)}
              />
              <UniversalButton
                label="Delete"
                style={
                  {
                    // backgroundColor: "red",
                  }
                }
                onClick={() => handledeleteBot(id)}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default WhatsappBot;
