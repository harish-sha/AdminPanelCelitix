import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import { DataGrid, GridFooterContainer, GridPagination } from '@mui/x-data-grid';
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

const DataTable = ({ id, name, handleView, handleDuplicate, handleDelete }) => {
    const [selectedRows, setSelectedRows] = React.useState([]);

    // const paginationModel = { page: 0, pageSize: 10 };
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });


    // const columns = [
    //     { field: 'sn', headerName: 'S.No', width: 100 },
    //     { field: 'name', headerName: 'Name', width: 180 },
    //     { field: 'category', headerName: 'Category', width: 180 },
    //     { field: 'status', headerName: 'Status', width: 150 },
    //     { field: 'type', headerName: 'Type', width: 150 },
    //     { field: 'health', headerName: 'Health', width: 180 },
    //     { field: 'createdat', headerName: 'Created At', width: 200 },
    //     {
    //         field: 'action',
    //         headerName: 'Action',
    //         width: 200,
    //         renderCell: (params) => (
    //             <>
    //                 <IconButton className='text-xs' onClick={() => handleView(params.row)}>
    //                     <VisibilityIcon
    //                         sx={{
    //                             fontSize: '1.2rem',
    //                             color: 'green'
    //                         }}
    //                     />
    //                 </IconButton>
    //                 <IconButton onClick={() => handleDuplicate(params.row)}>
    //                     <FileCopyIcon
    //                         sx={{
    //                             fontSize: '1.2rem',
    //                             color: 'gray',
    //                         }} />
    //                 </IconButton>
    //                 <IconButton onClick={() => handleDelete(params.row)}>
    //                     <DeleteForeverIcon
    //                         sx={{
    //                             fontSize: '1.2rem',
    //                             color: '#e31a1a',
    //                         }} />
    //                 </IconButton>
    //             </>
    //         ),
    //     },
    // ];

    const columns = [
        { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 120 },
        { field: 'category', headerName: 'Category', flex: 1, minWidth: 120 },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
        { field: 'type', headerName: 'Type', flex: 1, minWidth: 120 },
        { field: 'health', headerName: 'Health', flex: 1, minWidth: 120 },
        { field: 'createdat', headerName: 'Created At', flex: 1, minWidth: 120 },
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
                    <IconButton onClick={() => handleDelete(params.row)}>
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
        { id: 1, sn: 1, name: 'HoliWish', category: 'Utility', status: 'Rejected', type: 'Text', health: 'High', createdat: '11/05/2024', action: 'True' },
        { id: 2, sn: 2, name: 'NewYear', category: 'Marketing', status: 'Approved', type: 'Image', health: 'Low', createdat: '15/08/2024', action: 'True' },
        { id: 3, sn: 3, name: 'Diwali', category: 'Utility', status: 'Pending', type: 'Carousel', health: 'Poor', createdat: '10/06/2024', action: 'True' },
        { id: 4, sn: 4, name: 'Sms', category: 'Marketing', status: 'Approved', type: 'Video', health: 'Low', createdat: '10/07/2024', action: 'True' },
        { id: 5, sn: 5, name: 'WhatsappNew', category: 'Utility', status: 'Approved', type: 'Text', health: 'Low', createdat: '10/09/2024', action: 'True' },
        { id: 6, sn: 6, name: 'BillCategory', category: 'Authentication', status: 'Rejected', type: 'Image', health: 'High', createdat: '10/10/2024', action: 'Shyam' },
        { id: 7, sn: 7, name: 'Airlines', category: 'Sharma', status: 'Approved', type: 'Video', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 8, sn: 8, name: 'Communication', category: 'Utility', status: 'Pending', type: 'Image', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 9, sn: 9, name: 'MarketingNew', category: 'Marketing', status: 'Approved', type: 'Text', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 10, sn: 10, name: 'SmsNew', category: 'Marketing', status: 'Pending', type: 'Image', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 11, sn: 11, name: 'Ram', category: 'Utility', status: 'Approved', type: 'Image', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 12, sn: 12, name: 'Ram', category: 'Marketing', status: 'Pending', type: 'Video', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 13, sn: 13, name: 'Ram', category: 'Utility', status: 'Rejected', type: 'Text', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 14, sn: 14, name: 'Ram', category: 'Marketing', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 15, sn: 15, name: 'Ram', category: 'Utility', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 16, sn: 16, name: 'Ram', category: 'Marketing', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 17, sn: 17, name: 'Ram', category: 'Utility', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 18, sn: 18, name: 'Ram', category: 'Marketing', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 19, sn: 19, name: 'Ram', category: 'Utility', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 20, sn: 20, name: 'Ram', category: 'Marketing', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 21, sn: 21, name: 'Ram', category: 'Utility', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 22, sn: 22, name: 'Ram', category: 'Marketing', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 23, sn: 23, name: 'Ram', category: 'Utility', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 24, sn: 24, name: 'Ram', category: 'Marketing', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 25, sn: 25, name: 'Ram', category: 'Utility', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 26, sn: 26, name: 'Ram', category: 'Marketing', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 27, sn: 27, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 28, sn: 28, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 29, sn: 29, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 30, sn: 30, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 31, sn: 31, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 32, sn: 32, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 33, sn: 33, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 34, sn: 34, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 35, sn: 35, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 36, sn: 36, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 37, sn: 37, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 38, sn: 38, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 39, sn: 39, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 40, sn: 40, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 41, sn: 41, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 42, sn: 42, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 43, sn: 43, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 44, sn: 44, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 45, sn: 45, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 46, sn: 46, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 47, sn: 47, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 48, sn: 48, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 49, sn: 49, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 50, sn: 50, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 51, sn: 51, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 52, sn: 52, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
    ];

    // use this when you want to create rows dynamically
    // const rows = Array.from({ length: 500 }, (_, i) => ({
    //     id: i + 1,
    //     sn: i + 1,
    //     name: 'Ram',
    //     category: 'Sharma',
    //     status: 66,
    //     type: '5',
    //     health: 'High',
    //     createdat: '12/10/2024',
    //     action: 'True',
    // }));

    // const CustomFooter = (props) => {
    //     return (
    //         <GridFooterContainer>
    //             <Box sx={{
    //                 flex: '1 1 auto',
    //                 display: 'flex',
    //                 alignItems: 'center',
    //                 pl: 2
    //             }}>
    //                 {selectedRows.length > 0 ? (
    //                     <Typography variant="body2" sx={{ mr: 2, borderRight: '1px solid #ccc', paddingRight: '10px' }}>
    //                         {selectedRows.length} rows selected
    //                     </Typography>
    //                 ) : null}
    //                 <Typography variant="body2">
    //                     Total records: <span className='font-semibold' >{props.totalRecords}</span>
    //                 </Typography>
    //             </Box>
    //             <GridPagination {...props} />
    //         </GridFooterContainer>
    //     );
    // };

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

export default DataTable;