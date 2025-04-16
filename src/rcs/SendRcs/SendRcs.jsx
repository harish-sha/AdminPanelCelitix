// import React, { useEffect } from "react";
// import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
// import InputField from "@/whatsapp/components/InputField";
// import { HandleCampaignDetails } from "./components/CampaignInputDetails";
// import { RadioButtonLaunchCampaign } from "./components/RadioButtonLaunchCampaign";
// import { Preview } from "./components/Preview";
// import { useState } from "react";
// import {
//   fetchAllAgents,
//   fetchAllTemplates,
//   fetchTemplateDetails,
//   launchCampaign,
// } from "@/apis/rcs/rcs";
// import toast from "react-hot-toast";
// import { getAllGroups } from "@/apis/common/common";
// import { VariableManager } from "./components/VariableManager";
// import UniversalButton from "@/components/common/UniversalButton";
// import { Dialog } from "primereact/dialog";
// import { Calendar } from "primereact/calendar";
// import { Checkbox } from "@mui/material";
// import moment from "moment";

// const SendRcs = () => {
//   const [allAgents, setAllAgents] = useState([]);
//   const [allTemplates, setAllTemplates] = useState([]);
//   const [campaignDetails, setCampaignDetails] = useState({
//     agent: "",
//     campaignName: "",
//     templateSrno: "",
//   });
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   //radio button
//   const [selectedOption, setSelectedOption] = useState("group");
//   const [allGroups, setAllGroups] = useState([]);
//   const [selectedGrp, setselectedGrp] = useState("");
//   const [uploadFile, setUploadFile] = useState(null);
//   const [contactData, setContactData] = useState({});
//   const [countryList, setCountryList] = useState([]);

//   //variable
//   const [varLength, setVarLength] = useState(0);
//   const [varList, setVarList] = useState([]);
//   const [inputVariables, setInputVariables] = useState([]);

//   //preview
//   const [templateDetails, setTemplateDetails] = useState([]);

//   const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
//   const [totalAudience, setTotalAudience] = useState(0);
//   const [scheduleData, setScheduleData] = useState({
//     isSchedule: false,
//     time: new Date(),
//   });

//   function extractVariable(data) {
//     const variable = data[0].content;
//     const match = variable.match(/{#(.+?)#}/g);

//     setVarLength(match?.length);
//     setVarList(match);
//   }

//   useEffect(() => {
//     async function handleFetchAllAgents() {
//       try {
//         const res = await fetchAllAgents();
//         setAllAgents(res);
//       } catch (e) {
//         console.log(e);
//         toast.error("Something went wrong.");
//       }
//     }

//     async function fetchAllGrps() {
//       try {
//         const res = await getAllGroups();
//         setAllGroups(res);
//       } catch (e) {
//         console.log(e);
//         toast.error("Something went wrong.");
//       }
//     }

//     handleFetchAllAgents();
//     fetchAllGrps();
//   }, []);

//   useEffect(() => {
//     async function handleFetchAllTemplates() {
//       try {
//         const res = await fetchAllTemplates(campaignDetails?.agent);
//         setAllTemplates(res?.Data);
//       } catch (e) {
//         console.log(e);
//         toast.error("Something went wrong.");
//       }
//     }
//     async function handleFetchTemplateDetails() {
//       if (!campaignDetails?.templateSrno) return;
//       try {
//         const res = await fetchTemplateDetails(campaignDetails?.templateSrno);
//         extractVariable(res);
//         setTemplateDetails(res);
//       } catch (e) {
//         console.log(e);
//         toast.error("Something went wrong.");
//       }
//     }

//     handleFetchAllTemplates();
//     handleFetchTemplateDetails();
//   }, [campaignDetails]);

//   function handleReview() {
//     let isError = false;

//     if (!campaignDetails.agent) {
//       return toast.error("Please select an agent.");
//     }
//     if (!campaignDetails.campaignName) {
//       return toast.error("Please enter a campaign name.");
//     }
//     if (!campaignDetails.templateSrno) {
//       return toast.error("Please select a template.");
//     }
//     if (selectedOption === "group" && !selectedGrp) {
//       return toast.error("Please select a group.");
//     }

//     if (selectedOption === "group") {
//       let totalGrpCount = 0;
//       selectedGrp?.map((grp) => {
//         const length = allGroups.find(
//           (group) => group.groupCode === grp
//         ).totalCount;
//         totalGrpCount += Number(length);
//       });
//       if (totalGrpCount === 0) {
//         return toast.error("Selected group has no contacts.");
//       }
//       setTotalAudience(totalGrpCount);
//     }

