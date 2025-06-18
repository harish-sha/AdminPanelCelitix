// import React, { useRef, useState } from "react";
// import TurndownService from "turndown";
// import toast from "react-hot-toast";
// import {
//   FormatBoldOutlined,
//   FormatItalicOutlined,
//   StrikethroughSOutlined,
//   FormatListNumberedOutlined,
//   ListAltOutlined,
//   AddLinkOutlined,
//   AddPhotoAlternateOutlined,
// } from "@mui/icons-material";
// import UniversalButton from "../../components/UniversalButton";

// const RichTextEditor = ({ onPayloadChange }) => {
//   const editorRef = useRef(null);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [content, setContent] = useState("");
//   const [inputValue, setInputValue] = useState("");
//   const turndownService = new TurndownService();

//   const exec = (command, value = null) => {
//     editorRef.current?.focus();
//     document.execCommand(command, false, value);
//   };

//   const insertLink = () => {
//     let inputValue = "";

//     const handleConfirm = (url) => {
//       if (url) exec("createLink", url);
//     };

//     toast(
//       (t) => {
//         const inputRef = React.createRef();

//         const handleKeyDown = (e) => {
//           if (e.key === "Enter") {
//             toast.dismiss(t.id);
//             handleConfirm(inputValue);
//           } else if (e.key === "Escape") {
//             toast.dismiss(t.id);
//           }
//         };

//         return (
//           <div
//             className="p-4 bg-white rounded shadow-md space-y-3 w-[300px]"
//             onKeyDown={handleKeyDown}
//           >
//             <p className="text-sm font-medium">Enter URL</p>
//             <input
//               ref={inputRef}
//               type="text"
//               autoFocus
//               className="w-full border px-2 py-1 rounded"
//               placeholder="https://example.com"
//               onChange={(e) => (inputValue = e.target.value)}
//               onPaste={(e) => {
//                 inputValue = e.clipboardData.getData("text");
//               }}
//             />
//             <div className="flex justify-end gap-2 text-sm">
//               <button
//                 onClick={() => toast.dismiss(t.id)}
//                 className="px-2 py-1 bg-gray-200 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   toast.dismiss(t.id);
//                   handleConfirm(inputValue);
//                 }}
//                 className="px-2 py-1 bg-blue-500 text-white rounded"
//               >
//                 Insert
//               </button>
//             </div>
//           </div>
//         );
//       },
//       {
//         duration: Infinity,
//         position: "top-center",
//       }
//     );
//   };

//   const insertImage = () => {
//     toast.custom((t) => {
//       let inputUrl = "";

//       const insert = () => {
//         if (inputUrl) {
//           exec("insertImage", inputUrl);
//           toast.dismiss(t.id);
//           toast.success("Image inserted!");
//         } else {
//           toast.error("Please enter a valid URL");
//         }
//       };

//       return (
//         <div className="bg-white p-4 rounded shadow-md border w-[300px] flex flex-col gap-2">
//           <h3 className="font-semibold text-sm">Insert Image URL</h3>
//           <input
//             type="text"
//             placeholder="https://example.com/image.png"
//             className="border px-2 py-1 rounded text-sm"
//             onChange={(e) => (inputUrl = e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") insert();
//             }}
//             autoFocus
//           />
//           <div className="flex justify-end gap-2 mt-2">
//             <button
//               className="text-sm px-2 py-1 bg-gray-200 rounded"
//               onClick={() => toast.dismiss(t.id)}
//             >
//               Cancel
//             </button>
//             <button
//               className="text-sm px-2 py-1 bg-blue-500 text-white rounded"
//               onClick={insert}
//             >
//               Insert
//             </button>
//           </div>
//         </div>
//       );
//     });
//   };

//   const insertTable = () => {
//     const html = `
//       <table border="1" style="width:100%; margin:10px 0;">
//         <thead>
//           <tr><th>H1</th><th>H2</th><th>H3</th></tr>
//         </thead>
//         <tbody>
//           <tr><td>R1C1</td><td>R1C2</td><td>R1C3</td></tr>
//           <tr><td>R2C1</td><td>R2C2</td><td>R2C3</td></tr>
//         </tbody>
//       </table>
//     `;
//     exec("insertHTML", html);
//   };

