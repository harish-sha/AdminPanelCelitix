import React, { useEffect, useState } from "react";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import ManageSMPPTable from "./components/ManageSMPPTable";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IconButton } from "@mui/material";
import CustomTooltip from "../components/CustomTooltip";
import EditNoteIcon from "@mui/icons-material/EditNote";
import toast from "react-hot-toast";
import { getSMPP } from "@/apis/admin/admin";

const ManageSMPP = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const handleAddService = () => {
    navigate("/addservice");
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "servicename",
      headerName: "Service Name",
      flex: 1,
      minWidth: 130,
    },
    { field: "username", headerName: "User Name", flex: 1, minWidth: 120 },
    { field: "host", headerName: "Host", flex: 1, minWidth: 120 },
    {
      field: "sendingport",
      headerName: "Sending Port",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "receiverport",
      headerName: "Receiver Port",
      flex: 1,
      minWidth: 120,
    },
    { field: "sockets", headerName: "Sockets", flex: 1, minWidth: 60 },
    {
      field: "connectivity",
      headerName: "Connectivity",
      flex: 1,
      minWidth: 120,
    },
    { field: "status", headerName: "Status", flex: 1, minWidth: 80 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit Service" placement="top" arrow>
            <IconButton onClick={() => {}}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Service" placement="top" arrow>
            <IconButton className="no-xs" onClick={() => {}}>
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

  async function handleFetchSmppDetails() {
    try {
      const res = await getSMPP();
      setData(res);
    } catch (e) {
      console.log(e);
      toast.error("Error in fetching smpp details");
    }
  }
  useEffect(() => {
    handleFetchSmppDetails();
  }, []);

  return (
    <div className="w-full">
      {/* {isLoading ? (
    <>
      <Loader />
    </>
  ) : ( */}
      <div>
        <div className="flex flex-wrap gap-2 items-end justify-end pb-3 w-full">
          <div className="w-max-content">
            <UniversalButton
              label="Add Service"
              id="addsearvice"
              name="addsearvice"
              onClick={handleAddService}
            />
          </div>
        </div>

        {/* ✅ Show Loader or Table */}
        {isFetching ? (
          <div className="w-full">
            <UniversalSkeleton height="35rem" width="100%" />
          </div>
        ) : (
          <div className="w-full">
            <ManageSMPPTable id="manageSMPPTable" name="manageSMPPTable" data={data} />
          </div>
        )}
      </div>
      {/* <Dialog
                header="Add Account Create"
                visible={addAccountcreatepop}
                style={{ width: "35rem" }}
                onHide={() => {
                    setAddAccountcreatepop(false);
                }}
                draggable={false}
            >
                
            </Dialog> */}

      {/* )} */}
    </div>
  );
};

export default ManageSMPP;
