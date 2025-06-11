async function handleFlowBuild() {
  if (!flowName) {
    toast.error("Please enter a flow name");
    return;
  }

  const hasAtLeastOneComponent = tabs.some((tab) => tab.payload.length > 0);
  if (!hasAtLeastOneComponent) {
    toast.error("Please add at least one component before building the flow");
    return;
  }

  try {
    const payload = generatePayload(tabs);

    const params = {
      category: state?.selectCategories,
      waba: state?.selectedWaba,
      id: "",
      name: flowName,
    };

    setIsLoading(true);
    console.log("Calling saveFlow with:", params, payload);

    const res = await saveFlow(params, payload);
    console.log("Response from saveFlow:", res);

    // === 🔄 Handle Empty Response ===
    if (!res || (typeof res === "object" && Object.keys(res).length === 0)) {
      toast.error("Flow creation failed. Please try again.");
      return;
    }

    // === ❌ Backend explicitly returned error ===
    if (res.flag === false) {
      const backendError =
        res?.error_user_msg?.error?.error_user_msg ||
        res?.msg?.validation_errors?.[0]?.message ||
        "Something went wrong while creating the flow.";

      toast.error(backendError);
      return;
    }

    // === ✅ Flow created successfully ===
    if (res.flag === true && typeof res.msg === "string") {
      toast.success(res.msg);
      // navigate("/wwhatsappflows"); // uncomment when navigation is needed
      return;
    }

    // === ⚠️ JSON validation errors (not fatal) ===
    if (res.flag === true && res.msg?.validation_errors?.length > 0) {
      const firstError = res.msg.validation_errors[0]?.message;
      toast.error(firstError || "Flow JSON is not valid.");
      return;
    }

    // === 🛑 Fallback ===
    toast.error("Unexpected response. Please try again.");
  } catch (err) {
    console.error("Unexpected API error:", err);

    // Try to show user-friendly message if exists
    const fallbackMessage =
      err?.error_user_msg?.error?.error_user_msg ||
      err?.message ||
      "An unexpected error occurred. Please try again.";

    toast.error(fallbackMessage);
  } finally {
    setIsLoading(false);
  }
}
