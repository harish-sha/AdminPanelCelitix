import { getBlockContentByUserId } from "@/apis/admin/admin";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BlockContent = () => {
  const [userId, setUserId] = useState("2907");

  async function handleSearch() {
    try {
      const res = await getBlockContentByUserId(userId);
      console.log(res);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    }
  }
  return (
    <div>
      BlockContent
      <button onClick={handleSearch}>Click Me</button>
    </div>
  );
};

export default BlockContent;
