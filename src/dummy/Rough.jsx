{
  selectedImage?.type && selectedImage.files && (
    <div className="fixed bottom-20">
      {/* 78{JSON.stringify(selectedImage, null, 2)} */}

      <div className="relative">
        {selectedImage?.type === "image" && (
          <button className="">
            {/* gg{JSON.stringify(selectedImage, null, 2)} */}
            <img
              src={URL.createObjectURL(selectedImage?.files)}
              alt=""
              className="object-cover w-20 h-20"
            />
          </button>
        )}
        {selectedImage.type === "video" && (
          <button className="flex items-center gap-1">
            <video
              src={URL.createObjectURL(selectedImage.files)}
              alt=""
              className="object-cover w-50 h-20"
            />
          </button>
        )}
        {selectedImage.type === "application" && (
          <button className="flex items-center gap-1">
            <div className="bg-[#e1f3fb] text-black p-4 rounded-2xl shadow-md flex items-center gap-3">
              <div className="bg-white p-3 rounded-full shadow-inner text-blue-500">
                {getFileType(selectedImage.fileType)}
              </div>
              <div className="flex flex-col">
                <div className="font-medium truncate break-words max-w-[10rem]">
                  {selectedImage.fileName || "Untitled Document"}
                </div>
              </div>
            </div>
          </button>
        )}
        <span
          className="absolute text-red-500 cursor-pointer top-1 right-1"
          onClick={() => deleteImages("4")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}