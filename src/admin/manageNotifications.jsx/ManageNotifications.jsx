import { getNotificationList } from "@/apis/admin/admin";
import UniversalButton from "@/components/common/UniversalButton";
import { DataTable } from "@/components/layout/DataTable";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  ];
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
