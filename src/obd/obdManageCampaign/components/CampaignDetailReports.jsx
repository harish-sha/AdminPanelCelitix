import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    DataGrid,
    GridFooterContainer,
    GridPagination,
} from "@mui/x-data-grid";
import { Paper, Typography, Box, Button, IconButton, Popper } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

import { fetchDetailsbySrNo } from "@/apis/obd/obd.js";
import InputField from "@/components/layout/InputField.jsx";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown.jsx";
import { IoSearch } from "react-icons/io5";
import UniversalButton from "@/whatsapp/components/UniversalButton.jsx";
import toast from "react-hot-toast";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton.jsx";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay.jsx";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Table, TableBody, TableCell, TableRow } from '@mui/material';


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
    setCurrentPage,
}) => {
    const { items } = usePagination({
        count: totalPages,
        page: paginationModel.page + 1,
        onChange: (_, newPage) => {
            setCurrentPage(newPage);
            setPaginationModel({ ...paginationModel, page: newPage - 1 });
        },
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

const CampaignDetailsReports = ({
    // setSelectedRows,
    // selectedRows,
}) => {
    const location = useLocation();
    const { campaignSrNo, campaignName } = location.state || {};
    console.log("campaignSrno", campaignSrNo)
    console.log("campaignName", campaignName)
    console.log("location.state", location.state)
    const [selectedRows, setSelectedRows] = useState([]);
    const [campaignDetails, setCampaignDetails] = useState(null);
    const [deliveryStatus, setDeliveryStatus] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    // useEffect(() => {
    //     if (!campaignSrno) return;
    //     const fetchCampaignData = async () => {
    //         const data = await getObdDetailedLogs(campaignSrNo);
    //         setCampaignDetails(data?.data);
    //     };
    //     fetchCampaignData();
    // }, [campaignSrno, currentPage]);


    useEffect(() => {
        if (!campaignSrNo) return;
        const fetchCampaignData = async () => {
            const data = await fetchDetailsbySrNo(campaignSrNo);
            console.log("campaign details report data", data)
            setCampaignDetails(data?.data);
        };
        fetchCampaignData();
    }, []);

    const handleSearch = async () => {
        setIsFetching(true);
        setTimeout(() => {
            setIsFetching(false);
        }, 500);
    };

    const columns = [
        { field: 'sn', headerName: 'S.No', flex: 0, width: 60 },
        { field: 'campaignName', headerName: 'Campaign Name', flex: 1, minWidth: 150 },
        { field: 'mobileNumber', headerName: 'Mobile No.', flex: 1, minWidth: 120 },
        { field: 'campaignType', headerName: 'Campaign Type.', flex: 1, minWidth: 120 },
        { field: 'voiceType', headerName: 'Voice Type.', flex: 1, minWidth: 120 },
        { field: 'deliveryStatus', headerName: 'Delivery Status', flex: 1, minWidth: 130 },
        { field: 'processFlag', headerName: 'Process Flag', flex: 1, minWidth: 120 },
        { field: 'queTime', headerName: 'Que Time', flex: 1, minWidth: 130 },
        { field: 'unit', headerName: 'Unit', flex: 1, minWidth: 60 },
        { field: 'retryCount', headerName: 'Retry Count', flex: 1, minWidth: 60 },
        { field: 'chargedUnit', headerName: 'Charged Unit', flex: 1, minWidth: 120 },
        { field: 'callDuration', headerName: 'Call Duration', flex: 1, minWidth: 120 },
        // { field: 'source', headerName: 'Source', flex: 1, minWidth: 120 },

        // {
        //     field: 'more',
        //     headerName: 'More',
        //     flex: 1,
        //     minWidth: 100,
        //     renderCell: (params) => {
        //         const [anchorEl, setAnchorEl] = useState(null);
        //         const [open, setOpen] = useState(false);

        //         const handleMouseEnter = (event) => {
        //             setAnchorEl(event.currentTarget);
        //             setOpen(true);
        //         };

        //         const handleMouseLeave = () => {
        //             setOpen(false);
        //         };

        //         return (
        //             <>
        //                 <IconButton
        //                     className="no-xs"
        //                     onMouseEnter={handleMouseEnter}
        //                     onMouseLeave={handleMouseLeave}
        //                 >
        //                     <InfoOutlinedIcon
        //                         sx={{ fontSize: '1.2rem', color: 'green' }}
        //                     />
        //                 </IconButton>

        //                 <Popper
        //                     open={open}
        //                     anchorEl={anchorEl}
        //                     placement="bottom-start"
        //                     disablePortal
        //                     onMouseEnter={handleMouseEnter}
        //                     onMouseLeave={handleMouseLeave}
        //                     modifiers={[
        //                         {
        //                             name: 'offset',
        //                             options: {
        //                                 offset: [-150, 8], // shift popper to left
        //                             },
        //                         },
        //                         {
        //                             name: 'preventOverflow',
        //                             options: {
        //                                 boundary: 'viewport',
        //                                 padding: 8,
        //                             },
        //                         },
        //                     ]}
        //                     style={{ zIndex: 1300 }}
        //                 >
        //                     <Box sx={{ bgcolor: 'background.paper', p: 2, boxShadow: 3 }}>
        //                         <Table size="small">
        //                             <TableBody>
        //                                 <TableRow>
        //                                     <TableCell variant="head">Campaign Type</TableCell>
        //                                     <TableCell>{params.row.campaignType}</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                     <TableCell variant="head">Sms Count</TableCell>
        //                                     <TableCell>{params.row.smsCount}</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                     <TableCell variant="head">Source</TableCell>
        //                                     <TableCell>{params.row.source}</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                     <TableCell variant="head">Voice Type</TableCell>
        //                                     <TableCell>{params.row.voiceType}</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                     <TableCell variant="head">Process Flag</TableCell>
        //                                     <TableCell>{params.row.processFlag}</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                     <TableCell variant="head">Que Time</TableCell>
        //                                     <TableCell>{params.row.queTime}</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                     <TableCell variant="head">Campaign Sr. No.</TableCell>
        //                                     <TableCell>{params.row.campaignSrno}</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                     <TableCell variant="head">Unique Id</TableCell>
        //                                     <TableCell>{params.row.uniqueId}</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                     <TableCell variant="head">Is Schedule</TableCell>
        //                                     <TableCell>{params.row.isSchedule}</TableCell>
        //                                 </TableRow>
        //                             </TableBody>
        //                         </Table>
        //                     </Box>
        //                 </Popper>
        //             </>
        //         );
        //     },
        // },
    ];

    const rows = Array.isArray(campaignDetails) ? campaignDetails?.map((item, index) => ({
        id: index + 1,
        sn: index + 1,
        campaignName: item.campaignName,
        mobileNumber: item.mobileNo,
        campaignType: item.campaignType,
        unit: item.unit,
        chargedUnit: item.chargedUnit,
        deliveryStatus: item.status,
        queTime: item.queTime,
        callDuration: item.callDuration,
        retryCount: item.retryCount,
        source: item.source,
        voiceType:
            item.voiceType === 1
                ? "Transactional"
                : item.voiceType === 2
                    ? "Promotional"
                    : "" || "N/A",
        processFlag:
            item.processFlag === 1
                ? "Pending"
                : item.processFlag === 2
                    ? "Processing"
                    : item.processFlag === 3
                        ? "Undelivered"
                        : item.processFlag === 4
                            ? "Delivered"
                            : "" || "N/A",
    })) : [];

    const totalPages = Math.floor(totalPage / paginationModel.pageSize);

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
                        Total Records: <span className="font-semibold">{totalPage}</span>
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
                        setCurrentPage={setCurrentPage}
                    />
                </Box>
            </GridFooterContainer>
        );
    };

    function handlePag() {
        setCurrentPage(currentPage + 1);
    }

    return (
        <div className="w-full">
            <div>
                <h1 className="mb-4 font-semibold text-center text-green-600 lg:text-lg text-md">
                    <CampaignOutlinedIcon fontSize="medium" sx={{ fontSize: "1.8rem" }} />&nbsp;
                    OBD Campaign Detail Report - {campaignName}
                </h1>
            </div>
            <div className="flex flex-wrap items-end justify-center w-full gap-4 mb-5 align-middle lg:justify-start">
                <div className="w-full sm:w-64">
                    <InputField
                        id="mobileNoCampaignDetails"
                        name="mobileNoCampaignDetails"
                        label="Mobile No"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Mobile No"
                        tooltipContent="Enter the mobile number."
                        tooltipPlacement="right"
                        type="number"
                    />
                </div>
                <div className="w-full sm:w-64">
                    <AnimatedDropdown
                        id="campaignDeliveryStatusdropdown"
                        name="campaignDeliveryStatusdropdown"
                        label="Delivery Status"
                        tooltipContent="Select the delivery status."
                        tooltipPlacement="right"
                        options={[
                            { value: "sent", label: "Sent" },
                            { value: "delivered", label: "Delivered" },
                            { value: "clicked", label: "Clicked" },
                            { value: "replied", label: "Replied" },
                            { value: "failed", label: "Failed" },
                        ]}
                        value={deliveryStatus}
                        onChange={setDeliveryStatus}
                        placeholder="Category"
                    />
                </div>
                <div className="w-max-content ">
                    <UniversalButton
                        id="manageCampaignSearchBtn"
                        name="manageCampaignSearchBtn"
                        label="Search"
                        icon={<IoSearch />}
                        onClick={handleSearch}
                        variant="primary"
                    />
                </div>
            </div>

            {isFetching ? (
                <UniversalSkeleton height="35rem" width="100%" />
            ) : (
                <Paper sx={{ height: 558 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        rowHeight={45}
                        slots={{ footer: CustomFooter, noRowsOverlay: CustomNoRowsOverlay }}
                        slotProps={{ footer: { totalRecords: rows.length } }}
                        onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
                        disableRowSelectionOnClick
                        // disableColumnResize
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
            )}
        </div>
    );
};

export default CampaignDetailsReports;