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
import { rechargeCreateOrderCashFree, verifyRechargeStatus } from "@/apis/recharge/recharge";

export default function RechargeFullWidth() {
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
        }
        const res = await rechargeCreateOrderCashFree(payload)
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

        await cashfree.checkout({
          paymentSessionId,
          redirectTarget: "_modal",
        });
        const rechargeStatus = await verifyRechargeStatus({
          order_id: orderId,
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
            <h2 className="text-black md:text-2xl lg:text-3xl font-bold">Recharge</h2>
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
