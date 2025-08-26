import React, { useEffect, useState } from "react";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import DropdownWithSearch from "../../whatsapp/components/DropdownWithSearch";
import SMPPErrorCodeTable from "./components/SMPPErrorCodeTable";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import InputField from "../../whatsapp/components/InputField";
import UniversalTextArea from "../../whatsapp/components/UniversalTextArea";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import {
  deleteErrCode,
  getAppErrorReasons,
  getErrorMappingData,
  getMissingErrorCodeData,
  getServices,
} from "@/apis/admin/admin";
import CustomTooltip from "@/components/common/CustomTooltip";
import { IconButton } from "@mui/material";
import { MdOutlineDeleteForever } from "react-icons/md";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { DataTable } from "@/components/layout/DataTable";
import { Delete } from "lucide-react";

const SMPPErrorCode = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [searchData, setSearchData] = useState({
    serviceId: "",
    error: "",
  });
  const [rows, setRows] = useState([]);
  const [data, setData] = useState({
    service: [],
    error: [],
  });
  const [deleteData, setDeleteData] = useState({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    async function handleGetServices() {
      try {
        const res = await getServices();
        if (!res?.status) {
          return toast.error("Something went wrong");
        }
        setData((prev) => ({
          ...prev,
          service: res?.data,
        }));
      } catch (e) {
        console.log("e", e);
        return toast.error("Something went wrong");
      }
    }

    async function handleGetErrorCode() {
      try {
        const res = await getAppErrorReasons();
        if (!res?.status) {
          return toast.error("Something went wrong");
        }
        setData((prev) => ({
          ...prev,
          error: res?.data,
        }));
      } catch (e) {
        console.log("e", e);
        return toast.error("Something went wrong");
      }
    }

    handleGetServices();
    handleGetErrorCode();
  }, []);

  async function handleSearch() {
    if (!searchData?.serviceId) return;
    try {
      setIsFetching(true);
      const res = await getErrorMappingData(searchData?.serviceId);
      if (!res?.status) {
        return toast.error("Something went wrong");
      }
      const filteredData = searchData?.error
        ? res?.data?.filter(
            (data) => data?.display_err_code === searchData?.error
          )
        : res?.data;
      const getSeviceName = data?.service?.find(
        (item) => item?.serviceid === searchData?.serviceId
      )?.servicename;

      const formattedData = Array.isArray(filteredData)
        ? filteredData.map((item, index) => ({
            id: index + 1,
            sn: index + 1,
            ...item,
          }))
        : [];
      setRows(formattedData);
    } catch (e) {
      return toast.error("Something went wrong");
    } finally {
      setIsFetching(false);
    }
  }

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "vendor_error_status",
      headerName: "Vendor EC Status",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "vendor_error_code",
      headerName: "Vendor EC",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "vendor_error_code_description",
      headerName: "Vendor EC Description",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "display_reason",
      headerName: "Display EC Status",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "display_err_code",
      headerName: "Display EC",
      flex: 1,
      minWidth: 100,
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit Routing" placement="top" arrow>
            <IconButton onClick={() => {}}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Routing" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => {
                setDeleteData({
                  isOpen: true,
                  id: params.row.sr_no,
                });
              }}
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

  async function handleDelete() {
    try {
      if (!deleteData?.id) return;
      const res = await deleteErrCode(deleteData?.id);

      if (!res?.status) {
        return toast.error("Something went wrong");
      }
      toast.success("Deleted successfully");
      setDeleteData({ isOpen: false, id: null });
      handleSearch();
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-end justify-between pb-3 w-full">
        <div className="flex gap-2 items-end  w-full">
          <div className="flex gap-2">
            <DropdownWithSearch
              label="Service"
              options={data?.service?.map((data) => ({
                label: data?.servicename,
                value: data?.serviceid,
              }))}
              placeholder="Select Service"
              id="smpperrorservice"
              name="smpperrorservice"
              value={searchData?.serviceId}
              onChange={(e) =>
                setSearchData((prev) => ({ ...prev, serviceId: e }))
              }
            />
            <div className="w-[20rem]">
              <DropdownWithSearch
                label="Error Code"
                options={data?.error?.map((data) => ({
                  label: data?.error_reason,
                  value: data?.error_code,
                }))}
                placeholder="Select Error Code"
                id="smpperrorcode"
                name="smpperrorcode"
                value={searchData?.error}
                onChange={(e) =>
                  setSearchData((prev) => ({ ...prev, error: e }))
                }
              />
            </div>
          </div>

          <div className="w-max-content">
            <UniversalButton
              label="Search"
              id="searcherrorcode"
              name="searcherrorcode"
              onClick={handleSearch}
            />
          </div>
          {/* <div className="w-max-content">
            <UniversalButton
              label="Delete"
              id="deleteerrorcode"
              name="deleteerrorcode"
              // onClick={handleDeleteErrorCode}
            />
          </div> */}
        </div>
        <div className="w-max-content">
          <UniversalButton
            label="Add Error Code"
            id="adderrorcode"
            name="adderrorcode"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* ✅ Show Loader or Table */}
      {isFetching ? (
        <div className="w-full">
          <UniversalSkeleton height="35rem" width="100%" />
        </div>
      ) : (
        <DataTable
          id="smpperrorcode"
          name="smpperrorcode"
          col={columns}
          rows={rows}
        />
      )}

      <Dialog
        header="Vendor Error Code Mapping"
        visible={false}
        onHide={() => {}}
        className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <AnimatedDropdown
              label="Service"
              options={[{}]}
              id="serviceadd"
              name="serviceadd"
              onChange={() => {}}
            />
            <InputField
              label="Vendor Error Code"
              id="vendorerrorcodeadd"
              name="vendorerrorcodeadd"
              placeholder="Enter Vendor Error Code"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Vendor Error Status"
              id="vendorerrorstatusadd"
              name="vendorerrorstatusadd"
              placeholder="Vendor Error Status"
            />
            <UniversalTextArea
              label="Vendor Error Code Description"
              id="vendorerrorcodedescriptionadd"
              name="vendorerrorcodedescriptionadd"
              placeholder="Vendor Error Code Description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <AnimatedDropdown
              label="Display Type"
              options={[{}]}
              id="displaytypeadd"
              name="displaytypeadd"
              onChange={() => {}}
            />
            <AnimatedDropdown
              label="Display Reason"
              options={[{}]}
              id="displayreasonadd"
              name="displayreasonadd"
              onChange={() => {}}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Display Error Code"
              id="displayerrorcodeadd"
              name="displayerrorcodeadd"
              placeholder="Display Error Code"
              readOnly="true"
            />
          </div>
          <div className="">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="refundOnDelivery"
                className="form-checkbox"
              />
              <span className="text-sm">Refund For On Delivery Account</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="dndRefund"
                className="form-checkbox"
              />
              <span className="text-sm">DND Refund</span>
            </label>
          </div>

          <div className="flex justify-center">
            <UniversalButton label="Save" id="saveadd" name="saveadd" />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Confirm Delete"
        visible={deleteData.isOpen}
        onHide={() => {
          setDeleteData((prev) => ({ isOpen: false, id: "" }));
        }}
        className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div>
          <div className="p-4 text-center">
            <p className="text-[1.1rem] font-semibold text-gray-600">
              Are you sure ?
            </p>
            <p>
              Do you really want to delete this? This process cannot be undo.
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <UniversalButton
                label="Cancel"
                style={{
                  backgroundColor: "#090909",
                }}
                onClick={() => {
                  setDeleteData((prev) => ({ isOpen: false, id: "" }));
                }}
              />
              <UniversalButton
                label="Delete"
                variant="danger"
                style={
                  {
                    // backgroundColor: "red",
                  }
                }
                onClick={() => handleDelete()}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SMPPErrorCode;
