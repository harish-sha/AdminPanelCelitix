import { getListofSendMsg } from "@/apis/whatsapp/whatsapp";
import { Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import { Box } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { Button } from "@mui/material";
import moment from "moment";

const PaginationList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});

const CustomPaginatior = ({
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

export const ApiCampaignInfo = () => {
  const { state } = useLocation();

  if (!state) {
    return null;
  }

  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  async function handleFetchDetails(page = 0) {
    try {
      // const payload = {
      //   mobile: "",
      //   page: 0,
      //   source: "",
      //   deliveryStatus: state.log,
      //   status: "",
      // };
      // later update with upper code

      const formattedFromDate = state.selectedDate
        ? moment(state.selectedDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");

      let status = "";
      let deliveryStatus = "";

      const statusBased = ["failed", "submitted", "block", "busy"];
      const deliveryBased = ["read", "delivered", "undelivered"];

      if (statusBased.includes(state.log)) {
        status = state.log;
      } else if (deliveryBased.includes(state.log)) {
        deliveryStatus = state.log;
      }

      const payload = {
        fromDate: formattedFromDate,
        toDate: formattedFromDate,
        mobile: "",
        page,
        pageSize: paginationModel.pageSize,
        source: "API",
        deliveryStatus,
        status,
      };
      const res = await getListofSendMsg(payload);
      // const responseData = Array.isArray(res) ? res : [];
      // setTotalPage(5000);
      // // console.log(res);
      // setData(responseData);
      setTotalPage(res?.total || 0);

      const formattedData = Array.isArray(res.data)
        ? res?.data?.map((item, index) => ({
          sn: index + 1,
          id: index + 1,
          ...item,
        }))
        : [];

      console.log("formatted data", formattedData);
      setData(formattedData);
    } catch (e) {
      console.log(e);
      return toast.error("Error fetching data");
    }
  }
  // useEffect(() => {
  //   if (!state) {
  //     window.history.back();
  //     return;
  //   }
  //   handleFetchDetails();
  // }, [state]);

  useEffect(() => {
    handleFetchDetails(currentPage);
  }, [currentPage]);

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "wabaNumber", headerName: "WABA Number", flex: 1, width: 150 },
    { field: "mobileNo", headerName: "Mobile Number", flex: 1, minWidth: 150 },
    { field: "source", headerName: "Source", flex: 1, minWidth: 120 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      flex: 1,
      minWidth: 120,
    },
    { field: "reason", headerName: "Reason", flex: 2, minWidth: 120 },
    { field: "sentTime", headerName: "Sent", flex: 1, minWidth: 120 },
    { field: "deliveryTime", headerName: "Delivery Time", flex: 1, minWidth: 120 },
    { field: "readTime", headerName: "Read Time", flex: 1, minWidth: 120 },
    { field: "queTime", headerName: "Que Time", flex: 1, minWidth: 120 },
  ];

  // const rows = Array.from({ length: 20 }, (_, i) => ({
  //   id: i + 1,
  //   sn: i + 1,
  //   wabaNumber: `WABA-${1000 + i}`,
  //   mobileNo: `98765432${(10 + i).toString().slice(-2)}`,
  //   source: "API",
  //   status: "Pending",
  //   deliveryStatus: "Sent",
  //   reason: "N/A",
  //   sent: `2025-04-10 10:${i.toString().padStart(2, "0")}`,
  //   deliveryTime: `2025-04-10 10:${(i + 2).toString().padStart(2, "0")}`,
  //   read: `2025-04-10 10:${(i + 4).toString().padStart(2, "0")}`,
  //   que: `2025-04-10 10:${(i + 1).toString().padStart(2, "0")}`,
  // }));

  // const rows = data?.map((item, i) => ({
  //   id: i + 1,
  //   // sn: i + 1,
  //   sn: paginationModel.page * paginationModel.pageSize + i + 1,
  //   // wabaNumber: WABA-${1000 + i},
  //   // mobileNo: 98765432${(10 + i).toString().slice(-2)},
  //   // source: "API",
  //   // status: "Pending",
  //   // deliveryStatus: "Sent",
  //   // reason: "N/A",
  //   // sent: 2025-04-10 10:${i.toString().padStart(2, "0")},
  //   // deliveryTime: 2025-04-10 10:${(i + 2).toString().padStart(2, "0")},
  //   // read: 2025-04-10 10:${(i + 4).toString().padStart(2, "0")},
  //   // que: 2025-04-10 10:${(i + 1).toString().padStart(2, "0")},
  //   ...item,
  // }));

  const rows = Array.isArray(data)
    ? data.map((item, i) => ({
      id: i + 1,
      sn: paginationModel.page * paginationModel.pageSize + i + 1,
      ...item, // Spread the item properties
    }))
    : [];

  //   const totalPages = Math.floor(totalPage / paginationModel.pageSize);
  const totalPages = Math.ceil(totalPage / paginationModel.pageSize);

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
          {selectedRows?.length > 0 && (
            <Typography
              variant="body2"
              sx={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
              }}
            >
              {selectedRows?.length} Rows Selected
            </Typography>
          )}

          {/* <Typography variant="body2">
            Total Records: <span className="font-semibold">{totalPage}</span>
          </Typography> */}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <CustomPaginatior
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
      <h1 className="text-2xl mb-5 text-gray-700">Logs Detail Report</h1>
      <Paper sx={{ height: 558 }}>
        <DataGrid
          // id={id}
          // name={name}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          // checkboxSelection
          rowHeight={45}
          slots={{
            footer: CustomFooter,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{ footer: { totalRecords: rows.length } }}
          onRowSelectionModelChange={(ids) => { }}
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
    </>
  );
};
