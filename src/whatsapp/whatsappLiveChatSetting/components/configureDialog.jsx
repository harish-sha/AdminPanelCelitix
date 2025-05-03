import UniversalButton from "@/components/common/UniversalButton";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { Variables } from "./Variable";
import { Preview } from "./preview";
import { useState } from "react";

export const ConfigureDialog = ({
  configureState,
  setconfigureState,
  basicDetails,
  setBasicDetails,
  handleSave,
  allTemplates,
  specificTemplate,
  variablesData,
  fileRef,
  setVariablesData,
  setSpecificTemplate,
}) => {
  const [fileData, setFileData] = useState({
    url: "",
    file: "",
  });
  return (
    <Dialog
      header="Configure"
      visible={configureState?.open}
      style={{ width: "60vw", height: "100dvh" }}
      onHide={() => setconfigureState((prev) => ({ open: false, type: "" }))}
      draggable={false}
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex gap-2 items-center border p-2 rounded-md">
            <RadioButton
              inputId="templateMessage"
              name="templateMessage"
              value="2"
              onChange={(e) => {
                setBasicDetails((prev) => ({
                  ...prev,
                  msgType: e.value,
                  message: "",
                }));
              }}
              checked={basicDetails?.msgType === "2"}
            />
            <label htmlFor="templateMessage"> Template</label>
          </div>
          <div className="flex gap-2 items-center border p-2 rounded-md">
            <RadioButton
              inputId="customMessage"
              name="customMessage"
              value="1"
              onChange={(e) => {
                setBasicDetails((prev) => ({
                  ...prev,
                  msgType: e.value,
                  mediaPath: "",
                  template: "",
                }));
                setVariablesData({
                  length: 0,
                  data: [],
                  input: [],
                });
                setSpecificTemplate({});
              }}
              checked={basicDetails?.msgType === "1"}
            />
            <label htmlFor="customMessage"> Custom</label>
          </div>
        </div>

        {basicDetails?.msgType === "1" && (
          <div className="mt-2">
            <UniversalTextArea
              label="Text Message"
              id="textMessage"
              name="textMessage"
              placeholder={"Type something..."}
              value={basicDetails?.message}
              onChange={(e) => {
                setBasicDetails((prev) => ({
                  ...prev,
                  message: e.target.value,
                }));
              }}
              className="w-full h-25 resize-none"
            />
          </div>
        )}

        {basicDetails?.msgType === "2" && (
          <div className="flex gap-2">
            <div className="w-[50%]">
              <DropdownWithSearch
                id="templateMessage"
                name="templateMessage"
                label="Select Template"
                options={allTemplates?.map((template) => ({
                  value: template.value,
                  label: template.label,
                }))}
                value={allTemplates?.find(
                  (temp) => temp.value == basicDetails?.template
                )}
                onChange={(e) => {
                  setBasicDetails((prev) => ({
                    ...prev,
                    template: e,
                  }));
                  setFileData({ url: "", file: "" });
                  // fileRef ? (fileRef.current.value = "") : null;
                  setVariablesData({
                    length: 0,
                    data: [],
                    input: [],
                  });
                }}
                className="w-full"
              />
              {basicDetails?.template && (
                <Variables
                  variablesData={variablesData}
                  setVariablesData={setVariablesData}
                  specificTemplate={specificTemplate}
                  fileRef={fileRef}
                  setBasicDetails={setBasicDetails}
                  fileData={fileData}
                  setFileData={setFileData}
                />
              )}
            </div>
            <div className="w-[50%]">
              <Preview
                specificTemplate={specificTemplate}
                variablesData={variablesData}
                basicDetails={basicDetails}
              />
            </div>
          </div>
        )}

        <UniversalButton
          label="Save"
          name="saveAction"
          id="saveAction"
          onClick={handleSave}
        />
      </div>
    </Dialog>
  );
};
