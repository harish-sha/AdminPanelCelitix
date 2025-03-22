

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
import InputField from '../../../whatsapp/components/InputField';
import UniversalTextArea from '../../../whatsapp/components/UniversalTextArea';
import UniversalButton from '../../../whatsapp/components/UniversalButton';

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
const ManageDltTemplateTable = ({ id, name }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [managedltedit, setManageDLTEdit] = useState(false);

    const handleEdit = () => {
        setManageDLTEdit(true);
    };

    

    const columns = [
        { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 50 },
        { field: 'userid', headerName: 'Userid', flex: 1, minWidth: 80 },
        { field: 'templatename', headerName: 'Template Name', flex: 1, minWidth: 120 },
        { field: 'templateid', headerName: 'Template ID', flex: 1, minWidth: 110 },
        { field: 'entityid', headerName: 'Entity ID', flex: 1, minWidth: 80 },
        { field: 'message', headerName: 'Message', flex: 1, minWidth: 250 },
        { field: 'senderid', headerName: 'Sender ID', flex: 1, minWidth: 95 },
        { field: 'smstype', headerName: 'SMS type', flex: 1, minWidth: 120 },
        { field: 'consenttype', headerName: 'Consent type', flex: 1, minWidth: 120 },
        { field: 'inserttime', headerName: 'Insert time', flex: 1, minWidth: 110 },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 80 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
                <>
                    <CustomTooltip
                        title="Edit Template"
                        placement="top"
                        arrow
                    >
                        <IconButton onClick={() => handleEdit(params.row)}>
                            <EditNoteIcon
                                sx={{
                                    fontSize: '1.2rem',
                                    color: 'gray',
                                }} />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip
                        title="Delete Template"
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
        userid: 'demo',
        templatename: 'Custom OTP',
        templateid: '170701',
        entityid: '170701',
        message: 'Dear {#var1#}, Your One Time Password is {#var#}.',
        senderid: 'MKHLIK',
        smstype: 'Transactional',
        consenttype: 'implicit',
        inserttime: '07-04-2022',
        status: 'pending',
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

            <Dialog
            header="Manage DLT Edit"
            visible={managedltedit}
            onHide={() => setManageDLTEdit(false)}
            className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
            draggable={false}
          >
            <div className='space-y-4'>
                <InputField
                    label="Template ID*"
                    id="managetemplateedit"
                    name="managetemplateedit"
                    placeholder='Enter Template ID'
                />
                <InputField
                label="Entity ID*"
                id="manageentityidedit"
                name="manageentityidedit"
                placeholder='Enter Entity ID'
                />
                <UniversalTextArea
                label="Template*"
                id="managetemplatecontents"
                name="managetemplatecontents"
                placeholder='Enter Template Content'
                />
               <div className='flex items-center justify-center gap-4'>
               <UniversalButton
                    label="Cancel"
                    id="managetemplatecancel"
                    name="managetemplatecancel"
                    variant="primary"
                    onClick={() => setManageDLTEdit(false)}
                />
                <UniversalButton
                    label="Submit"
                    id="managetemplatesubmit"
                    name="managetemplatesubmit"
                    variant="primary"
                />
               </div>
            </div>
            </Dialog>

        </>
    )
}

export default ManageDltTemplateTable

