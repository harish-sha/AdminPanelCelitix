import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { Dialog } from "primereact/dialog";
import React from "react";
import { Preview } from "./templatePreview";

export const TemplateDialog = ({
  isTemplateMessage,
  setIsTemplateMessage,
  templateDetails,
  setTemplateDetails,
  templateState,
  setTemplateState,
  selectedIndex,
  setSelectedIndex,
  inputVariables,
}) => {
  return (
    <Dialog
      header="Send Template Message"
      visible={isTemplateMessage}
      //   style={{ width: "35rem" }}
      onHide={() => {
        setIsTemplateMessage(false);
      }}
      draggable={false}
    >
      <div className="w-full grid grid-cols-3 gap-2">
        <div className="col-span-2 w-full">
          <AnimatedDropdown
            id="template"
            name="template"
            options={templateState.all.map((item, i) => ({
              value: item.srno,
              label: item.templateName,
            }))}
            onChange={(e) => {
              setTemplateState((prev) => ({
                ...prev,
                selected: e,
              }));
            }}
            value={templateState.selected}
          />
        </div>

        <Preview
          templateDetails={templateDetails}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          inputVariables={inputVariables}
        />
      </div>
    </Dialog>
  );
};
