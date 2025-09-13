import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import usePagination from "@mui/material/usePagination";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import { useNavigate } from "react-router-dom";

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

  const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
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

const AttachmentLogsTableSms = ({ id, name, data = [] }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();

  const handleDetailed = (data) => {
    navigate("/smsAttachmentdetaillog", { state: { id: data?.srno } });
  };

  const handleDownload = () => {
    navigate("/download");
  };

  // const rows = Array.from({ length: 20 }, (_, i) => ({
  //   id: i + 1,
  //   sn: i + 1,
  //   campaignname: "XYZ",
  //   date: "27/09/2023",
  //   totalclicks: "6",
  // }));

  const rows = data?.map((item, i) => ({
    id: i + 1,
    sn: i + 1,
    srno: item.campaign_srno,
    campaignname: item.campaign_name,
    date: item.queTime,
    count: item.count
  }))

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 120 },
    {
      field: "campaignname",
      headerName: "Campaign Name",
      flex: 1,
      minWidth: 120,
    },
    { field: "date", headerName: "Que Date", flex: 1, minWidth: 120 },
    {
      field: "count",
      headerName: "Count",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Detailed Log" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleDetailed(params.row)}
            >
              <DescriptionOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          </CustomTooltip>
          {/* <CustomTooltip title="Download" placement="top" arrow>
            <IconButton onClick={() => handleDownload(params.row)}>
              <DownloadForOfflineOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip> */}
        </>
      ),
    },
  ];
  const totalPages = Math.ceil(data.length / paginationModel.pageSize);
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
            Total Records: <span className="font-semibold">{data.length}</span>
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
    </div>
  );
};

export default AttachmentLogsTableSms;
