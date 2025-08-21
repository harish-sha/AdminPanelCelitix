// import React, { useEffect, useState } from "react";
// import { Dialog } from "primereact/dialog";
// import CircularProgress from "@mui/material/CircularProgress";
// import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
// import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
// import Lottie from "lottie-react";
// import { motion } from "framer-motion";
// import confirmAnimation from "@/assets/animation/confirmcheck.json";

// import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
// import InputField from "../../components/layout/InputField";
// import UniversalButton from "../../whatsapp/components/UniversalButton";
// import { Checkbox } from "primereact/checkbox";
// import { useUser } from "@/context/auth";
// import { fetchAllUsers, fetchUserSrno } from "@/apis/admin/admin";
// import { recharge } from "@/apis/recharge/recharge";
// import toast from "react-hot-toast";
// import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

// const Recharge = () => {
//   const [amount, setAmount] = useState("");
//   const [gstAmount, setGstAmount] = useState("");
//   const [includingGst, setIncludingGst] = useState("");
//   const [excludingGst, setExcludingGst] = useState("");
//   const [isFetching, setIsFetching] = useState(false);

//   const [showDialog, setShowDialog] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [rechargeSuccess, setRechargeSuccess] = useState(false);

//   const [remark, setRemark] = useState("")

//   const [selectedRechargeType, setSelectedRechargeType] = useState("");

//   const { user } = useUser();
//   const [allUsers, setAllUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");

//   useEffect(() => {
//     if (user.role === "RESELLER") {
//       const fetchAllUsersDetails = async () => {
//         // const data = {
//         //   userId: "",
//         //   mobileNo: "",
//         //   companyName: "",
//         //   status: "-1",
//         // };
//         const data = {
//           userSrno: "",
//           date: "",
//           // companyName: "",
//           // status: "-1",
//         };
//         try {
//           setIsFetching(true);
//           const res = await fetchUserSrno(data);
//           setAllUsers(res);
//         } catch (e) {
//           // console.log(e);
//           toast.error("Something went wrong! Please try again later.");
//         } finally {
//           setIsFetching(false);
//         }
//       };
//       fetchAllUsersDetails();
//     }
//   }, []);

//   const selectedUserObj = allUsers.find((u) => u.srno === selectedUser);

//   const [isChecked, setIsChecked] = useState({
//     gstCalculation: false,
//     reverseCalculation: false,
//   });

//   const handleCalculation = (e, name) => {
//     const newState = {
//       gstCalculation: false,
//       reverseCalculation: false,
//       [name]: e.checked,
//     };
//     setIsChecked(newState);

//     if (name === "gstCalculation" && e.checked && excludingGst) {
//       const gst = parseFloat(excludingGst) * 0.18;
//       setGstAmount(gst.toFixed(2));
//       setIncludingGst((parseFloat(excludingGst) + gst).toFixed(2));
//     } else if (name === "reverseCalculation" && e.checked && includingGst) {
//       const gst = (parseFloat(includingGst) * 18) / 118;
//       setGstAmount(gst.toFixed(2));
//       setExcludingGst((parseFloat(includingGst) - gst).toFixed(2));
//     } else {
//       setGstAmount("");
//     }
//   };

//   const handleReset = () => {
//     setAmount("");
//     setGstAmount("");
//     setIncludingGst("");
//     setExcludingGst("");
//     setIsChecked({ gstCalculation: false, reverseCalculation: false });
//     setSelectedUser("");
//     setSelectedRechargeType("");
//     setRemark("");
//   };

//   const handleSubmitRecharge = () => {
//     if (!selectedUser) return toast.error("Please select a user.");
//     if (!selectedRechargeType) return toast.error("Please select recharge type.");
//     if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Enter a valid amount.");
//     // if (!gstAmount || isNaN(gstAmount)) return toast.error("GST amount required.");
//     // if (!includingGst || isNaN(includingGst)) return toast.error("Amount including GST required.");
//     // if (!excludingGst || isNaN(excludingGst)) return toast.error("Amount excluding GST required.");
//     if (!remark.trim()) return toast.error("Remark is required.");

//     setShowDialog(true);
//   };

