import AnimatedDropdown from "@/admin/components/AnimatedDropdown";

import { getDrAnalysisReport, getSMPP } from "@/apis/admin/admin";
import UniversalButton from "@/components/common/UniversalButton";
import { DataTable } from "@/components/layout/DataTable";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DrAnalysis = () => {
  const [smpp, setSmpp] = useState([]);
  const [serviceId, setServiceId] = useState("");

  const [data, setData] = useState([]);

  async function handleFetchSmppDetails() {
    try {
      const res = await getSMPP();

      setSmpp(res);
    } catch (e) {
      console.log(e);
      toast.error("Error in fetching smpp details");
    }
  }
  useEffect(() => {
    handleFetchSmppDetails();
  }, []);

  async function handleSearch() {
    try {
      if (!serviceId) {
        return toast.error("Please select a service");
      }
      const res = await getDrAnalysisReport(serviceId);
      console.log("res", res);

      const formattedData = Array.isArray(res?.data)
        ? res?.data?.map((item, index) => ({
            ...item,
            id: index + 1,
            sn: index + 1,
          }))
        : [];
      setData(formattedData);
    } catch (e) {
      toast.error("Error in fetching smpp details");
    }
  }

  const col = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "serviceName",
      headerName: "Service Name",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "blocked",
      headerName: "Blocked Count",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "notAvailable",
      headerName: "Not Available Count",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "delivered",
      headerName: "Delivered Count",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "notDelivered",
      headerName: "Not Delivered Count",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "total",
      headerName: "Total Count",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "totalUnit",
      headerName: "Total Units",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "rejected",
      headerName: "Rejected Count",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "other",
      headerName: "Other",
      flex: 1,
      minWidth: 130,
    },
  ];
  return (
    <>
      <h1 className="text-2xl font-semibold mb-2">DR Analysis</h1>
      <div className="flex gap-2 w-full">
        <div className="w-[350px]">
          <DropdownWithSearch
            id="selectService"
            name="selectService"
            label="Select Service"
            tooltipContent="Select your service"
            tooltipPlacement="right"
            options={smpp?.map((waba) => ({
              value: waba.serviceId,
              label: waba.serviceName,
            }))}
            value={serviceId}
            onChange={(e) => {
              setServiceId(e);
            }}
            //   onSearch={handleSearch}
          />
        </div>

        <div className="w-max-content flex items-end">
          <UniversalButton
            label="Search"
            id="search"
            name="search"
            onClick={handleSearch}
          />
        </div>
      </div>

      <div className="mt-4">
        <DataTable
          id="drAnalysisTable"
          name="drAnalysisTable"
          col={col}
          rows={data}
        />
      </div>
    </>
  );
};

export default DrAnalysis;
