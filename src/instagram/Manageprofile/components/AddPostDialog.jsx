import { useState } from "react";
import { Dialog } from "primereact/dialog";

const AddPostDialog = ({ open, setOpenPostDialog, setUserProfileDetails }) => {
  const [mediaType, setMediaType] = useState("photo"); // 'photo' or 'reel'
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const isImage = selected.type.startsWith("image/");
    const isVideo = selected.type.startsWith("video/");

    if (
      (mediaType === "photo" && isImage) ||
      (mediaType === "reel" && isVideo)
    ) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    } else {
      alert(`Please select a valid ${mediaType === "photo" ? "image" : "video"} file.`);
    }
  };

  const addNewPost = (type, src, caption) => {
    setUserProfileDetails((prevDetails) =>
      prevDetails.map((account) =>
        account.user_id === 1
          ? {
              ...account,
              dummyPosts: [...account.dummyPosts, { type, src, caption }],
            }
          : account
      )
    );
  };

  const handlePost = () => {
    const uploadedFileUrl = preview; // Replace with actual uploaded URL if applicable
    const postType = mediaType === "photo" ? "image" : "video";

    addNewPost(postType, uploadedFileUrl, caption);

    resetAndClose();
  };

  const resetAndClose = () => {
    setFile(null);
    setPreview(null);
    setCaption("");
    setMediaType("photo");
    setOpenPostDialog(false);
  };

  return (
    <Dialog
      header="Create New Post"
      visible={open}
      style={{ width: "600px", maxWidth: "90vw" }}
      onHide={resetAndClose}
      className="rounded-md"
    >
      <div className="flex flex-col gap-6 px-2 py-4">
        {/* Media Type Toggle */}
        <div className="flex justify-center gap-3">
          {["photo", "reel"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setMediaType(type);
                setFile(null);
                setPreview(null);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition border ${
                mediaType === type
                  ? "bg-black text-white border-black"
                  : "text-black border-gray-400 hover:bg-gray-100"
              }`}
            >
              {type === "photo" ? "Upload Photo" : "Upload Reel"}
            </button>
          ))}
        </div>

        {/* File Upload Area */}
        <label
          className={`relative border-2 border-dashed rounded-lg p-6 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out ${
            preview ? "border-green-500" : "border-gray-300 hover:border-black"
          }`}
        >
          <input
            type="file"
            accept={mediaType === "photo" ? "image/*" : "video/*"}
            onChange={handleFileChange}
            className="hidden"
          />
          {!preview ? (
            <div className="text-center text-gray-500">
              Click to upload a {mediaType}
            </div>
          ) : mediaType === "photo" ? (
            <img
              src={preview}
              alt="Preview"
              className="max-h-80 w-full object-cover rounded-md"
            />
          ) : (
            <video
              src={preview}
              controls
              className="max-h-80 w-full object-cover rounded-md"
            />
          )}
        </label>

        {/* Caption Input */}
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Post Button */}
        <div className="flex justify-end">
          <button
            onClick={handlePost}
            disabled={!file}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              file
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddPostDialog;
