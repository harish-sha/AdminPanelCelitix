import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { Paper, Typography, Box, Button, Switch } from "@mui/material";
import { MdClose } from "react-icons/md";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay.jsx";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import {
  deleteWabaTemplate,
  getWabaTemplate,
  getWabaTemplateDetails,
  refreshTemplate,
  deleteTemplate,
  fetchCurlData,
  isHideTemplate,
} from "../../../apis/whatsapp/whatsapp.js";
import whatsappImg from "../../../assets/images/whatsappdummy.webp";
import CustomTooltip from "../../components/CustomTooltip.jsx";
import UniversalButton from "@/whatsapp/components/UniversalButton.jsx";
import CarouselPreview from "./CarouselPreview.jsx";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

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

const DataTable = ({
  id,
  wabaNumber,
  wabaSrno,
  data,
  name,
  wabaList,
  fetchTemplateData,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [templateData, setTemplateData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [dialogVisible, setDialogVisible] = useState(false);
  // const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  // const [selectedTemplate, setSelectedTemplate] = useState("");
  // State to track toggle status for each row
  const [toggleStates, setToggleStates] = useState({});

  // Handle toggle change
  const handleStatusChange = async (data) => {
    const body = {
      isHide: Number(!data.is_hide),
    };
    try {
      const res = await isHideTemplate(data?.templateSrno, body);
      if (res?.msg.includes("updated")) {
        toast.success("Status updated successfully.");
        await fetchTemplateData();
      }
    } catch (e) {
      // console.log(e);
      toast.error("Failed to update status.");
    }
    // console.log(data);
  };

  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [curlDialogVisible, setCurlDialogVisible] = useState(false);
  const [curlData, setCurlData] = useState(null);
  // const handleView = (row) => {
  //     setSelectedRow(row);
  //     setDialogVisible(true);
  // };

  const handleView = async (row) => {
    if (!wabaNumber) {
      toast.error("Please select a WABA account.");
      return;
    }

    const selectedWaba = wabaList.find((waba) => waba.mobileNo === wabaNumber);
    if (!selectedWaba || !selectedWaba.wabaAccountId) {
      toast.error("WABA Account ID not found for the selected WABA.");
      return;
    }

    const wabaAccountId = selectedWaba.wabaAccountId;
    const templateName = row.templateName;

    try {
      const response = await getWabaTemplate(wabaAccountId, templateName);

      if (response && response.data.length > 0) {
        setSelectedRow({ ...row, templateData: response.data[0] });
        setDialogVisible(true);
      } else {
        toast.error("No matching template found.");
      }
    } catch (error) {
      toast.error("Error fetching template preview.");
      console.error("Error fetching template data:", error);
    }
  };

  const handleClose = () => {
    setDialogVisible(false);
  };

  const handleDuplicate = (row) => {
    // Implement duplicate logic here
  };

  const handleApi = async (row) => {
    // console.log(row);
    setCurlDialogVisible(true);

    try {
      const data = {
        tempName: row?.templateName,
        waba: wabaNumber,
      };
      const res = await fetchCurlData(data);
      setCurlData(res);
    } catch (e) {
      // console.log(e);
      toast.error("Error fetching curl data.");
    }
    // setCurlData
  };

  // const handleOpenDeleteDialog = (row) => {
  //     // setSelectedAgentId(id);
  //     setSelectedTemplate(row);
  //     setDeleteDialogVisible(true);
  //     console.log("Selected Template:", row);
  // };

  const handleDelete = (event, row) => {
    // console.log(row);
    setCurrentRow(row);
    setAnchorEl(event.currentTarget);
    setVisible(true);
  };

  // const acceptDelete = () => {
  //     toast.success(`Template "${currentRow.templateName}" deleted successfully.`);
  //     setVisible(false);
  // };

  // const rejectDelete = () => {
  //     toast.error(`Deletion of "${currentRow.templateName}" was cancelled.`);
  //     setVisible(false);
  // };

  // Fetch Templates when WABA number changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWabaTemplateDetails(wabaNumber);
        if (response) {
          setTemplateData(response);
        } else {
          toast.error("Failed to fetch template data!");
          console.error("Failed to fetch template data!");
        }
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    };
    fetchData();
  }, [wabaNumber]);

  // **Format Date Function** (Ensures proper date format)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
  };

  const handleRefreshStatus = async (data) => {
    try {
      const res = await refreshTemplate(data?.id);
      toast.success("Refreshed Successfully");
      await fetchTemplateData();
    } catch (e) {
      return toast.error("Failed to refresh template.");
    }
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "templateName",
      headerName: "Template Name",
      flex: 1,
      minWidth: 120,
    },
    { field: "category", headerName: "Category", flex: 1, minWidth: 120 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    { field: "type", headerName: "Type", flex: 1, minWidth: 120 },
    { field: "health", headerName: "Health", flex: 1, minWidth: 120 },
    { field: "createdDate", headerName: "Created At", flex: 1, minWidth: 200 },
    {
      field: "is_hide",
      headerName: "Visibility",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip
          arrow
          placement="top"
          title={params.row.is_hide === 1 ? "Hide" : "Show"}
        >
          <Switch
            checked={params.row.is_hide === 1}
            onChange={() => handleStatusChange(params.row)}
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
      minWidth: 220,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Refresh Status" placement="top" arrow>
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
          <CustomTooltip title="View" placement="top" arrow>
            <IconButton
              className="text-xs"
              onClick={() => handleView(params.row)}
            >
              <VisibilityIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Duplicate" placement="top" arrow>
            <IconButton onClick={() => handleDuplicate(params.row)}>
              <FileCopyIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="CURL" placement="top" arrow>
            <IconButton onClick={() => handleApi(params.row)}>
              <TerminalOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "#000",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete" placement="top" arrow>
            <IconButton onClick={(event) => handleDelete(event, params.row)}>
              <DeleteForeverIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "#e31a1a",
                }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  // use this when you want to create rows dynamically
  // const rows = Array.from({ length: 500 }, (_, i) => ({
  //     id: i + 1,
  //     sn: i + 1,
  //     templateName: 'Ram',
  //     category: 'Sharma',
  //     status: 66,
  //     type: '5',
  //     health: 'High',
  //     createdDate: '12/10/2024',
  //     action: 'True',
  // }));

  const rows = data.map((item, index) => ({
    id: item.templateSrno,
    sn: index + 1,
    templateName: item.templateName || "N/A",
    category: item.category || "N/A",
    status: item.status || "N/A",
    type: item.type || "N/A",
    createdDate: formatDate(item.createdDate),
    is_hide: item.is_hide || "N/A",
    ...item,
    // createdDate: item.createdDate ? format(new Date(item.createdDate)) : "N/A", // Using timeago.js
  }));

  const handleCopyPassword = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success("Curl copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy password.");
      });
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

  const getBtnCss = (type) => {
    switch (type) {
      case "PHONE_NUMBER":
        return "bg-blue-500 text-white";
      case "QUICK_REPLY":
        return "text-gray-800 bg-gray-200";
      default:
        return "bg-green-500 text-white";
    }
  };

  const getBtnIcon = (type) => {
    switch (type) {
      case "PHONE_NUMBER":
        return <BsTelephoneFill className="mr-2" />;
      case "QUICK_REPLY":
        return <FaReply className="mr-2" />;
      default:
        return <FaExternalLinkAlt className="mr-2" />;
    }
  };

  const getBtnTitle = (type, phone, url, text) => {
    switch (type) {
      case "PHONE_NUMBER":
        return `Contact us: ${phone}`;
      case "QUICK_REPLY":
        return `View more: ${text}`;
      default:
        return `Visit us: ${url}`;
    }
  };

  async function handledeleteTemplate() {
    const wabaSrno = wabaList.find(
      (waba) => waba.mobileNo === wabaNumber
    )?.wabaSrno;
    const data = {
      srno: currentRow?.id,
      name: currentRow?.templateName,
      waba: wabaSrno,
    };
    try {
      setIsFetching(true);
      const res = await deleteTemplate(data);
      // console.log(res);
      if (res?.msg?.includes("Succefully")) {
        toast.success("Template deleted successfully.");
        setVisible(false);
        await fetchTemplateData();
        return;
      }
    } catch (e) {
      // console.log(e);
      return toast.error("Failed to delete template.");
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <>
      <Paper sx={{ height: 558 }}>
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
          // checkboxSelection
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

      {/* PrimeReact Dialog */}
      {/* <Dialog header={selectedRow?.templateName} visible={dialogVisible} style={{ width: "27rem" }} onHide={handleClose} draggable={false}>
                <div>
                    <h3>{selectedRow?.templateName}</h3>
                    <p>Category: {selectedRow?.category}</p>
                    <p>Status: {selectedRow?.status}</p>
                    <p>Created At: {selectedRow?.createdDate}</p>
                </div>
                <div className="modal-content rounded-xl">
                    <div className="p-2 border-2 border-gray-200 modal-body rounded-xl">
                        <div className="imgbox">
                            <img src={whatsappImg} alt="" className='w-full rounded-lg h-45' />
                        </div>
                        <div className="flex flex-col gap-2 py-2 overflow-scroll text-sm contentbox max-h-80">
                            <p>As vibrant hues fill the canvas of life, may this festival of colors bring immense joy, success and prosperity to your corporate endeavors🎇💻</p>
                            <p>Wishing our esteemed patrons and partners a Holi filled with the splendor of laughter, the warmth of togetherness and the brightness of positivity.📞📞</p>
                            <p>Here's to a colorful journey ahead!🎉🎊</p>
                            <p>Happy Holi!🎇✨</p>
                            <p>Best Regards,🎊🎉</p>
                            <p>Team Celitix</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <button className='flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-500 rounded-md '>
                                <BsTelephoneFill className='mr-2' />
                                Contact us
                            </button>
                            <button className='flex items-center justify-center px-4 py-2 text-sm text-white bg-green-500 rounded-md '>
                                <FaExternalLinkAlt className='mr-2' />
                                Visit us
                            </button>
                            <button
                                className='flex items-center justify-center w-full px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md'
                            >
                                <FaReply className='mr-2' />
                                View more
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog> */}

      {/* Handle View Dialog */}
      <Dialog
        header={selectedRow?.templateName}
        visible={dialogVisible}
        style={{ width: "31rem", height: "auto" }}
        onHide={handleClose}
        draggable={false}
      >
        <div className="modal-content rounded-xl">
          <div className="modal-body border-2 p-2 rounded-xl border-gray-200">
            {selectedRow?.templateData ? (
              <>
                {/* Document if exists */}
                {selectedRow.templateData.components.some(
                  (comp) => comp.type === "HEADER" && comp.format === "DOCUMENT"
                ) && (
                    <div className="docbox">
                      <iframe
                        src={
                          selectedRow.templateData.components.find(
                            (comp) => comp.type === "HEADER"
                          ).example?.header_handle[0]
                        }
                        title="Document Preview"
                        className="w-full h-64 border border-gray-200 rounded-lg"
                      />
                      <a
                        href={
                          selectedRow.templateData.components.find(
                            (comp) => comp.type === "HEADER"
                          ).example?.header_handle[0]
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline flex items-center justify-center mt-3"
                      >
                        View Document in new tab
                      </a>
                    </div>
                  )}

                {/* Image if exists */}
                {selectedRow.templateData.components.some(
                  (comp) => comp.type === "HEADER" && comp.format === "IMAGE"
                ) && (
                    <div className="imgbox">
                      <img
                        src={
                          selectedRow.templateData.components.find(
                            (comp) => comp.type === "HEADER"
                          ).example?.header_handle[0]
                        }
                        alt="Template Preview"
                        className="h-45 w-full rounded-lg object-contain border border-gray-200"
                      />
                    </div>
                  )}

                {/* Video if exist */}
                {selectedRow.templateData.components.some(
                  (comp) => comp.type === "HEADER" && comp.format === "VIDEO"
                ) && (
                    <div className="videobox">
                      <video
                        controls
                        src={
                          selectedRow.templateData.components.find(
                            (comp) => comp.type === "HEADER"
                          ).example?.header_handle[0]
                        }
                        alt="Template Preview"
                        className="h-45 w-full rounded-lg object-contain border border-gray-200"
                      />
                    </div>
                  )}

                {/* Text Content */}
                <div className="contentbox text-sm flex flex-col gap-2 py-2 max-h-80 overflow-scroll">
                  {selectedRow.templateData.components.map(
                    (component, index) => (
                      <pre className="text-wrap" key={index}>
                        {component.text}
                      </pre>
                    )
                  )}
                </div>

                {/* Carousel if exists */}
                {selectedRow?.templateData?.components.some(
                  (comp) => comp.type === "CAROUSEL"
                ) && (
                    <CarouselPreview
                      carouselData={selectedRow.templateData.components.find(
                        (comp) => comp.type === "CAROUSEL"
                      )}
                    />
                  )}

                {/* Buttons if exists */}
                <div className="flex flex-col gap-2">
                  {selectedRow.templateData.components.some(
                    (comp) => comp.type === "BUTTONS"
                  ) &&
                    selectedRow.templateData.components
                      .find((comp) => comp.type === "BUTTONS")
                      .buttons.map((btn, index) => (
                        <button
                          key={index}
                          //   title={
                          //     btn.type === "PHONE_NUMBER"
                          //       ? `Call: ${btn.phone_number}`
                          //       : `Visit: ${btn.url}`
                          //   }
                          title={getBtnTitle(
                            btn.type,
                            btn.phone_number,
                            btn.url,
                            btn.text
                          )}
                          className={`flex items-center justify-center px-4 py-2 text-sm rounded-md cursor-pointer ${getBtnCss(
                            btn.type
                          )}`}
                          onClick={() =>
                            btn.type === "PHONE_NUMBER"
                              ? (window.location.href = `tel:${btn.phone_number}`)
                              : window.open(btn.url, "_blank")
                          }
                        >
                          {getBtnIcon(btn.type)}
                          {btn.text}
                        </button>
                      ))}
                </div>
              </>
            ) : (
              <p>No template data available.</p>
            )}
          </div>
        </div>
      </Dialog>

      {/* Handle Delete Popup */}
      {/* <ConfirmPopup
                target={anchorEl}
                visible={visible}
                onHide={() => setVisible(false)}
                message={`Are you sure you want to delete -  ${currentRow?.templateName} ?`}
                icon={<WarningAmberOutlinedIcon sx={{ color: "red" }} />}
                accept={acceptDelete}
                reject={rejectDelete}
            /> */}

      {/* Delete Template Start */}
      <Dialog
        header={"Confirm Delete"}
        visible={visible}
        style={{ width: "27rem" }}
        onHide={() => setVisible(false)}
        draggable={false}
      >
        <div className="flex items-center justify-center">
          {/* <ErrorOutlineOutlinedIcon
                  sx={{
                    fontSize: 64,
                  }}
                /> */}
          <CancelOutlinedIcon
            sx={{
              fontSize: 64,
              color: "#ff3f3f",
            }}
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-[1.1rem] font-semibold text-gray-700">
            Are you sure you want to delete the template <br />
            <span className="text-green-500">"{currentRow?.templateName}"</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This action is irreversible.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          {!isFetching && (
            <UniversalButton
              label="Cancel"
              style={{
                backgroundColor: "#090909",
              }}
              onClick={() => setVisible(false)}
            />
          )}
          <UniversalButton
            label={isFetching ? "Deleting..." : "Delete"}
            style={
              {
                // backgroundColor: "red",
              }
            }
            onClick={handledeleteTemplate}
            disabled={isFetching}
          />
        </div>
      </Dialog>
      {/* Delete Template End */}

      {/* Curl Dialog */}

      <Dialog
        header={"Curl Data"}
        visible={curlDialogVisible}
        style={{ width: "35rem", maxHeight: "35rem" }}
        onHide={() => {
          setCurlDialogVisible(false);
          setCurlData("");
        }}
        draggable={false}
      >
        <div className="border rounded-md p-1 relative" >
          <div className="absolute right-0">
            <button
              onClick={() =>
                handleCopyPassword(JSON.stringify(curlData, null, 2))
              }
            >
              <ContentCopyOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "#999",
                }}
              />
            </button>
          </div>

          <pre className="text-xs whitespace-pre-wrap text-gray-800  break-words">{JSON.stringify(curlData, null, 2)}</pre>
        </div>
      </Dialog>
    </>
  );
};

export default DataTable;
