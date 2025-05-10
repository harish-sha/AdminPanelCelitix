import React, { useState } from "react";
import { styled } from "@mui/material/styles";
// import CustomNoRowsOverlay from "../../../components/layout/CustomNoRowsOverlay";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import {
  Paper,
  Typography,
  Box,
  Button,
  Switch,
  IconButton,
} from "@mui/material";
import CustomTooltip from "../../../components/common/CustomTooltip";
import { IoPlay } from "react-icons/io5";
import { Audiotrack, DeleteForever } from "@mui/icons-material";
import { MdOutlineDeleteForever } from "react-icons/md";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import { Dialog } from "primereact/dialog";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import ObdAudioplayer from "../components/ObdAudioplayer";
// import DummyAudio from "../../../../public/DummyAudio.MP3";
import DummyAudio from "../../../assets/audio/DummyAudio.MP3";

const Obdmanagecampaign = (id, data) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [isOpenPlay, setIsOpenPlay] = useState(false);
  const [selectedPlay, setSelectedPlay] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [active, setActive] = useState();

  const handleDelete = (id, templateName) => {
    setSelectedTemplateName(templateName);
    setIsVisible(true);
  };

  const handlePlay = (id, templateName) => {
    setSelectedPlay(templateName);
    setIsOpenPlay(true);
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "audioId", headerName: "AudioId", flex: 0, minWidth: 80 },
    {
      field: "templateName",
      headerName: "File/Template Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "fileFormate",
      headerName: "File Formate",
      flex: 1,
      minWidth: 120,
    },
    { field: "size", headerName: "Size(kb)", flex: 1, minWidth: 120 },
    { field: "duration", headerName: "Duration(sec)", flex: 1, minWidth: 120 },
    { field: "type", headerName: "Type", flex: 1, minWidth: 120 },
    {
      field: "adminStatus",
      headerName: "Admin Status",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "userStatus",
      headerName: "User Status",
      flex: 1,
      minWidth: 120,
      renderCell: () => (
        <CustomTooltip value={active}>
          <Switch
            onChange={(e) => setActive(e.target.value)}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#34C759",
              },
              "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
              {
                backgroundColor: "#34C759",
              },
            }}
          />
        </CustomTooltip>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <CustomTooltip title="Delete" placement="top" arrow>
          <IconButton
            onClick={(event) => handleDelete(event, params.row.templateName)}
          >
            <MdOutlineDeleteForever
              className="text-red-500 cursor-pointer hover:text-red-600"
              size={20}
            />
          </IconButton>
        </CustomTooltip>
      ),
    },
    {
      field: "play",
      headerName: "Play",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip title="Play" placement="top" arrow>
          <IconButton
            onClick={(event) => handlePlay(event, params.row.templateName)}
          >
            <PlayCircleFilledWhiteOutlinedIcon
              className="cursor-pointer "
              size={20}
            />
          </IconButton>
        </CustomTooltip>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      sn: 1,
      audioId: 10,
      templateName: "Ab",
      fileFormate: "mp3",
      size: "100",
      duration: "8",
      type: "Transactional",
      adminStatus: "Approved",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 2,
      sn: 2,
      audioId: 20,
      templateName: "Abc",
      fileFormate: "mp3",
      size: "120",
      duration: "18",
      type: "Transactional",
      adminStatus: "Disapproved",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 3,
      sn: 3,
      audioId: 30,
      templateName: "Cb",
      fileFormate: "mp3",
      size: "90",
      duration: "3",
      type: "Transactional",
      adminStatus: "Approved",
      userStatus: "Inactive",
      action: "",
      play: "",
    },
    {
      id: 4,
      sn: 4,
      audioId: 40,
      templateName: "Xyz",
      fileFormate: "mp3",
      size: "190",
      duration: "18",
      type: "Transactional",
      adminStatus: "Disapproved",
      userStatus: "Inactive",
      action: "",
      play: "",
    },
    {
      id: 5,
      sn: 5,
      audioId: 50,
      templateName: "xb",
      fileFormate: "mp3",
      size: "200",
      duration: "28",
      type: "Transactional",
      adminStatus: "Pending",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 6,
      sn: 6,
      audioId: 60,
      templateName: "yb",
      fileFormate: "mp3",
      size: "80",
      duration: "10",
      type: "Transactional",
      adminStatus: "Approved",
      userStatus: "Inactive",
      action: "",
      play: "",
    },
    {
      id: 7,
      sn: 7,
      audioId: 70,
      templateName: "zb",
      fileFormate: "mp3",
      size: "100",
      duration: "18",
      type: "Transactional",
      adminStatus: "Pending",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 9,
      sn: 9,
      audioId: 80,
      templateName: "Bs",
      fileFormate: "mp3",
      size: "150",
      duration: "15",
      type: "Transactional",
      adminStatus: "Approved",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 10,
      sn: 10,
      audioId: 90,
      templateName: "Abcd",
      fileFormate: "mp3",
      size: "50",
      duration: "3",
      type: "Transactional",
      adminStatus: "Disapproved",
      userStatus: "Inactive",
      action: "",
      play: "",
    },
    {
      id: 11,
      sn: 11,
      audioId: 100,
      templateName: "ab",
      fileFormate: "mp3",
      size: "100",
      duration: "9",
      type: "Transactional",
      adminStatus: "Approved",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 12,
      sn: 12,
      audioId: 101,
      templateName: "Da",
      fileFormate: "mp3",
      size: "250",
      duration: "17",
      type: "Transactional",
      adminStatus: "Disapproved",
      userStatus: "Inactive",
      action: "",
      play: "",
    },
    {
      id: 13,
      sn: 13,
      audioId: 102,
      templateName: "AD",
      fileFormate: "mp3",
      size: "90",
      duration: "6",
      type: "Transactional",
      adminStatus: "pending",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 14,
      sn: 14,
      audioId: 103,
      templateName: "ABD",
      fileFormate: "mp3",
      size: "100",
      duration: "7",
      type: "Transactional",
      adminStatus: "Pending",
      userStatus: "Inactive",
      action: "",
      play: "",
    },
    {
      id: 15,
      sn: 15,
      audioId: 104,
      templateName: "AbE",
      fileFormate: "mp3",
      size: "300",
      duration: "21",
      type: "Transactional",
      adminStatus: "Disapproved",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 16,
      sn: 16,
      audioId: 105,
      templateName: "Ap",
      fileFormate: "mp3",
      size: "10",
      duration: "1",
      type: "Transactional",
      adminStatus: "Approved",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 17,
      sn: 17,
      audioId: 106,
      templateName: "Ar",
      fileFormate: "mp3",
      size: "130",
      duration: "4",
      type: "Transactional",
      adminStatus: "Approved",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 18,
      sn: 18,
      audioId: 107,
      templateName: "As",
      fileFormate: "mp3",
      size: "115",
      duration: "5",
      type: "Transactional",
      adminStatus: "Disapproved",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 19,
      sn: 19,
      audioId: 108,
      templateName: "SS",
      fileFormate: "mp3",
      size: "95",
      duration: "3",
      type: "Transactional",
      adminStatus: "pending",
      userStatus: "Inactive",
      action: "",
      play: "",
    },
    {
      id: 20,
      sn: 20,
      audioId: 109,
      templateName: "App",
      fileFormate: "mp3",
      size: "100",
      duration: "2.5",
      type: "Transactional",
      adminStatus: "Approved",
      userStatus: "Active",
      action: "",
      play: "",
    },
    {
      id: 21,
      sn: 21,
      audioId: 110,
      templateName: "ABf",
      fileFormate: "mp3",
      size: "160",
      duration: "7",
      type: "Transactional",
      adminStatus: "Approved",
      userStatus: "Active",
      action: "",
      play: "",
    },
  ];

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

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

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
              sx={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
              }}
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
    <>
      <div className="mt-4">
        <Paper sx={{ height: 558 }}>
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
            checkboxSelection
            rowHeight={45}
            slots={{
              footer: CustomFooter,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            slotProps={{ footer: { totalRecords: rows.length } }}
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

        <Dialog
          header="Confirm Delete"
          visible={isVisible}
          onHide={() => setIsVisible(false)}
          className="lg:w-[30rem] md:w-[40rem] w-[20rem]"
          draggable={false}
        >
          <div className="flex items-center justify-center">
            <CancelOutlinedIcon
              sx={{ fontSize: 64, color: "ff3f3f" }}
              size={20}
            />
          </div>
          <div>
            <div className="p-4 text-center">
              <p className="text-[1.1rem] font-semibold text-gray-600">
                Are you sure ?
              </p>
              <p>
                Do you really want to delete <br />
                <span className="text-green-300">'{selectedTemplateName}'</span>
              </p>

              <div className="flex justify-center gap-4 mt-2">
                <UniversalButton
                  label="Cancel"
                  style={{
                    backgroundColor: "#090909",
                  }}
                  onClick={() => setIsVisible(false)}
                />
                <UniversalButton
                  label="Delete"
                  style={
                    {
                      // backgroundColor: "red",
                    }
                  }
                  onClick={() => setIsVisible(false)}
                />
              </div>
            </div>
          </div>
        </Dialog>

        {isOpenPlay && (
          <Dialog
            header={selectedPlay}
            visible={isOpenPlay}
            onHide={() => setIsOpenPlay(false)}
            className="lg:w-[30rem] md:w-[40rem] w-[20rem]"
            draggable={false}
          >
            <ObdAudioplayer />
          </Dialog>
        )}
      </div>
    </>
  );
};

export default Obdmanagecampaign;