//   const handleCreate = () => {
//     const html = editorRef.current?.innerHTML || "";
//     setContent(html);
//     toast.success("Content created!");
//   };

//   const handleSave = () => {
//     const html = editorRef.current?.innerHTML || "";
//     setContent(html);
//     toast.success("Changes saved!");

//     const markdown = turndownService.turndown(html);
//     const lines =  markdown
//       .split("\n")
//       .map(line => line.trim())
//       .filter(line => line !== "");

//     const payload = {
//       type: "RichText",
//       text: lines,
//     };

//     console.log("Generated RichText Payload:", payload);

//     if (onPayloadChange) {
//       onPayloadChange(payload);
//     }
//   };

//   // const handleSave = () => {
//   //   const html = editorRef.current?.innerHTML || "";
//   //   setContent(html);
//   //   toast.success("Changes saved!");

//   //   const markdown = turndownService.turndown(html);

//   //   const lines = markdown
//   //     .split("\n")
//   //     .map((line) => line.trim())
//   //     .filter((line) => line !== "");

//   //   const formatted = lines.map((line) => {
//   //     if (line.startsWith("###")) {
//   //       return { "###": line.replace(/^###\s*/, "") };
//   //     } else if (line.startsWith("##")) {
//   //       return { "##": line.replace(/^##\s*/, "") };
//   //     } else if (line.startsWith("#")) {
//   //       return { "#": line.replace(/^#\s*/, "") };
//   //     } else if (line.startsWith("~~") && line.endsWith("~~")) {
//   //       return { "~~": line.slice(2, -2) };
//   //     } else if (line.startsWith("**") && line.endsWith("**")) {
//   //       return { "**": line.slice(2, -2) };
//   //     } else if (line.startsWith("*") && line.endsWith("*")) {
//   //       return { "*": line.slice(1, -1) };
//   //     } else {
//   //       return { "": line };
//   //     }
//   //   });

//   //   const payload = {
//   //     type: "RichText",
//   //     text: formatted,
//   //   };

//   //   console.log("Generated RichText Payload:", payload);

//   //   if (onPayloadChange) {
//   //     onPayloadChange(payload);
//   //   }
//   // };

// // const handleSave = () => {
// //   const html = editorRef.current?.innerHTML || "";
// //   setContent(html);
// //   toast.success("Changes saved!");

// //   const tempDiv = document.createElement("div");
// //   tempDiv.innerHTML = html;

// //   const textBlocks = Array.from(tempDiv.childNodes)
// //     .map((node) => {
// //       if (node.nodeType !== 1) return null; // Skip text nodes

// //       const tag = node.tagName.toLowerCase();
// //       const text = node.textContent.trim();

// //       if (!text) return null;

// //       switch (tag) {
// //         case "h1":
// //           return { "#": text };
// //         case "h2":
// //           return { "##": text };
// //         case "h3":
// //           return { "###": text };
// //         case "strong":
// //         case "b":
// //           return { "**": text };
// //         case "em":
// //         case "i":
// //           return { "*": text };
// //         case "s":
// //         case "del":
// //           return { "~~": text };
// //         case "p":
// //           return { "": text };
// //         default:
// //           return { "": text };
// //       }
// //     })
// //     .filter(Boolean); // remove nulls

// //   const payload = {
// //     type: "RichText",
// //     text: textBlocks,
// //   };

// //   console.log("Generated RichText Payload:", payload);

// //   if (onPayloadChange) {
// //     onPayloadChange(payload);
// //   }
// // };

//   const exportHTML = () => {
//     const html = editorRef.current?.innerHTML || "";
//     console.log("HTML Export:\n", html);
//     alert("HTML copied to console!");
//   };

//   const exportMarkdown = () => {
//     const html = editorRef.current?.innerHTML || "";
//     const markdown = turndownService.turndown(html);
//     console.log("Markdown Export:\n", markdown);
//     alert("Markdown copied to console!");
//   };

