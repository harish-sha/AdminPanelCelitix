import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import { DataGrid, GridFooterContainer, GridPagination } from '@mui/x-data-grid';
import { Paper, Typography, Box, Button } from '@mui/material';
import { getWabaTemplateDetails } from '../../apis/whatsapp/whatsapp.js';
import toast from 'react-hot-toast';


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

const DataTable = ({ id, wabaNumber, name, handleView, handleDuplicate, handleDelete }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [templateData, setTemplateData] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    // Fetch Templates when WABA number changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getWabaTemplateDetails(wabaNumber);
                if (response) {
                    setTemplateData(response);
                } else {
                    toast.error("Failed to fetch template data!");
                    console.error("Failed to fetch template data!");
                }
            } catch (error) {
                console.error("Error fetching template data:", error);
            }
        };
        fetchData();
    }, [wabaNumber]);

    // **Format Date Function** (Ensures proper date format)
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    };

    const columns = [
        { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
        { field: 'templateName', headerName: 'Template Name', flex: 1, minWidth: 120 },
        { field: 'category', headerName: 'Category', flex: 1, minWidth: 120 },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
        { field: 'type', headerName: 'Type', flex: 1, minWidth: 120 },
        { field: 'health', headerName: 'Health', flex: 1, minWidth: 120 },
        { field: 'createdDate', headerName: 'Created At', flex: 1, minWidth: 120 },
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

    // Process API response into DataGrid rows
    const rows = templateData.map((item, index) => ({
        id: item.templateSrno,
        sn: index + 1,
        templateName: item.templateName || "N/A",
        category: item.category || "N/A",
        status: item.status || "N/A",
        type: item.type || "N/A",
        createdDate: new Date(item.createdDate).toLocaleString(),
    }));


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