import { useState } from 'react';
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid';
import { Paper, Typography, Box, Button } from '@mui/material';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
// import CustomNoRowsOverlay from '../../components/common/CustomNoRowsOverlay';
import CustomNoRowsOverlay from '@/whatsapp/components/CustomNoRowsOverlay';



import React from 'react'

const ObdDaySummaryTable = (id, name) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    const rows = [
        {
            sn: 1,
            id: 1,
            date: "20/03/2025",
            totalunits: "3",
            blocked: "0",
            totalsent: "1",
            success: "1",
            failed: "1"
        },
        {
            sn: 2,
            id: 2,
            date: "21/03/2025",
            totalunits: "5",
            blocked: "2",
            totalsent: "3",
            success: "2",
            failed: "3"
        },
        {
            sn: 3,
            id: 3,
            date: "22/03/2025",
            totalunits: "6",
            blocked: "1",
            totalsent: "5",
            success: "4",
            failed: "2"
        },
        {
            sn: 4,
            id: 4,
            date: "23/03/2025",
            totalunits: "7",
            blocked: "2",
            totalsent: "5",
            success: "3",
            failed: "4"
        },
        {
            sn: 5,
            id: 5,
            date: "24/03/2025",
            totalunits: "4",
            blocked: "0",
            totalsent: "4",
            success: "3",
            failed: "1"
        },
        {
            sn: 6,
            id: 6,
            date: "25/03/2025",
            totalunits: "8",
            blocked: "3",
            totalsent: "5",
            success: "4",
            failed: "4"
        },
        {
            sn: 7,
            id: 7,
            date: "26/03/2025",
            totalunits: "6",
            blocked: "2",
            totalsent: "4",
            success: "2",
            failed: "4"
        },
        {
            sn: 8,
            id: 8,
            date: "27/03/2025",
            totalunits: "9",
            blocked: "1",
            totalsent: "8",
            success: "7",
            failed: "2"
        },
        {
            sn: 9,
            id: 9,
            date: "28/03/2025",
            totalunits: "10",
            blocked: "3",
            totalsent: "7",
            success: "5",
            failed: "5"
        },
        {
            sn: 10,
            id: 10,
            date: "29/03/2025",
            totalunits: "5",
            blocked: "1",
            totalsent: "4",
            success: "3",
            failed: "2"
        },
        {
            sn: 11,
            id: 11,
            date: "30/03/2025",
            totalunits: "7",
            blocked: "2",
            totalsent: "5",
            success: "4",
            failed: "3"
        },
        {
            sn: 12,
            id: 12,
            date: "31/03/2025",
            totalunits: "6",
            blocked: "1",
            totalsent: "5",
            success: "4",
            failed: "2"
        },
        {
            sn: 13,
            id: 13,
            date: "01/04/2025",
            totalunits: "8",
            blocked: "2",
            totalsent: "6",
            success: "5",
            failed: "3"
        },
        {
            sn: 14,
            id: 14,
            date: "02/04/2025",
            totalunits: "9",
            blocked: "3",
            totalsent: "6",
            success: "5",
            failed: "4"
        },
        {
            sn: 15,
            id: 15,
            date: "03/04/2025",
            totalunits: "7",
            blocked: "2",
            totalsent: "5",
            success: "3",
            failed: "4"
        }
    ];

    const columns = [
        { field: 'sn', headerName: 'S.No', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'totalunits', headerName: 'Total Units', flex: 1 },
        { field: 'totalsent', headerName: 'Total Sent', flex: 1 },
        { field: 'success', headerName: 'Success', flex: 1 },
        { field: 'failed', headerName: 'Failed', flex: 1 }
    ]


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
        <div>
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
        </div>
    )
}

export default ObdDaySummaryTable
