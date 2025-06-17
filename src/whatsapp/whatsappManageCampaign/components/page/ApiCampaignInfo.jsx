import { getListofSendMsg, downloadCustomWhatsappReport, } from "@/apis/whatsapp/whatsapp";
import { Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import { Box } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { Button } from "@mui/material";
import moment from "moment";
import { id } from "date-fns/locale";
import UniversalButton from "@/components/common/UniversalButton";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import Loader from "@/whatsapp/components/Loader";
import { useDownload } from "@/context/DownloadProvider";
import UniversalSkeleton from "@/components/common/UniversalSkeleton.jsx";
import CustomTooltip from "@/components/common/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import { ImInfo } from "react-icons/im";
import InfoPopover from "@/components/common/InfoPopover";


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
    page: paginationModel.page,
    onChange: (_, newPage) => {
      setCurrentPage(newPage);
      setPaginationModel({ ...paginationModel, page: newPage });
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
    page: 1,
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { triggerDownloadNotification } = useDownload();
  const dropdownButtonRefs = useRef({});
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [clicked, setClicked] = useState([]);
  const closeDropdown = () => setDropdownOpenId(null);

  const handleInfo = (row) => {
    const id = row.id;
    setDropdownOpenId((prevId) => (prevId === id ? null : id));
    setClicked(row.additionalInfo || []);
  };


  async function handleFetchDetails(page = 1) {
    try {
      // const payload = {
      //   mobile: "",
      //   page: 0,
      //   source: "",
      //   deliveryStatus: state.log,
      //   status: "",
      // };
      // later update with upper code

      setIsLoading(true);

      const formattedFromDate = state.selectedDate
        ? moment(state.selectedDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");

      let status = "";
      let deliveryStatus = "";
      let selectedUser = state.selectedUser;
      console.log(selectedUser)

      const statusBased = ["failed", "submitted", "block", "busy"];
      const deliveryBased = ["read", "delivered", "undelivered"];

      if (statusBased.includes(state.log)) {
        status = state.log;
      } else if (deliveryBased.includes(state.log)) {
        deliveryStatus = state.log;
      }

      const payload = {
        fromDate: formattedFromDate,
        selectedUserId: selectedUser || 0,
        toDate: formattedFromDate,
        mobile: "",
        page,
        pageSize: paginationModel.pageSize,
        source: "API",
        deliveryStatus,
        status,
      };
      const res = await getListofSendMsg(payload);
      setTotalPage(res?.pages || 0);

      const formattedData = Array.isArray(res.data)
        ? res?.data?.map((item, index) => ({
          sn: index + 1,
          id: index + 1,
          ...item,
        }))
        : [];

      setData(formattedData);
    } catch (e) {
      console.log(e);
      return toast.error("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }
  // useEffect(() => {
  //   if (!state) {
  //     window.history.back();
  //     return;
  //   }
  //   handleFetchDetails();
  // }, [state]);

  async function handleExport() {
    let selectedUser = state.selectedUser;
    try {
      const payload = {
        type: 2,
        selectedUserId: selectedUser,
        fromDate: moment(state.selectedDate).format("YYYY-MM-DD"),
        toDate: moment(state.selectedDate).format("YYYY-MM-DD"),
        isCustomField: 0,
        customColumns: "",
        status: state.log,
        delStatus: {},
      };
      const res = await downloadCustomWhatsappReport(payload);

      if (!res?.status) {
        return toast.error(res?.msg);
      }

      toast.success(res?.msg);
      triggerDownloadNotification();

    } catch (e) {
      toast.error("Error downloading attachment");
      console.log(e);
    }
  }

  useEffect(() => {
    handleFetchDetails(currentPage);
  }, [currentPage]);

  const columns = [
    { field: "sn", headerName: "S.No", width: 60 },
    { field: "wabaNumber", headerName: "WABA Number", width: 130 },
    { field: "mobileNo", headerName: "Mobile Number", minWidth: 135 },
    { field: "source", headerName: "Source", minWidth: 100 },
    { field: "status", headerName: "Status", minWidth: 100 },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 150,
    },
    { field: "reason", headerName: "Reason", width: 150 },
    { field: "sentTime", headerName: "Sent", width: 200 },
    {
      field: "requestJson",
      headerName: "Request JSON",
      flex: 1,
      minWidth: 120,
    },
    // { field: "readTime", headerName: "Read Time", flex: 1, minWidth: 120 },
    // { field: "queTime", headerName: "Que Time", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 0,
      width: 70,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Info" placement="top" arrow>
            <span>
              <IconButton
                type="button"
                ref={(el) => {
                  if (el) dropdownButtonRefs.current[params.row.id] = el;
                }}
                onClick={() => handleInfo(params.row)}
                className="no-xs relative"
              >
                <ImInfo size={18} className="text-green-500 " />
              </IconButton>
              <InfoPopover
                anchorEl={dropdownButtonRefs.current[params.row.id]}
                open={dropdownOpenId === params.row.id}
                onClose={closeDropdown}
              >
                {clicked && Object.keys(clicked).length > 0 ? (
                  <table className="w-80 text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                    <tbody>
                      {Object.entries(clicked).map(([key, value], index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors border-b last:border-none"
                        >
                          <td className="px-4 py-2 font-medium text-gray-600 capitalize w-1/3 text-nowrap">
                            {additionalInfoLabels[key] || key}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            {key === "isEnabledForInsights"
                              ? value === true || value === "true"
                                ? "True"
                                : "False"
                              : value || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-sm text-gray-400 italic px-2 py-2">
                    No data
                  </div>
                )}
              </InfoPopover>
            </span>
          </CustomTooltip>
        </>
      ),
    },

  ];

  const additionalInfoLabels = {
    queTime: "Que Time",
    readTime: "Read Time",
    // sentTime: "Sent Time"

  };


  // const rows = Array.isArray(data)
  //   ? data.map((item, i) => ({
  //     id: i + 1,
  //     sn: i + 1,
  //     ...item, // Spread the item properties
  //   }))
  //   : [];

  const rows = Array.isArray(data)
    ? data.map((item, i) => ({
      id: i + 1,
      sn: i + 1,
      wabaNumber: item.wabaNumber,
      mobileNo: item.mobileNo,
      source: item.source,
      status: item.status,
      deliveryStatus: item.deliveryStatus,
      reason: item.reason || "-",
      requestJson: item.requestJson || "-",
      readTime: item.readTime || "-",
      queTime: item.queTime || "-",
      sentTime: item.sentTime || "-",
      additionalInfo: {
        queTime: item.queTime || "-",
        readTime: item.readTime || "-",
        // sentTime: item.sentTime || "N/A",
      },
      // ...item,
    }))
    : [];

  //   const totalPages = Math.floor(totalPage / paginationModel.pageSize);
  const totalPages = totalPage;

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

  // if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl mb-5 text-gray-700">Logs Detail Report</h1>
        {/* <UniversalButton
          id="export"
          name="export"
          onClick={handleExport}
          label={"Export"}
          icon={
            <IosShareOutlinedIcon
              fontSize="small"
              sx={{ marginBottom: "3px" }}
            />
          }
        /> */}
      </div>

      {isLoading ? (
        <div className="w-full">
          <UniversalSkeleton height="35rem" width="100%" />
        </div>
      ) : (
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
            // disableColumnResize
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
      )}
    </>
  );
};
