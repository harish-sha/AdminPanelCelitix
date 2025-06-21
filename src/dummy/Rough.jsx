// deleteFlow
async function handleDeleteFlow() {
  const { flowId } = currentRow; // Get the flowId from currentRow (which is set in handleDelete)

  console.log("flow id", flowId); // Log the flowId to verify

  const data = {
    selectedFlow: flowId, // Pass flowId directly
  };

  console.log("data", data);

  try {
    setIsFetching(true);

    // Make the API call to delete the flow
    const res = await deleteFlow(data);

    setFlowId(res); // Set response data

    console.log(res);

    // Check if the flow was in "Draft" status
    if (currentRow?.status === "Draft") {
      toast.success("Flow deleted successfully");
    }

    setVisible(false); // Close the dialog/modal after successful deletion
  } catch (error) {
    console.log(error);
    toast.error("Flow deletion failed");
  } finally {
    setIsFetching(false); // Stop loading state
  }
}
