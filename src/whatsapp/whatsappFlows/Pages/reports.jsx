import {
  getFlowReplyList,
  getFlowSampleRequest,
} from "@/apis/whatsapp/whatsapp";
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalButton from "@/components/common/UniversalButton";
import { DataTable } from "@/components/layout/DataTable";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import { IconButton } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const Reports = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [rows, setRows] = useState([]);

  async function getAllFlowReplyList() {
    try {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      const res = await getFlowReplyList(formattedDate);
      const formattedRow = Array.isArray(res)
        ? res?.map((item, index) => ({
            sn: index + 1,
            id: index + 1,
            ...item,
          }))
        : [];

      setRows(formattedRow);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }

  const cols = [
    {
      field: "sn",
      headerName: "S.No",
      flex: 0,
      minWidth: 50,
    },
    {
      field: "flow_name",
      headerName: "Flow Name",
      width: 250,
    },
    {
      field: "reply_count",
      headerName: "Reply Count",
      flex: 0,
      minWidth: 150,
    },
    {
      field: "campaign_name",
      headerName: "Campaign Name",
      flex: 0,
      minWidth: 200,
    },
    {
      field: "template_name",
      headerName: "Template Name",
      flex: 0,
      minWidth: 200,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="View Flow Repies" placement="top" arrow>
            <IconButton className="no-xs" onClick={() => {}}>
              <VisibilityIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  useEffect(() => {
    // async function aa() {
    //   const res = await getFlowReplyList("2025-07-31");

    //   const payload = {
    //     flowName: res[0]?.flow_name || "",
    //     templateName: res[0]?.template_name || "",
    //     campaignSrno: res[0]?.campaign_srno || "",
    //   };

    //   const resss = await getFlowSampleRequest(payload);

    //   console.log(res);

    //   console.log("resss", resss);
    // }
    // aa();

    getAllFlowReplyList();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-end">
        <div className="w-58">
          <UniversalDatePicker
            label="Select Date"
            id="selectDate"
            name="selectDate"
            placeholder="Select Date"
            defaultValue={new Date()}
            onChange={(e) => setSelectedDate(e)}
          />
        </div>
        <div>
          <UniversalButton
            id="search"
            name="search"
            label="Search"
            onClick={getAllFlowReplyList}
          />
        </div>
      </div>
      <div>
        <DataTable
          id="flowReplyList"
          name="flowReplyList"
          rows={rows}
          col={cols}
        />
      </div>
    </div>
  );
};
