import {
  fetchCurlData,
  getTemplateDetialsById,
  getWabaTemplate,
  getWabaTemplateDetails,
} from "@/apis/whatsapp/whatsapp";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const TemplateNode = ({
  id,
  nodesInputData,
  setNodesInputData,
  details,
}: {
  id: number;
  nodesInputData: any;
  details: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const [allTemplates, setAllTemplates] = useState([]);
  const [selectedTemplateData, setSelectedTemplateData] = useState({});
  async function handleFetchAllTemplates() {
    try {
      const res = await getWabaTemplateDetails(details?.selected);
      setAllTemplates(res);
    } catch (e) {
      toast.error("Error fetching templates");
    }
  }

  async function handleFetchTemplateDetails() {
    if (!nodesInputData[id]?.templateSrno) return;
    try {
      const templateDetails = allTemplates?.find(
        (item) => item.templateSrno === nodesInputData[id]?.templateSrno
      );
      console.log(templateDetails);

      const res = await getTemplateDetialsById(
        templateDetails?.vendorTemplateId
      );
      const curlData = await fetchCurlData({
        waba: details?.selected,
        tempName: templateDetails?.templateName,
      });

      console.log(curlData);
      const curl = {
        ...curlData,
        messaging_product: "whatsapp",
      };
      setSelectedTemplateData(curl);

      setNodesInputData((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          json: curl,
        },
      }));
    } catch (e) {
      console.log(e);
      toast.error("Error fetching template details");
    }
  }

  useEffect(() => {
    handleFetchAllTemplates();
  }, []);

  useEffect(() => {
    handleFetchTemplateDetails();
  }, [nodesInputData[id]?.templateSrno]);
  return (
    <div>
      <AnimatedDropdown
        label={"Select Template"}
        id="selectTemplate"
        name="selectTemplate"
        options={allTemplates?.map((template) => ({
          value: template.templateSrno,
          label: template.templateName,
        }))}
        onChange={(e: string) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              templateSrno: e,
            },
          }));
        }}
        value={nodesInputData[id]?.templateSrno}
      />
    </div>
  );
};
