import React, { useEffect, useRef, useState } from "react";
import { IconButton, Slider } from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";

interface AudioPlayerProps {
  fileUrl: string | File;
  selectedOption: "upload" | "url";
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ fileUrl, selectedOption }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [paused, setPaused] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let objectUrl: string | null = null;

    if (!fileUrl) return;

    if (typeof fileUrl === "string" && /^(http|https):/.test(fileUrl)) {
      setAudioSrc(fileUrl);
    } else if (selectedOption === "upload" && fileUrl instanceof File) {
      objectUrl = URL.createObjectURL(fileUrl);
      setAudioSrc(objectUrl);
    }

    setPaused(true);
    setPosition(0);
    setDuration(0);

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fileUrl, selectedOption]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setPaused(false)).catch(console.error);
    } else {
      audio.pause();
      setPaused(true);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) setPosition(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio && !isNaN(audio.duration)) {
      setDuration(audio.duration);
    }
  };

  const handleSliderChange = (_: any, value: number | number[]) => {
    setPosition(value as number);
  };

  const handleSliderCommit = (_: any, value: number | number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value as number;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center gap-4 w-full h-full rounded-lg border px-4 py-3 bg-white shadow-sm">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <IconButton onClick={togglePlayPause} aria-label={paused ? "Play" : "Pause"}>
        {paused ? (
          <PlayArrowRounded sx={{ fontSize: "2.5rem" }} />
        ) : (
          <PauseRounded sx={{ fontSize: "2.5rem" }} />
        )}
      </IconButton>

      <div className="flex flex-col flex-grow">
        <Slider
          value={position}
          min={0}
          max={duration}
          step={1}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderCommit}
          aria-label="Audio Progress"
          sx={{
            color: "#1976d2",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 10,
              height: 10,
            },
            "& .MuiSlider-rail": {
              opacity: 0.3,
            },
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(position)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
