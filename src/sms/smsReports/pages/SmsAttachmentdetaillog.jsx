import React, { useEffect, useState } from "react";
import InputField from "../../../whatsapp/components/InputField";
import { IoSearch } from "react-icons/io5";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import { DataTable } from "../../../components/layout/DataTable";
import toast from "react-hot-toast";
import { fetchDetailsAttachment } from "../../../apis/sms/sms";
import { useLocation, useNavigate } from "react-router-dom";
import UniversalSkeleton from "../../../whatsapp/components/UniversalSkeleton";

const SmsAttachmentdetaillog = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [mobileNo, setMobileNo] = useState("");

  const navigate = useNavigate();
  let { state } = useLocation();

  //   if (!state.id) {
  //     navigate("/");
  //   }
  const handleFetchAttachmentDetails = async () => {
    try {
      setIsFetching(true);
      const res = await fetchDetailsAttachment(state.id, mobileNo);

      setColumns([
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
        {
          field: "insert_time",
          headerName: "Date",
          flex: 1,
          minWidth: 50,
          renderCell: (params) =>
            moment(params.row.insert_time).format("DD-MM-YYYY HH:mm"),
        },
        { field: "mobile_no", headerName: "Mobile No.", flex: 1, minWidth: 80 },
        {
          field: "attachment_type",
          headerName: "Attachment Type",
          flex: 1,
          minWidth: 100,
        },
        {
          field: "click_time",
          headerName: "Click Time",
          flex: 1,
          minWidth: 150,
          renderCell: (params) =>
            moment(params.row.click_time).format("DD-MM-YYYY HH:mm"),
        },
        { field: "info", headerName: "Info", flex: 1, minWidth: 410 },
      ]);
      setRows(
        Array.isArray(res)
          ? res.map((item, index) => ({
              sn: index + 1,
              id: index + 1,
              ...item,
            }))
          : []
      );
    } catch (e) {
      // console.log(e);
      toast.error("Error fetching attachment details");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    handleFetchAttachmentDetails();
  }, []);

  return (
    <div>
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
              onClick={handleFetchAttachmentDetails}
            />
          </div>
        </div>
      </div>

      {isFetching ? (
        <UniversalSkeleton height="35rem" width="100%" />
      ) : (
        <DataTable
          col={columns}
          rows={rows}
          id="detailslogtable"
          name="detailslogtable"
        />
      )}
    </div>
  );
};

export default SmsAttachmentdetaillog;
