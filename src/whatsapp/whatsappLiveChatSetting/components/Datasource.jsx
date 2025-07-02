import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import usePagination from "@mui/material/usePagination";
import CustomTooltip from "@/components/common/CustomTooltip";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import UniversalButton from "@/components/common/UniversalButton";
import { Dialog } from "primereact/dialog";
import LanguageIcon from "@mui/icons-material/Language";
import EditIcon from "@mui/icons-material/Edit";
import { MdOutlineDeleteForever } from "react-icons/md";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IoSearch } from 'react-icons/io5'
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";

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

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const Datasource = ({ id, name }) => {
  const [value, setValue] = useState(0);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [urlError, setUrlError] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [websiteVisible, setWebsiteVisible] = useState(false);
  const [manuallyVisible, setManuallyVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qError, setQError] = useState(false);
  const [aError, setAError] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const inputRef = useRef();

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 100 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 140,
    },

    { field: "source", headerName: "Source", flex: 1, minWidth: 100 },
    { field: "usedby", headerName: "Used by", flex: 1, minWidth: 80 },
    { field: "lastupdated", headerName: "Last updated", flex: 1, minWidth: 80 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete" placement="top" arrow>
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

  const rows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    name: "xyz.com",
    source: "website",
    usedby: "-",
    lastupdated: "22-09-2023",
  }));

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
      <div className="flex items-end justify-between w-full mb-4 gap-2 align-middle flex--wrap">
        <div className="flex items-end gap-2">
          <div className="w-full sm:w-48">
            <AnimatedDropdown
              label="Data Source"
              id="datasource"
              name="datasource"
              placeholder="Select Data Source"
              options={[
                { label: "Website", value: "website" },
                { label: "Manual", value: "manual" },
              ]}
              onChange={(e) => console.log(e)}
            />
          </div>
          <div className="w-full sm:w-40">
            <AnimatedDropdown
            label="Used by"
            id="usedby"
            name="usedby"
            placeholder="Select Used by"
            options={[
              { label: "All", value: "all" },
              { label: "WhatsApp", value: "whatsapp" },
              { label: "Instagram", value: "instagram" },
            ]}
            onChange={(e) => console.log(e)}
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Search"
              id="blockmobileearch"
              name="blockmobileearch"
              variant="primary"
              icon={<IoSearch />}
              // onClick={handleCampaignSearch}
            />
          </div>
        </div>
      <div className="flex justify-end items-end">
        <div className="w-max-content">
          <UniversalButton
            label="Add Data Source"
            id="adddatasource"
            name="adddatasource"
            variant="primary"
            onClick={() => setDialogVisible(true)}
          />
        </div>
      </div>
      </div>

      <div className="flex flex-col gap-4">
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
      </div>
      <Dialog
        header="Data Source"
        visible={dialogVisible}
        style={{ width: "30rem" }}
        onHide={() => setDialogVisible(false)}
        draggable={false}
      >
        <div className="grid grid-cols-2 gap-4 p-5">
          <div
            onClick={() => {
              setWebsiteVisible(true);
              setDialogVisible(false);
            }}
            className="flex flex-col items-start p-4 bg-white rounded-lg shadow cursor-pointer hover:ring-2 hover:ring-blue-300"
          >
            <div className="p-2 bg-blue-50 rounded-full">
              <LanguageIcon className="text-blue-600" fontSize="large" />
            </div>
            <h3 className="mt-2 text-lg font-semibold">Website URL</h3>
            <p className="mt-1 text-sm text-gray-600">
              Provide the URL of your site to feed Lyro with knowledge from it.
            </p>
          </div>

          <div
            onClick={() => {
              setManuallyVisible(true);
              setDialogVisible(false);
            }}
            className="flex flex-col items-start p-4 bg-white rounded-lg shadow cursor-pointer hover:ring-2 hover:ring-blue-300"
          >
            <div className="p-2 bg-blue-50 rounded-full">
              <EditIcon className="text-blue-600" fontSize="large" />
            </div>
            <h3 className="mt-2 text-lg font-semibold">Add Manually</h3>
            <p className="mt-1 text-sm text-gray-600">
              Manually write your own specific Q&A.
            </p>
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Website URL"
        visible={websiteVisible}
        style={{ width: "30rem" }}
        onHide={() => setWebsiteVisible(false)}
        draggable={false}
      >
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Provide URL
          </label>
          <input
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="Website URL"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              urlError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {urlError && (
            <p className="text-red-600 text-sm">Field cannot be empty</p>
          )}
          <p className="text-gray-500 text-sm">
            This process may take a few minutes and will continue in the
            background.
          </p>
          <div className="flex justify-end">
            <UniversalButton
              label="Import knowledge"
              id="importKnowledge"
              name="importKnowledge"
              variant="primary"
              onClick={() => {
                if (!websiteUrl) {
                  setUrlError(true);
                } else {
                  setUrlError(false);
                  // handle import logic
                  setWebsiteVisible(false);
                }
              }}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Add Manually"
        visible={manuallyVisible}
        style={{ width: "30rem" }}
        onHide={() => setManuallyVisible(false)}
        draggable={false}
      >
        <div className="space-y-4 p-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              qError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {qError && (
            <p className="text-red-600 text-sm">Question cannot be empty</p>
          )}
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
            className={`w-full h-32 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none ${
              aError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {aError && (
            <p className="text-red-600 text-sm">Answer cannot be empty</p>
          )}
          <div className="flex justify-start">
            <UniversalButton
              label="Save"
              id="saveManual"
              name="saveManual"
              variant="primary"
              onClick={() => {
                let hasError = false;
                if (!question) {
                  setQError(true);
                  hasError = true;
                } else setQError(false);
                if (!answer) {
                  setAError(true);
                  hasError = true;
                } else setAError(false);
                if (!hasError) {
                  // save logic
                  setManuallyVisible(false);
                  setQuestion("");
                  setAnswer("");
                }
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
