async function handleFetchDetails(page = 0) {
  try {
    setIsLoading(true);

    const formattedFromDate = state.selectedDate
      ? moment(state.selectedDate).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");

    let status = "";
    let deliveryStatus = "";
    let selectedUser = state.selectedUser;

    const statusBased = ["failed", "submitted", "block", "busy"];
    const deliveryBased = ["read", "delivered", "undelivered"];

    if (statusBased.includes(state.log)) {
      status = state.log;
    } else if (deliveryBased.includes(state.log)) {
      deliveryStatus = state.log;
    }

    const payload = {
      fromDate: formattedFromDate,
      selectedUserId: selectedUser,
      toDate: formattedFromDate,
      mobile: "",
      page,
      pageSize: paginationModel.pageSize,
      source: "API",
      deliveryStatus,
      status,
    };

    // Fetch data from the API
    const res = await getListofSendMsg(payload);

    // Defensive check if 'res' and 'res.data' exist
    if (!res || !res.data) {
      console.error("Invalid response structure:", res);
      return toast.error("No data available or invalid response.");
    }

    setTotalPage(res?.total || 0);

    // Format the data if it exists
    const formattedData = Array.isArray(res.data)
      ? res?.data.map((item, index) => ({
          sn: index + 1,
          id: index + 1,
          ...item,
        }))
      : [];

    setData(formattedData);
  } catch (e) {
    console.error("Error fetching data", e);
    return toast.error("Error fetching data");
  } finally {
    setIsLoading(false);
  }
}


async function handleFetchDetails(page = 0) {
    try {
      // const payload = {
      //   mobile: "",
      //   page: 0,
      //   source: "",
      //   deliveryStatus: state.log,
      //   status: "",
      // };
      // later update with upper code

      setIsLoading(true);

      const formattedFromDate = state.selectedDate
        ? moment(state.selectedDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");

      let status = "";
      let deliveryStatus = "";

      const statusBased = ["failed", "submitted", "block", "busy"];
      const deliveryBased = ["read", "delivered", "undelivered"];

      if (statusBased.includes(state.log)) {
        status = state.log;
      } else if (deliveryBased.includes(state.log)) {
        deliveryStatus = state.log;
      }

      const payload = {
        fromDate: formattedFromDate,
        toDate: formattedFromDate,
        mobile: "",
        page,
        pageSize: paginationModel.pageSize,
        source: "API",
        deliveryStatus,
        status,
      };
      const res = await getListofSendMsg(payload);
      // const responseData = Array.isArray(res) ? res : [];
      // setTotalPage(5000);
      // // console.log(res);
      // setData(responseData);
      setTotalPage(res?.total || 0);

      const formattedData = Array.isArray(res.data)
        ? res?.data?.map((item, index) => ({
          sn: index + 1,
          id: index + 1,
          ...item,
        }))
        : [];

      // console.log("formatted data", formattedData);
      setData(formattedData);
    } catch (e) {
      // console.log(e);
      return toast.error("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }