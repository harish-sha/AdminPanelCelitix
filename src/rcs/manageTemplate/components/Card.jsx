import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

export const Card = ({
  type,
  cardData,
  setCardData,
  cardOrientation,
  setCardOrientation,
  cardwidth,
  setCardwidth,
}) => {
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    console.log(file);

    // if (file) {
    //   const validExtensions = [".xls", ".xlsx", ".xlsm"];
    //   const fileExtension = file.name.split(".").pop();

    //   if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
    //     if (isValidFileName(file.name.split(".")[0])) {
    //       setUploadedFile(file);
    //       setIsUploaded(false);
    //       parseFile(file);
    //     } else {
    //       toast.error(
    //         "File name can only contain alphanumeric characters, underscores, or hyphens."
    //       );
    //     }
    //   } else {
    //     toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
    //   }
    // }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = event.target.files[0];
    console.log(file);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <InputField
          id={"title"}
          name={"title"}
          placeholder="Enter Title"
          label={"Title"}
        />
        {type === "rich_card" ? (
          <AnimatedDropdown
            id={"selectCardOrientation"}
            label="Select Orientation"
            name={"selectCardOrientation"}
            options={[
              {
                label: "Vertical",
                value: "vertical",
              },
              {
                label: "Horizontal",
                value: "horizontal",
              },
            ]}
            placeholder="Select Card Orientation"
            onChange={() => {}}
          />
        ) : (
          <AnimatedDropdown
            id={"selectCardWidth"}
            label="Select Card Width"
            name={"selectCardWidth"}
            options={[
              {
                label: "Small",
                value: "small",
              },
              {
                label: "Medium",
                value: "medium",
              },
            ]}
            placeholder="Select Card Width"
            onChange={() => {}}
          />
        )}
        <AnimatedDropdown
          id={"selectMediaHeight"}
          label="Select Media Height"
          name={"selectMediaHeight"}
          options={[
            {
              label: "Medium",
              value: "medium",
            },
            {
              label: "Short",
              value: "short",
            },
          ]}
          placeholder="Select Media Height"
          onChange={() => {}}
        />
      </div>
      <div>
        <div
          className="file-upload-container"
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            onChange={(e) => {
              handleFileChange(e);
            }}
            className="hidden"
            id="fileInput"
            name="fileInput"
            accept=""
          />
          <div className="flex items-center justify-center gap-2">
            <label
              htmlFor="fileInput"
              className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500"
            >
              Choose or Drop File
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
