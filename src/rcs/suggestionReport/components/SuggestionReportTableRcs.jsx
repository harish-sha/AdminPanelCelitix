import * as React from "react";
import { useState } from "react";
import {
  IconButton,
  Paper,
  Typography,
  Box,
  Button,
  Tooltip,
  Popover,
} from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Dialog } from "primereact/dialog";

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
  handleSearch,
  setCurrentPage,
}) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) => {
      // console.log("newPage", newPage);
      setPaginationModel({ ...paginationModel, page: newPage - 1 });
      setCurrentPage(newPage);
    },
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

const SuggestionReportTableRcs = ({
  id,
  name,
  data = [],
  handleSearch,
  paginationModel,
  setPaginationModel,
  setCurrentPage,
  totalPage,
  columns,
  fileData,
  setFileData,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  // const [fileData, setFileData] = useState({
  //   url: "",
  //   type: "",
  // });
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  // function handleView(row) {
  //   if (!row.fileUri || !row.mimeType) return;
  //   const validImageTypes = [
  //     "image/jpeg",
  //     "image/png",
  //     "image/jpg",
  //     "image/gif",
  //   ];

  //   const validVideoTypes = [
  //     "video/mp4",
  //     // "image/png",
  //     // "image/jpg",
  //     // "image/gif",
  //   ];
  //   const validDocumentTypes = [
  //     "application/pdf",
  //   ];
  //   const validAudioTypes = [
  //     "audio/mp4",
  //   ];

  //   if (validImageTypes.includes(row.mimeType)) {
  //     setFileData({
  //       url: row.fileUri,
  //       type: "image",
  //     });
  //   }

  //   if (validVideoTypes.includes(row.mimeType)) {
  //     setFileData({
  //       url: row.fileUri,
  //       type: "video",
  //     });
  //   }
  //   if (validDocumentTypes.includes(row.mimeType)) {
  //     setFileData({
  //       url: row.fileUri,
  //       type: "pdf",
  //     });
  //   }
  //   if (validAudioTypes.includes(row.mimeType)) {
  //     setFileData({
  //       url: row.fileUri,
  //       type: "audio",
  //     });
  //   }
  //   setIsDialogOpen(true);
  // }

  // const columns = [
  //   { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
  //   {
  //     field: "mobileNo",
  //     headerName: "Mobile Number",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "messageType",
  //     headerName: "Messaging Type",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "message",
  //     headerName: "Message",
  //     flex: 1,
  //     minWidth: 120,
  //     renderCell: (params) => {
  //       if (params.row.messageType === "USER_FILE") {
  //         return (
  //           // <img
  //           //   src={params.fileuri}
  //           //   alt="User Upload"
  //           //   style={{
  //           //     width: 50,
  //           //     height: 50,
  //           //     objectFit: "cover",
  //           //     borderRadius: 5,
  //           //   }}
  //           // />
  //           <IconButton onClick={(e) => handleView(params.row)}>
  //             <RemoveRedEyeOutlinedIcon
  //               sx={{
  //                 fontSize: "1.2rem",
  //                 color: "green",
  //               }}
  //             />
  //           </IconButton>
  //         );
  //       } else if (params.row.messageType === "LOCATION") {
  //         return (
  //           <>
  //             <p>
  //               {params.row.latitude} , {params.row.longitude}
  //             </p>
  //             {/* <p>{params.row.longitude}</p> */}
  //           </>
  //         );
  //       } else return params.row.message;
  //     },
  //   },
  //   {
  //     field: "insertTime",
  //     headerName: "Receive Time",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  // ];

  const rows = Array.isArray(data?.data)
    ? data?.data?.map((item, i) => ({
      id: i + 1,
      sn: i + 1,
      ...item,
      message: item.message,
      receivetime: "27/01/2024 14:58:39",
    }))
    : [];

  const totalPages = Math.ceil(data?.total / paginationModel.pageSize);

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
            Total Records: <span className="font-semibold">{data?.total}</span>
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
            handleSearch={handleSearch}
            setCurrentPage={setCurrentPage}
          />
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
          rowHeight={45}
          slots={{
            footer: CustomFooter,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          pageSizeOptions={[10, 20, 50]}
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
        header="View Message"
        visible={isDialogOpen}
        onHide={() => {
          setIsDialogOpen(false);
          setFileData({
            url: "",
            type: "",
          });
        }}
        // style={{ width: "50%" }}
        className="w-[40rem]"
        draggable={false}
      >
        <div className="flex items-center justify-center">
          {fileData && fileData.type === "image" && (
            <img src={fileData?.url} alt={fileData?.url} className="rounded-md max-w-full max-h-[30rem]" />
          )}
          {fileData && fileData.type === "video" && (
            <video controls src={fileData?.url} className="rounded-md max-w-full max-h-[30rem]" />
          )}
          {fileData && fileData.type === "audio" && (
            <audio controls src={fileData?.url} className="rounded-md max-w-full  max-h-[30rem]" />
          )}
          {fileData && fileData.type === "pdf" && (
            <iframe src={fileData?.url} className="rounded-md max-w-full  max-h-[30rem]" />
          )}
        </div>
      </Dialog>
    </>
  );
};

export default SuggestionReportTableRcs;
