// import React from "react";
// import CustomTooltip from "@/whatsapp/components/CustomTooltip";
// import { IconButton } from "@mui/material";
// import EditNoteIcon from "@mui/icons-material/EditNote";
// import { MdOutlineDeleteForever } from "react-icons/md";
// import { DataTable } from "@/components/layout/DataTable";
// import UniversalButton from "../components/UniversalButton";
// import { useNavigate } from "react-router-dom";

// const WhatsappBot = () => {
//   const navigate = useNavigate();
//   const col = [
//     { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
//     { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
//     { field: "createdOn", headerName: "CreatedOn", flex: 1, minWidth: 120 },
//     {
//       field: "action",
//       headerName: "Action",
//       flex: 1,
//       minWidth: 120,
//       renderCell: (params) => {
//         return (
//           <>
//             <CustomTooltip title="Edit Account" placement="top" arrow>
//               <IconButton onClick={() => console.log(params.row)}>
//                 <EditNoteIcon
//                   sx={{
//                     fontSize: "1.2rem",
//                     color: "gray",
//                   }}
//                 />
//               </IconButton>
//             </CustomTooltip>
//             <CustomTooltip title="Delete Account" placement="top" arrow>
//               <IconButton
//                 className="no-xs"
//                 onClick={() => console.log(params.row)}
//               >
//                 <MdOutlineDeleteForever
//                   className="text-red-500 cursor-pointer hover:text-red-600"
//                   size={20}
//                 />
//               </IconButton>
//             </CustomTooltip>
//           </>
//         );
//       },
//     },
//   ];

//   const rows = Array.from({ length: 10 }, (_, index) => ({
//     sn: index + 1,
//     id: index + 1,
//     name: "Country Name",
//     createdOn: "Created On",
//   }));

//   function handleNavigate() {
//     navigate("/createwhatsappbot");
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between w-full gap-2 pb-3">
//         <h1 className="text-xl font-semibold text-gray-700">Manage Bots</h1>
//         <UniversalButton
//           id="addwhatsappbot"
//           name="addwhatsappbot"
//           label="Add Bot"
//           onClick={handleNavigate}
//         />
//       </div>
//       <DataTable col={col} rows={rows} id="whatsappBot" name="whatsappBot" />
//     </div>
//   );
// };

// export default WhatsappBot;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import restaurtantimg from "../../assets/images/restaurant.avif";
import workinghour from "../../assets/images/workinghour.jpg";
import whatsapp from "../../assets/images/whatsapp.jpg";
import chatbot from "../../assets/images/chatbot.avif";
import customerservice from "../../assets/images/customerservice.avif";
import touristplace from "../../assets/images/tourist.avif";
import university from "../../assets/images/university.avif";
import UniversalButton from "../components/UniversalButton";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { Carousel } from "primereact/carousel";
import Loader from "../components/Loader";
import { IoSearch } from "react-icons/io5";

