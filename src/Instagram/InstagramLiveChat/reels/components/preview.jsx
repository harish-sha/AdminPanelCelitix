"use client";

import { useState, useRef, useEffect } from "react";
import { FaComment, FaHeart, FaShareAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";

export const Preview = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  useEffect(() => {
    if (data.video_url && videoRef.current) {
      videoRef.current.src = data.video_url;
    } else {
      videoRef.current.src = "";
    }
  }, [data]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-2">
      {/* Mobile Phone Frame */}
      <div className="relative">
        {/* Phone Outer Frame */}
        <div className="w-80 h-[680px] bg-black rounded-[3rem] p-2 shadow-2xl">
          {/* Phone Inner Frame */}
          <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-2 text-white text-sm">
              <span className="font-medium">9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
                </div>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                muted
                autoPlay
                playsInline
                onClick={togglePlay}
              >
                <source
                  src="/placeholder.svg?height=680&width=320"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 pt-12">
                {/* Top Section - Progress Bar */}
                <div className="flex space-x-1">
                  <div className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-100"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Bottom Section - User Info and Actions */}
                <div className="flex justify-between items-end">
                  {/* Left Side - User Info and Caption */}
                  <div className="flex-1 pr-4">
                    {/* User Info */}
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-800">
                            JD
                          </span>
                        </div>
                      </div>
                      <span className="text-white font-semibold ml-2 text-sm">
                        john_doe
                      </span>
                      <button className="ml-2 text-white border border-white px-2 py-0.5 rounded text-xs font-medium">
                        Follow
                      </button>
                    </div>

                    {/* Caption */}
                    <pre className="text-white text-sm mb-2 font-medium whitespace-pre-wrap break-words max-w-[200px] max-h-[9rem] overflow-y-auto">
                      {data.caption || ""}
                    </pre>

                    {/* Music Info */}
                    <div className="flex items-center text-white/80 text-xs">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Original Audio - john_doe</span>
                    </div>
                  </div>

                  {/* Right Side - Action Buttons */}
                  <div className="flex flex-col items-center space-y-4">
                    {/* Like Button */}
                    <button className="flex flex-col items-center space-y-2">
                      <FaHeart className="size-5 text-white " />

                      <span className="text-white text-xs font-medium">
                        1.2K
                      </span>
                    </button>

                    {/* Comment Button */}
                    <button className="flex flex-col items-center space-y-2">
                      <FaComment className="size-5 text-white " />

                      <span className="text-white text-xs font-medium">89</span>
                    </button>

                    {/* Share Button */}
                    <button className="flex flex-col items-center space-y-2">
                      <FaShareAlt className="size-5 text-white " />

                      <span className="text-white text-xs font-medium">
                        Share
                      </span>
                    </button>

                    {/* More Options */}
                    <button className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </div>
                    </button>

                    {/* Profile Picture (Spinning) */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5 animate-spin">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-800">
                          JD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Play/Pause Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Phone Shadow */}
        <div className="absolute inset-0 bg-black rounded-[3rem] -z-10 transform translate-x-1 translate-y-1 opacity-20"></div>
      </div>
    </div>
  );
};
