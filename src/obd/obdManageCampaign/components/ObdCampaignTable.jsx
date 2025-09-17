import React, { useState, useRef, useEffect } from "react";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { Paper, Typography, Box, Button } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
// import VisibilityIcon from '@mui/icons-material/Visibility';
import FileCopyIcon from "@mui/icons-material/FileCopy";
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { viewObdCampaignDetails } from "@/apis/obd/obd.js";
import moment from "moment";

import { useNavigate } from "react-router-dom";
import CustomTooltip from "@/components/common/CustomTooltip";
import InfoPopover from "@/components/common/InfoPopover";

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

const ObdCampaignTable = ({
    id,
    name,
    data,
    fetchCampaignReportsdata,
    filterData,
}) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const dropdownButtonRefs = useRef({});
    const [dropdownOpenId, setDropdownOpenId] = useState(null);
    const [campaignInfo, setCampaignInfo] = useState(null);
    const [campaignInfoMap, setCampaignInfoMap] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

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

    useEffect(() => {
        if (Object.keys(filterData)?.length > 0) {
            fetchCampaignReportsdata({ ...filterData, page: currentPage });
        }
    }, [currentPage]);

    const handleView = async (row) => {
        const id = row.id;

        // Reset for this row
        setDropdownOpenId(null);

        // const fromDateStr = moment(fromDate).format("YYYY-MM-DD");
        // const formattedDate = fromDateStr.replace(/\//g, "-");

        // const data = {
        //   campSrno: row?.campaignSrno,
        //   fromDate: fromDateStr,
        // };

        let campaignSrno = id;
        try {
            const res = await viewObdCampaignDetails(campaignSrno);

            setCampaignInfoMap((prev) => ({
                ...prev,
                [id]: res[0] || null,
            }));

            setDropdownOpenId(id);
        } catch (e) {
            console.error("Error fetching campaign summary:", e);
        }
    };

    const handleDetailLogs = (row) => {
        navigate("/obdCampaignDetailslog", {
            state: {
                campaignSrNo: row.id,
                id: "Obddetaillogs",
                name: row.campaignName,
            },
        });
    };

    const columns = [
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
        {
            field: "campaignName",
            headerName: "Campaign Name",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "campaignType",
            headerName: "Campaign Type",
            flex: 1,
            minWidth: 120,
        },
        { field: "voiceType", headerName: "Voice Type", flex: 1, minWidth: 120 },
        { field: "date", headerName: "Date", flex: 1, minWidth: 120 },
        { field: "processFlag", headerName: "Status", flex: 1, minWidth: 120 },
        { field: "total", headerName: "Total Audience", flex: 1, minWidth: 120 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <>
                    <CustomTooltip title="View Campaign" placement="top" arrow>
                        <IconButton
                            className="text-xs"
                            ref={(el) => (dropdownButtonRefs.current[params.row.id] = el)}
                            onClick={() => handleView(params.row)}
                        >
                            <InfoOutlinedIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "green",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>

                    <InfoPopover
                        anchorEl={dropdownButtonRefs.current[params.row.id]}
                        open={dropdownOpenId === params.row.id}
                        onClose={closeDropdown}
                    >
                        {campaignInfoMap[params.row.id] ? (
                            <div className="w-[280px] max-w-full">
                                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                                    {[
                                        "pending",
                                        "busy",
                                        "sent",
                                        "answered",
                                        "notAnswered",
                                        "unDelivered",
                                        // "failed",
                                        // "smsCount",
                                        // "totalChargedUnit",
                                        // "unDelivered",
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
                        <IconButton onClick={() => handleDetailLogs(params.row)}>
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

    const pageSize = paginationModel.pageSize;
    const currentPageIndex = paginationModel.page;

    const rows = Array.isArray(data?.Data)
        ? data.Data
            .sort((a, b) => new Date(b.quetimeS) - new Date(a.quetimeS))
            .map((item, index) => ({
                id: item.campaignSrno,
                sn: currentPageIndex * pageSize + (index + 1),
                campaignName: item.campaignName || "N/A",
                campaignType:
                    item.campaignType === "SB"
                        ? "Simple Broadcasting"
                        : item.campaignType === "MB"
                            ? "Multi Broadcasting"
                            : item.campaignType === "TTS"
                                ? "Text To Speech"
                                : item.campaignType === "Dynamic" || item.campaignType === "DB"
                                    ? "Dynamic Broadcasting"
                                    : "" || "-",
                total: item.total || "N/A",
                voiceType:
                    item.voiceType === 1
                        ? "Transactional"
                        : item.voiceType === 2
                            ? "Promotional"
                            : "" || "N/A",
                date: item.quetimeS || "N/A",
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
                // campaignSrno: item.campaignSrno,
            }))
        : [];

    const total = data?.total || 0;

    const totalPages = Math.ceil(total / paginationModel.pageSize);

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
                        Total Records: <span className="font-semibold">{total}</span>
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

    return (
        <Paper sx={{ height: 558 }}>
            <DataGrid
                id={id}
                name={name}
                rows={rows}
                columns={columns}
                // initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 20, 50]}
                // pagination
                // paginationModel={paginationModel}
                // onPaginationModelChange={setPaginationModel}
                // checkboxSelection
                rowHeight={45}
                slots={{
                    footer: CustomFooter,
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
                slotProps={{ footer: { totalRecords: total } }}
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

export default ObdCampaignTable;
