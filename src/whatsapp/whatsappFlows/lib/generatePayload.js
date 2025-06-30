// export const generatePayload = (data) => {
//   console.log("data", data)
//   const screens = {
//     // dropdowns: {},
//     checkboxGroups: {},
//     headings: {},
//     textInputs: {},
//     textArea: {},
//     emailInputs: {},
//     phoneInputs: {},
//     footer: {},
//   };
//   const payload = {
//     version: "7.0",
//     screens: [
//       {
//         id: screen.id,
//         title: screen.title,
//         layout : {
//           type: "SingleColumnLayout",
//           children: [
//             // dropdowns = {},
//             checkboxGroups = {},
//             headings = {},
//             textInputs = {},
//             textArea = {},
//             emailInputs = {},
//             phoneInputs = {},
//             footer = {},
//           ]

//         }
//       }
//     ]
//   };

//   const typeCounters = {
//     heading: 0,
//     subheading: 0,
//     textbody: 0,
//     textcaption: 0,
//     textInput: 0,
//     textArea: 0,
//     email: 0,
//     phone: 0,
//     dropDown: 0
//   };

//   console.log("data", data)
//   data.forEach((item, index) => {

//     payload.screens.layout.children.push(component);
//     // payload.screenJson.flowJson = flowJson;
//     console.log("item", item)
//     item?.payload.forEach((pay, i) => {
//       const type = pay.type;
//       typeCounters[type] = (typeCounters[type] || 0) + 1;
//       const id = `${type}_${typeCounters[type]}`;
//       // For text-based components (textInput, textArea, email, phone)
//       let baseData = null;
//       if (pay.texts && Object.keys(pay.texts).length > 0) {
//         const key = Object.keys(pay.texts)[0]; // e.g., textInput_1
//         const fieldData = pay.texts[key]; // the actual data

//         baseData = {
//           screenId: item.id,
//           name: key,
//           type: type === "textInput" ? "TextInput" : type === "textArea" ? "TextArea" : type,
//           label: fieldData.label || "label",
//           required: fieldData.required ?? true,
//           "error-message": fieldData.error_message || "Something Went Wrong",
//           "helper-text": fieldData.helper_text || "",
//           "max-chars": fieldData.max_chars || "",
//           "min-chars": fieldData.min_chars || "",
//         };
//       }

//       console.log("baseData", baseData)
//       console.log("item", item)
//       switch (pay.type) {
//         case "heading":
//           const headingItem = item.payload.find((p) => p.type === 'heading');

//           payload.screens.layout.children.headings[id] = {
//             screenId: item.id,
//             id: id,
//             type: "TextHeading",
//             text: headingItem ? headingItem.heading : "",
//           };
//           break;

//         case "subheading":
//           const subheadingItem = item.payload.find((p) => p.type === 'subheading');

//           payload.screens.headings[id] = {
//             screenId: item.id,
//             id: id,
//             type: "TextSubheading",
//             text: subheadingItem ? subheadingItem.subheading : "",
//           };
//           break;

//         case "textbody":
//           const textBodyItem = item.payload.find((p) => p.type === 'textbody');

//           payload.screens.headings[id] = {
//             screenId: item.id,
//             id: id,
//             type: "TextBody",
//             text: textBodyItem ? textBodyItem.textbody : "",
//           };
//           break;

//         case "textcaption":
//           const textCaptionItem = item.payload.find((p) => p.type === 'textcaption');

//           payload.screens.headings[id] = {
//             screenId: item.id,
//             id: id,
//             type: "TextCaption",
//             text: textCaptionItem ? textCaptionItem.textcaption : "",
//           };
//           break;

//         case "textInput":
//           payload.screens.textInputs[id] = baseData;
//           break;

//         case "textArea":
//           payload.screens.textArea[id] = baseData;
//           break;
//         case "email":
//           payload.screens.emailInputs[id] = {
//             ...baseData,
//             "input-type": "email",
//           };
//           break;
//         case "phone":
//           payload.screens.phoneInputs[id] = {
//             ...baseData,
//             "input-type": "phone",
//           };
//           break;
//         case "dropDown": {
//           const dropdownLabel = pay.label || "Select an option";
//           const allOptions = Array.isArray(pay["data-source"])
//             ? pay["data-source"]
//             : [];

//           payload.screens.dropdowns[id] = {
//             id,
//             screenId: item.id,
//             type: "Dropdown",
//             name: id,
//             label: dropdownLabel,
//             required: pay.required ?? true,
//             "error-message": pay.error_message || "Something Went Wrong",
//             "data-source": allOptions.map((opt) => ({
//               id: String(opt.id ?? ""),
//               title: opt.title || "",
//               description: opt.description || "",
//               metadata: opt.metadata || "",
//               image: opt.image || "",

//             })),

//           };
//           break;

//         }