//     if (varLength !== Object.keys(inputVariables).length) {
//       return toast.error("Please enter all variables.");
//     }

//     if (selectedOption === "contact" && !uploadFile) {
//       return toast.error("Please upload a file.");
//     }

//     if (
//       selectedOption === "contact" &&
//       contactData.addcountryCode &&
//       !contactData.selectedCountryCode
//     ) {
//       return toast.error("Please choose a country code.");
//     }
//     if (selectedOption === "contact" && !contactData.selectedMobileColumn) {
//       return toast.error("Please choose a mobile number field.");
//     }
//     if (isError) return;

//     console.log("All Validation Pass");
//     setConfirmDialogVisible(true);
//   }

//   async function handleFinalSend() {
//     const type = allTemplates?.find(
//       (template) => template.srno === campaignDetails.templateSrno
//     )?.templateType;

//     const allVar = [];
//     Object.keys(inputVariables).map((key) => {
//       allVar.push(inputVariables[key]);
//     });

//     console.log(allVar);

//     let data = {
//       agent: campaignDetails?.agent,
//       campaignName: campaignDetails?.campaignName,
//       templateSrno: campaignDetails?.templateSrno,
//       variableList: [],
//       variables: allVar,
//       totalCount:
//         selectedOption === "group" ? totalAudience : contactData?.totalRecords,
//       templateType: type,
//       mobileNumberIndex: "-1",
//       isGroup: selectedOption === "group" ? true : false,
//       countryCode: "0",
//       groupSrNoList: selectedOption === "group" ? selectedGrp : [],
//       isSchedule: "0",
//     };
//     if (scheduleData?.isSchedule && !scheduleData?.time) {
//       return toast.error("Please select a time.");
//     }
//     if (scheduleData?.isSchedule && scheduleData?.time < new Date()) {
//       return toast.error("Please select a valid time.");
//     }

//     if (scheduleData?.isSchedule) {
//       data = {
//         ...data,
//         isSchedule: "1",
//         scheduleTime: moment(scheduleData?.time).format("YYYY-MM-DD HH:mm:ss"),
//       };
//     }

//     if (contactData?.addcountryCode) {
//       data = {
//         ...data,
//         countryCode: contactData?.selectedCountryCode,
//       };
//     }
//     try {
//       const res = await launchCampaign(data);
//       if (res?.status === "success") {
//         toast.success(res?.message);
//         // setAllAgents([])
//         setAllTemplates([]);
//         setCampaignDetails({ agent: "", campaignName: "", templateSrno: "" });
//         setSelectedIndex(0);

//         setSelectedOption("group");
//         setAllGroups([]);
//         setselectedGrp("");
//         setUploadFile(null);
//         setContactData({});
//         setCountryList([]);

//         setVarLength(0);
//         setVarList([]);
//         setInputVariables([]);

//         setConfirmDialogVisible(false);
//         setTotalAudience(0);
//         setScheduleData({
//           isSchedule: false,
//           time: "",
//         });
//       }
//     } catch (e) {
//       console.log(e);
//       toast.error("Something went wrong.");
//       return;
//     }
//   }

//   return (
//     <>
//       <div className="grid grid-cols-1 gap-2 md:grid-cols-3 ">
//         <div className=" p-2 shadow-md rounded-md">
//           <HandleCampaignDetails
//             setCampaignDetails={setCampaignDetails}
//             campaignDetails={campaignDetails}
//             allAgents={allAgents}
//             allTemplates={allTemplates}
//             setTemplateDetails={setTemplateDetails}
//             setVarList={setVarList}
//             setInputVariables={setInputVariables}
//             setVarLength={setVarLength}
//           />
//           <VariableManager
//             templateDetails={templateDetails}
//             varLength={varLength}
//             setVarList={setVarList}
//             varList={varList}
//             setInputVariables={setInputVariables}
//             inputVariables={inputVariables}
//           />
//         </div>
//         <div>
//           <RadioButtonLaunchCampaign
//             allGroups={allGroups}
//             setSelectedOption={setSelectedOption}
//             selectedOption={selectedOption}
//             selectedGrp={selectedGrp}
//             setselectedGrp={setselectedGrp}
//             setUploadedFile={setUploadFile}
//             uploadedFile={uploadFile}
//             setContactData={setContactData}
//             contactData={contactData}
//             countryList={countryList}
//           />
//         </div>
//         <div>
//           <Preview
//             templateDetails={templateDetails}
//             selectedIndex={selectedIndex}
//             setSelectedIndex={setSelectedIndex}
//             inputVariables={inputVariables}
//           />
//         </div>
//       </div>

