// import { Dialog } from "primereact/dialog";
// import { RadioButton } from "primereact/radiobutton";
// import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
// import UniversalLabel from "@/whatsapp/components/UniversalLabel";
// import UniversalButton from "@/components/common/UniversalButton";
// import { useEffect, useState } from "react";
// import Checkbox from "@mui/material/Checkbox";
// import toast from "react-hot-toast";
// import { downloadCustomSmsReport } from "@/apis/sms/sms";
// import { downloadCustomWhatsappReport } from "@/apis/whatsapp/whatsapp";
// import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
// import InputField from "@/whatsapp/components/InputField";
// import { useDownload } from "@/context/DownloadProvider";
// import moment from "moment";

// export const ExportDialog = ({
//   visibledialog,
//   setVisibledialog,
//   allCampaigns,
//   setDataToExport,
//   dataToExport,
// }) => {
//   const { triggerDownloadNotification } = useDownload();

//   const [campaigncheckboxStates, setCampaignCheckboxStates] = useState({
//     mobileNo: false,
//     callType: false,
//     totalUnits: false,
//     queueTime: false,
//     sentTime: false,
//     deliveryTime: false,
//     callDuration: false,
//     retryCount: false,
//     callStatus: false,
//     deliveryStatus: false,
//     keypress: false,
//     action: false,
//     source: false,
//   });
//   const handleCheckboxChange = (e, name) => {
//     setCampaignCheckboxStates((prevState) => ({
//       ...prevState,
//       [name]: e.target.checked,
//     }));
//   };

//   useEffect(() => {
//     const selectedFields = Object.keys(campaigncheckboxStates)
//       .filter((key) => campaigncheckboxStates[key] === true)
//       .join(",");

//     setDataToExport((prev) => ({
//       ...prev,
//       customColumns: selectedFields,
//     }));
//   }, [campaigncheckboxStates]);

//   async function handleExport() {
//     if (dataToExport?.type === "campaign" && !dataToExport?.srno) {
//       toast.error("Please select campaign");
//       return;
//     }
//     if (dataToExport?.isCustomField && !dataToExport?.customColumns) {
//       toast.error("Please select custom columns");
//       return;
//     }
//     // console.log(dataToExport);

//     const name = allCampaigns.find(
//       (c) => c.srno === dataToExport?.srno
//     )?.campaignName;

//     const payload = {
//       ...dataToExport,
//       fromDate: dataToExport.fromDate
//         ? moment(dataToExport.fromDate).format("YYYY-MM-DD")
//         : "",
//       toDate: dataToExport.toDate
//         ? moment(dataToExport.toDate).format("YYYY-MM-DD")
//         : "",
//       type: dataToExport?.type === "campaign" ? 1 : 2,
//       campaignName: name,
//     };

//     try {
//       const res = await downloadCustomWhatsappReport(payload);
//       if (!res.status) return toast.error(res.msg);
//       toast.success(res.msg);
//       setVisibledialog(false);
//       triggerDownloadNotification();
//     } catch (e) {
//       toast.error("Something went wrong");
//     }
//     // setVisibledialog(false);
//   }

//   async function handleDeliveryCheckboxChange(e, name) {
//     const selectedField = {
//       [name]: e.target.checked,
//     };
//     if (selectedField[name] === false) {
//       delete dataToExport.delStatus[name];
//       delete selectedField[name];
//     }
//     setDataToExport((prev) => ({
//       ...prev,
//       delStatus: { ...prev.delStatus, ...selectedField },
//     }));
//   }

//   useEffect(() => {
//     setCampaignCheckboxStates({
//       mobileNo: false,
//       callType: false,
//       totalUnits: false,
//       queueTime: false,
//       sentTime: false,
//       deliveryTime: false,
//       callDuration: false,
//       retryCount: false,
//       callStatus: false,
//       deliveryStatus: false,
//       keypress: false,
//       action: false,
//       source: false,
//     });
//   }, [dataToExport?.type, dataToExport?.isCustomField]);

