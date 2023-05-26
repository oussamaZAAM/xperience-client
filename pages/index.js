import { useState } from "react";

import SmallSelectMenu from "@/components/SmallSelectMenu";
import CountryLine from "@/components/sidebar/CountryLine";
import RatingLine from "@/components/sidebar/RatingLine";
import SelectMenu from "@/components/sidebar/SelectMenu";
import VersionLine from "@/components/sidebar/VersionLine";

import { FiSearch } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";
import Select from "react-select";
import { colourOptions } from "../data";

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
        <div style={{overflowY: "scroll", maxHeight: "600px"}} className="flex-1 w-full flex flex-col items-center justify-start p-4 gap-4">
          <div className="flex flex-col items-stretch justify-center gap-4 w-11/12">
            {/* Search bar */}
            <div className="flex items-center justify-start rounded-md border-2 border-zinc-300 py-2 px-3 textinput">
              <FiSearch size={24} />
              <input
                type="text"
                className="indent-2 h-max w-full focus:outline-none"
                placeholder="search"
              />
            </div>
            {/* Filter by Date */}
            <SelectMenu text="all time" />
          </div>

          <div className="flex flex-col items-start justify-center w-full ml-4 my-4 gap-6">
            {/* Filter by Rating  */}
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <MdArrowDropDown size={20} />
                <p className="font-medium text-sm">Filter by Rating</p>
              </div>

              {/* Rating Section */}
              <div className="flex flex-col justify-center items-stretch w-10/12 ml-4 gap-1.5">
                <RatingLine rating={5} raters={30} totalRaters={150} />
                <RatingLine rating={4} raters={20} totalRaters={150} />
                <RatingLine rating={3} raters={90} totalRaters={150} />
                <RatingLine rating={2} raters={10} totalRaters={150} />
                <RatingLine rating={1} raters={150} totalRaters={150} />
              </div>
            </div>

            {/* Filter by Version  */}
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <MdArrowDropDown size={20} />
                <p className="font-medium text-sm">Filter by Version</p>
              </div>

              <div className="flex flex-col justify-center items-stretch w-10/12 ml-4 gap-1.5">
                <VersionLine version={"1.12.0"} occurence={46} />
                <VersionLine version={"1.2.0"} occurence={19} />
                <VersionLine version={"1.1.4"} occurence={6} />
                <VersionLine version={"1.0.0"} occurence={106} />
              </div>
            </div>
            {/* Filter by Country  */}
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <MdArrowDropDown size={20} />
                <p className="font-medium text-sm">Filter by Country</p>
              </div>

              <div className="flex flex-col justify-center items-stretch w-10/12 ml-4 gap-2">
                <CountryLine country={"Morocco"} occurence={78} />
                <CountryLine country={"Morocco"} occurence={78} />
                <CountryLine country={"Morocco"} occurence={78} />
                <CountryLine country={"Morocco"} occurence={78} />
                <CountryLine country={"Morocco"} occurence={78} />
              </div>
            </div>
          </div>
        </div>
        <div className="max-h-96 flex-2 w-9/12 h-screen bg-pink-200">s</div>
      </div>
    </div>
  );
};

export default index;
