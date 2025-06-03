// import { uploadImageFile } from "@/apis/whatsapp/whatsapp";
// import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
// import InputField from "@/whatsapp/components/InputField";
// import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
// import { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { MdOutlineDeleteForever } from "react-icons/md";

// export const Card = ({
//   type,
//   cardData,
//   setCardData,
//   cardOrientation,
//   setCardOrientation,
// }) => {
//   const [customFilePath, setCustomFilePath] = useState(null);
//   const fileRef = useRef(null);

//   const handleFileDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];

//     // if (file) {
//     //   const validExtensions = [".xls", ".xlsx", ".xlsm"];
//     //   const fileExtension = file.name.split(".").pop();

//     //   if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
//     //     if (isValidFileName(file.name.split(".")[0])) {
//     //       setUploadedFile(file);
//     //       setIsUploaded(false);
//     //       parseFile(file);
//     //     } else {
//     //       toast.error(
//     //         "File name can only contain alphanumeric characters, underscores, or hyphens."
//     //       );
//     //     }
//     //   } else {
//     //     toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
//     //   }
//     // }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;
//     const fileType = file.type.split("/")[0];

//     const img = new Image();
//     img.src = URL.createObjectURL(file);

//     if (file?.size) {
//       if (fileType === "image" && file?.size > 2 * 1024 * 1024) {
//         toast.error("File size must be less than 2MB.");
//         return;
//       } else if (fileType === "video" && file?.size > 10 * 1024 * 1024) {
//         toast.error("File size must be less than 10MB.");
//         return;
//       }
//     }
//     img.onload = () => {
//       const width = img.naturalWidth;
//       const height = img.naturalHeight;

//       const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
//       const divisor = gcd(width, height);
//       const ratioWidth = width / divisor;
//       const ratioHeight = height / divisor;
//       const ratio = `${ratioWidth}:${ratioHeight}`;

//       const ratios = {
//         vertical: {
//           short: "3:1",
//           medium: "2:1",
//         },
//         horizontal: "3:4",
//       };

//       if (
//         cardOrientation === "vertical" &&
//         cardData.mediaHeight === "short" &&
//         ratio !== ratios.vertical.short
//       ) {
//         toast.error("Please select a 3:1 ratio image for vertical short card.");
//         return;
//       }

//       if (
//         cardOrientation === "vertical" &&
//         cardData.mediaHeight === "medium" &&
//         ratio !== ratios.vertical.medium
//       ) {
//         toast.error("Please select a 2:1 ratio image for vertical tall card.");
//         return;
//       }

//       if (cardOrientation === "horizontal" && ratio !== ratios.horizontal) {
//         toast.error("Please select a 3:4 ratio image for horizontal card.");
//         return;
//       }

//       setCardData({ ...cardData, filePath: file });
//     };
//     img.onloadend = () => {
//       URL.revokeObjectURL(img.src);
//     };
//   };

//   const uploadFile = async () => {
//     if (!cardData.filePath) return toast.error("Please select a file.");
//     if (cardData.file) return toast.error("File already uploaded.");
//     const res = await uploadImageFile(cardData.filePath);
//     setCardData({ ...cardData, file: URL.createObjectURL(cardData.filePath) });
//   };

//   const deleteFileUpload = () => {
//     setCustomFilePath("");
//     setCardData({ ...cardData, file: "", filePath: "" });
//     fileRef.current.value = null;
//   };

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
//         <InputField
//           id={"title"}
//           name={"title"}
//           placeholder="Enter Title"
//           label={"Title"}
//           value={cardData.title}
//           onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
//         />
//         <AnimatedDropdown
//           id={"selectCardOrientation"}
//           label="Select Orientation"
//           name={"selectCardOrientation"}
//           options={[
//             {
//               label: "Vertical",
//               value: "vertical",
//             },
//             {
//               label: "Horizontal",
//               value: "horizontal",
//             },
//           ]}
//           placeholder="Select Card Orientation"
//           value={cardOrientation}
//           onChange={(e) => setCardOrientation(e)}
//         />

//         <AnimatedDropdown
//           id={"selectMediaHeight"}
//           label="Select Media Height"
//           name={"selectMediaHeight"}
//           options={
//             cardOrientation === "vertical"
//               ? [
//                   {
//                     label: "Medium",
//                     value: "medium",
//                   },
//                   {
//                     label: "Short",
//                     value: "short",
//                   },
//                 ]
//               : [
//                   {
//                     label: "Left",
//                     value: "left",
//                   },
//                   {
//                     label: "Right",
//                     value: "right",
//                   },
//                 ]
//           }
//           placeholder="Select Media Height"
//           value={cardData.mediaHeight}
//           onChange={(e) => setCardData({ ...cardData, mediaHeight: e })}
//         />
//       </div>
//       <div>
//         <div
//           className="file-upload-container"
//           onDrop={handleFileDrop}
//           onDragOver={handleDragOver}
//         >
//           <input
//             type="file"
//             onChange={(e) => {
//               handleFileChange(e);
//             }}
//             className="hidden"
//             id="fileInput"
//             name="fileInput"
//             accept="image/* video/*"
//             ref={fileRef}
//           />
//           <div className="flex items-center justify-center gap-2">
//             <label
//               htmlFor="fileInput"
//               className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500"
//             >
//               Choose or Drop File
//             </label>
//             <div className="upload-button-container ">
//               <button
//                 onClick={uploadFile}
//                 disabled={false}
//                 className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer `}
//               >
//                 <FileUploadOutlinedIcon
//                   sx={{ color: "white", fontSize: "23px" }}
//                 />
//               </button>
//             </div>
//           </div>
//           <div className="mt-3">
//             {cardData?.filePath ? (
//               <div className="flex items-center justify-center gap-1 file-upload-info">
//                 <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
//                   File Selected: <strong>{cardData?.filePath.name}</strong>
//                 </p>
//                 <button
//                   className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
//                   onClick={deleteFileUpload}
//                 >
//                   <MdOutlineDeleteForever
//                     className="text-red-500 cursor-pointer hover:text-red-600"
//                     size={20}
//                   />
//                 </button>
//               </div>
//             ) : (
//               <p className="text-sm font-semibold tracking-wide text-gray-500 file-upload-feedback file-upload-feedback-error">
//                 No file uploaded yet!
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import { uploadImageFile } from "@/apis/whatsapp/whatsapp";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