//         case 'radioButton': {
//           const radiobuttonLabel = pay?.label || "Select an option";
//           const allOptions = Array.isArray(pay?.['data-source'])
//             ? pay['data-source']
//             : [];

//           // Ensure radiobutton key exists
//           payload.screens.radiobutton = payload.flowJson.radiobutton || {};

//           payload.screens.radiobutton[id] = {
//             id,
//             screenId: item.id,
//             type: 'RadioButtonsGroup',
//             label: radiobuttonLabel,
//             required: pay?.required ?? true,
//             "error-message": pay?.error_message || "Something Went Wrong",
//             "data-source": allOptions.map((opt) => ({
//               id: String(opt.id ?? ""),
//               title: opt.title || "",
//               desc: opt.desc || "",
//               metadata: opt.metadata || "",
//               image: opt.image || "",
//             })),
//           };
//           break;
//         }

//         case "checkBox": {
//           const checkboxLabel = pay.label || "Select an option";
//           const allOptions = Array.isArray(pay["data-source"])
//             ? pay["data-source"]
//             : [];

//           // Ensure checkbox container exists
//           payload.screens.checkbox = payload.layout.children.checkbox || {};

//           payload.screens.checkbox[id] = {
//             id,
//             screenId: item.id,
//             type: "CheckboxGroup",
//             label: checkboxLabel,
//             required: pay.required ?? true,
//             "error-message": pay?.error_message || "Something Went Wrong",
//             "data-source": allOptions.map((opt) => ({
//               id: String(opt.id ?? ""),
//               title: opt.title || "",
//               description: opt.description || "",
//               metadata: opt.metadata || "",
//               image: opt.image || "",
//             })),
//           };
//           break;
//         }

//         case "": {

//         }

//       }
//     });

//     // console.log("itemmmmmmmmmmmmmmmmmmmmmmmmmmmm", item);

//     const footerItem = item.payload.find((p) => p.type === "footerbutton");

//     console.log("footerItem", footerItem)

//     const id = `footers_${index + 1}`;

//     const footer = {
//       screenId: item.id,
//       name: id,
//       type: "Footer",
//       label: footerItem?.footer.footer_1.label || "Submit",
//       "left-caption": footerItem?.footer.footer_1.left_caption || "",
//       "right-caption": footerItem?.footer.footer_1.right_caption || "",
//       "center-caption": footerItem?.footer.footer_1.center_caption || "",
//       "on-click-action": {
//         name: footerItem?.footer.footer_1.on_click_action || "complete",
//         //   payload: {
//         //     labletext_1: "labletext_1",
//         //     emailInput_1: "emailInput_1",
//         //     phoneNumber_1: "phoneNumber_1",
//         //   },
//       },
//     };

//     payload.screens.footer[id] = footer;

//   });

//   // console.log(payload);
//   return payload;
// };

