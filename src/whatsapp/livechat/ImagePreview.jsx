import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";

const ImagePreview = ({
  imagePreviewVisible,
  setImagePreviewVisible,
  images,
}) => {
  const [finalImages, setFinalImages] = useState([]);

  useEffect(() => {
    const finalImages = [];
    images.forEach((element) => {
      finalImages.push({
        itemImageSrc: URL.createObjectURL(element),
        thumbnailImageSrc: URL.createObjectURL(element),
        alt: element,
        title: "Title 1",
      });
    });
    setFinalImages(finalImages);
  }, [images]);

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{
          maxHeight: "100px",
          width: "100%",
          display: "block",
        }}
      />
    );
  };

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          height: "450px",
          width: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    );
  };
  return (
    <>
      <Dialog
        visible={imagePreviewVisible}
        style={{
          width: "40rem",
          overflow: "hidden",
        }}
        onHide={() => setImagePreviewVisible(false)}
        draggable={false}
      >
        <Galleria
          value={finalImages}
          item={itemTemplate}
          numVisible={5}
          showItemNavigators
          showItemNavigatorsOnHover
          showIndicators
          showThumbnails={true}
          thumbnail={thumbnailTemplate}
          // responsiveOptions={responsiveOptions}
        />
      </Dialog>
    </>
  );
};

export default ImagePreview;
