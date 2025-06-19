import { getListofSendMsg, downloadCustomWhatsappReport } from "@/apis/whatsapp/whatsapp";
import { Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import { Box } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { Button } from "@mui/material";
import moment from "moment";
import UniversalButton from "@/components/common/UniversalButton";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import Loader from "@/whatsapp/components/Loader";
import { useDownload } from "@/context/DownloadProvider";
import UniversalSkeleton from "@/components/common/UniversalSkeleton.jsx";
import CustomTooltip from "@/components/common/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import { ImInfo } from "react-icons/im";
import InfoPopover from "@/components/common/InfoPopover";

const PaginationList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});

// const CustomPaginatior = ({
//   totalPages,
//   paginationModel,
//   setPaginationModel,
//   setCurrentPage,
// }) => {
//   const { items } = usePagination({
//     count: totalPages,
//     page: paginationModel.page,
//     onChange: (_, newPage) => {
//       setCurrentPage(newPage);
//       setPaginationModel({ ...paginationModel, page: newPage });
//     },
//   });

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
//       <PaginationList>
//         {items.map(({ page, type, selected, ...item }, index) => {
//           let children = null;

//           if (type === "start-ellipsis" || type === "end-ellipsis") {
//             children = "…";
//           } else if (type === "page") {
//             children = (
//               <Button
//                 key={index}
//                 variant={selected ? "contained" : "outlined"}
//                 size="small"
//                 sx={{ minWidth: "27px" }}
//                 {...item}
//               >
//                 {page}
//               </Button>
//             );
//           } else {
//             children = (
//               <Button
//                 key={index}
//                 variant="outlined"
//                 size="small"
//                 {...item}
//                 sx={{}}
//               >
//                 {type === "previous" ? "Previous" : "Next"}
//               </Button>
//             );
//           }

//           return <li key={index}>{children}</li>;
//         })}
//       </PaginationList>
//     </Box>
//   );
// };

const CustomPaginator = ({ totalPages, paginationModel, setPaginationModel, setCurrentPage }) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page,
    onChange: (_, newPage) => {
      setCurrentPage(newPage);
      setPaginationModel({ ...paginationModel, page: newPage });
    },
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 0.5 }}>
      <PaginationList>
        {items.map(({ page, type, selected, ...item }, index) => {
          if (type === "start-ellipsis" || type === "end-ellipsis") return <li key={index}>…</li>;
          return (
            <li key={index}>
              <Button
                variant={selected ? "contained" : "outlined"}
                size="small"
                {...item}
                sx={{ minWidth: "30px" }}
              >
                {type === "page" ? page : type === "previous" ? "Prev" : "Next"}
              </Button>
            </li>
          );
        })}
      </PaginationList>
    </Box>
  );
};

