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




// neww generatepayload start here
export const generatePayload = (data) => {
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
  };

  data.forEach((screenData, index) => {
    const screenId = screenData.id || `screen_${index + 1}`;
    const layout = {
      type: "SingleColumnLayout",
      children: [],
    };

    screenData?.payload?.forEach((pay) => {
      const type = pay.type;
      typeCounters[type] = (typeCounters[type] || 0) + 1;
      // const id = `${type}_${typeCounters[type]}`;
      let component = {  type };

      if (["heading", "subheading", "textbody", "textcaption"].includes(type)) {
        component.text = pay[type] || "";
        component.type = {
          heading: "TextHeading",
          subheading: "TextSubheading",
          textbody: "TextBody",
          textcaption: "TextCaption",
        }[type];
      }

      if (["textInput", "textArea", "email", "phone"].includes(type)) {
        const key = Object.keys(pay.texts || {})[0];
        const field = pay.texts?.[key] || {};

        component = {
          // id,
          type:
            type === "textInput"
              ? "TextInput"
              : type === "textArea"
              ? "TextArea"
              : type === "email"
              ? "EmailInput"
              : "PhoneInput",
          name: key,
          label: field.label || "Label",
          required: field.required ?? true,
          "error-message": field.error_message || "",
          "helper-text": field.helper_text || "",
          "max-chars": field.max_chars || "",
          "min-chars": field.min_chars || "",
        };
      }

      if (type === "dropDown") {
        component = {
          // id,
          type: "Dropdown",
          label: pay.label || "Select an option",
          required: pay.required ?? true,
          "error-message": pay.error_message || "",
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
          // id,
          type: "RadioButtonsGroup",
          label: pay.label || "Select an option",
          required: pay.required ?? true,
          "error-message": pay.error_message || "",
          "data-source": (pay["data-source"] || []).map((opt) => ({
            id: String(opt.id || ""),
            title: opt.title || "",
            desc: opt.desc || "",
            metadata: opt.metadata || "",
            image: opt.image || "",
          })),
        };
      }

      if (type === "checkBox") {
        component = {
          // id,
          type: "CheckboxGroup",
          label: pay.label || "Select an option",
          required: pay.required ?? true,
          "error-message": pay.error_message || "",
          "data-source": (pay["data-source"] || []).map((opt) => ({
            id: String(opt.id || ""),
            title: opt.title || "",
            description: opt.description || "",
            metadata: opt.metadata || "",
            image: opt.image || "",
          })),
        };
      }

      if (type === "footerbutton") {
        const footerData = pay.footer?.footer_1 || {};
        component = {
          // id,
          type: "Footer",
          label: footerData.label || "Submit",
          // "left-caption": footerData.left_caption || "",
          // "right-caption": footerData.right_caption || "",
          // "center-caption": footerData.center_caption || "",
          "on-click-action": {
            name: footerData.on_click_action || "complete",
            payload: {}
          },
        };
      }

      layout.children.push(component);
    });

    payload.screens.push({
      id: screenId,
      title: screenData.title || `Screen ${index + 1}`,
      // terminal:"true",
      layout,
    });
  });

  return payload;
};
// neww generatepayload ends here

