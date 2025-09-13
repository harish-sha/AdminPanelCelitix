{/* <div className="items-center justify-start hidden gap-1 md:flex mt-2">
          <button
            onClick={() => {
              addFormat("bold");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatBoldOutlined />
          </button>
          <button
            onClick={() => {
              addFormat("italic");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatItalicOutlined />
          </button>
          <button
            onClick={() => {
              addFormat("strike");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatStrikethroughOutlined />
          </button>

          <div className="mr-2">
            <CustomEmojiPicker position="top" onSelect={insertEmoji} />
          </div>
        </div> */}


async function fetchWaba() {
  try {
    const res = await getWabaList();
    console.log("waba res", res);

    if (res?.length > 0) {
      const firstWaba = res[0];
      setWabaState({
        waba: res,
        selectedWaba: firstWaba.mobileNo,
        wabaSrno: firstWaba.wabaSrno,
      });
    } else {
      setWabaState({ waba: [], selectedWaba: "", wabaSrno: null });
    }
  } catch (e) {
    console.error("Failed to fetch WABA", e);
  }
}

useEffect(() => {
  fetchWaba();
}, []);

// keep your sync logic (if you really need `wabaData`)
useEffect(() => {
  if (wabaState) {
    setWabaData(wabaState);
  }
}, [wabaState]);
