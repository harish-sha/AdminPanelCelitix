import { Box, Button, IconButton, Paper, Tab, Tabs, Typography } from '@mui/material'
import usePagination from '@mui/material/usePagination/usePagination';
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import CustomTooltip from '../../../whatsapp/components/CustomTooltip';
import CustomNoRowsOverlay from '../../../whatsapp/components/CustomNoRowsOverlay';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { Dialog } from 'primereact/dialog';
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import { BsJournalArrowDown } from "react-icons/bs";
import PropTypes from "prop-types";
import { DatePicker } from '@mui/x-date-pickers';
import UniversalDatePicker from '../../../whatsapp/components/UniversalDatePicker';
import UniversalTextArea from '../../../whatsapp/components/UniversalTextArea';
import UniversalButton from '../../../whatsapp/components/UniversalButton';
import { Calendar } from 'primereact/calendar';
import { FaRegClock } from 'react-icons/fa';


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

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
const CallHistoryIBDTable = ({ id, name }) => {
    const [value, setValue] = useState(0);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [selectedRows, setSelectedRows] = useState([]);
    const [callhistorynote, setCallHistoryNote] = useState(false);
    const [callhistoryBlock, setCallHistoryBlock] = useState(false);
    const [currentTimePlaceholder, setCurrentTimePlaceholder] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        // Format current time to hh:mm AM/PM
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        setCurrentTimePlaceholder(`${hours}:${minutes} ${ampm}`);

        // Allow only digits + colon in input
        const inputEl = inputRef.current?.input;
        if (inputEl) {
            inputEl.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^\d:]/g, '');
            });
        }
    }, []);

    const handleBlock = (row) => {
        setCallHistoryBlock(true);
    };
    const handleNote = (row) => {
        setCallHistoryNote(true);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
                    <CustomTooltip
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
                    </CustomTooltip>
                    <CustomTooltip
                        title="Download"
                        placement="top"
                        arrow
                    >
                        <IconButton onClick={() => handleDownload(params.row)}>
                            <ArrowCircleDownOutlinedIcon
                                sx={{
                                    fontSize: '1.2rem',
                                    color: 'gray',
                                }} />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip
                        title="Note"
                        placement="top"
                        arrow
                    >
                        <IconButton onClick={() => handleNote(params.row)}>
                            <TextSnippetOutlinedIcon
                                sx={{
                                    fontSize: '1.2rem',
                                    color: 'gray',
                                }} />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip
                        title="Block"
                        placement="top"
                        arrow
                    >
                        <IconButton className='no-xs' onClick={() => handleBlock(params.row)}>
                            <BlockOutlinedIcon
                                className="text-red-500 cursor-pointer hover:text-red-600"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
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
            <Dialog
                header="Note"
                visible={callhistorynote}
                onHide={() => setCallHistoryNote(false)}
                className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
                draggable={false}
            >
                <Box sx={{ width: "100%" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="Manage Campaigns Tabs"
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab
                            label={
                                <span>
                                    <CampaignOutlinedIcon size={20} /> Add Note
                                </span>
                            }
                            {...a11yProps(0)}
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                color: "text.secondary",
                                "&:hover": {
                                    color: "primary.main",
                                    backgroundColor: "#f0f4ff",
                                    borderRadius: "8px",
                                },
                            }}
                        />
                        <Tab
                            label={
                                <span className="flex gap-2 items-center">
                                    <BsJournalArrowDown size={18} /> Call Note History
                                </span>
                            }
                            {...a11yProps(1)}
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                color: "text.secondary",
                                "&:hover": {
                                    color: "primary.main",
                                    backgroundColor: "#f0f4ff",
                                    borderRadius: "8px",
                                },
                            }}
                        />
                    </Tabs>
                    <CustomTabPanel value={value} index={0} className="">
                        <div className='space-y-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <UniversalDatePicker
                                    label="Date"
                                    id="callhistorynotedate"
                                    name="callhistorynotedate"
                                />
                                <div className="w-full">
                                    <label htmlFor="from-time" className="block text-sm font-medium mb-2">
                                        From Time
                                    </label>
                                    <Calendar
                                        id="from-time"
                                        name="fromTime"
                                        timeOnly
                                        hourFormat="12"
                                        showIcon
                                        icon={<FaRegClock />}
                                        placeholder={currentTimePlaceholder}
                                        className="w-full h-10"
                                        inputRef={inputRef}
                                        readOnlyInput
                                    />
                                </div>
                            </div>
                            <div>
                                <UniversalTextArea
                                    id="callhistorynote"
                                    name="callhistorynote"
                                    label="Remarks"
                                    placeholder="Enter Remarks"
                                    rows={4}
                                />
                            </div>
                            <div className='flex justify-center'>
                                <UniversalButton
                                    label="Submit"
                                    id="callhistorynotesubmit"
                                    name="callhistorynotesubmit"
                                />
                            </div>
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <table className="min-w-full divide-y divide-gray-200 rounded-md overflow-hidden shadow-sm">
                            <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                <tr>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Time</th>
                                    <th className="px-4 py-2 text-left">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-700">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2">2022-01-15</td>
                                    <td className="px-4 py-2">12:30 PM</td>
                                    <td className="px-4 py-2">This is a test call.</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2">2022-01-15</td>
                                    <td className="px-4 py-2">12:30 PM</td>
                                    <td className="px-4 py-2">This is a test call.</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2">2022-01-15</td>
                                    <td className="px-4 py-2">12:30 PM</td>
                                    <td className="px-4 py-2">This is a test call.</td>
                                </tr>
                            </tbody>
                        </table>
                    </CustomTabPanel>
                </Box>
            </Dialog>
            <Dialog
                header="Block History"
                visible={callhistoryBlock}
                onHide={() => setCallHistoryBlock(false)}
                className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
                draggable={false}
            >
                <div className='space-y-4'>
                    <UniversalTextArea
                        label="Remarks"
                        id="blockremarks"
                        name="blockremarks"
                        placeholder="Enter Remarks"
                        rows={4}
                    />
                    <div className='flex justify-center'>
                        <UniversalButton
                            label="Submit"
                            id="blocksubmit"
                            name="blocksubmit"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default CallHistoryIBDTable
