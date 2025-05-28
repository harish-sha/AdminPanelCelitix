// import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import usePagination from '@mui/material/usePagination';
// import { styled } from '@mui/material/styles';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import { DataGrid, GridFooterContainer, GridPagination } from '@mui/x-data-grid';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import { Paper, Typography, Box, Button } from '@mui/material';
// import { getWhatsappCampaignReport } from '../../../apis/whatsapp/whatsapp.js';
// import { useNavigate } from "react-router-dom";
// import { useState } from 'react';
// import { useEffect } from 'react';
// import CustomTooltip from '../../../components/common/CustomTooltip.jsx';
// import CustomNoRowsOverlay from '../../components/CustomNoRowsOverlay.jsx';

// const PaginationList = styled("ul")({
//     listStyle: "none",
//     padding: 0,
//     margin: 0,
//     display: "flex",
//     gap: "8px",
// });

// const CustomPagination = ({ totalPages, paginationModel, setPaginationModel }) => {
//     const { items } = usePagination({
//         count: totalPages,
//         page: paginationModel.page + 1,
//         onChange: (_, newPage) => setPaginationModel({ ...paginationModel, page: newPage - 1 }),
//     });

//     return (
//         <Box sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
//             <PaginationList>
//                 {items.map(({ page, type, selected, ...item }, index) => {
//                     let children = null;
//                     if (type === "start-ellipsis" || type === "end-ellipsis") {
//                         children = "…";
//                     } else if (type === "page") {
//                         children = (
//                             <Button
//                                 key={index}
//                                 variant={selected ? "contained" : "outlined"}
//                                 size="small"
//                                 sx={{ minWidth: "27px" }}
//                                 {...item}
//                             >
//                                 {page}
//                             </Button>
//                         );
//                     } else {
//                         children = (
//                             <Button key={index} variant="outlined" size="small" {...item} sx={{}} >
//                                 {type === "previous" ? "Previous" : "Next"}
//                             </Button>
//                         );
//                     }

//                     return <li key={index}>{children}</li>;
//                 })}
//             </PaginationList>
//         </Box>
//     );
// };

// const ManageCampaignTable = ({ id, name, data = [] }) => {
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10, });
//     const navigate = useNavigate();

//     const handleView = (row) => {
//         console.log("handleView:", row)
//     };

//     const handleSummaryReport = (row) => {
//         navigate("/wcampaigndetailsreport", {
//             state: {
//                 campaignSrno: row.campaignSrno,
//                 campaignName: row.campaignName
//             }
//         });
//     };

//     // **Format Date Function** (Ensures proper date format)
//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A";
//         const date = new Date(dateString);
//         return date.toLocaleString("en-GB", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//             // hour: "2-digit",
//             // minute: "2-digit",
//             // second: "2-digit",
//         });
//     };

//     const columns = [
//         { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
//         { field: 'queTime', headerName: 'Created On', flex: 1, minWidth: 120 },
//         { field: 'campaignName', headerName: 'Campaign Name', flex: 1, minWidth: 120 },
//         { field: 'templateName', headerName: 'Template Name', flex: 1, minWidth: 120 },
//         { field: 'templateCategory', headerName: 'Template Category', flex: 1, minWidth: 120 },
//         { field: 'templateType', headerName: 'Template Type', flex: 1, minWidth: 120 },
//         { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
//         { field: 'totalAudience', headerName: 'Total Audience', flex: 1, minWidth: 120 },
//         {
//             field: 'action',
//             headerName: 'Action',
//             flex: 1,
//             minWidth: 150,
//             renderCell: (params) => (
//                 <>
//                     <CustomTooltip
//                         title="View Campaign"
//                         placement="top"
//                         arrow={true}
//                     >
//                         <IconButton className='text-xs' onClick={() => handleView(params.row)}>
//                             <InfoOutlinedIcon
//                                 sx={{
//                                     fontSize: '1.2rem',
//                                     color: 'green'
//                                 }}
//                             />
//                         </IconButton>
//                     </CustomTooltip>
//                     <CustomTooltip
//                         title="Campaign Detail Report"
//                         placement="top"
//                         arrow={true}
//                     >
//                         <IconButton onClick={() => handleSummaryReport(params.row)}>
//                             <DescriptionOutlinedIcon
//                                 sx={{
//                                     fontSize: '1.2rem',
//                                     color: 'gray',
//                                 }}
//                             />
//                         </IconButton>
//                     </CustomTooltip>
//                 </>
//             ),
//         },
//     ];

