import React, { useState } from 'react'
import UniversalButton from '../../whatsapp/components/UniversalButton'
import DropdownWithSearch from '../../whatsapp/components/DropdownWithSearch';
import SMPPErrorCodeTable from './components/SMPPErrorCodeTable';
import UniversalSkeleton from '../../whatsapp/components/UniversalSkeleton';
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown';
import InputField from '../../whatsapp/components/InputField';
import UniversalTextArea from '../../whatsapp/components/UniversalTextArea';
import { Dialog } from 'primereact/dialog';

const SMPPErrorCode = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [smpperrorcodeadd, setSMPPErrorCodeAdd] = useState(false);

  const handleSMPPErrorAdd = () => {
    setSMPPErrorCodeAdd(true);
  };

  const serviceOptionsadd = [
    { value: 'Service1', label: 'Service1' },
    { value: 'Service2', label: 'Service2' },
    { value: 'Service3', label: 'Service3' },
  ];
  const handleServiceAdd = (service) => {
    // console.log(service);
  };
  const displaytypeOptions = [
    { value: 'Display1', label: 'Display1' },
    { value: 'Display2', label: 'Display2' },
    { value: 'Display3', label: 'Display3' },
  ];
  const handleDisplaytyperAdd = (display) => {
    // console.log(display);
  };
  const displayreasonOptions = [
    { value: 'Vendor1', label: 'Vendor1' },
    { value: 'Vendor2', label: 'Vendor2' },
    { value: 'Vendor3', label: 'Vendor3' },
  ];
  const handleDisplayreasonAdd = (reason) => {
    // console.log(reason);
  };


  const serviceOptions = [
    { label: 'Service 1', value: 'service1' },
    { label: 'Service 2', value: 'service2' },
    { label: 'Service 3', value: 'service3' },
    { label: 'Service 4', value: 'service4' },
  ];

  const errorCodeOptions = [
    { label: 'Error Code 1', value: 'errorcode1' },
    { label: 'Error Code 2', value: 'errorcode2' },
    { label: 'Error Code 3', value: 'errorcode3' },
    { label: 'Error Code 4', value: 'errorcode4' },
  ];
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
              onClick={handleSMPPErrorAdd}
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

        <Dialog
          header="Vendor Error Code Mapping"
          visible={smpperrorcodeadd}
          onHide={() => setSMPPErrorCodeAdd(false)}
          className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
          draggable={false}
        >
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <AnimatedDropdown
                label="Service"
                options={serviceOptionsadd}
                id="serviceadd"
                name="serviceadd"
                onChange={handleServiceAdd}
              />
              <InputField
                label="Vendor Error Code"
                id="vendorerrorcodeadd"
                name="vendorerrorcodeadd"
                placeholder='Enter Vendor Error Code'
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                label="Vendor Error Status"
                id="vendorerrorstatusadd"
                name="vendorerrorstatusadd"
                placeholder="Vendor Error Status"
              />
              <UniversalTextArea
                label="Vendor Error Code Description"
                id="vendorerrorcodedescriptionadd"
                name="vendorerrorcodedescriptionadd"
                placeholder="Vendor Error Code Description"

              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <AnimatedDropdown
                label="Display Type"
                options={displaytypeOptions}
                id="displaytypeadd"
                name="displaytypeadd"
                onChange={handleDisplaytyperAdd}
              />
              <AnimatedDropdown
                label="Display Reason"
                options={displayreasonOptions}
                id="displayreasonadd"
                name="displayreasonadd"
                onChange={handleDisplayreasonAdd}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                label="Display Error Code"
                id="displayerrorcodeadd"
                name="displayerrorcodeadd"
                placeholder="Display Error Code"
                readOnly="true"
              />
            </div>
            <div className="">
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="refundOnDelivery" className="form-checkbox" />
                <span className='text-sm'>Refund For On Delivery Account</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="dndRefund" className="form-checkbox" />
                <span className='text-sm'>DND Refund</span>
              </label>
            </div>

            <div className='flex justify-center'>
              <UniversalButton
                label="Save"
                id="saveadd"
                name="saveadd"
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  )
}

export default SMPPErrorCode