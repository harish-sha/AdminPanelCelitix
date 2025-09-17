import { convertBase64toUrl } from "./convertBase64toUrl";

function moveFooterToEnd(arr) {
  const footerIndex = arr.findIndex((item) => item.type === "Footer");

  if (footerIndex !== -1) {
    const footerItem = arr.splice(footerIndex, 1)[0];

    arr.push(footerItem);
  }

  return arr;
}
export const convertPayload = (flowJson) => {
  const preData =
    flowJson?.screens?.map((screenData) => {
      const json = {
        title: screenData?.title || "",
        content: screenData?.title || "",
        id: screenData?.id || "",
        payload: [],
      };

      const updatedData = moveFooterToEnd(screenData.layout?.children);

      updatedData.forEach((child) => {
        if (child.type === "Image") {
          const payloadData = {
            src: child?.src || "",
            "scale-type": child?.["scale-type"],
            "aspect-ratio": child?.["aspect-ratio"],
            "alt-text": child?.["alt-text"],
            type: "image",
          };
          json.payload.push(payloadData);
        }
        if (child.type === "TextHeading") {
          const payloadData = {
            text: child?.text || "",
            type: "heading",
          };
          json.payload.push(payloadData);
        }
        if (child.type === "TextSubheading") {
          const payloadData = {
            text: child?.text || "",
            type: "subheading",
          };
          json.payload.push(payloadData);
        }
        if (child.type === "TextBody") {
          const payloadData = {
            text: child?.text || "",
            type: "textbody",
          };
          json.payload.push(payloadData);
        }
        if (child.type === "TextCaption") {
          const payloadData = {
            text: child?.text || "",
            type: "textcaption",
          };
          json.payload.push(payloadData);
        }
        if (child.type === "TextInput") {
          const payloadData = {
            type: "textInput",
            label: child.label,
            required: child.required ?? true,
            "error-message": child?.["error-message"] || "",
            "helper-text": child?.["helper-text"],
            "min-chars": parseInt(child?.["min-chars"]) || undefined,
            "max-chars": parseInt(child?.["max-chars"]) || undefined,
            name: child?.name || "name",
          };
          json.payload.push(payloadData);
        }
        if (child.type === "TextArea") {
          const payloadData = {
            type: "textArea",
            label: child.label,
            required: child.required ?? true,
            "error-message": child?.["error-message"] || "",
            "helper-text": child?.["helper-text"],
            "min-chars": parseInt(child?.["min-chars"]) || undefined,
            "max-chars": parseInt(child?.["max-chars"]) || undefined,
            name: child?.name || "name",
          };
          json.payload.push(payloadData);
        }
        if (child.type === "RadioButtonsGroup") {
          const payloadData = {
            type: "radioButton",
            name: child?.name || "name",
            label: child?.label || "Select an option",
            required: child?.required ?? true,
            "data-source": [],
          };

          child["data-source"].forEach((opt) => {
            payloadData["data-source"].push({
              id: String(opt.id || ""),
              title: opt.title || "",
              description: opt.description || "",
              metadata: opt.metadata || "",
              image: opt.image || "",
            });
          });
          json.payload.push(payloadData);
        }
        if (child.type === "Dropdown") {
          const payloadData = {
            type: "dropDown",
            name: child?.name || "name",
            label: child?.label || "Select an option",
            required: child?.required ?? true,
            "data-source": [],
          };

          child["data-source"].forEach((opt) => {
            payloadData["data-source"].push({
              id: String(opt.id || ""),
              title: opt.title || "",
              description: opt.description || "",
              metadata: opt.metadata || "",
              image: opt.image || "",
            });
          });
          json.payload.push(payloadData);
        }
        if (child.type === "ChipsSelector") {
          const payloadData = {
            type: "chipSelector",
            name: child?.name || "name",
            label: child?.label || "Select an option",
            required: child?.required ?? true,
            "max-selected-items": parseInt(child?.["max-selected-items"]) || 1,
            "data-source": [],
            description: child?.description || "Select an option",
          };

          child["data-source"].forEach((opt) => {
            payloadData["data-source"].push({
              id: String(opt.id || ""),
              title: opt.title || "",
            });
          });
          json.payload.push(payloadData);
        }
        if (child.type === "EmbeddedLink") {
          const payloadData = {
            type: "embeddedlink",
            name: child?.name || "name",
            text: child?.text || "Select an option",
            // "on-click-action": {
            //   name: child?.["on-click-action"]?.name || "name",
            //   url: child?.["on-click-action"]?.url || "url",
            // },
            "on-click-action": child?.name,
            url: child?.["on-click-action"]?.url || "url",
            name: child?.["on-click-action"]?.next?.name || "name",
          };
          json.payload.push(payloadData);
        }

        if (child.type === "OptIn") {
          const payloadData = {
            type: "optin",
            name: child?.name || "name",
            label: child?.label || "Select an option",
            required: child?.required ?? true,
            // "on-click-action": {
            //   name: child?.["on-click-action"]?.name || "name",
            // },
            "on-click-action": child?.name,
            url: child?.["on-click-action"]?.url || "url",
            name: child?.["on-click-action"]?.next?.name || "name",
            // type: child?.["on-click-action"]?.next?.type || "type",
          };

          json.payload.push(payloadData);
        }
        if (child.type === "DocumentPicker") {
          const payloadData = {
            name: child?.name || "name",
            "min-uploaded-documents": child?.["min-uploaded-documents"] || 1,
            description: child?.description || "description",
            label: child?.label || "label",
            type: "document",
            "max-uploaded-documents": child?.["max-uploaded-documents"] || 1,
          };

          json.payload.push(payloadData);
        }
        if (child.type === "PhotoPicker") {
          const payloadData = {
            name: child?.name || "name",
            type: "media",
            label: child?.label || "Select an Photo",
            description: child?.description,
            "min-uploaded-photos": child?.["min-uploaded-photos"] || 0,
            "max-uploaded-photos": child?.["max-uploaded-photos"] || 0,
            required: child?.required ?? true,
          };

          json.payload.push(payloadData);
        }
        if (child.type === "DatePicker") {
          const payloadData = {
            name: child?.name || "name",
            type: "date",
            "min-date": child?.["min-date"] || "",
            "unavailable-dates": child?.["unavailable-dates"] || [],
            label: child?.label,
            "max-date": child?.["max-date"] || "",
            "helper-text": child?.["helper-text"] || "",
          };

          json.payload.push(payloadData);
        }
        if (child.type === "ImageCarousel") {
          let payloadData = {
            name: child?.name || "name",
            type: "imageCarousel",
            "scale-type": child?.["scale-type"] || "fill",
          };

          child["images"].forEach((img, index) => {
            payloadData = {
              ...payloadData,
              [`image-${index + 1}`]: {
                src: convertBase64toUrl(img.src) || "",
                "alt-text": img["alt-text"] || "",
              },
            };
          });

          json.payload.push(payloadData);
        }
        if (child.type === "CalendarPicker") {
          const payloadData = {
            mode: child?.mode,
            type: "calendar",
            "min-date": child?.["min-date"] || "",
            "unavailable-dates": child?.["unavailable-dates"] || [],
            name: child?.name || "name",
            "end-date": child?.["end-date"] || "",
            "start-date": child?.["start-date"] || "",
            label: child?.label || {},
            "max-date": child?.["max-date"] || "",
            "helper-text": child?.["helper-text"] || {},
            required: child?.required || {},
          };

          json.payload.push(payloadData);
        }

        if (child.type === "Footer") {
          const payloadData = {
            type: "footerbutton",
            label: child?.label || "Submit",
            on_click_action: child?.["on-click-action"]?.name || "name",
            left_caption: child?.["left-caption"] || "",
            right_caption: child?.["right-caption"] || "",
            center_caption: child?.label || "Click Me",
          };

          json.payload.push({
            type: "footerbutton",
            footer: { footer_1: payloadData },
          });
        }
      });

      return json;
    }) || [];

  return preData;
};
