const handleSearch = async () => {
    console.log("🔍 Applying Filters:");
    console.log({
        startDate: selectedDate,
        category: campaignCategory,
        type: campaignType,
        status: campaignStatus,
        campaignName: campaignName,
    });

    // Ensure `selectedDate` is always in a valid format
    let formattedFromDate = "";
    if (selectedDate) {
        const dateObj = new Date(selectedDate);
        if (!isNaN(dateObj.getTime())) {
            formattedFromDate = dateObj.toLocaleDateString("en-GB"); // DD/MM/YYYY format
        }
    } else {
        formattedFromDate = new Date().toLocaleDateString("en-GB"); // Default to today
    }

    const formattedToDate = new Date().toLocaleDateString("en-GB"); // Always today

    const filters = {
        fromQueDateTime: formattedFromDate,
        toQueDateTime: formattedToDate,
        campaignName: campaignName.trim(),
        template_category: campaignCategory || "all",
    };

    console.log("📤 Filter Params:", filters);

    setIsFetching(true);
    const data = await getWhatsappCampaignReport(filters);
    setFilteredData(Array.isArray(data) ? data : []);
    setIsFetching(false);
};
