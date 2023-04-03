import React from "react";
import { RxAvatar } from "react-icons/rx";

const ForumBox = () => {
  return (
    <div className="flex gap-4 items-center bg-white shadow-lg py-3 px-5">
      <RxAvatar className="text-3xl text-[#50acfb]" />
      <p className="text-[#9b9b9b]">Discuss your problems with everyone...</p>
    </div>
  );
};

export default ForumBox;
