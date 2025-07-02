// import { deleteWorkflow, getAllWorkflow } from "@/apis/workflow";
// import CustomTooltip from "@/components/common/CustomTooltip";
// import UniversalButton from "@/components/common/UniversalButton";
// import { DataTable } from "@/components/layout/DataTable";
// import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
// import { IconButton } from "@mui/material";
// import { Dialog } from "primereact/dialog";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { MdOutlineDeleteForever } from "react-icons/md";
// import EditNoteIcon from "@mui/icons-material/EditNote";

// export const WorkflowDetails = () => {
//   const navigate = useNavigate();

//   const [type, setType] = useState("");
//   const [rows, setRows] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const [visibleDialog, setVisibledialog] = useState(false);
//   const [selectedRowData, setSelectedRowData] = useState({
//     srno: "",
//     type: "",
//   });

//   async function handleFetchAllWorkflow() {
//     try {
//       setIsLoading(true);
//       const res = await getAllWorkflow(type);

//       setRows(
//         Array.isArray(res)
//           ? res?.map((item, index) => ({
//               id: index + 1,
//               sn: index + 1,
//               ...item,
//             }))
//           : []
//       );
//     } catch (e) {
//       toast.error("Unable to fetch workflow");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     handleFetchAllWorkflow();
//   }, [type]);

//   async function handleDelete(row) {
//     if (!row.sr_no || !row.node_type) return;
//     const srno = row.sr_no;
//     const type = row.node_type;

//     setSelectedRowData({
//       srno,
//       type,
//     });
//     setVisibledialog(true);
//   }

//   function handleUpdate() {}
//   async function handleConfirmDelete(row) {
//     const srno = selectedRowData.srno;
//     const type = selectedRowData.type;

//     try {
//       const res = await deleteWorkflow(srno, type);
//       if (!res?.status) {
//         return toast.error(res?.message || "Unable to delete workflow");
//       }
//       toast.success(res?.message || "Workflow deleted successfully");
//       setVisibledialog(false);
//       await handleFetchAllWorkflow();
//     } catch (e) {
//       toast.error("Unable to delete workflow");
//     }
//   }

//   const cols = [
//     { field: "sn", headerName: "S.No", width: 100 },
//     { field: "insert_time", headerName: "Created On", width: 200 },
//     { field: "node_type", headerName: "Type", width: 150 },
//     { field: "workflow_name", headerName: "Name", width: 200 },
//     {
//       field: "isOtpWorkflow",
//       headerName: "Is Otp Workflow",
//       width: 200,
//       renderCell: (params) => (params.row.isOtpWorkflow === 1 ? "Yes" : "No"),
//     },
//     {
//       field: "Action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => (
//         <>
//           <CustomTooltip title="Update Workflow" placement="top" arrow>
//             <IconButton
//               className="no-xs"
//               onClick={() => {
//                 navigate("/workflow/edit", {
//                   state: {
//                     data: params?.row?.node_json || "[]",
//                   },
//                 });
//               }}
//             >
//               <EditNoteIcon
//                 sx={{
//                   fontSize: "1.2rem",
//                   color: "gray",
//                 }}
//               />
//             </IconButton>
//           </CustomTooltip>
//           <CustomTooltip title="Delete Workflow" placement="top" arrow>
//             <IconButton
//               className="no-xs"
//               onClick={() => handleDelete(params.row)}
//             >
//               <MdOutlineDeleteForever
//                 className="text-red-500 cursor-pointer hover:text-red-600"
//                 size={20}
//               />
//             </IconButton>
//           </CustomTooltip>
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div className="flex justify-between items-center w-full">
//         <div className="flex items-center gap-2 w-full">
//           <div className="mb-4 w-1/3">
//             <AnimatedDropdown
//               id="type"
//               name="type"
//               options={[
//                 { label: "ALL", value: "" },
//                 { label: "OBD", value: "voice" },
//                 { label: "WHATSAPP", value: "whatsapp" },
//                 { label: "RCS", value: "rcs" },
//                 { label: "SMS", value: "sms" },
//               ]}
//               label={"Select Type"}
//               value={type}
//               onChange={(e) => {
//                 setType(e);
//               }}
//               placeholder="Select Type"
//             />
//           </div>

