import { useState } from "react";
import { HiOutlineSelector } from "react-icons/hi";

const SmallSelectMenu = ({ text, list, changingAction }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="relative flex flex-col justify-start items-stretch w-48">
      <div
        onClick={() => setOpenMenu((prev) => !prev)}
        className="flex justify-between items-center gap-10 border-2 border-zinc-300 rounded-md py-1 px-3 cursor-pointer"
      >
        <p className="font-semibold">{text}</p>
        <HiOutlineSelector />
      </div>

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

export default SmallSelectMenu;