//     // use this when you want to create rows dynamically
//     // const rows = Array.from({ length: 500 }, (_, i) => ({
//     //     id: i + 1,
//     //     sn: i + 1,
//     //     queTime: '11/05/2024 14:58:39',
//     //     campaignName: 'Demo',
//     //     templateName: 'NewTemplate',
//     //     templateCategory: 'Utility',
//     //     templateType: 'Text',
//     //     status: 'Pending',
//     //     totalAudience: '10000',
//     //     action: 'True',
//     // }));

//     const rows = Array.isArray(data)
//         ? data.map((item, index) => ({
//             id: index + 1,
//             sn: index + 1,
//             // queTime: formatDate(item.queTime) || "N/A",
//             queTime: item.queTime || "N/A",
//             campaignName: item.campaignName || "N/A",
//             templateName: item.templateName || "N/A",
//             templateCategory: item.templateCategory || "N/A",
//             templateType: item.templateType || "N/A",
//             status: item.status || "N/A",
//             totalAudience: item.totalAudience || "0",
//             campaignSrno: item.campaignSrno,
//         }))
//         : [];

//     const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

//     const CustomFooter = () => {
//         return (
//             <GridFooterContainer
//                 sx={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     justifyContent: {
//                         xs: "center", lg: "space-between"
//                     },
//                     alignItems: "center",
//                     padding: 1,
//                     gap: 2,
//                     overflowX: "auto",
//                 }
//                 }
//             >
//                 <Box
//                     sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         flexWrap: "wrap",
//                         gap: 1.5,
//                     }}
//                 >
//                     {selectedRows.length > 0 && (
//                         <Typography
//                             variant="body2"
//                             sx={{
//                                 borderRight: "1px solid #ccc",
//                                 paddingRight: "10px",
//                             }}
//                         >
//                             {selectedRows.length} Rows Selected
//                         </Typography>
//                     )}

//                     <Typography variant="body2">
//                         Total Records: <span className='font-semibold'>{rows.length}</span>
//                     </Typography>
//                 </Box>

//                 <Box
//                     sx={{
//                         display: "flex",
//                         justifyContent: "center",
//                         width: { xs: "100%", sm: "auto" },
//                     }}
//                 >
//                     <CustomPagination
//                         totalPages={totalPages}
//                         paginationModel={paginationModel}
//                         setPaginationModel={setPaginationModel}
//                     />
//                 </Box>
//             </GridFooterContainer >
//         );
//     };

//     return (
//         <Paper sx={{ height: 558 }}
//             id={id}
//             name={name}
//         >
//             <DataGrid
//                 id={id}
//                 name={name}
//                 rows={rows}
//                 columns={columns}
//                 initialState={{ pagination: { paginationModel } }}
//                 pageSizeOptions={[10, 20, 50]}
//                 pagination
//                 paginationModel={paginationModel}
//                 onPaginationModelChange={setPaginationModel}
//                 checkboxSelection
//                 rowHeight={45}
//                 slots={{
//                     footer: CustomFooter,
//                     noRowsOverlay: CustomNoRowsOverlay,
//                 }}
//                 slotProps={{ footer: { totalRecords: rows.length } }}
//                 onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
//                 disableRowSelectionOnClick
//                 // autoPageSize
//                 disableColumnResize
//                 disableColumnMenu
//                 sx={{
//                     border: 0,
//                     "& .MuiDataGrid-cellCheckbox": {
//                         outline: "none !important",
//                     },
//                     "& .MuiDataGrid-cell": {
//                         outline: "none !important",
//                     },
//                     "& .MuiDataGrid-columnHeaders": {
//                         color: "#193cb8",
//                         fontSize: "14px",
//                         fontWeight: "bold !important",
//                     },
//                     "& .MuiDataGrid-row--borderBottom": {
//                         backgroundColor: "#e6f4ff !important",
//                     },
//                     "& .MuiDataGrid-columnSeparator": {
//                         // display: "none",
//                         color: "#ccc",
//                     },
//                 }}
//             />
//         </Paper>
//     );
// };

// export default ManageCampaignTable;