//           <UniversalButton
//             id="Search"
//             name="Search"
//             label={isLoading ? "Searching..." : "Search"}
//             disabled={isLoading}
//             style={{ marginLeft: "10px", marginTop: "11px" }}
//             onClick={() => handleFetchAllWorkflow()}
//           />
//         </div>
//         <UniversalButton
//           id="Add WorkFlow"
//           name="Add WorkFlow"
//           label="Add WorkFlow"
//           style={{ marginLeft: "10px", marginTop: "11px", width: "120px" }}
//           onClick={() => navigate("/workflow/create")}
//         />
//       </div>

//       <DataTable
//         id="workflowDetails"
//         name="workflowDetails"
//         col={cols}
//         rows={rows}
//         // onRowClick={handleFetchAllWorkflow}
//       />

//       <Dialog
//         header="Delete Workflow"
//         visible={visibleDialog}
//         style={{ width: "50vw" }}
//         onHide={() => {
//           setVisibledialog(false);
//           setSelectedRowData({ srno: "", type: "" });
//         }}
//         draggable={false}
//       >
//         <div>
//           <p>Are you sure you want to delete this workflow?</p>
//           <div className="flex justify-end mt-2">
//             <UniversalButton
//               id="cancel"
//               name="cancel"
//               label="Cancel"
//               onClick={() => {
//                 setVisibledialog(false);
//                 setSelectedRowData({ srno: "", type: "" });
//               }}
//             />
//             <UniversalButton
//               id="Delete"
//               name="Delete"
//               label="Delete"
//               style={{ marginLeft: "10px", backgroundColor: "red" }}
//               onClick={(w) => handleConfirmDelete()}
//             />
//           </div>
//         </div>
//       </Dialog>
//     </>
//   );
// };

import UniversalButton from "@/components/common/UniversalButton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllWorkflow, deleteWorkflow } from "@/apis/workflow";
import { Dialog } from "primereact/dialog";
import Animationwhatsapp2 from "../../assets/animation/whatsappanimation2.json";
import Animationobd from "../../assets/animation/Animation-obd.json";
import Animationrcs from "../../assets/animation/Animation-rcs.json";
import Animationsms from "../../assets/animation/Animation-sms.json";
import Lottie from "lottie-react";
import { MdOutlineDeleteForever } from "react-icons/md";
import EditNoteIcon from "@mui/icons-material/EditNote";

