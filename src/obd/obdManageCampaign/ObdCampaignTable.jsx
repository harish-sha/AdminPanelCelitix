import React, { useState } from 'react'
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid';
import { Paper, Typography, Box, Button } from '@mui/material';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import CustomNoRowsOverlay from '../../components/common/CustomNoRowsOverlay';
import CustomNoRowsOverlay from '@/whatsapp/components/CustomNoRowsOverlay';


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

const ObdCampaignTable = (id) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    const columns = [
        { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
        { field: 'campaignName', headerName: 'Campaign Name', flex: 1, minWidth: 120 },
        { field: 'type', headerName: 'Type', flex: 1, minWidth: 120 },
        { field: 'template', headerName: 'Template', flex: 1, minWidth: 120 },
        { field: 'date', headerName: 'Date', flex: 1, minWidth: 120 },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <>
                    <IconButton className='text-xs' onClick={() => handleView(params.row)}>
                        <VisibilityIcon
                            sx={{
                                fontSize: '1.2rem',
                                color: 'green'
                            }}
                        />
                    </IconButton>
                    <IconButton onClick={() => handleDuplicate(params.row)}>
                        <FileCopyIcon
                            sx={{
                                fontSize: '1.2rem',
                                color: 'gray',
                            }} />
                    </IconButton>
                    <IconButton onClick={(event) => handleDelete(event, params.row)}>
                        <DeleteForeverIcon
                            sx={{
                                fontSize: '1.2rem',
                                color: '#e31a1a',
                            }} />
                    </IconButton>
                </>
            ),
        },
    ];


    const rows = [
        {
            id: 1,
            sn: 1,
            campaignName: 'diwali',
            type: 'Transactional',
            template: 'Simple Broadcast',
            date: '12/10/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 2,
            sn: 2,
            campaignName: 'holi',
            type: 'Promotional',
            template: 'Text-2-Speech',
            date: '13/10/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 3,
            sn: 3,
            campaignName: 'christmas',
            type: 'Transactional',
            template: 'Simple Broadcast',
            date: '15/10/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 4,
            sn: 4,
            campaignName: 'easter',
            type: 'Promotional',
            template: 'Multi Broadcast',
            date: '13/10/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 5,
            sn: 5,
            campaignName: 'new year',
            type: 'Transactional',
            template: 'Simple Broadcast',
            date: '01/01/2025',
            status: 'Success',
            action: 'True',
        },
        {
            id: 6,
            sn: 6,
            campaignName: 'thanksgiving',
            type: 'Promotional',
            template: 'Text-2-Speech',
            date: '25/11/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 7,
            sn: 7,
            campaignName: 'eid',
            type: 'Transactional',
            template: 'Multi Broadcast',
            date: '10/04/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 8,
            sn: 8,
            campaignName: 'halloween',
            type: 'Promotional',
            template: 'Simple Broadcast',
            date: '31/10/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 9,
            sn: 9,
            campaignName: 'rakhi',
            type: 'Transactional',
            template: 'Multi Broadcast',
            date: '19/08/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 10,
            sn: 10,
            campaignName: 'pongal',
            type: 'Promotional',
            template: 'Text-2-Speech',
            date: '14/01/2025',
            status: 'Success',
            action: 'True',
        },
        {
            id: 11,
            sn: 11,
            campaignName: 'lohri',
            type: 'Transactional',
            template: 'Simple Broadcast',
            date: '13/01/2025',
            status: 'Success',
            action: 'True',
        },
        {
            id: 12,
            sn: 12,
            campaignName: 'navratri',
            type: 'Promotional',
            template: 'Multi Broadcast',
            date: '03/10/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 13,
            sn: 13,
            campaignName: 'guru purab',
            type: 'Transactional',
            template: 'Text-2-Speech',
            date: '08/11/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 14,
            sn: 14,
            campaignName: 'valentine’s day',
            type: 'Promotional',
            template: 'Simple Broadcast',
            date: '14/02/2025',
            status: 'Success',
            action: 'True',
        },
        {
            id: 15,
            sn: 15,
            campaignName: 'independence day',
            type: 'Transactional',
            template: 'Multi Broadcast',
            date: '15/08/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 16,
            sn: 16,
            campaignName: 'republic day',
            type: 'Promotional',
            template: 'Text-2-Speech',
            date: '26/01/2025',
            status: 'Success',
            action: 'True',
        },
        {
            id: 17,
            sn: 17,
            campaignName: 'ganesh chaturthi',
            type: 'Transactional',
            template: 'Simple Broadcast',
            date: '07/09/2024',
            status: 'Success',
            action: 'True',
        },
        {
            id: 18,
            sn: 18,
            campaignName: 'baisakhi',
            type: 'Promotional',
            template: 'Multi Broadcast',
            date: '14/04/2024',
            status: 'Success',
            action: 'True',
        }
    ];




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
    )
}

export default ObdCampaignTable
