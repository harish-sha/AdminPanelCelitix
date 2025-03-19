import React, { useState } from 'react'
import InputField from '../../whatsapp/components/InputField'
import UniversalButton from '../../whatsapp/components/UniversalButton'
import { IoSearch } from 'react-icons/io5';
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown';
import UniversalSkeleton from '../../whatsapp/components/UniversalSkeleton';
import DlttemplateTable from './components/DlttemplateTable';

const SmsDLTtemplate = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [statusOption, setStatusOption] = useState(null);

    const statusOptions = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];
  return (
    <div className='w-full'>
      {/* {isLoading ? (
        <>
          <Loader />
        </>
      ) : ( */}
        <div>
          
          <div className="flex flex-wrap gap-2 items-end pb-3 w-full">
            {/* Mobile Number Input Field */}
            <div className="w-max-content">
              <InputField
                id="templateid"
                name="templateid"
                type='number'
                label="Template ID"
                placeholder="Enter Template ID"
              />
            </div>
            <div className="w-max-content">
              <InputField
                id="templatename"
                name="templateidname"
                label="Template Name"
                placeholder="Enter Template Name"
              />
            </div>

             <div className="w-36">
              <AnimatedDropdown
              label="Status"
              options={statusOptions}
              id="templatestatus"
              name="templatestatus"
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
            <div className="w-max-content">
              <UniversalButton
              label="Delete"
              id="dlttemplatedelete"
                name="dlttemplatedelete"
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
                id="dlttemplatedownload"
                name="dlttemplatedownload"
                label="Download"
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
              label="Import"
              id="dlttemplateimport"
                name="dlttemplateimport"
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
              <DlttemplateTable
              id="dlttemplatetable"
                name="dlttemplatetable"
              />
            </div>
          )}
        </div>
      {/* )} */}
    </div>
  )
}

export default SmsDLTtemplate
