import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
// import CustomNoRowsOverlay from "../../components/layout/CustomNoRowsOverlay";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import CustomTooltip from "../../components/common/CustomTooltip";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VerticalBarDemo from "../components/VerticalBarChart";
import DoughnutChartDemo from "../components/DoughnChart";
import ActionAreaCard from "../components/EmailCards";

const EmailReport = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [active, setActive] = useState();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },

    {
      field: "templateName",
      headerName: "Template Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "createOn",
      headerName: "Create On",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
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
          <IconButton onClick={() => handleDuplicate(params.row)}>
            <EditNoteIcon
              sx={{
                fontSize: "1.2rem",
                color: "gray",
              }}
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
      templateName: "Ab",
      createOn: "Test",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      sn: 2,
      templateName: "Abc",
      createOn: "Test",
      status: "Active",
      action: "",
    },
    {
      id: 3,
      sn: 3,
      templateName: "Cb",

      createOn: "Test",
      status: "Inactive",
      action: "",
    },
    {
      id: 4,
      sn: 4,
      templateName: "Xyz",

      createOn: "Test",
      status: "Inactive",
      action: "",
    },
    {
      id: 5,
      sn: 5,
      templateName: "xb",

      createOn: "Test",
      status: "Inactive",
      action: "",
    },
    {
      id: 6,
      sn: 6,
      templateName: "yb",

      createOn: "Test",
      status: "Inactive",
      action: "",
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
          {selectedRow.length > 0 && (
            <Typography
              variant="body2"
              sx={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
              }}
            >
              {selectedRow.length} Rows Selected
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
      <div className="w-full">
        <p className="text-xl font-semibold mt-4">Delivery Per Country</p>
        <div className="flex flex-row gap-2 w-full justify-around">
          <div className="flex flex-row justify-ceneter items-center ">
            <DoughnutChartDemo />
          </div>

          <div className="flex flex-row-reverse gap-5 mt-4">
            <VerticalBarDemo />
            <p className="flex-col  ml-10 text-xl font-semibold ">
              Opens
              <br />
              <span className="text-sm ">Daily Page Hits</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3 mt-4 w-full">
          <ActionAreaCard />
        </div>

        <div className="mt-4">
          <Paper sx={{ height: 558 }}>
            <DataGrid
              // id={id}
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
              onRowSelectionModelChange={(ids) => setSelectedRow(ids)}
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
        </div>
      </div>
    </>
  );
};

export default EmailReport;