export const Card = ({
  type,
  cardData,
  setCardData,
  cardOrientation,
  setCardOrientation,
}) => {
  const [customFilePath, setCustomFilePath] = useState(null);
  const fileRef = useRef(null);

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

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
    const file = e.target.files[0];

    // if(!cardm)

    if (!cardOrientation) {
      return toast.error("Please select card orientation.");
    }
    if (!cardData.mediaHeight) {
      return toast.error("Please select card height.");
    }

    if (!file) return;
    const fileType = file.type.split("/")[0];

    const img = new Image();
    img.src = URL.createObjectURL(file);

    if (file?.size) {
      if (fileType === "image" && file?.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB.");
        return;
      } else if (fileType === "video" && file?.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB.");
        return;
      }
    }
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(width, height);
      const ratioWidth = width / divisor;
      const ratioHeight = height / divisor;
      const ratio = `${ratioWidth}:${ratioHeight}`;

      const ratios = {
        vertical: {
          short: "3:1",
          medium: "2:1",
        },
        horizontal: "3:4",
      };

      if (
        cardOrientation === "vertical" &&
        cardData.mediaHeight === "short" &&
        ratio !== ratios.vertical.short
      ) {
        fileRef.current.value = null;
        toast.error("Please select a 3:1 ratio image for vertical short card.");
        return;
      }

      if (
        cardOrientation === "vertical" &&
        cardData.mediaHeight === "medium" &&
        ratio !== ratios.vertical.medium
      ) {
        fileRef.current.value = null;
        toast.error("Please select a 2:1 ratio image for vertical tall card.");
        return;
      }

      if (cardOrientation === "horizontal" && ratio !== ratios.horizontal) {
        fileRef.current.value = null;
        toast.error("Please select a 3:4 ratio image for horizontal card.");
        return;
      }

      setCardData({ ...cardData, filePath: file });
    };
    img.onloadend = () => {
      URL.revokeObjectURL(img.src);
    };
  };

  const uploadFile = async () => {
    if (!cardData.filePath) return toast.error("Please select a file.");
    if (cardData.file) return toast.error("File already uploaded.");
    const res = await uploadImageFile(cardData.filePath);
    setCardData({ ...cardData, file: res?.fileUrl });

    toast.success("File Uploaded Successfully");
  };

  const deleteFileUpload = () => {
    setCustomFilePath("");
    setCardData({ ...cardData, file: "", filePath: "" });
    fileRef.current.value = null;
  };

  return (
    <div>
      {/* <div className="flex flex-col items-center justify-center gap-2 md:flex-row"> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:flex-row">
        <InputField
          id={"title"}
          name={"title"}
          placeholder="Enter Title"
          label={"Title"}
          value={cardData.title}
          onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
          maxLength="200"
        />
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
          placeholder="Select Card"
          value={cardOrientation}
          onChange={(e) => {
            setCardOrientation(e);

            setCardData({
              ...cardData,
              file: "",
              filePath: "",
            });
          }}
        />

        <AnimatedDropdown
          id={"selectMediaHeight"}
          label="Select Media Height"
          name={"selectMediaHeight"}
          options={
            cardOrientation === "vertical"
              ? [
                {
                  label: "Medium",
                  value: "medium",
                },
                {
                  label: "Short",
                  value: "short",
                },
              ]
              : [
                {
                  label: "Left",
                  value: "left",
                },
                {
                  label: "Right",
                  value: "right",
                },
              ]
          }
          placeholder="Select Media"
          value={cardData.mediaHeight}
          onChange={(e) => {
            setCardData({
              ...cardData,
              mediaHeight: e,
              file: "",
              filePath: "",
            });
          }}
        />
      </div>
      <div className="mb-5">
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
            accept="image/* video/*"
            ref={fileRef}
          />
          <div className="flex items-center justify-center gap-2">
            <label
              htmlFor="fileInput"
              className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500"
            >
              Choose or Drop File
            </label>
            <div className="upload-button-container ">
              <button
                onClick={uploadFile}
                disabled={false}
                className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer `}
              >
                <FileUploadOutlinedIcon
                  sx={{ color: "white", fontSize: "23px" }}
                />
              </button>
            </div>
          </div>
          <div className="mt-3">
            {cardData?.filePath ? (
              <div className="flex items-center justify-center gap-1 file-upload-info">
                <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                  File Selected: <strong>{cardData?.filePath.name}</strong>
                </p>
                <button
                  className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                  onClick={deleteFileUpload}
                >
                  <MdOutlineDeleteForever
                    className="text-red-500 cursor-pointer hover:text-red-600"
                    size={20}
                  />
                </button>
              </div>
            ) : (
              <p className="text-sm font-semibold tracking-wide text-gray-500 file-upload-feedback file-upload-feedback-error">
                No file uploaded yet!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};