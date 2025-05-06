import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import React from "react";

export const TextNodeContent = () => {
  return (
    <div className="flex flex-col gap-2">
      <InputField
        label="User ID"
        id="useridcreate"
        name="useridcreate"
        placeholder="Enter User id"
        value={""}
        onChange={()=>{}}
      />
      <AnimatedDropdown
        id="selectVaribleDropdown"
        name="selectVaribleDropdown"
        label="Select Variable"
        options={[{ label: "Variable 1", value: "variable1" }]}
        onChange={() => {}}
      />
    </div>
  );
};
