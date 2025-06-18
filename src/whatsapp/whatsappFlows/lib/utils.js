import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export   const convertNodeToMarkdown = (node) => {
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
