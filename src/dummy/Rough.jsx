<div className="flex items-center justify-center rounded-lg border w-full h-56 mt-2">
  {/* ✅ File preview if fileUrl exists and accept is valid */}
  {nodesInputData[id]?.fileUrl &&
    ["image", "video", "document", "audio"].includes(accept) ? (
    accept === "image" ? (
      <img
        src={
          /^(http|https):/.test(nodesInputData[id].fileUrl)
            ? nodesInputData[id].fileUrl
            : nodesInputData[id]?.selectedOption === "upload" &&
            URL.createObjectURL(nodesInputData[id].fileUrl)
        }
        alt="Image"
        className="w-full h-full object-cover rounded-lg"
      />
    ) : accept === "video" ? (
      <video
        src={
          /^(http|https):/.test(nodesInputData[id].fileUrl)
            ? nodesInputData[id].fileUrl
            : nodesInputData[id]?.selectedOption === "upload" &&
            URL.createObjectURL(nodesInputData[id].fileUrl)
        }
        controls
        className="w-full h-full object-cover rounded-lg"
      />
    ) : accept === "document" ? (
      <iframe
        src={
          /^(http|https):/.test(nodesInputData[id].fileUrl)
            ? `https://view.officeapps.live.com/op/embed.aspx?src=${nodesInputData[id].fileUrl}`
            : nodesInputData[id]?.selectedOption === "upload" &&
            `https://view.officeapps.live.com/op/embed.aspx?src=${URL.createObjectURL(
              nodesInputData[id].fileUrl
            )}`
        }
        height={200}
        className="w-full h-full rounded-lg"
      />
    ) : (
      <RenderAudio />
    )
  ) : (
    // ✅ Default Lottie animation
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
      <Lottie
        animationData={files}
        loop
        autoplay
        className="w-24 h-24"
      />
    </div>
  )}
</div>
