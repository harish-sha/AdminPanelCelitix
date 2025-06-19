import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomTooltip from "@/components/common/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import InputField from "@/components/layout/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export const VoiceNode = ({
  id,
  nodesInputData,
  setNodesInputData,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const [conditions, setConditions] = useState([
    {
      type: "",
      value: "",
      interval: "",
      comparison: "",
    },
  ]);
  function handleOptionAdd() {
    if (conditions.length >= 5) {
      return toast.error("You can add only 5 conditions");
    }
    setConditions((prev) => [
      ...prev,
      {
        type: "",
        value: "",
        interval: "",
        comparison: "",
      },
    ]);
  }

  function handleOptionInput(e: any, type: string, index: number) {
    const newOptions = [...conditions];
    newOptions[index][type] = e;
    setConditions(newOptions);
  }

  function handleOptionDelete(index: number) {
    if (conditions.length === 0) return;
    if (conditions.length === 1) {
      return;
    }

    const newOptions = [...conditions];
    newOptions.splice(index, 1);
    setConditions(newOptions);
  }

  useEffect(() => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        options: conditions,
      },
    }));
  }, [conditions]);

  useEffect(() => {
    const options = nodesInputData?.[id]?.options || [
      {
        type: "",
        value: "",
        interval: "",
      },
    ];
    setConditions(options);
  }, []);

  return (
    <>
      <div>
        <div className="w-full mt-2">
          <div className="flex justify-end">
            <button onClick={handleOptionAdd}>
              <AddIcon />
            </button>
          </div>
          <div className="flex  gap-2 mb-2">
            <h1 className="text-lg font-semibold mb-2">Node Conditions</h1>
            <CustomTooltip
              title={
                "Condition Type, Value and Interval are required to add a condition."
              }
              placement={"top"}
              arrow
            >
              <span>
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </span>
            </CustomTooltip>
          </div>

          <div className="space-y-2 ">
            {conditions?.map((option, index) => (
              <div
                className="flex gap-2 justify-center items-center space-y-5"
                key={index}
              >
                <div className="w-full flex flex-col gap-2">
                  <div className="flex gap-2">
                    <AnimatedDropdown
                      id="type"
                      name="type"
                      label={`Condition-${index + 1}-Type`}
                      value={conditions[index]?.type}
                      onChange={(e: string) => {
                        handleOptionInput(e, "type", index);
                      }}
                      options={[
                        {
                          label: "Delivered",
                          value: "delivered",
                        },
                      ]}
                    />
                    <AnimatedDropdown
                      id="value"
                      name="value"
                      label={`Condition-${index + 1}-Value`}
                      value={conditions[index]?.value}
                      onChange={(e: string) => {
                        handleOptionInput(e, "value", index);
                      }}
                      options={[
                        {
                          label: "Answer",
                          value: "answer",
                        },
                        {
                          label: "Dialed",
                          value: "dialed",
                        },
                        {
                          label: "Busy",
                          value: "busy",
                        },
                        {
                          label: "Not Available",
                          value: "not_available",
                        },
                        {
                          label: "DTMF",
                          value: "dtmf",
                        },
                      ]}
                    />
                    <AnimatedDropdown
                      id="interval"
                      name="interval"
                      label={`Condition-${index + 1}-Interval`}
                      value={conditions[index]?.interval}
                      onChange={(e: string) => {
                        handleOptionInput(e, "interval", index);
                      }}
                      options={[
                        {
                          label: "5",
                          value: "5",
                        },
                        {
                          label: "10",
                          value: "10",
                        },
                        {
                          label: "15",
                          value: "15",
                        },
                        {
                          label: "20",
                          value: "20",
                        },
                      ]}
                    />
                  </div>
                  <div className="flex gap-2">
                    <AnimatedDropdown
                      id="comparison"
                      name="comparison"
                      label={`Select Comparison Type`}
                      value={conditions[index]?.comparison}
                      onChange={(e: string) => {
                        handleOptionInput(e, "comparison", index);
                      }}
                      options={[
                        {
                          label: "Equal To (=)",
                          value: "equal_to",
                        },
                        {
                          label: "Greater Than (>)",
                          value: "greater_than",
                        },
                        {
                          label: "Less Than (<)",
                          value: "less_than",
                        },
                      ]}
                    />

                    <InputField
                      id="value"
                      name="value"
                      value={conditions[index]?.value}
                      onChange={(e: string) => {
                        handleOptionInput(e, "value", index);
                      }}
                      label={`Call Duration (in seconds)`}
                      maxLength={50}
                    />
                  </div>
                </div>

                {conditions.length > 1 && (
                  <Button
                    id="deleteInput"
                    name="deleteInput"
                    variant="destructive"
                    onClick={() => handleOptionDelete(index)}
                    className="mt-7"
                  >
                    <MdOutlineDeleteForever />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
