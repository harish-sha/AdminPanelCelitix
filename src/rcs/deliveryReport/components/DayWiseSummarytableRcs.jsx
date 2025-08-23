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
import { render } from "timeago.js";
import moment from "moment";

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

const DayWiseSummarytableRcs = ({ id, name, isMonthWise, data = [] }) => {
  const [selectedRows, setSelectedRows] = React.useState([]);

  // const paginationModel = { page: 0, pageSize: 10 };
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    isMonthWise
      ? { field: "month", headerName: "Month", flex: 1, minWidth: 120 }
      : {
        field: "queDate",
        headerName: "Date",
        flex: 1,
        minWidth: 120,
        renderCell: (params) => (
          <>{moment(params.row.queDate).format("DD-MM-YYYY")}</>
        ),
      },
    // {
    //   field: "chargedUnit",
    //   headerName: "Charged Unit",
    //   flex: 1,
    //   minWidth: 120,
    // },
    { field: "count", headerName: "Count", flex: 1, minWidth: 120 },
    { field: "failed", headerName: "Failed", flex: 1, minWidth: 120 },
    { field: "blocked", headerName: "Blocked", flex: 1, minWidth: 120 },
    { field: "sent", headerName: "Sent", flex: 1, minWidth: 120 },
    { field: "delivered", headerName: "Delivered", flex: 1, minWidth: 120 },
    {
      field: "readCount",
      headerName: "Read",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "notDelivered",
      headerName: "Not Delivered",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "drnotAvailable",
      headerName: "PDR",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "chargedUnits",
      headerName: "Cost",
      flex: 1,
      minWidth: 120,
    },
    // { field: "pending", headerName: "Pending", flex: 1, minWidth: 120 },
    // { field: "others", headerName: "Others", flex: 1, minWidth: 120 },
  ];

  let rows = [];

  if (isMonthWise) {
    rows = Array.isArray(data)
      ? data.map((item, i) => ({
        id: i + 1,
        sn: i + 1,
        month: item.month,
        chargedUnit: item.chargedUnits,
        count: item.smscount,
        pending: item.pending,
        failed: item.failed,
        blocked: item.blocked,
        sent: item.sent,
        delivered: item.delivered,
        notDelivered: item.not_delivered,
        readCount: item.readCount,
        drnotAvailable: item.dr_not_available,
        others: item.others,
        chargedUnits: item.chargedUnits
      }))
      : [];
  } else {
    rows = Array.isArray(data)
      ? data.map((item, i) => ({
        id: i + 1,
        sn: i + 1,
        queDate: item.queuedate,
        chargedUnit: item.chargedUnits,
        count: item.smscount,
        pending: item.pending,
        failed: item.failed,
        blocked: item.blocked,
        sent: item.sent,
        delivered: item.delivered,
        notDelivered: item.not_delivered,
        readCount: item.readCount,
        drnotAvailable: item.dr_not_available,
        others: item.others,
        chargedUnits: item.chargedUnits
      }))
      : [];
  }

  // isMonthWise
  //   ? { field: "month", headerName: "Month", flex: 1, minWidth: 120 }

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
        // checkboxSelection
        rowHeight={45}
        slots={{ footer: CustomFooter }}
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

export default DayWiseSummarytableRcs;
