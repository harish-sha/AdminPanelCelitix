import UniversalButton from "@/components/common/UniversalButton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import React from "react";

export const Details = ({
  setDetails,
  details,
  handleSubmit,
  isUpdate,
  setIsSettingBtnDisables,
}: {
  setDetails: React.Dispatch<React.SetStateAction<any>>;
  setIsSettingBtnDisables: React.Dispatch<React.SetStateAction<any>>;
  details: any;
  handleSubmit: (isClose: Boolean) => void;
  isUpdate: Boolean;
}) => {
  return (
    <div className="flex flex-col gap-2 border rounded-md p-3">
      <AnimatedDropdown
        id="selecetWaba"
        name="selectWaba"
        label="Select WABA"
        placeholder="Select WABA"
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
          setIsSettingBtnDisables(false);

          if (!e) {
            setIsSettingBtnDisables(true);
          }
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

      {/* <UniversalButton
        id="saveBot"
        name="saveBot"
        label={`${isUpdate ? "Update" : "Save"}`}
        onClick={handleSubmit}
        style={{}}
      /> */}
      <UniversalButton
        id="saveBot"
        name="saveBot"
        label={`${isUpdate ? "Update" : "Save"}`}
        onClick={() => handleSubmit(false)}
        style={{}}
      />

      <UniversalButton
        id="saveBot"
        name="saveBot"
        label={`${isUpdate ? "Update" : "Save"} and Exit`}
        onClick={handleSubmit}
        style={{}}
      />
    </div>
  );
};
