import React, { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import rechargeAnim from "../assets/animation/recharge.json";
import {
  rechargeCreateOrderCashFree,
  verifyRechargeStatus,
} from "@/apis/recharge/recharge";
import { useNavigate } from "react-router-dom";

export default function RechargeFullWidth() {
  const navigate = useNavigate();
  const [cashfree, setCashfree] = useState(null);
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [paymentSessionId, setPaymentSessionId] = useState(null);

  useEffect(() => {
    // load({ mode: "sandbox" }).then((cf) => setCashfree(cf));
    var initializeSDK = async function () {
      const cashfreeInit = await load({
        mode: "production",
      });
      setCashfree(cashfreeInit);
    };

    initializeSDK();
  }, []);

  const errorMessages = {
    "customer_details.customer_phone_invalid": "Invalid phone number",
    "customer_details.customer_email_invalid": "Invalid email address",
    "customer_details.customer_name_invalid": "Invalid name format",
    "customer_details.customer_address_invalid": "Invalid address format",
    // Add more error mappings as needed
  };

  const handlePayNow = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }

    function generateOrderId() {
      const random14Digit = Math.floor(1e13 + Math.random() * 9e13); // ensures 14 digits
      return `order_id${random14Digit}`;
    }

    if (!paymentSessionId) {
      // const orderId = `order_id${Date.now()}`;
      const orderId = generateOrderId();
      // const domain = window.location.hostname;
      const domain = "https://app.celitix.com";
      try {
        const payload = {
          order_id: orderId,
          order_amount: amount,
          order_currency: "INR",
          customer_details: {
            customer_id: orderId,
            customer_email: email,
            customer_phone: phone,
            customer_name: name,
          },
          order_meta: {
            // return_url: `${domain}/payment-status?order_id=${orderId}`,
            return_url: `${domain}/selfrecharge`,
            // notify_url:
            //   "https://webhook.site/fe86c8d7-fa74-4ad7-819c-af7b9f612511",
          },
        };
        const res = await rechargeCreateOrderCashFree(payload);
        // if (res?.status === true && res?.paymentSessionId) {
        //   setPaymentSessionId(res.paymentSessionId);
        //   const result = await cashfree.checkout({
        //     paymentSessionId: res.paymentSessionId,
        //     redirectTarget: "_modal",
        //   });
        //   console.log("final result", result)
        // } else {
        //   console.error("Missing paymentSessionId in response:", res);
        //   toast.error("Failed to create payment session.");
        //   return;
        // }

        if (res?.cashfree_error?.code) {
          const message =
            errorMessages[res?.cashfree_error?.code] ||
            "Something went wrong. Please try again.";
          if (message) {
            toast.error(message);
            return;
          }
        }

        const paymentSessionId = res?.paymentSessionId;

        if (!paymentSessionId) {
          toast.error("Failed to create payment session.");
          return;
        }

        cashfree
          .checkout({
            paymentSessionId,
            redirectTarget: "_modal",
          })
          .then((result) => {
          if (result.error) {
              return toast.error("Something went wrong. Please try again.");
            }
            if (result.redirect) {
              return toast.error("Payment will be redirected");
            }
            if (result.paymentDetails) {
              toast.success(
                "Payment has been completed, Check for Payment Status"
              );
            }
          });

        await verifyRechargeStatus({
          order_id: orderId,
        });

        setAmount("");
        setPhone("");
        setEmail("");
        setName("");
        navigate("/transactions");
      } catch (err) {
        console.error(err);
        toast.error("Error creating payment session.");
        return;
      } finally {
        setPaymentSessionId(null);
      }
    }

    // if (!cashfree) {
    //   toast.error("Payment SDK not loaded yet. Try again in a moment.");
    //   return;
    // }

    // try {
    //   const result = await cashfree.checkout({
    //     paymentSessionId,
    //     redirectTarget: "_modal",
    //   });

    //   if (result.error) {
    //     console.error(result.error);
    //     toast.error("Payment cancelled or failed.");
    //   } else {
    //     console.log("Payment details:", result.paymentDetails);
    //     toast.success("Payment completed!");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toast.error("Unexpected error during payment.");
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <div className="w-full max-w-6xl bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border-4 border-dashed border-blue-300 p-3">
        {/* Lottie Panel */}
        <div className="md:w-1/2 relative h-64 md:h-auto bg-[#EDF5FF] rounded-2xl shadow-lg">
          <Lottie
            animationData={rechargeAnim}
            loop
            autoplay
            className="w-full h-full object-cover"
          />
          <div className="absolute top-40 md:top-50 lg:top-75 right-6 md:right-8 lg:right-12 inset-0 bg-opacity-20 flex items-center justify-center">
            <h2 className="text-black md:text-2xl lg:text-3xl font-bold">
              Recharge
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:flex flex-col items-center justify-center px-2">
          <div className="h-full w-1 bg-gradient-to-b from-indigo-100 via-indigo-300 to-indigo-100 rounded-full" />
        </div>

        {/* Form Panel */}
        <div className="md:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-gray-700 mb-6 text-center">
            Recharge Wallet
          </h1>
          <form onSubmit={handlePayNow} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              />
            </div>
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                // onChange={(e) => setPhone(e.target.value)}
                onChange={(e) => {
                  const numberRegex = /^[0-9]*$/;
                  if (numberRegex.test(e.target.value)) {
                    setPhone(e.target.value);
                  }
                }}
                disabled={paymentSessionId !== null && phone.length === 13}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              />
            </div>
            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-gray-700 mb-2">
                Amount (INR)
              </label>
              <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              />
            </div>

            {/* Single Pay Now Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}