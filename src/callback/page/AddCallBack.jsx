import { addCallback } from "@/apis/callback/callback";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/components/layout/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { RadioButton } from "primereact/radiobutton";
import { useState } from "react";
import toast from "react-hot-toast";
import { Preview } from "../components/Preview";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const AddCallback = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    allowCallBackDlr: "",
    callBackDlrUrl: "",
    authorizationType: "",
    password: "",
    userId: "",
    token: "",
    callBackType: "",
    callBackName: "",
    customHeader: {},
  });

  const [authorization, setAuthorization] = useState("");
  const [customHeader, setCustomHeader] = useState({
    isSelect: false,
    data: [{ key: "", value: "" }],
  });

  function addHeader() {
    if (customHeader.data.length >= 10) {
      toast.error("You can add maximum 10 headers");
      return;
    }
    setCustomHeader((prev) => ({
      ...prev,
      data: [...prev.data, { key: "", value: "" }],
    }));
  }
  function deleteHeader() {
    if (customHeader.data.length === 1) {
      setCustomHeader((prev) => ({
        isSelect: false,
        data: [],
      }));
    }
    setCustomHeader((prev) => ({
      ...prev,
      data: prev.data.slice(0, prev.data.length - 1),
    }));
  }
  async function handleAddCallback() {
    try {
      const data = {
        ...details,
        authorizationType: details?.authorizationType || authorization,
      };

      if (customHeader.isSelect && customHeader.data.length === 0) {
        toast.error("Please add at least one header");
        return;
      }

      if (customHeader.isSelect) {
        const headers = {};
        customHeader.data.map((item) => {
          headers[item.key] = item.value;
        });
        data.customHeader = headers;
      }
      const res = await addCallback(data);
      if (!res?.status) {
        toast.error(res?.msg);
        return;
      }
      toast.success(res?.msg);
      setDetails({
        allowCallBackDlr: "",
        callBackDlrUrl: "",
        authorizationType: "",
        password: "",
        userId: "",
        token: "",
        callBackType: "",
        callBackName: "",
        customHeader: {},
      });
      setAuthorization("");
      navigate("/callback");
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex md:flex-row flex-col gap-2">
      <div className="flex flex-col gap-2 md:w-2/3 h-auto w-full p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <InputField
            id="callBackName"
            name="callBackName"
            label={"Callback Name"}
            placeholder="Enter Callback Name"
            value={details.callBackName}
            onChange={(e) => {
              setDetails((prev) => ({
                ...prev,
                callBackName: e.target.value,
              }));
            }}
          />
          <AnimatedDropdown
            id="callBackType"
            name="callBackType"
            label="Callback Type"
            placeholder="Select Callback Type"
            options={[
              // { value: "1", label: "Webhook" },
              // { value: "2", label: "WebEngage" },
              {
                value: "sms",
                label: "SMS",
              },
              {
                value: "rcs",
                label: "RCS",
              },
              {
                value: "voice",
                label: "OBD",
              },
              // {
              //   value: "whatsapp",
              //   label: "WhatsApp",
              // },
            ]}
            value={details.callBackType}
            onChange={(e) => {
              setDetails((prev) => ({
                ...prev,
                callBackType: e,
              }));
            }}
          />
          <AnimatedDropdown
            id="responseType"
            name="responseType"
            label="Response Type"
            placeholder="Select Response Type"
            options={[
              { value: "1", label: "Webhook" },
              { value: "2", label: "WebEngage" },
            ]}
            value={details.allowCallBackDlr}
            onChange={(e) => {
              setDetails((prev) => ({
                ...prev,
                allowCallBackDlr: e,
              }));
              setCustomHeader({
                isSelect: false,
                data: [],
              });
              setAuthorization("");
            }}
          />
        </div>

        {details?.allowCallBackDlr && (
          <InputField
            id="url"
            type="url"
            name="url"
            label={"URL"}
            placeholder="Enter URL"
            value={details.callBackDlrUrl}
            onChange={(e) => {
              setDetails((prev) => ({
                ...prev,
                callBackDlrUrl: e.target.value,
              }));
            }}
          />
        )}
        {details?.allowCallBackDlr === "1" && (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 mt-2 flex-col w-full">
              <label className="text-sm font-medium text-gray-700 mt-2">
                Authorization
              </label>
              <div className="flex gap-2">
                <div className="flex gap-1">
                  <RadioButton
                    value="1"
                    checked={authorization === "1"}
                    onChange={(e) => {
                      setAuthorization(e.target.value);
                    }}
                  />
                  <label className="text-gray-600 font-semibold">Yes</label>
                </div>
                <div className="flex gap-1">
                  <RadioButton
                    value="0"
                    checked={authorization === "0"}
                    onChange={(e) => {
                      setAuthorization(e.target.value);
                    }}
                  />
                  <label className="text-gray-600 font-semibold">NO</label>
                </div>
              </div>

              {authorization === "1" && (
                <div>
                  <AnimatedDropdown
                    id="selectType"
                    name="selectType"
                    options={[
                      { value: "1", label: "Bearer Token" },
                      { value: "2", label: "Basic Auth" },
                    ]}
                    value={details.authorizationType}
                    onChange={(e) => {
                      setDetails((prev) => ({
                        ...prev,
                        authorizationType: e,
                      }));
                    }}
                  />
                  {details?.authorizationType === "1" && (
                    <div className="mt-2">
                      <InputField
                        id="token"
                        name="token"
                        label={"Token"}
                        placeholder="Enter Token"
                        value={details.token}
                        onChange={(e) => {
                          setDetails((prev) => ({
                            ...prev,
                            token: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  )}
                  {details?.authorizationType === "2" && (
                    <div className="flex gap-2 mt-2">
                      <InputField
                        id="userId"
                        name="userId"
                        label={"UserId"}
                        placeholder="Enter userId"
                        value={details.userId}
                        onChange={(e) => {
                          setDetails((prev) => ({
                            ...prev,
                            userId: e.target.value,
                          }));
                        }}
                      />
                      <InputField
                        id="password"
                        name="password"
                        label={"Password"}
                        placeholder="Enter Password"
                        value={details.password}
                        onChange={(e) => {
                          setDetails((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-2 flex-col w-full">
              <label className="text-sm font-medium text-gray-700 mt-2">
                Custom Header
              </label>
              <div className="flex gap-2">
                <div className="flex gap-1">
                  <RadioButton
                    value="1"
                    checked={customHeader.isSelect}
                    onChange={(e) => {
                      setCustomHeader({
                        isSelect: true,
                        data: [
                          {
                            key: "",
                            value: "",
                          },
                        ],
                      });
                    }}
                  />
                  <label className="text-gray-600 font-semibold">Yes</label>
                </div>
                <div className="flex gap-1">
                  <RadioButton
                    value="0"
                    checked={customHeader.isSelect === false}
                    onChange={(e) => {
                      setCustomHeader({ isSelect: false, data: [] });
                    }}
                  />
                  <label className="text-gray-600 font-semibold">NO</label>
                </div>
              </div>

              {customHeader?.isSelect && customHeader?.data?.length > 0 && (
                <div>
                  <div className="flex md:justify-end justify-center">
                    <UniversalButton
                      id="addHeader"
                      label="Add Header"
                      onClick={addHeader}
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-1 max-h-[80px] overflow-y-scroll p-2 border-1 border-gray-200 rounded-xl">
                    {customHeader.data.map((item, index) => (
                      <div className="flex gap-2" key={index}>
                        <InputField
                          id={`key-${index}`}
                          name={`key-${index}`}
                          label="Key"
                          placeholder="Enter Key"
                          value={item.key}
                          onChange={(e) => {
                            const updatedData = [...customHeader.data];
                            updatedData[index] = {
                              ...updatedData[index],
                              key: e.target.value,
                            };
                            setCustomHeader((prev) => ({
                              ...prev,
                              data: updatedData,
                            }));
                          }}
                        />
                        <InputField
                          id={`value-${index}`}
                          name={`value-${index}`}
                          label="Value"
                          placeholder="Enter Value"
                          value={item.value}
                          onChange={(e) => {
                            const updatedData = [...customHeader.data];
                            updatedData[index] = {
                              ...updatedData[index],
                              value: e.target.value,
                            };
                            setCustomHeader((prev) => ({
                              ...prev,
                              data: updatedData,
                            }));
                          }}
                        />
                        <button
                          className="text-red-600 mt-7 cursor-pointer"
                          onClick={deleteHeader}
                        >
                          <MdOutlineDeleteForever className="size-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {details.allowCallBackDlr === "2" && (
          <div className="flex gap-2">
            <InputField
              id="userId"
              name="userId"
              label={"UserId"}
              placeholder="Enter userId"
              value={details.userId}
              onChange={(e) => {
                setDetails((prev) => ({
                  ...prev,
                  userId: e.target.value,
                }));
              }}
            />
            <InputField
              id="password"
              name="password"
              label={"Password"}
              placeholder="Enter Password"
              value={details.password}
              onChange={(e) => {
                setDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </div>
        )}

        <div className="flex justify-center mt-5">
          <UniversalButton
            id="addCallback"
            label="Add Callback"
            onClick={handleAddCallback}
          />
        </div>
      </div>
      <div className="md:w-1/3 w-full">
        <Preview />
      </div>


    </div>
  );
};
