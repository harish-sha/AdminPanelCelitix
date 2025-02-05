import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { DataGrid, GridFooterContainer, GridPagination } from '@mui/x-data-grid';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Paper, Typography, Box, Button } from '@mui/material';


const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
});

const CustomPagination = ({ totalPages, paginationModel, setPaginationModel }) => {
    const { items } = usePagination({
        count: totalPages,
        page: paginationModel.page + 1,
        onChange: (_, newPage) => setPaginationModel({ ...paginationModel, page: newPage - 1 }),
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
                            <Button key={index} variant="outlined" size="small" {...item} sx={{}} >
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

const ManageCampaignTable = ({ id, name, handleView, handleDuplicate, handleDelete }) => {
    const [selectedRows, setSelectedRows] = React.useState([]);

    // const paginationModel = { page: 0, pageSize: 10 };
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });

    const columns = [
        { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
        { field: 'createdOn', headerName: 'Created On', flex: 1, minWidth: 120 },
        { field: 'campaignName', headerName: 'Campaign Name', flex: 1, minWidth: 120 },
        { field: 'templateName', headerName: 'Template Name', flex: 1, minWidth: 120 },
        { field: 'templateCategory', headerName: 'Template Category', flex: 1, minWidth: 120 },
        { field: 'templateType', headerName: 'Template Type', flex: 1, minWidth: 120 },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
        { field: 'totalAudience', headerName: 'Total Audience', flex: 1, minWidth: 120 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <>
                    <IconButton className='text-xs' onClick={() => handleView(params.row)}>
                        <InfoOutlinedIcon
                            sx={{
                                fontSize: '1.2rem',
                                color: 'green'
                            }}
                        />
                    </IconButton>
                    <IconButton onClick={() => handleDuplicate(params.row)}>
                        <DescriptionOutlinedIcon
                            sx={{
                                fontSize: '1.2rem',
                                color: 'gray',
                            }} />
                    </IconButton>
                </>
            ),
        },
    ];

    const rows = [
        { id: 1, sn: 1, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 2, sn: 2, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 3, sn: 3, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 4, sn: 4, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 5, sn: 5, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 6, sn: 6, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 7, sn: 7, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 8, sn: 8, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 9, sn: 9, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 10, sn: 10, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 11, sn: 11, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 12, sn: 12, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 13, sn: 13, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 14, sn: 14, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 15, sn: 14, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 16, sn: 16, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 17, sn: 17, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 18, sn: 18, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 19, sn: 19, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },
        { id: 20, sn: 20, createdOn: '11/05/2024 14:58:39', campaignName: 'Demo', templateName: 'NewTemplate', templateCategory: 'Utility', templateType: 'Text', status: 'Pending', totalAudience: '10000', action: 'True' },

    ];

    // use this when you want to create rows dynamically
    // const rows = Array.from({ length: 500 }, (_, i) => ({
    //     id: i + 1,
    //     sn: i + 1,
    //     createdOn: '11/05/2024 14:58:39',
    //     campaignName: 'Demo',
    //     templateName: 'NewTemplate',
    //     templateCategory: 'Utility',
    //     templateType: 'Text',
    //     status: 'Pending',
    //     totalAudience: '10000',
    //     action: 'True',
    // }));

    const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

    const CustomFooter = () => {
        return (
            <GridFooterContainer
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: {
                        xs: "center", lg: "space-between"
                    },
                    alignItems: "center",
                    padding: 1,
                    gap: 2,
                    overflowX: "auto",
                }
                }
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
                        Total Records: <span className='font-semibold'>{rows.length}</span>
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
            </GridFooterContainer >
        );
    };


    return (
        <Paper sx={{ height: 558 }}>
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
                checkboxSelection
                rowHeight={45}
                slots={{ footer: CustomFooter }}
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