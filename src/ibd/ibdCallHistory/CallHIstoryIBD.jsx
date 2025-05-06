import React, { useState } from 'react'
import UniversalDatePicker from '../../whatsapp/components/UniversalDatePicker'
import InputField from '../../whatsapp/components/InputField'
import UniversalButton from '../../whatsapp/components/UniversalButton'
import { IoSearch } from 'react-icons/io5'
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown'
import CallHistoryIBDTable from './components/CallHistroyIBDTable'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const CallHistoryIBD = () => {
    const [isFetching, setIsFetching] = useState(false);
    
    const callHistoryCallType = [
        { label: 'All', value: 'all' },
        { label: 'Incoming', value: 'incoming' },
        { label: 'Outgoing', value: 'outgoing' },
        { label: 'Missed', value: 'missed' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Blocked', value: 'blocked' },
    ]

    const callHistoryExecutive = [
        { label: 'All', value: 'all' },
        { label: 'Executive 1', value: 'executive1' },
        { label: 'Executive 2', value: 'executive2' },
        { label: 'Executive 3', value: 'executive3' },
        { label: 'Executive 4', value: 'executive4' },
        { label: 'Executive 5', value: 'executive5' },
    ]
    
    return (
        <div>

            <div className="space-y-2 w-full">
                <div className="grid grid-cols-3 gap-4">
                    {/* Total Calls */}
                    <div className="bg-gray-50 border-l-4 border-blue-500 rounded-lg shadow-sm p-4 w-full">
                        <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                            Total Calls <InfoOutlinedIcon className="!text-gray-400" fontSize="small" />
                        </div>
                        <div className="mt-2 text-xl font-bold text-black">33</div>
                    </div>

                    {/* Received Calls */}
                    <div className="bg-gray-50 border-l-4 border-green-500 rounded-lg shadow-sm p-4 w-full">
                        <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                            Received Calls <InfoOutlinedIcon className="!text-gray-400" fontSize="small" />
                        </div>
                        <div className="mt-2 text-xl font-bold text-black">15</div>
                    </div>

                    {/* Missed Calls */}
                    <div className="bg-gray-50 border-l-4 border-red-500 rounded-lg shadow-sm p-4 w-full">
                        <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                            Missed Calls <InfoOutlinedIcon className="!text-gray-400" fontSize="small" />
                        </div>
                        <div className="mt-2 text-xl font-bold text-black">12</div>
                    </div>
                </div>
                <div className="flex items-end justify-between w-full gap-2 pb-5 align-middle flex--wrap">
                    <div className='flex items-end gap-2'>
                        <div className="w-full sm:w-40">
                            <UniversalDatePicker
                                label="From Date"
                                id="callhistoryfrom"
                                name="callhistoryfrom"
                                placeholder="Select Date"
                            />
                        </div>
                        <div className="w-full sm:w-40">
                            <UniversalDatePicker
                                label="To Date"
                                id="callhistoryto"
                                name="callhistoryto"
                                placeholder="Select Date"
                            />
                        </div>
                        <div className="w-full sm:w-40">
                            <InputField
                                label="Mobile Number From"
                                id="callhistorymobilefrom"
                                name="callhistorymobilefrom"
                                type="number"
                                placeholder="Enter Mobile Number"

                            />
                        </div>
                        <div className="w-full sm:w-40">
                            <InputField
                                label="Mobile Number To"
                                id="callhistorymobileto"
                                name="callhistorymobileto"
                                type="number"
                                placeholder="Enter Mobile Number"

                            />
                        </div>
                        <div className="w-full sm:w-36">
                            <AnimatedDropdown
                                label="Call Type"
                                id="callhistorycalltype"
                                name="callhistorycalltype"
                                placeholder="Select Type"
                                options={callHistoryCallType}
                                onChange={(e) => console.log(e)}

                            />
                        </div>
                        <div className="w-full sm:w-40">
                            <AnimatedDropdown
                                label="Executive"
                                id="callhistoryexecutive"
                                name="callhistoryexecutive"
                                placeholder="Select Executive"
                                options={callHistoryExecutive}
                                onChange={(e) => console.log(e)}

                            />
                        </div>
                        <div className="w-max-content">
                            <UniversalButton
                                label="Search"
                                id="blockmobileearch"
                                name="blockmobileearch"
                                variant="primary"
                                icon={<IoSearch />}
                            // onClick={handleCampaignSearch}
                            />
                        </div>
                    </div>
                    {/* <div className='flex gap-2'>
                <div className="w-max-content">
                  <UniversalButton
                    label="Import"
                    id="blockmobileimport"
                    name="blockmobileimport"
                    variant="primary"
                    onClick={() => setBlockmobileImportnumber(true)}
                  />
                </div>
              </div> */}
                </div>
            </div>
            {isFetching ? (
                <div className="">
                    <UniversalSkeleton height="35rem" width="100%" />
                </div>
            ) : (
                <div className="w-full">
                    <CallHistoryIBDTable
                        id="callhistoryibdtable"
                        name="callhistoryibdtable"
                    // isFetching={isFetching}
                    />
                </div>
            )}
        </div>
    )
}

export default CallHistoryIBD