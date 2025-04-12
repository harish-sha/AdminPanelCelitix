import React from "react";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import CustomTooltip from "../../components/CustomTooltip";

const CarouselInteractiveActions = ({ cards, setCards, selectedCardIndex }) => {
  if (!cards || !cards[selectedCardIndex]) {
    return (
      <div className="p-4 border rounded-lg shadow-md bg-gray-50">
        <p className="text-sm text-gray-500">
          No card selected or invalid index.
        </p>
      </div>
    );
  }
  //   const card = cards[selectedCardIndex];
  const card = cards[selectedCardIndex] || { actions: [] }; // Fallback to ensure `actions` is an array

  const handleAddAction = (type) => {
    const updatedCards = [...cards];
    const currentCard = updatedCards[selectedCardIndex];

    if (currentCard.actions.length >= 1) {
      toast.error("Maximum 1 actions allowed per card");
      return;
    }

    const newAction =
      type === "phone"
        ? { type: "phone", phoneNumber: "+91", title: "" }
        : type === "url"
        ? { type: "url", url: "http://", title: "" }
        : { type: "quickReply", title: "" };

    currentCard.actions.push(newAction);
    setCards(updatedCards);
  };

  // Update Action
  const handleActionChange = (index, key, value) => {
    const updatedCards = [...cards];
    updatedCards[selectedCardIndex].actions[index][key] = value;
    setCards(updatedCards);
  };

  // Remove Action
  const handleRemoveAction = (index) => {
    const updatedCards = [...cards];
    updatedCards[selectedCardIndex].actions.splice(index, 1);

    if (updatedCards[selectedCardIndex].actions.length === 0) {
      toast.error("At least one action is required");
    }

    setCards(updatedCards);
  };

  return (
    <div className="w-full p-4 border bg-white border-gray-300 rounded-lg shadow-md ">
      <div className="flex items-center mb-2">
        <label className="text-base font-medium text-gray-700">
          Carousel Interactive Actions
        </label>
        <CustomTooltip
          title="Maximum 2 actions per card"
          placement="right"
          arrow
        >
          <span className="ml-2">
            <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
          </span>
        </CustomTooltip>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Add Phone, URL, or Quick Reply actions to the selected carousel card. At
        least one action is mandatory.
      </p>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            id="carouselPhoneAction"
            name="carouselPhoneAction"
            className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
            onClick={() => handleAddAction("phone")}
          >
            Add Phone
          </button>
          <button
            id="carouselUrlAction"
            name="carouselUrlAction"
            className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
            onClick={() => handleAddAction("url")}
          >
            Add URL
          </button>
          <button
            id="carouselQuickReplyAction"
            name="carouselQuickReplyAction"
            className="bg-gray-500 text-white px-3 py-1 text-sm rounded hover:bg-gray-600"
            onClick={() => handleAddAction("quickReply")}
          >
            Add Quick Reply
          </button>
        </div>

        {/* Render Actions */}
        {card.actions.map((action, index) => (
          <div key={index} className="relative border p-3 rounded-md shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 capitalize">
                {action.type === "phone"
                  ? "Phone Number"
                  : action.type === "url"
                  ? "URL"
                  : "Quick Reply"}
              </label>
              <AiOutlineClose
                className="text-gray-500 cursor-pointer hover:text-red-500"
                onClick={() => handleRemoveAction(index)}
              />
            </div>

            {/* Action Input Fields */}
            {action.type === "phone" && (
              <div className="flex gap-2">
                <input
                  id="carouselPhoneActionTitle"
                  name="carouselPhoneActionTitle"
                  type="text"
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  placeholder="Button Title"
                  value={action.title}
                  onChange={(e) =>
                    handleActionChange(index, "title", e.target.value)
                  }
                  maxLength={25}
                />
                <input
                  id="carouselPhoneActionPhoneNumber"
                  name="carouselPhoneActionPhoneNumber"
                  type="text"
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  placeholder="Phone Number (+91)"
                  value={action.phoneNumber}
                  onChange={(e) =>
                    handleActionChange(index, "phoneNumber", e.target.value)
                  }
                  maxLength={16}
                />
              </div>
            )}

            {action.type === "url" && (
              <div className="flex gap-2">
                <input
                  id="carouselUrlActionTitle"
                  name="carouselUrlActionTitle"
                  type="text"
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  placeholder="Button Title"
                  value={action.title}
                  onChange={(e) =>
                    handleActionChange(index, "title", e.target.value)
                  }
                  maxLength={25}
                />
                <input
                  id="carouselUrlActionUrl"
                  name="carouselUrlActionUrl"
                  type="text"
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  placeholder="Enter URL"
                  value={action.url}
                  onChange={(e) =>
                    handleActionChange(index, "url", e.target.value)
                  }
                />
              </div>
            )}

            {action.type === "quickReply" && (
              <div>
                <input
                  id="carouselQuickReplyActionTitle"
                  name="carouselQuickReplyActionTitle"
                  type="text"
                  className="w-full border rounded px-2 py-1 text-sm"
                  placeholder="Quick Reply Title"
                  value={action.title}
                  onChange={(e) =>
                    handleActionChange(index, "title", e.target.value)
                  }
                  maxLength={25}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselInteractiveActions;
