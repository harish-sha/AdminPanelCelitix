import React, { useState } from "react";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import ManageRoutingTable from "./components/ManageRoutingTable";
import { useNavigate } from "react-router-dom";

const ManageRouting = () => {
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const handleAddRouting = () => {
    navigate("/addrouting");
  };
  const handleEditRouting = () => {
    navigate("/editrouting");
  };
  return (
    <div className="w-full">
      {/* {isLoading ? (
    <>
      <Loader />
    </>
  ) : ( */}
      <div>
        <div className="flex flex-wrap gap-2 items-end justify-end pb-3 w-full">
          <div className="w-max-content">
            <UniversalButton
              label="Add Routing"
              id="addrouting"
              name="addrouting"
              onClick={handleAddRouting}
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
            <ManageRoutingTable
              id="manageRoutingTable"
              name="manageRoutingTable"
              isFetching={isFetching}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRouting;
