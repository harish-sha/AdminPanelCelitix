import React, { useEffect, useState } from "react";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import InputField from "../../whatsapp/components/InputField";
import { IoSearch } from "react-icons/io5";
import ManageTemplatetableRcs from "./components/ManageTemplatetableRcs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  deleteTemplate,
  fetchAllTemplates,
  fetchTemplateDetails,
  updateTemplateStatusbySrno,
} from "../../apis/rcs/rcs";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import { Dialog } from "primereact/dialog";
import { BsTelephoneFill } from "react-icons/bs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { FaLocationCrosshairs, FaReply } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";
import { FaExternalLinkAlt } from "react-icons/fa";

const ManageTemplateRcs = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [templateData, setTemplateData] = useState({
    templateName: "",
  });
  const [summaryTableData, setSummaryTableData] = useState([]);
  const [summaryFilterData, setSummaryFilterData] = useState([]);
  const [templateid, setTemplateid] = useState("");

  //template Details
  const [templateDialogVisible, setTemplateDialogVisible] = useState(false);
  const [templateDetails, setTemplateDetails] = useState();

  //template delete
  const [templateDeleteVisible, setTemplateDeleteVisible] = useState(false);

  const navigate = useNavigate();

  const handleaddTemplate = () => {
    navigate("/rcsaddtemplatercs");
  };

  const handleFetchTempData = async () => {
    try {
      setIsFetching(true);
      const res = await fetchAllTemplates();
      setSummaryFilterData(res.data);
      setSummaryTableData(res.data);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearch = () => {
    const data = {
      ...templateData,
      templateType: templateData.templateType ?? "",
      status: templateData.status ?? "",
    };
    const notNull = Object.keys(data).filter((key) => data[key] != "");

    const filterData = summaryTableData.filter((item) => {
      return notNull.every((key) => String(item[key]).includes(data[key]));
    });

    setSummaryFilterData(filterData);
  };

  const updateTemplateStatus = async (data) => {
    //reverse problem in status
    const updateData = {
      sr_no: data.srno,
      status: String(Number(data.active)),
    };

    try {
      const res = await updateTemplateStatusbySrno(updateData);
      if (res.includes(true)) {
        toast.success("Status Updated Successfully");
        setSummaryFilterData((prev) =>
          prev.map((item) =>
            item.srno == data.srno
              ? { ...item, active: Number(!item.active) }
              : item
          )
        );
      } else {
        toast.error("Something went wrong.");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    handleFetchTempData();
  }, []);

  // useEffect(() => {
  //   const fetchTemplateDataDetails = async () => {
  //     console.log("TempId", typeof templateid);
  //     // if (!templateid) {
  //     //   toast.error("Please select template");
  //     //   return;
  //     // }
  //     try {
  //       const res = await fetchTemplateDetails(templateid);
  //       const tempName = summaryFilterData.find(
  //         (item) => item.srno == templateid
  //       );

  //       setTemplateDetails({
  //         ...res[0],
  //         templateName: tempName.templateName,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       toast.error("Something went wrong");
  //     }
  //   };

  //   fetchTemplateDataDetails();
  // }, [templateid]);

  const fetchTemplateDataDetails = async (data) => {
    if (!data) {
      toast.error("Please select template");
      return;
    }
    try {
      const res = await fetchTemplateDetails(data);
      const tempName = summaryFilterData.find((item) => item.srno == data);

      setTemplateDetails({
        ...res[0],
        templateName: tempName.templateName,
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  const getTemplateTypeCss = (type) => {
    switch (type) {
      case "reply button":
        return "bg-gray-200 text-gray-800";
      case "website":
        return "bg-green-500 text-white";
      case "dialer":
        return "bg-blue-500 text-white";
      case "view location":
        return "bg-yellow-500";
      case "share location":
        return "bg-red-500";
      default:
        return "";
    }
  };

  const getTemplateTypeLogo = (type) => {
    switch (type) {
      case "reply button":
        return <FaReply />;
      case "website":
        return <FaExternalLinkAlt />;
      case "dialer":
        return <BsTelephoneFill />;
      case "view location":
        return <FaLocationCrosshairs />;
      case "share location":
        return <TbLocationShare />;
      default:
        return "";
    }
  };

  const handleTemplateDelete = async () => {
    try {
      console.log(templateid);
      // const res = await deleteTemplate(templateid);
      toast.success("Template Deleted Successfully");
      setTemplateDeleteVisible(false);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="w-full">
      <div>
        <div className="flex flex-wrap items-end justify-end w-full gap-4 pb-1 align-middle">
          {/* Name Input Field */}

          <div className="w-max-content">
            <UniversalButton
              id="addtemplatebtn"
              name="addtemplatebtn"
              label="Add Template"
              onClick={handleaddTemplate}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-end w-full gap-2 mb-2">
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
                {
                  label: "Rich Card Stand Alone",
                  value: "richcardstandalone",
                },
                {
                  label: "Rich Card Carausel",
                  value: "richcardcarousel",
                },
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
                { label: "Approved", value: "Approved" },
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
              label="Search"
              id="manageSearch"
              name="manageSearch"
              variant="primary"
              icon={<IoSearch />}
              onClick={handleSearch}
            />
          </div>
        </div>

        {/* ✅ Show Loader or Table */}
        {isFetching ? (
          <div className="w-full">
            <UniversalSkeleton height="35rem" width="100%" />
          </div>
        ) : (
          <div className="w-full">
            <ManageTemplatetableRcs
              id="manageTemplatetable"
              name="manageTemplatetable"
              updateTemplateStatus={updateTemplateStatus}
              data={summaryFilterData}
              setTemplateDialogVisible={setTemplateDialogVisible}
              setTemplateid={setTemplateid}
              setTemplateDeleteVisible={setTemplateDeleteVisible}
              fetchTemplateDataDetails={fetchTemplateDataDetails}
            />
          </div>
        )}
      </div>

      {/* template details dialog */}
      <Dialog
        header={templateDetails?.templateName}
        visible={templateDialogVisible}
        style={{ width: "27rem" }}
        onHide={() => {
          setTemplateDialogVisible(false);
          setTemplateDetails("");
        }}
        draggable={false}
      >
        <div className="modal-content rounded-xl">
          <div className="p-2 border-2 border-gray-200 modal-body rounded-xl">
            <div className="imgbox">
              {/* <img
                src={whatsappImg}
                alt=""
                className="w-full rounded-lg h-45"
              /> */}
            </div>
            <div className="flex flex-col gap-2 py-2 overflow-scroll text-sm contentbox max-h-80">
              <h1>{templateDetails?.contentTitle}</h1>
              <pre>{templateDetails?.content}</pre>
            </div>
            {templateDetails?.suggestions?.map((suggestion, index) => (
              <div key={index} className="flex flex-col gap-2">
                <button
                  className={`flex items-center justify-center px-4 py-2 text-sm  rounded-md  ${getTemplateTypeCss(
                    suggestion.type
                  )}`}
                  title={suggestion.suggestionValue}
                >
                  {getTemplateTypeLogo(suggestion.type)}
                  <p className="ml-2"> {suggestion.suggestionTitle}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </Dialog>

      {/* template delete dialog */}
      <Dialog
        header={templateDetails?.templateName}
        visible={templateDeleteVisible}
        style={{ width: "27rem" }}
        onHide={() => {
          setTemplateDeleteVisible(false);
        }}
        draggable={false}
      >
        <div className="flex items-center justify-center">
          <CancelOutlinedIcon
            sx={{
              fontSize: 64,
              color: "#ff3f3f",
            }}
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-[1.1rem] font-semibold text-gray-700">
            Are you sure you want to delete the template <br />
            <span className="text-green-500">
              "{templateDetails?.templateName}"
            </span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This action is irreversible.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <UniversalButton
            label="Cancel"
            style={{
              backgroundColor: "#090909",
            }}
            onClick={() => setTemplateDeleteVisible(false)}
          />
          <UniversalButton label="Delete" onClick={handleTemplateDelete} />
        </div>
      </Dialog>
    </div>
  );
};

export default ManageTemplateRcs;
