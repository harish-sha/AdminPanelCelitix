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
import "./sidebar.css";

const items = [
  { id: 1, type: "heading", label: "Text Heading", icon: <TextFieldsIcon  /> },
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
  { id: 3, type: "optin", label: "Opt in", icon: <MoreHorizIcon  size="small" fontSize="small"  /> },
];

const items5 = [
  { id: 1, type: "photo", label: "Photo", icon: <AddAPhotoIcon /> },
  { id: 2, type: "document", label: "Document", icon: <InsertDriveFileIcon /> },
];

const items6 = [
  { id: 1, type: "ifelse", label: "if-Else", icon: <AccountTreeIcon /> },
]; 

const items7 = [
  { id: 1, type: "image", label: "Image", icon: <ImageIcon /> },
  { id: 2, type: "date", label: "Date", icon: <DateRangeIcon /> },
];

const items8 = [
  { id: 1, type: "userdetail", label: "User  Details", icon: <PersonIcon /> },
];

const Sidebar = ({ onAdd }) => {
  return (
    <Box className="sidebar">
      <Typography variant="h6" gutterBottom className="heading">
        Basic Text
      </Typography>
      <div container sx={{ mt: 1 }} className="inside-box">
        {items.map((item) => (
          <div item xs={12} key={item.id} className="inside-items">
            <DraggableItem
              item={item}
              onClick={() => onAdd(item)}
              className="inside-item-draggable"
            />
          </div>
        ))}
      </div>
      <Typography variant="h6" gutterBottom className="heading">
        Text Entry
      </Typography>
      <div container sx={{ mt: 1 }} className="inside-box">
        {items2.map((item) => (
          <div item xs={12} key={item.id} className="inside-items">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      <Typography variant="h6" gutterBottom className="heading">
        Select Controls
      </Typography>
      <div container sx={{ mt: 1 }} className="inside-box">
        {items3.map((item) => (
          <div item xs={12} key={item.id} className="inside-items">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      <Typography variant="h6" gutterBottom className="heading">
        Buttons
      </Typography>
      <div container sx={{ mt: 1 }} className="inside-box">
        {items4.map((item) => (
          <div item xs={12} key={item.id} className="inside-items">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      <Typography variant="h6" gutterBottom className="heading">
        Media Input
      </Typography>
      <div container sx={{ mt: 1 }} className="inside-box">
        {items5.map((item) => (
          <div item xs={12} key={item.id} className="inside-items">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      <Typography variant="h6" gutterBottom className="heading">
        Conditions
      </Typography>
      <div container sx={{ mt: 1 }} className="inside-box">
        {items6.map((item) => (
          <div item xs={12} key={item.id} className="inside-items">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      <Typography variant="h6" gutterBottom className="heading">
        Others
      </Typography>
      <div container sx={{ mt: 1 }} className="inside-box">
        {items7.map((item) => (
          <div item xs={12} key={item.id} className="inside-items">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
      <Typography variant="h6" gutterBottom className="heading">
        Templates
      </Typography>
      <div container sx={{ mt: 1 }} className="inside-box">
        {items8.map((item) => (
          <div item xs={12} key={item.id} className="inside-items">
            <DraggableItem item={item} onClick={() => onAdd(item)} />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Sidebar;
