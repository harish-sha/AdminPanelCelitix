import { deleteNotification, getNotificationList } from "@/apis/admin/admin";
import UniversalButton from "@/components/common/UniversalButton";
import { DataTable } from "@/components/layout/DataTable";
import { Box, IconButton, Switch } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomTooltip from "../components/CustomTooltip";
import { MdOutlineDeleteForever } from "react-icons/md";
import { ImInfo } from "react-icons/im";
import InfoPopover from "@/components/common/InfoPopover";

const ManageNotifications = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const dropdownButtonRefs = useRef({});
  const [clicked, setClicked] = useState([]);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const additionalInfoLabels = {
    remarks: "remarks",
  };

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
      field: "emailfor",
      headerName: "Type",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "whatsapp_notification",
      headerName: "Whatsapp Notification",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.whatsapp_notification === "on" ? true : false}
            onChange={() => {}}
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
      field: "rcs_notification",
      headerName: "RCS Notification",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.rcs_notification === "on" ? true : false}
            onChange={() => {}}
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
      field: "sms_notification",
      headerName: "SMS Notification",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.sms_notification === "on" ? true : false}
            onChange={() => {}}
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
      field: "email_notification",
      headerName: "Email Notification",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.email_notification === "on" ? true : false}
            onChange={() => {}}
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
    // in EYE button (Action field)
    // {
    //   field: "remarks",
    //   headerName: "Remarks",
    //   flex: 1,
    //   minWidth: 120,
    // },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Info" placement="top" arrow>
            <span>
              <IconButton
                type="button"
                ref={(el) => {
                  if (el) dropdownButtonRefs.current[params.row.id] = el;
                }}
                onClick={() => handleInfo(params.row)}
                className="no-xs relative"
              >
                <ImInfo size={18} className="text-green-500 " />
              </IconButton>
              <InfoPopover
                anchorEl={dropdownButtonRefs.current[params.row.id]}
                open={dropdownOpenId === params.row.id}
                onClose={() => {}}
              >
                <table className="w-80 text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                  <tbody>
                    <tr className="hover:bg-gray-50 transition-colors border-b last:border-none">
                      <td className="px-4 py-2 font-medium text-gray-600 capitalize w-1/3 text-nowrap">
                        Remarks: {clicked}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </InfoPopover>
            </span>
          </CustomTooltip>
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

  function handleInfo(row) {
    const id = row.id;
    setDropdownOpenId((prevId) => (prevId === id ? null : id));
    setClicked(row.remarks);
  }

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
