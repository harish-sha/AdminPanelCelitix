import React, { useState } from 'react'
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown';
import UniversalButton from '../../whatsapp/components/UniversalButton';
import InputField from '../../whatsapp/components/InputField';
import { DataTable } from '../../components/layout/DataTable';

const TwowayMangeKeyword = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const SourceOptions = [
    { label: '56161', value: '56161' },
    { label: '56161', value: '56161' },
    { label: '56161', value: '56161' },
  ]
  return (
    <div className="w-full">
      {/* {isLoading ? (
      <>
        <Loader />
      </>
    ) : ( */}
      <div>
        <div className="flex flex-wrap items-end w-full gap-2 mb-2">
          <div className="w-full sm:w-56">
            <AnimatedDropdown
              label="Source"
              id="source"
              name="source"
              options={SourceOptions}
              onChange={(e) => console.log(e)}
              placeholder='Select Source'
            />
          </div>
          <div className="w-full sm:w-56">
            <InputField
              label="Keyword Name"
              id="keyword"
              name="keyword"
              placeholder="Enter Keyword Name"
            />
          </div>

          {/* Search Button */}
          <div className="w-max-content">
            <UniversalButton
              label="Search"
              id="search"
              name="search"
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
            <DataTable
              id="twowaymanagekeywordtable"
              name="twowaymanagekeywordtable"
              rows={rows}
              col={columns}
            />
          </div>
        )}
      </div>
      {/* )} */}
    </div>
  );
}

export default TwowayMangeKeyword