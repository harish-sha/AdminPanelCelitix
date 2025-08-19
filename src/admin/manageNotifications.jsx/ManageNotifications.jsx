import { deleteNotification, getNotificationList } from "@/apis/admin/admin";
import UniversalButton from "@/components/common/UniversalButton";
import { DataTable } from "@/components/layout/DataTable";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomTooltip from "../components/CustomTooltip";
import { MdOutlineDeleteForever } from "react-icons/md";

const ManageNotifications = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  async function fetchNotifications() {
    try {
      const response = await getNotificationList();
      if (!response?.success) {
        return toast.error("Error fetching notifications.");
      }
      const formattedData = Array.isArray(response?.data)
        ? response?.data.map((item, index) => ({
            ...item,
            sn: index + 1,
            id: item.sr_no,
          }))
        : [];
      setList(formattedData);
    } catch (error) {
      toast.error("Error fetching notifications.");
      console.error("Error fetching notifications:", error);
    }
  }
  useEffect(() => {
    fetchNotifications();
  }, []);

  const cols = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "emailfor",
      headerName: "emailfor",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Delete Notification" placement="top" arrow>
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

  async function handleDelete(row) {
    if (!row?.sr_no) return;
    console.log(row);
    const payload = {
      reminderSrno: row?.sr_no,
      status: "",
      type: "",
    };

    return;
    try {
      const res = await deleteNotification(payload);
      console.log("res", res);
    } catch (e) {
      toast.error("Error deleting notification.");
    }
  }
  return (
    <Box
      sx={{
        width: "100%",
        // maxHeight: "91vh",
        overflow: "hidden",
      }}
    >
      <div className="flex justify-between mb-2">
        <div className="flex gap-2 justify-center items-end">
          <p className="text-xl font-semibold mb-2 ">Notification List</p>
          <UniversalButton
            id="addNotification"
            name="addNotification"
            label={"Refresh"}
            onClick={fetchNotifications}
          />
        </div>
        <UniversalButton
          id="addNotification"
          name="addNotification"
          label={"Add Notification"}
          onClick={() => {
            navigate("/notification/add");
          }}
        />
      </div>

      <DataTable
        id="notificationList"
        name="notificationList"
        col={cols}
        rows={list}
      />
    </Box>
  );
};

export default ManageNotifications;
