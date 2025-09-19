import {
  addBlockHeader,
  deleteBlockHeader,
  getBlockHeader,
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

const ManageBlockHeader = () => {
  const [row, setRow] = React.useState([]);
  const [deleteState, setDeleteState] = React.useState({
    isOpen: false,
    id: "",
  });

  const [addDataState, setAddDataState] = React.useState({
    isOpen: false,
    blockcontain: "",
  });

  async function handleGetBlockHeader() {
    try {
      const res = await getBlockHeader();

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
    handleGetBlockHeader();
  }, []);

  async function handleDelete() {
    if (!deleteState.id) return;
    try {
      const res = await deleteBlockHeader(deleteState?.id);

      if (!res?.status) {
        return toast.error(res?.msg || "Something went wrong");
      }

      toast.success(res?.msg || "Deleted successfully");
      setDeleteState({ isOpen: false, id: "" });
      await handleGetBlockHeader();
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  async function handleAddBlockHeader() {
    if (!addDataState.blockcontain) return;
    try {
      delete addDataState.isOpen;
      const res = await addBlockHeader(addDataState);

      if (!res?.status) {
        return toast.error(res?.msg || "Something went wrong");
      }

      toast.success(res?.msg || "Added successfully");
      setAddDataState({ isOpen: false, blockcontain: "" });
      await handleGetBlockHeader();
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  const col = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "blockContain",
      headerName: "Block Contain",
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
                  id: params.row.blockId,
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
      <h1 className="mb-2 text-2xl">Block Header List</h1>

      <div className="flex gap-2 justify-between">
        <UniversalButton
          label="Search"
          variant="primary"
          onClick={handleGetBlockHeader}
        />
        <UniversalButton
          label="Add Block Header"
          variant="primary"
          onClick={() => {
            setAddDataState((prev) => ({ isOpen: true, blockcontain: "" }));
          }}
        />
      </div>

      <div className="mt-2">
        <DataTable id="blockHeader" name="blockHeader" col={col} rows={row} />
      </div>

      <Dialog
        header="Add Block Header"
        visible={addDataState.isOpen}
        onHide={() => {
          setAddDataState((prev) => ({ isOpen: false, blockcontain: "" }));
        }}
        className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div>
          <InputField
            id="blockcontain"
            name="blockcontain"
            label="Block Contain"
            type="text"
            value={addDataState.blockcontain}
            onChange={(e) => {
              setAddDataState((prev) => ({
                ...prev,
                blockcontain: e.target.value,
              }));
            }}
          />

          <UniversalButton
            label="Add Block Header"
            variant="primary"
            onClick={handleAddBlockHeader}
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

export default ManageBlockHeader;
