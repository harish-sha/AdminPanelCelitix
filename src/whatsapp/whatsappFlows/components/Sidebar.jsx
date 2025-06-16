import React from "react";
import DraggableItem from "./DraggableItems";
import { Box, Typography, Divider } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import DescriptionIcon from "@mui/icons-material/Description";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddLinkIcon from "@mui/icons-material/AddLink";
import GamepadIcon from "@mui/icons-material/Gamepad";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import NotesIcon from "@mui/icons-material/Notes";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import ViewCarouselSharpIcon from '@mui/icons-material/ViewCarouselSharp';
import "./sidebar.css";

const items = [
  { id: 1, type: "heading", label: "Text Heading", icon: <TextFieldsIcon /> },
  {
    id: 2,
    type: "subheading",
    label: "Sub Heading",
    icon: <SubdirectoryArrowRightIcon />,
  },
  { id: 3, type: "textbody", label: "Text Body", icon: <NotesIcon /> },
  {
    id: 4,
    type: "textcaption",
    label: "Text Caption",
    icon: <DescriptionIcon />,
  },
];

const items2 = [
  { id: 1, type: "textInput", label: "Text Input", icon: <KeyboardIcon /> },
  { id: 2, type: "textArea", label: "Text Area", icon: <TextFieldsIcon /> },
];

const items3 = [
  {
    id: 1,
    type: "radioButton",
    label: "Radio Button",
    icon: <RadioButtonCheckedIcon />,
  },
  {
    id: 2,
    type: "checkBox",
    label: "Check Box",
    icon: <CheckBoxIcon />,
  },
  {
    id: 3,
    type: "dropDown",
    label: "Drop Down",
    icon: <ArrowDropDownCircleIcon />,
  },
  {
    id: 4,
    type: 'chipSelector',
    label: "ChipSelector",
    icon: <DeveloperBoardOutlinedIcon />
  }
];

const items4 = [
  {
    id: 1,
    type: "footerbutton",
    label: "Footer Button",
    icon: <GamepadIcon />,
  },
  {
    id: 2,
    type: "embeddedlink",
    label: "Embedded Link",
    icon: <AddLinkIcon />,
  },
  { id: 3, type: "optin", label: "Opt in", icon: <MoreHorizIcon size="small" fontSize="small" /> },
];

const items5 = [
  { id: 1, type: "image", label: "Image", icon: <ImageIcon /> },
  { id: 2, type: "document", label: "Document", icon: <InsertDriveFileIcon /> },
  { id: 3, type: "media", label: "Media", icon: <PermMediaOutlinedIcon /> },
  {id: 4, type: "imageCarousel", label: "ImageCarousel", icon: <ViewCarouselSharpIcon/>}
];

const items6 = [
  { id: 1, type: "ifelse", label: "if-Else", icon: <AccountTreeIcon /> },
  { id: 2, type: 'switch', label: "Switch", icon: <SwitchLeftOutlinedIcon /> }
];

const items7 = [
  { id: 1, type: "date", label: "Date", icon: <DateRangeIcon /> },
  { id: 2, type: 'calendar', label: "Calendar", icon: <CalendarMonthOutlinedIcon /> }
];

// const items8 = [
//   { id: 1, type: "userdetail", label: "User  Details", icon: <PersonIcon /> },
// ];

const Sidebar = ({ onAdd }) => {
  return (
    <Box className="h-[830px] w-[350px] bg-white py-2 px-2 rounded-2xl sidebar hide-scrollbar shadow-xl overflow-y-scroll">
      <span className="text-sm tracking-wide font-semibold">
        Basic Text
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-1.5">
        {items.map((item) => (
          <div item xs={12} key={item.id} className="">
            <DraggableItem
              item={item}
              onClick={() => onAdd(item)}
              className=""
            />
          </div>
        ))}
      </div>
      <span className="text-sm tracking-wide font-semibold">
        Text Entry
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-1.5">
        {items2.map((item) => (
          <div item xs={12} key={item.id} className="">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      <span className="text-sm tracking-wide font-semibold">
        Select Controls
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-1.5">
        {items3.map((item) => (
          <div item xs={12} key={item.id} className="">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      <span className="text-sm tracking-wide font-semibold">
        Buttons
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-1.5">
        {items4.map((item) => (
          <div item xs={12} key={item.id} className="">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      <span className="text-sm tracking-wide font-semibold">
        Media Input
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-1.5">
        {items5.map((item) => (
          <div item xs={12} key={item.id} className="">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      <span className="text-sm tracking-wide font-semibold">
        Conditions
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-1.5">
        {items6.map((item) => (
          <div item xs={12} key={item.id} className="">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      <span className="text-sm tracking-wide font-semibold">
        Others
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-1.5">
        {items7.map((item) => (
          <div item xs={12} key={item.id} className="">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      {/* <span className="text-sm tracking-wide font-semibold">
        Templates
      </span> */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 mt-1.5">
        {items8.map((item) => (
          <div item xs={12} key={item.id} className="">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div> */}
    </Box>
  );
};

export default Sidebar;