//       <div className="flex justify-center items-center mt-5">
//         <UniversalButton
//           label={"Review"}
//           onClick={handleReview}
//           style={{ width: "200px" }}
//         />
//       </div>

//       <Dialog
//         header="Confirm Details"
//         visible={confirmDialogVisible}
//         style={{ width: "35rem" }}
//         onHide={() => {
//           setConfirmDialogVisible(false);
//         }}
//         draggable={false}
//       >
//         <div className="space-y-5">
//           <div>
//             <p className="text-lg font-semibold">
//               Are you sure you want to send this campaign?
//             </p>
//           </div>

//           <div className="grid grid-cols-2 p-3 space-y-2 text-gray-800 bg-gray-100 rounded-md shadow-lg text-md">
//             <div>
//               <span className="font-semibold font-m">WABA Account : </span>
//               <p className="">
//                 {allAgents?.find(
//                   (agents) => agents.agent_id === campaignDetails.agent
//                 )?.agent_name || "N/A"}
//               </p>
//             </div>
//             <div>
//               <span className="font-semibold font-m">Template Name : </span>
//               <p className="">
//                 {allTemplates?.find(
//                   (template) => template.srno === campaignDetails.templateSrno
//                 )?.templateName || "N/A"}
//               </p>
//             </div>
//             <div>
//               <span className="font-semibold font-m">Template Type : </span>
//               <p className="">
//                 {" "}
//                 {allTemplates?.find(
//                   (template) => template.srno === campaignDetails.templateSrno
//                 )?.templateType || "N/A"}
//               </p>
//             </div>

//             <div>
//               <span className="font-semibold font-m">Campaign Name : </span>
//               <p className="w-full break-words">
//                 {campaignDetails.campaignName || "N/A"}
//               </p>
//             </div>
//             <div>
//               <span className="font-semibold font-m">Total Audience : </span>
//               <p className="">
//                 {totalAudience || contactData.totalContacts || "N/A"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Checkbox
//               inputId="scheduleCheckbox"
//               checked={scheduleData.isSchedule}
//               onChange={(e) => {
//                 setScheduleData((prev) => ({
//                   ...prev,
//                   isSchedule: e.target.checked,
//                 }));
//               }}
//             />
//             <label htmlFor="scheduleCheckbox" className="text-md">
//               Schedule
//             </label>
//             {scheduleData.isSchedule && (
//               <Calendar
//                 id="scheduleDateTime"
//                 value={scheduleData.time}
//                 onChange={(e) => {
//                   console.log(e);
//                   setScheduleData((prev) => ({
//                     ...prev,
//                     time: e.target.value,
//                   }));
//                 }}
//                 showTime
//                 hourFormat="12"
//                 minDate={new Date()}
//                 dateFormat="dd/mm/yy"
//               />
//             )}
//           </div>

//           <div className="flex items-center justify-center">
//             <UniversalButton
//               label="Send Campaign"
//               onClick={handleFinalSend}
//               style={{
//                 borderRadius: "40px",
//                 letterSpacing: "1px",
//               }}
//               variant="primary"
//             />
//           </div>
//         </div>
//       </Dialog>
//     </>
//   );
// };

// export default SendRcs;


import React, { useEffect } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { HandleCampaignDetails } from "./components/CampaignInputDetails";
import { RadioButtonLaunchCampaign } from "./components/RadioButtonLaunchCampaign";
import { Preview } from "./components/Preview";
import { useState } from "react";
import {
  fetchAllAgents,
  fetchAllTemplates,
  fetchTemplateDetails,
  launchCampaign,
} from "@/apis/rcs/rcs";
import toast from "react-hot-toast";
import { getAllGroups } from "@/apis/common/common";
import { VariableManager } from "./components/VariableManager";
import UniversalButton from "@/components/common/UniversalButton";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "@mui/material";
import moment from "moment";

