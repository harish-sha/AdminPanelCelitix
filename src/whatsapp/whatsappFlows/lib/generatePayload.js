export const generatePayload = (data) => {
  const flowJson = {
    dropdowns: {},
    checkboxGroups: {},
    headings: {},
    textInputs: {},
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
      emailInputs: {},
      phoneInputs: {},
      footer: {},
    },
  };

  data.forEach((item, index) => {
    const screen = {
      id: "",
      title: "",
    };
    screen.id = item.id;
    screen.title = item.title;

    payload.screenJson.screens.push(screen);
    // payload.screenJson.flowJson = flowJson;

    item?.payload.map((pay, i) => {
      const id = `${pay.type}_${index + 1}`;
      const baseData = {
        screenId: item.id,
        name: id,
        type: "TextInput",
        label: item.label || "label",
        required: true,
        "error-message": "Something Went Wrong",
        "helper-text": `Enter ${item.label || ""}`,
        "max-chars": "",
        "min-chars": "",
      };

      switch (pay.type) {
        case "heading":
          payload.flowJson.headings[id] = {
            screenId: item.id,
            id: id,
            type: "TextHeading",
            text: "Login",
          };
          break;
        case "textbody":
        case "textcaption":
        case "subheading":
          // You can customize this further
          break;
        case "textInput":
          payload.flowJson.textInputs[id] = baseData;
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

    const id = `footers_${index + 1}`;
    const footer = {
      screenId: item.id,
      name: id,
      type: "Footer",
      label: "Submit",
      "left-caption": "",
      "right-caption": "",
      "center-caption": "",
      "on-click-action": {
        name: "complete",
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