const WhatsappBot = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchActive, setSearchActive] = useState(false);



  const handleNavigate = () => navigate("/createwhatsappbot");

  // Fetch WABA List
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500)
  }, []);

  const templates = [
    {
      name: "Restaurant Bot",
      icon: <RestaurantMenuOutlinedIcon
        sx={{
          fontSize: "3rem",
        }}
      />,
      backgroundImage: restaurtantimg,
    },
    {
      name: "Whatsapp Bot",
      icon: <FaWhatsapp />,
      backgroundImage: whatsapp,
    },
    {
      name: "LiveChat After-Hours",
      icon: <AccessAlarmsOutlinedIcon
        sx={{
          fontSize: "3rem",
        }}

      />,
      backgroundImage: workinghour,
    },
    {
      name: "Blank Bot",
      icon: <SmartToyOutlinedIcon sx={{
        fontSize: "3rem",
      }} />,
      backgroundImage: chatbot,
    },
    {
      name: "Package Tracking Bot",
      icon: <FaMapMarkerAlt />,
      backgroundImage: touristplace,
    },
    {
      name: "Customer Service Bot",
      icon: <SupportAgentOutlinedIcon sx={{
        fontSize: "3rem",
      }} />,
      backgroundImage: customerservice,
    },
    {
      name: "University Bot",
      icon: <SchoolOutlinedIcon sx={{
        fontSize: "3rem",
      }} />,
      backgroundImage: university,
    },
    {
      name: "Chat Bot",
      icon: <SmartToyOutlinedIcon sx={{
        fontSize: "3rem",
      }} />,
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
        <div className="text-3xl text-teal-600"
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

  const createdBots = [
    {
      id: 1,
      name: "ChatBot",
      status: "Draft",
      versions: "latest",
      integrations: "No Integrations added",
      lastUpdated: "25 Mar 2025, 02:49pm",
    },
    {
      id: 2,
      name: "Whatsapp",
      status: "Draft",
      versions: "latest",
      integrations: "No Integrations added",
      lastUpdated: "25 Mar 2025, 02:49pm",
    },
    {
      id: 3,
      name: "Restaurant Bot",
      status: "Draft",
      versions: "latest",
      integrations: "No Integrations added",
      lastUpdated: "25 Mar 2025, 02:49pm",
    },
    {
      id: 4,
      name: "Blank Bot",
      status: "Draft",
      versions: "latest",
      integrations: "No Integrations added",
      lastUpdated: "25 Mar 2025, 02:49pm",
    },
    {
      id: 5,
      name: "LiveChat After-Hours",
      status: "Draft",
      versions: "latest",
      integrations: "No Integrations added",
      lastUpdated: "25 Mar 2025, 02:49pm",
    },
    {
      id: 6,
      name: "Package Tracking Bot",
      status: "Draft",
      versions: "latest",
      integrations: "No Integrations added",
      lastUpdated: "25 Mar 2025, 02:49pm",
    },
    {
      id: 7,
      name: "Customer Service Bot",
      status: "Draft",
      versions: "latest",
      integrations: "No Integrations added",
      lastUpdated: "25 Mar 2025, 02:49pm",
    },
    {
      id: 8,
      name: "LiveChat After-Hours",
      status: "Draft",
      versions: "latest",
      integrations: "No Integrations added",
      lastUpdated: "25 Mar 2025, 02:49pm",
    },
    {
      id: 9,
      name: "University Bot",
      status: "Draft",
      versions: "latest",
      integrations: "No Integrations added",
      lastUpdated: "25 Mar 2025, 02:49pm",
    },
    {
      id: 10,
      name: "Chat Bot",
      status: "Draft",
      versions: "latest",
      integrations: "No Integrations added",
      lastUpdated: "25 Mar 2025, 02:49pm",
    },
  ]

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-3 rounded-xl space-y-6 bg-gray-50  w-full overflow-hidden min-h-[90vh]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-medium text-gray-900" >
              Manage Bots<FaWhatsapp className="text-[#25D366] text-2xl" />
            </div>
            {/* search bots */}
            {/* <div className={`relative flex items-center transition-all duration-300 ${searchActive ? "w-85" : "w-12"} border rounded-lg border-gray-300 mr-50 `}>
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
            </div> */}
            <div className="relative flex items-center h-0 transition-all duration-500 w-120 ml-25">
              <div
                className={`relative flex items-center transition-all duration-300 border rounded-lg border-gray-300 
                        ${searchActive ? "w-80 " : "w-0"} 
                        ${!searchActive ? "animate-rotate-glow" : ""}`}
              >
                <input
                  type="text"
                  className={`rounded-lg pr-3 pl-2 py-2 text-sm transition-all duration-300 
                            ${searchActive
                      ? "border border-gray-400 outline-none w-full opacity-100"
                      : "w-0 opacity-0"
                    } focus:outline-none`}
                  placeholder="Search Bots, Bot Templates..."
                  onBlur={() => setSearchActive(false)}
                />
                <IoSearch
                  className="absolute text-gray-600 cursor-pointer right-4"
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
            <UniversalButton
              id="addwhatsappbot"
              name="addwhatsappbot"
              label="+ New Bot"
              onClick={handleNavigate}
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Templates</h2>
            <Carousel
              value={templates}
              numVisible={3}
              numScroll={1}
              itemTemplate={templateItem}
              circular
              showIndicators={true}
              showNavigators={true}
              className="custom-carousel"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">Created Bots <SmartToyOutlinedIcon /></h2>
            <div className="overflow-auto h-80" >

              {createdBots.map((bot) => (
                <div
                  key={bot.id}
                  className="border rounded-xl overflow-hidden hover:shadow-lg transition-all mb-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-blue-50 px-6 py-4 gap-3">
                    <div className="flex items-center gap-4 flex-1">
                      <RadioButtonCheckedOutlinedIcon className="text-green-500" fontSize="small" />
                      <div>
                        <p className="font-semibold text-gray-800">{bot.name}</p>
                        <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                          {bot.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 flex-1">
                      Versions: <strong>{bot.versions}</strong>
                    </div>
                    <div className="text-sm text-red-500 font-medium flex-1">
                      {bot.integrations}
                    </div>
                    <div className="text-sm text-gray-500 flex-1 flex flex-col items-center gap-1">
                      Last Updated: <strong>{bot.lastUpdated}</strong>
                    </div>
                    <div className="flex items-center gap-2 ">
                      <CustomTooltip title="Settings" arrow >
                        <IconButton onClick={() => console.log(`Edit bot ${bot.id}`)}>
                          <SettingsOutlinedIcon className="text-gray-600" fontSize="small" />
                        </IconButton>
                      </CustomTooltip>
                      <CustomTooltip title="Delete Bot" arrow >
                        <IconButton
                          onClick={() => console.log(`Delete bot ${bot.id}`)}
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
              ))}
            </div>

          </div>
        </div>
      )}
    </>



  );
};

export default WhatsappBot;
