import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import { SpeedDial } from "primereact/speeddial";
import { FiSend } from "react-icons/fi";

export const ChatInput = ({
  inputRef,
  input,
  setInput,
  sendMessage,
  selectedImage,
  items,
  insertEmoji,
}) => {
  function addBtn(formatType) {
    if (!inputRef.current) return;

    const inputEl = inputRef.current;
    const { selectionStart, selectionEnd } = inputEl;
    const selectedText = input.substring(selectionStart, selectionEnd);

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

    setInput(newValue);

    requestAnimationFrame(() => {
      const pos = selectionEnd + start.length + end.length;
      inputEl.setSelectionRange(pos, pos);
      inputEl.focus();
    });
  }

  return (
    <div className="flex items-center w-full p-4 bg-white border-t mb-17 md:mb-0">
      <div className="mr-2">
        <CustomEmojiPicker position="top" onSelect={insertEmoji} />
      </div>
      <div className="relative flex items-center justify-center w-full gap-2 border rounded-lg">
        <input
          type="text"
          className="flex-1 w-full p-2 focus:outline-none"
          placeholder="Type a message..."
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={!selectedImage && !input}
          className="flex items-center justify-center w-8 h-8 text-white transition-all bg-blue-600 rounded-full shadow-md hover:bg-blue-700 active:scale-95 md:mr-7"
        >
          <FiSend className="w-4 h-4 mt-1 mr-1" />
        </button>
        <SpeedDial
          model={items}
          direction="up"
          buttonStyle={{ width: "2rem", height: "2rem" }}
          className="right-19 bottom-1 speeddial-bottom-right"
        />
        <div className="items-center justify-center hidden gap-1 mr-2 md:flex">
          <button
            onClick={() => {
              addBtn("bold");
            }}
          >
            <FormatBoldOutlined />
          </button>
          <button
            onClick={() => {
              addBtn("italic");
            }}
          >
            <FormatItalicOutlined />
          </button>
          <button
            onClick={() => {
              addBtn("strike");
            }}
          >
            <FormatStrikethroughOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};