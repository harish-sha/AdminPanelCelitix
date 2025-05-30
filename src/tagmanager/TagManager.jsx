import React from "react";
import TagAssignDropdown from "./components/tags/TagAssignDropdown";
import TagCard from "./components/tags/TagCard";
import TagModal from "./components/tags/TagModal";
import TagAnalyticsCard from "./components/tags/TagAnalyticsCard";
import { Button } from "./components/shared/Button";
import { Modal } from "./components/shared/Modal";
import { Input } from "./components/shared/Input";

const TagManager = () => {
  return (
    <div>
      TagManager
      <TagAssignDropdown />
      {/* <TagCard /> */}
      {/* <TagModal /> */}
      <TagAnalyticsCard />
      <Button />
      <Modal />
      <Input />
    </div>
  );
};

export default TagManager;













