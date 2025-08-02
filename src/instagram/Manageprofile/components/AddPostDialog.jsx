import { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FILTERS = [
  { name: "Normal", style: "" },
  { name: "Clarendon", style: "contrast(1.2) saturate(1.25)" },
  { name: "Gingham", style: "grayscale(0.5) contrast(1.1)" },
  { name: "Lark", style: "brightness(1.1) saturate(1.15)" },
  { name: "Juno", style: "contrast(1.15) saturate(1.3)" },
  { name: "Crema", style: "contrast(0.9) brightness(1.1)" },
  { name: "Aden", style: "hue-rotate(20deg) brightness(1.1)" },
];

const AddPostDialog = ({ open, setOpenPostDialog, setUserProfileDetails }) => {
  // const [mediaType, setMediaType] = useState("photo"); // 'photo' or 'reel'
  // const [file, setFile] = useState(null);
  // const [preview, setPreview] = useState(null);
  // const [caption, setCaption] = useState("");

  const [step, setStep] = useState(0);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [hueRotate, setHueRotate] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [adjustmentTab, setAdjustmentTab] = useState("filters");
  const [aspectRatio, setAspectRatio] = useState("original");
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  // const handleFileChange = (e) => {
  //   const selected = e.target.files[0];
  //   if (!selected) return;

  //   const isImage = selected.type.startsWith("image/");
  //   const isVideo = selected.type.startsWith("video/");

  //   if (
  //     (mediaType === "photo" && isImage) ||
  //     (mediaType === "reel" && isVideo)
  //   ) {
  //     setFile(selected);
  //     setPreview(URL.createObjectURL(selected));
  //   } else {
  //     alert(`Please select a valid ${mediaType === "photo" ? "image" : "video"} file.`);
  //   }
  // };

  // const addNewPost = (type, src, caption) => {
  //   setUserProfileDetails((prevDetails) =>
  //     prevDetails.map((account) =>
  //       account.user_id === 1
  //         ? {
  //             ...account,
  //             dummyPosts: [...account.dummyPosts, { type, src, caption }],
  //           }
  //         : account
  //     )
  //   );
  // };

  // const handlePost = () => {
  //   const uploadedFileUrl = preview; // Replace with actual uploaded URL if applicable
  //   const postType = mediaType === "photo" ? "image" : "video";

  //   addNewPost(postType, uploadedFileUrl, caption);

  //   resetAndClose();
  // };

  const resetAndClose = () => {
    // setFile(null);
    // setPreview(null);
    // setCaption("");
    // setMediaType("photo");
    setOpenPostDialog(false);
  };

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    const totalImages = urls.length;
    if (totalImages > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }
    setImages(urls);
    setStep(1);
  };

  const filteredStyle = {
    transform: `scale(${zoom})`,
    filter: `
      ${selectedFilter}
      brightness(${brightness}%)
      contrast(${contrast}%)
      hue-rotate(${hueRotate}deg)
      grayscale(${grayscale}%)
    `,
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  };

  const aspectRatioOptions = [
    { label: "Original", value: "original" },
    { label: "1:1", value: "1/1" },
    { label: "4:5", value: "4/5" },
    { label: "16:9", value: "16/9" },
  ];

  const getImageContainerStyle = () => {
    if (aspectRatio === "original") {
      return { overflow: "hidden" };
    }
    return {
      aspectRatio,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  return (
    <Dialog
      // header="Create New Post"
      visible={open}
      style={{ width: "850px", maxWidth: "90vw" }}
      onHide={resetAndClose}
      className="rounded-md"
      draggable={false}
    >
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-4xl h-[450px]  bg-white rounded-xl shadow-xl flex overflow-hidden transition-all duration-300">
          {step === 0 && (
            <div
              className="flex-1 flex flex-col justify-center items-center  border-2 border-dashed border-gray-300 rounded-md  p-10"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files);
                if (files.length > 10) {
                  alert("You can upload a maximum of 10 images.");
                  return;
                }
                const urls = files.map((file) => URL.createObjectURL(file));
                setImages(urls);
                setStep(1);
              }}
            >
              <p className="text-xl font-semibold mb-4">Create new post</p>
              <div className="my-2">
                <svg
                  aria-label="Icon to represent media such as images or videos"
                  fill="currentColor"
                  height="77"
                  role="img"
                  viewBox="0 0 97.6 77.3"
                  width="96"
                >
                  <title>
                    Icon to represent media such as images or videos
                  </title>
                  <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" />
                  <path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" />
                  <path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" />
                </svg>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 rounded-md transition bg-blue-500 text-white hover:bg-blue-600"
              >
                Select from device
              </button>
              <p className="text-black text-xl mt-4">
                or drag & drop photos here
              </p>
            </div>
          )}

          {step > 0 && (
            <>
              <div
                className="flex-1 bg-black relative"
                style={getImageContainerStyle()}
              >
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  className="h-full"
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation, Pagination]}
                  navigation
                >
                  {images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={img}
                        alt={`Preview ${i}`}
                        className="object-contain w-full h-full"
                        style={filteredStyle}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="w-[300px] bg-white overflow-y-auto border-l border-gray-200">
                {/* Top Bar */}
                {step === 3 ? (
                  <div className="flex justify-between items-center px-4 py-2 border-b text-sm font-medium cursor-pointer">
                    <button onClick={() => setStep(2)}>←</button>
                    <span>Create new post</span>
                    <button
                      className="text-blue-600"
                      onClick={() => alert("Post shared!")}
                    >
                      Share
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between border-b px-4 py-2">
                    <div className="flex items-center gap-2">
                      {/* <button
                      onClick={() => setShowDiscardDialog(true)}
                      className="text-xl text-gray-700"
                    >
                      ←
                    </button> */}

                      <button
                        onClick={() => {
                          if (step === 1) {
                            setShowDiscardDialog(true);
                          } else {
                            setStep(step - 1);
                          }
                        }}
                        className="text-xl text-gray-700 cursor-pointer"
                      >
                        ←
                      </button>
                      {/* <p className="font-medium">Crop & Zoom</p> */}
                      <p className="font-medium">
                        {step === 1 ? "Crop & Zoom" : step === 2 ? "Edit" : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep((prev) => prev + 1)}
                      className="px-4 py-2 rounded-md transition border border-blue-500 text-blue-500 cursor-pointer hover:bg-blue-100"
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Step 1: Zoom and Aspect Ratio */}
                {step === 1 && (
                  <div className="p-4 space-y-4">
                    {/* <button onClick={() => setShowDiscardDialog(true)} className="absolute top-16 right-6">Discard</button> */}
                    {/* <button onClick={() => setShowDiscardDialog(true)}>←</button> */}
                    <div>
                      <p className="text-sm">Zoom</p>
                      <input
                        type="range"
                        min={1}
                        max={2}
                        step={0.01}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>
                    <div>
                      <p className="text-sm">Aspect Ratio</p>
                      <div className="flex space-x-2 mt-2">
                        {aspectRatioOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setAspectRatio(option.value)}
                            className={`px-3 py-1 rounded-md text-sm transition ${
                              aspectRatio === option.value
                                ? "bg-blue-500 text-white"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Upload multiple images */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-medium">
                          Add more images
                        </label>
                        {images.length >= 10 && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {images.length}/10 images uploaded
                          </span>
                        )}
                      </div>

                      {images.length < 10 && (
                        <>
                          <input
                            type="file"
                            id="add-more-images"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              const total = images.length + files.length;

                              if (total > 10) {
                                alert("You can upload a maximum of 10 images.");
                                return;
                              }

                              const urls = files.map((file) =>
                                URL.createObjectURL(file)
                              );
                              setImages((prev) => [...prev, ...urls]);
                            }}
                            className="hidden"
                          />
                          <button
                            onClick={() =>
                              document.getElementById("add-more-images").click()
                            }
                            className="px-4 py-2 rounded-md transition bg-green-500 text-white hover:bg-green-600 text-sm"
                          >
                            (+) Add more images
                          </button>
                        </>
                      )}
                    </div>

                    {images.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">
                          All Uploaded Images
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {images.map((img, i) => (
                            <div
                              key={i}
                              className="relative w-20 h-20 border rounded overflow-hidden"
                            >
                              <img
                                src={img}
                                alt={`img-${i}`}
                                className="object-cover w-full h-full"
                              />
                              <button
                                onClick={() => {
                                  const newImages = images.filter(
                                    (_, idx) => idx !== i
                                  );
                                  setImages(newImages);
                                  if (activeIndex >= newImages.length) {
                                    setActiveIndex(newImages.length - 1);
                                  }
                                }}
                                className="absolute -top-0 -right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow"
                                title="Remove"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Filters / Adjustments */}
                {step === 2 && (
                  <div className="p-4">
                    {/* <button onClick={() => setShowDiscardDialog(true)} className="absolute top-16 right-6">Discard</button> */}
                    {/* Toggle Tabs */}
                    <div className="flex space-x-4 mb-4">
                      <button
                        className={`font-semibold ${
                          adjustmentTab === "filters"
                            ? "border-b-2 border-black"
                            : "text-gray-500"
                        }`}
                        onClick={() => setAdjustmentTab("filters")}
                      >
                        Filters
                      </button>
                      <button
                        className={`font-semibold ${
                          adjustmentTab === "adjustments"
                            ? "border-b-2 border-black"
                            : "text-gray-500"
                        }`}
                        onClick={() => setAdjustmentTab("adjustments")}
                      >
                        Adjustments
                      </button>
                    </div>

                    {/* Filters Grid */}
                    {adjustmentTab === "filters" && (
                      <div className="grid grid-cols-3 gap-2">
                        {FILTERS.map((filter) => (
                          <div
                            key={filter.name}
                            className="text-center cursor-pointer"
                            onClick={() => setSelectedFilter(filter.style)}
                          >
                            <img
                              src={images[activeIndex]}
                              alt={filter.name}
                              className="w-full h-20 object-cover rounded"
                              style={{ filter: filter.style }}
                            />
                            <p className="text-xs mt-1">{filter.name}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Adjustments Sliders */}
                    {adjustmentTab === "adjustments" && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm block mb-1">
                            Brightness
                          </label>
                          <input
                            type="range"
                            min={50}
                            max={150}
                            step={1}
                            value={brightness}
                            onChange={(e) =>
                              setBrightness(Number(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm block mb-1">Contrast</label>
                          <input
                            type="range"
                            min={50}
                            max={150}
                            step={1}
                            value={contrast}
                            onChange={(e) =>
                              setContrast(Number(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm block mb-1">
                            Hue Rotate
                          </label>
                          <input
                            type="range"
                            min={0}
                            max={360}
                            step={1}
                            value={hueRotate}
                            onChange={(e) =>
                              setHueRotate(Number(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm block mb-1">
                            Grayscale
                          </label>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            value={grayscale}
                            onChange={(e) =>
                              setGrayscale(Number(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Caption */}
                {step === 3 && (
                  <div className="p-4 space-y-4">
                    {/* <button onClick={() => setShowDiscardDialog(true)} className="absolute top-16 right-6">Discard</button> */}
                    <div>
                      <label className="block text-sm mb-1">Caption</label>
                      <textarea
                        className="w-full border rounded-md p-2 text-sm resize-none h-24"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Location</label>
                      <input
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Add location"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {showDiscardDialog && (
            <Dialog
              header="Discard Post?"
              draggable={false}
              visible={showDiscardDialog}
              onHide={() => setShowDiscardDialog(false)}
              style={{ width: "550px" }}
            >
              <div className="p-1 ">
                {/* <h2 className="text-xl font-semibold">Discard Post?</h2> */}
                <p className="m-0">
                  Are you sure you want to discard this post?
                </p>

                <div className="flex flex-col gap-2 mt-4">
                  <button
                    className="px-2 py-2 text-gray-800 border border-gray-300 cursor-pointer rounded"
                    onClick={() => setShowDiscardDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-2 py-2 text-red-500 border border-gray-300 cursor-pointer rounded"
                    onClick={() => {
                      setImages([]);
                      setStep(0);
                      setShowDiscardDialog(false);
                    }}
                  >
                    Discard
                  </button>
                </div>
              </div>
            </Dialog>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default AddPostDialog;
