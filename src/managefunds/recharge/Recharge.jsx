import React, { useState } from "react";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import InputField from "../../components/layout/InputField";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import { Checkbox } from "primereact/checkbox";

const Recharge = () => {
  const [selectRechargeType, setSelectRechargeType] = useState(null);
  const [selectUserName, setSelectUserName] = useState(null);
  const [gstAmount, setGstAmount] = useState()
  const [includingGst, setIncludingGst] = useState();
  const [excludingGst, setExcludingGst] = useState();
  const [isChecked, setIsChecked] = useState({
    gstCalculation: false,
    reverseCalculation: false,
  });

  // const [selectedOption, setSelectedOption] = useState("option2");;

  const handleCalculation = (e, name) => {
    setIsChecked((prev) => ({
      ...prev,
      [name]: e.checked,
    }));
  };

  return (
    <div className="flex flex-wrap gap-4 ">
      <div className="flex  gap-4 mt-7  ">
        <div className="w-full flex gap-3 sm:w-46">
          <AnimatedDropdown
            id="FundUsername"
            name="FundrUsername"
            label="User Name"
            value={selectUserName}
            placeholder="Search"
            tooltipContent="Search"
            tooltipPlacement="right"
            options={[
              { value: "Arihant", label: "Arihant" },
              { value: "Harish", label: "Harish" },
              { value: "Akhil", label: "Akhil" },
              { value: "Komal", label: "Komal" },
              { value: "Abhishek", label: "Abhishek" },
              { value: "Kavita", label: "Kavita" },
              { value: "Dheeraj", label: "Dheeraj" },
              { value: "Ashmi", label: "Ashmi" },
            ]}
            onChange={(value) => setSelectUserName(value)}
          />
        </div>
        <div className="w-full flex text-sm sm:w-46">
          <AnimatedDropdown
            id="Fundrecharge"
            name="Fundrecharge"
            label="Rechage Type"
            value={selectRechargeType}
            placeholder="Select Rechage Type"
            tooltipContent="Rechage Type"
            tooltipPlacement="right"
            options={[
              { value: "Credit Card", label: "Credit Card" },
              { value: "Debit Card", label: "Debit Card" },
            ]}
            onChange={(value) => setSelectRechargeType(value)}
          />
        </div>
        <div className="w-full sm:w-56">
          <InputField
            label="Credits"
            placeholder="Enter Credit"
            onChange={(e) => setCreditCard(e.terget.value)}
          />
        </div>
      </div>
      <div className="flex flex-row w-full gap-3 sm:56 ">
        <InputField
          label="Gst Amount"
          placeholder="Gst Amount"
          onChange={(e) => setGstAmount(e.target.value)}
        />
        <InputField
          label="Amount Excluding Gst"
          placeholder="Amount Excluding Gst"
          onChange={(e) => setExcludingGst(e.target.value)}
        />
        <InputField
          label="Amount Including Gst"
          placeholder="Amount Including Gst"
          onChange={(e) => setIncludingGst(e.terget.value)}
        />
      </div>

      <div className="flex items-center justify-center gap-2">
        <Checkbox
          id="gstCalculation"
          name="gstCalculation"
          label="Apply Gst Including 18%"
          checked={isChecked.gstCalculation}
          onChange={(e) => handleCalculation(e, "gstCalculation")}
          className="m-2"
        />
        <label htmlFor="gstCalculation" className="text-md">
          Apply Gst Including 18%
        </label>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Checkbox
          id="reverseCalculation"
          name="reverseCalculation"
          label="Reverse Calculation"
          checked={isChecked.reverseCalculation}
          onChange={(e) => handleCalculation(e, "reverseCalculation")}
          className="m-2"
        />
        <label htmlFor="reverseCalculation" className="text-md">
          Reverse Calculation
        </label>
      </div>
      <div className="flex flex-row gap-3 justify-center items-center ">

        <UniversalButton
          id="fundsubmitbtn"
          name="obdvfundsubmitbtn"
          label="Submit"
          placeholder="Submit"
        />

        <UniversalButton
          id="fundResetbtn"
          name="obdvfundResetbtn"
          label="Reset"
          placeholder="Reset"
        />
      </div>


    </div>

  );
};

export default Recharge;
