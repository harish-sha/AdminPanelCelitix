// 1. Your simple downloader
const handleDownload = (url, filename) => {
  try {
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", filename || "file")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Download started!")
  } catch (error) {
    console.error("Download error:", error)
    toast.error("Failed to download the file.")
  }
}

// 2. In your render, use it directly on the button:
<button
  className="hover:bg-gray-300 transition-all duration-200 rounded-full p-0.5 cursor-pointer"
  onClick={() => {
    const url = isSent
      ? msg.mediaPath
      : `${BASE_MEDIA_URL}${msg.mediaPath}`
    const filename = msg.mediaId || "file"
    handleDownload(url, filename)
  }}
>
  <FileDownloadOutlinedIcon className="size-2" />
</button>
