

import { Paper, Typography, Box, Button, styled, } from '@mui/material';
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid';
import React, { useState } from 'react'
import CustomNoRowsOverlay from '../../../whatsapp/components/CustomNoRowsOverlay';
import usePagination from '@mui/material/usePagination/usePagination';
import CustomTooltip from '../../../whatsapp/components/CustomTooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Dialog } from 'primereact/dialog';
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdClose } from 'react-icons/md';
import { FaReply } from 'react-icons/fa6';
import whatsappImg from "../../../assets/images/rcs.png"

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


        </div>
    );
};
const ManageVoiceClipsTable = ({ id, name }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });


    

    const columns = [
        { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 100 },
        { field: 'filename', headerName: 'File Name', flex: 1, minWidth: 90 },
        { field: 'filetype', headerName: 'File Type', flex: 1, minWidth: 90 },
        { field: 'size', headerName: 'Size (kb)', flex: 1, minWidth: 80 },
        { field: 'duration', headerName: 'Duration (sec)', flex: 1, minWidth: 100 },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 100 },
        { field: 'type', headerName: 'Type', flex: 1, minWidth: 120 },
        { field: 'requestedon', headerName: 'Requested on', flex: 1, minWidth: 170 },
        { field: 'updatedon', headerName: 'Updated on', flex: 1, minWidth: 170 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            minWidth: 60,
            renderCell: (params) => (
                <>
                    <CustomTooltip
                        title="Delete"
                        placement="top"
                        arrow
                    >
                        <IconButton className='no-xs' onClick={() => handleDelete(params.row)}>
                            <MdOutlineDeleteForever
                                className="text-red-500 cursor-pointer hover:text-red-600"
                                size={20}
                            />
                        </IconButton>
                    </CustomTooltip>
                </>
            ),
        },
    ];

    const rows = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        sn: i + 1,
        filename: 'XYZ',
        filetype: 'mp3',
        size: '100',
        duration: '10',
        status: 'Approved',
        type: 'Transactional',
        requestedon: '27/09/2023 14:58:08',
        updatedon: '27/09/2023 14:58:08',
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
        <>
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
                    checkboxSelection
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

            <Dialog header="Template View" visible={dialogVisible}
                style={{ width: "27rem" }}
                onHide={() => {
                    setDialogVisible(false);
                }}
                draggable={false}>

                <div className="modal-content rounded-xl">
                    <div className="modal-body border-2 p-2 rounded-xl border-gray-200">
                        <div className="imgbox">
                            <img src={whatsappImg} alt="" className='h-45 w-full rounded-lg' />
                        </div>
                        <div className="contentbox text-sm flex flex-col gap-2 py-2 max-h-80 overflow-scroll">
                            <p>As vibrant hues fill the canvas of life, may this festival of colors bring immense joy, success and prosperity to your corporate endeavors🎇💻</p>
                            <p>Wishing our esteemed patrons and partners a Holi filled with the splendor of laughter, the warmth of togetherness and the brightness of positivity.📞📞</p>
                            <p>Here's to a colorful journey ahead!🎉🎊</p>
                            <p>Happy Holi!🎇✨</p>
                            <p>Best Regards,🎊🎉</p>
                            <p>Team Celitix</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <button className='flex items-center justify-center px-4 py-2 text-sm bg-blue-500 text-white rounded-md '>
                                <BsTelephoneFill className='mr-2' />
                                Contact us
                            </button>
                            <button className='flex items-center justify-center px-4 py-2 text-sm bg-green-500 text-white rounded-md '>
                                <FaExternalLinkAlt className='mr-2' />
                                Visit us
                            </button>
                            <button
                                className='flex items-center justify-center px-4 py-2  bg-gray-200 text-gray-800 rounded-md text-sm w-full'
                            >
                                <FaReply className='mr-2' />
                                View more
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>

        </>
    )
}

export default ManageVoiceClipsTable

