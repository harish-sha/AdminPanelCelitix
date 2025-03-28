import React, { useState } from 'react'
import InputField from '../../whatsapp/components/InputField';
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown';
import UniversalButton from '../../components/common/UniversalButton';
import TwowayIntegrationTable from './components/TwowayIntegrationTable';
import { Dialog } from 'primereact/dialog';
import UniversalLabel from '../../whatsapp/components/UniversalLabel';
import { RadioButton } from 'primereact/radiobutton';
import UniversalTextArea from '../../whatsapp/components/UniversalTextArea';

const TwowayIntegration = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [addnewintegration, setAddNewIntegration] = useState(false);
  const [addintegrationoption, setAddIntegrationOption] = useState("enable");

  const handleChangeEditStatus = (e) => {
    setAddIntegrationOption(e.value);
  };
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
  const integrationTypeOption = [
    { label: 'SMS', value: 'sms' },
    { label: 'Voice', value: 'voice' },
  ]
  const addsourceOption = [
    { label: '56161', value: '56161' },
    { label: '56161', value: '56161' },
    { label: '56161', value: '56161' },
  ]
  const addkeywordOption = [
    { label: 'Keyword1', value: 'Keyword1' },
    { label: 'Keyword2', value: 'Keyword2' },
    { label: 'Keyword3', value: 'Keyword3' },
  ]
  const addrespinseOption = [
    { label: 'SMS', value: 'sms' },
    { label: 'Voice', value: 'voice' },
  ]
  return (
    <div className="w-full">
      {/* {isLoading ? (
      <>
        <Loader />
      </>
    ) : ( */}
      <div>
        <div className="flex flex-wrap items-end justify-between w-full gap-2 pb-1">
          <div className='flex flex-wrap items-end gap-2'>
            {/* Mobile Number Input Field */}
            <div className="w-max-content">
              <InputField
                label="Integration Name"
                id="twowayreportsintegrationname"
                name="twowayreportsintegrationname"
                placeholder="Enter Integration Name"
              />
            </div>

            <div className="w-max-content">
              <AnimatedDropdown
                label="Source"
                id="intergrationsource"
                name="intergrationsource"
                placeholder="Select Source"
                options={sourceOption}
                onChange={(e) => console.log(e)}
              />
            </div>
            <div className="w-max-content">
              <AnimatedDropdown
                label="Keyword"
                id="intergrationkeyword"
                name="intergrationkeyword"
                placeholder="Enter Keyword"
                options={keywordOption}
                onChange={(e) => console.log(e)}
              />
            </div>
            <div className="w-max-content">
              <AnimatedDropdown
                label="Integration Type"
                id="intergrationtype"
                name="intergrationtype"
                placeholder="Select  Type"
                options={integrationTypeOption}
                onChange={(e) => console.log(e)}
              />
            </div>
            {/* Search Button */}
            <div className="w-max-content">
              <UniversalButton
                label="Search"
                id="searchintegration"
                name="searchintegration"
              // onClick={handleSearchIntegration}
              />
            </div>
          </div>
          <div>
            <div className="w-max-content">
              <UniversalButton
                label="Add New"
                id="addnewintegration"
                name="addnewintegration"
                onClick={() => setAddNewIntegration(true)}
              />
            </div>
          </div>
        </div>


        {/* ✅ Show Loader or Table */}
        {isFetching ? (
          <div className="w-full">
            <UniversalSkeleton height="35rem" width="100%" />
          </div>
        ) : (
          <div className="w-full">
            <TwowayIntegrationTable
              id="twowayintegrationtable"
              name="twowayintegrationtable"
            />
          </div>
        )}
      </div>
      {/* )} */}

      <Dialog
        header="Add New Integration"
        visible={addnewintegration}
        onHide={() => setAddNewIntegration(false)}
        className="lg:w-[45rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div className='space-y-2'>
          <div className='grid grid-cols-2 gap-2'>
            <div className='w-max-56'>
              <InputField
                label="Integration Name"
                id="addnewintegrationname"
                name="addnewintegrationname"
                placeholder="Enter Integration Name"
              />
            </div>
            <div className='w-max-56'>
              <AnimatedDropdown
                label="Source"
                id="addnewintergrationsource"
                name="addnewintergrationsource"
                placeholder="Select Source"
                options={addsourceOption}
                onChange={(e) => console.log(e)}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div className='w-max-content'>

              <AnimatedDropdown
                label="Keyword"
                id="addnewintergrationkeyword"
                name="addnewintergrationkeyword"
                placeholder="Enter Keyword"
                options={addkeywordOption}
                onChange={(e) => console.log(e)}
              />
            </div>
            <div className='w-max-content'>

              <AnimatedDropdown
                label="Response"
                id="addnewintergrationresponse"
                name="addnewintergrationresponse"
                placeholder="Enter Response"
                options={addrespinseOption}
                onChange={(e) => console.log(e)}

              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 ">
            {/* <div className="flex items-center justify-center">
              <UniversalLabel
                text="Status"
                id="editstatus"
                name="editstatus"
                className="text-sm font-medium text-gray-700"
              />
            </div> */}

            <div className="flex items-center gap-2">
              <RadioButton
                inputId="addintegrationOption1"
                name="addintegrationredio"
                value="enable"
                onChange={handleChangeEditStatus}
                checked={addintegrationoption === "enable"}
              />
              <label
                htmlFor="addintegrationOption1"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                SMS
              </label>
            </div>

            <div className="flex items-center gap-2">
              <RadioButton
                inputId="addintegrationOption2"
                name="addintegrationredio"
                value="disable"
                onChange={handleChangeEditStatus}
                checked={addintegrationoption === "disable"}
              />
              <label
                htmlFor="addintegrationOption2"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Voice
              </label>
            </div>
            {addintegrationoption === "enable" && (
              <div className='w-full'>
                <div className='grid grid-cols-2 gap-2'>
                  <InputField
                    label="User Name"
                    id="addnewintegrationusername"
                    name="addnewintegrationusername"
                    placeholder="Enter User Name"
                  />
                  <InputField
                    label="API Key"
                    id="addnewintegrationapi"
                    name="addnewintegrationapi"
                    placeholder="Enter API Key"
                  />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <InputField
                    label="DLT Approved Sender ID"
                    id="addnewintegrationdltsenderid"
                    name="addnewintegrationdltsenderid"
                    placeholder="Enter DLT Approved Sender ID"
                  />
                  <InputField
                    label="DLT Template ID"
                    id="addnewintegrationdlttemplateid"
                    name="addnewintegrationdlttemplateid"
                    placeholder="Enter DLT Template ID"
                  />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <InputField
                    label="DLT Entity ID"
                    id="addnewintegrationdlentityid"
                    name="addnewintegrationdlentityid"
                    placeholder="Enter DLT Entity ID"
                  />
                  <UniversalTextArea
                    label="Content"
                    id="addnewintegrationcontent"
                    name="addnewintegrationcontent"
                    placeholder="Enter Content"
                    rows={10}
                  />
                </div>
              </div>

            )}
            {addintegrationoption === "disable" && (
              <div className='w-full'>
                <AnimatedDropdown
                  label="File"
                  id="addnewintergrationfile"
                  name="addnewintergrationfile"
                  placeholder="Select File"
                  options={[{ label: 'File1', value: 'File1' }]}
                  onChange={(e) => console.log(e)}
                />
              </div>

            )}

          </div>
          <div className='flex justify-center'>
            <UniversalButton
              label="Submit"
              id="addnewintegrationsubmit"
              name="addnewintegrationsubmit"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default TwowayIntegration
