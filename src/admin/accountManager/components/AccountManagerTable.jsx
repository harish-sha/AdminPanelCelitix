import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import styled from "styled-components";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import usePagination from "@mui/material/usePagination/usePagination";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Dialog } from "primereact/dialog";
import InputField from "../../../whatsapp/components/InputField";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import UniversalLabel from "../../../whatsapp/components/UniversalLabel";
import { RadioButton } from 'primereact/radiobutton';
import GeneratePassword from "../../../whatsapp/components/GeneratePassword";
import GeneratePasswordSettings from "../../../profile/components/GeneratePasswordSettings";

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
const AccountManagerTable = ({ id, name }) => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [selectedRows, setSelectedRows] = useState([]);
    const [addAccountedit, setAddAccountedit] = useState(false);
    const [addAccountview, setAddAccountview] = useState(false);
 
    const [employeeidviewStatus, setEmployeeidviewStatus] = useState("disable");
    const [employeeideditStatus, setEmployeeidEditStatus] = useState("disable");
   


    const handleChangeEmployeeidViewStatus = (event) => {
        setEmployeeidviewStatus(event.target.value);
    }
    const handleChangeEmployeeidEditStatus = (event) => {
        setEmployeeidEditStatus(event.target.value);
    }
   

    const handleEdit = () => {
        setAddAccountedit(true);
    };
    const handleView = () => {
        setAddAccountview(true);
    };
    const handleAddAccount = () => {
        setAddAccountedit(true);
    };

    const rows = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        sn: i + 1,
        username: "demo@123",
        name: "demo",
        number: "0123456789",
        emailid: "demo@gmail.com",
        employeeid: "demo@gmail.com",
        status: "pending",
    }));

    const columns = [
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
        { field: "username", headerName: "User Name", flex: 1, minWidth: 80 },
        { field: "name", headerName: "Name", flex: 1, minWidth: 100 },
        { field: "number", headerName: "Number", flex: 1, minWidth: 100 },
        { field: "emailid", headerName: "Email ID", flex: 1, minWidth: 100 },
        { field: "employeeid", headerName: "Employee ID", flex: 1, minWidth: 100 },
        { field: "status", headerName: "Status", flex: 1, minWidth: 100 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
                <>
                    <CustomTooltip title="View Account details" placement="top" arrow>
                        <IconButton
                            className="no-xs"
                            onClick={() => handleView(params.row)}
                        >
                            <VisibilityIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "green",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>

                    <CustomTooltip title="Edit Account" placement="top" arrow>
                        <IconButton onClick={() => handleEdit(params.row)}>
                            <EditNoteIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "gray",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip title="Delete Account" placement="top" arrow>
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
                        checkboxSelection
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
            </div>
            <Dialog
                header="Add Account View"
                visible={addAccountview}
                style={{ width: "27rem" }}
                onHide={() => {
                    setAddAccountview(false);
                }}
                draggable={false}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="User ID"
                            id="useridview"
                            name="useridview"
                            placeholder="Enter User id"
                            readOnly
                        />
                        <InputField
                            label="Employee ID"
                            id="employeeidview"
                            name="employeeidview"
                            placeholder="Enter Employee id"
                            readOnly
                        />
                    </div>
                    <div>
                        <InputField
                            label="Password"
                            id="passwordview"
                            name="passwordview"
                            placeholder="Enter password"
                            readOnly
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="First Name"
                            id="firstnameview"
                            name="firstnameview"
                            placeholder="Enter first name"
                            readOnly
                        />
                        <InputField
                            label="Last Name"
                            id="lastnameview"
                            name="lastnameview"
                            placeholder="Enter last name"
                            readOnly
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="Email"
                            id="emailview"
                            name="emailview"
                            placeholder="Enter email"
                            readOnly
                        />
                        <InputField
                            label="Mobile Number"
                            id="mobilenumberview"
                            name="mobilenumberview"
                            placeholder="Enter mobile number"
                            type="number"
                            readOnly
                        />
                    </div>
                    <div className="lg:w-100 md:w-100 flex flex-wrap gap-4">
                        <div className="flex justify-center items-center" >
                            <UniversalLabel
                                text="Employee ID "
                                id="employeeidview"
                                name="employeeidview"
                                className='text-gray-700 font-medium text-sm'
                            />
                        </div>
                        {/* Option 1 */}
                        <div className="flex items-center gap-2" >
                            <RadioButton inputId="employeeidviewOption1" name="employeeidviewredio" value="enable" onChange={handleChangeEmployeeidViewStatus} checked={employeeidviewStatus === 'enable'} />
                            <label htmlFor="employeeidviewOption1" className="text-gray-700 font-medium text-sm cursor-pointer">Active</label>
                        </div>
                        {/* Option 2 */}
                        <div className="flex items-center gap-2" >
                            <RadioButton inputId="employeeidviewOption2" name="employeeidviewredio" value="disable" onChange={handleChangeEmployeeidViewStatus} checked={employeeidviewStatus === 'disable'} />
                            <label htmlFor="employeeidviewOption2" className="text-gray-700 font-medium text-sm cursor-pointer">Inactive</label>
                        </div>
                    </div>
                    {/* <div className="flex justify-center">
            <UniversalButton label="Save" id="saveview" name="saveview" />
          </div> */}
                </div>
            </Dialog>

            <Dialog
                header="Add Account Edit"
                visible={addAccountedit}
                style={{ width: "35rem" }}
                onHide={() => {
                    setAddAccountedit(false);
                }}
                draggable={false}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="User ID"
                            id="useridedit"
                            name="useridedit"
                            placeholder="Enter User id"
                        />
                        <InputField
                            label="Employee ID"
                            id="employeeidedit"
                            name="employeeidedit"
                            placeholder="Enter Employee id"
                        />
                    </div>
                    <div>
                        <GeneratePasswordSettings
                            id="passwordedit"
                            name="passwordedit"
                            className='flex'
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="First Name"
                            id="firstnameedit"
                            name="firstnameedit"
                            placeholder="Enter first name"
                        />
                        <InputField
                            label="Last Name"
                            id="lastnameedit"
                            name="lastnameedit"
                            placeholder="Enter last name"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="Email"
                            id="emailedit"
                            name="emailedit"
                            placeholder="Enter email"
                        />
                        <InputField
                            label="Mobile Number"
                            id="mobilenumberedit"
                            name="mobilenumberedit"
                            placeholder="Enter mobile number"
                            type="number"
                        />
                    </div>
                    <div className="lg:w-100 md:w-100 flex flex-wrap gap-4">
                        <div className="flex justify-center items-center" >
                            <UniversalLabel
                                text="Employee ID "
                                id="employeeidedit"
                                name="employeeidedit"
                                className='text-gray-700 font-medium text-sm'
                            />
                        </div>
                        {/* Option 1 */}
                        <div className="flex items-center gap-2" >
                            <RadioButton inputId="employeeideditOption1" name="employeeideditredio" value="enable" onChange={handleChangeEmployeeidEditStatus} checked={employeeideditStatus === 'enable'} />
                            <label htmlFor="employeeideditOption1" className="text-gray-700 font-medium text-sm cursor-pointer">Active</label>
                        </div>
                        {/* Option 2 */}
                        <div className="flex items-center gap-2" >
                            <RadioButton inputId="employeeideditOption2" name="employeeideditredio" value="disable" onChange={handleChangeEmployeeidEditStatus} checked={employeeideditStatus === 'disable'} />
                            <label htmlFor="employeeideditOption2" className="text-gray-700 font-medium text-sm cursor-pointer">Inactive</label>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <UniversalButton label="Save" id="saveedit" name="saveedit" />
                    </div>
                </div>
            </Dialog>
           
        </div>
    );
};

export default AccountManagerTable;