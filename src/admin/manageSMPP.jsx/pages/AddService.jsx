import React, { useState } from "react";
import InputField from "../../../whatsapp/components/InputField";
import UniversalLabel from "../../../whatsapp/components/UniversalLabel";
import { RadioButton } from "primereact/radiobutton";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import { saveSMPP } from "@/apis/admin/admin";

const AddService = () => {
  const [versionaddStatus, setVersionAddStatus] = useState("disable");
  const [tpaddStatus, setTpAddStatus] = useState("disable");

  const [data, setData] = useState({});

  const handleChangeVersionAddStatus = (event) => {
    setVersionAddStatus(event.target.value);
    setData({ ...data, Version: event.target.name });
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
    // console.log(service);
  };

  const dataencodingoption = [
    { label: "Default", value: "default" },
    { label: "GSM", value: "gsm3" },
  ];

  const handleAddDataEncoding = (data) => {
    // console.log(data);
  };

  const bindmodeoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddBindMode = (bind) => {
    // console.log(bind);
  };

  const totalsocketsaddoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddTotalSockets = (sockets) => {
    // console.log(sockets);
  };

  const sourceoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddSource = (source) => {
    // console.log(source);
  };
  const destinationoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddDestination = (destination) => {
    // console.log(destination);
  };
  const registereddeliveryoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddRegisteredDelivery = (delivery) => {
    // console.log(delivery);
  };
  const windowsizeoption = [
    { label: "Transmitter", value: "Transmitter" },
    { label: "Receiver", value: "Receiver" },
    { label: "Transceiver", value: "Transceiver" },
  ];

  const handleAddWindowSize = (windows) => {
    // console.log(windows);
  };

  async function handleSave() {
    try {
      const payload = {
        ...data,
        ExpiryTime: "null",
      };
      // const payload = {
      //   bindMode: "0",
      //   DataCoding: "gsm7",
      //   Destination: "ton=1;npi=10;",
      //   ExpiryTime: "null",
      //   hostURL: "https://www.bing.com/news",
      //   initialQueueSize: "10",
      //   numOfReceivers: "1",
      //   orderQueueSize: "12",
      //   password: "12345678",
      //   receiverPort: "9091",
      //   senderPrefix: "",
      //   sendingPort: "8080",
      //   serviceName: "test",
      //   Source: "ton=1;npi=8;",
      //   systemType: "SMS",
      //   totalSocket: "2",
      //   tpsValue: 0,
      //   triggerQueueSize: "18",
      //   userName: "dummysms",
      //   Version: "3.3",
      //   winndowSize: "50",
      // };

      const res = await saveSMPP(payload);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">SMPP Bind Settings :</h2>
      <div className="grid grid-cols-4 gap-4">
        <InputField
          label="Service Name"
          id="servicenameadd"
          name="servicenameadd"
          placeholder="Enter Service Name"
          value={data.serviceName}
          onChange={(e) => setData({ ...data, serviceName: e.target.value })}
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
                id="versionaddOption1"
                name="3.3"
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
                id="versionaddOption2"
                name="3.4"
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
          value={data.hostURL}
          onChange={(e) => setData({ ...data, hostURL: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <InputField
          label="User Name"
          id="usernameadd"
          name="usernameadd"
          placeholder="Enter User Name"
          value={data.userName}
          onChange={(e) => setData({ ...data, userName: e.target.value })}
        />
        <InputField
          label="Password"
          id="passwordadd"
          name="passwordadd"
          placeholder="Enter Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <InputField
          label="Sending Port"
          id="sendingportadd"
          name="sendingportadd"
          placeholder="Enter Sending Port"
          value={data.sendingPort}
          onChange={(e) => setData({ ...data, sendingPort: e.target.value })}
        />
        <InputField
          label="Receiver Port"
          id="receiverportadd"
          name="receiverportadd"
          placeholder="Enter Receiver Port"
          value={data.receiverPort}
          onChange={(e) => setData({ ...data, receiverPort: e.target.value })}
        />
      </div>
      <h2 className="text-lg font-semibold">SMPP Server Settings :</h2>
      <div className="grid grid-cols-4 gap-4">
        <AnimatedDropdown
          label="Service Type"
          id="servicetypeadd"
          name="servicetypeadd"
          options={servicetypeoption}
          value={data.serviceType}
          onChange={(e) => setData({ ...data, serviceType: e })}
        />
        <AnimatedDropdown
          label="Data Encoding"
          id="dataencodingadd"
          name="dataencodingadd"
          options={dataencodingoption}
          value={data.DataCoding}
          onChange={(e) => setData({ ...data, DataCoding: e })}
        />
        <InputField
          label="System Type"
          id="systemtypeadd"
          name="systemtypeadd"
          placeholder="Enter System Type"
          value={data.systemType}
          onChange={(e) => setData({ ...data, systemType: e.target.value })}
        />
        <AnimatedDropdown
          label="Bind Mode"
          id="bindmodeadd"
          name="bindmodeadd"
          options={bindmodeoption}
          value={data.bindMode}
          onChange={(e) => setData({ ...data, bindMode: e })}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <AnimatedDropdown
          label="Total Sockets"
          id="totalsocketsadd"
          name="totalsocketsadd"
          placeholder="Enter Total Sockets"
          options={totalsocketsaddoption}
          value={data.totalSocket}
          onChange={(e) => {
            setData({ ...data, totalSocket: e });
          }}
        />
        <InputField
          label="Number of Receivers"
          id="receiversadd"
          name="receiversadd"
          placeholder="Enter Number of Receivers"
          value={data.numOfReceivers}
          onChange={(e) => setData({ ...data, numOfReceivers: e.target.value })}
        />
        <AnimatedDropdown
          label="Source"
          id="sourceadd"
          name="sourceadd"
          options={sourceoption}
          value={data.Source}
          onChange={(e) => {
            setData({ ...data, Source: e });
          }}
        />
        <AnimatedDropdown
          label="Destination"
          id="destinationadd"
          name="destinationadd"
          options={destinationoption}
          value={data.Destination}
          onChange={(e) => {
            setData({ ...data, Destination: e });
          }}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <AnimatedDropdown
          label="Registered Delivery"
          id="registereddeliveryadd"
          name="registereddeliveryadd"
          options={registereddeliveryoption}
          value={data.registeredDelivery}
          onChange={(e) => setData({ ...data, registeredDelivery: e })}
        />
        <InputField
          label="Sender Id Prefix"
          id="senderidprefixadd"
          name="senderidprefixadd"
          placeholder="Enter Sender Id Prefix"
          value={data.senderPrefix}
          onChange={(e) => setData({ ...data, senderPrefix: e.target.value })}
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
            value={data.tpsValue}
            onChange={(e) => setData({ ...data, tpsValue: e.target.value })}
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
          value={data.orderQueueSize}
          onChange={(e) => setData({ ...data, orderQueueSize: e.target.value })}
        />
        <InputField
          label="Initial Size"
          id="initialsizeadd"
          name="initialsizeadd"
          placeholder="Enter Initial Size"
          value={data.initialQueueSize}
          onChange={(e) =>
            setData({ ...data, initialQueueSize: e.target.value })
          }
        />
        <InputField
          label="Trigger Size"
          id="triggersizeadd"
          name="triggersizeadd"
          placeholder="Enter Trigger Size"
          value={data.triggerQueueSize}
          onChange={(e) =>
            setData({ ...data, triggerQueueSize: e.target.value })
          }
        />
        <AnimatedDropdown
          label="Window Size"
          id="windowsizeadd"
          name="windowsizeadd"
          placeholder="Enter Window Size"
          options={windowsizeoption}
          onChange={(e) => setData({ ...data, winndowSize: e })}
          value={data.winndowSize}
        />
      </div>
      <div className="">
        <UniversalButton
          label="Save"
          id="saveadd"
          name="saveadd"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default AddService;
