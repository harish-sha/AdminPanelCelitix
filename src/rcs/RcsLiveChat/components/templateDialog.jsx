import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { Dialog } from "primereact/dialog";
import React from "react";
import { Preview } from "./templatePreview";
import UniversalButton from "@/components/common/UniversalButton";

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
  handleSendTemplateMessage,
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
                templateName: templateState.all.find((item) => item.srno === e)
                  .templateName,
              }));
            }}
            value={templateState.selected}
          />

          <UniversalButton
            id="sendTemplateMessage"
            name="sendTemplateMessage"
            label="Send Template Message"
            onClick={handleSendTemplateMessage}
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