const SendRcs = () => {
  const [allAgents, setAllAgents] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState({
    agent: "",
    campaignName: "",
    templateSrno: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  //radio button
  const [selectedOption, setSelectedOption] = useState("group");
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGrp, setselectedGrp] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [contactData, setContactData] = useState({});
  const [countryList, setCountryList] = useState([]);

  //variable
  const [varLength, setVarLength] = useState(0);
  const [varList, setVarList] = useState([]);
  const [inputVariables, setInputVariables] = useState([]);

  //preview
  const [templateDetails, setTemplateDetails] = useState([]);

  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [totalAudience, setTotalAudience] = useState(0);
  const [scheduleData, setScheduleData] = useState({
    isSchedule: false,
    time: new Date(),
  });
  const [carVar, setCarVar] = useState({
    length: 0,
    data: {},
  });
  const [carVarInput, setCarVarInput] = useState([]);

  function extractVariable(data) {
    let variable = "";

    if (data.length === 1) {
      variable = data[0].content;
      const match = variable.match(/{#(.+?)#}/g);

      setVarLength(match?.length);
      setVarList(match);
    }

    if (data.length > 1) {
      data?.map((item, index) => {
        let count = "";
        variable = item.content;
        const match = variable.match(/{#(.+?)#}/g);

        setCarVar((prev) => ({
          ...prev,
          length: prev?.length + match?.length,
          data: {
            ...prev.data,
            [index]: match,
          },
        }));
      });
    }
  }

  useEffect(() => {
    console.log(carVar);
  }, [carVar]);

  useEffect(() => {
    async function handleFetchAllAgents() {
      try {
        const res = await fetchAllAgents();
        setAllAgents(res);
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong.");
      }
    }

    async function fetchAllGrps() {
      try {
        const res = await getAllGroups();
        setAllGroups(res);
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong.");
      }
    }

    handleFetchAllAgents();
    fetchAllGrps();
  }, []);

  useEffect(() => {
    async function handleFetchAllTemplates() {
      try {
        const res = await fetchAllTemplates(campaignDetails?.agent);
        setAllTemplates(res?.Data);
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong.");
      }
    }
    async function handleFetchTemplateDetails() {
      if (!campaignDetails?.templateSrno) return;
      try {
        const res = await fetchTemplateDetails(campaignDetails?.templateSrno);
        extractVariable(res);
        setTemplateDetails(res);
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong.");
      }
    }

    handleFetchAllTemplates();
    handleFetchTemplateDetails();
  }, [campaignDetails]);

  function handleReview() {
    let isError = false;

    if (!campaignDetails.agent) {
      return toast.error("Please select an agent.");
    }
    if (!campaignDetails.campaignName) {
      return toast.error("Please enter a campaign name.");
    }
    if (!campaignDetails.templateSrno) {
      return toast.error("Please select a template.");
    }
    if (selectedOption === "group" && !selectedGrp) {
      return toast.error("Please select a group.");
    }

    if (selectedOption === "group") {
      let totalGrpCount = 0;
      selectedGrp?.map((grp) => {
        const length = allGroups.find(
          (group) => group.groupCode === grp
        ).totalCount;
        totalGrpCount += Number(length);
      });
      if (totalGrpCount === 0) {
        return toast.error("Selected group has no contacts.");
      }
      setTotalAudience(totalGrpCount);
    }

    if (varLength !== Object.keys(inputVariables).length) {
      return toast.error("Please enter all variables.");
    }

    if (selectedOption === "contact" && !uploadFile) {
      return toast.error("Please upload a file.");
    }

    if (
      selectedOption === "contact" &&
      contactData.addcountryCode &&
      !contactData.selectedCountryCode
    ) {
      return toast.error("Please choose a country code.");
    }
    if (selectedOption === "contact" && !contactData.selectedMobileColumn) {
      return toast.error("Please choose a mobile number field.");
    }
    if (isError) return;

    setConfirmDialogVisible(true);
  }

  async function handleFinalSend() {
    const type = allTemplates?.find(
      (template) => template.srno === campaignDetails.templateSrno
    )?.templateType;

    const allVar = [];
    Object.keys(inputVariables).map((key) => {
      allVar.push(inputVariables[key]);
    });

    let data = {
      agent: campaignDetails?.agent,
      campaignName: campaignDetails?.campaignName,
      templateSrno: campaignDetails?.templateSrno,
      variableList: [],
      variables: allVar,
      totalCount:
        selectedOption === "group" ? totalAudience : contactData?.totalRecords,
      templateType: type,
      mobileNumberIndex: "-1",
      isGroup: selectedOption === "group" ? true : false,
      countryCode: "0",
      groupSrNoList: selectedOption === "group" ? selectedGrp : [],
      isSchedule: "0",
    };
    if (scheduleData?.isSchedule && !scheduleData?.time) {
      return toast.error("Please select a time.");
    }
    if (scheduleData?.isSchedule && scheduleData?.time < new Date()) {
      return toast.error("Please select a valid time.");
    }

    if (scheduleData?.isSchedule) {
      data = {
        ...data,
        isSchedule: "1",
        scheduleTime: moment(scheduleData?.time).format("YYYY-MM-DD HH:mm:ss"),
      };
    }

    if (contactData?.addcountryCode) {
      data = {
        ...data,
        countryCode: contactData?.selectedCountryCode,
      };
    }
    try {
      const res = await launchCampaign(data);
      if (res?.status === "success") {
        toast.success(res?.message);
        // setAllAgents([])
        setAllTemplates([]);
        setCampaignDetails({ agent: "", campaignName: "", templateSrno: "" });
        setSelectedIndex(0);

        setSelectedOption("group");
        setAllGroups([]);
        setselectedGrp("");
        setUploadFile(null);
        setContactData({});
        setCountryList([]);

        setVarLength(0);
        setVarList([]);
        setInputVariables([]);

        setConfirmDialogVisible(false);
        setTotalAudience(0);
        setScheduleData({
          isSchedule: false,
          time: "",
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
      return;
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 ">
        <div className=" p-2">
          <HandleCampaignDetails
            setCampaignDetails={setCampaignDetails}
            campaignDetails={campaignDetails}
            allAgents={allAgents}
            allTemplates={allTemplates}
            setTemplateDetails={setTemplateDetails}
            setVarList={setVarList}
            setInputVariables={setInputVariables}
            setVarLength={setVarLength}
            setCarVar={setCarVar}
          />
          <VariableManager
            templateDetails={templateDetails}
            varLength={varLength}
            setVarList={setVarList}
            varList={varList}
            setInputVariables={setInputVariables}
            inputVariables={inputVariables}
            carVar={carVar}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            carVarInput={carVarInput}
            setCarVarInput={setCarVarInput}
          />
        </div>
        <div>
          <RadioButtonLaunchCampaign
            allGroups={allGroups}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            selectedGrp={selectedGrp}
            setselectedGrp={setselectedGrp}
            setUploadedFile={setUploadFile}
            uploadedFile={uploadFile}
            setContactData={setContactData}
            contactData={contactData}
            countryList={countryList}
          />
        </div>
        <div>
          <Preview
            templateDetails={templateDetails}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            inputVariables={inputVariables}
          />
        </div>
      </div>

      <div className="flex justify-center items-center mt-5">
        <UniversalButton
          label={"Review"}
          onClick={handleReview}
          style={{ width: "200px" }}
        />
      </div>

      <Dialog
        header="Confirm Details"
        visible={confirmDialogVisible}
        style={{ width: "35rem" }}
        onHide={() => {
          setConfirmDialogVisible(false);
        }}
        draggable={false}
      >
        <div className="space-y-5">
          <div>
            <p className="text-lg font-semibold">
              Are you sure you want to send this campaign?
            </p>
          </div>

          <div className="grid grid-cols-2 p-3 space-y-2 text-gray-800 bg-gray-100 rounded-md shadow-lg text-md">
            <div>
              <span className="font-semibold font-m">WABA Account : </span>
              <p className="">
                {allAgents?.find(
                  (agents) => agents.agent_id === campaignDetails.agent
                )?.agent_name || "N/A"}
              </p>
            </div>
            <div>
              <span className="font-semibold font-m">Template Name : </span>
              <p className="">
                {allTemplates?.find(
                  (template) => template.srno === campaignDetails.templateSrno
                )?.templateName || "N/A"}
              </p>
            </div>
            <div>
              <span className="font-semibold font-m">Template Type : </span>
              <p className="">
                {" "}
                {allTemplates?.find(
                  (template) => template.srno === campaignDetails.templateSrno
                )?.templateType || "N/A"}
              </p>
            </div>

            <div>
              <span className="font-semibold font-m">Campaign Name : </span>
              <p className="w-full break-words">
                {campaignDetails.campaignName || "N/A"}
              </p>
            </div>
            <div>
              <span className="font-semibold font-m">Total Audience : </span>
              <p className="">
                {totalAudience || contactData.totalContacts || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              inputId="scheduleCheckbox"
              checked={scheduleData.isSchedule}
              onChange={(e) => {
                setScheduleData((prev) => ({
                  ...prev,
                  isSchedule: e.target.checked,
                }));
              }}
            />
            <label htmlFor="scheduleCheckbox" className="text-md">
              Schedule
            </label>
            {scheduleData.isSchedule && (
              <Calendar
                id="scheduleDateTime"
                value={scheduleData.time}
                onChange={(e) => {
                  setScheduleData((prev) => ({
                    ...prev,
                    time: e.target.value,
                  }));
                }}
                showTime
                hourFormat="12"
                minDate={new Date()}
                dateFormat="dd/mm/yy"
              />
            )}
          </div>

          <div className="flex items-center justify-center">
            <UniversalButton
              label="Send Campaign"
              onClick={handleFinalSend}
              style={{
                borderRadius: "40px",
                letterSpacing: "1px",
              }}
              variant="primary"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SendRcs;