//   return (
//     <Dialog
//       visible={visibledialog}
//       style={{ width: "45rem" }}
//       onHide={() => setVisibledialog(false)}
//       header="Export"
//       modal
//       draggable={false}
//     >
//       {/* Export Type Selection */}
//       <div className="flex gap-4">
//         <div className="cursor-pointer">
//           <div className="flex items-center gap-2">
//             <RadioButton
//               inputId="radioOption1"
//               name="exportType"
//               value="campaign"
//               onChange={() => {
//                 setDataToExport((prev) => ({
//                   ...prev,
//                   type: "campaign",
//                   campaignName: "",
//                   fromDate: new Date(),
//                   toDate: new Date(),
//                   srno: 0,
//                   isCustomField: 0,
//                   customColumns: "",
//                   campaignType: "",
//                   status: "",
//                   delStatus: {},
//                 }));
//               }}
//               checked={dataToExport.type === "campaign"}
//             />
//             <label
//               htmlFor="radioOption1"
//               className="text-gray-700 font-medium text-sm cursor-pointer"
//             >
//               Campaign-wise
//             </label>
//           </div>
//         </div>

//         <div className="cursor-pointer">
//           <div className="flex items-center gap-2">
//             <RadioButton
//               inputId="radioOption2"
//               name="exportType"
//               value="custom"
//               onChange={() => {
//                 setDataToExport((prev) => ({
//                   ...prev,
//                   type: "custom",
//                   campaignName: "",
//                   fromDate: new Date(),
//                   toDate: new Date(),
//                   srno: 0,
//                   isCustomField: 0,
//                   customColumns: "",
//                   campaignType: "",
//                   status: "",
//                   delStatus: {},
//                 }));
//                 // setDataToExport({
//                 //   campaignName: "",
//                 //   fromDate: new Date(),
//                 //   toDate: new Date(),
//                 //   srno: 0,
//                 //   isCustomField: 0,
//                 //   customColumns: "",
//                 //   campaignType: "",
//                 //   status: "",
//                 //   delStatus: {},
//                 // });
//               }}
//               checked={dataToExport.type === "custom"}
//             />
//             <label
//               htmlFor="radioOption2"
//               className="text-gray-700 font-medium text-sm cursor-pointer"
//             >
//               Custom
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Campaign Section */}
//       {dataToExport.type === "campaign" && (
//         <>
//           <div className="mt-5">
//             <AnimatedDropdown
//               id="campaign"
//               name="campaign"
//               label="Select Campaign"
//               options={allCampaigns?.map((item) => ({
//                 value: item.srno,
//                 label: item.campaignName,
//               }))}
//               onChange={(e) =>
//                 setDataToExport((prev) => ({
//                   ...prev,
//                   srno: e,
//                 }))
//               }
//               value={dataToExport.srno}
//               placeholder="Search Campaign"
//             />
//           </div>

//           {/* Custom Columns Radio */}
//           <div className="flex items-center lg:gap-x-20 gap-x-10 my-6">
//             <UniversalLabel text="Custom Columns" />
//             <div className="flex gap-4">
//               <div className="cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   <RadioButton
//                     inputId="radioOptionenable"
//                     name="customFields"
//                     value="enable"
//                     onChange={() =>
//                       setDataToExport((prev) => ({
//                         ...prev,
//                         isCustomField: 1,
//                       }))
//                     }
//                     checked={dataToExport.isCustomField === 1}
//                   />
//                   <label
//                     htmlFor="radioOptionenable"
//                     className="text-gray-700 font-medium text-sm cursor-pointer"
//                   >
//                     Enable
//                   </label>
//                 </div>
//               </div>

//               <div className="cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   <RadioButton
//                     inputId="radioOptiondisable"
//                     name="customFields"
//                     value="disable"
//                     onChange={() =>
//                       setDataToExport((prev) => ({
//                         ...prev,
//                         isCustomField: 0,
//                       }))
//                     }
//                     checked={dataToExport.isCustomField === 0}
//                   />
//                   <label
//                     htmlFor="radioOptiondisable"
//                     className="text-gray-700 font-medium text-sm cursor-pointer"
//                   >
//                     Disable
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//       {dataToExport.type === "custom" && (
//         <>
//           <div className="mt-4 ">
//             <div className="flex justify-between gap-x-4">
//               <UniversalDatePicker
//                 label="From Date:"
//                 value={dataToExport.fromDate}
//                 onChange={(e) =>
//                   setDataToExport({ ...dataToExport, fromDate: e })
//                 }
//                 defaultValue={new Date()}
//               />
//               <UniversalDatePicker
//                 label="To Date:"
//                 value={dataToExport.toDate}
//                 onChange={(e) =>
//                   setDataToExport({ ...dataToExport, toDate: e })
//                 }
//                 defaultValue={new Date()}
//               />
//             </div>

