const handleSubmitCampaign = async () => {
    if (!inputValue) {
        toast.error("Please enter campaign name!");
        return;
    }
    // if (!selectedWaba) {
    //     toast.error("Please fill all required fields.");
    //     return;
    // }
    // if (!selectedTemplate) {
    //     toast.error("Please fill all required fields.");
    //     return;
    // }

    const campaignData = {
        mobileIndex: "0",
        ContentMessage: formData?.message || "",
        wabaNumber: selectedWaba,
        campaignName: inputValue,
        templateSrno: templateDataNew?.id || "",
        templateName: selectedTemplate,
        templateLanguage: templateDataNew?.language || "en",
        templateCategory: templateDataNew?.category || "Marketing",
        templateType: templateDataNew?.type || "default",
        url: "",
        variables: [],
        cardsVariables: [],
        ScheduleCheck: "0",
        imgCard: imagePreview ? [imagePreview] : [],
        xlsxpath: "",
        totalRecords: "5",
        attachmentfile: "",
        urlValues: "",
        urlIndex: 0,
        isShortUrl: 0,
        isGroup: 1,
        countryCode: 91,
        scheduleDateTime: "0",
        groupValues: "-1",
    };

    try {
        setSending(true);
        console.log("🚀 Sending API Request:", campaignData);

        const response = await sendWhatsappCampaign(campaignData);

        if (response?.status) {
            toast.success("Campaign added successfully!");

            setInputValue("");
            setSelectedTemplate("");
            setTemplateDataNew(null);
            setImagePreview(null);
            setFormData({});
        } else {
            toast.error(response?.msg || "Failed to send campaign.");
        }
    } catch (error) {
        toast.error("Error sending campaign.");
        console.error("❌ API Error:", error);
    } finally {
        setSending(false);
    }


    // if (response?.status) {
    //     toast.success("Campaign added successfully!");
    //     setTimeout(() => navigate("/campaigns"), 2000); 
    // }
};