import { getFlowSampleRequest } from "@/apis/whatsapp/whatsapp";
import { DataTable } from "@/components/layout/DataTable";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export const FlowReplies = () => {
  const { state } = useLocation();

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  async function handleFetchDetails() {
    try {
      const data = {
        flowName: state?.data?.flowName || "",
        templateName: state?.data?.templateName || "",
        campaignSrno: state?.data?.campaignSrno || "",
      };
      const res = await getFlowSampleRequest(data);
      let col = [
        {
          field: "sn",
          headerName: "S.No",
          flex: 0,
          minWidth: 50,
        },
      ];
      res?.map((item) => {
        col.push({
          field: item?.label,
          headerName: item?.label,
          flex: 1,
          minWidth: 100,
        });
      });
      const formattedRows = Array.isArray(res)
        ? res?.map((item, index) => ({
            sn: index + 1,
            id: index + 1,
            [item.label]: item.input || "-",
          }))
        : [];

      setColumns(col);
      setRows(formattedRows);
    } catch (e) {
      toast.error("Error in getting  details.");
    }
  }

  useEffect(() => {
    handleFetchDetails();
  }, [state]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl">{state?.data?.flowName}</h1>
      <DataTable
        id="flowReplyList"
        name="flowReplyList"
        rows={rows}
        col={columns}
      />
    </div>
  );
};
