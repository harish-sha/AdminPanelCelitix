import React, { useState } from 'react'
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown'
import InputField from '../../whatsapp/components/InputField'
import UniversalButton from '../../whatsapp/components/UniversalButton'
import UniversalDatePicker from '../../whatsapp/components/UniversalDatePicker'
import { DataTable } from '../../components/layout/DataTable'

const AppReport = () => {
     const [isFetching, setIsFetching] = useState(false);
         const [rows, setRows] = useState([]);
           const [columns, setColumns] = useState([]);
    const SourceOptions = [
        { label: '56161', value: '56161' },
        { label: '56161', value: '56161' },
        { label: '56161', value: '56161' },
      ]
      const StatusOptions = [
        { label: 'Delivered', value: 'Delivered' },
        { label: 'Failed', value: 'Failed' },
        { label: 'Pending', value: 'Pending' },
      ]
    return (
        <div>
            <div className="flex flex-wrap items-end w-full gap-2 mb-2">
                <div className="w-full sm:w-40">
                    <UniversalDatePicker 
                        label="From Date"
                        id="fromDate"
                        name="fromDate"
                        placeholder='Select From Date'
                        tooltipContent="Select From Date"
                    />
                </div>
                <div className="w-full sm:w-40">
                    <UniversalDatePicker 
                        label="To Date"
                        id="toDate"
                        name="toDate"
                        placeholder='Select To Date'
                    />
                </div>
                <div className="w-full sm:w-40">
                    <InputField
                        label="Mobile Number"
                        id="mobileNumber"
                        name="mobileNumber"
                        placeholder="Enter Mobile Number"
                    />
                </div>
                <div className="w-full sm:w-40">
                    <AnimatedDropdown
                        label="Source"
                        id="source"
                        name="source"
                        options={SourceOptions}
                        onChange={(e) => console.log(e)}
                        placeholder='Select Source'
                    />
                </div>
                <div className="w-full sm:w-40">
                    <AnimatedDropdown
                        label="Status"
                        id="status"
                        name="status"
                        options={StatusOptions}
                        onChange={(e) => console.log(e)}
                        placeholder='Select Status'
                    />
                </div>
               

                {/* Search Button */}
                <div className="w-max-content">
                    <UniversalButton
                        label="Show"
                        id="show"
                        name="show"
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
                            id="appreporttable"
                            name="appreporttable"
                           rows={rows}
                           col={columns}
                       />
                      </div>
                    )}
        </div>
    )
}

export default AppReport
