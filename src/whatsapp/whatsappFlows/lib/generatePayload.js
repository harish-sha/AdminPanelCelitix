import { convertNodeToMarkdown } from "../components/Editor";

export const generatePayload = (data) => {
  console.log("data", data);
  const payload = {
    version: "7.1",
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
    // ifelse: 0,
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
    let lastCreatedComponentName = ""; // Track last named component except ifelse
    //     const getExpectedValueBasedOnType = (componentName) => {
    //   const comp = allComponents.find((c) => c.name === componentName);

    //   if (!comp) return `'value'`; // default

    //   switch (comp.type) {
    //     case "optin":
    //       return "true"; // or false

    //     case "dropDown":
    //     case "textInput":
    //     case "textArea":
    //       return `'someText'`; // use string quotes

    //     case "numberInput":
    //       return `5`; // no quotes

    //     case "checkbox":
    //       // Can't use directly in If — skip or warn
    //       return `'checkboxOptionId'`; // just for fallback

    //     default:
    //       return `'value'`;
    //   }
    // };

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
          ["input-type"]: pay["input-type"] || "",
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
          src: pay?.src,
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
        const valueName = lastCreatedComponentName;

        component = {
          type: "Switch",
          value: valueName ? `\${form.${valueName}}` : "",
          cases: pay.cases,
        };
      }

      if (type === "imageCarousel") {
        component = {
          type: "ImageCarousel",
          "scale-type": pay["scale-type"] || "contain",
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

        const onClickAction = {
          name: optActionName,
        };

        if (optActionName === "navigate") {
          index !== data.length - 1;
          onClickAction.next = {
            type: "screen",
            name: nextScreenId,
          };
        }

        if (optActionName === "open_url") {
          onClickAction.url = pay.url;
        }

        component = {
          name,
          type: "OptIn",
          label: pay.label,
          required: true,
          "on-click-action": onClickAction,
        };
      }

      if (type === "embeddedlink") {
        const embeddedLinkActionName = pay["on-click-action"] || "";
        const nextScreenId = data[index + 1]?.id || null;

        const onClickAction = {
          name: embeddedLinkActionName,
        };

        if (embeddedLinkActionName === "navigate") {
          index !== data.length - 1;
          onClickAction.next = {
            type: "screen",
            name: nextScreenId,
          };
        }

        if (embeddedLinkActionName === "open_url") {
          onClickAction.url = pay.url;
        }

        component = {
          type: "EmbeddedLink",
          text: pay?.text,
          "on-click-action": onClickAction,
        };
      }

      console.log("payyyyyyyyyyyy", pay.condition);
      if (type === "ifelse") {
        const componentName = lastCreatedComponentName;
        // const expectedValue = getExpectedValueBasedOnType(componentName);

        component = {
          type: "If",
          // condition: `\${data.value} ${pay?.condition} (\${form.${componentName}} == 'cat')`,
          condition: `(\${form.${componentName}} ${pay?.condition} 'cat')`,

          // condition: `(\${form.${componentName}} ${pay?.condition || '=='} ${expectedValue})`,

          // condition: componentName
          //   ? ` \${form.${componentName}} ${pay?.condition}`
          //   : "",

          then: [
            {
              type: pay?.then?.[0]?.type,
              text: pay?.then?.[0]?.text,
            },
          ],
          else: [
            {
              type: pay?.else?.[0]?.type,
              text: pay?.else?.[0]?.text,
            },
          ],
          // required: true,
        };
      }

      // if (type === "footerbutton") {
      //   const footerData = pay.footer || {};
      //   const onClickActionName = footerData["on-click-action"] || "complete";

      //   // Find the next screen ID if it exists
      //   const nextScreenId = data[index + 1]?.id || null;

      //   component = {
      //     type: "Footer",

      //     label: pay.label || " ",
      //     //  "left-caption": pay["left-caption"],
      //     //   "right-caption":pay["right-caption"] ,
      //       "center-caption":pay["center-caption"] ,
      //     "on-click-action": {
      //       name: onClickActionName,
      //       ...(index !== data.length - 1 && {
      //         next: {
      //           type: "screen",
      //           name: nextScreenId,
      //         },
      //       }),
      //     },
      //   };
      // }

      if (type === "footerbutton") {
        const footerData = pay.footer?.footer_1 || {};
        const onClickActionName = footerData.on_click_action || "complete";

        // Find the next screen ID if it exists
        const nextScreenId = data[index + 1]?.id || null;

        component = {
          type: "Footer",
          label: footerData.label || "Submit",
          "center-caption": footerData.center_caption,
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

      if (name && type !== "switch") {
        lastCreatedComponentName = name;
      }

      if (name && type !== "ifelse") {
        lastCreatedComponentName = name;
      }

      layout.children.push(component);
    });

    const item = data[index];

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    payload.screens.push({
      data: {
        value: {
          type: "boolean",
          __example__: true,
        },
      },
      id: capitalize(screenId),
      title: screenData.title || `Screen ${index + 1}`,
      layout,
      // terminal: index === data.length - 1,
      ...(index === data.length - 1 ? { terminal: true } : ""),
      success: true,
    });
  });

  return payload;
};
