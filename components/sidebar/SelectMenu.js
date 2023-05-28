import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { TfiLayoutGrid3 } from "react-icons/tfi";

const SelectMenu = ({ text, list, changingAction, filter }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="relative flex flex-col justify-start items-stretch w-full">
      <div
        onClick={() => setOpenMenu((prev) => !prev)}
        className="flex justify-between items-center gap-10 border-2 border-zinc-300 rounded-md py-2 px-3 cursor-pointer"
      >
        <div className="flex justify-between items-center gap-2">
          <TfiLayoutGrid3 />
          <p className="font-semibold">{text}</p>
        </div>
        <SlArrowDown />
      </div>

      {/* Select Menu */}
      <div
        style={{ position: "absolute" }}
        className={
          "flex flex-col justify-start items-end w-full duration-300 transition " +
          (openMenu ? "translate-y-11 opacity-100" : "opacity-0")
        }
      >
        {list.map((value) => {
          return (
            <div
              onClick={() => {
                setOpenMenu(false);
                changingAction(value);
                filter.action(value);
              }}
              className={
                "bg-white border border-zinc-300 px-2.5 py-1 w-11/12 cursor-pointer hover:bg-zinc-100 " +
                (openMenu ? " z-50" : "hidden")
              }
            >
              <p className="font-semibold">{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectMenu;
