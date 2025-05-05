import React, { useEffect, useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import UniversalButton from '../../whatsapp/components/UniversalButton'
import ManageExecutiveIBDTable from './components/ManageExecutiveIBDTable';
import InputField from '../../whatsapp/components/InputField';
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown';
import { Calendar } from 'primereact/calendar';
import { FaRegClock } from 'react-icons/fa';

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";


const ManageExecutiveIBD = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [addexecutivepopup, setAddExecutivePopup] = useState(false);
  const [addexecutivespopup, setAddExecutivesPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const inputRef = useRef();
  const [currentTimePlaceholder, setCurrentTimePlaceholder] = useState('');
  const [loginRequired, setLoginRequired] = useState(false);
  const [datefrom, setDatefrom] = useState(null);
  const [dateto, setDateto] = useState(null);

   const [inputsStart, setInputsStart] = useState([{ id: `mobile-1`, value: "" }]);

   const generateNewId = (currentInputs, prefix) => `${prefix}-${currentInputs.length + 1}`;

   const addInputBelow = (index, setInputs, prefix) => {
     setInputs((prevInputs) => {
       const newId = generateNewId(prevInputs, prefix);
       const newInputs = [...prevInputs];
       newInputs.splice(index + 1, 0, { id: newId, value: "" });
       return newInputs;
     });
   };

   const removeInputField = (id, setInputs, prefix) => {
    setInputs((prevInputs) => {
      if (prevInputs.length === 1) return prevInputs;
      const updatedInputs = prevInputs.filter((input) => input.id !== id);
      return updatedInputs.map((input, index) => ({
        ...input,
        id: `${prefix}-${index + 1}`,
      }));
    });
  };


  useEffect(() => {
    const now = new Date();
    const rawHours = now.getHours() % 12 || 12; // 12-hour format
    const hours = rawHours.toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    setCurrentTimePlaceholder(`${hours}:${minutes} ${ampm}`);
  
    // Allow only digits and colon in input
    const inputEl = inputRef.current?.input;
    if (inputEl) {
      inputEl.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d:]/g, '');
      });
    }
  }, []);

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
    setIsInputEnabled(true);
  };


  const numbertypeOptions = [
    { label: "Mobile", value: "mobile" },
    { label: "Landline", value: "landline" },
    { label: "Toll Free", value: "tollfree" },
  ];
  return (
    <div className='w-full'>
      {/* {isLoading ? (
    <>
      <Loader />
    </>
  ) : ( */}
      <div>

        <div className="flex flex-wrap gap-2 justify-end items-end pb-3 w-full">
          {/* Search Button */}
          <div className="w-max-content">
            <UniversalButton
              label="Add Executive"
              id="manageexecutiveadd"
              name="manageexecutiveadd"
              onClick={() => setAddExecutivePopup(true)}

            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Add Executives"
              id="manageexecutivesadd"
              name="manageexecutivesadd"
              onClick={() => setAddExecutivesPopup(true)}
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
            <ManageExecutiveIBDTable
              id="manageexecutiveibdtable"
              name="manageexecutiveibdtable"
            />
          </div>
        )}
      </div>

      <Dialog
        header="Add Executive"
        visible={addexecutivepopup}
        onHide={() => setAddExecutivePopup(false)}
        className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <InputField
              label="First Name"
              id="addexecutivefirstname"
              name="addexecutivefirstname"
              placeholder="Enter First Name"
            />
            <InputField
              label="Last Name"
              id="addexecutivelastname"
              name="addexecutivelastname"
              placeholder="Enter Last Name"
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <AnimatedDropdown
              label="Number Type"
              id="addexecutivenumbertype"
              name="addexecutivenumbertype"
              options={numbertypeOptions}
              onChange={handleDropdownChange}
            />
            <InputField
              label="Number"
              id="addexecutivenumber"
              name="addexecutivenumber"
              placeholder={selectedOption ? `Enter ${selectedOption}` : 'Enter Number'}
              readOnly={!selectedOption || !isInputEnabled}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className="w-full">
              <label htmlFor="from-time" className="block text-sm font-medium mb-1">
                From Time
              </label>
              <Calendar
                id="from-time"
                name="fromTime"
                timeOnly
                hourFormat="12"
                showIcon
                icon={<FaRegClock />}
                value={datefrom} 
                onChange={(e) => setDatefrom(e.value)}
                placeholder={currentTimePlaceholder}
                className="w-full h-10"
                inputRef={inputRef}
                readOnlyInput
              />
            </div>
            <div className="w-full">
              <label htmlFor="To-time" className="block text-sm font-medium mb-1">
                From Time
              </label>
              <Calendar
                id="totime"
                name="toyime"
                timeOnly
                hourFormat="12"
                value={dateto} 
                onChange={(e) => setDateto(e.value)}
                showIcon
                icon={<FaRegClock />}
                placeholder={currentTimePlaceholder}
                className="w-full h-10"
                inputRef={inputRef}
                readOnlyInput
              />
            </div>

          </div>
          <div className='space-y-4'>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="requiredlogin"
                className="form-checkbox"
                checked={loginRequired}
                onChange={(e) => setLoginRequired(e.target.checked)}
              />
              <span className='text-sm font-bold'>Required Login</span>
            </label>

            {loginRequired && (
              <div className="space-y-4">
                <InputField
                  label="Email"
                  id="addexecutiveemail"
                  name="addexecutiveemail"
                  placeholder="Enter Email"
                  type="email"
                />
                <div className='grid grid-cols-2 gap-4'>
                  <InputField
                    label="Password"
                    id="addexecutivepassword"
                    name="addexecutivepassword"
                    placeholder="Enter Password"
                    type="password"
                  />
                  <InputField
                    label="Confirm Password"
                    id="addexecutiveconfirmpassword"
                    name="addexecutiveconfirmpassword"
                    placeholder="Confirm Password"
                    type="password"
                  />
                </div>
              </div>
            )}
          </div>
          <div className='flex justify-center'>
            <UniversalButton
              label="Submit"
              id="addexecutivesubmit"
              name="addexecutivesubmit"

            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Add Executives"
        visible={addexecutivespopup}
        onHide={() => setAddExecutivesPopup(false)}
        className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
         <div className='space-y-4'>
         <div className="overflow-y-auto max-h-42 p-1 rounded-lg space-y-2 border border-gray-300 bg-white shadow-sm">
                {inputsStart.map((input, index) => (
                  <div key={input.id} className="flex items-center space-x-3">
                    <InputField
                      className="flex-grow border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300 bg-gray-50"
                      placeholder="Mobile Number"
                      id={input.id}
                      name={input.id}
                      type='number'
                      onChange={(e) => handleInputChange(input.id, e.target.value, setInputsStart)}
                    />

                    {inputsStart.length > 1 && (
                      <RemoveCircleIcon
                        className="text-red-500 hover:text-red-700 cursor-pointer transition-transform transform hover:scale-110"
                        fontSize="small"
                        onClick={() => removeInputField(input.id, setInputsStart, "mobile")}
                      />
                    )}

                    <AddCircleIcon
                      className="text-green-500 hover:text-green-700 cursor-pointer transition-transform transform hover:scale-110"
                      fontSize="small"
                      onClick={() => addInputBelow(index, setInputsStart, "mobile")}
                    />
                  </div>
                ))}
          </div>
          <div className='flex justify-center'>
            <UniversalButton
              label="Save"
              id="addexecutivesave"
              name="addexecutivesave"
              />
          </div>
         </div>
         </Dialog>

      {/* )} */}
    </div>
  )
}

export default ManageExecutiveIBD
