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
import InputField from "@/whatsapp/components/InputField";

export const convertNodeToMarkdown = (node) => {
  if (!node) return;

  if (node.nodeType === 3) return node.nodeValue;
  if (node.nodeType !== 1) return "";

  const tag = node.tagName.toLowerCase();
  const children = Array.from(node.childNodes).map(convertNodeToMarkdown);

  switch (tag) {
    case "h2":
      return `# ${children}`;
    case "h3":
      return `## ${children}`;
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
      const src = node.getAttribute("src") || "";
      const altText = (node.getAttribute("alt") || "").trim();
      return `![${altText}](${src})`;
    //  case "ul":
    //   return Array.from(node.children)
    //     .map((li) => `+ ${convertNodeToMarkdown(li)}`);

    //  case "ul":
    //   return Array.from(node.children)
    //     .map((li) => {
    //       const content = convertNodeToMarkdown(li);
    //       if (Array.isArray(content)) {
    //         return content.map(c => `+ ${c}`);
    //       } else {
    //         return `+ ${content}`;
    //       }
    //     })
    //     .flat();

    // case "ol":
    //   return Array.from(node.children)
    //     .map((li, i) => `${i + 1}. ${convertNodeToMarkdown(li)}`)


    // case "ol":
    //   return Array.from(node.children)
    //     .map((li, i) => {
    //       const content = convertNodeToMarkdown(li);
    //       if (Array.isArray(content)) {
    //         return content.map(c => `${i + 1}. ${c}`);

    //       } else {
    //         return `${i + 1}. ${content}`;
    //       }
    //     })
    //     .flat();



    // case "li":
    //   return children;

    // case "li":
    //   return Array.from(node.childNodes)
    //     .map(convertNodeToMarkdown)
    //     .flat()
    //     // .join("")  // join content of li itself
    //     .trim();


    // case "ul":
    //   return Array.from(node.children)
    //     .map((li) => {
    //       const content = convertNodeToMarkdown(li);
    //       if (Array.isArray(content)) {
    //         return content.map(c => `+ ${c}`);
    //       } else {
    //         return `+ ${content}`;
    //       }
    //     })
    //     .flat();

    // case "ol":
    //   return Array.from(node.children)
    //     .map((li, i) => {
    //       const content = convertNodeToMarkdown(li);
    //       if (Array.isArray(content)) {
    //         return content.map(c => `${i + 1}. ${c}`);
    //       } else {
    //         return `${i + 1}. ${content}`;
    //       }
    //     })
    //     .flat();

    // case "li":
    //   return children.flat();

    // case "ul":
    //   return Array.from(node.children)
    //     .map((li) => `+ ${convertNodeToMarkdown(li)}`);

    // case "ol":
    //   return Array.from(node.children)
    //     .map((li, i) => `${i + 1}. ${convertNodeToMarkdown(li)}`);

    case "ol":
      return Array.from(node.children).flatMap((li, i) => {
        const content = convertNodeToMarkdown(li);
        return Array.isArray(content)
          ? content.map((line) => `${i + 1}. ${line}`)
          : [`${i + 1}. ${content}`];
      });

    case "ul":
      return Array.from(node.children).flatMap((li) => {
        const content = convertNodeToMarkdown(li);
        return Array.isArray(content)
          ? content.map((line) => `+ ${line}`)
          : [`+ ${content}`];
      });

    // case "li":
    //   return [children.flat().join("")];



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

  const [tableControlsVisible, setTableControlsVisible] = useState(false);

  // helper to find the <table> the cursor is in (if any)
  const findCurrentTable = () => {
    let node = window.getSelection()?.anchorNode;
    while (node && node.nodeName !== "TABLE") {
      node = node.parentNode;
    }
    return node;
  };

  const insertImage = () => {
    let altText = "";
    let srcFile; // local File

    const handleInsert = () => {
      if (!srcFile) {
        toast.error("Please choose a file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result;
        editorRef.current?.focus();
        document.execCommand(
          "insertHTML",
          false,
          `<img src="${src}" alt="${altText}" />`
        );
        toast.dismiss();
        toast.success("Image inserted!");
        setTimeout(updateActive, 0);
      };
      reader.onerror = () => toast.error("Failed to read file.");
      reader.readAsDataURL(srcFile);
    };

    toast.custom((t) => (
      <div className="bg-white p-4 rounded shadow-md border w-[320px] flex flex-col gap-3">
        <h3 className="font-semibold">Insert Image</h3>

        {/* ALT TEXT input */}
        <InputField
          type="text"
          placeholder="Image alt text"
          className="border px-2 py-1 rounded text-sm"
          onChange={(e) => (altText = e.target.value.trim())}
        />

        {/* File input */}
        <InputField
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="text-sm"
          onChange={(e) => {
            srcFile = e.target.files?.[0];
          }}
        />

        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded text-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            onClick={handleInsert}
          >
            Save
          </button>
        </div>
      </div>
    ));
  };


  const insertTable = () => {
    editorRef.current?.focus();

    const tableHTML = `
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border: 0.5px solid #000; padding: 4px;">Header 1</th>
          <th style="border: 0.5px solid #000; padding: 4px;">Header 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 0.5px solid #000; padding: 4px;">Cell 1</td>
          <td style="border: 0.5px solid #000; padding: 4px;">Cell 2</td>
        </tr>
      </tbody>
    </table>
  `;

    document.execCommand("insertHTML", false, tableHTML);
    setTimeout(updateActive, 0);
  };


  // const insertImage = () => {
  //   editorRef.current?.focus();
  //   const src = "https://via.placeholder.com/150"; // default image source or base64 string
  //   const alt = "Image";

  //   document.execCommand(
  //     "insertHTML",
  //     false,
  //     `<img src="${src}" alt="${alt}" />`
  //   );

  //   setTimeout(updateActive, 0);
  // };

  const addColumn = () => {
    const table = findCurrentTable();
    if (!table) return toast.error("Place cursor inside a table");
    const header = table.tHead.rows[0];
    const th = document.createElement("th");
    th.style.cssText = "border:0.5px solid #000;padding:4px;";
    header.appendChild(th);
    Array.from(table.tBodies[0].rows).forEach((row) => {
      const td = document.createElement("td");
      td.style.cssText = "border:0.5px solid #000;padding:4px;";
      row.appendChild(td);
    });
  };

  const removeColumn = () => {
    const table = findCurrentTable();
    if (!table) return toast.error("Place cursor inside a table");
    const header = table.tHead.rows[0];
    const count = header.cells.length;
    if (count <= 1) return toast.error("Can't remove the last column");
    header.removeChild(header.cells[count - 1]);
    Array.from(table.tBodies[0].rows).forEach((row) =>
      row.removeChild(row.cells[count - 1])
    );
  };

  const addRow = () => {
    const table = findCurrentTable();
    if (!table) return toast.error("Place cursor inside a table");
    const body = table.tBodies[0];
    const clone = body.rows[0].cloneNode(true);
    Array.from(clone.cells).forEach((td) => (td.innerHTML = ""));
    body.appendChild(clone);
  };

  const removeRow = () => {
    const table = findCurrentTable();
    if (!table) return toast.error("Place cursor inside a table");
    const body = table.tBodies[0];
    if (body.rows.length <= 1) return toast.error("Can't remove the last row");
    body.deleteRow(body.rows.length - 1);
  };

  const handleSave = () => {
    const html = editorRef.current?.innerHTML || "";
    setContent(html);

    // Convert to markdown
    const lines = Array.from(editorRef.current?.childNodes || [])
      // .map(convertNodeToMarkdown)
      // .map((line) => line)
      // .filter((line) => line !== "");
      .flatMap(convertNodeToMarkdown)
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
    h3: false,
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
      h3: block === "h3",
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
        h3: block === "h3",
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

  // const insertLink = () => {
  //   // Simple prompt; swap for your toast.custom UI if you like
  //   const url = toast.custom("Enter URL:", "https://");
  //   if (!url) return;

  //   editorRef.current?.focus();
  //   // createLink will wrap the selection in <a href="...">...</a>
  //   document.execCommand("createLink", false, url);
  //   // setTimeout(updateActive, 0);
  // };

  const insertLink = () => {
    let url = "";
    let linkText = "";

    toast.custom((t) => {
      // Move handleInsert here so we have access to t.id
      const handleInsert = () => {
        if (!/^https?:\/\/.+/.test(url)) {
          toast.error("Please enter a valid URL (must start with http/https)", { id: t.id });
          return;
        }

        editorRef.current?.focus();
        const selection = window.getSelection();
        const selectedText = selection?.toString();
        const finalText = selectedText || linkText || url;

        document.execCommand(
          "insertHTML",
          false,
          `<a href="${url}" target="_blank" rel="noopener noreferrer">${finalText}</a>`
        );

        toast.dismiss(t.id);
        toast.success("Link inserted!");
        setTimeout(updateActive, 0);
      };

      return (
        <div className="bg-white p-4 rounded shadow-md border w-[320px] flex flex-col gap-3">
          <h3 className="font-semibold">Insert Link</h3>

          {/* URL Input */}
          <InputField
            type="text"
            placeholder="https://example.com"
            className="border px-2 py-1 rounded text-sm"
            onChange={(e) => (url = e.target.value.trim())}
          />

          {/* Optional Link Text Input */}
          <InputField
            type="text"
            placeholder="Link text (optional)"
            className="border px-2 py-1 rounded text-sm"
            onChange={(e) => (linkText = e.target.value)}
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded text-sm"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              onClick={handleInsert}
            >
              Save
            </button>
          </div>
        </div>
      );
    });
  };

  // const insertLink = () => {
  //   editorRef.current?.focus();
  //   const url = "https://example.com"; // default or you can generate dynamically
  //   const selection = window.getSelection();
  //   const selectedText = selection?.toString() || url;

  //   document.execCommand(
  //     "insertHTML",
  //     false,
  //     `<a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText}</a>`
  //   );

  //   setTimeout(updateActive, 0);
  // };

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded shadow space-y-4">
      <div className="flex flex-wrap gap-2">
        {/* H1 */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => doExec("formatBlock", "<h2>")}
          className={`${base} ${active.h2 ? activeBtn : inactive}`}
          title="H1"
        >
          H1
        </button>

        {/* H2 */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => doExec("formatBlock", "<h3>")}
          className={`${base} ${active.h3 ? activeBtn : inactive}`}
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
            // setTimeout(updateActive, 0);
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
            // first-time click: insert a table if none exists at cursor
            // or toggle the visibility of the controls
            const tbl = findCurrentTable();
            if (!tbl) {
              insertTable(); // your existing insertTable fn
            }
            setTableControlsVisible((vis) => !vis);
          }}
          title="Table"
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          <TableViewIcon />
        </button>

        {/* New: only show when tableControlsVisible is true */}
        <div>
          {tableControlsVisible && (
            <div className="flex">
              <button onClick={addColumn} className="px-2 border">
                Add Column
              </button>
              <button onClick={addRow} className="px-2 border">
                Add Row
              </button>
              <button onClick={removeColumn} className="px-2 border">
                Remove Column
              </button>
              <button onClick={removeRow} className="px-2 border">
                Remove Row
              </button>
            </div>
          )}
        </div>

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
          className=" editor prose prose-sm max-w-none
    block
    min-h-[250px] border border-gray-300 p-4 rounded shadow
    focus:outline-none focus:ring
    [&_ol]:list-decimal 
    [&_ul]:list-disc    "
        />
      )}

      <div className="flex justify-center gap-4 mt-4">
        <UniversalButton
          onClick={handleSave}
          className="btn bg-purple-300 px-4 py-2 rounded"
          label="Save"
        />
      </div>
      <style jsx>{`
        .editor ul li {
          display: list-item;
          list-style-type: disc !important;
          margin-left: 1.5em;
        }
        .editor ol li {
          display: list-item;
          list-style-type: decimal !important;
          margin-left: 1.5em;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
