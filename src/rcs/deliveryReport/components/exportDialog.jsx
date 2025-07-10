// import { Dialog } from "primereact/dialog";
// import { RadioButton } from "primereact/radiobutton";
// import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
// import UniversalLabel from "@/whatsapp/components/UniversalLabel";
// import UniversalButton from "@/components/common/UniversalButton";
// import { useEffect, useState } from "react";
// import Checkbox from "@mui/material/Checkbox";
// import toast from "react-hot-toast";
// import { downloadCustomSmsReport } from "@/apis/sms/sms";
// import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
// import InputField from "@/whatsapp/components/InputField";
// import { exportData } from "@/apis/rcs/rcs";
// import { useDownload } from "@/context/DownloadProvider";

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
//     // delete dataToExport.type

//     const payload = {
//       ...dataToExport,
//       fromDate: dataToExport.fromDate
//         ? new Date(dataToExport.fromDate).toLocaleDateString("en-GB")
//         : "",
//       toDate: dataToExport
//         ? new Date(dataToExport.toDate).toLocaleDateString("en-GB")
//         : "",
//       type: dataToExport?.type === "campaign" ? "1" : "2",
//     };

//     try {
//       const res = await exportData(payload);
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
//       //   draggable={false}
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
//                     id="answered"
//                     name="answered"
//                     onChange={(e) =>
//                       handleDeliveryCheckboxChange(e, "answered")
//                     }
//                     checked={dataToExport.delStatus["answered"]}
//                     className="m-2"
//                   />
//                   <label
//                     htmlFor="answered"
//                     className="text-sm font-medium text-gray-800"
//                   >
//                     Answered
//                   </label>
//                 </div>

//                 <div className="flex items-center">
//                   <Checkbox
//                     id="unanswered"
//                     name="unanswered"
//                     onChange={(e) =>
//                       handleDeliveryCheckboxChange(e, "unanswered")
//                     }
//                     checked={dataToExport.delStatus["unanswered"]}
//                     className="m-2"
//                   />
//                   <label
//                     htmlFor="unanswered"
//                     className="text-sm font-medium text-gray-800"
//                   >
//                     Unanswered
//                   </label>
//                 </div>

//                 <div className="flex items-center">
//                   <Checkbox
//                     id="dialed"
//                     name="dialed"
//                     onChange={(e) => handleDeliveryCheckboxChange(e, "dialed")}
//                     checked={dataToExport.delStatus["dialed"]}
//                     className="m-2"
//                   />
//                   <label
//                     htmlFor="dialed"
//                     className="text-sm font-medium text-gray-800"
//                   >
//                     Dialed
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
//               {/* <div className="flex items-center"> */}
//               {/* campaignName: false,
//     templateName: false,
//     templateType: false,
//     templateCategory: false,
//     status: false,
//     totalAudience: false, */}
//               {[
//                 { id: "campaignName", label: "Campaign Name" },
//                 { id: "templateName", label: "Template Name" },
//                 { id: "templateType", label: "Template Type" },
//                 { id: "templateCategory", label: "Template Category" },
//                 { id: "status", label: "Status" },
//                 { id: "totalAudience", label: "Total Audience" },
//               ].map((item, index) => (
//                 <div className="flex items-center">
//                   <Checkbox
//                     id={item.id}
//                     name={item.id}
//                     onChange={(e) => handleCheckboxChange(e, item.id)}
//                     checked={campaigncheckboxStates[item.id]}
//                     className="m-2"
//                   />
//                   <label
//                     htmlFor={item.id}
//                     className="text-sm font-medium text-gray-800"
//                   >
//                     {item.label}
//                   </label>
//                 </div>
//               ))}
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
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import InputField from "@/whatsapp/components/InputField";
import { exportData } from "@/apis/rcs/rcs";
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
    mobileNo: false,
    callType: false,
    totalUnits: false,
    queueTime: false,
    sentTime: false,
    deliveryTime: false,
    callDuration: false,
    retryCount: false,
    callStatus: false,
    deliveryStatus: false,
    keypress: false,
    action: false,
    source: false,
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
    // console.log("dataToExport", dataToExport);
    // delete dataToExport.type

    const payload = {
      ...dataToExport,
      ...(dataToExport?.type === "custom" && {
        fromDate: dataToExport.fromDate
          ? new Date(dataToExport.fromDate).toISOString().split("T")[0]
          : "",
        toDate: dataToExport.toDate
          ? new Date(dataToExport.toDate).toISOString().split("T")[0]
          : "",
      }),
      type: dataToExport?.type === "campaign" ? "1" : "2",
    };

    try {
      const res = await exportData(payload);
      if (!res.status) return toast.error(res.msg);
      toast.success(res.msg);
      setDataToExport({
        campaignName: "",
        fromDate: "",
        toDate: "",
        srno: 0,
        isCustomField: 0,
        customColumns: "",
        campaignType: "",
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
      mobileNo: false,
      callType: false,
      totalUnits: false,
      queueTime: false,
      sentTime: false,
      deliveryTime: false,
      callDuration: false,
      retryCount: false,
      callStatus: false,
      deliveryStatus: false,
      keypress: false,
      action: false,
      source: false,
    });
  }, [dataToExport?.type, dataToExport?.isCustomField]);

  return (
    <Dialog
      visible={visibledialog}
      style={{ width: "45rem" }}
      onHide={() => setVisibledialog(false)}
      header="Export"
      modal
      //   draggable={false}
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
                  campaignType: "",
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
                  campaignType: "",
                  status: "",
                  deliveryStatus: {},
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
                    { value: "0", label: "Promotional" },
                    { value: "1", label: "Transactional" },
                    { value: "2", label: "Both" },
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
                    { value: "READ", label: "Read" },
                    { value: "FAILED", label: "Failed" },
                    // { value: "BLOCKED", label: "Blocked" },
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
                    htmlFor="dialed"
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
              {/* <div className="flex items-center"> */}
              {/* campaignName: false,
    templateName: false,
    templateType: false,
    templateCategory: false,
    status: false,
    totalAudience: false, */}
              {[
                { id: "campaignName", label: "Campaign Name" },
                { id: "templateName", label: "Template Name" },
                { id: "templateType", label: "Template Type" },
                { id: "templateCategory", label: "Template Category" },
                { id: "status", label: "Status" },
                { id: "totalAudience", label: "Total Audience" },
              ].map((item, index) => (
                <div className="flex items-center">
                  <Checkbox
                    id={item.id}
                    name={item.id}
                    onChange={(e) => handleCheckboxChange(e, item.id)}
                    checked={campaigncheckboxStates[item.id]}
                    className="m-2"
                  />
                  <label
                    htmlFor={item.id}
                    className="text-sm font-medium text-gray-800"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
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
