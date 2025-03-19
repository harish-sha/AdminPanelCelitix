import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { a11yProps, CustomTabPanel } from '../../whatsapp/managetemplate/components/CustomTabPanel';
import UniversalDatePicker from '../../whatsapp/components/UniversalDatePicker';
import InputField from '../../whatsapp/components/InputField';
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown';
import UniversalButton from '../../whatsapp/components/UniversalButton';
import { IoSearch } from "react-icons/io5";
import { RadioButton } from 'primereact/radiobutton';
import CampaignTableSms from './components/CampaignTableSms';
import PreviousDaysTableSms from './components/PreviousDaysTableSms';
import DayWiseSummaryTableSms from './components/DayWiseSummaryTableSms';
import AttachmentLogsTbaleSms from './components/AttachmentLogsTbaleSms';
import { Dialog } from 'primereact/dialog';
import DropdownWithSearch from '../../whatsapp/components/DropdownWithSearch';
import UniversalLabel from '../../whatsapp/components/UniversalLabel';
import { Checkbox } from "primereact/checkbox";

const SmsReports = () => {
  const [value, setValue] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [selectcampaign, setSelectCampaign] = useState(null);
  const [selectprevious, setSelectPrevious] = useState(null);
  const [selectsummary, setSelectSummary] = useState(null);
  const [selectattachment, setSelectAttachment] = useState(null);
  const [smsStatus, setSmsStatus] = useState("1");
  const [exports, setExports] = useState(false);
  const [exportStatus, setExportStatus] = useState("disable");
  const [selectexportcampaign, setSelectExportCampaign] = useState(null);
  const [customcolumnStatus, setCustomColumnStatus] = useState("disable");
  const [customcolumnCustom, setCustomColumnCustom] = useState("disable");
  const [campaigncolumns, setCampaignColumns] = useState([]);
  const [campaigncolumnscustom, setCampaignColumnsCustom] = useState([]);
  const [deliverystatus, setDeliveryStatus] = useState([]);
  const [selecttemplatetype, setSelectTemplatetype] = useState(null);
  const [selectstatus, setSelectStatus] = useState(null);

  const templatetypeOptions = [
    { label: 'Transactional', value: 'Transactional' },
    { label: 'Promotional', value: 'Promotional' },
    { label: 'Both', value: 'Both' },
  ]

  const statusOptions = [
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Failed', value: 'Failed' },
    { label: 'Sent', value: 'Sent' },
    { label: 'Undelivered', value: 'Undelivered' },
  ]

  const CampaignColumnsChange = (e) => {
    let _campaigncolumns = [...campaigncolumns];

    if (e.checked)
      _campaigncolumns.push(e.value);
    else
      _campaigncolumns.splice(_campaigncolumns.indexOf(e.value), 1);

    setCampaignColumns(_campaigncolumns);
  }


  const CampaignColumnsCustomChange = (e) => {
    const { value, checked } = e.target;

    setCampaignColumnsCustom((prevColumns) =>
      checked
        ? [...prevColumns, value]
        : prevColumns.filter((col) => col !== value)
    );
  };


  const DeliveryStatusChange = (e) => {
    const { value, checked } = e.target; // Extract the value and checked state

    setDeliveryStatus((prevStatus) =>
      checked
        ? [...prevStatus, value] // Add if checked
        : prevStatus.filter((status) => status !== value) // Remove if unchecked
    );
  };



  const handleExports = () => {
    setExports(true);
  };

  const handleChangeexport = (event) => {
    setExportStatus(event.target.value);
  }

  const handleChangeCustomColumn = (event) => {
    setCustomColumnStatus(event.target.value);
  }
  const handleCustomColumn = (event) => {
    setCustomColumnCustom(event.target.value);
  }

  const exportcampaignOptions = [
    { label: "Campaign 1", value: "Campaign 1" },
    { label: "Campaign 2", value: "Campaign 2" },
    { label: "Campaign 3", value: "Campaign 3" },
  ]

  const campaignoptions = [
    { label: "Transactional", value: "Transactional" },
    { label: "Promotional", value: "Promotional" },
    { label: "International", value: "International" },
  ];
  const previousoptions = [
    { label: "Transactional", value: "Transactional" },
    { label: "Promotional", value: "Promotional" },
    { label: "International", value: "International" },
  ];
  const summaryoptions = [
    { label: "Transactional", value: "Transactional" },
    { label: "Promotional", value: "Promotional" },
    { label: "International", value: "International" },
  ];
  const attachmentoptions = [
    { label: "All", value: "All" },
    { label: "File", value: "File" },
    { label: "Short Url", value: "Short Url" },
    { label: "Whats App Chat", value: "Whats App Chat" },
    { label: "Click To Call", value: "Click To Call " },
  ];

  const handleChangesmsReports = (event) => {
    setSmsStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <div className='flex items-end justify-between pr-2'>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Manage Campaigns Tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab

              label={
                <span>
                  <GradingOutlinedIcon size={20} /> Campaigns Logs
                </span>
              }
              {...a11yProps(0)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            />
            <Tab
              label={
                <span>
                  <LibraryBooksOutlinedIcon size={20} /> Previous Days Logs
                </span>
              }
              {...a11yProps(1)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            />
            <Tab
              label={
                <span>
                  <LibraryBooksOutlinedIcon size={20} /> Day Wise Summary
                </span>
              }
              {...a11yProps(2)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            />
            <Tab
              label={
                <span>
                  <LibraryBooksOutlinedIcon size={20} /> Attachment Logs
                </span>
              }
              {...a11yProps(3)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            />
          </Tabs>

          <UniversalButton
            label="Export"
            id="exportsmsreport"
            name="exportsmsreport"
            onClick={handleExports}
          />
        </div>
        <CustomTabPanel value={value} index={0}>
          <div className='w-full'>
            <div className='flex flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full' >
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="Created On"
                  id="campaigndate"
                  name="campaigndate"
                />
              </div>
              <div className="w-full sm:w-56">
                <InputField
                  label="Campaign Name"
                  id="campaignName"
                  name="campaignName"
                  placeholder="Enter campaign name"
                />
              </div>
              <div className="w-full sm:w-56">
                <InputField
                  label="Mobile Number"
                  id="campaignnumber"
                  name="campaignnumber"
                  placeholder="Enter Campaign Number"
                />
              </div>
              <div className="w-full sm:w-56">
                <AnimatedDropdown
                  label="Campaign Type"
                  id="campaignType"
                  name="campaignType"
                  options={campaignoptions}
                  value={selectcampaign}
                  placeholder="Select Campaign Type"
                  onChange={(value) => setSelectCampaign(value)}
                />
              </div>
              <div className="w-full sm:w-56">
                <div className="w-max-content">
                  <UniversalButton
                    label="Search"
                    id="campaignsearch"
                    name="campaignsearch"
                    variant="primary"
                    icon={<IoSearch />}
                  />
                </div>
              </div>
            </div>
          </div>
          {isFetching ? (
            <div className='' >
              <UniversalSkeleton height='35rem' width='100%' />
            </div>
          ) : (
            <div className='w-full'>
              <CampaignTableSms
                id='CampaignTableSms'
                name='CampaignTableSms'
              />
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className='w-full'>
            <div className='flex flex--wrap gap-2 items-end justify-start align-middle pb-5 w-full' >
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="From Date"
                  id="previousfromDate"
                  name="previousfromDate"
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="To Date"
                  id="previoustodate"
                  name="previoustodate"
                />
              </div>
              <div className="w-full sm:w-56">
                <InputField
                  label="Mobile Number"
                  id="previousnumber"
                  name="previousnumber"
                  placeholder="Enter Mobile Number"
                />
              </div>
              <div className="w-full sm:w-56">
                <AnimatedDropdown
                  label="Type"
                  id="previousType"
                  name="previousType"
                  options={previousoptions}
                  value={selectprevious}
                  placeholder="Select Type"
                  onChange={(value) => setSelectPrevious(value)}
                />
              </div>
              <div className="w-full sm:w-56">
                <InputField
                  label="Sender ID"
                  id="previoussenderid"
                  name="previoussenderid"
                  placeholder="Enter Sender ID"
                />
              </div>
              <div className="w-full sm:w-56">
                <InputField
                  label="Content"
                  id="previouscontent"
                  name="previouscontent"
                  placeholder="Enter Content ID"
                />
              </div>


              <div className="w-full sm:w-56">
                <div className="w-max-content">
                  <UniversalButton
                    label="Show"
                    id="previousshow"
                    name="previousshow"
                    variant="primary"
                  />
                </div>
              </div>
            </div>
          </div>
          {isFetching ? (
            <div className='' >
              <UniversalSkeleton height='35rem' width='100%' />
            </div>
          ) : (
            <div className='w-full'>
              <PreviousDaysTableSms />
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className='w-full'>
            <div className='flex flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full' >
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="From Date"
                  id="summaryfromDate"
                  name="summaryfromDate"
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="To Date"
                  id="summarytodate"
                  name="summarytodate"
                />
              </div>
              <div className="w-full sm:w-108 flex flex-wrap gap-4">
                {/* Option 1 */}
                <div className="flex-1 cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="smsOption1"
                      name="smsredio"
                      value="1"
                      onChange={handleChangesmsReports}
                      checked={smsStatus === "1"}
                    />
                    <label htmlFor="smsOption1" className="text-gray-700 font-medium text-sm cursor-pointer">
                      Day Wise
                    </label>
                  </div>
                </div>

                {/* Option 2 */}
                <div className="flex-1 cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="smsOption2"
                      name="smsredio"
                      value="0"
                      onChange={handleChangesmsReports}
                      checked={smsStatus === "0"}
                    />
                    <label htmlFor="smsOption2" className="text-gray-700 font-medium text-sm cursor-pointer">
                      Sms Type Wise
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-56">
                <AnimatedDropdown
                  label="Type"
                  id="summaryType"
                  name="summaryType"
                  options={summaryoptions}
                  value={selectsummary}
                  placeholder="Select Type"
                  onChange={(value) => setSelectSummary(value)}
                  disabled={smsStatus === "1"}
                />
              </div>
              <div className="w-full sm:w-56">
                <div className="w-max-content">
                  <UniversalButton
                    label="Show"
                    id="summaryshow"
                    name="summaryshow"
                    variant="primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {isFetching ? (
            <div className='' >
              <UniversalSkeleton height='35rem' width='100%' />
            </div>
          ) : (
            <div className='w-full'>
              <DayWiseSummaryTableSms />
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div className='w-full'>
            <div className='flex flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full' >
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="From Date"
                  id="attachmentfromDate"
                  name="attachmentfromDate"
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="To Date"
                  id="attachmenttodate"
                  name="attachmenttodate"
                />
              </div>

              <div className="w-full sm:w-56">
                <AnimatedDropdown
                  label="Type"
                  id="attachmentType"
                  name="attachmentType"
                  options={attachmentoptions}
                  value={selectattachment}
                  placeholder="Select Type"
                  onChange={(value) => setSelectAttachment(value)}
                />
              </div>
              <div className="w-full sm:w-56">
                <div className="w-max-content">
                  <UniversalButton
                    label="Show"
                    id="attachmentshow"
                    name="attachmentshow"
                    variant="primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {isFetching ? (
            <div className='' >
              <UniversalSkeleton height='35rem' width='100%' />
            </div>
          ) : (
            <div className='w-full'>
              <AttachmentLogsTbaleSms />
            </div>
          )}
        </CustomTabPanel>
      </Box>


      <Dialog
        header="Export"
        visible={exports}
        onHide={() => setExports(false)}
        className="w-[40rem]"
        draggable={false}
      >
        <div className='space-y-4'>
          <div className="lg:w-100 md:w-100 flex flex-wrap gap-2 mb-2">
            {/* Option 1 */}
            <div className="flex-1 cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-3 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-2" >
                <RadioButton inputId="Option1" name="redio" value="enable" onChange={handleChangeexport} checked={exportStatus === 'enable'} />
                <label htmlFor="Option1" className="text-gray-700 font-medium text-sm cursor-pointer">Campaign-wise</label>
              </div>
            </div>
            {/* Option 2 */}
            <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-2" >
                <RadioButton inputId="Option2" name="redio" value="disable" onChange={handleChangeexport} checked={exportStatus === 'disable'} />
                <label htmlFor="Option2" className="text-gray-700 font-medium text-sm cursor-pointer">Custom</label>
              </div>
            </div>
          </div>
          {exportStatus === "enable" && (
            <div className='space-y-4'>
              <div>
                <DropdownWithSearch
                  label="Campaign"
                  id="exportdropdownCampaign"
                  name="exportdropdownCampaign"
                  options={exportcampaignOptions}
                  value={selectexportcampaign}
                  placeholder="Select Campaign"
                  onChange={(value) => setSelectExportCampaign(value)}
                />
              </div>
              <div className="lg:w-100 md:w-100 flex flex-wrap gap-4">
                <div className="flex justify-center items-center" >
                  <UniversalLabel
                    text="Custom Columns"
                    id='customcolumn'
                    name="customcolumn"
                    className='text-gray-700 font-medium text-sm'
                  />
                </div>
                {/* Option 1 */}
                <div className="flex items-center gap-2" >
                  <RadioButton inputId="customcolumnOption1" name="customcolumnredio" value="enable" onChange={handleChangeCustomColumn} checked={customcolumnStatus === 'enable'} />
                  <label htmlFor="customcolumnOption1" className="text-gray-700 font-medium text-sm cursor-pointer">Enable</label>
                </div>
                {/* Option 2 */}
                <div className="flex items-center gap-2" >
                  <RadioButton inputId="editstatusOption2" name="customcolumnredio" value="disable" onChange={handleChangeCustomColumn} checked={customcolumnStatus === 'disable'} />
                  <label htmlFor="customcolumnOption2" className="text-gray-700 font-medium text-sm cursor-pointer">Disable</label>
                </div>
              </div>
              {customcolumnStatus === "enable" && (
                <div className='space-y-4'>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "campaigncolumns1", name: "mobileno", value: "Mobile No." },
                      { id: "campaigncolumns2", name: "totalunit", value: "Total Unit" },
                      { id: "campaigncolumns3", name: "message", value: "Message" },
                      { id: "campaigncolumns4", name: "Senderid", value: "Sender id" },
                      { id: "campaigncolumns5", name: "queuetime", value: "Queue Time" },
                      { id: "campaigncolumns6", name: "status", value: "Status" },
                      { id: "campaigncolumns7", name: "senttime", value: "Sent Time" },
                      { id: "campaigncolumns8", name: "deliverytime", value: "Delivery Time" },
                      { id: "campaigncolumns9", name: "deliverystatus", value: "Delivery Status" },
                      { id: "campaigncolumns10", name: "errorcode", value: "ErrorCode" },
                      { id: "campaigncolumns11", name: "reason", value: "Reason" },
                      { id: "campaigncolumns12", name: "clientid", value: "Client id" },
                      { id: "campaigncolumns13", name: "isunicode", value: "Is Unicode" },
                      { id: "campaigncolumns14", name: "entityid", value: "Entity id" },
                      { id: "campaigncolumns15", name: "templateid", value: "Template id" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox id={item.id} name={item.name} value={item.value} onChange={CampaignColumnsChange} checked={campaigncolumns.includes(item.value)} />
                        <label htmlFor={item.id} className="text-sm">{item.value}</label>
                      </div>
                    ))}
                  </div>
                  <div className='flex justify-center'>
                    <UniversalButton
                      label="Submit"
                      id="campaigncolumnssubmitbtn"
                      name="campaigncolumnssubmitbtn"
                      variant="primary"
                    />
                  </div>

                </div>
              )}
            </div>
          )}

          {exportStatus === "disable" && (
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-1'>
                <div>
                  <UniversalDatePicker
                    label="From Date"
                    id="customfromdatepicker"
                    name="customfromdatepicker"
                  />
                </div>
                <div>
                  <UniversalDatePicker
                    label="To Date"
                    id="customtodatepicker"
                    name="customtodatepicker"
                  />
                </div>
                <div>
                  <AnimatedDropdown
                    label="Templats Type"
                    id="customtemplatetype"
                    name="customtemplatetype"
                    options={templatetypeOptions}
                    value={selecttemplatetype}
                    placeholder="Select Template Type"
                    onChange={(value) => setSelectTemplatetype(value)}
                  />
                </div>
                <div>
                  <AnimatedDropdown
                    label="Status"
                    id="customstatus"
                    name="customstatus"
                    options={statusOptions}
                    value={selectstatus}
                    placeholder="Select Template Type"
                    onChange={(value) => setSelectStatus(value)}
                  />
                </div>
              </div>
              <div className='space-y-2'>

                <UniversalLabel
                  text="Delivery Status"
                  id="customsdeliverystatus"
                  name="customsdeliverystatus"
                />

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "deliverystatus1", name: "delivered", value: "Delivered" },
                    { id: "deliverystatus2", name: "undelivered", value: "Undelivered" },
                    { id: "deliverystatus3", name: "pendingdr", value: "Pending DR" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        name={item.name}
                        value={item.value}
                        onChange={DeliveryStatusChange}
                        checked={deliverystatus.includes(item.value)}
                      />
                      <label htmlFor={item.id} className="text-sm">{item.value}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <InputField
                  label="Mobile Number"
                  id="custommobile"
                  name="custommobile"
                  type='number'
                  placeholder='Enter Mobile Number'
                />
                <div className="flex flex-col">
                  <div className="" >
                    <UniversalLabel
                      text="Custom Columns"
                      id='customcolumncustom'
                      name="customcolumncustom"
                      className='text-gray-700 font-medium text-sm'
                    />
                  </div>
                  <div className='flex gap-4 mt-3'>
                    {/* Option 1 */}
                    <div className="flex items-center gap-2" >
                      <RadioButton inputId="customcolumncustomOption1" name="customcolumncustomredio" value="enable" onChange={handleCustomColumn} checked={customcolumnCustom === 'enable'} />
                      <label htmlFor="customcolumncustomOption1" className="text-gray-700 font-medium text-sm cursor-pointer">Enable</label>
                    </div>
                    {/* Option 2 */}
                    <div className="flex items-center gap-2" >
                      <RadioButton inputId="editstatusOption2" name="customcolumncustomredio" value="disable" onChange={handleCustomColumn} checked={customcolumnCustom === 'disable'} />
                      <label htmlFor="customcolumncustomOption2" className="text-gray-700 font-medium text-sm cursor-pointer">Disable</label>
                    </div>
                  </div>
                </div>
              </div>
              {customcolumnCustom === "enable" && (
                <div className='space-y-4'>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "campaigncolumnscustom1", name: "mobileno", value: "Mobile No." },
                      { id: "campaigncolumnscustom2", name: "totalunit", value: "Total Unit" },
                      { id: "campaigncolumnscustom3", name: "message", value: "Message" },
                      { id: "campaigncolumnscustom4", name: "Senderid", value: "Sender id" },
                      { id: "campaigncolumnscustom5", name: "queuetime", value: "Queue Time" },
                      { id: "campaigncolumnscustom6", name: "status", value: "Status" },
                      { id: "campaigncolumnscustom7", name: "senttime", value: "Sent Time" },
                      { id: "campaigncolumnscustom8", name: "deliverytime", value: "Delivery Time" },
                      { id: "campaigncolumnscustom9", name: "deliverystatus", value: "Delivery Status" },
                      { id: "campaigncolumnscustom10", name: "errorcode", value: "ErrorCode" },
                      { id: "campaigncolumnscustom11", name: "reason", value: "Reason" },
                      { id: "campaigncolumnscustom12", name: "clientid", value: "Client id" },
                      { id: "campaigncolumnscustom13", name: "isunicode", value: "Is Unicode" },
                      { id: "campaigncolumnscustom14", name: "entityid", value: "Entity id" },
                      { id: "campaigncolumnscustom15", name: "templateid", value: "Template id" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={item.id}
                          name={item.name}
                          value={item.value}
                          onChange={CampaignColumnsCustomChange}
                          checked={campaigncolumnscustom.includes(item.value)}
                        />
                        <label htmlFor={item.id} className="text-sm">{item.value}</label>
                      </div>
                    ))}
                  </div>
                  <div className='flex justify-center'>
                    <UniversalButton
                      label="Submit"
                      id="campaigncolumnscustomsubmitbtn"
                      name="campaigncolumnscustomsubmitbtn"
                      variant="primary"
                    />
                  </div>

                </div>
              )}

            </div>
          )}
        </div>
      </Dialog>

    </div>
  )
}

export default SmsReports
