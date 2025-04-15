// import React, { useState } from "react";
// import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
// import InputField from "../../components/layout/InputField";
// import UniversalButton from "../../whatsapp/components/UniversalButton";
// import { Checkbox } from "primereact/checkbox";

// const Recharge = () => {
//   const [selectRechargeType, setSelectRechargeType] = useState(null);
//   const [selectUserName, setSelectUserName] = useState(null);
//   const [gstAmount, setGstAmount] = useState();
//   const [includingGst, setIncludingGst] = useState();
//   const [excludingGst, setExcludingGst] = useState();
//   const [isChecked, setIsChecked] = useState({
//     gstCalculation: false,
//     reverseCalculation: false,
//   });

//   // const [selectedOption, setSelectedOption] = useState("option2");;

//   const handleCalculation = (e, name) => {
//     setIsChecked((prev) => ({
//       ...prev,
//       [name]: e.checked,
//     }));
//   };

//   return (
//     <div className="flex flex-wrap gap-4 ">
//       <div className="flex items-center justify-center w-full py-5">
//         <h1 className="text-xl font-semibold text-gray-700 text-center">
//           Recharge Your Account
//         </h1>
//       </div>
//       <div className="flex flex-row w-full gap-3 sm:56 ">
//         <InputField
//           label="Amount"
//           tooltipContent="Enter Your amount of recharge"
//           placeholder="Enter Amount"
//           onChange={(e) => setCreditCard(e.terget.value)}
//         />
//         <InputField
//           tooltipContent="Enter Your amount of recharge"
//           label="Gst Amount"
//           placeholder="Gst Amount"
//           onChange={(e) => setGstAmount(e.target.value)}
//         />
//         <InputField
//           tooltipContent="Enter Your amount of recharge"
//           label="Amount Excluding Gst"
//           placeholder="Amount Excluding Gst"
//           onChange={(e) => setExcludingGst(e.target.value)}
//         />
//         <InputField
//           tooltipContent="Enter Your amount of recharge"
//           label="Amount Including Gst"
//           placeholder="Amount Including Gst"
//           onChange={(e) => setIncludingGst(e.terget.value)}
//         />
//       </div>

//       <div className="flex items-center justify-center gap-2">
//         <Checkbox
//           id="gstCalculation"
//           name="gstCalculation"
//           label="Apply Gst Including 18%"
//           checked={isChecked.gstCalculation}
//           onChange={(e) => handleCalculation(e, "gstCalculation")}
//           className="m-2"
//         />
//         <label htmlFor="gstCalculation" className="text-md">
//           Apply Gst Including 18%
//         </label>
//       </div>
//       <div className="flex items-center justify-center gap-2">
//         <Checkbox
//           id="reverseCalculation"
//           name="reverseCalculation"
//           label="Reverse Calculation"
//           checked={isChecked.reverseCalculation}
//           onChange={(e) => handleCalculation(e, "reverseCalculation")}
//           className="m-2"
//         />
//         <label htmlFor="reverseCalculation" className="text-md">
//           Reverse Calculation
//         </label>
//       </div>
//       <div className="flex flex-row gap-3 justify-center items-center ">
//         <UniversalButton
//           id="fundsubmitbtn"
//           name="obdvfundsubmitbtn"
//           label="Submit"
//           placeholder="Submit"
//         />

//         <UniversalButton
//           id="fundResetbtn"
//           name="obdvfundResetbtn"
//           label="Reset"
//           placeholder="Reset"
//         />
//       </div>
//     </div>
//   );
// };

// export default Recharge;

import React, { useState } from "react";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import InputField from "../../components/layout/InputField";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import { Checkbox } from "primereact/checkbox";

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [gstAmount, setGstAmount] = useState("");
  const [includingGst, setIncludingGst] = useState("");
  const [excludingGst, setExcludingGst] = useState("");
  const [isChecked, setIsChecked] = useState({
    gstCalculation: false,
    reverseCalculation: false,
  });

  const handleCalculation = (e, name) => {
    const newState = {
      gstCalculation: false,
      reverseCalculation: false,
      [name]: e.checked,
    };
    setIsChecked(newState);

    if (name === "gstCalculation" && e.checked && excludingGst) {
      const gst = parseFloat(excludingGst) * 0.18;
      setGstAmount(gst.toFixed(2));
      setIncludingGst((parseFloat(excludingGst) + gst).toFixed(2));
    } else if (name === "reverseCalculation" && e.checked && includingGst) {
      const gst = (parseFloat(includingGst) * 18) / 118;
      setGstAmount(gst.toFixed(2));
      setExcludingGst((parseFloat(includingGst) - gst).toFixed(2));
    } else {
      setGstAmount("");
    }
  };

  const handleReset = () => {
    setAmount("");
    setGstAmount("");
    setIncludingGst("");
    setExcludingGst("");
    setIsChecked({ gstCalculation: false, reverseCalculation: false });
  };

  return (
    <div className="flex flex-wrap gap-4 bg-white p-5 rounded-xl">
      <div className="w-full py-5 text-center">
        <h1 className="text-xl font-semibold text-gray-700">
          Account Recharge Portal
        </h1>
      </div>

      <div className="flex flex-row w-full gap-3 sm:56">
        <InputField
          label="Amount"
          tooltipContent="Enter your amount of recharge"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <InputField
          label="GST Amount"
          tooltipContent="Auto-calculated GST"
          placeholder="GST Amount"
          value={gstAmount}
          onChange={(e) => setGstAmount(e.target.value)}
        />
        <InputField
          label="Amount Excluding GST"
          tooltipContent="Base amount before GST"
          placeholder="Amount Excluding GST"
          value={excludingGst}
          onChange={(e) => setExcludingGst(e.target.value)}
        />
        <InputField
          label="Amount Including GST"
          tooltipContent="Final amount with GST"
          placeholder="Amount Including GST"
          value={includingGst}
          onChange={(e) => setIncludingGst(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center gap-2">
            <Checkbox
              inputId="gstCalculation"
              checked={isChecked.gstCalculation}
              onChange={(e) => handleCalculation(e, "gstCalculation")}
              className="m-2"
            />
            <label htmlFor="gstCalculation" className="text-md">
              Apply GST Including 18%
            </label>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Checkbox
              inputId="reverseCalculation"
              checked={isChecked.reverseCalculation}
              onChange={(e) => handleCalculation(e, "reverseCalculation")}
              className="m-2"
            />
            <label htmlFor="reverseCalculation" className="text-md">
              Reverse Calculation
            </label>
          </div>
        </div>

        <div className="flex flex-row gap-3 justify-center items-center">
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
            onClick={handleReset}
          />
        </div>
      </div>
    </div>
  );
};

export default Recharge;
