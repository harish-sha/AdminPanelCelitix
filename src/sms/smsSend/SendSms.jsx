import React, { useEffect, useState } from "react";
import { Grid1 } from "./components/grid1";
import { getAllTemplates } from "@/apis/sms/sms";
import { RadioButtonLaunchSms } from "./components/RadioButtonLaunchSms";
import { getAllGroups, getCountryList } from "@/apis/common/common";
import toast from "react-hot-toast";
import UniversalButton from "@/components/common/UniversalButton";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "@material-tailwind/react";

const SendSms = () => {
  const [inputDetails, setInputDetails] = useState({
    campaingName: "",
    templateId: "",
    entityId: "",
    unicode: 0,
    message: "",
    templateType: 1,
  });

  const [allTemplates, setAllTemplates] = useState([]);

  const [selectedOption, setSelectedOption] = useState("group");
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGrp, setselectedGrp] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [contactData, setContactData] = useState({});
  const [countryList, setCountryList] = useState([]);

  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  const [totalAudience, setTotalAudience] = useState(0);
  const [scheduleData, setScheduleData] = useState({
    isSchedule: false,
    time: new Date(),
  });

  useEffect(() => {
    if (!inputDetails?.templateType) return;
    async function handleFetchAllTemplates() {
      try {
        const res = await getAllTemplates(inputDetails?.templateType);
        setAllTemplates(res);
      } catch (e) {
        // console.log(e);
      }
    }

    handleFetchAllTemplates();
  }, [inputDetails?.templateType]);

  useEffect(() => {
    async function fetchAllGrps() {
      try {
        const res = await getAllGroups();
        setAllGroups(res);
      } catch (e) {
        // console.log(e);
        toast.error("Something went wrong.");
      }
    }

    async function handlefetchAllCountry() {
      try {
        const res = await getCountryList();
        setCountryList(res);
      } catch (e) {
        // console.log(e);
        toast.error("Something went wrong.");
      }
    }

    handlefetchAllCountry();
    fetchAllGrps();
  }, []);

  function handleReview() {
    let isError = false;

    if (!inputDetails?.campaingName) {
      return toast.error("Please enter a campaign name.");
    }
    if (!inputDetails?.message) {
      return toast.error("Please enter a message.");
    }
    if (!inputDetails?.unicode) {
      return toast.error("Please enter a language.");
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

    if (selectedOption === "contact" && !uploadFile) {
      return toast.error("Please upload a file.");
    }

    if (selectedOption === "contact") {
      setTotalAudience(contactData?.totalRecords);
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

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
        <Grid1
          setInputDetails={setInputDetails}
          inputDetails={inputDetails}
          headers={contactData?.fileHeaders || []}
        />
        <RadioButtonLaunchSms
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

      <UniversalButton
        label="Review"
        onClick={handleReview}
        style={{
          width: "200px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
        }}
      />

      <Dialog
        header="Confirm Details"
        visible={confirmDialogVisible}
        style={{ width: "30rem" }}
        onHide={() => {
          setConfirmDialogVisible(false);
        }}
        draggable={false}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-2 p-3 space-y-2 text-gray-800 bg-gray-100 rounded-md shadow-lg text-md">
            {/* <span className="font-semibold font-m">WABA Account : </span>
            <p className="">
              {allAgents?.find(
                (agents) => agents.agent_id === campaignDetails.agent
              )?.agent_name || "N/A"}
            </p>
            
           
            <span className="font-semibold font-m">Template Name : </span>
            <p className="">
              {allTemplates?.find(
                (template) => template.srno === campaignDetails.templateSrno
              )?.templateName || "N/A"}
            </p>
            
           
            <span className="font-semibold font-m">Template Type : </span>
            <p className="">
              {" "}
              {allTemplates?.find(
                (template) => template.srno === campaignDetails.templateSrno
              )?.templateType || "N/A"}
            </p>
            

           
            <span className="font-semibold font-m">Campaign Name : </span>
            <p className="w-full break-words">
              {campaignDetails.campaignName || "N/A"}
            </p>
             */}

            <span className="font-semibold font-m">Total Audience : </span>
            <p className="">
              {totalAudience || contactData.totalContacts || "N/A"}
            </p>
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
              onClick={() => { }}
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

export default SendSms;