//   const handleConfirmRecharge = async () => {
//     setIsSubmitting(true);
//     const payload = {
//       selectedUserId: selectedUser,
//       // actualAmount: excludingGst,
//       actualAmount: amount,
//       amount: amount,
//       gst: gstAmount,
//       rechargeType: selectedRechargeType,
//       withGST: isChecked.gstCalculation ? 1 : 0,
//       remark: remark.trim(),
//     };
//     try {
//       const res = await recharge(payload);
//       if (res?.status === true) {
//         setRechargeSuccess(true);
//         toast.success(res.msg || "Recharge successful!");
//         handleReset();
//         // return
//         setTimeout(() => {
//           setShowDialog(false);
//           setRechargeSuccess(false);
//         }, 5000);
//       } else {
//         toast.error(res?.msg || "Recharge failed.");
//       }
//     } catch (error) {
//       toast.error("Recharge failed.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-wrap gap-4 bg-white p-5 rounded-xl">
//         <div className="w-full py-5 text-center">
//           <h1 className="text-xl font-semibold text-gray-700">
//             Account Recharge Portal
//           </h1>
//         </div>

//         <div className="flex items-center justify-center gap-3 w-full">
//           {user.role === "RESELLER" && (
//             <div className="flex-1">
//               <DropdownWithSearch
//                 id="manageuser"
//                 name="manageuser"
//                 label="Select User"
//                 tooltipContent="Select user you want to see reports"
//                 tooltipPlacement="right"
//                 // options={allUsers.map((user) => ({
//                 //   label: user.userName,
//                 //   value: user.srNo,
//                 // }))}
//                 options={allUsers
//                   .slice()
//                   .sort((a, b) => a.userName.localeCompare(b.userName))
//                   .map((user) => ({
//                     label: user.userName,
//                     value: user.srNo,
//                   }))
//                 }
//                 value={selectedUser}
//                 onChange={setSelectedUser}
//                 placeholder="Select User"
//               />
//             </div>
//           )}
//           <div className="flex-1">
//             <AnimatedDropdown
//               id="rechargeType"
//               name="rechargeType"
//               label="Recharge Type"
//               tooltipContent="Select recharge type"
//               tooltipPlacement="right"
//               options={[
//                 { value: "1", label: "Recharge" },
//                 { value: "3", label: "Credit" },
//                 { value: "4", label: "Debit" },
//               ]}
//               value={selectedRechargeType}
//               onChange={setSelectedRechargeType}
//               placeholder="Category"
//             />
//           </div>
//           <div className="flex-1" >
//             <InputField
//               label="Remark"
//               tooltipContent="remark"
//               placeholder="Enter Remarks.."
//               value={remark}
//               onChange={(e) => setRemark(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="flex flex-row w-full gap-3 sm:56">
//           <InputField
//             label="Amount"
//             tooltipContent="Enter your amount of recharge"
//             placeholder="Enter Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <InputField
//             label="GST Amount"
//             tooltipContent="Auto-calculated GST"
//             placeholder="GST Amount"
//             value={gstAmount}
//             onChange={(e) => setGstAmount(e.target.value)}
//           />
//           <InputField
//             label="Amount Excluding GST"
//             tooltipContent="Base amount before GST"
//             placeholder="Amount Excluding GST"
//             value={excludingGst}
//             onChange={(e) => setExcludingGst(e.target.value)}
//           />
//           <InputField
//             label="Amount Including GST"
//             tooltipContent="Final amount with GST"
//             placeholder="Amount Including GST"
//             value={includingGst}
//             onChange={(e) => setIncludingGst(e.target.value)}
//           />
//         </div>

//         <div className="flex items-center justify-between w-full">
//           <div className="flex items-center gap-5">
//             <div className="flex items-center justify-center gap-2">
//               <Checkbox
//                 inputId="gstCalculation"
//                 checked={isChecked.gstCalculation}
//                 onChange={(e) => handleCalculation(e, "gstCalculation")}
//                 className="m-2"
//               />
//               <label htmlFor="gstCalculation" className="text-md">
//                 Apply GST Including 18%
//               </label>
//             </div>
//             <div className="flex items-center justify-center gap-2">
//               <Checkbox
//                 inputId="reverseCalculation"
//                 checked={isChecked.reverseCalculation}
//                 onChange={(e) => handleCalculation(e, "reverseCalculation")}
//                 className="m-2"
//               />
//               <label htmlFor="reverseCalculation" className="text-md">
//                 Reverse Calculation
//               </label>
//             </div>
//           </div>

//           <div className="flex flex-row gap-3 justify-center items-center">
//             <UniversalButton
//               id="fundsubmitbtn"
//               name="obdvfundsubmitbtn"
//               label="Submit"
//               placeholder="Submit"
//               onClick={handleSubmitRecharge}
//             />
//             <UniversalButton
//               id="fundResetbtn"
//               name="obdvfundResetbtn"
//               label="Reset"
//               placeholder="Reset"
//               onClick={handleReset}
//             />
//           </div>
//         </div>
//       </div>

