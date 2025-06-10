import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InputField from "@/whatsapp/components/InputField";

export const HandleCampaignDetails = ({
  campaignDetails,
  setCampaignDetails,
  allAgents,
  allTemplates,
  setTemplateDetails,
  setVarList,
  setInputVariables,
  setVarLength,
  setCarVar,
}) => {
  return (
    <div>
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
            setCampaignDetails({
              ...campaignDetails,
              agent: e,
              templateSrno: "",
            });
            setTemplateDetails([]);
            setInputVariables([]);
            setVarList([]);
            setVarLength(0);
            setCarVar({
              length: 0,
              data: {},
            });
          }}
          placeholder="Select Agent"
        />
      </div>

      <div className="mb-3">
        <InputField
          id="createCampaign"
          name="createCampaign"
          label="Campaign Name"
          tooltipContent="Your templatename should not contain spaces."
          value={campaignDetails?.campaignName}
          onChange={(e) => {
            setCampaignDetails({
              ...campaignDetails,
              campaignName: e.target.value,
            });
          }}
          placeholder="Campaign Name"
          tooltipContent="Your templatename should not contain spaces."
          tooltipPlacement="right"
        />
      </div>
      <div className="mb-3">
        <DropdownWithSearch
          id="selectRcsTemplate"
          name="selectRcsTemplate"
          label="Select RCS Template"
          tooltipContent="Select RCS Template"
          tooltipPlacement="right"
          options={allTemplates?.map((template) => ({
            value: template.srno,
            label: template.templateName,
          }))}
          value={campaignDetails?.templateSrno}
          onChange={(value) => {
            setCampaignDetails({ ...campaignDetails, templateSrno: value });
            setTemplateDetails([]);
            setInputVariables([]);
            setVarList([]);
            setVarLength(0);
            setCarVar({
              length: 0,
              data: {},
            });
          }}
          placeholder="Select Template"
        />
      </div>
    </div>
  );
};
