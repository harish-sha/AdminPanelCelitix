import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import styled from "styled-components";
import usePagination from "@mui/material/usePagination/usePagination";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import InputField from "../../../whatsapp/components/InputField";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import UniversalLabel from "../../../whatsapp/components/UniversalLabel";
import { RadioButton } from "primereact/radiobutton";
import toast from "react-hot-toast";
import { getSMPPDetailsById, updateSMPP } from "@/apis/admin/admin";

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
const ManageSMPPTable = ({ id, name, data }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [addserviceedit, setAddServiceedit] = useState(false);
  const [versioneditStatus, setVersionEditStatus] = useState("disable");
  const [tpeditStatus, setTpEditStatus] = useState("disable");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [editDetails, setEditDetails] = useState(null);
  // const

  const handleChangeVersionEditStatus = (event) => {
    setVersionEditStatus(event.target.value);
  };
  const handleChangetpEditStatus = (event) => {
    setTpEditStatus(event.target.value);
  };

  const servicetypeoption = [
    { label: "Transactional", value: 1 },
    { label: "Promotional", value: 2 },
    { label: "International", value: 3 },
    { label: "Both", value: "Both" },
  ];
  const handleEditService = (service) => {
    // console.log(service);
  };

  const dataencodingoption = [
    { label: "Default", value: "default" },
    { label: "SMSC Default Alphabet [0Bit]", value: "gsm7" },
    { label: "IA5 (CCITT T.50)/ASCII[1Bit]", value: "1" },
    { label: "LATIN 1 (ISO-8859-1) [3Bit]", value: "3" },
    { label: "OCTET [4BiT]", value: "4" },
    { label: "UCS2 (ISO-IEC-10646) [8Bit]", value: "8" },
    { label: "EXTENDED KANJI JIS (X 0212-1990) [13Bit]", value: "13" },
  ];
  const handleEditDataEncoding = (data) => {
    // console.log(data);
  };

  const bindmodeoption = [
    { label: "Transmitter", value: 0 },
    { label: "Receiver", value: 2 },
    { label: "Transceiver", value: 1 },
  ];

  const handleEditBindMode = (bind) => {
    // console.log(bind);
  };

  const totalsocketseditoption = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
  ];

  const handleEditTotalSockets = (sockets) => {
    // console.log(sockets);
  };

  const sourceoption = [
    { label: "ton=0;npi=0;", value: "ton=0;npi=0;" },
    { label: "ton=0;npi=1;", value: "ton=0;npi=1;" },
    { label: "ton=0;npi=2;", value: "ton=0;npi=2;" },
    { label: "ton=0;npi=3;", value: "ton=0;npi=3;" },
    { label: "ton=0;npi=6;", value: "ton=0;npi=6;" },
    { label: "ton=0;npi=8;", value: "ton=0;npi=8;" },
    { label: "ton=0;npi=9;", value: "ton=0;npi=9;" },
    { label: "ton=0;npi=10;", value: "ton=0;npi=10;" },
    { label: "ton=0;npi=13;", value: "ton=0;npi=13;" },
    { label: "ton=0;npi=18;", value: "ton=0;npi=18;" },

    { label: "ton=1;npi=0;", value: "ton=1;npi=0;" },
    { label: "ton=1;npi=1;", value: "ton=1;npi=1;" },
    { label: "ton=1;npi=2;", value: "ton=1;npi=2;" },
    { label: "ton=1;npi=3;", value: "ton=1;npi=3;" },
    { label: "ton=1;npi=6;", value: "ton=1;npi=6;" },
    { label: "ton=1;npi=8;", value: "ton=1;npi=8;" },
    { label: "ton=1;npi=9;", value: "ton=1;npi=9;" },
    { label: "ton=1;npi=10;", value: "ton=1;npi=10;" },
    { label: "ton=1;npi=13;", value: "ton=1;npi=13;" },
    { label: "ton=1;npi=18;", value: "ton=1;npi=18;" },

    { label: "ton=2;npi=0;", value: "ton=2;npi=0;" },
    { label: "ton=2;npi=1;", value: "ton=2;npi=1;" },
    { label: "ton=2;npi=2;", value: "ton=2;npi=2;" },
    { label: "ton=2;npi=3;", value: "ton=2;npi=3;" },
    { label: "ton=2;npi=6;", value: "ton=2;npi=6;" },
    { label: "ton=2;npi=8;", value: "ton=2;npi=8;" },
    { label: "ton=2;npi=9;", value: "ton=2;npi=9;" },
    { label: "ton=2;npi=10;", value: "ton=2;npi=10;" },
    { label: "ton=2;npi=13;", value: "ton=2;npi=13;" },
    { label: "ton=2;npi=18;", value: "ton=2;npi=18;" },

    { label: "ton=3;npi=0;", value: "ton=3;npi=0;" },
    { label: "ton=3;npi=1;", value: "ton=3;npi=1;" },
    { label: "ton=3;npi=2;", value: "ton=3;npi=2;" },
    { label: "ton=3;npi=3;", value: "ton=3;npi=3;" },
    { label: "ton=3;npi=6;", value: "ton=3;npi=6;" },
    { label: "ton=3;npi=8;", value: "ton=3;npi=8;" },
    { label: "ton=3;npi=9;", value: "ton=3;npi=9;" },
    { label: "ton=3;npi=10;", value: "ton=3;npi=10;" },
    { label: "ton=3;npi=13;", value: "ton=3;npi=13;" },
    { label: "ton=3;npi=18;", value: "ton=3;npi=18;" },

    { label: "ton=4;npi=0;", value: "ton=4;npi=0;" },
    { label: "ton=4;npi=1;", value: "ton=4;npi=1;" },
    { label: "ton=4;npi=2;", value: "ton=4;npi=2;" },
    { label: "ton=4;npi=3;", value: "ton=4;npi=3;" },
    { label: "ton=4;npi=6;", value: "ton=4;npi=6;" },
    { label: "ton=4;npi=8;", value: "ton=4;npi=8;" },
    { label: "ton=4;npi=9;", value: "ton=4;npi=9;" },
    { label: "ton=4;npi=10;", value: "ton=4;npi=10;" },
    { label: "ton=4;npi=13;", value: "ton=4;npi=13;" },
    { label: "ton=4;npi=18;", value: "ton=4;npi=18;" },

    { label: "ton=5;npi=0;", value: "ton=5;npi=0;" },
    { label: "ton=5;npi=1;", value: "ton=5;npi=1;" },
    { label: "ton=5;npi=2;", value: "ton=5;npi=2;" },
    { label: "ton=5;npi=3;", value: "ton=5;npi=3;" },
    { label: "ton=5;npi=6;", value: "ton=5;npi=6;" },
    { label: "ton=5;npi=8;", value: "ton=5;npi=8;" },
    { label: "ton=5;npi=9;", value: "ton=5;npi=9;" },
    { label: "ton=5;npi=10;", value: "ton=5;npi=10;" },
    { label: "ton=5;npi=13;", value: "ton=5;npi=13;" },
    { label: "ton=5;npi=18;", value: "ton=5;npi=18;" },

    { label: "ton=6;npi=0;", value: "ton=6;npi=0;" },
    { label: "ton=6;npi=1;", value: "ton=6;npi=1;" },
    { label: "ton=6;npi=2;", value: "ton=6;npi=2;" },
    { label: "ton=6;npi=3;", value: "ton=6;npi=3;" },
    { label: "ton=6;npi=6;", value: "ton=6;npi=6;" },
    { label: "ton=6;npi=8;", value: "ton=6;npi=8;" },
    { label: "ton=6;npi=9;", value: "ton=6;npi=9;" },
    { label: "ton=6;npi=10;", value: "ton=6;npi=10;" },
    { label: "ton=6;npi=13;", value: "ton=6;npi=13;" },
    { label: "ton=6;npi=18;", value: "ton=6;npi=18;" },
  ];

  const handleEditSource = (source) => {
    // console.log(source);
  };
  const destinationoption = [
    { label: "ton=0;npi=0;", value: "ton=0;npi=0;" },
    { label: "ton=0;npi=1;", value: "ton=0;npi=1;" },
    { label: "ton=0;npi=2;", value: "ton=0;npi=2;" },
    { label: "ton=0;npi=3;", value: "ton=0;npi=3;" },
    { label: "ton=0;npi=6;", value: "ton=0;npi=6;" },
    { label: "ton=0;npi=8;", value: "ton=0;npi=8;" },
    { label: "ton=0;npi=9;", value: "ton=0;npi=9;" },
    { label: "ton=0;npi=10;", value: "ton=0;npi=10;" },
    { label: "ton=0;npi=13;", value: "ton=0;npi=13;" },
    { label: "ton=0;npi=18;", value: "ton=0;npi=18;" },

    { label: "ton=1;npi=0;", value: "ton=1;npi=0;" },
    { label: "ton=1;npi=1;", value: "ton=1;npi=1;" },
    { label: "ton=1;npi=2;", value: "ton=1;npi=2;" },
    { label: "ton=1;npi=3;", value: "ton=1;npi=3;" },
    { label: "ton=1;npi=6;", value: "ton=1;npi=6;" },
    { label: "ton=1;npi=8;", value: "ton=1;npi=8;" },
    { label: "ton=1;npi=9;", value: "ton=1;npi=9;" },
    { label: "ton=1;npi=10;", value: "ton=1;npi=10;" },
    { label: "ton=1;npi=13;", value: "ton=1;npi=13;" },
    { label: "ton=1;npi=18;", value: "ton=1;npi=18;" },

    { label: "ton=2;npi=0;", value: "ton=2;npi=0;" },
    { label: "ton=2;npi=1;", value: "ton=2;npi=1;" },
    { label: "ton=2;npi=2;", value: "ton=2;npi=2;" },
    { label: "ton=2;npi=3;", value: "ton=2;npi=3;" },
    { label: "ton=2;npi=6;", value: "ton=2;npi=6;" },
    { label: "ton=2;npi=8;", value: "ton=2;npi=8;" },
    { label: "ton=2;npi=9;", value: "ton=2;npi=9;" },
    { label: "ton=2;npi=10;", value: "ton=2;npi=10;" },
    { label: "ton=2;npi=13;", value: "ton=2;npi=13;" },
    { label: "ton=2;npi=18;", value: "ton=2;npi=18;" },

    { label: "ton=3;npi=0;", value: "ton=3;npi=0;" },
    { label: "ton=3;npi=1;", value: "ton=3;npi=1;" },
    { label: "ton=3;npi=2;", value: "ton=3;npi=2;" },
    { label: "ton=3;npi=3;", value: "ton=3;npi=3;" },
    { label: "ton=3;npi=6;", value: "ton=3;npi=6;" },
    { label: "ton=3;npi=8;", value: "ton=3;npi=8;" },
    { label: "ton=3;npi=9;", value: "ton=3;npi=9;" },
    { label: "ton=3;npi=10;", value: "ton=3;npi=10;" },
    { label: "ton=3;npi=13;", value: "ton=3;npi=13;" },
    { label: "ton=3;npi=18;", value: "ton=3;npi=18;" },

    { label: "ton=4;npi=0;", value: "ton=4;npi=0;" },
    { label: "ton=4;npi=1;", value: "ton=4;npi=1;" },
    { label: "ton=4;npi=2;", value: "ton=4;npi=2;" },
    { label: "ton=4;npi=3;", value: "ton=4;npi=3;" },
    { label: "ton=4;npi=6;", value: "ton=4;npi=6;" },
    { label: "ton=4;npi=8;", value: "ton=4;npi=8;" },
    { label: "ton=4;npi=9;", value: "ton=4;npi=9;" },
    { label: "ton=4;npi=10;", value: "ton=4;npi=10;" },
    { label: "ton=4;npi=13;", value: "ton=4;npi=13;" },
    { label: "ton=4;npi=18;", value: "ton=4;npi=18;" },

    { label: "ton=5;npi=0;", value: "ton=5;npi=0;" },
    { label: "ton=5;npi=1;", value: "ton=5;npi=1;" },
    { label: "ton=5;npi=2;", value: "ton=5;npi=2;" },
    { label: "ton=5;npi=3;", value: "ton=5;npi=3;" },
    { label: "ton=5;npi=6;", value: "ton=5;npi=6;" },
    { label: "ton=5;npi=8;", value: "ton=5;npi=8;" },
    { label: "ton=5;npi=9;", value: "ton=5;npi=9;" },
    { label: "ton=5;npi=10;", value: "ton=5;npi=10;" },
    { label: "ton=5;npi=13;", value: "ton=5;npi=13;" },
    { label: "ton=5;npi=18;", value: "ton=5;npi=18;" },

    { label: "ton=6;npi=0;", value: "ton=6;npi=0;" },
    { label: "ton=6;npi=1;", value: "ton=6;npi=1;" },
    { label: "ton=6;npi=2;", value: "ton=6;npi=2;" },
    { label: "ton=6;npi=3;", value: "ton=6;npi=3;" },
    { label: "ton=6;npi=6;", value: "ton=6;npi=6;" },
    { label: "ton=6;npi=8;", value: "ton=6;npi=8;" },
    { label: "ton=6;npi=9;", value: "ton=6;npi=9;" },
    { label: "ton=6;npi=10;", value: "ton=6;npi=10;" },
    { label: "ton=6;npi=13;", value: "ton=6;npi=13;" },
    { label: "ton=6;npi=18;", value: "ton=6;npi=18;" },
  ];

  const handleEditDestination = (destination) => {
    // console.log(destination);
  };
  const registereddeliveryoption = [
    { label: "Default [null]", value: "Default" },
    { label: "No SMSC Delivery Receipt Requested", value: "Default" },
    { label: "Delivery Success or Failure", value: "Default" },
    { label: "Delivery Failure", value: "Default" },
  ];

  const handleEditRegisteredDelivery = (delivery) => {
    // console.log(delivery);
  };
  const windowsizeoption = [
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
    { label: "150", value: 150 },
    { label: "200", value: 200 },
    { label: "250", value: 250 },
    { label: "500", value: 500 },
  ];

  const handleEditWindowSize = (windows) => {
    // console.log(windows);
  };

  const handleEdit = async (row) => {
    try {
      const res = await getSMPPDetailsById(row?.serviceId);
      setEditDetails(res[0]);
      setVersionEditStatus(res[0]?.Version);
      setTpEditStatus(res[0]?.tps ? "enable" : "disable");
      setAddServiceedit(true);
    } catch (e) {
      toast.error("Error in fetching smpp details");
    }
  };

  const handleUpdateSmpp = async () => {
    try {
      const res = await updateSMPP(editDetails);
      if (!res?.status) {
        return toast.error("Error updating SMPP");
      }
      toast.success("SMPP updated successfully");
      setAddServiceedit(false);
      await handleFetchSmppDetails();
    } catch (e) {
      toast.error("Error updating SMPP");
    }
  };
  const rows = Array.isArray(data)
    ? data?.map((item, i) => ({
        id: i + 1,
        sn: i + 1,
        ...item,
      }))
    : [];

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "serviceName",
      headerName: "Service Name",
      flex: 1,
      minWidth: 130,
    },
    { field: "userName", headerName: "UserName", flex: 1, minWidth: 120 },
    { field: "host", headerName: "Host", flex: 1, minWidth: 120 },
    {
      field: "sendingPort",
      headerName: "Sending Port",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "receiverPort",
      headerName: "Receiver Port",
      flex: 1,
      minWidth: 120,
    },
    { field: "sockets", headerName: "Sockets", flex: 1, minWidth: 60 },
    {
      field: "connectivity",
      headerName: "Connectivity",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <div className="py-2">
          <div
            className={`text-white text-xs px-2 py-1 border rounded-md text-center ${
              params.row.status ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {params.row.status ? "Active" : "Inactive"}
          </div>
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit Service" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          {/* <CustomTooltip title="Delete Service" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleDelete(params.row)}
            >
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </IconButton>
          </CustomTooltip> */}
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
          // checkboxSelection
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
        header="Edit Service"
        visible={addserviceedit}
        style={{ width: "60rem" }}
        onHide={() => {
          setAddServiceedit(false);
        }}
        draggable={false}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">SMPP Bind Settings :</h2>
          <div className="grid grid-cols-4 gap-4">
            <InputField
              label="Service Name"
              id="servicenameedit"
              name="servicenameedit"
              placeholder="Enter Service Name"
              value={editDetails?.serviceName || ""}
              onChange={(e) =>
                setEditDetails({ ...editDetails, serviceName: e.target.value })
              }
            />

            <div className="flex flex-col">
              <div className="">
                <UniversalLabel
                  text="SMPP Version"
                  id="versionedit"
                  name="versionedit"
                />
              </div>
              <div className="flex gap-4 mt-3">
                {/* Option 1 */}
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="versioneditOption1"
                    name="versioneditredio"
                    value="3.3"
                    onChange={handleChangeVersionEditStatus}
                    checked={versioneditStatus === "3.3"}
                  />
                  <label
                    htmlFor="versioneditOption1"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    3.3
                  </label>
                </div>
                {/* Option 2 */}
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="versioneditOption2"
                    name="versioneditredio"
                    value="3.4"
                    onChange={handleChangeVersionEditStatus}
                    checked={versioneditStatus === "3.4"}
                  />
                  <label
                    htmlFor="versioneditOption2"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    3.4
                  </label>
                </div>
              </div>
            </div>

            <InputField
              label="Host URL or IP Address"
              id="hostedit"
              name="hostedit"
              placeholder="Enter Host URL or IP Address"
              value={editDetails?.webUrl || ""}
              onChange={(e) =>
                setEditDetails({ ...editDetails, webUrl: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <InputField
              label="User Name"
              id="usernameedit"
              name="usernameedit"
              placeholder="Enter User Name"
              value={editDetails?.userName || ""}
              onChange={(e) =>
                setEditDetails({ ...editDetails, userName: e.target.value })
              }
            />
            <InputField
              label="Password"
              id="passwordedit"
              name="passwordedit"
              placeholder="Enter Password"
              // type="password"
              value={editDetails?.password || ""}
              onChange={(e) =>
                setEditDetails({ ...editDetails, password: e.target.value })
              }
            />
            <InputField
              label="Sending Port"
              id="sendingportedit"
              name="sendingportedit"
              placeholder="Enter Sending Port"
              value={editDetails?.port || ""}
              onChange={(e) =>
                setEditDetails({ ...editDetails, port: e.target.value })
              }
            />
            <InputField
              label="Receiver Port"
              id="receiverportedit"
              name="receiverportedit"
              placeholder="Enter Receiver Port"
              value={editDetails?.receiverPort || ""}
              onChange={(e) =>
                setEditDetails({ ...editDetails, receiverPort: e.target.value })
              }
            />
          </div>
          <h2 className="text-lg font-semibold">SMPP Server Settings :</h2>
          <div className="grid grid-cols-4 gap-4">
            <AnimatedDropdown
              label="Service Type"
              id="servicetypeedit"
              name="servicetypeedit"
              options={servicetypeoption}
              onChange={handleEditService}
              value={editDetails?.serviceType || ""}
            />
            <AnimatedDropdown
              label="Data Encoding"
              id="dataencodingedit"
              name="dataencodingedit"
              options={dataencodingoption}
              onChange={handleEditDataEncoding}
              value={editDetails?.DataCoding || ""}
            />
            <InputField
              label="System Type"
              id="systemtypeedit"
              name="systemtypeedit"
              placeholder="Enter System Type"
              value={editDetails?.systemType || ""}
              onChange={(e) =>
                setEditDetails({ ...editDetails, systemType: e.target.value })
              }
            />
            <AnimatedDropdown
              label="Bind Mode"
              id="bindmodeedit"
              name="bindmodeedit"
              options={bindmodeoption}
              onChange={handleEditBindMode}
              value={editDetails?.bindMode}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <AnimatedDropdown
              label="Total Sockets"
              id="totalsocketsedit"
              name="totalsocketsedit"
              placeholder="Enter Total Sockets"
              options={totalsocketseditoption}
              onChange={handleEditTotalSockets}
              value={editDetails?.totalSocket || ""}
            />
            <InputField
              label="Number of Receivers"
              id="receiversedit"
              name="receiversedit"
              placeholder="Enter Number of Receivers"
              value={editDetails?.numOfReceivers || ""}
              onChange={(e) =>
                setEditDetails({
                  ...editDetails,
                  numOfReceivers: e.target.value,
                })
              }
            />
            <AnimatedDropdown
              label="Source"
              id="sourceedit"
              name="sourceedit"
              options={sourceoption}
              onChange={handleEditSource}
              value={editDetails?.Source || ""}
            />
            <AnimatedDropdown
              label="Destination"
              id="destinationedit"
              name="destinationedit"
              options={destinationoption}
              onChange={handleEditDestination}
              value={editDetails?.Destination || ""}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <AnimatedDropdown
              label="Registered Delivery"
              id="registereddeliveryedit"
              name="registereddeliveryedit"
              options={registereddeliveryoption}
              onChange={handleEditRegisteredDelivery}
            />
            <InputField
              label="Sender Id Prefix"
              id="senderidprefixedit"
              name="senderidprefixedit"
              placeholder="Enter Sender Id Prefix"
              value={editDetails?.prefixSenderId || ""}
              onChange={(e) =>
                setEditDetails({
                  ...editDetails,
                  prefixSenderId: e.target.value,
                })
              }
            />
            <div className="flex flex-col">
              <div className="">
                <UniversalLabel text="TPS" id="tpedit" name="tpedit" />
              </div>
              <div className="flex gap-4 mt-3">
                {/* Option 1 */}
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="tpeditOption1"
                    name="tpeditredio"
                    value="enable"
                    onChange={handleChangetpEditStatus}
                    checked={tpeditStatus === "enable"}
                  />
                  <label
                    htmlFor="tpeditOption1"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Yes
                  </label>
                </div>
                {/* Option 2 */}
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="tpeditOption2"
                    name="tpeditredio"
                    value="disable"
                    onChange={handleChangetpEditStatus}
                    checked={tpeditStatus === "disable"}
                  />
                  <label
                    htmlFor="tpeditOption2"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            {tpeditStatus === "enable" && (
              <InputField
                label="TPS "
                id="tpeditvalue"
                name="tpeditvalue"
                placeholder="Enter TPS Value"
                value={editDetails?.tps || ""}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, tps: e.target.value })
                }
              />
            )}
          </div>

          <h2 className="text-lg font-semibold">Que Settings :</h2>
          <div className="grid grid-cols-4 gap-4">
            <InputField
              label="Order Size"
              id="ordersizeedit"
              name="ordersizeedit"
              placeholder="Enter Order Size"
              value={editDetails?.orderSize || ""}
              onChange={(e) =>
                setEditDetails({ ...editDetails, orderSize: e.target.value })
              }
            />
            <InputField
              label="Initial Size"
              id="initialsizeedit"
              name="initialsizeedit"
              placeholder="Enter Initial Size"
              value={editDetails?.initialSize || ""}
              onChange={(e) =>
                setEditDetails({ ...editDetails, initialSize: e.target.value })
              }
            />
            <InputField
              label="Trigger Size"
              id="triggersizeedit"
              name="triggersizeedit"
              placeholder="Enter Trigger Size"
              value={editDetails?.triggerSize || ""}
              onChange={(e) =>
                setEditDetails({ ...editDetails, triggerSize: e.target.value })
              }
            />
            <AnimatedDropdown
              label="Window Size"
              id="windowsizeedit"
              name="windowsizeedit"
              placeholder="Enter Window Size"
              options={windowsizeoption}
              onChange={handleEditWindowSize}
              value={editDetails?.windowSize || ""}
            />
          </div>
          <div className="flex justify-center">
            <UniversalButton
              label="Save"
              id="saveedit"
              name="saveedit"
              onClick={handleUpdateSmpp}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageSMPPTable;
