import React, { useState } from 'react'
import InputField from '../../whatsapp/components/InputField'
import UniversalButton from '../../whatsapp/components/UniversalButton'
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown'
import { IoSearch } from 'react-icons/io5'
import { Dialog } from 'primereact/dialog';
import CustomTooltip from '../../whatsapp/components/CustomTooltip'
import { Switch } from '@mui/material'
import ManagePlanTable from './components/ManagePlanTable'

const ManagePlan = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [planName, setPlanName] = useState('');
  const [planTypeOption, setPlanTypeOption] = useState(null);
  const [statusOption, setStatusOption] = useState(null);
  const [manageCreatePlancreate, setManageCreatePlancreate] = useState(false);
  const [plantypeoptioncreate, setPlantypeoptioncreate] = useState(null);
  const [isCheckedcreate, setIsCheckedsetIsChecked] = useState(true);

  const plancreateOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ]

  const planOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const handleTogglecreate = () => {
    setIsCheckedsetIsChecked((prev) => !prev);
  };

  const handleCreatePlan = () => {
    setManageCreatePlancreate(true);
  };

  return (
    <div className='w-full'>
      {/* {isLoading ? (
      <>
        <Loader />
      </>
    ) : ( */}
      <div>

        <div className="flex flex-wrap gap-2 items-end justify-between pb-3 w-full">
          <div className='flex flex-wrap gap-2 items-end'>
            <div className="w-48">
              <InputField
                label="Plan Name"
                id="planName"
                name="planName"
                placeholder="Enter Plan Name"
              />
            </div>

            <div className="w-48">
              <AnimatedDropdown
                label="Plan Type"
                options={planOptions}
                id="plantype"
                name="plantype"
                value={planTypeOption}
                onChange={(newValue) => setPlanTypeOption(newValue)}
                placeholder='Select Plan Type'
              />
            </div>
            <div className="w-48">
              <AnimatedDropdown
                label="Status"
                options={statusOptions}
                id="planstatus"
                name="planstatus"
                value={statusOption}
                onChange={(newValue) => setStatusOption(newValue)}
                placeholder='Select Status'
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
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                label="Plan Name"
                id="createplannamecreate"
                name="createplannamecreate"
                placeholder="Enter Plan Name"
              />
              <AnimatedDropdown
                label="Plan Type"
                options={plancreateOptions}
                id="createplantypecreate"
                name="createplantypecreate"
                value={plantypeoptioncreate}
                onChange={(newValue) => setPlantypeoptioncreate(newValue)}
              />
            </div>
            <div className='flex items-center'>
              <p>Allow Plan Time Bound Feature</p>
              <div>
                <CustomTooltip
                  arrow
                  placement="top"
                  title="Allow/ Disallow"
                >
                  <Switch
                   checked={isCheckedcreate}
                   onChange={handleTogglecreate}
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
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                label="Order Queue Size"
                id="createplanorderqueuesizecreate"
                name="createplanorderqueuesizecreate"
                placeholder="Enter Order Queue Size"
              />
              <InputField
                label="Initial Queue Size"
                id="createplaninitialqueuesizecreate"
                name="createplaninitialqueuesizecreate"
                placeholder="Enter Initial Queue Size"
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                label="Trigger Queue Size"
                id="createplantriggerqueuesizecreate"
                name="createplantriggerqueuesizecreate"
                placeholder="Enter Trigger Queue Size"
              />
              <InputField
                label="Character Limit"
                id="createplancharlimitcreate"
                name="createplancharlimitcreate"
                placeholder="Enter Character Limit"
              />
            </div>
            <div className='flex items-center justify-center'>
              <UniversalButton
                label="Save"
                id="createplansavecreatebtn"
                name="createplansavecreatebtn"
              />
            </div>
          </div>
        </Dialog>
      </div>

      {/* )} */}
    </div>
  )
}

export default ManagePlan
