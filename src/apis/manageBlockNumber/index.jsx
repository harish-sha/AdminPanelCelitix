import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteBlockNumber, getBlockNumberList } from "../admin/admin";
import { PaginationTable } from "@/components/layout/PaginationTable";
import CustomTooltip from "@/components/common/CustomTooltip";
import { IconButton, Switch } from "@mui/material";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/whatsapp/components/InputField";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Dialog } from "primereact/dialog";

const BlockNumber = () => {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [totalPage, setTotalPage] = React.useState(0);

  const [deleteData, setDeleteData] = useState({
    isOpen: false,
    blockSrNo: null,
    userSrNo: null,
  });

  const [mobileNo, setMobileNo] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rows, setRows] = React.useState([]);

  async function handleFetchBlockNumberList() {
    try {
      const payload = { pageIndex: currentPage, mobileNo };

      const res = await getBlockNumberList(payload);

      const formattedRow = Array.isArray(res?.data?.content)
        ? res?.data?.content?.map((item, index) => ({
            ...item,
            id: index + 1,
            sn: index + 1,
          }))
        : [];

      setRows(formattedRow);
      setTotalPage(res?.data?.totalElements);
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  function handleDelete(row) {
    if (!row?.blockSrNo || !row?.userSrNo)
      return toast.error("Something went wrong");
    setDeleteData({
      isOpen: true,
      blockSrNo: row.blockSrNo,
      userSrNo: row.userSrNo,
    });
  }

  async function handleBlockNumberDelete() {
    try {
      const res = await deleteBlockNumber(deleteData);

      if (!res?.success) {
        return toast.error("Something went wrong");
      }
      toast.success("Block number deleted successfully");
      setDeleteData({
        isOpen: false,
        blockSrNo: null,
        userSrNo: null,
      });
      handleFetchBlockNumberList();
    } catch (e) {
      console.log("e", e);
      toast.error("Something went wrong");
    }
  }
  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "mobileNo", headerName: "Mobile No", flex: 1, minWidth: 180 },
    { field: "type", headerName: "Type", flex: 1, minWidth: 80 },
    {
      field: "whatsapp",
      headerName: "Whatsapp",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.whatsapp}
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
      field: "sms",
      headerName: "SMS",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.sms}
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
      field: "rcs",
      headerName: "RCS",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.rcs}
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
      field: "ibd",
      headerName: "IBD",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.ibd}
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
      field: "obd",
      headerName: "OBD",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.obd}
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
      field: "misscall",
      headerName: "Miss Call",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.misscall}
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
      field: "c2c",
      headerName: "C2C",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.c2c}
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

    { field: "remark", headerName: "Remarks", flex: 1, minWidth: 80 },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit Account" placement="top" arrow>
            <IconButton onClick={() => {}}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Account" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => {
                handleDelete(params.row);
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

  useEffect(() => {
    handleFetchBlockNumberList();
  }, [currentPage]);

  return (
    <div>
      <h1 className="text-lg font-medium text-gray-800">Manage Block Number</h1>

      <div className="flex gap-2 w-full mt-2">
        <div className="w-[350px]">
          <InputField
            id="blocknumber"
            name="blocknumber"
            label="Block Number"
            value={mobileNo}
            placeholder="Enter Block Number"
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>

        <div className="w-max-content flex items-end">
          <UniversalButton
            label="Search"
            id="search"
            name="search"
            onClick={handleFetchBlockNumberList}
          />
        </div>
      </div>
      <div className="mt-4">
        <PaginationTable
          id="blocknumberlist"
          name="blocknumberlist"
          rows={rows}
          col={columns}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </div>

      <Dialog
        header="Confirm Delete"
        visible={deleteData.isOpen}
        onHide={() => {
          setDeleteData((prev) => ({
            isOpen: false,
            blockSrNo: any,
            userSrNo: any,
          }));
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
                  setDeleteData((prev) => ({
                    isOpen: false,
                    blockSrNo: any,
                    userSrNo: any,
                  }));
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
                onClick={handleBlockNumberDelete}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BlockNumber;
