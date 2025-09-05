import {
  getAllBot,
  getMainJson,
  getWhatsappFlow,
} from "@/apis/whatsapp/whatsapp";
import InputField from "@/components/layout/InputField";
import { Button } from "@/components/ui/button";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InputVariable from "@/whatsapp/whatsappLaunchCampaign/components/InputVariable";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import { Dialog } from "primereact/dialog";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalButton from "@/components/common/UniversalButton";
import { add } from "date-fns";

export const Flow = ({
  id,
  nodesInputData,
  setNodesInputData,
  addVariable,
  setIsVisible,
  allVariables,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  addVariable: (data: String) => void;
  setIsVisible: React.Dispatch<React.SetStateAction<{}>>;
  allVariables: any[];
}) => {
  const [allFlows, setAllFlows] = React.useState([]);
  const [flowLabelDropdown, setFlowLabelDropdown] = React.useState([]);

  const [isStoredVariable, setIsStoredVariable] = React.useState(false);
  const [storedVariable, setStoredVariable] = React.useState([
    {
      paramName: "",
      varName: "",
    },
  ]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedVariable, setSelectedVariable] = React.useState("");

  useEffect(() => {
    async function handleFetchAllFlows() {
      try {
        const res = await getWhatsappFlow();
        const publishedFlows = res.filter(
          (flow) => flow.status === "PUBLISHED"
        );
        setAllFlows(res);
      } catch (e) {
        toast.error("Error while fetching flows");
      }
    }
    handleFetchAllFlows();
  }, []);

  useEffect(() => {
    if (!nodesInputData[id]?.flowSrno) return;
    async function handleFetchGetMainJson() {
      try {
        const res = await getMainJson(nodesInputData[id]?.flowSrno);
        const parsedJson = JSON.parse(res?.data[0]?.mainJson);

        const arr = [];
        parsedJson?.screens?.forEach((screen: any) => {
          const { layout } = screen;

          layout?.children?.forEach((item: any) => {
            if (!item?.name) return;
            arr.push({
              value: item?.name,
              label: item?.name,
            });
          });
        });
        setFlowLabelDropdown(arr);
      } catch (e) {
        toast.error("Error while fetching main json");
      }
    }
    handleFetchGetMainJson();
  }, [nodesInputData[id]?.flowSrno]);

  function handleStoredVariable(e: any, index: number, type: string) {
    const allVariable = [...storedVariable];
    allVariable[index][type] = e;
    setStoredVariable(allVariable);
  }

  function addStoredVariable() {
    if (storedVariable.length >= flowLabelDropdown.length) return;
    setStoredVariable((prev) => [...prev, { paramName: "", varName: "" }]);
  }

  function handleSaveNodeData() {
    let isError = false;
    // storedVariable.forEach(({ paramName, varName }) => {
    //   if (!varName) {
    //     isError = true
    //   };
    //   if (!paramName) {
    //     isError = true
    //   }
    //   addVariable(varName);
    // });
    for (let i = 0; i < storedVariable.length; i++) {
      const { paramName, varName } = storedVariable[i];
      if (!varName) {
        return toast.error("Please enter variable name at index: " + i);
      }
      if (!paramName) {
        return toast.error("Please enter param name at index: " + i);
      }
      addVariable(varName);
    }
    // if (isError) return;
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        storedVariable,
      },
    }));
    setIsVisible(false);
  }

  function handleInputVariable(e) {
    const index = selectedIndex;
    const allVariable = [...storedVariable];
    allVariable[index]["varName"] = e;
    setStoredVariable(allVariable);
    setSelectedVariable(e);
  }

  return (
    <>
      <DropdownWithSearch
        id="flows"
        name="flows"
        label="Select Flow"
        options={allFlows.map((flow) => ({
          value: flow.srNo,
          label: flow.flowName,
        }))}
        value={nodesInputData[id]?.flowSrno}
        onChange={(e) => {
          const flow = allFlows.find((flow) => flow.srNo === e);
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              flowSrno: e,
              screenId: flow?.screensId,
              flowName: flow?.flowName,
              flowId: String(flow?.flowId || ""),
            },
          }));
        }}
        disabled={false}
        placeholder="Select a flow"
      />
      <InputField
        id="bodyText"
        name="bodyText"
        label="Body Text"
        type="text"
        placeholder="Enter body text"
        value={nodesInputData[id]?.bodyText}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              bodyText: e.target.value,
            },
          }));
        }}
      />

      <InputField
        id="buttonText"
        name="buttonText"
        label="Button Text"
        type="text"
        placeholder="Enter body text"
        value={nodesInputData[id]?.buttonText}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              buttonText: e.target.value,
            },
          }));
        }}
      />

      <div className="mt-2">
        <button onClick={addStoredVariable} className="flex items-center ">
          <AddIcon />
          <p className="ml-2 text-sm">Add Variable</p>
        </button>
      </div>
      <div className="w-full space-y-2">
        {storedVariable.map((item, index) => (
          <div className="flex gap-2 w-full" key={index}>
            <div className="w-1/2">
              <DropdownWithSearch
                id="storedVariable"
                name="storedVariable"
                label="Stored Variable"
                options={flowLabelDropdown}
                value={storedVariable[index]?.paramName}
                onChange={(e) => {
                  handleStoredVariable(e, index, "paramName");
                }}
                disabled={false}
                placeholder="Select a variable"
              />
            </div>

            <div className="space-y-2">
              <InputField
                id="variableName"
                label="Variable Name"
                name="variableName"
                value={storedVariable[index]?.varName}
                onChange={(e) => {
                  handleStoredVariable(e.target.value, index, "varName");
                }}
                placeholder="Enter variable name"
              />

              <div className="flex justify-end">
                <button
                  className=" border bg-black text-white rounded-md p-2"
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedIndex(index);
                  }}
                >
                  Add Variable
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSaveNodeData}>Save</Button>

      <Dialog
        header="Add Variable"
        visible={isOpen}
        onHide={() => {
          setIsOpen(false);
          setSelectedIndex(null);
          setSelectedVariable(null);
        }}
        draggable={false}
      >
        <div className="w-[30rem]">
          <AnimatedDropdown
            id="selectVariable"
            name="selectVariable"
            label="Select Variable"
            onChange={(e) => {
              handleInputVariable(e);
              setSelectedVariable(e);
            }}
            value={selectedVariable}
            options={allVariables?.map((variable) => ({
              value: variable,
              label: variable,
            }))}
          />
        </div>
        <div className="mt-2">
          <UniversalButton
            id="addVariable"
            name="addVariable"
            label="Add Variable"
            type="submit"
            onClick={() => {
              setIsOpen(false);
              setSelectedIndex(null);
              setSelectedVariable(null);
            }}
            style={{}}
          />
        </div>
      </Dialog>
    </>
  );
};
