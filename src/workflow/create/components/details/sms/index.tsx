import { getAllTemplates } from "@/apis/sms/sms";
import UniversalButton from "@/components/common/UniversalButton";
import { isEnglish } from "@/sms/smsSend/helper/isEnglish";
import React, { useEffect, useState } from "react";
import { Grid1 } from "./grid1";
import { Preview } from "./preview";

export const SMS = ({
  id,
  nodesInputData,
  setNodesInputData,
  setDetailsDialogVisible,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  setDetailsDialogVisible: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const [inputDetails, setInputDetails] = useState({
    campaingName: "",
    templateId: "",
    entityId: "",
    unicode: 0,
    message: "",
    templateType: 1,
    senderId: "",
    sender: [],
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

  function handleSave() {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        sms_sender_id: inputDetails?.senderId,
        sms_template: inputDetails?.templateId,
        sms_message: inputDetails?.message,
        isunicode: inputDetails?.unicode,
        entityId: inputDetails?.entityId,
      },
    }));

    setDetailsDialogVisible(false);
  }
  return (
    <>
      <div className="flex flex-col md:flex-row gap-2">
        <Grid1
          setInputDetails={setInputDetails}
          inputDetails={inputDetails}
          allTemplates={allTemplates}
        />
        <Preview inputDetails={inputDetails} />
      </div>

      <UniversalButton
        id="save-sms"
        name="save-sms"
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
