import { useState } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import Battery90Icon from "@mui/icons-material/Battery90";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import MenuIcon from "@mui/icons-material/Menu";
import toast from "react-hot-toast";
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/components/common/UniversalButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const PersistMenu = () => {
  const [menuName, setMenuName] = useState("");
  const [persistMenuItems, setPersistMenuItems] = useState([]);
  console.log("persistMenuItems", persistMenuItems);
  const [buttonType, setButtonType] = useState("web_url");
  const [webUrl, setWebUrl] = useState("");

  const handleAddMenuItem = () => {
    if (menuName.trim() === "") {
      toast.error("Please enter a menu item name.");
      return;
    }

    if (persistMenuItems.length >= 5) {
      toast.error("Only 5 items can be added.");
      return;
    }

    const newItem = {
      title: menuName.trim(),
      type: buttonType,
      webUrl: buttonType === "web_url" ? webUrl.trim() : "",
    };

    console.log("newItem", newItem);

    setPersistMenuItems((prev) => [...prev, newItem]);
    setMenuName("");
    setWebUrl("");
    setButtonType("web_url");
  };

  const handleRemoveMenuItem = (index) => {
    const updated = [...persistMenuItems];
    updated.splice(index, 1);
    setPersistMenuItems(updated);
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-4">
        {/* left Panel - add content */}
        <div className="md:w-2/3 bg-white rounded-lg shadow p-4 space-y-6 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4 w-full p-2 bg-white rounded-lg shadow">
            <div className="flex gap-6">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  value="web_url"
                  checked={buttonType === "web_url"}
                  onChange={(e) => setButtonType(e.target.value)}
                  className="accent-blue-600"
                />
                Web URL
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  value="postback"
                  checked={buttonType === "postback"}
                  onChange={(e) => setButtonType(e.target.value)}
                  className="accent-blue-600"
                />
                Postback
              </label>
            </div>

            <InputField
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="Show products, nearby location ...."
              label="Label of menu item"
            />

            <InputField
              type="text"
              value={webUrl}
              onChange={(e) => setWebUrl(e.target.value)}
              placeholder="https://www.example.com"
              label="web url to redirect"
            />
            <div className="w-max-content">
              <UniversalButton
                onClick={handleAddMenuItem}
                label="Add"
              />
            </div>
          </div>

          <div className="space-y-2 items-left grid grid-cols-2 gap-4 w-full h-full">
            {/* <h2 className="text-xl font-medium">List of Items Added</h2> */}
            {persistMenuItems.length === 0 ? (
              <div className="border-2 w-full h-100 flex items-center justify-center rounded-2xl">
                <p className="text-gray-400 text-sm">
                  No menu items added yet.
                </p>
              </div>
            ) : (
              persistMenuItems.map((item, index) => (
                <>
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-gray-50 shadow-sm space-y-1 relative"
                  >
                    <p className="text-gray-800 font-medium text-sm break-words">
                      Title: {item.title}
                    </p>
                    <p className="text-gray-700 text-xs font-medium">
                      Type: {item.type}
                    </p>
                    {item.webUrl && (
                      <p className="text-blue-600 text-xs font-medium break-words">
                        WebUrl:{" "}
                        <a
                          href={item.webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.webUrl}
                        </a>
                      </p>
                    )}

                    <button className="hover:bg-gray-300 transition-all rounded-full p-0.5 cursor-pointer absolute right-2 top-2" onClick={handleRemoveMenuItem}>  <DeleteForeverIcon
                      sx={{
                        fontSize: "1.2rem",
                        color: "#e31a1a",
                      }}
                    />
                    </button>
                  </div>
                </>
              ))
            )}
          </div>
        </div>

        {/* Right Panel - Chat Preview */}
        <div className="w-[375px] h-[667px] rounded-[2rem] border-4 border-black shadow-lg flex flex-col overflow-hidden relative bg-white">
          {/* Top Status Bar */}
          <div className="text-center text-xs text-gray-500 flex justify-between items-center p-4">
            <p>10:32 AM</p>
            <div className="flex space-x-1">
              <AccessAlarmIcon className="text-gray-500" fontSize="small" />
              <WifiIcon className="text-gray-500" fontSize="small" />
              <Battery90Icon className="text-gray-500" fontSize="small" />
            </div>
          </div>

          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40?img=12"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Lucky Shrub
                </h3>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <PhoneIcon fontSize="small" />
              <VideocamIcon fontSize="small" />
              <MenuIcon fontSize="small" />
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 relative overflow-y-auto text-sm p-4 space-y-4">
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-xl max-w-[70%]">
                Live chat with a person
              </div>
            </div>

            <div className="text-xs text-gray-400">Shane joined the chat</div>

            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl max-w-[75%]">
                Hi! My name is Shane! I’m a customer support rep with Lucky
                Shrub, how can I help you?
              </div>
            </div>
          </div>

          {/* Bottom Sheet - Persist Menu */}
          <div className="absolute inset-0 bg-black/20 z-0" />
          <div className="relative z-10 bg-white p-2 rounded-t-2xl shadow-lg h-[55%] overflow-y-auto">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-2" />
            <h2 className="text-center text-md font-semibold text-gray-800">
              More options
            </h2>
            <p className="text-center text-xs text-gray-500 mb-4">
              Tap to send a suggestion from Lucky Shrub
            </p>

            <div className="space-y-2 flex flex-col items-center">
              {persistMenuItems.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No menu items added yet.
                </p>
              ) : (
                persistMenuItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-auto max-w-xs text-blue-400 text-sm bg-gray-100 font-semibold px-4 py-1.5 rounded-full break-words"
                  >
                    {item.title}
                  </button>
                ))
              )}
            </div>

            <div className="mt-1 text-center border-t border-gray-200 pt-4">
              <a href="#" className="text-sm text-blue-600 underline">
                Visit the website
              </a>
              <p className="text-xs text-gray-300">www.example.com</p>
            </div>
            <div className="w-28 h-1.5 bg-gray-800 rounded-full mx-auto mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersistMenu;
