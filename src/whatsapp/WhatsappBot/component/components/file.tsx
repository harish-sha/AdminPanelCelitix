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
import Lottie from "lottie-react";
import files from "@/assets/animation/Files.json";
import MusicPlayerSlider from "@/obd/managevoiceclips/components/ObdAudioplayer";
import AudioPlayer from "./AudioPlayer";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";

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
  const inputRef = useRef(null);

  const [paused, setPaused] = useState(true);
  const [position, setPosition] = useState<number | number[]>(0);
  const [duration, setDuration] = useState(0);
  const handleFileUpload = async (event: any) => {
    if (!fileRef) return;
    let isError = false;
    let fileSize = null;
    const file = event.target.files[0];

    const size = file?.size / 1024 / 1024;
    if (accept === "image" && size > 5) {
      isError = true;
      fileSize = 5;
    }

    if (accept === "video" && size > 16) {
      isError = true;
      fileSize = 16;
    }

    if (isError) {
      toast.error(`File size should be less than ${fileSize}MB`);
      fileRef.current.value = null;
      setNodesInputData((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          fileUrl: "",
        },
      }));
      return;
    }

    const type = file?.type?.split("/")[0];

    let isExcel = false;

    if (
      file?.name?.split(".")?.pop()?.split(/\#|\?/)[0] === "csv" ||
      file?.name?.split(".")?.pop()?.split(/\#|\?/)[0] === "xlsx"
    ) {
      isExcel = true;
    }
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
        isExcel,
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
          nodesInputData[id]?.fileUrl ||
          nodesInputData[id]?.imageUrl ||
          nodesInputData[id]?.videoUrl ||
          nodesInputData[id]?.documentUrl,

        fileCaption:
          nodesInputData[id]?.fileCaption ||
          nodesInputData[id]?.imageCaption ||
          nodesInputData[id]?.videoCaption ||
          nodesInputData[id]?.documentCaption,

        variable: variable,
      },
    }));
  }, [id]);

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

  function addFormat(formatType: string) {
    if (!inputRef.current) return;
    const input = nodesInputData[id]?.fileCaption || "";
    if (input?.length >= 20) return;

    const inputEl = inputRef.current;
    const { selectionStart, selectionEnd } = inputEl;
    const selectedText = input?.substring(selectionStart, selectionEnd);
    const data = {
      bold: {
        start: "*",
        end: "*",
      },
      italic: {
        start: "_",
        end: "_",
      },
      strike: {
        start: "~",
        end: "~",
      },
    };
    const { start, end } = data[formatType];
    const newValue =
      input.substring(0, selectionStart) +
      start +
      selectedText +
      end +
      input.substring(selectionEnd);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        fileCaption: newValue,
      },
    }));

    requestAnimationFrame(() => {
      const pos = selectionEnd + start.length + end.length;
      inputEl.setSelectionRange(pos, pos);
      inputEl.focus();
    });
  }

  function insertEmoji(emoji: string) {
    if (!inputRef.current) return;
    const input = nodesInputData[id]?.fileCaption || "";
    if (input?.length >= 20) return;

    const inputEl = inputRef.current;

    const start = inputEl.selectionStart;
    const end = inputEl.selectionEnd;

    const newText = input.substring(0, start) + emoji + input.substring(end);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        fileCaption: newText,
      },
    }));

    requestAnimationFrame(() => {
      inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
      inputEl.focus();
    });

    //  inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    //  inputEl.focus();

    // setTimeout(() => {
    //   inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    //   inputEl.focus();
    // }, 0);
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
              fileUrl: "",
              fileType: "",
              isExcel: false,
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
          // onChange={(e) => {
          //   setNodesInputData(() => ({
          //     ...nodesInputData,
          //     [id]: {
          //       ...nodesInputData[id],
          //       fileUrl: e.target.value,
          //     },
          //   }));
          // }}
          onChange={(e) => {
            const value = e.target.value;
            const extension = value
              .split(".")
              .pop()
              ?.split(/\#|\?/)[0]
              ?.toLowerCase();

            const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
              extension
            );
            const isVideo = ["mp4", "mov", "webm", "3gp"].includes(extension);
            const isDocument = ["pdf", "doc", "docx"].includes(extension);
            const isExcel = ["csv", "xlsx"].includes(extension);
            const isAudio = ["mp3", "wav", "ogg", "m4a"].includes(extension);

            setNodesInputData((prev) => ({
              ...prev,
              [id]: {
                ...prev[id],
                fileUrl: value,
                isExcel,
                fileType: isImage
                  ? "image"
                  : isVideo
                  ? "video"
                  : isDocument
                  ? "document"
                  : isAudio
                  ? "audio"
                  : "unknown",
              },
            }));
          }}
        />
      )}

      {/* preview */}

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Caption text
          </label>
          <textarea
            // label="Caption text"
            className="w-full p-1.5 border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm h-30"
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
            ref={inputRef}
            maxLength="20"
          />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center gap-2 mt-2 bg-white border border-slate-200 rounded-xl px-2 py-2 shadow w-max"
          >
            <Tooltip title="Bold" arrow>
              <button
                onClick={() => addFormat("bold")}
                className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
              >
                <FormatBoldOutlined fontSize="small" />
              </button>
            </Tooltip>
            <Tooltip title="Italic" arrow>
              <button
                onClick={() => addFormat("italic")}
                className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
              >
                <FormatItalicOutlined fontSize="small" />
              </button>
            </Tooltip>
            <Tooltip title="Strikethrough" arrow>
              <button
                onClick={() => addFormat("strike")}
                className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
              >
                <FormatStrikethroughOutlined fontSize="small" />
              </button>
            </Tooltip>
            <div className="w-px h-5 bg-slate-300 mx-1"></div>
            <Tooltip title="Emoji Picker" arrow>
              <CustomEmojiPicker position="top" onSelect={insertEmoji} />
            </Tooltip>
          </motion.div>
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

        <div className="flex items-center justify-center rounded-lg border w-full h-56 mt-2">
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
                // height={200}
                // width={200}
                className="w-full h-full object-fit rounded-lg"
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
                // height={200}
                className="w-full h-full object-fit rounded-lg"
              ></video>
            ) : accept === "document" ? (
              //   // https://view.officeapps.live.com/op/embed.aspx?src=${previewDialog.url} add for excel
              <iframe
                src={
                  nodesInputData[id]
                    ? nodesInputData[id]?.isExcel
                      ? `https://view.officeapps.live.com/op/embed.aspx?src=${
                          /^(http|https):/.test(nodesInputData[id].fileUrl)
                            ? nodesInputData[id].fileUrl
                            : URL.createObjectURL(nodesInputData[id].fileUrl)
                        }`
                      : /^(http|https):/.test(nodesInputData[id].fileUrl)
                      ? nodesInputData[id].fileUrl
                      : URL.createObjectURL(nodesInputData[id].fileUrl)
                    : null
                }
                height={200}
              ></iframe>
            ) : accept === "audio" ? (
              <RenderAudio
                fileUrl={nodesInputData[id].fileUrl}
                selectedOption={nodesInputData[id]?.selectedOption}
              />
            ) : null)}

          {/* <label className="text-sm font-semibold text-gray-700">
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
      /> */}
          {!nodesInputData[id]?.fileUrl && (
            <div className="w-full h-full flex items-center justify-center rounded-lg">
              <Lottie
                animationData={files}
                loop
                autoplay
                className="w-24 h-24"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