import * as React from "react";
import { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Paper, Typography, Box, Button } from "@mui/material";
import {
  campaignSummaryInfo,
  getWhatsappCampaignReport,
} from "../../../apis/whatsapp/whatsapp.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import CustomTooltip from "../../../components/common/CustomTooltip.jsx";

import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay.jsx";
import DropdownMenuPortalCampaign from "@/utils/DropdownMenuCampaign.jsx";
import InfoPopover from "../../../components/common/InfoPopover.jsx";
import CampaignSummaryUI from "./CampaignSummaryUI.jsx";
import moment from "moment";

const PaginationList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});

const CustomPagination = ({
  totalPages,
  paginationModel,
  setPaginationModel,
}) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) =>
      setPaginationModel({ ...paginationModel, page: newPage - 1 }),
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
      <PaginationList>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <Button
                key={index}
                variant={selected ? "contained" : "outlined"}
                size="small"
                sx={{ minWidth: "27px" }}
                {...item}
              >
                {page}
              </Button>
            );
          } else {
            children = (
              <Button
                key={index}
                variant="outlined"
                size="small"
                {...item}
                sx={{}}
              >
                {type === "previous" ? "Previous" : "Next"}
              </Button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </PaginationList>
    </Box>
  );
};

const ManageCampaignTable = ({
  id,
  name,
  data = [],
  fromDate,
  selectedUser,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [campaignInfoMap, setCampaignInfoMap] = useState({});
  // const [selectedUser, setSelectedUser] = useState("");

  const dropdownButtonRefs = useRef({});
  const navigate = useNavigate();

  const closeDropdown = () => setDropdownOpenId(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".bot-settings")) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleView = async (row) => {
    const id = row.id;

    // Reset for this row
    setDropdownOpenId(null);

    const fromDateStr = moment(fromDate).format("DD/MM/YYYY");

    const data = {
      campSrno: row?.campaignSrno,
      fromDate: fromDateStr,
      selectedUserId: selectedUser || "0",
    };

    try {
      const res = await campaignSummaryInfo(data);

      setCampaignInfoMap((prev) => ({
        ...prev,
        [id]: res[0] || null,
      }));

      setDropdownOpenId(id); // Open only after data is ready
    } catch (e) {
      console.error("Error fetching campaign summary:", e);
    }
  };

  const handleSummaryReport = (row) => {
    navigate("/wcampaigndetailsreport", {
      state: {
        campaignSrno: row.campaignSrno,
        campaignName: row.campaignName,
      },
    });
  };

  // **Format Date Function** (Ensures proper date format)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "queTime",
      headerName: "Created On",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => moment(params.row.queTime).format("DD-MM-YYYY"),
    },
    {
      field: "campaignName",
      headerName: "Campaign Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "templateName",
      headerName: "Template Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "templateCategory",
      headerName: "Template Category",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "templateType",
      headerName: "Template Type",
      flex: 1,
      minWidth: 120,
    },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    {
      field: "totalAudience",
      headerName: "Total Audience",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          {/* <CustomTooltip title="View Campaign" placement="top" arrow={true}>
            <IconButton
              className="text-xs"
              ref={(el) => {
                if (el) dropdownButtonRefs.current[params.row.id] = el;
              }}
              onClick={() => handleView(params.row)}
            >
              <InfoOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
            {dropdownOpenId === params.row.id && (
              <DropdownMenuPortalCampaign
                targetRef={{
                  current: dropdownButtonRefs.current[params.row.id],
                }}
                onClose={closeDropdown}
              >
                {campaignInfo && (
                  <div>
                    {Object.keys(campaignInfo).map((key) => {
                      return (
                        <div key={key} className="flex items-center gap-2">
                          <span className="font-bold">{key}:</span>
                          <span>{campaignInfo[key]}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </DropdownMenuPortalCampaign>
            )}
          </CustomTooltip> */}
          <CustomTooltip title="View Campaign" placement="top" arrow>
            <IconButton
              className="text-xs"
              ref={(el) => {
                if (el) dropdownButtonRefs.current[params.row.id] = el;
              }}
              onClick={() => handleView(params.row)}
            >
              <InfoOutlinedIcon sx={{ fontSize: "1.2rem", color: "green" }} />
            </IconButton>
          </CustomTooltip>

          {/* <InfoPopover
            anchorEl={dropdownButtonRefs.current[params.row.id]}
            open={dropdownOpenId === params.row.id}
            onClose={closeDropdown}
          >
            {campaignInfoMap[params.row.id] ? (
              <div className="space-y-1">
                {Object.entries(campaignInfoMap[params.row.id]).map(
                  ([key, val]) => (
                    <div
                      key={key}
                      className="flex justify-between text-sm text-gray-800 border-b border-gray-200 py-1"
                    >
                      <span className="font-semibold">{key}:</span>
                      <span>{val}</span>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div>No Data Available</div>
            )}
          </InfoPopover> */}
          <InfoPopover
            anchorEl={dropdownButtonRefs.current[params.row.id]}
            open={dropdownOpenId === params.row.id}
            onClose={closeDropdown}
          >
            {campaignInfoMap[params.row.id] ? (
              <div className="w-[280px] max-w-full">
                {/* <div className="text-base font-semibold mb-2 text-gray-800">
                  Campaign Summary
                </div> */}
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                  {[
                    "total",
                    "block",
                    "failed",
                    "submitted",
                    "pending",
                    "sent",
                    "delivered",
                    "read",
                    "source",
                    // "queTime",
                  ].map((key) => (
                    <React.Fragment key={key}>
                      <div className="font-medium capitalize text-gray-600 border-b border-gray-200 pb-2">
                        {key.replace(/([A-Z])/g, " $1")}
                      </div>
                      <div className="text-right font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        {campaignInfoMap[params.row.id][key] ?? "N/A"}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No Data Available</div>
            )}
          </InfoPopover>

          <CustomTooltip
            title="Campaign Detail Report"
            placement="top"
            arrow={true}
          >
            <IconButton onClick={() => handleSummaryReport(params.row)}>
              <DescriptionOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  // use this when you want to create rows dynamically
  // const rows = Array.from({ length: 500 }, (_, i) => ({
  //     id: i + 1,
  //     sn: i + 1,
  //     queTime: '11/05/2024 14:58:39',
  //     campaignName: 'Demo',
  //     templateName: 'NewTemplate',
  //     templateCategory: 'Utility',
  //     templateType: 'Text',
  //     status: 'Pending',
  //     totalAudience: '10000',
  //     action: 'True',
  // }));

  const rows = Array.isArray(data)
    ? data.map((item, index) => ({
        id: index + 1,
        sn: index + 1,
        // queTime: formatDate(item.queTime) || "N/A",
        queTime: moment(item.queTime).format("YYYY-MM-DD HH:mm:ss") || "N/A",
        campaignName: item.campaignName || "N/A",
        templateName: item.templateName || "N/A",
        templateCategory: item.templateCategory || "N/A",
        templateType: item.templateType || "N/A",
        status: item.status || "N/A",
        totalAudience: item.totalAudience || "0",
        campaignSrno: item.campaignSrno,
      }))
    : [];

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            lg: "space-between",
          },
          alignItems: "center",
          padding: 1,
          gap: 2,
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {selectedRows.length > 0 && (
            <Typography
              variant="body2"
              sx={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
              }}
            >
              {selectedRows.length} Rows Selected
            </Typography>
          )}

          <Typography variant="body2">
            Total Records: <span className="font-semibold">{rows.length}</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <CustomPagination
            totalPages={totalPages}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </Box>
      </GridFooterContainer>
    );
  };

  return (
    <Paper sx={{ height: 558 }} id={id} name={name}>
      <DataGrid
        id={id}
        name={name}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 50]}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        // checkboxSelection
        rowHeight={45}
        slots={{
          footer: CustomFooter,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        slotProps={{ footer: { totalRecords: rows.length } }}
        onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
        disableRowSelectionOnClick
        // autoPageSize
        disableColumnResize
        disableColumnMenu
        sx={{
          border: 0,
          "& .MuiDataGrid-cellCheckbox": {
            outline: "none !important",
          },
          "& .MuiDataGrid-cell": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            color: "#193cb8",
            fontSize: "14px",
            fontWeight: "bold !important",
          },
          "& .MuiDataGrid-row--borderBottom": {
            backgroundColor: "#e6f4ff !important",
          },
          "& .MuiDataGrid-columnSeparator": {
            // display: "none",
            color: "#ccc",
          },
        }}
      />
    </Paper>
  );
};

export default ManageCampaignTable;
