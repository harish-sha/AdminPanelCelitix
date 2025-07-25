import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import styled from "styled-components";
import usePagination from "@mui/material/usePagination/usePagination";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import ReplyIcon from "@mui/icons-material/Reply";
import { Switch } from "@mui/material";
import { Dialog } from "primereact/dialog";
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/components/common/UniversalButton";

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

const CommentModerationTable = ({ id, name }) => {
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleReply = (row) => {
    setSelectedRow(row);
    setVisible(true);
  };
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const rows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    comments: "Nice",
    username: "pro@123",
    type: "Reply",
    insert: "25-07-2025",
    visibility: "",
  }));

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "comments",
      headerName: "Comments",
      flex: 1,
      minWidth: 80,
    },
    { field: "username", headerName: "User Name", flex: 1, minWidth: 80 },
    { field: "type", headerName: "Type", flex: 1, minWidth: 80 },
    { field: "insert", headerName: "Insert Time", flex: 1, minWidth: 80 },

    {
      field: "visibility",
      headerName: "visibility",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <>
          {/* {params?.row?.status === "approved" && ( */}
          <CustomTooltip
            arrow
            placement="top"
            title={params.row.active === 1 ? "unhide" : "hide"}
          >
            <Switch
              checked={params.row.active === 1}
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
          {/* // )} */}
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Comments Reply" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleReply({ id: 1 })}
            >
              <ReplyIcon
                className="text-blue-500 cursor-pointer hover:text-blue-600"
                fontSize="small"
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Comments Delete" placement="top" arrow>
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
    <>
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
        header="Reply to Comment"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="space-y-3">
          <InputField placeholder="Enter comments" />
          <div className="flex justify-center">
            <UniversalButton label="Send"     />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CommentModerationTable;
