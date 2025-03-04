const handleAssign = async (row) => {
    if (!row || !row.id) {
        toast.error("No agent selected.");
        return;
    }

    setSelectedAgentId(row.id);
    setSelectedAgentName(row.name);
    setManageAssign(true);
    setIsLoading(true);
    console.log("agent select for assign", row);

    try {
        // Fetch assigned templates for the selected agent
        const response = await getAssignedTemplatesByAgentId(row.id);

        if (response?.statusCode === 200 && response.data.length > 0) {
            const formattedAssignments = await Promise.all(
                response.data.map(async (entry) => ({
                    wabaSrno: entry.wabaSrNo,
                    templates: entry.templates.map((t) => ({
                        sr_no: t.templateSrNo,
                        template_name: `Template ${t.templateSrNo}`, // Placeholder name, update with real data
                    })),
                    templateList: await getTemplateList(entry.wabaSrNo), // Fetch available templates for this WABA
                }))
            );

            console.log("Assigned Templates Loaded:", formattedAssignments);
            setWabaTemplates(formattedAssignments);
        } else {
            console.log("No assigned templates found, initializing empty pair.");
            setWabaTemplates([{ wabaSrno: null, templates: [], templateList: [] }]);
        }
    } catch (error) {
        console.error("Error fetching assigned templates:", error);
        setWabaTemplates([{ wabaSrno: null, templates: [], templateList: [] }]);
    } finally {
        setIsLoading(false);
    }
};
