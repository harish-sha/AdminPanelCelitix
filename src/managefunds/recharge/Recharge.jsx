import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import CircularProgress from "@mui/material/CircularProgress";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import confirmAnimation from "@/assets/animation/confirmcheck.json";

import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import InputField from "../../components/layout/InputField";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import { Checkbox } from "primereact/checkbox";
import { useUser } from "@/context/auth";
import { fetchAllUsers } from "@/apis/admin/admin";
import { recharge } from "@/apis/recharge/recharge";
import toast from "react-hot-toast";

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [gstAmount, setGstAmount] = useState("");
  const [includingGst, setIncludingGst] = useState("");
  const [excludingGst, setExcludingGst] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [rechargeSuccess, setRechargeSuccess] = useState(false);

  const [remark, setRemark] = useState("")

  const [selectedRechargeType, setSelectedRechargeType] = useState("");

  const { user } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    //fetchAllUsersDetails
    if (user.role === "RESELLER") {
      const fetchAllUsersDetails = async () => {
        const data = {
          userId: "",
          mobileNo: "",
          companyName: "",
          status: "-1",
        };
        try {
          setIsFetching(true);
          const res = await fetchAllUsers(data);
          setAllUsers(res.userMstPojoList);
        } catch (e) {
          // console.log(e);
          toast.error("Something went wrong! Please try again later.");
        } finally {
          setIsFetching(false);
        }
      };
      fetchAllUsersDetails();
    }
  }, []);

  const selectedUserObj = allUsers.find((u) => u.srno === selectedUser);

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
    setSelectedUser("");
    setSelectedRechargeType("");
    setRemark("");
  };

  const handleSubmitRecharge = () => {
    // Validation
    if (!selectedUser) return toast.error("Please select a user.");
    if (!selectedRechargeType) return toast.error("Please select recharge type.");
    if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Enter a valid amount.");
    // if (!gstAmount || isNaN(gstAmount)) return toast.error("GST amount required.");
    // if (!includingGst || isNaN(includingGst)) return toast.error("Amount including GST required.");
    // if (!excludingGst || isNaN(excludingGst)) return toast.error("Amount excluding GST required.");
    if (!remark.trim()) return toast.error("Remark is required.");

    setShowDialog(true);
  };

  const handleConfirmRecharge = async () => {
    setIsSubmitting(true);
    const payload = {
      selectedUserId: selectedUser,
      // actualAmount: excludingGst,
      actualAmount: amount,
      amount: amount,
      gst: gstAmount,
      rechargeType: selectedRechargeType,
      withGST: isChecked.gstCalculation ? 1 : 0,
      remark: remark.trim(),
    };
    try {
      const res = await recharge(payload);
      if (res?.status === true) {
        setRechargeSuccess(true);
        toast.success(res.msg || "Recharge successful!");
        handleReset();
        // return
        setTimeout(() => {
          setShowDialog(false);
          setRechargeSuccess(false);
        }, 5000);
      } else {
        const errorMessage = res?.msg || "Recharge failed.";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Recharge failed.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <div className="flex flex-wrap gap-4 bg-white p-5 rounded-xl">
        <div className="w-full py-5 text-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Account Recharge Portal
          </h1>
        </div>

        <div className="flex items-center justify-center gap-3 w-full">
          {user.role === "RESELLER" && (
            <div className="flex-1">
              <AnimatedDropdown
                id="manageuser"
                name="manageuser"
                label="Select User"
                tooltipContent="Select user you want to see reports"
                tooltipPlacement="right"
                options={allUsers.map((user) => ({
                  label: user.userId,
                  value: user.srno,
                }))}
                value={selectedUser}
                onChange={setSelectedUser}
                placeholder="Select User"
              />
            </div>
          )}
          <div className="flex-1">
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
          </div>
          <div className="flex-1" >
            <InputField
              label="Remark"
              tooltipContent="remark"
              placeholder="Enter Remarks.."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
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
              <p className="text-xl font-semibold text-gray-700">
                Are you sure you want to recharge for <b>{selectedUserObj?.userId || selectedUser}</b> of <b>{amount}</b><br />
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
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};

export default Recharge;
