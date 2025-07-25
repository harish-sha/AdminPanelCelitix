import AnimatedDropdown from "@/admin/components/AnimatedDropdown";
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

  return (
    <div className="grid grid-cols-3">
      <div className="space-y-2 col-span-2">
        <div>
          <AnimatedDropdown
            id="waba"
            label="Select WABA"
            name="waba"
            options={wabaState.all.map((waba) => ({
              value: waba.mobileNo,
              label: waba.name,
            }))}
            value={wabaState.selected}
            onChange={(e) => {
              setWabaState((prev) => ({
                ...prev,
                selected: e,
              }));
              setTemplateState({
                details: {},
                all: [],
                selected: "",
              });
            }}
          />
        </div>
        <div>
          <AnimatedDropdown
            id="template"
            name="template"
            label="Select Template"
            options={templateState.all.map((template) => ({
              value: template.vendorTemplateId,
              label: template.templateName,
            }))}
            value={templateState.selected}
            onChange={(e) => {
              setTemplateState((prev) => ({
                ...prev,
                selected: e,
              }));
            }}
          />
        </div>
      </div>

      <div className="w-full p-2">Preview</div>
    </div>
  );
};
