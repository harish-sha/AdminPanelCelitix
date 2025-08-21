import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import InputField from "@/whatsapp/components/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { Label } from "@/components/ui/label";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";
import toast from "react-hot-toast";
import { extractVariable } from "./helper/extractVariable";
import { IconButton, Slider } from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";

export const FileNodeContent = ({
  accept,
  allVariables,
  id,
  nodesInputData,
  setNodesInputData,
  addVariable,
}: {
  accept?: string | null;
  allVariables?: any[];
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  addVariable: (data: String) => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [paused, setPaused] = useState(true);
  const [position, setPosition] = useState<number | number[]>(0);
  const [duration, setDuration] = useState(0);
  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];

    const type = file?.type?.split("/")[0];
    // if (type !== "image" && type !== "video" && type !== accept) {
    //   toast.error("Only " + accept + " files are allowed");
    //   fileRef.current.value = "";
    //   return;
    // }

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        fileUrl: file,
      },
    }));
  };

  const handleAddVariable = (e: any) => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        variable: e,
      },
    }));
    const newTag = `{{${e}}}`;
    if (!e) return;
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        fileCaption: (prev[id]?.fileCaption || "") + newTag,
      },
    }));
  };

  useEffect(() => {
    const message =
      nodesInputData[id]?.imageCaption ||
      nodesInputData[id]?.videoCaption ||
      nodesInputData[id]?.documentCaption;

    if (!message) return;

    const variable = extractVariable({ message: message });

    if (variable) {
      addVariable(variable);
    }

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        selectedOption: nodesInputData[id]?.selectedOption,
        fileUrl:
          nodesInputData[id]?.imageUrl ||
          nodesInputData[id]?.videoUrl ||
          nodesInputData[id]?.documentUrl,

        fileCaption:
          nodesInputData[id]?.imageCaption ||
          nodesInputData[id]?.videoCaption ||
          nodesInputData[id]?.documentCaption,

        variable: variable,
      },
    }));
  }, []);

  function togglePlayPause() {
    if (!audioRef.current) return;

    if (paused) {
      audioRef.current
        .play()
        .then(() => {
          setPaused(false);
        })
        .catch((err) => {
          console.error("Audio play error:", err);
          toast.error("Could not play the audio.");
        });
    } else {
      audioRef.current.pause();
      setPaused(true);
    }
  }

  const handleLoadedMetadata = () => {
    const audioDuration = audioRef.current.duration;
    if (!isNaN(audioDuration)) {
      setDuration(Math.floor(audioDuration));
    }
  };

  const handleTimeUpdate = () => {
    setPosition(Math.floor(audioRef.current.currentTime));
  };

  function RenderAudio() {
    return (
      <div className="flex gap-2 items-center">
        <audio
          ref={audioRef}
          src={
            /^(http|https):/.test(nodesInputData[id].fileUrl)
              ? nodesInputData[id].fileUrl
              : nodesInputData[id]?.selectedOption === "upload" &&
                URL.createObjectURL(nodesInputData[id].fileUrl)
          }
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
        <IconButton
          aria-label={paused ? "play" : "pause"}
          onClick={togglePlayPause}
        >
          {paused ? (
            <PlayArrowRounded sx={{ fontSize: "3rem" }} />
          ) : (
            <PauseRounded sx={{ fontSize: "3rem" }} />
          )}
        </IconButton>

        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
          sx={(t) => ({
            color: "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&::before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
                ...t.applyStyles("dark", {
                  boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                }),
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
            ...t.applyStyles("dark", {
              color: "#fff",
            }),
          })}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <AnimatedDropdown
        id="selectChoice"
        name="selectChoice"
        label="Select Choice"
        options={[
          { value: "url", label: "Enter Url" },
          { value: "upload", label: "Upload" },
        ]}
        value={nodesInputData[id]?.selectedOption}
        onChange={(e) => {
          setNodesInputData(() => ({
            ...nodesInputData,
            [id]: {
              ...nodesInputData[id],
              selectedOption: e,
            },
          }));
        }}
      />

      {nodesInputData[id]?.selectedOption === "upload" && (
        <div className="flex flex-col gap-2 text-black">
          <Label htmlFor="uplaodfile">Upload File</Label>
          <Input
            type="file"
            id="uplaodfile"
            name="uplaodfile"
            onChange={handleFileUpload}
            accept={accept !== "video" ? `${accept}/*` : ".3gp,.mp4"}
            required
            ref={fileRef}
          />
        </div>
      )}
      {nodesInputData[id]?.selectedOption === "url" && (
        <InputField
          id="url"
          name="url"
          label="Enter Url"
          value={nodesInputData[id]?.fileUrl}
          placeholder="Enter File Url"
          onChange={(e) => {
            setNodesInputData(() => ({
              ...nodesInputData,
              [id]: {
                ...nodesInputData[id],
                fileUrl: e.target.value,
              },
            }));
          }}
        />
      )}

      {/* preview */}

      {nodesInputData[id]?.fileUrl &&
        (accept === "image" ? (
          <img
            src={
              /^(http|https):/.test(nodesInputData[id].fileUrl)
                ? nodesInputData[id].fileUrl
                : nodesInputData[id]?.selectedOption === "upload" &&
                  URL.createObjectURL(nodesInputData[id].fileUrl)
            }
            alt={"Image"}
            height={200}
            width={200}
          />
        ) : accept === "video" ? (
          <video
            src={
              /^(http|https):/.test(nodesInputData[id].fileUrl)
                ? nodesInputData[id].fileUrl
                : nodesInputData[id]?.selectedOption === "upload" &&
                  URL.createObjectURL(nodesInputData[id].fileUrl)
            }
            controls={true}
            height={200}
          ></video>
        ) : // : accept === "document" ? (
        //   // https://view.officeapps.live.com/op/embed.aspx?src=${previewDialog.url} add for excel
        //   <iframe
        //     src={
        //       /^(http|https):/.test(nodesInputData[id].fileUrl)
        //         ? `https://view.officeapps.live.com/op/embed.aspx?src=${nodesInputData[id].fileUrl}`
        //         : nodesInputData[id]?.selectedOption === "upload" &&
        //           // URL.createObjectURL(nodesInputData[id].fileUrl)
        //           `https://view.officeapps.live.com/op/embed.aspx?src=${URL.createObjectURL(
        //             nodesInputData[id].fileUrl
        //           )}`
        //     }
        //     height={200}
        //   ></iframe>
        // )
        accept === "audio" ? (
          <RenderAudio />
        ) : null)}

      <label className="text-sm font-semibold text-gray-700">
        Caption text
      </label>
      <textarea
        // label="Caption text"
        className="w-full p-1.5 border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm"
        id="captionText"
        name="captionText"
        placeholder="Enter Caption Text"
        value={nodesInputData[id]?.fileCaption}
        onChange={(e: { target: { value: any } }) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              fileCaption: e.target.value,
            },
          }));
        }}
      />
      <AnimatedDropdown
        id="selectVaribleDropdown"
        name="selectVaribleDropdown"
        label="Select Variable"
        options={allVariables.map((v) => ({
          label: v,
          value: v,
        }))}
        value={nodesInputData[id]?.variable}
        onChange={(e: any) => {
          handleAddVariable(e);
        }}
      />
    </div>
  );
};
