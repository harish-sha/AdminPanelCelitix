import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { Dialog } from "primereact/dialog";
import React from "react";
import { Preview } from "./templatePreview";
import UniversalButton from "@/components/common/UniversalButton";
import { VariableManager } from "./templateVariable";

export const TemplateDialog = ({
  isTemplateMessage,
  setIsTemplateMessage,
  setTemplateDetails,
  templateState,
  setTemplateState,
  handleSendTemplateMessage,
  templateDetails,
  varList,
  setVarList,
  varLength,
  setInputVariables,
  inputVariables,
  carVar,
  selectedIndex,
  setSelectedIndex,
  carVarInput,
  setCarVarInput,
  headers,
  selectedOption,
  btnvarLength,
  setBtnVarList,
  btnvarList,
  setBtnInputVariables,
  btninputVariables,
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
      <div className="w-full grid grid-cols-3 gap-2 h-full">
        <div className="col-span-2 w-full h-full">
          <div className="mb-4 flex flex-col items-center justify-between w-full">
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
                  templateName: templateState.all.find(
                    (item) => item.srno === e
                  )?.templateName,
                }));
              }}
              value={templateState.selected}
            />

            <div className="w-full mt-2">
              <VariableManager
                templateDetails={templateDetails}
                varLength={varLength}
                setVarList={setVarList}
                varList={varList}
                setInputVariables={setInputVariables}
                inputVariables={inputVariables}
                carVar={carVar}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                carVarInput={carVarInput}
                setCarVarInput={setCarVarInput}
                btnvarLength={btnvarLength}
                setBtnVarList={setBtnVarList}
                btnvarList={btnvarList}
                setBtnInputVariables={setBtnInputVariables}
                btninputVariables={btninputVariables}
              />
            </div>
          </div>
        </div>

        <Preview
          templateDetails={templateDetails}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          inputVariables={inputVariables}
        />
      </div>
      <div className="flex items-center justify-center w-full mt-4">
        <UniversalButton
          id="sendTemplateMessage"
          name="sendTemplateMessage"
          label="Send Template Message"
          onClick={handleSendTemplateMessage}
        />
      </div>
    </Dialog>
  );
};