//       <Dialog
//         header={"Confirm Recharge"}
//         visible={showDialog}
//         style={{ width: "27rem" }}
//         onHide={() => setShowDialog(false)}
//         draggable={false}
//       >
//         {/* <div className="flex items-center justify-center">
//           <ErrorOutlineOutlinedIcon
//             sx={{
//               fontSize: 64,
//               color: "red",
//             }}
//           />
//         </div>
//         <div className="flex items-center justify-center">
//           <Lottie
//             animationData={confirmAnimation}
//             loop
//             autoplay
//             className="w-60 h-45"
//           />
//         </div>
//         <div className="p-4 text-center">
//           <p className="text-xl font-semibold text-gray-700">
//             Are you sure you want to recharge for <b>{selectedUserObj?.userId || selectedUser}</b> of <b>{includingGst}</b><br />
//           </p>
//           <p className="mt-2 text-md text-gray-500">
//             This action is irreversible.
//           </p>
//         </div>
//         <div className="flex justify-center gap-4 mt-2">
//           {!isSubmitting && (
//             <UniversalButton
//               label="Cancel"
//               style={{
//                 backgroundColor: "#090909",
//               }}
//               onClick={() => setShowDialog(false)}
//             />
//           )}
//           <UniversalButton
//             label={isSubmitting ? "Submitting..." : "Submit"}
//             onClick={handleConfirmRecharge}
//             disabled={isSubmitting}
//           />
//         </div> */}
//         {rechargeSuccess ? (
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 300, damping: 20 }}
//             className="flex flex-col items-center justify-center py-10"
//           >
//             <Lottie
//               animationData={confirmAnimation}
//               loop={false}
//               autoplay
//               className="w-60 h-45"
//             />
//             <div className="mt-4 text-xl font-semibold text-green-600">
//               Recharge Successful!
//             </div>
//           </motion.div>
//         ) : (
//           <>
//             <div className="flex items-center justify-center">
//               <ErrorOutlineOutlinedIcon
//                 sx={{
//                   fontSize: 64,
//                   color: "red",
//                 }}
//               />
//             </div>
//             {/* <div className="flex items-center justify-center">
//               <Lottie
//                 animationData={confirmAnimation}
//                 loop
//                 autoplay
//                 className="w-60 h-45"
//               />
//             </div> */}
//             <div className="p-4 text-center">
//               {/* <p className="text-xl font-semibold text-gray-700">
//                 Are you sure you want to recharge for <span className="font-bold" >{selectedUserObj?.userId || selectedUser}</span> of <span className="text-green-700 font-semibold" >{amount}</span><br />
//               </p> */}
//               <p className="text-lg font-medium text-gray-800 leading-relaxed">
//                 You are about to recharge&nbsp;
//                 <span className="text-blue-700 font-semibold">
//                   {selectedUserObj?.userId || selectedUser}
//                 </span>
//                 &nbsp;with an amount of&nbsp;
//                 <span className="text-green-600 font-bold">
//                   ₹{amount}
//                 </span>.
//                 <br />
//                 Please confirm to proceed.
//               </p>
//               <p className="mt-2 text-sm text-gray-500">
//                 This action is irreversible.
//               </p>
//             </div>
//             <div className="flex justify-center gap-4 mt-2">
//               {!isSubmitting && (
//                 <UniversalButton
//                   label="Cancel"
//                   style={{
//                     backgroundColor: "#090909",
//                   }}
//                   onClick={() => setShowDialog(false)}
//                 />
//               )}
//               <UniversalButton
//                 label={isSubmitting ? "Processing..." : "Confirm"}
//                 onClick={handleConfirmRecharge}
//                 disabled={isSubmitting}
//               />
//             </div>
//           </>
//         )}
//       </Dialog>
//     </>
//   );
// };

// export default Recharge;

import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import CircularProgress from "@mui/material/CircularProgress";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import confirmAnimation from "@/assets/animation/confirmcheck.json";

