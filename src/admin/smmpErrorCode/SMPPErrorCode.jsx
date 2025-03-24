import React, { useState } from "react";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import DropdownWithSearch from "../../whatsapp/components/DropdownWithSearch";
import SMPPErrorCodeTable from "./components/SMPPErrorCodeTable";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";

const SMPPErrorCode = () => {
  const [isFetching, setIsFetching] = useState(false);

  const serviceOptions = [
    { label: "Service 1", value: "service1" },
    { label: "Service 2", value: "service2" },
    { label: "Service 3", value: "service3" },
    { label: "Service 4", value: "service4" },
  ];

  const errorCodeOptions = [
    { label: "Error Code 1", value: "errorcode1" },
    { label: "Error Code 2", value: "errorcode2" },
    { label: "Error Code 3", value: "errorcode3" },
    { label: "Error Code 4", value: "errorcode4" },
  ];
  return (
    <div className="w-full">
      {/* {isLoading ? (
    <>
      <Loader />
    </>
  ) : ( */}
      <div>
        <div className="flex flex-wrap gap-2 items-end justify-between pb-3 w-full">
          <div className="flex flex-wrap gap-2 items-end">
            <div className="w-max-content">
              <DropdownWithSearch
                label="Service"
                options={serviceOptions}
                placeholder="Select Service"
                id="smpperrorservice"
                name="smpperrorservice"
                // onChange={handleerrorCodeServiceChange}
              />
            </div>
            <div className="w-max-content">
              <DropdownWithSearch
                label="Error Code"
                options={errorCodeOptions}
                placeholder="Select Error Code"
                id="smpperrorcode"
                name="smpperrorcode"
                // onChange={handleErrorCodeChange}
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
                label="Search"
                id="searcherrorcode"
                name="searcherrorcode"
                // onClick={handleSearchErrorCode}
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
                label="Delete"
                id="deleteerrorcode"
                name="deleteerrorcode"
                // onClick={handleDeleteErrorCode}
              />
            </div>
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Add Error Code"
              id="adderrorcode"
              name="adderrorcode"
              // onClick={handleAddErrorCode}
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
            <SMPPErrorCodeTable
              id="SMPPErrorCodeTable"
              name="SMPPErrorCodeTable"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SMPPErrorCode;
