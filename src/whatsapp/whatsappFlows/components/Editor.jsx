// RichTextEditor.jsx - Markdown-style payload generator without turndownService
import React, { useEffect, useRef, useState, useCallback } from "react";

import toast from "react-hot-toast";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  StrikethroughSOutlined,
  FormatListNumberedOutlined,
  ListAltOutlined,
  AddLinkOutlined,
  AddPhotoAlternateOutlined,
} from "@mui/icons-material";
import TableViewIcon from "@mui/icons-material/TableView";
import UniversalButton from "../../components/UniversalButton";

export const convertNodeToMarkdown = (node) => {
  if (!node) return "";

  if (node.nodeType === 3) return node.nodeValue;
  if (node.nodeType !== 1) return "";

  const tag = node.tagName.toLowerCase();
  const children = Array.from(node.childNodes)
    .map(convertNodeToMarkdown)
    .join("");

  switch (tag) {
    case "h1":
      return `# ${children.trim()}`;
    case "h2":
      return `## ${children.trim()}`;
    case "strong":
    case "b":
      return `**${children}**`;
    case "em":
    case "i":
      return `*${children}*`;
    case "s":
    case "strike":
      return `~~${children}~~`;
    case "a":
      return `[${children}](${node.getAttribute("href")})`;
    case "img":
      return `![${node.getAttribute("alt") || ""}](${node.getAttribute(
        "src"
      )})`;
    case "ul":
      return Array.from(node.children)
        .map((li) => `+ ${convertNodeToMarkdown(li)}`)
        .join("\n");
    case "ol":
      return Array.from(node.children)
        .map((li, i) => `${i + 1}. ${convertNodeToMarkdown(li)}`)
        .join("\n");
    case "li":
      return children;
    case "br":
      return "\n";
    case "p":
      return children;
    case "table": {
      const rows = Array.from(node.querySelectorAll("tr"));
      return rows
        .map((row, i) => {
          const cells = Array.from(row.children).map((cell) =>
            convertNodeToMarkdown(cell)
          );
          return (
            `| ${cells.join(" | ")} |` +
            (i === 0 ? `\n| ${cells.map(() => "--------").join(" | ")} |` : "")
          );
        })
        .join("\n");
    }
    case "thead":
    case "tbody":
    case "tr":
    case "th":
    case "td":
      return children;
    default:
      return children;
  }
};