//             <div className="flex justify-between gap-5 my-4">
//               <div className="flex-1">
//                 <AnimatedDropdown
//                   label="Select Type"
//                   options={[
//                     { value: "Promotional", label: "Promotional" },
//                     { value: "Transactional", label: "Transactional" },
//                     { value: "Both", label: "Both" },
//                   ]}
//                   value={dataToExport.campaignType}
//                   onChange={(e) =>
//                     setDataToExport({ ...dataToExport, campaignType: e })
//                   }
//                   placeholder="Select Type"
//                 />
//               </div>

//               <div className="flex-1">
//                 <AnimatedDropdown
//                   label="Select Request"
//                   options={[
//                     { value: "Sent", label: "Sent" },
//                     { value: "Failed", label: "Failed" },
//                     { value: "NDNC", label: "NDNC" },
//                   ]}
//                   value={dataToExport.status}
//                   onChange={(e) =>
//                     setDataToExport({ ...dataToExport, status: e })
//                   }
//                   placeholder="Select Status"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col mt-5">
//               <UniversalLabel text="Delivery Status" />
//               <div className="flex gap-x-5 lg:gap-x-20">
//                 <div className="flex items-center">
//                   <Checkbox
//                     id="delivered"
//                     name="delivered"
//                     onChange={(e) =>
//                       handleDeliveryCheckboxChange(e, "delivered")
//                     }
//                     checked={dataToExport.delStatus["delivered"]}
//                     className="m-2"
//                   />
//                   <label
//                     htmlFor="delivered"
//                     className="text-sm font-medium text-gray-800"
//                   >
//                     Delivered
//                   </label>
//                 </div>

//                 <div className="flex items-center">
//                   <Checkbox
//                     id="undelivered"
//                     name="undelivered"
//                     onChange={(e) =>
//                       handleDeliveryCheckboxChange(e, "undelivered")
//                     }
//                     checked={dataToExport.delStatus["undelivered"]}
//                     className="m-2"
//                   />
//                   <label
//                     htmlFor="undelivered"
//                     className="text-sm font-medium text-gray-800"
//                   >
//                     Undelivered
//                   </label>
//                 </div>

//                 <div className="flex items-center">
//                   <Checkbox
//                     id="pendingDr"
//                     name="pendingDr"
//                     onChange={(e) =>
//                       handleDeliveryCheckboxChange(e, "pendingDr")
//                     }
//                     checked={dataToExport.delStatus["pendingDr"]}
//                     className="m-2"
//                   />
//                   <label
//                     htmlFor="pendingDr"
//                     className="text-sm font-medium text-gray-800"
//                   >
//                     Pending DR
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="flex my-4 gap-4">
//               <InputField
//                 label="Mobile Number"
//                 id="customdialognumber"
//                 name="customdialognumber"
//                 value={dataToExport.mobileNo}
//                 onChange={(e) =>
//                   setDataToExport({ ...dataToExport, mobileNo: e.target.value })
//                 }
//                 placeholder="Enter mobile number..."
//               />
//               {/* <AnimatedDropdown
//                 label="DTMF Count"
//                 id="dtmfResponse"
//                 name="dtmfResponse"
//                 options={[
//                   { value: "0", label: "0" },
//                   { value: "l", label: "1" },
//                   { value: "2", label: "2" },
//                   { value: "3", label: "3" },
//                   { value: "4", label: "4" },
//                   { value: "5", label: "5" },
//                   { value: "6", label: "6" },
//                   { value: "7", label: "7" },
//                   { value: "8", label: "8" },
//                   { value: "9", label: "9" },
//                 ]}
//                 onChange={(e) =>
//                   setDataToExport({ ...dataToExport, dtmfResponse: e })
//                 }
//                 value={dataToExport.dtmfResponse}
//                 placeholder="DTMF Response"
//               /> */}
//             </div>
//           </div>
//           {/* Custom Columns Radio */}
//           <div className="flex items-center lg:gap-x-20 gap-x-10 my-6">
//             <UniversalLabel text="Custom Columns" />
//             <div className="flex gap-4">
//               <div className="cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   <RadioButton
//                     inputId="radioOptionenable"
//                     name="customFields"
//                     value="enable"
//                     onChange={() =>
//                       setDataToExport((prev) => ({
//                         ...prev,
//                         isCustomField: 1,
//                       }))
//                     }
//                     checked={dataToExport.isCustomField === 1}
//                   />
//                   <label
//                     htmlFor="radioOptionenable"
//                     className="text-gray-700 font-medium text-sm cursor-pointer"
//                   >
//                     Enable
//                   </label>
//                 </div>
//               </div>

