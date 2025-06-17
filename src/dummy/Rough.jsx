const handleCancelConfirm = async (srno) => {
  if (!srno) {
    toast.error("SRNO is missing. Cannot cancel the campaign.");
    return;
  }

  try {
    setIsFetching(true);

    // Call the cancel campaign API
    const result = await cancelCampaign({ srno });

    if (result) {
      toast.success("Campaign Cancelled successfully");

      // Close the dialog after a successful cancellation
      setVisible(false);

      // Refresh the data by calling the fetch function again
      fetchScheduleCampaignData(currentPage);
    } else {
      toast.error("Failed to cancel campaign.");
    }
  } catch (error) {
    console.error("Error cancelling campaign:", error);
    toast.error("Error cancelling campaign");
  } finally {
    setIsFetching(false);
  }
};
