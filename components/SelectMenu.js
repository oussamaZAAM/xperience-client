import React from "react";
import { SlArrowDown } from "react-icons/sl";
import { TfiLayoutGrid3 } from "react-icons/tfi";

const SelectMenu = ({ text }) => {
  return (
    <div className="flex justify-between items-center gap-10 border-2 border-zinc-300 rounded-md py-2 px-3">
      <div className="flex justify-between items-center gap-2">
        <TfiLayoutGrid3 />
        <p className="font-medium">{text}</p>
      </div>
      <SlArrowDown />
    </div>
  );
};

export default SelectMenu;
