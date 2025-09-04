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
import CallToActionIcon from "@mui/icons-material/CallToAction";
import { Paper, Typography, Box, Button } from "@mui/material";
import {
  campaignSummaryInfo,
  getWhatsappCampaignReport,
  fetchCtaTrackingReport,
  downloadCtaTrackingReport
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
import { Dialog } from "primereact/dialog";
import { FiDownload } from "react-icons/fi";
import toast from "react-hot-toast";
import { useDownload } from "@/context/DownloadProvider.jsx";

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
  const [dropdownCTAOpenId, setDropdownCTAOpenId] = useState(null);
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [campaignInfoMap, setCampaignInfoMap] = useState({});
  const [campaignCTAMap, setCampaignCTAMap] = useState({});
  // const [selectedUser, setSelectedUser] = useState("");

  const dropdownButtonRefs = useRef({});
  const [isOpen, setIsOpen] = useState(false);
  const [replySrno, setReplySrno] = useState("");
  const dropdownCTAButtonRefs = useRef({});
  const navigate = useNavigate();
  const { triggerDownloadNotification } = useDownload();


  const closeDropdown = () => setDropdownOpenId(null);
  const handleReplyDownload = async (srno) => {
    try {
      const payload = {
        campaignSrno: srno,
        type: 3,
        selectedUserId: 0,
      };

      const res = await downloadCtaTrackingReport(payload);

      console.log("res", res)

      if (!res) {
        toast.error("Failed to download reply data");
        return;
      } else {
        toast.success(res.msg)
        setIsOpen(false)
        triggerDownloadNotification();
      }
    } catch (err) {
      toast.error(err?.message || "Download failed");
    }
  };


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

    const fromDateStr = moment(fromDate).format("YYYY-MM-DD");

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


  const handleCTAView = async (row) => {
    setIsOpen(true);
    const id = row.id;
    setReplySrno(row?.campaignSrno)
    // setDropdownCTAOpenId(null);

    const data = {
      campSrno: row?.campaignSrno,
    };

    try {
      const res = await fetchCtaTrackingReport(data);
      setCampaignCTAMap((prev) => ({
        ...prev,
        campaignReplies: res?.data || [],
      }));

      // setDropdownCTAOpenId(id);
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
      renderCell: (params) => params.row.templateType?.toUpperCase(),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => params.row.status?.toUpperCase(),
    },
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

          <CustomTooltip title="CTA Analytics" placement="top" arrow>
            <IconButton
              className="text-xs"
              // ref={(el) => {
              //   if (el) dropdownCTAButtonRefs.current[params.row.id] = el;
              // }}
              onClick={() => handleCTAView(params.row)}
            >
              <CallToActionIcon sx={{ fontSize: "1.2rem", color: "orange" }} />
            </IconButton>
          </CustomTooltip>

          {/* Cta info popover old */}
          {/* <InfoPopover
            anchorEl={dropdownCTAButtonRefs.current[params.row.id]}
            open={dropdownCTAOpenId === params.row.id}
            onClose={() => setDropdownCTAOpenId(null)}
          >
            {campaignCTAMap?.campaignReplies?.length > 0 ? (
              <div className="w-[280px] max-w-full">
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                  <React.Fragment>
                    <div className="font-medium capitalize text-gray-600 border-b border-gray-200 pb-2">
                      Reply Message
                    </div>
                    <div className="text-right font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      {campaignCTAMap.campaignReplies[0].message}
                    </div>

                    <div className="font-medium capitalize text-gray-600 border-b border-gray-200 pb-2">
                      Reply Count
                    </div>
                    <div className="text-right font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      {campaignCTAMap.campaignReplies[0].replyCount}
                    </div>
                  </React.Fragment>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No Data Available</div>
            )}
          </InfoPopover> */}

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
                    "undelivered",
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
    <>
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
      {/* cta dialog */}
      {/* <Dialog onHide={() => setIsOpen(false)} visible={isOpen} className="w-xl" draggable={false} >
        <div className="flex flex-col gap-3">
          {campaignCTAMap?.campaignReplies?.length > 0 ? (
            <>
            <div className="flex justify-between">
              <div className="gap-2">
              <p className="text-sm text-gray-600 text-medium">Reply Message: <span className="font-medium text-gray-800 text-sm">{campaignCTAMap.campaignReplies[0].message} </span></p>
              <div className="border-t border-gray-200" />
              <p className="text-sm text-gray-600 text-medium">Reply Count: <span className="font-medium text-gray-800 text-sm">   {campaignCTAMap.campaignReplies[0].replyCount} </span></p>
              </div>
              <FiDownload fontSize="14px" />
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-500 w-full flex items-center justify-center">No Data Available</div>
          )}
        </div>
      </Dialog> */}

      <Dialog
        onHide={() => setIsOpen(false)}
        visible={isOpen}
        className="w-xl rounded-lg shadow-lg"
        draggable={false}
      >
        <div className="flex flex-col gap-4">
          {/* Header Section */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h2 className="text-base font-semibold text-gray-800">
              Campaign Reply Details
            </h2>

            <div className="flex items-center gap-3">
              {/* Download Button */}
              <button
                className="flex items-center gap-1 px-2 py-2 text-sm text-blue-600 cursor-pointer hover:text-blue-800 rounded-full border border-blue-200 hover:border-blue-400 transition"
                onClick={() => handleReplyDownload(replySrno)}
              >
                <FiDownload size={14} />
              </button>
            </div>
          </div>

          {/* Body Section */}
          {campaignCTAMap?.campaignReplies?.length > 0 ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-600">
                Reply Message:{" "}
                <span className="font-medium text-gray-800">
                  {campaignCTAMap.campaignReplies[0].message}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Reply Count:{" "}
                <span className="font-medium text-gray-800">
                  {campaignCTAMap.campaignReplies[0].replyCount}
                </span>
              </p>
            </div>
          ) : (
            <div className="text-sm text-gray-500 w-full flex items-center justify-center">
              No Data Available
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default ManageCampaignTable;
