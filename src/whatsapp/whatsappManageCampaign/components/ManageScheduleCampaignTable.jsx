import * as React from "react";
import { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from '@mui/icons-material/Close';
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
    cancelCampaign,
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
import toast from "react-hot-toast";

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

const ManageScheduleCampaignTable = ({ id, name, data = [], fromDate, fetchInitialData }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [dropdownOpenId, setDropdownOpenId] = useState(null);
    const [campaignInfo, setCampaignInfo] = useState(null);
    const [campaignInfoMap, setCampaignInfoMap] = useState({});

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

        const fromDateStr = new Date(fromDate).toLocaleDateString("en-GB");
        const formattedDate = fromDateStr.replace(/\//g, "-");

        const data = {
            campSrno: row?.campaignSrno,
            fromDate: formattedDate,
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

    const handleCancel = async (row) => {

        const srno = row.srno;
        console.log("srno", srno)
        console.log("row", row)
        const selectedUserId = 0;

        try {
            const result = await cancelCampaign({ srno, selectedUserId });
            if (result) {
                console.log("Campaign cancelled successfully:", result);
                toast.success("Campaign Cancelled successfully");
                fetchInitialData()
            } else {
                console.warn("Cancel request failed or returned empty response.");
                toast.error("Cancel request failed")
            }
        } catch (error) {
            console.error("Error cancelling campaign:", error);
        }
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
        { field: "sentTime", headerName: "Sent Time", flex: 1, minWidth: 120 },
        {
            field: "campaignName",
            headerName: "Campaign Name",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "campaignDate",
            headerName: "Campaign Date",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "count",
            headerName: "Count",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => {
                return (
                    <>
                        <CustomTooltip title="Cancel Campaign" placement="top" arrow>
                            <IconButton onClick={() => handleCancel(params.row)}>
                                <CloseIcon sx={{ fontSize: "1.2rem", color: "red" }} />
                            </IconButton>
                        </CustomTooltip>

                    </>
                )
            },
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
            srno: item.srno,
            sentTime: item.sentTime || "N/A",
            campaignName: item.campaignName || "N/A",
            campaignDate: item.campaignDate || "N/A",
            count: item.count || "N/A",
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

export default ManageScheduleCampaignTable;