import { uploadImageFile } from "@/apis/whatsapp/whatsapp";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/components/layout/InputField";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Textarea } from "@/components/ui/textarea";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Preview } from "./components/preview";

export const ReelPost = () => {
  const videoRef = useRef(null);
  const [data, setData] = useState({
    video_url: "",
    video: null,
    share_to_feed: false,
    caption: "",
  });

  function handleVideoSelect(e) {
    try {
      const file = e.target.files[0];
      setData({ ...data, video: file });
    } catch (e) {
      console.log(e);
      toast.error("Error selecting video");
    }
  }

  async function handleVideoUpload(e) {
    try {
      if (!data.video) return toast.error("Please select a video");
      if (data.video_url) return toast.error("Video already uploaded");

      const fileUrl = await uploadImageFile(data.video);

      if (!fileUrl) {
        return toast.error(fileUrl?.msg || "Failed to upload video");
      }

      toast.success("Video uploaded successfully");

      setData({ ...data, video_url: fileUrl?.fileUrl });
    } catch (e) {
      console.log(e);
      toast.error("Error selecting video");
    }
  }

  function handleDeleteVideo() {
    setData({ ...data, video_url: "", video: null });
    videoRef.current.value = "";
  }

  return (
    <div className="flex gap-4">
      <div className="space-y-4 w-2/3">
        <div className="flex items-end gap-2">
          <InputField
            label="Select Video"
            id="video_url"
            label="Video Url"
            type="file"
            onChange={handleVideoSelect}
            accept="video/*"
            ref={videoRef}
          />
          <button className="mb-2" onClick={handleVideoUpload}>
            <FileUploadOutlinedIcon
              className="text-blue-500 cursor-pointer hover:text-blue-700"
              size={20}
            />
          </button>
          <button className="mb-2">
            <MdOutlineDeleteForever
              className="text-red-500 cursor-pointer hover:text-red-700"
              size={20}
              onClick={handleDeleteVideo}
            />
          </button>
        </div>
        <UniversalTextArea
          id="caption"
          name="caption"
          label="Caption"
          value={data.caption}
          placeholder="Enter caption"
          onChange={(e) => setData({ ...data, caption: e.target.value })}
          className="w-full resize-none h-50"
        />
        <div className="flex items-center gap-2">
          <label
            htmlFor="toggleWorkflow"
            className="text-sm font-semibold text-gray-700"
          >
            Share to feed?
          </label>
          <button
            onClick={() => {
              setData({ ...data, share_to_feed: !data.share_to_feed });
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              data.share_to_feed ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                data.share_to_feed ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <UniversalButton
          id="Publish"
          name="Publish"
          label="Publish"
          //   onClick={handleVideoUpload}
          disabled={!data.video_url || !data.caption}
        />
      </div>

      <Preview data={data} />
    </div>
  );
};
