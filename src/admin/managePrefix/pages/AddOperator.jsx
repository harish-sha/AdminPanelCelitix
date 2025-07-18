import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import styled from "styled-components";
import usePagination from "@mui/material/usePagination/usePagination";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import { MdOutlineDeleteForever } from "react-icons/md";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DropdownWithSearch from "../../../whatsapp/components/DropdownWithSearch";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import { Dialog } from "primereact/dialog";
import InputField from "../../../whatsapp/components/InputField";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import {
  addOperator,
  deleteOperator,
  editOperatorData,
  getOperatorList,
} from "@/apis/admin/admin";
import { getCountryList } from "@/apis/common/common";

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
const AddOperator = ({ id, name }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [newoperator, setNewOperator] = useState(false);
  const [editoperator, setEditOperator] = useState(false);
  const [importoperator, setImportOperator] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [column, setColumn] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [operatorList, setOperatorList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const [searchCountry, setSearchCountry] = useState("");

  const [addData, setAddData] = useState({
    operatorName: "",
    countrySrno: 0,
  });
  const [editoperatorData, setEditOperatorData] = useState({
    operatorName: "",
    countrySrno: 0,
  });
  const handleAdd = () => {
    setNewOperator(true);
  };

  async function handleEdit(row) {
    if (!row?.srNo) return;
    setEditOperator(true);
    setEditOperatorData({
      operatorName: row.operatorName,
      countrySrno: row.countrySrno,
      srno: row.srNo,
    });
  }

  async function handleEditOperator() {
    try {
      const res = await editOperatorData(editoperatorData);
      if (!res.status) {
        toast.error("Failed to edit operator. Please try again.");
        return;
      }
      toast.success("Operator edited successfully.");
      setEditOperator(false);

      await handleFetchOpertorList();
    } catch (e) {
      toast.error("Something went wrong while deleting the operator.");
    }
  }

  const handleImport = () => {
    setImportOperator(true);
  };

  async function handleFetchOpertorList() {
    try {
      const res = await getOperatorList();
      const countryList = await getCountryList();
      setCountryList(countryList);

      const countryMap = new Map(
        countryList.map((country) => [country.srNo, country.countryName])
      );

      const enrichedOperators = res.map((operator) => ({
        ...operator,
        countryName: countryMap.get(operator.countrySrno) || null,
      }));

      const filteredOperators = enrichedOperators.filter(
        (operator) =>
          operator.countrySrno === searchCountry || searchCountry === ""
      );

      const sortedData = filteredOperators
        ?.filter((item) => item.countryName != null)
        .sort((a, b) => a.countryName.localeCompare(b.countryName));
      setOperatorList(sortedData);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    handleFetchOpertorList();
  }, []);

  const rows = Array.isArray(operatorList)
    ? operatorList.map((item, i) => ({
        ...item,
        id: item.srNo,
        sn: i + 1,
      }))
    : [];

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "countryName", headerName: "Country", flex: 1, minWidth: 80 },
    { field: "operatorName", headerName: "Operator", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit Operator" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Operator" placement="top" arrow>
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

  async function handleSave() {
    try {
      if (!addData.operatorName) {
        toast.error("Please enter operator name.");
        return;
      }

      if (!addData.countrySrno) {
        toast.error("Please select country.");
        return;
      }
      const res = await addOperator(addData);
      if (!res.success) {
        toast.error("Failed to add operator. Please try again.");
        return;
      }
      toast.success("Operator added successfully.");
    } catch (e) {
      toast.error("Something went wrong while saving the operator.");
    }
  }

  async function handleDelete(row) {
    if (!row?.srNo) return;
    try {
      const res = await deleteOperator(row?.srNo);
      if (!res.status) {
        toast.error("Failed to delete operator. Please try again.");
        return;
      }
      toast.success("Operator deleted successfully.");
      await handleFetchOpertorList();
    } catch (e) {
      toast.error("Something went wrong while deleting the operator.");
    }
  }

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
      <div className="flex flex-wrap gap-2 items-end justify-between pb-3 w-full">
        <div className="flex flex-wrap gap-2 items-end">
          <div className="w-56">
            <DropdownWithSearch
              label="Country"
              id="country"
              name="country"
              options={countryList.map((country) => ({
                label: country.countryName,
                value: country.srNo,
              }))}
              placeholder="select country"
              value={searchCountry}
              onChange={(e) => setSearchCountry(e)}
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Search"
              id="searchaddoperator"
              name="searchaddoperator"
              onClick={handleFetchOpertorList}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-max-content">
            <UniversalButton
              label="Add New"
              id="addnewoperator"
              name="addnewoperator"
              onClick={handleAdd}
            />
          </div>
          {/* <div className="w-max-content">
            <UniversalButton
              label="Import"
              id="importoperator"
              name="importoperator"
              onClick={handleImport}
            />
          </div> */}
        </div>
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

      <Dialog
        header="Add New Operator"
        visible={newoperator}
        onHide={() => setNewOperator(false)}
        className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <DropdownWithSearch
            label="Country"
            id="countryaddnew"
            name="countryaddnew"
            options={countryList.map((country) => ({
              label: country.countryName,
              value: country.srNo,
            }))}
            placeholder="select country"
            value={addData.countrySrno}
            onChange={(e) => setAddData({ ...addData, countrySrno: e })}
          />
          <InputField
            label="Operator Name*"
            id="addnewoperatorname"
            name="addnewoperatorname"
            placeholder="Enter Operator Name"
            value={addData.operatorName}
            onChange={(e) =>
              setAddData({ ...addData, operatorName: e.target.value })
            }
          />
          <div className="flex justify-center">
            <UniversalButton
              label="Save"
              id="saveaddprefix"
              name="saveaddprefix"
              onClick={handleSave}
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        header="Edit Operator"
        visible={editoperator}
        onHide={() => setEditOperator(false)}
        className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <DropdownWithSearch
            label="Country"
            id="countryaddedit"
            name="countryaddedit"
            options={countryList.map((country) => ({
              label: country.countryName,
              value: country.srNo,
            }))}
            placeholder="select country"
            value={editoperatorData.countrySrno}
            onChange={(e) =>
              setEditOperatorData({ ...editoperatorData, countrySrno: e })
            }
          />
          <InputField
            label="Operator Name*"
            id="addeditoperatorname"
            name="addeditoperatorname"
            placeholder="Enter Operator Name"
            value={editoperatorData.operatorName}
            onChange={(e) =>
              setEditOperatorData({
                ...editoperatorData,
                operatorName: e.target.value,
              })
            }
          />
          <div className="flex justify-center">
            <UniversalButton
              label="Save"
              id="saveeditprefix"
              name="saveeditprefix"
              onClick={handleEditOperator}
            />
          </div>
        </div>
      </Dialog>
      {/* <Dialog
        header="Edit Operator"
        visible={importoperator}
        onHide={() => setImportOperator(false)}
        className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <DropdownWithSearch
            label="Country"
            id="countryimport"
            name="countryimport"
            options={AddimportcountryOptions}
            placeholder="select country"
          />
          <div className="file-upload mt-2">
            <div
              className="file-upload-container"
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
                name="fileInput"
                accept=".xls,.xlsx,.xlsm"
              />
              <div className="flex items-center justify-center gap-2">
                <label
                  htmlFor="fileInput"
                  className="file-upload-button inline-block bg-blue-400 hover:bg-blue-500 text-white font-medium text-sm px-3 py-2 rounded-lg cursor-pointer text-center tracking-wider"
                >
                  Choose or Drop File
                </label>
                <div className="upload-button-container ">
                  <button
                    onClick={handleFileUpload}
                    disabled={isUploading}
                    className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${
                      isUploading ? "disabled" : ""
                    }`}
                  >
                    <FileUploadOutlinedIcon
                      sx={{ color: "white", fontSize: "23px" }}
                    />
                  </button>
                </div>
              </div>
              <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
                <br />
                Supported File Formats: .xlsx
              </p>
              <div className="mt-3">
                {uploadedFile ? (
                  <div className="file-upload-info flex items-center justify-center  gap-1">
                    <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                      {isUploaded ? "File Uploaded: " : "File Selected: "}
                      <strong>{uploadedFile.name}</strong>
                    </p>
                    <button
                      className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                      onClick={handleRemoveFile}
                    >
                      <MdOutlineDeleteForever
                        className="text-red-500 cursor-pointer hover:text-red-600"
                        size={20}
                      />
                    </button>
                  </div>
                ) : (
                  <p className="file-upload-feedback file-upload-feedback-error text-gray-500 text-sm font-semibold tracking-wide">
                    No file uploaded yet!
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <UniversalButton
              label="Submit"
              id="submitimportprefix"
              name="submitimportprefix"
            />
          </div>
        </div>
      </Dialog> */}
    </div>
  );
};

export default AddOperator;
