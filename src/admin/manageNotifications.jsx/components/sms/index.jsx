import React, { useEffect, useState } from "react";
import { Grid1 } from "./components/grid1";
import { getAllTemplates, sendSms } from "@/apis/sms/sms";
import { getAllGroups, getCountryList } from "@/apis/common/common";
import toast from "react-hot-toast";
import UniversalButton from "@/components/common/UniversalButton";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "@material-tailwind/react";
import moment from "moment";
import { isEnglish } from "./helper/isEnglish";
import { Preview } from "./components/Preview";
import { getSpeicificNotification, saveNotification } from "@/apis/admin/admin";

export const SMS = ({ state, allVar }) => {
  const [inputDetails, setInputDetails] = useState({
    campaingName: "",
    templateId: "",
    entityId: "",
    unicode: 0,
    message: "",
    templateType: 1,
    senderId: "",
    sender: [],
    attachmentType: null,
    attachmentVar: {},
    shortUrl: 0,
  });

  const [allTemplates, setAllTemplates] = useState([]);

  useEffect(() => {
    // if (!inputDetails?.templateType) return;
    async function handleFetchAllTemplates() {
      try {
        const res = await getAllTemplates("all");
        setAllTemplates(res);
      } catch (e) {
        // console.log(e);
      }
    }

    handleFetchAllTemplates();
  }, []);

  useEffect(() => {
    if (!inputDetails?.templateId) return;
    const data = allTemplates?.find(
      (template) => template.templateId === inputDetails?.templateId
    );

    // console.log(data);

    setInputDetails({
      ...inputDetails,
      message: data?.message,
      // sender: [data?.senderID],
      sender: data?.senderID?.split(","),
    });
  }, [inputDetails?.templateId]);

  useEffect(() => {
    const isEnglishText = isEnglish(inputDetails?.message);

    setInputDetails({
      ...inputDetails,
      unicode: isEnglishText ? 0 : 1,
    });
  }, [inputDetails?.message]);

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function replaceVarWithActualValue(type, message, vars) {
    const tag = `{#${type}#}`;
    const value = vars?.[tag];
    if (!value) return message;
    const rg = new RegExp(escapeRegExp(tag), "g");
    return message.replace(rg, value);
  }

  async function handleSave() {
    let isError = false;

    if (inputDetails?.templateType === 1 && !inputDetails?.templateId) {
      return toast.error("Please select a template.");
    }

    if (inputDetails?.templateType === 2 && !inputDetails?.templateId) {
      return toast.error("Please select a template.");
    }

    if (!inputDetails?.message) {
      return toast.error("Please enter a message.");
    }

    if (!inputDetails?.senderId) {
      return toast.error("Please enter a sender ID.");
    }

    if (!inputDetails?.templateType) {
      return toast.error("Please select a template type.");
    }

    let messages = replaceVarWithActualValue(
      inputDetails?.attachmentType,
      inputDetails?.message,
      inputDetails?.attachmentVar
    );

    const payload = {
      entityId: inputDetails?.entityId,
      senderid: inputDetails?.senderId,
      templateId: inputDetails?.templateId,
      smsMessage: messages,
      isUnicode: inputDetails?.unicode,
      reminderSrno: "0",
      srno: "0",
      notificationStatus: "on",
    };
    try {
      const res = await saveNotification("sms", payload);
      if (!res?.success) {
        return toast.error(res?.message);
      }
      toast.success(res?.message);
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong!");
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = {
          srno: state,
          type: "sms",
        };
        const res = await getSpeicificNotification(payload);
        console.log(res);
        if (!res?.success) {
          return;
        }

        setInputDetails((prev) => ({
          ...prev,
          templateId: res?.data?.templateId,
          entityId: res?.data?.entityId,
          unicode: res?.data?.isUnicode,
          message: res?.data?.messageFormat,
          // templateType: res?.data?.templateType,
          senderId: res?.data?.senderId,
        }));
      } catch (e) {
        toast.error("Something Went Wrong!");
      }
    }
    fetchData();
  }, [state, allTemplates]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Grid1
          setInputDetails={setInputDetails}
          inputDetails={inputDetails}
          allTemplates={allTemplates}
          headers={allVar}
        />

        {/* <div className="flex"> */}

        <Preview inputDetails={inputDetails} />
        {/* </div> */}
      </div>

      <UniversalButton
        label="Save"
        onClick={handleSave}
        style={{
          width: "200px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
        }}
      />
    </>
  );
};
