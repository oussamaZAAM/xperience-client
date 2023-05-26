import { useState } from "react";
import "../styles/globals.css";

import SelectMenu from "@/components/SelectMenu";
import SmallSelectMenu from "@/components/SmallSelectMenu";
import { FiSearch } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import Select from "react-select";
import { colourOptions } from "../data";
import { GoldenStarIcon, GrayStarIcon } from "@/utils/StarIcons";

const index = () => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-stretch px-2 py-4 mt-2 mb-4">
        <div className="flex flex-col justify-center items-start mx-16 gap-2">
          <p className="">select products</p>
          <Select
            className=""
            classNamePrefix="select"
            defaultValue={colourOptions[0]}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="color"
            options={colourOptions}
          />
        </div>
        <div className="flex justify-center items-center gap-6 mx-10">
          <div className="flex flex-col justify-center items-start gap-2">
            <p className="">sorting</p>
            <SmallSelectMenu text="Newest First" />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <p className="">translation</p>
            <SmallSelectMenu text="English" />
          </div>
        </div>
      </div>
      <hr />
      <div className="flex items-center">
        {/* Side bar Menu */}
        <div className="flex-1 flex flex-col items-center justify-start p-4 gap-4">
          <div className="flex flex-col items-stretch justify-center gap-4">
            {/* Search bar */}
            <div className="flex items-center justify-between rounded-md border-2 border-zinc-300 py-1 px-2 textinput">
              <FiSearch size={24} />
              <input
                type="text"
                className="indent-2 h-max focus:outline-none"
                placeholder="search"
              />
            </div>
            {/* Filter by date */}
            <SelectMenu text="all time" />
          </div>

          <div className="flex flex-col items-start justify-center w-full ml-4 my-4 gap-6">
            {/* Filter by rating  */}
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <MdArrowDropDown size={20} />
                <p className="font-medium text-sm">Filter by Rating</p>
              </div>

              <div className="flex flex-col justify-center items-stretch w-10/12 ml-2">
                <div className="flex justify-between items-center">
                  {/* Start rating  */}
                  <div className="flex justify-center items-center">
                    <AiFillStar size={20} color="#d59101" />
                    <AiFillStar size={20} color="#d59101" />
                    <AiFillStar size={20} color="#d59101" />
                    <AiFillStar size={20} color="#d59101" />
                    <AiFillStar size={20} color="#d59101" />
                  </div>
                  <p className="text-end text-zinc-400">119</p>
                </div>
              </div>
            </div>

            {/* Filter by rating  */}
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <MdArrowDropDown size={20} />
              <p className="font-medium text-sm">Filter by Version</p>
            </div>
            {/* Filter by rating  */}
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <MdArrowDropDown size={20} />
              <p className="font-medium text-sm">Filter by Country</p>
            </div>
          </div>
        </div>
        <div className="flex-2 w-full bg-pink-200">s</div>
      </div>
    </div>
  );
};

export default index;