//               <div className="cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   <RadioButton
//                     inputId="radioOptiondisable"
//                     name="customFields"
//                     value="disable"
//                     onChange={() =>
//                       setDataToExport((prev) => ({
//                         ...prev,
//                         isCustomField: 0,
//                       }))
//                     }
//                     checked={dataToExport.isCustomField === 0}
//                   />
//                   <label
//                     htmlFor="radioOptiondisable"
//                     className="text-gray-700 font-medium text-sm cursor-pointer"
//                   >
//                     Disable
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Conditional Custom Column Checkboxes */}
//       {dataToExport.isCustomField === 1 && (
//         <div>
//           <>
//             <div className="grid grid-cols-2 lg:grid-cols-3 ">
//               <div className="flex items-center">
//                 <Checkbox
//                   id="mobileNo"
//                   name="mobileNo"
//                   onChange={(e) => handleCheckboxChange(e, "mobileNo")}
//                   checked={campaigncheckboxStates.mobileNo}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="mobileNo"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Mobile Number
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="callType"
//                   name="callType"
//                   onChange={(e) => handleCheckboxChange(e, "callType")}
//                   checked={campaigncheckboxStates.callType}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="callType"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Call Type
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="totalUnits"
//                   name="totalUnits"
//                   onChange={(e) => handleCheckboxChange(e, "totalUnits")}
//                   checked={campaigncheckboxStates.totalUnits}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="totalUnits"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Total Units
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="queueTime"
//                   name="queueTime"
//                   onChange={(e) => handleCheckboxChange(e, "queueTime")}
//                   checked={campaigncheckboxStates.queueTime}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="queueTime"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Queue Time
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="sentTime"
//                   name="sentTime"
//                   onChange={(e) => handleCheckboxChange(e, "sentTime")}
//                   checked={campaigncheckboxStates.sentTime}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="sentTime"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Sent Time
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="deliveryTime"
//                   name="deliveryTime"
//                   onChange={(e) => handleCheckboxChange(e, "deliveryTime")}
//                   checked={campaigncheckboxStates.deliveryTime}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="deliveryTime"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Delivery Time
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="callDuration"
//                   name="callDuration"
//                   onChange={(e) => handleCheckboxChange(e, "callDuration")}
//                   checked={campaigncheckboxStates.callDuration}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="callDuration"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Call Duration
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="retryCount"
//                   name="retryCount"
//                   onChange={(e) => handleCheckboxChange(e, "retryCount")}
//                   checked={campaigncheckboxStates.retryCount}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="retryCount"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Retry Count
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="callStatus"
//                   name="callStatus"
//                   onChange={(e) => handleCheckboxChange(e, "callStatus")}
//                   checked={campaigncheckboxStates.callStatus}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="callStatus"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Call Status
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="deliveryStatus"
//                   name="deliveryStatus"
//                   onChange={(e) => handleCheckboxChange(e, "deliveryStatus")}
//                   checked={campaigncheckboxStates.deliveryStatus}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="deliveryStatus"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Delivery Status
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="keypress"
//                   name="keypress"
//                   onChange={(e) => handleCheckboxChange(e, "keypress")}
//                   checked={campaigncheckboxStates.keypress}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="keypress"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Key Press
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="action"
//                   name="action"
//                   onChange={(e) => handleCheckboxChange(e, "action")}
//                   checked={campaigncheckboxStates.action}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="action"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Action
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <Checkbox
//                   id="source"
//                   name="source"
//                   onChange={(e) => handleCheckboxChange(e, "source")}
//                   checked={campaigncheckboxStates.source}
//                   className="m-2"
//                 />
//                 <label
//                   htmlFor="source"
//                   className="text-sm font-medium text-gray-800"
//                 >
//                   Source
//                 </label>
//               </div>
//             </div>
//           </>
//         </div>
//       )}

//       {/* Submit Button */}
//       <div className="flex items-center justify-center mt-6">
//         <UniversalButton
//           id="exportSmsBtn"
//           name="exportSmsBtn"
//           label="Export"
//           onClick={handleExport}
//         />
//       </div>
//     </Dialog>
//   );
// };

import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import UniversalButton from "@/components/common/UniversalButton";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import toast from "react-hot-toast";
import { downloadCustomSmsReport } from "@/apis/sms/sms";
import { downloadCustomWhatsappReport } from "@/apis/whatsapp/whatsapp";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import InputField from "@/whatsapp/components/InputField";
import { useDownload } from "@/context/DownloadProvider";

