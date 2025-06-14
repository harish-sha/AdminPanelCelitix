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

import React, { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import toast from "react-hot-toast";

function SelfRecharge() {
  const [cashfree, setCashfree] = useState(null);
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [paymentSessionId, setPaymentSessionId] = useState();

  useEffect(() => {
    const initializeSDK = async () => {
      const cfInstance = await load({ mode: "sandbox" });
      setCashfree(cfInstance);
    };
    initializeSDK();
  }, []);

  const createPaymentSession = async () => {
    if (!amount || !phone || !email || !name) {
      toast.error("Please fill all the details.");
      return;
    }

    const orderId = "order_" + Date.now();

    try {
      const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": "TEST430329ae80e0f32e41a393d78b923034", // Replace with yours
          "x-client-secret": "TESTaf195616268bd6202eeb3bf8dc458956e7192a85", // Replace with yours
          "x-api-version": "2022-09-01",
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: amount,
          order_currency: "INR",
          customer_details: {
            customer_id: phone,
            customer_email: email,
            customer_phone: phone,
            customer_name: name,
          },
          order_meta: {
            return_url: `https://yourdomain.com/payment-status?order_id=${orderId}`,
          },
        }),
      });

      const data = await response.json();

      if (data.payment_session_id) {
        setPaymentSessionId(data.payment_session_id);
        toast.success("Session created. Click 'Pay Now' to proceed.");
      } else {
        toast.error("Failed to create payment session.");
        console.error("Cashfree response:", data);
      }
    } catch (error) {
      console.error("Session creation error:", error);
      toast.error("Error creating payment session.");
    }
  };

  const doPayment = async () => {
    if (!cashfree || !paymentSessionId) {
      toast.error("No session found. Please generate session first.");
      return;
    }

    const checkoutOptions = {
      paymentSessionId,
      redirectTarget: "_modal",
    };

    const result = await cashfree.checkout(checkoutOptions);

    if (result.error) {
      console.log("User closed popup or error occurred", result.error);
      toast.error("Payment cancelled or failed.");
    } else if (result.paymentDetails) {
      console.log("Payment complete:", result.paymentDetails);
      toast.success("Payment Completed!");
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Recharge Wallet
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Amount (INR)
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col space-y-3">
        <button
          onClick={createPaymentSession}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Generate Payment Session
        </button>

        <button
          onClick={doPayment}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          id="renderBtn"
        >
          Pay Now
        </button>
      </div>
    </div>
  </div>
);

}

export default SelfRecharge;
