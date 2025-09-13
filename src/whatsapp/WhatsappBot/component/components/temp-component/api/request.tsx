import InputField from "@/components/layout/InputField";
import { Textarea } from "@/components/ui/textarea";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDangerous, MdOutlineDeleteForever } from "react-icons/md";
import InputVariable from "../../insertVar";
import { TiTickOutline } from "react-icons/ti";

export const Request = ({
  id,
  nodesInputData,
  setNodesInputData,
  allVariables,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  allVariables: any[];
}) => {
  const [params, setParams] = React.useState([
    {
      key: "",
      value: "",
    },
  ]);
  const [header, setHeader] = React.useState([
    {
      key: "",
      value: "",
    },
  ]);

  const [addHeader, setAddHeader] = React.useState(false);

  const [isJsonCorrect, setIsJsonCorrect] = React.useState(true);

  function formatJson(json) {
    try {
      const parsed = JSON.parse(json);
      const pretty = JSON.stringify(parsed, null, 2);

      setNodesInputData((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          apiRequestJson: pretty,
        },
      }));
    } catch (e) {}
  }

  useEffect(() => {
    try {
      if (
        nodesInputData[id]?.apiRequestJson &&
        JSON.parse(nodesInputData[id]?.apiRequestJson)
      ) {
        setIsJsonCorrect(true);
      } else {
        setIsJsonCorrect(false);
      }
    } catch (e) {
      setIsJsonCorrect(false);
    }
  }, [nodesInputData[id]?.apiRequestJson]);

  function handleAddParams() {
    if (params.length >= 5) return;
    setParams((prev) => [
      ...prev,
      {
        key: "",
        value: "",
      },
    ]);
  }

  function handleRemoveParams(index: number) {
    if (params.length === 1) return;
    setParams((prev) => prev.filter((_, i) => i !== index));
  }
  function handleAddHeader() {
    if (header.length >= 5) return;
    setHeader((prev) => [
      ...prev,
      {
        key: "",
        value: "",
      },
    ]);
  }

  function handleRemoveHeader(index: number) {
    if (header.length === 1) return;
    setHeader((prev) => prev.filter((_, i) => i !== index));
  }

  function handleInsertParams(e, index, type) {
    const newParams = [...params];
    newParams[index][type] = e.target.value;
    setParams(newParams);
  }
  function handleInsertHeader(e, index, type) {
    const newHeaders = [...header];
    newHeaders[index][type] = e.target.value;
    setHeader(newHeaders);
  }

  function removeVariable(text: string) {
    const regex = /{{(\d+)}}/g;

    const match = text.match(regex);

    if (match) {
      return text;
    }
    return text
      .split(/\s+/)
      .filter((word) => !(word.includes("{{") && word.includes("}}")))
      .join(" ");
  }
  function handleInsertVar(e: string) {
    const url = nodesInputData[id]?.apiUrl || "";
    if (!url) return;
    if (!e) return;
    const removeVariableTag = removeVariable(url);
    const variableTage = `{{${e}}}`;
    const newUrl = removeVariableTag + "/" + variableTage;
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        //   variable: `{{${e}}}`,
        apiUrl: newUrl,
      },
    }));
  }

  function generateKeyValue(item) {
    const obj = {};
    //   headerValue = headers
    // ?.filter((p) => p.key && p.value)
    // .reduce((acc, { key, value }) => {
    //   acc[key] = value;
    //   return acc;
    // }, {});

    item
      ?.filter((p) => p.key && p.value)
      .map((i: { key: string; value: string }) => {
        obj[i.key] = i.value;
      });
    // item?.map((i: { key: string; value: string }) => {
    //   obj[i.key] = i.value;
    // });
    return obj;
  }

  useEffect(() => {
    const updatedParams = generateKeyValue(params);
    const updatedHeaders = generateKeyValue(header);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        apiJson: updatedParams,
        apiHeader: updatedHeaders,
        params: params,
        header: header,
      },
    }));
  }, [params, header]);

  useEffect(() => {
    const headers = nodesInputData[id]?.apiHeader || {};
    const params = nodesInputData[id]?.apiJson || {};

    let header = [];
    Object.keys(headers).map((h) => {
      header.push({
        key: h,
        value: headers[h],
      });
    });

    let param = [];
    Object.keys(params).map((h) => {
      param.push({
        key: h,
        value: params[h],
      });
    });

    setAddHeader(header.length > 0);

    setHeader(
      header?.length > 0
        ? header
        : [
            {
              key: "",
              value: "",
            },
          ]
    );
    setParams(
      param?.length > 0
        ? param
        : [
            {
              key: "",
              value: "",
            },
          ]
    );
  }, []);

  function handleVariableInsertParam(variable: string, index: number) {
    const param = [...params];
    const updatedMessage = `{{${variable}}}`;
    param[index]["value"] = updatedMessage.trim();
    setParams(param);
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <InputField
          label="URL"
          name="url"
          id="url"
          placeholder="https://example.com"
          value={nodesInputData[id]?.apiUrl}
          onChange={(e) => {
            setNodesInputData((prev) => ({
              ...prev,
              [id]: {
                ...prev[id],
                apiUrl: e.target.value,
              },
            }));
          }}
          maxLength={"1000"}
        />
        {nodesInputData[id]?.apiUrl &&
          /^https?:\/\/.+/.test(nodesInputData[id]?.apiUrl) && (
            <div className="absolute top-7 right-0">
              <InputVariable
                variables={allVariables}
                onSelect={(e) => {
                  handleInsertVar(e);
                }}
              />
            </div>
          )}
      </div>
      <AnimatedDropdown
        id="requestType"
        name="requestType"
        label="Request Type"
        options={[
          { value: "GET", label: "GET" },
          { value: "POST", label: "POST" },
        ]}
        value={nodesInputData[id]?.apiMethod}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              apiMethod: e,
            },
          }));
        }}
        placeholder="Select Request Type"
      />
      <AnimatedDropdown
        id="type"
        name="type"
        label="API Data Type"
        options={[
          { value: "none", label: "None" },
          { value: "parameter", label: "Parameter" },
          ...(nodesInputData[id]?.apiMethod === "POST"
            ? [{ value: "json", label: "Request JSON" }]
            : []),
        ]}
        value={nodesInputData[id]?.apiDatatype}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              apiDatatype: e,
            },
          }));
        }}
        placeholder="Select API Data Type"
      />

      {nodesInputData[id]?.apiMethod === "POST" &&
        nodesInputData[id]?.apiDatatype === "json" && (
          <div>
            <label
              className="text-sm font-medium text-gray-800 font-p"
              htmlFor="requestJson"
            >
              Request JSON
            </label>

            <div className="relative">
              <Textarea
                id="requestJson"
                name="requestJson"
                value={nodesInputData[id]?.apiRequestJson}
                onChange={(e) => {
                  setNodesInputData((prev) => ({
                    ...prev,
                    [id]: {
                      ...prev[id],
                      apiRequestJson: e.target.value,
                    },
                  }));
                }}
                placeholder={`{
    "key": "value"
}
                `}
                className="mt-2 resize-none h-40"
              />
              <button
                className="absolute top-1 right-2 text-sm font-medium text-gray-800 font-p underline"
                onClick={() => {
                  isJsonCorrect
                    ? formatJson(nodesInputData[id]?.apiRequestJson)
                    : null;
                }}
              >
                Format
              </button>
              <div className="absolute bottom-0 right-0 text-sm">
                {isJsonCorrect ? (
                  <TiTickOutline className="text-green-500 size-6" />
                ) : (
                  <MdDangerous className="text-red-500 size-6" />
                )}
              </div>
            </div>
          </div>
        )}

      {nodesInputData[id]?.apiDatatype === "parameter" && (
        <div className="mt-2">
          <div className="flex justify-between items-end mb-2">
            <p>API Parameters</p>
            <button onClick={handleAddParams}>
              <FaPlus />
            </button>
          </div>

          <div className="space-y-2">
            {params?.map((param, index) => (
              <div className="flex gap-2">
                <div className="w-full">
                  <InputField
                    label=""
                    name="paramsKey"
                    id="paramsKey"
                    placeholder={`Params Key ${index + 1}`}
                    value={params[index]?.key}
                    onChange={(e) => {
                      handleInsertParams(e, index, "key");
                    }}
                    maxLength={"100"}
                  />
                </div>
                <div className="relative w-full">
                  <InputField
                    label=""
                    name="paramsValue"
                    id="paramsValue"
                    placeholder={`Params Value ${index + 1}`}
                    value={params[index]?.value}
                    onChange={(e) => {
                      handleInsertParams(e, index, "value");
                    }}
                    maxLength={"100"}
                  />
                  <div className="absolute top-0 right-0">
                    <InputVariable
                      variables={allVariables}
                      onSelect={(e) => {
                        handleVariableInsertParam(e, index);
                      }}
                    />
                  </div>
                </div>

                <button
                  className="text-red-500"
                  onClick={() => handleRemoveParams(index)}
                >
                  <MdOutlineDeleteForever size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header Params here make when  payload come */}

      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="addHeader"
          name="addHeader"
          onChange={(e) => {
            setAddHeader(e.target.checked);
          }}
          checked={nodesInputData[id]?.addHeader}
        />
        <label
          htmlFor="addHeader"
          className="text-base font-medium text-gray-800 font-p"
        >
          Header
        </label>
      </div>

      {addHeader && (
        <div className="mt-2">
          <div className="flex justify-between items-end mb-2">
            <p>API Header</p>
            <button onClick={handleAddHeader}>
              <FaPlus />
            </button>
          </div>

          <div className="space-y-2">
            {header?.map((param, index) => (
              <div className="flex gap-2">
                <InputField
                  label=""
                  name="headerKey"
                  id="headerKey"
                  placeholder={`Header Key ${index + 1}`}
                  value={header[index]?.key}
                  onChange={(e) => {
                    handleInsertHeader(e, index, "key");
                  }}
                  maxLength={"100"}
                />
                <InputField
                  label=""
                  name="headerValue"
                  id="headerValue"
                  placeholder={`Header Value ${index + 1}`}
                  value={header[index]?.value}
                  onChange={(e) => {
                    handleInsertHeader(e, index, "value");
                  }}
                  maxLength={"100"}
                />

                <button
                  className="text-red-500"
                  onClick={() => handleRemoveHeader(index)}
                >
                  <MdOutlineDeleteForever size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uncomment when payload comes */}
      {/* <AnimatedDropdown
        id="variable"
        name="variable"
        label="Select Variable"
        options={allVariables.map((v) => ({
          label: v,
          value: v,
        }))}
        value={nodesInputData[id]?.variable}
        onChange={(e) => {
          handleInsertVar(e);
        }}
        placeholder="Select Variable"
      /> */}
    </div>
  );
};
