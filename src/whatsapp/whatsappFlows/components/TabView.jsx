import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Menu } from "primereact/menu";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import UniversalButton from "../../components/UniversalButton";
import toast from "react-hot-toast";
import InputField from "@/whatsapp/components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { addScreenName, deleteScreen } from "../redux/features/FlowSlice";

export default function CustomTabView({
  tabs,
  setTabs,
  activeIndex,
  setActiveIndex,
  dialogVisible,
  setDialogVisible,
  setEditDialogVisible,
  editDialogVisible,
  setScreenEditName,
  screenEditName,
  screenName,
  setScreenName,
  screenID,
  setScreenID,
  randomNumber,
  setRandomNumber,
  createTab,
  setCreateTab,
  menuRefs,
}) {
  // const [tabs, setTabs] = useState([
  //   { title: "Welcome", content: "Welcome", payload: {} },
  // ]);
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [dialogVisible, setDialogVisible] = useState(false);
  // const menuRefs = tabs.map(() => React.createRef());
  // const [screenName, setScreenName] = useState("");
  // const [screenID, setScreenID] = useState("");
  // const [createTab, setCreateTab] = useState("");

  // const [randomNumber, setRandomNumber] = useState(
  //   Math.floor(Math.random() * 1000)
  // );

  const screenNameStore = useSelector((state) => state.flows.screenName);
  const dispatch = useDispatch();
  const addTab = () => {
    setTabs([
      ...tabs,
      {
        id: screenID,
        title: screenName,
        content: `Content for ${screenName}`,
        payload: [],
      },
    ]);
    setActiveIndex(tabs.length);
    dispatch(
      addScreenName({
        id: screenID,
        data: {
          screenName: screenName,
        },
      })
    );
  };

  const removeTab = (index) => {
    const screenDetails = tabs[index];
    if (tabs.length === 1) return;
    const updatedTabs = tabs.filter((_, i) => i !== index);
    setTabs(updatedTabs);
    if (activeIndex >= updatedTabs.length) {
      setActiveIndex(updatedTabs.length - 1);
    }
    dispatch(deleteScreen({ id: screenDetails.id }));
  };

  const handleTabClick = () => {
    if (!tabs || tabs.length === 0) return;

    const lastTab = tabs[tabs.length - 1];

    const hasCompleteFooter = lastTab?.payload?.some(
      (item) =>
        item.type === "footerbutton" &&
        item.footer?.footer_1?.on_click_action === "navigate"
    );

    if (hasCompleteFooter) {
      setDialogVisible(true);
    } else {
      toast.error(
        "The last screen must have a footer with Next Action set to 'Navigate'."
      );
    }
  };

  const handleEditSave = () => {
    if (!screenEditName.trim()) {
      alert("Screen name cannot be empty.");
      return;
    }

    const updatedTabs = tabs.map((tab, index) =>
      index === activeIndex
        ? { ...tab, title: screenEditName, id: screenID }
        : tab
    );
    setTabs(updatedTabs);
    setEditDialogVisible(false);
    setScreenEditName("");
    setScreenID("");
  };

  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const menuItems = (index) => [
    {
      label: "Edit",
      icon: <EditNoteOutlinedIcon />,
      command: () => {
        const screenData = tabs[index];
        const screenName = screenData.title;
        const screenID = screenData.id;

        setScreenEditName(screenName);
        setScreenID(screenID);
        setEditDialogVisible(true);
      },
    },
    {
      label: "Delete",
      icon: <DeleteForeverOutlinedIcon sx={{ color: "red" }} />,
      command: () => removeTab(index),
    },
    // {
    //     label: "Export",
    //     icon: <IosShareOutlinedIcon />,
    //     command: () => alert(`Export Tab ${index + 1}`),
    // },
  ];

  const handleBtnClick = () => {
    if (!screenName.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    const isTitleExists = tabs.some((tab) => tab.title === screenName);
    if (isTitleExists) {
      toast.error(
        "Screen already exists. Please choose a different Screen Name."
      );
      return;
    }
    addTab();

    setScreenName("");
    setScreenID("");
    setDialogVisible(false);
  };

  const handleCloseClick = () => {
    setDialogVisible(false);
    setScreenName("");
    setScreenID("");
    setRandomNumber(Math.floor(Math.random() * 1000));
  };

  const generateRandomLetters = (length = 5) => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return Array.from(
      { length },
      () => letters[Math.floor(Math.random() * letters.length)]
    ).join("");
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 px-3 py-2 border-b  bg-gradient-to-tr from-indigo-100 via-blue-50 to-purple-100  shadow-sm absolute rounded-t-2xl top-0 z-50 w-full overflow-x-auto">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex items-center px-3 py-1.5 rounded-full transition-all duration-200 ease-in-out cursor-pointer border ${
              activeIndex === index
                ? "bg-blue-100 border-blue-400 text-blue-700"
                : "bg-gray-100 border text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <span className="pr-1 font-medium">{tab.title}</span>

            <Menu
              model={menuItems(index)}
              popup
              ref={menuRefs[index]}
              className="mt-50"
            />

            <MoreVertOutlinedIcon
              onClick={(e) => menuRefs[index].current.toggle(e)}
              className="ml-1 text-gray-500 hover:text-blue-500"
              style={{ fontSize: "1rem" }}
            />
          </div>
        ))}

        {/* Add New Tab Button */}
        <div
          className="flex items-center justify-center px-3 py-1.5 bg-blue-100 text-blue-600 border border-blue-300 rounded-full cursor-pointer hover:bg-blue-200 transition-all"
          onClick={handleTabClick}
        >
          <AddIcon fontSize="small" />
          <span className="ml-1 text-sm font-medium text-nowrap">
            Add Screen
          </span>
        </div>
      </div>

      <Dialog
        visible={dialogVisible}
        onHide={() => {
          setDialogVisible(false);
        }}
        className=""
        draggable={false}
        closable={false}
      >
        <p className="shadow-md p-4 rounded-md w-full text-md font-medium">
          Create New Screen
        </p>
        <div>
          <div className="flex flex-row mt-5 w-full gap-5">
            <div className="w-80">
              <InputField
                label="Screen title"
                tooltipContent="this is your screen title which display top of the screen"
                value={screenName}
                onChange={(e) => {
                  const value = e.target.value;
                  setScreenName(value);
                  if (!value) {
                    setScreenID("");
                    return;
                  }
                  const sanitized = value.replace(/\s+/g, "_").toLowerCase();
                  const randomLetters = generateRandomLetters();
                  const id = `${sanitized}_${randomLetters}`.toUpperCase();
                  setScreenID(id);
                }}
                placeholder="Screen Name"
                className="py-2 border-2 rounded-md px-2"
                required
              />
            </div>
            <div className="w-80">
              <InputField
                label="Screen ID"
                tooltipContent="It's scren ID of the screen it's unique and auto generate"
                value={screenID}
                onChange={(e) => {
                  const inputValue = e.target.value.trim();
                  const formattedID = inputValue
                    .replace(/\s+/g, "_")
                    .toLowerCase();
                  setScreenID(formattedID);
                }}
                required
                readOnly
                placeholder="Screen ID"
                className="readonly py-2 border-2 rounded-md px-2 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex flex-col ml-2 mt-5">
            <h2 className="text-gray-500 font-medium text-lg">Instructions:</h2>
            <ul className="text-gray-500 font-normal text-sm space-y-2 mt-3 list-disc">
              <li>
                If the screen name meets the Screen ID rules, then the Screen ID
                used as its screen name.
              </li>
              <li>Screen ID must be unique.</li>
              <li>
                SUCCESS is a reserved keyword and should not be used as a screen
                id.
              </li>
              <li>Screen ID allows only alphabets and underscores("_").</li>
              <li>
                Provide a separate Screen ID, if the screen title includes
                special characters, or doesn't meet screen ID rules.
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t-1 border-gray-300 mt-25 w-full">
          <div className="flex flex-row gap-4 justify-end items-end mt-2">
            <UniversalButton
              label="Close"
              variant="primary"
              onClick={handleCloseClick}
            />
            <UniversalButton
              label="Create"
              variant="primary"
              value={createTab}
              onClick={(e) => handleBtnClick(e.target.value)}
            />
          </div>
        </div>
      </Dialog>

      {/* Edit screen dialog */}
      <Dialog
        visible={editDialogVisible}
        onHide={() => {
          setEditDialogVisible(false);
        }}
        className=""
        draggable={false}
        closable={false}
      >
        <p className="shadow-md p-4 rounded-md w-full text-md font-medium">
          Edit Screen
        </p>
        <div>
          <div className="flex flex-row mt-5 w-full gap-5">
            <div className="">
              <InputField
                label="Enter screen name"
                value={screenEditName}
                // onChange={(e) => {
                //   const value = e.target.value;
                //   setScreenEditName(value);
                // }}
                onChange={(e) => {
                  const value = e.target.value;
                  setScreenEditName(value);
                  if (!value) {
                    setScreenID("");
                    return;
                  }
                  const sanitized = value.replace(/\s+/g, "_").toLowerCase();
                  const randomLetters = generateRandomLetters();
                  const id = `${sanitized}_${randomLetters}`.toUpperCase();
                  setScreenID(id);
                }}
                required
                placeholder="Screen Name"
                className="py-2 border-2 rounded-md px-2"
              />
            </div>
            <div className="">
              <InputField
                tooltipContent="It's scren ID of the screen it's unique and auto generate"
                label="Screen ID"
                value={screenID}
                required
                readOnly
                placeholder="Screen ID"
                className="readonly py-2 border-2 rounded-md px-2 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex flex-col ml-2 mt-5">
            <h2 className="text-gray-500 font-medium text-lg">Instructions:</h2>
            <ul className="text-gray-500 font-normal text-sm space-y-2 mt-3 list-disc">
              <li>
                If the screen name meets the Screen ID rules, then the Screen ID
                used as its screen name.
              </li>
              <li>Screen ID must be unique.</li>
              <li>
                SUCCESS is a reserved keyword and should not be used as a screen
                id.
              </li>
              <li>Screen ID allows only alphabets and underscores("_").</li>
              <li>
                Provide a separate Screen ID, if the screen title includes
                special characters, or doesn't meet screen ID rules.
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t-1 border-gray-300 mt-25 w-full">
          <div className="flex flex-row gap-4 justify-end items-end mt-2">
            <UniversalButton
              label="Close"
              variant="primary"
              onClick={() => setEditDialogVisible(false)}
            />
            <UniversalButton
              label="Create"
              variant="primary"
              value={createTab}
              onClick={(e) => handleEditSave(e.target.value)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