// new generatepayload start here
import { convertNodeToMarkdown } from "../components/Editor";
export const generatePayload = (data) => {
  console.log("data", data);
  const payload = {
    version: "7.0",
    screens: [],
  };

  const typeCounters = {
    heading: 0,
    subheading: 0,
    textbody: 0,
    textcaption: 0,
    textInput: 0,
    textArea: 0,
    email: 0,
    phone: 0,
    dropDown: 0,
    radioButton: 0,
    checkBox: 0,
    footer: 0,
    document: 0,
    media: 0,
    image: 0,
    date: 0,
    calendar: 0,
    chipSelector: 0,
    optin: 0,
    embaddedLink: 0,
    imageCarousel: 0,
    richText: 0,
    switch: 0,
  };

  const numberToWord = (num) => {
    const words = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
      "twenty",
    ];
    return words[num] || String(num);
  };

  data.forEach((screenData, index) => {
    const screenId = screenData.id;

    const layout = {
      type: "SingleColumnLayout",
      children: [],
    };
    console.log(screenData?.payload);

    screenData?.payload?.forEach((pay) => {
      console.log("pay", pay);
      // const type = pay.type;
      // typeCounters[type] = (typeCounters[type] || 0) + 1;
      // const name = `${String(type)}_${String(typeCounters[type])}`;
      // console.log(typeof name)

      const type = pay.type;
      typeCounters[type] = (typeCounters[type] || 0) + 1;
      const countWord = numberToWord(typeCounters[type]);
      const name = `${type}_${countWord}`;
      let component = { type };

      if (type === "heading") {
        component = {
          type: "TextHeading",
          text: pay.text,
        };
      }

      if (type === "subheading") {
        component = {
          type: "TextSubheading",
          text: pay.text,
        };
      }

      if (type === "textbody") {
        component = {
          type: "TextBody",
          text: pay.text,
        };
      }

      if (type === "textcaption") {
        component = {
          type: "TextCaption",
          text: pay.text,
        };
      }

      if (type === "textInput") {
        component = {
          name,
          type: "TextInput",
          label: pay.label,
          required: pay.required ?? true,
          // name:pay.name,
          "error-message": pay["error-message"] || "",
          "helper-text": pay["helper-text"],
          "min-chars": parseInt(pay["min-chars"]) || undefined,
          "max-chars": parseInt(pay["max-chars"]) || undefined,
        };
      }

      if (type === "textArea") {
        component = {
          name,
          type: "TextArea",
          label: pay.label,
          required: pay.required ?? true,
          "helper-text": pay["helper-text"],
          "error-message": pay["error-message"],
        };
      }

      if (type === "richText") {
        let lines = [];

        if (Array.isArray(pay.text) && pay.text.length > 0) {
          lines = pay.text;
        } else if (pay.content) {
          try {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = pay.content;

            // lines = Array.from(tempDiv.childNodes)
            //   .map(convertNodeToMarkdown)
            //   .flat()
            //   // .map((line) => (typeof line === "string" ? line : String(line)))
            //   // .map((line) => line);
            //   .filter((line) => line.trim() !== "");

            //           lines = Array.from(tempDiv.childNodes)
            // .map(convertNodeToMarkdown)
            // .flat()
            // .map(line => (typeof line === "string" ? line : String(line)))
            // .filter(line => line.trim() !== "");

            lines = Array.from(tempDiv.childNodes)
              .map(convertNodeToMarkdown)
              .flat()
              .map((line) => String(line).trim())
              .filter((line) => line !== "");
          } catch (error) {
            console.error("Error parsing HTML content:", error);
            lines = ["No content available"];
          }
        }

        component = {
          type: "RichText",
          text: lines,
        };
      }

      if (type === "dropDown") {
        component = {
          name,
          type: "Dropdown",
          label: pay.label || "Select an option",
          required: pay.required ?? true,
          // "error-message": pay.error_message || "",
          "data-source": (pay["data-source"] || []).map((opt) => ({
            id: String(opt.id || ""),
            title: opt.title || "",
            description: opt.description || "",
            metadata: opt.metadata || "",
            image: opt.image || "",
          })),
        };
      }

      if (type === "radioButton") {
        component = {
          name,
          type: "RadioButtonsGroup",
          label: pay.label || "Select an option",
          required: pay.required ?? true,
          // "error-message": pay.error_message || "",
          "data-source": (pay["data-source"] || []).map((opt) => ({
            id: String(opt.id || ""),
            title: opt.title || "",
            description: opt.description || "",
            metadata: opt.metadata || "",
            image: opt.image || "",
          })),
        };
      }

      if (type === "checkBox") {
        component = {
          name,
          type: "CheckboxGroup",
          label: pay.label || "Select an option",
          required: pay.required ?? true,
          // "error-message": pay.error_message || "",
          "data-source": (pay["data-source"] || []).map((opt) => ({
            id: String(opt.id || ""),
            title: opt.title || "",
            description: opt.description || "",
            metadata: opt.metadata || "",
            image: opt.image || "",
          })),
        };
      }

      if (type === "chipSelector") {
        component = {
          name,
          type: "ChipsSelector",
          label: pay.label,
          description: pay.description,
          "max-selected-items": parseInt(pay["max-selected-items"]) || 2,
          required: pay.required ?? true,
          "data-source": (pay["data-source"] || []).map((opt) => ({
            id: String(opt.id || ""),
            title: opt.title || "",
          })),
        };
      }

      if (type === "image") {
        component = {
          // name,
          type: "Image",
          src: pay.src,
          // width: pay.width,
          // // height: pay.height,
          "scale-type": pay["scale-type"],
          "aspect-ratio": parseInt(pay["aspect-ratio"]),
          "alt-text": pay["alt-text"],
        };
      }

      if (type === "document") {
        component = {
          name,
          type: "DocumentPicker",
          label: pay.label || "Select an Document",
          description: pay.description || "",
          "min-uploaded-documents": parseInt(
            pay["min-uploaded-documents"] ?? 0,
            10
          ),
          "max-uploaded-documents": parseInt(
            pay["max-uploaded-documents"] ?? 0,
            10
          ),
        };
        console.log(pay.label, "label");
        console.log("Document component:", component);
      }

      if (type === "media") {
        component = {
          name,
          type: "PhotoPicker",
          label: pay.label || "Select an Photo",
          description: pay.description,
          "min-uploaded-photos": parseInt(pay["min-uploaded-photos"] ?? 0, 10),
          "max-uploaded-photos": parseInt(pay["max-uploaded-photos"] ?? 0, 10),
        };
      }

      // if (type === "switch") {
      //   component = {
      //     type: "Switch",
      //     value:`${data.component?.textInput.name}`,
      //     cases: pay.cases,
      //   };
      // }

      if (type === "switch") {
        // Look for the last component already pushed to layout that has a name
        let valueName = "";
        for (let i = layout.children.length - 1; i >= 0; i--) {
          const prev = layout.children[i];
          if (prev.name) {
            valueName = prev.name;
            break;
          }
        }

        component = {
          type: "Switch",
          value: valueName ? `\${form.${valueName}}` : "", // ✅ dynamic format required by schema
          cases: pay.cases,
        };
      }

      if (type === "imageCarousel") {
        component = {
          type: "ImageCarousel",
          "scale-type": String(pay["scale-type"] || "contain"),
          //  "aspect-ratio": String(pay["aspect-ratio"] || "4:3"),
          images: [
            {
              src: pay["image-1"]?.src || "",
              "alt-text": pay["image-1"]?.["alt-text"] || "",
            },
            {
              src: pay["image-2"]?.src || "",
              "alt-text": pay["image-2"]?.["alt-text"] || "",
            },
            {
              src: pay["image-3"]?.src || "",
              "alt-text": pay["image-3"]?.["alt-text"] || "",
            },
          ],
        };
      }

      if (type === "date") {
        component = {
          name,
          type: "DatePicker",
          label: pay.label,
          "min-date": pay["min-date"],
          "max-date": pay["max-date"],
          "unavailable-dates": pay["unavailable-dates"],
          // "unavailable-dates": Array.isArray(pay["unavailable-dates"])
          //   ? pay["unavailable-dates"].filter(Boolean)
          //   : [],
          "helper-text": pay["helper-text"],
          // "error-message":  pay.error_message,
        };
      }

      if (type === "calendar") {
        component = {
          name,
          type: "CalendarPicker",
          mode: pay.mode || "single",
          "min-date": pay["min-date"],
          "max-date": pay["max-date"],
          "unavailable-dates": pay["unavailable-dates"],
        };

        if (pay.mode === "range") {
          component.label = {
            "start-date": pay.label?.["start-date"] || "",
            "end-date": pay.label?.["end-date"] || "",
          };
          component["helper-text"] = {
            "start-date": pay["helper-text"]?.["start-date"] || "",
            "end-date": pay["helper-text"]?.["end-date"] || "",
          };
          component.required = {
            "start-date": pay.required?.["start-date"] ?? true,
            "end-date": pay.required?.["end-date"] ?? false,
          };
        } else {
          component.label = pay.label || "";
          component["helper-text"] = pay["helper-text"] || "";
          component.required = pay.required ?? false;
        }
      }

      if (type === "optin") {
        const optActionName = pay["on-click-action"] || "";
        const nextScreenId = data[index + 1]?.id || null;

        component = {
          name,
          type: "OptIn",
          label: pay.label,
          required: true,
          "on-click-action": {
            name: optActionName,
            ...(index !== data.length - 1 && {
              next: {
                type: "screen",
                name: nextScreenId,
              },
            }),
            ...(optActionName === "open_url" && {
              url: pay.url, // take url from payload
            }),
          },
        };
      }

      if (pay.type === "If") {
        console.log("pay", pay);

        component = {
          type: "If",
          condition: pay.condition,
          then: [
            {
              type: pay.then?.[0]?.type,
              text: "It is a cat",
            },
          ],
          else: [
            {
              type: pay.else?.[0]?.type,
              text: "It is not a cat",
            },
          ],
          // required: true,
        };
      }

      if (type === "embeddedlink") {
        const onClickActionName = pay["on-click-action"] || "";
        const nextScreenId = data[index + 1]?.id || null;

        component = {
          type: "EmbeddedLink",
          text: pay?.text,
          "on-click-action": {
            name: onClickActionName,
            ...(index !== data.length - 1 && {
              next: {
                type: "screen",
                name: nextScreenId,
              },
            }),
             ...(onClickActionName === "open_url" && {
              url: pay.url, // take url from payload
            }),
          },
        };
      }

      if (type === "footerbutton") {
        const footerData = pay.footer?.footer_1 || {};
        const onClickActionName = footerData.on_click_action || "complete";

        // Find the next screen ID if it exists
        const nextScreenId = data[index + 1]?.id || null;

        component = {
          type: "Footer",
          label: footerData.label || "Submit",
          "on-click-action": {
            name: onClickActionName,
            ...(index !== data.length - 1 && {
              next: {
                type: "screen",
                name: nextScreenId,
              },
            }),
          },
        };
      }

      layout.children.push(component);
    });

    const item = data[index];

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    payload.screens.push({
      // data: {},
      id: capitalize(screenId),
      title: screenData.title || `Screen ${index + 1}`,
      layout,
      // terminal: index === data.length - 1,
      ...(index === data.length - 1 ? { terminal: true } : ""),
    });
  });

  return payload;
};
// neww generatepayload ends here
