import React, { useState } from "react";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import ManageSMPPTable from "./components/ManageSMPPTable";
import { useNavigate } from "react-router-dom";

const ManageSMPP = () => {
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const handleAddService = () => {
    navigate("/addservice");
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
              label="Add Service"
              id="addsearvice"
              name="addsearvice"
              onClick={handleAddService}
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
            <ManageSMPPTable id="manageSMPPTable" name="manageSMPPTable" />
          </div>
        )}
      </div>
      {/* <Dialog
                header="Add Account Create"
                visible={addAccountcreatepop}
                style={{ width: "35rem" }}
                onHide={() => {
                    setAddAccountcreatepop(false);
                }}
                draggable={false}
            >
                
            </Dialog> */}

      {/* )} */}
    </div>
  );
};

export default ManageSMPP;
