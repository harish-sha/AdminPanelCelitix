import React, { useEffect, useState } from "react";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { Paper, Typography, Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { getCampaignReport } from "../../apis/whatsapp/whatsapp"; // Import API function

const ManageCampaignTable = ({ handleView, handleDuplicate }) => {
    const [campaignData, setCampaignData] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    // Fetch Campaign Data
    useEffect(() => {
        const fetchData = async () => {
            const data = await getCampaignReport();
            setCampaignData(data);
        };
        fetchData();
    }, []);

    // Table Columns
    const columns = [
        { field: "sn", headerName: "S.No", flex: 0.5, minWidth: 80 },
        { field: "queTime", headerName: "Created On", flex: 1, minWidth: 150 },
        { field: "campaignName", headerName: "Campaign Name", flex: 1.5, minWidth: 150 },
        { field: "templateName", headerName: "Template Name", flex: 1.5, minWidth: 150 },
        { field: "templateCategory", headerName: "Template Category", flex: 1, minWidth: 120 },
        { field: "templateType", headerName: "Template Type", flex: 1, minWidth: 120 },
        { field: "status", headerName: "Status", flex: 1, minWidth: 100 },
        { field: "totalAudience", headerName: "Total Audience", flex: 1, minWidth: 120 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleView(params.row)}>
                        <InfoOutlinedIcon sx={{ fontSize: "1.2rem", color: "green" }} />
                    </IconButton>
                    <IconButton onClick={() => handleDuplicate(params.row)}>
                        <DescriptionOutlinedIcon sx={{ fontSize: "1.2rem", color: "gray" }} />
                    </IconButton>
                </>
            ),
        },
    ];

    // Convert API data into rows with a unique ID
    const rows = campaignData.map((item, index) => ({
        id: index + 1, // Unique ID for DataGrid
        sn: index + 1,
        queTime: item.queTime || "N/A",
        campaignName: item.campaignName || "N/A",
        templateName: item.templateName || "N/A",
        templateCategory: item.templateCategory || "N/A",
        templateType: item.templateType || "N/A",
        status: item.status || "N/A",
        totalAudience: item.totalAudience || "0",
        action: "Actions",
    }));

    const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

    return (
        <Paper sx={{ height: 558 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[10, 20, 50]}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rowHeight={45}
                sx={{
                    border: 0,
                    "& .MuiDataGrid-columnHeaders": { color: "#193cb8", fontSize: "14px", fontWeight: "bold" },
                    "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
                }}
            />
        </Paper>
    );
};

export default ManageCampaignTable;
