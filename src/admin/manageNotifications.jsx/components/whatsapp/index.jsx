import {
  getTemplateDetialsById,
  getTemplateList,
  getWabaList,
  getWabaTemplate,
  getWabaTemplateDetails,
} from "@/apis/whatsapp/whatsapp";
import React, { use, useEffect } from "react";
import toast from "react-hot-toast";

export const Whatsapp = ({ handleSaveWhatsappNotification, data, setData }) => {
  const [wabaState, setWabaState] = React.useState({
    all: [],
    selected: "",
  });

  const [templateState, setTemplateState] = React.useState({
    details: {},
    all: [],
    selected: "",
  });

  useEffect(() => {
    async function handleGetWabaList() {
      try {
        const res = await getWabaList();
        setWabaState({
          all: res,
          selected: "",
        });
      } catch (e) {
        toast.error("Error fetching waba list.");
      }
    }

    handleGetWabaList();
  }, []);

  useEffect(() => {
    async function handleFetchAllTemplates() {
      if (!wabaState.selected) return;
      try {
        const res = await getWabaTemplateDetails(wabaState.selected);

        const approvedTemplates = res.filter(
          (template) => template.status === "APPROVED"
        );

        setTemplateState({
          details: {},
          all: approvedTemplates,
          selected: "",
        });
      } catch (e) {
        toast.error("Error fetching templates.");
      }
    }

    handleFetchAllTemplates();
  }, [wabaState]);

  useEffect(() => {
    async function handleGetTemplateDetails() {
      if (!templateState.selected) return;
      try {
        const res = await getTemplateDetialsById(templateState.selected);
        console.log(res);
        // setTemplateState((prev) => ({
        //   ...prev,
        //   details: res.data[0],
        // }));
      } catch (e) {
        toast.error("Error fetching template details.");
      }
    }

    handleGetTemplateDetails();
  }, [templateState.selected]);

  return <div>WhatsApp</div>;
};