export const ExportDialog = ({
  visibledialog,
  setVisibledialog,
  allCampaigns,
  setDataToExport,
  dataToExport,
}) => {
  const { triggerDownloadNotification } = useDownload();

  const [campaigncheckboxStates, setCampaignCheckboxStates] = useState({
    sr_no: false,
    mobile_no: false,
    charged_multiplier: false,
    status: false,
    delivery_status: false,
    que_time: false,
    sent_time: false,
    delivery_time: false,
    read_status: false,
    reason: false,
    template_srno: false,
  });

  const handleCheckboxChange = (e, name) => {
    setCampaignCheckboxStates((prevState) => ({
      ...prevState,
      [name]: e.target.checked,
    }));
  };

  useEffect(() => {
    const selectedFields = Object.keys(campaigncheckboxStates)
      .filter((key) => campaigncheckboxStates[key] === true)
      .join(",");

    setDataToExport((prev) => ({
      ...prev,
      customColumns: selectedFields,
    }));
  }, [campaigncheckboxStates]);

  async function handleExport() {
    if (dataToExport?.type === "campaign" && !dataToExport?.srno) {
      toast.error("Please select campaign");
      return;
    }
    if (dataToExport?.isCustomField && !dataToExport?.customColumns) {
      toast.error("Please select custom columns");
      return;
    }

    const name = allCampaigns.find(
      (c) => c.srno === dataToExport?.srno
    )?.campaignName;

    const payload = {
      ...dataToExport,
      fromDate: dataToExport.fromDate
        ? new Date(dataToExport.fromDate).toISOString().split("T")[0]
        : "",
      toDate: dataToExport.toDate
        ? new Date(dataToExport.fromDate).toISOString().split("T")[0]
        : "",
      type: dataToExport?.type === "campaign" ? 1 : 2,
      status: dataToExport.status || "",
      campaignName: name,
    };

    try {
      const res = await downloadCustomWhatsappReport(payload);
      if (!res.status) return toast.error(res.msg);
      toast.success(res.msg);
      setDataToExport({
        fromDate: "",
        toDate: "",
        srno: 0,
        isCustomField: 0,
        customColumns: "",
        campaignType: 0,
        status: "",
        deliveryStatus: "",
        type: "campaign",
      });
      setVisibledialog(false);
      triggerDownloadNotification();
    } catch (e) {
      toast.error("Something went wrong");
    }
    // setVisibledialog(false);
  }

  async function handleDeliveryCheckboxChange(e, name) {
    const selectedField = {
      [name]: e.target.checked,
    };
    if (selectedField[name] === false) {
      delete dataToExport.deliveryStatus[name];
      delete selectedField[name];
    }
    setDataToExport((prev) => ({
      ...prev,
      deliveryStatus: { ...prev.deliveryStatus, ...selectedField },
    }));
  }

  useEffect(() => {
    setCampaignCheckboxStates({
      sr_no: false,
      mobile_no: false,
      charged_multiplier: false,
      status: false,
      delivery_status: false,
      que_time: false,
      sent_time: false,
      delivery_time: false,
      read_status: false,
      reason: false,
      template_srno: false,
    });
  }, [dataToExport?.type, dataToExport?.isCustomField]);

  return (
    <Dialog
      visible={visibledialog}
      style={{ width: "45rem" }}
      onHide={() => setVisibledialog(false)}
      header="Export"
      modal
      draggable={false}
    >
      {/* Export Type Selection */}
      <div className="flex gap-4">
        <div className="cursor-pointer">
          <div className="flex items-center gap-2">
            <RadioButton
              inputId="radioOption1"
              name="exportType"
              value="campaign"
              onChange={() => {
                setDataToExport((prev) => ({
                  ...prev,
                  type: "campaign",
                  campaignName: "",
                  fromDate: new Date(),
                  toDate: new Date(),
                  srno: 0,
                  isCustomField: 0,
                  customColumns: "",
                  campaignType: 0,
                  status: "",
                  deliveryStatus: {},
                }));
              }}
              checked={dataToExport.type === "campaign"}
            />
            <label
              htmlFor="radioOption1"
              className="text-gray-700 font-medium text-sm cursor-pointer"
            >
              Campaign-wise
            </label>
          </div>
        </div>

        <div className="cursor-pointer">
          <div className="flex items-center gap-2">
            <RadioButton
              inputId="radioOption2"
              name="exportType"
              value="custom"
              onChange={() => {
                setDataToExport((prev) => ({
                  ...prev,
                  type: "custom",
                  campaignName: "",
                  fromDate: new Date(),
                  toDate: new Date(),
                  srno: 0,
                  isCustomField: 0,
                  customColumns: "",
                  campaignType: 0,
                  status: "",
                  deliveryStatus: "",
                }));
                // setDataToExport({
                //   campaignName: "",
                //   fromDate: new Date(),
                //   toDate: new Date(),
                //   srno: 0,
                //   isCustomField: 0,
                //   customColumns: "",
                //   campaignType: "",
                //   status: "",
                //   delStatus: {},
                // });
              }}
              checked={dataToExport.type === "custom"}
            />
            <label
              htmlFor="radioOption2"
              className="text-gray-700 font-medium text-sm cursor-pointer"
            >
              Custom
            </label>
          </div>
        </div>
      </div>

      {/* Campaign Section */}
      {dataToExport.type === "campaign" && (
        <>
          <div className="mt-5">
            <AnimatedDropdown
              id="campaign"
              name="campaign"
              label="Select Campaign"
              options={allCampaigns?.map((item) => ({
                value: item.srno,
                label: item.campaignName,
              }))}
              onChange={(e) =>
                setDataToExport((prev) => ({
                  ...prev,
                  srno: e,
                }))
              }
              value={dataToExport.srno}
              placeholder="Search Campaign"
            />
          </div>

          {/* Custom Columns Radio */}
          <div className="flex items-center lg:gap-x-20 gap-x-10 my-6">
            <UniversalLabel text="Custom Columns" />
            <div className="flex gap-4">
              <div className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="radioOptionenable"
                    name="customFields"
                    value="enable"
                    onChange={() =>
                      setDataToExport((prev) => ({
                        ...prev,
                        isCustomField: 1,
                      }))
                    }
                    checked={dataToExport.isCustomField === 1}
                  />
                  <label
                    htmlFor="radioOptionenable"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Enable
                  </label>
                </div>
              </div>

              <div className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="radioOptiondisable"
                    name="customFields"
                    value="disable"
                    onChange={() =>
                      setDataToExport((prev) => ({
                        ...prev,
                        isCustomField: 0,
                      }))
                    }
                    checked={dataToExport.isCustomField === 0}
                  />
                  <label
                    htmlFor="radioOptiondisable"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Disable
                  </label>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {dataToExport.type === "custom" && (
        <>
          <div className="mt-4 ">
            <div className="flex justify-between gap-x-4">
              <UniversalDatePicker
                label="From Date:"
                value={dataToExport.fromDate}
                onChange={(e) =>
                  setDataToExport({ ...dataToExport, fromDate: e })
                }
                defaultValue={new Date()}
              />
              <UniversalDatePicker
                label="To Date:"
                value={dataToExport.toDate}
                onChange={(e) =>
                  setDataToExport({ ...dataToExport, toDate: e })
                }
                defaultValue={new Date()}
              />
            </div>

            <div className="flex justify-between gap-5 my-4">
              <div className="flex-1">
                <AnimatedDropdown
                  label="Select Type"
                  options={[
                    { value: 1, label: "Utility" },
                    { value: 2, label: "Marketing" },
                    { value: 3, label: "Authenication" },
                  ]}
                  value={dataToExport.campaignType}
                  onChange={(e) =>
                    setDataToExport({ ...dataToExport, campaignType: e })
                  }
                  placeholder="Select Type"
                />
              </div>

              <div className="flex-1">
                <AnimatedDropdown
                  label="Select Request"
                  options={[
                    { value: "Sent", label: "Sent" },
                    { value: "Failed", label: "Failed" },
                    { value: "Blocked", label: "Blocked" },
                  ]}
                  value={dataToExport.status}
                  onChange={(e) =>
                    setDataToExport({ ...dataToExport, status: e })
                  }
                  placeholder="Select Status"
                />
              </div>
            </div>

            <div className="flex justify-between gap-5 my-4">
              <div className="flex-1">
                <AnimatedDropdown
                  label="Select Source"
                  options={[
                    { value: "api", label: "Api" },
                    { value: "gui", label: "Gui" },
                  ]}
                  value={dataToExport.source}
                  onChange={(e) =>
                    setDataToExport({ ...dataToExport, source: e })
                  }
                  placeholder="Select Source"
                />
              </div>

              <div className="flex-1">
                <AnimatedDropdown
                  label="Select Delivery Status"
                  options={[
                    { value: "DELIVRD", label: "Delivered" },
                    { value: "UNDELIV", label: "Undelivered" },
                    { value: "failed", label: "Failed" },
                    { value: "read", label: "Read"}
                  ]}
                  value={dataToExport.deliveryStatus}
                  onChange={(e) =>
                    setDataToExport({ ...dataToExport, deliveryStatus: e })
                  }
                  placeholder="Select Delivery Status"
                />
              </div>
            </div>

            {/* <div className="flex flex-col mt-5">
              <UniversalLabel text="Delivery Status" />
              <div className="flex gap-x-5 lg:gap-x-20">
                <div className="flex items-center">
                  <Checkbox
                    id="delivered"
                    name="delivered"
                    onChange={(e) =>
                      handleDeliveryCheckboxChange(e, "delivered")
                    }
                    checked={dataToExport.delStatus["delivered"]}
                    className="m-2"
                  />
                  <label
                    htmlFor="delivered"
                    className="text-sm font-medium text-gray-800"
                  >
                    Delivered
                  </label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="undelivered"
                    name="undelivered"
                    onChange={(e) =>
                      handleDeliveryCheckboxChange(e, "undelivered")
                    }
                    checked={dataToExport.delStatus["undelivered"]}
                    className="m-2"
                  />
                  <label
                    htmlFor="undelivered"
                    className="text-sm font-medium text-gray-800"
                  >
                    Undelivered
                  </label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="rejected"
                    name="rejected"
                    onChange={(e) =>
                      handleDeliveryCheckboxChange(e, "rejected")
                    }
                    checked={dataToExport.delStatus["rejected"]}
                    className="m-2"
                  />
                  <label
                    htmlFor="rejected"
                    className="text-sm font-medium text-gray-800"
                  >
                    Rejected
                  </label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="pdr"
                    name="pdr"
                    onChange={(e) => handleDeliveryCheckboxChange(e, "pdr")}
                    checked={dataToExport.delStatus["pdr"]}
                    className="m-2"
                  />
                  <label
                    htmlFor="pdr"
                    className="text-sm font-medium text-gray-800"
                  >
                    PDR
                  </label>
                </div>
              </div>
            </div> */}

            <div className="flex my-4 gap-4">
              {/* <InputField
                label="Mobile Number"
                id="customdialognumber"
                name="customdialognumber"
                value={dataToExport.mobileNo}
                onChange={(e) =>
                  setDataToExport({ ...dataToExport, mobileNo: e.target.value })
                }
                placeholder="Enter mobile number..."
              /> */}
              {/* <AnimatedDropdown
                label="DTMF Count"
                id="dtmfResponse"
                name="dtmfResponse"
                options={[
                  { value: "0", label: "0" },
                  { value: "l", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                  { value: "6", label: "6" },
                  { value: "7", label: "7" },
                  { value: "8", label: "8" },
                  { value: "9", label: "9" },
                ]}
                onChange={(e) =>
                  setDataToExport({ ...dataToExport, dtmfResponse: e })
                }
                value={dataToExport.dtmfResponse}
                placeholder="DTMF Response"
              /> */}
            </div>
          </div>
          {/* Custom Columns Radio */}
          <div className="flex items-center lg:gap-x-20 gap-x-10 my-6">
            <UniversalLabel text="Custom Columns" />
            <div className="flex gap-4">
              <div className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="radioOptionenable"
                    name="customFields"
                    value="enable"
                    onChange={() =>
                      setDataToExport((prev) => ({
                        ...prev,
                        isCustomField: 1,
                      }))
                    }
                    checked={dataToExport.isCustomField === 1}
                  />
                  <label
                    htmlFor="radioOptionenable"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Enable
                  </label>
                </div>
              </div>

              <div className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <RadioButton
                    inputId="radioOptiondisable"
                    name="customFields"
                    value="disable"
                    onChange={() =>
                      setDataToExport((prev) => ({
                        ...prev,
                        isCustomField: 0,
                      }))
                    }
                    checked={dataToExport.isCustomField === 0}
                  />
                  <label
                    htmlFor="radioOptiondisable"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Disable
                  </label>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Conditional Custom Column Checkboxes */}
      {dataToExport.isCustomField === 1 && (
        <div>
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 ">
              <div className="flex items-center">
                <Checkbox
                  id="mobile_no"
                  name="mobile_no"
                  onChange={(e) => handleCheckboxChange(e, "mobile_no")}
                  checked={campaigncheckboxStates.mobile_no}
                  className="m-2"
                />
                <label
                  htmlFor="mobile_no"
                  className="text-sm font-medium text-gray-800"
                >
                  Mobile Number
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="charged_multiplier"
                  name="charged_multiplier"
                  onChange={(e) =>
                    handleCheckboxChange(e, "charged_multiplier")
                  }
                  checked={campaigncheckboxStates.charged_multiplier}
                  className="m-2"
                />
                <label
                  htmlFor="charged_multiplier"
                  className="text-sm font-medium text-gray-800"
                >
                  Charged Multiplier
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="status"
                  name="status"
                  onChange={(e) => handleCheckboxChange(e, "status")}
                  checked={campaigncheckboxStates.status}
                  className="m-2"
                />
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-800"
                >
                  Status
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="delivery_status"
                  name="delivery_status"
                  onChange={(e) => handleCheckboxChange(e, "delivery_status")}
                  checked={campaigncheckboxStates.delivery_status}
                  className="m-2"
                />
                <label
                  htmlFor="delivery_status"
                  className="text-sm font-medium text-gray-800"
                >
                  Delivery Status
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="que_time"
                  name="que_time"
                  onChange={(e) => handleCheckboxChange(e, "que_time")}
                  checked={campaigncheckboxStates.que_time}
                  className="m-2"
                />
                <label
                  htmlFor="que_time"
                  className="text-sm font-medium text-gray-800"
                >
                  Que Time
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="sent_time"
                  name="sent_time"
                  onChange={(e) => handleCheckboxChange(e, "sent_time")}
                  checked={campaigncheckboxStates.sent_time}
                  className="m-2"
                />
                <label
                  htmlFor="sent_time"
                  className="text-sm font-medium text-gray-800"
                >
                  Sent Time
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="delivery_time"
                  name="delivery_time"
                  onChange={(e) => handleCheckboxChange(e, "delivery_time")}
                  checked={campaigncheckboxStates.delivery_time}
                  className="m-2"
                />
                <label
                  htmlFor="delivery_time"
                  className="text-sm font-medium text-gray-800"
                >
                  Delivery Time
                </label>
              </div>

              {!dataToExport.type === "custom" ? (
                <div className="flex items-center">
                  <Checkbox
                    id="read_status"
                    name="read_status"
                    onChange={(e) => handleCheckboxChange(e, "read_status")}
                    checked={campaigncheckboxStates.read_status}
                    className="m-2"
                  />
                  <label
                    htmlFor="read_status"
                    className="text-sm font-medium text-gray-800"
                  >
                    Read Status
                  </label>
                </div>
              ) : (
                ""
              )}

              <div className="flex items-center">
                <Checkbox
                  id="reason"
                  name="reason"
                  onChange={(e) => handleCheckboxChange(e, "reason")}
                  checked={campaigncheckboxStates.reason}
                  className="m-2"
                />
                <label
                  htmlFor="reason"
                  className="text-sm font-medium text-gray-800"
                >
                  Reason
                </label>
              </div>

              {/* <div className="flex items-center">
                <Checkbox
                  id="deliveryStatus"
                  name="deliveryStatus"
                  onChange={(e) => handleCheckboxChange(e, "deliveryStatus")}
                  checked={campaigncheckboxStates.deliveryStatus}
                  className="m-2"
                />
                <label
                  htmlFor="deliveryStatus"
                  className="text-sm font-medium text-gray-800"
                >
                  Delivery Status
                </label>
              </div> */}

              {/* <div className="flex items-center">
                <Checkbox
                  id="keypress"
                  name="keypress"
                  onChange={(e) => handleCheckboxChange(e, "keypress")}
                  checked={campaigncheckboxStates.keypress}
                  className="m-2"
                />
                <label
                  htmlFor="keypress"
                  className="text-sm font-medium text-gray-800"
                >
                  Key Press
                </label>
              </div> */}

              {/* <div className="flex items-center">
                <Checkbox
                  id="action"
                  name="action"
                  onChange={(e) => handleCheckboxChange(e, "action")}
                  checked={campaigncheckboxStates.action}
                  className="m-2"
                />
                <label
                  htmlFor="action"
                  className="text-sm font-medium text-gray-800"
                >
                  Action
                </label>
              </div> */}

              {/* <div className="flex items-center">
                <Checkbox
                  id="source"
                  name="source"
                  onChange={(e) => handleCheckboxChange(e, "source")}
                  checked={campaigncheckboxStates.source}
                  className="m-2"
                />
                <label
                  htmlFor="source"
                  className="text-sm font-medium text-gray-800"
                >
                  Source
                </label>
              </div> */}
            </div>
          </>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-center mt-6">
        <UniversalButton
          id="exportSmsBtn"
          name="exportSmsBtn"
          label="Export"
          onClick={handleExport}
        />
      </div>
    </Dialog>
  );
};
