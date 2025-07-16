import React, { useEffect, useState } from "react";
import InputField from "../../whatsapp/components/InputField";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import { IoSearch } from "react-icons/io5";
import { Dialog } from "primereact/dialog";
import CustomTooltip from "../../whatsapp/components/CustomTooltip";
import { Switch } from "@mui/material";
import ManagePlanTable from "./components/ManagePlanTable";
import { createPlan, getAllPlans } from "@/apis/admin/admin";
import UniversalSkeleton from "../components/UniversalSkeleton";
import toast from "react-hot-toast";

const ManagePlan = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [planName, setPlanName] = useState("");
  const [planTypeOption, setPlanTypeOption] = useState(null);
  const [statusOption, setStatusOption] = useState(null);
  const [manageCreatePlancreate, setManageCreatePlancreate] = useState(false);
  const [plantypeoptioncreate, setPlantypeoptioncreate] = useState(null);
  const [isCheckedcreate, setIsCheckedsetIsChecked] = useState(true);
  const [searchData, setSearchData] = useState({
    planname: "",
    ptype: "",
    status: "",
  });
  const [data, setData] = useState([]);

  const [createData, setCreateData] = useState({
    planName: "",
    planType: "",
    characterLimit: "",
    orderQueueSize: "",
    initialQueueSize: "",
    triggerQueueSize: "",
    isPlanTimeout: "",
    fromTime: "",
    toTime: "",
  });

  const plancreateOptions = [
    { label: "Transactional", value: "1" },
    { label: "Promotional", value: "2" },
    { label: "International", value: "3" },
  ];

  const planOptions = [
    { label: "Transactional", value: "1" },
    { label: "Promotional", value: "2" },
    { label: "International", value: "3" },
  ];
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const handleTogglecreate = (e) => {
    setIsCheckedsetIsChecked((prev) => !prev);
    setCreateData((prev) => ({
      ...prev,
      isPlanTimeout: e.target.checked ? "1" : "0",
    }));
  };

  const handleCreatePlan = () => {
    setManageCreatePlancreate(true);
  };

  async function handleFetchAllPlans() {
    try {
      const payload = {
        ...searchData,
        ptype: searchData.ptype ? searchData.ptype : -1,
        status: searchData.status ? searchData.status : -1,
      };
      setIsFetching(true);
      const res = await getAllPlans(payload);
      setData(res);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    handleFetchAllPlans();
  }, []);

  async function handleCreatePlanSave() {
    try {
      // let isError = false;
      // Object.keys(createData).forEach((key) => {
      //   // if (createData[key] === "") {
      //   //   delete createData[key];
      //   // }
      //   if (!createData[key] || createData[key] === "") {
      //     isError = true;``
      //     return toast.error(`Please fill the ${key} field`);
      //   }
      // });
      // if (isError) {
      //   return;
      // }

      for (const key in createData) {
        if (createData[key] === "" || createData[key] === null) {
          return toast.error(`Please fill the ${key} field`);
        }
      }
      const res = await createPlan(createData);
      console.log("Plan created successfully:", res);
      if (!res?.status) {
        return toast.error(res?.msg || "Plan creation failed");
      }
      toast.success("Plan created successfully");
      setCreateData({});
      setManageCreatePlancreate(false);
    } catch (e) {
      console.error("Error saving plan:", e);
    }
  }

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
            <div className="w-48">
              <InputField
                label="Plan Name"
                id="planName"
                name="planName"
                placeholder="Enter Plan Name"
                value={searchData.planname}
                onChange={(e) =>
                  setSearchData({ ...searchData, planname: e.target.value })
                }
              />
            </div>

            <div className="w-48">
              <AnimatedDropdown
                label="Plan Type"
                options={planOptions}
                id="plantype"
                name="plantype"
                value={searchData.ptype}
                onChange={(e) => setSearchData({ ...searchData, ptype: e })}
                placeholder="Select Plan Type"
              />
            </div>
            <div className="w-48">
              <AnimatedDropdown
                label="Status"
                options={statusOptions}
                id="planstatus"
                name="planstatus"
                value={searchData.status}
                onChange={(e) => setSearchData({ ...searchData, status: e })}
                placeholder="Select Status"
              />
            </div>

            {/* Search Button */}
            <div className="w-max-content">
              <UniversalButton
                id="dlttemplatesearch"
                name="dlttemplatesearch"
                label={isFetching ? "Searching..." : "Search"}
                icon={<IoSearch />}
                disabled={isFetching}
                onClick={handleFetchAllPlans}
              />
            </div>
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Create Plan"
              id="createplanbtn"
              name="createplanbtn"
              onClick={() => handleCreatePlan()}
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
            <ManagePlanTable
              id="managePlanTable"
              name="managePlanTable"
              data={data}
              handleFetchAllPlans={handleFetchAllPlans}
            />
          </div>
        )}

        <Dialog
          header="Create Plan"
          visible={manageCreatePlancreate}
          onHide={() => setManageCreatePlancreate(false)}
          className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
          draggable={false}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Plan Name"
                id="createplannamecreate"
                name="createplannamecreate"
                placeholder="Enter Plan Name"
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    planName: e.target.value,
                  })
                }
                value={createData.planName}
              />
              <AnimatedDropdown
                label="Plan Type"
                options={plancreateOptions}
                id="createplantypecreate"
                name="createplantypecreate"
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    planType: e,
                  })
                }
                value={createData.planType}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Order Queue Size"
                id="createplanorderqueuesizecreate"
                name="createplanorderqueuesizecreate"
                placeholder="Enter Order Queue Size"
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    orderQueueSize: e.target.value,
                  })
                }
                value={createData.orderQueueSize}
              />
              <InputField
                label="Initial Queue Size"
                id="createplaninitialqueuesizecreate"
                name="createplaninitialqueuesizecreate"
                placeholder="Enter Initial Queue Size"
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    initialQueueSize: e.target.value,
                  })
                }
                value={createData.initialQueueSize}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Trigger Queue Size"
                id="createplantriggerqueuesizecreate"
                name="createplantriggerqueuesizecreate"
                placeholder="Enter Trigger Queue Size"
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    triggerQueueSize: e.target.value,
                  })
                }
                value={createData.triggerQueueSize}
              />
              <InputField
                label="Character Limit"
                id="createplancharlimitcreate"
                name="createplancharlimitcreate"
                placeholder="Enter Character Limit"
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    characterLimit: e.target.value,
                  })
                }
                value={createData.characterLimit}
              />
            </div>
            <div className="flex items-center">
              <p>Allow Plan Time Bound Feature</p>
              <div>
                <CustomTooltip arrow placement="top" title="Allow/ Disallow">
                  <Switch
                    checked={isCheckedcreate}
                    onChange={(e) => {
                      handleTogglecreate(e);
                    }}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#34C759",
                      },
                      "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                        {
                          backgroundColor: "#34C759",
                        },
                    }}
                  />
                </CustomTooltip>
              </div>
            </div>

            {createData.isPlanTimeout === "1" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="From Time"
                    id="createplanfromtimecreate"
                    name="createplanfromtimecreate"
                    placeholder="Enter From Time"
                    onChange={(e) =>
                      setCreateData({
                        ...createData,
                        fromTime: e.target.value,
                      })
                    }
                    value={createData.fromTime}
                  />
                  <InputField
                    label="To Time"
                    id="createplantotimecreate"
                    name="createplantotimecreate"
                    placeholder="Enter To Time"
                    onChange={(e) =>
                      setCreateData({
                        ...createData,
                        toTime: e.target.value,
                      })
                    }
                    value={createData.toTime}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <UniversalButton
                    label="Save"
                    id="createplansavecreatebtn"
                    name="createplansavecreatebtn"
                    onClick={handleCreatePlanSave}
                  />
                </div>
              </>
            )}
          </div>
        </Dialog>
      </div>

      {/* )} */}
    </div>
  );
};

export default ManagePlan;
