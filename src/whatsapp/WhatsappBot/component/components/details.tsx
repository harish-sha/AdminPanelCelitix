import UniversalButton from "@/components/common/UniversalButton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import React from "react";

export const Details = ({
  setDetails,
  details,
  handleSubmit,
  isUpdate,
}: {
  setDetails: React.Dispatch<React.SetStateAction<any>>;
  details: any;
  handleSubmit: () => void;
  isUpdate: Boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <AnimatedDropdown
        id="selecetWaba"
        name="selectWaba"
        label="Select WABA"
        tooltipContent="Select your whatsapp business account"
        tooltipPlacement="right"
        options={details?.waba?.map((waba) => ({
          value: waba.mobileNo,
          label: waba.name,
        }))}
        value={details?.selected}
        onChange={(e) => {
          setDetails((prev) => ({
            ...prev,
            selected: e,
          }));
        }}
      />
      <InputField
        id="botName"
        name="botName"
        label="Bot Name"
        tooltipContent="Select Bot Name"
        tooltipPlacement="right"
        value={details?.name}
        placeholder="Enter Bot Name"
        onChange={(e) => {
          setDetails((prev) => ({
            ...prev,
            name: e.target.value,
          }));
        }}
      />

      <UniversalButton
        id="saveBot"
        name="saveBot"
        label={`${isUpdate ? "Update" : "Save"}`}
        onClick={handleSubmit}
        style={{}}
      />
    </div>
  );
};
