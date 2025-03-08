import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import UniversalButton from "../../../components/common/UniversalButton";
import UniversalButton from "../../components/common/UniversalButton";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import styled from "styled-components";


const CustomPagination = ({ totalPages, paginationModel, setPaginationModel }) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) => setPaginationModel({ ...paginationModel, page: newPage - 1 }),
  });

  const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
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

function AccountInfoModal({ show, handleClose }) {
  const [showRcsPricing, setShowRcsPricing] = useState(false);
  const [showWhatsPricing, setShowWhatsPricing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // Account Data
  const accountData = [
    { service: "SMS", credits: 25000, createdOn: "25/04/2023", expiry: "15/02/2024", pricing: "0.20 INR/Credit" },
    { service: "Two Way SMS", credits: 25000, createdOn: "25/04/2023", expiry: "15/02/2024", pricing: "0.20 INR" },
    {
      service: "RCS",
      credits: 25000,
      createdOn: "25/04/2023",
      expiry: "15/02/2024",
      pricing: (
        <button onClick={() => setShowRcsPricing(true)}>
          <VisibilityIcon className="text-green-600 cursor-pointer" />
        </button>
      ),
    },
    {
      service: "WhatsApp",
      credits: 25000,
      createdOn: "25/04/2023",
      expiry: "15/02/2024",
      pricing: (
        <button onClick={() => setShowWhatsPricing(true)}>
          <VisibilityIcon className="text-green-600 cursor-pointer" />
        </button>
      ),
    },
  ];

  // RCS Pricing Data
  const rcsPricingData = [
    { id: 1, country: "India", countryCode: "+91", rate: "0.30" },
    { id: 2, country: "USA", countryCode: "+1", rate: "0.50" },
    { id: 3, country: "UK", countryCode: "+44", rate: "0.45" },
    { id: 4, country: "Canada", countryCode: "+1", rate: "0.40" },
  ];

  // Handle Search
  const handleSearch = () => {
    const filtered = rcsPricingData.filter(
      (item) =>
        item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.countryCode.includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const rows = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    name: 'Demo',
    email: 'Demo@gmail.com',
    mobile: '1234567890',
    status: 'Pending',
    totalAudience: '10000',
    action: 'True',
  }));

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columns = [
    { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 120 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 120 },
    { field: 'mobile', headerName: 'Mobile', flex: 1, minWidth: 120 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          {/* <IconButton onClick={() => handleReply(params.row)}>
                    <ReplyIcon
                        sx={{
                            fontSize: '1.2rem',
                            color: 'gray',
                        }} />
                </IconButton>
                <IconButton onClick={() => handleSchedule(params.row)}>
                    <AccessTimeOutlinedIcon
                        sx={{
                            fontSize: '1.2rem',
                            color: 'gray',
                        }} />
                </IconButton>
                <IconButton onClick={() => handleAssign(params.row)}>
                    <SettingsOutlinedIcon
                        sx={{
                            fontSize: '1.2rem',
                            color: 'gray',
                        }} />
                </IconButton>
                <IconButton className='no-xs' onClick={() => handleDelete(params.row)}>
                    <DeleteIcon
                        sx={{
                            fontSize: '1.2rem',
                            color: 'green'
                        }}
                    />
                </IconButton>
                <IconButton onClick={() => handleEdit(params.row)}>
                    <EditNoteIcon
                        sx={{
                            fontSize: '1.2rem',
                            color: 'gray',
                        }} />
                </IconButton> */}

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
          justifyContent: {
            xs: "center", lg: "space-between"
          },
          alignItems: "center",
          padding: 0,
          gap: 2,
          overflowX: "auto",
        }
        }
      >
        {/* <Box
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
            </Box> */}
      </GridFooterContainer >
    );
  };

  return (
    <>
      {/* Account Info Dialog */}
      <Dialog
        header="Account Info"
        visible={show}
        style={{ width: "50vw" }}
        onHide={handleClose}
        modal
        draggable={false}
      >
        {/* Account Expiry Badge */}
        <div className="flex justify-end mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md font-medium">
            Account Expiry: 25/02/2024
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-50 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white text-center">
              <tr>
                <th className="p-3">Service</th>
                <th className="p-3">Credits</th>
                <th className="p-3">Created On</th>
                <th className="p-3">Plan Expiry</th>
                <th className="p-3">Pricing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-center">
              {accountData.map((item, index) => (
                <tr key={index} className="even:bg-gray-100 hover:bg-blue-50 transition">
                  <td className="p-3">{item.service}</td>
                  <td className="p-3">{item.credits}</td>
                  <td className="p-3">{item.createdOn}</td>
                  <td className="p-3">{item.expiry}</td>
                  <td className="p-3">{item.pricing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>

      {/* RCS Pricing Modal */}
      <Dialog
        header="RCS Price"
        visible={showRcsPricing}
        style={{ width: "50vw" }}
        onHide={() => setShowRcsPricing(false)}
        modal
        draggable={false}
      >
        {/* Search Input */}
        <div className="mb-4 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Country Name or Code"
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <UniversalButton
            label="Search"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleSearch}
          />
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-50 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white text-center">
              <tr>
                <th className="p-3">S.No</th>
                <th className="p-3">Country</th>
                <th className="p-3">Country Code</th>
                <th className="p-3">Rate (INR/Credit)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-center">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id} className="even:bg-gray-100 hover:bg-blue-50 transition">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.country}</td>
                    <td className="p-3">{item.countryCode}</td>
                    <td className="p-3">{item.rate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-gray-500">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Dialog>

      <Dialog
        header="WhatsApp Price"
        visible={showWhatsPricing}
        style={{ width: "50vw" }}
        onHide={() => setShowWhatsPricing(false)}
        modal
        draggable={false}
      >
        <Paper sx={{ height: "auto" }}

        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20, 50]}
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            // checkboxSelection
            rowHeight={45}
            slots={{ footer: CustomFooter }}
            // slotProps={{ footer: { totalRecords: rows.length } }}
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
      </Dialog>
    </>
  );
}

export default AccountInfoModal;
