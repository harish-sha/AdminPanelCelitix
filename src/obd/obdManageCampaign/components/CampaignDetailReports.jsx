import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    DataGrid,
    GridFooterContainer,
    GridPagination,
} from "@mui/x-data-grid";
import {
    Paper,
    Typography,
    Box,
    Button,
    IconButton,
    Popper,
} from "@mui/material";
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
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import CustomTooltip from "@/components/common/CustomTooltip";
import { ImInfo } from "react-icons/im";
import InfoPopover from "@/components/common/InfoPopover.jsx";



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

    console.log("paginaltionModal", paginationModel);
    console.log("totalPages", totalPages);

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

const CampaignDetailsReports = (
    {
        // setSelectedRows,
        // selectedRows,
    }
) => {
    const location = useLocation();
    const { campaignSrNo, name } = location.state || {};
    const [selectedRows, setSelectedRows] = useState([]);
    const [campaignDetails, setCampaignDetails] = useState(null);
    const [deliveryStatus, setDeliveryStatus] = useState("");
    console.log("deliveryStatus", deliveryStatus)
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
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
            console.log("campaign details report data", data);
            setCampaignDetails(data?.data);
        };
        fetchCampaignData();
    }, []);

    console.log("campaignDetails", campaignDetails)

    const handleSearch = async () => {
        setIsFetching(true);

        setTimeout(() => {
            let filtered = campaignDetails;

            // Apply filtering only when one or both filters are provided
            if (mobileNumber?.trim() || deliveryStatus?.trim()) {
                filtered = campaignDetails.filter((item) => {
                    const matchesMobile =
                        !mobileNumber?.trim() || item.mobileNo?.includes(mobileNumber.trim());

                        console.log("matchesMobile", matchesMobile)
                    const matchesDelivery =
                        !deliveryStatus?.trim() ||
                        item?.deliveryStatus?.toLowerCase() === deliveryStatus?.toLowerCase();

                    console.log("matchesDelivery", matchesDelivery)
                    return matchesMobile && matchesDelivery;
                    
                });
            }

            setFilteredCampaigns(filtered);
            setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
            setCurrentPage(1);
            setIsFetching(false);
        }, 500);
    };


    const dropdownButtonRefs = useRef({});
    const [dropdownOpenId, setDropdownOpenId] = useState(null);
    const [clicked, setClicked] = useState({});
    const additionalInfoLabels = {
        // Example mapping: 'queuedate': 'Queue Date'
    };

    const infoFieldsToShow = [
        "sentTime",
        "deliveryTime",
        "queTime",
    ];

    const handleInfo = (row) => {
        setClicked(row);
        setDropdownOpenId(row.id);
    };

    const closeDropdown = () => {
        setDropdownOpenId(null);
    };



    const columns = [
        { field: "sn", headerName: "S.No", flex: 0, width: 60 },
        // { field: 'campaignName', headerName: 'Campaign Name', flex: 1, minWidth: 150 },
        { field: "mobileNumber", headerName: "Mobile No", flex: 1, minWidth: 120 },
        {
            field: "campaignType",
            headerName: "Campaign Type",
            flex: 1,
            minWidth: 120,
        },
        { field: "voiceType", headerName: "Voice Type", flex: 1, minWidth: 120 },
        {
            field: "deliveryStatus",
            headerName: "Delivery Status",
            flex: 1,
            minWidth: 130,
        },
        { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
        // {
        //     field: "processFlag",
        //     headerName: "Process Flag",
        //     flex: 1,
        //     minWidth: 120,
        // },
        // { field: "queTime", headerName: "Que Time", flex: 1, minWidth: 130 },
        // {
        //     field: "deliveryTime",
        //     headerName: "Delivery Time",
        //     flex: 1,
        //     minWidth: 130,
        // },
        // { field: "sentTime", headerName: "Sent Time", flex: 1, minWidth: 130 },
        { field: "unit", headerName: "Unit", flex: 0, width: 100 },
        { field: "retryCount", headerName: "Retry Count", flex: 1, minWidth: 60 },
        {
            field: "chargedUnit",
            headerName: "Charged Unit",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "callDuration",
            headerName: "Call Duration",
            flex: 1,
            minWidth: 120,
        },
        // { field: 'source', headerName: 'Source', flex: 1, minWidth: 120 },
        {
            field: "action",
            headerName: "Action",
            flex: 0,
            minWidth: 100,
            renderCell: (params) => (
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
                            <ImInfo size={18} className="text-green-500" />
                        </IconButton>

                        <InfoPopover
                            anchorEl={dropdownButtonRefs.current[params.row.id]}
                            open={dropdownOpenId === params.row.id}
                            onClose={closeDropdown}
                        >
                            {clicked && Object.keys(clicked).length > 0 ? (
                                <table className="w-80 text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                                    <tbody>
                                        {Object.entries(clicked)
                                            .filter(([key]) => infoFieldsToShow.includes(key))
                                            .map(([key, value], index) => (
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
            ),
        },
    ];

    const rowsSource = filteredCampaigns.length > 0 ? filteredCampaigns : campaignDetails;

    console.log("rowsSource", rowsSource)

    const rows = Array.isArray(rowsSource)
        ? rowsSource?.map((item, index) => ({
            id: index + 1,
            sn: index + 1,
            campaignName: item.campaignName,
            mobileNumber: item.mobileNo,
            campaignType: item.campaignType,
            unit: item.unit,
            chargedUnit: item.chargedUnit,
            deliveryStatus: item.deliveryStatus,
            status: item.status,
            queTime: item.queTime,
            deliveryTime: item.deliveryTime,
            sentTime: item.sentTime,
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
                            ? "Completed"
                            : item.processFlag === 4
                                ? "Cancelled"
                                : "" || "N/A",
        }))
        : [];

    const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

    const pageSize = paginationModel.pageSize;
    const currentPageIndex = paginationModel.page;

    const paginatedRows = rows.slice(
        currentPageIndex * pageSize,
        currentPageIndex * pageSize + pageSize
    );

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
                        Total Records: <span className="font-semibold">{rowsSource?.length}</span>
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

    // function handlePage() {
    //     setCurrentPage(currentPage + 1);
    // }

    return (
        <div className="w-full">
            <div>
                <h1 className="mb-4 font-semibold text-center text-green-600 lg:text-lg text-md">
                    <CampaignOutlinedIcon fontSize="medium" sx={{ fontSize: "1.8rem" }} />
                    &nbsp; OBD Campaign Detail Report - {name}
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
                <div className="w-max-content">
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
                        rows={paginatedRows}
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
