import React, { useEffect, useState, useRef } from "react";
import InputField from "../../../whatsapp/components/InputField";
import { IoSearch } from "react-icons/io5";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import { DataTable } from "../../../components/layout/DataTable";
import toast from "react-hot-toast";
import { fetchDetailsAttachment } from "../../../apis/sms/sms";
import { useLocation, useNavigate } from "react-router-dom";
import UniversalSkeleton from "../../../whatsapp/components/UniversalSkeleton";
import moment from "moment";
import CustomTooltip from "@/components/common/CustomTooltip";
import InfoPopover from "@/components/common/InfoPopover";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";

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

const SmsAttachmentdetaillog = () => {
  const [isFetching, setIsFetching] = useState(false);
  // const [rows, setRows] = useState([]);
  // const [columns, setColumns] = useState([]);
  const [mobileNo, setMobileNo] = useState("");
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const dropdownButtonRefs = useRef({});

  const handleInfo = (row) => {
    setDropdownOpenId(row.id);
  };

  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const closeDropdown = () => {
    setDropdownOpenId(null);
  };

  const rows = data?.map((item, index) => ({
    id: index,
    sn: index + 1,
    mobile_no: item.mobile_no || "-",
    insert_time: item.insert_time || "-",
    attachment_type: item.attachment_type || "-",
    click_time: item.click_time || "-",
    // info: item.info ?? "",
  }));

  const columns = [
    {
      field: "sn",
      headerName: "S.No",
      flex: 0,
      width: 80,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "mobile_no",
      headerName: "Mobile No.",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "insert_time",
      headerName: "Insert Time",
      flex: 1,
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "click_time",
      headerName: "Click Time",
      flex: 1,
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "attachment_type",
      headerName: "Attachment Type",
      flex: 1,
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    // {
    //   field: "info",
    //   headerName: "Info",
    //   flex: 1,
    //   minWidth: 220,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         whiteSpace: "normal",
    //         wordWrap: "break-word",
    //         overflowWrap: "break-word",
    //         padding: "5px 0px",
    //       }}
    //     >
    //       {params.value}
    //     </div>
    //   ),
    // },
    {
      field: "action",
      headerName: "Action",
      flex: 0,
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center justify-start h-full">
          <CustomTooltip title="View Campaign" placement="top" arrow>
            <IconButton
              className="text-xs"
              ref={(el) => {
                if (el) dropdownButtonRefs.current[params.row.id] = el;
              }}
              onClick={() => handleInfo(params.row)}
            >
              <InfoOutlinedIcon
                sx={{ fontSize: "1.2rem", color: "green" }}
                className="mt-1"
              />
            </IconButton>
          </CustomTooltip>
          <InfoPopover
            anchorEl={dropdownButtonRefs.current[params.row.id]}
            open={dropdownOpenId == params.row.id}
            onClose={closeDropdown}
          >
            {data[params.row.id] ? (
              <div className="w-[420px] max-w-full mx-2 px-1">
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                  {[
                    { label: "System Info", key: "info" },
                    // { label: "Campaign Srno", key: "campaign_srno" },
                    // { label: "Click Time", key: "click_time" },
                    { label: "IP", key: "ip" },
                    { label: "Is Click", key: "is_click" },
                    // { label: "Node Id", key: "node_id" },
                    { label: "OG Url", key: "og_url" },
                    // { label: "Template ID", key: "template_id" },
                    // { label: "UniqueId", key: "uniqueid" },
                    // { label: "User Srno", key: "user_srno" },
                    // {
                    //   label: "Workflow Campaign Srno",
                    //   key: "workflow_campaign_srno",
                    // },
                    // { label: "Workflow Flag", key: "workflow_flag" },
                    // { label: "Workflow Srno", key: "workflow_srno" },
                  ].map(({ label, key }) => (
                    <React.Fragment key={key}>
                      <div className="font-medium capitalize text-gray-600 border-b border-gray-200 pb-2 text-nowrap">
                        {label}
                      </div>
                      <div
                        className={`text-right font-semibold text-gray-800 border-b text-wrap border-gray-200 pb-2 ${key === "og_url"
                          ? "break-words whitespace-normal"
                          : "text-nowrap"
                          }`}
                      >
                        {data[params.row.id][key] ?? "N/A"}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No Data Available</div>
            )}
          </InfoPopover>
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(data?.length / paginationModel.pageSize);
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
            Total Records: <span className="font-semibold">{data?.length}</span>
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

  const navigate = useNavigate();
  let { state } = useLocation();

  const handleFetchAttachmentDetails = async () => {
    try {
      setIsFetching(true);
      const res = await fetchDetailsAttachment(state.id, mobileNo);
      setData(res);
    } catch (e) {
      toast.error("Error fetching attachment details");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    handleFetchAttachmentDetails();
  }, [state]);

  return (
    <div>
      <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex--wrap">
        <div className="w-full sm:w-56">
          <InputField
            label="Mobile Number"
            id="detailslogmobile"
            name="detailslogmobile"
            type="number"
            placeholder="Enter Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-56">
          <div className="w-max-content">
            <UniversalButton
              label="Search"
              id="detailslogsearch"
              name="detailslogsearch"
              variant="primary"
              icon={<IoSearch />}
              onClick={handleFetchAttachmentDetails}
            />
          </div>
        </div>
      </div>

      {isFetching ? (
        <UniversalSkeleton height="35rem" width="100%" />
      ) : (
        <Paper sx={{ height: 558 }} id={state.id} name={name}>
          <DataGrid
            id={state.id}
            name={name}
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20, 50]}
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            getRowHeight={() => "auto"}
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
      )}
    </div>
  );
};

export default SmsAttachmentdetaillog;
