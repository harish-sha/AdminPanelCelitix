import { useLocation } from "react-router";
import { useState } from "react";

export const EditFlow = () => {
  const location = useLocation();

  const { data } = location?.state;

  const parsedJson = JSON.parse(data || "[]");
  //   console.log("parsedJson", parsedJson);

  const typeMap = {
    RadioButtonsGroup: "Radio",
  };
  //   setRadioBtnLabel(selectedItem.label || "");
  //       setDraft(
  //         (selectedItem =
  //           {
  //             title: "",
  //             description: "",
  //             metadata: "",
  //             image: "",
  //             altText: "",
  //           } || "")
  //       );
  //       setRadioRequired(selectedItem.required ?? false);
  const preData = [];
  parsedJson?.screens?.forEach((data, item) => {
    data.layout.children.forEach((child, index) => {
      if(type === "RadioButtonsGroup"){
        {
            
        }
      }
    });
  });

  const [tabs, setTabs] = useState([
    { title: "Welcome", content: "Welcome", id: "WELCOME", payload: [] },
  ]);
  return <>Edit Panel</>;
};
