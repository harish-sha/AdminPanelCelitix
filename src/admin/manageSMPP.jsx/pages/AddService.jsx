import React, { useState } from "react";
import InputField from "../../../whatsapp/components/InputField";
import UniversalLabel from "../../../whatsapp/components/UniversalLabel";
import { RadioButton } from "primereact/radiobutton";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../../whatsapp/components/UniversalButton";

const AddService = () => {
  const [versionaddStatus, setVersionAddStatus] = useState("disable");
  const [tpaddStatus, setTpAddStatus] = useState("disable");

  const handleChangeVersionAddStatus = (event) => {
    setVersionAddStatus(event.target.value);
  };
  const handleChangetpAddStatus = (event) => {
    setTpAddStatus(event.target.value);
  };

  const servicetypeoption = [
    { label: "Select Service Type", value: "" },
    { label: "Transactional", value: "Transactional" },
    { label: "Promotional", value: "Promotional" },
    { label: "Both", value: "Both" },
  ];

  const handleAddService = (service) => {
    console.log(service);
  };

  const dataencodingoption = [
    { label: "Default", value: "Default" },
    { label: "GSM", value: "GSM" },
  ];

  const handleAddDataEncoding = (data) => {
    console.log(data);
  };

  const bindmodeoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddBindMode = (bind) => {
    console.log(bind);
  };

  const totalsocketsaddoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddTotalSockets = (sockets) => {
    console.log(sockets);
  };

  const sourceoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddSource = (source) => {
    console.log(source);
  };
  const destinationoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddDestination = (destination) => {
    console.log(destination);
  };
  const registereddeliveryoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddRegisteredDelivery = (delivery) => {
    console.log(delivery);
  };
  const windowsizeoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddWindowSize = (windows) => {
    console.log(windows);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">SMPP Bind Settings :</h2>
      <div className="grid grid-cols-4 gap-4">
        <InputField
          label="Service Name"
          id="servicenameadd"
          name="servicenameadd"
          placeholder="Enter Service Name"
        />

        <div className="flex flex-col">
          <div className="">
            <UniversalLabel
              text="SMPP Version"
              id="versionadd"
              name="versionadd"
            />
          </div>
          <div className="flex gap-4 mt-3">
            {/* Option 1 */}
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="versionaddOption1"
                name="versionaddredio"
                value="enable"
                onChange={handleChangeVersionAddStatus}
                checked={versionaddStatus === "enable"}
              />
              <label
                htmlFor="versionaddOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                3.3
              </label>
            </div>
            {/* Option 2 */}
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="versionaddOption2"
                name="versionaddredio"
                value="disable"
                onChange={handleChangeVersionAddStatus}
                checked={versionaddStatus === "disable"}
              />
              <label
                htmlFor="versionaddOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                3.4
              </label>
            </div>
          </div>
        </div>

        <InputField
          label="Host URL or IP Address"
          id="hostadd"
          name="hostadd"
          placeholder="Enter Host URL or IP Address"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <InputField
          label="User Name"
          id="usernameadd"
          name="usernameadd"
          placeholder="Enter User Name"
        />
        <InputField
          label="Password"
          id="passwordadd"
          name="passwordadd"
          placeholder="Enter Password"
        />
        <InputField
          label="Sending Port"
          id="sendingportadd"
          name="sendingportadd"
          placeholder="Enter Sending Port"
        />
        <InputField
          label="Receiver Port"
          id="receiverportadd"
          name="receiverportadd"
          placeholder="Enter Receiver Port"
        />
      </div>
      <h2 className="text-lg font-semibold">SMPP Server Settings :</h2>
      <div className="grid grid-cols-4 gap-4">
        <AnimatedDropdown
          label="Service Type"
          id="servicetypeadd"
          name="servicetypeadd"
          options={servicetypeoption}
          onChange={handleAddService}
        />
        <AnimatedDropdown
          label="Data Encoding"
          id="dataencodingadd"
          name="dataencodingadd"
          options={dataencodingoption}
          onChange={handleAddDataEncoding}
        />
        <InputField
          label="System Type"
          id="systemtypeadd"
          name="systemtypeadd"
          placeholder="Enter System Type"
        />
        <AnimatedDropdown
          label="Bind Mode"
          id="bindmodeadd"
          name="bindmodeadd"
          options={bindmodeoption}
          onChange={handleAddBindMode}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <AnimatedDropdown
          label="Total Sockets"
          id="totalsocketsadd"
          name="totalsocketsadd"
          placeholder="Enter Total Sockets"
          options={totalsocketsaddoption}
          onChange={handleAddTotalSockets}
        />
        <InputField
          label="Number of Receivers"
          id="receiversadd"
          name="receiversadd"
          placeholder="Enter Number of Receivers"
        />
        <AnimatedDropdown
          label="Source"
          id="sourceadd"
          name="sourceadd"
          options={sourceoption}
          onChange={handleAddSource}
        />
        <AnimatedDropdown
          label="Destination"
          id="destinationadd"
          name="destinationadd"
          options={destinationoption}
          onChange={handleAddDestination}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <AnimatedDropdown
          label="Registered Delivery"
          id="registereddeliveryadd"
          name="registereddeliveryadd"
          options={registereddeliveryoption}
          onChange={handleAddRegisteredDelivery}
        />
        <InputField
          label="Sender Id Prefix"
          id="senderidprefixadd"
          name="senderidprefixadd"
          placeholder="Enter Sender Id Prefix"
        />
        <div className="flex flex-col">
          <div className="">
            <UniversalLabel text="TPS" id="tpadd" name="tpadd" />
          </div>
          <div className="flex gap-4 mt-3">
            {/* Option 1 */}
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="tpaddOption1"
                name="tpaddredio"
                value="enable"
                onChange={handleChangetpAddStatus}
                checked={tpaddStatus === "enable"}
              />
              <label
                htmlFor="tpaddOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Yes
              </label>
            </div>
            {/* Option 2 */}
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="tpaddOption2"
                name="tpaddredio"
                value="disable"
                onChange={handleChangetpAddStatus}
                checked={tpaddStatus === "disable"}
              />
              <label
                htmlFor="tpaddOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                No
              </label>
            </div>
          </div>
        </div>
        {tpaddStatus === "enable" && (
          <InputField
            label="TPS "
            id="tpaddvalue"
            name="tpaddvalue"
            placeholder="Enter TPS Value"
          />
        )}
      </div>

      <h2 className="text-lg font-semibold">Que Settings :</h2>
      <div className="grid grid-cols-4 gap-4">
        <InputField
          label="Order Size"
          id="ordersizeadd"
          name="ordersizeadd"
          placeholder="Enter Order Size"
        />
        <InputField
          label="Initial Size"
          id="initialsizeadd"
          name="initialsizeadd"
          placeholder="Enter Initial Size"
        />
        <InputField
          label="Trigger Size"
          id="triggersizeadd"
          name="triggersizeadd"
          placeholder="Enter Trigger Size"
        />
        <AnimatedDropdown
          label="Window Size"
          id="windowsizeadd"
          name="windowsizeadd"
          placeholder="Enter Window Size"
          options={windowsizeoption}
          onChange={handleAddWindowSize}
        />
      </div>
      <div className="">
        <UniversalButton label="Save" id="saveadd" name="saveadd" />
      </div>
    </div>
  );
};

export default AddService;
