import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { IoSearch } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { FaLocationCrosshairs, FaReply } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbLocationShare } from "react-icons/tb";

import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import InputField from "../../whatsapp/components/InputField";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import ManageTemplatetableRcs from "./components/ManageTemplatetableRcs";
import {
  deleteTemplate,
  fetchAllTemplates,
  fetchTemplateDetails,
  updateTemplateStatusbySrno,
} from "../../apis/rcs/rcs";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ManageTemplateRcs = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [templateData, setTemplateData] = useState({ templateName: "" });
  const [summaryTableData, setSummaryTableData] = useState([]);
  const [summaryFilterData, setSummaryFilterData] = useState([]);
  const [templateid, setTemplateid] = useState("");
  const [templateDialogVisible, setTemplateDialogVisible] = useState(false);
  const [templateDetails, setTemplateDetails] = useState();
  const [templateDeleteVisible, setTemplateDeleteVisible] = useState(false);

  const navigate = useNavigate();

  const handleAddTemplate = () => navigate("/rcsaddtemplatercs");

  const handleFetchTempData = async () => {
    setIsFetching(true);
    try {
      const res = await fetchAllTemplates();
      setSummaryFilterData(res.Data);
      setSummaryTableData(res.Data);
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearch = async () => {
    const data = {
      ...templateData,
      templateType: templateData.templateType ?? "",
      status: templateData.status ?? "",
    };
    const res = await fetchAllTemplates();
    const keys = Object.keys(data).filter((key) => data[key] !== "");
    const filtered = res?.Data?.filter((item) =>
      keys.every((key) => String(item[key]).includes(data[key]))
    );
    setSummaryFilterData(filtered);
    fetchAllTemplates();
  };

  const updateTemplateStatus = async ({ srno, active }) => {
    setIsFetching(true);
    try {
      const res = await updateTemplateStatusbySrno({
        sr_no: srno,
        status: String(Number(!active)),
      });
      if (res?.status) {
        toast.success("Status Updated Successfully");
        setSummaryFilterData((prev) =>
          prev.map((item) =>
            item.srno === srno ? { ...item, active: Number(!active) } : item
          )
        );
      } else {
        toast.error("Something went wrong.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    handleFetchTempData();
  }, []);

  const fetchTemplateDataDetails = async (srno) => {
    if (!srno) return toast.error("Please select template");
    try {
      const res = await fetchTemplateDetails(srno);
      const found = summaryFilterData.find((item) => item.srno === srno);
      setTemplateDetails({
        data: res,
        templateName: found.templateName,
        isCarousal: res.length > 1 ? true : false,
      });
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleTemplateDelete = async () => {
    try {
      await deleteTemplate(templateid.srno);
      toast.success("Template Deleted Successfully");
      setTemplateDeleteVisible(false);
      await handleFetchTempData();
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const templateTypeConfig = {
    "reply button": { css: "bg-gray-200 text-gray-800", icon: <FaReply /> },
    website: { css: "bg-green-500 text-white", icon: <FaExternalLinkAlt /> },
    mobile: { css: "bg-blue-500 text-white", icon: <BsTelephoneFill /> },
    "view location": { css: "bg-yellow-500", icon: <FaLocationCrosshairs /> },
    "share location": {
      css: "bg-red-300 text-white",
      icon: <TbLocationShare />,
    },
  };

  function base64ToUrl(base64) {
    const base64PDF = base64;
    const byteCharacters = atob(base64PDF);
    const byteNumbers = Array.from(byteCharacters).map((c) => c.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-end w-full gap-4 pb-1 align-middle">
        {/* Name Input Field */}

        <div className="w-max-content">
          <UniversalButton
            id="addtemplatebtn"
            name="addtemplatebtn"
            label="Add Template"
            onClick={handleAddTemplate}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-end w-full gap-2 mb-5">
        <div className="w-full sm:w-56">
          <InputField
            label="Template Name"
            id="templateName"
            name="templateName"
            placeholder="Enter Template Name"
            value={templateData.templateName}
            onChange={(e) => {
              setTemplateData((prevData) => ({
                ...prevData,
                templateName: e.target.value,
              }));
            }}
          />
        </div>
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            label="Template Type"
            id="templatetype"
            name="templatetype"
            options={[
              { label: "Text", value: "text" },
              { label: "Image", value: "image" },
              { label: "Video", value: "video" },
              // {
              //   label: "Rich Card Stand Alone",
              //   value: "richcardstandalone",
              // },
              // {
              //   label: "Rich Card Carausel",
              //   value: "richcardcarousel",
              // },
            ]}
            value={templateData.templateType}
            onChange={(newValue) => {
              setTemplateData((prevData) => ({
                ...prevData,
                templateType: newValue,
              }));
            }}
            placeholder="Select Template Type"
          />
        </div>
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            label="Status"
            id="status"
            name="status"
            options={[
              { label: "Pending", value: "Pending" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
              { label: "Operator processing", value: "Operator processing" },
              { label: "Submitted", value: "Submitted" },
            ]}
            value={templateData.status}
            onChange={(newValue) => {
              setTemplateData((prevData) => ({
                ...prevData,
                status: newValue,
              }));
            }}
            placeholder="Select Template Type"
          />
        </div>

        {/* Search Button */}
        <div className="w-max-content">
          <UniversalButton
            label={isFetching ? "Searching..." : "Search"}
            id="manageSearch"
            name="manageSearch"
            variant="primary"
            icon={<IoSearch />}
            onClick={handleSearch}
            disabled={isFetching}
          />
        </div>
      </div>

      <ManageTemplatetableRcs
        data={summaryFilterData}
        updateTemplateStatus={updateTemplateStatus}
        setTemplateDialogVisible={setTemplateDialogVisible}
        setTemplateid={setTemplateid}
        setTemplateDeleteVisible={setTemplateDeleteVisible}
        fetchTemplateDataDetails={fetchTemplateDataDetails}
        handleFetchTempData={handleFetchTempData}
      />

      <Dialog
        header={templateDetails?.templateName}
        visible={templateDialogVisible}
        style={{ width: "27rem" }}
        onHide={() => {
          setTemplateDialogVisible(false);
          setTemplateDetails();
        }}
        draggable={false}
      >
        <div className="p-2 border-2 border-gray-200 rounded-xl">
          {!templateDetails?.isCarousal ? (
            <>
              {/* {templateDetails?.data?.[0]?.imageUrl && (
                <img
                  src={templateDetails?.data[0].imageUrl}
                  alt=""
                  className="w-full h-45 rounded-lg"
                />
              )} */}

              {templateDetails?.data?.[0]?.templateType === "image" &&
                templateDetails?.data?.[0]?.imageUrl && (
                  <img
                    src={templateDetails?.data[0].imageUrl}
                    alt=""
                    className="w-full h-45 rounded-lg"
                  />
                )}
              {templateDetails?.data?.[0]?.templateType === "video" &&
                templateDetails?.data?.[0]?.imageUrl && (
                  <video
                    src={templateDetails?.data[0].imageUrl}
                    controls
                    className="w-full h-45 rounded-lg"
                  />
                )}
              {templateDetails?.data?.[0]?.templateType ===
                "text_message_with_pdf" &&
                templateDetails?.data?.[0]["pdfBase64 "] && (
                  <iframe
                    src={base64ToUrl(templateDetails?.data?.[0]["pdfBase64 "])}
                    className="w-full h-45 rounded-lg"
                  />
                )}


              <div className="py-2 text-sm overflow-y-scroll max-h-80">
                <h1 className="font-semibold">
                  {templateDetails?.data[0]?.contentTitle}
                </h1>
                <pre className="whitespace-pre-wrap">
                  {templateDetails?.data[0]?.content}
                </pre>
                {templateDetails?.data[0]?.suggestions?.map((sug, idx) => (
                  <div key={idx} className="my-2 w-full">
                    <button
                      className={`flex items-center px-4 py-2 text-sm rounded-md w-full justify-center ${templateTypeConfig[sug.type]?.css || ""
                        }`}
                      title={sug.suggestionValue}
                    >
                      {templateTypeConfig[sug.type]?.icon}
                      <span className="ml-2">{sug.suggestionTitle}</span>
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              renderArrowPrev={() => null}
              renderArrowNext={() => null}
              // selectedItem={selectedCardIndex} // Sync Carousel with selectedCardIndex
              // onChange={(index) => setSelectedCardIndex(index)} // Sync selectedCardIndex with Carousel
              renderIndicator={(onClickHandler, isSelected, index) => {
                const indicatorClass = isSelected
                  ? "bg-[#212529] w-3 h-3 rounded-full mx-1 cursor-pointer"
                  : "bg-[#7E7F80] w-3 h-3 rounded-full mx-1 cursor-pointer";

                return (
                  <li
                    id="carousel-indicator"
                    name="carousel-indicator"
                    key={index}
                    className={`inline-block ${indicatorClass}`}
                    onClick={() => {
                      onClickHandler();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Slide ${index + 1}`}
                  />
                );
              }}
            >
              {templateDetails?.data?.map((template) => (
                <>
                  {template.templateType === "image" && template?.imageUrl && (
                    <img
                      src={template.imageUrl}
                      alt=""
                      className="w-full h-45 rounded-lg"
                    />
                  )}

                  {template.templateType === "video" && template?.imageUrl && (
                    <video
                      src={template.imageUrl}
                      controls
                      className="w-full h-45 rounded-lg"
                    />
                  )}

                  <div className="py-2 text-sm overflow-y-scroll max-h-80">
                    <h1 className="font-semibold">{template?.contentTitle}</h1>
                    <pre className="whitespace-pre-wrap">
                      {template?.content}
                    </pre>
                    {template?.suggestions?.map((sug, idx) => (
                      <div key={idx} className="my-2">
                        <button
                          className={`flex items-center px-4 py-2 text-sm rounded-md w-full justify-center ${templateTypeConfig[sug.type]?.css || ""
                            }`}
                          title={sug.suggestionValue}
                        >
                          {templateTypeConfig[sug.type]?.icon}
                          <span className="ml-2">{sug.suggestionTitle}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ))}
            </Carousel>
          )}
        </div>
      </Dialog>

      <Dialog
        header={templateDetails?.templateName}
        visible={templateDeleteVisible}
        style={{ width: "27rem" }}
        onHide={() => setTemplateDeleteVisible(false)}
        draggable={false}
      >
        <div className="flex flex-col items-center p-4 text-center">
          <CancelOutlinedIcon sx={{ fontSize: 64, color: "#ff3f3f" }} />
          <p className="text-[1.1rem] font-semibold text-gray-700">
            Are you sure you want to delete the template
            <br />
            <span className="text-green-500">"{templateid?.templateName}"</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This action is irreversible.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <UniversalButton
              label="Cancel"
              onClick={() => setTemplateDeleteVisible(false)}
            />
            <UniversalButton label="Delete" onClick={handleTemplateDelete} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageTemplateRcs;
