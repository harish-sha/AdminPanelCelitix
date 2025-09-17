import React, { useState, useEffect, useRef } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DoNotDisturbOutlinedIcon from "@mui/icons-material/DoNotDisturbOutlined";

import toast from "react-hot-toast";
import InputVariable from "./InputVariable";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp.js";
import CustomTooltip from "@/components/common/CustomTooltip.jsx";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import { RadioButton } from "primereact/radiobutton";
import InputField from "@/whatsapp/components/InputField";

const extractCoordinates = (url) => {
  let regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  let match = url.match(regex);
  if (match) {
    return {
      lat: match[1],
      lng: match[2],
    };
  }

  regex = /place\/.*\/@(-?\d+\.\d+),(-?\d+\.\d+)/;
  match = url.match(regex);
  if (match) {
    return {
      lat: match[1],
      lng: match[2],
    };
  }

  regex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
  match = url.match(regex);
  if (match) {
    return {
      lat: match[1],
      lng: match[2],
    };
  }

  return null;
};

// Function to extract variables from text (e.g., {{1}})
const extractVariablesFromText = (text) => {
  const regex = /{{(\d+)}}/g;
  let match;
  const variables = [];
  while ((match = regex.exec(text)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  return variables;
};

const TemplateForm = ({
  templateDataNew,
  onInputChange,
  onImageUpload,
  selectedOption,
  fileHeaders,
  selectedTemplateData,
  onUrlIndexChange,
  setVarLength,
  cardIndex,
  setCardIndex,
  setFileData,
  fileData,
  marketingType,
  setMarketingType,
  setLocationData,
  locationData,
  selectedTemplate,
  templateOptions,
}) => {
  const [inputValues, setInputValues] = useState({});

  const templateType =
    templateOptions?.find(
      (option) => option.vendorTemplateId === selectedTemplate
    )?.type || "N/A";
  // const [selectedVariable, setSelectedVariable] = useState("");
  const [urlIndex, setUrlIndex] = useState(null);

  const fileRef = useRef(null);

  const [imageState, setImageState] = useState({
    file: null,
    preview: null,
    name: "",
    uploading: false,
    uploadedUrl: null,
    validFileSelected: false,
  });

  useEffect(() => {
    if (!templateDataNew) {
      setInputValues({});
      setImageState({
        file: null,
        preview: null,
        name: "",
        uploading: false,
        uploadedUrl: null,
        validFileSelected: false,
      });
    }
  }, [templateDataNew]);

  let variables = [];
  if (selectedOption === "option1") {
    variables = ["first_name", "last_name"];
  } else if (selectedOption === "option2" && fileHeaders?.length > 0) {
    variables = fileHeaders;
  }

  useEffect(() => {
    if (!templateDataNew) return;
    let defaultValues = {};

    templateDataNew?.components.forEach((component) => {
      if (component.type === "BODY") {
        const variables = extractVariablesFromText(component.text);
        variables.forEach((variable) => {
          defaultValues[variable] = "";
        });
      }

      if (component.type === "BUTTONS") {
        component.buttons.forEach((button) => {
          if (button.type === "URL") {
            const variables = extractVariablesFromText(button.url);
            variables.forEach((variable) => {
              defaultValues[`button${variable}`] = "";
            });
          }
        });
      }
    });

    setInputValues(defaultValues);
  }, [templateDataNew, selectedOption]);

  const handleInputChange = (e, variable, type = "body") => {
    const { value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [`${type}${variable}`]: value,
    }));

    onInputChange(value, `${type}${variable}`);
  };

  const handleSelectVariable = (variable, inputKey, type = "body") => {
    setInputValues((prev) => {
      const updatedValue = variable;

      const newState = { ...prev, [`${type}${inputKey}`]: updatedValue };

      if (type === "button" && fileHeaders.includes(variable)) {
        const index = fileHeaders.indexOf(variable);

        setUrlIndex(index);
        onUrlIndexChange(index);
      }

      // Use setTimeout to avoid updating parent state in the render phase
      setTimeout(() => {
        onInputChange(newState[`${type}${inputKey}`], `${type}${inputKey}`);
      }, 0);

      return newState;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.error("No file selected.");
      return;
    }
    // const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    // if (!allowedTypes.includes(file.type)) {
    //   toast.error("Only jpg, jpeg, and png files are allowed.");
    //   return;
    // }
    // if (file.size > 5 * 1024 * 1024) {
    //   toast.error("File size must be less than 5MB.");
    //   return;
    // }
    // if (/\s/.test(file.name)) {
    //   toast.error("File name should not contain spaces.");
    //   return;
    // }
    setImageState({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      uploading: false,
      uploadedUrl: null,
      validFileSelected: true,
    });
  };

  const handleUpload = async () => {
    if (!imageState.file) {
      toast.error("Please select an image first!");
      return;
    }
    if (imageState.uploadedUrl) {
      toast.error("Image already uploaded, please choose a different one.");
      return;
    }
    setImageState((prev) => ({ ...prev, uploading: true }));
    try {
      const response = await uploadImageFile(imageState.file);
      if (response.status) {
        toast.success("Media uploaded successfully!");
        setImageState((prev) => ({
          ...prev,
          uploadedUrl: response.fileUrl,
          preview: response.fileUrl,
          validFileSelected: false,
        }));
        onImageUpload(response.fileUrl);
      } else {
        toast.error(response.msg || "Media upload failed.");
      }
    } catch (error) {
      toast.error(error.message || "Error uploading media.");
    } finally {
      setImageState((prev) => ({ ...prev, uploading: false }));
    }
  };

  const handleDelete = () => {
    setImageState({
      file: null,
      preview: null,
      name: "",
      uploading: false,
      uploadedUrl: null,
      validFileSelected: false,
    });
    fileRef.current.value = "";
    onImageUpload(null);
    toast.success("Media removed successfully.");
  };

  const isCarousal = templateDataNew?.components?.find(
    (comp) => comp.type === "CAROUSEL"
  );
  let CardsData = [];

  isCarousal?.cards?.map(({ components: card }, index) => {
    CardsData.push(card);
  });

  useEffect(() => {
    isCarousal?.cards?.map((card, index) => {
      setFileData((prev) => ({
        ...prev,
        [index]: {
          fileTempPath: "",
          filePath: "",
        },
      }));
    });
  }, [isCarousal]);

  async function handleCarFileChange(e, index) {
    const file = e.target.files[0];

    setFileData((prev) => ({
      ...prev,
      [index]: {
        fileTempPath: file,
        filePath: "",
      },
    }));
  }

  async function handleUploadFile(index) {
    if (!fileData[index]?.fileTempPath) {
      return toast.error("Please select a file first");
    }
    const res = await uploadImageFile(fileData[index]?.fileTempPath);
    if (res?.fileUrl) {
      toast.success("Media uploaded successfully!");
    }

    setFileData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        filePath: res?.fileUrl,
      },
    }));
  }

  async function handleDeleteFile(index) {
    setFileData((prev) => ({
      ...prev,
      [index]: {
        fileTempPath: null,
        filePath: "",
      },
    }));

    fileRef.current.value = "";
  }

  return (
    <div className="rounded-md shadow-sm ">
      <div className="bg-[#128C7E] p-2 rounded-t-md">
        <h3 className="text-[0.8rem] font-medium text-white tracking-wider ">
          Template Category - {selectedTemplateData?.category || "N/A"}
        </h3>
        <h3 className="text-[0.8rem] font-medium text-white tracking-wider ">
          Template Type - {selectedTemplateData?.type?.toUpperCase() || "N/A"}
        </h3>
      </div>

      <div className="p-2 space-y-2 bg-gray-50 rounded-b-xl">
        {/* BODY Component: Handle Variables */}
        {templateDataNew?.components.map((component, idx) => {
          if (component.type === "BODY") {
            const extractedVariables = extractVariablesFromText(component.text);
            setVarLength(extractedVariables.length);
            return (
              <div key={component.id || idx} className="space-y-1.5">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium tracking-wide text-gray-700">
                    Message Parameters
                  </p>
                  <CustomTooltip
                    title="Message parameter should not contain any space"
                    placement="right"
                    arrow
                  >
                    <span>
                      <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    </span>
                  </CustomTooltip>
                </div>
                {extractedVariables.map((variable, index) => (
                  <div key={index} className="relative flex flex-col space-y-2">
                    <div className="flex items-center gap-2 ">
                      <label
                        htmlFor={`input${variable}`}
                        className="text-[0.8rem] font-medium text-gray-600 w-10"
                      >
                        {`{{${variable}}}`}
                      </label>
                      <input
                        id={`input${variable}`}
                        name={`input${variable}`}
                        value={inputValues[`body${variable}`] || ""}
                        placeholder={`Enter value for {{${variable}}}`}
                        onChange={(e) => handleInputChange(e, variable, "body")}
                        className="pl-1 pr-6 py-1.5 w-full border rounded-sm text-[0.85rem] border-gray-300 shadow-sm focus:outline-none"
                      />
                    </div>
                    <div className="absolute top-0 right-0 z-10">
                      <InputVariable
                        onSelect={(selectedVar) =>
                          handleSelectVariable(selectedVar, variable, "body")
                        }
                        variables={variables}
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}

        {/* BUTTONS Component: Handle URL Variables */}
        {templateDataNew?.components.map((component, idx) => {
          if (component.type === "BUTTONS") {
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium tracking-wide text-gray-700">
                    URL Parameter
                  </p>
                  <CustomTooltip
                    title="URL parameter should not contain any space"
                    placement="right"
                    arrow
                  >
                    <span>
                      <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    </span>
                  </CustomTooltip>
                </div>
                {component.buttons.map((button, index) => {
                  const urlVariables = extractVariablesFromText(button.url);
                  return (
                    <div key={index} className="space-y-4">
                      {urlVariables.map((variable) => (
                        <div
                          key={variable}
                          className="relative flex flex-col space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <label
                              htmlFor={`buttonInput${variable}`}
                              className="w-10 text-sm font-medium text-gray-600"
                            >
                              {`{{${variable}}}`}
                            </label>
                            <input
                              id={`buttonInput${variable}`}
                              name={`buttonInput${variable}`}
                              value={inputValues[`button${variable}`] || ""}
                              placeholder={`Enter value for {{${variable}}}`}
                              onChange={(e) =>
                                handleInputChange(e, variable, "button")
                              }
                              className="pl-1 pr-6 py-1.5 w-full border rounded-sm text-[0.85rem] border-gray-300 shadow-sm focus:outline-none"
                            />
                          </div>
                          <div className="absolute top-0 right-0 z-50">
                            <InputVariable
                              onSelect={(selectedVar) =>
                                handleSelectVariable(
                                  selectedVar,
                                  variable,
                                  "button"
                                )
                              }
                              variables={variables}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          }
          return null;
        })}

        {!isCarousal &&
          (() => {
            const mediaComponent = templateDataNew?.components.find(
              (component) =>
                component.type === "HEADER" &&
                ["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format)
            );

            if (!mediaComponent) return null;

            const acceptedTypes = {
              IMAGE: "image/*",
              VIDEO: "video/*",
              DOCUMENT: ".pdf,.doc,.docx,.xls,.xlsx",
            };

            return (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium tracking-wide text-gray-700">
                    Upload File
                  </p>
                  <CustomTooltip
                    title="Only jpg, jpeg and png allowed (5 MB max)"
                    placement="right"
                    arrow
                  >
                    <span>
                      <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    </span>
                  </CustomTooltip>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="file"
                    id="imageUpload"
                    accept={acceptedTypes[mediaComponent.format] || "*/*"}
                    onChange={handleImageChange}
                    className="hidden"
                    ref={fileRef}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                    className="px-2 py-1.5 tracking-wide bg-blue-400 text-white text-[0.85rem] rounded-md shadow-md hover:bg-blue-500 focus:outline-none cursor-pointer"
                  >
                    Choose File
                  </button>

                  {(imageState.file || imageState.uploadedUrl) && (
                    <>
                      <button
                        onClick={handleUpload}
                        disabled={
                          imageState.uploading || !imageState.validFileSelected
                        }
                        className={`px-2 py-[0.3rem] ${
                          imageState.uploading || !imageState.validFileSelected
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-400 cursor-pointer hover:bg-green-500"
                        } text-white text-sm rounded-md shadow-md focus:outline-none`}
                      >
                        {imageState.uploading ? (
                          <DoNotDisturbOutlinedIcon
                            sx={{ color: "white", fontSize: "22px" }}
                          />
                        ) : (
                          <FileUploadOutlinedIcon
                            sx={{ color: "white", fontSize: "22px" }}
                          />
                        )}
                      </button>

                      <button
                        onClick={handleDelete}
                        className="p-2 rounded-full cursor-pointer focus:outline-none hover:bg-gray-200"
                      >
                        <MdOutlineDeleteForever
                          className="text-red-500 hover:text-red-600"
                          size={20}
                        />
                      </button>
                    </>
                  )}
                </div>

                {imageState.name && (
                  <span className="text-[0.8rem] text-gray-700">
                    {imageState.name}
                  </span>
                )}
              </div>
            );
          })()}

        {isCarousal && (
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium tracking-wide text-gray-700">
                Upload File
              </p>
              <CustomTooltip
                title="Only jpg, jpeg and png allowed (5 MB max)"
                placement="right"
                arrow
              >
                <span>
                  <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                </span>
              </CustomTooltip>
            </div>

            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              renderArrowPrev={() => null}
              renderArrowNext={() => null}
              selectedItem={cardIndex}
              onChange={(index) => setCardIndex(index)}
              renderIndicator={(onClickHandler, isSelected, index) => {
                const baseClasses = "w-3 h-3 rounded-full mx-1 cursor-pointer";
                const indicatorClass = isSelected
                  ? "bg-[#212529]"
                  : "bg-[#7E7F80]";
                return (
                  <li
                    key={index}
                    className={`inline-block ${baseClasses} ${indicatorClass}`}
                    onClick={() => {
                      onClickHandler();
                      setCardIndex(index);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Slide ${index + 1}`}
                  />
                );
              }}
            >
              {CardsData.map((card, index) => {
                // console.log(card);
                const handler = card.find(
                  (item) =>
                    item.type === "HEADER" &&
                    ["IMAGE", "VIDEO", "DOCUMENT"].includes(item.format)
                );

                if (!handler) {
                  // Use empty div to avoid breaking Carousel layout
                  return <div key={index} />;
                }

                const acceptedTypes = {
                  IMAGE: "image/*",
                  VIDEO: "video/*",
                  DOCUMENT: ".pdf,.doc,.docx,.xls,.xlsx",
                };

                return (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex items-start gap-2">
                      <input
                        type="file"
                        id={`imageUpload-${index}`}
                        accept={acceptedTypes[handler.format] || "*/*"}
                        onChange={(e) => handleCarFileChange(e, index)}
                        className="hidden"
                        ref={fileRef}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          document
                            .getElementById(`imageUpload-${index}`)
                            ?.click()
                        }
                        className="px-2 py-1.5 tracking-wide bg-blue-400 text-white text-[0.85rem] rounded-md shadow-md hover:bg-blue-500 focus:outline-none cursor-pointer"
                      >
                        Choose File
                      </button>
                    </div>

                    {fileData[index] && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUploadFile(index)}
                          disabled={!fileData[index]}
                          className="px-2 py-[0.3rem] bg-green-400 cursor-pointer hover:bg-green-500 text-white text-sm rounded-md shadow-md focus:outline-none"
                        >
                          <FileUploadOutlinedIcon
                            sx={{ color: "white", fontSize: "22px" }}
                          />
                        </button>

                        <button
                          onClick={() => handleDeleteFile(index)}
                          className="p-2 rounded-full cursor-pointer focus:outline-none hover:bg-gray-200"
                        >
                          <MdOutlineDeleteForever
                            className="text-red-500 hover:text-red-600"
                            size={20}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}
      </div>
      {templateType === "location" && (
        <div className="p-2 clear-both space-y-2 bg-gray-50 rounded-b-xl">
          <InputField
            id="locationurl"
            name="locationurl"
            label={"Location URL (optional)"}
            onChange={(e) => {
              setLocationData((prev) => ({
                ...prev,
                url: e.target.value,
                latitude: extractCoordinates(e.target.value)?.lat,
                longitude: extractCoordinates(e.target.value)?.lng,
              }));
            }}
            tooltipContent="Paste map url then we automatically extract Latitude and Longitude"
            value={locationData.url}
            placeholder="Enter location url"
          />
          <div className="flex items-center gap-2">
            <InputField
              id="latitude"
              name="latitude"
              label={"Latitude"}
              onChange={(e) => {
                setLocationData((prev) => ({
                  ...prev,
                  latitude: e.target.value,
                }));
              }}
              tooltipContent="Enter Latitude"
              value={locationData.latitude}
              placeholder="Enter Latitude value"
            />
            <InputField
              id="longitude"
              name="longitude"
              label={"Longitude"}
              onChange={(e) => {
                setLocationData((prev) => ({
                  ...prev,
                  longitude: e.target.value,
                }));
              }}
              tooltipContent="Enter Longitude"
              value={locationData.longitude}
              placeholder="Enter longitude value"
            />
          </div>
          <InputField
            id="name"
            name="name"
            label={"Name"}
            onChange={(e) => {
              setLocationData((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            tooltipContent="Enter Name"
            value={locationData.name}
            placeholder="Enter A name for the location"
          />
          <InputField
            id="address"
            name="address"
            label={"Address"}
            onChange={(e) => {
              setLocationData((prev) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
            tooltipContent="Enter Address"
            value={locationData.address}
            placeholder="Enter address"
          />
        </div>
      )}
    </div>
  );
};

export default TemplateForm;
