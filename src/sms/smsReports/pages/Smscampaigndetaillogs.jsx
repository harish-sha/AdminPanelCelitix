import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import InputField from "../../../whatsapp/components/InputField";
import { IoSearch } from "react-icons/io5";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import { useLocation, useNavigate } from "react-router-dom";
import { DataTable } from "../../../components/layout/DataTable";
import toast from "react-hot-toast";
import UniversalSkeleton from "../../../whatsapp/components/UniversalSkeleton";
import { getCampaignDetails } from "../../../apis/sms/sms";
import SmsCampaignDetailedLogsTable from "../components/SmsCampaignDetailedLogsTable";

const Smscampaigndetaillogs = () => {
  const navigate = useNavigate();
  let { state } = useLocation();

  const [mobileNo, setMobileNo] = useState("");
  const [smsDetailedData, setSmsDetailedData] = useState([])

  if (!state.id) {
    navigate("/smsreports");
  }
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchCampaignDetailsReport = async () => {
    try {
      setIsFetching(true);
      const data = {
        receiptNo: state.id,
        summaryType: "",
        mobileNo,
      };
      const res = await getCampaignDetails(data);
      setSmsDetailedData(res.data)

      // setColumns([
      //   { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
      //   {
      //     field: "mobile_no",
      //     headerName: "Mobile No.",
      //     flex: 1,
      //     minWidth: 120,
      //   },
      //   { field: "que_time", headerName: "Sent Time", flex: 1, minWidth: 120 },
      //   { field: "message", headerName: "Message", flex: 1, minWidth: 120 },
      //   { field: "status", headerName: "Status", flex: 1, minWidth: 90 },
      //   {
      //     field: "actual_status",
      //     headerName: "Actual Status",
      //     flex: 1,
      //     minWidth: 70,
      //   },
      //   { field: "smsunit", headerName: "Sms Unit", flex: 1, minWidth: 60 },
      //   { field: "senderid", headerName: "Sender Id", flex: 1, minWidth: 90 },
      //   // {
      //   //   field: "more",
      //   //   headerName: "More",
      //   //   flex: 1,
      //   //   minWidth: 100,
      //   //   renderCell: (params) => (
      //   //     <>
      //   //       <CustomTooltip title="Details" placement="top" arrow>
      //   //         <IconButton
      //   //           className="no-xs"
      //   //           onClick={() => handleInfo(params.row)}
      //   //         >
      //   //           <InfoOutlinedIcon
      //   //             sx={{
      //   //               fontSize: "1.2rem",
      //   //               color: "green",
      //   //             }}
      //   //           />
      //   //         </IconButton>
      //   //       </CustomTooltip>
      //   //     </>
      //   //   ),
      //   // },
      // ]);

      // setRows(
      //   Array.isArray(res.data)
      //     ? res.data.map((item, i) => ({
      //       sn: i + 1,
      //       id: i + 1,
      //       ...item,
      //       actual_status: item.actual_status === " " ? "-" : "-",
      //     }))
      //     : []
      // );
    } catch (e) {
      console.log(e);
      toast.error("Error fetching campaign details report");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCampaignDetailsReport();
  }, []);

  return (
    <>
      <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex--wrap">
        <div className="w-full sm:w-56">
          <InputField
            label="Mobile Number"
            id="detailslogmobile"
            name="detailslogmobile"
            type="number"
            placeholder="Enter Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-56">
          <div className="w-max-content">
            <UniversalButton
              label="Search"
              id="detailslogsearch"
              name="detailslogsearch"
              variant="primary"
              icon={<IoSearch />}
              onClick={fetchCampaignDetailsReport}
            />
          </div>
        </div>
      </div>
      {isFetching ? (
        <UniversalSkeleton height="35rem" width="100%" />
      ) : (
        // <DataTable
        //   id={"SmsCampaignDetailLogs"}
        //   name={"SmsCampaignDetailLogs"}
        //   col={columns}
        //   rows={rows}
        // />

        <SmsCampaignDetailedLogsTable
          id={"SmsCampaignDetailLogs"}
          name={"SmsCampaignDetailLogs"}
          data={smsDetailedData}
        />
      )}
    </>
  );
};

export default Smscampaigndetaillogs;
