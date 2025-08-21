// import { useState } from "react";
// import { cashfree } from "./Utilis"

// function SelfRecharge() {
//     const [sessionId, setSessionId] = useState("");

//     const handleRedirect = () => {
//       let checkoutOptions = {
//             paymentSessionId: sessionId,
//             returnUrl: "http://localhost:3000",
//         };
//         cashfree.checkout(checkoutOptions).then((result) => {
//             if(result.error){
//                 // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
//                 console.log("User has closed the popup or there is some payment error, Check for Payment Status");
//                 console.log(result.error);
//             }
//             if(result.redirect){
//                 // This will be true when the payment redirection page couldnt be opened in the same window
//                 // This is an exceptional case only when the page is opened inside an inAppBrowser
//                 // In this case the customer will be redirected to return url once payment is completed
//                 console.log("Payment will be redirected");
//             }
//             if(result.paymentDetails){
//                 // This will be called whenever the payment is completed irrespective of transaction status
//                 console.log("Payment has been completed, Check for Payment Status");
//                 console.log(result.paymentDetails.paymentMessage);
//             }
//         });
//     }

//     return (
//       <div className="session">
//         <h2>Session Id</h2>
//         <input value={sessionId} onChange={(e)=>setSessionId(e.target.value)}/>
//         <br/>
//         <div>
//           <button>Redirect</button>
//           <button>Open in frame</button>
//         </div>
//       </div>
//     );
// }
// export default SelfRecharge;

// import React, { useEffect, useState } from "react";
// import { load } from "@cashfreepayments/cashfree-js";
// import toast from "react-hot-toast";

// function SelfRecharge() {
//   const [cashfree, setCashfree] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [paymentSessionId, setPaymentSessionId] = useState();

//   useEffect(() => {
//     const initializeSDK = async () => {
//       const cfInstance = await load({ mode: "sandbox" });
//       setCashfree(cfInstance);
//     };
//     initializeSDK();
//   }, []);

//   const createPaymentSession = async () => {
//     if (!amount || !phone || !email || !name) {
//       toast.error("Please fill all the details.");
//       return;
//     }

//     const orderId = "order_" + Date.now();

//     try {
//       const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-client-id": "TEST430329ae80e0f32e41a393d78b923034", // Replace with yours
//           "x-client-secret": "TESTaf195616268bd6202eeb3bf8dc458956e7192a85", // Replace with yours
//           "x-api-version": "2022-09-01",
//         },
//         body: JSON.stringify({
//           order_id: orderId,
//           order_amount: amount,
//           order_currency: "INR",
//           customer_details: {
//             customer_id: phone,
//             customer_email: email,
//             customer_phone: phone,
//             customer_name: name,
//           },
//           order_meta: {
//             return_url: `https://yourdomain.com/payment-status?order_id=${orderId}`,
//           },
//         }),
//       });

//       const data = await response.json();

//       if (data.payment_session_id) {
//         setPaymentSessionId(data.payment_session_id);
//         toast.success("Session created. Click 'Pay Now' to proceed.");
//       } else {
//         toast.error("Failed to create payment session.");
//         console.error("Cashfree response:", data);
//       }
//     } catch (error) {
//       console.error("Session creation error:", error);
//       toast.error("Error creating payment session.");
//     }
//   };

//   const doPayment = async () => {
//     if (!cashfree || !paymentSessionId) {
//       toast.error("No session found. Please generate session first.");
//       return;
//     }

//     const checkoutOptions = {
//       paymentSessionId,
//       redirectTarget: "_modal",
//     };

//     const result = await cashfree.checkout(checkoutOptions);

//     if (result.error) {
//       console.log("User closed popup or error occurred", result.error);
//       toast.error("Payment cancelled or failed.");
//     } else if (result.paymentDetails) {
//       console.log("Payment complete:", result.paymentDetails);
//       toast.success("Payment Completed!");
//     }
//   };

//   return (
//   <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//     <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
//       <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
//         Recharge Wallet
//       </h2>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Full Name
//           </label>
//           <input
//             type="text"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your full name"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Enter your phone number"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Amount (INR)
//           </label>
//           <input
//             type="number"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount"
//             min="1"
//           />
//         </div>
//       </div>

//       <div className="mt-6 flex flex-col space-y-3">
//         <button
//           onClick={createPaymentSession}
//           className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
//         >
//           Generate Payment Session
//         </button>

//         <button
//           onClick={doPayment}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
//           id="renderBtn"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   </div>
// );

// }

// export default SelfRecharge;

// import React from 'react';

// export default function RechargeFormLandscape() {
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left graphic panel */}
//       <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 p-8 flex items-center justify-center">
//         {/* Replace this with your SVG, image or Lottie */}
//         <img
//           src="/assets/recharge-illustration.svg"
//           alt="Recharge Illustration"
//           className="max-w-full h-auto"
//         />
//       </div>

