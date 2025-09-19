import {
  addBlockSeries,
  deleteBlockSeries,
  getBlockSeries,
} from "@/apis/admin/admin";
import { DataTable } from "@/components/layout/DataTable";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import CustomTooltip from "@/components/common/CustomTooltip";
import { IconButton } from "@mui/material";
import { Dialog } from "primereact/dialog";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/whatsapp/components/InputField";

const ManageBlockSeries = () => {
  const [row, setRow] = React.useState([]);
  const [deleteState, setDeleteState] = React.useState({
    isOpen: false,
    id: "",
  });

  const [addDataState, setAddDataState] = React.useState({
    isOpen: false,
    series: "",
  });

  async function handleGetBlockSeries() {
    try {
      const res = await getBlockSeries();

      const formattedRow = Array.isArray(res)
        ? res?.map((item, index) => ({
            id: index + 1,
            sn: index + 1,
            ...item,
          }))
        : [];
      setRow(formattedRow);
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    handleGetBlockSeries();
  }, []);

  async function handleDelete() {
    if (!deleteState.id) return;
    try {
      const res = await deleteBlockSeries(deleteState?.id);

      if (!res?.status) {
        return toast.error(res?.msg || "Something went wrong");
      }

      toast.success(res?.msg || "Deleted successfully");
      setDeleteState({ isOpen: false, id: "" });
      await handleGetBlockSeries();
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  async function handleAddBlockSeries() {
    if (!addDataState.series) return;
    try {
      delete addDataState.isOpen;
      const res = await addBlockSeries(addDataState);

      if (!res?.status) {
        return toast.error(res?.msg || "Something went wrong");
      }

      toast.success(res?.msg || "Added successfully");
      setAddDataState({ isOpen: false, series: "" });
      await handleGetBlockSeries();
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  const col = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "series",
      headerName: "Block Series",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          {/* <CustomTooltip title="Edit Account" placement="top" arrow>
            <IconButton onClick={() => {}}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip> */}
          <CustomTooltip title="Delete Account" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => {
                setDeleteState({
                  isOpen: true,
                  id: params.row.srNo,
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

  return (
    <div>
      <h1 className="mb-2 text-2xl">Block Header Series</h1>

      <div className="flex gap-2 justify-between">
        <UniversalButton
          label="Search"
          variant="primary"
          onClick={handleGetBlockSeries}
        />
        <UniversalButton
          label="Add Block Series"
          variant="primary"
          onClick={() => {
            setAddDataState((prev) => ({ isOpen: true, series: "" }));
          }}
        />
      </div>

      <div className="mt-2">
        <DataTable id="blockHeader" name="blockHeader" col={col} rows={row} />
      </div>

      <Dialog
        header="Add Block Series"
        visible={addDataState.isOpen}
        onHide={() => {
          setAddDataState((prev) => ({ isOpen: false, series: "" }));
        }}
        className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-2">
          <InputField
            id="blockSeries"
            name="blockSeries"
            label="Block Series"
            type="text"
            value={addDataState.series}
            onChange={(e) => {
              setAddDataState((prev) => ({
                ...prev,
                series: e.target.value,
              }));
            }}
          />

          <UniversalButton
            label="Add Block Series"
            variant="primary"
            onClick={handleAddBlockSeries}
          />
        </div>
      </Dialog>

      <Dialog
        header="Confirm Delete"
        visible={deleteState.isOpen}
        onHide={() => {
          setDeleteState((prev) => ({ isOpen: false, id: "" }));
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
                  setDeleteState((prev) => ({ isOpen: false, id: "" }));
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
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageBlockSeries;
