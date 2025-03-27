import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export const Preview = ({ variables = [], messageContent, btnData = [] }) => {
  const [pree, setPree] = useState();

  useEffect(() => {
    const filteredBtnData = [];

    Object.values(btnData).map((item) => {
      if (item.type) {
        filteredBtnData.push(item);
        return item;
      }
    });

    setPree({
      variables,
      messageContent: messageContent || "Message Content Goes Here...",
      filteredBtnData: filteredBtnData || [
        {
          type: "Url Action",
          value: "#",
          title: "Visit Us",
        },
        {
          type: "Dialer Action",
          value: "+91XXXXXXXXXX",
          title: "Call Us",
        },
      ],
    });
  }, [variables, messageContent, btnData]);

  return (
    <div className="w-full">
      <div className="mb-4">
        <p>Template Preview</p>
      </div>
      <div className="flex flex-col justify-between gap-10">
        {pree?.messageContent && (
          <div className="">
            <p>{pree?.messageContent}</p>
          </div>
        )}

        <div className="flex flex-col gap-2 ">
          {pree?.filteredBtnData?.length > 0 &&
            pree?.filteredBtnData?.map((item, index) => (
              <button
                key={index}
                title={item.value}
                className="flex items-center justify-center w-full px-4 py-2 text-white bg-green-500 rounded-md"
              >
                <FaExternalLinkAlt className="mr-2" />
                {item.title}
              </button>
            ))}
        </div>
      </div>
      {/* <pre>{JSON.stringify(pree, null, 2)}</pre> */}
    </div>
  );
};
