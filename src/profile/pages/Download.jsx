import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import usePagination from "@mui/material/usePagination";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { IoSearch } from "react-icons/io5";
import CustomNoRowsOverlay from "../../whatsapp/components/CustomNoRowsOverlay";
import InputField from "../../whatsapp/components/InputField";
import CustomTooltip from "../../whatsapp/components/CustomTooltip";
import { getAllDownloadsList } from "@/apis/download/Download";
import toast from "react-hot-toast";
import UniversalButton from "@/components/common/UniversalButton";

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

const Download = ({ id, name }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [rows, setRows] = useState([]);

  const fetchDownloadList = async () => {
    setIsFetching(true);
    try {
      const response = await getAllDownloadsList();
      const data = response?.data || response?.result || response;
      if (data && Array.isArray(data)) {
        const mappedData = data.map((item, index) => ({
          id: index + 1,
          sn: index + 1,
          insertTime: item.insertTime || "N/A",
          status: item.status || "N/A",
          updateTime: item.updateTime || "N/A",
          remark: item.remark || "N/A",
          downloadPath: item.downloadPath || "N/A",
        }));

        setRows(mappedData);
      } else {
        console.error("Unexpected response structure:", response);
        toast.error("Failed to fetch download list. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching download list:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchDownloadList();
  }, []);

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "insertTime", headerName: "Insert Time", flex: 1, minWidth: 150 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 100 },
    { field: "updateTime", headerName: "Update Time", flex: 1, minWidth: 150 },
    { field: "remark", headerName: "Remark", flex: 1, minWidth: 300 },
    {
      field: "downloadPath",
      headerName: "Download Link",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.status === "complete") {
          return (
            <CustomTooltip title="Download" placement="top" arrow>
              <IconButton
                className="no-xs flex items-center justify-center"
                onClick={async () => {
                  // const baseURL = import.meta.env.VITE_ALLDOWNLOADURL;
                  // const baseURL = "http://95.216.43.170:8080/eventhandlerpro";
                  const baseURL = "/allDownloadUrl";
                  const fullDownloadUrl = `${baseURL}${params.row.downloadPath}`;
                  console.log("Attempting to download from:", fullDownloadUrl);
                  // const link = document.createElement("a");
                  // link.href = fullDownloadUrl;
                  // link.download = "";
                  // link.click();
                  try {
                    // Check if the file exists before proceeding
                    const response = await fetch(fullDownloadUrl, {
                      method: "HEAD",
                    });

                    if (response.ok) {
                      const link = document.createElement("a");
                      link.href = fullDownloadUrl;
                      link.download = "";
                      link.click();
                    } else {
                      // File does not exist, show error
                      toast.error("The file could not be found. Please try again later.");
                    }
                  } catch (error) {
                    console.error("Error checking file:", error);
                    toast.error("An error occurred while fetching the file. Please try again later.");
                  }
                }}
              >
                <DownloadForOfflineOutlinedIcon
                  sx={{
                    fontSize: "1.2rem",
                    color: "green",
                  }}
                />
              </IconButton>
            </CustomTooltip>
          );
        } else {
          return <div className="text-gray-700">Link Not Available</div>;
        }
      },
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
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-md font-semibold text-center text-gray-800 ">
          Your Download List
        </h1>
        <UniversalButton
          variant="contained"
          color="primary"
          onClick={fetchDownloadList}
          disabled={isFetching}
          label={isFetching ? "Refreshing..." : "Refresh"}
        />
      </div>

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

export default Download;
