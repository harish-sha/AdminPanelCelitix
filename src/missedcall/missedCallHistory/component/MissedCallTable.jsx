import { useState } from 'react';
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid';
import { Paper, Typography, Box, Button } from '@mui/material';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
// import CustomNoRowsOverlay from '../../components/common/CustomNoRowsOverlay';
import CustomNoRowsOverlay from '@/whatsapp/components/CustomNoRowsOverlay';



import React from 'react'

const MissedCallTable = (id, name) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });



    const rows = [
        {
            sno: 1,
            id: 1,
            missedcallno: "9852365478",
            fromno: "7845632569",
            operator: "Jio",
            circle: "Gujarat",
            externalstatus: "Yes",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 2,
            id: 2,
            missedcallno: "9852365478",
            fromno: "7845632569",
            operator: "Airtel",
            circle: "Rajasthan",
            externalstatus: "No",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 3,
            id: 3,
            missedcallno: "9714685749",
            fromno: "756931658",
            operator: "Vodafone",
            circle: "Mumbai",
            externalstatus: "Yes",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 4,
            id: 4,
            missedcallno: "9854761234",
            fromno: "7845698741",
            operator: "BSNL",
            circle: "Delhi",
            externalstatus: "No",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 5,
            id: 5,
            missedcallno: "9786543210",
            fromno: "7896541230",
            operator: "Jio",
            circle: "Maharashtra",
            externalstatus: "Yes",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 6,
            id: 6,
            missedcallno: "9823546712",
            fromno: "7456123987",
            operator: "Airtel",
            circle: "Punjab",
            externalstatus: "No",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 7,
            id: 7,
            missedcallno: "9812345678",
            fromno: "7986541236",
            operator: "Vodafone",
            circle: "Karnataka",
            externalstatus: "Yes",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 8,
            id: 8,
            missedcallno: "9954321876",
            fromno: "7845123698",
            operator: "BSNL",
            circle: "West Bengal",
            externalstatus: "No",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 9,
            id: 9,
            missedcallno: "9856231478",
            fromno: "7985612345",
            operator: "Jio",
            circle: "Tamil Nadu",
            externalstatus: "Yes",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 10,
            id: 10,
            missedcallno: "9741254789",
            fromno: "7564123987",
            operator: "Airtel",
            circle: "Uttar Pradesh",
            externalstatus: "No",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 11,
            id: 11,
            missedcallno: "9789456123",
            fromno: "7845123987",
            operator: "Vodafone",
            circle: "Madhya Pradesh",
            externalstatus: "Yes",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 12,
            id: 12,
            missedcallno: "9658741236",
            fromno: "7456982314",
            operator: "BSNL",
            circle: "Haryana",
            externalstatus: "No",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 13,
            id: 13,
            missedcallno: "9845236718",
            fromno: "7569321458",
            operator: "Jio",
            circle: "Kerala",
            externalstatus: "Yes",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 14,
            id: 14,
            missedcallno: "9785632147",
            fromno: "7845236987",
            operator: "Airtel",
            circle: "Bihar",
            externalstatus: "No",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 15,
            id: 15,
            missedcallno: "9857412365",
            fromno: "7985412639",
            operator: "Vodafone",
            circle: "Odisha",
            externalstatus: "Yes",
            externalresponse: "{Sample Data}"
        },
        {
            sno: 16,
            id: 16,
            missedcallno: "9745632897",
            fromno: "7456983214",
            operator: "BSNL",
            circle: "Assam",
            externalstatus: "No",
            externalresponse: "{Sample Data}"
        }
    ];



    const columns = [
        { field: 'sno', headerName: 'S.No', flex: 1 },
        { field: 'missedcallno', headerName: 'Missed Call No.', flex: 1 },
        { field: 'fromno', headerName: 'From No.', flex: 1 },
        { field: 'operator', headerName: 'operator', flex: 1 },
        { field: 'circle', headerName: 'circle', flex: 1 },
        { field: 'externalstatus', headerName: 'External Status', flex: 1 },
        { field: 'externalresponse', headerName: 'External Response', flex: 1 },
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

export default MissedCallTable
