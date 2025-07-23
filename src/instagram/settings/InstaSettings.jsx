import React, { useState } from "react";
import PersistMenu from "../Livechats/Components/PersistMenu";
import IceBreaker from "./components/IceBreaker";
import Tabs from "@mui/material/Tabs";

import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import CustomTabsMaterial from "../components/CustomTabsMaterial";


const tabsData = [
  {
    label: "Persist Menu",
    value: "persistMenu",
    icon: Square3Stack3DIcon,
    content: <PersistMenu />,
  },
  {
    label: "Ice Breaker",
    value: "iceBreaker",
    icon: UserCircleIcon,
    content: <IceBreaker />,
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
      <div className="p-3">
        <CustomTabsMaterial tabsData={tabsData} defaultValue="persistMenu" />
      </div>
    </>
  );
};

export default InstaSettings;
