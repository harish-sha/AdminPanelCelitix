import { deleteWorkflow, getAllWorkflow } from "@/apis/workflow";
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalButton from "@/components/common/UniversalButton";
import { DataTable } from "@/components/layout/DataTable";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { IconButton } from "@mui/material";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";

export const WorkflowDetails = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [visibleDialog, setVisibledialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({
    srno: "",
    type: "",
  });

  async function handleFetchAllWorkflow() {
    try {
      setIsLoading(true);
      const res = await getAllWorkflow(type);

      setRows(
        Array.isArray(res)
          ? res?.map((item, index) => ({
              id: index + 1,
              sn: index + 1,
              ...item,
            }))
          : []
      );
    } catch (e) {
      toast.error("Unable to fetch workflow");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleFetchAllWorkflow();
  }, [type]);

  async function handleDelete(row) {
    if (!row.sr_no || !row.node_type) return;
    const srno = row.sr_no;
    const type = row.node_type;

    setSelectedRowData({
      srno,
      type,
    });
    setVisibledialog(true);
  }

  function handleUpdate() {}
  async function handleConfirmDelete(row) {
    const srno = selectedRowData.srno;
    const type = selectedRowData.type;

    try {
      const res = await deleteWorkflow(srno, type);
      if (!res?.status) {
        return toast.error(res?.message || "Unable to delete workflow");
      }
      toast.success(res?.message || "Workflow deleted successfully");
      setVisibledialog(false);
      await handleFetchAllWorkflow();
    } catch (e) {
      toast.error("Unable to delete workflow");
    }
  }

  const cols = [
    { field: "sn", headerName: "S.No", width: 100 },
    { field: "insert_time", headerName: "Created On", width: 200 },
    { field: "node_type", headerName: "Type", width: 150 },
    { field: "workflow_name", headerName: "Name", width: 200 },
    {
      field: "isOtpWorkflow",
      headerName: "Is Otp Workflow",
      width: 200,
      renderCell: (params) => (params.row.isOtpWorkflow === 1 ? "Yes" : "No"),
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Update Workflow" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => {
                navigate("/workflow/edit", {
                  state: {
                    data: params?.row?.node_json || "[]",
                  },
                });
              }}
            >
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Workflow" placement="top" arrow>
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

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2 w-full">
          <div className="mb-4 w-1/3">
            <AnimatedDropdown
              id="type"
              name="type"
              options={[
                { label: "ALL", value: "" },
                { label: "OBD", value: "voice" },
                { label: "WHATSAPP", value: "whatsapp" },
                { label: "RCS", value: "rcs" },
                { label: "SMS", value: "sms" },
              ]}
              label={"Select Type"}
              value={type}
              onChange={(e) => {
                setType(e);
              }}
              placeholder="Select Type"
            />
          </div>

          <UniversalButton
            id="Search"
            name="Search"
            label={isLoading ? "Searching..." : "Search"}
            disabled={isLoading}
            style={{ marginLeft: "10px", marginTop: "11px" }}
            onClick={() => handleFetchAllWorkflow()}
          />
        </div>
        <UniversalButton
          id="Add WorkFlow"
          name="Add WorkFlow"
          label="Add WorkFlow"
          style={{ marginLeft: "10px", marginTop: "11px", width: "120px" }}
          onClick={() => navigate("/workflow/create")}
        />
      </div>

      <DataTable
        id="workflowDetails"
        name="workflowDetails"
        col={cols}
        rows={rows}
        // onRowClick={handleFetchAllWorkflow}
      />

      <Dialog
        header="Delete Workflow"
        visible={visibleDialog}
        style={{ width: "50vw" }}
        onHide={() => {
          setVisibledialog(false);
          setSelectedRowData({ srno: "", type: "" });
        }}
        draggable={false}
      >
        <div>
          <p>Are you sure you want to delete this workflow?</p>
          <div className="flex justify-end mt-2">
            <UniversalButton
              id="cancel"
              name="cancel"
              label="Cancel"
              onClick={() => {
                setVisibledialog(false);
                setSelectedRowData({ srno: "", type: "" });
              }}
            />
            <UniversalButton
              id="Delete"
              name="Delete"
              label="Delete"
              style={{ marginLeft: "10px", backgroundColor: "red" }}
              onClick={(w) => handleConfirmDelete()}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
