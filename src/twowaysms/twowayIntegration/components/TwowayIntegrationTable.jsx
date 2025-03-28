import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import usePagination from '@mui/material/usePagination/usePagination';
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid'
import React, { useState } from 'react'
import styled from 'styled-components';
import CustomNoRowsOverlay from '../../../whatsapp/components/CustomNoRowsOverlay';
import CustomTooltip from '../../../whatsapp/components/CustomTooltip';
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Dialog } from 'primereact/dialog';
import InputField from '../../../whatsapp/components/InputField';
import AnimatedDropdown from '../../../whatsapp/components/AnimatedDropdown';
import { RadioButton } from 'primereact/radiobutton';
import UniversalTextArea from '../../../whatsapp/components/UniversalTextArea';
import UniversalButton from '../../../components/common/UniversalButton';

const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
});
const CustomPagination = ({
    totalPages,
    paginationModel,
    setPaginationModel,
}) => {
    const { items } = usePagination({
        count: totalPages,
        page: paginationModel.page + 1,
        onChange: (_, newPage) =>
            setPaginationModel({ ...paginationModel, page: newPage - 1 }),
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
                            <Button
                                key={index}
                                variant="outlined"
                                size="small"
                                {...item}
                                sx={{}}
                            >
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
const TwowayIntegrationTable = ({ id, name, }) => {
    const [selectedRows, setSelectedRows] = useState([]);
      const [editintegration, setEditIntegration] = useState(false);
        const [editintegrationoption, setEditIntegrationOption] = useState("enable");
      const [viewintegration, setViewIntegration] = useState(false);
        const [viewintegrationoption, setViewIntegrationOption] = useState("enable");
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const handleChangeEditStatus = (e) => {
        setEditIntegrationOption(e.value);
      };
    const handleChangeViewStatus = (e) => {
        setViewIntegrationOption(e.value);
      };
    const handleEdit = () => {
        setEditIntegration(true);
    };
    const handleView = () => {
        setViewIntegration(true);
    };

    const editsourceOption = [
        { label: '56161', value: '56161' },
        { label: '56161', value: '56161' },
        { label: '56161', value: '56161' },
      ]
      const editkeywordOption = [
        { label: 'Keyword1', value: 'Keyword1' },
        { label: 'Keyword2', value: 'Keyword2' },
        { label: 'Keyword3', value: 'Keyword3' },
      ]
      const editrespinseOption = [
        { label: 'SMS', value: 'sms' },
        { label: 'Voice', value: 'voice' },
      ]
    const viewsourceOption = [
        { label: '56161', value: '56161' },
        { label: '56161', value: '56161' },
        { label: '56161', value: '56161' },
      ]
      const viewkeywordOption = [
        { label: 'Keyword1', value: 'Keyword1' },
        { label: 'Keyword2', value: 'Keyword2' },
        { label: 'Keyword3', value: 'Keyword3' },
      ]
      const viewrespinseOption = [
        { label: 'SMS', value: 'sms' },
        { label: 'Voice', value: 'voice' },
      ]

    const rows = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        sn: i + 1,
        source: "51510",
        keyword: "text",
        integrationname: "demopro",
        integrationtype: "SMS",
        status: "pending",

    }));

    const columns = [
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
        {
            field: "source",
            headerName: "Source",
            flex: 1,
            minWidth: 80,
        },
        { field: "keyword", headerName: "Keyword", flex: 1, minWidth: 80 },
        {
            field: "integrationname",
            headerName: "Integration Name",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "integrationtype",
            headerName: "Integration Type",
            flex: 1,
            minWidth: 100,
        },
        { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
                <>
                    <CustomTooltip title="Integration View"
                        placement="top"
                        arrow={true}>
                        <IconButton onClick={() => handleView(params.row)}>
                            <VisibilityIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "green",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip
                        title="Integration Edit"
                        placement="top"
                        arrow={true}
                    >
                        <IconButton onClick={() => handleEdit(params.row)}>
                            <EditNoteIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "gray",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip title="Integration Delete" placement="top" arrow>
                        <IconButton
                            className="no-xs"
                            onClick={() => handleDelete(params.row)}
                        >
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

    const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

    const CustomFooter = () => {
        return (
            <GridFooterContainer
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", lg: "space-between" },
                    alignItems: "center",
                    padding: 1,
                    gap: 2,
                    overflowX: "auto",
                }}
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
                            sx={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
                        >
                            {selectedRows.length} Rows Selected
                        </Typography>
                    )}

                    <Typography variant="body2">
                        Total Records: <span className="font-semibold">{rows.length}</span>
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
                    disableRowSelectionOnClick
                    disableColumnResize
                    disableColumnMenu
                    sx={{
                        border: 0,
                        "& .MuiDataGrid-cell": { outline: "none !important" },
                        "& .MuiDataGrid-columnHeaders": {
                            color: "#193cb8",
                            fontSize: "14px",
                            fontWeight: "bold !important",
                        },
                        "& .MuiDataGrid-row--borderBottom": {
                            backgroundColor: "#e6f4ff !important",
                        },
                        "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
                    }}
                />
            </Paper>
            <Dialog
                    header="Edit Integration"
                    visible={editintegration}
                    onHide={() => setEditIntegration(false)}
                    className="lg:w-[45rem] md:w-[30rem] w-[20rem]"
                    draggable={false}
                  >
                    <div className='space-y-2'>
                      <div className='grid grid-cols-2 gap-2'>
                        <div className='w-max-56'>
                          <InputField
                            label="Integration Name"
                            id="editintegrationname"
                            name="editintegrationname"
                            placeholder="Enter Integration Name"
                          />
                        </div>
                        <div className='w-max-56'>
                          <AnimatedDropdown
                            label="Source"
                            id="editintergrationsource"
                            name="editintergrationsource"
                            placeholder="Select Source"
                            options={editsourceOption}
                            onChange={(e) => console.log(e)}
                          />
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-2'>
                        <div className='w-max-content'>
            
                          <AnimatedDropdown
                            label="Keyword"
                            id="editintergrationkeyword"
                            name="editintergrationkeyword"
                            placeholder="Enter Keyword"
                            options={editkeywordOption}
                            onChange={(e) => console.log(e)}
                          />
                        </div>
                        <div className='w-max-content'>
            
                          <AnimatedDropdown
                            label="Response"
                            id="editintergrationresponse"
                            name="editintergrationresponse"
                            placeholder="Enter Response"
                            options={editrespinseOption}
                            onChange={(e) => console.log(e)}
            
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 ">
                        {/* <div className="flex items-center justify-center">
                          <UniversalLabel
                            text="Status"
                            id="editstatus"
                            name="editstatus"
                            className="text-sm font-medium text-gray-700"
                          />
                        </div> */}
            
                        <div className="flex items-center gap-2">
                          <RadioButton
                            inputId="editintegrationOption1"
                            name="editintegrationredio"
                            value="enable"
                            onChange={handleChangeEditStatus}
                            checked={editintegrationoption === "enable"}
                          />
                          <label
                            htmlFor="editintegrationOption1"
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            SMS
                          </label>
                        </div>
            
                        <div className="flex items-center gap-2">
                          <RadioButton
                            inputId="editintegrationOption2"
                            name="editintegrationredio"
                            value="disable"
                            onChange={handleChangeEditStatus}
                            checked={editintegrationoption === "disable"}
                          />
                          <label
                            htmlFor="editintegrationOption2"
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            Voice
                          </label>
                        </div>
                        {editintegrationoption === "enable" && (
                          <div className='w-full'>
                            <div className='grid grid-cols-2 gap-2'>
                              <InputField
                                label="User Name"
                                id="editintegrationusername"
                                name="editintegrationusername"
                                placeholder="Enter User Name"
                              />
                              <InputField
                                label="API Key"
                                id="editintegrationapi"
                                name="editintegrationapi"
                                placeholder="Enter API Key"
                              />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                              <InputField
                                label="DLT Approved Sender ID"
                                id="editintegrationdltsenderid"
                                name="editintegrationdltsenderid"
                                placeholder="Enter DLT Approved Sender ID"
                              />
                              <InputField
                                label="DLT Template ID"
                                id="editintegrationdlttemplateid"
                                name="editintegrationdlttemplateid"
                                placeholder="Enter DLT Template ID"
                              />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                              <InputField
                                label="DLT Entity ID"
                                id="editintegrationdlentityid"
                                name="editintegrationdlentityid"
                                placeholder="Enter DLT Entity ID"
                              />
                              <UniversalTextArea
                                label="Content"
                                id="editintegrationcontent"
                                name="editintegrationcontent"
                                placeholder="Enter Content"
                                rows={10}
                              />
                            </div>
                          </div>
            
                        )}
                        {editintegrationoption === "disable" && (
                          <div className='w-full'>
                            <AnimatedDropdown
                              label="File"
                              id="editintergrationfile"
                              name="editintergrationfile"
                              placeholder="Select File"
                              options={[{ label: 'File1', value: 'File1' }]}
                              onChange={(e) => console.log(e)}
                            />
                          </div>
            
                        )}
            
                      </div>
                      <div className='flex justify-center'>
                        <UniversalButton
                          label="Submit"
                          id="editintegrationsubmit"
                          name="editintegrationsubmit"
                        />
                      </div>
                    </div>
            </Dialog>
            <Dialog
                    header="View Integration"
                    visible={viewintegration}
                    onHide={() => setViewIntegration(false)}
                    className="lg:w-[45rem] md:w-[30rem] w-[20rem]"
                    draggable={false}
                  >
                    <div className='space-y-2'>
                      <div className='grid grid-cols-2 gap-2'>
                        <div className='w-max-56'>
                          <InputField
                            label="Integration Name"
                            id="viewintegrationname"
                            name="viewintegrationname"
                            placeholder="Enter Integration Name"
                            readOnly={true}
                          />
                        </div>
                        <div className='w-max-56'>
                          <AnimatedDropdown
                            label="Source"
                            id="viewintergrationsource"
                            name="viewintergrationsource"
                            placeholder="Select Source"
                            options={viewsourceOption}
                            onChange={(e) => console.log(e)}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-2'>
                        <div className='w-max-content'>
            
                          <AnimatedDropdown
                            label="Keyword"
                            id="viewintergrationkeyword"
                            name="viewintergrationkeyword"
                            placeholder="Enter Keyword"
                            options={viewkeywordOption}
                            onChange={(e) => console.log(e)}
                            readOnly={true}
                          />
                        </div>
                        <div className='w-max-content'>
            
                          <AnimatedDropdown
                            label="Response"
                            id="viewintergrationresponse"
                            name="viewintergrationresponse"
                            placeholder="Enter Response"
                            options={viewrespinseOption}
                            onChange={(e) => console.log(e)}
                            readOnly={true}
            
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 ">
                        {/* <div className="flex items-center justify-center">
                          <UniversalLabel
                            text="Status"
                            id="viewstatus"
                            name="viewstatus"
                            className="text-sm font-medium text-gray-700"
                          />
                        </div> */}
            
                        <div className="flex items-center gap-2">
                          <RadioButton
                            inputId="viewintegrationOption1"
                            name="viewintegrationredio"
                            value="enable"
                            onChange={handleChangeViewStatus}
                            checked={viewintegrationoption === "enable"}
                          />
                          <label
                            htmlFor="viewintegrationOption1"
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            SMS
                          </label>
                        </div>
            
                        <div className="flex items-center gap-2">
                          <RadioButton
                            inputId="viewintegrationOption2"
                            name="viewintegrationredio"
                            value="disable"
                            onChange={handleChangeViewStatus}
                            checked={viewintegrationoption === "disable"}
                          />
                          <label
                            htmlFor="viewintegrationOption2"
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            Voice
                          </label>
                        </div>
                        {viewintegrationoption === "enable" && (
                          <div className='w-full'>
                            <div className='grid grid-cols-2 gap-2'>
                              <InputField
                                label="User Name"
                                id="viewintegrationusername"
                                name="viewintegrationusername"
                                placeholder="Enter User Name"
                                readOnly={true}
                              />
                              <InputField
                                label="API Key"
                                id="viewintegrationapi"
                                name="viewintegrationapi"
                                placeholder="Enter API Key"
                                readOnly={true}
                              />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                              <InputField
                                label="DLT Approved Sender ID"
                                id="viewintegrationdltsenderid"
                                name="viewintegrationdltsenderid"
                                placeholder="Enter DLT Approved Sender ID"
                                readOnly={true}
                              />
                              <InputField
                                label="DLT Template ID"
                                id="viewintegrationdlttemplateid"
                                name="viewintegrationdlttemplateid"
                                placeholder="Enter DLT Template ID"
                                readOnly={true}
                              />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                              <InputField
                                label="DLT Entity ID"
                                id="viewintegrationdlentityid"
                                name="viewintegrationdlentityid"
                                placeholder="Enter DLT Entity ID"
                                readOnly={true}
                              />
                              <UniversalTextArea
                                label="Content"
                                id="viewintegrationcontent"
                                name="viewintegrationcontent"
                                placeholder="Enter Content"
                                rows={10}
                                readOnly={true}
                              />
                            </div>
                          </div>
            
                        )}
                        {viewintegrationoption === "disable" && (
                          <div className='w-full'>
                            <AnimatedDropdown
                              label="File"
                              id="viewintergrationfile"
                              name="viewintergrationfile"
                              placeholder="Select File"
                              options={[{ label: 'File1', value: 'File1' }]}
                              onChange={(e) => console.log(e)}
                            />
                          </div>
            
                        )}
            
                      </div>
                    </div>
            </Dialog>
        </div>
    )
}

export default TwowayIntegrationTable
