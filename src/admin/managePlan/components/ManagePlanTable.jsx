import {
  Box,
  Button,
  IconButton,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import usePagination from "@mui/material/usePagination/usePagination";
import styled from "styled-components";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import InputField from "../../../whatsapp/components/InputField";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../../whatsapp/components/UniversalButton";

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

const ManagePlanTable = ({ id, name, data = [] }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [manageCreatePlan, setManageCreatePlan] = useState(false);
  const [plantypeoptionedit, setPlantypeoptionedit] = useState(null);
  const [isChecked, setIsChecked] = useState(true);

  const planeditOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const handleEdit = () => {
    setManageCreatePlan(true);
  };

  const rows = Array.isArray(data)
    ? data.map((item, index) => ({
        ...item,
        id: item.serviceId,
        sn: index + 1,
      }))
    : [];
  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "serviceName", headerName: "Plan Name", flex: 1, minWidth: 80 },
    { field: "planType", headerName: "Plan Type", flex: 1, minWidth: 100 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return params.value === 1 ? (
          <span className="text-green-500">Active</span>
        ) : (
          <span className="text-red-500">Inactive</span>
        );
      },
    },
    {
      field: "ndnc",
      headerName: "NDNC",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return params.value === 1 ? (
          <span className="text-green-500">Active</span>
        ) : (
          <span className="text-red-500">Inactive</span>
        );
      },
    },
    {
      field: "openContent",
      headerName: "Open content",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return params.value === 1 ? (
          <span className="text-green-500">Active</span>
        ) : (
          <span className="text-red-500">Inactive</span>
        );
      },
    },
    {
      field: "openMobile",
      headerName: "Open Mobile",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return params.value === 1 ? (
          <span className="text-green-500">Active</span>
        ) : (
          <span className="text-red-500">Inactive</span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit Plan" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Plan" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleDelete(params.row)}
            >
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
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
          checkboxSelection
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

      <Dialog
        header="Create Plan"
        visible={manageCreatePlan}
        onHide={() => setManageCreatePlan(false)}
        className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Plan Name"
              id="createplannameedit"
              name="createplannameedit"
              placeholder="Enter Plan Name"
            />
            <AnimatedDropdown
              label="Plan Type"
              options={planeditOptions}
              id="createplantypeedit"
              name="createplantypeedit"
              value={plantypeoptionedit}
              onChange={(newValue) => setPlantypeoptionedit(newValue)}
            />
          </div>
          <div className="flex items-center">
            <p>Allow Plan Time Bound Feature</p>
            <div>
              <CustomTooltip arrow placement="top" title="Allow/ Disallow">
                <Switch
                  checked={isChecked}
                  onChange={handleToggle}
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
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Order Queue Size"
              id="createplanorderqueuesizeedit"
              name="createplanorderqueuesizeedit"
              placeholder="Enter Order Queue Size"
            />
            <InputField
              label="Initial Queue Size"
              id="createplaninitialqueuesizeedit"
              name="createplaninitialqueuesizeedit"
              placeholder="Enter Initial Queue Size"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Trigger Queue Size"
              id="createplantriggerqueuesizeedit"
              name="createplantriggerqueuesizeedit"
              placeholder="Enter Trigger Queue Size"
            />
            <InputField
              label="Character Limit"
              id="createplancharlimitedit"
              name="createplancharlimitedit"
              placeholder="Enter Character Limit"
            />
          </div>
          <div className="flex items-center justify-center">
            <UniversalButton
              label="Save"
              id="createplansavebtn"
              name="createplansavebtn"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManagePlanTable;