function ProfileCard({
  workflow_name = "",
  node_type = "",
  insert_time = "",
  isOtpWorkflow = null,
  onEdit,
  onDelete,
  params,
}) {
  // const iconMap = {
  //   voice: Animationobd,
  //   whatsapp: Animationwhatsapp2,
  //   rcs: Animationrcs,
  //   sms: Animationsms,
  // };
  // const animationData = iconMap[node_type] || null;
  const navigate = useNavigate();
  // Fallback to initials if no icon for type
  // const initials =
  //   displayIcon

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-200 via-blue-75 to-white p-5 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1">
      <div className="flex items-start space-x-3 mb-4">
        {/* <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-lg">
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="w-20 h-20"
            />
          ) : (
            <span className="text-indigo-600 font-semibold text-lg">
              {initials}
            </span>
          )}
        </div> */}
        <div>
          <h3 className="text-base font-bold text-gray-800">
            {workflow_name || "Unnamed"}
          </h3>
          <p className="text-sm text-gray-500">
            <span className="text-black font-semibold">Created on</span>
            <br />{" "}
            {insert_time ? new Date(insert_time).toLocaleString() : "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            <span className="text-black font-semibold">Type</span>{" "}
            {node_type || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            <span className="text-black font-semibold">Is Otp Workflow</span>{" "}
            {isOtpWorkflow === 1 ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* <UniversalButton
          label="Edit"
          onClick={onEdit}
          className="flex-1 py-2"
        /> */}
        {/* <UniversalButton
          label="Delete"
          onClick={onDelete}
          className="flex-1 py-2 bg-red-500 hover:bg-red-600"
        /> */}
        <div className="flex justify-end space-x-2 absolute top-5 right-4">
          <EditNoteIcon
            sx={{
              fontSize: "1.2rem",
              color: "gray",
            }}
            onClick={onEdit}
            className="cursor-pointer hover:text-gray-700"
            titleAccess="Edit Workflow"
          />
          <MdOutlineDeleteForever
            className="text-red-500 cursor-pointer hover:text-red-600"
            size={20}
            onClick={onDelete}
            title="Delete Workflow"
          />
        </div>
      </div>
    </div>
  );
}

export const WorkflowDetails = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({
    srno: "",
    type: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getAllWorkflow(type);
      const list = Array.isArray(res)
        ? res.map((item, index) => ({
          sr_no: item.sr_no ?? index + 1,
          node_type: item.node_type || "",
          workflow_name: item.workflow_name || "",

          isOtpWorkflow: item.isOtpWorkflow ?? null,
          insert_time: item.insert_time || item.insert_time || "",
        }))
        : [];
      setRows(list);
    } catch (e) {
      console.error(e);
      toast.error("Unable to fetch workflows");
    } finally {
      setIsLoading(false);
    }
  };

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
    fetchData();
  }, [type]);

  const handleAddWorkflow = () => navigate("/workflow/create");

  const handleEdit = (nodeJson) => {
    navigate("/workflow/edit", { state: { data: nodeJson || "[]" } });
  };

  async function handleDelete(row) {
    if (!row.sr_no || !row.node_type) return;
    const srno = row.sr_no;
    const type = row.node_type;
    setSelectedRow(row);
    setSelectedRowData({
      srno,
      type,
    });
    setVisibleDialog(true);
  }

  function handleUpdate() { }
  async function handleConfirmDelete(row) {
    const srno = selectedRowData.srno;
    const type = selectedRowData.type;

    try {
      const res = await deleteWorkflow(srno, type);
      if (!res?.status) {
        return toast.error(res?.message || "Unable to delete workflow");
      }
      toast.success(res?.message || "Workflow deleted successfully");
      setVisibleDialog(false);
      await handleFetchAllWorkflow();
    } catch (e) {
      console.error(e);
      toast.error("Unable to delete workflow");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div className="flex items-end gap-2">
          <div className=" w-full sm:w-60">
            <AnimatedDropdown
              id="workflow-type"
              name="workflow-type"
              options={[
                { label: "ALL", value: "" },
                { label: "OBD", value: "voice" },
                { label: "WHATSAPP", value: "whatsapp" },
                { label: "RCS", value: "rcs" },
                { label: "SMS", value: "sms" },
              ]}
              label="Select Type"
              value={type}
              onChange={setType}
              placeholder="Select Type"
            />
          </div>
          <div className="w-full sm:w-46">
            <UniversalButton
              label={isLoading ? "Loading..." : "Search"}
              onClick={fetchData}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex">
          <UniversalButton
            label="Add Workflow"
            onClick={handleAddWorkflow}
            className="ml-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rows.length ? (
          rows.map((row) => (
            <ProfileCard
              key={row.sr_no}
              node_type={row.node_type}
              workflow_name={row.workflow_name}
              isOtpWorkflow={row.isOtpWorkflow}
              insert_time={row.insert_time}
              onEdit={() => handleEdit(row.node_json)}
              onDelete={() => handleDelete(row)}
            />
          ))
        ) : (
          <p className="text-gray-500">No workflows found.</p>
        )}
      </div>

      <Dialog
        header="Delete Workflow"
        visible={visibleDialog}
        style={{ width: "50vw" }}
        onHide={() => {
          setVisibleDialog(false);
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
                setVisibleDialog(false);
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
    </div>
  );
};
