import { Paper, Typography, Box, Button, styled } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import usePagination from "@mui/material/usePagination/usePagination";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Switch } from "@mui/material";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import toast from "react-hot-toast";
import { syncTemplateRcs } from "@/apis/rcs/rcs";
import { render } from "timeago.js";

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

const ManageTemplatetableRcs = ({
  id,
  name,
  data = [],
  setTemplateDialogVisible,
  setTemplateid,
  setTemplateDeleteVisible,
  updateTemplateStatus,
  fetchTemplateDataDetails,
  handleFetchTempData,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleRefreshStatus = async (data) => {
    const res = await syncTemplateRcs(data?.srno);
    toast.success("Status Updated Successfully");

    await handleFetchTempData(id);
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "agentId", headerName: "Agent", flex: 1, minWidth: 120 },
    {
      field: "templateName",
      headerName: "Template Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "templateType",
      headerName: "Template Type",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => params.row.templateType?.toUpperCase(),
    },
    { field: "insertTime", headerName: "Created On", flex: 1, minWidth: 120 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120, renderCell: (params) => params.row.status?.toUpperCase(), },
    {
      field: "active",
      headerName: "Active",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <>
          {params?.row?.status === "approved" && (
            <CustomTooltip
              arrow
              placement="top"
              title={params.row.active === 1 ? "Active" : "Inactive"}
            >
              <Switch
                checked={params.row.active === 1}
                onChange={() => {
                  updateTemplateStatus(params.row);
                }}
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
          )}
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip title="View Template" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => {
                setTemplateDialogVisible(true);
                fetchTemplateDataDetails(params.row.srno);
              }}
            >
              <VisibilityIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          </CustomTooltip>

          {["Operator processing", "Submitted"].includes(params.row.status) && (
            <CustomTooltip title="Sync Status" placement="top" arrow>
              <IconButton
                className="text-xs"
                onClick={() => {
                  handleRefreshStatus(params.row);
                }}
              >
                <SyncOutlinedIcon
                  sx={{
                    fontSize: "1.2rem",
                    color: "green",
                  }}
                />
              </IconButton>
            </CustomTooltip>
          )}
          {params?.row?.status === "Pending" && (
            <CustomTooltip title="Delete Template" placement="top" arrow>
              <IconButton
                className="no-xs"
                onClick={() => {
                  // console.log(params.row);
                  setTemplateDeleteVisible(true);
                  setTemplateid(params.row);
                }}
              >
                <MdOutlineDeleteForever
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  size={20}
                />
              </IconButton>
            </CustomTooltip>
          )}
          {params?.row?.status === "rejected" && (
            <CustomTooltip title="Delete Template" placement="top" arrow>
              <IconButton
                className="no-xs"
                onClick={() => {
                  // console.log(params.row);
                  setTemplateDeleteVisible(true);
                  setTemplateid(params.row);
                }}
              >
                <MdOutlineDeleteForever
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  size={20}
                />
              </IconButton>
            </CustomTooltip>
          )}
        </>
      ),
    },
  ];

  const rows = Array.isArray(data)
    ? data.map((item, i) => ({
      id: item.srno,
      sn: i + 1,
      ...item,
    }))
    : [];

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
          onRowSelectionModelChange={(ids) => {
            // console.log(ids);
          }}
          // checkboxSelection
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

      {/* <Dialog
        header="Template View"
        visible={dialogVisible}
        style={{ width: "27rem" }}
        onHide={() => {
          setDialogVisible(false);
        }}
        draggable={false}
      >
        <div className="modal-content rounded-xl">
          <div className="p-2 border-2 border-gray-200 modal-body rounded-xl">
            <div className="imgbox">
              <img
                src={whatsappImg}
                alt=""
                className="w-full rounded-lg h-45"
              />
            </div>
            <div className="flex flex-col gap-2 py-2 overflow-scroll text-sm contentbox max-h-80">
              <p>
                As vibrant hues fill the canvas of life, may this festival of
                colors bring immense joy, success and prosperity to your
                corporate endeavors🎇💻
              </p>
              <p>
                Wishing our esteemed patrons and partners a Holi filled with the
                splendor of laughter, the warmth of togetherness and the
                brightness of positivity.📞📞
              </p>
              <p>Here's to a colorful journey ahead!🎉🎊</p>
              <p>Happy Holi!🎇✨</p>
              <p>Best Regards,🎊🎉</p>
              <p>Team Celitix</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-500 rounded-md ">
                <BsTelephoneFill className="mr-2" />
                Contact us
              </button>
              <button className="flex items-center justify-center px-4 py-2 text-sm text-white bg-green-500 rounded-md ">
                <FaExternalLinkAlt className="mr-2" />
                Visit us
              </button>
              <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md">
                <FaReply className="mr-2" />
                View more
              </button>
            </div>
          </div>
        </div>
      </Dialog> */}
    </>
  );
};

export default ManageTemplatetableRcs;
