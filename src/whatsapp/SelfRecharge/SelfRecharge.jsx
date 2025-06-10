import React, { useState } from "react";
import UniversalButton from "../components/UniversalButton";
import InputField from "../../whatsapp/components/InputField";
import toast from "react-hot-toast";

const RechargeForm = () => {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

 const handleRecharge = async () => {
  if (!name || !email || !phone || !amount) {
    toast.error("All fields are required");
    return;
  }

  const orderId = "order_" + Date.now();

  const payload = {
    order_id: orderId,
    order_amount: amount,
    order_currency: "INR",
    customer_details: {
      customer_id: phone,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
    },
  };

  try {
    const response = await fetch("https://sandbox.cashfree.com/pg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": "TEST430329ae80e0f32e41a393d78b923034", 
        "x-client-secret": "TESTaf195616268bd6202eeb3bf8dc458956e7192a85", 
        "x-api-version": "2022-09-01",
      },
      body: JSON.stringify(payload),
    });

    console.log("response", response)
    const data = await response.json();
    const orderToken = data.order_token;

    if (!orderToken) {
      toast.error("Failed to generate order token");
      return;
    }

    const cashfree = new window.Cashfree();

    cashfree.init({
      orderToken,
      returnUrl: window.location.href,
    });

    cashfree.open();

  } catch (error) {
    console.error("Cashfree error:", error);
    toast.error("Payment failed to initiate.");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Recharge Wallet
        </h2>

        <div className="space-y-5">
          <div>
            <InputField
              label="Full Name"
              id="fullName"
              name="fullName"
              placeholder="Enter full name"
              value={name}
              type = "text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <InputField
              label="Email Address"
              id="email"
              name="email"
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <InputField
              label="Phone Number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <InputField
              label="Amount (INR)"
              id="amount"
              name="amount"
              placeholder="Enter Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="w-max-content flex justify-center items-center">
            <UniversalButton
              id="handleRechargeBtn"
              name="handleRechargeBtn"
              label="Proceed to Recharge"
              onClick={handleRecharge}
              variant="primary"
              // icon={<AddOutlinedIcon fontSize="small" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargeForm;