const RichTextEditor = ({ onUpdate, selectedItem, onClose }) => {
  const editorRef = useRef(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [content, setContent] = useState("");

  const exec = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const insertLink = () => {
    let inputValue = "";
    toast(
      (t) => {
        const inputRef = React.createRef();
        return (
          <div className="p-4 bg-white rounded shadow-md space-y-3 w-[300px]">
            <p className="text-sm font-medium">Enter URL</p>
            <input
              ref={inputRef}
              type="text"
              autoFocus
              className="w-full border px-2 py-1 rounded"
              placeholder="https://example.com"
              onChange={(e) => (inputValue = e.target.value)}
              onPaste={(e) => {
                inputValue = e.clipboardData.getData("text");
              }}
            />
            <div className="flex justify-end gap-2 text-sm">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  if (inputValue) exec("createLink", inputValue);
                }}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Insert
              </button>
            </div>
          </div>
        );
      },
      { duration: Infinity, position: "top-center" }
    );
  };

  const insertImage = () => {
    let inputUrl = "";
    toast.custom((t) => (
      <div className="bg-white p-4 rounded shadow-md border w-[300px] flex flex-col gap-2">
        <h3 className="font-semibold text-sm">Insert Image URL</h3>
        <input
          type="text"
          placeholder="https://example.com/image.png"
          className="border px-2 py-1 rounded text-sm"
          onChange={(e) => (inputUrl = e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleInsert();
          }}
          autoFocus
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="text-sm px-2 py-1 bg-gray-200 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="text-sm px-2 py-1 bg-blue-500 text-white rounded"
            onClick={handleInsert}
          >
            Insert
          </button>
        </div>
      </div>
    ));

    const handleInsert = () => {
      if (inputUrl) {
        exec("insertImage", inputUrl);
        toast.dismiss();
        toast.success("Image inserted!");
      } else {
        toast.error("Please enter a valid URL");
      }
    };
  };





  const insertTable = () => {
    const rows = parseInt(window.prompt("How many rows?", ""), 10);
    const cols = parseInt(window.prompt("How many columns?", ""), 10);
    if (!rows || rows < 1 || !cols || cols < 1) {
      toast.error("Invalid row/column count");
      return;
    }

    // build header (cols + action column)
    let tableHTML = `
    <table class="generated-table" style="
      width:100%;
      margin:10px 0;
      border-collapse: collapse;
      border: 0.5px solid #000;
    ">
      <thead><tr>
  `;
    for (let c = 1; c <= cols; c++) {
      tableHTML += `<th style="border:0.5px solid #000;padding:4px;"></th>`;
    }
    // action TH: row controls go in each row; column controls here
    tableHTML += `
    <th style="border:0.5px solid #000;padding:1px;width: 0;">
      <button class="table-add-col">➕C</button>
      <button class="table-remove-col">❌C</button>
    </th>
  `;
    tableHTML += `</tr></thead><tbody>`;

    // build body rows
    for (let r = 1; r <= rows; r++) {
      tableHTML += `<tr>`;
      for (let c = 1; c <= cols; c++) {
        tableHTML += `<td style="border:0.5px solid #000;width:10px;height:30px;padding:4px;"></td>`;
      }
      tableHTML += `
      <td style="border:0.5px solid #000;padding:4px;text-align:center;">
        <button class="table-add-row">➕</button>
        <button class="table-remove-row">❌</button>
      </td>
    `;
      tableHTML += `</tr>`;
    }
    tableHTML += `</tbody></table><br/>`;

    // insert into editor
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, tableHTML);
    toast.success(`Inserted a ${rows}×${cols} table`);

    // attach events to the newly inserted table
    const editor = editorRef.current;
    const tables = editor?.querySelectorAll("table.generated-table");
    const table = tables?.[tables.length - 1];
    if (table) attachTableEvents(table);
  };

  // 2) Event delegation: handle all five buttons
  function attachTableEvents(table) {
    table.addEventListener("click", e => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const header = table.tHead.rows[0];
      const body = table.tBodies[0];

      // —— Column controls (in header) ——
      if (btn.classList.contains("table-add-col")) {
        // insert new TH before the last TH
        const th = document.createElement("th");
        th.style.cssText = "border:0.5px solid #000;padding:4px;";
        // th.textContent = `Col ${header.cells.length}`;
        header.insertBefore(th, header.lastElementChild);

        // in every body row, insert a new TD before action cell
        Array.from(body.rows).forEach(row => {
          const td = document.createElement("td");
          td.style.cssText = "border:0.5px solid #000;width:10px;height:30px;padding:4px;";
          row.insertBefore(td, row.lastElementChild);
        });
        return;
      }

      if (btn.classList.contains("table-remove-col")) {
        const dataCols = header.cells.length - 1; // exclude action cell
        if (dataCols > 1) {
          // remove the TH just before the last one
          header.removeChild(header.cells[dataCols - 1]);
          // remove corresponding TD in each row
          Array.from(body.rows).forEach(row => {
            row.removeChild(row.cells[dataCols - 1]);
          });
        } else {
          toast.error("Can't remove the last column");
        }
        return;
      }

      // —— Row & comment controls (in each row) ——
      const row = btn.closest("tr");
      if (!row) return;

      if (btn.classList.contains("table-add-row")) {
        const newRow = row.cloneNode(true);
        // clear content of all data cells
        Array.from(newRow.cells).slice(0, -1).forEach(td => td.innerHTML = "");
        row.parentNode.insertBefore(newRow, row.nextSibling);
        return;
      }

      if (btn.classList.contains("table-remove-row")) {
        if (body.rows.length > 1) row.remove();
        else toast.error("Can't remove the last row");
        return;
      }


    });
  }



  const handleSave = () => {
    const html = editorRef.current?.innerHTML || "";
    setContent(html);

    // Convert to markdown
    const lines = Array.from(editorRef.current?.childNodes || [])
      .map(convertNodeToMarkdown)
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const payload = {
      content: html,
      text: lines,
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    toast.success("Changes saved!");
    // if (onPayloadChange) onPayloadChange(payload);
    onUpdate(updatedData);
  };

  const [active, setActive] = useState({
    h1: false,
    h2: false,
    p: false,
    bold: false,
    italic: false,
    strikeThrough: false,
    insertUnorderedList: false,
    insertOrderedList: false,
  });

  // Helper to pull the latest command states from the browser
  const updateActive = useCallback(() => {
    const block = document.queryCommandValue("formatBlock")?.toLowerCase();
    setActive({
      h1: block === "h1",
      h2: block === "h2",
      p: block === "p",
      italic: document.queryCommandState("italic"),
      bold: document.queryCommandState("bold"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
    });
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", updateActive);
    return () => document.removeEventListener("selectionchange", updateActive);
  }, [updateActive]);

  const base = "px-3 py-1 rounded transition-colors focus:outline-none";
  const inactive = "bg-white text-gray-700 hover:bg-gray-100";
  const activeBtn = "bg-blue-600 text-white";

  // Wrapper for exec calls that also refresh state
  const doExec = (cmd, arg) => {
    exec(cmd, arg);
    // slight delay to let the browser apply the change before reading state
    setTimeout(updateActive, 0);
  };

  useEffect(() => {
    const updateState = () => {
      // get current block tag, e.g. "h1", "h2", "p", etc.
      const block = document.queryCommandValue("formatBlock")?.toLowerCase();
      setActive({
        h1: block === "h1",
        h2: block === "h2",
        p: block === "p",
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        strikeThrough: document.queryCommandState("strikeThrough"),
        insertUnorderedList: document.queryCommandState("insertUnorderedList"),
        insertOrderedList: document.queryCommandState("insertOrderedList"),
      });
    };

    document.addEventListener("selectionchange", updateState);
    return () => document.removeEventListener("selectionchange", updateState);
  }, []);

  // const base = "px-3 py-1 rounded transition-colors focus:outline-none";
  // const inactive = "bg-white text-gray-700 hover:bg-gray-100";
  // const activeBtn = "bg-blue-600 text-white";

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded shadow space-y-4">
      <div className="flex flex-wrap gap-2">
        {/* H1 */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => doExec("formatBlock", "<h1>")}
          className={`${base} ${active.h1 ? activeBtn : inactive}`}
          title="H1"
        >
          H1
        </button>

        {/* H2 */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => doExec("formatBlock", "<h2>")}
          className={`${base} ${active.h2 ? activeBtn : inactive}`}
          title="H2"
        >
          H2
        </button>

        {/* Paragraph */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => doExec("formatBlock", "<p>")}
          className={`${base} ${active.p ? activeBtn : inactive}`}
          title="Paragraph"
        >
          P
        </button>

        {/* Bold */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => doExec("bold")}
          className={`${base} ${active.bold ? activeBtn : inactive}`}
          title="Bold"
        >
          <FormatBoldOutlined />
        </button>

        {/* Italic */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => doExec("italic")}
          className={`${base} ${active.italic ? activeBtn : inactive}`}
          title="Italic"
        >
          <FormatItalicOutlined />
        </button>

        {/* Strikethrough */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => doExec("strikeThrough")}
          className={`${base} ${active.strikeThrough ? activeBtn : inactive}`}
          title="StrikeThrough"
        >
          <StrikethroughSOutlined />
        </button>

        {/* Unordered List */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => doExec("insertUnorderedList")}
          className={`${base} ${active.insertUnorderedList ? activeBtn : inactive
            }`}
          title="Bulleted List"
        >
          <ListAltOutlined />
        </button>

        {/* Ordered List */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => doExec("insertOrderedList")}
          className={`${base} ${active.insertOrderedList ? activeBtn : inactive
            }`}
          title="Number List"
        >
          <FormatListNumberedOutlined />
        </button>

        {/* Link */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            insertLink();
            setTimeout(updateActive, 0);
          }}
          className={`${base} ${inactive}`}
          title="Link"
        >
          <AddLinkOutlined />
        </button>

        {/* Image */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            insertImage();
            setTimeout(updateActive, 0);
          }}
          className={`${base} ${inactive}`}
          title="Image"
        >
          <AddPhotoAlternateOutlined />
        </button>

        {/* Table */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            insertTable();
            setTimeout(updateActive, 0);
          }}
          className={`${base} ${inactive}`}
          title="Table"
        >
          <TableViewIcon />
        </button>

        {/* Clear */}
        {/* <button
        onMouseDown={e => e.preventDefault()}
        onClick={() => doExec("removeFormat")}
        className={`${base} text-red-700 ${inactive}`}
      >
        Clear
      </button> */}

        {/* Preview Toggle */}
        {/* <button
        onMouseDown={e => e.preventDefault()}
        onClick={() => {
          setPreviewMode(p => !p);
          setTimeout(updateActive, 0);
        }}
        className={`${base} ${
          previewMode
            ? activeBtn
            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
        }`}
      >
        {previewMode ? "Edit" : "Preview"}
      </button> */}
      </div>

      {previewMode ? (
        <div
          className="preview prose prose-sm max-w-none min-h-[250px] p-4 border border-dashed rounded bg-gray-50"
          dangerouslySetInnerHTML={{
            __html: content || editorRef.current?.innerHTML,
          }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="editor prose prose-sm max-w-none min-h-[250px] border border-gray-300 p-4 rounded shadow focus:outline-none focus:ring "
        />
      )}

      <div className="flex justify-center gap-4 mt-4">
        <UniversalButton
          onClick={handleSave}
          className="btn bg-purple-300 px-4 py-2 rounded"
          label="Save"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
