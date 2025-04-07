import React, { useState } from 'react'
import UniversalDatePicker from '../../whatsapp/components/UniversalDatePicker';
import InputField from '../../whatsapp/components/InputField';
import UniversalButton from '../../whatsapp/components/UniversalButton';
import { IoSearch } from 'react-icons/io5';
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown';
import TwowayReportsTable from './components/TwowayReportsTable';

const TwowayReports = () => {
  const [isFetching, setIsFetching] = useState(false);
  const sourceOption = [
    { label: '56161', value: '56161' },
    { label: '56161', value: '56161' },
    { label: '56161', value: '56161' },
  ]
  const keywordOption = [
    { label: 'Keyword1', value: 'Keyword1' },
    { label: 'Keyword2', value: 'Keyword2' },
    { label: 'Keyword3', value: 'Keyword3' },
  ]
  return (
    <div className="w-full">
      {/* {isLoading ? (
      <>
        <Loader />
      </>
    ) : ( */}
      <div>
        <div className="flex flex-wrap items-end w-full gap-2 pb-1">
          {/* From Date Picker */}
          <div className="w-full sm:w-56">
            <UniversalDatePicker
              label="From Date"
              id="twowayreportsfrom"
              name="twowayreportsfrom"
            />
          </div>

          {/* To Date Picker */}
          <div className="w-full sm:w-56">
            <UniversalDatePicker
              id="twowayreportsto"
              name="twowayreportsto"
              label="To Date"
            />
          </div>

          {/* Mobile Number Input Field */}
          <div className="w-max-content">
            <InputField
              label="Mobile Number"
              id="twowayreportsmobile"
              name="twowayreportsmobile"
              type="number"
              placeholder="Enter Mobile Number"
            />
          </div>

          <div className="w-max-content">
            <AnimatedDropdown
              label="Source"
              id="twowayreportssource"
              name="twowayreportssource"
              options={sourceOption}
              placeholder='Select Source'
              onChange={(e) => console.log(e)}
            />
          </div>
          <div className="w-max-content">
            <AnimatedDropdown
              label="Keyword"
              id="twowayreportskeyword"
              name="twowayreportskeyword"
              placeholder="Enter Keyword"
              options={keywordOption}
              onChange={(e) => console.log(e)}
            />
          </div>

          {/* Search Button */}
          <div className="w-max-content">
            <UniversalButton
              label="Show"
              id="twowayreportsshow"
              name="twowayreportsshow"
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
            <TwowayReportsTable
              id="twowayreportstable"
              name="twowayreportstable"
            />
          </div>
        )}
      </div>
      {/* )} */}
    </div>
  );
}

export default TwowayReports