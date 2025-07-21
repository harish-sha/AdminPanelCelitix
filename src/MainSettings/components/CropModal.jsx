import React, { useRef, useState, useEffect } from "react";
import { Cropper, RectangleStencil } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const CropModal = ({ open, image, onClose, onSave }) => {
  const cropperRef = useRef(null);
  const [aspectWidth, setAspectWidth] = useState(4);
  const [aspectHeight, setAspectHeight] = useState(3);
  const [cropWidth, setCropWidth] = useState(400);
  const [cropHeight, setCropHeight] = useState(300);

  const aspectRatio = aspectWidth / aspectHeight;

  const handleSave = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) onSave(blob);
          else console.error("Failed to crop image.");
        });
      }
    }
  };

  // Sync crop box when user changes width/height
  const setCropBox = (width, height) => {
    const cropper = cropperRef.current;
    const coordinates = cropper?.getCoordinates();
    if (coordinates) {
      cropper.setCoordinates({
        width,
        height,
        left: coordinates.left,
        top: coordinates.top,
      });
    }
  };

  const handleWidthChange = (value) => {
    setCropWidth(value);
    if (!isNaN(Number(value)) && value !== "") {
      setCropBox(Number(value), Number(cropHeight));
    }
  };

  const handleHeightChange = (value) => {
    setCropHeight(value);
    if (!isNaN(Number(value)) && value !== "") {
      setCropBox(Number(cropWidth), Number(value));
    }
  };

  // Ensure crop box sets correctly once cropper is mounted and ready
  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        const cropper = cropperRef.current;
        if (cropper?.getCoordinates()) {
          cropper.setCoordinates({
            width: cropWidth,
            height: cropHeight,
            left: 50,
            top: 50,
          });
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [open, cropWidth, cropHeight]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crop Image</DialogTitle>
      <DialogContent>
        <div className="flex flex-row gap-6 p-4 rounded-lg shadow-md justify-center items-center">
          {/* Left: Image Cropper */}
          <div className="w-[60%] h-[400px] overflow-hidden justify-center items-center relative">
            <Cropper
              ref={cropperRef}
              src={image}
              stencilComponent={RectangleStencil}
              className="cropper"
              style={{ height: "100%", width: "100%" }}
              stencilProps={{
                aspectRatio,
                movable: true,
                resizable: true,
              }}
              imageRestriction="fit-area"
              transformImage
            />
          </div>

          {/* Right: Controls */}
          <div className="w-[40%] flex flex-col justify-start space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">
                Aspect Ratio:
              </label>
              <input
                type="number"
                className="w-16 border p-1 rounded"
                value={aspectWidth}
                onChange={(e) => setAspectWidth(Number(e.target.value))}
              />
              <span className="text-sm">:</span>
              <input
                type="number"
                className="w-16 border p-1 rounded"
                value={aspectHeight}
                onChange={(e) => setAspectHeight(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Width (px):</label>
              <input
                type="number"
                className="border p-1 rounded w-full"
                value={cropWidth}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Height (px):</label>
              <input
                type="number"
                className="border p-1 rounded w-full"
                value={cropHeight}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSave} color="success">
          Save Cropped Image
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropModal;