//   const handleEditorFocus = () => {
//     if (!editorRef.current?.innerHTML.trim()) {
//       editorRef.current.innerHTML = "<p><br></p>";
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-4 border rounded shadow space-y-4">
//       {/* Toolbar */}
//       <div className="flex flex-wrap gap-2">
//         <button onClick={() => exec("bold")} className="btn">
//           <FormatBoldOutlined />
//         </button>
//         <button onClick={() => exec("italic")} className="btn">
//           <FormatItalicOutlined />
//         </button>
//         <button onClick={() => exec("strikeThrough")} className="btn">
//           <StrikethroughSOutlined />
//         </button>
//         <button onClick={() => exec("insertUnorderedList")} className="btn">
//           <ListAltOutlined />
//         </button>
//         <button onClick={() => exec("insertOrderedList")} className="btn">
//           <FormatListNumberedOutlined />
//         </button>
//         <button onClick={insertLink} className="btn">
//           <AddLinkOutlined />
//         </button>
//         <button onClick={insertImage} className="btn">
//           <AddPhotoAlternateOutlined />
//         </button>
//         <button onClick={insertTable} className="btn">
//           Table
//         </button>
//         <button onClick={() => exec("removeFormat")} className="btn text-red-700">
//           Clear
//         </button>
//         <button onClick={() => setPreviewMode((p) => !p)} className="btn bg-blue-100">
//           {previewMode ? "Edit" : "Preview"}
//         </button>
//       </div>

//       {/* Editor / Preview */}
//       {previewMode ? (
//         <div
//           className="prose prose-sm max-w-none min-h-[250px] p-4 border border-dashed rounded bg-gray-50"
//           dangerouslySetInnerHTML={{ __html: content || editorRef.current?.innerHTML }}
//         />
//       ) : (
//         <div
//           ref={editorRef}
//           contentEditable
//           suppressContentEditableWarning
//           onFocus={handleEditorFocus}
//           className="prose prose-sm max-w-none min-h-[250px] border border-gray-300 p-4 rounded shadow focus:outline-none focus:ring"
//         />
//       )}

//       {/* Action Buttons */}
//       <div className="flex justify-center gap-4 mt-4">
//         <UniversalButton onClick={handleCreate} className="btn bg-purple-200 px-4 py-2 rounded" label="Create" />
//         <UniversalButton onClick={handleSave} className="btn bg-purple-300 px-4 py-2 rounded" label="Save" />
//       </div>
//     </div>
//   );
// };

// export default RichTextEditor;



// RichTextEditor.jsx - Markdown-style payload generator without turndownService
import React, { useRef, useState } from "react";

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
            (i === 0
              ? `\n| ${cells.map(() => "--------").join(" | ")} |`
              : "")
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

