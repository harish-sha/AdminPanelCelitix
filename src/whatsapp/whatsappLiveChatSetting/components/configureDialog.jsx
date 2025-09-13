import UniversalButton from "@/components/common/UniversalButton";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import InputField from "../../components/InputField";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { Variables } from "./Variable";
import { Preview } from "./preview";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { getAgentList } from "@/apis/Agent/Agent";

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
  handle15MinTime,
  setFileData,
  fileData,
}) => {
  // const [fileData, setFileData] = useState({
  //   url: "",
  //   file: "",
  // });
  const [agent, setallAgents] = useState([]);

  const [minuteInput, setMinuteInput] = useState("");
  const [lastSetMinute, setLastSetMinute] = useState("");

  const handleSetMinute = async () => {
    if (!basicDetails.timeout || Number(basicDetails.timeout) <= 0) {
      toast.error("Please enter a valid number of minutes");
      return;
    }
    await handle15MinTime(minuteInput);
    setLastSetMinute(minuteInput);
    toast.success(`Response time set to ${minuteInput} minutes`);
    // setMinuteInput("");
  };


  const templateOptions = [
    // { value: null, label: "Please select a template", disabled: true, hidden: true },
    ...(allTemplates?.map((template) => ({
      value: template.value,
      label: template.label,
    })) || []),
  ];

  useEffect(() => {
    async function handleFetchAgents() {
      try {
        const res = await getAgentList();
        const data = res?.data?.map((agent) => ({
          value: agent?.sr_no,
          label: agent?.name,
        }));
        setallAgents(data);
      } catch (e) {
        toast.error("Error Fetching Agents");
      }
    }

    handleFetchAgents();
  }, []);


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
            <label htmlFor="customMessage">Custom</label>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="w-full">
              <DropdownWithSearch
                id="templateMessage"
                name="templateMessage"
                label="Select Template"
                options={templateOptions}
                value={basicDetails.template ?? null}
                onChange={(selected) => {
                  setBasicDetails((prev) => ({
                    ...prev,
                    template: selected,   // selected is the full {value,label} object
                  }));
                  setFileData({ url: "", file: "" });
                  setVariablesData({ length: 0, data: [], input: [] });
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
            <div className="w-full">
              <Preview
                specificTemplate={specificTemplate}
                variablesData={variablesData}
                basicDetails={basicDetails}
              />
            </div>
          </div>
        )}

        <div>
          {configureState?.type === "agent_assign_message" && (
            <div>
              <h1>Choose an Agent</h1>
              <AnimatedDropdown
                id="agent"
                name="agent"
                options={agent}
                onChange={(e) => {
                  setBasicDetails((prev) => ({
                    ...prev,
                    agent: e,
                  }));
                }}
                value={basicDetails?.agent}
              />
            </div>
          )}
        </div>
        {configureState?.type === "15_minutes_message" && (
          <div className="shadom-md p-3 bg-gray-100 rounded-md w-full flex flex-row gap-5">
            <div className="w-46">
              <InputField
                label="Set No Response Time: "
                tooltipContent="Enter only minutes"
                value={basicDetails.timeout}
                onChange={(e) =>
                  setBasicDetails((prev) => ({
                    ...prev,
                    timeout: e.target.value,
                  }))
                }
              />
              {lastSetMinute && (
                <div className="text-green-600 text-xs font-semibold mt-1">
                  Last set: {lastSetMinute} minutes
                </div>
              )}
            </div>
            <div className="w-25 mt-6">
              <UniversalButton label="Set" onClick={handleSetMinute} />
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
