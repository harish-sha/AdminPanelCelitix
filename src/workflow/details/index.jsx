import { deleteWorkflow, getAllWorkflow } from "@/apis/workflow";
import CustomTooltip from "@/components/common/CustomTooltip";
import { DataTable } from "@/components/layout/DataTable";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

export const WorkflowDetails = () => {
  const [type, setType] = useState("");
  const [rows, setRows] = useState([]);

  async function handleFetchAllWorkflow() {
    try {
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

      //       [
      //     {
      //         "insert_time": "2025-06-07 15:49:59",
      //         "node_type": "voice",
      //         "user_srno": 2925,
      //         "isDelete": 0,
      //         "sr_no": 2,
      //         "node_json": "[{\"nodeIndex\":2,\"nodeId\":\"whatsapp_1\",\"nodeType\":\"whatsapp\",\"isLastNode\":1,\"workflowType\":-1,\"position_top\":\"93px\",\"position_left\":\"557px\",\"whatsapp_1\":{\"value\":{\"wabanumber\":\"4\",\"whatsappTemplate\":\"394\",\"whatsapp_category\":\"MARKETING\",\"whatsapp_templateType\":\"text\",\"variables\":[],\"fileInput\":\"\",\"urlValues\":\"\"}}},{\"nodeIndex\":1,\"nodeId\":\"voice_0\",\"nodeType\":\"voice\",\"isLastNode\":0,\"workflowType\":-1,\"position_top\":\"191px\",\"position_left\":\"203px\",\"voice_0\":{\"conditionList\":{\"voice_0_condition_0\":{\"value\":{\"type\":\"deliverystatus\",\"val\":\"notAnswered\",\"time\":0,\"otpTimeIntervalValue\":0,\"keyPressValue\":-1,\"callDurationTime\":0,\"ansPreFix\":\"\"},\"nextNode\":\"whatsapp_1\"}}}}]",
      //         "isOtpWorkflow": -1,
      //         "workflow_name": "voicetest1",
      //         "workflow_UId": "voicetest1_JXBcv"
      //     }
      // ]
    } catch (e) {
      console.log(e);
      toast.error("Unable to fetch workflow");
    }
  }

  useEffect(() => {
    handleFetchAllWorkflow();
  }, [type]);

  async function handleDelete(row) {
    if (!row.sr_no || !row.node_type) return;
    const srno = row.sr_no;
    const type = node_type;

    try {
      const res = await deleteWorkflow(srno, type);
      console.log(res);
    } catch (e) {
      toast.error("Unable to delete workflow");
    }
  }

  const cols = [
    { field: "sn", headerName: "S.No", width: 100 },
    { field: "insert_time", headerName: "Created On", width: 200 },
    { field: "node_type", headerName: "Type", width: 150 },
    { field: "workflow_name", headerName: "Name", width: 100 },
    {
      field: "isOtpWorkflow",
      headerName: "Is Otp Workflow",
      width: 150,
      renderCell: (params) => (params.row.isOtpWorkflow === 1 ? "Yes" : "No"),
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
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
      ),
    },
  ];

  return (
    <>
      <div className="mb-4 w-1/3">
        <AnimatedDropdown
          id="type"
          name="type"
          options={[
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

      <DataTable
        id="workflowDetails"
        name="workflowDetails"
        col={cols}
        rows={rows}
        // onRowClick={handleFetchAllWorkflow}
      />
    </>
  );
};
