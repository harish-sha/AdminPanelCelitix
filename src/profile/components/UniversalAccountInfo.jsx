import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import UniversalButton from "../../../components/common/UniversalButton";
import UniversalButton from "../../components/common/UniversalButton";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import styled from "styled-components";
import {
  getRcsRate,
  getWhatsAppRate,
  getaccountInfo,
  getSmsRate,
} from "../../apis/user/user";
import Loader from "../../whatsapp/components/Loader";

import { getCountryList } from "../../apis/common/common";
import { ProgressSpinner } from "primereact/progressspinner";

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

function AccountInfoModal({ show, handleClose }) {
  const [showRcsPricing, setShowRcsPricing] = useState(false);
  const [showWhatsPricing, setShowWhatsPricing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredWhatsAppData, setFilteredWhatsAppData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rcsrate, setRcsRate] = useState([]);
  const [whatsapprate, setWhatsAppRate] = useState([]);
  const [accountInfo, setAccountInfo] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function getRcsRateData() {
      const data = await getRcsRate();
      setRcsRate(data);
      setFilteredData(data);
    }

    async function getWhatsAppRateDate() {
      const data = await getWhatsAppRate();
      setWhatsAppRate(data);
      setFilteredWhatsAppData(data);
    }

    async function getaccountInfoData() {
      setIsFetching(true);
      const data = await getaccountInfo();
      setAccountInfo(Array(data));
      setIsFetching(false);
    }

    async function getCountryListData() {
      const data = await getCountryList();
      setCountryList(data);
    }

    getRcsRateData();
    getWhatsAppRateDate();
    getaccountInfoData();
    getCountryListData();
  }, []);

  const accountrows = [
    {
      sn: 1,
      id: 1,
      service: "SMS",
      created_on: accountInfo[0]?.smsUpdateTime,
      pricing: `${accountInfo[0]?.smsRate} INR/Credit`,
    },
    {
      sn: 2,
      id: 2,
      service: "Two Way SMS",
      created_on: "-",
      pricing: "-",
    },
    {
      sn: 3,
      id: 3,
      service: "OBD",
      created_on: accountInfo[0]?.voiceUpdateTime,
      pricing: `${accountInfo[0]?.voiceRate15Sec ? "15sec -" : "30sec -"} ${accountInfo[0]?.voiceRate15Sec || accountInfo[0]?.voiceRate30Sec} INR/Credit`,
    },
    {
      sn: 4,
      id: 4,
      service: "RCS",
      created_on: rcsrate[0]?.update_time.replaceAll("-", "-"),
      pricing: (
        <button onClick={() => setShowRcsPricing(true)}>
          <VisibilityIcon className="text-green-600 cursor-pointer" />
        </button>
      ),
    },
    {
      sn: 5,
      id: 5,
      service: "Email",
      created_on: "-",
      pricing: "-",
    },
    {
      sn: 6,
      id: 6,
      service: "WhatsApp",
      created_on: whatsapprate[0]?.update_time.replaceAll("-", "-"),
      pricing: (
        <button onClick={() => setShowWhatsPricing(true)}>
          <VisibilityIcon className="text-green-600 cursor-pointer" />
        </button>
      ),
    },
    {
      sn: 7,
      id: 7,
      service: "IBD",
      created_on: "-",
      pricing: "-",
    },
    {
      sn: 8,
      id: 8,
      service: "MissedCall",
      created_on: "-",
      pricing: "-",
    },
    {
      sn: 9,
      id: 9,
      service: "C2C",
      created_on: "-",
      pricing: "-",
    },
  ];

  // Handle RCS Search
  const handleRcsSearch = () => {
    const filtered = rcsrate.filter(
      (item) =>
        item.country_name.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        item?.ISO_code?.toString().includes(searchTerm.toString())
    );
    setFilteredData(filtered);
    setSearchTerm("");
  };

  // Handle RCS Search
  const handleWhatsAppSearch = () => {
    const filtered = whatsapprate.filter(
      (item) =>
        item.country_name.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        item?.ISO_code?.toString().includes(searchTerm.toString())
    );
    setFilteredWhatsAppData(filtered);
    setSearchTerm("");
  };

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const accountcolumns = [
    { field: "sn", headerName: "S.No", flex: 0, width: 70 },
    { field: "service", headerName: "Service", flex: 1, minWidth: 80 },

    { field: "created_on", headerName: "Activation Date", flex: 1, minWidth: 80 },
    // { field: "plan_expiry", headerName: "Plan Expiry", flex: 1, minWidth: 80 },
    {
      field: "pricing",
      headerName: "Pricing",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => params.value,
    },
  ];

  const WhatsAppcolumns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "countryName", headerName: "Country", flex: 1, minWidth: 120 },
    {
      field: "countryCode",
      headerName: "Country Code",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "transactional",
      headerName: "Utility (INR/Credit)",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "promotional",
      headerName: "Marketing (INR/Credit)",
      flex: 1,
      minWidth: 120,
    },
  ];

  const Rcscolumns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "country_name", headerName: "Country", flex: 1, minWidth: 120 },
    { field: "ISO_code", headerName: "Country Code", flex: 1, minWidth: 120 },
    { field: "rate", headerName: "Rate (INR/Credit)", flex: 1, minWidth: 120 },
  ];

  const whatsApprows = Array.isArray(filteredWhatsAppData)
    ? filteredWhatsAppData?.map((item, index) => ({
      id: index + 1,
      sn: index + 1,
      countryName: item.country_name ?? "-",
      countryCode: `+ ${item.ISO_code}` ?? "-",
      transactional: item.transactional,
      promotional: item.promotional,
    }))
    : [];

  const rcsrows = Array.isArray(filteredData)
    ? filteredData?.map((item, index) => ({
      id: index + 1,
      sn: index + 1,
      country_name: item.country_name,
      ISO_code: "+" + item.ISO_code,
      rate: item.rate,
    }))
    : [];

  // const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            lg: "space-between",
          },
          alignItems: "center",
          padding: 0,
          gap: 2,
          overflowX: "auto",
        }}
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
      </GridFooterContainer>
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
        {isFetching ? (
          // <Loader />
          <div className="card flex justify-content-center">
            <ProgressSpinner strokeWidth="2" className="text-blue-500" />
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-3">
              <span className="px-3 py-1 font-medium text-blue-700 bg-blue-100 rounded-md">
                Account Expiry: {accountInfo[0]?.expiryDate}
              </span>
            </div>

            {new Date() < new Date(accountInfo[0]?.expiryDate) ? (
              <Paper sx={{ height: "auto" }}>
                <DataGrid
                  rows={accountrows}
                  columns={accountcolumns}
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
            ) : (
              <h1 className="text-center text-xl text-gray-700 font-semibold" >
                Your account is expired. Please contact Admin to activate your
                account.
              </h1>
            )}
          </>
        )}
      </Dialog>

      {/* RCS Pricing Modal */}
      <Dialog
        header="RCS Price"
        visible={showRcsPricing}
        style={{ width: "50vw" }}
        onHide={() => {
          setShowRcsPricing(false);
          setFilteredData(rcsrate);
        }}
        modal
        draggable={false}
        disabled
      >
        <div className="flex items-center mb-4 space-x-3">
          <input
            type="text"
            placeholder="Country Name or Code"
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <UniversalButton
            label="Search"
            className="px-4 py-2 text-white bg-blue-600 rounded-md"
            onClick={handleRcsSearch}
          />
        </div>
        <Paper sx={{ height: "auto" }}>
          <DataGrid
            rows={rcsrows}
            columns={Rcscolumns}
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

      <Dialog
        header="WhatsApp Price"
        visible={showWhatsPricing}
        style={{ width: "50vw" }}
        onHide={() => {
          setShowWhatsPricing(false);
          setFilteredWhatsAppData(whatsapprate);
        }}
        modal
        draggable={false}
      >
        <div className="flex items-center mb-4 space-x-3">
          <input
            type="text"
            placeholder="Country Name or Code"
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <UniversalButton
            label="Search"
            className="px-4 py-2 text-white bg-blue-600 rounded-md"
            onClick={handleWhatsAppSearch}
          />
        </div>
        <Paper sx={{ height: "auto" }}>
          <DataGrid
            rows={whatsApprows}
            columns={WhatsAppcolumns}
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
