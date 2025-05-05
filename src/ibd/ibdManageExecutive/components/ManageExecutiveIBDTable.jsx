import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import usePagination from '@mui/material/usePagination/usePagination';
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import CustomNoRowsOverlay from '../../../whatsapp/components/CustomNoRowsOverlay';
import CustomTooltip from '../../../whatsapp/components/CustomTooltip';
import { MdOutlineDeleteForever } from "react-icons/md";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Dialog } from 'primereact/dialog';
import InputField from '../../../whatsapp/components/InputField';
import AnimatedDropdown from '../../../whatsapp/components/AnimatedDropdown';
import { Calendar } from 'primereact/calendar';
import { FaRegClock } from 'react-icons/fa';
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

const ManageExecutiveIBDTable = ({ id, name }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [editexecutivepopup, setEditExecutivePopup] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [currentTimePlaceholder, setCurrentTimePlaceholder] = useState('');
    const inputRef = useRef();
    const [loginRequired, setLoginRequired] = useState(false);
    const [isInputEnabled, setIsInputEnabled] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [datefrom, setDatefrom] = useState(null);
    const [dateto, setDateto] = useState(null);

    const handleEdit = (row) => {
        setEditExecutivePopup(true);
    };
    const handleDropdownChange = (value) => {
        setSelectedOption(value);
        setIsInputEnabled(true);
    };

    useEffect(() => {
        const now = new Date();
        const rawHours = now.getHours() % 12 || 12; // 12-hour format
        const hours = rawHours.toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        setCurrentTimePlaceholder(`${hours}:${minutes} ${ampm}`);
      
        // Allow only digits and colon in input
        const inputEl = inputRef.current?.input;
        if (inputEl) {
          inputEl.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d:]/g, '');
          });
        }
      }, []);

    const numbertypeOptions = [
        { label: "Mobile", value: "mobile" },
        { label: "Landline", value: "landline" },
        { label: "Toll Free", value: "tollfree" },
    ];
    const columns = [
        { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 100 },
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 90 },
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 90 },
        { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 80 },
        { field: 'createdtime', headerName: 'Created Time', flex: 1, minWidth: 100 },
        { field: 'lastmodified', headerName: 'Last Modified', flex: 1, minWidth: 120 },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 100 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            minWidth: 60,
            renderCell: (params) => (
                <>
                    <CustomTooltip
                        title="Edit"
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
        name: 'Ronit Agarwal',
        email: 'ronitagarwal@gmail.com',
        phone: '9852365896',
        createdtime: '27/09/2023',
        lastmodified: '29/09/2023',
        status: 'Active',
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
            <Dialog
                header="Edit Executive"
                visible={editexecutivepopup}
                onHide={() => setEditExecutivePopup(false)}
                className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
                draggable={false}
            >
                <div className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField
                            label="First Name"
                            id="editexecutivefirstname"
                            name="editexecutivefirstname"
                            placeholder="Enter First Name"
                        />
                        <InputField
                            label="Last Name"
                            id="editexecutivelastname"
                            name="editexecutivelastname"
                            placeholder="Enter Last Name"
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <AnimatedDropdown
                            label="Number Type"
                            id="editexecutivenumbertype"
                            name="editexecutivenumbertype"
                            options={numbertypeOptions}
                            onChange={handleDropdownChange}
                        />
                        <InputField
                            label="Number"
                            id="editexecutivenumber"
                            name="editexecutivenumber"
                            placeholder={selectedOption ? `Enter ${selectedOption}` : 'Enter Number'}
                            readOnly={!selectedOption || !isInputEnabled}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="w-full">
                            <label htmlFor="from-time" className="block text-sm font-medium mb-1">
                                From Time
                            </label>
                            <Calendar
                                id="from-time"
                                name="fromTime"
                                timeOnly
                                hourFormat="12"
                                showIcon
                                icon={<FaRegClock />}
                                value={datefrom} 
                                onChange={(e) => setDatefrom(e.value)}
                                placeholder={currentTimePlaceholder}
                                className="w-full h-10"
                                inputRef={inputRef}
                                readOnlyInput
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="To-time" className="block text-sm font-medium mb-1">
                                From Time
                            </label>
                            <Calendar
                                id="totime"
                                name="toyime"
                                timeOnly
                                hourFormat="12"
                                showIcon
                                icon={<FaRegClock />}
                                value={dateto} 
                                onChange={(e) => setDateto(e.value)}
                                placeholder={currentTimePlaceholder}
                                className="w-full h-10"
                                inputRef={inputRef}
                                readOnlyInput
                            />
                        </div>

                    </div>
                    <div className='space-y-4'>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="requiredlogin"
                                className="form-checkbox"
                                checked={loginRequired}
                                onChange={(e) => setLoginRequired(e.target.checked)}
                            />
                            <span className='text-sm font-bold'>Required Login</span>
                        </label>

                        {loginRequired && (
                            <div className="space-y-4">
                                <InputField
                                    label="Email"
                                    id="editexecutiveemail"
                                    name="editexecutiveemail"
                                    placeholder="Enter Email"
                                    type="email"
                                />
                                <div className='grid grid-cols-2 gap-4'>
                                    <InputField
                                        label="Password"
                                        id="editexecutivepassword"
                                        name="editexecutivepassword"
                                        placeholder="Enter Password"
                                        type="password"
                                    />
                                    <InputField
                                        label="Confirm Password"
                                        id="editexecutiveconfirmpassword"
                                        name="editexecutiveconfirmpassword"
                                        placeholder="Confirm Password"
                                        type="password"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex justify-center'>
                        <UniversalButton
                            label="Submit"
                            id="editexecutivesubmit"
                            name="editexecutivesubmit"

                        />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default ManageExecutiveIBDTable