const RichTextEditor = ({ onPayloadChange }) => {
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
    const tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1</td>
          <td>Data 1</td>
          <td>More Data</td>
        </tr>
        <tr>
          <td>Row 2</td>
          <td>Data 2</td>
          <td>More Data</td>
        </tr>
        <tr>
          <td>Row 3</td>
          <td>Data 3</td>
          <td>More Data</td>
        </tr>
      </tbody>
    </table><br/>
  `;
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, tableHTML);
    toast.success("Table inserted!");
  };

  // export  const convertNodeToMarkdown = (node) => {
  //   if (!node) return "";

  //   if (node.nodeType === 3) return node.nodeValue; 
  //   if (node.nodeType !== 1) return "";

  //   const tag = node.tagName.toLowerCase();
  //   const children = Array.from(node.childNodes)
  //     .map(convertNodeToMarkdown)
  //     .join("");

  //   switch (tag) {
  //     case "h1":
  //       return `# ${children.trim()}`;
  //     case "h2":
  //       return `## ${children.trim()}`;
  //     case "strong":
  //     case "b":
  //       return `**${children}**`;
  //     case "em":
  //     case "i":
  //       return `*${children}*`;
  //     case "s":
  //     case "strike":
  //       return `~~${children}~~`;
  //     case "a":
  //       return `[${children}](${node.getAttribute("href")})`;
  //     case "img":
  //       return `![${node.getAttribute("alt") || ""}](${node.getAttribute(
  //         "src"
  //       )})`;
  //     case "ul":
  //       return Array.from(node.children)
  //         .map((li) => `+ ${convertNodeToMarkdown(li)}`)
  //         .join("\n");
  //     case "ol":
  //       return Array.from(node.children)
  //         .map((li, i) => `${i + 1}. ${convertNodeToMarkdown(li)}`)
  //         .join("\n");
  //     case "li":
  //       return children;
  //     case "br":
  //       return "\n";
  //     case "p":
  //       return children;
  //     case "table": {
  //       const rows = Array.from(node.querySelectorAll("tr"));
  //       return rows
  //         .map((row, i) => {
  //           const cells = Array.from(row.children).map((cell) =>
  //             convertNodeToMarkdown(cell)
  //           );
  //           return (
  //             `| ${cells.join(" | ")} |` +
  //             (i === 0
  //               ? `\n| ${cells.map(() => "--------").join(" | ")} |`
  //               : "")
  //           );
  //         })
  //         .join("\n");
  //     }
  //     case "thead":
  //     case "tbody":
  //     case "tr":
  //     case "th":
  //     case "td":
  //       return children;
  //     default:
  //       return children;
  //   }
  // };

  // const handleSave = () => {
  //   const html = editorRef.current?.innerHTML || "";
  //   setContent(html);
  //   toast.success("Changes saved!");



  //   const lines = Array.from(editorRef.current.childNodes)
  //     .map(convertNodeToMarkdown)
  //     .map((line) => line.trim())
  //     .filter((line) => line !== "");

  //   const payload = {
  //     // type: "RichText",
  //     text: lines,
  //   };

  //   console.log("Generated RichText Payload:", payload);
  //   if (onPayloadChange) onPayloadChange(payload);

  // };

  const handleSave = () => {
    const html = editorRef.current?.innerHTML || "";
    setContent(html);

    // Convert to markdown
    const lines = Array.from(editorRef.current?.childNodes || [])
      .map(convertNodeToMarkdown)
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const payload = {
      type: "richText",
      content: html,
      text: lines,
    };

    

    toast.success("Changes saved!");
    console.log("RichText Payload", payload);

    if (onPayloadChange) onPayloadChange(payload);
  };

  const handleComponentUpdate = (newPayload) => {
    if (selectedItem?.type === "richText") {
      setTabs((prevTabs) => {
        const updatedTabs = [...prevTabs];
        const currentScreen = updatedTabs[activeIndex];
        const payload = [...currentScreen.payload];

        if (selectedItem.index !== undefined && payload[selectedItem.index]) {
          payload[selectedItem.index] = {
            ...payload[selectedItem.index],
            content: newPayload.content,
            text: newPayload.text,
          };
        }

        updatedTabs[activeIndex] = {
          ...currentScreen,
          payload,
        };

        return updatedTabs;
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border rounded shadow space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => exec("formatBlock", "<h1>")} className="btn">
          H1
        </button>
        <button onClick={() => exec("formatBlock", "<h2>")} className="btn">
          H2
        </button>

        <button onClick={() => exec("bold")} className="btn">
          <FormatBoldOutlined />
        </button>
        <button onClick={() => exec("italic")} className="btn">
          <FormatItalicOutlined />
        </button>
        <button onClick={() => exec("strikeThrough")} className="btn">
          <StrikethroughSOutlined />
        </button>
        <button onClick={() => exec("normalParagraph")} className="btn">
          <StrikethroughSOutlined />
        </button>
        <button onClick={() => exec("insertUnorderedList")} className="btn">
          <ListAltOutlined />
        </button>
        <button onClick={() => exec("insertOrderedList")} className="btn">
          <FormatListNumberedOutlined />
        </button>
        <button onClick={insertLink} className="btn">
          <AddLinkOutlined />
        </button>
        <button onClick={insertImage} className="btn">
          <AddPhotoAlternateOutlined />
        </button>
        <button onClick={insertTable} className="btn">Table</button>
        <button
          onClick={() => exec("removeFormat")}
          className="btn text-red-700"
        >
          Clear
        </button>
        <button
          onClick={() => setPreviewMode((p) => !p)}
          className="btn bg-blue-100"
        >
          {previewMode ? "Edit" : "Preview"}
        </button>
      </div>

      {previewMode ? (
        <div
          className="prose prose-sm max-w-none min-h-[250px] p-4 border border-dashed rounded bg-gray-50"
          dangerouslySetInnerHTML={{
            __html: content || editorRef.current?.innerHTML,
          }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="prose prose-sm max-w-none min-h-[250px] border border-gray-300 p-4 rounded shadow focus:outline-none focus:ring"
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
