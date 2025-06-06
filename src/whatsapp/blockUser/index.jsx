import {
  deleteblockUser,
  getblockUser,
  getWabaList,
} from "@/apis/whatsapp/whatsapp";
import { DataTable } from "@/components/layout/DataTable";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AnimatedDropdown from "../components/AnimatedDropdown";
import { CgUnblock } from "react-icons/cg";
import { render } from "timeago.js";
import { IconButton } from "@mui/material";
import CustomTooltip from "../components/CustomTooltip";
import { Dialog } from "primereact/dialog";
import UniversalButton from "../components/UniversalButton";

export const BlockUser = () => {
  //   const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [allWaba, setAllWaba] = useState([]);
  const [selectedWaba, setSelectedWaba] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  async function getAllWaba() {
    try {
      const res = await getWabaList();
      setAllWaba(res);
    } catch (e) {
      toast.error("Error fetching waba");
    }
  }

  async function handleGetAllBlockUser() {
    try {
      const res = await getblockUser(selectedWaba);

      const formattedData = Array.isArray(res?.data)
        ? res?.data?.map((item, index) => ({
            sn: index + 1,
            id: item.wa_id,
            ...item,
          }))
        : [];
      setRows(formattedData);
    } catch (e) {
      console.log(e);
      toast.error("Error fetching block user");
    }
  }
  useEffect(() => {
    getAllWaba();
  }, []);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  useEffect(() => {
    if (!selectedWaba) return;

    handleGetAllBlockUser();
  }, [selectedWaba]);

  function handleUnblockClick(id) {
    setSelectedId(id);
    setDialogVisible(true);
  }
  async function handleUnblock() {
    try {
      const payload = {
        messaging_product: "whatsapp",
        block_users: [
          { user: selectedId },
          //,{ "user": "919610099620" }
        ],
      };
      const res = await deleteblockUser(selectedWaba, payload);
      if (res?.block_users?.removed_users?.length == 0) {
        toast.error("Unable to unblock user");
      }
      toast.success("User unblocked successfully");
      setDialogVisible(false);
      await handleGetAllBlockUser();
    } catch (e) {
      toast.error("Error unblocking user");
    }
  }

  const cols = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "wa_id",
      headerName: "Mobile No.",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip title="Unblock User" placement="top" arrow>
          <IconButton
            className="no-xs"
            onClick={() => handleUnblockClick(params.row.id)}
          >
            <CgUnblock className="text-gray-500 cursor-pointer hover:text-gray-700" />
          </IconButton>
        </CustomTooltip>
      ),
    },
  ];
  return (
    <div>
      <h1 className="text-xl mb-2 underline">Block User Table</h1>
      <div className="mb-4 w-[15rem]">
        <AnimatedDropdown
          id="selectWaba"
          label={"Select WABA"}
          name="selectWaba"
          options={allWaba.map((waba) => ({
            value: waba.mobileNo,
            label: waba.name,
          }))}
          onChange={(e) => {
            setSelectedWaba(e);
          }}
          value={selectedWaba}
        />
      </div>

      <DataTable id="blockUser" rows={rows} col={cols} title="Block User" />

      <Dialog
        header="Confirmation Dialog"
        visible={dialogVisible}
        style={{ width: "35rem" }}
        onHide={() => {
          setDialogVisible(false);
        }}
        draggable={false}
      >
        <div className="space-y-2">
          <p>
            Are you sure you want to unblock this user
            <span className="font-semibold underline ml-1">{selectedId}</span>?
          </p>
          <div className="flex mr-auto ml-auto gap-2">
            <UniversalButton id="cancel" name="cancel" label="Cancel" />
            <UniversalButton
              id={"unblock"}
              name="unblock"
              label="Unblock"
              style={{ backgroundColor: "red" }}
              onClick={handleUnblock}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
