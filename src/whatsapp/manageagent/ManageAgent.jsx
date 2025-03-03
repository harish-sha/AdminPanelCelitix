import React, { useEffect, useState } from "react";
import ManageAgentTable from "./components/ManageAgentTable";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { Dropdown } from "primereact/dropdown";
import { IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Paper, Typography, Box, Button } from '@mui/material';
import usePagination from '@mui/material/usePagination';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";


import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import UniversalButton from "../components/UniversalButton";
import InputField from "../components/InputField";
import AnimatedDropdown from "../components/AnimatedDropdown";
import RadioGroupFieldupdown from "../components/RadioGroupFieldupdown";
import GeneratePassword from "../components/GeneratePassword";
import DropdownWithSearch from "../components/DropdownWithSearch";
import { addDepartment, getDepartmentList } from "../../apis/Agent/Agent";
import toast from "react-hot-toast";

const ManageAgent = () => {
  const [adddepartment, setAddDepartment] = useState(false);
  const [addagent, setAddAgent] = useState(false);
  const [selectedadddepartment, setSelectedAddDepartment] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [selectedRows, setSelectedRows] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);

  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);



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

  const columns = [
    { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
    { field: 'departmentName', headerName: 'Department Name', flex: 1, minWidth: 150 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <>
          <IconButton className='text-xs' onClick={() => handleView(params.row)}>
            <EditNoteIcon
              sx={{
                fontSize: "1.2rem",
                color: "gray",
              }}
            />
          </IconButton>
          <IconButton onClick={(event) => handleDelete(event, params.row)}>
            <DeleteForeverIcon
              sx={{
                fontSize: '1.2rem',
                color: '#e31a1a',
              }} />
          </IconButton>
        </>
      ),
    },
  ];

  // use this when you want to create rows dynamically
  // const rows = Array.from({ length: 500 }, (_, i) => ({
  //   id: i + 1,
  //   sn: i + 1,
  //   templateName: 'Ram',
  // }));

  const rows = departmentList.map((item, index) => ({
    id: item.departmentId,
    sn: index + 1,
    departmentName: item.departmentName || "N/A",
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

  // Department LIST

  const fetchDepartmentList = async () => {
    try {
      const response = await getDepartmentList();
      if (response?.statusCode === 200 && Array.isArray(response.data)) {
        setDepartmentList(response.data); // ✅ Set only the array part
      } else {
        console.error("Failed to fetch department details");
        toast.error("Failed to load department details!");
        setDepartmentList([]); // ✅ Prevent errors if response is invalid
      }
    } catch (error) {
      console.error("Error fetching department list:", error);
      toast.error("Error fetching department list.");
      setDepartmentList([]); // ✅ Ensure it's always an array
    }
  };

  useEffect(() => {
    fetchDepartmentList();
  }, [])

  // check the value which is correct selected 
  useEffect(() => {
    console.log("department selected", selectedadddepartment)
  }, [selectedadddepartment])

  const handleAddDepartment = async () => {
    if (!newDepartmentName.trim()) {
      toast.error("Please enter a department name.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await addDepartment(newDepartmentName.trim());

      if (response?.statusCode === 200) {
        if (response.message.includes("already exist")) {
          toast.error("Department name already exists.");
        } else {
          toast.success("Department added successfully.");
          setNewDepartmentName(""); // Clear input
          setAddDepartment(false); // Close dialog
          fetchDepartmentList(); // Refresh the department list
        }
      } else {
        toast.error("Failed to add department. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };





  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-5  mt-4 w-full">
        <h1 className="text-xl font-medium">Manage Agent</h1>
        <div className="flex gap-5" >
          <div className="w-max-content ">
            <UniversalButton
              label="Add Department"
              id="adddepartment"
              name="adddepartment"
              onClick={() => setAddDepartment(true)}
            />
          </div>
          <div className="w-max-content ">
            <UniversalButton
              label="Add Agent"
              id="addagent"
              name="addagent"
              onClick={() => setAddAgent(true)}
            />
          </div>
        </div>
      </div>

      {/* Manage Agent Table */}
      <ManageAgentTable />

      {/* Add Department dialog start  */}
      <Dialog
        header="Add Department"
        draggable={false}
        visible={adddepartment}
        className="w-[40rem]"
        onHide={() => {
          if (!adddepartment) return;
          setAddDepartment(false);
        }}
      >
        <TabView>
          <TabPanel header="Add New" leftIcon="pi pi-calendar mr-2">
            <InputField
              id="adddepartmenname"
              name="adddepartmenname"
              type="text"
              placeholder="Enter Department name..."
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              maxLength={20}
            />
            <div className="flex justify-center mt-2">
              <UniversalButton
                id="adddepartmentbtn"
                name="adddepartmentbtn"
                label={isSubmitting ? "Saving..." : "Submit"}
                variant="primary"
                onClick={handleAddDepartment}
                disabled={isSubmitting}
              />
            </div>
          </TabPanel>
          <TabPanel
            header="Manage"
            rightIcon="pi pi-user ml-2">
            <div className="m-0">
              <div className="card flex justify-content-center mb-4">
                <DropdownWithSearch
                  label="Department List"
                  tooltipContent='Select Department'
                  tooltipPlacement='right'
                  value={selectedadddepartment}
                  onChange={setSelectedAddDepartment}
                  options={
                    Array.isArray(departmentList)
                      ? departmentList.map((department) => ({
                        value: department.departmentId,
                        label: department.departmentName,
                      }))
                      : []
                  }
                  placeholder="Select Department"
                  filter
                />
              </div>
              {/* Table Start */}
              <Paper sx={{ height: 360 }} >
                <DataGrid
                  // id={id}
                  // name={name}
                  rows={rows}
                  columns={columns}
                  initialState={{ pagination: { paginationModel } }}
                  pageSizeOptions={[10, 20, 50]}
                  pagination
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  // checkboxSelection
                  rowHeight={42}
                  slots={{ footer: CustomFooter }}
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
              {/* Table End */}
            </div>
          </TabPanel>
        </TabView>
      </Dialog>
      {/* Add Department dialog end */}


      {/* Add agent dialog start */}
      <Dialog
        header="Add Agent"
        draggable={false}
        visible={addagent}
        style={{ width: "40rem" }}
        onHide={() => {
          if (!addagent) return;
          setAddAgent(false);
        }}
      >
        <div className="space-y-3">
          <InputField
            label="Full Name"
            id="fullName"
            name="fullName"
            placeholder="Enter Full Name"
          />
          <div className="grid grid-cols-2 lg:flex-nowrap flex-wrap gap-3">
            <InputField
              label="Email"
              id="email"
              name="email"
              placeholder="Enter Email"
            />
            <InputField
              label="Mobile Number"
              id="mobilemumber"
              name="mobilemumber"
              placeholder="Enter Mobile Number"
            />
          </div>
          <GeneratePassword label="Generate Password" />
          <div className="mb-2">
            <DropdownWithSearch
              label="Department List"
              tooltipContent='Select Department'
              tooltipPlacement='right'
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              options={
                Array.isArray(departmentList)
                  ? departmentList.map((department) => ({
                    value: department.departmentId,
                    label: department.departmentName,
                  }))
                  : []
              }
              placeholder="Select Department"
              filter
            />
          </div>
          <RadioGroupFieldupdown
            id="assign"
            name="assign"
            label="Assign"
            options={[
              { label: "Auto", value: "Auto" },
              { label: "Manual", value: "Manual" },
              { label: "All", value: "All" },
            ]}
          />
          <div className="flex justify-center ">
            <UniversalButton
              label="Submit"
              id="submit"
              name="submit"
              variant="primary"
            />
          </div>
        </div>
      </Dialog>
      {/* Add agent dialog end */}


    </div>
  );
};

export default ManageAgent;
