import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomTooltip from "../components/CustomTooltip";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { DataTable } from "@/components/layout/DataTable";
import { getPincodeData, getSalesPersonList } from "@/apis/admin/admin";
import { MdOutlineDeleteForever } from "react-icons/md";
import InputField from "@/whatsapp/components/InputField";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import UniversalButton from "../components/UniversalButton";
import AnimatedDropdown from "../components/AnimatedDropdown";
import { InputSwitch } from "primereact/inputswitch";
import UniversalDatePicker from "../components/UniversalDatePicker";

const ManageSales = () => {
  const navigate = useNavigate();
  const handleAddSalesPerson = () => {
    navigate("/addsalesuser", { state: { isSalesPerson: true } });
  };

  const [salesPersonList, setsalesPersonList] = useState([]);

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({});

  useEffect(() => {
    async function handleFetchAccountManager() {
      try {
        const res = await getSalesPersonList();

        //  value: item?.SalesPersonId,
        // label: item?.SalesPersonName,

        const formattedData = Array.isArray(res?.data)
          ? res?.data?.map((item, index) => ({
            id: index + 1,
            sn: index + 1,
            ...item,
          }))
          : [];
        setsalesPersonList(formattedData);
      } catch (e) {
        toast.error("Error fetching Account Manager List");
      }
    }

    handleFetchAccountManager();
  }, []);

  function handleEdit(row) {
    console.log("row", row)
    if (!row.SalesPersonName) return;
    setUpdateDetails({
      userId: row?.SalesPersonName,
    });
    setIsUpdateDialogOpen(true)
  }

  async function handleUpdate() {
    try {
      const payload = {

      }

      toast.success("Details Updated Successfully")
    }
    catch (e) {
      console.log("e", e)
      toast.error("Error while update details")
    }
  }

  async function handleDelete(row) { }
  const cols = [
    { field: "sn", headerName: "S.No", flex: 0, width: 100 },
    { field: "SalesPersonName", headerName: "User ID", flex: 1, minWidth: 500 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 400,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Edit User Details" placement="top">
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>

          <CustomTooltip arrow title="Delete User" placement="top">
            <IconButton onClick={() => handleDelete(params.row.srno)}>
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

  async function handleGetPincodeData(pincode) {
    if (!pincode || pincode?.length !== 6) return;
    try {
      const res = await getPincodeData(pincode);
      if (!res?.stateName) return;

      setUpdateDetails((prev) => ({
        city: res.district,
        state: res?.stateName,
        country: "India",
      }));
    } catch (e) {
      toast.error("Error in Fetching Pincode Data");
    }
  }
  return (
    <div>
      <DataTable
        id="salesPerson"
        name="salesPerson"
        col={cols}
        rows={salesPersonList}
      />

      <Dialog
        header="Edit Details"
        visible={isUpdateDialogOpen}
        onHide={() => {
          setIsUpdateDialogOpen(false);
          setUpdateDetails({});
        }}
        className="lg:w-[50rem] md:w-[40rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-3">
          <div className="grid gap-4 mb-2 lg:grid-cols-2">
            <InputField
              label="User ID"
              id="userid"
              name="userid"
              placeholder="Enter your User ID"
              value={updateDetails.userId}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, userId: e.target.value })
              }
              required
            />
            <UniversalDatePicker
              label="Expiry Date"
              id="expiryDate"
              name="expiryDate"
              placeholder="Enter Expiry Date"
              value={updateDetails.expiryDate}
              onChange={(newValue) =>
                setUpdateDetails({ ...updateDetails, expiryDate: newValue })
              }
            />
          </div>

          {/* <div className="lg:w-100 md:w-100 flex flex-wrap gap-4 mt-5">
            <div className="flex justify-center items-center">
              <UniversalLabel
                text="Status"
                id="editstatus"
                name="editstatus"
                className="text-sm font-medium text-gray-700"
              />
            </div>
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="employeeidviewOption1"
                name="employeeidviewredio"
                value="enable"
                onChange={() => {
                  setUpdateDetails({
                    ...updateDetails,
                    status: 1,
                  });
                }}
                checked={updateDetails.status == 1 ? true : false}
              />
              <label
                htmlFor="employeeidviewOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Active
              </label>
            </div>
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="employeeidviewOption2"
                name="employeeidviewredio"
                value="disable"
                onChange={() => {
                  setUpdateDetails({
                    ...updateDetails,
                    status: 0,
                  });
                }}
                checked={updateDetails.status == 0 ? true : false}
              />
              <label
                htmlFor="employeeidviewOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Inactive
              </label>
            </div>
          </div> */}

          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
            <InputField
              label="First Name"
              id="firstname"
              name="firstname"
              placeholder="Enter your First Name"
              value={updateDetails.firstName}
              onChange={(e) =>
                setUpdateDetails({
                  ...updateDetails,
                  firstName: e.target.value,
                })
              }
              required
            />
            <InputField
              label="Last Name"
              id="lastname"
              name="lastname"
              placeholder="Enter your Last Name"
              value={updateDetails.lastName}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, lastName: e.target.value })
              }
              required
            />
            <InputField
              label="Email ID"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email ID"
              value={updateDetails.emailId}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, emailId: e.target.value })
              }
              required
            />
            <InputField
              label="Mobile No."
              id="mobile"
              name="mobile"
              placeholder="Enter your Mobile No."
              type="number"
              value={updateDetails.mobileNo}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, mobileNo: e.target.value })
              }
            />
            <InputField
              label="Company Name"
              id="company"
              name="company"
              placeholder="Enter your Company Name"
              value={updateDetails.companyName}
              onChange={(e) =>
                setUpdateDetails({
                  ...updateDetails,
                  companyName: e.target.value,
                })
              }
            />
            <InputField
              label="Address"
              id="address"
              name="address"
              placeholder="Enter your Address"
              value={updateDetails.address}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, address: e.target.value })
              }
            />
            <InputField
              label="Pincode"
              id="Pincode"
              name="Pincode"
              placeholder="Enter your Pincode"
              value={updateDetails.pinCode}
              onChange={(e) => {
                setUpdateDetails({ ...updateDetails, pinCode: e.target.value });
                handleGetPincodeData(e.target.value);
              }}
            />
            <InputField
              label="City"
              id="city"
              name="city"
              placeholder="Enter your City"
              value={updateDetails.city}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, city: e.target.value })
              }
              disabled={true}
            />
            <InputField
              label="State"
              id="state"
              name="state"
              placeholder="Enter your State"
              value={updateDetails.state}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, state: e.target.value })
              }
              disabled={true}
            />
            <InputField
              label="Country"
              id="country"
              name="country"
              placeholder="Enter your Country"
              value={updateDetails.country}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, country: e.target.value })
              }
              disabled={true}
            />
          </div>
          <div className="flex justify-center mt-3">
            <UniversalButton
              label="Update"
              id="updateDetails"
              name="updateDetails"
              onClick={handleUpdate}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageSales;
