async function handleSendOtp() {
  // Validate inputs: userId and mobileNo
  if (!forgotPassState.userId || !forgotPassState.mobileNo) {
    return toast.error("Enter email and phone number");
  }

  try {
    const res = await forgotPassword(forgotPassState);

    // Debugging: Check the response status
    console.log("Backend Response:", res);

    // Check if the response has status false (invalid userId or mobile number)
    if (!res?.data?.status) {
      // Display the error message from the backend (Invalid Mobile Number)
      toast.error(res?.data?.msg || "Either user id or mobile number is incorrect");
      return; // Prevent the rest of the code from running and stop further steps
    }

    // If status is true, show success and move to the next step
    toast.success(res?.data?.msg || "OTP has been sent successfully.");
    
    // Moving to step 3
    setStep(3); // This should only be reached if status is true

  } catch (e) {
    console.error(e);
    toast.error("Unable to send OTP");
  }
}
