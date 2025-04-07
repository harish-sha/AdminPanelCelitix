import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";

export const HandleCampaignDetails = ({
    campaignDetails,
    setCampaignDetails,
    allAgents,
}) => {
    return (
        <div className="w-full p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1">
            <div className="mb-3">
                <AnimatedDropdown
                    id="selectAgent"
                    name="selectAgent"
                    label="Select Agent"
                    tooltipContent="Select your Agent "
                    tooltipPlacement="right"
                    options={allAgents?.map((agent) => ({
                        value: agent.agent_id,
                        label: agent.agent_name,
                    }))}
                    value={campaignDetails.agent}
                    onChange={(e) => {
                        setCampaignDetails({ ...campaignDetails, agent: e });
                    }}
                    placeholder="Select Agent"
                />
            </div>

            <div className="mb-3">
                <InputField
                    id="createCampaign"
                    name="createCampaign"
                    label="Campaign Name"
                    value={"inputValue"}
                    onChange={(e) => {
                        setCampaignDetails({ ...campaignDetails, campaignName: e });
                    }}
                    placeholder="Campaign Name"
                    tooltipContent="Your templatename should not contain spaces."
                    tooltipPlacement="right"
                />
            </div>
            <div className="mb-3">
                <AnimatedDropdown
                    id="selectRcsTemplate"
                    name="selectRcsTemplate"
                    label="Select RCS Template"
                    tooltipContent="Select RCS Template"
                    tooltipPlacement="right"
                    options={[{ value: "text", label: "Text" }]}
                    value={""}
                    onChange={(value) => {
                        // setSelectedTemplate(value);
                        // setTemplateDataNew(null);
                        // setFormData({});
                        // setImagePreview(null);
                        // setImageFile(null);
                        // setFileHeaders([]);
                    }}
                    placeholder="Select Template"
                />
            </div>
            {/* <div>
                {isFetching ? (
                    <UniversalSkeleton height="15rem" width="100%" />
                ) : (
                    templateDataNew && (
                        <TemplateForm
                            templateDataNew={templateDataNew}
                            onInputChange={(value, variable) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [variable]: value,
                                }))
                            }
                            onImageUpload={handleImageUpload}
                            selectedOption={selectedOption}
                            fileHeaders={fileHeaders}
                            selectedTemplateData={selectedTemplateData}
                            onUrlIndexChange={setUrlIndex}
                            setVarLength={setVarLength}
                        />
                    )
                )}
            </div> */}
        </div>
    );
};