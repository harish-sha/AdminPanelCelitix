import { Box, Button, Paper, Typography } from '@mui/material'
import usePagination from '@mui/material/usePagination/usePagination';
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid'
import React, { useState } from 'react'
import styled from 'styled-components';
import CustomTooltip from '../../whatsapp/components/CustomTooltip';
import CustomNoRowsOverlay from '../../whatsapp/components/CustomNoRowsOverlay';

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
const IVRFlowIBD = ({ id, name }) => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [selectedRows, setSelectedRows] = useState([]);
    const columns = [
        { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 100 },
        { field: 'displaynumber', headerName: 'Display Number', flex: 1, minWidth: 140 },
        { field: 'from', headerName: 'From', flex: 1, minWidth: 90 },
        { field: 'to', headerName: 'To', flex: 1, minWidth: 80 },
        { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: 100 },
        { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: 80 },
        { field: 'duration', headerName: 'Duration', flex: 1, minWidth: 100 },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 80 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <>
                    {/* <CustomTooltip
                    title="Play"
                    placement="top"
                    arrow
                >
                    <IconButton onClick={() => handlePlay(params.row)}>
                        <PlayCircleOutlineOutlinedIcon
                            sx={{
                                fontSize: '1.2rem',
                                color: 'gray',
                            }} />
                    </IconButton>
                </CustomTooltip> */}

                </>
            ),
        },
    ];

    const rows = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        sn: i + 1,
        displaynumber: '1102584632',
        from: '8524569852',
        to: '7425863256',
        starttime: '14:58:08',
        endtime: '15:58:08',
        duration: '22-09-2023',
        status: 'Failed',
    }));

    const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

    const CustomFooter = () => {
        return (
            <GridFooterContainer sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", lg: "space-between" },
                alignItems: "center",
                padding: 1,
                gap: 2,
                overflowX: "auto",
            }}>
                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
                    {selectedRows.length > 0 && (
                        <Typography variant="body2" sx={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}>
                            {selectedRows.length} Rows Selected
                        </Typography>
                    )}

                    <Typography variant="body2">
                        Total Records: <span className='font-semibold'>{rows.length}</span>
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", width: { xs: "100%", sm: "auto" } }}>
                    <CustomPagination totalPages={totalPages} paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
                </Box>
            </GridFooterContainer>
        );
    };
    return (
        <div>
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
                    rowHeight={45}
                    slots={{
                        footer: CustomFooter,
                        noRowsOverlay: CustomNoRowsOverlay,
                    }}
                    onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    disableColumnResize
                    disableColumnMenu
                    sx={{
                        border: 0,
                        "& .MuiDataGrid-cell": { outline: "none !important" },
                        "& .MuiDataGrid-columnHeaders": { color: "#193cb8", fontSize: "14px", fontWeight: "bold !important" },
                        "& .MuiDataGrid-row--borderBottom": { backgroundColor: "#e6f4ff !important" },
                        "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
                    }}
                />
            </Paper>
        </div>
    )
}

export default IVRFlowIBD