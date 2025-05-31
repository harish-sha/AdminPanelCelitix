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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay.jsx";
import moment from "moment";
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
  setCurrentPage,
}) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) => {
      setCurrentPage(newPage);
      setPaginationModel({ ...paginationModel, page: newPage - 1 });
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

const WhatsappConversationTable = ({
  id,
  name,
  data = [],
  paginationModel,
  setPaginationModel,
  setCurrentPage,
  totalPage,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const totalPages = Math.ceil(totalPage / paginationModel.pageSize);

  const [fileData, setFileData] = useState({
    url: "",
    type: "",
    mimeType: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleView(row) {
    console.log(row);

    if (!row.mediaPath || !row.replyType) return;
    const type = row.replyType.toLowerCase();

    let mimeType = "";

    if (type === "document") {
      const pathname = new URL(row.mediaPath).pathname;
      mimeType = pathname.split(".").pop();
    }
    setFileData({ url: row.mediaPath, type, mimeType });
    setIsDialogOpen(true);
  }

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "contectName",
      headerName: "Contact Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "mobileNo",
      headerName: "Mobile Number",
      flex: 1,
      minWidth: 120,
    },
    { field: "replyType", headerName: "Reply Type", flex: 1, minWidth: 120 },
    {
      field: "messageBody",
      headerName: "Message",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const type = params.row.replyType.toLowerCase();
        const mediaOptions = ["image", "document", "video"];
        const isRender = mediaOptions.includes(type) ?? false;
        if (isRender) {
          return (
            <IconButton onClick={(e) => handleView(params.row)}>
              <RemoveRedEyeOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          );
        }
      },
    },
    {
      field: "wabaNumber",
      headerName: "WabaNumber",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "replyTime",
      headerName: "Time",
      flex: 1,
      minWidth: 120,
      renderCell: (params) =>
        moment(params.row.replyTime).format("DD-MM-YYYY HH:mm:ss"),
    },
  ];

  const rows = Array.isArray(data?.data)
    ? data?.data.map((item, index) => ({
        id: index + 1,
        sn: index + 1,
        ...item,
      }))
    : [];

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
            Total Records:{" "}
            <span className="font-semibold">{data?.total || 0}</span>
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
          slotProps={{ footer: { totalRecords: totalPage } }}
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
            <img
              src={fileData?.url}
              alt={fileData?.url}
              className="rounded-md max-w-full max-h-[30rem]"
            />
          )}
          {fileData && fileData.type === "video" && (
            <video
              controls
              src={fileData?.url}
              className="rounded-md max-w-full max-h-[30rem]"
            />
          )}

          {fileData &&
            fileData.type === "document" &&
            fileData.mimeType === "pdf" && (
              <iframe
                src={fileData.url}
                className="h-100 w-full border border-gray-200 rounded-md bg-center bg-no-repeat"
              />
            )}
          {fileData &&
            fileData.type === "document" &&
            fileData.mimeType === "xlsx" && (
              <iframe
                // src={fileData?.url}
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${fileData.url}`}
                className="h-100 w-full border border-gray-200 rounded-md bg-center bg-no-repeat"
              />
            )}
          {fileData &&
            fileData.type === "document" &&
            fileData.mimeType === "docx" && (
              <iframe
                // src={fileData?.url}
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${fileData.url}`}
                className="h-100 w-full border border-gray-200 rounded-md bg-center bg-no-repeat"
              />
            )}
        </div>
      </Dialog>
    </>
  );
};

export default WhatsappConversationTable;
