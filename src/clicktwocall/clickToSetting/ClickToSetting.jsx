import React, { useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import InputField from "../../whatsapp/components/InputField";
import CustomTooltip from "../../whatsapp/components/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import { select } from "@material-tailwind/react";

const ClickToSetting = () => {
  const [senderId, setSenderId] = useState("");
  const [entityId, setEntityId] = useState("");
  const [ansCallerTempId, setAnsCallerTempId] = useState("");
  const [ansExecutiveTempId, setAnsExecutiveTempId] = useState("");
  const [missseCallerRightTempId, setMissedCallerRightTempId] = useState("");
  const [misssedExecutiveTempId, setMissedExecutiveTempId] = useState("");
  const [ansCallerContactUs, setAnsCallerContactUs] = useState("");
  const [ansExecutiveContactUs, setAnsExecutiveContactUs] = useState("");
  const [missedCallerContactUs, setMissedCallerContactUs] = useState("");
  const [missedExecutiveContactUs, setMissedExecutiveContactUs] = useState("");
  const [ansCallerEnable, setAnsCallerEnable] = useState("diasble");
  const [ansExecutiveEnable, setAnsExecutiveEnable] = useState("disable");
  const [missedCallerEnable, setMissedCallerDisable] = useState("disable");
  const [missedExecutiveEnable, setMissedExecutiveEnable] = useState("disable");

  const [selectedAnsEnable, setSelectedAnsEnable] = useState("disable");
  const [selectedMissedEnable, setSelectedMissedEnable] = useState("disable");
  const [selectedOption, setSelectedOption] = useState("sms");
  const [saveBtn, setSaveBtn] = useState("");
  const [selectFile, setSelectFile] = useState([]);
  const [selectFileRight, setSelectFileRight] = useState([]);

  const handleChangeEnablePostpaid = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
  };

  const enablecallerpostpaid = (e) => {
    const value = e.target.value;
    setAnsCallerEnable(value);
  };

  const enableExecutivepostpaid = (e) => {
    const value = e.target.value;
    setAnsExecutiveEnable(value);
  };

  const enablemissedpostpaid = (e) => {
    const value = e.target.value;
    setMissedCallerDisable(value);
  };

  const enablemissedExecutivepostpaid = (e) => {
    const value = e.target.value;
    setMissedExecutiveEnable(value);
  };

  const handleSelectedEnablepostpaid = (e) => {
    const value = e.target.value;
    setSelectedAnsEnable(value);
  };

  const handleSelectedRightEnablepostpaid = (e) => {
    const value = e.target.value;
    setSelectedMissedEnable(value);
  };

  return (
    <>
      <div className="flex items-center  gap-10  bg-gray-50 w-full">
        <div className="flex flex-col  gap-5 ml-6">
          <h2 className=" font-bold text-gray-700 text-2xl mt-4 ">
            Integration
          </h2>

          <div className="flex flex-row gap-2 ">
            <div className="flex items-start justify-start gap-1 bg-white p-3  rounded-2xl  ">
              <RadioButton
                value="sms"
                checked={selectedOption === "sms"}
                onChange={handleChangeEnablePostpaid}
              />
              <label
                // htmlFor="enablepostpaidOption1"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                SMS
              </label>
            </div>

            <div className="flex items-start justify-start gap-1 bg-white p-3  rounded-2xl">
              <RadioButton
                value="voice"
                checked={selectedOption === "voice"}
                onChange={handleChangeEnablePostpaid}
              />
              <label
                htmlFor="voice"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Voice
              </label>
            </div>
          </div>

          {selectedOption === "sms" && (
            <>
              <div className="">
                <div className="flex flex-wrap gap-3">
                  <div className="w-full sm:w-56 gap-2">
                    <InputField
                      label="Sender ID"
                      placeholder="Enter Sender Id"
                      type="text"
                      value={senderId}
                      onChange={(e) => setSenderId(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-56 gap-2">
                    <InputField
                      label="Entity ID"
                      placeholder="Enter Entity Id"
                      type="text"
                      value={entityId}
                      onChange={(e) => setEntityId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-5 mt-8 mb-8">
                  <div className="flex flex-col gap-3 ">
                    <div className="flex items-start gap-2">
                      <label className="text-[#174c88] font-bold">
                        Notify Caller(Answered)
                      </label>
                      <CustomTooltip
                        title="Notify caller when call is answered"
                        placement="top"
                      >
                        <span>
                          <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                        </span>
                      </CustomTooltip>
                    </div>

                    <div className="flex flex-row  gap-2">
                      <div className="flex justify-start items-start gap-1">
                        <RadioButton
                          value="enable"
                          checked={ansCallerEnable === "enable"}
                          onChange={enablecallerpostpaid}
                        />
                        <label htmlFor="callerEnable">Enable</label>
                      </div>

                      <div className="flex justify-start items-start gap-1">
                        <RadioButton
                          value="disable"
                          checked={ansCallerEnable === "disable"}
                          onChange={enablecallerpostpaid}
                        />
                        <label>Disable</label>
                      </div>
                    </div>

                    <div className="flex flex-row gap-4 flex-wrap text-gray-500">
                      <div className="w-full sm:w-56">
                        <InputField
                          // label="DLT Template Id"
                          placeholder="Enter DLT Template Id"
                          value={ansCallerTempId}
                          checked={ansCallerEnable === "disable"}
                          onChange={(e) => setAnsCallerTempId(e.target.value)}
                          disable={ansCallerEnable === "disable"}
                        />
                      </div>

                      <div className=" w-full sm:w-56">
                        <InputField
                          placeholder="Thank you for contact us"
                          value={ansCallerContactUs}
                          checked={ansCallerEnable === "disable"}
                          onChange={(e) =>
                            setAnsCallerContactUs(e.target.value)
                          }
                          disable={ansCallerEnable === "disable"}
                        />
                        <label className="text-xs text-gray-500">
                          #NAME#For Excutive Name | #NUM*For Executive Number
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-2">
                        <label className="text-[#174c88] font-bold">
                          Notify Excutive(Answered)
                        </label>
                        <CustomTooltip
                          title="Notify excutive when call is answered"
                          placement="top"
                        >
                          <span>
                            <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                          </span>
                        </CustomTooltip>
                      </div>

                      <div className="flex flex-row  gap-2">
                        <div className="flex justify-start items-start gap-1">
                          <RadioButton
                            value="enable"
                            checked={ansExecutiveEnable === "enable"}
                            onChange={enableExecutivepostpaid}
                          />
                          <label htmlFor="">Enable</label>
                        </div>

                        <div className="flex justify-start items-start gap-1">
                          <RadioButton
                            value="disable"
                            checked={ansExecutiveEnable === "disable"}
                            onChange={enableExecutivepostpaid}
                          />
                          <label>Disable</label>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row gap-4 flex-wrap text-gray-500">
                      <div className="w-full sm:w-56">
                        <InputField
                          // label="DLT Template Id"
                          placeholder="Enter DLT Template Id"
                          value={ansExecutiveTempId}
                          onChange={(e) =>
                            setAnsExecutiveTempId(e.target.value)
                          }
                          checked={ansExecutiveEnable === "disable"}
                          disable={ansExecutiveEnable === "disable"}
                        />
                      </div>

                      <div className="w-full sm:w-56">
                        <InputField
                          placeholder="You just spoke to #a *VTLBOX"
                          value={ansExecutiveContactUs}
                          onChange={(e) =>
                            setAnsExecutiveContactUs(e.target.value)
                          }
                          checked={ansExecutiveEnable === "disable"}
                          disable={ansExecutiveEnable === "disable"}
                        />
                        <label className="text-xs text-gray-500">
                          #For Number | *For Executive Time
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* rightside content */}

                  <div className="flex flex-col  gap-3 ">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-2">
                        <label className="text-[#174c88] font-bold">
                          Notify Caller(Missed)
                        </label>
                        <CustomTooltip
                          title="Notify caller when call is missed"
                          placement="top"
                        >
                          <span>
                            <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                          </span>
                        </CustomTooltip>
                      </div>

                      <div className="flex flex-row  gap-2">
                        <div className="flex justify-start items-start gap-1">
                          <RadioButton
                            value="enable"
                            checked={missedCallerEnable === "enable"}
                            onChange={enablemissedpostpaid}
                          />
                          <label htmlFor="">Enable</label>
                        </div>

                        <div className="flex justify-start items-start gap-1">
                          <RadioButton
                            value="disable"
                            checked={missedCallerEnable === "disable"}
                            onChange={enablemissedpostpaid}
                          />
                          <label>Disable</label>
                        </div>
                      </div>
                    </div>

                    <div className=" flex flex-row gap-4 flex-wrap text-gray-500 ">
                      <div className="w-full sm:w-56">
                        <InputField
                          // label="DLT Template Id"
                          placeholder="Enter DLT Template Id"
                          value={missseCallerRightTempId}
                          onChange={(e) =>
                            setMissedCallerRightTempId(e.target.value)
                          }
                          checked={missedCallerEnable === "disable"}
                          disable={missedCallerEnable === "disable"}
                        />
                      </div>
                      <div className="w-full sm:w-56">
                        <InputField
                          // label={"DLT Template Id"}
                          placeholder="Thank you for contact us"
                          value={missedCallerContactUs}
                          onChange={(e) =>
                            setMissedCallerContactUs(e.target.value)
                          }
                          checked={missedCallerEnable === "disable"}
                          disable={missedCallerEnable === "disable"}
                        />
                        <label className="text-xs text-gray-500">
                          #NAME#For Excutive Name | #NUM*For Executive Number
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-2">
                        <label className="text-[#174c88] font-bold">
                          Notify Executive(Missed)
                        </label>
                        <CustomTooltip
                          title="Notify executive when call is missed"
                          placement="top"
                        >
                          <span>
                            <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                          </span>
                        </CustomTooltip>
                      </div>

                      <div className="flex flex-row  gap-2">
                        <div className="flex justify-start items-start gap-1">
                          <RadioButton
                            value="enable"
                            checked={missedExecutiveEnable === "enable"}
                            onChange={enablemissedExecutivepostpaid}
                          />
                          <label htmlFor="">Enable</label>
                        </div>

                        <div className="flex justify-start items-start gap-1">
                          <RadioButton
                            value="disable"
                            checked={missedExecutiveEnable === "disable"}
                            onChange={enablemissedExecutivepostpaid}
                          />
                          <label>Disable</label>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row gap-4 flex-wrap  text-gray-500">
                      <div className="w-full sm:w-56">
                        <InputField
                          // label="DLT Template Id"
                          placeholder="Enter DLT Template Id"
                          value={misssedExecutiveTempId}
                          onChange={(e) =>
                            setMissedExecutiveTempId(e.target.value)
                          }
                          checked={missedExecutiveEnable === "disable"}
                          disable={missedExecutiveEnable === "disable"}
                        />
                      </div>

                      <div className="w-full sm:w-56">
                        <InputField
                          placeholder="You have a missed call from *at"
                          value={missedExecutiveContactUs}
                          onChange={(e) =>
                            setMissedExecutiveContactUs(e.target.value)
                          }
                          checked={missedExecutiveEnable === "disable"}
                          disable={missedExecutiveEnable === "disable"}
                        />
                        <label className="text-xs text-gray-500">
                          #For Number | *For Executive Time
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedOption === "voice" && (
            <div className="flex flex-row gap-4 ">
              <div className="flex  items-start gap-2">
                <label className="text-[#174c88] font-bold">
                  Notify Caller(Answered)
                </label>
                <CustomTooltip
                  title="Notify caller when call is answered"
                  placement="top"
                >
                  <span>
                    <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                  </span>
                </CustomTooltip>
              </div>
              <div className="flex items-start gap-2">
                <label className="text-[#174c88] font-bold">
                  Notify Caller(Missed)
                </label>
                <CustomTooltip
                  title="Notify caller when call is missed"
                  placement="top"
                >
                  <span>
                    <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                  </span>
                </CustomTooltip>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-row gap-2">
                  <div className="flex justify-start items-start gap-1">
                    <RadioButton
                      value="enable"
                      checked={selectedAnsEnable === "enable"}
                      onChange={handleSelectedEnablepostpaid}
                    />
                    <label htmlFor="callerEnable">Enable</label>
                  </div>

                  <div className="flex justify-start items-start gap-1">
                    <RadioButton
                      value="disable"
                      checked={selectedAnsEnable === "disable"}
                      onChange={handleSelectedEnablepostpaid}
                    />
                    <label>Disable</label>
                  </div>
                </div>

                {selectedAnsEnable === "enable" && (
                  <AnimatedDropdown
                    label="Select File"
                    placeholder="Select File"
                    options={[
                      { value: "On Success", label: "On Success" },
                      { value: "On Failure", label: "On Failure" },
                      { value: "DTMF Response", label: "DTMF Response" },
                    ]}
                    value={selectFile}
                    onChange={(value) => setSelectFile(value)}
                  />
                )}
              </div>
              <div className="flex flex-row  gap-2">
                <div className="flex justify-start items-start gap-1">
                  <RadioButton
                    value="enable"
                    checked={selectedMissedEnable === "enable"}
                    onChange={handleSelectedRightEnablepostpaid}
                  />
                  <label htmlFor="">Enable</label>
                </div>

                <div className="flex justify-start items-start gap-1">
                  <RadioButton
                    value="disable"
                    checked={selectedMissedEnable === "disable"}
                    onChange={handleSelectedRightEnablepostpaid}
                  />
                  <label>Disable</label>
                </div>
              </div>

              <div className="flex flex-row  gap-8">
                {/* <div className="flex items-start gap-2">
                  <label className="text-[#174c88] font-bold">
                    Notify Caller(Missed)
                  </label>
                  <CustomTooltip
                    title="Notify caller when call is missed"
                    placement="top"
                  >
                    <span>
                      <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    </span>
                  </CustomTooltip>
                </div> */}
              </div>
              <div>
                <div className="flex flex-row  gap-2">
                  <div className="flex justify-start items-start gap-1">
                    <RadioButton
                      value="enable"
                      checked={selectedMissedEnable === "enable"}
                      onChange={handleSelectedRightEnablepostpaid}
                    />
                    <label htmlFor="">Enable</label>
                  </div>

                  <div className="flex justify-start items-start gap-1">
                    <RadioButton
                      value="disable"
                      checked={selectedMissedEnable === "disable"}
                      onChange={handleSelectedRightEnablepostpaid}
                    />
                    <label>Disable</label>
                  </div>
                </div>

                {selectedMissedEnable === "enable" && (
                  <AnimatedDropdown
                    label="Select File"
                    placeholder="Select File"
                    options={[
                      { value: "On Success", label: "On Success" },
                      { value: "On Failure", label: "On Failure" },
                      { value: "DTMF Response", label: "DTMF Response" },
                    ]}
                    value={selectFileRight}
                    onChange={(value) => setSelectFileRight(value)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col  justify-center items-center  gap-2 ">
        <UniversalButton
          id="obdintegrationsavebtn"
          name="obdintegrationsavebtn"
          label="Save"
          placeholder="Save"
          value={saveBtn}
          onClick={() => setSaveBtn(value)}
        />
      </div>
    </>
  );
};

export default ClickToSetting;
