import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { Paper, Typography, Box, Button, Drawer } from "@mui/material";
import { useState } from "react";

import CustomNoRowsOverlay from "../../whatsapp/components/CustomNoRowsOverlay";
import { IPDetailsDrawer } from "./IPDetailsDrawer";

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
  const [selectedRow, setSelectedRow] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleView = (row) => {
    console.log("view details:", row);
    setSelectedRow(row);
  };


  // const columns = [
  //   { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
  //   {
  //     field: "user_id",
  //     headerName: "User ID",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   { field: "ip", headerName: "IP", flex: 1, minWidth: 120 },
  //   {
  //     field: "insert_time",
  //     headerName: "Insert Time",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "city",
  //     headerName: "City",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "postal",
  //     headerName: "Postal Code",
  //     flex: 1,
  //     minWidth: 150,
  //   },
  //   {
  //     field: "region",
  //     headerName: "Region",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "region_code",
  //     headerName: "Region Code",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "network",
  //     headerName: "Network",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "version",
  //     headerName: "IP Version",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "country_code",
  //     headerName: "Country Code",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "country_tld",
  //     headerName: "Country TLD",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "country_capital",
  //     headerName: "Country Capital",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "continent_code",
  //     headerName: "Continent Code",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "country_name",
  //     headerName: "Country Name",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "in_eu",
  //     headerName: "In EU",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "country_code_iso3",
  //     headerName: "Country Code ISO3",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "country_calling_code",
  //     headerName: "Country Calling Code",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "currency",
  //     headerName: "Currency",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "country_area",
  //     headerName: "Currenty Area",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "country_population",
  //     headerName: "Country Popluation",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "languages",
  //     headerName: "Languages",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "currency_name",
  //     headerName: "Currency Name",
  //     flex: 1,
  //     minWidth: 120,
  //   },

  //   {
  //     field: "latitude",
  //     headerName: "Latitude",
  //     flex: 1,
  //     minWidth: 150,
  //   },
  //   {
  //     field: "longitude",
  //     headerName: "Longitude",
  //     flex: 1,
  //     minWidth: 150,
  //   },
  //   {
  //     field: "timezone",
  //     headerName: "Timezone",
  //     flex: 1,
  //     minWidth: 150,
  //   },
  //   {
  //     field: "asn",
  //     headerName: "ASN",
  //     flex: 1,
  //     minWidth: 150,
  //   },
  //   {
  //     field: "utc_offset",
  //     headerName: "UTC Offset",
  //     flex: 1,
  //     minWidth: 150,
  //   },
  //   {
  //     field: "org",
  //     headerName: "Organization",
  //     flex: 1,
  //     minWidth: 150,
  //   },
  // ];

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "user_id",
      headerName: "User ID",
      flex: 1,
      minWidth: 120,
    },
    { field: "ip", headerName: "IP", flex: 1, minWidth: 120 },
    {
      field: "insert_time",
      headerName: "Insert Time",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleView(params.row)}
        >
          View Details
        </Button>
      ),
    },
  ];

  // for table

  // const rows = Array.isArray(data)
  //   ? data.map((item, index) => {
  //       let moreDetails = {};

  //       try {
  //         moreDetails =
  //           item.moreDetails && item.moreDetails !== "null"
  //             ? JSON.parse(item.moreDetails)
  //             : {};
  //       } catch (error) {
  //         console.error("Error parsing moredetails:", error);
  //       }

  //       return columns.reduce(
  //         (acc, col) => ({
  //           ...acc,
  //           id: index + 1,
  //           sn: index + 1,
  //           [col.field]: item[col.field] ?? moreDetails[col.field] ?? "-",
  //         }),
  //         {}
  //       );
  //     })
  //   : [];

  // for the drawer

  const rows = Array.isArray(data)
    ? data.map((item, index) => {
      let moreDetails = {};

      try {
        moreDetails =
          item.moreDetails && item.moreDetails !== "null"
            ? JSON.parse(item.moreDetails)
            : {};
      } catch (error) {
        console.error("Error parsing moreDetails:", error);
      }

      const row = {
        id: index + 1,
        sn: index + 1,
        ip: item.ip ?? "-",
        user_id: item.user_id ?? "-",
        insert_time: item.insert_time ?? "-",
        ...moreDetails,
      };

      return row;
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
          slotProps={{ footer: { totalRecords: rows.length } }}
          onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
          disableRowSelectionOnClick
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
              color: "#ccc",
            },
          }}
        />
      </Paper>
      {selectedRow && (
        <IPDetailsDrawer
          row={selectedRow}
          open={!!selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </>
  );
};

export default ManageIpDetailsTable;
