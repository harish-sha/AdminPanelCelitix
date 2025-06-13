async function handleCustomDialogSubmithBtn() {
  if (selectedOption === "option1" && !dataToExport?.srno) {
    toast.error("Please select campaign");
    return;
  }

  // If "option2" logic is enabled (previously commented out), add error handling:
  // if (selectedOption === "option2" && !dataToExport?.customColumns) {
  //   toast.error("Please select custom columns");
  //   return;
  // }

  const name = campaignNames.find(
    (c) => c.srno === dataToExport?.srno
  )?.campaignName;

  const payload = {
    ...dataToExport,
    fromDate: dataToExport.fromDate
      ? new Date(dataToExport.fromDate).toISOString().split("T")[0]
      : "",
    toDate: dataToExport.toDate
      ? new Date(dataToExport.toDate).toISOString().split("T")[0]
      : "",
    type: selectedOption === "option1" ? 1 : 2,
    ...(selectedOption === "option1"
      ? { srno: dataToExport.srno, campaignName: name }
      : {}),
  };

  try {
    const res = await exportCampaignData(payload);

    // Check if msg includes the word "error" or "fail" (case insensitive)
    if (res.status && res.msg) {
      // If msg contains "error" or "fail", treat it as an error despite status being true
      if (res.msg.toLowerCase().includes("error") || res.msg.toLowerCase().includes("fail")) {
        toast.error(res.msg || "Something went wrong!");
        return;
      }

      // Otherwise, it's a success
      toast.success(res.msg);
    } else {
      // Handle case where status is true but msg does not indicate success
      toast.error(res.msg || "Something went wrong!");
      return;
    }

    // Reset state
    setDataToExport({
      fromDate: "",
      toDate: "",
      campaignName: "",
      srno: 0,
      isCustomField: 0,
      customColumns: "",
      type: "campaign",
    });
    setCampaignCheckboxStates("");
    setcustomCheckboxStates("");
    setVisibledialog(false);

    // Trigger download notification only if everything went fine
    triggerDownloadNotification();
  } catch (e) {
    console.error("Error in exportCampaignData:", e); // Log the error for debugging
    toast.error("Something went wrong. Please try again later.");
  }
}
