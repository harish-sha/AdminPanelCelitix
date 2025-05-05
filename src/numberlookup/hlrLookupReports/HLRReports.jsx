import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import UniversalButton from '../../whatsapp/components/UniversalButton'
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import {
  a11yProps,
  CustomTabPanel,
} from "../../whatsapp/managetemplate/components/CustomTabPanel";
import UniversalDatePicker from '../../whatsapp/components/UniversalDatePicker';
import { IoSearch } from 'react-icons/io5';
import InputField from '../../whatsapp/components/InputField';
import { DataTable } from '../../components/layout/DataTable';
import UniversalSkeleton from '../../whatsapp/components/UniversalSkeleton';

const HLRReports = () => {
    const [value, setValue] = useState(0);
      const [isFetching, setIsFetching] = useState(false);
       const [rows, setRows] = useState([]);
        const [columns, setColumns] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setColumns([]);
        setRows([]);
      };
    
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <div className="flex items-end justify-between pr-2">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="HLR Tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label={
                <span>
                  <GradingOutlinedIcon size={20} /> HLR Lookup Report
                </span>
              }
              {...a11yProps(0)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
            <Tab
              label={
                <span>
                  <LibraryBooksOutlinedIcon size={20} /> Day Wise HLR Summary
                </span>
              }
              {...a11yProps(1)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
          </Tabs>

          <UniversalButton
            label="Export"
            id="hlrreportexport"
            name="hlrreportexport"
            // onClick={handleExports}
          />
        </div>
        <CustomTabPanel value={value} index={0}>
          <div className="w-full">
            <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex--wrap">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                    label="From Date"
                    id="hlrreportfromDate"
                    name="hlrreportfromDate"
                    placeholder="Select From Date"
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                    label="To Date"
                    id="hlrreporttodate"
                    name="hlrreporttodate"
                    placeholder="Select To Date"
                />
              </div>
              <div className="w-full sm:w-56">
                <InputField
                  label="Mobile Number"
                    id="hlrreportnumber"
                    name="hlrreportnumber"
                    placeholder="Enter Mobile Number"
                />
              </div>
              <div className="w-full sm:w-56">
                <div className="w-max-content">
                  <UniversalButton
                    label="Search"
                    id="hlrreportsearch"
                    name="hlrreportsearch"
                    variant="primary"
                    icon={<IoSearch />}
                    // onClick={handleCampaignSearch}
                  />
                </div>
              </div>
            </div>
          </div>
          {isFetching ? (
            <div className="">
              <UniversalSkeleton height="35rem" width="100%" />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                id="HLRReportsTable"
                name="HLRReportsTable"
                rows={rows}
                col={columns}
              />
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="w-full">
          <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex--wrap">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                    label="From Date"
                    id="daywisefromDate"
                    name="daywisefromDate"
                    placeholder="Select From Date"
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                    label="To Date"
                    id="daywisetodate"
                    name="daywisetodate"
                    placeholder="Select To Date"
                />
              </div>
              <div className="w-full sm:w-56">
                <InputField
                  label="Mobile Number"
                    id="daywisenumber"
                    name="daywisenumber"
                    placeholder="Enter Mobile Number"
                />
              </div>
              <div className="w-full sm:w-56">
                <div className="w-max-content">
                  <UniversalButton
                    label="Search"
                    id="daywisesearch"
                    name="daywisesearch"
                    variant="primary"
                    icon={<IoSearch />}
                    // onClick={handleCampaignSearch}
                  />
                </div>
              </div>
            </div>
          </div>
          {isFetching ? (
            <div className="">
              <UniversalSkeleton height="35rem" width="100%" />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                id="PreviousDaysTableSms"
                name="PreviousDaysTableSms"
                rows={rows}
                col={columns}
              />
            </div>
          )}
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default HLRReports
