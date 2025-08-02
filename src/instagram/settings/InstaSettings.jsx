import React, { useState } from "react";
import PersistMenu from "./components/PersistMenu";
import IceBreaker from "./components/IceBreaker";
import Tabs from "@mui/material/Tabs";
import { MdMenu } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FaInstagram, FaRegCommentDots } from "react-icons/fa";

import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ChatBubbleLeftEllipsisIcon
} from "@heroicons/react/24/solid";
import CustomTabsMaterial from "../components/CustomTabsMaterial";
import IgMe from "./components/IgMe";
import WelcomeMsgAd from "./components/WelcomeMsgAd";

const tabsData = [
  {
    label: "Persist Menu",
    value: "persistMenu",
    icon: MdMenu,
    content: <PersistMenu />,
  },
  {
    label: "Ice Breaker",
    value: "iceBreaker",
    icon: RiQuestionAnswerLine,
    content: <IceBreaker />,
  },
  {
    label: "Instagram Referral",
    value: "igMe",
    icon: FaInstagram,
    content: <IgMe />,
  },
  {
    label: "Welcome Message",
    value: "welcomeMessageAds",
    icon: FaRegCommentDots,
    content: <WelcomeMsgAd />,
  },
  // {
  //   label: "Settings",
  //   value: "settings",
  //   icon: Cog6ToothIcon,
  //   content: <SettingsComponent />,
  // },
];


const InstaSettings = () => {
  return (
    <>
      <div className="p-1 md:p-3">
        <CustomTabsMaterial tabsData={tabsData} defaultValue="persistMenu" />
      </div>
    </>
  );
};

export default InstaSettings;
