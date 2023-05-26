import React from "react";
import { HiOutlineSelector } from "react-icons/hi";

const SmallSelectMenu = ({ text }) => {
  return (
    <div className="flex justify-between items-center gap-10 border-2 border-zinc-300 rounded-md py-1 px-3">
      <p className="font-medium">{text}</p>
      <HiOutlineSelector />
    </div>
  );
};

export default SmallSelectMenu;