//       {/* Right form panel */}
//       <div className="md:w-1/2 bg-white p-8 flex items-center justify-center">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
//             Recharge Wallet
//           </h2>
//           <form className="space-y-6">
//             {[
//               { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
//               { id: 'email',    label: 'Email',     type: 'email', placeholder: 'Enter your email' },
//               { id: 'phone',    label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number' },
//               { id: 'amount',   label: 'Amount (INR)', type: 'number', placeholder: 'Enter amount' },
//             ].map(field => (
//               <div key={field.id}>
//                 <label htmlFor={field.id} className="block text-gray-700 mb-2">
//                   {field.label}
//                 </label>
//                 <input
//                   id={field.id}
//                   type={field.type}
//                   placeholder={field.placeholder}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                 />
//               </div>
//             ))}
//             <div className="flex flex-col gap-4 mt-4">
//               <button
//                 type="button"
//                 className="w-full bg-green-500 text-white rounded-lg py-3 font-semibold hover:bg-green-600 transition"
//               >
//                 Generate Payment Session
//               </button>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition"
//               >
//                 Pay Now
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import rechargeAnim from "../assets/animation/recharge.json";
import {
  rechargeCreateOrderCashFree,
  verifyRechargeStatus,
} from "@/apis/recharge/recharge";

export default function RechargeFullWidth() {
  const [cashfree, setCashfree] = useState(null);
  const [amount, setAmount] = useState("");
  const [addedGstAmount, setAddedGstAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [paymentSessionId, setPaymentSessionId] = useState(null);
  const [newOrderId, setNewOrderId] = useState();

  useEffect(() => {
    const amt = parseFloat(amount);

    if (!isNaN(amt)) {
      const gst = amt * 0.18;
      const total = amt + gst;
      setAddedGstAmount(total.toFixed(2));
    } else {
      setAddedGstAmount("");
    }
  }, [amount]);

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
          order_amount: addedGstAmount,
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
        setNewOrderId(res.orderId);

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

        const { error } = await cashfree.checkout({
          paymentSessionId,
          redirectTarget: "_modal",
        });
        // console.log("error", result);
        if (error) {
          return toast.error("Either Payment was aborted or something went wrong");
        }


        const rechargeStatus = await verifyRechargeStatus({
          order_id: newOrderId,
        });

        if (rechargeStatus?.status !== "received") {
          return toast.error("Payment Failed!");
        }
        toast.success("Payment successful!");

        setAmount("");
        setPhone("");
        setEmail("");
        setName("");
        // if (rechargeStatus?.status === "received") {
        // }
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
    <div className="min-h-[90vh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-6xl rounded-3xl border border-blue-200/70 bg-white/90 backdrop-blur-md shadow-xl p-4 sm:p-6">
        {/* Title */}
        <h1 className="text-4xl sm:text-4xl font-semibold text-blue-800 text-center mb-4">
          Recharge Wallet
        </h1>

        {/* Grid: stacks on mobile, side-by-side on md+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Lottie panel */}
          <div className="relative rounded-2xl bg-[#EDF5FF] shadow-md border border-blue-100 p-3 hidden md:hidden lg:block">
            <div className="rounded-xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] md:aspect-[5/4]">
              <Lottie
                animationData={rechargeAnim}
                loop
                autoplay
                className="h-full w-full"
              />
            </div>

            {/* overline badge */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white shadow-md border px-4 py-1.5 text-sm font-semibold text-gray-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Recharge
              </span>
            </div>
          </div>

          {/* Form panel */}
          <div className="rounded-2xl bg-white shadow-md border border-slate-200 p-4 sm:p-6">
            <form onSubmit={handlePayNow} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Phone Number (India)
                </label>
                <div className="flex gap-2">
                  <span className="select-none inline-flex items-center px-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-700">
                    +91
                  </span>
                  <input
                    id="phone"
                    inputMode="numeric"
                    type="tel"
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => {
                      // keep digits only, trim to 13
                      const v = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setPhone(v);
                    }}
                    maxLength={13}
                    pattern="^\d{0,13}$"
                    title="Enter up to 13 digits"
                    disabled={paymentSessionId !== null && phone.length === 13}
                    // required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                  />
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {phone.length}/10 digits
                </p>
              </div>
              {/* Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Amount (INR)
                  </label>
                  <input
                    id="amount"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    // required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Added GST Amount (INR)
                  </label>

                  <input
                    id="gstAmount"
                    type="number"
                    placeholder="GST added amount"
                    value={addedGstAmount}
                    // onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  transition bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Total (read-only) */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <span className="text-sm font-medium text-emerald-800">Total payable</span>
                    <span className="text-lg font-bold text-emerald-900">₹ {total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div> */}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition shadow-sm"
              >
                Pay Now
              </button>

              {/* Small help text */}
              <p className="text-[12px] text-slate-500 text-center">
                Payments are secured & encrypted
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
