import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import UniversalButton from "@/components/common/UniversalButton";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import toast from "react-hot-toast";
import { data } from "autoprefixer";
import { downloadCustomSmsReport } from "@/apis/sms/sms";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import InputField from "@/whatsapp/components/InputField";
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
    mobile_no: false,
    smsunit: false,
    message: false,
    senderid: false,
    status: false,
    que_time: false,
    sent_time: false,
    del_time: false,
    actual_status: false,
    actual_err_code: false,
    reason: false,
    client_sms_no: false,
    isunicode: false,
    PE_ID: false,
    template_id: false,
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
    // console.log(dataToExport);
    // delete dataToExport.type
    const payload = {
      ...dataToExport,
      fromDate: dataToExport.fromDate
        ? new Date(dataToExport.fromDate).toLocaleDateString("en-GB")
        : "",
      toDate: dataToExport.toDate
        ? new Date(dataToExport.toDate).toLocaleDateString("en-GB")
        : "",
      type: dataToExport?.type === "campaign" ? "1" : "2",
    };

    try {
      const res = await downloadCustomSmsReport(payload);
      if (!res.status) return toast.error(res.msg);
      toast.success(res.msg);
      setDataToExport((prev) => ({
        ...prev,
        campaignName: "",
        fromDate: "",
        toDate: "",
        srno: 0,
        isCustomField: 0,
        customColumns: "",
        campaignType: "",
        status: "",
        delStatus: {
          delivered: false,
          undelivered: false,
          rejected: false,
          pdr: false,
        },
        type: "campaign",
      }));

      setVisibledialog(false);
      triggerDownloadNotification();
    } catch (e) {
      toast.error("Something went wrong");
    }
    // setVisibledialog(false);
  }

