import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay.jsx";
import CustomNoRowsOverlay from "../../whatsapp/components/CustomNoRowsOverlay";

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

const ManageIpDetailsTable = ({ id, name, data = [] }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();

  const handleView = (row) => {
    console.log("View campaign:", row);
  };

  const handleSummaryReport = (row) => {
    navigate("/wcampaigndetailsreport", {
      state: {
        campaignSrno: row.campaignSrno,
        campaignName: row.campaignName,
      },
    });
  };

 

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "ip", headerName: "IP", flex: 1, minWidth: 120 },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "reginon_code",
      headerName: "Region Code",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "country_code",
      headerName: "Country Code",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "country_name",
      headerName: "Country Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "country_code_iso3",
      headerName: "Country Code ISO3",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "postal",
      headerName: "Postal",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "latitude",
      headerName: "Latitude",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "timezone",
      headerName: "Timezone",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "asn",
      headerName: "ASN",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "org",
      headerName: "Organization",
      flex: 1,
      minWidth: 150,
    },
  ];

  const rows = Array.isArray(data)
    ? data.map((item, index) => {
        return columns.reduce(
          (acc, col) => ({
            ...acc,
            id: index + 1,
            sn: index + 1,
            [col.field]: item[col.field] ?? "-",
          }),
          {}
        );
      })
    : [];

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
  );
};

export default ManageIpDetailsTable;