import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import InputField from "../../components/layout/InputField";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import { Checkbox } from "primereact/checkbox";
import { useUser } from "@/context/auth";
import { fetchAllUsers, fetchUserSrno } from "@/apis/admin/admin";
import { recharge } from "@/apis/recharge/recharge";
import toast from "react-hot-toast";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { RadioButton } from "primereact/radiobutton";

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [gstAmount, setGstAmount] = useState("");
  const [includingGst, setIncludingGst] = useState("");
  const [excludingGst, setExcludingGst] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rechargeSuccess, setRechargeSuccess] = useState(false);
  const [remark, setRemark] = useState("");
  const [selectedRechargeType, setSelectedRechargeType] = useState("");
  const { user } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");

  const selectedUserObj = allUsers.find((u) => u.srNo === selectedUser);

  useEffect(() => {
    const fetchAllUsersDetails = async () => {
      const data = { userSrno: "", date: "" };
      try {
        setIsFetching(true);
        const res = await fetchUserSrno(data);
        setAllUsers(res);
      } catch (e) {
        toast.error("Something went wrong! Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchAllUsersDetails();
  }, []);

  useEffect(() => {
    const parsedAmount = parseFloat(amount);

    if (!isNaN(parsedAmount)) {
      if (selectedOption === "option1") {
        // Including GST means Amount is base, add 18%
        const gst = parsedAmount * 0.18;
        setGstAmount(gst.toFixed(2));
        setIncludingGst((parsedAmount + gst).toFixed(2));
      } else if (selectedOption === "option2") {
        setGstAmount(0);
        setExcludingGst(parsedAmount);
        setIncludingGst(parsedAmount.toFixed(2));
      }
    } else {
      setGstAmount("");
      setIncludingGst("");
      setExcludingGst("");
    }
  }, [amount, selectedOption]);

  const handleSubmitRecharge = () => {
    if (!selectedUser) return toast.error("Please select a user.");
    if (!selectedRechargeType)
      return toast.error("Please select recharge type.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Enter a valid amount.");
    if (!remark.trim()) return toast.error("Remark is required.");
    setShowDialog(true);
  };

  const handleConfirmRecharge = async () => {
    setIsSubmitting(true);
    const payload = {
      selectedUserId: selectedUser,
      actualAmount: amount,
      amount: selectedOption === "option1" ? includingGst : excludingGst,

      rechargeType: selectedRechargeType,
      withGST: selectedOption === "option2" ? 0 : 1,
      ...(selectedOption !== "option2" && { gst: gstAmount }),
      remark: remark.trim(),
    };
    try {
      const res = await recharge(payload);
      if (res?.status === true) {
        setRechargeSuccess(true);
        toast.success(res.msg || "Recharge successful!");
        handleReset();
        setTimeout(() => {
          setShowDialog(false);
          setRechargeSuccess(false);
        }, 5000);
      } else {
        toast.error(res?.msg || "Recharge failed.");
      }
    } catch (error) {
      toast.error("Recharge failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setAmount("");
    setGstAmount("");
    setIncludingGst("");
    setExcludingGst("");
    setSelectedUser("");
    setSelectedRechargeType("");
    setRemark("");
    // setSelectedOption("");
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 bg-white p-5 rounded-xl">
        <div className="w-full py-5 text-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Account Recharge Portal
          </h1>
        </div>

        <div className="flex items-end gap-3 w-full md:flex-nowrap flex-wrap">
          <DropdownWithSearch
            id="manageuser"
            name="manageuser"
            label="Select User"
            tooltipContent="Select user you want to recharge"
            tooltipPlacement="right"
            options={allUsers
              .slice()
              .sort((a, b) => a.userName.localeCompare(b.userName))
              .map((user) => ({
                label: user.userName,
                value: user.srNo,
              }))}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Select User"
          />
          <AnimatedDropdown
            id="rechargeType"
            name="rechargeType"
            label="Recharge Type"
            tooltipContent="Select recharge type"
            tooltipPlacement="right"
            options={[
              { value: "1", label: "Recharge" },
              { value: "3", label: "Credit" },
              { value: "4", label: "Debit" },
            ]}
            value={selectedRechargeType}
            onChange={setSelectedRechargeType}
            placeholder="Category"
          />
          <div className="flex items-end gap-2 w-90">
            <div className="cursor-pointer px-2 py-2 shadow border rounded-lg bg-white">
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="radioOption1"
                  name="radioGroup"
                  value="option1"
                  onChange={(e) => setSelectedOption(e.value)}
                  checked={selectedOption === "option1"}
                />
                <label
                  htmlFor="radioOption1"
                  className="text-gray-700 font-medium text-sm"
                >
                  Including GST
                </label>
              </div>
            </div>
            {/* <div className="cursor-pointer px-2 py-2 shadow border rounded-lg bg-white">
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="radioOption2"
                  name="radioGroup"
                  value="option2"
                  onChange={(e) => setSelectedOption(e.value)}
                  checked={selectedOption === "option2"}
                />
                <label
                  htmlFor="radioOption2"
                  className="text-gray-700 font-medium text-sm"
                >
                  Exclude GST
                </label>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex w-full gap-3 md:flex-nowrap flex-wrap">
          <InputField
            label="Amount"
            tooltipContent="Enter your amount of recharge"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
          <InputField
            label="Remark"
            tooltipContent="remark"
            placeholder="Enter Remarks.."
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>

        <div className="flex w-full gap-3 md:flex-nowrap flex-wrap">
          <InputField
            label="GST Amount"
            tooltipContent="Auto-calculated GST Amount"
            placeholder="GST Amount"
            value={gstAmount}
            onChange={(e) => setGstAmount(e.target.value)}
            readOnly
          />
          <InputField
            label={
              selectedOption === "option1"
                ? "Total Amount Including GST"
                : "Total Amount Exclude GST"
            }
            tooltipContent="Actual Amount of recharge"
            placeholder="Total Amount GST"
            value={selectedOption === "option1" ? includingGst : excludingGst}
            readOnly
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex flex-row gap-3 justify-center items-center">
            <UniversalButton
              id="fundsubmitbtn"
              name="obdvfundsubmitbtn"
              label="Submit"
              placeholder="Submit"
              onClick={handleSubmitRecharge}
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

      <Dialog
        header={"Confirm Recharge"}
        visible={showDialog}
        style={{ width: "27rem" }}
        onHide={() => setShowDialog(false)}
        draggable={false}
      >
        {/* <div className="flex items-center justify-center">
          <ErrorOutlineOutlinedIcon
            sx={{
              fontSize: 64,
              color: "red",
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <Lottie
            animationData={confirmAnimation}
            loop
            autoplay
            className="w-60 h-45"
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-xl font-semibold text-gray-700">
            Are you sure you want to recharge for <b>{selectedUserObj?.userId || selectedUser}</b> of <b>{includingGst}</b><br />
          </p>
          <p className="mt-2 text-md text-gray-500">
            This action is irreversible.
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          {!isSubmitting && (
            <UniversalButton
              label="Cancel"
              style={{
                backgroundColor: "#090909",
              }}
              onClick={() => setShowDialog(false)}
            />
          )}
          <UniversalButton
            label={isSubmitting ? "Submitting..." : "Submit"}
            onClick={handleConfirmRecharge}
            disabled={isSubmitting}
          />
        </div> */}
        {rechargeSuccess ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center justify-center py-10"
          >
            <Lottie
              animationData={confirmAnimation}
              loop={false}
              autoplay
              className="w-60 h-45"
            />
            <div className="mt-4 text-xl font-semibold text-green-600">
              Recharge Successful!
            </div>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <ErrorOutlineOutlinedIcon
                sx={{
                  fontSize: 64,
                  color: "red",
                }}
              />
            </div>
            {/* <div className="flex items-center justify-center">
              <Lottie
                animationData={confirmAnimation}
                loop
                autoplay
                className="w-60 h-45"
              />
            </div> */}
            <div className="p-4 text-center">
              {/* <p className="text-xl font-semibold text-gray-700">
                Are you sure you want to recharge for <span className="font-bold" >{selectedUserObj?.userId || selectedUser}</span> of <span className="text-green-700 font-semibold" >{amount}</span><br />
              </p> */}
              <p className="text-lg font-medium text-gray-800 leading-relaxed">
                You are about to recharge&nbsp;
                <span className="text-blue-700 font-semibold">
                  {allUsers.find((u) => u.srNo === selectedUser)?.userName ||
                    "None selected"}
                </span>
                &nbsp;with a recharge amount of&nbsp;
                <span className="text-green-600 font-bold">₹{amount}</span>
                &nbsp;and a payable amount
                {selectedOption === "option1" && "(including GST)"}
                &nbsp;of&nbsp;
                <span className="text-green-700 font-bold">
                  ₹{selectedOption === "option1" ? includingGst : excludingGst}
                </span>
                .
                <br />
                Please confirm to proceed.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                This action is irreversible.
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {!isSubmitting && (
                <UniversalButton
                  label="Cancel"
                  style={{
                    backgroundColor: "#090909",
                  }}
                  onClick={() => setShowDialog(false)}
                />
              )}
              <UniversalButton
                label={isSubmitting ? "Processing..." : "Confirm"}
                onClick={handleConfirmRecharge}
                disabled={isSubmitting}
              />
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};

export default Recharge;
