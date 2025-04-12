import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import {
  Paper,
  Typography,
  Box,
  Button,
  Switch,
  IconButton,
} from "@mui/material";
import CustomTooltip from "../../whatsapp/components/CustomTooltip";

import { MdOutlineDeleteForever } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import UniversalButton from "../../whatsapp/components/UniversalButton";
import InputField from "../../components/layout/InputField";
import { RadioButton } from "primereact/radiobutton";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CallBackProfile = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [active, setActive] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCallbackName, setSelectedCallbackName] = useState("");
  const [callbackNameDropdown, setCallbackNameDropdown] = useState([]);
  const [smaDropdown, setSmsDropdown] = useState([]);
  const [selectCallbackType, setSelectCallbackType] = useState([]);
  const [getEnable, setGetEnable] = useState("enable");
  const [selectedYes, setSelectedYes] = useState("yes");
  const [selectedCustomHeaders, setSelectedCustomHeaders] = useState("option1");
  const [url, setUrl] = useState("");
  const [sampleHeader, setSampleHeader] = useState("");
  const [content, setContent] = useState("");
  const [parametervalue, setParameterValue] = useState("");
  const [parametername, setParameterName] = useState("");
  const [webEngageUniqueKey, setWebEngageUniqueKey] = useState("");
  const [webEngageUserId, setWebEngageUserId] = useState("");
  const [webEngageUrl, setWebEngageUrl] = useState("");

  const [addKey, setAddKey] = useState([]);
  const [addValue, setAddValue] = useState([]);
  const [contentKey, setContentKey] = useState("");
  const [contentValue, setContentValue] = useState("");
  // const [addValue, setAddValue] = useState([]);

  const addKeys = () => {
    setAddKey((prev) => [...prev, { id: Date.now(), value: "" }]);
  };

  const handleKeyChange = (id, newValue) => {
    setAddKey((prev) =>
      prev.map((addKey) =>
        addKey.id === id ? { ...addKey, value: newValue } : addKey
      )
    );
  };

  const deleteKey = (id) => {
    setAddKey((prev) => prev.filter((addKey) => addKey.id !== id));
  };

  const addValues = () => {
    setAddValue((prev) => [...prev, { id: Date.now(), value: "" }]);
    console.log("addValue", addValue);
  };

  const handleParameterChange = (id, newValue) => {
    setAddValue((prev) =>
      prev.map((addValue) =>
        addValue.id === id ? { ...addValue, value: newValue } : addValue
      )
    );
    console.log("params change", addValue);
  };

  const deleteValue = (id) => {
    setAddValue((prev) => prev.filter((addValue) => addValue.id !== id));
  };

  const handleChangeGetpostpaid = (e) => {
    const value = e.target.value;
    setGetEnable(value);
  };

  const handleChangeEnablepostpaid = (e) => {
    const value = e.target.value;
    setSelectedYes(value);
  };

  const handlechangeCustomHeaders = (e) => {
    const value = e.target.value;
    setSelectedCustomHeaders(value);
  };

  const handleDelete = (id, callbackName) => {
    setSelectedCallbackName(callbackName);
    setIsVisible(true);
  };

  const handleEdit = (id, callbackName) => {
    setSelectedCallbackName(callbackName);
    setIsEdit(true);
  };

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "callbackName",
      headerName: "Callback Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "userName",
      headerName: "User Name",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "channel",
      headerName: "Channel",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "createdOn",
      headerName: "Created On",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: () => (
        <CustomTooltip value={active}>
          <Switch
            onChange={(e) => setActive(e.target.value)}
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
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit" placement="top" arrow>
            <IconButton onClick={(e) => handleEdit(e, params.row.callbackName)}>
              <EditNoteOutlinedIcon size={20} />
            </IconButton>
          </CustomTooltip>

          <CustomTooltip title="Delete" placement="top" arrow>
            <IconButton
              onClick={(event) => handleDelete(event, params.row.callbacknName)}
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

  const rows = [
    {
      id: 1,
      sn: 1,
      callbackName: "Callback1",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      sn: 2,
      callbackName: "Callback2",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 3,
      sn: 3,
      callbackName: "Callback3",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 4,
      sn: 4,
      callbackName: "Callback4",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 5,
      sn: 5,
      callbackName: "Callback5",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 6,
      sn: 6,
      callbackName: "Callback6",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 7,
      sn: 7,
      callbackName: "Callback7",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 8,
      sn: 8,
      callbackName: "Callback8",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 9,
      sn: 9,
      callbackName: "Callback9",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 10,
      sn: 10,
      callbackName: "Callback10",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 11,
      sn: 11,
      callbackName: "Callback11",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 12,
      sn: 12,
      callbackName: "Callback12",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 13,
      sn: 13,
      callbackName: "Callback13",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 14,
      sn: 14,
      callbackName: "Callback14",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 15,
      sn: 15,
      callbackName: "Callback15",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
    {
      id: 18,
      sn: 18,
      callbackName: "Callback18",
      userName: "Admin",
      channel: "OBD",
      createdOn: "27/01/2024",
      status: "Active",
      action: "",
    },
  ];

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
    <>
      <div>
        <Paper sx={{ height: 558 }}>
          <DataGrid
            // id={id}
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20, 50]}
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            checkboxSelection
            rowHeight={45}
            slots={{
              footer: CustomFooter,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
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

        <Dialog
          header="Confirm Delete"
          visible={isVisible}
          onHide={() => setIsVisible(false)}
          className="lg:w-[30rem] md:w-[40rem] w-[17rem]"
          draggable={false}
        >
          <div className="flex items-center justify-center">
            <CancelOutlinedIcon
              sx={{ fontSize: 64, color: "ff3f3f" }}
              size={20}
            />
          </div>
          <div>
            <div className="p-4 text-center">
              <p className="text-[1.1rem] font-semibold text-gray-600">
                Are you sure ?
              </p>
              <p>
                Do you really want to delete this record? This process cannot be
                undo.
              </p>
              <div className="flex justify-center gap-4 mt-2">
                <UniversalButton
                  label="Cancel"
                  style={{
                    backgroundColor: "#090909",
                  }}
                  onClick={() => setIsVisible(false)}
                />
                <UniversalButton
                  label="Delete"
                  style={
                    {
                      // backgroundColor: "red",
                    }
                  }
                  onClick={() => setIsVisible(false)}
                />
              </div>
            </div>
          </div>
        </Dialog>

        <div className="bg-gray-600 ">
          <Dialog
            visible={isEdit}
            onHide={() => setIsEdit(false)}
            className="lg:w-[50rem] md:w-[40rem] w-[20rem]"
            draggable={false}
          >
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="w-full sm:w-56">
                <AnimatedDropdown
                  label="Callback Name"
                  placeholder="callback1"
                  options={[
                    { value: "Callback1", label: "Callback1" },
                    { value: "Callback2", label: "Callback2" },
                    { value: "Callback3", label: "Callback3" },
                    { value: "Callback4", label: "Callback4" },
                    { value: "Callback5", label: "Callback5" },
                    { value: "Callback6", label: "Callback6" },
                    { value: "Callback7", label: "Callback7" },
                  ]}
                  value={callbackNameDropdown}
                  onChange={(value) => setCallbackNameDropdown(value)}
                />
              </div>
              <div className="w-full sm:w-56">
                <AnimatedDropdown
                  label="SMS"
                  placeholder="SMS"
                  options={[
                    { value: "OBD", label: "OBD" },
                    { value: "RCS", label: "RCS" },
                  ]}
                  value={smaDropdown}
                  onChange={(value) => setSmsDropdown(value)}
                />
              </div>
              <div className="w-full sm:w-56">
                <AnimatedDropdown
                  label="Callback Type"
                  placeholder="Select Callback Type"
                  options={[
                    { value: "Webhook", label: "Webhook" },
                    { value: "WebEngage", label: "WebEngage" },
                    { value: "FreshDesk", label: "FreshDesk" },
                  ]}
                  value={selectCallbackType}
                  onChange={(value) => setSelectCallbackType(value)}
                />
              </div>
            </div>

            {selectCallbackType === "Webhook" && (
              <>
                <div className="flex flex-row gap-3 mt-4 justify-start items-center">
                  <label
                    className="mr-5 text-blue-900 font-semibold"
                    tooltipContent="Select the HTTP method foe webhook request.GET or POST"
                    tooltipPlacement="right"
                  >
                    Method
                  </label>
                  <div className="flex gap-1">
                    <label className="text-gray-600 font-semibold">GET</label>
                    <RadioButton
                      value="enable"
                      checked={getEnable === "enable"}
                      onChange={handleChangeGetpostpaid}
                    />
                  </div>
                  <div className="flex gap-1">
                    <label className="text-gray-600 font-semibold">POST</label>
                    <RadioButton
                      value="disable"
                      checked={getEnable === "disable"}
                      onChange={handleChangeGetpostpaid}
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-3 mt-4  ">
                  <label className="text-blue-900 font-semibold">URL</label>
                  <div className="w-full sm:w-56 ">
                    <InputField
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter URL "
                    // tooltipContent="nter the URL where the callback Type will send the data."
                    // tooltipPlacement="right"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-3 mt-4 justify-start items-center mb-4">
                  <label
                    className="text-blue-900 font-semibold"
                    tooltipContent="Choose 'YES' if you want to add custom headers to the Webhook request, otherwise choose 'NO'"
                    tooltipPlacement="right"
                  >
                    Custom Headers
                  </label>
                  <div className="flex gap-1 justify-center items-center">
                    <label className="text-gray-600 font-semibold">YES</label>
                    <RadioButton
                      value="optionA"
                      checked={selectedYes === "optionA"}
                      onChange={handleChangeEnablepostpaid}
                    />
                  </div>
                  <div className="flex gap-1 justify-center items-center">
                    <label className="text-gray-600 font-semibold">NO</label>
                    <RadioButton
                      value="optionB"
                      checked={selectedYes === "optionB"}
                      onChange={handleChangeEnablepostpaid}
                    />
                  </div>
                </div>
                {selectedYes === "optionA" && (
                  <>
                    <div className=" mt-5 mb-5 gap-4 w-full sm:w-56">
                      <InputField
                        value={sampleHeader}
                        onChange={(e) => setSampleHeader(e.target.value)}
                        placeholder="X-Sample-Header:  XYZ"
                      />
                      <label className="text-xs ">
                        Add One custom header per line
                      </label>
                    </div>
                  </>
                )}

                {getEnable === "disable" && (
                  <div className="flex flex-col gap-3 mt-3">
                    <label className="text-blue-900 font-semibold">
                      Encoding
                    </label>
                    <div className="flex flex-row gap-3">
                      <div className="flex gap-1">
                        <label className="text-gray-600 font-semibold">
                          JSON
                        </label>
                        <RadioButton
                          value="option1"
                          checked={selectedCustomHeaders === "option1"}
                          onChange={handlechangeCustomHeaders}
                        />
                      </div>

                      <div className="flex gap-1">
                        <label className="text-gray-600 font-semibold">
                          XML
                        </label>
                        <RadioButton
                          value="option2"
                          checked={selectedCustomHeaders === "option2"}
                          onChange={handlechangeCustomHeaders}
                        />
                      </div>

                      <div className="flex flex-row gap-1">
                        <label className="text-gray-600 font-semibold">
                          X-FORM-URLENCODED
                        </label>
                        <RadioButton
                          value="option3"
                          checked={selectedCustomHeaders === "option3"}
                          onChange={handlechangeCustomHeaders}
                        />
                      </div>
                    </div>
                    {selectedCustomHeaders === "option1" && (
                      <div className="w-full sm:w-56">
                        <InputField
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          label="Content"
                          placeholder="API Request Body {}"
                        />
                      </div>
                    )}
                    {selectedCustomHeaders === "option2" && (
                      <div className="w-full sm:w-56">
                        <InputField
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          label="Content"
                          placeholder="API Request Body {}"
                        />
                      </div>
                    )}

                    {selectedCustomHeaders === "option3" && (
                      <>
                        <div className="flex flex-row gap-3 ml-5 w-full">
                          <div className="w-full sm:w-65">
                            <InputField
                              placeholder="Key"
                              value={contentKey}
                              onChange={(e) => setContentKey(e.target.value)}
                            />
                          </div>
                          <div className="w-full sm:w-65">
                            <InputField
                              placeholder="Value"
                              value={contentValue}
                              onChange={(e) => setContentValue(e.target.value)}
                            />
                          </div>

                          <button onClick={addKeys}
                            className="cursor-pointer">
                            <AddCircleOutlineIcon className="text-gray-950 hover:text-gray-900" />
                          </button>


                        </div>

                        {addKey.map((entry, index) => (
                          <div className="flex flex-wrap gap-3  items-center ">
                            <div
                              className="flex flex-wrap gap-3 items-center mt-3 ml-5"
                              key={entry.id}
                            >
                              <div className="w-full sm:w-65">
                                <InputField
                                  placeholder="Key"
                                  value={entry.value}
                                  onChange={(value) =>
                                    handleKeyChange(entry.id, value)
                                  }
                                />
                              </div>
                              <div className="w-full sm:w-65">
                                <InputField
                                  placeholder="Value"
                                  value={entry.value}
                                  onChange={(value) =>
                                    handleKeyChange(entry.id, value)
                                  }
                                />
                              </div>
                            </div>
                            <button
                              onClick={addKeys}
                              className="  cursor-pointer"
                            >
                              <AddCircleOutlineIcon
                                size={20}
                                className="text-gray-950 hover:text-gray-900"
                              />
                            </button>
                            <button
                              className="  cursor-pointer"
                              onClick={() => deleteKey(entry.id)}
                            >
                              <RemoveCircleOutlineIcon
                                size={20}
                                className="text-gray-950 hover:text-gray-900"
                              />
                            </button>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}

                {getEnable === "enable" && (
                  <>
                    <div className="flex flex-col ">
                      <div className="flex flex-row gap-4 ">
                        <label
                          className="text-blue-900 font-semibold"
                          tooltipContent="Enter the Name and Value of the parameter to be including to the webhook request."
                          tooltipPlacement="right"
                        >
                          Parameter
                        </label>
                        <div className="w-full sm:w-65">
                          <InputField
                            placeholder="Name"
                            value={parametername}
                            onChange={(e) => setParameterName(e.target.value)}
                          />
                        </div>
                        <div className="w-full sm:w-65">
                          <InputField
                            placeholder="Value"
                            value={parametervalue}
                            onChange={(e) => setParameterValue(e.target.value)}
                          />
                        </div>
                        <button
                          className="  cursor-pointer"
                          onClick={addValues}
                        >
                          <AddCircleOutlineIcon
                            size={20}
                            className="text-gray-950 hover:text-gray-900"
                          />
                        </button>
                      </div>

                      {addValue.map((entry, index) => (
                        <div className="flex flex-wrap   items-center  ">
                          <div
                            className="flex flex-wrap gap-4 items-center mt-3 ml-26"
                            key={entry.id}
                          >
                            <div className="w-full sm:w-65">
                              <InputField
                                // label="Name"
                                placeholder="Enter Name"
                                value={entry.value}
                                onChange={(value) =>
                                  handleParameterChange(entry.id, value)
                                }
                              />
                            </div>
                            <div className="w-full sm:w-65">
                              <InputField
                                // label="Value"
                                placeholder="Enter Value"
                                value={entry.value}
                                onChange={(value) =>
                                  handleParameterChange(entry.id, value)
                                }
                              />
                            </div>
                            <button
                              className=" cursor-pointer"
                              onClick={addValues}
                            >
                              <AddCircleOutlineIcon
                                size={20}
                                className="text-gray-950 hover:text-gray-900"
                              />
                            </button>
                            <button
                              className=" cursor-pointer"
                              onClick={() => deleteValue(entry.id)}
                            >
                              <RemoveCircleOutlineIcon
                                size={20}
                                className="text-gray-950 hover:text-gray-900"
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {selectCallbackType === "WebEngage" && (
              <>
                <div className="flex flex-row justify-center items-center gap-2">
                  <div className="w-full sm:w-56">
                    <InputField
                      value={webEngageUrl}
                      onChange={(e) => setWebEngageUrl(e.target.value)}
                      label="URL"
                      placeholder="Enter URL"
                      tooltipContent="Enter URL"
                      tooltipPlacement="right"
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <InputField
                      value={webEngageUserId}
                      onChange={(e) => setWebEngageUserId(e.target.value)}
                      label="UserID"
                      placeholder="Enter UserID"
                      tooltipContent="Enter UserID"
                      tooltipPlacement="right"
                    />
                  </div>

                  <div className="w-full sm:w-56">
                    <InputField
                      value={webEngageUniqueKey}
                      onChange={(e) => setWebEngageUniqueKey(e.target.value)}
                      label="Unique Key"
                      placeholder="Enter Unique Key"
                      tooltipContent="Enter Unique Key"
                      tooltipPlacement="right"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="w-full  mt-6 flex items-center justify-center">
              <UniversalButton label="Submit" placeholder="Submit" />
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default CallBackProfile;
