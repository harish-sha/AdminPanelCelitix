// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UniversalButton from "@/components/common/UniversalButton";
// import InputField from "@/components/layout/InputField";

// const WhatsappFlows = () => {
//   const [flowName, setFlowName] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/wflowcreation", { state: { flowName } });
//   };

//   return (
//     <div
//       className="flex flex-col items-center justify-center min-h-[80vh] w-full"
//     >
//       <h1 className="text-4xl font-semibold text-gray-700">
//         Create Chat Flow
//       </h1>
//       <form
//         className="mt-4 flex flex-col space-y-4 items-center justify-center w-100 mb-8 text-center text-gray-600"
//         onSubmit={handleSubmit}
//       >
//         <InputField
//           label="Flow Name"
//           value={flowName}
//           onChange={(e) => setFlowName(e.target.value)}
//           required
//           placeholder="Enter Flow Name"
//         />
//         <UniversalButton
//           label="Create Flow"
//           type="submit"
//           variant="contained"
//         >
//           Create Flow
//         </UniversalButton>
//       </form>
//     </div>
//   );
// };

// export default WhatsappFlows;


import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Dialog } from 'primereact/dialog';
import AnimatedDropdown from '@/whatsapp/components/AnimatedDropdown';
import InputWithLabel from '@/whatsapp/components/InputWithLabel';
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/components/layout/InputField";

const allFlows = [
  { name: 'flow6', status: 'Published', createdAt: '30 Apr 2025, 11:15am' },
  { name: 'signup', status: 'Draft', createdAt: '22 Apr 2025, 05:48pm' },
  { name: 'newtest', status: 'Draft', createdAt: '22 Apr 2025, 05:46pm' },
  { name: 'flow5', status: 'Draft', createdAt: '01 May 2025, 10:00am' },
  { name: 'chatflownew', status: 'Draft', createdAt: '05 May 2025, 03:25pm' },
  { name: 'chatflow', status: 'Published', createdAt: '05 May 2025, 01:37pm' },
  { name: 'flow7', status: 'Draft', createdAt: '01 May 2025, 09:00am' },
  { name: 'flow8', status: 'Published', createdAt: '30 Apr 2025, 03:00pm' }
];

const WhatsappFlows = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const rowsPerPage = 4;

  const filteredFlows = allFlows.filter(flow =>
    flow.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFlows.length / rowsPerPage);
  const paginatedFlows = filteredFlows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleMenuOpen = (event, flow) => {
    setSelectedFlow(flow);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFlow(null);
  };

  const handleEdit = () => {
    console.log('Edit:', selectedFlow.name);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log('Delete:', selectedFlow.name);
    handleMenuClose();
  };

  const handleExport = () => {
    console.log('Export:', selectedFlow.name);
    handleMenuClose();
  };
  const [flowName, setFlowName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/wflowcreation", { state: { flowName } });
  };

  return (
    <div className=" bg-white border border-gray-300 rounded-xl shadow-sm">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-2 sm:mb-0">WhatsApp Flows</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by Flow Name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
            />
            <UniversalButton
              label="+ Create New Flow"
              onClick={() => setShowDialog(true)}
              id="createflow"
              name="createflow"
            />
          </div>
        </div>

        {/* Flows */}
        <div className="space-y-4">
          {paginatedFlows.map((flow, index) => (
            <div
              key={index}
              className="bg-blue-100 border border-blue-200 rounded-lg px-4 py-5 flex items-center justify-between flex-wrap sm:flex-nowrap"
            >
              <div className="flex items-center gap-3 min-w-[180px]">
                <div className="bg-white p-2 rounded-full shadow">
                  <div className="w-8 h-8 bg-gray-400 rounded"></div>
                </div>
                <div>
                  <div className="font-semibold text-sm">{flow.name}</div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${flow.status === 'Draft'
                      ? 'bg-orange-500 text-white'
                      : 'bg-blue-500 text-white'
                      }`}
                  >
                    {flow.status}
                  </span>
                </div>
              </div>

              <div className="text-sm text-center min-w-[80px]">
                <div className="font-semibold text-sm">Flow Type</div>
                <span className="text-xs font-bold px-2 py-1 bg-blue-300 text-blue-900 rounded">STATIC</span>
              </div>

              <div className="text-sm text-center min-w-[150px]">
                <div className="font-semibold">WhatsApp Integration</div>
                <div className="text-gray-600">Demo</div>
              </div>

              <div className="text-sm text-center min-w-[150px]">
                <div className="font-semibold">Created At</div>
                <div className="text-gray-700">{flow.createdAt}</div>
              </div>

              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm flex items-center gap-1">
                  ▶ {flow.status === 'Published' ? 'Draft' : 'Publish'}
                </button>
                <IconButton onClick={(e) => handleMenuOpen(e, flow)} size="small">
                  <MoreVertIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`text-sm px-3 py-1 border rounded hover:bg-gray-100 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
                }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleExport}>
            <ListItemIcon><FileDownloadIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Export Screen</ListItemText>
          </MenuItem>
        </Menu>

        <Dialog
          visible={showDialog}
          onHide={() => setShowDialog(false)}
          style={{ width: '40rem' }}
          draggable={false}
          header={"Create New Flow"}
        >
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <InputField
                label="Flow Name"
                id="flowname"
                name="flowname"
                type="text"
                placeholder="Enter Flow Name"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
              />
              <AnimatedDropdown
                label="Select Categories"
                id="flowcategories"
                name="flowcategories"
                options={[
                  { value: 'signup', label: 'SIGN_UP' },
                  { value: 'signin', label: 'SIGN_IN' },
                  { value: 'appointmentBooking', label: 'APPOINTMENT_BOOKING' },
                  { value: 'leadGeneration', label: 'LEAD_GENERATION' },
                  { value: 'contactUs', label: 'CONTACT_US' },
                  { value: 'customerSupport', label: 'CUSTOMER_SUPPORT' },
                  { value: 'survey', label: 'SURVEY' },
                  { value: 'other', label: 'OTHER' },
                ]}
                placeholder='Select Flow Categories'
                onChange={(value) => console.log(value)}
              />
              <AnimatedDropdown
                label="Whatsapp integration"
                id="whatsappintegration"
                name="whatsappintegration"
                options={[
                  { value: 'static', label: 'Static' },
                  { value: 'dynamic', label: 'Dynamic' },
                ]}
                placeholder='Select Whatsapp Integration'
                onChange={(value) => console.log(value)}
              />
              <div className="max-w-content flex items-center justify-center" >
                <UniversalButton
                  label="Create Flow"
                  type="submit"
                  id="createflow"
                  name="createflow"
                />
              </div>

            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default WhatsappFlows;



