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

import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import UniversalButton from "../components/UniversalButton";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { Carousel } from "primereact/carousel";

const WhatsappBot = () => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/createwhatsappbot");

  const templates = [
    { name: "Restaurant Bot" },
    { name: "Blank Bot" },
    { name: "LiveChat After-Hours" },
    { name: "Package Tracking Bot" },
  ];

  const templateItem = (template) => (
    <div className="flex items-center w-120 justify-center h-40 border rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer bg-white px-4">
      <span className="text-sm font-semibold text-gray-700">{template.name}</span>
    </div>
  );

  return (
    <div className="p-4 rounded-xl space-y-6 bg-gray-50 min-h-[90vh] border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl font-medium text-gray-900" >

          Manage Bots  <FaWhatsapp className="text-[#25D366] text-2xl" />
        </div>
        <UniversalButton
          id="addwhatsappbot"
          name="addwhatsappbot"
          label="+ New Bot"
          onClick={handleNavigate}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Templates</h2>
        <Carousel
          value={templates}
          numVisible={3}
          numScroll={1}
          itemTemplate={templateItem}
          circular
          showIndicators
          showNavigators
          className="custom-carousel"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Assigned Bots</h2>
        <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-blue-50 px-6 py-4 gap-3">
            <div className="flex items-center gap-4">
              <EditNoteIcon className="text-blue-600" fontSize="small" />
              <div>
                <p className="font-semibold text-gray-800">ChatBot</p>
                <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">Draft</span>
              </div>
            </div>
            <div className="text-sm text-gray-700">Versions: <strong>latest</strong></div>
            <div className="text-sm text-red-500 font-medium">No Integrations added</div>
            <div className="text-sm text-gray-500">Last Updated: <strong>25 Mar 2025, 02:49pm</strong></div>
            <div className="flex items-center gap-2">
              <CustomTooltip title="Edit Bot">
                <IconButton onClick={() => console.log("edit bot")}>
                  <EditNoteIcon className="text-gray-600" fontSize="small" />
                </IconButton>
              </CustomTooltip>
              <CustomTooltip title="Delete Bot">
                <IconButton onClick={() => console.log("delete bot")}>
                  <MdOutlineDeleteForever className="text-red-500" size={20} />
                </IconButton>
              </CustomTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsappBot;
