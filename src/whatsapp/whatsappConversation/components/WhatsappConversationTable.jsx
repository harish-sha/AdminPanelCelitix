import * as React from 'react';
import { useState } from 'react';
import { IconButton, Paper, Typography, Box, Button, Tooltip, Popover, } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { DataGrid, GridFooterContainer } from '@mui/x-data-grid';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';

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

const ContentCell = ({ value }) => {
    const [anchorEl, setAnchorEl] = useState(null);  // ✅ Start as null
    const [open, setOpen] = useState(false);         // ✅ Start as false

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);  // ✅ Close popover immediately
        setOpen(false);
    };

    // const open = Boolean(anchorEl);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value);
    };

    return (
        <div


            style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
        >
            <span style={{ flexGrow: 1, fontSize: "14px", fontWeight: "500" }}>
                {value}
            </span>

            {/* <IconButton
                size="small"
                onClick={copyToClipboard}
                sx={{ color: "#007BFF", "&:hover": { color: "#0056b3" } }}
            >
                <ContentCopyIcon fontSize="small" />
            </IconButton> */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                onMouseLeave={handlePopoverClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                disableRestoreFocus
                PaperProps={{
                    sx: {
                        p: 1,
                        maxWidth: 300,
                        borderRadius: 2,
                        boxShadow: 3,
                    },
                    onMouseEnter: () => setOpen(true), // ✅ Keep open when inside popover
                    onMouseLeave: handlePopoverClose, // ✅ Close when moving outside popover
                }}

            >
                {/* <Paper sx={{ p: 1, maxWidth: 300, borderRadius: 2, boxShadow: 3 }}> */}
                <Typography sx={{ fontSize: "14px", color: "#333", mb: 1 }}>
                    {value}
                </Typography>

                <Button
                    variant="outlined"
                    size="small"
                    onClick={copyToClipboard}
                    startIcon={<ContentCopyIcon />}
                    sx={{
                        width: "100%",
                        textTransform: "none",
                        fontSize: "13px",
                        color: "#007BFF",
                        borderColor: "#007BFF",
                        "&:hover": { backgroundColor: "#007BFF", color: "#fff" },
                    }}
                >
                    Copy
                </Button>
                {/* </Paper> */}
            </Popover>

        </div>
    );
};

const WhatsappConversationTable = ({ id, name }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    const columns = [
        { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
        { field: 'wabaname', headerName: 'WABA Name', flex: 1, minWidth: 120 },
        { field: 'contactname', headerName: 'Contact Name', flex: 1, minWidth: 120 },
        { field: 'mobilenumber', headerName: 'Mobile Number', flex: 1, minWidth: 120 },
        { field: 'replytype', headerName: 'Reply Type', flex: 1, minWidth: 120 },
        { field: 'messaginglimit', headerName: 'Messaging Limit', flex: 1, minWidth: 120 },
        { field: 'qualityrating', headerName: 'Quality Rating', flex: 1, minWidth: 120 },
        { field: 'content', headerName: 'Content', flex: 1, minWidth: 200, renderCell: (params) => <ContentCell value={params.value} /> },
        { field: 'time', headerName: 'Time', flex: 1, minWidth: 120 },
    ];

    const rows = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        sn: i + 1,
        wabaname: 'Waba 1',
        contactname: 'Demo',
        mobilenumber: '+919999999999',
        replytype: 'Sent',
        messaginglimit: 'Unlimited',
        qualityrating: 'Green',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident similique minus dignissimos, aut perspiciatis laborum, at alias ad eveniet accusamus fuga, illo mollitia maiores numquam nemo tempore excepturi unde explicabo?',
        time: '27/01/2024 14:58:39',
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
                slots={{ footer: CustomFooter }}
                onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
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
    );
};

export default WhatsappConversationTable;
