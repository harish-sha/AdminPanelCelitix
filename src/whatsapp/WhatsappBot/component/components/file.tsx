import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import InputField from "@/whatsapp/components/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { Label } from "@/components/ui/label";

export const FileNodeContent = ({ accept }: { accept: string }) => {
  const [value, setValue] = useState("");

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    setValue(URL.createObjectURL(file));
  };

  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 text-black">
        <Label htmlFor="uplaodfile">Upload File</Label>
        <Input
          type="file"
          id="uplaodfile"
          name="uplaodfile"
          onChange={handleFileUpload}
          accept={`${accept}/*`}
          required
        />
      </div>
      {value && <iframe src={value}></iframe>}
      <InputField
        label="Caption text"
        id="captionText"
        name="captionText"
        placeholder="Enter Caption Text"
        value={""}
        onChange={() => {}}
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
