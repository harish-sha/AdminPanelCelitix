import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';



import { DataGrid, GridFooterContainer, GridPagination } from '@mui/x-data-grid';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import { Dialog } from 'primereact/dialog';
import { MdOutlineDeleteForever } from "react-icons/md";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import toast from 'react-hot-toast';



import UniversalButton from '../components/UniversalButton';
import UniversalLabel from '../components/UniversalLabel';
import InputField from '../../components/layout/InputField';
// import AnimatedDropdown from '../components/AnimatedDropdown';
import CustomTooltip from '../components/CustomTooltip';
import AnimatedDropdown from '../components/AnimatedDropdown';
import { getWabaList } from '../../apis/whatsapp/whatsapp';
import Loader from '../components/Loader';

import logo from "../../assets/images/celitix-cpaas-solution-logo.svg";



const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const MIN_DIMENSION = 192; // Minimum 192px width/height
const RECOMMENDED_DIMENSION = 640; // Recommended 640px width/height


const PaginationList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});

const CustomPagination = ({ totalPages, paginationModel, setPaginationModel }) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) => setPaginationModel({ ...paginationModel, page: newPage - 1 }),
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
              <Button key={index} variant="outlined" size="small" {...item} sx={{}} >
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


const WhatsappManageWaba = ({ id, name }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [view, setView] = useState(false);
  const [wabaedit, setWabaEdit] = useState(false);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [vertical, setVertical] = useState(null);
  const [websites, setWebsites] = useState([""]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null)
  const [wabaList, setWabaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWaba, setSelectedWaba] = useState(null);



  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const fileInputRef = useRef(null);

  // Function to check image dimensions
  const validateImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const objectURL = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width < MIN_DIMENSION || img.height < MIN_DIMENSION) {
          toast.error(`Image too small. Minimum size required: ${MIN_DIMENSION}px x ${MIN_DIMENSION}px.`);
          resolve(false);
        }
        else {
          resolve(true);
        }
        URL.revokeObjectURL(objectURL);
      };

      img.onerror = () => {
        toast.error("Invalid image file.");
        resolve(false);
        URL.revokeObjectURL(objectURL);
      };

      img.src = objectURL;
    });
  };

  // Function to handle file selection and preview
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 5MB limit. Please upload a smaller image.");
      return;
    }

    const isValidDimensions = await validateImageDimensions(selectedFile);
    if (!isValidDimensions) return;

    if (preview) URL.revokeObjectURL(preview);

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
    setFile(selectedFile);
    toast.success("Image uploaded successfully.");
  };

  // useEffect to perform side effects when isLoggedIn changes
  useEffect(() => {
    if (isLoggedIn) {
      console.log("User logged in. You can now fetch or display table data.");
    }
  }, [isLoggedIn]);

  const handleFacebookLogin = () => {
    console.log("Login with Facebook clicked");
    setIsLoggedIn(true);
  };

  const handleSelectFile = () => {
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    fileInputRef.current.value = "";
    toast.success("Image removed successfully.");
  };

  const handleView = (waba) => {
    setSelectedWaba(waba);
    setView(true);
  };
  const handleEdit = () => {
    setWabaEdit(true);
  };
  const handleSync = () => {
    console.log("Sync clicked");
  };
  const handleDelete = (row) => {
    console.log("Delete clicked");

  };
  const verticalOptions = [
    { label: "PROF_SERVICES1", value: "PROF_SERVICES1" },
    { label: "TECH", value: "TECH" },
    { label: "ECOMMERCE", value: "ECOMMERCE" },
  ];

  const handleRowSelection = (ids) => {
    setSelectedRows(ids);
  };

  const columns = [
    { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
    { field: 'wabaName', headerName: 'WABA Name', flex: 1, minWidth: 120 },
    { field: 'wabaNumber', headerName: 'WABA Mobile No.', flex: 1, minWidth: 120 },
    { field: 'createdOn', headerName: 'Created On', flex: 1, minWidth: 120 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
    { field: 'expiryDate', headerName: 'Expiry Date', flex: 1, minWidth: 120 },
    { field: 'wabaAccountId', headerName: 'WABA Account ID', flex: 1, minWidth: 120 },
    { field: 'phoneNumberId', headerName: 'Phone Number ID', flex: 1, minWidth: 120 },

    // { field: 'totalAudience', headerName: 'Total Audience', flex: 1, minWidth: 120 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip
            title="View Profile"
            placement="top"
            arrow
          >
            <IconButton className='no-xs' onClick={() => handleView(params.row)}>
              <VisibilityIcon
                sx={{
                  fontSize: '1.2rem',
                  color: 'green'
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip
            title="Sync Status"
            placement="top"
            arrow
          >
            <IconButton className='no-xs' onClick={() => handleSync(params.row)}>
              <SyncOutlinedIcon
                sx={{
                  fontSize: '1.2rem',
                  color: 'green'
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip
            title="Edit Profile"
            placement="top"
            arrow
          >
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: '1.2rem',
                  color: 'gray',
                }} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip
            title="Delete WABA"
            placement="top"
            arrow
          >
            <IconButton className='no-xs' onClick={() => handleDelete(params.row)}>
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


  // WABA LIST
  useEffect(() => {
    if (!isLoggedIn)
      return;
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();
        if (response?.length > 0) {
          setWabaList(response);
        } else {
          console.error("Failed to fetch WABA details");
          toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        console.error("Error fetching WABA list:", error);
        toast.error("Error fetching WABA list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWabaList();
  }, [isLoggedIn]);

  // const rows = Array.from({ length: 500 }, (_, i) => ({
  //   id: i + 1,
  //   sn: i + 1,
  //   wabaName: 'Demo',
  //   wabaNumber: '9876543210',
  //   createdOn: '9876543210',
  //   status: 'Pending',
  //   action: 'True',
  // }));

  // Map API Data to DataGrid Rows
  const rows = wabaList.map((waba, index) => ({
    id: index + 1,
    sn: index + 1,
    wabaName: waba.name || 'N/A',
    wabaNumber: waba.mobileNo || 'N/A',
    createdOn: waba.insertTime || 'N/A',
    expiryDate: waba.expiryDate || 'N/A',
    status: waba.status || 'N/A',
    wabaAccountId: waba.wabaAccountId || 'N/A',
    phoneNumberId: waba.phoneNumberId || 'N/A',
  }));

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const CustomFooter = () => {
    return (

      <GridFooterContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center", lg: "space-between"
          },
          alignItems: "center",
          padding: 1,
          gap: 2,
          overflowX: "auto",
        }
        }
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
            Total Records: <span className='font-semibold'>{rows.length}</span>
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
      </GridFooterContainer >
    );
  };






  return (
    <div className=''>
      {!isLoggedIn &&
        <div className='w-full flex items-center justify-center h-[80vh]'>
          <div className='text-center p-10 rounded-xl shadow-md bg-white space-y-3'>
            <h1 className='font-semibold text-xl'>No account connected yet!</h1>
            <p className='mb-6 font-medium'>Login with Facebook to start launching campaign and analyse phone number quality.</p>
            <a href="#signup" className='p-2.5 text-[1.1rem] bg-[#4267b2] text-white rounded-lg tracking-wide font-medium cursor-pointer' onClick={handleFacebookLogin}>Login with Facebook</a>
          </div>
        </div>
      }

      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {/* {isLoggedIn && ( */}

          <div>
            <div className="flex flex-wrap gap-4 items-end justify-end align-middle mb-3 w-full">
              <div className="w-max-content ">
                <UniversalButton
                  label="Create WABA"
                  id="mainwabacreate"
                  name="mainwabacreate"
                />
              </div>
            </div>
            {/* <div className="flex flex-wrap gap-4 items-end justify-start align-middle pb-3 w-full">
                <div className="w-full sm:w-48">
                  <UniversalDatePicker
                    label='Created On'
                    id="mainwabacreatedon"
                    name="mainwabacreatedon"
                    placeholder="Select a date"
                    tooltipContent="Select a date"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <InputField
                    label="WABA Name"
                    placeholder="Enter WABA Name"
                    id="mainwabaname"
                    name="mainwabaname"
                    type="text"
                    tooltipContent="Enter WABA Name"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <InputField
                    label="WABA Number"
                    placeholder="Enter WABA Number"
                    id="mainwabanumber"
                    name="mainwabanumber"
                    type="number"
                    tooltipContent="Enter WABA Number"
                  />
                </div>
                <div className="w-max-content ">
                  <UniversalButton
                    label="Search"
                    id="mainwabasearch"
                    name="mainwabasearch"
                  />
                </div>

              </div> */}

            <div style={{ transition: 'filter 0.3s ease' }}>

              <Paper sx={{ height: 558 }}
                id={id}
                name={name}
              >
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
                  slots={{ footer: CustomFooter }}
                  slotProps={{ footer: { totalRecords: rows.length } }}
                  onRowSelectionModelChange={(ids) => handleRowSelection(ids)}
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
                // header={selectedWaba?.wabaName || "WABA Profile"}
                header={"WABA Profile"}
                visible={view}
                onHide={() => setView(false)}
                //   className="w-[28rem]"
                className="w-[30rem] rounded-lg shadow-lg"
                draggable={false}
                modal
              >
                <div className="p-5 bg-white rounded-lg space-y-4 shadow-md">
                  {/* Header Section */}
                  <div className="flex items-center justify-between border-b border-gray-400 pb-3">
                    <div>
                      <h1 className="font-semibold text-2xl text-gray-800">{selectedWaba?.wabaName || "WABA Profile"}</h1>
                      <p className="text-sm text-gray-500">Hey there! I am using WhatsApp.</p>
                    </div>
                    <img
                      src={logo}
                      alt="Company Logo"
                      className="w-20 h-20 rounded-full shadow-md"
                    />
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">WABA Number</p>
                    <p className="font-bold text-lg text-gray-700">
                      {selectedWaba?.wabaNumber || "N/A"}
                    </p>
                    <a
                      href="https://wa.aisensy.com/+919251006460"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm hover:underline"
                    >
                      wa.aisensy.com/+919251006460
                    </a>
                  </div>

                  {/* Description Section */}
                  <div className='space-y-1' >
                    <p className="font-semibold text-gray-800">Description</p>
                    <p className="text-gray-600 text-sm leading-relaxed min-h-20 max-h-40 overflow-y-auto text-justify">
                      Boost your business with Proactive Digital’s cutting-edge Digital Marketing
                      strategies. Specializing in Bulk SMS, Voice Call services, and Web solutions,
                      we’re committed to driving measurable results and maximizing your ROI.
                      Our innovative approach integrates advanced technologies and personalized
                      strategies to elevate your brand’s online presence.
                    </p>
                  </div>

                  {/* Email Section */}
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <a
                      href="mailto:support@proactivesms.in"
                      className="text-blue-500 text-sm hover:underline"
                    >
                      support@proactivesms.in
                    </a>
                  </div>

                  {/* Website Section */}
                  <div>
                    <p className="font-semibold text-gray-800">Website</p>
                    <a
                      href="https://www.proactivesms.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm hover:underline"
                    >
                      https://www.proactivesms.in
                    </a>
                  </div>
                </div>
              </Dialog>


              <Dialog
                header="Business Profile"
                visible={wabaedit}
                onHide={() => {
                  setWabaEdit(false);
                }}
                draggable={false}
                className="w-[50rem]"
                modal
              >
                <div className="p-2 space-y-4">

                  {/* Profile Picture Section */}
                  <div className='flex flex-col lg:items-start items-center' >

                    <UniversalLabel
                      text="Profile Picture"
                      tooltipContent="Max size of 5MB allowed. Image size of 640x640 is recommended. Images with a height or width of less than 192px may cause issues."
                      tooltipPlacement="top"
                      className='font-semibold text-gray-700 tracking-wide'
                      id="profilepicture"
                      name="profilepicture"
                    />

                    <div className="flex items-center space-x-4 mt-2">
                      {/* Image Preview */}
                      {preview ? (
                        <img
                          src={preview}
                          alt="Company Logo"
                          className="w-20 h-20 rounded-xl shadow-md p-1 object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 flex rounded-xl p-1 items-center justify-center bg-gray-200 shadow-md">
                          <span className="text-gray-500 text-sm">No Image</span>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <CustomTooltip
                          title="Upload image"
                          placement="top"
                          arrow
                        >
                          <button
                            onClick={handleSelectFile}
                            className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer`}
                          >
                            <FileUploadOutlinedIcon sx={{ color: "white", fontSize: "23px" }} />
                          </button>
                        </CustomTooltip>

                        {preview && (
                          <CustomTooltip
                            title="remove image"
                            placement="top"
                            arrow
                          >
                            <button
                              onClick={handleDeleteImage}
                              className="p-2 focus:outline-none hover:bg-gray-200 rounded-full cursor-pointer"
                            >
                              <MdOutlineDeleteForever
                                className="text-red-500 cursor-pointer hover:text-red-600"
                                size={20}
                              />
                            </button>
                          </CustomTooltip>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-2">
                    <div>
                      <InputField
                        label="Description"
                        id="description"
                        name="description"
                        tooltipContent='Description of the business. Maximum of 256 characters.'
                        tooltipPlacement='top'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full"
                        placeholder="Enter business description"
                        labelStyle={{ fontWeight: 'bold' }}
                        readOnly={false}

                      />
                    </div>
                    <div>
                      <InputField
                        id="address"
                        name="address"
                        label="Address"
                        tooltipContent='Address of the business. Maximum of 256 characters.'
                        tooltipPlacement='top'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full"
                        placeholder="Enter business address"
                        labelStyle={{ fontWeight: 'bold' }}
                        readOnly={false}
                      />
                    </div>
                    <div>
                      <InputField
                        id="email"
                        name="email"
                        label="Email"
                        tooltipContent=' Email address (in valid email format) to contact the business. Maximum of 128 characters.'
                        tooltipPlacement='top'
                        value={email}
                        className="w-full"
                        onChange={(e) => setEmail(e.target.value)}
                        labelStyle={{ fontWeight: 'bold' }}
                        placeholder='Enter email address'
                        readOnly={false}

                      />
                    </div>
                    <div>
                      <AnimatedDropdown
                        id="vertical"
                        name="vertical"
                        label="Vertical"
                        tooltipContent='Industry of the business.Maximum of 256 characters.'
                        tooltipPlacement='top'
                        value={vertical}
                        options={[
                          { label: "PROF_SERVICES1", value: "PROF_SERVICES1" },
                          { label: "TECH", value: "TECH" },
                          { label: "ECOMMERCE", value: "ECOMMERCE" },
                        ]}
                        onChange={(e) => setVertical(e.value)}
                        className="w-full"
                        placeholder="Select vertical"
                      />
                    </div>
                    <div>
                      <InputField
                        id="website1"
                        name="website1"
                        label="Websites"
                        tooltipContent='URLs (including http:// or https://) associated with the business (e.g., website, Facebook Page, Instagram). Maximum of 2 websites with a maximum of 256 characters each.'
                        tooltipPlacement='top'
                        className="w-full"
                        placeholder="Enter URL Address"
                        labelStyle={{ fontWeight: 'bold' }}
                        readOnly={false}

                      />
                    </div>
                    <div className='flex items-end space-x-2'>
                      <InputField
                        id="website2"
                        name="website2"
                        className="w-full"
                        placeholder="Enter URL Address"
                        readOnly={false}

                      />
                    </div>
                  </div>


                  {/* Action Buttons */}
                  <div className="flex justify-center space-x-3 mt-4">
                    <UniversalButton
                      id="editsave"
                      name="editsave"
                      label="Save"
                      onClick={() => {
                        setWabaEdit(false);
                        toast.success("Profile updated Successfully");
                      }}
                    />
                    <UniversalButton
                      id="editcancel"
                      name="editcancel"
                      label="Cancel"
                      onClick={() => {
                        setWabaEdit(false);
                        toast.error("No changes.");
                      }}
                    />
                  </div>
                </div>
              </Dialog >
            </div>
          </div>

          {/* )} */}
        </>
      )}

    </div>
  );
};


export default WhatsappManageWaba;
