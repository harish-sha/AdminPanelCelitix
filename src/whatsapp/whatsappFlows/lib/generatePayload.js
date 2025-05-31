export const generatePayload = (data) => {
  const flowJson = {
    dropdowns: {},
    checkboxGroups: {},
    headings: {},
    textInputs: {},
    textArea: {},   
    emailInputs: {},
    phoneInputs: {},
    footer: {},
  };
  const payload = {
    screenJson: {
      screens: [],
    },
    flowJson: {
      dropdowns: {},
      checkboxGroups: {},
      headings: {},
      textInputs: {},
      textArea: {},   
      emailInputs: {},
      phoneInputs: {},
      footer: {},
    },
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
};

  // console.log("data", data)
  data.forEach((item, index) => {

    const screen = {
      id: "",
      title: "",
    };
    screen.id = item.id;
    screen.title = item.title;

    payload.screenJson.screens.push(screen);
    // payload.screenJson.flowJson = flowJson;
    console.log("item", item)
    item?.payload.forEach((pay, i) => {
    const type = pay.type;
    typeCounters[type] = (typeCounters[type] || 0) + 1;
    const id = `${type}_${typeCounters[type]}`;
    // For text-based components (textInput, textArea, email, phone)
    let baseData = null;
      if (pay.texts && Object.keys(pay.texts).length > 0) {
      const key = Object.keys(pay.texts)[0]; // e.g., textInput_1
      const fieldData = pay.texts[key]; // the actual data

      baseData = {
        screenId: item.id,
        name: key,
        type: type === "textInput" ? "TextInput" : type === "textArea" ? "TextArea" : type,
        label: fieldData.label || "label",
        required: fieldData.required ?? true,
        "error-message": fieldData.error_message || "Something Went Wrong",
        "helper-text": fieldData.helper_text || "",
        "max-chars": fieldData.max_chars || "",
        "min-chars": fieldData.min_chars || "",
      };  
      }


      // console.log("baseData", baseData)
      // console.log("item", item)
      switch (pay.type) {
        case "heading":
          const headingItem = item.payload.find((p) => p.type === 'heading');

          payload.flowJson.headings[id] = {
            screenId: item.id,
            id: id,
            type: "TextHeading",
            text: headingItem ? headingItem.heading : "",
          };
          break;
          
        case "subheading":
          const subheadingItem = item.payload.find((p) => p.type === 'subheading');

          payload.flowJson.headings[id] = {
            screenId: item.id,
            id: id,
            type: "TextSubheading",
            text: subheadingItem ? subheadingItem.subheading : "",
          };
          break;

        case "textbody":
        const textBodyItem = item.payload.find((p) => p.type === 'textbody');

        payload.flowJson.headings[id] = {
            screenId: item.id,
            id: id,
            type: "TextBody",
            text: textBodyItem ? textBodyItem.textbody : "",
          };
          break;

        case "textcaption":
        const textCaptionItem = item.payload.find((p) => p.type === 'textcaption');

        payload.flowJson.headings[id] = {
            screenId: item.id,
            id: id,
            type: "TextCaption",
            text: textCaptionItem ? textCaptionItem.textcaption : "",
          };
          break;

        case "textInput":
          payload.flowJson.textInputs[id] = baseData;
          break;
          
        case "textArea":
          payload.flowJson.textArea[id] = baseData;
          break;
        case "email":
          payload.flowJson.emailInputs[id] = {
            ...baseData,
            "input-type": "email",
          };
          break;
        case "phone":
          payload.flowJson.phoneInputs[id] = {
            ...baseData,
            "input-type": "phone",
          };
          break;
      }
    });

    console.log("itemmmmmmmmmmmmmmmmmmmmmmmmmmmm", item);

const footerItem = item.payload.find((p) => p.type === "footerbutton");

console.log("footerItem", footerItem)

const id = `footers_${index + 1}`;

const footer = {
  screenId: item.id,
  name: id,
  type: "Footer",
  label: footerItem?.footer.footer_1.label || "Submit",
  "left-caption": footerItem?.footer.footer_1.left_caption || "",
  "right-caption":  footerItem?.footer.footer_1.right_caption || "",
  "center-caption":  footerItem?.footer.footer_1.center_caption || "",
  "on-click-action": {
    name: footerItem?.footer.footer_1.on_click_action   || "complete",
     //   payload: {
        //     labletext_1: "labletext_1",
        //     emailInput_1: "emailInput_1",
        //     phoneNumber_1: "phoneNumber_1",
        //   },
  },
};

payload.flowJson.footer[id] = footer;

  });

  // console.log(payload);
  return payload;
};