export const ApiCampaignInfo = () => {
  const { state } = useLocation();

  if (!state) {
    return null;
  }

  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { triggerDownloadNotification } = useDownload();
  const dropdownButtonRefs = useRef({});
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [clicked, setClicked] = useState([]);
  const closeDropdown = () => setDropdownOpenId(null);
  const [totalRecords, setTotalRecords] = useState(0);

  const columns = [
    { field: "sn", headerName: "S.No", width: 60 },
    { field: "wabaNumber", headerName: "WABA Number", width: 130 },
    { field: "mobileNo", headerName: "Mobile Number", minWidth: 135 },
    { field: "source", headerName: "Source", minWidth: 100 },
    { field: "status", headerName: "Status", minWidth: 100 },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 150,
    },
    { field: "reason", headerName: "Reason", width: 150 },
    { field: "sentTime", headerName: "Sent", width: 200 },
    {
      field: "requestJson",
      headerName: "Request JSON",
      flex: 1,
      minWidth: 120,
    },
    // { field: "readTime", headerName: "Read Time", flex: 1, minWidth: 120 },
    // { field: "queTime", headerName: "Que Time", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 0,
      width: 70,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Info" placement="top" arrow>
            <span>
              <IconButton
                type="button"
                ref={(el) => {
                  if (el) dropdownButtonRefs.current[params.row.id] = el;
                }}
                onClick={() => handleInfo(params.row)}
                className="no-xs relative"
              >
                <ImInfo size={18} className="text-green-500 " />
              </IconButton>
              <InfoPopover
                anchorEl={dropdownButtonRefs.current[params.row.id]}
                open={dropdownOpenId === params.row.id}
                onClose={closeDropdown}
              >
                {clicked && Object.keys(clicked).length > 0 ? (
                  <table className="w-80 text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                    <tbody>
                      {Object.entries(clicked).map(([key, value], index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors border-b last:border-none"
                        >
                          <td className="px-4 py-2 font-medium text-gray-600 capitalize w-1/3 text-nowrap">
                            {additionalInfoLabels[key] || key}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            {key === "isEnabledForInsights"
                              ? value === true || value === "true"
                                ? "True"
                                : "False"
                              : value || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-sm text-gray-400 italic px-2 py-2">
                    No data
                  </div>
                )}
              </InfoPopover>
            </span>
          </CustomTooltip>
        </>
      ),
    },
  ];

  const additionalInfoLabels = {
    queTime: "Que Time",
    readTime: "Read Time",
    // sentTime: "Sent Time"
  };


  const handleInfo = (row) => {
    const id = row.id;
    setDropdownOpenId((prevId) => (prevId === id ? null : id));
    setClicked(row.additionalInfo || []);
  };


  const handleFetchDetails = async (page = 1) => {
    setIsLoading(true);
    try {

      // const formattedFromDate = state.selectedDate
      //   ? moment(state.selectedDate).format("YYYY-MM-DD")
      //   : moment().format("YYYY-MM-DD");
      const formattedFromDate = moment(state.selectedDate).format("YYYY-MM-DD");
      let status = "";
      let deliveryStatus = "";

      const statusBased = ["failed", "submitted", "block", "busy"];
      const deliveryBased = ["read", "delivered", "undelivered"];

      if (statusBased.includes(state.log)) {
        status = state.log;
      } else if (deliveryBased.includes(state.log)) {
        deliveryStatus = state.log;
      }

      const payload = {
        fromDate: formattedFromDate,
        toDate: formattedFromDate,
        mobile: "",
        page,
        pageSize: paginationModel.pageSize,
        source: "API",
        deliveryStatus,
        status,
      };
      const res = await getListofSendMsg(payload);
      setTotalPage(res?.pages || 0);
      setTotalRecords(res?.total || 0);

      // const formattedData = Array.isArray(res.data)
      //   ? res?.data?.map((item, index) => ({
      //     sn: index + 1,
      //     id: index + 1,
      //     ...item,
      //   }))
      //   : [];

      // setData(formattedData);

      if (res?.data) {
        const formattedData = res.data.map((item, index) => ({
          sn: (page - 1) * paginationModel.pageSize + index + 1,
          // id: item.id || `row-${index}`, // Ensure unique IDs for rows
          id: `${item.id || 'row'}-${(page - 1) * paginationModel.pageSize + index}`,
          wabaNumber: item.wabaNumber || "N/A",
          mobileNo: item.mobileNo || "N/A",
          source: item.source || "N/A",
          status: item.status || "N/A",
          deliveryStatus: item.deliveryStatus || "-",
          reason: item.reason || "-",
          requestJson: item.requestJson || "-",
          // readTime: item.readTime || "-",
          // queTime: item.queTime || "-",
          sentTime: item.sentTime || "-",
          additionalInfo: {
            queTime: item.queTime || "-",
            readTime: item.readTime || "-",
          },
        }));

        setData(formattedData);
      } else {
        toast.error("No data received");
      }
    } catch (e) {
      console.log(e);
      return toast.error("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  // const rows = Array.isArray(data)
  //   ? data.map((item, i) => ({
  //     id: i + 1,
  //     sn: i + 1,
  //     wabaNumber: item.wabaNumber,
  //     mobileNo: item.mobileNo,
  //     source: item.source,
  //     status: item.status,
  //     deliveryStatus: item.deliveryStatus,
  //     reason: item.reason || "-",
  //     requestJson: item.requestJson || "-",
  //     readTime: item.readTime || "-",
  //     queTime: item.queTime || "-",
  //     sentTime: item.sentTime || "-",
  //     additionalInfo: {
  //       queTime: item.queTime || "-",
  //       readTime: item.readTime || "-",
  //       // sentTime: item.sentTime || "N/A",
  //     },
  //     // ...item,
  //   }))
  //   : [];

  // useEffect(() => {
  //   handleFetchDetails(currentPage);
  // }, [currentPage]);

  useEffect(() => {
    if (state) handleFetchDetails(currentPage);
  }, [currentPage]);

  const totalPages = totalPage;

  // const CustomFooter = () => {
  //   return (
  //     <GridFooterContainer
  //       sx={{
  //         display: "flex",
  //         flexWrap: "wrap",
  //         justifyContent: {
  //           xs: "center",
  //           lg: "space-between",
  //         },
  //         alignItems: "center",
  //         padding: 1,
  //         gap: 2,
  //         overflowX: "auto",
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           display: "flex",
  //           alignItems: "center",
  //           flexWrap: "wrap",
  //           gap: 1.5,
  //         }}
  //       >
  //         {selectedRows?.length > 0 && (
  //           <Typography
  //             variant="body2"
  //             sx={{
  //               borderRight: "1px solid #ccc",
  //               paddingRight: "10px",
  //             }}
  //           >
  //             {selectedRows?.length} Rows Selected
  //           </Typography>
  //         )}

  //         {/* <Typography variant="body2">
  //           Total Records: <span className="font-semibold">{totalPage}</span>
  //         </Typography> */}
  //       </Box>

  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           width: { xs: "100%", sm: "auto" },
  //         }}
  //       >
  //         <CustomPaginatior
  //           totalPages={totalPages}
  //           paginationModel={paginationModel}
  //           setPaginationModel={setPaginationModel}
  //           setCurrentPage={setCurrentPage}
  //         />
  //       </Box>
  //     </GridFooterContainer>
  //   );
  // };


  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl mb-5 text-gray-700">Logs Detail Report</h1>
      </div>
      {isLoading ? (
        <div className="w-full">
          <UniversalSkeleton height="35rem" width="100%" />
        </div>
      ) : (
        // <Paper sx={{ height: 558 }}>
        //   <DataGrid
        //     // id={id}
        //     // name={name}
        //     rows={rows}
        //     columns={columns}
        //     initialState={{ pagination: { paginationModel } }}
        //     // checkboxSelection
        //     rowHeight={45}
        //     slots={{
        //       footer: CustomFooter,
        //       noRowsOverlay: CustomNoRowsOverlay,
        //     }}
        //     slotProps={{ footer: { totalRecords: rows.length } }}
        //     onRowSelectionModelChange={(ids) => { }}
        //     disableRowSelectionOnClick
        //     // autoPageSize
        //     // disableColumnResize
        //     disableColumnMenu
        //     sx={{
        //       border: 0,
        //       "& .MuiDataGrid-cellCheckbox": {
        //         outline: "none !important",
        //       },
        //       "& .MuiDataGrid-cell": {
        //         outline: "none !important",
        //       },
        //       "& .MuiDataGrid-columnHeaders": {
        //         color: "#193cb8",
        //         fontSize: "14px",
        //         fontWeight: "bold !important",
        //       },
        //       "& .MuiDataGrid-row--borderBottom": {
        //         backgroundColor: "#e6f4ff !important",
        //       },
        //       "& .MuiDataGrid-columnSeparator": {
        //         // display: "none",
        //         color: "#ccc",
        //       },
        //     }}
        //   />
        // </Paper>
        <Paper sx={{ padding: 0, overflowX: "scroll", height: 607 }} className="flex items-center flex-col justify-between">
          <table className="w-full table-auto border-collapse overflow-x-scroll">
            <thead className="bg-[#e6f4ff] text-gray-700 text-sm">
              <tr  >
                {["S.No", "WABA Number", "Mobile No", "Source", "Status", "Delivery Status", "Reason", "Sent", "Request JSON", "Action"].map(
                  (header, i) => (
                    <th key={i} className="px-3 py-4 text-left border-b font-[500] border-r-2 text-[#193cb8]">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id} className="border-b hover:bg-gray-50 text-sm w-full">
                  <td className="px-3 py-2 w-10">{row.sn}</td>
                  <td className="px-3 py-2 w-40">{row.wabaNumber}</td>
                  <td className="px-3 py-2 w-30">{row.mobileNo}</td>
                  <td className="px-3 py-2 w-20">{row.source}</td>
                  <td className="px-3 py-2 w-30">{row.status}</td>
                  <td className="px-3 py-2 w-40">{row.deliveryStatus}</td>
                  <td className="px-3 py-2 w-35">{row.reason}</td>
                  <td className="px-3 py-2 w-45">{row.sentTime}</td>
                  {/* <td className="px-3 py-2 truncate max-w-xs">{row.requestJson}</td> */}
                  <td className="px-3 py-2 w-0">
                    <CustomTooltip
                      className="text-white"
                      title={
                        <pre className="whitespace-pre-wrap break-words max-w-sm text-xs">
                          {typeof row.requestJson === "object"
                            ? JSON.stringify(row.requestJson, null, 2)
                            : row.requestJson}
                        </pre>
                      }
                      arrow
                      placement="bottom"
                    >
                      <div className="truncate cursor-pointer max-w-xs">
                        {typeof row.requestJson === "object"
                          ? JSON.stringify(row.requestJson).slice(0, 40) + "..."
                          : String(row.requestJson).slice(0, 40) + "..."}
                      </div>
                    </CustomTooltip>
                  </td>
                  <td className="px-3 py-2 w-10">
                    <CustomTooltip title="Info" placement="top" arrow>
                      <span>
                        <IconButton
                          ref={(el) => (dropdownButtonRefs.current[row.id] = el)}
                          onClick={() => handleInfo(row)}
                        >
                          <ImInfo size={16} className="text-green-500" />
                        </IconButton>
                        <InfoPopover
                          anchorEl={dropdownButtonRefs.current[row.id]}
                          open={dropdownOpenId === row.id}
                          onClose={() => setDropdownOpenId(null)}
                        >
                          {clicked && Object.keys(clicked).length > 0 ? (
                            <table className="w-72 text-sm text-left">
                              <tbody>
                                {Object.entries(clicked).map(([key, value], i) => (
                                  <tr key={i} className="border-b">
                                    <td className="px-2 py-2 font-medium text-gray-600 w-1/3 text-nowrap">
                                      {additionalInfoLabels[key] || key}
                                    </td>
                                    <td className="px-2 py-1">{value || "N/A"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="p-2 text-gray-500 italic">No data</div>
                          )}
                        </InfoPopover>
                      </span>
                    </CustomTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="my-2 flex items-center justify-between px-3 w-full">
            <Typography variant="body2">
              Total Records: <strong>{totalRecords}</strong>
            </Typography>
            <CustomPaginator
              totalPages={totalPage}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Paper>
      )}
    </>
  );
};
