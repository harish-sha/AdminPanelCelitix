async function handleVerifyNumberRequest() {
    try {
        const phoneRegex = /^\d{10}$/;

        if (!verifyNumber) {
            toast.error("Mobile number is required.");
            return;
        }

        // if (!phoneRegex.test(verifyNumber)) {
        //   toast.error("Invalid mobile number. Please enter a 10-digit number.");
        //   return;
        // }

        let payload = {
            userId: username,
            // password: password,
            mobileNo: verifyNumber,
            // domain: window.location.hostname,
            domain: basicDetails.domain,
        };

        if (!isForgotPassword) {
            payload = {
                ...payload,
                password: password,
            };
        }

        const res = isForgotPassword
            ? await forgotPassword(payload)
            : await requestOtp(payload);

        if (!res?.data?.status) {
            return toast.error(res?.msg || "Unable to send OTP");
        }

        toast.success("OTP Sent to your mobile number");
        setStep("verifynumberotp");
    } catch (error) {
        console.error("Error in handleVerifyNumberRequest:", error);
        toast.error("Something went wrong. Please try again.");
    }
}