async function handleDeliveryCheckboxChange(e, name) {
  setDataToExport((prev) => ({

    ...prev,
    delStatus: {
      ...prev.delStatus,
      [name]: e.target.checked,
    },
  }));
}

  useEffect(() => {
    setCampaignCheckboxStates({
    mobile_no: false,
    smsunit: false,
    message: false,
    senderid: false,
    status: false,
    que_time: false,
    sent_time: false,
    del_time: false,
    actual_status: false,
    actual_err_code: false,
    reason: false,
    client_sms_no: false,
    isunicode: false,
    PE_ID: false,
    template_id: false,
    });
  }, [dataToExport?.type, dataToExport?.isCustomField]);

  return (
    <Dialog
      visible={visibledialog}
      style={{ width: "45rem" }}
      onHide={() => setVisibledialog(false)}
      header="Export"
      modal
      draggable={false}
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
                  delStatus: {},
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
                  delStatus: {},
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
                    { value: 0, label: "Transactional" },
                    { value: 1, label: "Promotional" },
                    { value: 2, label: "Both" },
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
                  label="Select Status"
                  options={[
                    { value: "Sent", label: "Sent" },
                    { value: "Failed", label: "Failed" },
                    { value: "NDNC", label: "NDNC" },
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

            <div className="flex flex-col mt-5">
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
                    onChange={(e) => handleDeliveryCheckboxChange(e, "rejected")}
                    checked={dataToExport.delStatus["rejected"]}
                    className="m-2"
                  />
                  <label
                    htmlFor="rejected"
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
            </div>

            {/* <div className="flex my-4 gap-4">
              <InputField
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
            {/* </div> */}
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
              {
                dataToExport.type === "custom" && 
                <div className="flex items-center">
                <Checkbox
                  id="mobile_no"
                  name="mobile_no"
                  onChange={(e) => handleCheckboxChange(e, "mobile_no")}
                  checked={campaigncheckboxStates.mobile_no}
                  className="m-2"
                />
                <label
                  htmlFor="mobile_no"
                  className="text-sm font-medium text-gray-800"
                >
                  Mobile Number
                </label>
              </div>
              }
              
              {
                dataToExport.type === "custom" &&
                <div className="flex items-center">
                <Checkbox
                  id="smsunit"
                  name="smsunit"
                  onChange={(e) => handleCheckboxChange(e, "smsunit")}
                  checked={campaigncheckboxStates.smsunit}
                  className="m-2"
                />
                <label
                  htmlFor="smsunit"
                  className="text-sm font-medium text-gray-800"
                >
                  SMS Unit
                </label>
              </div>
              }
              

              <div className="flex items-center">
                <Checkbox
                  id="message"
                  name="message"
                  onChange={(e) => handleCheckboxChange(e, "message")}
                  checked={campaigncheckboxStates.message}
                  className="m-2"
                />
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-800"
                >
                  Message
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="senderid"
                  name="senderid"
                  onChange={(e) => handleCheckboxChange(e, "senderid")}
                  checked={campaigncheckboxStates.senderid}
                  className="m-2"
                />
                <label
                  htmlFor="senderid"
                  className="text-sm font-medium text-gray-800"
                >
                  Sender Id
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="status"
                  name="status"
                  onChange={(e) => handleCheckboxChange(e, "status")}
                  checked={campaigncheckboxStates.status}
                  className="m-2"
                />
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-800"
                >
                  Status
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="que_time"
                  name="que_time"
                  onChange={(e) => handleCheckboxChange(e, "que_time")}
                  checked={campaigncheckboxStates.que_time}
                  className="m-2"
                />
                <label
                  htmlFor="que_time"
                  className="text-sm font-medium text-gray-800"
                >
                  Que Time
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="sent_time"
                  name="sent_time"
                  onChange={(e) => handleCheckboxChange(e, "sent_time")}
                  checked={campaigncheckboxStates.sent_time}
                  className="m-2"
                />
                <label
                  htmlFor="sent_time"
                  className="text-sm font-medium text-gray-800"
                >
                  Sent Time
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="del_time"
                  name="del_time"
                  onChange={(e) => handleCheckboxChange(e, "del_time")}
                  checked={campaigncheckboxStates.del_time}
                  className="m-2"
                />
                <label
                  htmlFor="del_time"
                  className="text-sm font-medium text-gray-800"
                >
                  Delivery Time
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="actual_status"
                  name="actual_status"
                  onChange={(e) => handleCheckboxChange(e, "actual_status")}
                  checked={campaigncheckboxStates.actual_status}
                  className="m-2"
                />
                <label
                  htmlFor="actual_status"
                  className="text-sm font-medium text-gray-800"
                >
                  Delivery Status
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="actual_err_code"
                  name="actual_err_code"
                  onChange={(e) => handleCheckboxChange(e, "actual_err_code")}
                  checked={campaigncheckboxStates.actual_err_code}
                  className="m-2"
                />
                <label
                  htmlFor="actual_err_code"
                  className="text-sm font-medium text-gray-800"
                >
                  Actual Error Code
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="reason"
                  name="reason"
                  onChange={(e) => handleCheckboxChange(e, "reason")}
                  checked={campaigncheckboxStates.reason}
                  className="m-2"
                />
                <label
                  htmlFor="reason"
                  className="text-sm font-medium text-gray-800"
                >
                  Reason
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="client_sms_no"
                  name="client_sms_no"
                  onChange={(e) => handleCheckboxChange(e, "client_sms_no")}
                  checked={campaigncheckboxStates.client_sms_no}
                  className="m-2"
                />
                <label
                  htmlFor="client_sms_no"
                  className="text-sm font-medium text-gray-800"
                >
                  Client Sms Number
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="isunicode"
                  name="isunicode"
                  onChange={(e) => handleCheckboxChange(e, "isunicode")}
                  checked={campaigncheckboxStates.isunicode}
                  className="m-2"
                />
                <label
                  htmlFor="isunicode"
                  className="text-sm font-medium text-gray-800"
                >
                  Is Unicode
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="PE_ID"
                  name="PE_ID"
                  onChange={(e) => handleCheckboxChange(e, "PE_ID")}
                  checked={campaigncheckboxStates.PE_ID}
                  className="m-2"
                />
                <label
                  htmlFor="PE_ID"
                  className="text-sm font-medium text-gray-800"
                >
                  PE Id
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="template_id"
                  name="template_id"
                  onChange={(e) => handleCheckboxChange(e, "template_id")}
                  checked={campaigncheckboxStates.template_id}
                  className="m-2"
                />
                <label
                  htmlFor="template_id"
                  className="text-sm font-medium text-gray-800"
                >
                  Template Id
                </label>
              </div>
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
