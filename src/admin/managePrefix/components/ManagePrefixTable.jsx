import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import styled from "styled-components";
import usePagination from "@mui/material/usePagination/usePagination";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import { MdOutlineDeleteForever } from "react-icons/md";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Dialog } from "primereact/dialog";
import UniversalButton from "@/components/common/UniversalButton";
import toast from "react-hot-toast";
import { deletePrefix } from "@/apis/admin/admin";

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

const ManagePrefixTable = ({ id, name, data = [], handleSearch }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [deleteDialogState, setDeleteDialogState] = useState({
    visible: false,
    data: null,
  });

  const handleDelete = (row) => {
    setDeleteDialogState({ visible: true, data: row });
  };

  async function handleDeletePrefix() {
    try {
      const data = deleteDialogState.data;

      if (!data.prefix || !data.operatorSrno || !data.countrySrno) {
        toast.error("Something went wrong while deleting the prefix");
        return;
      }

      const payload = {
        operatorSrno: data.operatorSrno,
        countrySrno: data.countrySrno,
        prefix: data.prefix.split(),
      };

      const res = await deletePrefix(payload);
      // if (!res.length || !res.flag) {
      //   toast.error("Failed to delete prefix. Please try again");
      //   return;
      // }

      if (Array.isArray(res) && !res.length) {
        return toast.error("Failed to delete prefix. Please try again");
      } else if (!res.flag) {
        return toast.error("Failed to delete prefix. Please try again");
      }

      toast.success("Prefix deleted successfully");
      setDeleteDialogState({ visible: false, data: null });
      await handleSearch();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong while deleting the prefix");
    }
  }

  const rows = Array.isArray(data)
    ? data.map((item, i) => ({
        sn: i + 1,
        id: item.srNo,
        ...item,
      }))
    : [];

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "prefix",
      headerName: "Mobile Series",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "operatorSrno",
      headerName: "Operator Number",
      flex: 1,
      minWidth: 120,
    },
    { field: "circleSrno", headerName: "Circle Number", flex: 1, minWidth: 90 },
    {
      field: "countrySrno",
      headerName: "Country Code",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "countryName",
      headerName: "Country Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
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

      <Dialog
        header="Add Prefix"
        visible={deleteDialogState.visible}
        onHide={() =>
          setDeleteDialogState({
            visible: false,
            data: {},
          })
        }
        className="w-2/3 md:w-1/2 lg:w-1/3"
        draggable={false}
      >
        <div>
          <div className="p-4 text-center">
            <p className="text-[1.1rem] font-semibold text-gray-600">
              Are you sure ?
            </p>
            <p>
              Do you really want to delete selected Prefix? This process cannot
              be undo.
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <UniversalButton
                label="Cancel"
                style={{
                  backgroundColor: "#090909",
                }}
                onClick={() => {
                  setDeleteDialogState({
                    visible: false,
                    data: {},
                  });
                }}
              />
              <UniversalButton
                label="Delete"
                style={{
                  backgroundColor: "red",
                }}
                onClick={handleDeletePrefix}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManagePrefixTable;
