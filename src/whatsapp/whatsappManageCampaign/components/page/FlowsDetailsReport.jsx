import * as React from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Paper, Typography, Box, Button } from "@mui/material";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

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

const FlowsDetailsReport = ({ id, name }) => {
  const location = useLocation();
  const { data } = location.state || { data: [] };
  console.log("data", data);

  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // 🟢 Generate dynamic columns
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Base columns
    let cols = [
      { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
      {
        field: "mobile_no",
        headerName: "Mobile Number",
        flex: 1,
        minWidth: 150,
      },
    ];

    // Add dynamic columns from first row's fields
    const dynamicFields = data[0].fields || [];
    dynamicFields.forEach((field, idx) => {
      cols.push({
        field: `field_${idx}`,
        headerName: field.label,
        flex: 1,
        minWidth: 150,
      });
    });

    return cols;
  }, [data]);

  // 🟢 Generate rows
  const rows = useMemo(() => {
    return (
      data?.map((item, index) => {
        let row = {
          sn: index + 1,
          id: index + 1, // or item.UserSrno if available
          mobile_no: item.mobile_no,
        };

        // Map field inputs dynamically
        item.fields?.forEach((f, idx) => {
          row[`field_${idx}`] = f.input;
        });

        return row;
      }) || []
    );
  }, [data]);

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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
      <h1 className="my-4 text-lg font-medium text-center">
        WhatsApp Flows Details Reports
      </h1>
      <Paper sx={{ height: 400 }} id={id} name={name}>
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
          rowHeight={50}
          slots={{
            footer: CustomFooter,
            pagination: () => (
              <CustomPagination
                totalPages={totalPages}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
              />
            ),
          }}
          onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnMenu
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeaders": {
              color: "#193cb8",
              fontSize: "14px",
              fontWeight: "bold !important",
            },
            "& .MuiDataGrid-row--borderBottom": {
              backgroundColor: "#e6f4ff !important",
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default FlowsDetailsReport;
