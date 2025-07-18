import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    DataGrid,
    GridFooterContainer,
    GridPagination,
} from "@mui/x-data-grid";
import { Paper, Typography, Box, Button } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

import { getWhatsappCampaignDetailsReport } from "../../apis/whatsapp/whatsapp.js";
import InputField from "../../components/layout/InputField.jsx";
import AnimatedDropdown from "../components/AnimatedDropdown.jsx";
import { IoSearch } from "react-icons/io5";
import UniversalButton from "../components/UniversalButton.jsx";
import toast from "react-hot-toast";
import UniversalSkeleton from "../components/UniversalSkeleton.jsx";
import CustomNoRowsOverlay from "../components/CustomNoRowsOverlay.jsx";
import { PaginationTable } from "@/components/layout/PaginationTable.jsx";
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

const CampaignDetailsReport = () => {
    const location = useLocation();
    const { campaignSrno, campaignName } = location.state || {};

    const [selectedRows, setSelectedRows] = useState([]);
    const [campaignDetails, setCampaignDetails] = useState([]);
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
    //     const fetchData = async () => {
    //         const body = {
    //             campSrno: campaignSrno,
    //             mobno: mobileNumber || "",
    //             status: "status",
    //             delStatus: deliveryStatus || "",
    //             page: currentPage,
    //         };
    //         console.log(body)
    //         const data = await getWhatsappCampaignDetailsReport(body);
    //         setCampaignDetails(data.data);
    //         setTotalPage(data.total);
    //     };
    //     fetchData();
    // }, [campaignSrno, currentPage]);

    const fetchData = async () => {
        try {
            setIsFetching(true)
            const body = {
                campSrno: campaignSrno,
                mobno: mobileNumber,
                status: "status",
                page: currentPage,
                delStatus: deliveryStatus || "",
            };
            const data = await getWhatsappCampaignDetailsReport(body);
            setCampaignDetails(data.data);
            setTotalPage(data.total);
        } catch (error) {
            toast.error("failed to laod details!")
        } finally {
            setIsFetching(false)
        }
    };

    useEffect(() => {
        if (!campaignSrno) return;

        fetchData();
    }, [campaignSrno, currentPage]);

    const handleSearch = async () => {
        setIsFetching(true);
        await fetchData();
        setIsFetching(false);
    };

    const columns = [
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
        // { field: "wabaNumber", headerName: "WABA Number", width: 150 },
        { field: "mobileNo", headerName: "Mobile Number", flex: 1, minWidth: 150 },
        { field: "status", headerName: "Status", flex: 0, minWidth: 120 },
        {
            field: "deliveryStatus",
            headerName: "Delivery Status",
            flex: 1,
            minWidth: 150,
        },
        { field: "sentTime", headerName: "Sent Time", flex: 1, minWidth: 150 },
        {
            field: "deliveryTime",
            headerName: "Delivery Time",
            flex: 1,
            minWidth: 150,
        },
        { field: "readTime", headerName: "Read Time", flex: 1, minWidth: 150 },
        { field: "reason", headerName: "Reason", flex: 1, minWidth: 150 },
    ];

    const rows = campaignDetails?.map((item, index) => ({
        id: index + 1,
        // srNo: item.srNo || "N/A",
        sn: index + 1,
        // wabaNumber: item.wabaNumber || "N/A",
        mobileNo: item.mobileNo || "N/A",
        status: item.status || "N/A",
        // sentTime: moment(item.sentTime).format("YYYY-MM-DD HH:mm:ss") || "-",
        sentTime: item.sentTime || "-",
        deliveryTime: item.deliveryTime || "-",
        readTime: item.readTime || "-",
        deliveryStatus: item.deliveryStatus || "-",
        reason: item.reason || "-",
    }));

    const totalPages = Math.ceil(totalPage / paginationModel.pageSize);

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
    // function handlePag() {
    //     setCurrentPage(currentPage + 1);
    // }
    return (
        <div className="w-full">
            {/* <button onClick={handlePag}>Click</button> */}
            <div>
                <h1 className="mb-4 font-semibold text-center text-green-600 lg:text-lg text-md">
                    <CampaignOutlinedIcon fontSize="medium" sx={{ fontSize: "1.8rem" }} />{" "}
                    Campaign Detail Report - {campaignName}
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
                            // { value: "clicked", label: "Clicked" },
                            { value: "read", label: "Read" },
                            { value: "failed", label: "Failed" },
                        ]}
                        value={deliveryStatus}
                        onChange={setDeliveryStatus}
                        placeholder="Select Status"
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
                <PaginationTable
                    id={"detailsReport"}
                    name={"detailsReport"}
                    col={columns}
                    rows={rows}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                />
            )}

            {/* {isFetching ? (
                <UniversalSkeleton height="35rem" width="100%" />
            ) : (
                <Paper sx={{ height: 558 }}>
                    <DataGrid
                        // id={id}
                        // name={name}
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        // checkboxSelection
                        rowHeight={45}
                        slots={{ footer: CustomFooter, noRowsOverlay: CustomNoRowsOverlay }}
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
            )} */}
        </div>
    );
};

export default CampaignDetailsReport;