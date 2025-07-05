import React, { useState, useEffect } from "react";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import UniversalButton from "../../components/UniversalButton";
import { Dialog } from "primereact/dialog";
import { useDispatch } from "react-redux";
import { updateFlowItem } from "../redux/features/FlowSlice";
import InputField from "../../components/InputField";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import toast from "react-hot-toast";


const IfElseBlock = ({ openIfElse, setOpenIfElse, onSave, selectedItem }) => {

  const [selectedCondition, setSelectedCondition] = useState();
  const [selectedThenComponent, setSelectedThenComponent] = useState();
  const [selectedElseComponent, setSelectedElseComponent] = useState();
  const [value, setValue] = useState("");
  const [condition, setCondition] = useState();
  const [thenComponents, setThenComponents] = useState();
  const [elseComponents, setElseComponents] = useState();
  const [componentTree, setComponentTree] = useState({});
  const [thenBranchText, setThenBranchText] = useState("");
  const [elseBranchText, setElseBranchText] = useState("");

  //------------- input components start-------------------

  const [thenInputLabel, setThenInputLabel] = useState("");
  const [thenInputType, setThenInputType] = useState("");
  const [thenInputPlaceholder, setThenInputPlaceholder] = useState("");
  const [thenInputError, setThenInputError] = useState("");
  const [thenMinLength, setThenMinLength] = useState("");
  const [thenMaxLength, setThenMaxLength] = useState("");
  const [thenIsRequired, setThenIsRequired] = useState(false);

  const [elseInputLabel, setElseInputLabel] = useState("");
  const [elseInputType, setElseInputType] = useState("");
  const [elseInputPlaceholder, setElseInputPlaceholder] = useState("");
  const [elseInputError, setElseInputError] = useState("");
  const [elseMinLength, setElseMinLength] = useState("");
  const [elseMaxLength, setElseMaxLength] = useState("");
  const [elseIsRequired, setElseIsRequired] = useState(false);

  //------------------input components end---------------------

  const dispatch = useDispatch();
  const handleIfElseSave = () => {
    if (!selectedCondition) {
      toast.error("Please Enter condition first");
      return;
    }
    const payload = {
      type: "If",
      condition: selectedCondition,
      then: [
        {
          type: selectedThenComponent,
          text: thenBranchText,
        },
      ],
      else: [
        {
          type: selectedElseComponent,
          text: elseBranchText,
        },
      ],
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    console.log("updatedData", updatedData)
    onSave(updatedData);
    dispatch(
      updateFlowItem({
        id: updatedData.storeId,
        data: {
          status: 1,
        },
      })
    );
    setOpenIfElse(false);
  };

  const allowedComponents = [
    { label: "Heading", value: "heading" },
    { label: "Sub Heading", value: "subHeading" },
    { label: "Text Body", value: "textBody" },
    { label: "Text Caption", value: "textCaption" },
    { label: "Text Input", value: "textInput" },
    { label: "Text Area", value: "textArea" },
    { label: "Checkbox", value: "checkBox" },
    { label: "Dropdown", value: "dropDown" },
    { label: "Date Picker", value: "date" },
    { label: "Embedded Link", value: "embeddedlink" },
    { label: "Image", value: "image" },
    { label: "Opt-in", value: "optin" },
    { label: "Switch", value: "switch" },
    { label: "Footer Button", value: "footerbutton" },
    { label: "If-Else", value: "ifelse" },
  ];

  // components start
  const renderTextBranchInput = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;
    const branchText = branchType === "then" ? thenBranchText : elseBranchText;
    const setBranchText =
      branchType === "then" ? setThenBranchText : setElseBranchText;

    if (
      ["heading", "subHeading", "textBody", "textCaption"].includes(
        selectedComponent
      )
    ) {
      return (
        <div className="mt-3 w-1/2">
          <InputField
            placeholder={`${branchType === "then" ? "Then" : "Else"
              } branch text`}
            className="w-full p-1 rounded text-black"
            value={branchText}
            onChange={(e) => setBranchText(e.target.value)}
          />
        </div>
      );
    }

    return null;
  };

  const renderTextInputBranch = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;

    const inputLabel = branchType === "then" ? thenInputLabel : elseInputLabel;
    const setInputLabel =
      branchType === "then" ? setThenInputLabel : setElseInputLabel;

    const inputType = branchType === "then" ? thenInputType : elseInputType;
    const setInputType =
      branchType === "then" ? setThenInputType : setElseInputType;

    const inputPlaceholder =
      branchType === "then" ? thenInputPlaceholder : elseInputPlaceholder;
    const setInputPlaceholder =
      branchType === "then" ? setThenInputPlaceholder : setElseInputPlaceholder;

    const inputError = branchType === "then" ? thenInputError : elseInputError;
    const setInputError =
      branchType === "then" ? setThenInputError : setElseInputError;

    const minLength = branchType === "then" ? thenMinLength : elseMinLength;
    const setMinLength =
      branchType === "then" ? setThenMinLength : setElseMinLength;

    const maxLength = branchType === "then" ? thenMaxLength : elseMaxLength;
    const setMaxLength =
      branchType === "then" ? setThenMaxLength : setElseMaxLength;

    if (["textInput"].includes(selectedComponent)) {
      return (
        <div className="mt-3 space-y-3 w-1/2">
          <InputField
            label="Input Label"
            placeholder="Enter input label"
            tooltipContent="Enter input label"
            tooltipPlacement="right"
            className="w-full p-1 rounded text-black"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
          />
          <AnimatedDropdown
            label="Select Input Type"
            tooltipContent="Select input type (select text for default)"
            tooltipPlacement="right"
            value={inputType}
            onChange={setInputType}
            placeholder="Select Type"
          />
          <InputField
            label="Helper Text"
            type="text"
            placeholder="Enter helper text"
            tooltipContent="Enter helper text"
            tooltipPlacement="right"
            value={inputPlaceholder}
            onChange={(e) => setInputPlaceholder(e.target.value)}
          />
          <InputField
            label="Error Message"
            placeholder="Enter error message"
            tooltipContent="Enter error message"
            tooltipPlacement="right"
            value={inputError}
            onChange={(e) => setInputError(e.target.value)}
          />
          <div className="flex gap-2">
            <InputField
              label="Min Length"
              type="number"
              placeholder="Min Length"
              tooltipContent="Enter minimum length"
              tooltipPlacement="right"
              value={minLength}
              onChange={(e) => setMinLength(e.target.value)}
            />
            <InputField
              label="Max Length"
              type="number"
              placeholder="Max Length"
              tooltipContent="Enter maximum length"
              tooltipPlacement="right"
              value={maxLength}
              onChange={(e) => setMaxLength(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <UniversalLabel
              htmlFor="required"
              className="text-sm font-medium text-gray-700"
              text="Required?"
              tooltipContent="Set required field for TextInput"
              tooltipPlacement="top"
            />
          </div>
        </div>
      );
    }

    return null;
  };
  // components end
  return (
    <>
      <Dialog
        visible={openIfElse}
        onHide={() => setOpenIfElse(false)}
        style={{ width: "80rem", height: "50rem" }}
        draggable={false}
        header={"IF Else Component"}
      >
        <div className="">
          <div className="flex items-center justify-center gap-2 w-full">
            <div className="w-3/1">
              <AnimatedDropdown
                label="Condition"
                tooltipContent="Select If-Condition"
                tooltipPlacement="right"
                value={selectedCondition}
                options={[
                  { label: "Equal to (==)", value: "==" },
                  { label: "Not equal to (!=)", value: "!=" },
                  { label: "AND (&&)", value: "&&" },
                  { label: "OR (||)", value: "||" },
                  { label: "Greater than (>)", value: ">" },
                  { label: "Greater than or equal to (>=)", value: ">=" },
                  { label: "Less than (<)", value: "<" },
                  { label: "Less than or equal to (<=)", value: "<=" },
                ]}
                onChange={(value) => setSelectedCondition(value)}
              />
            </div>
            <div className="w-3/1">
              <AnimatedDropdown
                label="Add Component to Then Branch"
                tooltipContent="Select Then Branch"
                tooltipPlacement="right"
                value={selectedThenComponent}
                options={allowedComponents}
                // onChange={(value) => setSelectedThenComponent(value)}
                onChange={(value) => {
                  setSelectedThenComponent(value);
                  // if (value === "ifelse") {
                  //   setNestedIf(true); // ✅ Set your flag here
                  // } else {
                  //   setNestedIf(false); // optionally reset
                  // }
                }}
              />
            </div>

            <div className="w-3/1">
              <AnimatedDropdown
                label="Add Component to Else Branch"
                tooltipContent="Select Else Branch"
                tooltipPlacement="right"
                value={selectedElseComponent}
                options={allowedComponents}
                onChange={(value) => {
                  setSelectedElseComponent(value);
                  // if (value === "ifelse") {
                  //   setNestedElse(true); // ✅ Set your flag here
                  // } else {
                  //   setNestedElse(false); // optionally reset
                  // }
                }}
              />
            </div>
            <div className="flex justify-center mt-6">
              <UniversalButton label="Save" onClick={handleIfElseSave} />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">If-Else Overview</h2>
            <p>{selectedCondition}</p>
            {selectedThenComponent && (
              <p className="my-2 font-semibold">
                Then Component - {selectedThenComponent}
              </p>
            )}
            {renderTextBranchInput("then")}
            {renderTextInputBranch("then")}

            {selectedElseComponent && (
              <p className="my-2 font-semibold">
                Else component - {selectedElseComponent}
              </p>
            )}
            {renderTextBranchInput("else")}
            {renderTextInputBranch("else")}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default IfElseBlock;
