import React, { useState } from "react";
import ObdManageIntegration from "../obdmanageinteration/components/ObdManageInteration";

import InputField from "../../components/layout/InputField";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { Dialog } from "primereact/dialog";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";

const ObdIntegration = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [integrationName, setIntegrationName] = useState("");
  const [status, setStatus] = useState("");
  const [cta, setCta] = useState("");
  const [template, setTemplate] = useState("");
  const [addIntegration, setAddIntegration] = useState([]);
  const [savebtn, setSaveBtn] = useState("");

  const addIntegrations = () => {
    setAddIntegration((prev) => [...prev, { id: Date.now(), value: "" }]);
  };

  const handleIntegrationChange = (id, newValue) => {
    setAddIntegration((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? { ...integration, value: newValue }
          : integration
      )
    );
  };

  const deleteIntegration = (id) => {
    setAddIntegration((prev) =>
      prev.filter((integration) => integration.id !== id)
    );
    try {
      console.log(integrationName);
      toast.success("Integration deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
     
        <div className="flex flex-wrap gap-2 items-end justify-start align-middle pb-5 w-full mt-4" >
          <h1 className=" font-semibold text-2xl">Integration</h1>
          <div className="w-max-content flex-auto justify-items-end">
          <UniversalButton
            id="obdintegrationbtn"
            name="obdintegrationbtn"
            label="Add New Integration"
            placeholder="Add New Integration"
            onClick={() => setIsVisible(true)}
          />
        </div>
        
      </div>

      <Dialog
        visible={isVisible}
        onHide={() => setIsVisible(false)}
        className="lg:w-[50rem] md:w-[40rem] w-[17rem]"
        draggable={false}
      >
        <div className="flex flex-wrap items-center ">
          <div className="flex w-100 justify-center items-center">
            <InputField
              label="Integration Name"
              value={integrationName}
              onChange={(e) => setIntegrationName(e.target.value)}
              type="text"
              placeholder="Enter integration name"
            />
          </div>
          <div className="flex flex-wrap gap-3  mt-4">
            <div className="w-full  sm:w-56">
              <AnimatedDropdown
                label="Status"
                placeholder="Status"
                id="integrationstatus"
                name="integrationstatus"
                options={[
                  { value: "On Success", label: "On Success" },
                  { value: "On Failure", label: "On Failure" },
                  { value: "DTMF Response", label: "DTMF Response" },
                ]}
                value={status}
                onChange={(value) => setStatus(value)}
              />
            </div>

            <div className="w-full sm:w-56">
              <AnimatedDropdown
                label="CTA"
                placeholder="CTA"
                id="integrationcta"
                name="integrationcta"
                options={[
                  { value: "CTA", label: "CTA" },
                  { value: "SMS", label: "SMS" },
                  { value: "Voice", label: "Voice" },
                  { value: "URL", label: "URL" },
                  { value: "Call Latch", label: "Call Latch" },
                ]}
                value={cta}
                onChange={(value) => setCta(value)}
              />
            </div>
            <div className="w-full sm:w-56">
              <AnimatedDropdown
                label="Template"
                placeholder="Template"
                id="integrationtemplate"
                name="integrationtemplate"
                options={[
                  { value: "Template", label: "Template" },
                  { value: "Template 1", label: "Template 1" },
                  { value: "Template 2", label: "Template 2" },
                  { value: "Template 3", label: "Template 3" },
                  { value: "Template 4", label: "Template 4" },
                ]}
                value={template}
                onChange={(value) => setTemplate(value)}
              />
            </div>

            <div className="flex flex-wrap items-end ">
              <AddCircleOutlineIcon
                className="text-gray-950 hover:text-gray-900"
                onClick={addIntegrations}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 ">
          {addIntegration.map((entry, index) => (
            <div className="flex flex-wrap gap-3  items-center  mt-4 ">
              <div
                className="flex flex-wrap gap-3 items-center "
                key={entry.id}
              >
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    label="Status"
                    name="integrationstatus"
                    id={`integrationStatus-${entry.id}`}
                    placeholder="Status"
                    value={entry.value}
                    options={[
                      { value: "On Success", label: "On Success" },
                      { value: "On Failure", label: "On Failure" },
                      { value: "DTMF Response", label: "DTMF Response" },
                    ]}
                    onChange={(value) =>
                      handleIntegrationChange(entry.id, value)
                    }
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    label="CTA"
                    placeholder="CTA"
                    id="integrationcta"
                    name="integrationcta"
                    options={[
                      { value: "CTA", label: "CTA" },
                      { value: "SMS", label: "SMS" },
                      { value: "Voice", label: "Voice" },
                      { value: "URL", label: "URL" },
                      { value: "Call Latch", label: "Call Latch" },
                    ]}
                    value={entry.value}
                    onChange={(value) =>
                      handleIntegrationChange(entry.id, value)
                    }
                  />
                </div>

                <div className="w-full  sm:w-56">
                  <AnimatedDropdown
                    label="Template"
                    placeholder="Template"
                    id="integrationtemplate"
                    name="integrationtemplate"
                    options={[
                      { value: "Template", label: "Template" },
                      { value: "Template 1", label: "Template 1" },
                      { value: "Template 2", label: "Template 2" },
                      { value: "Template 3", label: "Template 3" },
                      { value: "Template 4", label: "Template 4" },
                    ]}
                    value={entry.value}
                    onChange={(value) =>
                      handleIntegrationChange(entry.id, value)
                    }
                  />
                </div>
              </div>

              <button
                className="rounded-2xl p-1.5 mt-5 hover:bg-gray-200 cursor-pointer"
                onClick={() => deleteIntegration(entry.id)}
              >
                <MdOutlineDeleteForever
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  size={20}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-row mt-5 justify-center gap-2">
          <UniversalButton
            id="obdintegrationsavebtn"
            name="obdintegrationsavebtn"
            label="Save"
            placeholder="Save"
            value={savebtn}
            onClick={() => setSaveBtn(value)}
          />
        </div>
      </Dialog>

      <div className="  w-full">
        <ObdManageIntegration />
      </div>
    </>
  );
};

export default ObdIntegration;
